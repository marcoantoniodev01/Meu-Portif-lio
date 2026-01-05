// 1. Configuração do Supabase
// 1. Configuração do Supabase
const supabaseUrl = 'https://yckijwhegogzuqargwvv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlja2lqd2hlZ29nenVxYXJnd3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzUyNDYsImV4cCI6MjA4MzE1MTI0Nn0._KONxdCymX8n9mX7AAAZvJsR9in70TyvTrxmf9vp3ls'; // Mantenha sua key original

// CORREÇÃO AQUI: Mudamos o nome da variável para 'supabaseClient'
// A variável global 'supabase' vem do script que adicionamos no HTML
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// 2. Mapeamento de Tecnologias para Imagens (Seus caminhos atuais)
const techIcons = {
    'html': 'https://i.ibb.co/qYxzvKw8/html.png',
    'css': 'https://i.ibb.co/B5XVTXVL/css.png',
    'javascript': 'https://i.ibb.co/sh3bncK/javascript.jpg',
    'sql': 'https://i.ibb.co/7dX7QzRH/SQL.png',
    'github': 'https://i.ibb.co/4nDz6N5k/github-white-icon.webp',
    'git': 'https://i.ibb.co/35C9YVtR/imagem-2026-01-04-193406153.png',
    'figma': 'https://i.ibb.co/r2mVTxcy/figma.png',
    'photoshop': 'https://i.ibb.co/9kB8DhZL/photoshop.png',
    'flutterflow': 'https://i.ibb.co/6RV94wgG/Flutter-Flow.png',
    'mysql': 'https://i.ibb.co/b5Zbh3DR/My-SQL.webp'
};

// 3. Função Principal
document.addEventListener('DOMContentLoaded', async () => {
    // Pegar o ID da URL (?id=1)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
        window.location.href = 'index.html'; // Se não tiver ID, volta pra home
        return;
    }

    const loader = document.getElementById('loading-spinner');
    if (loader) loader.classList.add('active'); // Mostrar loader

    try {
        // Buscar dados no Supabase
        const { data: projeto, error } = await supabaseClient
            .from('Projects')
            .select('*')
            .eq('id', projectId)
            .single();

        if (error) throw error;

        // Preencher Textos
        document.getElementById('project-title').textContent = projeto.titulo + " - Descrição";
        document.getElementById('project-desc').textContent = projeto.descricao;
        document.getElementById('project-link').href = projeto.link_projeto;

        // Preencher Tecnologias
        const techContainer = document.getElementById('tech-container');
        projeto.tecnologias.forEach(tech => {
            const key = tech.toLowerCase();
            if (techIcons[key]) {
                const img = document.createElement('img');
                img.src = techIcons[key];
                img.alt = tech;
                img.className = 'about__skills-img';
                img.title = tech;
                
                // Classes específicas de tamanho que você já usa
                if(key === 'figma') img.classList.add('about__skills-img-figma');
                if(key === 'mysql') img.classList.add('about__skills-img-Mysql');
                
                techContainer.appendChild(img);
            }
        });

        // Preencher Slides (Splide)
        const mainList = document.getElementById('main-slider-list');
        const thumbList = document.getElementById('thumb-slider-list');

        projeto.midias.forEach(midia => {
            // Criar Slide Principal
            const liMain = document.createElement('li');
            liMain.className = 'splide__slide';

            // Criar Slide Thumb
            const liThumb = document.createElement('li');
            liThumb.className = 'splide__slide';

            if (midia.type === 'video') {
                // Conteúdo Principal (Video)
                liMain.innerHTML = `
                    <iframe allow="fullscreen" allowfullscreen height="720"
                        src="${midia.url}" width="1280" style="border:none;">
                    </iframe>`;
                
                // Thumb do Vídeo (ícone de play ou uma imagem placeholder)
                liThumb.innerHTML = `<iframe allow="fullscreen" allowfullscreen height="720"
                        src="${midia.url}" width="1280" style="border:none;">
                    </iframe>`; 
            } else {
                // Conteúdo Principal (Imagem)
                liMain.innerHTML = `<img src="${midia.url}" alt="${projeto.titulo}">`;
                
                // Thumb (Imagem)
                liThumb.innerHTML = `<img src="${midia.url}" alt="${projeto.titulo}">`;
            }

            mainList.appendChild(liMain);
            thumbList.appendChild(liThumb);
        });

        // 4. INICIALIZAR O SPLIDE (Agora que o HTML existe)
        initSplide();

    } catch (err) {
        console.error('Erro ao carregar projeto:', err);
        alert('Erro ao carregar o projeto. Tente novamente.');
    } finally {
        if (loader) loader.classList.remove('active'); // Esconder loader
    }
});

// Função separada para iniciar o Splide (cópia da sua lógica original)
function initSplide() {
    var main = new Splide('#main-slider', {
        type: 'fade',
        pagination: false,
        arrows: true,
        autoHeight: true,
    });

    var thumbnails = new Splide('#thumbnail-slider', {
        rewind: true,
        arrows: false,
        fixedWidth: 130,
        fixedHeight: 78,
        isNavigation: true,
        gap: 10,
        focus: 'left',
        pagination: false,
        cover: true,
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
        breakpoints: {
            640: {
                fixedWidth: 110,
                fixedHeight: 58,
            },
            500: {
                fixedWidth: 100,
                fixedHeight: 48,
            }
        },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
}