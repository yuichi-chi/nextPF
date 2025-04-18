import Image from 'next/image';
import Link from 'next/link';

export default function BTCTradingBot() {
  return (
    <main className="project-page">
      <div className="project-header">
        <h1>BTC Trading Bot</h1>
        <p className="project-subtitle">ビットコインの自動売買BOTの開発記録</p>
      </div>

      <section className="project-content">
        <div className="project-image">
          <Image
            src="/images/btc-highlight.jpg"
            alt="BTC Trading Bot"
            width={800}
            height={400}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="project-description">
          <h2>プロジェクト概要</h2>
          <p>
            ビットコインの価格変動を分析し、自動的に売買を行うトレーディングボットを開発しました。
            テクニカル分析と機械学習を組み合わせた独自の戦略を実装し、安定的な収益を目指しています。
          </p>

          <h2>開発の背景</h2>
          <p>
            ビットコインの価格変動は24時間365日続いており、人間が常に監視することは困難です。
            また、感情に左右されない機械的な取引が、より安定的な収益を生み出す可能性があると考え、
            このプロジェクトを開始しました。
          </p>

          <h2>使用技術</h2>
          <ul>
            <li>Python - メインの開発言語として使用</li>
            <li>TensorFlow - 機械学習モデルの実装</li>
            <li>Pandas - データ分析と処理</li>
            <li>Binance API - 取引所との連携</li>
            <li>PostgreSQL - 取引データの保存</li>
            <li>Docker - 環境のコンテナ化</li>
            <li>Grafana - パフォーマンスの可視化</li>
          </ul>

          <h2>主な機能</h2>
          <ul>
            <li>リアルタイム価格データ収集
              <ul>
                <li>Binanceからの価格データ取得</li>
                <li>1分足、5分足、15分足、1時間足のデータ収集</li>
                <li>取引量データの収集</li>
              </ul>
            </li>
            <li>テクニカル指標の計算
              <ul>
                <li>移動平均線（SMA, EMA）</li>
                <li>RSI（相対力指数）</li>
                <li>MACD（移動平均収束拡散指標）</li>
                <li>ボリンジャーバンド</li>
              </ul>
            </li>
            <li>機械学習による価格予測
              <ul>
                <li>LSTMモデルによる価格予測</li>
                <li>特徴量エンジニアリング</li>
                <li>モデルの定期的な再学習</li>
              </ul>
            </li>
            <li>自動売買実行
              <ul>
                <li>設定した条件での自動取引</li>
                <li>複数の取引戦略の並行実行</li>
                <li>リスク管理に基づく取引量の調整</li>
              </ul>
            </li>
            <li>パフォーマンス分析とレポート生成
              <ul>
                <li>日次・週次・月次の利益レポート</li>
                <li>取引履歴の詳細な分析</li>
                <li>パフォーマンス指標の計算</li>
              </ul>
            </li>
          </ul>

          <h2>開発で直面した課題</h2>
          <ul>
            <li>機械学習モデルの予測精度の向上</li>
            <li>市場の急激な変動への対応</li>
            <li>API制限への対応</li>
            <li>システムの安定性確保</li>
          </ul>

          <h2>今後の改善点</h2>
          <ul>
            <li>より高度な機械学習モデルの導入</li>
            <li>複数の取引所への対応</li>
            <li>リスク管理システムの強化</li>
            <li>UI/UXの改善</li>
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