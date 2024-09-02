// // importando componentes
// const canvas = document.querySelector('#canvas');
// const ctx = canvas.getContext('2d');

// // ajuste o tamanho do canvas para metade do tamanho da imagem original
// const width = canvas.width = 300;
// const height = canvas.height = 300;

// // criando um objeto Image
// const img = new Image();

// // Upload de arquivo
// document.querySelector('#upload').addEventListener('change', function (e) {
//   const file = e.target.files[0];
//   processImage(file);
// });

// function handleBtnCapture() {

//   const imageSrc = webcamRef.current.getScreenshot();

//   if (imageSrc) {
//     processImage(imageSrc);
//   }
//   else {
//     console.error('erro de captura');
//   }
// }

// function processImage(file) {

//   // criando um objeto URL sendo a imagem carregada
//   const objectURL = URL.createObjectURL(file);

//   // quando a imagem for carregada
//   img.onload = function () {

//     // desenhe a imagem redimensionada no canvas
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     // obtenha os dados de pixel da imagem
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     console.log(data);

//     // desenhe os dados de pixel manipulados de volta no canvas
//     ctx.putImageData(imageData, 0, 0);

//   }

//   // Defina a fonte da imagem usando a URL do objeto
//   img.src = objectURL;
// }

// // const img = new Image();
// // img.src = './waterlily.png';
// // img.crossOrigin = 'anonymous';
// // img.onload = () => original();

// async function loadWasm() {
//   const arraySize = (width * height * 4) >>> 0;
//   const nPages = ((arraySize + 0xffff) & ~0xffff) >>> 16;
//   const memory = new WebAssembly.Memory({ initial: nPages });

//   const wasm = await WebAssembly
//     .instantiateStreaming(fetch('./build/optimized.wasm'), {
//       env: {
//         memory, // npm run asbuild:optimized -- --importMemory
//         abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
//         seed: () => new Date().getTime()
//       }
//     });
//   return wasm.instance.exports;
// }


// function original() {
//   ctx.drawImage(img, 0, 0, width, height);
// }

// async function manipulate(action, params = []) {
//   const wasm = await loadWasm();

//   const imageData = originalImageData();
//   console.log(imageData);
//   const bytes = new Uint8ClampedArray(wasm.memory.buffer);

//   copyData(imageData.data, bytes);

//   wasm[action](width, height, ...params);

//   writeImageData(imageData, bytes);
// }

// function originalImageData() {
//   original();
//   return ctx.getImageData(0, 0, width, height);
// }

// function copyData(src, dest) {
//   for (let i = 0; i < src.length; i++)
//     dest[i] = src[i];
// }

// function writeImageData(imageData, bytes) {
//   const data = imageData.data;
//   for (let i = 0; i < data.length; i++)
//     data[i] = bytes[i];

//   ctx.putImageData(imageData, 0, 0);
// }

// document.querySelector('.action.original').onclick = e => {
//   e.preventDefault();
//   original();
// }

// document.querySelector('.action.invert').onclick = e => {
//   e.preventDefault();
//   manipulate('invert');
// }

// document.querySelector('.action.grayscale').onclick = e => {
//   e.preventDefault();
//   manipulate('grayscale');
// }


// document.querySelector('.action.basicMonochrome').onclick = e => {
//   e.preventDefault();
//   manipulate('basicMonochrome', [150]);
// }

// document.querySelector('.action.randomMonochrome').onclick = e => {
//   e.preventDefault();
//   manipulate('randomMonochrome', [80]);
// }

// // Acessando a webcam
// const videoElement = document.getElementById('webcam');
// const imgResultElement = document.getElementById('imgResult');
// const btnCapture = document.getElementById('btnCapture');

// // Configurações do vídeo
// const videoConstraints = {
//   width: 200,
//   height: 200,
//   facingMode: "user"
// };

// // Acessa a câmera do usuário e exibe no elemento de vídeo
// navigator.mediaDevices.getUserMedia({ video: videoConstraints })
//   .then((stream) => {
//     videoElement.srcObject = stream;
//   })
//   .catch((error) => {
//     console.error('Erro ao acessar a câmera:', error);
//   });


// // Captura a imagem quando o botão é clicado
// btnCapture.addEventListener('click', () => {
  
//   // Desenha o quadro do vídeo no canvas
//   canvas.getContext('2d').drawImage(videoElement, 0, 0, width, height);

//   // Converte o canvas para uma imagem em base64
//   const imageData = canvas.toDataURL('image/jpeg');
//   console.log(imageData.data)
  
// });


