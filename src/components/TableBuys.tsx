import React from 'react'
import { Item, Table } from '../vite-env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faBottleWater, faCookie, faDrumstickBite, faIceCream, faMartiniGlassCitrus, faMinus, faPlus, faSeedling, faWheatAlt } from '@fortawesome/free-solid-svg-icons'
import { products } from '../assets/products'

type Props = {
    Table: Table | undefined
    editTable: Function
    changedAmountId: Function
}

export default function TableBuys({Table, editTable, changedAmountId}: Props) {
    const [ProductPage, setProductPage] = React.useState("Entrada")

    const pages = {
        "Entrada": faCookie,
        "Principal": faDrumstickBite,
        "Postres": faIceCream,
        "Bebida": faBottleWater,
        "Cocktail": faMartiniGlassCitrus,
    }

    const calculateTotal = ()=>{
        if(Table === undefined) return
        let array = Table.buys
        let total = 0
        for(let i=0; i < array.length; i++) {
            total += array[i].price * array[i].amount!
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
    
    const checkItemBuy = (buys: Item[], id: string)=>{
        let index = 0
        let boolean = false
        for(let i=0; i<buys.length;i++) {
            if(buys[i]._id === id) {
                index = i
                boolean = true
                break
            }
        }

        return [boolean, index]
    }

    const changeAmount = (item: Item, index: number, add: number)=>{
        if(Table === undefined || Table.buys.length === 0 || !item.amount) return
        let newAmount = item.amount + add
        
        //delete if amount is 0
        let newValue = newAmount !== 0 ?  
        Object.values({...Table.buys, [index]: {...item, amount: newAmount}}) 
        : Table.buys.filter((item, i)=>{
            if(i !== index) return item
        })
        
        changedAmountId(item._id)
        editTable("buys", newValue)
    }

    const addItem = (item: Item)=>{
        if(Table === undefined) return
        let buyedItem: Item = {...item, amount: 1}
        let [results, index] = checkItemBuy(Table.buys, buyedItem._id)
        if(Table.buys.length !== 0 && results) changeAmount(Table.buys[index as number], index as number, 1)
        else {
            changedAmountId(buyedItem._id)
            editTable("buys", [...Table.buys, buyedItem])
        }
    }

    const ProductList = ()=>{
        return <div>
            <nav className='table-buys-top'>
                <p>Producto</p>
                <p>Unidades</p>
                <p>Precio</p>
            </nav>
            <div className='table-buys'>
                <ul>
                    {Table !== undefined && Table.buys.map((item, i)=>{
                        return <li className='table-buys-item' id={item._id} key={Math.random()}>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.price}</p>
                            <div className='item-options'>
                                <button onClick={()=>{changeAmount(item, i, 1)}}><FontAwesomeIcon icon={faPlus}/></button>
                                <button onClick={()=>{changeAmount(item, i, -1)}}><FontAwesomeIcon icon={faMinus}/></button>
                            </div>
                        </li>
                    })}
                </ul>
                <li className='table-buys-total' key={Math.random()}>
                    <p>Total</p>
                    <p></p>
                    <p>{calculateTotal()}</p>
                </li>
            </div>
        </div>
    }

    const RenderProducts = (page: string)=>{
        return products[page].map(item=>{
            return <div
                key={Math.random()}
                onClick={()=>{addItem(item)}}
                className='pickeable-item'
            >
                <FontAwesomeIcon icon={faArrowCircleLeft}/>
                <p>{item.name}</p>
                {item.tags !== undefined && item.tags.includes("vegan") && <FontAwesomeIcon icon={faSeedling}/>}
                {item.tags !== undefined && item.tags.includes("no-tacc") && <FontAwesomeIcon icon={faWheatAlt}/>}
                <p>${item.price}</p>
            </div>
        })
    }

    const ProductPicker = ()=>{
        const Router = ()=>{
            return <nav className='picker-nav'>
                {Object.keys(pages).map(page=>{
                    return <button 
                        key={Math.random()}
                        className={ProductPage === page ? "active" : ""}
                        onClick={()=>{setProductPage(page)}}
                    >
                        <FontAwesomeIcon icon={pages[page]}/>
                        <p>{page}</p>
                    </button>
                })}
            </nav>
        }
        return <section className='picker-section'>
            <Router/>
            <div className='product-picker'>
                {Table !== undefined && RenderProducts(ProductPage)}
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