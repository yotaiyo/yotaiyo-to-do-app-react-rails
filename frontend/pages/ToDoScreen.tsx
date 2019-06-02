import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

type ToDoScreenProps = {}

interface Todos {
    title: string
}

type ToDoScreenState = {
    todoInput: string
    todos: Todos[]
}

const Wrapper = styled.div``

const TextInput = styled.input``

const AddButton = styled.div`` 

class ToDoScreen extends React.Component<ToDoScreenProps, ToDoScreenState> {
    constructor(props: any) {
        super(props)
        this.state = {
          todoInput: '',
          todos: []
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
            const todos = this.state.todos
             todos.push({ title: todoInput })
            this.setState({ todos })
            this.setState({ todoInput: '' })
        })
        .catch((data) => {
            console.log(data)
        })
    }

    render() {
        const { todoInput, todos } = this.state 

    return (
        <Wrapper>
            <TextInput 
                type="text"
                placeholder='ToDOを入力して下さい'
                value={this.state.todoInput}
                onChange={e => this.onChangeText(e.target.value)}
            />
            <AddButton 
                onClick={() => this.onClickAddButton(todoInput)}
            >
                Add
            </AddButton>
        </Wrapper>
    )}
}

export default ToDoScreen