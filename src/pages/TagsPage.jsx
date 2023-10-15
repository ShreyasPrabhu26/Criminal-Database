import React from 'react'
import Tags from '../components/Tags'

const TagsPage = ({ tags }) => {
    return (
        <div>
            <h1>EXPLORE TAGS</h1>
            <Tags tags={tags} />
        </div>
    )
}

export default TagsPage