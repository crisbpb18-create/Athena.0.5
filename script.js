function buscarUsuarios() {
 
    fetch("http://127.0.0.1:8000/usuarios")
 
        .then(response => response.json())
 
        .then(dados => {
 
            let lista =
                document.getElementById("listaUsuarios");
 
            lista.innerHTML = "";
 
 
            dados.forEach(usuario => {
 
                let item =
                    document.createElement("li");
 
                item.innerText =
                    usuario.id + " - " + usuario.nome;
 
                lista.appendChild(item);
 
            });
 
        });
 
}
 
 
 
function cadastrarUsuario() {
 
    let nome =
        document.getElementById("nome").value;
 
    let mensagem =
        document.getElementById("mensagem");
 
 
    if (nome === "") {
 
        mensagem.innerText =
            "Digite um nome.";
 
        return;
    }
 
 
    fetch("http://127.0.0.1:8000/usuarios", {
 
        method: "POST",
 
        headers: {
            "Content-Type": "application/json"
        },
 
        body: JSON.stringify({
            nome: nome
        })
 
    })
 
    .then(response => response.json())
 
    .then(usuario => {
 
        mensagem.innerText =
            "Usuário " +
            usuario.nome +
            " cadastrado com sucesso!";
 
        document.getElementById("nome").value = "";
 
        buscarUsuarios();
 
    });
 
}
 
 
 
function atualizarUsuario() {
 
    let id =
        document.getElementById("idAtualizar").value;
 
    let nome =
        document.getElementById("nomeAtualizar").value;
 
 
    if (id === "" || nome === "") {
 
        alert("Preencha o ID e o novo nome.");
 
        return;
    }
 
 
    fetch(
        "http://127.0.0.1:8000/usuarios/" + id,
        {
 
            method: "PUT",
 
            headers: {
                "Content-Type": "application/json"
            },
 
            body: JSON.stringify({
                nome: nome
            })
 
        }
    )
 
    .then(response => {
 
        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }
 
        return response.json();
 
    })
 
    .then(usuario => {
 
        alert(
            "Usuário atualizado para: " +
            usuario.nome
        );
 
        document.getElementById("idAtualizar").value = "";
 
        document.getElementById("nomeAtualizar").value = "";
 
        buscarUsuarios();
 
    })
 
    .catch(erro => {
 
        alert(erro.message);
 
    });
 
}
 
 
 
function excluirUsuario() {
 
    let id =
        document.getElementById("idExcluir").value;
 
 
    if (id === "") {
 
        alert("Digite o ID do usuário.");
 
        return;
    }
 
 
    fetch(
        "http://127.0.0.1:8000/usuarios/" + id,
        {
 
            method: "DELETE"
 
        }
    )
 
    .then(response => {
 
        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }
 
        return response.json();
 
    })
 
    .then(dados => {
 
        alert(dados.mensagem);
 
        document.getElementById("idExcluir").value = "";
 
        buscarUsuarios();
 
    })
 
    .catch(erro => {
 
        alert(erro.message);
 
    });
 
}