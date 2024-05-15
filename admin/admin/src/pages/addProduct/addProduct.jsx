import React, { useState } from 'react'
import './addProduct.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { url } from '../../components/config'

const addProduct = () => {
 
  const [image,setImage] = useState(false)
  // this is the default option of the add items page
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Rolls"
  })

  const onChangeHandler = (e) => {
    const name= e.target.name;
    const value=e.target.value;
    setData(prevData=> ({...prevData,[name]:value}))
  }
  // this is for checking if its working (import useEffect)
  // useEffect(() => {
  //   console.log(data);
  // },[data])

   const onSubmitHandler = async (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append("name", data.name);
     formData.append("description", data.description);
     formData.append("price", Number(data.price));
     formData.append("category", data.category);
     formData.append("image", image);
     try {
       const response = await axios.post(`${url}/api/food/add`, formData);
       console.log(response);
       if (response.request.status === 200) {
         setData({
           name: "",
           description: "",
           price: "",
           category: "Rolls",
         });
         setImage(false);
         toast.success("Food added successfully");
       } else {
         toast.error("Something went wrong");
       }
     } catch (error) {
       toast.error("Something went wrong");
     }
   };

  return (
    <div className='add'>
      <form className='flex-col'onSubmit={onSubmitHandler} >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {/* this is how we display the uploaded image file in the client side. */}
            <img src={image? URL.createObjectURL(image) :assets.upload_area} alt="" />
          </label>
          {/* this is how we catch the uploaded file. */}
          <input onChange={(e) => setImage(e.target.files[0]) } type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here..' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} type="text" name="description" rows="6" placeholder='Type here..' required/>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default addProduct