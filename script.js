const body = document.body;
const themeButton = document.getElementById('darkModeToggle');
const menuButton = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
try { body.classList.toggle('dark', localStorage.getItem('darkMode') !== 'disabled'); } catch {}
function updateTheme() {
  const dark = body.classList.contains('dark');
  themeButton.innerHTML = `<i class="fas fa-${dark ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
  themeButton.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
}
updateTheme();
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  try { localStorage.setItem('darkMode', body.classList.contains('dark') ? 'enabled' : 'disabled'); } catch {}
  updateTheme();
});
function setMenu(open) {
  nav.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menuButton.innerHTML = `<i class="fas fa-${open ? 'times' : 'bars'}" aria-hidden="true"></i>`;
}
menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('active')));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if(event.key === 'Escape') setMenu(false); });
document.addEventListener('click', event => { if(!event.target.closest('header')) setMenu(false); });
window.addEventListener('resize', () => { if(window.innerWidth > 760) setMenu(false); });
const links = [...nav.querySelectorAll('a')];
const sections = [...document.querySelectorAll('section')];
function updateNavigation() {
  let current = sections[0].id;
  sections.forEach(section => { if(section.getBoundingClientRect().top <= 150) current = section.id; });
  links.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if(active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateNavigation, {passive:true});
updateNavigation();
