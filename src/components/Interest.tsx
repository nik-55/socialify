import React from 'react'
type props = {
    interest_array: string[]
}
// component name can be better to make more sense
const Interest = (props: props) => {
    return (
        <div>
            <select id='signup_interest' multiple>
                {props.interest_array.map((interest, index) => {
                    return (<option value={interest} key={index}> {interest} </option>)
                })}
            </select>
        </div>
    )
}

export default Interest
