
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { Main, Login, Register, Dashboard, NotFound} from './constants/constants';


function App() {

  return (
    <>
    <BrowserRouter>
       <Routes>

        {/* <AuthProvider> */}

           <Route path="/" element={<Main />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/dashboard" element={<Dashboard />} />

        {/* </AuthProvider> */}

        {/* Esta ruta SIEMPRE debe ir al final */}
        <Route path="*" element={<NotFound />} />

       </Routes>
      
    </BrowserRouter>

    </>
  )
}

export default App
