// React
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { fetchTablessData } from '../redux/slices/tablesSlices'

// Other Components
// import Table from './Table'

const Tables = props => {
    // Redux state
    const dispatch = useDispatch(); 
    const tables = useSelector(state => state.tables)

    // Fetch data and set it to the redux's state
    useEffect(() =>{
        dispatch(fetchTablessData())
    }, [dispatch])

    return(
        <div className="bg-gradient-to-r w-full from-slate-300 to-slate-500 h-screen flex flex-col justify-center items-center ">
            { !tables.loading && !tables.error ?
            <div className="bg-slate-400 w-4/6 h-5/6 pt-8">
                { tables.data.map((table) => (
                    <Link key={table.name} href={`/Table`}>
                        <li key={table.name} className="list-none" onClick={() => console.log(table.name)}>
                            <div className="bg-slate-700 text-slate-300 hover:bg-slate-900 hover:cursor-pointer text-6xl mx-10 my-3 px-8 py-4 rounded-2xl">
                                { global.stringFirstToUpper(table.name) }
                            </div>
                        </li>
                    </Link>
                    )
                ) }
            </div>
            : false
            }
        </div>
        )
}

export default Tables