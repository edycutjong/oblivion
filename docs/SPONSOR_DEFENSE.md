# Sponsor Defense: Encrypt + Ika

This document outlines how Oblivion fulfills the requirements for the **Encrypt & Ika - Bridgeless Capital Markets and Encrypted Capital Markets** track.

## Track Overview
The track challenges developers to leverage Encrypt (for privacy) and/or Ika (for custody and interoperability) to unlock new financial primitives or improve existing ones on Solana.

## How Oblivion Integrates Encrypt & Ika

### 1. Encrypted Capital Markets (Encrypt Integration)
Oblivion relies fundamentally on **Encrypt's REFHE protocol**.
* **Confidential Orderbook**: In traditional DeFi, limit orders are public. MEV bots front-run large trades by sandwiching them. Oblivion uses Encrypt to encrypt the `size`, `price`, and `pair` of every limit order. The Solana program performs order matching *on the encrypted data itself*, meaning the mempool and on-chain explorers only see encrypted ciphertext.
* **Compliance Viewing Keys**: Complete privacy often clashes with regulation. We utilized Encrypt's selective disclosure capabilities to generate "Viewing Keys". A trader can give a Viewing Key to an auditor, allowing the auditor to decrypt and verify the trader's history without exposing the entire dark pool.

### 2. Bridgeless Capital Markets (Ika Integration)
Oblivion utilizes **Ika's 2PC-MPC dWallets**.
* **Zero-Trust Cross-Chain Settlement**: Once the Encrypt matching engine pairs two orders (e.g., swapping SOL on Solana for ETH on Ethereum), we do not use a traditional bridge. Instead, the Ika Network's programmable MPC nodes co-sign the release of funds on both chains.
* **No Honeypots**: Because there is no centralized liquidity pool or bridge smart contract holding wrapped assets, Oblivion eliminates the single largest vector for DeFi hacks.

## Judging Criteria Alignment

* **Core Integration:** The project would literally not function without Encrypt and Ika. The entire value proposition (dark pool + bridgeless settlement) is entirely dependent on REFHE and MPC.
* **Innovation:** Combining Fully Homomorphic Encryption with MPC-based cross-chain settlement creates a decentralized institutional dark pool—a primitive that currently only exists in centralized TradFi systems.
* **Product Potential:** Institutional adoption of DeFi is currently blocked by public orderbooks exposing proprietary trading strategies. Oblivion solves a billion-dollar problem (MEV mitigation) for hedge funds and whales.
* **Usability:** The UI abstracts away the complexity of FHE and MPC, providing a clean, Bloomberg-terminal-esque experience while providing transparent visual proof of the underlying encryption.
