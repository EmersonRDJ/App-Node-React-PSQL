// React
import React, { useState, useEffect } from 'react'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

// Redux
import { useSelector } from 'react-redux'

const Table = props => {
    // const [headerLoading, setHeaderLoading] = useState(true)
    // const [contentLoading, setContentLoading] = useState(true)
    // const [loading, setLoading] = useState(true)

    // Redux state
    const tableContent = useSelector(state => state.tableContent)
    const tableHeader = useSelector(state => state.tableHeader)


    // useEffect(()=> {
    //     if(!headerLoading && !contentLoading)
    //         setLoading(false)
    // },[headerLoading, contentLoading])

    // Render header
    function showHeader() {
        if(tableHeader.data){
            const header = (
                tableHeader.data.map((col) => (
                    col.colapr ?
                    <th className={`border-x-2 border-slate-500 p-0 pl-2 row text-left ${ props.currProp === col.colname ? `bg-slate-600 text-white` : `bg-slate-400 text-black`}`} key={col.colname}>
                        <span className="flex row items-center justify-between">
                            <span className="mx-1 text-[2.2vh] whitespace-nowrap">{ col.exhname || col.colname }</span>
                            <span onClick={() => props.sortRows({ property:col.colname })} className="cursor-pointer text-[2.2vh] p-3 bg-slate-500">{ props.currProp === col.colname ? <FontAwesomeIcon icon={ props.currDir === `asc` ? faSortDown : faSortUp }/> : <FontAwesomeIcon icon={faSort}/> }</span>
                        </span>
                    </th>
                    : false
                ))
            );
            return header;
        }
    }

    // Render table body
    function showRows() {
        if(tableContent.data){
            const content = (
              tableContent.data.map((content, i) => (
                <tr key={`row-${i}`} className={`${i%2 === 0 ? 'bg-slate-200' : 'bg-slate-100'} text-l h-fit border-b-2 border-slate-400 `} onDoubleClick={() => {props.setForm(content); props.setOpenForm(true)}}>
                    {tableHeader.data.map((col, j) => (
                    col.colapr ?
                        <td key={`${col.colname}-${j}`} className="text-[2vh] border-x-2 border-slate-500 text-left p-3 break-words">
                            { String(content[col.colname]) }
                        </td>
                    : false
                    ))}
                </tr>
              ))
            );
            return content;
        }
    }
    
    return(
        <table className={`table-auto w-full ${ props.activeVScroll ? 'mr-4' : '' } ${ props.activeHScroll ? 'mb-4' : '' }`} >
            <thead className='sticky top-[-1px]' >
                <tr className="text-xl">
                    { showHeader() }
                </tr>
            </thead>
            <tbody className='h-fit'>
                { showRows() }
            </tbody>
        </table>
    )
}

export default Table