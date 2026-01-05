import NextLink from "next/link"

interface Props {
    href: string;
    children: React.ReactNode;
}
const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} className="rt-reset rt-Link rt-variant-ghost" >
            {children}
        </NextLink>
    );
}

export default Link