'use client';
import Link from 'next/link';
import { GiAlienBug } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Skeleton from '../app/components/Skeleton';
const NavBar = () => {

    return (
        <nav className=' mb-5 border-b h-17  py-6'>
            <Container>
                <Flex justify="between" mx="3">
                    <Flex align="center" gap="3">
                        <Link href="/"><GiAlienBug className='w-7' />  </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>

        </nav >
    )
}

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues/list", label: "Issues" },
    ]
    return (
        <ul className='flex space-x-6'>
            {links.map(link =>
                <li key={link.href}>
                    <Link href={link.href} className={classNames({
                        "nav-link": true,
                        "text-neutral-950!": link.href === currentPath,

                    })} > {link.label}</Link>
                </li>
            )}

        </ul>
    )
}
const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === "loading") return <Skeleton width="3rem" />;

    if (status === "unauthenticated")
        return <Link className='nav-link' href="/api/auth/signin">Log In </Link>;

    return (<Box>

        {
            < DropdownMenu.Root >
                <DropdownMenu.Trigger>
                    <button className="IconButton" aria-label="User options">
                        <Avatar
                            src={session!.user!.image!}
                            fallback="?"
                            size="2"
                            radius="full"
                            className='cursor-pointer'
                            referrerPolicy='no-referrer'
                        />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <Text size="2">
                        <DropdownMenu.Item><Link href="/api/auth/signout">Log Out </Link></DropdownMenu.Item>
                    </Text>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

        }


    </Box>)
}

export default NavBar