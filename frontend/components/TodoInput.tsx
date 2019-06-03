import React from 'react'
import styled from 'styled-components'

interface TodoInputType {
    todoInput: string
    onChangeText: (value: string) => void
    onClickAddButton: (todoInput: string) => void
}

const TodoInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #EEEEEE;
    padding: 5px;
    width: 300px;
    margin: auto;
    margin-top: 30px;
`

const TextInput = styled.input`
    width: 200px;
    font-size: 15px;
    margin-left: 10px;
    outline: 0;
    font-family: 'Vollkorn', serif;
`

const AddButton = styled.div`
    margin-left: 10px;
    margin-right: 7px;
    background-color: #003399;
    color: white;
    padding: 3px;
` 

export const TodoInput = ({ todoInput, onChangeText, onClickAddButton }: TodoInputType) => {
    console.log(todoInput)
    return (
        <TodoInputWrapper>
            <TextInput 
                type="text"
                placeholder='ToDoを入力して下さい'
                value={todoInput}
                onChange={e => onChangeText(e.target.value)}
            />
            <AddButton 
                onClick={() => onClickAddButton(todoInput)}
            >
                Add
            </AddButton>
        </TodoInputWrapper>
    )
}