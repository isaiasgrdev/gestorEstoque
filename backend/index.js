const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')


const app = express();

app.use(bodyParser.json());
app.use(cors())



//gestor@fsclothing
const produtosSchema = new mongoose.Schema({
  nome: String,
  marca: String,
  tipoProduto: Boolean,
  qtdEstoque: Number,
  preco: Number,
}
)

const enviarDados = mongoose.model('produtos', produtosSchema)

mongoose.connect('mongodb+srv://gestordeestoque:gestor123@cluster0.dzz7v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("Servidor rodando na porta 3000"))
  .catch(() => console.error("Erro ao conectar ao banco de dados", err));

app.post("/api/produtos", async (req, res) => {
  // return res.json({
  //   ok: true
  // })

  try {
    const dados = new enviarDados(req.body);
    await dados.save();
    res.status(201).json(dados);
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar dados", error });
  }
});

app.listen(3000)