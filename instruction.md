# Vesting Instructions

## 1. User Wallet

The vesting sender asks the user (vesting recipient) for their TON wallet address to allocate the vesting.

If the user has not yet performed any outgoing transactions from this wallet (the wallet is not deployed), the sender will transfer 1 TON to the user and ask the user to send the 1 TON back.

This process ensures that the user deploys their wallet and verifies their access to it.

## 2. Creating a Vesting Wallet

The vesting sender visits https://vesting.ton.org/, enters the user’s wallet address in the “Address” field, and selects the “Create new vesting for this user” button.


They must provide the following vesting details:

* Vesting start date - choose a deferred date for lock up without accumulation of vesting before the date;

* Total amount of vesting in TON;

* Total vesting duration in days (including Cliff) - i.e. 760 days for 2 years vesting;

* Cliff duration in days (zero if no cliff is needed) - period after the vesting starts when vesting accumulates but can not be withdrawn; all the accumulated amount will be available for withdrawal once the cliff period ends;

* Unlocking frequency in days (equal to the total vesting duration if partial unlocking is not required) - i.e. 30 days for monthly vesting;

* If direct validation from the vesting wallet is required, the “In masterchain” option must be checked; otherwise, it should be left unchecked;

* Whitelist address(es) (if any) - i.e. single nominator smart contracts addresses.

The total vesting duration must be divisible by the unlocking frequency.

The Cliff period should also be divisible by the unlocking frequency.

By selecting the “Create” button, you will generate a vesting wallet contract at a cost of 0.5 TON.


Shortly afterwards, the vesting wallet page will open. The sender verifies that all parameters are correct.


The sender will then share the link with the user so that they can confirm the parameters are correct by viewing them at https://vesting.ton.org/.

## 3. Topping Up the Vesting Wallet

The vesting wallet balance can be topped up from any wallet.


## 4. Vesting Sender

The address from which the vesting wallet was created has several properties:

* New whitelist addresses for this vesting can be added at any time (removing whitelist addresses is not possible).

* The user can send (return) coins from this address at any time, even if the coins are still locked in the vesting.

Therefore, in the event of a breach of the sender's wallet, the vesting can be unlocked. Hence, when issuing a large vesting, it is advisable to do so from different wallets.


## 5. Wallet Usage

The user can utilize unlocked coins from the vesting wallet.


To do this, they can open the vesting wallet at https://vesting.ton.org/ and click the “Send” button. In this case, the user must log in to https://vesting.ton.org/ with the wallet to which the vesting was granted.

In the future, native support for vesting wallets in Tonkeeper or TonHub may become possible.


## 6. Whitelist

The vesting sender (the one who created the vesting contract) can add any addresses to the vesting wallet’s whitelist.


The user can send locked coins to these addresses, even if the vesting period has not yet expired.

There are limitations on text comments when sending to whitelist addresses – transfers can be made either without a comment or only with comments that begin with the letters “d”, “D”, “w”, or “W”.

Binary comments are also restricted.

These limitations are in place in order to prevent the withdrawal of locked coins in violation of the rules.


All comment restrictions for whitelist addresses are lifted after the vesting period expires.


There are no comment restrictions for non-whitelist addresses.

## 7. Validation Participation

Often, users who receive vesting would like to have the option to use their locked coins for validation.

This can be achieved through one of the following methods:

* Add the single-nominator-pool address to the whitelist.
    
    The user launches their validator with a single-nominator-pool.
    The `owner_address` of the pool must be the vesting wallet address.
    Operations like `SEND_RAW_MSG` and `UPGRADE` are not available until the vesting period expires.

    > Please note that the same single-nominator-pool cannot be added to the whitelists of multiple different vesting smart contracts. It can only be added to the vesting smart contract which is the owner of the pool.

    Here are the instructions for creating a single-nominator-pool and running it at mytonctrl - https://github.com/orbs-network/single-nominator#using-this-contract, https://telegra.ph/single-nominator-quick-how-to-09-25.

* Add the Elector address to the whitelist for direct validation. 
   In this case, the vesting wallet must be deployed in the masterchain.
   Adding the Config address to the whitelist is not required.

* Add TON Whales pool to the whitelist.

* Add the bemo.finance or https://tonstakers.com liquid pools to the whitelist.

   After making the deposit, it will also be necessary to add the jetton-wallet address of the user with pool tokens to the whitelist.
   During vesting, the user will have the option to return coins from the pool (exchange tokens back to Toncoin).
   The user will not have the ability to perform other operations with the pool tokens (such as sending them to others etc.) until the vesting period expires.
   The user will not have the ability to vote until the vesting period expires.

> Please note that the possibility of bypassing the rules to withdraw locked coins through whales, bemo or tonstakers.com has not been investigated.

⚠️ Unfortunately, at the moment, nominator-pools cannot be added to the whitelist. This will be possible with a new version of the nominator-pool contracts. The user will be able to aggregate funds from multiple vesting wallets into one pool.

When adding a new address to the whitelist, vesting.ton.org checks the validity of the contract at that address (its code and parameters) and displays the result on the screen. For example, if you add a single-nominator-pool address, but vesting.ton.org does not confirm that it is a single-nominator-pool, you will not be able to add that address.
