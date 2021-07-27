const selectTahun = document.getElementById("year");
const noDataBox = '<div class="buku-wrap"><center>No Data</center></div>';

function simpanBelumDibaca(buku){
	var list = ambilBelumDibaca() || [];
	list.unshift(buku);
	localStorage.setItem('Bookshelf:BelumDibaca', JSON.stringify(list));
}

function updateBelumDibaca(list){
	localStorage.setItem('Bookshelf:BelumDibaca', JSON.stringify(list));
}

function simpanSudahDibaca(buku){
	var list = ambilSudahDibaca() || [];
	list.unshift(buku);
	localStorage.setItem('Bookshelf:SudahDibaca', JSON.stringify(list));
}

function updateSudahDibaca(list){
	localStorage.setItem('Bookshelf:SudahDibaca', JSON.stringify(list));
}

function ambilBelumDibaca(){
	return JSON.parse(localStorage.getItem('Bookshelf:BelumDibaca'));
}

function ambilSudahDibaca(){
	return JSON.parse(localStorage.getItem('Bookshelf:SudahDibaca'));
}

function loadSelectYear(){
	let tahunIni = new Date().getFullYear();
	let tahunLalu = tahunIni - 100;
	for(let i = tahunIni; i >= tahunLalu; i--){
		const opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = i;
		selectTahun.appendChild(opt);
	}
}


function addActive(a){
	document.getElementById(a).classList.add('active');
}

function removeActive(a){
	document.getElementById(a).classList.remove('active');
}

function tampilkanBelumDibaca(data){
	if(data){
	const div = document.getElementById("containerbelum");
	div.innerHTML = '';
	if(data.length > 0){
	for(let i = 0; i < data.length; i++){
		const wrapper = document.createElement('div');
		const label = document.createElement('label');
		const ul = document.createElement('ul');
		wrapper.classList.add('buku-wrap');
		wrapper.setAttribute('id', data[i]['id']);
		wrapper.setAttribute('tabindex', '0');
		label.innerHTML = data[i]['title'];
		const author = document.createElement('li');
		author.innerHTML = 'Author : '+data[i]['author'];
		const year = document.createElement('li');
		year.innerHTML = 'Year : '+data[i]['year'];
		ul.appendChild(author);
		ul.appendChild(year);
		wrapper.appendChild(label);
		wrapper.appendChild(ul);
		const btngroup = document.createElement('div');
		btngroup.classList.add('btn-group');
		const btntandai = document.createElement('button');
		btntandai.classList.add('btn-secondary');
		btntandai.innerHTML='Sudah Dibaca';
		btntandai.setAttribute("onclick", 'telahdibaca('+i+')');
		const btnhapus = document.createElement('button');
		btnhapus.classList.add('btn-danger');
		btnhapus.innerHTML='Hapus';
		btnhapus.setAttribute("onclick", 'hapusBuku('+i+', "belum")');
		btngroup.appendChild(btntandai);
		btngroup.appendChild(btnhapus);
		div.appendChild(wrapper);
		wrapper.appendChild(btngroup);
	}
	}else{
		div.innerHTML = noDataBox;
	}
	}
}

function tampilkanSudahDibaca(data){
	if(data){
	const div = document.getElementById("containersudah");
	div.innerHTML = '';
	if(data.length > 0){
	for(let i = 0; i < data.length; i++){
		const wrapper = document.createElement('div');
		const label = document.createElement('label');
		const ul = document.createElement('ul');
		wrapper.classList.add('buku-wrap');
		wrapper.setAttribute('id', data[i]['id']);
		wrapper.setAttribute('tabindex', '0');
		label.innerHTML = data[i]['title'];
		const author = document.createElement('li');
		author.innerHTML = 'Author : '+data[i]['author'];
		const year = document.createElement('li');
		year.innerHTML = 'Year : '+data[i]['year'];
		ul.appendChild(author);
		ul.appendChild(year);
		wrapper.appendChild(label);
		wrapper.appendChild(ul);
		const btngroup = document.createElement('div');
		btngroup.classList.add('btn-group');
		const btntandai = document.createElement('button');
		btntandai.classList.add('btn-secondary');
		btntandai.innerHTML='Belum Dibaca';
		btntandai.setAttribute("onclick", 'belumdibaca('+i+')');
		const btnhapus = document.createElement('button');
		btnhapus.classList.add('btn-danger');
		btnhapus.innerHTML='Hapus';
		btnhapus.setAttribute("onclick", 'hapusBuku('+i+', "sudah")');
		btngroup.appendChild(btntandai);
		btngroup.appendChild(btnhapus);
		div.appendChild(wrapper);
		wrapper.appendChild(btngroup);
	}
	}else{
		div.innerHTML = noDataBox;
	}
	}
}

