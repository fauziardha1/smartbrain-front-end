import React from 'react'
import Tilt from 'react-tilt'
import './logo.css'

export default function Logo() {
    return (
        <div>
           <Tilt className="Tilt br2 shadow-3 ma3 " options={{ max : 55 }} style={{ height: 150, width: 150 ,display:'flex',justifyContent:'center',alignItems:'center'}} >
                <div className="Tilt-inner" > <img src="https://img.icons8.com/ios/100/000000/brain.png" alt="logo"/>  </div>
            </Tilt> 
        </div>
    )
}
