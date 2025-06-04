import { ethers } from 'ethers';

const connectButton = document.getElementById("connectWallet");
const status = document.getElementById("status");
const balanceDisplay = document.getElementById("balance");
const sendForm = document.getElementById("sendForm");

async function updateBalance() {
  if (!window.ethersProvider || !window.userAddress) return;

  const balance = await window.ethersProvider.getBalance(window.userAddress);
  const ethBalance = ethers.formatEther(balance);
  balanceDisplay.textContent = `Balance: ${ethBalance} ETH`;
}

async function sendEth(event) {
  event.preventDefault();
  const to = event.target.recipient.value;
  const amount = event.target.amount.value;

  try {
    const tx = await window.signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });

    status.textContent = `Sending ${amount} ETH to ${to}...`;
    await tx.wait();
    status.textContent = `✅ Transaction successful! Hash: ${tx.hash}`;
    await updateBalance();
  } catch (err) {
    status.textContent = `❌ Transaction failed: ${err.message}`;
  }
}

connectButton.onclick = updateBalance; // When you click "Connect", just refresh balance
sendForm.onsubmit = sendEth;