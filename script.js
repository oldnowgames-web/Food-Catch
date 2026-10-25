const $=s=>document.querySelector(s);
const CRED=['Enrico Miguel Pelizzer Romano','Joao Antonio Paulsen Alves','Kauã Henquique da Silva','Daniel Miguel Batista de Souza'],TURMA='2ºDS AMS';
$('#team').innerHTML=CRED.map(n=>'<li>'+n+'</li>').join('');$('#turma').textContent='Turma '+TURMA;
const S=12.4;
const R=[
{n:'Sala 1 — O que foi a prosa romântica?',c:0x5a1a26,t:0,d:0,it:[
['Definição','A prosa romântica é a narrativa em prosa (romances, novelas e folhetins) ligada ao Romantismo. No Brasil, o movimento ganhou força a partir de 1836, e a prosa se desenvolveu principalmente ao longo do século XIX.'],
['Características','• Valorização dos sentimentos e da subjetividade\n• Idealização do amor e de personagens\n• Nacionalismo e valorização da identidade brasileira\n• Retrato da sociedade e dos costumes da época\n• Conflitos emocionais e aventuras\n• Descrição de paisagens e ambientes brasileiros'],
['Linha do tempo','1836 – Marco do início do Romantismo no Brasil (Suspiros Poéticos e Saudades, de Gonçalves de Magalhães).\n1844 – A Moreninha, de Joaquim Manuel de Macedo, obra importante para a consolidação do romance brasileiro.\n1852–1853 – Memórias de um Sargento de Milícias sai em folhetins.\n1857 – O Guarani, de José de Alencar.']],
q:[['Qual obra, publicada em 1844, foi importante para consolidar o romance brasileiro?',['Iracema','A Moreninha','Senhora'],1,'A Moreninha, de Joaquim Manuel de Macedo (1844), é um marco do romance brasileiro.']]},
{n:'Sala 2 — Romance indianista',c:0x2f4630,t:1,d:1,it:[
['O indígena idealizado','No romance indianista, o indígena aparece como herói e símbolo da identidade nacional.\n• Valorização da natureza brasileira\n• Idealização do indígena como herói\n• Nacionalismo e construção de uma identidade literária brasileira\n• Aventuras, conflitos e relações amorosas'],
['José de Alencar','Principais obras indianistas:\n• O Guarani (1857)\n• Iracema (1865)\n• Ubirajara (1874)\nFlorestas, aldeias e heróis inspirados nessas histórias ilustram esta sala.'],
['Atenção: uma construção','A imagem do indígena nesses romances é uma construção idealizada do Romantismo, e não um retrato fiel de todos os povos indígenas, que são diversos em línguas, culturas e histórias.']],
q:[['Qual tipo de romance valorizava o indígena como herói nacional?',['Romance urbano','Romance indianista','Romance regionalista'],1,'O romance indianista idealiza o indígena como herói e símbolo da identidade nacional.']]},
{n:'Sala 3 — Romance urbano',c:0x35384f,t:2,d:2,it:[
['Vida na cidade','Os romances urbanos retratam a vida nas cidades, especialmente o Rio de Janeiro do século XIX.\n• Namoro, casamento e relações familiares\n• Conflitos entre sentimentos e convenções sociais\n• Diferenças econômicas e sociais\n• Salões, ruas antigas e casas da época'],
['A Moreninha (1844)','Romance de Joaquim Manuel de Macedo que acompanha o amor entre Augusto e Carolina em ambiente jovem e festivo. É obra importante para a consolidação do romance brasileiro.'],
['Senhora e Lucíola','Dois romances urbanos de José de Alencar:\n• Senhora (1875): casamento, dinheiro e aparências na sociedade do Rio de Janeiro.\n• Lucíola (1862): o amor e o preconceito social em torno de uma cortesã.']],
q:[['Qual romance urbano de Alencar trata de casamento, dinheiro e convenções sociais?',['O Guarani','Senhora','Inocência'],1,'Senhora mostra como dinheiro e aparências interferem no casamento e nos sentimentos.']]},
{n:'Sala 4 — Romance regionalista',c:0x6e5226,t:3,d:3,it:[
['Muitos Brasis','O romance regionalista valoriza as particularidades de cada região.\n• Paisagens do interior e ambientes rurais\n• Costumes e tradições locais\n• Personagens e conflitos ligados a diferentes regiões\nAs obras variam em seus cenários e representações culturais.'],
['O Sertanejo','José de Alencar (1875). Retrata a vida e os costumes do sertão nordestino.'],
['O Ermitão de Muquém','Bernardo Guimarães (1869). Narrativa ligada ao interior de Goiás e à lenda do santuário de Muquém.'],
['Inocência','Visconde de Taunay (1872). Amor e conflito no interior do Brasil, com descrições detalhadas da paisagem e dos costumes.']],
q:[['O que caracteriza o romance regionalista?',['Foco em salões do Rio de Janeiro','Valorização de paisagens, costumes e modos de vida de cada região','Ambientação apenas em fatos do passado colonial'],1,'O regionalismo destaca as particularidades das regiões do Brasil.']]},
{n:'Sala 5 — Romance histórico',c:0x2c4658,t:4,d:4,it:[
['O que é romance histórico','Mistura personagens, acontecimentos ou cenários históricos com elementos ficcionais.\n• Ambientação em períodos do passado\n• Costumes e conflitos históricos\n• Fatos históricos combinados à imaginação literária\n• Aventuras em contextos históricos'],
['As Minas de Prata','José de Alencar (1862–1864). Ambientado no Brasil colonial, mistura aventura e mistério em torno da busca pelas lendárias minas de prata.']],
q:[['O que o romance histórico combina?',['Fatos históricos e imaginação literária','Apenas relatos científicos','Somente costumes urbanos atuais'],0,'Ele une personagens, fatos ou cenários históricos a elementos ficcionais.']]},
{n:'Sala 6 — Autores e obras importantes',c:0x5a1a26,t:5,d:0,it:[
['José de Alencar (1829–1877)','Cearense. Escreveu romances indianistas, urbanos, regionalistas e históricos, e buscou construir uma literatura nacional. Obras: O Guarani, Iracema, Senhora, O Sertanejo, As Minas de Prata.'],
['Joaquim Manuel de Macedo (1820–1882)','Fluminense. Autor de A Moreninha (1844), romance de costumes ligado à vida urbana do Rio de Janeiro.'],
['Bernardo Guimarães (1825–1884)','Mineiro. Escreveu romances de ambientação regional, como O Ermitão de Muquém (1869).'],
['Visconde de Taunay (1843–1899)','Carioca. Autor de Inocência (1872), romance regionalista conhecido pela descrição da natureza e dos costumes do interior.'],
['Manuel Antônio de Almeida (1831–1861)','Carioca. Autor de Memórias de um Sargento de Milícias, publicada em folhetins entre 1852 e 1853. A obra tem características diferentes da idealização romântica mais convencional, com humor e retrato do cotidiano.']],
q:[['Qual obra, publicada em folhetins entre 1852 e 1853, foge da idealização romântica convencional?',['Memórias de um Sargento de Milícias','Iracema','O Guarani'],0,'A obra de Manuel Antônio de Almeida tem humor e retrata o cotidiano, sem a idealização típica.']]},
{n:'Sala 7 — Biblioteca',c:0x4a3322,t:0,d:0,lib:1,it:[]},
{n:'Sala Final — Conclusão',c:0x5c4630,t:0,d:0,it:[
['Por que importa?','A prosa romântica ajudou a formar o romance brasileiro, ampliou o público leitor com os folhetins e buscou construir uma identidade nacional a partir de paisagens, costumes e personagens do Brasil.'],
['Revisão dos tipos','• Indianista: o indígena idealizado como herói (O Guarani, Iracema, Ubirajara)\n• Urbano: a vida na cidade e os costumes (A Moreninha, Senhora, Lucíola)\n• Regionalista: regiões e modos de vida (O Sertanejo, Inocência)\n• Histórico: passado e ficção (As Minas de Prata)']],
qt:'Quiz final',
q:[['Qual obra indianista de Alencar conta a história de Iracema e Martim?',['Iracema','Senhora','Inocência'],0,'Iracema (1865) é um dos principais romances indianistas.'],
['Quem escreveu Memórias de um Sargento de Milícias?',['José de Alencar','Manuel Antônio de Almeida','Visconde de Taunay'],1,'A obra é de Manuel Antônio de Almeida.'],
['Que tipo de romance mistura fatos históricos e ficção, como As Minas de Prata?',['Histórico','Urbano','Indianista'],0,'É o romance histórico.'],
['Qual característica é típica da prosa romântica?',['Linguagem científica e neutra','Idealização do amor e valorização dos sentimentos','Rejeição da identidade nacional'],1,'O Romantismo valoriza sentimentos, subjetividade e idealização.'],
['Inocência, de Taunay, é um exemplo de romance...',['Regionalista','Urbano','Histórico'],0,'Inocência retrata o interior do Brasil, por isso é regionalista.']]}
];
const Q7=[['Folhetim','O folhetim era o romance publicado em capítulos nos jornais; os finais com suspense prendiam o leitor.'],['Iracema','O nome Iracema é um anagrama de "América", como o próprio José de Alencar comentou.'],['Paquetá','A Moreninha se passa em grande parte na Ilha de Paquetá, no Rio de Janeiro.'],['Sertão','O sertão aparece como paisagem e modo de vida nos romances regionalistas.'],['Prata','As lendas de minas de prata alimentavam aventuras no Brasil colonial.'],['Biblioteca','Cada autor desta galeria ajudou a construir a literatura brasileira do século XIX.'],['Livros','As obras desta sala são de domínio público, mas edições modernas podem ter proteção. Confira a fonte ao usar.'],['Museu completo','Você encontrou todas as penas de ouro. Parabéns!']];
const BK=[
{t:'O Guarani',a:'José de Alencar',y:'1857',ty:'Romance indianista',col:0x2f6a35,u:'https://files.livrosdominiopublico.com.br/livros/pt/jose-de-alencar/o-guarani.pdf',s:'Publicado em folhetim em 1857. Conta a relação do indígena Peri com a família do fidalgo Dom Antônio de Mariz, em especial o amor de Peri por Ceci. É exemplo do indígena idealizado como herói.'},
{t:'Iracema',a:'José de Alencar',y:'1865',ty:'Romance indianista',col:0x2f6a35,u:'https://files.livrosdominiopublico.com.br/livros/pt/jose-de-alencar/iracema.pdf',s:'Lenda do Ceará. Narra o amor entre a indígena Iracema e o colonizador português Martim, e simboliza o encontro entre europeus e povos nativos.'},
{t:'Ubirajara',a:'José de Alencar',y:'1874',ty:'Romance indianista',col:0x2f6a35,u:'https://digital.bbm.usp.br/handle/bbm/4669',s:'Terceiro romance indianista de Alencar, ambientado antes da chegada dos europeus. Reforça a valorização da natureza e do herói indígena.'},
{t:'A Moreninha',a:'Joaquim Manuel de Macedo',y:'1844',ty:'Romance urbano',col:0x4a4f9a,u:'https://digital.bbm.usp.br/handle/bbm/4000',s:'O estudante de medicina Augusto jura nunca se apaixonar, mas na Ilha de Paquetá conhece Carolina, a moreninha. Obra importante para a consolidação do romance brasileiro.'},
{t:'Senhora',a:'José de Alencar',y:'1875',ty:'Romance urbano',col:0x4a4f9a,u:'https://repositorio.ufu.br/bitstream/123456789/18514/1/SenhoraJos%C3%A9Alencar.pdf',s:'Aurélia, que fica rica após uma herança, arranja o casamento com Fernando Seixas, que antes a havia deixado por interesse. Mostra como dinheiro e aparências interferem nos sentimentos.'},
{t:'Lucíola',a:'José de Alencar',y:'1862',ty:'Romance urbano',col:0x4a4f9a,u:'https://www.lpm.com.br/livros/Imagens/luciola.pdf',s:'Paulo conhece Lúcia, jovem cortesã do Rio de Janeiro. O romance trata de amor, culpa e preconceito social.'},
{t:'Inocência',a:'Visconde de Taunay',y:'1872',ty:'Romance regionalista',col:0xa8742a,u:'https://www.gutenberg.org/ebooks/68635',s:'Inocência, jovem do sertão de Mato Grosso, está prometida a outro homem e se apaixona por Cirino. Amor proibido e descrições detalhadas da paisagem e dos costumes.'},
{t:'Memórias de um Sargento de Milícias',a:'Manuel Antônio de Almeida',y:'1852–1853',ty:'Romance de costumes',col:0x6b1d2a,u:'https://bd.camara.leg.br/items/a83c60c3-b670-464c-8fea-ec26ea7d9c1c',s:'Publicado em folhetins, acompanha as travessuras de Leonardo no Rio de Janeiro do tempo do rei. Tem humor e retrata o cotidiano, sem a idealização romântica convencional.'}];

