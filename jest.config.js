module.exports = {
    'testEnvironment': 'node',
    'roots': [
      '<rootDir>/__tests__'
    ],
    'moduleNameMapper': {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy'
    },
    'preset': 'ts-jest',
    'transform': {
      '^.+\\.tsx?$': 'ts-jest'
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    'moduleFileExtensions': [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node'
    ],
    'testPathIgnorePatterns': ['<rootDir>/node_modules/'],
    'globals': {
      'ts-jest': {
        'tsConfig': '<rootDir>/tsconfig.jest.json'
      }
    }
}