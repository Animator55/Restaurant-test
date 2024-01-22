/// <reference types="vite/client" />

export type TablesType = {
    [key: string] : Table
}

export type Table = {
    _id: string
    number: number,
    reservation: boolean,
    state: string,
    buys: Item[]
}


export type Item = {
    _id: string,
    amount?: number,
    price: number,
    name: string,
    type: string,
    tags?: string[]
}