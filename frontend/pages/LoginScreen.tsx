import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'

interface LoginProps {}

interface LoginState {
    emailInput: string
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

const LoginWrapper = styled.div`
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

const LoginButton = styled.div`
    margin-top: 10px;
    background-color: #003399;
    color: white;
    padding: 3px;
    margin: 0px auto;
    margin-top: 20px;
    text-align: center;
    width: 80px;
` 

class LoginScreen extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props)
        this.state = {
            emailInput: '',
            passwordInput: ''
        }
    }

    postLoginInput(emailInput: string, passwordInput: string  ) {
        axios.post('http://localhost:3001/login', {email: emailInput, password: passwordInput} 
        )
        .then((result) => {
            if (result.data.errors) {
                console.log(result.data.errors)
            }
        })
    }

    render() {
        const { emailInput, passwordInput } = this.state

        return ( 
            <Wrapper>
                <LeftWrapper>
                    <Section />
                </LeftWrapper>
                <RightWrapper>
                    <Header />
                    <Title>Log In</Title>
                    <LoginWrapper>
                        <TextInput 
                            type="text"
                            placeholder='Email'
                            value={emailInput}
                            onChange={e => this.onChangeEmailInput(e.target.value)}
                        />
                        <TextInput 
                            type="text"
                            placeholder='Password'
                            value={passwordInput}
                            onChange={e => this.onChangePasswordInput(e.target.value)}
                        />
                        <LoginButton
                            onClick={() => this.postLoginInput(emailInput, passwordInput)}
                        >
                            login
                        </LoginButton>
                    </LoginWrapper>
                </RightWrapper >
            </Wrapper>
        )
    }

    private onChangeEmailInput = (value: string) => {
        this.setState({ emailInput: value})
    }

    private onChangePasswordInput = (value: string) => {
        this.setState({ passwordInput: value})
    }
}

export default LoginScreen