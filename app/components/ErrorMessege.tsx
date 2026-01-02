import { Text } from "@radix-ui/themes"
import { PropsWithChildren } from "react"

const ErrorMessege = ({ children }: PropsWithChildren) => {
    if (!children) return null;
    return (

        <Text color="red" as="p">{children}</Text>
    )
}

export default ErrorMessege