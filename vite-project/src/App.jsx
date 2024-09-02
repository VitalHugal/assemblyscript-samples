import { useRef, useEffect, useState } from 'react';
import './App.css'
import Webcam from 'react-webcam';

function App() {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    setCtx(context);

    // Ajuste o tamanho do canvas
    setWidth(canvas.width);
    setHeight(canvas.height);
  }, []);


  function handleBtnCapture() {
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      processImage(imageSrc);
    } else {
      console.error('Erro de captura');
    }
  }

  function handleChangeFile(e) {
    const file = e.target.files[0];
    processImage(file);
  }

  function processImage(file) {
    const img = new Image();

    if (typeof file === 'string') {
      img.src = file;
    } else {
      const objectURL = URL.createObjectURL(file);
      img.src = objectURL;
    }

    img.onload = function () {
      if (ctx) {
        const canvas = canvasRef.current;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        console.log(data);

        ctx.putImageData(imageData, 0, 0);
      }
    };
  }

  async function loadWasm() {
    const arraySize = (width * height * 4) >>> 0;
    const nPages = ((arraySize + 0xffff) & ~0xffff) >>> 16;
    const memory = new WebAssembly.Memory({ initial: nPages });

    const wasm = await WebAssembly
      .instantiateStreaming(fetch('./build/optimized.wasm'), {
        env: {
          memory, // npm run asbuild:optimized -- --importMemory
          abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
          seed: () => new Date().getTime()
        }
      });
    return wasm.instance.exports;
  }

  async function manipulate(action, params = []) {
    const wasm = await loadWasm();

    const imageData = originalImageData();
    const bytes = new Uint8ClampedArray(wasm.memory.buffer);

    copyData(imageData.data, bytes);

    wasm[action](canvasRef.current.width, canvasRef.current.height, ...params);

    writeImageData(imageData, bytes);
  }

  function originalImageData() {
    original();
    return ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function copyData(src, dest) {
    for (let i = 0; i < src.length; i++) {
      dest[i] = src[i];
    }
  }

  function writeImageData(imageData, bytes) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i++) {
      data[i] = bytes[i];
    }

    ctx.putImageData(imageData, 0, 0);
  }

  useEffect(() => {
    document.querySelector('.action.original').onclick = e => {
      e.preventDefault();
      original();
    };

    document.querySelector('.action.invert').onclick = e => {
      e.preventDefault();
      manipulate('invert');
    };

    document.querySelector('.action.grayscale').onclick = e => {
      e.preventDefault();
      manipulate('grayscale');
    };

    document.querySelector('.action.basicMonochrome').onclick = e => {
      e.preventDefault();
      manipulate('basicMonochrome', [150]);
    };

    document.querySelector('.action.randomMonochrome').onclick = e => {
      e.preventDefault();
      manipulate('randomMonochrome', [80]);
    };
  }, [ctx]);

  return (
    <div>
      <input type="file" id="upload" onChange={handleChangeFile} />

      <canvas ref={canvasRef} id="canvas" width={300} height={300}></canvas>

      <Webcam className='video' ref={webcamRef} audio={false} screenshotFormat="image/jpeg" />

      <button className="btnCapture" onClick={handleBtnCapture}>Capturar Imagem</button>

      <ul>
        <li><a href="#" className="action original">Original</a></li>
        <li><a href="#" className="action invert">Invert</a></li>
        <li><a href="#" className="action grayscale">Grayscale</a></li>
        <li><a href="#" className="action basicMonochrome">Basic Monochrome</a></li>
        <li><a href="#" className="action randomMonochrome">Random Monochrome</a></li>
      </ul>
    </div>
  );
}

export default App;
