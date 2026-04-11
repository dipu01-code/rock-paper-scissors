import { useState } from 'react'

const fruits = ['apple', 'banana', 'orange']

export default function ShowText() {
    const [name, setName] = useState('')

    const filteredFruits = fruits.filter((item) =>
        item.toLowerCase().includes(name.toLowerCase()),
    )

    return (
        <div>
            <h1>Forms Part 2</h1>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            {name && filteredFruits.map((item) => <p key={item}>{item}</p>)}
        </div>
    )
}