import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#8762cd]'>Discover AI:</span> Plan out your next adventure using AI</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal AI travel planner for hotel recommendation, daily itinerary and more! </p>
        <Link to={'/create-trip'}>
          <Button>Get Started</Button>
        </Link>
        <img src='/trips.png'/>
    </div>
  )
}

export default Hero