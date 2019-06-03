import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`

const SquereButton = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    border-top: solid 1px #CCCCCC;
    border-bottom: solid 1px #CCCCCC;
    border-left: solid 1px #CCCCCC;
    font-size: 20px;
`

const CircleButton = styled.img`
    width: 18px;
    height: 18px;
    padding: 5px;
    border-radius: 70px;
    box-shadow:0px 0px 3px 2px #C0C0C0;
    margin-left: 50px;
    margin-top: 5px;
` 

export const Footer = () => {
    return (
        <Wrapper>
            <SquereButton>
                All
            </SquereButton>
            <SquereButton >
                Completed
            </SquereButton>
            <SquereButton style={{ borderRight: 'solid 1px #CCCCCC' }}>
                Active
            </SquereButton>
            <CircleButton
                src={require('../public/images/sort.png')}
                alt='sort'
            />
            <CircleButton 
                src={require('../public/images/delete.png')} 
                alt='delete' 
            />
        </Wrapper>
    )
}