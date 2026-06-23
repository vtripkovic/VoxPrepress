const content = {
  en: {
    'nav.home':'Home',
    'nav.blog':'Blog',
    'nav.portfolio':'Portfolio',
    'nav.contact':'Contact',
    'home.title': 'Print design & prepress — professional finishing',
    'home.lead': 'We encompass the complete preparation of artwork and production files for professional printing and finishing processes. This includes creating and adapting print-ready layouts, ensuring correct color management (CMYK, spot colors, color profiles), image optimization, bleed and trim setup, imposition, and technical verification of files before production. Our key responsibilities include: \n\nPrint-ready artwork preparation and quality control \nPreflight checks and file troubleshooting \nColor correction and color management for offset, digital, and large-format printing \nImposition and production workflow management \nPackaging and label design preparation with dielines \nVariable data printing setup and verification \nCoordination with production teams and print vendors \nProofing, press checks, and production approval processes \nPreparation of materials for finishing operations including cutting, folding, binding, laminating, varnishing, embossing, and foil application \nOptimization of production workflows to ensure efficiency, consistency, and high-quality output \n\nThe goal of print design and prepress is to ensure that every printed product is produced accurately, efficiently, and according to technical specifications while maintaining the highest standards of print quality and finishing.\n\n',
    'services.book':'Books / Layout',
    'services.flyer':'Flyers',
    'services.poster':'Posters',
    'services.wobbler':'Wobblers',
    'services.bulletin':'Bulletins',
    'services.vcard':'Business Cards',
    'blog.title':'Blog — Preparing artwork for print',
    'portfolio.title':'Portfolio',
    'contact.title':'Contact',
    'contact.name':'Name',
    'contact.email':'Email',
    'contact.message':'Message',
    'contact.send':'Send Message',
    'footer.emailLabel':'Email',
    'footer.phoneLabel':'Phones',
    'footer.whereLabel':'Where'
  },
  sr: {
    'nav.home':'Početna',
    'nav.blog':'Blog',
    'nav.portfolio':'Portfolio',
    'nav.contact':'Kontakt',
    'home.title': 'Dizajn za štampu i prepress — profesionalna dorada',
    'home.lead': 'Obuhvatamo kompletnu pripremu grafičkih rešenja i produkcionih fajlova za profesionalne procese štampe i dorade. To uključuje izradu i prilagođavanje fajlova spremnih za štampu, pravilno upravljanje bojama (CMYK, spot boje, kolor profili), optimizaciju slika, podešavanje prepusta za sečenje (bleed) i linija sečenja, montažu tabaka (imposition) i tehničku proveru fajlova pre proizvodnje. Naše ključne odgovornosti uključuju: \nPripremu grafičkih rešenja spremnih za štampu i kontrolu kvaliteta \nPreflight proveru i rešavanje problema sa fajlovima \nKorekciju boja i upravljanje bojama za ofset, digitalnu i velikofromatnu štampu \nMontažu tabaka i upravljanje produkcionim tokom rada \nPripremu dizajna ambalaže i etiketa sa tehničkim krojnim linijama (dielines) \nPodešavanje i proveru štampe promenljivih podataka (variable data printing) \nKoordinaciju sa produkcionim timovima i štamparijama \nIzradu i proveru probnih otisaka, kontrolu tokom štampe i odobravanje proizvodnje \nPripremu materijala za doradne procese uključujući sečenje, savijanje, povezivanje, plastifikaciju, lakiranje, embosiranje i aplikaciju folije \nOptimizaciju produkcionih procesa radi postizanja efikasnosti, doslednosti i visokog kvaliteta finalnog proizvoda \nCilj print dizajna i prepress pripreme je da svaki štampani proizvod bude izrađen precizno, efikasno i u skladu sa tehničkim specifikacijama, uz održavanje najviših standarda kvaliteta štampe i dorade.\n\n',
    'services.book':'Knjige / Prelom',
    'services.flyer':'Flajeri',
    'services.poster':'Posteri',
    'services.wobbler':'Vobleri',
    'services.bulletin':'Bilteni',
    'services.vcard':'Vizit Karte',
    'blog.title':'Blog — Priprema za štampu',
    'portfolio.title':'Portfolio',
    'contact.title':'Kontakt',
    'contact.name':'Ime',
    'contact.email':'Email',
    'contact.message':'Poruka',
    'contact.send':'Pošalji poruku',
    'footer.emailLabel':'Email',
    'footer.phoneLabel':'Telefoni',
    'footer.whereLabel':'Gde se nalazimo'
  }
}

