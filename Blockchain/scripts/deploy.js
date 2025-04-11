const hre = require("hardhat");

async function main() {
  console.log("Deploying WellnessToken contract...");

  const WellnessToken = await hre.ethers.getContractFactory("WellnessToken");
  const wellnessToken = await WellnessToken.deploy();

  await wellnessToken.deployed();

  console.log("WellnessToken deployed to:", wellnessToken.address);
  console.log("Transaction hash:", wellnessToken.deployTransaction.hash);

  // Wait for 5 block confirmations
  await wellnessToken.deployTransaction.wait(5);

  // Verify the contract on Polygonscan
  if (hre.network.name !== "hardhat") {
    console.log("Waiting for 30 seconds before verifying contract...");
    await new Promise(resolve => setTimeout(resolve, 30000));

    try {
      await hre.run("verify:verify", {
        address: wellnessToken.address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 