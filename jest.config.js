
module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}'
    ],
    coverageDirectory: 'coverage',
    testEnviromment : 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    }

}