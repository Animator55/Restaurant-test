import { faExpand, faList, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons/faFloppyDisk"
import { faListCheck } from "@fortawesome/free-solid-svg-icons/faListCheck"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical"

type Props = {
  save: Function
  clear: Function
  results: Function
}

export default function TopBar({save, clear, results}: Props) {
  const fullscreen = ()=>{
    let elem = document.getElementById('main')
    if(!elem) return
    if(elem.requestFullscreen) elem.requestFullscreen()
  }
  const Span = ()=>{
    const openSpan = (e: React.MouseEvent)=>{
      let span = e.currentTarget.nextElementSibling as HTMLSpanElement
      span.classList.toggle("expanded")
    }
    const blurSpan = (e: React.FocusEvent)=>{
      let span = e.currentTarget.nextElementSibling as HTMLSpanElement
      setTimeout(()=>{
        span.classList.remove("expanded")
      }, 100)
    }

    return <div className="span-wrap">
      <button className="expander" onClick={openSpan} onBlur={blurSpan}>
        <FontAwesomeIcon icon={faEllipsisVertical}/>
      </button>

      <span className="top-span">
        <button onClick={()=>{save()}}>
          <FontAwesomeIcon icon={faFloppyDisk}/>
          <p>Guardar</p>
        </button>
        <button onClick={()=>{clear()}}>
          <FontAwesomeIcon icon={faWarning}/>
          <p>Borrar datos</p>
        </button>

        <button onClick={()=>{fullscreen()}}>
          <FontAwesomeIcon icon={faExpand}/>
          <p>Fullscreen</p>
        </button>
        <button onClick={()=>{results()}}>
          <FontAwesomeIcon icon={faListCheck}/>
          <p>Resultados</p>
        </button>
      </span>
    </div>
  }
  return <nav className="topbar">
    <button>
      <FontAwesomeIcon icon={faList}/>
    </button>
    <Span/>
  </nav>
}