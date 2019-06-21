import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import Router from 'next/router'

interface SignUpProps {}

interface SignUpState {
    emailInput: string
    userNameInput: string
    passwordInput: string
    passwordConfirmationInput: string
    isLogin: boolean
    userId: number | null
    flashList: []
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

const FlashText = styled.div`
    text-align: center;
    margin-top: 10px;
    color: #CC3300;
`

const Flashs: React.FC<{ flashList: [] }> = ({ flashList }) => {
    return (
        <>
            {flashList.map((flash) => {
                return (
                    <FlashText>{flash}</FlashText>
                )
            })}
        </>
    )
}

class SignUpScreen extends React.Component<SignUpProps, SignUpState> {
    constructor(props: any) {
        super(props)
        this.state = {
            emailInput: '',
            userNameInput: '',
            passwordInput: '',
            passwordConfirmationInput: '',
            isLogin: false,
            userId: null,
            flashList: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        this.getLoginUser(token)
    }

    getLoginUser(token: string | null){
        axios.get('http://localhost:3001/login', {params: {token}}
        )
        .then((result) => {
            if (result.data) {
                this.setState({ isLogin: true })
                this.setState({ userId: result.data.id })
            }
        })
    }

    postSignUpInput(emailInput: string, userNameInput: string, passwordInput: string, passwordConfirmationInput: string  ) {
        axios.post('http://localhost:3001/users', {user: {email: emailInput, name: userNameInput, password: passwordInput, password_confirmation: passwordConfirmationInput}} 
        )
        .then((result) => {
            if (result.data.errors) {
                this.setState({ flashList: result.data.errors})
            }
            else {
                this.postLoginInput(emailInput, passwordInput)
            }
        })
    }

    postLoginInput(emailInput: string, passwordInput: string  ) {
        axios.post('http://localhost:3001/login', {email: emailInput, password: passwordInput} 
        )
        .then((result) => {
            if (result.data.token) {
                    localStorage.setItem('token', result.data.token)
                    Router.push('/ToDoScreen')
            }
            if (result.data.errors) {
                console.log(result.data.errors)
            }
        })
    }

    render() {
        const { emailInput, userNameInput, passwordInput, passwordConfirmationInput, isLogin, flashList } = this.state

        return ( 
            !isLogin ? 
                <Wrapper>
                    <LeftWrapper>
                        <Section />
                    </LeftWrapper>
                    <RightWrapper>
                        <Header />
                        <Title>Sign Up</Title>
                        <Flashs flashList={flashList} />
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
                            <TextInput 
                                type="text"
                                placeholder='Confirmation'
                                value={passwordConfirmationInput}
                                onChange={e => this.onChangePasswordConfirmationInput(e.target.value)}
                            />
                            <SignUpButton
                                onClick={() => this.postSignUpInput(emailInput, userNameInput, passwordInput, passwordConfirmationInput)}
                            >
                                sign up
                            </SignUpButton>
                        </SignUpWrapper>
                    </RightWrapper >
                </Wrapper>
            : null
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

    private onChangePasswordConfirmationInput = (value: string) => {
        this.setState({ passwordConfirmationInput: value})
    }
}

export default SignUpScreen