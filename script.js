const form = document.getElementById('form');
const listaDiv = document.getElementById('lista');
let agendamentos = JSON.parse(localStorage.getItem('barbearia')) || [];

function mostrarLista() {
  listaDiv.innerHTML = agendamentos.length === 0 ? '<p>Nenhum agendamento ainda</p>' : '';
  agendamentos.forEach((a, i) => {
    listaDiv.innerHTML += `
      <div style="background:white;padding:10px;border-radius:5px;margin-bottom:5px;display:flex;justify-content:space-between">
        <span>✂️ <b>${a.nome}</b> - ${a.data.split('-').reverse().join('/')} às ${a.hora} com ${a.barbeiro}</span>
        <button onclick="excluir(${i})" style="background:red;color:white;border:none;padding:5px 10px;border-radius:3px;cursor:pointer">X</button>
      </div>`;
  });
}

function excluir(index) {
  agendamentos.splice(index, 1);
  localStorage.setItem('barbearia', JSON.stringify(agendamentos));
  mostrarLista();
}

mostrarLista();

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const novo = {
    nome: document.getElementById('nome').value,
    data: document.getElementById('data').value,
    hora: document.getElementById('hora').value,
    barbeiro: document.getElementById('barbeiro').value
  };

  const conflito = agendamentos.find(a => a.data === novo.data && a.hora === novo.hora && a.barbeiro === novo.barbeiro);
  if(conflito){
    alert('Esse horário já está ocupado!');
    return;
  }
  
  agendamentos.push(novo);
  localStorage.setItem('barbearia', JSON.stringify(agendamentos));
  mostrarLista();
  form.reset();
});