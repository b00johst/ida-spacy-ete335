const { selectAll } = require('unist-util-select');

module.exports = ({ markdownAST }) => {
    const h1Nodes = selectAll('Option', markdownAST);

     console.log("log" + h1Nodes)
      // node doesn't always have data
     if (!node.data) node.data = {};
     node.data.hProperties = {
       className: 'foo'
     }
  // [{ type: "heading", children: [{ type: "text", value: "..." }] }, ...]
}