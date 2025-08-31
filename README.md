# Buy Me A BitCoffee

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-Support-f7931a?style=flat-square&logo=bitcoin&logoColor=white)](https://buymeabitcoffee.vercel.app/btc/bc1qw4q8nn7pknen33han7znsv6zhrrfta53sr86fw?identifier=Buy+Me+a+BitCoffee)

A modern, lightweight web application for receiving Bitcoin donations with QR code generation. Built to make cryptocurrency donations as simple as possible for both creators and supporters.

## Features

- **Multiple Badge Styles** - Generate beautiful donation badges using shields.io styling
- **QR Code Generation** - Automatic Bitcoin address QR codes for easy mobile scanning
- **Clean UI** - Modern interface built with shadcn/ui and Tailwind CSS
- **Fast & Responsive** - Powered by Next.js 15 with Turbopack for lightning-fast builds
- **Easy Integration** - Simple markdown badges for GitHub, websites, and documentation
- **Dark Mode Support** - Toggle between light and dark themes
- **Client-Side Only** - No data stored for maximum privacy

## Styles

### Badge Styles

Choose from multiple shield.io styles to match your project's aesthetic. All badges link directly to a QR code page for seamless Bitcoin donations.

**flat style**

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=flat&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)

```md
<!-- Markdown -->

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=flat&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)
```

**flat-square style**

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=flat-square&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)

```md
<!-- Markdown -->

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=flat-square&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)
```

**for-the-badge style**

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=for-the-badge&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)

```md
<!-- Markdown -->

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=for-the-badge&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)
```

**social style**

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=social&logoColor=black&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)

```md
<!-- Markdown -->

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=social&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/your-on-chain-btc-address)
```

## 📋 Usage

Using like shown above, you're just proxying shield.io (nothing wrong, by the way), but you can use this badge to redirect to a QR Code page where donors will be able to scan and send you support.

Replace `<your-address>` with your actual Bitcoin address :

```md
[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=flat-square&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/<your-address>)
```

Example with a real address:

[![buy-me-a-bitcoffee](https://img.shields.io/badge/Buy%20Me%20a%20BitCoffee-f7931a?logo=bitcoin&style=flat-square&logoColor=white&color=f7931a&label=Donate)](https://buymeabitcoffee.vercel.app/btc/bc1qw4q8nn7pknen33han7znsv6zhrrfta53sr86fw)

## Try It Now

**Visit the live app**: [https://buymeabitcoffee.vercel.app](https://buymeabitcoffee.vercel.app)

No signup required! Simply:

1. Enter your Bitcoin address
2. Customize your badge style and text
3. Generate your donation page and embed code
4. Copy the markdown and add it to your GitHub README

## Development Setup

Want to contribute or run locally? Here's how:

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Local Installation

```bash
# Clone the repository
git clone https://github.com/cicerotcv/buymeabitcoffee.git
cd buymeabitcoffee

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server with Turbopack
pnpm dev
```

The app will be available at [http://localhost:3000/](http://localhost:3000/).

### Building for Production

```bash
pnpm build
pnpm start
```

## 🤝 Contributing

We welcome contributions! This is an open-source project and we'd love your help to make it better.

### Ways to Contribute

- **Report bugs** - Found an issue? [Open an issue](https://github.com/cicerotcv/buymeabitcoffee/issues)
- **Suggest features** - Have ideas? We'd love to hear them!
- **Submit PRs** - Fix bugs, add features, improve docs
- **Improve docs** - Help others understand the project better
- **Star the repo** - Show your support!
- **Donate** - Support the project with Bitcoin! [Donate here](https://buymeabitcoffee.vercel.app/btc/bc1qw4q8nn7pknen33han7znsv6zhrrfta53sr86fw?identifier=Buy+Me+a+BitCoffee)

### Development Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test locally
4. Commit with conventional commits: `git commit -m "feat: add amazing feature"`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- We use TypeScript, ESLint, and Prettier
- Run `pnpm lint` to check your code
- Run `pnpm prettier:fix` to format your code

## License

This project is open source and available under the [GNU General Public License v3.0](LICENSE).

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query
- **Theme**: next-themes for dark mode support
- **Development**: Turbopack for fast builds and hot reload
