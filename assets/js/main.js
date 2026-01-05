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
const themeImage = document.getElementById('theme-image') // Assinatura
const myPhoto = document.getElementById('meu-rosto')      // <--- NOVA SELEÇÃO: Sua foto principal

const darkThemeClass = 'clear-theme'   // Classe que ativa o modo claro (visual)
const sunIconClass = 'ri-sun-line'     // Ícone sol
const moonIconClass = 'ri-moon-line'   // Ícone lua

// Caminhos das imagens da ASSINATURA
const lightImageSrc = 'https://i.ibb.co/XxVZsNKm/rubrica-branca.png' // Para fundo escuro
const darkImageSrc = 'https://i.ibb.co/PskDFNmk/rubrica-preta.png'   // Para fundo claro

// Caminhos das imagens da FOTO PRINCIPAL (TERNO)
// Modo Escuro (Fundo preto) -> Terno Cinza Claro
const graySuitSrc = 'https://i.ibb.co/HLGHGPSk/eu.png' 

// Modo Claro (Fundo branco/clear-theme) -> Terno Preto
const blackSuitSrc = 'https://i.ibb.co/Q7tgGLZN/eu-CINZA.png' 

// Funções auxiliares
const getCurrentTheme = () => document.body.classList.contains(darkThemeClass) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(sunIconClass) ? sunIconClass : moonIconClass

// Tenta recuperar escolhas salvas pelo usuário
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Se houver tema salvo, aplica no corpo, no botão e nas imagens
if (selectedTheme) {
  if (selectedTheme === 'dark') {
    document.body.classList.add(darkThemeClass)

    if (themeImage) themeImage.src = darkImageSrc
    if (myPhoto) myPhoto.src = blackSuitSrc
  } else {
    document.body.classList.remove(darkThemeClass)

    if (themeImage) themeImage.src = lightImageSrc
    if (myPhoto) myPhoto.src = graySuitSrc
  }

  if (themeButton) {
    if (selectedIcon === sunIconClass) {
      themeButton.classList.add(sunIconClass)
      themeButton.classList.remove(moonIconClass)
    } else {
      themeButton.classList.add(moonIconClass)
      themeButton.classList.remove(sunIconClass)
    }
  }
}


// Ao clicar no botão, alterna o tema, ícone e as imagens
if (themeButton) {
  themeButton.addEventListener('click', () => {
    const isActive = document.body.classList.toggle(darkThemeClass)

    if (themeButton.classList.contains(sunIconClass)) {
      themeButton.classList.remove(sunIconClass)
      themeButton.classList.add(moonIconClass)
    } else {
      themeButton.classList.remove(moonIconClass)
      themeButton.classList.add(sunIconClass)
    }

    if (themeImage) {
      themeImage.src = isActive ? darkImageSrc : lightImageSrc
    }

    if (myPhoto) {
      myPhoto.src = isActive ? blackSuitSrc : graySuitSrc
    }

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
  })
}


//NAVEGAÇÃO PERSONALIZADA

document.querySelectorAll('a.nav__link[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    navMenu.classList.remove('show-menu')
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY - 15;
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

const scrollUpBtn = document.getElementById('scroll-up')

if (scrollUpBtn) {
  scrollUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0 })
  })
}


/*---------ANIMAÇÕES ELEMENTOS (CORREÇÃO FLICKER + BIDIRECIONAL) -------------*/

const elements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 1. MOMENTO DE ANIMAR:
    // Verifica se está intersectando E se já passou de 15% de visibilidade (entry.intersectionRatio > 0.15).
    // Usamos 0.15 para dar uma margem de segurança para a animação acontecer sem sair da tela.
    if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
      entry.target.classList.add('show');
    } 
    // 2. MOMENTO DE RESETAR:
    // Só removemos a classe se o elemento parou TOTALMENTE de intersectar (!entry.isIntersecting).
    // Isso garante que pequenas mudanças de posição durante a animação não removam a classe.
    else if (!entry.isIntersecting) {
      entry.target.classList.remove('show');
    }
  });
}, {
  // IMPORTANTE: Definimos dois thresholds (limites).
  // 0: Para detectar quando sai completamente da tela (resetar).
  // 0.15: Para detectar quando já entrou 15% na tela (animar).
  threshold: [0, 0.2] 
});

