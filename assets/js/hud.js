(()=>{const $=i=>document.getElementById(i),ret=$('reticle'),L=[['person',.94],['sofa',.88],['table',.91],['chair',.79]];
const tick = () => {
  $('h-clock').textContent =
    'Time now · ' +
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
};

tick();
setInterval(tick, 1000);
addEventListener('pointermove',e=>{ret.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
$('h-xy').textContent='X '+(e.clientX/innerWidth*2-1).toFixed(3)+'  Y '+(1-e.clientY/innerHeight*2).toFixed(3)});
document.querySelectorAll('a,.btn').forEach(a=>{a.addEventListener('pointerenter',()=>{ret.style.width=ret.style.height='54px';ret.style.margin='-27px 0 0 -27px'});
a.addEventListener('pointerleave',()=>{ret.style.width=ret.style.height='34px';ret.style.margin='-17px 0 0 -17px'})});
let n=0,t=performance.now();(function f(now){requestAnimationFrame(f);n++;if(now-t>=1000){$('h-fps').textContent=n+' fps';n=0;t=now}})(t);
const sc=()=>{$('h-sc').textContent=Math.round(scrollY/Math.max(1,document.body.scrollHeight-innerHeight)*100)+'% scanned'};sc();addEventListener('scroll',sc,{passive:true});
let k=0;const det=()=>{const [l,c]=L[k++%L.length];$('h-det').textContent=l+' '+Math.min(.99,c+(Math.random()-.5)*.06).toFixed(2)};det();setInterval(det,1800);
})();
