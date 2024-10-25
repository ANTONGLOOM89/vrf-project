/*global process*/


require('dotenv').config();
require("hardhat-contract-sizer");

require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("hardhat-gas-reporter");

require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY_MAINNET = process.env.ALCHEMY_API_KEY_MAINNET;
// const ALCHEMY_API_KEY_SEPOLIA = process.env.ALCHEMY_API_KEY_SEPOLIA;
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
let TESTNET_MNEMONIC = process.env.TESTNET_MNEMONIC;

// const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { INFURA_API_KEY_SEPOLIA, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

const accounts = {
    mnemonic: TESTNET_MNEMONIC,
    path: "m/44'/60'/0'/0",
    initialIndex: 0,
    count: 20,
};

if (!TESTNET_MNEMONIC) {
    // Generated with bip39
    accounts.mnemonic = "velvet deliver grief train result fortune travel voice over subject subject staff nominee bone name";
    accounts.accountsBalance = "100000000000000000000000000";
}

module.exports = {
    networks: {
        local: {
            url: "http://localhost:8545",
        },
        hardhat: {
            allowUnlimitedContractSize: true
        },
        mainnet: {
            url: "https://eth-mainnet.g.alchemy.com/v2/" + ALCHEMY_API_KEY_MAINNET,
            accounts: accounts,
            chainId: 1,
        },
        // sepolia: {
        //     url: "https://mainnet.infura.io/v3/" + INFURA_API_KEY_SEPOLIA,
        //     accounts: [`0x${PRIVATE_KEY}`]
        //     // chainId: 1,
        // }
        sepolia: {
            url: "https://sepolia.infura.io/v3/" + INFURA_API_KEY_SEPOLIA,
            accounts: [`0x${PRIVATE_KEY}`]
            // chainId: 1,
        }
    },
    etherscan: {
        apiKey: {
            mainnet: ETHERSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.26",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000000,
                    },
                    evmVersion: "cancun"
                },
            }
        ]
    },
    gasReporter: {
        enabled: true
    }
};