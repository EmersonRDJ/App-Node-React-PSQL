// React
import React, { useState, useEffect } from 'react'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { fetchHeaderData } from '../redux/slices/tableHeaderSlice'
import { fetchContentData, setData as setTableContentData } from '../redux/slices/tableContentSlice'

// Other Components
import Form from './Form'

const Table = props => {
    
    // Component state
    const [currDir, setCurrDir] = useState(`asc`)
    const [currProp, setCurrProp] = useState(`id`)
    const [openForm, setOpenForm] = useState(false)

    // Redux state
    const dispatch = useDispatch(); 
    const tableContent = useSelector(state => state.tableContent)
    const tableHeader = useSelector(state => state.tableHeader)

    // Fetch data and set it to the redux's state
    useEffect(() =>{
        dispatch(fetchHeaderData(props.tableName))
        dispatch(fetchContentData(props.tableName))
    }, [dispatch])

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
                            <span className="mx-1">{ window.stringFirstToUpper(info.name) }</span>
                            <span className="mx-1">{currProp === info.name ? <FontAwesomeIcon icon={ currDir === `asc` ? faSortDown : faSortUp }/> : <FontAwesomeIcon icon={faSort}/> }</span>
                        </span>
                    </th>
                ))
            );
        }
    }

    // Render table body
    function showRows(states) {
        if(states){
            return (
              states.map((state, i) => (
                <tr key={state.id} className={`${i%2 === 0 ? 'bg-slate-200' : 'bg-slate-100'} text-l`}>
                    {tableHeader.data.map((key) => (
                        <td className="text-left p-3 max-w-screen-sm break-words" key={key.name}>{state[key.name]}</td>
                    ))}
                </tr>
              ))
            );
        }
    }

    // Reload the table body's content
    function reloadTable() {
        fetch(`http://localhost:8088/table/${props.tableName}/`,{ method: 'GET' })
        .then((resp) => resp.json())
        .then((json) => {
            sortRows({ newTableContent:{...tableContent, data:json}, changeDir:false })
        })
        .catch(e => {
            alert(`Erro na requisição`)
            console.log(e)
        })
    }


    return(
        <div className="w-full h-max bg-gradient-to-r from-slate-300 to-slate-500 flex justify-center items-center">
            <div className="w-4/5 h-screen">
                <div className={`${openForm ? `blur` : ''}`}>
                    <button onClick={() => setOpenForm(true)} className={`text-3xl text-slate-100 bg-slate-700 hover:bg-slate-800 focus:outline-none  focus:ring-slate-300 font-medium rounded-md px-5 py-2.5 text-center mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900 mt-3`}>
                        {`Create New ${(props.tableName)}`}
                    </button> 
                </div>
                { !tableHeader.loading && !tableContent?.loading ? 
                <div className={`h-3/4 wfull border-2 border-slate-900 overflow-scroll scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-700 mt-1 ${openForm ? `blur` : ''}`}>
                    <table className="table-auto h-screen w-full mr-4">
                        <thead className='sticky top-0 shadow-md' >
                            <tr className="text-xl">
                                { showHeader(tableHeader.data) }
                            </tr>
                        </thead>
                        <tbody className=''>
                            { showRows(tableContent.data) }
                        </tbody>
                    </table>
                </div> : `Loading ${props.tableName}...` }
            </div>
            { openForm ?
                <div className="absolute flex justify-center items-center w-full h-fit">
                    { (!tableHeader.loading && !tableHeader.error) ? (
                        <Form tableName={ props.tableName } header={ tableHeader.data } reloadTable={ reloadTable } setOpenForm={ setOpenForm }/>
                    ) : <h1>Loading...</h1>}
                </div>
            : false}
        </div>
        )
}

export default Table