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

//array para manipular o formulário
