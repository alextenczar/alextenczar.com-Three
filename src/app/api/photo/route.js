const FLICKR_KEY = process.env.FLICKR_KEY;

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')



    const infoReq = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${FLICKR_KEY}&photo_id=${id}&format=json&nojsoncallback=1`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const sizesReq = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_KEY}&photo_id=${id}&format=json&nojsoncallback=1`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const photosReq = fetch(`https://www.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${FLICKR_KEY}&user_id=196309112%40N04&format=json&nojsoncallback=1&per_page=500`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })


    const geoReq = fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${FLICKR_KEY}&photo_id=${id}&format=json&nojsoncallback=1`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })


    const [infoRes, sizesRes, photosRes, geoRes] = await Promise.all([infoReq, sizesReq, photosReq, geoReq]);



    const exifData = await infoRes.json();
    const sizesData = await sizesRes.json();
    const photosData = await photosRes.json();
    const geoData = await geoRes.json();

    // Example: Return only the title from the info response
    const title = exifData.photo?.title?._content;


    let url = null
    let originalUrl = null

    for (const size of sizesData.sizes.size) {
        if (size.label === 'Large 2048') {
            url = size.source
            break
        }
        if (size.label === 'original') {
            originalUrl = size.source
            break
        }
    }

    if (originalUrl === null) {
        originalUrl = url
    }

    let lat = null
    let lon = null
    let geoName = null

    if (geoData.photo) {
        lat = geoData.photo.location.latitude;
        lon = geoData.photo.location.longitude;
        geoName = geoData.photo.location.locality._content + ', ' + geoData.photo.location.country._content;
    }


    if (url === null) {
        url = sizesData.sizes.size[sizesData.sizes.size.length - 1].source
    }

    let width = sizesData.sizes.size[sizesData.sizes.size.length - 1].width;
    let height = sizesData.sizes.size[sizesData.sizes.size.length - 1].height;

    if (width > 1280 || height > 1280) {
        const aspectRatio = width / height;

        if (width > height) {
            width = 1280;
            height = Math.round(1280 / aspectRatio);
        } else {
            height = 1280;
            width = Math.round(1280 * aspectRatio);
        }
    }

    let next = null
    let prev = null

    for (let i = 0; i < photosData.photos.photo.length; i++) {
        if (photosData.photos.photo[i].id === id) {
            if (i > 0) {
                prev = photosData.photos.photo[i - 1].id
            }
            if (i < photosData.photos.photo.length - 1) {
                next = photosData.photos.photo[i + 1].id
            }
        }
    }

    return Response.json({ exifData, url, originalUrl: originalUrl, width: width, height: height, lat: lat, lon: lon, geoName: geoName, prev: prev, next: next });
}