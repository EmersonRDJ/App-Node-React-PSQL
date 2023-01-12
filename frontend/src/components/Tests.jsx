import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

import { useFetch } from '../hooks/useFetch';

// import { changeData } from '../store/redux/slices/tableContentSlice'

const Tests = props => {
    const dispatch = useDispatch(); 

    const [tableHeader, setTableHeader] = useState({ data: null, loading: true, error: null })
    const [response, setResponse] = useState({ data: null, loading: true, error: null })

    const [currDir, setCurrDir] = useState(`asc`)
    const [currProp, setCurrProp] = useState(`id`)
    const [openForm, setOpenForm] = useState(false)

    const tableContent = useSelector(state => state.tableContent)
    
    const tableHeaderData = useFetch({ url:`http://localhost:8088/table/infos/${props.tableName}/`, method:'GET'});
    const responseData = useFetch({ url:`http://localhost:8088/table/${props.tableName}/`, method:'GET' });

    useEffect(() => {
        dispatch(changeData(useFetch({ url:`http://localhost:8088/table/${props.tableName}/`, method:'GET' })))
        setTableHeader(tableHeaderData);
        setResponse(responseData);
    }, [tableHeaderData, responseData]);

    
    const onDragEnd = (result) => {
        if (!result.destination) {
        return;
        }
    
        // Reorder the `tableHeader.data` array based on the new position of the column
        const newTableHeaderData = reorder(
        tableHeader.data,
        result.source.index,
        result.destination.index
        );
    
        // Update the state with the new `tableHeader.data` array
        setTableHeader({ ...tableHeader, data: newTableHeaderData });
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    function sortRows({ property = currProp, direction = currDir, newResponse = response, changeDir=true }) {
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
        const sortedRows = [...newResponse.data].sort((a, b) => {
            if (a[property] < b[property]) {
                return direction === `asc` ? -1 : 1;
            } else if (a[property] > b[property]) {
                return direction === `asc` ? 1 : -1;
            } else {
                return 0;
            }
        });
        setResponse({ ...response, data:sortedRows });
    }

    function showHeader(infos) {
        if(infos){
            return (
                <DragDropContext onDragEnd={onDragEnd}>
                  {infos.map((info, i) => (
                      <Draggable key={info.name} draggableId={info.name} index={i}>
                          {(provided) => (
                              <th
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => sortRows({ property:info.name })}
                              className={`px-2 py-4 cursor-pointer row text-left p-4 ${ currProp === info.name ? `bg-slate-500` : `bg-slate-400`}`}
                              key={info.name}
                              >
                              <span className="flex flex-shrink-0 row">
                                  <span className="mx-1">{ window.stringFirstToUpper(info.name) }</span>
                                  <span className="mx-1">{currProp === info.name ? <FontAwesomeIcon icon={ currDir === `asc` ? faSortDown : faSortUp }/> : <FontAwesomeIcon icon={faSort}/> }</span>
                              </span>
                              </th>
                          )}
                      </Draggable>
                  ))}
                </DragDropContext>
              );
        }
    }

    function showRows(states) {
        if(states){
            return (
              states.map((state, i) => (
                <tr key={state.id} className={`${i%2 === 0 ? 'bg-slate-200' : 'bg-slate-100'} text-l`}>
                    {tableHeader.data.map((key) => (
                        <td className="text-left p-3" key={key.name}>{state[key.name]}</td>
                    ))}
                </tr>
              ))
            );
        }
    }

    function reloadTable() {
        fetch(`http://localhost:8088/table/${props.tableName}/`,{ method: 'GET' })
        .then((resp) => resp.json())
        .then((json) => {
            sortRows({ newResponse:{...response, data:json}, changeDir:false })
        })
        .catch(e => {
            alert(`Erro na requisição`)
            console.log(e)
        })
    }
    
    return (
        <div className="table-responsive">
            <DragDropContext onDragEnd={onDragEnd}>
                <table className={`table-auto `}>
                    <thead className={`text-slate-500 font-medium `}>
                        <tr className={`text-lg font-medium`}>
                        {tableHeader.data ? showHeader(tableHeader.data) : <th>Loading...</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {response.data ? showRows(response.data) : <tr><td>Loading...</td></tr>}
                    </tbody>
                </table>
            </DragDropContext>
        </div>
    );
    
}

export default Tests