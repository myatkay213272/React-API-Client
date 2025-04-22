import React, { useEffect, useState } from 'react'

const ProductList = ({category}) => {

    const [products,setProducts] = useState<string[]>([])

    useEffect(()=>{
        console.log('Fetching data',category)
        setProducts('Clothing','Household')
    },[category])

  return (
    <div>
        
       ProductList

    </div>
  )
}

export default ProductList