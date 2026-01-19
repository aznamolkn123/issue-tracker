'use client';
import Link from 'next/link';
import { GiAlienBug } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues/list", label: "Issues" },
    ]
    return (
        <nav className='flex space-x-6 mb-5 border-b h-17 items-center pl-4'>
            <Link href="/"><GiAlienBug className='w-7' />  </Link>
            <ul className='flex space-x-6'>
                {links.map(link => <Link key={link.href} href={link.href} className={classNames({
                    "text-neutral-950": link.href === currentPath,
                    "text-neutral-400": link.href !== currentPath,
                    "hover:text-indigo-600 transition-colors": true
                })} > {link.label}</Link>)}

            </ul>
        </nav >
    )
}

export default NavBar