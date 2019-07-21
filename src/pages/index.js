import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

class IndexPage extends React.Component {
  constructor(props){
    super(props);

    this.tagsFilter = [];
  }

  render() {

    console.debug(this.props.data.tags)

    return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>

      {this.props.data.tags.group.map(node => (
        <div key={node.fieldValue}>
          <label>{node.fieldValue}</label>
          <input type="checkbox" value={node.fieldValue}/>
        </div>
      ))}

      {this.props.data.games.edges.map(({ node }) => (
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
    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
          fieldValue
      }
    }
    games: allMarkdownRemark {
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