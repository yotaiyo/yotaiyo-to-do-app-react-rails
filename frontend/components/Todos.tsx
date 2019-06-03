import React from 'react'
import styled from 'styled-components'
import { TodoType } from '../pages/ToDoScreen'

interface TodosType {
    todoList: TodoType[]
    onClickCheckButton: ({ id, completed }: {id?: number, completed: boolean}) => void
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

export const Todos = ({ todoList, onClickCheckButton, showOnlyCompleted, showOnlyActive }: TodosType) => {
    let listNum = 0
    if (todoList.length === 0) {
        return <Wrapper>Todoはありません。</Wrapper>
    }
    return(
        <Wrapper>
            {todoList.map((todo) => {
                const { id, title, completed } = todo
                const showCompleted = showOnlyCompleted ? completed : true
                const showActive = showOnlyActive ? !completed : true 
                const show = showCompleted && showActive
                listNum += show ? 1 : 0 

                return (
                    show ?
                        <TodoCard key={listNum} style={{ borderTop: listNum === 1 ? 'solid 1px #CCCCCC' : undefined }}>
                            <TodoBody style={{ textDecoration: completed ? 'line-through' : undefined }}>{title}</TodoBody>
                            <ToggleButton 
                                src={completed ? require('../public/images/check-black.png') : require('../public/images/check-gray.png')} 
                                alt='check'
                                onClick={() => onClickCheckButton({ id, completed })}
                            />
                        </TodoCard>
                    : <div key={id} />
                )
            })} 
        </Wrapper>
    )
}