// ===== cena =====
const scene=new THREE.Scene();scene.background=new THREE.Color(0x1a0f0a);scene.fog=new THREE.Fog(0x1a0f0a,8,38);
const cam=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,80);cam.rotation.order='YXZ';
const COARSE=matchMedia('(pointer:coarse)').matches,PRX=COARSE?1.25:1.5,ren=new THREE.WebGLRenderer({antialias:!COARSE});ren.setPixelRatio(Math.min(devicePixelRatio,PRX));ren.setSize(innerWidth,innerHeight);document.body.prepend(ren.domElement);
scene.add(new THREE.AmbientLight(0xffe0b0,.55));
const L=c=>new THREE.MeshLambertMaterial({color:c}),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d);
function mk(g,m,x,y,z,p){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);(p||scene).add(o);return o}
function cv(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);return new THREE.CanvasTexture(c)}
const rep=(t,a,b)=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(a,b);return t};
const floorM=new THREE.MeshLambertMaterial({map:rep(cv(256,256,(x,w)=>{for(let i=0;i<8;i++){x.fillStyle=`hsl(25,${40+Math.random()*10}%,${17+Math.random()*8}%)`;x.fillRect(0,i*32,w,32);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(0,i*32,w,2);for(let k=0;k<30;k++){x.fillStyle='rgba(0,0,0,.08)';x.fillRect(Math.random()*w,i*32+Math.random()*30,40+Math.random()*60,1)}}}),3,3)});
const wallT=c=>rep(cv(128,128,(x,w,h)=>{x.fillStyle='#'+c.toString(16).padStart(6,'0');x.fillRect(0,0,w,h);x.strokeStyle='rgba(201,162,75,.38)';x.lineWidth=2;x.beginPath();x.moveTo(64,10);x.lineTo(118,64);x.lineTo(64,118);x.lineTo(10,64);x.closePath();x.stroke();x.fillStyle='rgba(201,162,75,.4)';x.fillRect(60,60,8,8)}),5,2);
function wrap(x,t,cx,y,mw,lh){const ws=t.split(' ');let l='',ln=[];ws.forEach(w=>{if(x.measureText(l+' '+w).width>mw&&l){ln.push(l);l=w}else l=(l?l+' ':'')+w});ln.push(l);ln.forEach((s,i)=>x.fillText(s,cx,y+i*lh))}
function art(x,w,h,t){const P=[['#e5c98c','#5a3a22'],['#f3cf85','#2e5a34'],['#e3b48f','#4a4660'],['#f4b968','#9a6a30'],['#a9c3d2','#24445e'],['#d8b86a','#3a2216']][t%6],g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,P[0]);g.addColorStop(1,'#fff3d0');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle=P[1];x.fillRect(0,h*.72,w,h*.28);
if(t==1){x.fillStyle='#ffe9a0';x.beginPath();x.arc(400,50,30,0,7);x.fill();for(let i=0;i<9;i++){x.fillStyle=i%2?'#1f4a28':'#2e6a35';const a=i*58+10;x.beginPath();x.moveTo(a,h*.75);x.lineTo(a+34,h*.3+(i%3)*14);x.lineTo(a+68,h*.75);x.fill()}}
else if(t==2){for(let i=0;i<8;i++){const a=i*64,b=60+(i*37%90);x.fillStyle=i%2?'#4a4660':'#615b7c';x.fillRect(a,h*.72-b,56,b);x.fillStyle='#ffe9a0';for(let k=0;k<b/22;k++)x.fillRect(a+10,h*.72-b+8+k*20,10,10),x.fillRect(a+34,h*.72-b+8+k*20,10,10)}}
else if(t==3){x.fillStyle='#fff0b0';x.beginPath();x.arc(120,110,50,0,7);x.fill();x.fillStyle='#3e6a34';[[330,140],[430,160]].forEach(([a,b])=>{x.fillRect(a,b,12,h*.72-b);x.fillRect(a-18,b+20,8,40);x.fillRect(a-18,b+52,22,8);x.fillRect(a+22,b+10,8,36);x.fillRect(a+8,b+38,22,8)})}
else if(t==4){x.fillStyle='#24445e';x.fillRect(0,h*.62,w,h*.4);x.fillStyle='#5a3a22';x.beginPath();x.moveTo(170,h*.62);x.lineTo(340,h*.62);x.lineTo(310,h*.74);x.lineTo(200,h*.74);x.fill();x.fillRect(252,50,5,h*.62-50);x.fillStyle='#f6ecd0';x.beginPath();x.moveTo(260,56);x.lineTo(330,h*.58);x.lineTo(260,h*.58);x.fill()}
else if(t==5){x.fillStyle='#4a2a1a';x.beginPath();x.arc(w/2,90,42,0,7);x.fill();x.beginPath();x.ellipse(w/2,h+10,100,100,0,0,7);x.fill();x.fillStyle='#eadfc4';x.fillRect(w/2-14,128,28,26)}
else{const C=['#6b1d2a','#2f4630','#c9a24b','#35384f'];for(let i=0;i<10;i++){x.fillStyle=C[i%4];x.fillRect(90+i*32,h*.72-80-(i%3)*18,26,80+(i%3)*18)}}}
const IMG={
'José de Alencar (1829–1877)':'img/jose-alencar.png',
'Joaquim Manuel de Macedo (1820–1882)':'img/joaquim-macedo.png',
'Bernardo Guimarães (1825–1884)':'img/bernardo-guimaraes.png',
'Visconde de Taunay (1843–1899)':'img/visconde-tauney.png',
'Manuel Antônio de Almeida (1831–1861)':'img/manuel-almeida.png'};
function ptex(title,t,num){const c=document.createElement('canvas');const V=t==5,IH=V?580:230,CH=V?700:340;c.width=512;c.height=CH;const x=c.getContext('2d'),tx=new THREE.CanvasTexture(c);
 const draw=im=>{if(im){const s=Math.max(512/im.width,IH/im.height),sw=512/s,sh=IH/s;x.drawImage(im,(im.width-sw)/2,0,sw,sh,0,0,512,IH)}else art(x,512,IH,t);
  x.fillStyle='#2a1710';x.fillRect(0,IH,512,CH-IH);x.fillStyle='#e8c872';x.font='bold 28px Georgia';x.textAlign='center';wrap(x,title,256,IH+36,470,32);x.fillStyle='#b9a37a';x.font='18px Georgia';x.fillText('Pressione E para ler',256,CH-12);x.fillStyle='#c9a24b';x.beginPath();x.arc(52,52,38,0,7);x.fill();x.fillStyle='#2a1710';x.font='bold 30px Georgia';x.textBaseline='middle';x.fillText(num,52,54);x.textBaseline='alphabetic';tx.needsUpdate=true};
 draw();if(IMG[title]){const im=new Image();im.onload=()=>draw(im);im.src=IMG[title]}return tx}

