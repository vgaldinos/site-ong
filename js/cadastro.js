function renderCadastro() {
    return `
        <h1>Ficha de Registro de Novo Apoiador</h1>
        <p>Preencha os campos abaixo para formalizar o seu vínculo com a nossa organização.</p>

        <form action="#" id="form-cadastro">
            <fieldset>
                <legend>Dados Pessoais</legend>
                <div class="campo-validacao">
                    <label for="nome">Nome Completo:</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required>
                    <span class="mensagem-erro">Por favor, preencha este campo.</span>
                </div>                
                <div class="campo-validacao">
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" name="email" placeholder="exemplo@email.com" required>
                    <span class="mensagem-erro">Insira um endereço de e-mail válido.</span>
                </div>                
                <div class="campo-validacao">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" placeholder="00000-0000" required pattern="(?:\\(?\\d{2}\\)?\\s?)?\\d{4,5}-?\\d{4}">
                    <span class="mensagem-erro">Respeite o formato de telefone válido! (Use: 00 0000-0000).</span>
                </div>
                <div class="campo-validacao">
                    <label for="nascimento">Data de Nascimento:</label>
                    <input type="date" id="nascimento" name="nascimento" required>
                    <span class="mensagem-erro">Por favor, preencha este campo.</span>
                </div>
                <div class="campo-validacao">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}">
                    <span class="mensagem-erro">Respeite o formato de CPF válido! (Use: 000.000.000-00).</span>
                </div>				
            </fieldset>

            <fieldset>
                <legend>Endereço Residencial</legend>
                <div class="campo-validacao">
                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" placeholder="00000-000" required pattern="\\d{5}-\\d{3}">
                    <span class="mensagem-erro">Respeite o formato de CEP válido! (Use: 00000-000).</span>
                </div>
                <div class="campo-validacao">
                    <label for="num_compl">Número e Complemento:</label>
                    <input type="text" id="num_compl" name="num_compl" placeholder="000 ap.00 bl0" required>
                    <span class="mensagem-erro">Por favor, preencha este campo.</span>
                </div>
            </fieldset>

            <fieldset>
                <legend>Perfil de Interesse</legend>
                <p>Como você deseja colaborar com a ONG Mãos que Acolhem?</p>
                <p>
                    <input type="radio" id="opcao_voluntario" name="interesse" value="voluntariado" required>
                    <label for="opcao_voluntario">Desejo fazer Trabalho Voluntário</label>
                </p>
                <p>
                    <input type="radio" id="opcao_doador" name="interesse" value="financeiro">
                    <label for="opcao_doador">Desejo fazer Contribuição Financeira</label>
                </p>
                <p>
                    <input type="radio" id="opcao_material" name="interesse" value="material">
                    <label for="opcao_material">Desejo fazer Contribuição Material</label>
                </p>
            </fieldset>
            <p>
                <button type="submit" class="btn-enviar-form">Enviar Registro</button>
            </p>
        </form>

        <!-- Estrutura do Modal de Contingência Acessível (Caso o SweetAlert falhe) -->
        <div id="modal-sucesso" class="modal-overlay" aria-hidden="true" role="dialog" aria-labelledby="modal-titulo">
            <div class="modal-feedback-sucesso">
                <button type="button" id="btn-fechar" class="btn-fechar-modal" aria-label="Fechar janela de confirmação">&times;</button>
                <div class="wrapper-logo-interativo">
                    <img src="imagens/logo.png" alt="Logotipo oficial da ONG Mãos que Acolhem" class="logo-sucesso">
                </div>
                <h2 id="modal-titulo">Cadastro Enviado!</h2>
                <p>Seus dados foram salvos com integridade via SPA.</p>
                <div class="container-badges">
                    <span class="badge badge-apoio">Apoiador Ativo</span>
                    <span class="badge badge-status">Aguardando Triagem</span>
                </div>
                <div class="alerta-informativo">
                    <strong>Informação:</strong> 
                    <p>Enviamos as instruções para o seu e-mail.</p>
                </div>
                <a href="#inicio" class="btn-voltar-inicio">Voltar para o Início</a>
            </div>
        </div>
    `;
}

