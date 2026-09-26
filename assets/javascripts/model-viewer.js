/* A 3D viewer for a mod's entity models, with their textures, in plain WebGL (no dependency).
 *
 * <div class="model-viewer" data-models="models/" data-ids="south-bird cloud-fox ..."></div>
 * loads each <id>.json from data-models (made by the wiki tools' modelrender/export.py: the model's faces in each
 * pose, and its texture variants) and shows one at a time, with buttons for the animal, its variant and its pose.
 * Drag to turn it, scroll or pinch to zoom; it turns slowly on its own until touched.
 *
 * A face is [ox, oy, oz, ux, uy, uz, vx, vy, vz, tu, tv, tw, th, nx, ny, nz] in Minecraft model space (y down, head
 * towards -z): corners O, O+U, O+U+V, O+V, texture rectangle (tu, tv, tw, th) in texels. The shading matches the
 * static pictures on the page: 0.55 + 0.45 * max(0, n.l).
 */
(function () {
  const VERTEX = `
    attribute vec3 position; attribute vec2 uv; attribute vec3 normal;
    uniform mat4 view; uniform vec2 scale;
    varying vec2 vUv; varying float vShade;
    void main() {
      vec4 p = view * vec4(position, 1.0);
      vec3 n = normalize((view * vec4(normal, 0.0)).xyz);
      vShade = 0.55 + 0.45 * max(0.0, dot(n, normalize(vec3(0.35, 0.8, 0.5))));
      vUv = uv;
      gl_Position = vec4(p.x * scale.x, p.y * scale.y, -p.z * 0.01, 1.0);
    }`;
  const FRAGMENT = `
    precision mediump float;
    uniform sampler2D skin; varying vec2 vUv; varying float vShade;
    void main() {
      vec4 c = texture2D(skin, vUv);
      if (c.a < 0.5) discard;
      gl_FragColor = vec4(c.rgb * vShade, 1.0);
    }`;

  function compile(gl, type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  // view = pitch * yaw * flip, where flip is the game's scale(-1, -1, 1): y up, the head towards the viewer
  function viewMatrix(yaw, pitch, centre) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const Ry = [[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]];
    const Rx = [[1, 0, 0], [0, cp, -sp], [0, sp, cp]];
    const F = [[-1, 0, 0], [0, -1, 0], [0, 0, 1]];
    const mul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
    const M = mul(Rx, mul(Ry, F));
    const t = M.map(r => -(r[0] * centre[0] + r[1] * centre[1] + r[2] * centre[2]));
    // column-major 4x4
    return new Float32Array([M[0][0], M[1][0], M[2][0], 0, M[0][1], M[1][1], M[2][1], 0,
      M[0][2], M[1][2], M[2][2], 0, t[0], t[1], t[2], 1]);
  }

  function buildMesh(faces, tex) {
    const pos = [], uv = [], nor = [], idx = [];
    faces.forEach(function (f) {
      const O = f.slice(0, 3), U = f.slice(3, 6), V = f.slice(6, 9);
      const [tu, tv, tw, th] = f.slice(9, 13), N = f.slice(13, 16);
      const base = pos.length / 3;
      [[0, 0], [1, 0], [1, 1], [0, 1]].forEach(function ([a, b]) {
        pos.push(O[0] + a * U[0] + b * V[0], O[1] + a * U[1] + b * V[1], O[2] + a * U[2] + b * V[2]);
        uv.push((tu + a * tw) / tex[0], (tv + b * th) / tex[1]);
        nor.push(N[0], N[1], N[2]);
      });
      idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    });
    let lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) {
      lo[k] = Math.min(lo[k], pos[i + k]); hi[k] = Math.max(hi[k], pos[i + k]);
    }
    const centre = lo.map((l, k) => (l + hi[k]) / 2);
    const radius = Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) / 2;
    return { pos: new Float32Array(pos), uv: new Float32Array(uv), nor: new Float32Array(nor),
      idx: new Uint16Array(idx), centre: centre, radius: radius };
  }

  function button(label, onClick) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'md-button';
    b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  }

  function setup(root) {
    const base = root.dataset.models, ids = root.dataset.ids.split(/\s+/);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    const bar = document.createElement('div'), variants = document.createElement('div'), poses = document.createElement('div');
    bar.className = variants.className = poses.className = 'model-viewer-buttons';
    root.append(bar, canvas, variants, poses);
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) {
      root.textContent = 'This browser cannot show the 3D view (WebGL is off).';
      return;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.enable(gl.DEPTH_TEST);
    const buffers = { pos: gl.createBuffer(), uv: gl.createBuffer(), nor: gl.createBuffer(), idx: gl.createBuffer() };
    const attr = n => gl.getAttribLocation(prog, n);
    const texture = gl.createTexture();

    let models = [], data = null, mesh = null, animal = 0, variant = 0, pose = 0;
    let yaw = -2.5, pitch = 0.45, zoom = 1.4, spinning = true, count = 0;

    function highlight(row, i) {
      [...row.children].forEach((b, k) => b.classList.toggle('md-button--primary', k === i));
    }

    function upload() {
      mesh = buildMesh(data.poses[pose].faces, data.texture);
      count = mesh.idx.length;
      [['pos', 3, 'position'], ['uv', 2, 'uv'], ['nor', 3, 'normal']].forEach(function ([k, n, name]) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[k]);
        gl.bufferData(gl.ARRAY_BUFFER, mesh[k], gl.STATIC_DRAW);
        gl.enableVertexAttribArray(attr(name));
        gl.vertexAttribPointer(attr(name), n, gl.FLOAT, false, 0, 0);
      });
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.idx);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.idx, gl.STATIC_DRAW);
    }

    function loadTexture() {
      const img = new Image();
      img.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      };
      img.src = base + data.variants[variant].texture;
    }

    function rows() {
      variants.replaceChildren(...(data.variants.length > 1 ? data.variants.map((v, i) =>
        button(v.label, function () { variant = i; highlight(variants, i); loadTexture(); })) : []));
      poses.replaceChildren(...(data.poses.length > 1 ? data.poses.map((p, i) =>
        button(p.label, function () { pose = i; highlight(poses, i); upload(); })) : []));
      highlight(variants, variant);
      highlight(poses, pose);
    }

    function show(i) {
      animal = i; variant = 0; pose = 0;
      highlight(bar, i);
      data = models[i];
      canvas.setAttribute('aria-label', data.name + ', a 3D model you can turn');
      rows(); upload(); loadTexture();
    }

    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if (mesh) {
        if (spinning) yaw += 0.006;
        const s = zoom / (mesh.radius * 1.05);
        gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'view'), false, viewMatrix(yaw, pitch, mesh.centre));
        gl.uniform2f(gl.getUniformLocation(prog, 'scale'), s * Math.min(1, h / w), s * Math.min(1, w / h));
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
      }
      requestAnimationFrame(draw);
    }

    // turning and zooming, with a mouse, a pen or fingers
    const pointers = new Map();
    let pinch = 0;
    canvas.addEventListener('pointerdown', function (e) {
      spinning = false;
      canvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!pointers.has(e.pointerId)) return;
      const [x, y] = pointers.get(e.pointerId);
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pinch) zoom = Math.min(3, Math.max(0.4, zoom * d / pinch));
        pinch = d;
        return;
      }
      yaw += (e.clientX - x) * 0.01;
      pitch = Math.min(1.5, Math.max(-1.5, pitch + (e.clientY - y) * 0.01));
    });
    const up = function (e) { pointers.delete(e.pointerId); pinch = 0; };
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('wheel', function (e) {
      e.preventDefault();
      spinning = false;
      zoom = Math.min(3, Math.max(0.4, zoom * Math.exp(-e.deltaY * 0.001)));
    }, { passive: false });

    // the models are small (a few kilobytes each): load them all, then name the buttons after them
    Promise.all(ids.map(id => fetch(base + id + '.json').then(r => r.json()))).then(function (loaded) {
      models = loaded;
      models.forEach(function (m, i) { bar.append(button(m.name, function () { show(i); })); });
      show(0);
      requestAnimationFrame(draw);
    });
  }

  function init() {
    document.querySelectorAll('.model-viewer').forEach(function (root) {
      if (root.dataset.ready) return;
      root.dataset.ready = '1';
      setup(root);
    });
  }

  if (typeof document$ !== 'undefined') document$.subscribe(init);
  else document.addEventListener('DOMContentLoaded', init);
})();
