import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

async function initializeProvider() {
  const provider = await detectEthereumProvider();

  if (provider && provider === window.ethereum) {
    console.log('✅ MetaMask is installed and detected.');

    // Proceed with setting up ethers provider
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const address = await signer.getAddress();

    // Show connected wallet address in UI
    const status = document.getElementById('status');
    if (status) {
      status.textContent = `Connected: ${address}`;
    }

    // Optional: update global variables if needed
    window.ethersProvider = ethersProvider;
    window.signer = signer;
    window.userAddress = address;

  } else {
    console.error('MetaMask not found or multiple wallets installed');
    alert('❌ MetaMask not found. Please install MetaMask to use this dApp.');
  }
}

window.addEventListener('DOMContentLoaded', initializeProvider);