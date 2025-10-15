import { type Config } from "tailwindcss";
import fontFamily from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
