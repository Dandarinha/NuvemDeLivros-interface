async function enviaFormulario(event) {
    event.preventDefault();
    const dadosAluno = {
        "nome": document.querySelectorAll('input')[0].value,
        "sobrenome": document.querySelectorAll('input')[1].value,
        "dataNascimento": document.querySelectorAll('input')[2].value,
        "endereco": document.querySelectorAll('input')[3].value,
        "email": document.querySelectorAll('input')[4].value,
        "celular": document.querySelectorAll('input')[5].value,
    }

    try {
        const url = "http://localhost:3332/novo/aluno";
        const respostaServdidor = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dadosAluno)
        });

        console.log(!respostaServdidor.ok);

        if(!respostaServdidor.ok) {
            alert('algum erro no servidor');
        }

        alert('aluno cadastrado com sucesso!');
    } catch (error) {
        alert(error);
    }

    async function recuperaListaAluno() {
        try {
            //faz a requisição no servidor e armazena a resposta
            const respostaServdidor = await fetch('http://localhost:3332/lista/Alunos');

            //verifica se a resposta foi bem sucedida (true)
            if(respostaServdidor.ok) {
                //armazenar a lista de alunos
                const listadeAluno = await respostaServdidor.json();
                //chama a função de criar tabela passando a lista como parâmetro
                criarTabelaAluno(listadeAluno);
            }

            return null;
        }catch (error) {
            console.error(error);
            return null;
        }
    }

    function criarTabelaAluno(Alunos) {
        try {
            //recuperar um elemento tbody
            const tbody = document.querySelector('tbody');

            //percorro o array de alunos
            Alunos.map(aluno => {
                //criar a estrutura da tabela 
                //cria o tr (table row)
                const tr = document.createElement('tr');

               // cria os td (table data) para popular a tabela
            const tdIdAluno = document.createElement('td');
            // insere o id do aluno no tdIdAluno
            tdIdAluno.textContent = aluno.id;
            // inserindo tdIdCliente na estrutura do tr
            tr.appendChild(tdIdAluno);

            // cria o td para o nome do alunos
            const tdNomeAluno = document.createElement('td');
            // insere o nome do aluno
            tdNomeAluno.textContent = aluno.nome;
            // insiro tdNomeAluno como filho de tr
            tr.appendChild(tdNomeAluno);

            // cria o td para o CPF do aluno
            const tdCpfAluno = document.createElement('td');
            // insere o cpf do aluno
            tdCpfAluno.textContent = aluno.cpf;
            // insere tdCpfAluno como filho de tr
            tr.appendChild(tdCpfAluno);

            // cria o td para o email do Aluno
            const tdCelular = document.createElement('td');
            // insere o email do Aluno
            tdCelular.textContent = aluno.celular;
            // insere tdEmail como filho de tr
            tr.appendChild(tdCelular);

            // cria o td para as ações
            const tdAcoes = document.createElement('td');
            // cria a imagem de editar
            const imgEditar = document.createElement('img');
            // insere o caminho da imagem
            imgEditar.src = './assets/img/lapis.png';
            // insere o texto alternativo
            imgEditar.alt = 'Editar';
            // insere a imagem como filho de tdAcoes
            tdAcoes.appendChild(imgEditar);

            // cria a imagem de deletar
            const imgDeletar = document.createElement('img');
            // insere o caminho da imagem
            imgDeletar.src = './assets/icons/trash-fill.svg';
            // insere o texto alternativo
            imgDeletar.alt = 'Deletar';
            // insere a imagem como filho de tdAcoes
            tdAcoes.appendChild(imgDeletar);

            // insere tdAcoes como filho de tr
            tr.appendChild(tdAcoes);

            // insere tr como filho de tBody
            tBody.appendChild(tr);
        });
        }catch (error) {
            //em caso de erro, imprime no console
            console.error(error);
            //retorna um valor nulo
            return null;
        }
    }
}
