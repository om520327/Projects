/* 
While the await keyword can be used in place of .then() to 
resolve a promise, the async keyword can be used in place of
 New Promise() to create a new promise.

When a function is prefixed with the async keyword, 
it will automatically return a Promise. That promise 
resolves with the value that your code returns from the 
function. You can think of async as "wrapping" your function 
within a promise.
*/

asyncGetItemCall()
async function getItemData() {
    const response = await fetch('https://api.boot.dev/v1/courses_rest_api/learn-http/items', getSettings())
    return response.json()
}


async function asyncGetItemCall() {
    const items = await getItemData()
    logItems(items)
}


function getSettings() {
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': 'Testing',
            'Content-Type': 'application/json'
        }
    }
}

function logItems(items) {
    for (const item of items) {
        console.log(item.name)
    }
}