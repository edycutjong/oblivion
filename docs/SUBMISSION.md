# Oblivion - Submission Pitch

## Inspiration
A hedge fund manager we interviewed lost $2.3M to MEV front-running on a cross-chain OTC trade last Tuesday. The order was visible on-chain for 400ms — long enough for a bot to sandwich it. Existing cross-chain swaps rely on bridges and public orderbooks, exposing traders to massive slippage and MEV. We realized that if we combine Solana's speed with fully encrypted matching and bridgeless settlement, we could create the ultimate dark pool. Oblivion makes MEV front-running mathematically impossible.

## What it does
Oblivion is a Cross-Chain Encrypted Dark Pool. 
It enables institutional traders to place completely private limit orders on Solana (where price and size are encrypted) and settle those orders cross-chain via MPC without using any bridges. 
Additionally, it provides "Viewing Keys" so that while trades remain completely hidden from the public and MEV bots, auditors or compliance officers can selectively view trade history to ensure regulatory compliance.

## How we built it
We utilized **Encrypt (REFHE protocol)** and **Ika (2PC-MPC protocol)**:
1. **Encrypt SDK**: Used to build the confidential Solana program. Order details (price, size, token pair) are encrypted on the client side using REFHE, keeping the orderbook completely dark on-chain. We also used Encrypt to implement the Viewing Key feature for compliance.
2. **Ika SDK**: Used to handle the cross-chain settlement. When the Encrypt matching engine finds a match, the Ika Network uses its decentralized dWallets (MPC) to execute the settlement on both Solana and the target EVM chain simultaneously. No bridge contracts are used, eliminating honeypot risks.
3. **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, and Shadcn UI.
4. **Backend/DB**: Supabase handles off-chain order queueing and compliance audit logs.

## Challenges we ran into
Integrating REFHE with high-frequency order matching was a significant technical hurdle. We had to optimize the client-side encryption flow so that traders wouldn't experience latency when submitting orders. Additionally, coordinating the Ika MPC settlement asynchronously while ensuring the Encrypt state machine remained in sync required a robust webhook-based architecture.

## Accomplishments that we're proud of
We successfully proved that you can have a completely dark orderbook on a public blockchain without sacrificing cross-chain interoperability or regulatory compliance. The split-screen Explorer Proof perfectly demonstrates the power of Encrypt — the public sees gibberish, but the settlement still happens flawlessly.

## What we learned
We learned the profound difference between zero-knowledge proofs (proving something is true without revealing it) and Fully Homomorphic Encryption (computing on data while it remains encrypted). REFHE unlocks entirely new design spaces for DeFi that ZK simply cannot support.

## What's next for Oblivion
We plan to launch on Solana Mainnet once Encrypt and Ika reach production. We also aim to support more complex order types (e.g., TWAP, Iceberg) and integrate directly with institutional custodians.
