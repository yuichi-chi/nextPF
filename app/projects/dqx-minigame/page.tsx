import Image from 'next/image';
import Link from 'next/link';

export default function DQXMinigameAI() {
  return (
    <main className="project-page">
      <div className="project-header">
        <h1>DQX ミニゲーム AI</h1>
        <p className="project-subtitle">深層学習でミニゲームを攻略するAIの開発記録</p>
      </div>

      <section className="project-content">
        <div className="project-image">
          <Image
            src="/images/dqx-highlight.jpg"
            alt="DQX Minigame AI"
            width={800}
            height={400}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="project-description">
          <h2>プロジェクト概要</h2>
          <p>
            ドラゴンクエストXのミニゲームを攻略するAIを開発しました。
            深層学習を用いてゲームのパターンを学習し、人間を超えるスコアを達成できるようになりました。
          </p>

          <h2>使用技術</h2>
          <ul>
            <li>Python</li>
            <li>PyTorch</li>
            <li>OpenCV</li>
            <li>AutoHotkey</li>
          </ul>

          <h2>主な機能</h2>
          <ul>
            <li>深層強化学習による戦略学習</li>
            <li>パフォーマンス分析と改善</li>
          </ul>
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