import {Home} from '../pages/Home'
import {Login} from '../pages/Login'
import {Cadastro} from '../pages/Cadastro'
import {Register} from "../pages/Register";
import {PasswordReset} from "../pages/PasswordReset";
import {Route,Routes} from 'react-router-dom'
import useAuth from "../hooks/useAuth";

const Private = ({Item}) =>{
     const {signed} = useAuth();

     return signed  > 0 ?Item:<Login/>

}

export const RoutesPages = () =>{
       return(
       
             <Routes>
                <Route exact path="/home/*" element={<Private Item={<Home/>}/>}/>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/cadastro/:hash" element={<Cadastro/>} />
                <Route exact path="/passwordreset/:hash" element={<PasswordReset/>} />
                <Route path='*' element={<Login/>}/>
            </Routes>
        )
}
