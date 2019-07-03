import React from 'react'
import App, { Container } from 'next/app'
import styled from 'styled-components'
import { Header } from '../components/Header'
import Section from '../components/Section'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.min.css'

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

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: { Component: any, ctx: any}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Wrapper>
          <LeftWrapper>
            <Section />
          </LeftWrapper>
          <RightWrapper>
            <Header />
            <Component {...pageProps} />
          </RightWrapper>
        </Wrapper>
      </Container>
    )
  }
}