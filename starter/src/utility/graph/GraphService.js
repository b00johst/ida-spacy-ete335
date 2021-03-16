var graph = require('@microsoft/microsoft-graph-client');

const apiBaseUrl = "https://ida-spacy-progress-api-test-wa.azurewebsites.net"; //  // "https://localhost:44352"

function getAuthenticatedClient(accessToken) {
    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken) {
        
    const client = getAuthenticatedClient(accessToken);

    const user = await client
        .api('/me')
        .get();

    return user;
}

export const getUserLastCompleted = async(accessToken, courseInstanceId) => {    
    const response = await fetch(apiBaseUrl + "/api/Progress/" + courseInstanceId + "/lastCompleted", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export const getUserProgressByChapterAndSection = async(accessToken, courseInstanceId, chapterId, sectionId) => {    
    const response = await fetch(apiBaseUrl + "/api/Progress/" + courseInstanceId + "/" + chapterId + "/" + sectionId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export const getUserProgressByChapter = async(accessToken, courseInstanceId, chapterId) => {    
    const response = await fetch(apiBaseUrl + "/api/Progress/" + courseInstanceId + "/" + chapterId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export const getUserProgress = async(accessToken, courseInstanceId) => {    
    const response = await fetch(apiBaseUrl + "/api/Progress/" + courseInstanceId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export const addCompletedExercise = async(accessToken, courseInstanceId, chapterId, sectionId, exerciseId, exerciseData) => {

    const data = {        
        moduleId: chapterId,
        sectionId: sectionId,
        exerciseId: exerciseId,
        exerciseData: exerciseData ? JSON.stringify(exerciseData) : "{}"
    }
    
    await fetch(apiBaseUrl + "/api/Progress/" + courseInstanceId, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });    
}

export const removeCompletedExercise = async(accessToken, courseInstanceId, chapterId, sectionId, exerciseId) => {        
    await fetch(apiBaseUrl + "/api/Progress/" + courseInstanceId + "/" + chapterId + "/" + sectionId + "/" + exerciseId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    });    
}
