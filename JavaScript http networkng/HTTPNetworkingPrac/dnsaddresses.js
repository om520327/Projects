
const domain = 'api.boot.dev'
fetchIPAddress(domain)
async function fetchIPAddress(domain) {
    const resp = await fetch(`https://cloudflare-dns.com/dns-query?name=api.boot.dev&type=A`,
        {
            headers: {
                'accept': 'application/dns-json'
            }
        })
    const respObject = await resp.json();

    if (!respObject) {
        console.log('something went wrong in fetchIPAddress')
    } else {
        console.log(`found IP address for domain ${domain}: ${respObject.Answer[0].data}`)
    }

}


