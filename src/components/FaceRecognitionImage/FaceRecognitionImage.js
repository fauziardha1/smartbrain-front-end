import React from 'react'
import './FaceRecognitionImage.css'

export default function FaceRecognitionImage({box,image}) {
    const temp = "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
    return (
        <div className="ma" style={{ display:'flex',justifyContent:'center' }}>
        <div className={'absolute mt2'} style={{ display:'flex',justifyContent:'center' }}>
            <img id="imageTarget" className={image.length ? '' : 'dn'} style={{ width:'500px',height:'auto' }} src={image.length ? image : temp} alt=""/>
            <div className={image.length ? 'bounding-box' : 'dn'} style={{ top:box.top,right:box.right,bottom:box.bottom,left:box.left }}></div>
        </div>
        </div>
    )
}
