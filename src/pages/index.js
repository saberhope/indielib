import React from "react"
import Layout from "../components/layout"
import Game from "../components/game/game"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

class IndexPage extends React.Component {
  constructor(props){
    super(props);

    // Populate filters state
    const tags = {};
    props.data.tags.group.forEach(tag => {
      tags[tag.fieldValue] = false; // checked attribute of checkbox
    });

    this.state = {
      tags: tags
    }
    
    this.change = this.change.bind(this);
    this.isVisible = this.isVisible.bind(this);
  }

  change(event) {
    const tags = this.state.tags;
    tags[event.target.value] = event.target.checked;
    this.setState({tags: tags});
  }

  isVisible(tags) {
    const selected = Object.keys(this.state.tags).filter(key => {
      return this.state.tags[key];
    })

    // If no filters are selected, game is visible
    if (selected.length === 0){
      return true;
    }

    let visible = true;
    for (const selectedTag of selected) {
      if (tags.indexOf(selectedTag) === -1) {
        visible = false;
      }
    }

    return visible;
  }

  render() {
    return (
    <Layout>
      <SEO title="Home" />
      <h1>Lista dei giochi</h1>

      {Object.keys(this.state.tags).map(key => (
        <div key={key}>
          <input type="checkbox" 
                 value={key} 
                 checked={this.state.tags[key]} 
                 onChange={ this.change }/>
          &nbsp;<label>{key}</label>
        </div>
      ))}

      {this.props.data.games.edges.filter(({ node }) => {
        return this.isVisible(node.frontmatter.tags);
      }).map(({ node }) => (
        <Game title={node.frontmatter.title}
              description={node.htmlAst}
              key={node.id}>
        </Game>
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
          htmlAst
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
  `;