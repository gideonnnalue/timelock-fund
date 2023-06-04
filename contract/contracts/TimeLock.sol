// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// import "@openzeppelin/contracts/utils/math/Math.sol";

contract TimeLock {
    uint256 nextLockId;
    uint256 constant EARLY_WITHDRAWAL_FEE_PERCENTAGE = 5;

    event Locked(uint256 indexed id, address indexed owner, uint256 amount);
    event Withdrawal(address indexed owner, uint indexed lockId, uint amount);

    struct Lock {
        uint256 id;
        uint256 amount;
        uint256 expirationTime;
    }

    mapping(address => uint[]) userLockedFunds;
    mapping(uint256 => Lock) lockedFunds;

    address owner;

    // using Math for uint;

    constructor() {
        owner = msg.sender;
        nextLockId++;
    }

    function checkOwnerId(uint256 id) internal view returns (bool) {
        uint[] memory lockedIds = userLockedFunds[msg.sender];
        if (lockedIds.length < 1) {
            return false;
        }
        for (uint i; i < lockedIds.length; i++) {
            if (lockedIds[i] == id) {
                return true;
            }
        }
        return false;
    }

    function deposit(uint256 lockPeriod) external payable {
        require(msg.value > 0.001 ether, "Deposit a higher amount");
        require(
            lockPeriod > block.timestamp,
            "Expiration time should be in the future"
        );
        lockedFunds[nextLockId].id = nextLockId;
        lockedFunds[nextLockId].amount = msg.value;
        lockedFunds[nextLockId].expirationTime = lockPeriod;
        userLockedFunds[msg.sender].push(nextLockId);

        emit Locked(nextLockId, msg.sender, msg.value);
        nextLockId++;
    }

    function withdraw(uint256 lockId) external {
        require(userLockedFunds[msg.sender].length > 0, "User has no deposit");
        require(checkOwnerId(lockId), "invalid locked account");
        uint256 amount;
        // if (lockedFunds[lockId].expirationTime < block.timestamp) {
        //     amount = lockedFunds[lockId].amount;
        //     amount = amount.tryMul(19).tryDiv(20)
        // amount -
        // (amount * (EARLY_WITHDRAWAL_FEE_PERCENTAGE / 100));
        // } else {
        //     amount = lockedFunds[lockId].amount;
        // }
        amount = lockedFunds[lockId].amount;
        delete lockedFunds[lockId];
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Transaction failed!");
        emit Withdrawal(msg.sender, lockId, amount);
    }

    function getUsersLockedFunds() external view returns (Lock[] memory) {
        Lock[] memory lockedData = new Lock[](
            userLockedFunds[msg.sender].length
        );
        for (uint i; i < lockedData.length; i++) {
            lockedData[i] = lockedFunds[userLockedFunds[msg.sender][i]];
        }
        return lockedData;
    }

    function getLockedFundData(uint id) public view returns (Lock memory) {
        return lockedFunds[id];
    }
}
