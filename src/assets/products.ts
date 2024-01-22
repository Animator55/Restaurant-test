import { Item } from "../vite-env"

type productsType = {
    [key:string] : Item[]
}

export const products: productsType = {
    "Entrada": [
        {
            _id: "e.000",
            name: "Tortilla de Papa",
            price: 3900,
            type: "Entrada",
            tags: ["vegan", "no-tacc"]
        },
        {
            _id: "e.001",
            name: "Aranccini de hongos",
            price: 4500,
            type: "Entrada",
            tags: ["vegan", "no-tacc"]
        },
        {
            _id: "e.002",
            name: "Portobellos rellenos",
            price: 4200,
            type: "Entrada",
            tags: ["vegan", "no-tacc"]
        },
        {
            _id: "e.003",
            name: "Sang. Mila de Tofu",
            price: 5000,
            type: "Entrada",
            tags: ["vegan", "no-tacc"]
        },
        {
            _id: "e.004",
            name: "Picada X2",
            price: 5200,
            type: "Entrada"
        },
        {
            _id: "e.005",
            name: "Empanadas de Osobuco X2",
            price: 1800,
            type: "Entrada"
        },
        {
            _id: "e.006",
            name: "Sang. Mila de Lomo",
            price: 4000,
            type: "Entrada"
        },
        {
            _id: "e.007",
            name: "Bao Bun",
            price: 4600,
            type: "Entrada"
        },
        {
            _id: "e.008",
            name: "Mont. Pera",
            price: 4200,
            type: "Entrada",
            tags: ["vegan"]
        },
        {
            _id: "e.009",
            name: "Mont. Tomate",
            price: 4200,
            type: "Entrada",
            tags: ["vegan"]
        },
        {
            _id: "e.010",
            name: "Mont. Jamón",
            price: 4200,
            type: "Entrada"
        },
        {
            _id: "e.011",
            name: "Mont. Brie",
            price: 4200,
            type: "Entrada"
        },
    ],
    "Principal": [
        {
            _id: "p.000",
            name: "Ojo de Bife",
            price: 9600,
            type: "Principal"
        },
        {
            _id: "p.001",
            name: "Tapa braseada",
            price: 9800,
            type: "Principal"
        },
        {
            _id: "p.002",
            name: "Ribs BBQ",
            price: 9000,
            type: "Principal"
        },
        {
            _id: "p.003",
            name: "Pesca del Día",
            price: 9000,
            type: "Principal"
        },
        {
            _id: "p.004",
            name: "Sartén de Frutos",
            price: 8000,
            type: "Principal"
        },
        {
            _id: "p.005",
            name: "Ñoquis",
            price: 5900,
            type: "Principal"
        },
    ],
    "Postres": [
        {
            _id: "d.000",
            name: "Volcán de Chocolate",
            price: 4500,
            type: "Postres"
        },
        {
            _id: "d.001",
            name: "Flan Mixto",
            price: 2500,
            type: "Postres"
        },
        {
            _id: "d.002",
            name: "Nougat",
            price: 3500,
            type: "Postres"
        },
        {
            _id: "d.003",
            name: "Panqueque",
            price: 2900,
            type: "Postres"
        },
    ],
    "Bebida": [
        {
          _id: "b.000",
          price: 700,
          name: "Agua c/g",
          type: "Bebidas"
        },
        {
          _id: "b.001",
          price: 700,
          name: "Agua s/g",
          type: "Bebidas"
        },
    ],
    "Cocktail": [
        {
            _id: "",
            name: "",
            price: 0,
            type: ""
        }
    ],
}