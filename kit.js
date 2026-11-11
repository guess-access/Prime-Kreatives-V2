/* Prime Kreatives kit.js â€” shared header, footer, year, nav toggle and form
   handling. One file for all three sites; each page sets <body data-site>. */
(function(){

var S={
main:{n:'Prime Kreatives',s:'',h:'/',t:'Where vision meets execution',m:'info@primekreatives.com',
 nav:[['Services','/services'],['Process','/process'],['Portfolio','/portfolio/'],['Digital','/digital/'],['Book a call','/discovery-call','cta']]},
portfolio:{n:'Prime Kreatives',s:'Portfolio, Peter Lee',h:'/portfolio/',t:'Proof, not promises.',m:'info@primekreatives.com',
 nav:[['About','/portfolio/#about'],['Work samples','/portfolio/#work'],['Testimonials','/portfolio/#testimonials'],['Main site','/'],['Book a call','/discovery-call','cta']]},
digital:{n:'Prime Kreatives',s:'Digital',h:'/digital/',t:'Ready-made. Automated. Always in reach.',m:'productsupport@primekreatives.com',
 nav:[['Products','/digital/#products'],['Buyer guidelines','/digital/guidelines'],['Main site','/']]},
};

function headerLogo(){return '<img src="/assets/logo-header.png" alt="Prime Kreatives" width="161" height="40">';}
function footerLogo(){return '<img src="/assets/logo-footer.png" alt="Prime Kreatives" width="240" height="58">';}

var c=S[document.body.dataset.site||'main'];

/* ---------- header ---------- */
var h=document.getElementById('site-header');
if(h){
  h.innerHTML='<a class="skip" href="#main">Skip to content</a>'
    +'<div class="bar wrap">'
      +'<a class="brand" href="'+c.h+'">'+headerLogo()+(c.s?'<small>'+c.s+'</small>':'')+'</a>'
      +'<button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>'
      +'<nav id="site-nav" aria-label="Main">'
        +c.nav.map(function(l){return '<a href="'+l[1]+'"'+(l[2]?' class="'+l[2]+'"':'')+'>'+l[0]+'</a>'}).join('')
      +'</nav>'
    +'</div>';

  var t=h.querySelector('.nav-toggle');
  if(t)t.addEventListener('click',function(){
    var open=h.hasAttribute('data-open');
    if(open)h.removeAttribute('data-open');else h.setAttribute('data-open','');
    t.setAttribute('aria-expanded',String(!open));
  });
  Array.prototype.forEach.call(h.querySelectorAll('nav a'),function(a){
    a.addEventListener('click',function(){
      h.removeAttribute('data-open');
      if(t)t.setAttribute('aria-expanded','false');
    });
  });

  /* shadow on scroll */
  var onScroll=function(){h.classList.toggle('scrolled',window.scrollY>8);};
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
}

/* ---------- footer ----------
   Layout and copy follow the original site: brand + bio + social,
   an Explore column, a Get in touch column, then a centred base line. */
function icon(slug){
  return '<img src="https://cdn.simpleicons.org/'+slug+'/DDB568" alt="" width="19" height="19">';
}
/* LinkedIn is inlined: simple-icons no longer serves it from their CDN. */
var LINKEDIN_SVG='<svg viewBox="0 0 24 24" width="19" height="19" fill="#DDB568" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

var SOCIAL=[
  ['GitHub','https://github.com/guess-access',icon('github')],
  ['LinkedIn','https://www.linkedin.com/in/peter-lee-ba32251ba',LINKEDIN_SVG],
  ['Facebook','https://www.facebook.com/prime.kreatives17',icon('facebook')],
  ['Instagram','https://www.instagram.com/prime.kreatives',icon('instagram')]
];

var f=document.getElementById('site-footer');
if(f){
  var year=new Date().getFullYear();
  f.innerHTML='<div class="wrap foot-grid">'
    +'<div class="foot-brand">'+footerLogo()
      +'<p class="foot-bio">Client success &amp; executive operations with a creative eye &mdash; reporting, SOPs and brand work that make your business look sharp.</p>'
      +'<div class="foot-social">'
        +SOCIAL.map(function(s){
          return '<a href="'+s[1]+'" target="_blank" rel="noopener" aria-label="'+s[0]+'">'+s[2]+'</a>';
        }).join('')
      +'</div>'
    +'</div>'
    +'<div>'
      +'<div class="foot-h">Explore</div>'
      +'<ul class="foot-links">'
        +c.nav.map(function(l){return '<li><a href="'+l[1]+'">'+l[0]+'</a></li>'}).join('')
        +'<li><a href="/privacy-policy">Privacy</a></li>'
        +'<li><a href="/terms-legal-policy">Terms</a></li>'
      +'</ul>'
    +'</div>'
    +'<div>'
      +'<div class="foot-h">Get in touch</div>'
      +'<div class="foot-contact">'
        +'<a href="mailto:'+c.m+'">'+c.m+'</a>'
        +'<a href="mailto:clientsupport@primekreatives.com">clientsupport@primekreatives.com</a>'
        +'<a href="tel:+639691556228">+63 969 155 6228</a>'
        +'<span>Cebu City, Philippines</span>'
      +'</div>'
    +'</div>'
  +'</div>'
  +'<div class="wrap"><div class="foot-base">&copy; <span>'+year+'</span> Prime Kreatives. All rights reserved. <span class="foot-sep">&middot;</span> <a href="/privacy-policy">Privacy</a> <span class="foot-sep">&middot;</span> <a href="/terms-legal-policy">Terms</a></div></div>';
}

/* ---------- reveal on scroll ----------
   Elements marked .reveal fade and slide up as they enter the viewport.
   A scroll sweep backs up the observer: jumping down the page (anchor links,
   End key, refresh mid-page) moves elements from below the fold to above it
   without ever intersecting, and the observer alone would never fire for them. */
(function(){
  var els=Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if(!els.length)return;

  /* stagger: .reveal elements sharing a parent animate in order (cards,
     steps, hero column vs visual), 90ms apart, via the --d delay. */
  var parents=[],counts=[];
  els.forEach(function(el){
    var p=el.parentNode,i=parents.indexOf(p);
    if(i<0){parents.push(p);counts.push(0);i=parents.length-1;}
    el.style.setProperty('--d',(counts[i]*90)+'ms');
    counts[i]++;
  });

  function show(el){
    el.classList.add('in');
    var i=els.indexOf(el);
    if(i>-1)els.splice(i,1);
  }

  function sweep(){
    for(var i=els.length-1;i>=0;i--){
      if(els[i].getBoundingClientRect().top<window.innerHeight)show(els[i]);
    }
  }

  if(!('IntersectionObserver' in window)){
    els.forEach(show);
    return;
  }

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting||e.boundingClientRect.top<0)show(e.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(el){io.observe(el);});

  var ticking=false;
  function onMove(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(function(){sweep();ticking=false;});
  }
  window.addEventListener('scroll',onMove,{passive:true});
  window.addEventListener('resize',onMove,{passive:true});
  sweep();
})();

/* ---------- forms ----------
   Any <form data-send="address"> posts to FormSubmit. If that does not confirm,
   the composed message is handed to the visitor's own mail app instead of
   pretending it was sent. Markup contract:
     <div data-form-box>
       <div data-form-body> ...form... </div>
       <div data-form-sent hidden>...</div>
       <div data-form-fallback hidden>... <a data-fallback-link>...</a></div>
     </div> */
Array.prototype.forEach.call(document.querySelectorAll('form[data-send]'),function(form){
  var EMAIL=form.getAttribute('data-send');
  var subject=form.getAttribute('data-subject')||'Website enquiry';
  var btn=form.querySelector('[type=submit]');
  var btnHTML=btn?btn.innerHTML:'';
  var box=form.closest('[data-form-box]')||form.parentNode;

  function reveal(sel){
    var body=box.querySelector('[data-form-body]');
    var target=box.querySelector(sel);
    if(body)body.hidden=true;
    if(target){target.hidden=false;target.scrollIntoView({block:'center',behavior:'smooth'});}
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.reportValidity())return;

    var fd=new FormData(form);
    var payload={_subject:subject,_template:'table',_replyto:fd.get('email')||''};
    fd.forEach(function(v,k){if(k!=='bot-field')payload[k]=v;});

    if(btn){btn.disabled=true;btn.textContent='Sending\u2026';}

    fetch('https://formsubmit.co/ajax/'+EMAIL,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(payload)
    })
    .then(function(r){return r.json();})
    .then(function(j){
      if(j&&String(j.success).toLowerCase()==='true')reveal('[data-form-sent]');
      else fail();
    })
    .catch(fail);

    function fail(){
      var lines=[];
      fd.forEach(function(v,k){if(k!=='bot-field'&&v)lines.push(k+': '+v);});
      var href='mailto:'+EMAIL
        +'?subject='+encodeURIComponent(subject)
        +'&body='+encodeURIComponent(lines.join('\n'));
      var alt=box.querySelector('[data-fallback-link]');
      if(alt)alt.setAttribute('href',href);
      if(btn){btn.disabled=false;btn.innerHTML=btnHTML;}
      reveal('[data-form-fallback]');
    }
  });
});
})();
