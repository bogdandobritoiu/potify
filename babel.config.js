// @generated: @expo/next-adapter@4.0.12
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = {
  presets: ["@expo/next-adapter/babel"],
  plugins: [
    ["styled-components", { ssr: true }],
    ["module:react-native-dotenv"],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["react-native-reanimated/plugin"],
    [
      "module-resolver",
      {
        root: "./src",
        alias: {
          "@assets": ["./assets/images"],
          "@screens": ["./src/screens"],
          "@contexts": ["./src/contexts"],
          "@services": ["./src/services"],
          "@theme": ["./src/theme"],
          "@constants": ["./src/theme/constants"],
          "@hooks": ["./src/theme/hooks"],
          "@utils": ["./src/theme/utils"],
          "@atoms": ["./src/theme/components/atoms"],
          "@molecules": ["./src/theme/components/molecules"],
          "@organisms": ["./src/theme/components/organisms"],
          "@templates": ["./src/theme/components/templates"],
        },
        extensions: [
          ".ios.js",
          ".android.js",
          ".js",
          ".json",
          ".tsx",
          ".ts",
          ".jsx",
        ],
      },
    ],
  ],
};
