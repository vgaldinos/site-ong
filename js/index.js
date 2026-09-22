// 1. Função que retorna o HTML da Página Inicial
function renderInicio() {
    return `
        <section id="apresentacao">
            <h1>Transformando Vidas Através da Solidariedade</h1>
            <p>Nossa ONG atua ativamente no suporte a comunidades em situação de vulnerabilidade social. Desenvolvemos projetos focados em educação, capacitação profissional e segurança alimentar, buscando construir um futuro mais justo e com igualdade de oportunidades para todos.</p>
            <div class="imagem-institucional">
                <img src="imagens/atendimento-comunidade.jpg" alt="Voluntários da ONG sorrindo enquanto entregam materiais escolares e interagem com crianças em uma sala de aula comunitária iluminada.">
            </div>
        </section>

        <section id="contato-rapido">
            <h2>Estabeleça Contato Conosco</h2>
            <p>Quer fazer parte da nossa missão? Seja um voluntário, parceiro ou doador. Entre em contato conosco pelos canais abaixo:</p>
            <address class="dados-contato">
                <ul>
                    <li><strong>Endereço:</strong> Avenida das Mãos que Acolhem, 123 - Centro, Curitiba - PR</li>
                    <li><strong>E-mail:</strong> contato@ongmaosqueacolhem.org</li>
                    <li><strong>Telefone/WhatsApp:</strong> (41) 99999-0000</li>
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

    // Fecha o menu hambúrguer mobile automaticamente ao trocar de página
    const menuCheckbox = document.getElementById('menu-toggle');
    if (menuCheckbox) menuCheckbox.checked = false;

    // Remove parâmetros de busca da rota se houver (ex: ?sec=doacoes)
    const rotaLimpa = hash.split('?')[0];

    // Decide qual tela injetar no <main id="app">
    if (rotaLimpa === '#inicio') {
        container.innerHTML = renderInicio();
    } else if (rotaLimpa === '#projetos') {
        container.innerHTML = renderProjetos();
        
        // Lógica simples para rolar até a seção se o link veio do dropdown
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
}

// 3. Inicialização dos Eventos do Navegador
window.addEventListener('hashchange', roteador);
window.addEventListener('DOMContentLoaded', roteador);
