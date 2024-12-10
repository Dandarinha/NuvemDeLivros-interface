// Função assíncrona para enviar os dados do formulário ao servidor
async function enviarFormulario() {
    // Recupera os dados do formulário e os organiza em um objeto JSON
    const alunoDTO = {
        "nome": document.querySelectorAll("input")[0].value,            
        "ra": document.querySelectorAll("input")[1].value,              
        "dataNascimento": document.querySelectorAll("input")[2].value,  
        "endereco": document.querySelectorAll("input")[3].value,       
        "email": document.querySelectorAll("input")[4].value,         
        "telefone": document.querySelectorAll("input")[5].value        
    }

    try {
        // Envia uma requisição POST para o servidor com os dados do aluno
        const respostaServidor = await fetch("http://localhost:3332/novo/alunos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},  
            body: JSON.stringify(alunoDTO)        
        });
    
        // Verifica se a resposta do servidor não foi bem-sucedida
        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Entre em contato com o administrador do sistema.");
        }

        // Notifica o usuário em caso de sucesso
        alert("Aluno cadastrado com sucesso!");
    } catch (error) {
        // Trata erros de rede ou problemas no envio da requisição
        console.log(error);
        alert('Erro ao se comunicar com o servidor. ${error}');
    }
}

// Função assíncrona para recuperar a lista de alunos do servidor
async function recuperarListaAlunos() {
    try {
        // Faz uma requisição GET para obter a lista de alunos
        const respostaServidor = await fetch('http://localhost:3332/lista/alunos');

        // Verifica se a resposta não foi bem-sucedida
        if (!respostaServidor.ok) {
            throw new Error("Erro ao recuperar a lista de alunos.");
        }

        // Converte a resposta em JSON
        const listaDeAlunos = await respostaServidor.json();

        // Verifica se a resposta é um array válido e chama a função para criar a tabela
        if (Array.isArray(listaDeAlunos)) {
            criarTabelaAlunos(listaDeAlunos);
        } else {
            console.error("Resposta da API inválida:", listaDeAlunos);
        }
    } catch (error) {
        // Trata erros na recuperação da lista de alunos
        console.error("Erro ao recuperar a lista de alunos:", error.message);
    }
}

// Função assíncrona para criar a tabela de alunos na interface
async function criarTabelaAlunos(alunos) {
    try {
        // Seleciona o elemento <tbody> da tabela onde os dados serão inseridos
        const tBody = document.querySelector('tbody');

        // Remove as linhas antigas para evitar duplicação ao atualizar a tabela
        tBody.innerHTML = "";

        // Itera sobre cada aluno da lista recebida
        alunos.forEach(aluno => {
            const tr = document.createElement('tr'); // Cria uma nova linha na tabela

            // Cria e adiciona a célula para o ID do aluno
            const tdIdAluno = document.createElement('td');
            tdIdAluno.textContent = aluno.id;
            tr.appendChild(tdIdAluno);

            //Cria e adiciona a célula para o Ra do aluno
            const tdRaAluno = document.createElement('td');
            tdRaAluno.textContent = aluno.ra;
            tr.appendChild(tdRaAluno);

            // Cria e adiciona a célula para o nome do aluno
            const tdNomeAluno = document.createElement('td');
            tdNomeAluno.textContent = aluno.nome;
            tr.appendChild(tdNomeAluno);

            // Cria e adiciona a célula para o sobrenome do aluno
            const tdSobrenome = document.createElement('td');
            tdSobrenome.textContent = aluno.sobrenome;
            tr.appendChild(tdSobrenome);

            // Cria e adiciona a célula para o celular do aluno
            const tdCelularAluno = document.createElement('td');
            tdCelularAluno.textContent = aluno.celular;
            tr.appendChild(tdCelularAluno);

            //Cria e adiciona a célula para data de nascimento do aluno
            const tdDataNascimentoAluno = document.createElement('td');
            tdDataNascimentoAluno.textContent = aluno.dataNascimento;
            tr.appendChild(tdDataNascimentoAluno);


            // Cria a célula de ações (botões de editar e deletar)
            const tdAcoes = document.createElement('td');

            // Adiciona o botão de editar com um ícone
            const imgEditar = document.createElement('img');
            imgEditar.src = './assets/icons/pencil-square.svg';
            imgEditar.alt = 'Editar';
            imgEditar.classList.add('btn-editar');
            tdAcoes.appendChild(imgEditar);

            // Adiciona o botão de deletar com um ícone
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
        // Trata erros ao criar a tabela de alunos
        console.error("Erro ao criar a tabela de alunos:", error.message);
    }
}