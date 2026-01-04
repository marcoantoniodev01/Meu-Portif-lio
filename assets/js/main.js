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
    // Se entrou aqui, é porque o usuário salvou o tema "claro" (classe clear-theme ativa)
    document.body.classList.add(darkThemeClass)
    themeImage.src = darkImageSrc  // Assinatura preta
    myPhoto.src = blackSuitSrc     // Terno preto
  } else {
    // Tema padrão (escuro)
    document.body.classList.remove(darkThemeClass)
    themeImage.src = lightImageSrc // Assinatura branca
    myPhoto.src = graySuitSrc      // Terno cinza

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

// Ao clicar no botão, alterna o tema, ícone e as imagens
themeButton.addEventListener('click', () => {
  const isActive = document.body.classList.toggle(darkThemeClass)

  // Troca ícone
  if (themeButton.classList.contains(sunIconClass)) {
    themeButton.classList.remove(sunIconClass)
    themeButton.classList.add(moonIconClass)
  } else {
    themeButton.classList.remove(moonIconClass)
    themeButton.classList.add(sunIconClass)
  }

  // Troca imagens de acordo com o tema
  // Se isActive for true (tema claro ativado), usa as versões pretas. Se false, versões claras.
  themeImage.src = isActive ? darkImageSrc : lightImageSrc
  myPhoto.src = isActive ? blackSuitSrc : graySuitSrc

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

document.getElementById('scroll-up').addEventListener('click', (e) => {
  e.preventDefault(); // evita o salto instantâneo
  window.scrollTo({
    top: 0,
  });
});

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

/* =============== WORK TOGGLE (CORRIGIDO PARA MOBILE) =============== */
const workToggles = document.querySelectorAll('.work__toggle');

workToggles.forEach(toggle => {
    // Variável de controle para impedir cliques duplos rápidos (Trava)
    let isAnimating = false;

    toggle.addEventListener('click', (e) => {
        // 1. Previne comportamentos padrão do toque no mobile
        e.preventDefault();

        // 2. Se já estiver animando, ignora o clique (Isso mata o Ghost Click)
        if (isAnimating) return;
        isAnimating = true;

        // --- Início da Lógica Visual ---
        
        toggle.classList.toggle('active-mobile');
        
        const options = toggle.querySelectorAll('.work__option');
        options.forEach(opt => opt.classList.toggle('active'));

        const workContent = toggle.closest('.work__content'); 
        const projectImg = workContent.querySelector('.notebook');
        
        const isMobile = toggle.classList.contains('active-mobile');
        const pcSrc = projectImg.getAttribute('data-pc');
        const mobileSrc = projectImg.getAttribute('data-mobile');

        // Adiciona transição
        projectImg.style.transition = 'opacity 0.2s ease';
        
        // 3. Oculta a imagem
        projectImg.style.opacity = '0';
        
        // 4. Aguarda o tempo da transição (200ms)
        setTimeout(() => {
            // Troca o SRC
            const newSrc = (isMobile && mobileSrc) ? mobileSrc : pcSrc;
            projectImg.src = newSrc;
            
            // 5. O SEGREDO: Só mostra a imagem quando o navegador confirmar que ela carregou
            // Isso evita piscar a imagem antiga enquanto a nova processa
            projectImg.onload = () => {
                projectImg.style.opacity = '1';
                isAnimating = false; // Destrava para o próximo clique
            };

            // (Segurança) Caso a imagem já esteja em cache e o onload não dispare
            // Forçamos a aparição e o destravamento após um breve delay extra
            setTimeout(() => {
                if (projectImg.style.opacity === '0') {
                    projectImg.style.opacity = '1';
                    isAnimating = false;
                }
            }, 50);

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

/* ==========================================================================
   CORREÇÃO DEFINITIVA DE STICKY HOVER (HIERARQUIA COMPLETA)
   Remove o estado :hover e :focus de todos os elementos pais interativos
   após 400ms do toque.
   ========================================================================== */

document.addEventListener('touchend', function (event) {
    // 1. Inicia a contagem de 400ms (tempo que o hover fica ativo)
    setTimeout(() => {
        let element = event.target;
        let depth = 0; // Contador de segurança para não travar o browser

        // 2. Loop: Sobe 5 níveis na árvore do HTML a partir do toque
        // Isso garante que pegamos o ícone, o link (<a>) E o item da lista (<li>)
        while (element && element !== document.body && depth < 5) {
            
            // Verifica se o elemento atual é algo que pode ter hover/interação
            // Adicionei verificação de classes específicas do seu projeto também
            const isInteractive = 
                element.tagName === 'A' || 
                element.tagName === 'BUTTON' || 
                element.tagName === 'LI' || 
                element.tagName === 'INPUT' ||
                element.classList.contains('work__toggle') ||
                element.classList.contains('nav__close') ||
                element.classList.contains('nav__toggle');

            if (isInteractive) {
                // A. Remove o foco (Essencial para inputs e links no mobile)
                if (typeof element.blur === 'function') {
                    element.blur();
                }

                // B. O Truque do Pointer-Events (Desliga o mouse virtual)
                // Usamos uma IIFE (função imediata) para capturar a variável 'element' corretamente no loop
                (function(el) {
                    const originalPointerEvents = el.style.pointerEvents;
                    
                    // Desativa a detecção de mouse temporariamente
                    el.style.pointerEvents = 'none';
                    
                    // Força o navegador a repintar o elemento (Reflow)
                    void el.offsetHeight; 
                    
                    // Restaura a interatividade rapidamente (50ms)
                    // Rápido o suficiente para o usuário não notar, 
                    // mas lento o suficiente para o navegador limpar o hover.
                    setTimeout(() => {
                        el.style.pointerEvents = originalPointerEvents || '';
                    }, 50);
                })(element);
            }

            // Sobe para o pai para a próxima iteração do loop
            element = element.parentElement;
            depth++;
        }
    }, 400); // <-- Tempo de espera solicitado (0.4s)
}, { passive: true }); // Otimização para rolagem de tela

