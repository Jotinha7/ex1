// Array para armazenar os alunos
let alunos = [];
// Variável para controlar se estamos editando (-1 significa cadastro novo)
let indiceEdicao = -1;

// Classe Aluno com atributos, construtor e métodos
class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
  }
}

// Seleção dos elementos do DOM
const formAluno = document.getElementById('formAluno');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];
const relatorioDiv = document.getElementById('relatorio');

// Evento para cadastrar ou editar aluno ao submeter o formulário
formAluno.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const curso = document.getElementById('curso').value;
  const notaFinal = document.getElementById('notaFinal').value;
  
  if (indiceEdicao === -1) {
    // Cadastro de novo aluno
    const aluno = new Aluno(nome, idade, curso, notaFinal);
    alunos.push(aluno);
    alert('Aluno cadastrado com sucesso!');
    console.log('Aluno cadastrado:', aluno.toString());
  } else {
    // Edição de aluno existente
    alunos[indiceEdicao].nome = nome;
    alunos[indiceEdicao].idade = idade;
    alunos[indiceEdicao].curso = curso;
    alunos[indiceEdicao].notaFinal = parseFloat(notaFinal);
    alert('Aluno editado com sucesso!');
    console.log('Aluno editado:', alunos[indiceEdicao].toString());
    indiceEdicao = -1;
  }
  formAluno.reset();
  renderizarTabela();
});

// Função para renderizar a tabela com os alunos
const renderizarTabela = () => {
  tabelaAlunos.innerHTML = '';
  alunos.forEach((aluno, index) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal}</td>
      <td>${aluno.isAprovado() ? 'Sim' : 'Não'}</td>
      <td>
        <button onclick="editarAluno(${index})">Editar</button>
        <button onclick="excluirAluno(${index})">Excluir</button>
      </td>
    `;
    tabelaAlunos.appendChild(linha);
  });
};

// Função para preencher o formulário com os dados do aluno a ser editado
const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('idade').value = aluno.idade;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('notaFinal').value = aluno.notaFinal;
  indiceEdicao = index;
};

// Função para excluir um aluno
const excluirAluno = (index) => {
  if(confirm('Tem certeza que deseja excluir este aluno?')) {
    alunos.splice(index, 1);
    alert('Aluno excluído com sucesso!');
    console.log('Aluno excluído, índice:', index);
    renderizarTabela();
  }
};

// Eventos para gerar relatórios

// Listar alunos aprovados
document.getElementById('btnAprovados').addEventListener('click', () => {
  const aprovados = alunos.filter(aluno => aluno.isAprovado());
  relatorioDiv.innerHTML = `<h3>Alunos Aprovados</h3><p>${aprovados.map(a => a.toString()).join('<br>')}</p>`;
});

// Calcular e exibir a média das notas finais
document.getElementById('btnMediaNotas').addEventListener('click', () => {
  if(alunos.length === 0){
    relatorioDiv.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
    return;
  }
  const somaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
  const mediaNotas = somaNotas / alunos.length;
  relatorioDiv.innerHTML = `<h3>Média das Notas Finais</h3><p>${mediaNotas.toFixed(2)}</p>`;
});

// Calcular e exibir a média das idades
document.getElementById('btnMediaIdades').addEventListener('click', () => {
  if(alunos.length === 0){
    relatorioDiv.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
    return;
  }
  const somaIdades = alunos.reduce((acc, aluno) => acc + parseInt(aluno.idade), 0);
  const mediaIdades = somaIdades / alunos.length;
  relatorioDiv.innerHTML = `<h3>Média das Idades</h3><p>${mediaIdades.toFixed(2)}</p>`;
});

// Listar os nomes dos alunos em ordem alfabética
document.getElementById('btnOrdemAlfabetica').addEventListener('click', () => {
  const nomesOrdenados = alunos.map(aluno => aluno.nome).sort();
  relatorioDiv.innerHTML = `<h3>Alunos em Ordem Alfabética</h3><p>${nomesOrdenados.join(', ')}</p>`;
});

// Mostrar a quantidade de alunos por curso
document.getElementById('btnQtdPorCurso').addEventListener('click', () => {
  const qtdPorCurso = alunos.reduce((acc, aluno) => {
    acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
    return acc;
  }, {});
  let relatorioHtml = '<h3>Quantidade de Alunos por Curso</h3>';
  for(let curso in qtdPorCurso) {
    relatorioHtml += `<p>${curso}: ${qtdPorCurso[curso]}</p>`;
  }
  relatorioDiv.innerHTML = relatorioHtml;
});
