'use client'
import { ErrorMessege, Spinner } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { createIssueSchema } from "@/app/validationScemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
type IssueFormData = z.infer<typeof createIssueSchema>
const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>(
        { resolver: zodResolver(createIssueSchema) }
    );
    const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
        ssr: false
    });
    const [error, setError] = useState("")
    const [isSubmitting, setSubmitting] = useState(false)
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')

        } catch (error) {
            setSubmitting(false)
            setError("An unsxpected error occurred!")

        }
    })
    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-">{error}</Callout.Root>}
            <form className="space-y-3" onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")}>
                </TextField.Root>
                <ErrorMessege>{errors.title?.message}</ErrorMessege>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessege>{errors.description?.message}</ErrorMessege>
                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>

            </form>
        </div >
    )
}

export default IssueForm