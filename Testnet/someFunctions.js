function makeAccounts() {
        for (var i=0; i < 18; i++) {
                personal.newAccount("");
        }
}

function unlockAccounts() {
        for (var i=0; i < 18; i++) {
                personal.unlockAccount(eth.accounts[i], "", 50000);
        }
}

function fillAccounts() {
        for (var i=2; i < 18; i++) {
                eth.sendTransaction({
                        from: eth.accounts[0],
                        to: eth.accounts[i],
                        value: 10000000000000000000});
        }
}
