import React from 'react'
import './DashBoard.css'

const DashBoard = () => {
    return (
        <div>
            <h1>Dashboard Component</h1>
            <ul>
                <li>
                    <a href='/'>Search Input</a>
                    <a href='/'>Friends/AddressBook</a>
                    <a href='/'>Updates</a>
                </li>
            </ul>
        </div>
    )
}

export default DashBoard
