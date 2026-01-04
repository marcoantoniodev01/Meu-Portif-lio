(async () => {
  await tsParticles.load("tsparticles", {
    /* ADICIONE ESTA CONFIGURAÇÃO ABAIXO */
    fullScreen: {
      enable: false,
      zIndex: 0
    },
    /* FIM DA ADIÇÃO */

    particles: {
      number: { value: 150 },
      color: { value: ["#FFA500", "#FF4500"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 4,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "top",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
  });
})();