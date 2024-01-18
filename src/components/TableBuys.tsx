import { Table } from '../vite-env'

type Props = {
    Table: Table | undefined
}

export default function TableBuys({Table}: Props) {
    const TableTopBar = ()=>{
        return <nav>
            <button>Cobrar</button>
            <button>Cerrar</button>
            <button>Anular</button>
        </nav>
    }

    const ProductList = ()=>{
        return <div>
            <nav>
                <p>Producto</p>
                <p>Cantidad</p>
                <p>Precio</p>
            </nav>
            <ul>
                {Table !== undefined && Table.buys.map(item=>{
                    return <li>
                        <p>{item.name}</p>
                        <p>{item.amount}</p>
                        <p>{item.price}</p>
                    </li>
                })}
            </ul>
        </div>
    }
    return <section>
        <TableTopBar/>
        <ProductList/>
    </section>
}