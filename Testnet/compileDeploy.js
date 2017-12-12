fs = require("fs")

Web3 = require("web3")
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

code = fs.readFileSync("Relief.sol").toString();

solc = require('solc')
compiledCode = solc.compile(code);

console.log(compiledCode);

abiDefinition = JSON.parse(compiledCode.contracts[":Relief"].interface)
ReliefContract = web3.eth.contract(abiDefinition)

byteCode = compiledCode.contracts[":Relief"].bytecode
byteCode = "0x" + byteCode;

deployedContract = ReliefContract.new(
        ["0xed25b009a392e12d50377fff9e896de7cb41ee7f5db45bd83528d1287b8320da",
        "0xe7e355d95d7c9186984dd83c3ff7111c25cc9d5f04827030f4e0b02d57e325e8",
        "0xfa85affeb1797db868cb6aea2d66b30b9fc1b4792be6899773cad575b80dff7f",
        "0x99fbd1572c3fa14da59b62670482cace8c8945fd9000ab440d54934809814fd5"],
        web3.eth.accounts[1], {data: byteCode, from: web3.eth.accounts[0], gas: 999999})

console.log(deployedContract.address);
console.log(compiledCode.contracts[":Relief"].bytecode);
