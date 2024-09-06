
//FUNCIONALIDADES DE ABRIR E FECHAR MENU
const barrasMenu = document.querySelector('.bars')
barrasMenu.addEventListener('click', () => {
  const menu = document.querySelector('#nav')
  menu.classList.add('activeMenu')
})
const fecharMenu = document.querySelector('.fecharMenu')
fecharMenu.addEventListener('click', () => {
  const menu = document.querySelector('#nav')
  menu.classList.remove('activeMenu')
})

//FUNCIONALIDADES DE ABRIR E FECHAR ABA DE CADASTRO DE PRODUTOS
const form = document.querySelector(".formularioProdutos form");
const btnCadastrar = document.querySelector(".btnCadastrar");
btnCadastrar.addEventListener("click", () => {
  form.classList.add("activeRegister");
});
const closeFormBtn = document.querySelector(".closeFormBtn");
closeFormBtn.addEventListener("click", () => {
  form.classList.remove("activeRegister");
});

//FUNCIONALIDADES DO FORMULARIO
//mostrar cor do produto
let productColor = document.getElementById("productColor");
productColor.addEventListener("change", () => {
  let colorSelected = document.querySelector(".colorSelected");
  colorSelected.style.backgroundColor = productColor.value;
  colorSelected.style.border = "solid black 2px";
});

let produtosArray = [];

function lerDados() {
  let produtos = {};
  produtos.nome = document.querySelector('form input[name="nome"]').value;
  produtos.marca = document.querySelector('form input[name="marca"]').value;
  produtos.tipoProduto = document.querySelector(
    'form select[name="tipoProduto"]'
  ).value;

  produtos.preco = document.querySelector('form input[name="price"]').value;
  produtos.qtdEstoque = document.querySelector(
    'form input[name="stockQuantity"]'
  ).value;
  console.log(produtos);

  return produtos;
}

const addProducBtn = document.getElementById("addProductBtn");
addProducBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let produtos = lerDados();
  if (validarDados(produtos)) {
    enviarDados(produtos)
    adicionar(produtos);
  }
  criarTabela(produtos);
  console.log(produtosArray);
});

function validarDados(produtos) {
  let p = document.querySelector(".formularioProdutos form p");
  p.innerText = "";
  if (produtos.nome === "") {
    p.style.display = "flex";
    p.innerText = "Preencha o nome do produto.";
  }
  if (produtos.tipoProduto === "") {
    p.style.display = "flex";
    p.innerText = "Preencha o tipo do produto.";
  }
  if (produtos.qtdEstoque === "") {
    p.style.display = "flex";
    p.innerText = "Preencha a quantidade em estoque.";
  }
  if (produtos.preco === "") {
    p.style.display = "flex";
    p.innerText = "Preencha o preço do produto.";
  }
  if (p.innerText != "") {
    return false;
  }
  return true;
}

function adicionar(produtos) {
  produtosArray.push(produtos);
}

async function enviarDados(produtos) {
  try {
    const res = await fetch('http://localhost:3000/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'

      },
      body: JSON.stringify({
        nome: produtos.nome,
        marca: produtos.marca,
        tipoProduto: produtos.tipoProduto,
        qtdEstoque: produtos.qtdEstoque,
        preco: produtos.preco,
      }

      ),
    });
    if (res.ok) {
      const dadosSalvos = await res.json();
      console.log('dados salvos com sucesso', dadosSalvos);
    } else {
      console.error('erro ao salvar dados:', res.statusText);
    }
  } catch (error) {
    console.error('erro na requisicao', error);
  }
}

function criarTabela() {
  let tbody = document.querySelector("tbody");
  tbody.innerText = "";
  for (let i = 0; i < produtosArray.length; i++) {
    let tr = tbody.insertRow();

    let td_nome = tr.insertCell();
    let td_marca = tr.insertCell();
    let td_preco = tr.insertCell();
    let td_qtdEstoque = tr.insertCell();
    let td_tipoProduto = tr.insertCell();
    let td_acoes = tr.insertCell();

    td_nome.innerText = produtosArray[i].nome;
    let nome = produtosArray[i].nome;
    td_marca.innerText = produtosArray[i].marca;
    if (produtosArray[i].marca === "") {
      td_marca.innerText = "Não informado";
    }
    td_preco.innerText = produtosArray[i].preco;
    td_qtdEstoque.innerText = produtosArray[i].qtdEstoque;
    td_tipoProduto.innerText = produtosArray[i].tipoProduto;

    let imgEditar = document.createElement("img");
    let imgDeletar = document.createElement("img");
    imgEditar.src = "image/edit.svg";
    imgDeletar.src = "image/delete.svg";
    imgEditar.classList.add("editarBtn");
    imgDeletar.classList.add("deletarBtn");
    td_acoes.append(imgEditar, imgDeletar);

    //função deletar produto
    imgDeletar.addEventListener("click", () => {
      if (confirm("Deseja excluir o produto" + produtosArray[i].nome + "?")) {
        for (let i = 0; i < produtosArray.length; i++) {
          if (produtosArray[i].nome == nome) {
            produtosArray.splice(i, 1);
            tbody.deleteRow(i);
          }
        }
      }
    });

    let text = "R$";
    td_preco.insertAdjacentText("afterbegin", text);

    form.classList.remove("activeRegister");
  }
}
