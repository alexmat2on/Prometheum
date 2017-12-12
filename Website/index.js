function initialise() {
    hideForms();
    populateAddresses();
    populateIDs();

    document.getElementById('c-bal').innerHTML = web3.fromWei(web3.eth.getBalance(contractAddress), 'ether');
    document.getElementById('s-bal').innerHTML = web3.fromWei(web3.eth.getBalance(supplierAddress), 'ether');

    var btns = document.getElementsByClassName('form-btns');

    btns[0].addEventListener("click", function() {
        toggleForm("donate-form");
    })

    btns[1].addEventListener("click", function() {
        toggleForm("register-form");
    })

    btns[2].addEventListener("click", function() {
        toggleForm("claim-form");
    })

    var addressSelector = document.getElementById('sendAddressSelect');
    var maxBalance = document.getElementById('maxBalance');
    var weiBalance = web3.eth.getBalance(addressSelector.value);
    maxBalance.innerHTML = "Max: " + web3.fromWei(weiBalance, 'ether') + " ether";

    addressSelector.addEventListener("change", function() {
        var currentAddress = addressSelector.value;
        var weiBalance = web3.eth.getBalance(currentAddress);
        maxBalance.innerHTML = "Max: " + web3.fromWei(weiBalance, 'ether') + " ether";
    })

    var sendBtn = document.getElementById('send-btn');
    sendBtn.addEventListener("click", function() {
        var wallet = addressSelector.value;
        var sendField = document.getElementById('sendAmount');
        var inputAmount = sendField.value;

        sendDonation(wallet, inputAmount);
    });

    var regBtn = document.getElementById('register-btn');
    regBtn.addEventListener("click", function() {
        var fn = document.getElementById('registerFirstName').value;
        var ln = document.getElementById('registerLastName').value;
        var data = fn + ln;
        registerClaim(data);
    })

    var claimBtn = document.getElementById('claim-btn');
    claimBtn.addEventListener("click", function() {
        var fn = document.getElementById('claimFirstName').value;
        var ln = document.getElementById('claimLastName').value;
        var data = fn + ln;

    })
}

function hideForms(exceptFor) {
    var forms = document.getElementsByClassName('form');

    for (var i=0; i < forms.length; i++) {
        if (forms[i].id != exceptFor) {
            forms[i].style.display = "none";
        }
    }
}

function populateAddresses() {
    var addressSelect = document.getElementById('sendAddressSelect');

    for (var i=2; i < 18; i++) {
        var elem = "<option>";
        elem += web3.eth.accounts[i];
        elem += "</option>";
        addressSelect.innerHTML += elem;
    }
}

function populateIDs() {
    var insertIDs = document.getElementById('table-ids');
    var aidList = [];

    var counter = 0;
    while (idVal != "0x") {
        var idVal = contractInstance.aidIDList(counter);
        aidList.push(idVal);
        counter += 1;
    }

    for (var i=0; i < aidList.length-1; i++) {
        var elem = "<tr>\n";
        var row = document.createElement("TR");
        elem += "\t<td>" + contractInstance.aidIDList(i) + "</td>\n";
        elem += "<td>" + web3.fromWei(contractInstance.aidReceived(contractInstance.aidIDList(i)), 'ether') + "</td>";
        elem += "</tr>";
        row.innerHTML += elem;
        document.getElementById('table-ids').appendChild(row);
    }
}

function toggleForm(formID) {
    hideForms(formID);

    var form = document.getElementById(formID);
    if (form.style.display == "block") {
        form.style.display = "none";
    }
    else {
        form.style.display = "block";
    }
}

function sendDonation(wallet, inputAmount) {
    console.log(wallet, inputAmount);

    var amount = web3.toWei(inputAmount, 'ether');
    try {
        web3.eth.sendTransaction({from: wallet, to: contractAddress, value: amount}, function() {
            console.log("sent txn");
            web3.eth.getBalance(contractAddress, function(err, val) {
                console.log(val);
                document.getElementById('c-bal').innerHTML = web3.fromWei(val, 'ether');
            })
            document.getElementById('sendAmount').value = "";
            document.getElementById('maxBalance').innerHTML = "Max: " + web3.fromWei(web3.eth.getBalance(wallet), 'ether') + " ether";
        });
    } catch (err) {
        console.log(err);
    }
}

function registerClaim(data) {
    var hash = web3.sha3(data);
    console.log(hash);
}

function registerClaimAdmin(hash) {
    try {
        contractInstance.registerClaimID(hash, {from: web3.eth.accounts[0]}, function (err, res) {
            //console.log(contractInstance.aidIDList.call());
            console.log(err);
            console.log(res);
        })
    } catch (err) {
        console.log(err);
    }
}

function disberse() {
    var numAidIDs = 0;
    var idVal;
    while (idVal != "0x") {
        idVal = contractInstance.aidIDList(numAidIDs);
        numAidIDs += 1;
    }
    numAidIDs -= 1;

    var equalAmount = contractInstance.amountRaised() / numAidIDs;
    for (var i=0; i < numAidIDs; i++) {
        contractInstance.setBalance(contractInstance.aidIDList(i), equalAmount);
    }
}

function claimAid(data) {
    var claimID = web3.sha3(data);
    console.log(claimID);
    contractInstance.claim(claimID);
}

function getClaim(claimID) {

}

initialise();
