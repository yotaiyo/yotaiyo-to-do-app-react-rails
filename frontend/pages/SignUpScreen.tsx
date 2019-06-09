import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'

interface SignUpProps {}

interface SignUpState {
    emailInput: string
    userNameInput: string
    passwordInput: string
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Vollkorn', serif;
`

const LeftWrapper = styled.div`
    border-right: solid 1px #CCCCCC;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 1500px;
`

const RightWrapper = styled.div`
    flex: 1;
`

const Title = styled.div`
    margin-top: 20px;
    padding-left: 100px;
    padding-right: 100px;
    color: #444;
    font-size: 24px;
    display: flex;
    align-items: center;
    &:before, &:after {
        content: "";
        flex-grow: 1;
        height: 1px;
        background: #CCCCCC;
        display: block;
    }
    &:before {
        margin-right: .4em;
    }
    &:after {
        margin-left: .4em;
    }
`

const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const TextInput = styled.input`
    width: 200px;
    font-size: 15px;
    margin: 0px auto;
    margin-top: 20px;
    outline: 0;
    font-family: 'Vollkorn', serif;
`

const SignUpButton = styled.div`
    margin-top: 10px;
    background-color: #003399;
    color: white;
    padding: 3px;
    margin: 0px auto;
    margin-top: 20px;
    text-align: center;
    width: 80px;
` 

class SignUpScreen extends React.Component<SignUpProps, SignUpState> {
    constructor(props: any) {
        super(props)
        this.state = {
            emailInput: '',
            userNameInput: '',
            passwordInput: ''
        }
    }

    postSignUpInput(emailInput: string, userNameInput: string, passwordInput: string  ) {
        axios.post('http://localhost:3001/users', {email: emailInput, name: userNameInput, password_digest: passwordInput} )
        .then((result) => {
            if (result.data.errors) {
                console.log(result.data.errors)
            }
        })
    }

    render() {
        const { emailInput, userNameInput, passwordInput } = this.state

        return ( 
            <Wrapper>
                <LeftWrapper>
                    <Section />
                </LeftWrapper>
                <RightWrapper>
                    <Header />
                    <Title>Sign Up</Title>
                    <SignUpWrapper>
                        <TextInput 
                            type="text"
                            placeholder='Email'
                            value={emailInput}
                            onChange={e => this.onChangeEmailInput(e.target.value)}
                        />
                        <TextInput 
                            type="text"
                            placeholder='Username'
                            value={userNameInput}
                            onChange={e => this.onChangeUserNameInput(e.target.value)}
                        />
                        <TextInput 
                            type="text"
                            placeholder='Password'
                            value={passwordInput}
                            onChange={e => this.onChangePasswordInput(e.target.value)}
                        />
                        <SignUpButton
                            onClick={() => this.postSignUpInput(emailInput, userNameInput, passwordInput)}
                        >
                            sign up
                        </SignUpButton>
                    </SignUpWrapper>
                </RightWrapper >
            </Wrapper>
        )
    }

    private onChangeEmailInput = (value: string) => {
        this.setState({ emailInput: value})
    }

    private onChangeUserNameInput = (value: string) => {
        this.setState({ userNameInput: value})
    }

    private onChangePasswordInput = (value: string) => {
        this.setState({ passwordInput: value})
    }
}

export default SignUpScreen