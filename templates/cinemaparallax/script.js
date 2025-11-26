// 1. Kunci scroll sampai klik "Buka Undangan"
document.body.style.overflow='hidden';
document.documentElement.style.overflow='hidden';

// 2. Preload gambar
const images=['sky.jpg','stars.png','clouds.png','moon.png','waves.png'];
let loaded=0;
const landing=document.getElementById('landing');
landing.style.opacity='0'; landing.style.transition='opacity .5s ease';
images.forEach(src=>{
  const img=new Image(); img.src=src; img.onload=check; img.onerror=check;
});
function check(){loaded++; if(loaded===images.length){landing.style.opacity='1';document.body.classList.add('images-loaded');}}

// 3. Tombol buka undangan
const main=document.getElementById('main');
document.getElementById('openBtn').addEventListener('click',()=>{
  landing.style.opacity='0'; landing.style.transition='opacity 1.4s ease-out';
  setTimeout(()=>{
    landing.remove();
    document.body.style.overflow=''; document.documentElement.style.overflow='';
    main.style.opacity='0'; main.style.transform='translateY(20px)';
    main.style.transition='opacity 1s ease, transform 1s ease';
    main.classList.add('show');
    setTimeout(()=>{main.style.opacity='1'; main.style.transform='translateY(0)';},50);

    const music=document.getElementById('bgmusic');
    music.play().catch(()=>console.log('Musik diblokir'));
  },1400);
});

// 4. Toggle musik
document.getElementById('musicBtn').addEventListener('click',function(){
  const music=document.getElementById('bgmusic');
  if(music.paused){music.play(); this.textContent='Music On';}
  else{music.pause(); this.textContent='Music Off';}
});

// 5. Countdown
const weddingDate=new Date("2026-03-14T00:00:00").getTime();
setInterval(()=>{
  const now=new Date().getTime();
  const dist=weddingDate-now;
  if(dist<0){document.getElementById('timer').innerHTML='<h3>Sudah Tiba Hari Bahagia!</h3>'; return;}
  const days=Math.floor(dist/(1000*60*60*24)).toString().padStart(2,'0');
  const hours=Math.floor((dist%(1000*60*60*24))/(1000*60*60)).toString().padStart(2,'0');
  const minutes=Math.floor((dist%(1000*60*60))/(1000*60)).toString().padStart(2,'0');
  const seconds=Math.floor((dist%(1000*60))/1000).toString().padStart(2,'0');
  document.getElementById('days').textContent=days;
  document.getElementById('hours').textContent=hours;
  document.getElementById('minutes').textContent=minutes;
  document.getElementById('seconds').textContent=seconds;
},1000);

// 6. RSVP
document.getElementById('form').addEventListener('submit',function(e){
  e.preventDefault();
  const thanks=document.getElementById('thanks');
  thanks.style.display='block'; thanks.style.opacity='0'; thanks.style.transform='translateY(-20px)';
  thanks.style.transition='all .8s ease';
  setTimeout(()=>{thanks.style.opacity='1'; thanks.style.transform='translateY(0)';},100);
  this.reset();
  setTimeout(()=>{thanks.style.opacity='0'; thanks.style.transform='translateY(-20px)';
    setTimeout(()=>thanks.style.display='none',800);
  },5000);
});

// 7. Parallax desktop only
if(window.innerWidth>768){
  document.addEventListener('mousemove',(e)=>{
    const layers=document.querySelectorAll('.layer');
    layers.forEach((layer,index)=>{
      const speed=(index+1)*5;
      const x=(window.innerWidth-e.pageX*speed)/100;
      const y=(window.innerHeight-e.pageY*speed)/100;
      layer.style.transform=`translateZ(${-((index+1)*10)}px) scale(${1+index*0.2}) translate(${x}px, ${y}px)`;
    });
  });
}

// 8. Countdown horizontal rapih
const timerDivs=document.querySelectorAll('#timer > div');
function adjustTimerLayout(){
  const ww=window.innerWidth;
  if(ww<480){timerDivs.forEach(d=>d.style.flex='0 0 22%')}
  else if(ww<768){timerDivs.forEach(d=>d.style.flex='0 0 18%')}
  else{timerDivs.forEach(d=>d.style.flex='0 0 120px')}
}
window.addEventListener('resize',adjustTimerLayout);
adjustTimerLayout();
