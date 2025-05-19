import React from 'react'

const ConfirmedRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => {
                props.setconfirmRidePanel(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Cofirm your Ride</h3>
            <div className='flex gap-2 justify-between flex-col items-center'>
            <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
            <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                    <i className='text-lg ri-map-pin-user-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                <i className='text-lg ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>₹{props.fares[props.vehicleType]}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                props.setVehicleFound(true)
                props.setconfirmRidePanel(false)
                props.createRide()
            }} className='mt-5 w-full bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
            </div>            
        </div>
    )
}

export default ConfirmedRide