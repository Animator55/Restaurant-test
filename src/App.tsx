import React from 'react'
import './assets/App.css'
import TablesList from './components/TablesList'
import TableBuys from './components/TableBuys'
import { TablesType } from './vite-env'
import TopBar from './components/TopBar'

const defaultTables: TablesType = {
  "00001": {
    _id: "00001",
    number: 1,
    reservation: false,
    state: "active",
    buys: [
      {
        _id: "p.00001",
        amount: 2,
        price: 1000,
        name: "Example",
        type: "food"
      },
      {
        _id: "p.00002",
        amount: 1,
        price: 500,
        name: "Example 2",
        type: "drink"
      },
    ]
  }
}

export default function App() {
  const [Tables, setTables] = React.useState(defaultTables)
  const [selectedTable, setSelected] = React.useState()
  
  return <main>
    <TopBar/>
    <section className='content'>
      <TableBuys Table={selectedTable}/>
      <TablesList Tables={Tables} setTables={setTables} setSelected={setSelected} />
    </section>
  </main>
}
