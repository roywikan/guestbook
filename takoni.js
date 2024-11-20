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
function validateCaptcha(event) {
  // Prevent form submission if CAPTCHA validation fails
  const userAnswer = parseInt(document.getElementById('captchaInput').value);
  const correctAnswer = parseInt(document.getElementById('captchaAnswer').value);

  if (userAnswer !== correctAnswer) {
    alert('Jawaban CAPTCHA salah. Coba lagi.');
    event.preventDefault(); // Prevent form submission
    return false;
  }

  // Proceed with form submission if CAPTCHA is correct
  return true;
}

// Function to handle form submit
document.querySelector('form[name="guestbook"]').addEventListener('submit', function(event) {
  // Validate CAPTCHA before form submission
  if (!validateCaptcha(event)) {
    return; // Prevent form from submitting if CAPTCHA is incorrect
  }
  
  // If CAPTCHA is valid, form will be submitted normally
  console.log('Form is being submitted');  // Debug: Check if form is submitting
});
