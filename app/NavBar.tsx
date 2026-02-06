'use client';
import Link from 'next/link';
import { GiAlienBug } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';
const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues/list", label: "Issues" },
    ]
    const { status, data: session } = useSession()
    return (
        <nav className=' mb-5 border-b h-17  py-6'>
            <Container>
                <Flex justify="between" mx="3">
                    <Flex align="center" gap="3">
                        <Link href="/"><GiAlienBug className='w-7' />  </Link>
                        <ul className='flex space-x-6'>
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link href={link.href} className={classNames({
                                        "text-neutral-950": link.href === currentPath,
                                        "text-neutral-400": link.href !== currentPath,
                                        "hover:text-indigo-600 transition-colors": true
                                    })} > {link.label}</Link>
                                </li>
                            )}

                        </ul>
                    </Flex>
                    <Box>

                        {status === "authenticated" && <Link href="/api/auth/signout">Log Out </Link>}
                        {status === "unauthenticated" && <Link href="/api/auth/signin">Log In </Link>}

                    </Box>
                </Flex>
            </Container>

        </nav >
    )
}

export default NavBar