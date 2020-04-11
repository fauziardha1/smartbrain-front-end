import React from 'react'

export default function UserInfo({name,entries}) {
    
    return (
        <p className="f3 white df center ma5">
            <span className="f2">{name}</span>{', your current entrie\'s are...'}
            <span className="f2 "> {Number(entries)} </span>
        </p>
    )
}
