import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import { chatSession } from '@/service/AIModel'
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {FcGoogle} from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseconfig'
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'


function CreateTrip() {
  const [place, setPlace]=useState()
  const [FormData, setFormData] =useState([])

  const [openDialog, setOpenDialog] =useState(false);
  const [loading, setLoading] = useState(false)
  
  const navigate= useNavigate()

  const handleInputChange=(name, value)=>{
    setFormData({
      ...FormData,
      [name]:value
    })
  }

const login =useGoogleLogin({
  onSuccess:(codeResp)=>GetUserProfile(codeResp),
  onError:(error)=>console.log(error)
})

const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_tokens=${tokenInfo?.access_token}`,{
    headers:{
      Authorization:`Bearer ${tokenInfo?.access_token}`,
      Accept: 'Application/json'
    }
  }).then((resp)=>{
    console.log(resp);
    localStorage.setItem('user', JSON.stringify(resp.data));
    setOpenDialog(false);
    onGenerateTrip();
  })
}

const onGenerateTrip=async()=>{
 
  const user=localStorage.getItem('user')
  
  if (!user)
  {
    setOpenDialog(true)

  }

  if(FormData?.noOfDays>50 && !FormData?.location || !FormData?.budget || !FormData?.noPeople)
  {
    toast("Please ensure all fields are filled")
    return;
  }
  setLoading(true)
  const FINAL_PROMPT=AI_PROMPT
  .replace('{location}', FormData?.location?.label)
  .replace('{totalDays}', FormData?.noOfDays)
  .replace('{traveler}', FormData?.noPeople)
  .replace('{budget}', FormData?.budget)
  .replace('{totalDays}', FormData?.noOfDays)

  console.log(FINAL_PROMPT);
  const result =await chatSession.sendMessage(FINAL_PROMPT);
  console.log(result?.response?.text());
  setLoading(false)
  SaveAITrip((result?.response?.text()));
}




const SaveAITrip =async(TripData)=>{
  setLoading(true)

  const user=JSON.parse(localStorage.getItem('user'));
  const docId=Date.now().toString()
  await setDoc(doc(db, 'AITrips', docId), {
    userSelection:FormData,
    tripData:JSON.parse(TripData),
    userEmail:user?.email,
    id:docId
  });

  setLoading(false)
  navigate('/view-trip/'+docId)
}
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us our trip preferences. 🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Provide us some of your basic choices, and our trip planner will generate custom trip plan base on your liking.</p>
      <div className='mt-20'>
        <div className='mt-20 flex flex-col gap-9'>
          <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
          }}/>

          <div>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning to stay?</h2>
            <Input placeholder={'Ex.3'} type='number'
            onChange={(e)=>handleInputChange('noOfDays', e.target.value)}/>
          </div>
        
          <div>
            <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((items, index)=>(
                <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${FormData?.budget==items.title&&'shadow-lg border-black'}`}
                onClick={()=>handleInputChange('budget', items.title)}>
                  <h2 className='text-4xl'>{items.icon}</h2>
                  <h2 className='font-bold text-lg '>{items.title}</h2>
                  <h2 className='text-sm text-gray-500'>{items.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>Who do you plan on going with?</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelList.map((items, index)=>(
                <div key={index} 
                onClick={()=>handleInputChange('noPeople', items.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${FormData?.noPeople==items.people&&'shadow-lg border-black'}`}>
                  <h2 className='text-4xl'>{items.icon}</h2>
                  <h2 className='font-bold text-lg '>{items.title}</h2>
                  <h2 className='text-sm text-gray-500'>{items.desc}</h2>
                </div>
              ))}
            </div>
          </div>


        
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:"Generate Trip"}
          </Button>
      </div>

      <Dialog open={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
           <img src='/logo.svg'/>
           <h2 className='font-bold text-lg mt-7 '>Sign In with Google</h2>
           <p>Sign in to the app using your google account</p>
           <Button onClick={login}
           className='w-full mt-5 flex gap-4 items-center'>
            <FcGoogle className='h-7 w-7'/> Sign In with Google
           </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      </Dialog>

    
    </div>
  )
}

export default CreateTrip