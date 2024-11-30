const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable');
let students = [];

// Função para calcular a média
function calculateAverage(grades) {
  if (grades.length === 0) return 0;
  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return (total / grades.length).toFixed(2);
}

// Atualiza a tabela de alunos
function updateTable() {
  studentTable.innerHTML = '';
  students.forEach((student, index) => {
    const row = document.createElement('tr');

    // Nome do aluno
    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;

    // Notas do aluno
    const gradesCell = document.createElement('td');
    gradesCell.textContent = student.grades.join(', ');

    // Média do aluno
    const averageCell = document.createElement('td');
    averageCell.textContent = calculateAverage(student.grades);

    // Ações
    const actionsCell = document.createElement('td');
    actionsCell.classList.add('actions');

    // Botão de adicionar nova nota
    const addGradeButton = document.createElement('button');
    addGradeButton.textContent = 'Adicionar Nota';
    addGradeButton.classList.add('add');
    addGradeButton.addEventListener('click', () => {
      const newGrade = prompt(`Adicionar nova nota para ${student.name}:`);
      const grade = parseFloat(newGrade);
      if (!isNaN(grade) && grade >= 0 && grade <= 10) {
        student.grades.push(grade);
        updateTable();
      } else {
        alert('Por favor, insira uma nota válida entre 0 e 10.');
      }
    });

    // Botão de excluir aluno
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
      students.splice(index, 1);
      updateTable();
    });

    actionsCell.appendChild(addGradeButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(gradesCell);
    row.appendChild(averageCell);
    row.appendChild(actionsCell);

    studentTable.appendChild(row);
  });
}

// Adiciona um aluno com nota
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const grade = parseFloat(document.getElementById('studentGrade').value);

  if (name && !isNaN(grade)) {
    let student = students.find((s) => s.name === name);
    if (!student) {
      student = { name, grades: [] };
      students.push(student);
    }
    student.grades.push(grade);
    updateTable();
    studentForm.reset();
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }
});
