export default {
  // Example: Add your Jest options here
  transform: {},
  // If you want to transform JS files with Babel:
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // Optional: If you want to ignore transforming node_modules
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  // Optional: If you want to specify test environment
  testEnvironment: 'node',
};
