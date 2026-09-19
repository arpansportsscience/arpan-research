/* =====================================================================
   site.js  |  Dr. Arpan Chattopadhyay research website
   ---------------------------------------------------------------------
   This one file is loaded by every page (index, publications,
   achievements, photos, contact) with:
       <script src="site.js"></script>

   It does two jobs:
     1. Contact page: the "Copy" buttons next to each email address.
     2. Every page: the "Unique visitors" number in the footer.

   Note: the publications chart and filter buttons live inside
   publications.html, and the photo gallery lives inside photos.html.
   They are separate on purpose, so a problem here can never break them.
   ===================================================================== */

(function () {

  /* -------------------------------------------------------------------
     1. COPY-EMAIL BUTTONS (contact.html)
     Any button with a data-copy="..." attribute copies that text to the
     clipboard, then shows "Copied" for 1.5 seconds.
     On pages without such buttons this section does nothing.
     ------------------------------------------------------------------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {

      // Old browsers without clipboard support: quietly do nothing.
      if (!navigator.clipboard) return;

      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        var original = btn.textContent;          // remember "Copy"
        btn.textContent = 'Copied';              // give quick feedback
        setTimeout(function () {                 // restore after 1.5 s
          btn.textContent = original;
        }, 1500);
      });
    });
  });


  /* -------------------------------------------------------------------
     2. UNIQUE VISITOR COUNTER (footer of every page)
     Uses GoatCounter (free). It recognises visitors without cookies, so
     refreshing the page or moving between your pages is not counted
     again.

     ONE-TIME SETUP
       a) Create a free account at goatcounter.com and pick a site code.
       b) In its Settings, tick "Allow adding visitor counts on your
          website" and save.
       c) Put your site code in GC below.
     ------------------------------------------------------------------- */

  var GC = 'YOUR-CODE';   // <-- your GoatCounter site code, e.g. 'arpan-research'
  var OFFSET = 0;         // <-- add your old visitor total here to carry it over

  // Every element marked data-visitors in the footer will show the number.
  var els = document.querySelectorAll('[data-visitors]');
  if (!els.length) return;   // page has no counter, so stop here

  // Small helper: write the same text into every counter element.
  function show(text) {
    els.forEach(function (el) { el.textContent = text; });
  }

  // If the site code has not been filled in yet, show a dash and stop.
  if (GC === 'YOUR-CODE') { show('–'); return; }

  /* 2a. RECORD THIS VISIT
     Adds GoatCounter's tracking script to the page. GoatCounter counts
     the visit once, however many times the page is refreshed. */
  var tracker = document.createElement('script');
  tracker.async = true;
  tracker.setAttribute('data-goatcounter', 'https://' + GC + '.goatcounter.com/count');
  tracker.src = 'https://gc.zgo.at/count.js';
  document.head.appendChild(tracker);

  /* 2b. SHOW THE TOTAL
     Asks GoatCounter for the site-wide visitor total and displays it.
     Requires the "Allow adding visitor counts" setting (step b above). */
  fetch('https://' + GC + '.goatcounter.com/counter/TOTAL.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Counter not available');
      return res.json();
    })
    .then(function (data) {
      // GoatCounter sends a formatted string such as "1,234".
      // Remove the commas to get a plain number.
      var n = parseInt(String(data.count).replace(/[^0-9]/g, ''), 10) || 0;

      // Add the optional OFFSET and format in Indian style (e.g. 1,23,456).
      show((n + OFFSET).toLocaleString('en-IN'));
    })
    .catch(function () {
      // Any problem (offline, wrong code, setting not ticked): show a dash.
      // The rest of the page keeps working normally.
      show('–');
    });

})();
