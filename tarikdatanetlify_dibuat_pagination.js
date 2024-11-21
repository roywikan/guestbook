let currentPage = 1;
const itemsPerPage = 10;
let allSubmissions = [];

// Fetch all submissions
function fetchSubmissions() {
  const siD = '59fee68f-147e-432f-9c3f-d871ffb4ba9f';
  const foD = '673d007e95d88a0008661480';
  const apD = `https://api.netlify.com/api/v1/sites/${siD}/forms/${foD}/submissions`;

  const headers = {
    'Authorization': 'Bearer nfp_rsNDJVw6rjQJJHrqd2h4qr3UBKpDrfLXc37b',
  };

  return fetch(apD, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched submissions:', data);
      allSubmissions = data;

      const urlParams = new URLSearchParams(window.location.search);
      const title = urlParams.get('title');
      console.log('Query parameter title:', title);

      if (title) {
        displaySingleSubmission(decodeURIComponent(title));
      } else {
        getSubmissionByPath();
      }
    })
    .catch(error => {
      console.error('Error fetching submissions:', error);
    });
}


// Display a single submission
function displaySingleSubmission(submission) {
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
    singleSubmissionContainer.innerHTML = `<p>Submission tidak ditemukan.</p>`;
  }
}

// Display all submissions
function displaySubmissions() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageSubmissions = allSubmissions.slice(startIndex, endIndex);

  const submissionsContainer = document.getElementById('komentarmu');
  submissionsContainer.style.display = 'block';
  const singleSubmissionContainer = document.getElementById('single-submission');
  singleSubmissionContainer.style.display = 'none';

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

// Handle path-based routing
function getSubmissionByPath() {
  const path = window.location.pathname.substring(1); // Remove '/'
  console.log('Path from URL:', path);

  if (path) {
    const decodedTitle = decodeURIComponent(path.replace(/-/g, ' '));
    console.log('Decoded title:', decodedTitle);

    const submission = allSubmissions.find(sub => sub.data.name === decodedTitle);
    if (submission) {
      displaySingleSubmission(submission);
    } else {
      console.log('Available submissions:', allSubmissions);
      document.getElementById('komentarmu').innerHTML = '<p>Submission tidak ditemukan.</p>';
    }
  } else {
    displaySubmissions(); // Display all submissions if no path
  }
}


// Handle hash-based routing
function getSubmissionByHash() {
  const hash = window.location.hash.substring(1); // Remove #
  if (hash) {
    const decodedTitle = decodeURIComponent(hash.replace(/-/g, ' '));
    const submission = allSubmissions.find(sub => sub.data.name === decodedTitle);
    if (submission) {
      displaySingleSubmission(submission);
    } else {
      document.getElementById('komentarmu').innerHTML = '<p>Submission tidak ditemukan.</p>';
    }
  } else {
    displaySubmissions(); // Display all submissions if no hash
  }
}

// Pagination controls
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

// Initialize fetch and routing
fetchSubmissions().then(() => {
  getSubmissionByPath(); // For rewrite rules
  // getSubmissionByHash(); // Uncomment for hash routing
});
