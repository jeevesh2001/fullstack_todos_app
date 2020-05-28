import React from 'react';
import './TodoItem.css';

const TodoItem = ({ name, completed, onDelete, onToggle }) => (
	<ul className="list">
		<li className="task">
			<span
				style={{
					textDecoration: completed ? 'line-through' : 'none',
					color: completed ? '#bdc3c7' : '#34495e'
				}}
				onClick={onToggle}
			>
				{name}
			</span>

			<span onClick={onDelete} id="delete-button">
				X
			</span>
		</li>
	</ul>
);

export default TodoItem;
