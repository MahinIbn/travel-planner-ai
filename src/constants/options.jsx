export const SelectTravelList =[
    {
        id:1,
        title:"Just Me",
        desc:'A solo travel for exploration',
        people:'1',
        icon: '👦🏽'

    },
    {
        id:2,
        title:"A couple",
        desc:'Travelling in pair',
        people:'2 people',
        icon: '💑'

    },
    {
        id:3,
        title:"Family",
        desc:'A group adventure',
        people:'3 to 5 people',
        icon: '👩‍👧‍👦'

    },

]

export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:'Conscious of costs',
        icon: '💸'
    },
    {
        id:2,
        title:"Moderate",
        desc:'Spend my money moderately',
        icon: '💰'
    },
    {
        id:3,
        title:"Luxury",
        desc:'Dont worry about costs',
        icon: '🤑'
    },

]
export const AI_PROMPT='Generate Travel Plan for location:{location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates, rating, descriptions and suggest itinerary with placeName, placeDetails, timeToVisit (best time to visit), ticketPricing, timeToTravel for each of the location for {totalDays} days with each day plan in JSON format.'