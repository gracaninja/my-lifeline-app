document.addEventListener('DOMContentLoaded', () => {
    // Main form elements
    const lifelineForm = document.getElementById('lifeline-form');
    const inputSection = document.getElementById('input-section');
    const lifelineSection = document.getElementById('lifeline-section');
    const resetBtn = document.getElementById('reset-btn');
    const saveBtn = document.getElementById('save-btn');
    
    // User section elements
    const userSection = document.getElementById('user-section');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    const authButtons = document.getElementById('auth-buttons');
    
    // Guest save prompt elements
    const guestSavePrompt = document.getElementById('guest-save-prompt');
    const goToLoginBtn = document.getElementById('go-to-login-btn');
    const goToSignupBtn = document.getElementById('go-to-signup-btn');
    const continueAsGuestBtn = document.getElementById('continue-as-guest-btn');
    
    // Modal elements
    const milestoneModal = document.getElementById('milestone-modal');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const addMilestoneBtn = document.getElementById('add-milestone-btn');
    const loginHeaderBtn = document.getElementById('login-header-btn');
    const signupHeaderBtn = document.getElementById('signup-header-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelModalBtns = document.querySelectorAll('.cancel-modal');
    const switchToSignupBtn = document.getElementById('switch-to-signup');
    const switchToLoginBtn = document.getElementById('switch-to-login');
    
    // Event type selector elements
    const pointEventBtn = document.getElementById('point-event-btn');
    const periodEventBtn = document.getElementById('period-event-btn');
    const milestoneTypeInput = document.getElementById('milestone-type');
    const pointEventFields = document.querySelectorAll('.point-event-field');
    const periodEventFields = document.querySelectorAll('.period-event-field');
    const milestoneOngoingCheckbox = document.getElementById('milestone-ongoing');
    const milestoneEndDateInput = document.getElementById('milestone-end-date');
    
    // Milestone form elements
    const milestoneForm = document.getElementById('milestone-form');
    const milestonesContainer = document.getElementById('milestones-container');
    const milestonesTimeline = document.getElementById('milestones-timeline');
    
    // Category event containers
    const familyEventsContainer = document.getElementById('family-events-container');
    const educationEventsContainer = document.getElementById('education-events-container');
    const careerEventsContainer = document.getElementById('career-events-container');
    const otherEventsContainer = document.getElementById('other-events-container');
    
    // Login/Signup form elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginError = document.getElementById('login-error');
    const signupError = document.getElementById('signup-error');
    
    // Elements to update
    const currentAgeEl = document.getElementById('current-age');
    const lifePercentageEl = document.getElementById('life-percentage');
    const timeRemainingEl = document.getElementById('time-remaining');
    const pastLineEl = document.getElementById('past-line');
    const currentPointEl = document.getElementById('current-point');
    const futureLineEl = document.getElementById('future-line');
    const birthLabelEl = document.getElementById('birth-label');
    const endLabelEl = document.getElementById('end-label');
    
    // Global variables to store user data
    let userData = {
        birthdate: null,
        lifeExpectancy: 80,
        milestones: []
    };
    
    // Current user
    let currentUser = null;
    
    // Function to calculate age in years from a date
    function calculateAge(birthDate) {
        const today = new Date();
        const ageInMilliseconds = today - birthDate;
        return ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    }
    
    // Function to format a date as YYYY-MM-DD
    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Function to format a date for display
    function formatDateForDisplay(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }
    
    // Function to format a period for display
    function formatPeriodForDisplay(startDate, endDate, ongoing) {
        const start = formatDateForDisplay(startDate);
        if (ongoing) {
            return `${start} - Present`;
        } else if (endDate) {
            const end = formatDateForDisplay(endDate);
            return `${start} - ${end}`;
        }
        return start;
    }
    
    // Function to calculate percentage of life completed
    function calculateLifePercentage(birthDate, lifeExpectancy) {
        const ageInYears = calculateAge(birthDate);
        return (ageInYears / lifeExpectancy) * 100;
    }
    
    // Function to calculate position on the timeline
    function calculateTimelinePosition(date, birthDate, endDate) {
        const totalLifespan = endDate - birthDate;
        const timeElapsed = date - birthDate;
        return (timeElapsed / totalLifespan) * 100;
    }
    
    // Function to get the appropriate container for a category
    function getCategoryContainer(category) {
        switch (category) {
            case 'family':
                return familyEventsContainer;
            case 'education':
                return educationEventsContainer;
            case 'career':
                return careerEventsContainer;
            default:
                return otherEventsContainer;
        }
    }
    
    // Function to update the lifeline visualization
    function updateLifeline() {
        if (!userData.birthdate) return;
        
        const birthdate = new Date(userData.birthdate);
        const lifeExpectancy = userData.lifeExpectancy;
        
        // Calculate current age and life percentage
        const ageInYears = calculateAge(birthdate);
        const lifePercentage = calculateLifePercentage(birthdate, lifeExpectancy);
        
        // Calculate expected end date
        const endDate = new Date(birthdate);
        endDate.setFullYear(birthdate.getFullYear() + lifeExpectancy);
        
        // Calculate time remaining
        const remainingTimeInYears = lifeExpectancy - ageInYears;
        
        // Update the UI
        currentAgeEl.textContent = `${Math.floor(ageInYears)} years, ${Math.floor((ageInYears % 1) * 12)} months`;
        lifePercentageEl.textContent = `${lifePercentage.toFixed(1)}%`;
        timeRemainingEl.textContent = `${Math.floor(remainingTimeInYears)} years, ${Math.floor((remainingTimeInYears % 1) * 12)} months`;
        
        // Update the lifeline visualization
        pastLineEl.style.width = `${lifePercentage}%`;
        futureLineEl.style.width = `${100 - lifePercentage}%`;
        currentPointEl.style.left = `${lifePercentage}%`;
        
        // Update timeline labels
        birthLabelEl.textContent = `Birth (${birthdate.getFullYear()})`;
        endLabelEl.textContent = `${endDate.getFullYear()} (Age ${lifeExpectancy})`;
        
        // Clear existing milestone markers
        milestonesContainer.innerHTML = '';
        
        // Clear category event containers
        familyEventsContainer.innerHTML = '';
        educationEventsContainer.innerHTML = '';
        careerEventsContainer.innerHTML = '';
        otherEventsContainer.innerHTML = '';
        
        // Add milestone markers to the timeline and category lines
        userData.milestones.forEach(milestone => {
            // Add to main timeline
            if (milestone.type === 'point') {
                // Create point event (milestone)
                const milestoneDate = new Date(milestone.date);
                const position = calculateTimelinePosition(milestoneDate, birthdate, endDate);
                
                // Create milestone marker for main timeline
                const marker = document.createElement('div');
                marker.className = `milestone-marker ${milestone.category || 'other'}`;
                marker.style.left = `${position}%`;
                
                // Create tooltip
                const tooltip = createTooltip(milestone, milestoneDate);
                
                marker.appendChild(tooltip);
                milestonesContainer.appendChild(marker);
                
                // Create point event for category timeline
                const categoryContainer = getCategoryContainer(milestone.category);
                const categoryPoint = document.createElement('div');
                categoryPoint.className = `category-point-event ${milestone.category || 'other'}`;
                categoryPoint.style.left = `${position}%`;
                
                // Clone tooltip for category point
                const categoryTooltip = tooltip.cloneNode(true);
                categoryPoint.appendChild(categoryTooltip);
                categoryContainer.appendChild(categoryPoint);
            } else {
                // Create period event
                const startDate = new Date(milestone.startDate);
                let endDate;
                
                if (milestone.ongoing) {
                    endDate = new Date(); // Current date for ongoing events
                } else if (milestone.endDate) {
                    endDate = new Date(milestone.endDate);
                } else {
                    endDate = startDate; // Fallback to start date if no end date
                }
                
                const startPosition = calculateTimelinePosition(startDate, birthdate, endDate);
                const endPosition = calculateTimelinePosition(endDate, birthdate, endDate);
                const width = endPosition - startPosition;
                
                // Create period container for main timeline
                const periodContainer = document.createElement('div');
                periodContainer.className = `period-event ${milestone.category || 'other'}`;
                periodContainer.style.left = `${startPosition}%`;
                periodContainer.style.width = `${width > 0 ? width : 0.5}%`; // Minimum width for visibility
                
                // Create start marker
                const startMarker = document.createElement('div');
                startMarker.className = `period-event-marker start ${milestone.category || 'other'}`;
                
                // Create end marker (only if not ongoing)
                if (!milestone.ongoing) {
                    const endMarker = document.createElement('div');
                    endMarker.className = `period-event-marker end ${milestone.category || 'other'}`;
                    periodContainer.appendChild(endMarker);
                }
                
                // Create tooltip
                const tooltip = createTooltip(milestone, startDate, endDate);
                
                periodContainer.appendChild(startMarker);
                periodContainer.appendChild(tooltip);
                milestonesContainer.appendChild(periodContainer);
                
                // Create period event for category timeline
                const categoryContainer = getCategoryContainer(milestone.category);
                const categoryPeriod = document.createElement('div');
                categoryPeriod.className = `category-event ${milestone.category || 'other'}`;
                categoryPeriod.style.left = `${startPosition}%`;
                categoryPeriod.style.width = `${width > 0 ? width : 0.5}%`;
                
                // Clone tooltip for category period
                const categoryTooltip = tooltip.cloneNode(true);
                categoryPeriod.appendChild(categoryTooltip);
                categoryContainer.appendChild(categoryPeriod);
            }
        });
        
        // Update the milestones timeline
        updateMilestonesTimeline();
    }
    
    // Function to create a tooltip for an event
    function createTooltip(event, startDate, endDate) {
        const tooltip = document.createElement('div');
        tooltip.className = 'milestone-tooltip';
        
        const title = document.createElement('div');
        title.className = 'milestone-title';
        title.textContent = event.title;
        
        // Add category label
        const category = document.createElement('div');
        category.className = `milestone-category ${event.category || 'other'}`;
        category.textContent = event.category ? 
            event.category.charAt(0).toUpperCase() + event.category.slice(1) : 
            'Other';
        
        const date = document.createElement('div');
        date.className = 'milestone-date';
        
        if (event.type === 'period') {
            date.textContent = formatPeriodForDisplay(startDate, endDate, event.ongoing);
        } else {
            date.textContent = formatDateForDisplay(startDate);
        }
        
        const description = document.createElement('div');
        description.className = 'milestone-description';
        description.textContent = event.description || '';
        
        tooltip.appendChild(title);
        tooltip.appendChild(category);
        tooltip.appendChild(date);
        if (event.description) {
            tooltip.appendChild(description);
        }
        
        return tooltip;
    }
    
    // Function to update the milestones timeline
    function updateMilestonesTimeline() {
        milestonesTimeline.innerHTML = '';
        
        if (userData.milestones.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No events added yet. Click the + button above to add your first event.';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = 'var(--dark-gray)';
            emptyMessage.style.padding = '2rem 0';
            milestonesTimeline.appendChild(emptyMessage);
            return;
        }
        
        // Sort milestones by date
        const sortedMilestones = [...userData.milestones].sort((a, b) => {
            const dateA = a.type === 'period' ? new Date(a.startDate) : new Date(a.date);
            const dateB = b.type === 'period' ? new Date(b.startDate) : new Date(b.date);
            return dateA - dateB;
        });
        
        // Add each milestone to the timeline
        sortedMilestones.forEach((milestone, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${milestone.category || 'other'}`;
            
            const timelineContent = document.createElement('div');
            timelineContent.className = 'timeline-content';
            
            const titleContainer = document.createElement('div');
            titleContainer.className = 'timeline-title';
            
            const title = document.createElement('span');
            title.textContent = milestone.title;
            
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'timeline-delete';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Delete event';
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this event?')) {
                    userData.milestones.splice(index, 1);
                    updateLifeline();
                    saveUserData();
                }
            });
            
            titleContainer.appendChild(title);
            titleContainer.appendChild(deleteBtn);
            
            const date = document.createElement('div');
            date.className = 'timeline-date';
            
            if (milestone.type === 'period') {
                const startDate = new Date(milestone.startDate);
                let endDate = null;
                if (!milestone.ongoing && milestone.endDate) {
                    endDate = new Date(milestone.endDate);
                }
                date.textContent = formatPeriodForDisplay(startDate, endDate, milestone.ongoing);
                
                // Add a badge to indicate it's a period
                const periodBadge = document.createElement('span');
                periodBadge.className = 'period-badge';
                periodBadge.textContent = 'PERIOD';
                titleContainer.appendChild(periodBadge);
            } else {
                date.textContent = formatDateForDisplay(milestone.date);
            }
            
            const category = document.createElement('div');
            category.className = `timeline-category ${milestone.category || 'other'}`;
            category.textContent = milestone.category ? 
                milestone.category.charAt(0).toUpperCase() + milestone.category.slice(1) : 
                'Other';
            
            timelineContent.appendChild(titleContainer);
            timelineContent.appendChild(date);
            timelineContent.appendChild(category);
            
            if (milestone.description) {
                const description = document.createElement('div');
                description.className = 'timeline-description';
                description.textContent = milestone.description;
                timelineContent.appendChild(description);
            }
            
            timelineItem.appendChild(timelineContent);
            milestonesTimeline.appendChild(timelineItem);
        });
    }
    
    // Function to check if user is logged in
    function checkUserLogin() {
        const username = sessionStorage.getItem('myLifelineCurrentUser');
        if (username) {
            currentUser = username;
            usernameDisplay.textContent = username;
            userSection.classList.remove('hidden');
            authButtons.classList.add('hidden');
            
            // Load user data from users database
            loadUserDataFromAccount();
        } else {
            currentUser = null;
            userSection.classList.add('hidden');
            authButtons.classList.remove('hidden');
            
            // Load data from local storage (guest mode)
            loadGuestData();
        }
    }
    
    // Function to save user data
    function saveUserData() {
        if (currentUser) {
            // Save to user account
            saveUserDataToAccount();
        } else {
            // Save to local storage (guest mode)
            saveGuestData();
            
            // Show save prompt if user has data but is not logged in
            if (userData.birthdate && userData.milestones.length > 0) {
                guestSavePrompt.classList.remove('hidden');
            }
        }
    }
    
    // Function to save data to guest local storage
    function saveGuestData() {
        localStorage.setItem('myLifelineGuestData', JSON.stringify(userData));
    }
    
    // Function to load data from guest local storage
    function loadGuestData() {
        const savedData = localStorage.getItem('myLifelineGuestData');
        if (savedData) {
            userData = JSON.parse(savedData);
            
            // Update the form with saved data
            if (userData.birthdate) {
                document.getElementById('birthdate').value = formatDate(userData.birthdate);
            }
            
            if (userData.lifeExpectancy) {
                document.getElementById('life-expectancy').value = userData.lifeExpectancy;
            }
            
            // Show the lifeline if we have birthdate data
            if (userData.birthdate) {
                inputSection.classList.add('hidden');
                lifelineSection.classList.remove('hidden');
                updateLifeline();
                
                // Show save prompt if user has data but is not logged in
                if (userData.milestones.length > 0) {
                    guestSavePrompt.classList.remove('hidden');
                }
            }
        }
    }
    
    // Function to save data to user account
    function saveUserDataToAccount() {
        const users = JSON.parse(localStorage.getItem('myLifelineUsers') || '{}');
        
        if (users[currentUser]) {
            // Update user data
            users[currentUser].lifeExpectancy = userData.lifeExpectancy;
            users[currentUser].milestones = userData.milestones;
            users[currentUser].lastUpdated = new Date().toISOString();
            
            // Save back to localStorage
            localStorage.setItem('myLifelineUsers', JSON.stringify(users));
        }
    }
    
    // Function to load data from user account
    function loadUserDataFromAccount() {
        const users = JSON.parse(localStorage.getItem('myLifelineUsers') || '{}');
        
        if (users[currentUser]) {
            // Load user data
            userData.birthdate = new Date(users[currentUser].birthdate);
            userData.lifeExpectancy = users[currentUser].lifeExpectancy || 80;
            userData.milestones = users[currentUser].milestones || [];
            
            // Update the form with saved data
            document.getElementById('birthdate').value = formatDate(userData.birthdate);
            document.getElementById('life-expectancy').value = userData.lifeExpectancy;
            
            // Show the lifeline
            inputSection.classList.add('hidden');
            lifelineSection.classList.remove('hidden');
            updateLifeline();
            
            // Hide guest save prompt
            guestSavePrompt.classList.add('hidden');
        } else {
            // Try to load predefined events if available
            const predefinedData = loadPredefinedEvents(currentUser);
            if (predefinedData) {
                userData.birthdate = new Date(predefinedData.birthdate);
                userData.lifeExpectancy = predefinedData.lifeExpectancy || 80;
                userData.milestones = predefinedData.milestones || [];
                
                // Update the form with predefined data
                document.getElementById('birthdate').value = formatDate(userData.birthdate);
                document.getElementById('life-expectancy').value = userData.lifeExpectancy;
                
                // Show the lifeline
                inputSection.classList.add('hidden');
                lifelineSection.classList.remove('hidden');
                updateLifeline();
                
                // Save the predefined data to user account
                saveUserDataToAccount();
            }
        }
    }
    
    // Function to open a modal
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close a modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to close all modals
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            closeModal(modal);
        });
    }
    
    // Function to toggle between point and period event types
    function toggleEventType(type) {
        if (type === 'point') {
            pointEventBtn.classList.add('active');
            periodEventBtn.classList.remove('active');
            milestoneTypeInput.value = 'point';
            
            // Show point event fields, hide period event fields
            pointEventFields.forEach(field => field.classList.remove('hidden'));
            periodEventFields.forEach(field => field.classList.add('hidden'));
            
            // Make point event date required, period event dates not required
            document.getElementById('milestone-date').required = true;
            document.getElementById('milestone-start-date').required = false;
            document.getElementById('milestone-end-date').required = false;
        } else {
            pointEventBtn.classList.remove('active');
            periodEventBtn.classList.add('active');
            milestoneTypeInput.value = 'period';
            
            // Show period event fields, hide point event fields
            pointEventFields.forEach(field => field.classList.add('hidden'));
            periodEventFields.forEach(field => field.classList.remove('hidden'));
            
            // Make period event start date required, point event date not required
            document.getElementById('milestone-date').required = false;
            document.getElementById('milestone-start-date').required = true;
            document.getElementById('milestone-end-date').required = !milestoneOngoingCheckbox.checked;
        }
    }
    
    // Event listener for the main form submission
    lifelineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const birthdate = new Date(document.getElementById('birthdate').value);
        const lifeExpectancy = parseInt(document.getElementById('life-expectancy').value);
        
        // Update user data
        userData.birthdate = birthdate;
        userData.lifeExpectancy = lifeExpectancy;
        
        // Update the visualization
        updateLifeline();
        
        // Save the data
        saveUserData();
        
        // Show the lifeline section
        inputSection.classList.add('hidden');
        lifelineSection.classList.remove('hidden');
    });
    
    // Event listener for the milestone form submission
    milestoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const eventType = milestoneTypeInput.value;
        const title = document.getElementById('milestone-title').value;
        const category = document.getElementById('milestone-category').value;
        const description = document.getElementById('milestone-description').value;
        
        let newMilestone;
        
        if (eventType === 'point') {
            // Point event (single date)
            const date = document.getElementById('milestone-date').value;
            
            newMilestone = {
                type: 'point',
                date,
                title,
                category,
                description
            };
        } else {
            // Period event (start and end dates)
            const startDate = document.getElementById('milestone-start-date').value;
            const ongoing = document.getElementById('milestone-ongoing').checked;
            let endDate = null;
            
            if (!ongoing) {
                endDate = document.getElementById('milestone-end-date').value;
                if (!endDate) {
                    alert('Please provide an end date or check "Ongoing".');
                    return;
                }
            }
            
            newMilestone = {
                type: 'period',
                startDate,
                endDate,
                ongoing,
                title,
                category,
                description
            };
        }
        
        // Add the milestone to user data
        userData.milestones.push(newMilestone);
        
        // Update the visualization
        updateLifeline();
        
        // Save the data
        saveUserData();
        
        // Reset the form and close the modal
        milestoneForm.reset();
        toggleEventType('point'); // Reset to point event type
        closeModal(milestoneModal);
    });
    
    // Event listener for the login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
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
        
        // Close the modal
        closeModal(loginModal);
        
        // Refresh user status
        checkUserLogin();
    });
    
    // Event listener for the signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
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
        
        // Close the modal
        closeModal(signupModal);
        
        // Refresh user status
        checkUserLogin();
    });
    
    // Event listener for the reset button
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your lifeline? This will clear all your data.')) {
            // Reset the form
            lifelineForm.reset();
            
            // Clear user data
            userData = {
                birthdate: null,
                lifeExpectancy: 80,
                milestones: []
            };
            
            // Save the cleared data
            saveUserData();
            
            // Hide lifeline section and show input section
            lifelineSection.classList.add('hidden');
            inputSection.classList.remove('hidden');
            
            // Hide guest save prompt
            guestSavePrompt.classList.add('hidden');
        }
    });
    
    // Event listener for the save button
    saveBtn.addEventListener('click', () => {
        if (currentUser) {
            saveUserData();
            alert('Your data has been saved to your account!');
        } else {
            // Show save prompt
            guestSavePrompt.classList.remove('hidden');
        }
    });
    
    // Event listener for the logout button
    logoutBtn.addEventListener('click', () => {
        // Clear session storage
        sessionStorage.removeItem('myLifelineCurrentUser');
        
        // Reset current user
        currentUser = null;
        
        // Hide user section and show auth buttons
        userSection.classList.add('hidden');
        authButtons.classList.remove('hidden');
        
        // Reload the page to reset the state
        window.location.reload();
    });
    
    // Event listeners for opening modals
    addMilestoneBtn.addEventListener('click', () => {
        // Pre-fill the date field with today's date
        document.getElementById('milestone-date').value = formatDate(new Date());
        document.getElementById('milestone-start-date').value = formatDate(new Date());
        openModal(milestoneModal);
    });
    
    loginHeaderBtn.addEventListener('click', () => {
        openModal(loginModal);
    });
    
    signupHeaderBtn.addEventListener('click', () => {
        openModal(signupModal);
    });
    
    // Event listeners for guest save prompt buttons
    goToLoginBtn.addEventListener('click', () => {
        guestSavePrompt.classList.add('hidden');
        openModal(loginModal);
    });
    
    goToSignupBtn.addEventListener('click', () => {
        guestSavePrompt.classList.add('hidden');
        // Pre-fill the signup form with the birthdate
        document.getElementById('signup-birthdate').value = formatDate(userData.birthdate);
        openModal(signupModal);
    });
    
    continueAsGuestBtn.addEventListener('click', () => {
        guestSavePrompt.classList.add('hidden');
    });
    
    // Event listeners for closing modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    cancelModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Event listeners for switching between login and signup
    switchToSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    
    switchToLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
    
    // Event listeners for event type buttons
    pointEventBtn.addEventListener('click', () => {
        toggleEventType('point');
    });
    
    periodEventBtn.addEventListener('click', () => {
        toggleEventType('period');
    });
    
    // Event listener for ongoing checkbox
    milestoneOngoingCheckbox.addEventListener('change', () => {
        if (milestoneOngoingCheckbox.checked) {
            milestoneEndDateInput.disabled = true;
            milestoneEndDateInput.required = false;
        } else {
            milestoneEndDateInput.disabled = false;
            milestoneEndDateInput.required = true;
        }
    });
    
    // Check if user is logged in and load appropriate data
    checkUserLogin();
    
    // Initialize event type to point
    toggleEventType('point');
});