import { faArrowLeft, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TablesType } from "../vite-env"
import AddTable from "./AddTable"
import React from "react"

type Props = {
    Tables: TablesType
    setSelected: Function
    selectedTable: string | undefined
    createTable: Function
    archivate: Function
}

const checkTableExist = (Tables: TablesType, number: string)=>{
    let result : boolean = false

    for(const key in Tables) {
        if(Tables[key].number === Number(number)) {
            result = true
            break
        }
    }    
    return result
}

export default function TablesList({Tables, setSelected, selectedTable, createTable, archivate}: Props) {
    const [popUp, setPopUp] = React.useState<boolean>(false)
    
    const selectTable = (tableId:string)=>{
        setSelected(tableId)
    }
    
    const ListRender = ()=>{
        let JSX = Object.values(Tables).map(tabl=>{
            return tabl.state === "active" && <li 
                className={selectedTable && tabl._id === selectedTable ? "table-button active" : "table-button"} 
                key={Math.random()} 
                onClick={(e)=>{
                    let target = e.target as HTMLButtonElement
                    if(target.classList.contains("table-button")) selectTable(tabl._id)
                }}
            >
                <p>{tabl.number}</p>
                <button onClick={()=>{archivate(tabl._id, false)}}><FontAwesomeIcon icon={faTrash}/></button>
            </li>
        })

        return <ul className="tables-list">
            {JSX}
        </ul>
    }

    const handleCreateTable = (val: string)=>{
        if(!val || val === "" || checkTableExist(Tables, val)) return
        createTable(val)
        setPopUp(false)
    }
    const expand = (e: React.MouseEvent)=>{
        let sideBar = e.currentTarget.parentElement as HTMLDivElement
        sideBar.classList.toggle('expanded')
    }
    
  return <section className="sidebar">
    {popUp && <AddTable close={()=>{setPopUp(false)}} confirm={handleCreateTable}/>}
    <button className="expand-sidebar" onClick={expand}>
        <FontAwesomeIcon icon={faArrowLeft}/>
    </button>
    <button className="add-table-btn" onClick={()=>{setPopUp(true)}}><FontAwesomeIcon icon={faPlus}/></button>
    <hr/>
    <ListRender/>
  </section>
}