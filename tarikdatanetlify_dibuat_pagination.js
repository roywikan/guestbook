
    let currentPage = 1;
    const itemsPerPage = 10;
    let allSubmissions = [];

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
          displaySubmissions();
        })
        .catch(error => {
          console.error('Error fetching submissions:', error);
        });
    }

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
    fetchSubmissions();
  
