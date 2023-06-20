import Swal from "https://cdn.skypack.dev/sweetalert2@11.1.2";
import {onClick,getValue} from "https://jscroot.github.io/element/croot.js";
import {postWithBearer} from "https://jscroot.github.io/api/github.js";
import { iteungbot } from "./bot.js";

onClick("submitButton",kirimIssues);

function kirimIssues(){
  let data = {
    title : getValue("inputtittle"),
    assignees : [getValue("inputassigness")],
    milestone : Number(getValue("inputmilestone")),
    labels : [getValue("inputlabels")],
    body : getValue("inputbody"),
  }
  postWithBearer("https://api.github.com/repos/acadcsirt/lapor/issues",atob(iteungbot),data,responseFunction)
}

function responseFunction(response){
    console.log('Issue created:', response);
    if(response.message === "Validation Failed"){
      showModalerror('Gagal Mengirim Laporan Pastikan Sudah Diisi Semua ' + response.errors[0].code);
    } else{
      showModal('ID Laporan ' + response.id);
    }
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

function showModalerror(message, error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Gagal Mengirim Pengajuan',
    }).then(() => {
      location.reload();
    });
  }