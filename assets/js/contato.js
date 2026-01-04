/*=============== EMAIL JS & VALIDAÇÃO & LOADER ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('name'),
      contactEmail = document.getElementById('email'),
      contactMessage = document.getElementById('message'),
      loader = document.getElementById('loading-spinner');

document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o EmailJS
    emailjs.init("-Yu3_S-ZbcNVnn82H"); 
});

const sendEmail = (e) => {
    e.preventDefault();

    // 1. Validação dos Campos
    if(contactName.value === '' || contactEmail.value === '' || contactMessage.value === ''){
        showToast('Preencha todos os campos para enviar!', 'error');
        return; 
    }

    // LOG DE DEBUG: Se aparecer isso no console (F12), a validação passou
    console.log('Validação OK. Tentando mostrar loader...');

    // 2. MOSTRAR O LOADER (Com segurança)
    if (loader) {
        loader.classList.add('active');
    } else {
        console.warn('AVISO: O elemento "loading-spinner" não foi encontrado no HTML.');
    }

    // 3. Envio do Email
    emailjs.sendForm('service_vxfp5en', 'template_kni208c', '#contact-form')
        .then(() => {
            // Sucesso
            console.log('Email enviado!');
            
            // Esconder Loader
            if(loader) loader.classList.remove('active');

            // Feedback Visual
            showToast('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();

        }, (error) => {
            // Erro
            console.error('Erro no EmailJS:', error);
            
            // Esconder Loader
            if(loader) loader.classList.remove('active');

            // Feedback Visual
            showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
        });
};

contactForm.addEventListener('submit', sendEmail);