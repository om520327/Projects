const { normailzeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normailzeURL strip protocol https', () => {
    const input = 'https://heep.hepp.dev/path'
    const actual = normailzeURL(input)
    const expected = 'heep.hepp.dev/path'
    expect(actual).toEqual(expected)
})

test('normailzeURL strip protocol trailing /', () => {
    const input = 'https://heep.hepp.dev/path/'
    const actual = normailzeURL(input)
    const expected = 'heep.hepp.dev/path'
    expect(actual).toEqual(expected)
})

test('normailzeURL strip protocol capitals', () => {
    const input = 'https://HEEp.hepp.dev/path/'
    const actual = normailzeURL(input)
    const expected = 'heep.hepp.dev/path'
    expect(actual).toEqual(expected)
})

test('normailzeURL strip protocol http', () => {
    const input = 'http://heep.hepp.dev/path/'
    const actual = normailzeURL(input)
    const expected = 'heep.hepp.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://heep.hepp.dev/path/">
        Hepp.dev Blog
        </a>
    </body>
</html>`
    const inputBaseURL = "https://heep.hepp.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://heep.hepp.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
        Hepp.dev Blog
        </a>
    </body>
</html>`
    const inputBaseURL = "https://heep.hepp.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://heep.hepp.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absoulte and relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://heep.hepp.dev/path1/">
            Hepp.dev Blog p1
        </a>
        <a href="/path2/">
            Hepp.dev Blog p2
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://heep.hepp.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://heep.hepp.dev/path1/", "https://heep.hepp.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
        Invalid URL
        </a>
    </body>
</html>`
    const inputBaseURL = "https://heep.hepp.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})