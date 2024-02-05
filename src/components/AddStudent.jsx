import React, {useState} from "react";

const AddStudent = () => {
    const [image, setImage] = useState('')
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }


    const handleInputFile = async (e) => {
        const file = e.target.files[0]
        try {
            const form = new FormData();
            form.append('file', file)
            const base64 = await convertToBase64(file)
            setImage(prevState => base64)
            console.log(base64)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='w-full bg-white shadow-md rounded-md p-3'>
            <h1 className='text-2xl p-2 rounded-md bg-teal-900 font-bold text-white w-fit'>Tambah Siswa</h1>
            <div className='mt-10'>
                <form action="">
                    <div>
                        <label className='block text-primary font-semibold mt-4'
                               htmlFor="nisn">
                            Nisn Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="text"
                            name='nisn'
                            id='nisn'
                            placeholder='Masukkan Nisn Siswa'
                        />
                    </div>
                    <div>
                        <label className='block text-primary font-semibold mt-4'
                               htmlFor="name">
                            Nama Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="text"
                            name='name'
                            id='name'
                            placeholder='Masukkan Nama Siswa'
                        />
                    </div>
                    <div>
                        <label className='block text-primary font-semibold mt-4'
                               htmlFor="name">
                            Gambar Siswa
                        </label>
                        <input
                            className='w-full h-10 p-2 text-xs  rounded-md shadow-md focus:outline-none focus:border-teal-900 transition-all'
                            type="file"
                            name='file'
                            id='file'
                            onChange={(e) => handleInputFile(e)}

                        />
                    </div>
                    <div className='w-full mt-8 grid place-items-center'>
                        <div
                            className='w-11/12 border-dashed h-[330px] border-2 p-3 overflow-hidden rounded-xl grid place-items-center'>
                            {image === '' ? (
                                <h1 className='text-5xl font-bold opacity-20'>No File Chosen</h1>
                            ) : (
                                <img src={image} alt="" width={200} height={300}
                                     className='rounded-md h-full'/>
                            )}
                        </div>
                    </div>
                    <button
                        className='w-full mt-12 h-14 bg-teal-900 rounded-md text-white font-semibold'>Kirim
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;