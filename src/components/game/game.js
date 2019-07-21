import PropTypes from "prop-types"
import React from "react"
import hastToHyperscript from "hast-to-hyperscript";

const Game = ({ title, description }) => (
  <div className="game">
    <h2>{title}</h2>
    {hastToHyperscript(React.createElement, description)}
  </div>
)

Game.propTypes = {
  title: PropTypes.string,
  description: PropTypes.object
}

export default Game
