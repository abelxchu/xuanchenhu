const photoData = [
    {
        url: '/xuanchenhu/assets/images/photo1.jpg',
        title: 'Photo 1',
        description: 'Description for photo 1'
    },
    {
        url: '/xuanchenhu/assets/images/photo2.jpg',
        title: 'Photo 2',
        description: 'Description for photo 2'
    },
    {
        url: '/xuanchenhu/assets/images/photo3.jpg',
        title: 'Photo 3',
        description: 'Description for photo 3'
    },
    // 可以繼續添加更多照片...
]; 

document.addEventListener('DOMContentLoaded', () => {
    const album = document.querySelector('.photo-album');
    const controls = album.querySelector('.album-controls');

    // 創建相片元素
    photoData.forEach((photo, index) => {
        // 創建相片
        const photoElement = document.createElement('div');
        photoElement.className = 'album-photo';
        photoElement.style.backgroundImage = `url(${photo.url})`;
        album.insertBefore(photoElement, controls);

        // 創建導航點
        const dot = document.createElement('div');
        dot.className = 'album-dot';
        controls.appendChild(dot);
    });
}); 