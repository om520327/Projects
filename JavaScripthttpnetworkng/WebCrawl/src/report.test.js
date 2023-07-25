const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https:/heepheeep.dev/path': 2,
        'https:/heepheeep.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https:/heepheeep.dev', 3],
        ['https:/heepheeep.dev/path', 2]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 6 pages', () => {
    const input = {
        'https:/heepheeep.dev/path': 2,
        'https:/heepheeep.dev': 5,
        'https:/heepheeep.dev/path2': 3,
        'https:/heepheeep.dev/path4': 1,
        'https:/heepheeep.dev/path3': 7,
        'https:/heepheeep.dev/path5': 9
    }
    const actual = sortPages(input)
    const expected = [
        ['https:/heepheeep.dev/path5', 9],
        ['https:/heepheeep.dev/path3', 7],
        ['https:/heepheeep.dev', 5],
        ['https:/heepheeep.dev/path2', 3],
        ['https:/heepheeep.dev/path', 2],
        ['https:/heepheeep.dev/path4', 1]
    ]
    expect(actual).toEqual(expected)
})