const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WellnessToken", function () {
  let WellnessToken;
  let wellnessToken;
  let owner;
  let addr1;
  let addr2;
  let validator;

  beforeEach(async function () {
    [owner, addr1, addr2, validator] = await ethers.getSigners();
    WellnessToken = await ethers.getContractFactory("WellnessToken");
    wellnessToken = await WellnessToken.deploy();
    await wellnessToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await wellnessToken.hasRole(await wellnessToken.ADMIN_ROLE(), owner.address)).to.be.true;
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await wellnessToken.balanceOf(owner.address);
      expect(await wellnessToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Activity Validation and Rewards", function () {
    it("Should mint tokens for valid meditation streak", async function () {
      await wellnessToken.grantRole(await wellnessToken.VALIDATOR_ROLE(), validator.address);
      await wellnessToken.connect(validator).validateAndRewardActivity(
        addr1.address,
        "meditation_streak",
        7
      );
      const balance = await wellnessToken.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.utils.parseEther("10"));
    });

    it("Should mint tokens for valid steps activity", async function () {
      await wellnessToken.grantRole(await wellnessToken.VALIDATOR_ROLE(), validator.address);
      await wellnessToken.connect(validator).validateAndRewardActivity(
        addr1.address,
        "steps",
        2000
      );
      const balance = await wellnessToken.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.utils.parseEther("10"));
    });

    it("Should fail for invalid activity type", async function () {
      await wellnessToken.grantRole(await wellnessToken.VALIDATOR_ROLE(), validator.address);
      await expect(
        wellnessToken.connect(validator).validateAndRewardActivity(
          addr1.address,
          "invalid_activity",
          100
        )
      ).to.be.revertedWith("WellnessToken: invalid activity type or value");
    });
  });

  describe("Token Burning", function () {
    beforeEach(async function () {
      await wellnessToken.grantRole(await wellnessToken.VALIDATOR_ROLE(), validator.address);
      await wellnessToken.connect(validator).validateAndRewardActivity(
        addr1.address,
        "meditation_streak",
        7
      );
    });

    it("Should burn tokens for rewards", async function () {
      const burnAmount = ethers.utils.parseEther("5");
      await wellnessToken.connect(addr1).burnForReward(burnAmount, "discount");
      const balance = await wellnessToken.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.utils.parseEther("5"));
    });

    it("Should fail when burning more tokens than balance", async function () {
      const burnAmount = ethers.utils.parseEther("15");
      await expect(
        wellnessToken.connect(addr1).burnForReward(burnAmount, "discount")
      ).to.be.revertedWith("WellnessToken: insufficient balance");
    });
  });

  describe("Access Control", function () {
    it("Should allow admin to pause and unpause", async function () {
      await wellnessToken.pause();
      expect(await wellnessToken.paused()).to.be.true;
      await wellnessToken.unpause();
      expect(await wellnessToken.paused()).to.be.false;
    });

    it("Should not allow non-admin to pause", async function () {
      await expect(
        wellnessToken.connect(addr1).pause()
      ).to.be.revertedWith("WellnessToken: admin role required");
    });
  });
}); 