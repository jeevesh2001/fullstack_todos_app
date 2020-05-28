import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';
import './TodoList.css';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
		this.addTodo = this.addTodo.bind(this);
	}

	componentDidMount() {
		this.loadTodos();
	}

	async loadTodos() {
		const todos = await apiCalls.getTodos();
		this.setState({ todos });
	}

	async addTodo(val) {
		const newTodo = await apiCalls.createTodo(val);
		this.setState({ todos: [ ...this.state.todos, newTodo ] });
	}

	async deleteTodo(id) {
		await apiCalls.removeTodo(id);
		const todos = this.state.todos.filter((todo) => todo._id !== id);
		this.setState({ todos });
	}

	async toggleTodo(todo) {
		const updatedTodo = await apiCalls.updateTodo(todo);
		const todos = this.state.todos.map((t) => (t._id === updatedTodo._id ? { ...t, completed: !t.completed } : t));
		this.setState({ todos });
	}

	render() {
		const todos = this.state.todos.map((t) => (
			<TodoItem
				key={t._id}
				{...t}
				onDelete={this.deleteTodo.bind(this, t._id)}
				onToggle={this.toggleTodo.bind(this, t)}
			/>
		));
		return (
			<div>
				<header>
					<h1>
						todo<span>list</span>
					</h1>
					<h2>A simple todo list app built with React and Node</h2>
				</header>
				<TodoForm addTodo={this.addTodo} />
				<ul>{todos}</ul>
			</div>
		);
	}
}

export default TodoList;
