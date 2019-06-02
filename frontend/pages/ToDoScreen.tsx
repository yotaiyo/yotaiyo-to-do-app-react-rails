import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'

type ToDoScreenProps = {}

interface TodoListType {
    title: string
}

type ToDoScreenState = {
    todoInput: string
    todoList: TodoListType[]
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Vollkorn', serif;
`

const LeftWrapper = styled.div`
    flex: 0.15;
    border-right: solid 1px #CCCCCC;
    height: 1500px;
`

const RightWrapper = styled.div`
    flex: 0.85;
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

class ToDoScreen extends React.Component<ToDoScreenProps, ToDoScreenState> {
    constructor(props: any) {
        super(props)
        this.state = {
          todoInput: '',
          todoList: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/todo')
        .then((results) => {
          console.log(results)
        })
        .catch((data) =>{
          console.log(data)
        })
      }

    onChangeText(value: string) {
        this.setState({ todoInput: value })
    }

    onClickAddButton(todoInput: string) {
        axios.post('http://localhost:3001/todo', {todo: {title: todoInput}} )
        .then(() => {
            const todoList = this.state.todoList
             todoList.push({ title: todoInput })
            this.setState({ todoList })
            this.setState({ todoInput: '' })
        })
        .catch((data) => {
            console.log(data)
        })
    }

    render() {
        const { todoInput, todoList } = this.state 
        console.log(todoList)

    return (
        <Wrapper>
            <LeftWrapper>
                <Section />
            </LeftWrapper>
            <RightWrapper>
                <Header />
                <TodoInputWrapper>
                    <TextInput 
                        type="text"
                        placeholder='ToDoを入力して下さい'
                        value={this.state.todoInput}
                        onChange={e => this.onChangeText(e.target.value)}
                    />
                    <AddButton 
                        onClick={() => this.onClickAddButton(todoInput)}
                    >
                        Add
                    </AddButton>
                </TodoInputWrapper>
            </RightWrapper>
        </Wrapper>
    )}
}

export default ToDoScreen