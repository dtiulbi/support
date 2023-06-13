const modal = document.getElementById("popup-modal");
const closeBtn = document.querySelector('[data-modal-hide="popup-modal"]');
const yesButton = document.querySelector('[data-modal-hide="popup-modal"]');
const modalMessage = document.querySelector(".text-lg");

function displayModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

yesButton.addEventListener("click", function(event) {
  // Code to handle "Yes" button click
  closeModal();
});


document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();

  const mhswid = document.getElementById("inputMhswID").value;
  const dosenid = document.getElementById("inputDosenID").value;
  const tahunid = document.getElementById("inputTahunID").value;
  const tipe = document.getElementById("inputTipe").value;
  const pertemuan = parseInt(document.getElementById("inputPertemuan").value);
  const nilai = parseInt(document.getElementById("inputNilai").value);
  const topik = document.getElementById("inputTopik").value;
  const tanggal = document.getElementById("inputTanggal").value;
  const penilai = document.getElementById("inputPenilai").value;
  const log = document.getElementById("inputLog").value;

  if (mhswid === '' || dosenid === '' || tahunid === '' || tipe === '' || pertemuan === '' || nilai === '' || topik === '' || tanggal === '' || penilai === '' || log === '') {
    console.log('Mohon lengkapi semua field');
    return;
  }

  addBimbingan(mhswid, dosenid, tahunid, tipe, pertemuan, nilai, topik, tanggal, penilai, log); 

  document.getElementById("bimbinganForm").reset();
});

function addBimbingan(mhswid, dosenid, tahunid, tipe, pertemuan, nilai, topik, tanggal, penilai, log) {
  const url = 'https://hris_backend.ulbi.ac.id/bim/databimbingan/';

  const data = {
    MhswID: mhswid,
    DosenID: dosenid,
    TahunID: tahunid,
    Tipe: tipe,
    Pertemuan_: pertemuan,
    Nilai: nilai, 
    Topik: topik,
    Tanggal: tanggal,
    Penilai: penilai,
    Log:log
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
      showModal('Data berhasil dipost'); // Menampilkan pesan keberhasilan pada modal
    } else {
      console.log('Terjadi kesalahan saat memposting data');
      showModal('Terjadi kesalahan saat memposting data');
    }
  })
  .catch(error => {
    console.log('Terjadi kesalahan:', error);
    showModal("Terjadi kesalahan: " + error.message);
  });

}

function showModal(message) {
  Swal.fire({
    title: 'Selamat!',
    text: message,
    icon: 'success',
    confirmButtonText: 'Tutup'
  }).then(() => {
    location.reload();
  });
}




