document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Validate password strength (at least 6 characters)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('ordernowUsers')) || [];
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert('Username already exists! Please choose another username.');
        return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered! Please use a different email.');
        return;
    }
    
    // Create new user object
    const newUser = {
        email: email,
        username: username,
        password: password, // Note: In production, NEVER store plain passwords - use hashing!
        createdAt: new Date().toISOString()
    };
    
    // Add user to array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('ordernowUsers', JSON.stringify(users));
    
    // Show success message
    alert('Sign up successful! You can now login with your credentials.');
    
    // Clear form
    document.getElementById('signupForm').reset();
    
    // Redirect to login page
    window.location.href = 'Login.html';
});
