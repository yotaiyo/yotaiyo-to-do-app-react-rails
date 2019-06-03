import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import { TodoInput } from '../components/TodoInput'
import { Todos } from '../components/Todos'
import { Footer } from '../components/Footer' 

type ToDoScreenProps = {}

export interface TodoType {
    id?: number
    title: string
    completed: boolean
}

type ToDoScreenState = {
    todoInput: string
    todoList: TodoType[]
    showOnlyCompleted: boolean
    showOnlyActive: boolean
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
          todoList: [],
          showOnlyCompleted: false,
          showOnlyActive: false
        }
    }

    componentDidMount() {
        this.getTodoList()
    }

    getTodoList() {
        axios.get('http://localhost:3001/todo')
        .then((results) => {
            this.setState({ todoList: results.data})
        })
        .catch((data) =>{
            console.log(data)
        })
    }

    postTodo(todo: TodoType) {
        axios.post('http://localhost:3001/todo', {todo} )
        .then(() => {
            this.setState({ todoInput: '' })
            this.getTodoList()
        })
        .catch((data) => {
            console.log(data)
        })   
    }

    render() {
        const { todoInput, todoList, showOnlyActive, showOnlyCompleted } = this.state 

        const onChangeText = (value: string) => {
            this.setState({ todoInput: value })
        }

        const onClickAddButton = (todoInput: string) => {
            const todo = { title: todoInput, completed: false }
            this.postTodo(todo)
        }

        const onClickCheckButton = ({ id, completed }: {id?: number, completed: boolean}) => {
            axios.patch(`http://localhost:3001/todo/${id}`,{completed: !completed})
            .then(() => {
                this.getTodoList()
            })
            .catch((data) =>{
                console.log(data)
            })
        }

        const onClickAll = () => {
            this.setState({ showOnlyActive: false, showOnlyCompleted: false })
        }
        
        const onClickCompleted = () => {
            this.setState({ showOnlyActive: false, showOnlyCompleted: true })

        }
        
        const onClickActive = () => {
            this.setState({ showOnlyActive: true, showOnlyCompleted: false })

        }

        return (
            <Wrapper>
                <LeftWrapper>
                    <Section />
                </LeftWrapper>
                <RightWrapper>
                    <Header />
                    <TodoInput 
                        todoInput={todoInput} 
                        onChangeText={onChangeText} 
                        onClickAddButton={onClickAddButton}
                        showOnlyCompleted={showOnlyCompleted} 
                        showOnlyActive={showOnlyActive} 
                    />
                    <Todos 
                        todoList={todoList} 
                        onClickCheckButton={onClickCheckButton}
                        showOnlyCompleted={showOnlyCompleted} 
                        showOnlyActive={showOnlyActive}
                    />
                    <Footer 
                        onClickAll={onClickAll} 
                        onClickCompleted={onClickCompleted} 
                        onClickActive={onClickActive}
                        showOnlyCompleted={showOnlyCompleted} 
                        showOnlyActive={showOnlyActive} 
                    />
                </RightWrapper>
            </Wrapper>
        )}
}

export default ToDoScreen