const inter=[],bm=new THREE.InstancedMesh(bx(1,1,1),new THREE.MeshLambertMaterial(),1400);let bi=0;const dm=new THREE.Object3D(),col=new THREE.Color();
function shelf(cx,sx,z){mk(bx(.5,3.1,3.2),L(0x3a2014),cx+sx*5.7,1.55,z);for(let r=0;r<3;r++)for(let k=0;k<16;k++){const h=.35+Math.random()*.2;dm.position.set(cx+sx*5.62,.45+r*.95+h/2,z-1.5+k*.19);dm.scale.set(.32,h,.14);dm.updateMatrix();bm.setMatrixAt(bi,dm.matrix);bm.setColorAt(bi++,col.setHSL(Math.random(),.45,.25+Math.random()*.15))}}
const CY=THREE.CylinderGeometry;
function dc(d,x,z){const g=L(d==1?0x2f6a35:0x4f7a3a);if(d==1){mk(new CY(.12,.18,1.4,8),L(0x4a2a18),x,.7,z);mk(new THREE.ConeGeometry(.9,2.2,8),g,x,2.2,z)}else if(d==2){mk(new CY(.05,.07,2.8,8),L(0x222222),x,1.4,z);mk(new THREE.SphereGeometry(.2,8,8),new THREE.MeshBasicMaterial({color:0xffe9a0}),x,2.9,z)}else if(d==3){mk(new CY(.14,.16,2,8),g,x,1,z);mk(new CY(.09,.09,.8,8),g,x+.3,1.3,z);mk(new CY(.09,.09,.8,8),g,x-.3,1.1,z)}else if(d==4)mk(new CY(.35,.3,.8,10),L(0x6a3d1c),x,.4,z);else mk(new CY(.25,.3,3.4,12),L(0xe8dcc0),x,1.7,z)}
R.forEach((r,i)=>{const cx=i*S,wm=new THREE.MeshLambertMaterial({map:wallT(r.c)});
 mk(new THREE.PlaneGeometry(S,S),floorM,cx,0,0).rotation.x=-Math.PI/2;
 mk(new THREE.PlaneGeometry(S,S),L(0x2a1710),cx,4.5,0).rotation.x=Math.PI/2;
 mk(bx(12.8,4.5,.4),wm,cx,2.25,-6.2);mk(bx(12.8,4.5,.4),wm,cx,2.25,6.2);
 if(i==0)mk(bx(.4,4.5,12.8),wm,-6.2,2.25,0);
 if(i<7){mk(bx(.4,4.5,5.2),wm,cx+6.2,2.25,-3.8);mk(bx(.4,4.5,5.2),wm,cx+6.2,2.25,3.8);mk(bx(.4,1.7,2.4),wm,cx+6.2,3.65,0);[-1.2,1.2].forEach(z=>mk(bx(.2,2.8,.2),L(0xc9a24b),cx+6.2,1.4,z))}else mk(bx(.4,4.5,12.8),wm,cx+6.2,2.25,0);
 const lt=new THREE.PointLight(0xffd9a0,.85,17);lt.position.set(cx,3.8,0);scene.add(lt);
 mk(new THREE.TorusGeometry(.6,.04,6,20),L(0xc9a24b),cx,3.9,0).rotation.x=Math.PI/2;mk(new CY(.015,.015,.6,4),L(0xc9a24b),cx,4.2,0);
 for(let k=0;k<6;k++)mk(new THREE.SphereGeometry(.09,6,6),new THREE.MeshBasicMaterial({color:0xffe2a0}),cx+Math.cos(k)*.6,3.95,Math.sin(k)*.6);
 [-3.6,3.6].forEach(z=>{shelf(cx,1,z);shelf(cx,-1,z)});
 [[-4.6,-4.6],[4.6,-4.6],[-4.6,4.6],[4.6,4.6]].forEach(([a,b])=>dc(r.d,cx+a,b));
 const n=r.it.length,nN=Math.ceil(n/2);
 r.it.forEach((it,j)=>{const N=j<nN,m=N?nN:n-nN,k=N?j:j-nN,px=cx+(k-(m-1)/2)*3.8,pz=N?-5.93:5.93,g=new THREE.Group(),fm=L(0xc9a24b);g.position.set(px,2.2,pz);if(!N)g.rotation.y=Math.PI;scene.add(g);
  const V=r.t==5,pw=V?2.6:3.2,ph=V?3.55:2.1;mk(bx(pw+.2,ph+.2,.1),fm,0,0,0,g);mk(new THREE.PlaneGeometry(pw,ph),new THREE.MeshBasicMaterial({map:ptex(it[0],r.t,(i+1)+'.'+(j+1))}),0,0,.06,g);
  const o={k:'item',r:i,t:it[0],num:(i+1)+'.'+(j+1),x:it[1],pos:new THREE.Vector3(px,2.2,pz),m:fm,stand:{x:px+(N?1.8:-1.8),z:N?-5.93+(V?4.1:3.58):5.93-(V?4.1:3.58),yaw:N?0:Math.PI}};inter.push(o)});
 if(r.q){const pd=new THREE.Group();pd.position.set(cx,0,3.4);scene.add(pd);mk(new CY(.4,.5,1,12),L(0x4a2a18),0,.5,0,pd);const bk=mk(bx(.7,.12,.5),L(0xc9a24b),0,1.08,0,pd);
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:cv(256,64,(x,w,h)=>{x.fillStyle='#2a1710e6';x.fillRect(0,0,w,h);x.strokeStyle='#c9a24b';x.strokeRect(2,2,w-4,h-4);x.fillStyle='#f0d68a';x.font='bold 26px Georgia';x.textAlign='center';x.fillText((i+1)+'.'+(n+1)+' '+(i==7?'Quiz final':'Quiz da sala'),w/2,42)})}));sp.scale.set(1.6,.4,1);sp.position.y=1.7;pd.add(sp);
 const qo={k:'quiz',r:i,t:i==7?'Quiz final':'Quiz da sala',pos:new THREE.Vector3(cx,1,3.4),m:bk.material,stand:{x:cx-1.6,z:.2,yaw:Math.PI}};inter.push(qo)}
 const ql=mk(new THREE.OctahedronGeometry(.18),new THREE.MeshBasicMaterial({color:0xffd24a}),cx+(i%2?-4.9:4.9),.9,[-4.6,4.6,0][i%3]);inter.push({k:'quill',r:i,t:'Pena de ouro',pos:ql.position,mesh:ql,q:Q7[i]});
 if(r.lib)BK.forEach((b,k)=>{const px=cx+[-3.6,-1.2,1.2,3.6][k%4],pz=k<4?-2.6:2.6,g=new THREE.Group();g.position.set(px,1.5,pz);scene.add(g);mk(bx(.9,1.2,.2),L(b.col),0,0,0,g);
  const pm=new THREE.MeshLambertMaterial({map:cv(256,340,(x,w,h)=>{x.fillStyle='#'+b.col.toString(16).padStart(6,'0');x.fillRect(0,0,w,h);x.strokeStyle='#c9a24b';x.lineWidth=6;x.strokeRect(10,10,w-20,h-20);x.fillStyle='#f0d68a';x.textAlign='center';x.font='bold 30px Georgia';wrap(x,b.t,w/2,110,200,36);x.font='20px Georgia';wrap(x,b.a,w/2,h-70,200,24)})});
  mk(new THREE.PlaneGeometry(.82,1.12),pm,0,0,.101,g);const bb=mk(new THREE.PlaneGeometry(.82,1.12),pm,0,0,-.101,g);bb.rotation.y=Math.PI;
  inter.push({k:'book',r:i,t:b.t,pos:g.position,mesh:g,m:pm,b})});
});
bm.instanceMatrix.needsUpdate=true;bm.instanceColor.needsUpdate=true;scene.add(bm);
const dg=new THREE.BufferGeometry(),dp=new Float32Array(900);for(let i=0;i<900;i+=3){dp[i]=Math.random()*100-6;dp[i+1]=.5+Math.random()*3.8;dp[i+2]=Math.random()*12-6}dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
const dust=new THREE.Points(dg,new THREE.PointsMaterial({size:.05,color:0xffe9b0,transparent:true,opacity:.55}));scene.add(dust);

