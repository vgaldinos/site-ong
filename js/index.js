function renderInicio() {
    return `
        <section id="apresentacao" aria-labelledby="titulo-apresentacao">
            <h1 id="titulo-apresentacao">Transformando Vidas Através da Solidariedade</h1>
            <p>Nossa ONG atua ativamente no suporte a comunidades em situação de vulnerabilidade social. Desenvolvemos projetos focados em educação, capacitação profissional e segurança alimentar, buscando construir um futuro mais justo e com igualdade de oportunidades para todos.</p>
            <div class="imagem-institucional">
                <img src="imagens/atendimento-comunidade.jpg" alt="Voluntários da ONG sorrindo enquanto entregam materiais escolares e interagem com crianças em uma sala de aula comunitária iluminada.">
            </div>
        </section>

        <section id="contato-rapido" aria-labelledby="titulo-contato">
            <h2 id="titulo-contato">Estabeleça Contato Conosco</h2>
            <p>Quer fazer parte da nossa missão? Seja um voluntário, parceiro ou doador. Entre em contato conosco pelos canais abaixo:</p>
            <address class="dados-contato">
                <ul>
                    <li><strong>Endereço:</strong> Avenida das Mãos que Acolhem, 123 - Centro, Curitiba - PR</li>
                    <li><strong>E-mail:</strong> <a href="mailto:contato@ongmaosqueacolhem.org">contato@ongmaosqueacolhem.org</a></li>
                    <li><strong>Telefone/WhatsApp:</strong> <a href="https://wa.me" target="_blank" rel="noopener noreferrer">(41) 99999-0000</a></li>
                    <li><strong>Horário de Atendimento:</strong> Segunda a Sexta, das 09h às 18h</li>
                </ul>
            </address>
        </section>
    `;
}

// 2. Sistema de Rotas da SPA (Gerenciador do DOM)
function roteador() {
    const container = document.getElementById('app');
    const hash = window.location.hash || '#inicio';

    // Fecha o menu hambúrguer acessível automaticamente ao trocar de página
    const menuButton = document.getElementById('menu-button');
    const navPrincipal = document.getElementById('nav-principal');
    
    if (menuButton && navPrincipal) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu de navegação');
        navPrincipal.classList.remove('menu-aberto'); // Classe para esconder o menu no CSS mobile
    }

    // Remove parâmetros de busca da rota se houver (ex: ?sec=doacoes)
    const rotaLimpa = hash.split('?')[0];

    // Decide qual tela injetar no <main id="app">
    if (rotaLimpa === '#inicio') {
        container.innerHTML = renderInicio();
    } else if (rotaLimpa === '#projetos') {
        container.innerHTML = renderProjetos();
        
        // Lógica para rolar até a seção se o link veio do dropdown
        if (hash.includes('?sec=')) {
            const secaoId = hash.split('=')[1];
            const mapeamento = { 'doacoes': 'doacoes', 'voluntariado': 'voluntariado', 'materiais': 'doacoesmateriais' };
            setTimeout(() => {
                const elemento = document.getElementById(mapeamento[secaoId]);
                if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else if (rotaLimpa === '#cadastro') {
        container.innerHTML = renderCadastro();
        // Inicializa as escutas de eventos e validações da página de cadastro
        if (typeof window.inicializarCadastro === 'function') {
            window.inicializarCadastro();
        }
    } else {
        container.innerHTML = `<h1>Página não encontrada</h1><p><a href="#inicio">Voltar ao início</a></p>`;
    }

    // [ACESSIBILIDADE SPA]: Move o foco do teclado para o container principal após carregar a rota
    // Isso avisa os leitores de tela que o conteúdo mudou e inicia a leitura do novo conteúdo
    if (container) {
        container.focus();
    }
}

// Lógica para escutar o clique no botão do menu hambúrguer no mobile
function inicializarMenuAcessivel() {
    const menuButton = document.getElementById('menu-button');
    const navPrincipal = document.getElementById('nav-principal');

    if (menuButton && navPrincipal) {
        menuButton.addEventListener('click', () => {
            const estaAberto = menuButton.getAttribute('aria-expanded') === 'true';
            
            // Inverte o estado ARIA
            menuButton.setAttribute('aria-expanded', !estaAberto);
            menuButton.setAttribute('aria-label', estaAberto ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
            
            // Alterna a classe que exibe o menu no CSS
            navPrincipal.classList.toggle('menu-aberto');
        });
    }
}

// 3. Inicialização dos Eventos do Navegador
window.addEventListener('hashchange', roteador);
window.addEventListener('DOMContentLoaded', () => {
    roteador();
    inicializarMenuAcessivel(); // Garante o funcionamento do botão do menu hambúrguer
});
