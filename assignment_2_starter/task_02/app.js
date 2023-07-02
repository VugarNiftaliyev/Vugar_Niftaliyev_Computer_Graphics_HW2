let gl, program;
let vertexCount = 36;
let modelViewMatrix;

let eye = [0, 0, 0.1];
let at = [0, 0, 0];
let up = [0, 1, 0];

// initial rotation angle
let theta = 0.0;

// defining orthographic projection parameters
let left = -2.0;
let right = 2.0;
let bottom = -2.0;
let ytop = 2.0;
let near = -100.0;
let far = 100.0;

onload = () => {
  let canvas = document.getElementById("webgl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("No webgl for you");
    return;
  }

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.enable(gl.DEPTH_TEST);

  gl.clearColor(0, 0, 0, 0.5);

  let vertices = [
    -1, -1, 1,
    -1, 1, 1,
    1, 1, 1,
    1, -1, 1,
    -1, -1, -1,
    -1, 1, -1,
    1, 1, -1,
    1, -1, -1,
  ];

  let indices = [
    0, 3, 1,
    1, 3, 2,
    4, 7, 5,
    5, 7, 6,
    3, 7, 2,
    2, 7, 6,
    4, 0, 5,
    5, 0, 1,
    1, 2, 5,
    5, 2, 6,
    0, 3, 4,
    4, 3, 7,
  ];

  let colors = [
    0, 0, 0,
    0, 0, 1,
    0, 1, 0,
    0, 1, 1,
    1, 0, 0,
    1, 0, 1,
    1, 1, 0,
    1, 1, 1,
  ];

  let vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  let iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

  let cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  let vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");

  // Add event listeners for keyboard events
  document.addEventListener("keydown", handleKeyDown);

  render();
};


function handleKeyDown(event) {
  switch (event.key) {
    case "T":
      // top-side view of camera
      eye = [0, 0, 1];
      break;
    case "L":
      // left-side view of camera
      eye = [-1, 0, 0];
      break;
    case "F":
      // front-side view of camera
      eye = [0, 0, 0.1];
      break;
    case "D":
      // rotating the camera clockwise
      theta = 0.1;
      rotating_camera(theta);
      break;
    case "A":
      // rotating the camera counter-clockwise
      theta = -0.1;
      rotating_camera(theta);
      break;

    case "I":
      //isometric view of camera
      eye = [1, 1, 1];
      at = [0, 0, 0];
      up = [0, 1, 0];
      break;
    case "W":
      // zoom in camera
      left += 0.1;
      right -= 0.1;
      bottom += 0.1;
      ytop -= 0.1;
      break;
    case "S":
      // zoom out camera
      left -= 0.1;
      right += 0.1;
      bottom -= 0.1;
      ytop += 0.1;
      break;
  }
}

function rotating_camera(theta) {
  // updating the up vector
  let cos_t = Math.cos(theta);
  let sin_t = Math.sin(theta);
  let new_X = cos_t * up[0] - sin_t * up[1];
  let new_Y = sin_t * up[0] + cos_t * up[1];
  up[0] = new_X;
  up[1] = new_Y;
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // calculating the orthographic projection matrix
  let projectionMatrix = ortho(left, right, bottom, ytop, near, far);

  // calculating the model-view matrix
  let mvm = lookAt(eye, at, up);

  // multiplying the projection matrix with the model-view matrix
  let combined_matrix = mult(projectionMatrix, mvm);

  gl.uniformMatrix4fv(modelViewMatrix, false, flatten(combined_matrix));

  gl.drawElements(gl.TRIANGLES, vertexCount, gl.UNSIGNED_BYTE, 0);

  requestAnimationFrame(render);
}
