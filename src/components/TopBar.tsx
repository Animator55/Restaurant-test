import { faDatabase, faList, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = {
  closeAll: Function
}

export default function TopBar({closeAll}: Props) {
  const [pop, setPop] = React.useState<boolean>(false)

  const ClosePopUp = ()=>{
    return <section className="pop-background">
      <div className="pop">
        <h2>Cerrar Registro</h2>
        <hr/>
        <div>
          <button onClick={()=>{closeAll(true)}}>Guardar y cerrar</button>
          <button onClick={()=>{closeAll(false)}}>No guardar y cerrar</button>
          <button onClick={()=>{setPop(false)}}>Cancelar</button>
        </div>
      </div>
    </section>
  }
  return <nav className="topbar">
    {pop && <ClosePopUp/>}
    <button onClick={()=>{}}>
      <FontAwesomeIcon icon={faList}/>
    </button>
    <button onClick={()=>{setPop(true)}}>
      <FontAwesomeIcon icon={faXmark}/>
    </button>
    <button onClick={()=>{}}>
      <FontAwesomeIcon icon={faDatabase}/>
    </button>
  </nav>
}