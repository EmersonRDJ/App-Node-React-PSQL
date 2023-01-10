global.stringFirstToUpper  = (string) => {
  const firstLetter = string.charAt(0).toUpperCase();
  return firstLetter + string.slice(1);
}
import React from 'react';

import Table from '../components/Table'
import Tests from '../components/Tests'


export default function Home() {
  return (
    <Table tableName={'items'} />
    // <Tests tableName={'items'}/>
  )
}


// function Home() {
//   return <App />;
// }

// export default Home;
