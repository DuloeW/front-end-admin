import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from "../axios/axios.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEye, faEyeSlash, faSpinner, faX} from "@fortawesome/free-solid-svg-icons";
import Alert from "../components/Alert.jsx";

const LoginPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [alertProps, setAlertProps] = useState({
        icon: '',
        message: '',
        trueOrFalse: false
    })
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

    const switchShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }

    const handleError = () => {
        setAlertProps(prevState => ({
            ...prevState,
            message: 'Gagal',
            icon: faX,
            trueOrFalse: false
        }))
        switchShowAlert()
    }

    const handleSuccess = () => {
        setAlertProps(prevState => ({
            ...prevState,
            message: 'Berhasil',
            icon: faCheck,
            trueOrFalse: true
        }))
        switchShowAlert()
    }

    const login = async () => {
        try {
            setLoading(true)
            const response = await axios.post('admin-dasboard/login', formLogin)
            Cookies.set('token', response.data.token, {expires: 1})
            handleSuccess()
            setTimeout(() => {
                goToNextPage()
            }, 2000)
        } catch (err) {
            console.log(err)
            handleError()
        } finally {
            setLoading(false)
        }
        console.log(formLogin)
    }

    const goToNextPage = () => {
        navigate('/')
    }

    const switchShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

    useEffect(() => {
        const unauthorized = localStorage.getItem('unauthorized')

        if (unauthorized === '1') {
            alert('Sesi anda telah berakhir, silahkan login kembali')
            localStorage.setItem('unauthorized', "0")
        }
    }, [])

    return (
        <div className='w-full h-screen relative flex flex-col-reverse md:flex-row justify-between'>
            <div className='w-full h-full p-10'>
                <div className='w-11/12 h-full flex justify-center items-center flex-col shadow-xl rounded-xl'>
                    <h1 className='text-4xl font-bold text-teal-900 text-center'>Login</h1>
                    <div className='w-full h-1/2 flex flex-col justify-evenly items-center'>
                        <input className='w-3/4 h-10 bg-neutral-100 p-2 border-l-8 border-l-teal-900  outline-none'
                               type="text"
                               name='email'
                               onChange={(e) => handleInput(e)}
                               placeholder='Email'/>
                        <div className='w-3/4 relative mt-10'>
                            <input type={isShowPassword ? 'text' : 'password'}
                                   name='password'
                                   onChange={(e) => handleInput(e)}
                                   placeholder='Password'
                                   required={true}
                                   className='w-full h-10 bg-neutral-100 p-2 border-l-8 border-l-teal-900 outline-none'/>
                            <FontAwesomeIcon className='absolute top-2/4 -translate-y-2/4 right-5 text-teal-950'
                                             icon={isShowPassword ? faEyeSlash : faEye}
                                             onClick={() => switchShowPassword()}
                            />
                        </div>
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
            {showAlert && (
                <div className='absolute top-5 left-2/4 -translate-x-2/4'>
                    <Alert icon={alertProps.icon} message={alertProps.message} trueOrFalse={alertProps.trueOrFalse}/>
                </div>
            )}
            <div className='w-full h-fit md:h-fit sm:h-full grid place-items-center'>
                <img className="w-32 sm:h-[200px] sm:w-[200px] md:w-[500px] md:h-[500px]"
                     src='/login.jpg'
                     width={500}
                     alt={'Login'}/>
            </div>
        </div>
    );
}

export default LoginPage;