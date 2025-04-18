import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <main>
      <header>
        <h1>Yuichi Kumano</h1>
        <p>「価値の歪み」に気づくエンジニア</p>
      </header>

      <main>
        <section id="about" className="fade-in">
          <h2>About Me</h2>
          <p>
            岡山大学 理学部 数学科卒。<strong>AI</strong> と <strong>Web3.0</strong> に強い関心を持ち、日々技術を学びながら実践に活かしています。<br />
            趣味は、登場したばかりの最新AIを試してみることです。特に印象深かったのは、自律的に行動し、指示していないにもかかわらずWebサイトまで自動生成してしまった
            <strong>AIエージェント「manus」</strong>です。<br /><br />
            コーディングはまだ学習途上ですが、<strong>「好きなことを仕事に」</strong>するため、日々精進しています。<br />
            とりわけ「自動化」が好きで、Web3領域ではアービトラージ戦略の自動化に取り組んでいます。
          </p>
        </section>

        <section className="fade-in">
          <h2>作成したプロジェクト/気になったものを覗いてみてください！</h2>

          <Link href="/projects/nft" className="image-card">
            <div className="card-content">
              <h3 className="project-title">CryptoSamurai NFT</h3>
              <p className="project-description">侍をモチーフにしたNFTコレクション</p>
            </div>
            <div className="card-image">
              <Image
                src="/images/nft-highlight.jpg"
                alt="CryptoSamurai NFT"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>

          <Link href="/projects/sui-arbitrage" className="image-card">
            <div className="card-content">
              <h3 className="project-title">SUI Arbitrage Strategy</h3>
              <p className="project-description">SUIチェーンで200ドル稼いだお話</p>
            </div>
            <div className="card-image">
              <Image
                src="/images/sui-highlight.jpg"
                alt="SUI Arbitrage"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>

          <Link href="/projects/hyperevm-arbitrage" className="image-card">
            <div className="card-content">
              <h3 className="project-title">HyperEVM Arbitrage: 価格振動スナイピング</h3>
              <p className="project-description">HyperEVMチェーンで2000ドル稼ぐお話</p>
            </div>
            <div className="card-image">
              <Image
                src="/images/hyperevm-highlight.jpg"
                alt="HyperEVM Arbitrage"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>

          <Link href="/projects/btc-trading-bot" className="image-card">
            <div className="card-content">
              <h3 className="project-title">BTC Trading Bot</h3>
              <p className="project-description">ビットコインの自動売買BOTの開発記録</p>
            </div>
            <div className="card-image">
              <Image
                src="/images/btc-highlight.jpg"
                alt="BTC Trading Bot"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>

          <Link href="/projects/dqx-minigame" className="image-card">
            <div className="card-content">
              <h3 className="project-title">DQX ミニゲーム AI</h3>
              <p className="project-description">深層学習でミニゲームを攻略するAIの開発記録</p>
            </div>
            <div className="card-image">
              <Image
                src="/images/dqx-highlight.jpg"
                alt="DQX Minigame AI"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>
        </section>
      </main>

      <footer>
        &copy; 2025 Yuichi Kumano
      </footer>
    </main>
  );
} 