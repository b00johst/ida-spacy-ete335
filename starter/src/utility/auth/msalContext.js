import React, { useState, useEffect, useContext } from "react";
import * as msal from "@azure/msal-browser";
import { apiRequest, idaSpacyProgressApiRequest } from "./msalConfig";
import { 
    getUserDetails, 
    addCompletedExercise, 
    removeCompletedExercise,
    getUserProgress, 
    // getUserProgressByChapter, 
    // getUserProgressByChapterAndSection, 
    getUserLastCompleted } 
from '../graph/GraphService';

// const ua = window.navigator.userAgent;
// const msie = ua.indexOf("MSIE ");
// const msie11 = ua.indexOf("Trident/");
// const msedge = ua.indexOf("Edge/");
// const isIE = msie > 0 || msie11 > 0;
// const isEdge = msedge > 0;
//const isIE = 0;
//const isEdge = 0;

export const MsalContext = React.createContext();
export const useMsal = () => useContext(MsalContext);
export const MsalProvider = ({
    children,
    config
}) => {

    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [publicClient, setPublicClient] = useState();
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [progress, setProgress] = useState();
    

    useEffect(() => {
        const pc = new msal.PublicClientApplication(config);
        setPublicClient(pc);

        pc.handleRedirectPromise().then((response) =>
        {
            setLoading(false);
            if (response) {
                setUser(getCurrentAccount(pc.getAllAccounts()));
                setIsAuthenticated(true);
                if(response.accessToken) {
                  setToken(response.accessToken);
                }
            }
        }).catch(error => {
            console.log(error);
            setLoginError(error);
        });

        if (getCurrentAccount(pc.getAllAccounts())) {
            setUser(getCurrentAccount(pc.getAllAccounts()));
            setIsAuthenticated(true);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {        
        if (isAuthenticated && !progress){     
            console.log("Init progress for current user");
            getUserProgressFromApi();            
        }        
        // eslint-disable-next-line
    }, [isAuthenticated])

    const login = async (loginRequest, method) => {
        const signInType = (isIE() || isEdge()) ? "loginRedirect" : method;
        if (signInType === "loginPopup") {
            setPopupOpen(true);

            try {
                await publicClient.loginPopup(loginRequest);
                
                if (getCurrentAccount(publicClient.getAllAccounts())) {
                    setUser(getCurrentAccount(publicClient.getAllAccounts()));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log(error);
                setLoginError(error);
            } finally {
                setPopupOpen(false);
            }
        } else if (signInType === "loginRedirect") {
            setLoading(true);

            publicClient.loginRedirect(loginRequest)
        }
    }

    const logout = () => {
        publicClient.logout();
    }

    const isIE = () => {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf("MSIE ");
        const msie11 = ua.indexOf("Trident/");
        return msie > 0 || msie11 > 0;
    }

    const isEdge = () => {
        const ua = window.navigator.userAgent;
        const msedge = ua.indexOf("Edge/");
        return msedge > 0;

    }

    // in a B2C solution a user may have several valid account logged in (e.g. one facebook, one google)
    // in this scenario we need to know which account to use. In our case the user can only use LiU accounts 
    // and there should only be one.
    const getCurrentAccount = (accounts) => {
        if (accounts.length > 0){            
            return accounts[0];
        }
        return null;
    }


    //////////////////////////////
    // Handle tokens for api-calls
    //////////////////////////////

    const getTokenPopup = async (loginRequest) => {
        try {
            const response = await publicClient.acquireTokenSilent(loginRequest);
            setToken(response.accessToken);            
            return response.accessToken;
        } catch (error) {            
            try {
                setPopupOpen(true);                
                const response = await publicClient.acquireTokenPopup(loginRequest);                
                setToken(response.accessToken);
                return response.accessToken;
            }
            catch (error) {
                console.log(error);
                setLoginError(error);
            }
            finally {
                setPopupOpen(false);
            }
        }
    }

    // This function can be removed if you do not need to support IE
    const getTokenRedirect = async (loginRequest) => {
        try {
            setToken(await publicClient.acquireTokenSilent(loginRequest));
        }
        catch(error) {
               
            try{
                setLoading(true);
                
                publicClient.acquireTokenRedirect(loginRequest);
            }
            catch(error) { 
                console.log(error);
                setLoginError(error);
            }
        }
    }

    const getToken = async (loginRequest, method) => {        
        const signInType = (isIE() || isEdge())? "loginRedirect" : method;
        if(signInType === "loginRedirect") {
            return await getTokenRedirect(loginRequest);
        } else
        {
            return await getTokenPopup(loginRequest);
        }
    }    
    
    // get user profile from graph /me endpoint
    const getUserProfileFromGraph = async () => {

        // to be able to request token silently (no login popup)
        // we need to provide the current logged in account in our request
        const silentTokenGraphTokenRequest = {
            scopes: apiRequest.scopes,
            account: user
        };

        var accessToken = await getToken(silentTokenGraphTokenRequest, "popupToken");
        var profile = await getUserDetails(accessToken);
        if (profile){
            setProfile(profile);
        }
    }

    const getUserProgressFromApi = async() => {
        const silentTokenGraphTokenRequest = {
            scopes: idaSpacyProgressApiRequest.scopes,
            account: user
        };

        var accessToken = await getToken(silentTokenGraphTokenRequest, "popupToken");        
        var progressResponse = await getUserProgress(accessToken, "spacytest-instance");        
        setProgress(progressResponse);                
    }
    
    const saveCompletedExerciseToApI = async(chapterId, sectionId, exerciseId, exerciseData) => {
        const silentTokenGraphTokenRequest = {
            scopes: idaSpacyProgressApiRequest.scopes,
            account: user
        };

        var accessToken = await getToken(silentTokenGraphTokenRequest, "popupToken");                
        await addCompletedExercise(accessToken, "spacytest-instance", chapterId, sectionId, exerciseId, exerciseData);
        var progressResponse = await getUserProgress(accessToken, "spacytest-instance");
        setProgress(progressResponse);        
    }

    const removeCompletedExerciseFromApi = async(chapterId, sectionId, exerciseId) => {        
        const silentTokenGraphTokenRequest = {
            scopes: idaSpacyProgressApiRequest.scopes,
            account: user
        };

        var accessToken = await getToken(silentTokenGraphTokenRequest, "popupToken");                
        await removeCompletedExercise(accessToken, "spacytest-instance", chapterId, sectionId, exerciseId);
        var progressResponse = await getUserProgress(accessToken, "spacytest-instance");
        setProgress(progressResponse); 
    }

    const getUserLastCompletedFromApi = async() => {
        const silentTokenGraphTokenRequest = {
            scopes: idaSpacyProgressApiRequest.scopes,
            account: user
        };

        var accessToken = await getToken(silentTokenGraphTokenRequest, "popupToken");
        return await getUserLastCompleted(accessToken, "spacytest-instance");
    }

    return (
        <MsalContext.Provider
            value={{
                isAuthenticated,
                user,
                token,
                loading,
                popupOpen,
                loginError,
                profile,
                progress,
                login,
                logout,
                getUserProfileFromGraph,
                getUserProgressFromApi,
                saveCompletedExerciseToApI,
                removeCompletedExerciseFromApi,
                getUserLastCompletedFromApi                
            }}
        >
            {children}
        </MsalContext.Provider>
    );
};