// Side-effect CSS imports (e.g. `import "./globals.css"`).
// TypeScript 6 reports TS2882 for these without an ambient declaration;
// Next only ships declarations for `*.module.css`.
declare module "*.css";
declare module "*.scss";
