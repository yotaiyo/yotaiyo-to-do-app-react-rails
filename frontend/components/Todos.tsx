import React from 'react'
import styled from 'styled-components'
import { TodoType } from '../pages/ToDoScreen'

interface TodosType {
    todoList: TodoType[]
    onClickCheckButton: ({ id, completed }: {id?: number, completed: boolean, deadline: Date | null}) => void
    showOnlyCompleted: boolean
    showOnlyActive: boolean
}

const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 20px;
    width: 600px;
    font-size: 20px;
`

const TodoCard = styled.div`
    border-left: solid 1px #CCCCCC;
    border-right: solid 1px #CCCCCC;
    border-bottom: solid 1px #CCCCCC;
    text-align: left;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
`

const TodoBody = styled.div`
    font-size: 20px;
`

const ToggleButton = styled.img`
    margin: 0 0 0 auto;
    width: 15px;
    height: 15px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-left: solid 1px #CCCCCC;
`

const DeadlineCardWrapper = styled.div`
    font-size: 12px;
    margin-top: 7px;
    margin-bottom: 5px;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    border-radius: 5px;
    box-shadow:0px 0px 3px 0.5px #C0C0C0;
`

interface DeadlineCardType {
    currentTime: Date
    deadline: Date
}

const DeadlineCard = ({ currentTime, deadline } : DeadlineCardType ) => {
    if (currentTime > new Date(deadline)) {
        return <DeadlineCardWrapper>締切は終了しました。</DeadlineCardWrapper>
    } 
    return <DeadlineCardWrapper>{deadline}まで</DeadlineCardWrapper>
}

export const Todos = ({ todoList, onClickCheckButton, showOnlyCompleted, showOnlyActive }: TodosType) => {
    let listNum = 0
    if (todoList.length === 0) {
        return <Wrapper>Todoはありません。</Wrapper>
    }
    return(
        <Wrapper>
            {todoList.map((todo) => {
                const { id, title, completed, deadline } = todo
                const showCompleted = showOnlyCompleted ? completed : true
                const showActive = showOnlyActive ? !completed : true 
                const show = showCompleted && showActive
                listNum += show ? 1 : 0 

                return (
                    show ?
                        <TodoCard key={listNum} style={{ borderTop: listNum === 1 ? 'solid 1px #CCCCCC' : undefined }}>
                            <TodoBody style={{ textDecoration: completed ? 'line-through' : undefined }}>{title}</TodoBody>
                            {deadline ? <DeadlineCard currentTime={new Date()} deadline={deadline}/> : <div />}
                            <ToggleButton 
                                src={completed ? require('../public/images/check-black.png') : require('../public/images/check-gray.png')} 
                                alt='check'
                                onClick={() => onClickCheckButton({ id, completed, deadline })}
                            />
                        </TodoCard>
                    : <div key={id} />
                )
            })} 
        </Wrapper>
    )
}