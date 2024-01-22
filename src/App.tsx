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
        _id: "e.000",
        name: "Tortilla de Papa",
        price: 3900,
        type: "Entrada",
        amount: 1
      },
      {
          _id: "e.001",
          name: "Aranccini de hongos",
          price: 4500,
          amount: 2,
          type: "Entrada"
      },
      {
        _id: "b.001",
        amount: 3,
        price: 700,
        name: "Agua s/g",
        type: "Bebidas"
      },
    ]
  }
}

let lastChange: string | undefined

export default function App() {
  const [Tables, setTables] = React.useState(defaultTables)
  const [selectedTable, setSelected] = React.useState<string | undefined>()
  
  const editTable = (key: string, value: any)=>{
    if(selectedTable === undefined) return

    setTables({...Tables, [selectedTable]: {...Tables[selectedTable], [key] : value}})
  }

  const createTable = ()=>{
    let id = `${Math.random()*Math.random()}`
    let initial = {
      _id: id,
      number: Math.round(Math.random()*100),
      reservation: false,
      state: "active",
      buys: []
    }

    setTables({...Tables, [id]: initial})
    setSelected(id)
  }

  const changedAmountId = (id:string)=>{
    lastChange = id
  }

  React.useEffect(()=>{
    if(lastChange === undefined) return

    let item = document.getElementById(lastChange)
    lastChange = undefined
    if(!item) return
    let ul = item.parentElement
    item.classList.add('change-amount')
    if(!ul) return
    ul.scrollTo({left: 0, top: item.offsetTop})
    setTimeout(()=>{
      if(!item) return
      item.classList.remove('change-amount')
    },300)
  }, [Tables])

  return <main>
    <section className='content'>
      <section className='sub-content'>
        <TopBar/>
        <TableBuys changedAmountId={changedAmountId} editTable={editTable} Table={selectedTable !== undefined ? Tables[selectedTable] : undefined}/>
      </section>
      <TablesList Tables={Tables} setTables={setTables} setSelected={setSelected} selectedTable={selectedTable} createTable={createTable} />
    </section>
  </main>
}
