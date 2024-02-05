import BoxInfoClass from "./BoxInfoClass.jsx";

const ListClass = () => {
    return (
        <div className='w-full h-fit p-6 bg-white rounded-xl relative'>
            <h1 className='text-2xl font-extrabold text-primary'>Kelas Yang Ada</h1>
            <div className='flex flex-wrap justify-around gap-8 mt-6'>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Akutansi"} grade={"XII"}/>
                <BoxInfoClass className={"Tata Boga"} grade={"XII"}/>
                <BoxInfoClass className={"Tabel Maner"} grade={"XII"}/>
                <BoxInfoClass className={"Multi Media"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
                <BoxInfoClass className={"Rekayasa Perangkat Lunak"} grade={"XII"}/>
            </div>
        </div>
    )
}

export default ListClass;