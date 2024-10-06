/* 
JSON isn't just something we get from the server, we can also 
send JSON data!
In JavaScript, two of the main methods we have access to are 
JSON.parse(), and JSON.stringify()

JSON.stringify() is particularly useful for sending JSON.

As you may expect the JSON stringify() method does the 
opposite of parse. It takes a JavaScript object or value as 
input and converts it into a string. This is useful when we 
need to serialize the objects into strings to send them to 
our server or store them in a database.
*/

const apiKey = generateKey()
const locationID = '0194fdc2-fa2f-4cc0-81d3-ff12045b73c8'
callAsync(locationID)

async function callAsync(locationID) {
    const location = await getLocationById(locationID)
    console.log(`Location '${location.name}' fetched. Data: ${JSON.stringify(location)}`)
    location.discovered = true
    await updateLocationById(locationID, location)
    console.log(`Location '${location.name}' was discovered!`)

    const updatedLocation = await getLocationById(locationID)
    console.log(`Location '${updatedLocation.name}' fetched. Data: ${JSON.stringify(updatedLocation)}`)

}

async function updateLocationById(id, locationObj) {
    const path = `https://api.boot.dev/v1/courses_rest_api/learn-http/locations/${id}`
    const response = await fetch(path, {
        method: 'PUT',
        mode: 'cors',
        headers: getHeaders(),
        body: JSON.stringify(locationObj)
    })
    return response.json()
}

async function getLocationById(id) {
    const path = `https://api.boot.dev/v1/courses_rest_api/learn-http/locations/${id}`
    const response = await fetch(path, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

function getHeaders() {
    return {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
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

function parseLocation(locationString) {
    try {
        const locObj = JSON.parse(locationString)
        printLocationObj(locObj)
    } catch (err) {
        console.log('Invalid Json String')
    }
}



function printLocationObj(parsed) {
    console.log(`id: ${parsed.id}`)
    console.log(`discovered: ${parsed.discovered}`)
    console.log(`name: ${parsed.name}`)
    console.log(`recommendedLevel: ${parsed.recommendedLevel}`)
}

parseLocation(`
{
	"discovered": false,
	"id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
	"name": "Bandit Camp",
	"recommendedLevel": 14
}
`)

console.log('---')

parseLocation(`
{
	"discovered": false,
	"id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
	"name": "Bandit Camp",
	"recommendedLevel": 14
}
`)
console.log('---')