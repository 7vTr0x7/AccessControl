const { expect } = require("chai");
const { ethers } = require("hardhat");

describe(" Access ",() => {
  let owner;
  let recipient;
  let Access;
  let access;
  let user;
  before(async() => {
    [owner,user,recipient] = await ethers.getSigners();
    Access = await ethers.getContractFactory("Access");
    access = await Access.deploy();
  })

  //give consent

  describe("give_consent",() => {
    describe("owner",() => {
      describe("consent == false",() => {
        it("should give access to recipient",async() => {
          await access.give_consent(owner.address,recipient.address,"location");
 
           expect(await access.consent(owner.address,recipient.address)).to.equal(true);
           expect(await access.data(recipient.address)).to.equal("location");
       })
      })
      describe("consent == true",() => {
        it("should revert", async() => {
          expect(await access.consent(owner.address,recipient.address)).to.equal(true).to.be.revertedWith("you already have access");
        })
      })
    })
    describe("not owner",() => {
      it("should revert",async() =>{

        expect ( await access.connect(user).give_consent(user.address,recipient.address,"location")).to.be.revertedWith("only user can give access");

      })
    })
  })

  //check consent

  describe("check_consent",() => {
    it("should return true",async() => {
       
      expect(await access.check_consent(user.address,recipient.address) ).to.equal(true);
    })
  })

  //get Data
  describe("get Data",()=>{
    describe("concent == true",() =>{
      it("should return data",async() => {
        expect(await access.consent(owner.address,recipient.address)).to.equal(true);
        expect(await access.getData(owner.address,recipient.address)).to.equal("location");
      })
    })
  })

  //revoke
  describe("revoke",() => {
    describe("owner",() => {
      it("should revoke",async() => {
        expect(await access.consent(owner.address,recipient.address)).to.equal(true);
        await access.revoke_consent(owner.address,recipient.address);
        expect(await access.consent(owner.address,recipient.address)).to.equal(false);
      })
    })
    describe("not owner",() => {
      it("should revert",async() => {
        expect(await access.connect(user).revoke_consent(user.address,recipient.address)).to.revertedWith("only user can revoke access")
      })
    })

  })


})