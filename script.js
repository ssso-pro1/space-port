'use strict';

// Skills
const skillsSection = document.querySelector('.skillset__left');

const progressBars = document.querySelectorAll('.skill__value');

function showProgress() {
  progressBars.forEach(progressBar => {
    const value = progressBar.dataset.progress;
    // console.log(value);
    progressBar.style.opacity = 1;
    progressBar.style.width = `${value}%`;
  });
}
function hideProgress() {
  progressBars.forEach(progressBar => {
    progressBar.style.opacity = 0;
    progressBar.style.width = 0;
  });
}

window.addEventListener('scroll', () => {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screensPos = window.innerHeight;

  if (sectionPos < screensPos) {
    showProgress();
  } else {
    hideProgress();
  }
});
