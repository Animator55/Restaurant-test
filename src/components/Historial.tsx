import React from 'react'
import { TablesType } from '../vite-env'

type Props = {
    Tables: TablesType
}

export default function Historial({ Tables }: Props) {
    const [openTable, setOpenTable] = React.useState<string | undefined>()

    return (
        <div>
            {Object.values(Tables).map(table => {
                return <div key={Math.random()} onClick={() => { setOpenTable(table._id) }}>
                    <div className='state'></div>
                    <h3>{table.number}</h3>
                </div>
            })}
        </div>
    )
}