import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // 允许使用 any 类型
      "@typescript-eslint/no-explicit-any": "off",
      // 允许未使用的变量
      "@typescript-eslint/no-unused-vars": "warn",
      // 允许 React Hook 依赖项警告
      "react-hooks/exhaustive-deps": "warn",
    },
  }),
]
export default eslintConfig;
