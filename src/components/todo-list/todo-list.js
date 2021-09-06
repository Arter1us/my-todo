import React from 'react';
import TodoListItem from '../todo-list-item';

import './todo-list.css';

export default function TodoList({ todos, onDelete, onToggleImportant, onToggleDone }) {

    const elements = todos.map((item) => {

        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onDelete={() => onDelete(id)} />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">{elements}</ul>
    );
}