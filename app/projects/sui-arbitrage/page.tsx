import Image from 'next/image';
import Link from 'next/link';
import Modal from './Modal';

export default function SuiArbitrage() {
  return (
    <main className="project-page" data-project="sui">
      <Modal />
      <div className="project-header">
        <h1>SUIチェーン上での裁定機会発見<br />
            mSEND/SEND/SUIアービトラージ</h1>
        <p className="project-subtitle">SUIチェーンで300ドル稼いだお話</p>
      </div>

      <section className="project-content">
        <div className="project-description">
          <h2>背景</h2>
          <p>
            SUIエコシステム上で配布されたエアドロップトークン <strong>mSEND</strong> は、
            <a href="https://suilend.fi/" target="_blank" rel="noopener noreferrer">Suilend</a> の独自トークンであり、
            専用のRedeem機能を通じて <strong>SEND</strong> に変換可能でした。
            ただし、その際に <strong>一定のSUIをペナルティとして支払う必要がある</strong>という仕組みが存在しました。
            この3つのトークン間の相互作用は複雑であり、価格の歪みが生じやすいと考えました。
          </p>

          <h2>戦略の概要</h2>
          <ul>
            <li>mSENDは自由に売買可能（DEXでのSwapに対応）</li>
            <li>SENDはmSENDをRedeemし、SUIを支払うことで得られる</li>
            <li>ペナルティ（SUI）は固定コストとして存在する</li>
            <li>よって、<strong>mSENDが割安 & SENDが割高</strong>な瞬間に裁定が成立する</li>
          </ul>

          <h2>取引フロー</h2>
          <ol>
            <li>DEXで割安な mSEND を購入</li>
            <li>ペナルティ（SUI）を支払い、mSEND を SEND に変換</li>
            <li>市場で SEND を売却、差益を獲得</li>
          </ol>

          <h2>実績</h2>
          <p>
            数十回の取引により、合計で <strong>約300ドルの利益</strong> を獲得しました。  
            この戦略はredeem期間が終わったことで現在はエッジが消失していますが、当時は明確な裁定機会として機能していました。
          </p>

          <h3>証拠トランザクション例</h3>
          <p>以下は、即時Redeemの際に行ったトランザクション履歴です(※画像下から上に向かって時系列順に並んでいます)</p>
          <div className="transaction-image">
            <Image
              src="/images/Transactions.png"
              alt="Redeem Transaction"
              width={800}
              height={400}
              style={{ objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
              className="modal-trigger"
            />
          </div>

          <div className="diagram-container">
            <div className="label">スタート：mSENDを10SUIで購入</div>
            <div className="box">26.68 mSEND</div>

            <div className="arrow">SUIペナルティ支払い（-2.47SUI）</div>
            <div className="arrow">↓</div>

            <div className="label">Redeem</div>
            <div className="box">26.68 SEND</div>

            <div className="arrow">↓</div>
            <div className="label">ここで再度エッジがあれば再構成</div>
            <div className="box">
              今回、26.68SEND→12.51SUIにスワップ
            </div>

            <div className="profit-summary">
              <ul>
                <li><strong>ガス代：</strong>0.0113 SUI</li>
                <li><strong>Redeemペナルティ：</strong>2.47 SUI</li>
                <li><strong>初期投資：</strong>10 SUI</li>
                <li className="profit-amount"><strong>最終利益：</strong>+0.029 SUI</li>
              </ul>
            </div>
          </div>

          <h2>自動化の試みと課題</h2>
          <p>
            本戦略の自動化も試みました。<br />
            <strong>SUI Aggregatorを採用しているScallop（<a href="https://app.scallop.io/" target="_blank" rel="noopener noreferrer">https://app.scallop.io/</a>）のSDK</strong> を用いて、
            <strong>mSEND/SUI・SEND/SUIプールの価格をリアルタイムに監視し、裁定機会を自動検出するスクリプトを実装</strong>しました。
          </p>

          <p>
            しかし当時、<strong>SUILendのSDKにはmSENDのRedeemに対応するコマンドが存在していなかった</strong>ため、完全な自動化（取引実行）には至れませんでした。
          </p>

          <p>
            そのため、最終的な取引はすべて手動で行いましたが、価格差検出やトレードタイミングの最適化においては、
            実装したスクリプトが大きな助けとなりました。
          </p>
        </div>
      </section>

      <div className="project-navigation">
        <Link href="/" className="back-button">
          トップページに戻る
        </Link>
      </div>
    </main>
  );
} 