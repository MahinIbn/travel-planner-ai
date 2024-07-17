import { db } from '@/service/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection';
import { Hotel } from 'lucide-react';
import PlacestoVisit from '../components/PlacestoVisit';
import Footer from '../components/Footer';
import Hotels from '../components/Hotels';

function Viewtrip() {
  const {tripId} =useParams();
  const [trip, setTrip] = useState();
  useEffect(()=>{
    tripId&& GetTripData();
  },[tripId])

  const GetTripData=async()=>{
    const docRef=doc(db, 'AITrips', tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      setTrip(docSnap.data());
    }
    else{
      toast('No trip found');
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={trip}/>
      <Hotels trip={trip}/> 
      <PlacestoVisit trip={trip}/>
      <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip