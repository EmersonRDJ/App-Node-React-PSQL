import { DragDropContext, Draggable } from "react-beautiful-dnd"
import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable.js"

// Redux
import { useDispatch } from 'react-redux'

const ColOrder = props => {
    const dispatch = useDispatch();

    const handleOnDragEnd = (result) => {
        if (!result?.destination) return

        const cols = [...props.tableCols]

        const [reorderedCol] = cols.splice(result.source.index, 1)

        cols.splice(result.destination.index, 0, reorderedCol)
        
        dispatch(props.updateCols(cols))
    }

    const handleCheck = (col, index) => {
        let cols = [ ...props.tableCols ]
        
        cols[index] = { ...cols[index], colapr: !cols[index].colapr };

        dispatch(props.updateCols(cols))
    }

    return (
        <main className="h-screen w-screen flex items-center justify-center">
            <div className="h-fit max-w-screen w-fit max-w-[75%] justify-center items-center flex flex-col bg-slate-400 border-2 border-slate-500 rounded-xl px-5 pb-5">
                <button className="self-start px-[5%] py-[1%] my-[2%] min-w-fit block bg-slate-700 hover:bg-slate-900 text-slate-50 text-3xl rounded-md" onClick={_ => props.setOpenColOrder(false)}>Voltar</button>
                <div className="overflow-scroll max-h-[70vh] w-full scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300 pb-6">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="tableCols" direction="horizontal">
                            {(provided) => (
                                <section {...provided.droppableProps} ref={provided.innerRef} className="flex">
                                    {props.tableCols.map((col, index) => {
                                        return (
                                            <Draggable key={col.colname} draggableId={col.colname.toString()} index={index} className={`h-screen`}>
                                                {(provided) => (
                                                    <article {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <div className="colOrder bg-slate-500 text-[3vh] font-bold border-4 rounded-lg border-slate-800 my-2 px-4 flex whitespace-nowrap">
                                                            <input
                                                                type="checkbox"
                                                                id={col.colname}
                                                                className="h-[2.5vh] w-[2.5vh] mr-2"
                                                                checked={col.colapr}
                                                                onChange={_ => handleCheck(col, index)}
                                                            />
                                                            <label htmlFor={col.colname}>{ col.exhname || col.colname }</label>
                                                        </div>
                                                    </article>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </section>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </main>
    )
}

export default ColOrder