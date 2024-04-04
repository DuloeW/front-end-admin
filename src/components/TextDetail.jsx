import React, {useEffect, useState} from "react";
import useClassStore from "../store/ClassStore.js";
import Select from "./Select.jsx";


//TODO membuat transfer data dari child ke parent untuk melakukan update
const TextDetail = ({title, value, update, valueSent }) => {
    const [major, setMajor] = useState(new Set())
    const [data, setData] = useState(value)
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
        valueSent({id: 2, grade: option})
    }

    const handleMajorSelect = (option) => {
        setClassAndMajor(prevState => {
            return {
                ...prevState,
                major: option
            }
        })
        valueSent({id: 3, major: option})
    }

    const handleChangeName = (e) => {
        const name = e.target.value
        setData(name)
        valueSent({id: 1, name})
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

    useEffect(() => {
        setData(value)
    }, [value]);

    return (
        <div className='w-full'>
            <h2>{title}</h2>
            <input className={`p-2 w-full outline-none border-none bg-white shadow-md rounded-md
                ${title === 'Jurusan' || title === 'Kelas' ? 'hidden' : ''}
            `}
                   disabled={!update}
                   value={data}
                   onChange={(e) => handleChangeName(e)}
            />
            {title === 'Kelas' && (
                 update ? (
                    <Select
                        title={title}
                        listOptions={grade}
                        nameComponent={title}
                        defaultValue={value}
                        isUseDefaultValue={true}
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
                        isUseDefaultValue={true}
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