/* 
The HTTP PUT method creates a new resource or replaces a representation of the target resource 
with the contents of the request's body. In short, it updates a resource's properties.
await fetch(url, {
   method: 'PUT',
   mode: 'cors',
   headers: {
   'Content-Type': 'application/json'
   },
   body: JSON.stringify(data)
})

You may be thinking PUT is similar to POST or PATCH, and frankly, you'd be right! 
The main difference is that PUT is meant to be idempotent, meaning multiple identical 
PUT requests should have the same effect on the server. In contrast, several identical 
POST requests would have additional side effects, such as creating multiple copies of the 
resource.
*/

const userId = '2f8282cb-e2f9-496f-b144-c0aa4ced56db'
const generatedKey = generateKey()
const baseURL = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'
callAsync(userId, generatedKey, baseURL)

async function callAsync(userId, generatedKey, baseURL) {
    const userData = await getUserById(baseURL, userId, generatedKey)
    logUser(userData)

    console.log(`Updating user with id: ${userId}`)
    userData.characterName = 'Dellbiar'
    userData.level = 7
    userData.class = 'Warrior'
    userData.pvpEnabled = true
    userData.user.name = 'Allan'
    await updateUser(baseURL, userId, userData, generatedKey)

    const newUser = await getUserById(baseURL, userId, generatedKey)
    logUser(newUser)
}

async function updateUser(baseURL, id, data, apiKey) {
    const fullURL = `${baseURL}/${id}`
    await fetch(fullURL, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

async function getUserById(baseURL, id, apiKey) {
    const fullURL = `${baseURL}/${id}`
    const response = await fetch(fullURL, {
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

