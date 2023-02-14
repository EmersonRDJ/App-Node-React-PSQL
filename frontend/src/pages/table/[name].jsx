// React
import React, { useState, useEffect, useRef } from 'react'

// NextJS
import { useRouter } from 'next/router';
import Link from 'next/link'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux actions
import { fetchHeaderData,  setData as setTableHeaderData  } from '../../redux/slices/tableHeaderSlice'
import { fetchContentData, setData as setTableContentData } from '../../redux/slices/tableContentSlice'

// Other Components
import TableComponent from '../../components/Table'
import Form from '../navigator/Form'
import ColOrder from '../../components/ColOrder'
import Charts from '../../components/Charts'

const Table = props => {
    // useRef
    const ref = useRef()
        
        // Component state
    // Content Loading
    const [loading, setLoading] = useState(true)
    // Current sort direction
    const [currDir, setCurrDir] = useState(`asc`)
    // Current property being used to sort 
    const [currProp, setCurrProp] = useState()
    // Form passed to the Form component in the case of an update
    const [rawForm, setRawForm] = useState({})
    // Binary state to define if the Form component is visible
    const [openForm, setOpenForm] = useState(false)
    // Binary state to define if it open`s the ColOrder
    const [openColOrder, setOpenColOrder] = useState(false)
    // Binary state to define if it open`s the Chart
    const [openCharts, setOpenCharts] = useState(false)
    // Binary state to define if the scroll is active, in order to set the correct margins to the table
    const [activeHScroll, setActiveHScroll] = useState(false)
    // Binary state to define if the scroll is active, in order to set the correct margins to the table
    const [activeVScroll, setActiveVScroll] = useState(false)
    // Navigation Number 
    const [navigation, setNavigation] = useState({
        currentNumber: 0,
        maxNumber: 200,
        numberArray: []
    })

    // Next route
    const router = useRouter();

    // Redux state
    const dispatch = useDispatch(); 
    const tableContent = useSelector(state => state.tableContent)
    const tableHeader = useSelector(state => state.tableHeader)

    // Check if content is overflowing and change the active scroll state
    useEffect(() => {
        if(ref.current){
            if(ref.current.scrollHeight > ref.current.clientHeight)
                setActiveVScroll(true)
            else
                setActiveVScroll(false)
            if(ref.current.scrollWidth > ref.current.clientWidth)
                setActiveHScroll(true)
            else
                setActiveHScroll(false)

        }
    })

    useEffect(() => {
        console.log(ref.current?.clientWidth)
    }, [ ref.current ])

    // Fetch data and set it to the redux's state, also change the page`s title to the table`s name
    useEffect(() => {
        if(router.query.name){
            document.title = `Tabela: ${ global.stringFirstToUpper(router.query.name) }`;
            dispatch(fetchHeaderData(router.query.name));
            dispatch(fetchContentData(router.query.name));

            let arr = []

            for(let i = 0; i < 10; i++){
                if(i === 0)
                    arr.push(1);
                else if(i === 9){
                    arr.push(navigation.maxNumber+1);
                }
                else {
                    let n = navigation.currentNumber + i - 4;
                    while(n < 0 + i){
                        n++;
                    }
                    arr.push(n+1)
                }
            }
            setNavigation({ ...navigation, numberArray: arr })

        }
    }, [dispatch, router.query.name])

    // Fetch data and set it to the redux's state, also change the page`s title to the table`s name
    useEffect(() => {
        if(!tableHeader.loading && !tableContent.loading){
            setLoading(false)
        }
    }, [tableHeader.loading, tableContent.loading])

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
            <div className={`${openForm || openColOrder ? `blur` : ''} w-4/5 min-w-[30vh] h-screen `}>
                {/* Buttons */}
                <div className='h-[13%] mt-[3%] mb-[1%]'>
                    <div id='div1' className={`h-[45%] mb-[1%]`}>
                        <Link href={`/`} className='h-[100%] w-[10%] px-[3%] min-w-fit block bg-slate-700 hover:bg-slate-900 text-slate-50 text-4xl rounded-md' >
                            <div className='h-full flex justify-center items-center'>
                                <p className='text-[4vh]'>
                                    Voltar
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div id='div2' className={`h-[45%] flex justify-between`}>
                        <button onClick={() => setOpenForm(true)} className={`h-[100%] w-[20%] px-[3%] min-w-fit block truncate text-slate-100 bg-slate-700 hover:bg-slate-800 focus:outline-none  focus:ring-slate-300 font-medium rounded-md text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900`}>
                            <div className='h-full flex justify-center items-center'>
                                <p className='whitespace-normal text-[3vh] '>
                                    {`Create New ${ global.stringFirstToUpper(router.query.name) }`}
                                </p>
                            </div>
                        </button> 
                        <button onClick={() => setOpenColOrder(true)} className={`h-[100%] w-[20%] px-[3%] min-w-fit block truncate text-slate-100 bg-slate-700 hover:bg-slate-800 focus:outline-none  focus:ring-slate-300 font-medium rounded-md text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900`}>
                            <div className='h-full flex justify-center items-center'>
                                <p className='whitespace-normal text-[3vh] '>
                                    {`Change Column's`}
                                </p>
                            </div>
                        </button> 
                    </div>
                </div>
                {/* Table */}
                { !loading ? 
                <div id={`tableRef`} ref={ref} className={`max-h-[65%]  border-4 border-black bg-slate-100  overflow-auto scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300 scrollbar-corner-slate-900 ${openForm ? `blur` : ''}`}>
                    <TableComponent 
                        currDir={currDir} 
                        currProp={currProp} 
                        sortRows={sortRows} 
                        setOpenForm={setOpenForm} 
                        setForm={setRawForm} 
                        activeHScroll={activeHScroll} 
                        activeVScroll={activeVScroll} 
                        />
                </div> : `Loading ${ router.query.name }...` }
                {/* Table Navigarion */}
                <div className="flex justify-between">
                    {navigation.numberArray.map((index) => (
                    <div
                        key={index}
                        className={`text-white min-h-[5vh] min-w-[5vh] text-[2.5vh] font-bold rounded-full flex justify-center items-center mt-[1vh] ${
                        parseInt(parseInt(index)) === parseInt(navigation.currentNumber)
                            ? "bg-slate-500 cursor-default"
                            : "bg-slate-800 cursor-pointer"
                        }`}
                        onClick={() => setNavigation({ ...navigation, currentNumber: index })}
                    >
                        {index}
                    </div>
                    ))}
                </div>
                <button onClick={() => console.log(ref.current?.clientWidth)}>TESTE</button>
                <button onClick={() => setOpenCharts(true)} className={`h-[5%] w-[20%] px-[3%] min-w-fit block truncate text-slate-100 bg-slate-700 hover:bg-slate-800 focus:outline-none  focus:ring-slate-300 font-medium rounded-md text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900`}>
                            <div className='h-full flex justify-center items-center'>
                                <p className='whitespace-normal text-[3vh] '>
                                    {`Open Charts`}
                                </p>
                            </div>
                        </button> 
            </div>
            {/* Form */}
            { openForm ?
                <div className="absolute flex justify-center items-center w-screen h-screen">
                    { (!loading && !tableHeader.error) ? (
                        <Form rawForm={rawForm} setRawForm={setRawForm} tableName={ router.query.name } header={ tableHeader.data } reloadTable={ reloadTable } setOpenForm={ setOpenForm }/>
                    ) : <h1>Loading...</h1>}
                </div>
            : false }
            {/* Column Order */}
            { openColOrder ?
                <div className="absolute flex justify-center items-center w-screen h-screen">
                    { (!loading && !tableHeader.error) ? (
                        <ColOrder setOpenColOrder={setOpenColOrder} tableCols={tableHeader.data} updateCols={setTableHeaderData} />
                    ) : <h1>Loading...</h1>}
                </div>
            : false}
            {/* Charts */}
            { openCharts ?
                <div className="absolute flex justify-center items-center w-screen h-screen">
                    { (!loading && !tableHeader.error) ? (
                        <Charts setOpenCharts={setOpenCharts} labels={tableContent.data.map(e => e.Nome)} dataSets={{ label: `Salario`, data: tableContent.data.map(e => e.Salario)}} />
                    ) : <h1>Loading...</h1>}
                </div>
            : false}
        </div>
        )
}

export default Table