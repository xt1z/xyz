document.addEventListener('DOMContentLoaded', () => {
  // Apply random animation delay to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const randomDelay = Math.random() * 0.3;
    card.style.animationDelay = `${randomDelay}s`;
  });

  // Interactive music items
  const musicItems = document.querySelectorAll('.music-item');
  musicItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log(`Playing: ${item.querySelector('.song-title').textContent} by ${item.querySelector('.artist-name').textContent}`);
    });
  });
});
