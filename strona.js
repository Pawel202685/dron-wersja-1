(function () {
  var przycisk = document.getElementById('menu-przycisk');
  var nawigacja = document.getElementById('nawigacja');
  if (przycisk && nawigacja) {
    przycisk.addEventListener('click', function () {
      var otwarte = nawigacja.classList.toggle('otwarte');
      przycisk.setAttribute('aria-expanded', String(otwarte));
    });
  }

  var podglad = document.getElementById('podglad');
  if (podglad && podglad.showModal) {
    var duze = podglad.querySelector('img');
    var podpis = podglad.querySelector('figcaption');
    document.querySelectorAll('[data-powieksz]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        if (!img) return;
        duze.src = img.currentSrc || img.src;
        duze.alt = img.alt;
        podpis.textContent = img.alt;
        podglad.showModal();
      });
    });
    podglad.addEventListener('click', function (e) {
      if (e.target === podglad || e.target.closest('.podglad-zamknij')) podglad.close();
    });
  }

  var formularz = document.getElementById('formularz');
  if (formularz) {
    formularz.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(formularz);
      var temat = 'Zapytanie o lot dronem: ' + d.get('usluga');
      var tresc = [
        'Imię i nazwisko: ' + d.get('imie'),
        'Telefon: ' + d.get('telefon'),
        'E-mail: ' + (d.get('email') || 'nie podano'),
        'Rodzaj zlecenia: ' + d.get('usluga'),
        'Miejsce: ' + d.get('miejsce'),
        'Termin: ' + (d.get('termin') || 'do ustalenia'),
        '',
        d.get('opis') || ''
      ].join('\n');
      var pole = document.getElementById('gotowa-tresc');
      pole.value = 'Do: kontakt@pawelstec.eu\nTemat: ' + temat + '\n\n' + tresc;
      document.getElementById('gotowa-poczta').href = 'mailto:kontakt@pawelstec.eu?subject=' +
        encodeURIComponent(temat) + '&body=' + encodeURIComponent(tresc);
      document.getElementById('gotowa-status').textContent = '';
      document.getElementById('gotowa').hidden = false;
      document.getElementById('gotowa-tytul').focus();
    });

    document.getElementById('gotowa-kopiuj').addEventListener('click', function () {
      var pole = document.getElementById('gotowa-tresc');
      var status = document.getElementById('gotowa-status');
      function reczne() {
        pole.focus();
        pole.select();
        status.textContent = 'Tekst jest zaznaczony. Skopiuj go skrótem Cmd+C lub Ctrl+C.';
      }
      try {
        navigator.clipboard.writeText(pole.value).then(function () {
          status.textContent = 'Skopiowano. Wklej wiadomość w swojej poczcie.';
        }, reczne);
      } catch (err) {
        reczne();
      }
    });
  }

  document.querySelectorAll('img[data-slot]').forEach(function (img) {
    function pusty() {
      var figura = img.closest('figure');
      var przycisk = img.closest('button');
      if (figura) figura.classList.add('pusty');
      if (przycisk) przycisk.remove();
    }
    img.addEventListener('error', pusty);
    if (img.complete && img.naturalWidth === 0) pusty();
  });
})();
