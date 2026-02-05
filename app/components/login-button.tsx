// components/login-button.tsx
import { signIn } from "@/app/auth" // Path to your auth.ts file

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Sign in with Google
            </button>
        </form>
    )
}