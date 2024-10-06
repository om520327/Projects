/* 
A Promise in JavaScript is very similar to making a promise 
in the real world. When we make a promise we are making a 
commitment to something. For example, I promise to explain
JavaScript promises to you, my promise to you has 2 potential
outcomes: it is either fulfilled, meaning I eventually 
explained promises to you, or it is rejected meaning
I failed to keep my promise.

The Promise Object represents the eventual fulfillment 
or rejection of our promise and holds the resulting values. 
In the meantime, while we're waiting for the promise to be 
fulfilled, our code continues executing. Promises are the most 
popular modern way to write asynchronous code in JavaScript.
*/

Callasync()
async function Callasync() {
    const message = await applyDamage(25, 70)
    console.log(message)
}


function applyDamage(damage, currentHP) {
    return new Promise((resolve) => {
        const newHP = currentHP - damage;
        setTimeout(() => {
            resolve(`HP:${currentHP} Damage: ${damage} 
            New HP:${newHP}`)
        }, 1000)
    })
}


