(()=>{const cv=document.getElementById('scene');if(!cv||!window.THREE)return;
const T=THREE,RM=matchMedia('(prefers-reduced-motion:reduce)').matches,N=innerWidth<700?9000:22000,rnd=(a,b)=>a+Math.random()*(b-a);
const r=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
const s=new T.Scene(),c=new T.PerspectiveCamera(50,1,.1,100),P=[];
for(let i=0;i<N*.3;i++)P.push(rnd(-7,7),0,rnd(-6,3));
for(let i=0;i<N*.2;i++)P.push(rnd(-7,7),rnd(0,4),-6);
for(let i=0;i<N*.1;i++)P.push(-7,rnd(0,4),rnd(-6,3));
const items=[{l:'person',c:[-.4,.9,-1.2],s:[.8,1.8,.6]},{l:'sofa',c:[2.8,.45,-3.5],s:[2.4,.9,1]},{l:'table',c:[-3,.4,-2.5],s:[1.4,.8,.9]}];
function shell(o,n){for(let i=0;i<n;i++){const p=o.s.map(v=>rnd(-v/2,v/2)),a=Math.floor(Math.random()*3);
 if(o.l==='person'){const u=Math.random()*6.28,h=rnd(-.5,.5);p[0]=Math.cos(u)*.28*(1-h*h);p[2]=Math.sin(u)*.2*(1-h*h);p[1]=h*1.7}else p[a]=(Math.random()<.5?-1:1)*o.s[a]/2;
 P.push(o.c[0]+p[0],o.c[1]+p[1],o.c[2]+p[2])}}
items.forEach((o,i)=>shell(o,N*(i?.12:.18)));
const g=new T.BufferGeometry(),S=new Float32Array(P.length).map(()=>rnd(-14,14));
g.setAttribute('position',new T.Float32BufferAttribute(P,3));g.setAttribute('aS',new T.BufferAttribute(S,3));
const u={uT:{value:RM?1:0},uTime:{value:0},uPx:{value:r.getPixelRatio()}};
const m=new T.ShaderMaterial({uniforms:u,transparent:true,depthWrite:false,blending:T.AdditiveBlending,
vertexShader:'attribute vec3 aS;uniform float uT,uTime,uPx;varying float vH;void main(){float e=uT*uT*(3.-2.*uT);vec3 p=mix(aS,position,e);p.y+=sin(uTime+position.x*2.+position.z)*.02*e;vH=position.y;vec4 mv=modelViewMatrix*vec4(p,1.);gl_PointSize=2.1*uPx*(8./-mv.z);gl_Position=projectionMatrix*mv;}',
fragmentShader:'varying float vH;void main(){vec2 d=gl_PointCoord-.5;if(dot(d,d)>.25)discard;gl_FragColor=vec4(mix(vec3(.37,.79,.76),vec3(.95,.66,.23),smoothstep(.6,2.4,vH)),.7);}'});
s.add(new T.Points(g,m));
const boxes=items.map(o=>{const e=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(...o.s.map(v=>v*1.12))),new T.LineBasicMaterial({color:0xf2a93b,transparent:true,opacity:0}));e.position.set(...o.c);s.add(e);return e});
const V={home:[0,1.8,6.5,0,1.2,-2],services:[5.5,2.4,4,0,1,-2],projects:[0,6,5,0,0,-2],experience:[-6,1.4,3.5,1,1,-3],contact:[0,2.2,10,0,1,-3]};
const v=V[document.body.dataset.page]||V.home,look=new T.Vector3(...v.slice(3)),tg=new T.Vector3();let seen=null;try{seen=sessionStorage.getItem('eye')}catch(e){}
c.position.set(...(seen?JSON.parse(seen):[0,8,14]));let mx=0,my=0,t0=performance.now();const done=!!seen||RM;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener('pagehide',()=>{try{sessionStorage.setItem('eye',JSON.stringify(c.position.toArray()))}catch(e){}});
function rs(){r.setSize(innerWidth,innerHeight,false);c.aspect=innerWidth/innerHeight;c.updateProjectionMatrix()}addEventListener('resize',rs);rs();
(function f(now){requestAnimationFrame(f);const t=(now-t0)/1000,sc=scrollY/Math.max(1,document.body.scrollHeight-innerHeight);
u.uTime.value=RM?0:t;u.uT.value=done?1:Math.min(1,t/2.8);
const bo=done?Math.min(1,t/.8):Math.max(0,Math.min(1,(t-2.6)/1));boxes.forEach((b,i)=>b.material.opacity=bo*(i?.55:.7+.3*Math.sin(t*3)));
tg.set(v[0]+(RM?0:mx*1.6)+sc*2.5,v[1]-(RM?0:my*.8),v[2]-sc*1.5);c.position.lerp(tg,.035);c.lookAt(look);r.render(s,c)})(t0);
})();
