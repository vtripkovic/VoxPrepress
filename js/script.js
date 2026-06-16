const content = {
  en: {
    'home.title': 'Print design & prepress — professional finishing',
    'home.lead': 'We prepare files correctly for offset, digital, screen and flexo printing. Layouts for books, flyers, posters, wobblers, bulletins and business cards.',
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
    'home.title': 'Dizajn za štampu i prepress — profesionalna dorada',
    'home.lead': 'Pripremamo fajlove za ofset, lasersku, sito i flexo štampu. Prelom knjiga, flajeri, posteri, vobleri, bilteni i vizitkarte.',
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
    if(content[lang] && content[lang][key]) n.textContent = content[lang][key];
  });
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.remove('active'));
  document.getElementById(lang==='sr'? 'lang-sr':'lang-en').classList.add('active');
}

// Sample posts (both languages)
const postsData = [
  {id:1, en:{title:'Preparing PDF for offset',lead:'Key settings and bleed, CMYK, trapping.'}, sr:{title:'Priprema PDF-a za ofset',lead:'Osnovna podešavanja: bleed, CMYK, trapping.'}},
  {id:2, en:{title:'Images & resolution',lead:'What DPI and color profiles to use.'}, sr:{title:'Slike i rezolucija',lead:'Koji DPI i kolor profili su preporučeni.'}}
];

function renderPosts(lang='en'){
  const el = document.getElementById('posts');
  el.innerHTML = '';
  postsData.forEach(p => {
    const div = document.createElement('article');
    div.className = 'post';
    const title = document.createElement('h3');
    title.textContent = p[lang].title;
    const lead = document.createElement('p');
    lead.textContent = p[lang].lead;
    div.appendChild(title);div.appendChild(lead);
    el.appendChild(div);
  });
}

function renderPortfolio(){
  const grid = document.getElementById('portfolioGrid');
  grid.innerHTML = '';
  for(let i=1;i<=6;i++){
    const card = document.createElement('div');card.className='card';
    const thumb = document.createElement('div');thumb.className='thumb';
    const caption = document.createElement('div');caption.style.padding='.5rem';caption.innerText = 'Project '+i;
    card.appendChild(thumb);card.appendChild(caption);grid.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  // Initial language
  let lang = 'en';
  setLang(lang);
  renderPosts(lang);
  renderPortfolio();

  document.getElementById('lang-en').addEventListener('click',()=>{ setLang('en'); renderPosts('en'); });
  document.getElementById('lang-sr').addEventListener('click',()=>{ setLang('sr'); renderPosts('sr'); });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', ()=> mainNav.classList.toggle('show'));

  // Smooth nav
  document.querySelectorAll('[data-nav]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
      mainNav.classList.remove('show');
    });
  });

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
