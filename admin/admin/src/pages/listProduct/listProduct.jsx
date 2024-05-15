import React, { useEffect, useState } from 'react'
import './listProduct.css'
import { url } from '../../components/config'
import axios from 'axios'
import { toast } from 'react-toastify'

const listProduct = () => {
  const [list,setList] = useState([])

  const fetchProducts= async() => {
    try {
      const response = await axios.get(`${url}/api/food/getFoods`)
      console.log(response);
        if (response.request.status===200) {
          setList(response)
          
        }else {
          console.log("something went wrong")
        }  

    } catch (error) {
      console.log(error); 
    }
  
  }
  const deleteFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/deleteFood`, {
        id: foodId,
      });
      await fetchProducts();
      if (response.request.status === 200) {
        toast.success("Food deleted successfully");
      } else {
        toast.error("Food could not delete");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    fetchProducts()
  },[])
  return (
    <>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {!list ? (
            <h1>Something went wrong</h1>
          ) : list.length === 0 ? (
            <p>List is empty</p>
          ) : (
            list.data.map((item, index) => {
              return (
                <div key={index} className="list-table-format">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p onClick={()=> deleteFood(item._id)} className='cursor'>X</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default listProduct