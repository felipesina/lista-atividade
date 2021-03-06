lista = [];
function buscarListaProduto() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "js/produtos.json");
    ajax.send();
    ajax.onload = function () {
        lista = JSON.parse(this.response);
        replicar();
    }
}

function replicar() {
    let i = 0;
    for (const p of lista) {
        let id = i;
        let produto = document.querySelector(".produto").cloneNode(true);
        produto.querySelector(".ovos_titulo").innerHTML = p.ovos_titulo.toUpperCase();
        produto.querySelector("img").src = `img/${p.img}`;
        produto.querySelector(".valor").innerHTML = `R$ ${p.valor}`;
        produto.querySelector(".quantidade").innerHTML = p.quantidade;
        produto.querySelector(".ovos_resume").innerHTML = p.ovos_resume;

        produto.querySelector(".menos").addEventListener("click", function () { alterarQt(id, -1) });
        produto.querySelector(".mais").addEventListener("click", function () { alterarQt(id, 1) });

        document.querySelector(".lista").append(produto);
        i++;
    }
    document.querySelector(".produto").remove();
}

function alterarQt(id, quantidade) {
    let p = lista[id];
    p.quantidade += quantidade;
    if (p.quantidade < 0) p.quantidade = 0;
    document.getElementsByClassName("quantidade")[id].innerHTML = p.quantidade;
}
let msgModal = "";
function mostrarPedido() {
    msgModal = "";
    let subTotal = 0;
    let total = 0;
    for (const produto of lista) {
        if (produto.quantidade > 0) {
            subTotal = (produto.valor * produto.quantidade).toFixed(2);
            total += +subTotal;
            msgModal += `<p>${produto.ovos_titulo.toUpperCase()} (R$ ${produto.valor} x ${produto.quantidade}) = ${subTotal}</p>`;
        }
    }
    if (msgModal == "") {
        msgModal = "<p>Nenhum produto selecionado.</p>";
        document.querySelector("#btEnviar").disabled = "disabled";
    } else {
        msgModal += `<b>Total ${total.toFixed(2)}</b>`
        document.querySelector("#btEnviar").disabled = "";
    }
    document.querySelector(".modal-body").innerHTML = msgModal;
}

function enviar() {
    let fone = '';
    msgModal = msgModal.replaceAll("<p>", "").replaceAll("</p>", "\n");
    msgModal = msgModal.replaceAll("<b>", "*").replaceAll("</b>", "*");
    let nome = document.querySelector("#nome").value;
    let endereco = document.querySelector("#endereco").value;
    msgModal += `\nNome: *${nome}*`;
    msgModal += `\nEnder??o: *${endereco}*`;
    msgModal = encodeURI(msgModal);

    link = `https://api.whatsapp.com/send?phone=${fone}&text=${msgModal}`;
    window.open(link, '_blanck')
}

buscarListaProduto();