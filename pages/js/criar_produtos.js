async function criar_produtos() {
  // Capturando os inputs do formulário
  const nome = document.querySelector('form input[name="nome"]').value;
  const marca = document.querySelector('form input[name="marca"]').value;
  const tipoProduto = document.querySelector('form select[name="tipoProduto"]').value;
  const preco = document.querySelector('form input[name="price"]').value;
  const qtdEstoque = document.querySelector('form input[name="stockQuantity"]').value;
  const msg = document.querySelector('.msg');

  // Validando os dados do formulário
  if (!nome || !marca || !tipoProduto || !preco || !qtdEstoque) {
    return msg.innerText = 'Preencha todos os campos';
  }

  if (isNaN(preco) || isNaN(qtdEstoque)) {
    return msg.innerText = 'Preço e quantidade em estoque devem ser números válidos';
  }

  try {

    // Criando a API responsável por mandar as requisições ao banco de dados
    const api = await fetch('https://gestorestoque-server.onrender.com/produtos/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        marca: marca,
        tipo_produto: tipoProduto,
        qtd_estoque: qtdEstoque, // Convertendo para número
        preco: preco // Convertendo para número     
      })
    });

    // Convertendo o resultado da API para o tipo JSON
    const res = await api.json()

    // Verificando se ocorreu algum erro na chamada da API
    if (res.ok == false) {
      return msg.innerText = res.mensagem || 'Erro ao criar produto';
    }

    // Mensagem de sucesso
    msg.innerText = res.mensagem;

    // atualizando a tabela
    atualizar_tabela()

  } catch (error) {
    console.error(error);
    msg.innerText = 'Erro ao criar o produto.';
  }
}

export { criar_produtos }