// 等待页面DOM元素加载完成后再执行代码，避免获取不到元素
document.addEventListener('DOMContentLoaded', function() {
  // 1. 获取页面核心元素
  const animeCards = document.querySelectorAll('.anime-card'); // 所有动漫卡片
  const videoModal = document.getElementById('video-modal'); // 视频弹窗
  const fullscreenVideo = document.getElementById('fullscreen-video'); // 全屏视频
  const closeBtn = document.getElementById('close-btn'); // 关闭按钮
  const animeTitle = document.getElementById('anime-title'); // 弹窗内动漫标题

  // 2. 为每个动漫卡片绑定点击事件
  animeCards.forEach(card => {
    card.addEventListener('click', function() {
      // 获取当前卡片的视频链接和动漫名称
      const videoSrc = this.getAttribute('data-video-src');
      const cardAnimeName = this.querySelector('.anime-name').textContent;

      // 给弹窗赋值内容
      fullscreenVideo.src = videoSrc; // 设置视频源
      animeTitle.textContent = cardAnimeName; // 设置动漫标题

      // 显示弹窗（将CSS中的display:none改为flex）
      videoModal.style.display = 'flex';

      // 视频自动播放（兼容部分浏览器的自动播放策略）
      fullscreenVideo.play().catch(err => {
        // 若自动播放失败（浏览器限制），提示用户手动点击播放
        console.log('自动播放失败，请手动点击播放按钮：', err);
        // 可在此处添加提示文字，比如在弹窗中显示提示
        // const tip = document.createElement('div');
        // tip.className = 'play-tip';
        // tip.textContent = '请手动点击播放视频';
        // modalContent.appendChild(tip);
      });

      // 点击视频本身触发全屏（可选，补充交互体验）
      fullscreenVideo.addEventListener('click', function() {
        // 兼容不同浏览器的全屏API
        if (this.requestFullscreen) {
          this.requestFullscreen();
        } else if (this.webkitRequestFullscreen) { // Chrome、Safari
          this.webkitRequestFullscreen();
        } else if (this.msRequestFullscreen) { // Edge
          this.msRequestFullscreen();
        }
      });
    });
  });

  // 3. 关闭按钮点击事件：隐藏弹窗+暂停视频
  closeBtn.addEventListener('click', function() {
    closeVideoModal();
  });

  // 4. 点击弹窗空白处关闭弹窗
  videoModal.addEventListener('click', function(e) {
    // 判断点击的目标是否是弹窗本身（而非弹窗内的内容）
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });

  // 5. 封装关闭弹窗的公共函数（避免重复代码）
  function closeVideoModal() {
    videoModal.style.display = 'none'; // 隐藏弹窗
    fullscreenVideo.pause(); // 暂停视频播放
    fullscreenVideo.src = ''; // 清空视频源，避免下次打开自动播放旧视频
    animeTitle.textContent = ''; // 清空动漫标题
  }

  // 6. 可选：监听视频播放结束事件，自动关闭弹窗
  fullscreenVideo.addEventListener('ended', function() {
    closeVideoModal();
    alert('视频播放完毕！'); // 可选提示，可删除
  });
});