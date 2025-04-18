'use client';

import { useState } from 'react';
import Head from 'next/head';
import styles from './hyperevm.module.css';

const codeSnippets = {
  'basic-implementation': {
    title: '基本機能の実装',
    code: `// basic setup
import { ethers } from "ethers";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Environment Variables & Constants
console.log("Loading configuration...");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;
const HYPE_ADDRESS = process.env.HYPE_ADDRESS;
const WHYPE_ADDRESS = process.env.WHYPE_ADDRESS;
const BULBUL_ADDRESS = process.env.BULBUL_ADDRESS;
const POOL_ADDRESS = process.env.POOL_ADDRESS;
const QUOTER_ADDRESS = process.env.QUOTER_ADDRESS;`
  },
  'swap-implementation': {
    title: 'スワップ機能の実装',
    code: `// swap func
async function executeEntrySwap(hypeAmountIn, entryCount, estAmountOutQuote) {
  const params = {
    tokenIn: HYPE_ADDRESS,
    tokenOut: BULBUL_ADDRESS,
    fee: POOL_FEE,
    recipient: wallet.address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: hypeAmountIn,
    amountOutMinimum: estAmountOutQuote - (estAmountOutQuote * 3n / 100n),
    sqrtPriceLimitX96: 0n
  };

  try {
    const tx = await routerContract.exactInputSingle(params, { gasLimit: 300000n });
    const receipt = await tx.wait(1);
    console.log("Entry Swap " + entryCount + " executed");
    return { success: true, receipt };
  } catch (err) {
    console.error("Entry Swap " + entryCount + " failed", err);
    return { success: false };
  }
}`
  }
};

