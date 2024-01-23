import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TablesType } from "../vite-env"
import PopUp from "./PopUp"
import React from "react"

type Props = {
    Tables: TablesType
    setTables: Function
    setSelected: Function
    selectedTable: string | undefined
    createTable: Function
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

export default function TablesList({Tables, setTables, setSelected, selectedTable, createTable}: Props) {
    const [popUp, setPopUp] = React.useState<boolean>(false)
    
    const selectTable = (tableId:string)=>{
        setSelected(tableId)
    }
    
    const ListRender = ()=>{
        let JSX = Object.values(Tables).map(tabl=>{
            return <li 
                className={selectedTable && tabl._id === selectedTable ? "table-button active" : "table-button"} 
                key={Math.random()} 
                onClick={()=>{selectTable(tabl._id)}}
            >
                <p>{tabl.number}</p>
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
    
  return <section className="sidebar">
    {popUp && <PopUp close={()=>{setPopUp(false)}} confirm={handleCreateTable}/>}
    <button className="expand-sidebar" onClick={()=>{console.log("expand")}}><FontAwesomeIcon icon={faArrowLeft}/></button>
    <button className="add-table-btn" onClick={()=>{setPopUp(true)}}><FontAwesomeIcon icon={faPlus}/></button>
    <hr/>
    <ListRender/>
  </section>
}