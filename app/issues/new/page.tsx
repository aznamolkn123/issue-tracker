'use client'
import { Button, TextField } from "@radix-ui/themes"
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
const NewIssuePage = () => {

    const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
        ssr: false
    });
    return (
        <div className="space-y-3 max-w-xl">
            <TextField.Root placeholder="Title">
            </TextField.Root>
            <SimpleMDE placeholder="Description" />
            <Button>Submit New Issue</Button>

        </div>
    )
}

export default NewIssuePage