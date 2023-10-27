import React from 'react'

const GoalsCard = ({ title, goalKeyWord, firstParagraph, secondParagraph }) => {
  return (
    <div className="goal_card">
      <h1 className="goal_title">{title}</h1>
      <p className="first_paragraph">
        <span className="goal_keyword">{goalKeyWord} </span>
        {firstParagraph}
      </p>
      <p className="second_paragraph">{secondParagraph}</p>
    </div>
  )
}

export default GoalsCard
