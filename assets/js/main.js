lucide.createIcons();

// ---- Tab switcher ----
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.getAttribute('data-tab');
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-panel') === id));
  });
});

// ---- Count-up animation ----
function countUp(el, end, duration) {
  const suffix = el.dataset.suffix || '';
  const startTime = performance.now();
  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(end * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end + suffix;
  };
  requestAnimationFrame(update);
}

// ---- Scroll reveal + stat counter trigger ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');

    // trigger count-up for any data-count el within the revealed element
    e.target.querySelectorAll('[data-count]').forEach(el => {
      countUp(el, parseFloat(el.dataset.count), 1600);
    });

    io.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4 * 65) + 'ms';
  io.observe(el);
});

// Hero stats — trigger immediately (already in view on load)
document.querySelectorAll('.hero-stat [data-count]').forEach(el => {
  const trigger = el.closest('.hero-stat');
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      countUp(el, parseFloat(el.dataset.count), 1800);
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(trigger);
});
