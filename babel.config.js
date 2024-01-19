module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
          crypto: "./src/platform/crypto.ts",
        },
      },
    ],
  ],
};
