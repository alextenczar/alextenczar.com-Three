const FLICKR_KEY = process.env.FLICKR_KEY;

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const quantity = searchParams.get('quantity')
    const res = await fetch(`https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${FLICKR_KEY}&user_id=196309112%40N04&format=json&nojsoncallback=1&per_page=${quantity}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const response = await res.json()


    return Response.json({ response })
}