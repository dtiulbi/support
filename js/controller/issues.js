
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import Swal from "https://cdn.skypack.dev/sweetalert2@11.1.2";

document.addEventListener('DOMContentLoaded', () => {
    const uhuy = 'Z2hwX2lmVW94RGVyaWdxWDdicXg4RzdFNklMczlQTUtGVTJnaVlZZg==';
    const octokit = new Octokit({
      auth: atob(uhuy)
    });

    const form = document.getElementById('issuesform');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('inputtittle').value;
      const body = document.getElementById('inputbody').value;
      const milestone = parseInt(document.getElementById('inputmilestone').value);
      const assigneeSelect = document.getElementById('inputassigness');
      const assignees = [assigneeSelect.options[assigneeSelect.selectedIndex].value];
    
      const labelsSelect = document.getElementById('inputlabels');
      const labels = Array.from(labelsSelect.selectedOptions, option => option.value);
      

      try {
        const response = await octokit.request('POST /repos/dtiulbi/question-ticketing/issues', {
          owner: 'dtiulbi',
          repo: 'question-ticketing',
          title,
          assignees,
          milestone,
          labels,
          body,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github.v3+json'

          }
        });
        console.log('Issue created:', response);
        showModal('Pengajuan Tiket Layanan Akan Proses', response);

      } catch (error) {
        console.error('Failed to create issue:', error);
        showModalerror('Gagal Mengirim Pengajuan Pastikan Sudah Diisi Semua', error);

      }
    });
  });

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