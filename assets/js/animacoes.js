//ONDA DE COR LARANJA TITLE//

const p = document.getElementById("wave-text");
const interval = 3500; // tempo total de espera entre animações

function startWave() {
    p.classList.add("active");

    // Remover a classe depois que a animação terminar (ajuste o tempo total da animação + delay final)
    setTimeout(() => {
        p.classList.remove("active");
    }, 3000); // 2s de animação + último delay (13 letras × 0.15s)
}

// Iniciar a primeira onda
startWave();

// Repetir com intervalo
setInterval(() => {
    startWave();
}, interval);

//BRILHO DE COR LARANJA LINK

const a = document.getElementById("wave-link");
const intervall = 3500; // intervalo entre animações

  function startAnimation() {
    a.classList.add("animate");

    // remove a classe depois da animação
    setTimeout(() => {
      a.classList.remove("animate");
    }, 3000); // mesmo tempo da animação
  }

  startAnimation(); // executa na primeira vez

  // repete com intervalo
  setInterval(() => {
    startAnimation();
  }, intervall);

//BRILHO DE COR LARANJA ABOUT

const span = document.getElementById("wave-about");
const intervalla = 3500; // intervalo entre animações

  function startAnimationabout() {
    span.classList.add("animate-about");

    // remove a classe depois da animação
    setTimeout(() => {
      span.classList.remove("animate-about");
    }, 3000); // mesmo tempo da animação
  }

  startAnimationabout(); // executa na primeira vez

  // repete com intervalo
  setInterval(() => {
    startAnimationabout();
  }, intervalla);

  //BRILHO DE COR LARANJA BACKGROUND ABOUT ME

const h1 = document.getElementById("wave-back");
const intervallb = 3500; // intervalo entre animações

  function startAnimationback() {
    h1.classList.add("animate-back");

    // remove a classe depois da animação
    setTimeout(() => {
      h1.classList.remove("animate-back");
    }, 3000); // mesmo tempo da animação
  }

  startAnimationback(); // executa na primeira vez

  // repete com intervalo
  setInterval(() => {
    startAnimationback();
  }, intervallb);

  


