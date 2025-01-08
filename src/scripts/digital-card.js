document.querySelectorAll('.digital-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// 分享功能
document.querySelector('.share-icon').addEventListener('click', async (e) => {
    e.stopPropagation(); // 防止觸發卡片翻轉

    // 檢查瀏覽器是否支援網頁分享 API
    if (navigator.share) {
        try {
            await navigator.share({
                title: "XUAN CHEN HU's Business Card",
                text: 'Consultant / Designer',
                url: window.location.href
            });
        } catch (err) {
            console.error('分享失敗:', err);
        }
    } else {
        // 如果瀏覽器不支援分享 API，複製連結到剪貼簿
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('連結已複製到剪貼簿'))
            .catch(err => console.error('複製失敗:', err));
    }
}); 