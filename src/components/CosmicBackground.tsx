import { useEffect, useRef } from 'react';

const vertexShaderSource = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);} 
float fbm(vec2 p){float t=0.,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;} 
float clouds(vec2 p){float d=1.,t=0.;for(float i=0.;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;} 

void main(){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.35,-st.y));
  uv*=1.-.25*(sin(T*.15)*.5+.5);
  for(float i=1.;i<10.;i++){
    uv+=.08*cos(i*vec2(.1+.01*i,.8)+i*i+T*.35+.1*uv.x);
    vec2 p=uv; float d=length(p);
    vec3 c=vec3(.3+.5*sin(i*.7),.1+.2*sin(i*.7+2.1),.6+.4*sin(i*.7+4.2));
    col+=.00125/d*(c+.5);
    float b=noise(i+p+bg*1.5);
    col+=.0015*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.06,bg*.03,bg*.18),d);
  }
  col=vec3(col.x*.4+col.z*.15, col.y*.3+col.z*.1, col.z*1.1);
  float vign=length(uv*.55); col*=max(0.,1.-vign*vign*.5);
  col*=.65;
  O=vec4(col,1.0);
}`;

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniform = gl.getUniformLocation(program, 'resolution');
    const timeUniform = gl.getUniformLocation(program, 'time');

    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (timestamp: number) => {
      gl.useProgram(program);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(timeUniform, timestamp * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.85 }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(3,3,10,0) 0%, rgba(3,3,10,0.55) 100%)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(123,47,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </>
  );
}
