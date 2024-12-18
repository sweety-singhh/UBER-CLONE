import React from 'react'

const LocationSearchPanel = (props) => {

   
   const locations = [
     "24B, Near Kapoor's cafe,Bhopal",
     "14B, Near Kapoor's cafe,Bhopal",
     "29B, Near Kapoor's cafe,Bhopal",
     "26B, Near Kapoor's cafe,Bhopal",


   ]



  return (
    <div>
      {
        locations.map(function(elem){
             return   <div  onClick={()=>{
                props.setVehiclePanel(true)
               
             }} className='flex  gap-4  border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
             <h2  className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
             <i className="ri-map-pin-fill "></i>
             </h2>
             <h4 className='font-medium'>{elem}</h4>
         </div>

        })
      }


    
    </div>
  )
}

export default LocationSearchPanel