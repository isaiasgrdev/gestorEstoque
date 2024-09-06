const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')


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
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch(err => console.error("Erro ao conectar ao banco de dados", err));


const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post("/produtos", async (req, res) => {
  try {
    const dados = new enviarDados(req.body);
    await dados.save();
    res.status(201).json(dados);
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar dados", error });
  }
});
