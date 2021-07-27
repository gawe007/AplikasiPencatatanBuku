window.addEventListener('load', function() {
    loadSelectYear();
    resetFormTambah();
    tampilkanBelumDibaca(ambilBelumDibaca()||false);
	tampilkanSudahDibaca(ambilSudahDibaca()||false);
    console.log('All assets are loaded');
});

document.getElementById('formTambah').addEventListener('submit', function(evt){
  evt.preventDefault();
  saveBuku();
  });
document.getElementById('submitbutton').addEventListener('click', function(evt){
  saveBuku();
  });
document.getElementById('resetbutton').addEventListener('click', function(evt){
  resetFormTambah();
  });
document.getElementById('formCariBelum').addEventListener('submit', function(evt){
  evt.preventDefault();
  cari('belum');
  });
document.getElementById('formCariSudah').addEventListener('submit', function(evt){
  evt.preventDefault();
  cari('sudah');
  });
document.getElementById('cariBelum').addEventListener('keydown', function(evt){
  cari('belum');
  });
document.getElementById('btncaribelum').addEventListener('click', function(evt){
  cari('belum');
  });
document.getElementById('btncarisudah').addEventListener('click', function(evt){
  cari('sudah');
  });
document.getElementById('cariSudah').addEventListener('keydown', function(evt){
  cari('sudah');
  });
document.getElementById('btncariresetbelum').addEventListener('click', function(evt){
  resetPage('belum');
  });
document.getElementById('btncariresetsudah').addEventListener('click', function(evt){
  resetPage('sudah');
  });
