import React from 'react'

const ItemList = ({ items }) => {
    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ItemList
