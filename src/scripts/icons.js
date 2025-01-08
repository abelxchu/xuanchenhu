document.addEventListener('DOMContentLoaded', () => {
    // 主題切換
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // 載入時檢查主題偏好
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
        }

        // 切換主題
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
    }

    // 選單切換
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // 當選單開啟時禁止背景滾動
            document.body.style.overflow = menuToggle.classList.contains('active') ? 'hidden' : '';
        });

        // 點擊選單外部關閉選單
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}); 