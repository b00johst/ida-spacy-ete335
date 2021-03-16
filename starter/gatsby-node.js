const path = require('path')
const webpack = require('webpack')
const { createFilePath } = require('gatsby-source-filesystem')

const taskTemplate = path.resolve('src/templates/task-placeholder.js')
const chapterTemplate = path.resolve('src/templates/chapter.js')

//const faq = path.resolve('src/pages/faq.js')

function replacePath(pagePath) {
    return pagePath === `/` ? pagePath : pagePath.replace(/\/$/, ``)
}

async function onCreateNode({
    node,
    actions,
    getNode,
    loadNodeContent,
    createNodeId,
    createContentDigest,
}) {
    const { createNodeField, createNode, createParentChildLink } = actions

    if (node.internal.type === 'MarkdownRemark') {
        console.log(node)
        const location = node.frontmatter.location;
        const type     = node.frontmatter.type;
        const basePath = ""//"tasks" // Mappnamnet den ska hitta saker i
        const slug     = createFilePath({ node, getNode, basePath, trailingSlash: false }) // 'chapter1' 'chapter2' => basePath är mappnamnet
   
        createNodeField({ name: 'slug', node, value: slug })
        createNodeField({ name: 'fullPath', node, value: `/${location ? location : type}${slug}`})
        

    } else if (node.extension === 'py') {
        // Load the contents of the Python file and make it available via GraphQL
        // https://www.gatsbyjs.org/docs/creating-a-transformer-plugin/
        const content = await loadNodeContent(node)
        const contentDigest = createContentDigest(content)
        const id = createNodeId(`${node.id}-code`)
        const internal = { type: 'Code', contentDigest }
        const codeNode = {
            id,
            parent: node.id,
            children: [],
            code: content,
            name: node.name,
            internal,
        }
        createNode(codeNode)
        createParentChildLink({ parent: node, child: codeNode })
    }
}

exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                'global.GENTLY': false
            })
        ]
    })
}

// https://stackoverflow.com/questions/50770217/how-to-give-gatsby-a-graphql-schema
exports.sourceNodes = ({ actions, schema }) => {
    const { createTypes } = actions
    createTypes(`
      type MarkdownRemarkFrontmatter {
        id: String
      }
    `)
  }


exports.onCreateNode = onCreateNode

exports.createPages = ({ actions, graphql }) => {

    const { createPage } = actions
    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            type
                            description    
                            index                       
                        }
                        fields {
                            slug
                            fullPath
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        // createPage({
        //     path: `/faq`,
        //     component: faq,
        //     context: {  },
        // })
    

        const posts = result.data.allMarkdownRemark.edges.filter(
            ({ node }) => node.frontmatter.type === 'task' 
        )

        posts.forEach(({ node }) => {

            createPage({
                path: `${node.fields.slug}`,
                component: taskTemplate,
                context: { slug: node.fields.slug, fullPath: node.fields.fullPath, standalone: true },
            })


            createPage({
                path: node.fields.fullPath,
                component: taskTemplate,
                context: { slug: node.fields.slug, fullPath: node.fields.fullPath, standalone: false },
            })

        })

        const chapters = result.data.allMarkdownRemark.edges.filter(
            ({ node }) => node.frontmatter.type === 'chapter' 
        )

        chapters.forEach(({ node }) => {
            //console.log(node)

              //Hacky way of filtering chapter tasks to a chapter; Filters path
            let tasks = posts.filter((item) => node.fields.slug.split('/')[1] == item.node.fields.slug.split('/')[1]);

          
            // Work in progress implemenation of sort by index

            //posts.filter((item) => node.fields.slug.split('/')[1] == item.node.fields.slug.split('/')[1]);
            /*tasks.sort((a, b) => {
                if (a.node.frontmatter.index === null || b.node.frontmatter.index === null)
                    return a;
                
                return int(a.node.frontmatter.index) > int(b.node.frontmatter.index);           
            }); */

            

            createPage({
                path: `${node.fields.slug}`,
                component: chapterTemplate,
                context: { slug: node.fields.slug, fullPath: node.fields.fullPath, standalone: true, tasks: tasks },
            })
        })

    })
}
