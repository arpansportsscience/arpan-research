(function(){
  /* Unique visitor counter: counts each browser once */
  var OFFSET=0; // add your old visitor count here to carry it over
  var els=document.querySelectorAll('[data-visitors]');
  if(els.length && window.Counter){
    var c=new Counter({version:'v1',namespace:'arpan-research'}),seen=false;
    try{seen=localStorage.getItem('arpan_counted')==='1'}catch(e){}
    (seen?c.get('unique-visitors'):c.up('unique-visitors')).then(function(r){
      var n=(Number(r.value)||0)+OFFSET;
      els.forEach(function(e){e.textContent=n.toLocaleString('en-IN')});
      try{localStorage.setItem('arpan_counted','1')}catch(e){}
    }).catch(function(){els.forEach(function(e){e.textContent='–'})});
  }

  /* Publications: chart by year + filters */
  var chart=document.getElementById('yearchart'),pubs=document.querySelectorAll('.pub[data-year]');
  if(chart){
    var cnt={},max=0;
    pubs.forEach(function(p){var y=p.dataset.year;cnt[y]=(cnt[y]||0)+1;max=Math.max(max,cnt[y])});
    Object.keys(cnt).sort().forEach(function(y){
      chart.insertAdjacentHTML('beforeend','<div class="col"><b>'+cnt[y]+'</b><div class="bar" style="height:'+(cnt[y]/max*70)+'%"></div>'+y+'</div>');
    });
  }
  var chips=document.querySelectorAll('.chip');
  chips.forEach(function(ch){ch.addEventListener('click',function(){
    chips.forEach(function(x){x.setAttribute('aria-pressed',x===ch)});
    pubs.forEach(function(p){p.hidden=!(ch.dataset.f==='all'||p.dataset.type===ch.dataset.f)});
  })});

  /* Contact: copy email */
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    if(!navigator.clipboard)return;
    navigator.clipboard.writeText(b.dataset.copy).then(function(){
      var t=b.textContent;b.textContent='Copied';setTimeout(function(){b.textContent=t},1500);
    });
  })});
})();
