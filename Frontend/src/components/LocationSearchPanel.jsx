import React from 'react'


const LocationSearchPanel = (props) => {
    const locations = props.suggestions || []

    const handleSuggestionClick = (suggestion) => {
        if(props.activeField === "pickup")
        {
            props.setPickup(suggestion);
        }else if(props.activeField === "destination")
        {
            props.setDestination(suggestion);
        }
    }
    
    return (
        <div>
            <div className='overflow-y-auto max-h-[55vh]'>
            {/* this is just a sample data */}
            {
                locations.map(function(elem, indx) {
                    return <div key={indx} onClick={(e) => {
                        handleSuggestionClick(elem.description)
                    }} className='flex gap-4 p-3 border-2 rounded-xl border-gray-50 active:border-black items-center justify-start my-2'>
                        <h2 className='bg-[#eee] h-7 flex items-center justify-center w-10 rounded-full '><i className='ri-map-pin-fill' /></h2>
                        <h4 className='font-medium'>{elem.description}</h4>
                    </div>
                })
            }

        </div>
        <div className='text-center w-full p-2'>
            <button 
                onClick={() => {
                    props.setPanelOpen(false)
                    props.setVehiclePanel(true)
                }}
                disabled={!props.pickup || !props.destination}
                className='text-lg text-white bg-black w-full p-2 disabled:bg-gray-400'
            >
                Find a Trip
            </button>
        </div>
        </div>
    )
}

export default LocationSearchPanel