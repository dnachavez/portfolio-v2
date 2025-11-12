<div align="center">
<img alt="Portfolio" src="public/demo.gif" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdnachavez%2Fportfolio-v2)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, TypeScript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog with MDX support
- Responsive for different devices
- Optimized for Next.js and Vercel
- AI-powered chatbot with Groq, openai/gpt-oss-120b, and Mem0
- Dark mode support with next-themes
- Code syntax highlighting with Shiki

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dnachavez/portfolio-v2
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio-v2
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

# Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS, Shadcn/UI, Magic UI
- **Animation:** Framer Motion
- **Content:** MDX with Gray Matter
- **AI:** Groq, openai/gpt-oss-120b, Mem0, Vercel AI SDK
- **Code Highlighting:** Shiki, Rehype Pretty Code
- **Icons:** Lucide React, Radix Icons

# License

Licensed under the [MIT license](https://github.com/dnachavez/portfolio-v2/blob/master/LICENSE).
