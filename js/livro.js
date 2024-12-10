// Função assíncrona para enviar os dados do formulário de livros ao servidor
async function enviaFormulario() {
    // Recupera os dados do formulário e organiza em um objeto JSON
    const livroDTO = {
        "titulo": document.querySelectorAll("input")[0].value,               
        "autor": document.querySelectorAll("input")[1].value,              
        "editora": document.querySelectorAll("input")[2].value,            
        "anoPublicacao": document.querySelectorAll("input")[3].value,       
        "isbn": document.querySelectorAll("input")[4].value,                 
        "quantTotal": document.querySelectorAll("input")[5].value,           
        "quantDisponivel": document.querySelectorAll("input")[6].value,      
        "valorAquisicao": document.querySelectorAll("input")[7].value,      
        "statusLivroEmprestado": document.querySelectorAll("input")[8].value 
    }

    try {
        // Envia uma requisição POST para o servidor com os dados do livro
        const respostaServidor = await fetch("http://localhost:3332/novo/livro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(livroDTO)      
        });
    
        // Verifica se a resposta do servidor não foi bem-sucedida
        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Entre em contato com o administrador do sistema.");
        }
    
        // Notifica o usuário em caso de sucesso
        alert("Livro cadastrado com sucesso!");
    } catch (error) {
        // Trata erros de rede ou problemas no envio da requisição
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

    // Função assíncrona para recuperar a lista de livros do servidor
    async function recuperarListaLivros() {
        try {
            // Faz uma requisição GET para obter a lista de livros
            const respostaServidor = await fetch('http://localhost:3332/lista/livros');
    
            // Verifica se a resposta não foi bem-sucedida
            if (!respostaServidor.ok) {
                throw new Error("Erro ao recuperar a lista de livros.");
            }
    
            // Converte a resposta em JSON
            const listaDeLivros = await respostaServidor.json();
    
            // Valida se a resposta é um array e chama a função para criar a tabela
            if (Array.isArray(listaDeLivros)) {
                criarTabelaLivros(listaDeLivros);
            } else {
                console.error("Resposta da API inválida:", listaDeLivros);
            }
        } catch (error) {
            // Trata erros na recuperação da lista de livros
            console.error("Erro ao recuperar a lista de livros:", error.message);
        }
    }

    // Função assíncrona para criar a tabela de livros na interface
    async function criarTabelaLivros(livros) {
        try {
            // Seleciona o elemento <tbody> da tabela onde os dados serão inseridos
            const tBody = document.querySelector('tbody');
    
            // Remove as linhas antigas para evitar duplicação ao atualizar a tabela
            tBody.innerHTML = "";
    
            // Itera sobre cada livro da lista recebida
            livros.forEach(livro => {
                const tr = document.createElement('tr'); // Cria uma nova linha na tabela

                // Cria e adiciona a célula para o ID do livro
                const tdId = document.createElement('td');
                tdId.textContent = livro.id;
                tr.appendChild(tdId);

                // Cria e adiciona a célula para o título do livro
                const tdTitulo = document.createElement('td');
                tdTitulo.textContent = livro.titulo;
                tr.appendChild(tdTitulo);

                // Cria e adiciona a célula para o autor do livro
                const tdAutor = document.createElement('td');
                tdAutor.textContent = livro.autor;
                tr.appendChild(tdAutor);

                // Cria e adiciona a célula para a editora do livro
                const tdEditora = document.createElement('td');
                tdEditora.textContent = livro.editora;
                tr.appendChild(tdEditora);

                // Cria e adiciona a célula para o ano de publicação do livro
                const tdAnoPublicacao = document.createElement('td');
                tdAnoPublicacao.textContent = livro.anoPublicacao;
                tr.appendChild(tdAnoPublicacao);

                // Cria e adiciona a célula para o ISBN do livro
                const tdIsbn = document.createElement('td');
                tdIsbn.textContent = livro.isbn;
                tr.appendChild(tdIsbn);

                // Cria e adiciona a célula para a quantidade disponível do livro
                const tdDisponiveis = document.createElement('td');
                tdDisponiveis.textContent = livro.quantDisponivel;
                tr.appendChild(tdDisponiveis);

                // Cria a célula de ações (botões de editar e deletar)
                const tdAcoes = document.createElement('td');

                // Adiciona o botão de editar com ícone
                const imgEditar = document.createElement('img');
                imgEditar.src = './assets/icons/pencil-square.svg';
                imgEditar.alt = 'Editar';
                imgEditar.classList.add('btn-editar');
                tdAcoes.appendChild(imgEditar);

                // Adiciona o botão de deletar com ícone
                const imgDeletar = document.createElement('img');
                imgDeletar.src = './assets/icons/trash-fill.svg';
                imgDeletar.alt = 'Deletar';
                imgDeletar.classList.add('btn-deletar');
                tdAcoes.appendChild(imgDeletar);

                // Adiciona a célula de ações na linha
                tr.appendChild(tdAcoes);

                // Adiciona a linha completa na tabela
                tBody.appendChild(tr);
            });
        } catch (error) {
            // Trata erros ao criar a tabela de livros
            console.error("Erro ao criar a tabela de livros:", error.message);
        }
    }