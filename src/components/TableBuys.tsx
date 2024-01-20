import React from 'react'
import { Table } from '../vite-env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

type Props = {
    Table: Table | undefined
    editTable: Function
}

type pagesType = {
    [key: string] : any
}

export default function TableBuys({Table, editTable}: Props) {
    const [ProductPage, setProductPage] = React.useState("Entrada")

    const pages: pagesType = {
        "Entrada": <div>1</div>,
        "Principal": <div>2</div>,
        "Postres": <div>3</div>,
        "Bebida": <div>4</div>,
        "Cocktail": <div>5</div>,
    }

    const calculateTotal = ()=>{
        if(Table === undefined) return
        let array = Table.buys
        let total = 0
        for(let i=0; i < array.length; i++) {
            total += array[i].price
        }
        return total
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
                        <div className='item-options'>
                            <button onClick={()=>{console.log("add")}}><FontAwesomeIcon icon={faPlus}/></button>
                            <button onClick={()=>{console.log("sub")}}><FontAwesomeIcon icon={faMinus}/></button>
                        </div>
                    </li>
                })}
                <li className='table-buys-total' key={Math.random()}>
                    <p>Total</p>
                    <p></p>
                    <p>{calculateTotal()}</p>
                </li>
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
            <ProductList/>
            <TableTopBar/>
        </div>
        <ProductPicker/>
    </section>
}