'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './nft.module.css';

// Sepoliaテストネット上のスマートコントラクトアドレス
const CONTRACT_ADDRESS = '0x...'; // デプロイ後に実際のアドレスを設定
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

interface MintedNFT {
  hash: string;
  count: number;
}

export default function NFTMint() {
  const [mintCount, setMintCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<MintedNFT | null>(null);
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        setNetwork(network.name);

        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
        }
      }
    } catch (error) {
      console.error('Wallet connection check failed:', error);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        
        // Sepoliaテストネットのチェーックを追加
        if (network.chainId !== BigInt('11155111')) { // Sepoliaのchain ID
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // Sepoliaのchain ID in hex
          });
        }
        
        const accounts = await provider.listAccounts();
        setAccount(accounts[0].address);
        setNetwork(network.name);
      } else {
        alert('MetaMaskをインストールしてください！');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleMint = async () => {
    if (!account) {
      alert('ウォレットを接続してください！');
      return;
    }

    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const price = ethers.parseEther('0.08');
      const totalPrice = price * BigInt(mintCount);

      const tx = await contract.mint(mintCount, { value: totalPrice });
      await tx.wait();

      setMintedNFT({
        hash: tx.hash,
        count: mintCount
      });
    } catch (error) {
      console.error('Mint failed:', error);
      alert('ミントに失敗しました。詳細はコンソールを確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.mainTitle}>
        NFTコレクション<br />
        「CryptoSamurai」
      </h1>

      <section>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionTitleText}>プロジェクト概要</span>
        </h2>
        <p className={styles.text}>
          「CryptoSamurai」は、日本の侍をモチーフにしたNFTコレクションです。
          各NFTは、独自のアルゴリズムによって生成された個性的な侍のイラストとなっています。
          コレクションは全部で10,000点を予定しており、それぞれがユニークな特徴を持っています。
          <br /><br />
          <strong>テストネット情報：</strong><br />
          このNFTはSepoliaテストネット上でデプロイされています。
          ミントするには、Sepoliaテストネットの接続とテストETHが必要です。
        </p>
      </section>

      <section className={styles.mintSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionTitleText}>NFTをミント</span>
        </h2>
        
        <div className={styles.mintBox}>
          {!account ? (
            <button 
              className={styles.connectButton}
              onClick={connectWallet}
            >
              ウォレットを接続
            </button>
          ) : (
            <>
              <div className={styles.walletInfo}>
                <p>接続中のウォレット: {account.slice(0, 6)}...{account.slice(-4)}</p>
                <p>ネットワーク: {network}</p>
              </div>

              <div className={styles.mintInfo}>
                <p className={styles.price}>価格: 0.08 ETH / 個</p>
                <p className={styles.supply}>残り: 9,654 / 10,000</p>
              </div>

              <div className={styles.mintControls}>
                <div className={styles.counter}>
                  <button 
                    className={styles.counterBtn}
                    onClick={() => setMintCount(Math.max(1, mintCount - 1))}
                    disabled={isLoading}
                  >
                    -
                  </button>
                  <span className={styles.count}>{mintCount}</span>
                  <button 
                    className={styles.counterBtn}
                    onClick={() => setMintCount(Math.min(5, mintCount + 1))}
                    disabled={isLoading}
                  >
                    +
                  </button>
                </div>

                <button 
                  className={styles.mintButton}
                  onClick={handleMint}
                  disabled={isLoading}
                >
                  {isLoading ? 'ミント中...' : 'ミントする'}
                </button>
              </div>

              <p className={styles.total}>
                合計: {(0.08 * mintCount).toFixed(2)} ETH
              </p>

              {mintedNFT && (
                <div className={styles.mintSuccess}>
                  <p>🎉 ミント成功！</p>
                  <p>{mintedNFT.count}個のNFTがミントされました</p>
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${mintedNFT.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.etherscanLink}
                  >
                    Etherscanで確認する
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionTitleText}>特徴</span>
        </h2>
        <ul className={styles.featureList}>
          <li>アルゴリズムによって生成される100%ユニークな侍のイラスト</li>
          <li>200以上の特徴の組み合わせ</li>
          <li>レア度システムによる希少性の実現</li>
          <li>コミュニティメンバー限定のイベントへの参加権</li>
          <li>将来のプロジェクトに対する優先アクセス権</li>
        </ul>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionTitleText}>ロードマップ</span>
        </h2>
        <div className={styles.roadmap}>
          <div className={styles.roadmapItem}>
            <h3>フェーズ1</h3>
            <p className={styles.text}>コミュニティの形成とプレセール開始</p>
          </div>
          <div className={styles.roadmapItem}>
            <h3>フェーズ2</h3>
            <p className={styles.text}>パブリックセールとマーケットプレイス連携</p>
          </div>
          <div className={styles.roadmapItem}>
            <h3>フェーズ3</h3>
            <p className={styles.text}>コミュニティイベントとDAO立ち上げ</p>
          </div>
          <div className={styles.roadmapItem}>
            <h3>フェーズ4</h3>
            <p className={styles.text}>メタバース展開とゲーム連携</p>
          </div>
        </div>
      </section>
    </main>
  );
} 