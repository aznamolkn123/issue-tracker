import Link from 'next/link'
import React from 'react'
import { GiAlienBug } from "react-icons/gi";

const NavBar = () => {
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues", label: "Issues" },
    ]
    return (
        <nav className='flex space-x-6 mb-5 border-b h-17 items-center pl-4'>
            <Link href="/"><GiAlienBug className='w-7' />  </Link>
            <ul className='flex space-x-6'>
                {links.map(link => <Link key={link.href} href={link.href} className='text-lime-200 hover:text-indigo-200 transition-colors'>{link.label}</Link>)}

            </ul>
        </nav >
    )
}

export default NavBar