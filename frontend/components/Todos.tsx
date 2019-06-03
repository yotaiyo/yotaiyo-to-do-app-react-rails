import React from 'react'
import styled from 'styled-components'
import { TodoListType } from '../pages/ToDoScreen'

interface TodosType {
    todoList: TodoListType[]
}

const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    width: 600px;
    font-size: 20px;
`

const TodoCard = styled.div`
    border-left: solid 1px;
    border-right: solid 1px;
    border-bottom: solid 1px;
    text-align: left;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
`

const TodoBody = styled.div`
    font-size: 20px;
`

export const Todos = ({ todoList }: TodosType) => {
    console.log(todoList)
    let listNum = 0
    return(
        <Wrapper>
            {todoList.map((todo) => {
                const { title } = todo
                listNum += 1 

                return (
                    <TodoCard key={listNum} style={{ borderTop: listNum === 1 ? 'solid 1px' : undefined }}>
                        <TodoBody>{title}</TodoBody>
                    </TodoCard>
            )})} 
        </Wrapper>
    )
}