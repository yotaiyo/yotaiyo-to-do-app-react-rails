import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

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

export const Section = () => (
    <Wrapper>
        <Link href='/AboutScreen'>
            <SectionWrapper>yotaiyo-to-do-appとは</SectionWrapper>
        </Link>
        <Link href='/'>
            <SectionWrapper>ホーム</SectionWrapper>
        </Link>
        <Link href='/ToDoScreen'>
            <SectionWrapper>ToDo</SectionWrapper>
        </Link>
        <Link href='/LoginScreen'>
            <SectionWrapper>ログイン</SectionWrapper>
        </Link>
    </Wrapper>
)