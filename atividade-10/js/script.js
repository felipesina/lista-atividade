function maiorValor() {
    let valor1 = document.getElementById('valor1').value;
    let valor2 = document.getElementById('valor2').value;
    let valor3 = document.getElementById('valor3').value;
    let resultado = '';

    
    
    if (valor1 > valor2 && valor1 > valor3) {
        resultado = `Resultado: ${valor1} eh o maior valor.`;
        
    }else if(valor2 > valor1 && valor2 > valor3 ){
        resultado = `Resultado: ${valor2} eh o maior valor.`;
    }else {
        resultado = `Resultado: ${valor3} eh o maior valor.`;
    }
    
    document.getElementById("resultado").innerHTML = resultado
}