pragma solidity ^0.4.18;

contract Relief {
    // Define contract member variables
    address public owner;       // Wallet of the owner of the contract, i.e., Prometheum
    address public supplier;    // The wallet of the organization distributing aid
    uint public amountRaised;   // The total amount raised by donors

    // Mapping of key/value pairs, where the keys are bytes32 data (strings), and values are ints
    mapping (bytes32 => uint) public aidReceived;

    // Array of string aidIDs
    bytes32[] public aidIDList;

    function Relief(bytes32[] aidIDs, address supplierAddress) public {
        // The constructor, used when initializing the contract onto the blockchain.

        aidIDList = aidIDs;
        owner = msg.sender;
        claim_ready = false;
        supplier = supplierAddress;
    }

    function () public payable {
        // The default function, this executes everytime ether is sent to the contract.
        uint amount = msg.value;
        amountRaised += amount;
    }

    function registerClaimID(bytes32 claimID) public {
        // This inserts a claimID into the array of people who will claim
        // Only the owner of the contract (i.e., the Prometheum company)
        // will have the rights to insert a new claimID

        // (Otherwise, anyone would be able to insert themselves even
        // if they're not in the disaster zone and steal money)
        if (msg.sender == owner) {
            aidIDList.push(claimID);
        }
    }

    function getClaimBalance(bytes32 claimID) public returns (uint) {
        // Displays the claim alloted to a specific ID
        return aidReceived[claimID];
    }

    function setBalance(bytes32 claimID, uint amount) public {
        aidReceived[claimID] = amount;
    }

    function disberse() public {
        // Allocates the total amount amongst all registered IDs equally
        uint numPeople = aidIDList.length;
        uint equalAmount = amountRaised / numPeople;

        for (uint i=0; i < aidIDList.length; i++) {
            setBalance(aidIDList[i], equalAmount);
        }
    }

    function claim(bytes32 claimantID) public {
        // Once a person receives their aid and inputs their information,
        // the balance associated with their ID is transferred to the
        // organization who supplied the aid (the supplier).
        supplier.transfer(aidReceived[claimantID]);
        aidReceived[claimantID] = 0;
    }

}
