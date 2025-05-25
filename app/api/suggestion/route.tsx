import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');
    const suggetionKey = process.env.API_BRAVE_SUGGESTION_KEY;
    const suggestionUrl = `https://api.search.brave.com/res/v1/suggest/search?q=${search}`;
    const response = await fetch(suggestionUrl, {
        method: 'GET',
        headers: {
            'X-Subscription-Token': `${suggetionKey}`
        }
    })
    const data = await response.json()
    return NextResponse.json(data)
}