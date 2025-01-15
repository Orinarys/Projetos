function imc() {
    const form = document.querySelector('.form');
    const resultado = document.querySelector('.resultadoIMC');

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const peso = parseFloat(form.querySelector('.peso').value);
        const altura = parseFloat(form.querySelector('.altura').value);

        if (!peso || !altura){
            resultado.innerHTML = 'preencha todos os campos';
            return;
        }
        
        let imc = peso / (altura * altura);
        let classificacao = '';
 
        if (imc < 18.5){

            classificacao = 'Você está Abaixo do peso ideal';

        } else if (imc >= 18.5 && imc <= 24.9){

            classificacao = 'Você está no peso ideal';

        } else if (imc >= 25 && imc <= 29,9){

            classificacao = 'Você está com sobrepeso';

        } else if (imc >= 30 && imc <= 34,9){

            classificacao = 'Você está com obesidade grau 1';
        }
        else if (imc >= 35 && imc <= 39,9){

            classificacao = 'Você está com obesidade grau 2';
        }
        else{
            classificacao = 'Você está com obesidade grau 3';
        }

       

    resultado.innerHTML = `<p> Seu IMC é: <strong>${imc.toFixed(2)}</strong><p>
    <p>Classificação: <strong>${classificacao}</strong><p>`;
 });
}

imc();