elements.forEach(el => observer.observe(el));

  //NAVEGAÇÃO PUXANDO CERTINHO NO MEIO DA SECTION 

document.querySelectorAll('.puxar-certo').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);

    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY - 15;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
      });
    }
  });
});

/*=============== SISTEMA DE NOTIFICAÇÃO (TOAST) ===============*/
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    
    // Cria o elemento
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'error') toast.classList.add('error');

    // Define o ícone baseado no tipo
    const iconClass = type === 'success' ? 'ri-checkbox-circle-line' : 
                      type === 'error' ? 'ri-error-warning-line' : 
                      'ri-information-line';

    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span class="toast-msg">${message}</span>
    `;

    // Adiciona ao container
    container.appendChild(toast);

    // Remove automaticamente após 4 segundos (sincronizado com o CSS)
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.5s ease forwards';
        // Remove do DOM após a animação de saída
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 4000);
}

/* =============== ATUALIZAR ALTURA DA HEADER (CSS VARIABLE) =============== */
function updateHeaderHeight() {
    const header = document.getElementById('header');
    if (header) {
        // Pega a altura exata do header em pixels
        const height = header.offsetHeight;
        
        // Cria uma variável CSS global chamada --header-height
        document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
}

// Executa ao carregar a página
window.addEventListener('load', updateHeaderHeight);

// Executa sempre que a tela for redimensionada (responsividade)
window.addEventListener('resize', updateHeaderHeight);

// Executa também ao rolar, caso sua header mude de tamanho no scroll
window.addEventListener('scroll', updateHeaderHeight);


/* Adicionar no main.js */
document.addEventListener('DOMContentLoaded', () => {
    const aboutText = document.querySelector('.about__text');
    
    const checkScreenSize = () => {
        if (window.innerWidth <= 1024) {
            // Se for mobile, remove fade-left e põe zoom-in
            if (aboutText.classList.contains('fade-left')) {
                aboutText.classList.remove('fade-left');
                aboutText.classList.add('zoom-in');
            }
        } else {
            // Se voltar para desktop, restaura fade-left
            if (aboutText.classList.contains('zoom-in')) {
                aboutText.classList.remove('zoom-in');
                aboutText.classList.add('fade-left');
            }
        }
    };

    // Verifica ao carregar
    checkScreenSize();
    
    // Verifica se o usuário redimensionar a tela
    window.addEventListener('resize', checkScreenSize);
});

/* =============== TROCA ANIMAÇÃO BOTÕES PROJETOS (Via JS) =============== */
function updateProjectButtonAnimation() {
    // Define o limite (1200px conforme seu mediaquery.css)
    const isMobile = window.innerWidth <= 1200;
    
    // Seleciona todos os botões de projeto
    const buttons = document.querySelectorAll('.btn__projects');

    buttons.forEach(button => {
        // Pega a DIV pai que tem as classes .hidden e .fade-right
        const container = button.parentElement;

        if (isMobile) {
            // MODO MOBILE: Se tiver fade-right, troca para zoom-in
            if (container.classList.contains('fade-right')) {
                container.classList.remove('fade-right');
                container.classList.add('zoom-in');
            }
        } else {
            // MODO DESKTOP: Se tiver zoom-in, volta para fade-right
            if (container.classList.contains('zoom-in')) {
                container.classList.remove('zoom-in');
                container.classList.add('fade-right');
            }
        }
    });
}

// Executa assim que a página carrega
window.addEventListener('load', updateProjectButtonAnimation);

// Executa sempre que redimensionar a janela
window.addEventListener('resize', updateProjectButtonAnimation);

/* =============== WORK TOGGLE (Lógica Genérica) =============== */
const workToggles = document.querySelectorAll('.work__toggle');

workToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        
        // 1. Alterna a classe visual (o CSS move o fundo laranja)
        toggle.classList.toggle('active-mobile');
        
        // 2. Alterna as cores dos ícones (Computador vs Celular)
        const options = toggle.querySelectorAll('.work__option');
        options.forEach(opt => opt.classList.toggle('active'));

        // 3. LÓGICA DA TROCA DE IMAGEM
        // Correção aqui: Buscamos '.work__content' (conforme seu HTML) em vez de '.projects__content'
        const workContent = toggle.closest('.work__content'); 
        const projectImg = workContent.querySelector('.notebook');
        
        // Verifica se ativou o modo mobile
        const isMobile = toggle.classList.contains('active-mobile');
        
        // Pega os links salvos no HTML (data-pc e data-mobile)
        const pcSrc = projectImg.getAttribute('data-pc');
        const mobileSrc = projectImg.getAttribute('data-mobile');

        // Adiciona transição suave via JS para garantir o efeito
        projectImg.style.transition = 'opacity 0.2s ease';
        projectImg.style.opacity = '0'; // Oculta a imagem
        
        // Aguarda 200ms (tempo do fade out) para trocar a fonte
        setTimeout(() => {
            if (isMobile && mobileSrc) {
                // Se ativou mobile, põe a imagem de celular
                projectImg.src = mobileSrc;
            } else {
                // Se desativou (voltou pro pc), põe a imagem de pc
                projectImg.src = pcSrc;
            }
            // Mostra a imagem novamente
            projectImg.style.opacity = '1';
        }, 200);
    });
});

/* =============== PRELOAD DE IMAGENS (CACHE) =============== */
/* Carrega imagens secundárias em segundo plano para evitar delay na troca */

function preloadAllImages() {
    // 1. Defina aqui as imagens do TEMA (Assinaturas e Fotos de Perfil)
    const staticImages = [
        'https://i.ibb.co/XxVZsNKm/rubrica-branca.png', // Assinatura Dark Mode
        'https://i.ibb.co/PskDFNmk/rubrica-preta.png',   // Assinatura Light Mode
        'https://i.ibb.co/HLGHGPSk/eu.png',               // Foto Terno Cinza
        'https://i.ibb.co/Q7tgGLZN/eu-CINZA.png'         // Foto Terno Preto
    ];

    // Loop para carregar as estáticas
    staticImages.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    // 2. Busca automática das imagens dos PROJETOS (PC e Mobile)
    const projectImages = document.querySelectorAll('.notebook');

    projectImages.forEach(element => {
        const pcSrc = element.getAttribute('data-pc');
        const mobileSrc = element.getAttribute('data-mobile');

        // Preload da versão PC
        if (pcSrc) {
            const imgPC = new Image();
            imgPC.src = pcSrc;
        }

        // Preload da versão Mobile
        if (mobileSrc) {
            const imgMobile = new Image();
            imgMobile.src = mobileSrc;
        }
    });

    console.log('Todas as imagens secundárias foram pré-carregadas no cache.');
}

// Executa o preload assim que o site terminar de carregar o essencial
window.addEventListener('load', preloadAllImages);

/* =============== FIX DEFINITIVO: ANIMAÇÃO DE TOQUE MOBILE =============== */
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se é dispositivo touch
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (isTouch) {
        // Seleciona todos os elementos que devem ter o efeito
        // Adicione aqui qualquer classe que precise do efeito
        const elements = document.querySelectorAll('.trocar, .nav__actions i, .home__button, a.nav__link, .work__toggle');

        elements.forEach(el => {
            el.addEventListener('click', function(e) {
                // Adiciona a classe que definimos no CSS
                this.classList.add('active-effect');

                // Remove depois de 400ms (0.4s)
                setTimeout(() => {
                    this.classList.remove('active-effect');
                }, 400);
            });
        });
    }
});