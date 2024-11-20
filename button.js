//ngurusi buttons di textarea
    // Apply text formatting to textarea
    function applyFormat(command) {
      const textarea = document.getElementById("message");
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const selectedText = textarea.value.substring(startPos, endPos);

      let formattedText = selectedText;

      switch(command) {
        case 'bold':
          formattedText = `<b>${selectedText}</b>`;
          break;
        case 'italic':
          formattedText = `<i>${selectedText}</i>`;
          break;
        case 'h2':
          formattedText = `<h2>${selectedText}</h2>`;
          break;
        case 'h3':
          formattedText = `<h3>${selectedText}</h3>`;
          break;
        case 'h4':
          formattedText = `<h4>${selectedText}</h4>`;
          break;
        case 'ul':
          formattedText = `<ul><li>${selectedText}</li></ul>`;
          break;
        case 'ol':
          formattedText = `<ol><li>${selectedText}</li></ol>`;
          break;
        case 'li':
          formattedText = `<li>${selectedText}</li>`;
          break;
        case 'p':
          formattedText = `<p>${selectedText}</p>`;
          break;
        default:
          return;
      }

      textarea.setRangeText(formattedText);
    }

    // Insert an image at the cursor position in the textarea
    function insertImage() {
      const imgURL = prompt("Enter image URL:");
      if (imgURL) {
        const textarea = document.getElementById("message");
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const imgTag = `<img src="${imgURL}" alt="image" />`;
        textarea.setRangeText(imgTag);
      }
    }
  
