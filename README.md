<div align="center">
  <img src="docs/assets/readme-hero.png" alt="Oblivion Hero" width="100%">
  
  <p><em>Cross-Chain Encrypted Dark Pool</em></p>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://encrypt-ika.vercel.app)
  [![Pitch Video](https://img.shields.io/badge/Pitch-Video-red.svg)](https://youtube.com/your-video)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/edycutjong/frontier-encrypt-ika)
</div>

---

## 📸 See it in Action
*(Demo GIF and UI screenshots can be found in the `docs/assets` directory)*

<div align="center">
  <img src="docs/assets/og-image.png" alt="App Demo" width="800">
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
We built the frontend using **Next.js 16** and **Tailwind CSS v4**.

*(Check the architecture directory for detailed system diagrams)*
See the [Architecture Document](docs/ARCHITECTURE.md) and [Product Requirements Document](docs/PRD.md) for full system specifications.

## 🏆 Sponsor Tracks Targeted
* **Sponsor Integration**: Encrypt + Ika ($7,500 grand prize)
* **Sponsor Integration**: Adevar Labs (audit credits)

## 🚀 Run it Locally (For Judges)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/edycutjong/frontier-encrypt-ika.git
   cd frontier-encrypt-ika
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:** 
   Rename `.env.example` to `.env.local` and add your keys.
4. **Run the app:**
   ```bash
   npm run dev
   ```

> **Note for Judges:** 
> Detailed submission materials, demo scripts, and sponsor defenses are located in the `docs/` directory.
> Read `docs/SUBMISSION.md` for the complete pitch and `docs/SPONSOR_DEFENSE.md` for technical implementation details.
