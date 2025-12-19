import ProductCard from './ProductCard';
import {useState,useEffect}  from "react";
import React from 'react';
import {Link} from 'react-router-dom'; 


function ProductGrid({ products }) {

  const [data,setData]=useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch('http://localhost:5104/api/posts');
        const jsonData=await response.json();
        setData(jsonData);
        console.log(jsonData);
      }catch(error){
        console.error('Error fetching products:',error);
      }    };
    fetchData();
  },);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(product => (
        <Link to={`/product-details/${product.postId}`} key={product.postIdd}>
                  <ProductCard key={product.postId} product={product} />
          </Link> 
      ))}
    </div>
  );
}

export default ProductGrid;
