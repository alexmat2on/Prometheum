# Prometheum
An Ethereum dApp for distributing donations to disaster zones.


The website can be viewed by simply opening Website/index.html, but to really
test the project you may run a local Ethereum test network by the following
instructions.

# Starting a local test network
1. Make sure you have `node.js` installed.
2. Install `geth`, a command-line Ethereum client, on your computer. This can be done on Mac via the Homebrew commands:
    ```
    brew tap ethereum/ethereum
    brew install ethereum
    ```
3. Navigate to the Testnet subdirectory from a terminal, execute `npm install solc web3@0.20.0`
4. Initialize the test network by the running `initTest.sh` shell script.
5. Start the test network and enter the Ethereum console by running `upTest.sh` shell script.
6. Inside the geth console, enter `loadScript('usefulFunctions.js')` to import some helper functions I made.
7. Execute `makeAccounts()`. This will generate a couple of wallet addresses. (You can see an array of addresses by running `eth.accounts`).
8. Run `eth.coinbase = eth.accounts[0]` so that mining rewards will be sent to the first address in the array, and then `miner.start(4)` to begin mining blocks on the test network.
9. While you are mining, open another terminal window and enter the `Testnet` subdirectory.
10. Compile the contract code by running `node compileDeploy.js` which will compile and deploy the code onto the blockchain.
11. Watch the terminal window that is mining, within a few seconds you should see that you mined the contract.
12. Make a note of the address that the contract was given (you can stop the miner with `miner.stop()` to copy and paste the address, then restart it with `miner.start(4)` again).
13. Paste the contract's address into the `contractAddress` variable on line `97` of `Website/index.html`.
14. After mining for some time, and accumulating ether, you can distribute 10 ether to all the other addresses.
15. Run `unlockAccounts()` to allow distribution, then `fillAccounts()` to send them ether.
16. Now that the testnet is running & mining, and the contract live on the blockchain, you can open the website's `index.html` page and fully utilize all the functionality.
