module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|jpg|png)$': 'identity-obj-proxy',
  },
};
