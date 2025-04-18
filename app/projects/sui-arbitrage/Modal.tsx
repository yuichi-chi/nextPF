'use client';

import { useEffect } from 'react';

export default function Modal() {
  useEffect(() => {
    const triggers = document.querySelectorAll('.modal-trigger');

    triggers.forEach(img => {
      img.addEventListener('click', function() {
        // オーバーレイ作成
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');

        // 拡大画像作成
        const enlarged = document.createElement('img');
        enlarged.src = (img as HTMLImageElement).src;
        enlarged.classList.add('modal-image');

        // クリックで閉じる
        const closeModal = () => {
          overlay.remove();
          enlarged.remove();
        };

        overlay.addEventListener('click', closeModal);
        enlarged.addEventListener('click', closeModal);

        // DOMに追加
        document.body.appendChild(overlay);
        document.body.appendChild(enlarged);
        overlay.style.display = 'block';
        enlarged.style.display = 'block';
      });
    });

    return () => {
      triggers.forEach(img => {
        img.removeEventListener('click', () => {});
      });
    };
  }, []);

  return null;
} 