// DOM Elements
let startScreen;
let startButton;
let app;
let currentDateElement;

// Initialize the app
function initApp() {
    console.log('Initializing app...');
    
    // Get DOM elements
    startScreen = document.getElementById('startScreen');
    startButton = document.getElementById('startButton');
    app = document.getElementById('app');
    currentDateElement = document.getElementById('currentDate');
    
    // Verify elements exist
    console.log('startScreen:', startScreen);
    console.log('startButton:', startButton);
    console.log('app:', app);
    console.log('currentDateElement:', currentDateElement);
    
    // Set current date
    if (currentDateElement) {
        updateDateTime();
        // Update time every minute
        setInterval(updateDateTime, 60000);
    }
    
    // Add event listeners
    console.log('Adding event listeners...');
    if (startButton) {
        startButton.addEventListener('click', startGame);
        console.log('Start button event listener added');
    } else {
        console.error('Start button not found!');
    }
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize sidebar navigation
    initSidebar();
    
    // Initialize other UI components
    initUIComponents();
    
    console.log('App initialized');
}

// Update date and time display
function updateDateTime() {
    const now = new Date();
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    
    currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions) + ' • ' + 
                                   now.toLocaleTimeString('en-US', timeOptions);
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        element.appendChild(tooltip);
        
        // Position tooltip
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + (element.offsetWidth - tooltip.offsetWidth) / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.classList.add('show');
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    });
}

// Initialize sidebar navigation
function initSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Here you would typically load the appropriate content
            // based on which nav item was clicked
            const section = item.getAttribute('data-section');
            if (section) {
                // Load section content
                console.log(`Loading section: ${section}`);
            }
        });
    });
}

// Initialize other UI components
function initUIComponents() {
    // Initialize any interactive components here
    // For example, modals, dropdowns, etc.
    
    // Example: Toggle notification panel
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            // Toggle notification panel
            console.log('Toggle notifications');
        });
    }
    
    // Close notifications when clicking outside
    document.addEventListener('click', () => {
        // Close any open dropdowns/modals
    });
}

// Start the game
function startGame() {
    console.log('Start game clicked');
    
    if (startScreen) {
        console.log('Hiding start screen');
        startScreen.classList.add('hidden');
    } else {
        console.error('Start screen not found!');
    }
    
    // Add a small delay before showing the game interface
    setTimeout(() => {
        if (app) {
            console.log('Showing app');
            app.classList.add('visible');
            // Additional initialization can go here
        } else {
            console.error('App element not found!');
        }
    }, 500);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);