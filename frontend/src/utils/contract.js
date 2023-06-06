import { ethers } from "ethers";
import contractData from "../TimeLock.json";

const address = process.env.REACT_APP_CONTRACT_ADDRESS || contractData.contract.address;
const abi = contractData.contract.abi;

export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const connect = async () => {
  const accounts = await provider.send("eth_requestAccounts", []);
  const { signer, contract } = await getContract();
  let balance = await provider.getBalance(accounts[0]);
  balance = ethers.utils.formatEther(balance);
  return { signer, contract, address: accounts[0], balance };
};

export const getContract = async () => {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return { signer, contract };
};

export const lockFunds = async (lockContract, {amount, date, start}) => {
  const formatedValue = ethers.utils.parseUnits(amount.toString(), 18);
  const response = await lockContract.deposit(date, start, {value: formatedValue});
  return response;
}

export const withdrawFunds = async (lockContract, lockId) => {
  const response = await lockContract.withdraw(lockId);
  return response;
}

export const getUsersLockedFunds = async (lockContract) => {
  const response = await lockContract.getUsersLockedFunds();
  return response;
}