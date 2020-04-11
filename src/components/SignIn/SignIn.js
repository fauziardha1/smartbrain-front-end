import React, { Component } from 'react'
import Alert from '../Alert/Alert'

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state ={
            signInEmail:'',
            signInPass:'',
        }
    }

    onEmailChange = event => this.setState({signInEmail:event.target.value})
    onPasswordChange = event => this.setState({signInPass:event.target.value})
    onSubmit = event =>{
        fetch('https://frozen-citadel-65423.herokuapp.com/signin',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.signInEmail,
                password: this.state.signInPass
            })
        }).then(response=>response.json())
        .then(data=>{
            if(data.id){
                this.props.onLoadUser(data);
                this.props.onRouteChange('home');
                this.props.onSignInError(false)
            }else{
                this.props.onSignInError(true)
            }
        })
        .catch(err=>{
            console.log("error",err)
            
        })
        
    }
    render(){
        const {onRouteChange,err}= this.props;
        return (
            <main className="pv3 ph5 dib black-80 br3 shadow-5">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    {err?<Alert />: ''}
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={()=>onRouteChange('register')} className="f4 link dim underline black db pointer">Register</p>
                    </div>
                </div>
            </main>

        )
    }
}
