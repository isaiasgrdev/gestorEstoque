// criando a função de atualizafr tabela
async function atualizar_tabela() {
  const tbody = document.querySelector('tbody')

  const api = await fetch('https://gestorestoque-server.onrender.com/produtos/', {
    method: "GET",
    body: JSON.stringify()
  })

  // convertendo a resposta da api em tipo json
  const res = await api.json()

  console.log(res)

  if (res.ok == false) {
    console.log('Erro ao atualizar tabela')
    return alert('Erro ao atualizar tabela')
  }

  // guardando a resposta dos produtos em uma variavel
  const produtos = await res.produtos
  console.log(produtos)

  tbody.innerHTML = '' //limpando a tabela antes de atualizar

  produtos.forEach(produto => {
    console.log(produto)

    let tr = tbody.insertRow()

    //criando os elementos td
    let td_nome = tr.insertCell()
    let td_marca = tr.insertCell()
    let td_tipoProduto = tr.insertCell()
    let td_qtdEstoque = tr.insertCell()
    let td_preco = tr.insertCell()
    let td_acoes = tr.insertCell()

    //passando os valores para os tds
    td_nome.innerText = produto.nome_produto
    td_marca.innerText = produto.marca
    td_tipoProduto.innerText = produto.tipo_produto
    td_preco.innerText = produto.preco
    td_qtdEstoque.innerText = produto.qtd_estoque

    //verificando se o conteudo da marca esta vazio
    if (td_marca.innerText === '') {
      td_marca.innerText = 'Não informado.'
    }

    //adicionado as imagens a coluna de "ações"
    td_acoes.innerHTML = `
        <i class="fa-solid fa-table"></i>
        <i class="fa-solid fa-pen-to-square" style="color: #FFD43B;"></i>
        <i class="fa-solid fa-trash" style="color: #ea3a1b;" onclick="deletar_produto('${produto.id, produto.nome_produto}')"></i>
      `;

  });

}

export { atualizar_tabela }

// atualizando a tabela assim que recarregar a pagina
window.onload = atualizar_tabela