import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import CurrencyInput from 'react-currency-input-field';


const Form = props => {
    const [form, setForm] = useState(props.header.map(e => e.name).reduce((acc, cur) => {
            acc[cur]=''
            return acc
        },{}))

    const handleChange = (event) => {
        console.log(form)
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    function handleSubmit() {
        console.log(props.header.reduce((acc, cur) => cur.colpk))
        // fetch(`http://localhost:8088/table/${props.tableName}/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     redirect: 'follow',
        //     body: {
        //         form: JSON.stringify({ ...form }),
        //         id: props.header
        //     }
        // })
        // .then((resp) => resp.text())
        // .then((json) => {
        //     setForm(props.header.map(e => e.name).reduce((acc, cur) => {
        //         acc[cur]=''
        //         return acc
        //     },{}));
        //     props.setOpenForm(false);
        //     props.reloadTable();
        // })
        // .catch(e => {
        //     alert(`Erro na requisição`)
        //     console.log(e)
        // })
    }
    console.log(`props`,props)

    return(
        <div className="flex flex-col px-4 bg-slate-400 border-2 border-slate-500 rounded-xl w-4/6 h-5/6">
            <FontAwesomeIcon onClick={() => props.setOpenForm(false)} className='text-lg ml-auto mt-3 text-slate-700 cursor-pointer rounded-lg bg-slate-300 border-2 border-slate-900 px-2 py-1 hover:bg-slate-700 hover:text-slate-300' icon={faX} />
            <h1 className="text-6xl font-bold self-center mb-10">New {(props.tableName)}</h1>
            <div className="h-full">
                <div className={`grid grid-cols-6 gap-4`}>
                    {props.header.map((info) => (
                        <div key={info.name} className={`${ info.type === 'numeric' ? `col-span-1` : `col-span-2`}`}>
                            <div className={`flex flex-col`}>
                                <label className='text-5xl w-fit pb-2' htmlFor={info.name}><b>{ (info.name) }</b></label>
                                { info.type === 'numeric' ?
                                <CurrencyInput
                                    name={info.name} 
                                    maxLength={info.maxchar || 50}
                                    placeholder="0"
                                    className="bg-slate-300 rounded-lg text-4xl border-2 border-black" 
                                    key={info.name}
                                    intlConfig={{ locale: 'BR', currency: 'BRL' }}
                                    groupSeparator=','
                                    decimalSeparator='.'
                                    defaultValue={0}
                                    decimalsLimit={2}
                                    onValueChange={(value, name) => {setForm({ ...form, [name]: value })}}
                                /> :
                                <input 
                                    type="text" 
                                    placeholder='' 
                                    maxLength={info.maxchar || 50}  required 
                                    className="bg-slate-300 rounded-lg text-4xl border-2 border-black" 
                                    key={info.name}
                                    name={info.name} 
                                    value={form[info.name]}
                                    onChange={handleChange}/>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button type="button" onClick={() => handleSubmit()} className={
                                `mt-10 text-5xl text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 
                                font-medium rounded-md px-5 py-2.5 text-center mb-2 dark:bg-slate-600 dark:hover:bg-slate-700
                                dark:focus:ring-slate-900 border-2 border-black`}
            >Enviar</button>
        </div>
    )
}

export default Form