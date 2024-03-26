import {useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "../axios/axios.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })
    const handleInput = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {
        try {
            setLoading(true)
            const response = await axios.post('admin-dasboard/login', formLogin)
            Cookies.set('token', response.data.token, {expires: 1})
            goToNextPage()
        } catch (err) {
            console.log(err)
            setLoading(false)
        } finally {
            setLoading(false)
        }
        console.log(formLogin)
    }

    const goToNextPage = () => {
        navigate('/')
    }

    return (
        <div className='w-full h-screen flex justify-between'>
            <div className='w-full h-full p-10'>
                <div className='w-11/12 h-full flex justify-center items-center flex-col shadow-xl rounded-xl'>
                    <h1 className='text-4xl font-bold text-teal-900 text-center'>Login</h1>
                    <div className='w-full h-1/2 flex flex-col justify-evenly items-center'>
                        <input className='w-3/4 h-10 bg-neutral-100 p-2 border-l-8 border-l-teal-900  outline-none'
                               type="text"
                               name='email'
                               onChange={(e) => handleInput(e)}
                               placeholder='Email'/>
                        <input type="text"
                               name='password'
                               onChange={(e) => handleInput(e)}
                               placeholder='Password'
                               className='w-3/4 h-10 bg-neutral-100 p-2 border-l-8 border-l-teal-900 outline-none'/>
                        <button
                            className='w-3/4 h-10 bg-teal-900 text-white font-bold rounded-md border-none outline-none'
                            onClick={() => login()}
                        >
                            {loading ? (
                                <FontAwesomeIcon icon={faSpinner} className={'animate-spin'}/>
                            ) : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full h-full grid place-items-center'>
                <img src='/login.jpg' width={500} alt={'Login'}/>
            </div>
        </div>
    );
}

export default LoginPage;