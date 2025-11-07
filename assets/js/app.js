// DOM Elements
const progressBar = document.querySelector('.loading-progress');
const percentText = document.querySelector('.percent-text');
const logContainer = document.getElementById('log-container');
const logStatus = document.querySelector('.log-status');
const bootScreen = document.getElementById('boot-screen');
const app = document.getElementById('app');

// Boot messages sequence
const bootLines = [
  "Initializing neural core...",
  "Loading user profile...",
  "Verifying data integrity...",
  "Calibrating virtual environment...",
  "Linking sensory systems...",
  "Finalizing system startup..."
];

let progress = 0;
let currentLine = 0;

/**
 * Types out text with a typing animation
 * @param {string} text - The text to type out
 * @param {Function} callback - Function to call when typing is complete
 */
function typeLine(text, callback) {
  let i = 0;
  const line = document.createElement("p");
  line.className = "log-line";
  logContainer.appendChild(line);

  const typer = setInterval(() => {
    line.textContent = "> " + text.slice(0, i++);
    if (i > text.length) {
      clearInterval(typer);
      line.style.border = "none"; // Remove cursor after line is done
      if (callback) callback();
    }
  }, 40); // Typing speed (lower = faster)
}

/**
 * Handles the next step in the boot sequence
 */
function nextStep() {
  if (currentLine < bootLines.length) {
    typeLine(bootLines[currentLine++], () => {
      // Update progress based on number of completed steps
      progress = Math.min(100, Math.floor((currentLine / bootLines.length) * 100));
      
      // Update progress bar and percentage
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (percentText) percentText.textContent = `${progress}%`;
      
      // Update status with current action
      if (logStatus) {
        logStatus.textContent = `Status: ${bootLines[currentLine - 1]}`;
      }
      
      // Add a small delay before next step
      setTimeout(nextStep, 400);
    });
  } else {
    // Boot sequence complete
    if (logStatus) {
      logStatus.textContent = "Status: Boot complete ✓";
    }
    
    // Fade out boot screen and show app
    setTimeout(() => {
      if (bootScreen) {
        bootScreen.style.transition = 'opacity 1s ease-in-out';
        bootScreen.style.opacity = '0';
        
        // After fade out, hide boot screen and show app
        setTimeout(() => {
          bootScreen.style.display = 'none';
          if (app) {
            app.style.display = 'block';
            // Initialize the app
            initApp();
          }
        }, 1000);
      }
    }, 800);
  }
}

/**
 * Initialize the main application
 */
function initApp() {
  console.log('App initialized');
  // Your app initialization code will go here
}

// Start the boot sequence when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Hide app content until loading is complete
  if (app) app.style.display = 'none';
  
  // Start the boot sequence after a short delay
  setTimeout(() => {
    nextStep();
  }, 800);
});