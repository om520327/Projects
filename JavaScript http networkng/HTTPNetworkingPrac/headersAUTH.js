/* 
A good example of a use case for headers is 
authentication. Often times a user's credentials 
are included in request headers. Credentials don't 
have much to do with the request itself, but simply 
authorize the requester to be allowed to make the 
request in question.
*/

const generatedApiKey = generateKey()
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations/52fdfc07-2182-454f-963f-5f0f9a621d72'
const newLocationData = {
    'discovered': false,
    'id': '52fdfc07-2182-454f-963f-5f0f9a621d72',
    'name': 'Bloodstone Swamp',
    'recommendedLevel': 10
}
//const newGeneratedApiKey = generateKey()
callAsyncGetLocation(generatedApiKey, url)
callAsyncPutLocation(generatedApiKey, url, newLocationData)


//callAsyncGetNewLocation(generatedApiKey, url)

async function callAsyncGetNewLocation(newGeneratedApiKey, url) {
    const newLocation = await getLocationResponse(newGeneratedApiKey, url)
    console.log(`Got new location:`)
    console.log(`- name: ${newLocation.name}, recommendedLevel: ${newLocation.recommendedLevel}`)
    console.log('---')
}


async function callAsyncGetLocation(generatedApiKey, url) {
    const oldLocation = await getLocationResponse(generatedApiKey, url)
    console.log(`Got old location:`)
    console.log(`- name: ${oldLocation.name}, recommendedLevel: ${oldLocation.recommendedLevel}`)
    console.log('---')

}

async function callAsyncPutLocation(generatedApiKey, url, newLocationData) {
    await putLocation(generatedApiKey, url, newLocationData)
    console.log('Location updated!')
    console.log('---')
    callAsyncGetNewLocation(generatedApiKey, url)
}

async function getLocationResponse(apiKey, url) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

async function putLocation(apiKey, url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}