function setLang(lang='en'){
  document.documentElement.lang = (lang==='sr')? 'sr' : 'en';
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(n => {
    const key = n.getAttribute('data-i18n');
    if(content[lang] && content[lang][key]){
      const val = content[lang][key];
      // Special handling for the home lead: render first paragraph + bullet list
      if(key === 'home.lead'){
        const escape = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        // More robust parsing: find the responsibility-heading (ENG or SR) in the text regardless of spacing,
        // then treat following lines as the list block and any further double-newline-separated text as outro.
        const valStr = String(val || '');
        let intro = '';
        let headingLine = '';
        let listBlock = '';
        let outro = '';
        const headingSearch = valStr.match(/\b(?:Our key responsibilities include:|Naše ključne odgovornosti uključuju:)/i);
        if(headingSearch){
          const idx = headingSearch.index;
          intro = valStr.slice(0, idx).trim();
          headingLine = headingSearch[0].trim();
          const after = valStr.slice(idx + headingSearch[0].length).trim();
          const afterParts = after.split(/\n{2,}/).map(p=>p.trim()).filter(Boolean);
          listBlock = afterParts[0] || '';
          outro = afterParts.slice(1).join('\n\n') || '';
        } else {
          const parts = valStr.split(/\n{2,}/).map(p=>p.trim()).filter(Boolean);
          intro = parts[0] || '';
          listBlock = parts[1] || '';
          outro = parts.length > 2 ? parts.slice(2).join('\n\n') : '';
        }
        const items = listBlock ? listBlock.split(/\n+/).map(i=>i.trim()).filter(Boolean) : [];
        // If the last item looks like a closing 'goal' sentence (English or Serbian), treat it as outro instead of a list item
        if(items.length){
          const last = items[items.length-1];
          if(/^(?:The goal|Cilj)\b/i.test(last)){
            // pop from items and append to outro (preserve existing outro)
            const popped = items.pop();
            outro = (outro? popped + '\n\n' + outro : popped);
          }
        }
        let html = '';
        if(intro) html += `<p>${escape(intro)}</p>`;
        if(headingLine) html += `<p>${escape(headingLine)}</p>`;
        if(items.length){
          html += '<ul>' + items.map(it=>`<li>${escape(it)}</li>`).join('') + '</ul>';
        }
        if(outro) html += `<p>${escape(outro)}</p>`;
        n.innerHTML = html;
      } else {
        n.textContent = val;
      }
    }
  });
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.remove('active'));
  document.getElementById(lang==='sr'? 'lang-sr':'lang-en').classList.add('active');
}

