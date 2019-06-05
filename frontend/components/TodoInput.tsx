import React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface TodoInputProps {
    todoInput: string
    onChangeText: (value: string) => void
    onClickAddButton: (todoInput: string) => void
}

interface TodoInputState {
    showTimeComponent: boolean
    date: Date | null
}

const currentTime = new Date()

const Wrapper = styled.div`
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
`

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

export class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
    constructor(props: TodoInputProps) {
        super(props)
        this.state = {
            showTimeComponent: false,
            date: currentTime
        }
    }
    
    render(){
        const { todoInput, onChangeText, onClickAddButton } = this.props
        const { showTimeComponent, date } = this.state

        const onClickTimeIcon = (showTimeComponent: boolean) => {
            this.setState({ showTimeComponent: !showTimeComponent })
        }
    
        const handleChange = (date: Date | null) => {
            this.setState({ date })
            this.setState({ showTimeComponent: false })        
        }
        return (
            <Wrapper>
                <TodoInputWrapper>
                    <TimeIcon 
                        src={require('../public/images/time.png')} 
                        alt='time'   
                        onClick={() => onClickTimeIcon(showTimeComponent)}  
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
                { showTimeComponent ?
                <DatePickerWrapper>
                    <DatePicker
                        selected={date}
                        onChange={(date) => {
                            handleChange(date)
                        }}
                        inline
                    />
                </DatePickerWrapper>
                : <div />
                }
            </Wrapper>
        )
    }
}