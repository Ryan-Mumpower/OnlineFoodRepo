document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('ordernowUsers')) || [];
    
    if (users.some(user => user.username === username)) {
        alert('Username already exists! Please choose another username.');
        return;
    }
    
    if (users.some(user => user.email === email)) {
        alert('Email already registered! Please use a different email.');
        return;
    }
    
    const newUser = {
        email: email,
        username: username,
        password: password, 
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    localStorage.setItem('ordernowUsers', JSON.stringify(users));
    
    alert('Sign up successful! You can now login with your credentials.');
    
    document.getElementById('signupForm').reset();
    
    window.location.href = 'Login.html';
});
