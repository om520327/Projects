const { normailzeURL } = require('./crawl.js')
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