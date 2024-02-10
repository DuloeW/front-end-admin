import BoxInfoClass from "./BoxInfoClass.jsx";

const ListClass = ({classes}) => {
    return (
        <div className='w-full h-fit p-6 bg-white rounded-xl relative'>
            <h1 className='text-2xl font-extrabold text-primary'>Kelas Yang Ada</h1>
            <div className='flex flex-wrap justify-around gap-8 mt-6'>
                {classes.map((dataClass) => (
                    <div key={dataClass.id}>
                        <BoxInfoClass className={dataClass.major} grade={dataClass.grade} dataClass={dataClass}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListClass;