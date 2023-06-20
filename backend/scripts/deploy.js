const hre = require("hardhat");

async function main() {
  const simpleStorage = await hre.ethers.deployContract("SimpleStorage");
  await simpleStorage.waitForDeployment();

  console.log(
    `simpleStorage deployed to ${simpleStorage.target}`
  );

  const bank = await hre.ethers.deployContract("Bank");
  await bank.waitForDeployment();

  console.log(
    `Bank deployed to ${bank.target}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});