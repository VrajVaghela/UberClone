import React from 'react'

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
    if (!ride) return null;

    const driverName = ride.captain ? 
        `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname}` : 
        'Connecting...';

    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => {
                setWaitingForDriver(false)
            }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
            
            <div className='flex items-center justify-between'>
                <img className='h-16' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Driver</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{driverName}</h4>
                    <p className='text-sm text-gray-600'>{ride.vehicleType || 'Vehicle'}</p>
                </div>
            </div>

            <div className='bg-yellow-100 p-4 rounded-lg my-4'>
                <h3 className='text-lg font-semibold mb-2'>Your Ride OTP</h3>
                <p className='text-3xl font-mono font-bold tracking-wider'>
                    {ride?.otp || '------'}
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                    Share this OTP with your driver
                </p>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className='text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default WaitingForDriver;