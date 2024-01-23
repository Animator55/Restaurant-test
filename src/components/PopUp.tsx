import React from 'react'

type Props = {
    close: Function
    confirm: Function
}

export default function PopUp({close, confirm}: Props) {
    const input = React.useRef<null | HTMLInputElement>(null)
    React.useEffect(()=>{
        if(input !== null && input.current !== null) input.current.focus()
        document.addEventListener("keydown", (e)=>{
            if(e.key === "Escape") close()  
        })
    }, [])

    const submit = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter" && input.current) confirm(input.current.value)
    }
    
    return <div className='pop-background'>
        <div className='pop'>
            <h2>Añadir mesa</h2>
            <input ref={input} type='number' onKeyDown={submit} placeholder='Número de mesa'/>
            <button onClick={()=>{
                if(input.current) confirm(input.current.value)
            }}></button>
        </div>
    </div>
    }