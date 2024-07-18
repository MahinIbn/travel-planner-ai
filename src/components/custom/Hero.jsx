import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#8762cd]'>TripMate AI:</span> Discover the future of travel planning with TripMate AI, your intelligent trip companion. </h1>
        <p className='text-xl text-gray-500 text-center'> Whether you're looking for a relaxing beach getaway, a cultural city exploration, or an adventurous mountain trek, TripMate AI simplifies the planning process by providing curated recommendations, and booking assistance. Say goodbye to travel stress and hello to seamless, smart adventures with TripMate AI. </p>
        <Link to={'/create-trip'}>
          <Button>Get Started</Button>
        </Link>
        <img src='/trips.png'/>
    </div>
  )
}

export default Hero