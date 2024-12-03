async function enviaFormulario(event) {
    event.preventDefault();
    const dadosLivro = {
        "titulo": document.querySelectorAll('input')[0].value,
        "autor": document.querySelectorAll('input')[1].value,
        "editora": document.querySelectorAll('input')[2].value,
        "anoPublicacao": document.querySelectorAll('input')[3].value,
        "isbn": document.querySelectorAll('input')[4].value,
        "quantTotal": document.querySelectorAll('input')[5].value,
        "quantDisponivel": document.querySelectorAll('input')[6].value,
        "valorAquisicao": document.querySelectorAll('input')[7].value,
        "statusLivroEmprestado": document.querySelectorAll('input')[8].value
    }

    try {
        const url = "http://localhost:3332/novo/livro";
        const respostaServdidor = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dadosLivro)
        });

        if (!respostaServdidor.ok) {
            alert('algum erro no servidor');
        } else {
            alert('Livro cadastrado com sucesso!');
        }
    } catch (error) {
        alert(error);
    }
}