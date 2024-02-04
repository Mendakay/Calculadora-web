
// Inicializa la variable para almacenar el total en ejecución
let runningTotal = 0;

// Inicializa el buffer como una cadena
let buffer = '0';

// Inicializa la variable para almacenar el operador previo
let previousOperator = null;

// Obtiene el elemento con la clase 'screen' del documento HTML
const screen = document.querySelector('.screen');

// Función que maneja los clics en los botones de la calculadora
function buttonClick(value) {
    // Verifica si el valor no es un número
    if (isNaN(value)) {
        // Llama a la función handleSymbol si no es un número
        handleSymbol(value);
    } else {
        // Llama a la función handleNumber si es un número
        handleNumber(value);
    }
    // Actualiza el texto en la pantalla con el valor del buffer
    screen.innerText = buffer;
}

// Función que maneja los símbolos (operadores y funciones especiales)
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            // Restablece el buffer y el total en ejecución a cero
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            // Verifica si hay un operador previo antes de realizar la operación
            if (previousOperator === null) {
                return;
            }
            // Realiza la operación y actualiza el buffer y el total en ejecución
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Convierte el resultado a cadena
            runningTotal = 0;
            break;
        case '←':
            // Elimina el último carácter del buffer (retroceso)
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1); // Utiliza slice para eliminar el último carácter
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            // Llama a la función handleMath para gestionar operadores matemáticos
            handleMath(symbol);
            break;
    }
}

// Función que maneja operadores matemáticos
function handleMath(symbol) {
    // Verifica si el buffer actual es '0'
    if (buffer === '0') {
        return;
    }

    // Convierte el buffer a un número entero
    const intBuffer = parseInt(buffer);

    // Verifica si el total en ejecución es cero y actualiza el total en ejecución o realiza la operación
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    
    // Almacena el operador actual y reinicia el buffer
    previousOperator = symbol;
    buffer = '0';
}

// Función que realiza la operación matemática basada en el operador previo
function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case 'x':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
    }
}

// Función que maneja los números
function handleNumber(numberString) {
    // Verifica si el buffer actual es '0' y actualiza el buffer con el número o lo concatena
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// Función de inicialización que agrega un evento de clic a los botones de la calculadora
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        // Llama a la función buttonClick con el texto del botón clicado
        buttonClick(event.target.innerText);
    });
}

// Inicializa la calculadora al cargar la página
init();
