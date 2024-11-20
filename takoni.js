document.addEventListener('DOMContentLoaded', () => {
  // Generate random numbers for CAPTCHA
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);

  // Set numbers in CAPTCHA question
  document.getElementById('num1').textContent = num1;
  document.getElementById('num2').textContent = num2;

  // Store the correct answer in hidden input
  document.getElementById('captchaAnswer').value = num1 + num2;
});

// Function to validate CAPTCHA input
function validateCaptcha() {
  const userAnswer = parseInt(document.getElementById('captchaInput').value);
  const correctAnswer = parseInt(document.getElementById('captchaAnswer').value);

  if (userAnswer !== correctAnswer) {
    alert('Jawaban CAPTCHA salah. Coba lagi.');
    return false; // Prevent form submission
  }

  return true; // Allow form submission
}

// Toolbar formatting function
function applyFormat(tag) {
  const textarea = document.getElementById('message');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  // Wrap selected text with chosen tag
  const before = `<${tag}>`;
  const after = `</${tag}>`;
  const newText = before + selectedText + after;

  textarea.value = 
    textarea.value.substring(0, start) + 
    newText + 
    textarea.value.substring(end);
}

// Optional: You can add functions for insertImage and insertLink if necessary
