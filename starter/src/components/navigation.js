import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { Link } from './link'
import classes from '../styles/navigation.module.sass'

 
const Navigation = (props) => {


    const query = graphql`{
        allMarkdownRemark(
            sort: { fields: [frontmatter___title], order: ASC }
            filter: { frontmatter: { type: { eq: "task" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                        fullPath
                    }
                    frontmatter {
                        title
                        description
                        location
                        type
                    }
                }
            }
        }
    }`;
    // classes.nav
    return (
        <StaticQuery
            query={query}
            render={data => {
                const elements = data.allMarkdownRemark.edges.map(({ node }, index) => 
                    <Link key={index} to={node.fields.fullPath}>
                        {node.frontmatter.title}
                        <br></br>
                    </Link>
                );

                return (
                    <div className={`${props.className} ${classes.nav}`}> 
                        {elements}
                    </div>
                )
             }}>        
        </StaticQuery>
    );
}


export default Navigation 