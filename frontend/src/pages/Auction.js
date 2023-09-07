import React from 'react'
import Sidebar from '../components/Sidebar'

export default function auction() {
  return (
    <div className='flex'>
      <div className='flex h-screen hidden lg:block shadow z-50'>
        <Sidebar />
      </div>
    </div>
  )
}
