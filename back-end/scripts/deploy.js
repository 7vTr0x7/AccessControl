const hre = require("hardhat");

async function main() {
  const Access = await hre.ethers.getContractFactory("Access");
  const access = await Access.deploy();

  await access.deployed();

  console.log(
    `access deployed to ${access.address}`
  );
}

//0x238548230Ab0df8743665b5a8B1a576cb49D818B

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