function resetPage(page){
	if(page === 'belum'){
		document.getElementById('cariBelum').value = '';
		tampilkanBelumDibaca(ambilBelumDibaca()||false);
	}else if(page === 'sudah'){
		document.getElementById('cariSudah').value = '';
		tampilkanSudahDibaca(ambilSudahDibaca()||false);
	}
}

function resetFormTambah(){
	document.getElementById('title').value = "";
	document.getElementById('author').value = "";
	var elements = document.getElementById('year').options;
	for(var i = 0; i < elements.length; i++){
      elements[i].selected = false;
    }
}

function saveBuku(){
	const id = Date.now();
	let title = document.getElementById('title').value;
	let author = document.getElementById('author').value;
	let year = document.getElementById('year').value;
	let isCompleted = false;
	const buku = {
		'id': id,
		'title' : title,
		'author' : author,
		'year' : parseInt(year),
		'isCompleted' : isCompleted
	};
	simpanBelumDibaca(buku);
	alert('Sukses menyimpan!');
	resetFormTambah();
	tampilkanBelumDibaca(ambilBelumDibaca()||false);
	tampilkanSudahDibaca(ambilSudahDibaca()||false);
}

function telahdibaca(index){
	let itemlist = ambilBelumDibaca();
	let buku = itemlist[index];
	if(confirm('Tandai '+buku.title+' telah dibaca ?')){
		buku.isCompleted = true;
		itemlist.splice(index, 1);
		updateBelumDibaca(itemlist);
		simpanSudahDibaca(buku);
		tampilkanBelumDibaca(ambilBelumDibaca()||false);
		tampilkanSudahDibaca(ambilSudahDibaca()||false);
	}
}

function belumdibaca(index){
	let itemlist = ambilSudahDibaca();
	let buku = itemlist[index];
	if(confirm('Tandai '+buku.title+' belum dibaca ?')){
		buku.isCompleted = false;
		itemlist.splice(index, 1);
		updateSudahDibaca(itemlist);
		simpanBelumDibaca(buku);
		tampilkanSudahDibaca(ambilSudahDibaca()||false);
		tampilkanBelumDibaca(ambilBelumDibaca()||false);
	}
}

function hapusBuku(index, list){
	let itemlist = ambilBelumDibaca();
	let itemlist2 = ambilSudahDibaca();
	let buku = {};
	if(list === 'belum'){
		buku = itemlist[index];
		if(confirm('Anda yakin menghapus '+buku.title+' dari daftar?')){
			itemlist.splice(index,1);
			updateBelumDibaca(itemlist);
			tampilkanBelumDibaca(ambilBelumDibaca()||false);
		}
	}else if(list === 'sudah'){
		buku = itemlist2[index];
		if(confirm('Anda yakin menghapus '+buku.title+' dari daftar?')){
			itemlist2.splice(index,1);
			updateSudahDibaca(itemlist2);
			tampilkanSudahDibaca(ambilSudahDibaca()||false);
		}
	}
	
}

function cari(p){
	let arr = ambilBelumDibaca();
	let arr2 = ambilSudahDibaca();
	let arrcnc = arr.concat(arr2);
	let found = [];
if(p === 'belum'){
		const par = document.getElementById('cariBelum').value;
		let regex = new RegExp(par, 'i');
		if(par != ''){
			found = arr.filter(buku => regex.test(buku.title));
			if(found.length > 0){
				tampilkanBelumDibaca(found);
			}else{
				document.getElementById('containerbelum').innerHTML = noDataBox;
			}
		}
	}else if(p === 'sudah'){
		const par = document.getElementById('cariSudah').value;
		let regex = new RegExp(par, 'i');
		if(par != ''){
			found = arr2.filter(buku => regex.test(buku.title));
			if(found.length > 0){
				tampilkanSudahDibaca(found);
			}else{
				document.getElementById('containersudah').innerHTML = noDataBox;
			}
		}
	}
}
