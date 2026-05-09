<div align="center">
  <h1>Oblivion 🚀</h1>
  <p><em>Cross-Chain Encrypted Dark Pool. Encrypted limit orders on Solana + bridgeless MPC settlement on EVM + compliance Viewing Keys.</em></p>
  <img src="docs/readme-hero.png" alt="Oblivion Hero" width="100%">
  
  <br/>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://encrypt-ika.vercel.app)
  [![Pitch Deck](https://img.shields.io/badge/Pitch-Deck-f59e0b.svg)](https://encrypt-ika.vercel.app/pitch)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/edycutjong/frontier-encrypt-ika)
  [![Superteam Earn](https://img.shields.io/badge/Superteam-Earn_Listing-blue.svg)](https://superteam.fun/earn/listing/encrypt-ika-frontier-april-2026)

  <br/>

  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
  ![iExec](https://img.shields.io/badge/iExec-FCD116?style=flat&logo=ethereum&logoColor=black)
  ![Vitest](https://img.shields.io/badge/Vitest-FCC72B?style=flat&logo=vitest&logoColor=white)
</div>

---

## 📸 See it in Action
*(Demo GIF and UI screenshots can be found in the `public` directory)*

<div align="center">
  <img src="public/og-image.png" alt="App Demo" width="100%">
</div>

## 💡 The Problem & Solution
A hedge fund manager lost $2.3M to MEV front-running on a cross-chain OTC trade last Tuesday. The order was visible on-chain for 400ms — long enough for a bot to sandwich it. Oblivion makes that impossible.

**Oblivion** solves this by providing: 
Cross-chain dark pool: encrypted limit orders on Solana + bridgeless MPC settlement on EVM + compliance Viewing Keys for auditors.

**Key Features:**
- ⚡ **High Performance:** Seamless integration and optimized workflows.
- 🔒 **Secure by Design:** Verifiable on-chain actions and robust data protection.
- 🎨 **Intuitive UX:** Beautiful, user-centric interface built for scale.

## 🏗️ Architecture & Tech Stack

### Tech Stack
| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | Next.js 16, React 19 | App Router, SSR, Server Components |
| **Styling** | Tailwind CSS v4 | High-performance responsive UI |
| **Language** | TypeScript | Strict type safety across the stack |
| **Privacy Engine**| iExec DataProtector | Encryption and confidential computing |
| **Core Logic** | Custom SDK Integration | Bridgeless MPC settlement and order matching |
| **Testing** | Vitest | Comprehensive unit and component testing |

For a detailed breakdown of our system architecture and data flow, please refer to the [Architecture Document](docs/ARCHITECTURE.md).

## 🏆 Sponsor Tracks Targeted
* **Sponsor Integration**: Encrypt + Ika ($7,500 grand prize)
* **Sponsor Integration**: Adevar Labs (audit credits)

## 🚀 Run it Locally (For Judges)

1. **Clone the repo:** `git clone https://github.com/edycutjong/oblivion.git`
2. **Install dependencies:** `npm install`
3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then add your required keys.
4. **Run the app:** `npm run dev`


---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
