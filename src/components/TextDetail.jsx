import React, {useEffect, useState} from "react";
import useClassStore from "../store/ClassStore.js";
import Select from "./Select.jsx";


//TODO membuat transfer data dari child ke parent untuk melakukan update
const TextDetail = ({title, value, update }) => {
    const [major, setMajor] = useState(new Set())
    const [grade, setGrade] = useState(['X', 'XI', 'XII'])
    const [formData, setFormData] = useState({})
    const [classAndMajor, setClassAndMajor] = useState({
        grade: '',
        major: ''
    })
    const {classes} = useClassStore()

    const removeSymbol = (string) => {
        return string?.replace(/_/g, ' ')
    }

    const handleClassSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                grade: option
            }
        })
    }

    const handleMajorSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                major: option
            }
        })
    }

    useEffect(() => {
        const grades = ['X', 'XI', 'XII']
        const formatedData = new Set()

        grades.forEach(grade => {
            const filteredByGrade = classes.filter(item => item.grade === grade)
            filteredByGrade.forEach(item => {
                formatedData.add(removeSymbol(item.major))
            })
        })
        setMajor(formatedData);
    }, []);

    return (
        <div className='w-full'>
            <h2>{title}</h2>
            <input className={`p-2 w-full outline-none border-none bg-white shadow-md rounded-md
                ${title === 'Jurusan' || title === 'Kelas' ? 'hidden' : ''}
            `}
                   name=''
                   disabled={!update}
                   value={value}
            />
            {title === 'Kelas' && (
                 update ? (
                    <Select
                        title={title}
                        listOptions={grade}
                        nameComponent={title}
                        defaultValue={value}
                        onclick={handleClassSelect}/>
                ) : (
                    <input
                        className={`p-2 w-full outline-none border-none bg-white shadow-md rounded-md`}
                        name=''
                        disabled={!update}
                        value={ value}
                    />
                 )
            )}
            {title === 'Jurusan' && (
                update ? (
                    <Select
                        title={title}
                        listOptions={Array.from(major)}
                        nameComponent={title}
                        defaultValue={removeSymbol(value)}
                        onclick={handleMajorSelect}/>
                ) : (
                    <input
                        className={`p-2 w-full outline-none border-none bg-white shadow-md rounded-md`}
                        name=''
                        disabled={!update}
                        value={removeSymbol(value)}
                    />
                )
            )}
        </div>
    )
}

export default TextDetail;