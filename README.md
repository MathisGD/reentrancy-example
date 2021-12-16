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

## How to fix it

### Using Checks-Effects-Interactions pattern

This pattern is officially recommanded in [solidity docs](https://docs.soliditylang.org/en/v0.8.10/security-considerations.html#use-the-checks-effects-interactions-pattern).

It means splitting every functions in 3 parts, and writing them **in this order** :

- **Checks**: requires etc...
- **Effects**: state variable updates
- **Interactions**: transfers, internal or external functions calls

Tip: Consensys recommands to add `unTrusted` prefix on functions that make untrusted external contracts call, and on functions which calls these untrusted functions. This allow to have a clear view of what is dangerous in you contract, and to remember to put them at the end of the functions.

### Using MutExs

It basically blocks function entrance before the end of its execution. Concretly, require a variable `locked` to be false at the beginning of the function, and set it to true before the beginning of the function body. Set it back to false at the end of the body.

Simple example :

```
bool private locked;

function dangerousWithdraw() {
   require(!locked);
   locked = true;

   // function body with external contract call

   locked = false;
}
```
