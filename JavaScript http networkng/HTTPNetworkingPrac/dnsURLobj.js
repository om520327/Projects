const bootdevURL = 'https://boot.dev/learn/learn-python'
//const domainName = getDomainNameFromURL(bootdevURL)
//console.log(`The domain name for ${bootdevURL} is ${domainName}`)
const fantasyQuestURL = 'http://dragonslayer:pwn3d@fantasyquest.com:8080/maps?sort=rank#id'
printURLParts(fantasyQuestURL)


function getDomainNameFromURL(url) {
    const urlObj = new URL(url)
    return urlObj.hostname
}
/* 
http://testuser:testpass@testdomain.com:8080/testpath?testsearch=testvalue#testhash
protocol: http:
(O)username: testuser
(O)password: testpass
hostname: testdomain.com
port: 8080
pathname: /testpath
search: ?testsearch=testvalue
hash: #testhash 
*/
function printURLParts(urlString) {
    const urlObj = new URL(urlString)
    console.log(`protocol: ${urlObj.protocol}`)
    console.log(`username: ${urlObj.username}`)
    console.log(`password: ${urlObj.password}`)
    console.log(`hostname: ${urlObj.hostname}`)
    console.log(`port: ${urlObj.port}`)
    console.log(`pathname: ${urlObj.pathname}`)
    console.log(`search: ${urlObj.search}`)
    console.log(`hash: ${urlObj.hash}`)

}