// Sample posts (both languages)
const postsData = [
  {
    id:1,
    en:{
      title:'Preparing PDF for offset',
      lead:'Complete preparation of a file for offset printing involves several technical steps to ensure reliable, predictable press results. This includes converting and managing colors into the appropriate CMYK profile, preserving spot colors where needed, and setting total ink limits and compensation for dot gain. Images must be at proper resolution (typically 300 dpi for offset at final size) and embedded with correct ICC profiles. Bleed (usually 3–5 mm) should be added beyond the trim line, and crop marks, registration marks and color control bars included.\n\nFonts must be embedded or converted to outlines to prevent missing-font issues at the printer. A thorough preflight check should identify transparency issues, problematic blends, hairline strokes, scaling problems and any low-resolution or missing images. It is recommended to produce standardized PDF outputs (e.g., PDF/X-1a or PDF/X-4) according to the printer’s requirements and to run proofs for color and output verification.\n\nAdditionally, check overprint settings, mark any finishing operations (varnish, foil, die-cuts) and coordinate page imposition so that trimming and binding produce correct results. The end goal is a technically sound file that minimizes press interventions and yields consistent, high-quality printed products.'
    },
    sr:{
      title:'Priprema PDF-a za ofset',
      lead:'Kompletna priprema fajla za ofset štampu podrazumeva niz tehničkih koraka kako bi se obezbedio pouzdan i predvidiv rezultat na štampi. To uključuje konverziju i upravljanje bojama u odgovarajući CMYK profil, proveru i očuvanje spot boja, kao i podešavanje maksimalnog opterećenja mastila (total ink limit) i kompenzaciju za dot gain. Sve slike treba da budu u odgovarajućoj rezoluciji (obično 300 dpi za ofset), u pravilnom kolor prostoru i sa ugrađenim profilima. Potrebno je dodati prepust (bleed) obično 3-5 mm izvan linije sečenja i uključiti crop markove, registration markove i kontrolne trake za boje. Fontovi moraju biti ugrađeni ili pretvoreni u oblike kako bi se izbegli problemi sa nedostajućim fontovima na strani tiskare. Preflight provera treba da otkrije prozirnosti, neuobičajene blendove, hairline linije, skaliranje i eventualne niskorezolutne slike ili nepotpune elemente. Preporučuje se upotreba standardizovanih PDF formata (npr. PDF/X-1a ili PDF/X-4) prema zahtevima tiskare i izvođenje probnog otiska (proof) radi verifikacije boja i izvedbe. Dodatno, treba proveriti postavke za overprint, označiti elemente za doradu (lak, folija, selektivno sečenje) i koordinisati impoziciju stranica za ispravno sečenje i povezivanje. Konačni cilj je isporučiti tehnički potpuno ispravan fajl koji minimizira intervencije na tiskarskoj mašini i omogućava predvidiv kvalitet finalnog proizvoda.'
    }
  },
  {
    id:2,
    en:{
      title:'Images & resolution',
      lead:'Resolution and color profiles are fundamental to print quality. For offset printing, aim for at least 300 DPI (dots per inch) at final output size; for large-format prints (billboards) lower effective DPI is acceptable because they are viewed from a distance. Images should be prepared in the appropriate color space (typically CMYK for offset) with embedded ICC profiles so color conversions are predictable. Correct image resolution prevents softness or pixelation in the final print.\n\nWhen editing images, avoid upscaling low-resolution files; use originals at full resolution or vector artwork where possible. Keep compression minimal for final files — prefer TIFF or high-quality PDFs over heavily compressed JPEGs.\n\nColor profiles (ICC) enable consistent color between monitor and press. Calibrate your monitor and use soft-proofing with the printer’s profile when available. Convert RGB to CMYK thoughtfully; many vivid RGB colors cannot be reproduced in CMYK and will require adjustment and proofing.\n\nAlso manage layers, alpha channels and transparencies carefully — flattening or rasterization can alter colors and edge sharpness. Finally, always produce a contract proof and verify files with the printer before production.'
    },
    sr:{
      title:'Slike i rezolucija',
      lead:'Rezolucija i kolor profili su ključni za kvalitet štampe. Za ofset štampu preporučuje se najmanje 300 DPI (dots per inch) za finalne slike pri stvarnoj veličini otiska; za veliki format (bilbordi) prihvatljive su niže vrednosti jer se gledaju iz daljine. Slike moraju biti pripremljene u odgovarajućem kolor prostoru (obično CMYK za ofset) sa ugrađenim ICC profilom kako bi boje bile predvidive prilikom konverzije. Pravilna kontrola rezolucije znači da izlazna slika doprinosi oštrom renderovanju detalja i sprečava neželjeno zamućenje ili pixelizaciju.\n\nPrilikom prerade slika, izbegavajte skaliranje niskorezolutnih fajlova na veću dimenziju — umesto toga, koristite originalne slike visoke rezolucije ili vektorske elemente gde je to moguće. Kompresija (npr. JPEG) treba da bude minimalna za finalne fajlove; savetuje se rad u TIFF ili visoko kvalitetnom PDF-u sa minimalnim gubitkom kompresije.\n\nKolor profili (ICC) omogućavaju dosledan prikaz boje između monitora i štampe. Rad na monitoru treba obuhvatiti kalibraciju i soft-proofing koristeći profil štamparije kada je moguće. Konverzija iz RGB u CMYK treba da se odradi pažljivo, proveravajući prelaze i zasićenja boja — neke jarke RGB boje neće biti reproducibilne u CMYK, pa je potrebno izvršiti prilagodbe i probne otiske.\n\nTakođe obratite pažnju na upravljanje slojevima, alfa kanale i prozirnosti — rasterizacija i flattening mogu promeniti izgled boja ili uticati na oštrinu. Na kraju, uvek napravite kontrolni probni otisak (proof) i proverite fajl sa štamparijom pre slanja u produkciju.'
    }
  }
];

