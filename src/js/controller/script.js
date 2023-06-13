
function fetchData(npm, tipe) {
    const url = `https://hris_backend.ulbi.ac.id/bim/databimbingan/npmtipe/${npm}/${tipe}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed.');
      })
      .then(data => {
        if (data.code === 200 && data.success && data.data) {
          displayResults(data.data);
        } else {
          throw new Error('Invalid data format or empty data.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  const pembimbingMapping = {
    'NN056L': 'Cahyo Prianto, S.Pd., M.T.,CDSP, SFPC',
    'TI126L': 'M. Yusril Helmi Setyawan, S.Kom., M.Kom.,SFPC',
    'TI122L': 'Mohamad Nurkamal Fauzan, S.T., M.T., SFPC',
    'NN222L': 'Nisa Hanum Harani, S.Kom., M.T.,CDSP, SFPC',
    'NN225L': 'Noviana Riza, S.Si., M.T., SFPC',
    'LB053L': 'Rd. Nuraini Siti Fatonah, S.S., M.Hum., SFPC',
    'NN257L': 'Rolly Maulana Awangga,S.T.,MT.,CAIP, SFPC',
    'NN258L': 'Roni Andarsyah, S.T., M.Kom., SFPC',
    'TI117L': 'Roni Habibi, S.Kom., M.T., SFPC',
    'TI125L': 'Syafrial Fachri Pane,ST. MTI,EBDP.CDSP,SFPC',
    'TI041L': 'Woro Isti Rahayu, S.T., M.T., SFPC',
  };
  const Tahunajaran = {
    '21': 'Tahun Ajaran Ganjil',
    '22': 'Tahun Ajaran Genap'
  };
  
  function getTahunAjaran(tahun) {
    const duaDigitTerakhir = tahun.slice(-2);
    if (parseInt(duaDigitTerakhir) % 2 === 0) {
      return 'Tahun Ajaran Genap';
    } else {
      return 'Tahun Ajaran Ganjil';
    }
  }
  
  const tahun = '20222';
  const tahunAjaran = getTahunAjaran(tahun);
  console.log(tahunAjaran); 
  
  
  function displayResults(data) {
    const resultsBody = document.getElementById("results_body");
    resultsBody.innerHTML = ""; // Clear existing results
  
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.MhswID}</td>
          <td>${pembimbingMapping[item.DosenID]}</td>
          <td>${item.TahunID } ${getTahunAjaran(item.TahunID)}</td>
          <td>${item.Tipe}</td>
          <td>${item.Pertemuan_}</td>
          <td>${item.Nilai}</td>
          <td>${item.Topik}</td>
          <td>${item.Tanggal}</td>
          <td>${item.Penilai}</td>
          <td><a href="javascript:;" class="inline-block ltr:mr-2 rtl:ml-2 hover:text-red-500" title="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
          </svg>
        </a>
        <a href="javascript:;" class="inline-block ltr:mr-2 rtl:ml-2 hover:text-green-500" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
          </svg>
        </a> </td>
        `;
        resultsBody.appendChild(row);
      });
    } else {
      console.error("Invalid data format or empty data.");
    }
    console.log(data);
  }
  
  function applyFilters() {
    const npmInput = document.querySelector("#npm_input");
    const tipeInput = document.querySelector("#tipe_input");
    const npm = npmInput.value.trim();
    const tipe = tipeInput.value.trim();
  
    fetchData(npm, tipe);
  }
  
  document.querySelector("#submit_btn").addEventListener("click", applyFilters);
  
  function getCariMhswID() {
    var mhswID = document.getElementById("inputCariMhswID").value;
  
    sessionStorage.setItem("mhswID", mhswID);
  
    window.location.href = "addbim.html";
  }