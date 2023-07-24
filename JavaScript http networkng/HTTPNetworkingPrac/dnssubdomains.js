const bootdevAPIDomain = 'api.boot.dev'
const apiKey = generateKey()
getItemData(bootdevAPIDomain)

async function getItemData(domain) {
    const response = await fetch(`https://${domain}/v1/courses_rest_api/learn-http/items`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    const items = await response.json();
    logItems(items)
}

function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function logItems(items) {
    for (item of items) {
        console.log(item.name)
    }
}