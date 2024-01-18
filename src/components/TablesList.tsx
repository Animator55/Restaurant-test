import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TablesType } from "../vite-env"

type Props = {
    Tables: TablesType
    setTables: Function
    setSelected: Function
}

export default function TablesList({Tables, setTables, setSelected}: Props) {
    const selectTable = (tableId:string)=>{
        setSelected(tableId)
    }
    
    const ListRender = ()=>{
        let JSX = Object.values(Tables).map(tabl=>{
            return <li className="table-button" onClick={()=>{selectTable(tabl._id)}}>
                <p>{tabl.number}</p>
            </li>
        })

        return <ul className="tables-list">
            {JSX}
        </ul>
    }
  return <section className="sidebar">
    <button className="add-table-btn" onClick={()=>{console.log("create")}}><FontAwesomeIcon icon={faPlus}/></button>
    <ListRender/>
  </section>
}