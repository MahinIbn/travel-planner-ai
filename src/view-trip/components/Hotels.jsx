import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-7'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-7'>
            {
                trip?.tripData?.hotelOptions?.map((hotel, index)=>(
                    <HotelCardItem hotel={hotel}/>
                ))
            }

        </div>
    </div>
  )
}

export default Hotels