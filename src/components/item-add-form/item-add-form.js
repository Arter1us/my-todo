import React, { useState } from 'react';

import './item-add-form.css';

export default function ItemAddForm({ onItemAdded }) {

    const [label, setLabel] = useState('');

    function onLabelChange(e) {
        setLabel((label) => {
            return (label = e.target.value);
        })
    };

    function onSubmit(e) {
        e.preventDefault();
        onItemAdded(label);
        setLabel((label) => {
            return (label = '');
        })
    }

    return (
        <form className="item-add-form d-flex"
            onSubmit={onSubmit}>
            <input type="text"
                placeholder="What needs to be done?"
                className="form-control new-todo-label"
                onChange={onLabelChange}
                value={label} />
            <button type="submit" className="btn btn-outline-secondary">Add Item</button>
        </form>
    );
}