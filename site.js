(function(){
  /* Contact page: copy email buttons */
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      if(!navigator.clipboard)return;
      navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function(){
        var t=b.textContent;
        b.textContent='Copied';
        setTimeout(function(){b.textContent=t},1500);
      });
    });
  });

  /* Unique visitor counter: counts each browser once */
  try{
    var OFFSET=0; // add your old visitor count here to carry it over
    var els=document.querySelectorAll('[data-visitors]');
    if(!els.length||!window.Counter)return;
    var c=new Counter({version:'v1',namespace:'arpan-research'}),seen=false;
    try{seen=localStorage.getItem('arpan_counted')==='1'}catch(e){}
    (seen?c.get('unique-visitors'):c.up('unique-visitors')).then(function(r){
      var n=(Number(r.value)||0)+OFFSET;
      els.forEach(function(e){e.textContent=n.toLocaleString('en-IN')});
      try{localStorage.setItem('arpan_counted','1')}catch(e){}
    }).catch(function(){
      els.forEach(function(e){e.textContent='–'});
    });
  }catch(err){}
})();
