import React from 'react'

export default function navigation({route,onRouteChange}) {
    let to = route==='signin'?'register' : 'signin';    
    return (
        <nav style={{ display:'flex', justifyContent:'flex-end' }}>
            <p onClick={()=>onRouteChange(to)} className="f3 dim underline link black pointer pr3">
                {route==='signin'?'Register':(route==='register'?'Sign In' : 'Sign Out')}
            </p>
        </nav>
    )
}
