import React from 'react'
import ProfileIcon from './icons/ProfileIcon'
import Link from 'next/link'

const Navigationbar = () => {
    return (
        <nav className='flex items-center justify-between px-5 py-4 border-b-[1px]'>
            <Link href='/'>
                <h1 className="font-bold text-xl">&lt;Typing_Dev&gt;</h1>
            </Link>
            <ProfileIcon />
        </nav>
    )
}

export default Navigationbar