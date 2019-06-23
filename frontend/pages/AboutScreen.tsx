import React from 'react'
import styled from 'styled-components'
import { Header } from '../components/Header'
import Section from '../components/Section'

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

const CardWrapper = styled.div`
    box-shadow: 0px 0px 6px 0.05px rgba(0,0,0,0.5);
    margin-top: 30px;
    margin-left: 100px;
    margin-right: 100px;
    border-radius: 10px;
    padding: 20px;
`

const CardTitle = styled.div`
    font-size: 25px;
`

const CardBody = styled.div`
    margin-left: 20px;
`

const AboutScreen = () => {
    return (
        <Wrapper>
            <LeftWrapper>
                <Section />
            </LeftWrapper>
            <RightWrapper>
                <Header />
                <CardWrapper>
                    <CardTitle>yotaiyo-to-do-appとは</CardTitle>
                    <CardBody>
                        フロントエンドからバックエンドまでを通して、個人で簡単なアプリケーションを作成できるようになることを目的に作成したToDoアプリです。
                    </CardBody>
                    <CardBody>
                        ToDoの追加、完了、フィルタリング、募集期限の設定、ソートといった機能やトークンベースの認証機能が実装されています。
                    </CardBody>
                </CardWrapper>
                <CardWrapper>
                    <CardTitle>使用技術</CardTitle>
                    <CardBody>
                        フロントエンド: Next.js、バックエンド: Ruby on Railsで構成されています。
                    </CardBody>
                </CardWrapper>
                <CardWrapper>
                    <CardTitle>ソースコード</CardTitle>
                    <CardBody>
                        <a href={'https://github.com/yotaiyo/yotaiyo-to-do-app-react-rails'}>Github</a>で公開しています。
                    </CardBody>
                </CardWrapper>
            </RightWrapper>
        </Wrapper>
    )
}

export default AboutScreen