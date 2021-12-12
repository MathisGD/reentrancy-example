# Reentrancy attack example

A simple reentrancy example.

`Vulnerable.sol` is a contract that one user to withdraw 1 ether.

`NonAttackerContract.sol` has a simple use of it (and receives 1 eth).

`AttackerContract.sol` implements a reentrancy attack (and receives 10 eth instead of 1).

## Quick start

1. Start a local blockchain

   ```
   ganache-cli --mnemonic "tenant silent stem tunnel corn child duck purse problem turtle lounge name"
   ```

2. Deploy contracts

   ```
   yarn deploy
   ```

3. Simple withdraw by `NonAttackerContract.sol`

   ```
   yarn withdraw
   ```

   Note that doing it two times is impossible.

4. Exploit reentrancy

   ```
   yarn exploit
   ```

5. Print contracts balances

   ```
   hardhat balances
   ```