export default function HyperEVMArbitrage() {
  const [showBasicCode, setShowBasicCode] = useState(false);
  const [showTokenCode, setShowTokenCode] = useState(false);
  const [showStrategyCode, setShowStrategyCode] = useState(false);
  const [showRiskCode, setShowRiskCode] = useState(false);

  return (
    <>
      <Head>
        <title>HyperEVM Arbitrage Bot | 価格振動スナイピング</title>
      </Head>
      <main className={styles.container}>
        <h1 className={styles.mainTitle}>
          HyperSwap DEXでの<br />
          スキャルピング戦略
        </h1>

        <section>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>プロジェクト概要</span>
          </h2>
          <p className={styles.text}>
            HyperSwap DEX上であるトークンペアの自動取引を行うボットを開発しました。本プロジェクトでは
            HyperswapAPIを使用し、同APIのSwapRouterコントラクトを活用して効率的なスキャルピング戦略を実装しています。
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>市場分析と戦略背景</span>
          </h2>
          <p className={styles.text}>
            HyperSwap DEXでは、ユーザーの取引活性化を目的としたポイントプログラムを実施しています。これにより、ユーザーはポイントを得るために短期間でトークンを往復スワップする傾向があり、その結果として以下のような特徴的な市場環境が生まれています。
          </p>

          <div className={styles.featureBox}>
            <h3 className={styles.featureTitle}>市場の特徴</h3>
            <ul className={styles.featureList}>
              <li>ポイント獲得を目的とした定期的な往復取引</li>
              <li>取引タイミングの集中による一時的な価格インパクト</li>
              <li>価格の自動的な復元力（mean reversion）の存在</li>
            </ul>
          </div>

          <p className={styles.text}>
            そこで、比較的取引ボリュームの小さいWHYPE/BULBULペアの一時間足チャートを分析したところ、以下のような特徴が確認できました。
          </p>

          <ul className={styles.analysisList}>
            <li>価格が比較的安定しており、大きな変動が少ない</li>
            <li>一定のレンジ内での規則的な価格振動が発生</li>
            <li>短期的な上下動が継続的に存在し、スキャルピングに適した環境</li>
            <li>ポイントプログラムに起因する予測可能な価格パターンの形成</li>
          </ul>

          <p className={styles.text}>
            この市場特性を活かし、以下のような戦略を構築しました。
          </p>

          <ul className={styles.strategyList}>
            <li>移動平均を基準とした価格振動の検知</li>
            <li>段階的なポジション構築による平均取得単価の最適化</li>
            <li>ポイントプログラム参加者の行動パターンを考慮した価格予測</li>
            <li>設定した利益目標達成時の自動清算</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>技術的実装</span>
          </h2>

          <div className={styles.implementationSection}>
            <div className={styles.implementationItem}>
              <h3 className={styles.implementationTitle}>
                <span className={styles.arrow}>▶</span> 1. 基本機能の実装
                <button className={styles.codeButton} onClick={() => setShowBasicCode(true)}>
                  実装コードを表示
                </button>
              </h3>
              <ul className={styles.implementationList}>
                <li>Node.js + Ethers.jsによるスマートコントラクト連携</li>
                <li>.envファイルによる設定管理（秘密鍵、RPC URL、コントラクトアドレス）</li>
                <li>SwapRouterコントラクトを使用したトークンスワップ機能</li>
              </ul>
            </div>

            <div className={styles.implementationItem}>
              <h3 className={styles.implementationTitle}>
                <span className={styles.arrow}>▶</span> 2. トークン承認処理
                <button className={styles.codeButton} onClick={() => setShowTokenCode(true)}>
                  実装コードを表示
                </button>
              </h3>
              <p className={styles.text}>
                Routerがユーザーのトークンを使用するための承認（Approve）処理を実装。スワップ実行前に必要なトークン承認を自動的に行う。
              </p>
            </div>

            <div className={styles.implementationItem}>
              <h3 className={styles.implementationTitle}>
                <span className={styles.arrow}>▶</span> 3. 取引戦略の実装
                <button className={styles.codeButton} onClick={() => setShowStrategyCode(true)}>
                  実装コードを表示
                </button>
              </h3>
              <ul className={styles.implementationList}>
                <li>QuoterV2を使用した価格監視システム</li>
                <li>移動平均ベースのエントリー判断</li>
              </ul>
            </div>

            <div className={styles.implementationItem}>
              <h3 className={styles.implementationTitle}>
                <span className={styles.arrow}>▶</span> 4. リスク管理システム
                <button className={styles.codeButton} onClick={() => setShowRiskCode(true)}>
                  実装コードを表示
                </button>
              </h3>
              <ul className={styles.implementationList}>
                <li>段階的なポジション構築（Entry 1, Entry 2）</li>
                <li>利益目標に基づくExit戦略</li>
                <li>スリッページ管理</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>主要な機能</span>
          </h2>

          <div className={styles.mainFeatures}>
            <div className={styles.featureGroup}>
              <h3 className={styles.featureGroupTitle}>
                <span className={styles.arrow}>▶</span> 監視システム
              </h3>
              <ul className={styles.featureGroupList}>
                <li>固定量（1 HYPE）を基準とした価格監視</li>
                <li>直近50件の見積もり排出量の移動平均計算</li>
                <li>状態管理（swapCountによるポジション管理）</li>
              </ul>
            </div>

            <div className={styles.featureGroup}>
              <h3 className={styles.featureGroupTitle}>
                <span className={styles.arrow}>▶</span> エントリー戦略
              </h3>
              <p className={styles.text}>
                市場価格が想定より不利に動いた場合に備え、段階的なエントリー戦略を採用しています。追加エントリーにより平均取得単価を引き下げ、リスク分散とリカバリー性能を両立させています。
              </p>
              <ul className={styles.featureGroupList}>
                <li>Entry 1: 移動平均を上回る価格変動を検知し、初期ポジションを構築</li>
                <li>Entry 2: 初回エントリー時の価格を上回る場合、追加ポジションを構築</li>
              </ul>
            </div>

            <div className={styles.featureGroup}>
              <h3 className={styles.featureGroupTitle}>
                <span className={styles.arrow}>▶</span> Exit戦略
              </h3>
              <p className={styles.text}>
                環境変数で設定された利益目標係数に達した時点で、保有する全ポジションを自動的に清算します。この係数は取引の収益性と機会損失のバランスを考慮して設定されています。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>追加機能</span>
          </h2>
          <p className={styles.text}>
            取引データの分析と戦略の最適化のため、以下の機能を実装しています。特に取引ログの管理は、過去の取引パターンの分析や戦略の改善に不可欠な要素となっています。
          </p>
          <ul className={styles.additionalFeaturesList}>
            <li>起動時の自動清算機能</li>
            <li>取引ログのCSV出力（trade_summary.csv）</li>
            <li>詳細なデバッグログ</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleText}>今後の展望</span>
          </h2>
          <p className={styles.text}>
            現在の実装を基に、以下の機能拡張を検討中です。
          </p>
          <ul className={styles.futureList}>
            <li>マルチDEX対応</li>
            <li>より高度なリスク管理システム</li>
            <li>パフォーマンス分析ツールの追加</li>
          </ul>
        </section>
      </main>

      {showBasicCode && (
        <div className={styles.modal} onClick={() => setShowBasicCode(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowBasicCode(false)}>&times;</span>
            <h3>基本機能の実装</h3>
            <pre>
              <code>
{`// basic setup
import { ethers } from "ethers";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Environment Variables & Constants
console.log("Loading configuration...");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;
const HYPE_ADDRESS = process.env.HYPE_ADDRESS;
const WHYPE_ADDRESS = process.env.WHYPE_ADDRESS;
const BULBUL_ADDRESS = process.env.BULBUL_ADDRESS;
const POOL_ADDRESS = process.env.POOL_ADDRESS;
const QUOTER_ADDRESS = process.env.QUOTER_ADDRESS;

// swap func
async function executeEntrySwap(hypeAmountIn, entryCount, estAmountOutQuote) {
  const params = {
    tokenIn: HYPE_ADDRESS,
    tokenOut: BULBUL_ADDRESS,
    fee: POOL_FEE,
    recipient: wallet.address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    amountIn: hypeAmountIn,
    amountOutMinimum: estAmountOutQuote - (estAmountOutQuote * 3n / 100n),
    sqrtPriceLimitX96: 0n
  };

  try {
    const tx = await routerContract.exactInputSingle(params, { gasLimit: 300000n });
    const receipt = await tx.wait(1);
    console.log("Entry Swap " + entryCount + " executed");
    return { success: true, receipt };
  } catch (err) {
    console.error("Entry Swap " + entryCount + " failed", err);
    return { success: false };
  }
`}
              </code>
            </pre>
          </div>
        </div>
      )}

      {showTokenCode && (
        <div className={styles.modal} onClick={() => setShowTokenCode(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowTokenCode(false)}>&times;</span>
            <h3>トークン承認処理</h3>
            <pre>
              <code>
{`//approve token
async function checkAndApprove(tokenContract, spender, amount) {
  const allowance = await tokenContract.allowance(wallet.address, spender);
  if (allowance < amount) {
    const tx = await tokenContract.approve(spender, ethers.MaxUint256, { gasLimit: 100000n });
    await tx.wait(1);
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      )}

      {showStrategyCode && (
        <div className={styles.modal} onClick={() => setShowStrategyCode(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowStrategyCode(false)}>&times;</span>
            <h3>取引戦略の実装</h3>
            <pre>
              <code>
{`//observe price 価格を監視
const quoteParams = {
  tokenIn: HYPE_ADDRESS,
  tokenOut: BULBUL_ADDRESS,
  amountIn: quoteHypeAmount_BI,
  fee: POOL_FEE,
  sqrtPriceLimitX96: 0n
};
const quoteResult = await quoterContract.quoteExactInputSingle.staticCall(quoteParams);

//移動平均リストの管理
let amountOutAverageList = [];
const MAX_AVG_SIZE = 50;  // 平均を取るウィンドウサイズ

//calculate MA 移動平均計算
function updateMovingAverage(amountOut) {
  if (amountOutAverageList.length >= MAX_AVG_WINDOW) {
    amountOutAverageList.shift(); //delete oldest price
  }
  amountOutAverageList.push(amountOut);

  const total = amountOutAverageList.reduce((sum, val) => sum + val, 0n);
  const avg = total / BigInt(amountOutAverageList.length);
  return avg;
}

//calculate deviation rate　乖離率を計算
function calculateDeviation(currentAmountOut, averageAmountOut) {
  if (averageAmountOut === 0n) return 0;
  const deviation = (Number(currentAmountOut - averageAmountOut) / Number(averageAmountOut)) * 100;
  return deviation;
}

//check swap opportunity スワップ可能性の判断
if (swapCount === 0 && deviationPercent > AMOUNT_OUT_DEVIATION_THRESHOLD_PERCENT) {
  
  const entryResult = await executeEntrySwap(
    entryWhypeAmount_BI,
    1,
    estAmountOutQuoteNum
  );

  if (entryResult.success) {
    swapCount = 1; 
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      )}

      {showRiskCode && (
        <div className={styles.modal} onClick={() => setShowRiskCode(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowRiskCode(false)}>&times;</span>
            <h3>リスク管理システム</h3>
            <pre>
              <code>
{`
//make entry 1
if (swapCount === 0 && deviationPercent > AMOUNT_OUT_DEVIATION_THRESHOLD_PERCENT) {
  const entryResult = await executeEntrySwap(entryWhypeAmount_BI, 1, estAmountOutQuoteNum);
  if (entryResult.success) {
    swapCount = 1; 
  }
}

//make entry 2 (この間もexit判定は継続)
if (swapCount === 1 && deviationPercent > AMOUNT_OUT_DEVIATION_THRESHOLD_PERCENT_SECOND_ENTRY) {
  const entryResult2 = await executeEntrySwap(entryWhypeAmount_BI, 2, estAmountOutQuoteNum);
  if (entryResult2.success) {
    swapCount = 2; 
  }
}

//exit strategy ポジション閉鎖戦略
if (swapCount >= 1 && estWhypeOutExit > exitThreshold) {
  const exitResult = await executeExitSwap();
}
  
//slippage management スリッページ管理
const params = {
  tokenIn: HYPE_ADDRESS,
  tokenOut: BULBUL_ADDRESS,
  fee: POOL_FEE,
  recipient: wallet.address,
  deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10), 
  amountIn: hypeAmountIn,
  amountOutMinimum: estAmountOutQuote - (estAmountOutQuote * 3n / 100n), //ここで設定
  sqrtPriceLimitX96: 0n
};
`}
              </code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
