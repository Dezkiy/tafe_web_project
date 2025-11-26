document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name
    let nameRegex = /^[A-Za-z\s]{2,}$/;
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById('nameError').textContent =
            'Name should contain only letters and be at least 2 characters';
        isValid = false;
    }

    // Validate Email using Regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        isValid = false;
    }

    // Validate Message
    let messageRegex = /^[A-Za-z0-9\s.,!?'"()-]{10,}$/;
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message cannot be empty';
        isValid = false;
    } else if (!messageRegex.test(message)) {
        document.getElementById('messageError').textContent =
            'Message should be at least 10 characters';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        // You can add fetch/ajax here to send data to a server
    }
});
