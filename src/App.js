import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Navigation from './components/navigation/navigation'
import Logo from './components/logo/Logo'
import ImageFormInput from './components/imageFormInput/ImageFormInput'
import FaceRecognitionImage from './components/FaceRecognitionImage/FaceRecognitionImage'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import UserInfo from './components/UserInfo/UserInfo'
import './App.css';
import 'tachyons'



const initialState={
    input:'',
    box:{},
    route:'signin',
    signinErr:false,
    user:{
      id:0,
      name:'',
      email:'=',
      entries:0,
      joined: ''
    }
}
class App extends Component {  
  constructor(){
    super()
    this.state = initialState;
  }

  onLoadUser=data=>{
    const currentUser={
      id: data.id,
      name: data.name,
      email: data.email,
      entries: Number(data.enties),
      joined: data.joined
    }
    this.setState({
      user: currentUser
    })
  }

  onInputChange = event => this.setState({input:event.target.value})

  onButtonClicked = event =>{
    fetch('https://frozen-citadel-65423.herokuapp.com/imageUrl',{
        headers : {'Content-Type':'application/json'},
        method : 'post',
        body    : JSON.stringify({
          input:this.state.input
        }) 
      })
      .then(response=>response.json())
      .then(res=> {
      if(res){
        fetch('https://frozen-citadel-65423.herokuapp.com/image',{
          headers : {'Content-Type':'application/json'},
          method : 'put',
          body    : JSON.stringify({
            id:this.state.user.id
          }) 
        }).then(resp=>resp.json())
          .then(data=>{
            const update = this.state.user;
            update.entries = parseInt(data);
            this.setState({
              user:update
            })
          })
      }
      
      this.setBox(this.calculateBox(res))
    })
    .catch(err=>console.log(err))
  }

  calculateBox=data=>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageTarget = document.querySelector('#imageTarget');
    let width = Number(imageTarget.width);
    let height = Number(imageTarget.height);
    const left = face.left_col * width;
    const top = face.top_row * height;
    const right = width - (face.right_col*width);
    const bottom = height - (face.bottom_row*height);

    return {left:left,top:top,right:right,bottom:bottom}
  }

  setBox= data =>this.setState({box:data})

  onRouteChange= route =>{
      route==='signin'?
      this.setState(initialState):
      this.setState({route:route});
    }

  signinErrHandler= status=>{this.setState({signinErr:status})}

  render(){
    const {input,box,route,user,signinErr} = this.state;
    const particlesParam={
      particles:{
        number:{
          value:150,
          density:{
            enable:true,
            value_area:800
          }
        }
      }
    }
    return (
      <div className="App">
        <Particles className="particles" params={particlesParam} />
        <Navigation 
           route={route}
           onRouteChange={this.onRouteChange} />

        {route==='signin' 
          ? <SignIn err={signinErr} onSignInError={this.signinErrHandler} onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange} />
          : (
            route==='register'
            ? <Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange} />
            : <div>
              <Logo />
              <UserInfo name={user.name} entries={user.entries} />
              <ImageFormInput 
                onInputChange={this.onInputChange}
                onButtonClicked={this.onButtonClicked}
                />
              <FaceRecognitionImage
                box={box}
              image={input} />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
