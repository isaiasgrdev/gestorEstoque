//FUNCIONALIDADES DE ABRIR E FECHAR MENU
const barrasMenu = document.querySelector('.bars')
barrasMenu.addEventListener('click',()=>{
  const menu = document.querySelector('#nav')
  menu.classList.add('activeMenu')
})
const fecharMenu = document.querySelector('.fecharMenu')
fecharMenu.addEventListener('click', ()=>{
  const menu = document.querySelector('#nav')
  menu.classList.remove('activeMenu')
})
