global.stringFirstToUpper  = (string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  return firstLetter + string.slice(1);
}

global.backendUrl = `http://localhost:8088`;

import React, { useState } from 'react';

import { Provider } from 'react-redux';

import { store } from '../redux/store'

import Tables from './navigator/Tables'
import Table from './navigator/Table'
import Tests from '../components/Tests'

export default function Home() {
  const [navigation, setNavigation] = useState({
    tables:true,
    table:false
  })
  return (
    <Provider store={store}>
      {/* <Table tableName={'items'} /> */}
      { navigation.tables ? <Tables setNavigation={setNavigation} /> : false }
      { navigation.table ? <Table setNavigation={setNavigation}  /> : false}
    </Provider>
    // <Tests tableName={'items'}/>
  )
}