const containerEl = document.querySelector(".container");
const canvasEl = document.querySelector("canvas#neuro");
const devicePixelRatio = Math.min(window.devicePixelRatio, 2);


const pointer = {
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
};


let uniforms;
const gl = initShader();

setupEvents();

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

render();

function initShader() {
    const vsSource = document.getElementById("vertShader").innerHTML;
    const fsSource = document.getElementById("fragShader").innerHTML;

    const gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");

    if (!gl) {
        alert("WebGL is not supported by your browser.");
    }

    function createShader(gl, sourceCode, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

    function createShaderProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }

    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    uniforms = getUniforms(shaderProgram);

    function getUniforms(program) {
        let uniforms = [];
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }

    const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    return gl;
}

function render() {
    const currentTime = performance.now();

    pointer.x += (pointer.tX - pointer.x) * .5;
    pointer.y += (pointer.tY - pointer.y) * .5;

    gl.uniform1f(uniforms.u_time, currentTime);
    gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
    gl.uniform1f(uniforms.u_scroll_progress, window["pageYOffset"] / (2 * window.innerHeight));

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
}

function resizeCanvas() {
    canvasEl.width = window.innerWidth * devicePixelRatio;
    canvasEl.height = window.innerHeight * devicePixelRatio;
    gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
}

function setupEvents() {
    window.addEventListener("pointermove", e => {
        updateMousePosition(e.clientX, e.clientY);
    });
    window.addEventListener("touchmove", e => {
        updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    });
    window.addEventListener("click", e => {
        updateMousePosition(e.clientX, e.clientY);
    });

    function updateMousePosition(eX, eY) {
        pointer.tX = eX;
        pointer.tY = eY;
    }
}


const countdown = document.querySelector('.countdown');

// Set Launch Date (ms)
const launchDate = new Date('Sep 30, 2024 13:00:00').getTime();

// Update every second
const intvl = setInterval(() => {
// Get todays date and time (ms)
const now = new Date().getTime();

// Distance from now to the launch date
const distance = launchDate - now;

// Time calculations
const days = Math.floor(distance / (1000 * 60 * 60 *24));
const hours = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// Display result
countdown.innerHTML = `
<div>${days}<span>Days</span></div>
<div>${hours}<span>Hours</span></div>
<div>${mins}<span>Minutes</span></div>
<div>${seconds}<span>Seconds</span></div>
`;

// If launch date passed
if(distance < 0){
// Stop countdown
clearInterval(intvl);
// Style and output text
countdown.style.color = '#17a2b8';
countdown.innerHTML = 'Launched!';
}
}, 1000);