document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    function switchToTab(tabName) {
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        // Add active class to specified tab and corresponding form
        const tab = document.querySelector(`.auth-tab[data-tab="${tabName}"]`);
        if (tab) {
            tab.classList.add('active');
            const formId = `${tabName}-form`;
            document.getElementById(formId).classList.add('active');
        }
    }
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchToTab(tab.dataset.tab);
        });
    });
    
    // Check if we need to switch to signup tab (from hash in URL)
    if (window.location.hash === '#signup') {
        switchToTab('signup');
        
        // Check if we have a birthdate to pre-fill
        const birthdate = sessionStorage.getItem('myLifelineSignupBirthdate');
        if (birthdate) {
            document.getElementById('signup-birthdate').value = birthdate;
            sessionStorage.removeItem('myLifelineSignupBirthdate');
        }
    }
    
    // Login functionality
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    
    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        
        if (!username || !password) {
            loginError.textContent = 'Please enter both username and password.';
            return;
        }
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('myLifelineUsers') || '{}');
        
        // Check if user exists and password matches
        if (!users[username]) {
            loginError.textContent = 'User does not exist.';
            return;
        }
        
        if (users[username].password !== password) {
            loginError.textContent = 'Incorrect password.';
            return;
        }
        
        // Login successful
        loginError.textContent = '';
        
        // Store current user in session storage
        sessionStorage.setItem('myLifelineCurrentUser', username);
        
        // Redirect to main page
        window.location.href = 'index.html';
    });
    
    // Signup functionality
    const signupBtn = document.getElementById('signup-btn');
    const signupError = document.getElementById('signup-error');
    
    signupBtn.addEventListener('click', () => {
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const birthdate = document.getElementById('signup-birthdate').value;
        
        // Validate inputs
        if (!username || !password || !confirmPassword || !birthdate) {
            signupError.textContent = 'Please fill in all fields.';
            return;
        }
        
        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match.';
            return;
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('myLifelineUsers') || '{}');
        
        // Check if username already exists
        if (users[username]) {
            signupError.textContent = 'Username already exists.';
            return;
        }
        
        // Create new user
        users[username] = {
            password,
            birthdate,
            lifeExpectancy: 80,
            milestones: [],
            createdAt: new Date().toISOString()
        };
        
        // Save users to localStorage
        localStorage.setItem('myLifelineUsers', JSON.stringify(users));
        
        // Store current user in session storage
        sessionStorage.setItem('myLifelineCurrentUser', username);
        
        // Signup successful
        signupError.textContent = '';
        
        // Redirect to main page
        window.location.href = 'index.html';
    });
});