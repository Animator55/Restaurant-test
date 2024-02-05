import React from 'react'
import { Item, Table, pagesRouter } from '../vite-env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faBottleWater, faCookie, faDrumstickBite, faIceCream, faMartiniGlassCitrus, faMinus, faPen, faPlateWheat, faPlus, faSeedling, faWheatAlt, faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { products } from '../assets/products'
import EditItemPop from './EditItemPop'

type Props = {
    Table: Table | undefined
    editTable: Function
    pay: Function
}
type resRoute = {
    [key: number]: any
}

export default function TableBuys({Table, editTable, pay}: Props) {
    const [ProductPage, setProductPage] = React.useState("Entrada")
    const [editPopUp, setEditPopUp] = React.useState<number | undefined>(undefined)

    const pages: pagesRouter = {
        "Entrada": faCookie,
        "Montadito": faPlateWheat,
        "Principal": faDrumstickBite,
        "Postres": faIceCream,
        "Bebidas": faBottleWater,
        "Vinos": faWineBottle,
        "Tragos": faMartiniGlassCitrus,
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
            <button onClick={()=>{pay()}}>Cobrar</button>
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
        
        editTable("buys", newValue, item._id, add > 0)
    }

    const addItem = (item: Item)=>{
        if(Table === undefined) return
        let buyedItem: Item = {...item, amount: 1}
        let [results, index] = checkItemBuy(Table.buys, buyedItem._id)
        if(Table.buys.length !== 0 && results) changeAmount(Table.buys[index as number], index as number, 1)
        else {
            editTable("buys", [...Table.buys, buyedItem], buyedItem._id, true)
        }
    }

    const ProductList = ()=>{
        return <div>
            <nav className='table-buys-top'>
                <p></p>
                <p>Producto</p>
                <p>Uni.</p>
                <p>Precio</p>
            </nav>
            <div className='table-buys'>
                <ul>
                    {Table !== undefined && Table.buys.map((item, i)=>{
                        return <li className={checkEdited(item)} id={item._id} key={Math.random()}>
                            <button onClick={()=>{setEditPopUp(i)}}><FontAwesomeIcon icon={faPen}/></button>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            <p>{item.price}</p>
                            <div className='item-options'>
                                <button onClick={()=>{changeAmount(item, i, -1)}}><FontAwesomeIcon icon={faMinus}/></button>
                                <button onClick={()=>{changeAmount(item, i, 1)}}><FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                        </li>
                    })}
                </ul>
                <li className='table-buys-total' key={Math.random()}>
                    <p></p>
                    <p>Total</p>
                    <p></p>
                    <p>{calculateTotal()}</p>
                </li>
            </div>
        </div>
    }

    /*** */

    
    const editItem = (item: Item, input1:string, input2:string)=>{
        if(Table === undefined) return

        let res: resRoute = [checkItemBuy(Table.buys, item._id)]

        let results = res[0][0] as boolean
        let index = res[0][1] as number 

        let newPrice = input2 !== "" ? Number(input2) : Table.buys[index].price
        let newAmount = input1 !== "" ? Number(input1) : Table.buys[index].amount
        
        let splitedID = item._id.split(".")
        let newID = splitedID.length === 2 ? item._id + ".e" + `${Math.round(Math.random()*1000)}` : item._id
        
        let newBuys = [...Table.buys]
        if(results) {
            newBuys = Object.values({...Table.buys, [index]: {...item, _id: newID, amount: newAmount, price: newPrice}}) as Item[]
        }
        
        let changedPrice = Table.buys[index].price !== newPrice ? Table.buys[index].price +" > " + input2: ""
        let changedAmount = Table.buys[index].amount !== newAmount ? Table.buys[index].amount +" > " + input1: ""

        editTable("buys", newBuys, undefined, [[item.name, changedAmount + "/" + changedPrice]])
        setEditPopUp(undefined)
    }

    const checkEdited = (item: Item)=>{
        if(!item) return 'table-buys-item'
        let id = item._id.split(".")
        if(id.length === 3) return 'table-buys-item edited'
        return 'table-buys-item'
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
            <div className='product-paging'>
                <div className='product-picker' id='product-picker'>
                    {Table !== undefined && RenderProducts(ProductPage)}
                </div>
            </div>
        </section>
    }
    return <section className='table-display'>
        {editPopUp !== undefined && <EditItemPop item={Table?.buys[editPopUp]} close={()=>{setEditPopUp(undefined)}} confirm={editItem}/>}
        <div>
            <ProductList/>
            <TableTopBar/>
        </div>
        <ProductPicker/>
    </section>
}