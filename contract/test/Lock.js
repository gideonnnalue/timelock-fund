const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const getTime = async () => {
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  return blockBefore.timestamp;
};

const depositParams = async (days, etherAmount) => {
  const timestamp = (await getTime()) + days * 24 * 60 * 60;
  const amount = ethers.utils.parseUnits(etherAmount, 18);
  return { timestamp, amount };
};

describe("Lock", function () {
  async function deployTimeLock() {
    const [owner, acct1, acct2] = await ethers.getSigners();

    const TimeLock = await ethers.getContractFactory("TimeLock");
    const lockContract = await TimeLock.deploy();
    return { lockContract, owner, acct1 };
  }
  describe("TimeLock", function () {
    let owner, acct1, acct2, lockContract;

    before(async () => {
      const [owner, acct1, acct2] = await ethers.getSigners();

      const TimeLock = await ethers.getContractFactory("TimeLock");
      lockContract = await TimeLock.deploy({});
    });

    describe("Deposit", () => {
      it("Should not deposit less than 0.001 ether", async () => {
        const { timestamp, amount } = await depositParams(30, "0.0001");
        await expect(lockContract.deposit(timestamp, { value: amount })).to.be
          .reverted;
      });
      it("Should not deposit in past time", async () => {
        const { timestamp, amount } = await depositParams(0, "10");
        await expect(lockContract.deposit(timestamp, { value: amount })).to.be
          .reverted;
      });
      it("Should succesfully deposit and lock funds", async () => {
        const { lockContract, owner } = await loadFixture(deployTimeLock);
        const { timestamp, amount } = await depositParams(30, "10");
        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        const lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[0].amount).to.equal(amount);
        expect(lockedFunds[0].expirationTime).to.equal(timestamp);
      });
      it("Can lock multiple funds", async () => {
        const { lockContract, owner } = await loadFixture(deployTimeLock);
        const { timestamp, amount } = await depositParams(30, "10");
        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        let lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[0].amount).to.equal(amount);
        expect(lockedFunds[0].expirationTime).to.equal(timestamp);

        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[1].amount).to.equal(amount);
        expect(lockedFunds[1].expirationTime).to.equal(timestamp);
        
        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[2].amount).to.equal(amount);
        expect(lockedFunds[2].expirationTime).to.equal(timestamp);

        expect(await lockContract.getNumberOfAccounts()).to.be.equal(3);
      })
    });

    describe("Withdrawal", () => {
      it("Should not withdraw funds if user has no deposits", async () => {
        const { lockContract, acct1 } = await loadFixture(deployTimeLock);
        await expect(lockContract.connect(acct1).withdraw(1)).to.be.reverted;
      });
      it("Should not withdraw another users funds", async () => {
        const { lockContract, owner, acct1 } = await loadFixture(
          deployTimeLock
        );
        const { timestamp, amount } = await depositParams(30, "10");
        await lockContract.connect(owner).deposit(timestamp, { value: amount });
        await expect(lockContract.connect(acct1).withdraw(1)).to.be.reverted;
      });
      it("Should withdraw 90% of funds if requested before expiring", async () => {
        const { lockContract, owner, acct1 } = await loadFixture(
          deployTimeLock
        );
        const { timestamp, amount } = await depositParams(30, "100");
        const fineAmount = ethers.utils.parseUnits("90", 18);
        await lockContract.connect(acct1).deposit(timestamp, { value: amount });
        await expect(
          lockContract.connect(acct1).withdraw(1)
        ).to.changeEtherBalances([lockContract, acct1], [`-${fineAmount}`, fineAmount]);
      })
      it("Should withdraw exact funds deposited when expired", async () => {
        const { lockContract, owner, acct1 } = await loadFixture(
          deployTimeLock
        );
        const { timestamp, amount } = await depositParams(30, "100");
        await lockContract.connect(acct1).deposit(timestamp, { value: amount });
        await ethers.provider.send("evm_mine", [(await getTime()) * 3600]);
        await expect(
          lockContract.connect(acct1).withdraw(1)
        ).to.changeEtherBalances([lockContract, acct1], [`-${amount}`, amount]);
      });
    });
    describe("Transactions", () => {
      it("Should reflect the correct account information after transactions", async () => {
        const { lockContract, owner } = await loadFixture(deployTimeLock);
        const { timestamp, amount } = await depositParams(30, "100");
        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        let lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[0].amount).to.equal(amount);
        expect(lockedFunds[0].expirationTime).to.equal(timestamp);

        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[1].amount).to.equal(amount);
        expect(lockedFunds[1].expirationTime).to.equal(timestamp);
        
        await expect(
          lockContract.connect(owner).deposit(timestamp, { value: amount })
        ).to.emit(lockContract, "Locked");
        lockedFunds = await lockContract.getUsersLockedFunds();
        expect(lockedFunds[2].amount).to.equal(amount);
        expect(lockedFunds[2].expirationTime).to.equal(timestamp);

        expect(await lockContract.getNumberOfAccounts()).to.be.equal(3);

        const fineAmount = ethers.utils.parseUnits("90", 18);
        await expect(
          lockContract.connect(owner).withdraw(1)
        ).to.changeEtherBalances([lockContract, owner], [`-${fineAmount}`, fineAmount]);

        expect(await lockContract.connect(owner).getNumberOfAccounts()).to.equal(2);
      })
    })
  });
});
