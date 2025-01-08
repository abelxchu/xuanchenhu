// 載入數位名片組件
function loadDigitalCard() {
    fetch('components/digital-card.html')
        .then(response => response.text())
        .then(html => {
            const cardContainer = document.querySelector('.card-container');
            if (cardContainer) {
                cardContainer.innerHTML = html;
                
                // 檢查是否已經載入過腳本
                if (!window.digitalCardInitialized) {
                    initializeDigitalCard();
                    window.digitalCardInitialized = true;
                }
            }
        })
        .catch(error => console.error('Error loading digital card:', error));
}

// 初始化數位名片的事件監聽
function initializeDigitalCard() {
    const script = document.createElement('script');
    script.src = 'scripts/digital-card.js';
    document.body.appendChild(script);
}

// 當 DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    loadDigitalCard();
}); 