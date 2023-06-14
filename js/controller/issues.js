
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

document.addEventListener('DOMContentLoaded', () => {
    const octokit = new Octokit({
      auth: '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'
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
        const response = await octokit.request('POST /repos/dtiulbi/questionstik/issues', {
          owner: 'dtiulbi',
          repo: 'questionstik',
          title,
          assignees,
          milestone,
          labels,
          body,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        console.log('Issue created:', response);
        showModal('Pengajuan DiProses', response);

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

  function showModalerror(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Gagal Mengirim Pengajuan Pastikan Sudah Diisi Semua',
    }).then(() => {
      location.reload();
    });
  }