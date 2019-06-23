import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import Router from 'next/router'
import { withRouter, SingletonRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

interface LoginProps {
    router: SingletonRouter
}

interface LoginState {
    emailInput: string
    passwordInput: string
    isLogin: boolean
    userId: number | null
    flash: string
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

const FlashText = styled.div`
    text-align: center;
    margin-top: 10px;
    color: #CC3300;
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

const NavigateSignUpText = styled.div`
    margin: 0px auto;
    margin-top: 20px;
`

const Here = styled.a`
    color: #003399;
` 

const AlreadyLoginText = styled.div`
    text-align: center;
    margin-top: 150px;
    font-size: 30px;
`

const ToastText = styled.div`
    font-family: 'Vollkorn', serif;
    color: black
`

class LoginScreen extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props)
        this.state = {
            emailInput: '',
            passwordInput: '',
            isLogin: false,
            userId: null,
            flash: ''
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
            } else {
                if (this.props.router.query) {
                    if (this.props.router.query.from === 'Logout') {
                        toast(<ToastText>ログアウトしました！</ToastText>)
                    } 
                }
            }
        })
    }

    postLoginInput(emailInput: string, passwordInput: string  ) {
        axios.post('http://localhost:3001/login', {email: emailInput, password: passwordInput} 
        )
        .then((result) => {
            if (result.data.token) {
                localStorage.setItem('token', result.data.token)
                Router.push({ pathname: '/ToDoScreen', query: { from: 'LoginScreen'} })
            }
            if (result.data.errors) {
                this.setState({ flash: result.data.errors })
            }
        })
    }

    render() {
        const { emailInput, passwordInput, isLogin, flash } = this.state

        return ( 
            !isLogin ?
                <Wrapper>
                    <LeftWrapper>
                        <Section />
                    </LeftWrapper>
                    <RightWrapper>
                        <Header />
                        <Title>Log In</Title>
                        <FlashText>{flash}</FlashText>
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
                            <NavigateSignUpText>
                                アカウントをお持ちでない人は<Here onClick={() => Router.push('/SignUpScreen')}>こちら</Here>
                            </NavigateSignUpText>
                        </LoginWrapper>
                        <ToastContainer />
                    </RightWrapper >
                </Wrapper>
            :   <Wrapper>
                    <LeftWrapper>
                        <Section />
                    </LeftWrapper>
                    <RightWrapper>
                        <Header />
                        <AlreadyLoginText>既にログインしています。</AlreadyLoginText>
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

export default withRouter(LoginScreen)