function renderPosts(lang='en'){
  const el = document.getElementById('posts');
  el.innerHTML = '';
  postsData.forEach(p => {
    const div = document.createElement('article');
    div.className = 'post';
    const title = document.createElement('h3');
    title.textContent = p[lang].title;
    // Split lead into multiple paragraphs for readability
    const leadText = String(p[lang].lead || '').trim();
    const leadContainer = document.createElement('div');
    leadContainer.className = 'post-lead';
    if(leadText.length){
      // If author provided explicit paragraph breaks, use them
      if(/\n{2,}/.test(leadText)){
        leadText.split(/\n{2,}/).map(s=>s.trim()).filter(Boolean).forEach(par => {
          const pEl = document.createElement('p'); pEl.textContent = par; leadContainer.appendChild(pEl);
        });
      } else {
        // Otherwise split into sentences and group ~2 sentences per paragraph
        const sentences = leadText.split(/(?<=\.|\?|!)\s+/).map(s=>s.trim()).filter(Boolean);
        for(let i=0;i<sentences.length;i+=2){
          const part = sentences[i] + (sentences[i+1]? ' ' + sentences[i+1] : '');
          const pEl = document.createElement('p'); pEl.textContent = part.trim(); leadContainer.appendChild(pEl);
        }
      }
    }
    div.appendChild(title);
    div.appendChild(leadContainer);
    el.appendChild(div);
  });
}

function renderPortfolio(){
  const grid = document.getElementById('portfolioGrid');
  grid.innerHTML = '';
  // add ARIA role for better semantics
  grid.setAttribute('role', 'list');
  for(let i=1;i<=8;i++){
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.setAttribute('role','listitem');
    item.setAttribute('tabindex','0');
    item.setAttribute('aria-label','Portfolio project '+i);

    const card = document.createElement('div'); card.className='card';

    // Use SVG placeholders in assets/portfolio-N.svg (generated below). Browsers will load the SVG directly.
    const picture = document.createElement('picture');
    const img = document.createElement('img'); img.className = 'portfolio-img'; img.src = `assets/portfolio-${i}.svg`; img.alt = 'Project '+i; img.loading = 'lazy';
    picture.appendChild(img);

    const caption = document.createElement('div'); caption.className = 'card-caption'; caption.style.padding='.5rem'; caption.innerText = 'Project '+i;
    card.appendChild(picture);
    card.appendChild(caption);

    item.appendChild(card);
    // data-index used by lightbox
    item.dataset.index = i-1;
    grid.appendChild(item);
  }
}

