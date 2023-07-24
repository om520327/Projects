/* 
a URL's query parameters appear next in the 
URL structure but are not always present - 
they're optional. For example:
https://www.google.com/search?q=boot.dev

q=boot.dev is a query parameter. Like headers, 
query parameters are key / value pairs. 
In this case, q is the key and boot.dev is 
the value.
*/

const baseURL = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'
const apiKey = generateKey()
callAsync(baseURL, apiKey)

async function callAsync(baseURL, apiKey) {

    const users = await getUsers(baseURL, apiKey)
    for (const user of users) {
        console.log(`got user with name: ${user.characterName}, and level: ${user.level}`)
    }
}

async function getUsers(url, apiKey) {
    const fullURL = `${url}?sort=level`
    const response = await fetch(fullURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey
        }
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