import axios from 'axios'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

function EnquiryList({data,getAllenquiry,setFormData}) {
    let deleteRow=(delid)=>{
      console.log("deleting id",delid)
     axios.delete(`http://localhost:8020/website/api/delete/${delid}`)
     .then((res)=>{
      toast.success("Enquiry deleted successfully");
      getAllenquiry();
     })
    }
    let editRow=(updateId)=>{
     axios.get(`http://localhost:8020/website/api/find/${updateId}`)
     .then((res)=>{
       let data = res.data
       setFormData(data.enquiry)
     })
    }
  return (
    <div className="w-4/5 ml-7"> 
          <h2 className='text-2xl font-bold text-center mb-10'>
            Enquiry List
          </h2>
          <div className="w-full rounded-2xl  shadow-lg mb-7">
          <table className="min-w-full border-collapse bg-white text-ms text-left  ">
            <thead>
              <tr className="bg-indigo-400 text-base">
                <th className="px-4 py-3">Sr.No</th>
                <th className="px-4 py-3 ">NAME</th>
                <th className="px-4 py-3 ">EMAIL</th>
                <th className="px-4 py-3 ">PHONE</th>
                <th className="px-4 py-3 ">MESSAGE</th>
                <th className="px-4 py-3 ">DELETE</th>
                <th className="px-4 py-3 ">EDIT</th>

              </tr>
            </thead>

            <tbody>
              {
                data.length>=1?
                data.map((item,index)=>{
                  return ( 
                  <tr className ="border-b hover:bg-gray-100 transition"  key={index}>
                <td className="px-4 py-2"> {index+1}</td>
                <td className="px-4 py-2"> {item.name}</td>
                <td className="px-4 py-2"> {item.email}</td>
                <td className="px-4 py-2"> {item.phone}</td>
                <td className="px-4 py-2">  {item.message}</td>
                <td><button  onClick={()=>deleteRow(item._id)}   className=' bg-red-600 px-3 py-1 rounded-lg  hover:bg-red-500 hover:rounded-none shadow'> Delete</button></td>
                <td> <button onClick={()=>editRow(item._id)} className='bg-blue-700 px-3 py-1 rounded-lg hover:bg-blue-500 hover:rounded-none shadow'>Edit</button></td>
              </tr>
                  )

                })
                :
                <tr  className='hover:bg-gray-200'>
                  <td className='text-center'>No Data Found</td>
                </tr>
              }

            </tbody>
          </table>
        </div>
        <ToastContainer/>
      </div>

  )
}

export default EnquiryList