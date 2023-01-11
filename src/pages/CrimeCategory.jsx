import React from 'react'
import MostWanted from '../components/MostWanted'

const CrimeCategory = ({ user }) => {
    return (
        <div>
            <h1><MostWanted user={user} /></h1>
        </div>
    )
}

export default CrimeCategory