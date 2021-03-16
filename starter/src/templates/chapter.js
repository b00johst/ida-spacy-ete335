import React, { useState, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import useLocalStorage from '@illinois/react-use-local-storage'

import { renderAst } from '../markdown'
import { ChapterContext } from '../context'
import Layout from '../components/layout'
import { Button } from '../components/button'
import { ChapterItem } from '../components/chapter-item'
import Navigation from '../components/navigation'
import classes from '../styles/task.module.sass'
import Burger from '../components/burger'
import Wrapper from '../components/Wrapper'

import { msalConfig, loginRequest } from './../utility/auth/msalConfig';
import { MsalProvider } from '../utility/auth/msalContext';
import Login from '../components/login'
import Footer from '../components/footer'
/*
 const { title, description, prev, next, id, location } = frontmatter
                <section className={classes.pagination}>
                    {buttons.filter(({slug, text}) => slug).map(({ slug, text }) => (
                        <div key={slug}>
                            <Button variant="secondary" small onClick={() => navigate(slug)}>
                                {text}
                            </Button>    
                        </div>
                    ))}
                </section>

*/
function waitForGlobal(name, timeout = 300) {
    return new Promise((resolve, reject) => {
      let waited = 0
  
      function wait(interval) {
        setTimeout(() => {
          waited += interval
          // some logic to check if script is loaded
          // usually it something global in window object
          if (window[name] !== undefined) {
            return resolve()
          }
          if (waited >= timeout * 1000) {
            return reject({ message: 'Timeout' })
          }
          wait(interval * 2)
        }, interval)
      }
  
      wait(2) //30
    })
  }

const Chapter = (props) => {
   
    const {data} = props;
    const {standalone} = props.pageContext; // fullPath, slug ligger också där
    const { markdownRemark, site } = data
    const { courseId } = site.siteMetadata
    const { frontmatter, htmlAst, tasks } = markdownRemark
    const { title, description, prev, next, id, location } = frontmatter
    const [activeExc, setActiveExc] = useState(null)

    const [completed, setCompleted] = useLocalStorage(`${courseId}-completed-${id}`, [])
    const html = renderAst(htmlAst)
    const buttons = [
        { slug: prev ? '/' + location + '/' + prev : prev, text: '« Previous Task' },
        { slug: next ? '/' + location + '/' + next : next, text: 'Next Task »' },
    ]

    //const [loaded,setLoaded] = useState(false);

    useEffect(() => {
      /*  frontmatter.forEach(({ node }) => {
            console.log(node)
         })*/
         console.log(props.pageContext.tasks)

       
        
        waitForGlobal('MathJax').then(() => {
            window.MathJax.Hub.Config({
              tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['[', ']']],
                processEscapes: true,
                processEnvironments: true,
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                TeX: {
                  equationNumbers: { autoNumber: 'AMS' },
                  extensions: ['AMSmath.js', 'AMSsymbols.js'],
                },
              },
            })
    //        setLoaded(true);
          })
          if (window.MathJax != null) {
            //var math = document.querySelector("."+classes.adaptiveGrid);
            //window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, math]);
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
            //window.MathJax.typeset();
          }

          //return () => {window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])}
      });

    const chapterTasks = props.pageContext.tasks.map( (task, i) => { 
  
        return <ChapterItem url={task.node.fields.slug} keyValue={i} description={task.node.frontmatter.description} title={task.node.frontmatter.title}> </ChapterItem>
      
    
    });

      /**
       * <Button variant="secondary" small onClick={() => navigate(slug)}>
                                            {text}
                                        </Button>
       */


    return (
        <ChapterContext.Provider value={{ activeExc, setActiveExc, completed, setCompleted}}>       
        {/* <div className={classes.containerRow}> */}
        {/* <div className={classes.adaptiveGrid}> */}

            <MsalProvider
            config={msalConfig}
            scopes={loginRequest}
            >
              <Wrapper>{chapterTasks}</Wrapper>

            { /*<Login></Login>
                <Layout title={title} description={description}>
                    <p>Framsteg 0/24</p>
                    {chapterTasks}

                </Layout>
                <Footer></Footer> */ }
            </MsalProvider>
        { /*</div> */} 
    </ChapterContext.Provider>

    )
}

export default Chapter

export const pageQuery = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                courseId
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            htmlAst
            frontmatter {
                id
                title
                description
                location
                prev
                next
            }
        }
    }
`
