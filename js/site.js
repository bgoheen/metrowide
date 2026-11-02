/* Metrowide Appraisals - shared site behavior */
(function(){
  var header=document.getElementById('siteHeader');
  if(header){
    window.addEventListener('scroll',function(){
      if(window.scrollY>20){header.classList.add('scrolled');}else{header.classList.remove('scrolled');}
    },{passive:true});
  }

  /* mobile menu */
  var menuBtn=document.getElementById('menuBtn');
  var mnav=document.getElementById('mnav');
  if(menuBtn&&mnav){
    menuBtn.addEventListener('click',function(){
      var isOpen=mnav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded',isOpen?'true':'false');
      menuBtn.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
    });
    var mLinks=mnav.querySelectorAll('a');
    for(var i=0;i<mLinks.length;i++){
      mLinks[i].addEventListener('click',function(){
        mnav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded','false');
        menuBtn.setAttribute('aria-label','Open menu');
      });
    }
  }

  /* desktop dropdown (hover works without JS; this adds click and keyboard) */
  var drops=document.querySelectorAll('.nav-drop');
  for(var d=0;d<drops.length;d++){
    (function(drop){
      var btn=drop.querySelector('.nav-drop-btn');
      if(!btn){return;}
      btn.addEventListener('click',function(e){
        e.preventDefault();
        var isOpen=drop.classList.toggle('open');
        btn.setAttribute('aria-expanded',isOpen?'true':'false');
      });
      document.addEventListener('click',function(e){
        if(!drop.contains(e.target)){
          drop.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
        }
      });
      drop.addEventListener('keydown',function(e){
        if(e.key==='Escape'){
          drop.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
          btn.focus();
        }
      });
    })(drops[d]);
  }

  /* article table of contents: highlight the section in view */
  var tocLinks=document.querySelectorAll('.toc-sidebar a');
  var headings=document.querySelectorAll('.article-body h2[id]');
  if(tocLinks.length&&headings.length){
    var onScroll=function(){
      var y=window.scrollY;
      var current=null;
      for(var j=0;j<headings.length;j++){
        if(headings[j].offsetTop-120<=y){current=headings[j].id;}
      }
      for(var k=0;k<tocLinks.length;k++){
        if(current&&tocLinks[k].getAttribute('href')==='#'+current){tocLinks[k].classList.add('active');}
        else{tocLinks[k].classList.remove('active');}
      }
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }
})();
