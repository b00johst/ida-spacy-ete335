import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import SEO from './seo'

import '../styles/index.sass'
import classes from '../styles/layout.module.sass'

const Layout = ({ isHome, title, description, children }) => {
    const query = graphql`{
        site {
            siteMetadata {
                title
                description
                bio
                showProfileImage
                footerLinks {
                    text
                    url
                }
            }
        }
    }`;

    return (
        <StaticQuery
            query={query}
            render={data => {
        //        const meta = data.site.siteMetadata
                return (
                    <>
                        <SEO title={title} description={description} />
                        
                        <main className={classes.root}>
                            {/* {!isHome && (
                                <h1 className={classes.logo}>
                                    <Link hidden to="/">
                                        <Logo width={150} height={54} aria-label={meta.title} />
                                    </Link>
                                </h1>
                            )} */}
                            
                            <div className={classes.markdownContentWrapper}>
                                <div className={classes.content}> {/*markdown container*/}
                                    {(title || description) && (
                                        <header className={classes.header}>
                                            {title && <h1 className={classes.title}>{title}</h1>}
                                            {description && (
                                                <p className={classes.description}>{description}</p>
                                            )}
                                        </header>
                                    )}
                                    {children}
                                </div>
                            </div>
                        </main>
                    </>
                )
            }}
        />
    )
}

export default Layout
