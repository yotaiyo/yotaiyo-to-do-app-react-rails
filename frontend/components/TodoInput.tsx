import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface TodoInputType {
    todoInput: string
    onChangeText: (value: string) => void
    onClickAddButton: (todoInput: string) => void
    showOnlyCompleted: boolean
    showOnlyActive: boolean
}

const Wrapper = styled.div``

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

const TimeIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-top: 2px;
    margin-left: 10px;
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
const DatePickerWrapper = styled.div`
    margin-top: 5px;
    position: absolute;
`

export const TodoInput = ({ todoInput, onChangeText, onClickAddButton }: TodoInputType) => {
    return (
        <Wrapper>
            <TodoInputWrapper>
                <TimeIcon 
                    src={require('../public/images/time.png')} 
                    alt='time'   
                />
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
            <DatePickerWrapper>
                <DatePicker
                    onChange={(date) => {}}
                    inline
                />
                </DatePickerWrapper>
        </Wrapper>
    )
}