/* 
HTTP defines a set of methods that we use every time we make a request. 
We have used some of these methods in previous exercises, but it's time 
we dive into them and understand the differences and use cases behind the 
different methods.

The GET method is used to 'get' a representation of a specified resource. 
You are not taking the data away from the server, but rather getting a 
representation, or copy, of the resource in its current state. A get request 
is considered a safe method to call multiple times because it doesn't alter 
the state of the server.

In this course, we have been and will continue to use the Fetch API to make 
HTTP requests. The fetch() method accepts an optional init object parameter 
as its second argument that we can use to define things like:
method: The HTTP method of the request, like GET.
headers: The headers to send.
mode: Used for security, we'll talk about this in future courses.
body: The body of the request. Often encoded as JSON.
*/

/* 
An HTTP POST request sends data to a server, typically to create a new resource. 
The body of the request is the payload that is being sent to the server with the 
request, its type is indicated by the Content-Type header.

The body of the request is the payload that is being sent to the server with 
the request, its type is indicated by the Content-Type header - for us, that's 
going to be JSON. POST requests are generally not safe methods to call multiple 
times, because it alters the state of the server. You wouldn't want to accidentally 
create 2 accounts for the same user, for example.
*/


const generatedKey = generateKey()
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'
const userToCreate = {
    characterName: 'Grendel',
    class: 'Warrior',
    level: 1,
    pvpEnabled: false,
    user: {
        name: 'Allan',
        location: 'USA',
        age: 27
    }
}
callAsync(url, generatedKey, userToCreate)



async function createUser(apiKey, url, data) {
    const resp = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
            'X-API-Key': apiKey
        },
        body: JSON.stringify(data)
    })
    return await resp.json();
}






async function callAsync(url, generatedKey, userToCreate) {
    console.log('Retrieving user data...')
    const users = await getUsers(url, generatedKey)
    logUsers(users)

    console.log('---')

    console.log('Creating new character...')
    const creationResponse = await createUser(generatedKey, url, userToCreate)
    console.log(`Creation response body: ${JSON.stringify(creationResponse)}`)
    console.log('---')


    console.log('Retrieving user data...')
    const userDataSecond = await getUsers(url, generatedKey)
    logUsers(userDataSecond)
    console.log('---')
}
async function getUsers(url, apiKey) {
    const response = await fetch(url, {
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

function logUsers(users) {
    for (const user of users) {
        console.log(`Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`)
    }
}

