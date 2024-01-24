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
    historial: [],
    buys: []
  }
}

let lastChange: string | undefined

export default function App() {
  const [Tables, setTables] = React.useState(defaultTables)
  const [selectedTable, setSelected] = React.useState<string | undefined>()
  
  const editTable = (key: string, value: any, id: string, change: boolean)=>{
    if(selectedTable === undefined) return

    lastChange = id

    let historial = Tables[selectedTable].historial 
    if(key === "buys") {
      const d = new Date()
      let histBuy = {
        _id: id, change: change ? "+1" : "-1", timestamp: d.getHours() +":"+d.getMinutes()
      }
      historial = historial.length === 0 ? [histBuy]:[...historial, histBuy]
    }

    setTables({...Tables, [selectedTable]: {...Tables[selectedTable], [key] : value, historial: historial}})
  }

  const createTable = (val: string)=>{
    let id = `${Math.random()*Math.random()}`
    let initial = {
      _id: id,
      number: Number(val),
      reservation: false,
      state: "active",
      buys: [],
      historial: [],
    }

    setTables({...Tables, [id]: initial})
    setSelected(id)
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
        <TableBuys editTable={editTable} Table={selectedTable !== undefined ? Tables[selectedTable] : undefined}/>
      </section>
      <TablesList Tables={Tables} setTables={setTables} setSelected={setSelected} selectedTable={selectedTable} createTable={createTable} />
    </section>
  </main>
}
