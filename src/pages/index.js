import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

class IndexPage extends React.Component {
  constructor(props){
    super(props);

    // Populate filters state
    const tags = {};
    console.debug(props.data.tags)
    props.data.tags.group.forEach(tag => {
      tags[tag.fieldValue] = false; // checked attribute of checkbox
    });

    this.state = {
      tags: tags
    }
    
    this.change = this.change.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  change(event) {
    const tags = this.state.tags;
    tags[event.target.value] = event.target.checked;
    this.setState({tags: tags});
  }

  getClass(tags) {
    const selected = Object.keys(this.state.tags).filter(key => {
      return this.state.tags[key];
    })
    console.debug(selected);

    // If no filters are selected, game is visible
    if (selected.length === 0){
      return '';
    }

    let visible = true;
    for (const selectedTag of selected) {
      if (tags.indexOf(selectedTag) === -1) {
        visible = false;
      }
    }

    if (visible) {
      return '';
    }

    return 'hidden';
  }

  render() {
    return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>

      {Object.keys(this.state.tags).map(key => (
        <div key={key}>
          <label>{key}</label>
          <input type="checkbox" value={key} checked={this.state.tags[key]} onChange={ this.change }/>
        </div>
      ))}

      {this.props.data.games.edges.map(({ node }) => (
        <div key={node.id} className={this.getClass(node.frontmatter.tags)}>
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