function makeAccounts() {
        // Automatically generate 18 accounts on the local ethereum client
        for (var i=0; i < 18; i++) {
                personal.newAccount("");
        }
}

function unlockAccounts() {
        // Automatically unlock all 18 accounts
        for (var i=0; i < 18; i++) {
                personal.unlockAccount(eth.accounts[i], "", 50000);
        }
}

function fillAccounts() {
        // Distribute 10 ether to all 18 accounts
        for (var i=2; i < 18; i++) {
                eth.sendTransaction({
                        from: eth.accounts[0],
                        to: eth.accounts[i],
                        value: 10000000000000000000});
        }
}
