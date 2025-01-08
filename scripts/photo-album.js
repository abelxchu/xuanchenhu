document.addEventListener('DOMContentLoaded', () => {
    const album = document.querySelector('.photo-album');
    const photos = album.querySelectorAll('.album-photo');
    const dots = album.querySelectorAll('.album-dot');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function showPhoto(index) {
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        
        currentIndex = index;
        
        photos.forEach((photo, i) => {
            photo.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showPhoto(index);
        });
    });

    album.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    album.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                showPhoto(currentIndex - 1);
            } else {
                showPhoto(currentIndex + 1);
            }
        }
    });

    album.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    album.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    album.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diffX = endX - startX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                showPhoto(currentIndex - 1);
            } else {
                showPhoto(currentIndex + 1);
            }
        }
        
        isDragging = false;
    });

    album.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    showPhoto(currentIndex);
}); 