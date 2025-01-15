
let currentInput = '';  
let previousInput = ''; 
let operator = '';  
let history = [];      
let isResultDisplayed = false;  // Variável para controlar o estado do resultado

document.addEventListener('DOMContentLoaded', () => {
  updateHistory();
});

// Função para adicionar números no display
function appendNumber(number) {
  if (isResultDisplayed) {
    // Substitui o resultado anterior pelo novo número
    currentInput = number;
    isResultDisplayed = false; // Reseta o estado
  } else {
    // Lógica normal para adicionar números
    if (currentInput === '0' && number === '0') return; // Impede zeros extras no início
    if (currentInput === '0') {
      currentInput = number; // Substitui 0 inicial
    } else {
      currentInput += number; // Concatena o número
    }
  }

  updateDisplay();
}

// Função para adicionar o ponto decimal
function appendDecimal() {
  if (isResultDisplayed) {
    currentInput = '0.'; // Reinicia o número com um ponto
    isResultDisplayed = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

// Função para escolher o operador (+, -, *, /)
function chooseOperator(op) {
  if (currentInput === '') return;

  if (previousInput !== '') {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = ''; // Limpa o display para o próximo número
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay(); // Atualiza o display para refletir a limpeza
}

// Função para apagar o último caractere
function backspace() {
  if (currentInput !== '') {
    currentInput = currentInput.slice(0, -1); // Remove o último caractere do currentInput
    updateDisplay(); // Atualiza o display
  }
}
// Função para realizar o cálculo
function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Erro' : prev / current;
      break;
    case '%':
      result = (prev * current) / 100;
      break;
    default:
      return;
  }

  // Atualiza histórico e localStorage
  const historyItem = `${previousInput} ${operator} ${currentInput} = ${result}`;
  history.push(historyItem);
  localStorage.setItem('history', JSON.stringify(history));

  currentInput = result.toString();
  operator = '';
  previousInput = '';
  isResultDisplayed = true; // Marca que o resultado está sendo exibido

  updateHistory();
  updateDisplay();
}

// Função para atualizar o display
function updateDisplay() {
  if (operator === '' && previousInput === '') {
    document.getElementById('display').value = currentInput; 
  } else {
    document.getElementById('display').value = previousInput + ' ' + operator + ' ' + currentInput;
  }
}

// Função para atualizar o histórico de operações
function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  history.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    historyList.appendChild(listItem);
  });
}