window.inicializarCadastro = function() {
    const formulario = document.getElementById('form-cadastro');
    if (!formulario) return;

    const campos = formulario.querySelectorAll('input[required]');
    
    // Recuperação de dados do localStorage (Fluxo Inverso)
    const dadosSalvosString = localStorage.getItem('cadastroApoiador');
    if (dadosSalvosString) {
        try {
            const dadosDoApoiador = JSON.parse(dadosSalvosString);
            if (dadosDoApoiador.nome) document.getElementById('nome').value = dadosDoApoiador.nome;
            if (dadosDoApoiador.email) document.getElementById('email').value = dadosDoApoiador.email;
            if (dadosDoApoiador.telefone) document.getElementById('telefone').value = dadosDoApoiador.telefone;
            if (dadosDoApoiador.nascimento) document.getElementById('nascimento').value = dadosDoApoiador.nascimento;
            if (dadosDoApoiador.cpf) document.getElementById('cpf').value = dadosDoApoiador.cpf;
            if (dadosDoApoiador.cep) document.getElementById('cep').value = dadosDoApoiador.cep;
            if (dadosDoApoiador.num_compl) document.getElementById('num_compl').value = dadosDoApoiador.num_compl;
            
            if (dadosDoApoiador.interesse) {
                const radioInteresse = formulario.querySelector(`input[name="interesse"][value="${dadosDoApoiador.interesse}"]`);
                if (radioInteresse) radioInteresse.checked = true;
            }
        } catch (erro) {
            console.error("Erro ao ler localStorage:", erro);
        }
    }

    // Garante a consistência visual estável de fundos e bordas no JS dinâmico
    function validarCampo(input) {
        const mensagemErro = input.parentElement.querySelector('.mensagem-erro');
        if (!input.checkValidity()) {
            input.classList.add('input-erro');
            input.classList.remove('input-sucesso');
            if (mensagemErro) mensagemErro.style.display = 'block';
            return false;
        } else {
            input.classList.add('input-sucesso');
            input.classList.remove('input-erro');
            if (mensagemErro) mensagemErro.style.display = 'none';
            return true;
        }
    }

    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            validarCampo(campo);
        });
        
        // Remove os estilos de feedback visual dinâmico se o usuário limpar o campo
        campo.addEventListener('input', function() {
            if (campo.value === '') {
                campo.classList.remove('input-erro', 'input-sucesso');
            }
        });
    });

    function abrirModalComprovanteFallback() {
        const modal = document.getElementById('modal-sucesso');
        if (modal) {
            modal.classList.add('modal-ativo');
            modal.setAttribute('aria-hidden', 'false');
            const btnFechar = document.getElementById('btn-fechar');
            if (btnFechar) btnFechar.focus();
        }
    }

    const btnFechar = document.getElementById('btn-fechar');
    const modal = document.getElementById('modal-sucesso');
    if (btnFechar && modal) {
        btnFechar.addEventListener('click', () => {
            modal.classList.remove('modal-ativo');
            modal.setAttribute('aria-hidden', 'true');
            formulario.focus();
        });
    }

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); 
        
        let formularioValido = true;
        campos.forEach(campo => {
            if (!validarCampo(campo)) formularioValido = false;
        });

        if (formularioValido) {
            const agendaInteresse = formulario.querySelector('input[name="interesse"]:checked')?.value || '';

            const dadosDoFormulario = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                nascimento: document.getElementById('nascimento').value,
                cpf: document.getElementById('cpf').value,
                cep: document.getElementById('cep').value,
                num_compl: document.getElementById('num_compl').value,
                interesse: agendaInteresse
            };

            localStorage.setItem('cadastroApoiador', JSON.stringify(dadosDoFormulario));

            // ==========================================================
            // SWEETALERT2 COM IDENTIDADE VISUAL E LAYOUT INTEGRADO
            // ==========================================================
            if (typeof Swal === 'function') {
                Swal.fire({
                    imageUrl: 'imagens/logo.png',
                    imageWidth: 250,
                    imageAlt: 'Logotipo oficial da ONG Mãos que Acolhem',
                    title: 'Cadastro Enviado!',
                    html: `
                        <p style="color: var(--color-neutral-dark); font-size: var(--font-size-body); margin-bottom: 30px;">
                            Seus dados passaram pela validação inicial e foram salvos.
                        </p>
                        <div class="container-badges" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px;">
                            <span class="badge badge-apoio">Apoiador Ativo</span>
                            <span class="badge badge-status">Aguardando Triagem</span>
                        </div>
                        <div class="alerta-informativo" style="text-align: left; margin: 15px auto; max-width: 100%;">
                            <strong>Informação:</strong> 
                            <p>Enviamos as instruções detalhadas diretamente para o seu e-mail cadastrado.</p>
                        </div>
                    `,
                    confirmButtonColor: '#1a4473',
                    confirmButtonText: 'Voltar para o Início',
                    customClass: {
                        popup: 'modal-feedback-sucesso-swal'
                    }
                }).then(() => {
                    // Redireciona de forma limpa para o início da SPA após fechar o modal
                    window.location.hash = '#inicio';
                });
            } else {
                abrirModalComprovanteFallback();
            }
        }
    });
};
