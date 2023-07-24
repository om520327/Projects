/* 
JavaScript Object Notation, or JSON, is a standard for 
representing structured data based on JavaScript's object 
syntax.

JSON is commonly used to transmit data in web apps using 
HTTP. The HTTP fetch() requests we have been using in this 
course have been returning Fantasy Quest locations, users, 
and items as JSON data!

JSON is just a stringified JavaScript object. 

JavaScript provides us with some easy tools to help us work 
with JSON. After making an HTTP request with the fetch() API, 
we get a Response object. That response object offers us some 
methods that help us interact with the response. One such 
method is the .json() method. The .json() method takes the 
response stream returned by a fetch request and returns a 
promise that resolves into a JavaScript object parsed from 
the JSON body of the HTTP response!
*/
const apiKey = generateKey()
callAsync()

async function getLocations() {
    const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations'
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}

async function callAsync() {
    const locations = await getLocations()
    console.log('Got some locations from the server.')
    for (const location of locations) {
        console.log(`- name: ${location.name}, recommendedLevel: ${location.recommendedLevel}`)
    }
}

function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}