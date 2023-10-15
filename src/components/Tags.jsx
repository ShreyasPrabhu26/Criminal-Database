import React from 'react'

const Tags = ({ tags }) => {
    return (
        <div>
            <div>

            </div>
            <div className="tags">
                {tags?.map((tag, index) => (
                    <div className="tag" key={tag}>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tags