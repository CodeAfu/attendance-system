'use server'

interface EnvVariableResult {
    url: string | undefined
}

export default async function QrEnvVariable(): Promise<EnvVariableResult> {
    'use server';

    return {
        url: process.env.BACKEND_BASE_URL || undefined
    }
}