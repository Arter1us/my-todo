import React, { useState } from 'react';

import './search-panel.css';

export default function SearchPanel({ onSearchChange }) {

    const [term, setTerm] = useState('');

    const onChange = (e) => {
        const term = e.target.value;
        setTerm(term);
        onSearchChange(term);
    }

    return (
        <input
            type="text"
            placeholder="type to search"
            className="form-control search-panel"
            value={term}
            onChange={onChange} />);
}