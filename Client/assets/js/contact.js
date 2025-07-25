const BACKEND_URL = "https://quill-ai.onrender.com";

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formStatus = document.getElementById('formStatus');
  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value,
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    formStatus.textContent = res.ok ? 'Message sent successfully!' : 'Failed to send message.';
  } catch (err) {
    formStatus.textContent = 'Error connecting to server.';
  }
});