// ===== estado =====
let st='menu',room=-1,yaw=0,pitch=0,pts=0,plumes=0,best=null,low=false,mute=false,AC,T=0;const p={x:0,z:4.2},done={},k={},mv={x:0,y:0,r:0};
const inside=(x,z)=>{for(let i=0;i<8;i++){const c=i*S;if(Math.abs(x-c)<5.6&&Math.abs(z)<5.6)return 1;if(i<7&&x>c+5.4&&x<c+7&&Math.abs(z)<1)return 1}return 0};
const open=()=>$('#card').style.display=='block';
function card(h,b){const c=$('#card');c.innerHTML=`<h2>${h}</h2>${b}`;c.style.display='block';document.body.classList.add('co');$('#prompt').style.display='none';if(document.pointerLockElement)document.exitPointerLock();if(st=='play'){const x=document.createElement('button');x.textContent='Fechar (E)';x.onclick=shut;c.append(x)}}
const shut=()=>{$('#card').style.display='none';document.body.classList.remove('co')};
const hud=()=>{$('#info').textContent=`Sala ${Math.max(room,0)+1}/8 · Acertos ${pts} · Penas ${plumes}/8`};
function banner(t){const b=$('#banner');b.textContent=t;b.style.opacity=1;clearTimeout(banner.h);banner.h=setTimeout(()=>b.style.opacity=0,2800)}
function blip(){if(!AC||mute)return;const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=660;g.gain.setValueAtTime(.05,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.25);o.connect(g).connect(AC.destination);o.start();o.stop(AC.currentTime+.3)}
function music(){if(AC)return;AC=new(window.AudioContext||window.webkitAudioContext)();const ch=[[220,277,329],[196,247,294],[174,220,262],[196,247,330]];let i=0;const pl=()=>{if(mute)return;ch[i++%4].forEach(f=>{const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.03,t+1.5);g.gain.linearRampToValueAtTime(0,t+4.6);o.connect(g).connect(AC.destination);o.start();o.stop(t+4.7)})};pl();setInterval(pl,4000)}
function quiz(ri){const r=R[ri],qs=r.q;let n=0,sc=0;
 const show=()=>{const q=qs[n];card(r.qt||'Pergunta rápida',`<p><b>${n+1}/${qs.length}</b> ${q[0]}</p>`+q[1].map((o,j)=>`<button class="opt" data-k="${j}">${o}</button>`).join('')+'<div id="fb"></div>');
  const bs=$('#card').querySelectorAll('.opt');bs.forEach(b=>b.onclick=()=>{const ok=+b.dataset.k==q[2];bs.forEach(o=>{o.disabled=true;if(+o.dataset.k==q[2])o.classList.add('ok')});if(!ok)b.classList.add('no');if(ok)sc++;
   $('#fb').innerHTML=`<p><b>${ok?'Correto!':'Ainda não.'}</b> ${q[3]}</p>`;const nx=document.createElement('button');nx.textContent=n<qs.length-1?'Próxima':'Ver resultado';nx.onclick=()=>{n++;n<qs.length?show():fin()};$('#fb').append(nx);blip()})};
 const fin=()=>{if(!done[ri]){done[ri]=1;pts+=sc}hud();card(r.qt||'Pergunta rápida',`<p>Você acertou <b>${sc}</b> de ${qs.length}.</p><p>${ri==7?(sc>=4?'Excelente! Você domina a prosa romântica brasileira.':'Bom começo! Revise as salas e tente de novo.'):'Siga para a próxima sala pela porta ao lado.'}</p>`)};show()}
