import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  constructor(props){
    super(props);

    this.tagsFilter = [];
  }

  render() {
    return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>

      {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>
            {node.frontmatter.title}{" "}
          </h3>
          {node.html}
        </div>
      ))}
    </Layout>
  )}
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          html
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
  `;