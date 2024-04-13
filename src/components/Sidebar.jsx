import React from 'react'
import smkIcon from "../assets/smk.svg"
import LinkSideBar from './LinkSideBar'
import { faHouse, faNoteSticky, faPeopleGroup, faQrcode } from '@fortawesome/free-solid-svg-icons'
import useStoreSideBar from "../store/SidebarStore.js";

const links = [
  {
    id: 1,
    icon: faHouse,
    title: 'Halaman Utama',
    href: '/'
  },
  {
    id: 2,
    icon: faPeopleGroup,
    title: 'Data Siswa',
    href: '/students'
  },
  {
    id: 3,
    icon: faQrcode,
    title: 'Buat Kode Qr',
    href: '/qr'
  },
  {
    id: 4,
    icon: faNoteSticky,
    title: 'Cetak Laporan',
    href: '/report'
  }
]

const Sidebar = () => {
  return (
      <div className='w-full sm:w-96 bg-primary relative p-2 sm:gap-6'>
        <div className='py-2 flex sm:border-b-2 sm:border-b-neutral-200 relative'>
          <img src={smkIcon} width={30} alt='iconSmk'
               className='absolute sm:block hidden top-6 right-0 p-1 rounded-full bg-white'/>
          <div className='text-neutral-100'>
            <h1 className='text-2xl font-bold sm:block hidden'>Admin Absensi</h1>
            <h1 className='text-xs font-bold sm:block hidden'>SMK NEGERI 2 TABANAN</h1>
          </div>
        </div>
        <div
            className='flex w-full flex-row items-center sm:items-start sm:flex-col sm:mt-5 sm:justify-start justify-evenly gap-5 '>
          {links.map(data => (
              <LinkSideBar key={data.id} icon={data.icon} title={data.title} href={data.href} className="w-full"/>
          ))}
        </div>
      </div>
  )
}

export default Sidebar