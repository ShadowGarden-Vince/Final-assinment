// 等待DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 1. 获取页面核心元素
  const animeCards = document.querySelectorAll('.anime-card'); // 所有动漫卡片
  const videoModal = document.getElementById('video-modal'); // 视频弹窗
  const fullscreenVideo = document.getElementById('fullscreen-video'); // 视频播放容器
  const closeBtn = document.getElementById('close-btn'); // 关闭按钮
  const animeTitle = document.getElementById('anime-title'); // 弹窗标题

  // 2. 动漫卡片点击事件 - 触发视频播放
  animeCards.forEach(card => {
    card.addEventListener('click', function() {
      // 获取卡片对应的视频链接和动漫名称
      const videoSrc = this.getAttribute('data-video-src');
      const cardAnimeName = this.querySelector('.anime-name').textContent;

      // 设置弹窗标题和视频链接
      animeTitle.textContent = cardAnimeName;
      fullscreenVideo.src = videoSrc;

      // 显示弹窗，禁止页面滚动（减少渲染压力，保证视频流畅）
      videoModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px'; // 解决滚动条消失导致的页面偏移
    });
  });

  // 3. 关闭按钮点击事件 - 关闭视频弹窗
  closeBtn.addEventListener('click', closeVideoModal);

  // 4. 点击弹窗空白处关闭弹窗
  videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // 5. 键盘ESC键关闭弹窗
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.style.display === 'flex') {
      closeVideoModal();
    }
  });

  // 6. 封装关闭弹窗的核心函数 - 彻底释放资源，保证后续播放流畅
  function closeVideoModal() {
    // 隐藏弹窗
    videoModal.style.display = 'none';

    // 恢复页面滚动和样式
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';

    // 清空视频链接，释放iframe资源（避免内存泄漏）
    fullscreenVideo.src = '';

    // 清空弹窗标题
    animeTitle.textContent = '';
  }

  // 7. 窗口大小变化时，适配弹窗布局
  window.addEventListener('resize', function() {
    if (videoModal.style.display === 'flex') {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px';
    }
  });
});