
    let currentPage = 1;
    const itemsPerPage = 10;
    let allSubmissions = [];

//////////////////////////////berubah untuk single sub//////////////////////////
function fetchSubmissions() {
  const siD = '59fee68f-147e-432f-9c3f-d871ffb4ba9f'; // Replace with your Site ID
  const foD = '673d007e95d88a0008661480'; // Replace with your Form ID
  const apD = `https://api.netlify.com/api/v1/sites/${siD}/forms/${foD}/submissions`;

  const headers = {
    'Authorization': 'Bearer nfp_rsNDJVw6rjQJJHrqd2h4qr3UBKpDrfLXc37b', // Replace with your API token
  };

  fetch(apD, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      allSubmissions = data;

      // Cek apakah URL mengandung title untuk menampilkan satu item
      const urlParams = new URLSearchParams(window.location.search);
      const title = urlParams.get('title'); // e.g., ?title=encoded-title

      if (title) {
        displaySingleSubmission(decodeURIComponent(title));
      } else {
        displaySubmissions();
      }
    })
    .catch(error => {
      console.error('Error fetching submissions:', error);
    });
}

function displaySingleSubmission(title) {
  const submission = allSubmissions.find(sub => sub.data.name === title);

  const singleSubmissionContainer = document.getElementById('single-submission');
  singleSubmissionContainer.style.display = 'block';
  const submissionsContainer = document.getElementById('komentarmu');
  submissionsContainer.style.display = 'none';

  if (submission) {
    singleSubmissionContainer.innerHTML = `
      <div class="submission-entry">
        <h3>${submission.data.name}</h3>
        <p>${submission.data.message}</p>
        <p><small>${new Date(submission.created_at).toLocaleString()}</small></p>
      </div>
    `;
  } else {
    singleSubmissionContainer.innerHTML = `<p>No submission found for the title: ${title}</p>`;
  }
}

//////////// Fungsi lainnya tetap seperti sebelumnya


    function displaySubmissions() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageSubmissions = allSubmissions.slice(startIndex, endIndex);

      const submissionsContainer = document.getElementById('komentarmu');
      submissionsContainer.innerHTML = '';

      currentPageSubmissions.forEach(submission => {
        const submissionElement = document.createElement('div');
        submissionElement.classList.add('submission-entry');
        submissionElement.innerHTML = `
          <h3>${submission.data.name}</h3>
          <p>${submission.data.message}</p>
          <p><small>${new Date(submission.created_at).toLocaleString()}</small></p>
        `;
        submissionsContainer.appendChild(submissionElement);
      });

      updatePaginationButtons();
    }

    function changePage(direction) {
      currentPage += direction;
      displaySubmissions();
    }

    function updatePaginationButtons() {
      const prevButton = document.getElementById('prevPage');
      const nextButton = document.getElementById('nextPage');

      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage * itemsPerPage >= allSubmissions.length;
    }

    // Fetch the form submissions when the page loads
    //disabled untuk getSubmissionByPath 
    //fetchSubmissions();




function getSubmissionByPath() {
  const path = window.location.pathname.substring(1); // Hapus '/'
  if (path) {
    const decodedTitle = decodeURIComponent(path.replace(/-/g, ' '));
    const submission = allSubmissions.find(sub => sub.data.name === decodedTitle);
    if (submission) {
      displaySingleSubmission(submission);
    } else {
      document.getElementById('komentarmu').innerHTML = '<p>Submission tidak ditemukan.</p>';
    }
  } else {
    displaySubmissions(); // Tampilkan semua jika path kosong
  }
}

// Panggil ini setelah data selesai di-fetch:
fetchSubmissions().then(() => getSubmissionByPath());

