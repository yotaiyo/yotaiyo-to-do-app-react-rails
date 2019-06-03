import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import { TodoInput } from '../components/TodoInput'
import { Todos } from '../components/Todos'

type ToDoScreenProps = {}

export interface TodoListType {
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
    border-right: solid 1px #CCCCCC;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 1500px;
`

const RightWrapper = styled.div`
    flex: 1;
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
            this.setState({ todoList: results.data})
        })
        .catch((data) =>{
          console.log(data)
        })
    }

    render() {

        const { todoInput, todoList } = this.state 

        const onChangeText = (value: string) => {
            this.setState({ todoInput: value })
        }

        const onClickAddButton = (todoInput: string) => {
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

        return (
            <Wrapper>
                <LeftWrapper>
                    <Section />
                </LeftWrapper>
                <RightWrapper>
                    <Header />
                    <TodoInput todoInput={todoInput} onChangeText={onChangeText} onClickAddButton={onClickAddButton} />
                    <Todos todoList={todoList} />
                </RightWrapper>
            </Wrapper>
        )}
}

export default ToDoScreen