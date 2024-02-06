const UpdateAbsensi = ({onClick}) => {
    const sendCloseAction = () => {
        onClick(false)
    }
    return (
        <div className='w-full h-full bg-neutral-200 absolute z-50'>
            <div>
                <div className='w-1/2 h-auto bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-md'>
                    <h1 className='text-xl font-semibold'>Update Absensi</h1>
                    <div className='mt-5'>
                        <div>
                            <label htmlFor="nisn">Nisn</label>
                            <input type="text" value={'0291282371'} disabled={true} id='nisn' className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'/>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="nama">Nama</label>
                            <input type="text" value={'I Putu Bayu Gelgel Wiyantara'} disabled={true} id='nama' className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'/>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="kehadiran">Kehadiran</label>
                            <select name="kehadiran" id="kehadiran" className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'>
                                <option value="Hadir">Hadir</option>
                                <option value="Izin">Izin</option>
                                <option value="Sakit">Sakit</option>
                                <option value="Alpa">Alpa</option>
                            </select>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="jam_masuk">Jam Masuk</label>
                            <input type="time" id='jam_masuk' className='w-full border-none outline-none bg-neutral-100 p-2 rounded-md'/>
                        </div>
                        <div className='mt-5 flex justify-end gap-3'>
                            <button onClick={() => sendCloseAction()}
                                className='bg-red-700 text-white font-semibold p-2 rounded-md'>Batal</button>
                            <button
                                onClick={() => sendCloseAction()} className='bg-blue-700 text-white font-semibold p-2 rounded-md'>Simpan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateAbsensi;