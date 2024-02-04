import React from 'react'
import './assets/App.css'
import TablesList from './components/TablesList'
import TableBuys from './components/TableBuys'
import { TablesType } from './vite-env'
import TopBar from './components/TopBar'
import LoadingPop from './components/LoadingPop'

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
  const [popUp, setPopUp] = React.useState<boolean>(false)
  const [loading, setloading] = React.useState<string>("")
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


  const createTable = (val: string)=>{
    let id = `${Math.random()*Math.random()}`
    const d = new Date()
    let initial = {
      _id: id,
      number: Number(val),
      reservation: false,
      state: "active",
      buys: [],
      historial: [
        {change: [["Creada la mesa", val]], timestamp: d.getHours() +":"+(d.getMinutes() > 10 ? "" : "0") +d.getMinutes()}
      ],
    }
    setTables({...Tables, [id]: initial})
    setSelected(id)
  }

  const save = ()=>{
    let storage = window.localStorage
    for(const id in Tables) {
      let value = JSON.stringify(Tables[id])
      storage.setItem(id, value);
    }
    setloading("guardar")
  }
  const archivate = (id: string, boolean: boolean)=>{
    setTables({...Tables, [id]: {...Tables[id], state: boolean ? "active":"deleted"}})
  }
  
  const pay = ()=>{
    if(!selectedTable || Tables[selectedTable].buys.length === 0) return

    let result = {}
    let total = 0
    let table = Tables[selectedTable].buys
    for(let i=0; i<table.length; i++) {
      total += table[i].price * table[i].amount!
      let amount = table[i].amount === 1 ? "" : "(" +table[i].amount + " X "
      let subtotal = table[i].amount === 1 ? "" : ") $"+ table[i].amount! * table[i].price 
      result = {...result, [table[i].name] : amount +"$" + table[i].price + subtotal}
    }

    result = {...result, Total: `$${total}`, "Mesa": Tables[selectedTable].number}

    setDisplay(result)
  }


  return <main id='main'>
    <section className='content'>
      <section className='sub-content'>
        {loading !== "" && <LoadingPop objetive={loading} close={()=>{setloading("")}}/>}
        <TopBar 
          save={save} 
          clear={()=>{
            window.localStorage.clear()
            setloading("borrar")
          }}
          results={()=>{}}
        />
        <TableBuys editTable={editTable} Table={selectedTable !== undefined ? Tables[selectedTable] : undefined}/>
      </section>
      <TablesList Tables={Tables} setSelected={setSelected} selectedTable={selectedTable} createTable={createTable} />
    </section>
  </main>
}
