import axios from "axios";
import EnquiryList from "./EnquiryList";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './App.css'



import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Enquiry() {
  const[enquiryList,setEnquiryList]=useState([])
  const[formData,setFormData]=useState({
    name:"",
    email:"",
    phone:"",
    message:"",
    _id:""
  })
  const saveEnquiry=(e)=>{
    e.preventDefault();
      
    if(formData._id){
       axios.put(`http://localhost:8020/website/api/update/${formData._id}`,formData)
       .then((res)=>{
        toast.success("Enquiry update successfully")
        setFormData({
              name:"",
              email:"",
              phone:"",
              message:"",
              _id:""

        })
        getAllenquiry()
       })
    }else{
          axios.post(`http://localhost:8020/website/api/insert`,formData)
    .then((res)=>{
      console.log(res.data)
    toast.success("Enquiry form saved Successfully")
      setFormData({
    name:"",
    email:"",
    phone:"",
    message:"",
  })
      getAllenquiry();
    }).catch((err)=>{
      console.error("error" , err)
    })
  }}
  let getValue=(e)=>{
    let inputName = e.target.name
    let inputValue = e.target.value
    let oldData ={...formData}
    oldData[inputName]=inputValue
    setFormData(oldData)
  }
  let getAllenquiry=()=>{
   axios.get(`http://localhost:8020/website/api/view`)
   .then((res)=>{
    return res.data
   })
   .then((finalData)=>{
    if(finalData.status){
      setEnquiryList(finalData.enquirylist)
    }
   })
  }
  useEffect(()=>{
    getAllenquiry();
  },[])
  return (
    <div>
      <h1 className="text-2xl text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] space-x-5 ">
        <div  className="bg-gray-50 p-5 ml-6 rounded shadow-lg mb-4 h-full ">
          <h2 className='text-2xl font-bold '>Enquiry Form</h2>
          <form onSubmit={saveEnquiry}>
          <div className='py-2'>
          <label htmlFor='name' value="Your Name"> Name</label>
          <input type='text' id='name'  name="name"  value={formData.name} onChange={getValue}  className="w-full p-3 border border-gray-300 rounded-md" placeholder='Enter Your Name'/>
          </div>
           <div >
          <label htmlFor='email' value="Your email">Email</label>
          <input type='text' id='email' name="email" value={formData.email} onChange={getValue} className="w-full p-3 border border-gray-300 rounded-md" placeholder='Enter Your Email'/>
          </div>
          <div className='py-2'>
          <label htmlFor='phone' value="Your phone">Phone</label>
          <input type='text' id='phone' name="phone"  value={formData.phone} onChange={getValue} className="w-full p-3 border border-gray-300 rounded-md" placeholder='Enter Your Phone'/>
          </div>
          <div className='py-2'>
            <label htmlFor="message" value="Your message">Message</label>
            <textarea id='message' name="message" value={formData.message} onChange={getValue}  className='w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <button type='submit' className='bg-blue-800 border-black text-white p-2 rounded-md w-full'>
            {formData._id ?'Update':'save'}
          </button>
          </form>


        </div> 
      <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setFormData={setFormData}/>
      </div>
     <ToastContainer/>
    </div>
    

  )
}

export default Enquiry;