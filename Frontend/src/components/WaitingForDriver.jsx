import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
    <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => {
        props.setWaitingForDriver(true)
    }}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
    
    <div className='flex items-center justify-between'>
    <img className='h-16' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
    <div className='text-right'>
        <h2 className='text-lg font-medium'>Rider</h2>
        <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
    </div>
    </div>

    <div className='flex gap-2 justify-between flex-col items-center'>
    <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className='text-lg ri-map-pin-user-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahemdabad</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
        <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahemdabad</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3'>
        <i className='text-lg ri-currency-line'></i>
            <div>
                <h3 className='text-lg font-medium'>$2.50</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
        </div>
    </div>
    
    </div>            
</div>
  )
}

export default WaitingForDriver