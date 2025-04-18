import { ethers } from "hardhat";
import { Contract } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CryptoSamurai = await ethers.getContractFactory("CryptoSamurai");
  const cryptoSamurai = await CryptoSamurai.deploy();

  await cryptoSamurai.waitForDeployment();
  const address = await cryptoSamurai.getAddress();

  console.log(`CryptoSamurai deployed to: ${address}`);

  // コントラクトの初期設定
  await cryptoSamurai.setIsPublicMintEnabled(true);
  console.log("Public mint enabled");

  // メタデータのベースURIを設定
  await cryptoSamurai.setBaseURI("https://your-metadata-server.com/api/token/");
  console.log("Base URI set");

  // コントラクトを検証
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: []
    });
    console.log("Contract verified on Etherscan");
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 