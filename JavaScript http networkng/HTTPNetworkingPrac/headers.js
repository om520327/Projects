/* 
An HTTP header allows clients and servers to pass additional 
information with each request or response. Headers are just 
case-insensitive key-value pairs that pass additional metadata 
about the request or response.

HTTP requests from a web browser carry with them many headers, 
including but not limited to:
The type of client (e.g. Google Chrome)
The Operating system (e.g. Windows)
The preferred language (e.g. US English)
As developers, we can also define custom headers in each request.

The Headers API allows us to perform various actions on our 
request and response headers such as retrieving, setting, and 
removing them. We can access the headers object through the Request.
headers and Response.headers properties.

HTTP Requests:
BODY:data/information we care about 
HEADERS:additonal info/data(metadata) that the server 
can use to figure things out, things like locaton 
are very often transmitted through headers
*/

const apiKey = generateKey()
const bootdevAPIDomain = 'api.boot.dev'
callAsyncData(bootdevAPIDomain)

function logContentType(resp) {
    const headerVal = resp.headers.get('content-type')
    console.log(headerVal)
}

async function callAsyncData(bootdevAPIDomain) {
    const items = await getItemData(bootdevAPIDomain)
    logContentType(items)
}

async function getItemData(domain) {
    const response = await fetch(`https://${domain}/v1/courses_rest_api/learn-http/items/0194fdc2-fa2f-4cc0-81d3-ff12045b73c8`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    return response
}

function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}