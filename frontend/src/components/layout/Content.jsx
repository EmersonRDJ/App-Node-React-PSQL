import './Content.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/examples/Home'
import NotFound from '../../pages/examples/NotFound'
import UseState from '../../pages/examples/UseState'
import UseEffect from '../../pages/examples/UseEffect'
import UseRef from '../../pages/examples/UseRef'
import UseCallback from '../../pages/examples/UseCallback'
import UseMemo from '../../pages/examples/UseMemo'
import UseContext from '../../pages/examples/UseContext'
import UseReducer from '../../pages/examples/UseReducer'
import UseCustom from '../../pages/examples/UseCustom'

const Content = props => (
    <main className="Content">
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/useState" element={<UseState />}/>
            <Route path="/useEffect" element={<UseEffect />}/>
            <Route path="/useRef" element={<UseRef />}/>
            <Route path="/useCallback" element={<UseCallback />}/>
            <Route path="/useMemo" element={<UseMemo />}/>
            <Route path="/useContext" element={<UseContext />}/>
            <Route path="/useReducer" element={<UseReducer />}/>
            <Route path="/useCustom" element={<UseCustom />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </main>
)

export default Content