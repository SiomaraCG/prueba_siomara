document.querySelectorAll('.podcast-card').forEach(card => {
  const audio = card.querySelector('audio');
  const playBtn = card.querySelector('.play-btn');
  const playIcon = card.querySelector('.play-icon');
  const progressBar = card.querySelector('.progress-bar');
  const currentTimeSpan = card.querySelector('.current-time');
  const durationSpan = card.querySelector('.duration');

  playBtn.addEventListener('click', () => {
    document.querySelectorAll('audio').forEach(a => {
      if (a !== audio) {
        a.pause();
        const otherCard = a.closest('.podcast-card');
        if (otherCard) {
          const otherIcon = otherCard.querySelector('.play-icon');
          if (otherIcon) otherIcon.textContent = '▶️';
        }
      }
    });

    if (audio.paused) {
      audio.play();
      playIcon.textContent = '⏸️';
    } else {
      audio.pause();
      playIcon.textContent = '▶️';
    }
  });

  card.querySelector('.rewind').addEventListener('click', () => {
    audio.currentTime -= 10;
  });

  card.querySelector('.forward').addEventListener('click', () => {
    audio.currentTime += 10;
  });

  progressBar.addEventListener('input', e => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
  });

  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percent;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });

  audio.addEventListener('loadedmetadata', () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });


  
});
document.addEventListener('keydown', e => {
  const playingAudio = Array.from(document.querySelectorAll('audio')).find(a => !a.paused);
  if (!playingAudio) return;
  switch (e.key) {
    case 'ArrowLeft': 
      playingAudio.currentTime = Math.max(0, playingAudio.currentTime - 10);
      e.preventDefault(); 
      break;
    case 'ArrowRight': 
      playingAudio.currentTime = Math.min(playingAudio.duration, playingAudio.currentTime + 10);
      e.preventDefault();
      break;
    case ' ': 
      if (playingAudio.paused) {
        playingAudio.play();
      } else {
        playingAudio.pause();
      }
      e.preventDefault();
      break;
  }
});