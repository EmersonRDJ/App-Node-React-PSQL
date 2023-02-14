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
            <div className="max-h-[75%] h-fit max-w-screen w-fit justify-center items-center flex flex-col bg-slate-400 border-2 border-slate-500 rounded-xl px-5 pb-5">
                <button className="self-start px-[7%] py-[3%] my-[7%] min-w-fit block bg-slate-700 hover:bg-slate-900 text-slate-50 text-3xl rounded-md" onClick={_ => props.setOpenColOrder(false)}>Voltar</button>
                <div className="overflow-auto max-h-[70vh] scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300 pr-6">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="tableCols">
                            {(provided) => (
                                <section {...provided.droppableProps} ref={provided.innerRef}>
                                    {props.tableCols.map((col, index) => {
                                        return (
                                            <Draggable key={col.colname} draggableId={col.colname.toString()} index={index} className={`h-screen`}>
                                                {(provided) => (
                                                    <article {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <div className={`colOrder ${col.colapr ? 'bg-slate-500 text-black' : 'bg-slate-200 text-gray-400'} text-[3vh] font-bold border-4 rounded-lg border-slate-800 my-2 px-4`}>
                                                            <input
                                                                type="checkbox"
                                                                id={col.colname}
                                                                className="h-[2.5vh] w-[2.5vh] mr-2 accent-blue-400"
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