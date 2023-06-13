

document.getElementById("bimbinganForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const mhswid = document.getElementById("inputMhswID").value;
    const dosenid = document.getElementById("inputDosenID").value;
    const tahunid = document.getElementById("inputTahunID").value;
    const tipe = document.getElementById("inputTipe").value;
    const pertemuan = document.getElementById("inputPertemuan").value;
    const nilai = document.getElementById("inputNilai").value;
    const topik = document.getElementById("inputTopik").value;
    const tanggal = document.getElementById("inputTanggal").value;
    const penilai = document.getElementById("inputPenilai").value;

  
    addBimbingan(mhswid, dosenid, tahunid, tipe, pertemuan, nilai, topik, tanggal, penilai); 
  
    document.getElementById("bimbinganForm").reset();
  });
  
  function addBimbingan(mhswid, dosenid, tahunid, tipe, pertemuan, nilai, topik, tanggal, penilai) {
    const url = 'https://hris_backend.ulbi.ac.id/bim/databimbingan/';
    const data = {
      MhswID: mhswid,
      DosenID: dosenid,
      TahunID: tahunid,
      Tipe: tipe,
      Pertemuan: pertemuan,
      Nilai: nilai, 
      Topik: topik,
      Tanggal: tanggal,
      Penilai: penilai

    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('Data berhasil dipost');
      } else {
        console.log('Terjadi kesalahan saat memposting data');
      }
    })
    .catch(error => {
      console.log('Terjadi kesalahan:', error);
    });
  }
  
window.addEventListener('DOMContentLoaded', function() {
    var mhswID = sessionStorage.getItem("mhswID");
    document.getElementById("inputMhswID").value = mhswID;
    sessionStorage.removeItem("mhswID");
  
    var form = document.getElementById("formBimbingan");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      sendData();
    });
  });