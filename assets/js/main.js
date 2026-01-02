/*=============== Navegação clicavel ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')    

/*=============== MENU SHOW ===============*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*=============== MENU HIDDEN ===============*/ 
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== ACAO DO CABECALHO ===============*/ 
const bgHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header')
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)

/*=============== TEMA CLARO/ESCURO + TROCA DE IMAGEM ===============*/
const themeButton = document.getElementById('theme-button')
const themeImage = document.getElementById('theme-image') // <img id="theme-image">

const darkThemeClass = 'clear-theme'   // Classe que ativa o modo escuro
const sunIconClass = 'ri-sun-line'     // Ícone sol
const moonIconClass = 'ri-moon-line'   // Ícone lua

// Caminhos das imagens
const lightImageSrc = 'https://i.ibb.co/XxVZsNKm/rubrica-branca.png'
const darkImageSrc = 'https://i.ibb.co/PskDFNmk/rubrica-preta.png'

// Funções auxiliares
const getCurrentTheme = () => document.body.classList.contains(darkThemeClass) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(sunIconClass) ? sunIconClass : moonIconClass

// Tenta recuperar escolhas salvas pelo usuário
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Se houver tema salvo, aplica no corpo, no botão e na imagem
if (selectedTheme) {
  if (selectedTheme === 'dark') {
    document.body.classList.add(darkThemeClass)
    themeImage.src = darkImageSrc
  } else {
    document.body.classList.remove(darkThemeClass)
    themeImage.src = lightImageSrc
  }

  // Ajusta o ícone do botão
  if (selectedIcon === sunIconClass) {
    themeButton.classList.add(sunIconClass)
    themeButton.classList.remove(moonIconClass)
  } else {
    themeButton.classList.add(moonIconClass)
    themeButton.classList.remove(sunIconClass)
  }
}

// Ao clicar no botão, alterna o tema, ícone e imagem
themeButton.addEventListener('click', () => {
  const isDark = document.body.classList.toggle(darkThemeClass)

  // Troca ícone
  if (themeButton.classList.contains(sunIconClass)) {
    themeButton.classList.remove(sunIconClass)
    themeButton.classList.add(moonIconClass)
  } else {
    themeButton.classList.remove(moonIconClass)
    themeButton.classList.add(sunIconClass)
  }

  // Troca imagem de acordo com o tema
  themeImage.src = isDark ? darkImageSrc : lightImageSrc

  // Salva escolha
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})

//NAVEGAÇÃO PERSONALIZADA

document.querySelectorAll('a.nav__link[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    navMenu.classList.remove('show-menu')
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
      });
    }
  });
});

//li clicável

document.querySelectorAll('.nav__list li').forEach(item => {
  item.addEventListener('click', function () {
    const link = this.querySelector('a');
    if (link) {
      link.click();
    }
  });
});

//PROGRESSO DA PÁGINA

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = `${scrollPercent}%`;
});

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                    : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

document.getElementById('scroll-up').addEventListener('click', (e) => {
  e.preventDefault(); // evita o salto instantâneo
  window.scrollTo({
    top: 0,
  });
});

/*---------ANIMAÇÕES ELEMENTOS-------------*/

  const elements = document.querySelectorAll('.hidden');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show'); // Remove quando sai da tela
      }
    });
  }, { threshold: 0.2 }); // Ativa com 20% visível

  elements.forEach(el => observer.observe(el));

  