import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const apiKey = process.env.API_BRAVE
    const searchUrl = `https://api.search.brave.com/res/v1/web/search?q=${query}`
    const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
            'X-Subscription-Token': `${apiKey}`
        }
    })
    const data = await response.json()
    return new Response(JSON.stringify(data))
}
