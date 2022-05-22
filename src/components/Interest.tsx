import React from 'react'

const interest_array: string[] = ["Investing", "Technology", "Singing And Dancing", "Sports", "Reading And Writing"]

const Interest = () => {
    return (
        <div>
            <select id='signup_interest' multiple>
                {interest_array.map((interest, index) => {
                    return (<option value={interest} key={index}> {interest} </option>)
                })}
            </select>
        </div>
    )
}

export default Interest
