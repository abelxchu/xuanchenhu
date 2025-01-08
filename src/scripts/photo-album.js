document.addEventListener('DOMContentLoaded', () => {
    const album = document.querySelector('.photo-album');
    const photos = album.querySelectorAll('.album-photo');
    const dots = album.querySelectorAll('.album-dot');
    let currentIndex = 0;

    function showPhoto(index) {
        photos.forEach((photo, i) => {
            photo.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showPhoto(currentIndex);
        });
    });

    showPhoto(currentIndex);
}); 