const { crawlPage } = require('./crawl.js')
/* 
REASON FOR < 3:
first arg:
is interperter, first arg to any program
is the name of program 
second arg:
is the name of our code (entry port file full path)
third argument:
is one we are actually passing into
our program
*/
function index() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("to0 many command like args")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`crawl baby crawl URL:${baseURL}`)
    crawlPage(baseURL)
}

index()