import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import CurrencyInput from 'react-currency-input-field';


const Form = props => {
    const [isUpdate, setIsUpdate] = useState(Object.keys(props.rawForm).length > 0)
    const [form, setForm] = useState(Object.keys(props.rawForm).length > 0 ? props.rawForm : props.header.map(e => e.colname).reduce((acc, cur) => {
        acc[cur]=''
        return acc
    },{}))
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);

    useEffect(() => {
        document.addEventListener("keyup", event => {
            if(event.code === `Escape`) {closeForm()}
        } );
    },[])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    function closeForm() {
        props.setRawForm({})
        props.setOpenForm(false)
    };

    function handleSubmit() {
        const pks = props.header.filter(e => e.colpk).reduce((object, e) => {return { ...object, [e.colname]: props.rawForm[e.colname]}},{})
        
        fetch(`http://localhost:8088/table/${props.tableName}/`, {
            method: isUpdate ? 'PUT' : 'POST' ,
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({
                form: form,
                pks: isUpdate ? pks : false
            })
        })
        .then((resp) => resp.text())
        .then((json) => {
            setForm(props.header.map(e => e.name).reduce((acc, cur) => {
                acc[cur]=''
                return acc
            },{}));
            props.reloadTable();
            closeForm();
        })
        .catch(e => {
            console.log(e)
        })
    }

    return(
        <div className="flex flex-col px-4 bg-slate-400 border-2 border-slate-500 rounded-xl w-5/6 h-fit">
            <FontAwesomeIcon onClick={() => closeForm()} className='text-5xl ml-auto mt-3 text-slate-700 cursor-pointer rounded-lg bg-slate-300 border-4 border-slate-900 px-3 py-1 hover:bg-slate-700 hover:text-slate-300' icon={faX} />
            <h1 className="text-6xl font-bold self-center mb-10">New {window.stringFirstToUpper(props.tableName)}</h1>
            <div className="h-full">
                <form className={`grid grid-cols-10 gap-4 overflow-auto max-h-[70vh] scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-300 pr-6 mb-6`}>
                    {props.header.map((info) => (
                        <div key={info.colname} className={`col-span-${info.coltam? new String(info.coltam) : '3'} self-end max-md:col-span-10 w-full h-21`}>
                            <div className={`flex flex-col`}>
                                <label title={ window.stringFirstToUpper( info.exhname || info.colname) } className='xl:text-3xl text-2xl text-fit w-full pb-2 flex' htmlFor={info.colname}>
                                    <p className='truncate whitespace-normal'>
                                        { window.stringFirstToUpper( info.exhname || info.colname) }
                                    </p>
                                </label>

                                { info.coltype === 'numeric' ?
                                <CurrencyInput
                                    name={info.colname}
                                    disabled={ info.colsle === 'S' ? true : false }
                                    maxLength={ info.colsize || 50 }
                                    placeholder="0"
                                    required={ info.colreq }
                                    className="required:border-red-500 disabled:bg-slate-400 bg-slate-200 rounded-md xl:text-4xl text-3xl border-4 border-slate-600 focus:outline-none focus:border-black focus:bg-slate-100 px-1 h-[6vh]" 
                                    key={info.colname}
                                    intlConfig={{ locale: 'BR', currency: 'BRL' }}
                                    groupSeparator=','
                                    decimalSeparator='.'
                                    defaultValue={form[info.colname] || 0}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => {setForm({ ...form, [name]: value })}}
                                /> : 
                                <input 
                                    type={ info.coltype.includes('timestamp') ? 'date' : 'text' }
                                    disabled={ info.colsle === 'S' ? true : false }
                                    placeholder='' 
                                    maxLength={info.colsize || 50} 
                                    required={ info.colreq && info.colsle === 'N' }
                                    className="required:border-red-500 disabled:bg-slate-400 bg-slate-200 rounded-md xl:text-3xl text-3xl border-4 border-slate-600 focus:outline-none focus:border-black focus:bg-slate-100 px-1 h-[6vh]" 
                                    key={info.colname}
                                    name={info.colname} 
                                    tamanho={info.coltam}
                                    value={info.coltype.includes('timestamp') ? new Date(form[info.colname] || Date.now()).toISOString().slice(0, 10) : form[info.colname] || ''}
                                    onChange={handleChange}/>
                                }
                                
                            </div>
                        </div>
                    ))}
                    <button type="submit" onClick={e => { e.preventDefault();  handleSubmit()}} className={
                        `col-span-10 mt-10 text-5xl text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 
                        font-medium rounded-md px-5 py-2.5 text-center mb-2 dark:bg-slate-600 dark:hover:bg-slate-700
                        dark:focus:ring-slate-900 border-2 border-black`}>
                        Enviar
                    </button>
                </form>
            </div>
            
        </div>
    )
}

export default Form