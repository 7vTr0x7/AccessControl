const hre = require("hardhat");

async function main() {
  const Access = await hre.ethers.getContractFactory("Access");
  const access = await Access.deploy();

  await access.deployed();

  console.log(
    `access deployed to ${access.address}`
  );
}

//0x882C5C73f70DfA5A9F424F1c724359c6C667ED48

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
