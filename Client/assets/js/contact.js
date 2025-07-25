document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formStatus = document.getElementById('formStatus');
  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value,
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      formStatus.textContent = 'Message sent successfully!';
      this.reset();
    } else {
      formStatus.textContent = 'Failed to send message.';
    }
  } catch (err) {
    formStatus.textContent = 'Error connecting to server.';
  }
});
