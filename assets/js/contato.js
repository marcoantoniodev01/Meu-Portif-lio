/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message');

document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("-Yu3_S-ZbcNVnn82H"); // Substitua pela sua Public Key
});

const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vxfp5en', 'template_kni208c', '#contact-form')
        .then(() => {
            contactMessage.textContent = 'Sua mensagem foi enviada com sucesso!';
            contactMessage.style.color = 'orange';

            setTimeout(() => {
                contactMessage.textContent = '';
            }, 5000);

            contactForm.reset();
        }, (error) => {
            contactMessage.textContent = 'Mensagem não enviada, erro no serviço ❌';
            contactMessage.style.color = 'red';
            console.error('Erro:', error);
        });
};

contactForm.addEventListener('submit', sendEmail);