// Lightbox implementation
function initLightbox(){
  if(document.getElementById('lightbox')) return;
  const lb = document.createElement('div'); lb.id = 'lightbox';
  lb.setAttribute('role','dialog'); lb.setAttribute('aria-hidden','true'); lb.setAttribute('aria-label','Portfolio viewer');
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">✕</button>
    <div class="lb-controls">
      <button class="lb-btn lb-prev" aria-label="Previous">◀</button>
      <button class="lb-btn lb-next" aria-label="Next">▶</button>
    </div>
    <div class="lb-inner">
      <img src="" alt="" />
      <div class="lb-caption"></div>
    </div>
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('img');
  const captionEl = lb.querySelector('.lb-caption');
  const closeBtn = lb.querySelector('.lb-close');
  const prevBtn = lb.querySelector('.lb-prev');
  const nextBtn = lb.querySelector('.lb-next');

  let current = 0;
  const items = Array.from(document.querySelectorAll('.portfolio-item'));

  function show(index){
    const it = items[index]; if(!it) return;
    const pic = it.querySelector('img');
    imgEl.src = pic ? pic.src : '';
    imgEl.alt = it.querySelector('.card-caption') ? it.querySelector('.card-caption').innerText : '';
    captionEl.textContent = imgEl.alt || '';
    lb.classList.add('show'); lb.setAttribute('aria-hidden','false');
    current = index;
    // focus on close for immediate keyboard interaction
    closeBtn.focus();
  }
  function hide(){ lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); }

  // attach triggers
  items.forEach((it, idx)=>{
    it.addEventListener('click', ()=> show(idx));
    it.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(idx); } });
  });

  closeBtn.addEventListener('click', hide);
  prevBtn.addEventListener('click', ()=> show((current - 1 + items.length) % items.length));
  nextBtn.addEventListener('click', ()=> show((current + 1) % items.length));

  document.addEventListener('keydown', (e)=>{
    if(!document.getElementById('lightbox')) return;
    if(document.getElementById('lightbox').classList.contains('show')){
      if(e.key === 'Escape') hide();
      if(e.key === 'ArrowLeft') prevBtn.click();
      if(e.key === 'ArrowRight') nextBtn.click();
    }
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  // Initial language
  let lang = 'en';
  setLang(lang);
  renderPosts(lang);
  renderPortfolio();
  // initialize lightbox after portfolio elements are rendered
  initLightbox();

  document.getElementById('lang-en').addEventListener('click',()=>{ setLang('en'); renderPosts('en'); });
  document.getElementById('lang-sr').addEventListener('click',()=>{ setLang('sr'); renderPosts('sr'); });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', ()=> mainNav.classList.toggle('show'));

  // Header shrink on scroll
  const header = document.querySelector('.site-header');
  const onScroll = ()=>{
    if(window.scrollY > 24) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Scroll reveal for sections
  const sections = document.querySelectorAll('.section');
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  sections.forEach(s=>revealObserver.observe(s));
  // show hero immediately
  const hero = document.querySelector('.hero'); if(hero) hero.classList.add('visible');

  // Ensure main starts at the home section on load
  const mainEl = document.querySelector('main');
  setTimeout(()=>{
    if(mainEl){
      // if there's a hash, let normal behavior; otherwise force to top/home
      if(!location.hash || location.hash === '#' || location.hash === '#home'){
        try{ mainEl.scrollTo({top:0, behavior:'instant'}); }catch(e){ mainEl.scrollTop = 0; }
        const homeEl = document.querySelector('#home'); if(homeEl) homeEl.scrollIntoView({block:'start'});
      }
    }
  }, 50);

  // Smooth nav: scroll to sections inside the scroll container
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  function setActiveNavById(id){
    navLinks.forEach(a=>{
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === ('#'+id));
    });
  }

  // default active
  setActiveNavById('home');

  navLinks.forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      mainNav.classList.remove('show');
      // mark clicked nav as active immediately
      setActiveNavById(id.replace('#',''));
    });
  });

  // Hide native scrollbar on main and add section indicators
  if(mainEl) mainEl.classList.add('no-scrollbar');

  // Create indicators dynamically
  const indicators = document.createElement('div');
  indicators.className = 'section-indicators';
  const sectionEls = Array.from(document.querySelectorAll('.section'));
  sectionEls.forEach((sec, idx)=>{
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Section '+(idx+1));
    btn.dataset.index = idx;
    btn.addEventListener('click', ()=>{
      sec.scrollIntoView({behavior:'smooth', block:'start'});
    });
    indicators.appendChild(btn);
  });
  document.body.appendChild(indicators);

  // Observe sections to update active indicator
  const indicatorButtons = indicators.querySelectorAll('button');
  const indicatorObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const i = sectionEls.indexOf(entry.target);
        indicatorButtons.forEach(b=>b.classList.toggle('active', b.dataset.index == i));
      }
    });
  },{threshold:0.6});
  sectionEls.forEach(s => indicatorObserver.observe(s));

  // Observe sections to update active nav link as user scrolls
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        setActiveNavById(entry.target.id);
      }
    });
  },{threshold:0.6});
  sectionEls.forEach(s=>navObserver.observe(s));

  // Contact form: simple mailto fallback (replace with server endpoint if needed)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const to = document.getElementById('footerEmail').textContent.trim();
    const subject = encodeURIComponent('Website contact from '+name+' ('+email+')');
    const body = encodeURIComponent(message);
    // open user's email client
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });

  // set year
  document.getElementById('year').textContent = new Date().getFullYear();
});
