pragma solidity ^0.4.18;

contract Relief {
    address public owner;
    address public supplier;
    bool public claim_ready;
    uint public amountRaised;

    mapping (bytes32 => uint) public aidReceived;
    bytes32[] public aidIDList;

    function Relief(bytes32[] aidIDs, address supplierAddress) public {
        aidIDList = aidIDs;
        owner = msg.sender;
        claim_ready = false;
        supplier = supplierAddress;
    }

    function () public payable {
        uint amount = msg.value;
        amountRaised += amount;
    }

    function registerClaimID(bytes32 claimID) public {
        if (msg.sender == owner) {
            aidIDList.push(claimID);
        }
    }

    function getClaimBalance(bytes32 claimID) public returns (uint) {
        return aidReceived[claimID];
    }

    function setBalance(bytes32 claimID, uint amount) public {
        aidReceived[claimID] = amount;
    }

    function disberse() public {
        uint numPeople = aidIDList.length;
        uint equalAmount = amountRaised / numPeople;

        for (uint i=0; i < aidIDList.length; i++) {
            setBalance(aidIDList[i], equalAmount);
        }

        claim_ready = true;
    }

    function claim(bytes32 claimantID) public {
        supplier.transfer(aidReceived[claimantID]);
        aidReceived[claimantID] = 0;
    }

}
