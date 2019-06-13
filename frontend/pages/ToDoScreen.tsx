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
    deadline: Date | null
    userId: number | null
}

type ToDoScreenState = {
    todoInput: string
    todoList: TodoType[]
    showOnlyCompleted: boolean
    showOnlyActive: boolean
    isDeadline: boolean
    showSortedTodos: boolean
    showPleaseInputTodo: boolean
    showCharacterLimit: boolean
    isLogin: boolean
    userId: number | null
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
          showOnlyActive: false,
          isDeadline: false,
          showSortedTodos: false,
          showCharacterLimit: false,
          showPleaseInputTodo: false,
          isLogin: false,
          userId: null
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        this.getLoginUser(token)
    }

    getTodoList() {
        if (this.state.userId !== null) {
            axios.get('http://localhost:3001/todos', {params: {user_id: this.state.userId}})
            .then((results) => {
                this.setState({ todoList: results.data})
            })
            .catch((data) =>{
                console.log(data)
            })
        }
    }

    postTodo(todo: TodoType) {
        const { title, completed, deadline, userId } = todo
        axios.post('http://localhost:3001/todos', {title: title, completed: completed, deadline: deadline, user_id: userId} )
        .then(() => {
            this.setState({ todoInput: '' })
            this.getTodoList()
        })
        .catch((data) => {
            console.log(data)
        })   
    }

    deleteTodo(id?: number) {
        axios.delete(`http://localhost:3001/todos/${id}`)
        .then(() => {
            this.getTodoList()
        })
        .catch((data) => {
            console.log(data)
        })
    }

    getLoginUser(token: string | null){
        axios.get('http://localhost:3001/login', {params: {token}}
        )
        .then((result) => {
            if (result.data) {
                this.setState({ isLogin: true })
                this.setState({ userId: result.data.id })
                this.getTodoList()
            }
        })
    }

    render() {
        const { todoInput, todoList, showOnlyActive, showOnlyCompleted, isDeadline, showSortedTodos, showPleaseInputTodo, showCharacterLimit, isLogin, userId } = this.state

        return (
            <Wrapper>
                <LeftWrapper>
                    <Section />
                </LeftWrapper>
                <RightWrapper>
                    <Header />
                    <TodoInput 
                        todoInput={todoInput} 
                        onChangeTodoInput={this.onChangeTodoInput} 
                        postTodoInput={this.postTodoInput}
                        isDeadline={isDeadline}
                        setDeadline={this.setDeadline}
                        deleteDeadline={this.deleteDeadline}
                        showPleaseInputTodo={showPleaseInputTodo}
                        showCharacterLimit={showCharacterLimit}
                        userId={userId}
                    />
                    <Todos 
                        todoList={todoList} 
                        onClickCheckButton={this.onClickCheckButton}
                        showOnlyCompleted={showOnlyCompleted} 
                        showOnlyActive={showOnlyActive}
                        showSortedTodos={showSortedTodos}
                    />
                    <Footer 
                        onClickAll={this.onClickAll} 
                        onClickCompleted={this.onClickCompleted} 
                        onClickActive={this.onClickActive}
                        showOnlyCompleted={showOnlyCompleted} 
                        showOnlyActive={showOnlyActive} 
                        onClickDeleteButton={this.deleteCompletedTodo}
                        onClickSort={this.onClickSort}
                        showSortedTodos={showSortedTodos}
                        todoList={todoList}
                    />
                </RightWrapper>
            </Wrapper>
        )}

        private onChangeTodoInput = (value: string) => {
            this.setState({ todoInput: value })
        }

        private postTodoInput = (todoInput: string, date: Date | null, isDeadline: boolean, userId: number | null) => {
            if (todoInput.length === 0) {
                this.setState({ showPleaseInputTodo: true })
                this.setState({ showCharacterLimit: false })        
            }
            else if (todoInput.length >= 15) {
                this.setState({ showPleaseInputTodo: false })
                this.setState({ showCharacterLimit: true })
            }
            else {
                const todo = { title: todoInput, completed: false, deadline: isDeadline ? date : null, userId: userId }
                this.postTodo(todo)
                this.setState({ isDeadline: false })
                this.setState({ showPleaseInputTodo: false })
                this.setState({ showCharacterLimit: false })
            }
        }

        private onClickCheckButton = ({ id, completed, deadline }: { id?: number, completed: boolean, deadline: Date | null }) => {
            axios.patch(`http://localhost:3001/todos/${id}`, {completed: !completed, deadline: deadline })
            .then(() => {
                this.getTodoList()
            })
            .catch((data) =>{
                console.log(data)
            })
        }

        private onClickAll = () => {
            this.setState({ showOnlyActive: false, showOnlyCompleted: false })
        }
        
        private onClickCompleted = () => {
            this.setState({ showOnlyActive: false, showOnlyCompleted: true })
        }
        
        private onClickActive = () => {
            this.setState({ showOnlyActive: true, showOnlyCompleted: false })
        }

        private onClickSort = (showSortedTodos: boolean) => {
            this.setState({ showSortedTodos: !showSortedTodos })
        }

        private deleteCompletedTodo = (todoList: TodoType[]) => {
            todoList.forEach((todo) => {
                if (todo.completed) {
                    this.deleteTodo(todo.id)
                }
            })
        }

        private setDeadline = () => {
            this.setState({ isDeadline: true })
        }

        private deleteDeadline = () => {
            this.setState({ isDeadline: false })
        }
}

export default ToDoScreen