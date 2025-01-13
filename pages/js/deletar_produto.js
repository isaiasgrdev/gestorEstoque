async function deletar_produto(id, nome) {
  try {
    const confirmacao = confirm(`Tem certeza que deseja excluir o produto ${nome}?`)

    if (confirmacao == true) {
      const api = await fetch(`https://gestorestoque-server.onrender.com/produtos/${id}`, {
        method: 'DELETE',
      })

      // capturando a resposta da api
      const res = await api.json()

      if (res.ok != true) {
        alert(res.mensagem || "Falha ao excluir o produto")
      }

      return alert(res.mensagem || 'Produto excluido com sucesso!')
    }
  } catch (e) {
    console.log('Erro ao buscar produto. ', e)
    alert('Erro ao buscar produto')
  }
}

// atualizando a tabela assim que recarregar a pagina
atualizar_tabela()