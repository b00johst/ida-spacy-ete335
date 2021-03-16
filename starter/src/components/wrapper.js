import React from 'react'
import Login from './login'
import ThemeChanger from '../theme-changer'
import Hero from './hero'
import Footer from './footer'
import Layout from './layout'
import Faq from './faq'
import Teachers from './teachers'

import Header from '../components/header'
import { useMsal } from '../utility/auth/msalContext';
import { faqData } from '../data/FaqData'

 
const Wrapper = ({children }) => {

    const {isAuthenticated} = useMsal();
    return (

        // TODO fix position
      <>
      <ThemeChanger/>

        <Header></Header>
        {!isAuthenticated && <Hero></Hero> }
            <Layout isHome>

                {children}

            </Layout>
            <Faq title="FAQ" data={faqData}></Faq>
            <Teachers></Teachers>
            <Footer></Footer>
       </>
    )

}

export default Wrapper


