


const encriptar = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

const desencriptar = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
};

let botonEncriptar = document.querySelector('.boton1');
let botonDesencriptar = document.querySelector('.boton2');
let inputTexto = document.querySelector('#texto');
let mensaje = document.querySelector('#visor .mensaje');
let botonCopiar = document.querySelector('.boton3');
let visor = document.getElementById('visor');
let imagenVisor = visor.querySelector('img');
let modal = document.getElementById('modal');
let closeButton = modal.querySelector('.close');
let textoEncriptado = '';
let textoDesencriptado = '';


botonCopiar.style.display = 'none';

botonCopiar.addEventListener('click', () => {
    const textoCopiado = mensaje.querySelector('p:last-child').textContent;
    inputTexto.value = textoCopiado;
    imagenVisor.style.display = 'none';
});


inputTexto.addEventListener('input', () => {
    mensaje.classList.add('miClase');
    textoEncriptado = inputTexto.value;
    const estadoEncriptado = verificarEncriptado(textoEncriptado);
    mensaje.innerHTML = `<p>${estadoEncriptado} </p><p>${textoEncriptado}</p>`;
    imagenVisor.style.display = 'none';
});

botonEncriptar.addEventListener('click', () => {
    const texto = inputTexto.value;
    textoEncriptado = encriptarTexto(texto);
    mensaje.innerHTML = `<p>Texto encriptado </p><p>${textoEncriptado}</p>`;

    botonCopiar.style.display = 'block';
    imagenVisor.style.display = 'none';
});

botonDesencriptar.addEventListener('click', () => {
    const textoDesencriptado = desencriptarTexto(textoEncriptado);
    mensaje.innerHTML = `<p class="hola">Texto desencriptado:</p><p>${textoDesencriptado}</p>`;

    botonCopiar.style.display = 'block';
    imagenVisor.style.display = 'none';
});


function encriptarTexto(texto) {
    return texto.replace(/[aeiou]/g, vocal => encriptar[vocal]);
}

function desencriptarTexto(textoEncriptado) {
    return textoEncriptado.replace(/(ai|enter|imes|ober|ufat)/g, cadena => desencriptar[cadena]);
}

function verificarEncriptado(texto) {
    return texto.includes('ai') || texto.includes('enter') || texto.includes('imes') || texto.includes('ober') || texto.includes('ufat')
        ? 'Texto encriptado'
        : 'Texto desencriptado';
}


inputTexto.addEventListener('input', () => {
    mensaje.classList.add('miClase');
    textoEncriptado = inputTexto.value;
    const estadoEncriptado = verificarEncriptado(textoEncriptado);
    mensaje.innerHTML = `<p>${estadoEncriptado} </p><p>${textoEncriptado}</p>`;
    imagenVisor.style.display = 'none';

    verificarTexto(); // Llamamos a la función verificarTexto cada vez que el contenido del textarea cambie
});

// Llamamos a la función verificarTexto al cargar la página
verificarTexto();

// Mostrar la ventana modal si el texto no contiene minúsculas ni acentos
function verificarTexto() {
    let texto = inputTexto.value;
    let contieneMayusculas = /[A-Z]/.test(texto);
    let contieneNumeros = /[0-9]/.test(texto);
    let contieneAcentos = /[áéíóúÁÉÍÓÚ]/.test(texto);

    if (contieneMayusculas || contieneNumeros || contieneAcentos) {
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;
        mostrarVentanaEmergente();
    } else {
        botonEncriptar.disabled = false;
        botonDesencriptar.disabled = false;
    }
}

// Mostrar la ventana modal
function mostrarVentanaEmergente() {
    modal.style.display = 'block';
}

// Cerrar la ventana modal cuando se hace clic en el botón de cierre (X)
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
