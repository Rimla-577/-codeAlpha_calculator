const expressionE1 = document.getElementById("expression");
const resultE1 = document.getElementById("result");
let expression = '';

function safeEvaluate(expr){
  if(!expr) return '';
  if(!/^[0-9+\-*/.%\s]+$/.test(expr)){
    return 'Error';
  }
  try{
    let val = Function('"use strict"; return (' + expr + ')')();
    if(!Number.isFinite(val)){
      return 'Error';
    }
    return val.toString();
  }catch(e){
    return '';
  }
}

function updateDisplay(){
  expressionE1.textContent = expression || '\u00A0';
  if(expression === ''){
    resultE1.textContent = '0';
    return;
  }
  const preview = safeEvaluate(expression);
  resultE1.textContent = preview === '' ? expression : preview;
}

function append(value){
  expression += value;
  updateDisplay();
}

function clearAll(){
  expression = '';
  updateDisplay();
}

function deleteLast(){
  expression = expression.slice(0, -1);
  updateDisplay();
}

function equals(){
  if(expression === '') return;
  const val = safeEvaluate(expression);
  expression = (val === 'Error' || val === '') ? '' : val;
  updateDisplay();
}

document.querySelector('.grid').addEventListener('click', function(e){
  const btn = e.target.closest('button');
  if(!btn) return;

  if(btn.dataset.action === 'clear'){
    clearAll();
  } else if(btn.dataset.action === 'delete'){
    deleteLast();
  } else if(btn.dataset.action === 'equals'){
    equals();
  } else if(btn.dataset.value !== undefined){
    append(btn.dataset.value);
  }
});
window.addEventListener('keydown', function(e){
  const key = e.key;

  if(/[0-9]/.test(key)){
    append(key);
  } else if(key === '.'){
    append('.');
  } else if(['+','-','*','/','%'].includes(key)){
    append(key);
  } else if(key === 'Enter' || key === '='){
    e.preventDefault();
    equals();
  } else if(key === 'Backspace'){
    deleteLast();
  } else if(key === 'Escape'){
    clearAll();
  }
});