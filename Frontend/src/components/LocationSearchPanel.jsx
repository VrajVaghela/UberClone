import React from 'react'

const LocationSearchPanel = (props) => {
    // sample array for location
    const locations = [
        "A2/2 Akhand Savita Park, New Sama, Vadodara",
        "22B, Near Kapoor's cafe, Coding School, Vadodar",
        "18A, Gayatri Duplex, Alkapuri, Vadodara",
        "19D, Lileria Heights, Nizampura, Vadodara"
    ]
    return (
        <div>
            {/* this is just a sample data */}
            {
                locations.map(function(elem, indx) {
                    return <div key={indx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-4 p-3 border-2 rounded-xl border-gray-50 active:border-black items-center justify-start my-2'>
                        <h2 className='bg-[#eee] h-7 flex items-center justify-center w-10 rounded-full '><i className='ri-map-pin-fill' /></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }

        </div>
    )
}

export default LocationSearchPanel