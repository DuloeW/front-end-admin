import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const Select = ({title, listOptions, onclick, nameComponent}) => {
    const [show, setShow] = useState(false)
    const [option, setOption] = useState('')

    const switchShow = () => {
        setShow(prevState => !prevState)
    }

    const sendOption = (option) => {
        onclick(option)
        setOption(option)
    }

    return (
        <div onClick={() => switchShow()}
            className='relative w-full h-fit bg-white shadow-md flex items-center p-2 rounded-md'>
            <span>
                {
                    option === '' ? `Pilih ${title}` : option
                }
            </span>
            <FontAwesomeIcon icon={faSortDown} className={`absolute px-5 py-2 right-0 top-1/2 -translate-y-1/2 ${show ? 'rotate-180' : 'rotate-0'}`}/>

            {show && (
                <div
                    className={`absolute right-0 z-10 flex flex-col justify-evenly px-2 flex-wrap shadow-md w-full h-36 bg-white rounded-md 
                        ${nameComponent === 'Kelas' ? 'h-36 -bottom-40 z-20' : 'h-72 -bottom-[300px]' }`}>
                    {listOptions.map((option, index) => (
                        <div key={index}  onClick={() => sendOption(option)}
                             className='w-full h-fit cursor-pointer px-3 py-1 bg-white rounded-md flex items-center hover:bg-teal-900 hover:text-white'>
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Select