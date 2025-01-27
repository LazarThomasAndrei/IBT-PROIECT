require("@nomiclabs/hardhat-waffle");

module.exports = {
solidity: {
    version: "0.8.20", // Updated to match the version required by OpenZeppelin contracts
    settings: {
        optimizer: {
        enabled: true,
        runs: 200
        }
        
    }
},
networks: {
    anvil: {
        url: "http://127.0.0.1:8545",  
        accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"], L
    },
    hardhat: {
        chainId: 1337
    },
    localhost: {
        url: "http://127.0.0.1:8545/",
        accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    }
},
paths: {
    sources: "./contracts/ethereum",  
    cache: "./cache",
    artifacts: "./artifacts"
}
};