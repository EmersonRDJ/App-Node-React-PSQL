// React
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { fetchTablesData } from '../../redux/slices/tablesSlices'
import { setData as setCurrTableData } from '../../redux/slices/currTableSlice'

// Other Components
// import Table from './Table'

const Tables = props => {
    // Redux state
    const dispatch = useDispatch(); 
    const tables = useSelector(state => state.tables);

    const router = useRouter()

    // Set the tab name
    useEffect(() => {
        document.title = `Tabelas`;
    }, [])

    // Fetch data and set it to the redux's state
    useEffect(() =>{
        dispatch(fetchTablesData())
    }, [dispatch])

    return(
        <div className="bg-gradient-to-r w-full from-slate-300 to-slate-500 h-screen flex flex-col justify-center items-center ">
            { !tables.loading && !tables.error ?
            <div className={`border-4 border-slate-900 bg-slate-500 w-4/6 h-5/6 py-8 pr-4 overflow-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300
                            min-w-fit max-md:w-full max-md:h-full`}>
                { tables.data.map((table) => (
                    <Link key={table.name} className="cursor-default" href={`table/${table.name}`} onClick={() => {dispatch(setCurrTableData(table.name))}} >
                        <li key={table.name} className="list-none">
                            <div className="cursor-pointer bg-slate-700 text-slate-300 hover:bg-slate-900 hover:cursor-pointer text-[5vh] mx-10 my-3 px-8 py-4 rounded-2xl">
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