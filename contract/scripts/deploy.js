// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs/promises");

async function main() {
  const TimeLock = await hre.ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy();

  await timeLock.deployed();
  await writeDeploymentInfo(timeLock, "TimeLock.json")
}

async function writeDeploymentInfo(contract, filename = "") {
  const data = {
    contract: {
      address: contract.address,
      signerAddress: contract.signer.address,
      abi: contract.interface.format(),
    },
  };

  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(`../frontend/src/${filename}`, content, { encoding: "utf-8" });
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
