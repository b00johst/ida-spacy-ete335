import React from 'react'


import Login from '../components/login'

import { msalConfig, loginRequest } from './../utility/auth/msalConfig';
import { MsalProvider } from '../utility/auth/msalContext';

import classes from '../styles/index.module.sass'
import Navigation from '../components/navigation'
import { ChapterItem } from '../components/chapter-item'


import { graphql, navigate } from 'gatsby'
import Wrapper from '../components/wrapper'
import Hero from '../components/hero'



export default ({ data }) => {
    //const {isAuthenticated} = MsalProvider();


    const chapters = data.allMarkdownRemark.edges.map( ({node}, i) => (
        <ChapterItem url={node.fields.slug} keyValue={i} description={node.frontmatter.description} title={node.frontmatter.title}> </ChapterItem>
        ))

    return (
        <MsalProvider
            config={msalConfig}
            scopes={loginRequest}
            >
            <Wrapper>{chapters}</Wrapper>
        </MsalProvider>

        )
}
// <Navigation className={classes.navigation}></Navigation> 

export const pageQuery = graphql`
    {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "chapter" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    }
`