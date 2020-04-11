import React from 'react'
import './ImageFormInput.css'

export default function ImageFormInput({onInputChange,onButtonClicked}) {
    return (
        <div>
            <p className="f3">
                {'This app wil detect every faces in a picture.'}
            </p>
            <div style={{ display:'flex',justifyContent:'center' }}>
                <div className="form pa4 shadow-5"style={{ display:'flex',justifyContent:'center' }}>
                    <input onChange={onInputChange} type="text" className="f4 pa2 ma1 center w-70  br3"/>
                    <button 
                    onClick={onButtonClicked} 
                    className="f4 white br3 bg-light-purple link pointer grow w-auto ma1 ph3 pv2" > 
                    {'Detect'} </button>
                </div>
            </div>
        </div>
    )
}
