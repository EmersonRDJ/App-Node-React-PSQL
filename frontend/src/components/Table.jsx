// React
import React, { useState, useRef, useEffect } from 'react'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { setData as setTableContentData } from '../redux/slices/tableContentSlice'

const Table = props => {
    const tableRef = useRef(null);

    // Redux state
    const dispatch = useDispatch(); 
    const tableContent = useSelector(state => state.tableContent)
    const tableHeader = useSelector(state => state.tableHeader)
    
    // Component state
    const [currDir, setCurrDir] = useState(`asc`)
    const [currProp, setCurrProp] = useState(tableHeader.data[0].name)

    console.log(tableHeader.data[0].name)

    // Sort rows when clicking on the header property
    function sortRows({ property = currProp, direction = currDir, newTableContent = tableContent, changeDir=true }) {
        if(changeDir){
            if(currProp === property){
                direction = direction === `asc` ? `desc` : `asc`
            }
            else {
                direction = `asc`
            }
        }
        setCurrDir(direction)
        setCurrProp(property);
        const sortedRows = [...newTableContent.data].sort((a, b) => {
            if (a[property] < b[property] || a[property] === null && b[property] !== null) {
                return direction === `asc` ? -1 : 1;
            } else if (a[property] > b[property] || a[property] !== null && b[property] === null) {
                return direction === `asc` ? 1 : -1;
            } else {
                return 0;
            }
        });
        dispatch(setTableContentData(sortedRows));
    }

    // Render header
    function showHeader(infos) {
        if(infos){
            return (
                infos.map((info) => (
                    <th onClick={() => sortRows({ property:info.name })}className={`px-2 py-4 cursor-pointer row text-left p-4 ${ currProp === info.name ? `bg-slate-500` : `bg-slate-400`}`} key={info.name}>
                        <span className="flex flex-shrink-0 row">
                            <span className="mx-1 text-[2.5vh]">{ info.name }</span>
                            <span className="mx-1 text-[2.5vh]">{currProp === info.name ? <FontAwesomeIcon icon={ currDir === `asc` ? faSortDown : faSortUp }/> : <FontAwesomeIcon icon={faSort}/> }</span>
                        </span>
                    </th>
                ))
            );
        }
    }

    // Render table body
    function showRows(contents) {
        if(contents){
            return (
              contents.map((content, i) => (
                <tr key={content.id} className={`${i%2 === 0 ? 'bg-slate-200' : 'bg-slate-100'} text-l h-fit`} onDoubleClick={() => {props.setForm(content); props.setOpenForm(true)}}>
                    {tableHeader.data.map((key) => (
                        <td className="text-[2vh] border-b-2 border-slate-400 text-left p-3 max-w-screen-sm break-words" key={key.name}>
                            {String(content[key.name])}
                        </td>
                    ))}
                </tr>
              ))
            );
        }
    }
    
    return(
        <table ref={tableRef} className={`table-auto w-full ${ props.aS ? 'mr-4 mb-4' : '' }`}>
            <thead className='sticky top-[-1px]' >
                <tr className="text-xl">
                    { showHeader(tableHeader.data) }
                </tr>
            </thead>
            <tbody className='h-fit'>
                { showRows(tableContent.data) }
            </tbody>
        </table>
    )
}

export default Table