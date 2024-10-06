/* 
Hypertext Transfer Protocol Secure or HTTPS is an extension 
of the HTTP protocol. HTTPS secures the data transfer 
between client and server by encrypting all of the 
communication.

HTTPS allows a client to safely share sensitive information 
with the server through an HTTP request, such as credit card 
information, passwords, or bank account numbers.
*/

const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'
const uuid = '2f8282cb-e2f9-496f-b144-c0aa4ced56db'
const apiKey = generateKey()
callAsync(url, uuid)

async function callAsync(url, uuid) {
    const user = await getUserById(url, uuid)
    logUser(user)
}

async function getUserById(url, id) {
    const path = `${url}/${id}`
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

function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function logUser(user) {
    console.log(`User uuid: ${user.id}, Character Name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, PVP Status: ${user.pvpEnabled}, User name: ${user.user.name}`)
}

