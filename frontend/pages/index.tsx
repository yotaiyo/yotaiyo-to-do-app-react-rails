import React from 'react'
import styled from 'styled-components'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import Link from 'next/link'

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
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    text-align: center;
    font-size: 60px;
    margin-top: 200px;
`

const SignUpButton = styled.div`
    margin: 0 auto;
    text-align: center;
    font-size: 25px;
    background-color: #003399;
    color: white;
    padding: 3px;
    margin-top: 20px;
    width: 150px;
` 

const HomeScreen =  () => {
    return (
        <Wrapper>
            <LeftWrapper>
                <Section />
            </LeftWrapper>
            <RightWrapper>
                <Header />
                <Title>Welcome to yotaiyo-to-do-app</Title>
                <Link href='/SignUpScreen'>
                    <SignUpButton>Sign Up!</SignUpButton>
                </Link>
            </RightWrapper>
        </Wrapper>
    )
}

export default HomeScreen
