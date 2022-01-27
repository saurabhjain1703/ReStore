

import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";


export default function Catalog() {

    const [products,setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://localhost:7081/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  },[])
      
    return(
        <>
        <ProductList products={products}/>
        </>
    )
}
