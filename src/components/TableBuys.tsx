import React from 'react'
import { Table } from '../vite-env'

type Props = {
    Table: Table | undefined
}

type pagesType = {
    [key: string] : any
}

export default function TableBuys({Table}: Props) {
    const [ProductPage, setProductPage] = React.useState("Entrada")

    const pages: pagesType = {
        "Entrada": <div>1</div>,
        "Principal": <div>2</div>,
        "Postres": <div>3</div>,
        "Bebida": <div>4</div>,
        "Cocktail": <div>5</div>,
    }

    const TableTopBar = ()=>{
        return <nav className='table-top'>
            <h4>{Table !== undefined && "Mesa " + Table.number}</h4>
            <button>Cobrar</button>
            <button>Cerrar</button>
            <button>Anular</button>
        </nav>
    }

    const ProductList = ()=>{
        return <div>
            <nav className='table-buys-top'>
                <p>Producto</p>
                <p>Unidades</p>
                <p>Precio</p>
            </nav>
            <ul className='table-buys'>
                {Table !== undefined && Table.buys.map(item=>{
                    return <li className='table-buys-item' key={Math.random()}>
                        <p>{item.name}</p>
                        <p>{item.amount}</p>
                        <p>{item.price}</p>
                    </li>
                })}
            </ul>
        </div>
    }

    const ProductPicker = ()=>{
        const Router = ()=>{
            return <nav className='picker-nav'>
                {Object.keys(pages).map(page=>{
                    return <button 
                        key={Math.random()}
                        className={ProductPage === page ? "active" : ""}
                        onClick={()=>{setProductPage(page)}}
                    >{page}</button>
                })}
            </nav>
        }
        return <section className='picker-section'>
            <Router/>
            <div className='product-picker'>
                {pages[ProductPage]}
            </div>
        </section>
    }
    return <section className='table-display'>
        <div>
            <TableTopBar/>
            <ProductList/>
        </div>
        <ProductPicker/>
    </section>
}