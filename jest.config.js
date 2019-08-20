module.exports = {
    preset: "ts-jest",
    verbose: true,
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.ts?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    roots: [
      "<rootDir>/src"
    ]
}