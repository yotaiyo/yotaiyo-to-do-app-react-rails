import React from 'react'
import styled from 'styled-components'

interface FooterType {
    onClickAll: () => void
    onClickCompleted: () => void
    onClickActive: () => void
    showOnlyCompleted: boolean
    showOnlyActive: boolean
}

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

export const Footer = ({ onClickAll, onClickCompleted, onClickActive, showOnlyCompleted, showOnlyActive }: FooterType) => {
    return (
        <Wrapper>
            <SquereButton
                style={{ backgroundColor: !showOnlyCompleted && !showOnlyActive ? '#EEEEEE' : undefined }}
                onClick={onClickAll}
            >
                All
            </SquereButton>
            <SquereButton 
                style={{ backgroundColor: showOnlyCompleted ? '#EEEEEE' : undefined }}
                onClick={onClickCompleted}
            >
                Completed
            </SquereButton>
            <SquereButton 
                style={{ backgroundColor: showOnlyActive ? '#EEEEEE' : undefined, borderRight: 'solid 1px #CCCCCC' }}
                onClick={onClickActive}
            >
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