function act(){if(modalOpen())return;if(open()){shut();return}if(st!='play'||!best)return;const o=best;blip();
 if(o.k=='item')card(o.num+' · '+o.t,'<p>'+o.x.replace(/\n/g,'<br>')+'</p>');else if(o.k=='quiz')quiz(o.r);
 else if(o.k=='book')card(o.t,`<p><b>${o.b.a}</b> · ${o.b.y} · ${o.b.ty}</p><p>${o.b.s}</p><p><a href="${o.b.u}" target="_blank" rel="noopener" style="color:#6b1d2a">Ler a obra completa (abre em outra aba)</a></p>`);else{o.mesh.visible=false;o.got=1;plumes++;hud();card('Pena de ouro: '+o.q[0],`<p>${o.q[1]}</p>`)}}
function begin(){$('#start').style.display='none';$('#hud').style.display='flex';music();room=-1;if(st=='menu'){p.x=-5.2;p.z=0;yaw=-Math.PI/2;pitch=0}st='play';document.body.classList.add('playing');shut();hud()}
function modalOpen(){return $('#modal').style.display=='flex'}
function modal(h,b){const m=$('#modal');m.firstElementChild.innerHTML=`<h2>${h}</h2>${b}<button id="mc">Fechar</button>`;m.style.display='flex';$('#mc').onclick=()=>m.style.display='none'}
$('#go').onclick=begin;
$('#hw').onclick=()=>modal('Como jogar','<p><b>WASD</b> ou setas: andar (Shift corre)<br><b>Mouse</b>: olhar (clique na tela para ativar)<br><b>E</b>: ler painéis, responder quizzes e coletar penas de ouro<br><b>Celular</b>: arraste no lado esquerdo da tela para andar (puxe até o limite para correr), arraste no lado direito para olhar e toque no botão E para interagir. Deixe o celular na horizontal e use Tela cheia.</p><p>Objetos interativos brilham quando você se aproxima. Procure as 8 penas de ouro escondidas!</p>');
$('#cr').onclick=()=>modal('Créditos','<p>Prosa Romântica Brasileira — trabalho escolar.</p><p>'+CRED.join('<br>')+'<br><b>Turma '+TURMA+'</b></p>');
$('#bs').onclick=()=>{mute=!mute;if(AC)mute?AC.suspend():AC.resume();$('#bs').textContent='Som: '+(mute?'desligado':'ligado')};
$('#bf').onclick=()=>{low=!low;dust.visible=!low;ren.setPixelRatio(low?1:Math.min(devicePixelRatio,PRX));ren.setSize(innerWidth,innerHeight);$('#bf').textContent=low?'Efeitos completos':'Reduzir efeitos'};
function thanks(){if(document.pointerLockElement)document.exitPointerLock();const m=$('#modal');m.firstElementChild.innerHTML=`<h2>Obrigado!</h2><p>Obrigado pela atenção! Esperamos que esta visita ao museu tenha ajudado a conhecer melhor a prosa romântica brasileira.</p><p><b>Integrantes:</b><br>${CRED.join('<br>')}<br>Turma ${TURMA}</p><button id="tb">Continuar no museu</button><button id="tr">Voltar ao início</button>`;m.style.display='flex';$('#tb').onclick=()=>m.style.display='none';$('#tr').onclick=()=>location.reload()}
$('#fin').onclick=thanks;if(!COARSE)$('#fin').textContent+=' (F)';
addEventListener('keydown',e=>{k[e.code]=1;if(e.code=='KeyE')act();else if(e.code=='Escape'&&open()&&st=='play')shut();else if(e.code=='KeyF'&&room==7&&st=='play'&&!open()&&!modalOpen())thanks()});
addEventListener('keyup',e=>k[e.code]=0);
const cvn=ren.domElement;
cvn.addEventListener('click',()=>{if(st=='play'&&!open()&&!matchMedia('(pointer:coarse)').matches)cvn.requestPointerLock()});
addEventListener('mousemove',e=>{if(document.pointerLockElement&&st=='play'){yaw-=e.movementX*.0025;pitch=Math.max(-1.3,Math.min(1.3,pitch-e.movementY*.0025))}});
if(COARSE)document.body.classList.add('touch');
const joy=$('#joy'),knob=$('#knob'),JR=56;let jid=null,lid=null,jo={x:0,y:0},ll={x:0,y:0};
const joyPos=(x,y,on)=>{joy.style.left=(x-65)+'px';joy.style.top=(y-65)+'px';joy.style.opacity=on?1:.3};
const joyIdle=()=>joyPos(95,innerHeight-115,false);joyIdle();
cvn.addEventListener('touchstart',e=>{e.preventDefault();if(st!='play'||open())return;for(const t of e.changedTouches){if(t.clientX<innerWidth*.45&&jid===null){jid=t.identifier;jo={x:t.clientX,y:t.clientY};joyPos(t.clientX,t.clientY,true)}else if(lid===null){lid=t.identifier;ll={x:t.clientX,y:t.clientY}}}},{passive:false});
cvn.addEventListener('touchmove',e=>{e.preventDefault();if(st!='play')return;for(const t of e.changedTouches){if(t.identifier===jid){let dx=(t.clientX-jo.x)/JR,dy=(t.clientY-jo.y)/JR;const l=Math.hypot(dx,dy);mv.r=Math.min(l,1.2);if(l>1){dx/=l;dy/=l}mv.x=dx;mv.y=dy;knob.style.transform=`translate(${dx*34}px,${dy*34}px)`}else if(t.identifier===lid){yaw-=(t.clientX-ll.x)*.0055;pitch=Math.max(-1.3,Math.min(1.3,pitch-(t.clientY-ll.y)*.0055));ll={x:t.clientX,y:t.clientY}}}},{passive:false});
const tend=e=>{for(const t of e.changedTouches){if(t.identifier===jid){jid=null;mv.x=mv.y=mv.r=0;knob.style.transform='';joyIdle()}if(t.identifier===lid)lid=null}};
cvn.addEventListener('touchend',tend);cvn.addEventListener('touchcancel',tend);
$('#eb').addEventListener('touchstart',e=>{e.preventDefault();act()},{passive:false});$('#eb').onclick=act;$('#prompt').onclick=act;
const fit=()=>{cam.aspect=innerWidth/innerHeight;cam.fov=cam.aspect<1?88:70;cam.updateProjectionMatrix();ren.setSize(innerWidth,innerHeight);if(jid===null)joyIdle()};addEventListener('resize',fit);fit();

