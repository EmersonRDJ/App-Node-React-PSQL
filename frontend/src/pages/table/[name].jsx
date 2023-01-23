// React
import React, { useState, useEffect, useRef } from 'react'

// NextJS
import { useRouter } from 'next/router';
import Link from 'next/link'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { fetchHeaderData } from '../../redux/slices/tableHeaderSlice'
import { fetchContentData, setData as setTableContentData } from '../../redux/slices/tableContentSlice'

// Other Components
import TableComponent from '../../components/Table'
import Form from '../navigator/Form'

const Table = props => {
    // useRef
    const ref = useRef()

    // Component state
    const [currDir, setCurrDir] = useState(`asc`)
    const [currProp, setCurrProp] = useState()
    const [rawForm, setRawForm] = useState({})
    const [openForm, setOpenForm] = useState(false)
    const [activeScroll, setActiveScroll] = useState(false)

    // Next route
    const router = useRouter();

    // Redux state
    const dispatch = useDispatch(); 
    const tableContent = useSelector(state => state.tableContent)
    const tableHeader = useSelector(state => state.tableHeader)

    // Fetch data and set it to the redux's state
    useEffect(() => {
        if(ref.current){
            if(ref.current.scrollHeight > ref.current.clientHeight)
                setActiveScroll(true)
            else
                setActiveScroll(false)
        }
    }, [ref.current?.scrollHeight, ref.current?.clientHeight])

    useEffect(() => {
        if(router.query.name){
            dispatch(fetchHeaderData(router.query.name));
            dispatch(fetchContentData(router.query.name));
        }
    }, [dispatch, router.query.name])

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

    // Reload the table body's content
    function reloadTable() {
        fetch(`http://localhost:8088/table/${router.query.name}/`,{ method: 'GET' })
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
        <div className={`w-full h-max bg-gradient-to-r from-slate-300 to-slate-500 flex justify-center `}>
            <button onClick={() => console.log(rawForm)}>Teste</button>
            <div className={`${openForm ? `blur` : ''} w-4/5 h-screen `}>
                <div className='h-[15%] mt-[3%] mb-[2%]'>
                    <div id='div1' className={`h-[45%] mb-[1%]`}>
                        <Link href={`/`} className='h-[100%] w-[10%] px-[3%] min-w-fit block bg-slate-700 hover:bg-slate-900 text-slate-50 text-4xl rounded-md' >
                            <div className='h-full flex justify-center items-center '>
                                <p className='truncate text-[5vh]'>
                                    Voltar
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div id='div2' className={`h-[45%]`}>
                        <button onClick={() => setOpenForm(true)} className={`h-[100%] w-[20%] px-[3%] min-w-fit block truncate text-slate-100 bg-slate-700 hover:bg-slate-800 focus:outline-none  focus:ring-slate-300 font-medium rounded-md text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900`}>
                            <div className='h-full flex justify-center items-center'>
                                <p className='whitespace-normal text-[3vh] '>
                                    {`Create New ${(router.query.name)}`}
                                </p>
                            </div>
                        </button> 
                    </div>
                </div>
                { !tableHeader.loading && !tableContent?.loading ? 
                <div ref={ref} className={`h-[75%] bg-slate-100  overflow-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300 scrollbar-corner-slate-900 ${openForm ? `blur` : ''}`}>
                    <TableComponent setOpenForm={setOpenForm} setForm={setRawForm} aS={activeScroll} />
                </div> : `Loading ${router.query.name}...` }
            </div>
            { openForm ?
                <div className="absolute flex justify-center items-center w-screen h-screen">
                    { (!tableHeader.loading && !tableHeader.error) ? (
                        <Form rawForm={rawForm} tableName={ router.query.name } header={ tableHeader.data } reloadTable={ reloadTable } setOpenForm={ setOpenForm }/>
                    ) : <h1>Loading...</h1>}
                </div>
            : false}
        </div>
        )
}

export default Table