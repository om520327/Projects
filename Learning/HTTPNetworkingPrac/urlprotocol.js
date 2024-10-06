let email = 'slayer@fquest.app'
console.log(`The mailto link for ${email} is: ${getMailtoLinkForEmail(email)}`)
email = 'killer@fquest.app'
console.log(`The mailto link for ${email} is: ${getMailtoLinkForEmail(email)}`)
/* 
Some examples of different URL protocols:
http
ftp
mailto
https
For example:
http://example.com
mailto:noreply@fantasyquest.app
*/
function getMailtoLinkForEmail(email) {
    return `mailto: ${email}`
}