const fsOn=()=>document.fullscreenElement||document.webkitFullscreenElement;
function toggleFS(){const d=document,e=d.documentElement;if(fsOn()){(d.exitFullscreen||d.webkitExitFullscreen).call(d);return}const r=e.requestFullscreen||e.webkitRequestFullscreen;if(!r){modal('Tela cheia','<p>Este navegador não permite tela cheia nesta página. No iPhone, gire o aparelho para a horizontal ou use o navegador no modo de tela inteira.</p>');return}const pr=r.call(e);if(pr&&pr.then)pr.then(()=>{try{screen.orientation.lock('landscape').catch(()=>{})}catch(_){}}).catch(()=>{})}
document.querySelectorAll('.fsb').forEach(b=>b.onclick=toggleFS);
['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>document.querySelectorAll('.fsb').forEach(b=>b.textContent=fsOn()?'Sair da tela cheia':'Tela cheia')));
let last=performance.now();
function loop(now){requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1e3);last=now;T+=dt;
 if(st=='menu'){p.x=Math.sin(T*.2)*2;p.z=2.5;yaw=Math.sin(T*.15)*.5;pitch=0}
 else if(!open()&&!modalOpen()){let ax=(k.KeyD||k.ArrowRight?1:0)-(k.KeyA||k.ArrowLeft?1:0)+mv.x,az=(k.KeyS||k.ArrowDown?1:0)-(k.KeyW||k.ArrowUp?1:0)+mv.y;const l=Math.hypot(ax,az);if(l>1){ax/=l;az/=l}
  const sp=(k.ShiftLeft||mv.r>1?6:3.6)*dt,fx=-Math.sin(yaw),fz=-Math.cos(yaw),nx=p.x+(Math.cos(yaw)*ax-fx*az)*sp,nz=p.z+(-Math.sin(yaw)*ax-fz*az)*sp;if(inside(nx,p.z))p.x=nx;if(inside(p.x,nz))p.z=nz}
 cam.position.set(p.x,1.65,p.z);cam.rotation.set(pitch,yaw,0);
 if(st!='menu'){const ri=Math.max(0,Math.min(7,Math.round(p.x/S)));if(ri!=room){room=ri;banner(R[ri].n);hud();$('#fin').style.display=ri==7?'block':'none'}}
 best=null;if(st=='play'&&!open()){const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let bs=9;for(const o of inter){if(o.got)continue;const dx=o.pos.x-p.x,dz=o.pos.z-p.z,d=Math.hypot(dx,dz);if(d<.1||d>(o.k=='item'?4.2:o.k=='book'?3.2:2.6))continue;if(o.k!='quill'&&o.k!='book'&&(dx*fx+dz*fz)/d<.5)continue;if(d<bs){bs=d;best=o}}}
 for(const o of inter)if(o.m)o.m.emissive.setHex(o===best?0x775500:0);
 const pr=$('#prompt');if(best){pr.style.display='block';pr.textContent='E — '+(best.k=='item'?'ler: ':best.k=='quiz'?'responder: ':best.k=='book'?'abrir: ':'coletar: ')+(best.num?best.num+' · ':'')+best.t}else pr.style.display='none';$('#eb').classList.toggle('ready',!!best);
 inter.forEach(o=>{if(o.mesh){o.mesh.rotation.y+=dt*(o.k=='book'?.6:2);o.mesh.position.y=(o.k=='book'?1.5:.9)+Math.sin(T*2+o.r)*.08}});
 if(!low){const a=dg.attributes.position;for(let i=1;i<900;i+=3){dp[i]+=dt*.04;if(dp[i]>4.2)dp[i]=.5}a.needsUpdate=true}
 ren.render(scene,cam)}
requestAnimationFrame(loop);