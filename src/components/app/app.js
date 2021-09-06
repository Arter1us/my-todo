import React, { useState } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default function App() {

    let maxId = 100;

    const [todoData, setTodoData] = useState([
        createTodoItem('Drink Coffee'),
        createTodoItem('Make Awesome App'),
        createTodoItem('Have a lunch')
    ]);
    const [term, setTerm] = useState('');
    const [filtered, setFiltered] = useState('all');

    function createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: maxId++
        }
    };

    const deleteItem = (id) => {
        setTodoData((todoData) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return (todoData = newArray);
        });
    };

    const addItem = (text) => {
        setTodoData((todoData) => {
            const newItem = createTodoItem(text);
            const newArr = [
                ...todoData,
                newItem
            ];
            return (todoData = newArr);
        });
    };

    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }
        const newArray = [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

        return (arr = newArray);
    };

    const onToggleImportant = (id) => {
        setTodoData((todoData) => {
            return (
                todoData = toggleProperty(todoData, id, 'important')
            );
        });
    };

    const onToggleDone = (id) => {
        setTodoData((todoData) => {
            return (
                todoData = toggleProperty(todoData, id, 'done')
            );
        });
    };

    const onSearchChange = (term) => {
        setTerm(term);
    };

    const onFilterChange = (filtered) => {
        setFiltered(filtered);
    };

    const search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    const filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    const doneCount = todoData.filter((el) => el.done).length;
    const toDoCount = todoData.length - doneCount;
    const visibleItems = filter(search(todoData, term), filtered);

    return (
        <div className="todo-app">
            <AppHeader toDo={toDoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel onSearchChange={onSearchChange} />
                <ItemStatusFilter filtered={filtered}
                    onFilterChange={onFilterChange} />
            </div>
            <TodoList todos={visibleItems}
                onDelete={deleteItem}
                onToggleImportant={onToggleImportant}
                onToggleDone={onToggleDone} />
            <ItemAddForm onItemAdded={addItem} />
        </div>
    );
}