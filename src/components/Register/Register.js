import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            password:''
        }
    }

    onChangeEmail=event=>this.setState({email:event.target.value})
    onChangePassword=event=>this.setState({password:event.target.value})
    onChangeName=event=>this.setState({name:event.target.value})

    onSubmit=event=>{
        const {name,email,password} = this.state;

        fetch('https://frozen-citadel-65423.herokuapp.com/register/',{
            headers : {'Content-Type':'application/json'},
            method  : 'post',
            body    : JSON.stringify({
                name:name,
                email:email,
                password:password
            })
        }).then(resp=>resp.json())
        .then(user=>{
            if(user.id){
                this.props.onLoadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }
    render(){
        return (
            <main className="pv3 ph5 dib black-80 br3 shadow-5">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onChangePassword}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={this.onSubmit} 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
                        type="submit" 
                        value="Register" 
                    />
                    </div>
                </div>
            </main>

        )
    }
}
