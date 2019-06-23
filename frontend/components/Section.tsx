import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'

interface SectionProps {}

interface SectionState  {
    isLogin: boolean
    userId: number | null
}

const Wrapper = styled.div`
    font-size: 20px;
    border-right: solid 1px #C0C0C0;
`

const SectionWrapper = styled.div`
    border-bottom: solid 1px #C0C0C0;
    padding: 20px;
    :hover {
        background-color: #EEEEEE;
    }
`

export class Section extends React.Component<SectionProps, SectionState> {
    constructor(props: SectionProps) {
        super(props)
        this.state = {
          isLogin: false,
          userId: null
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

    logout() {
        localStorage.removeItem('token')
        this.setState({ isLogin: false })
        Router.push( {pathname: '/LoginScreen', query: { from: 'Logout' } })
    }

    render () {
        const { isLogin } = this.state
        return (
            <Wrapper>
                <Link href='/AboutScreen'>
                    <SectionWrapper>yotaiyo-to-do-appとは</SectionWrapper>
                </Link>
                <Link href='/'>
                    <SectionWrapper>ホーム</SectionWrapper>
                </Link>
                <Link href='/ToDoScreen'>
                    <SectionWrapper>ToDo管理</SectionWrapper>
                </Link>
                {isLogin ?
                    <SectionWrapper onClick={() => this.logout()}>ログアウト</SectionWrapper>
                :
                    <Link href='/LoginScreen'>
                        <SectionWrapper>ログイン</SectionWrapper>
                    </Link>
                }
            </Wrapper>
        )
    }
}