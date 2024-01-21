import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TablesType } from "../vite-env"

type Props = {
    Tables: TablesType
    setTables: Function
    setSelected: Function
    createTable: Function
}

export default function TablesList({Tables, setTables, setSelected, createTable}: Props) {
    const selectTable = (tableId:string)=>{
        setSelected(tableId)
    }
    
    const ListRender = ()=>{
        let JSX = Object.values(Tables).map(tabl=>{
            return <li className="table-button" key={Math.random()} onClick={()=>{selectTable(tabl._id)}}>
                <p>{tabl.number}</p>
            </li>
        })

        return <ul className="tables-list">
            {JSX}
        </ul>
    }
  return <section className="sidebar">
    <button className="expand-sidebar" onClick={()=>{console.log("expand")}}><FontAwesomeIcon icon={faArrowLeft}/></button>
    <button className="add-table-btn" onClick={()=>{createTable()}}><FontAwesomeIcon icon={faPlus}/></button>
    <hr/>
    <ListRender/>
  </section>
}