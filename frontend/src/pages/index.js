import React, { useState } from 'react';

import { Provider } from 'react-redux';

import { store } from '../redux/store'

import Tables from './navigator/Tables'
import Table from './navigator/Table'
import Tests from '../components/Tests'

export default function Home() {
  return (
    <main>
    {/* <div className="container m-0 bg-black">
      <div className="flex flex-col h-[50vh] w-screen bg-blue-900">
        <div className="h-[30%] bg-green-600">
            <button className='bg-orange-600'>Content</button>
        </div>
        <div className="h-[70%] bg-red-500">
            <button className='h-[75%] w-[20%] text- truncate bg-yellow-400'>Content</button>
        </div>
      </div>
    </div>
      <div className="container m-0 bg-black">
        <div className="flex flex-col h-[50vh] w-screen bg-blue-900">
          <div className="h-[30%] bg-green-600">
              <button className='bg-orange-600'>Content</button>
          </div>
          <div className="h-[70%] bg-red-500">
              <button className='h- bg-yellow-400'>Content</button>
          </div>
        </div>
      </div> */}

      {/* <Provider store={store}> */}
        {/* <Table tableName={'items'} /> */}
        <Tables />
      {/* </Provider> */}
      {/* <Tests tableName={'items'}/> */}
    </main>
  )
}