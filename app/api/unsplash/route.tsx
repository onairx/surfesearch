import { NextResponse } from 'next/server';

export async function GET() {
    const unsplashApiKey = process.env.API_UNSPLASH;
    const unsplashUrl = `https://api.unsplash.com/photos/random/?&count&orientation=landscape&auto=compress`
    try {
        const response = await fetch(unsplashUrl, {
            headers: {
                Authorization: `Client-ID ${unsplashApiKey}`
            }
        })
        const data = await response.json()
        return NextResponse.json(data.urls.full)
    } catch (error) {
        console.log(error)
    }
}