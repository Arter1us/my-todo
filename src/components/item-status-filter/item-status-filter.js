import React from 'react';

import './item-status-filter.css';

export default function ItemStatusFilter({ filtered, onFilterChange }) {

    const allButtons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ];

    const buttons = allButtons.map(({ name, label }) => {
        const isActive = filtered === name;
        const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';
        return (
            <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => onFilterChange(name)} >{label}</button >
        );
    });

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
}