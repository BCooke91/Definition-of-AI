// JavaScript code for image gallery

// Array containing the filenames of images
const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Object containing alternative text for each image
const imageAlts = {
    'pic1.jpg': 'Closeup of a blue human eye',
    'pic2.jpg': 'Rock that looks like a wave',
    'pic3.jpg': 'Purple and white pansies',
    'pic4.jpg': 'Section of wall from a pharaoh\'s tomb',
    'pic5.jpg': 'Large moth on a leaf'
};

// Selecting the required DOM elements
const thumbBar = document.querySelector('.thumb-bar'); // Thumbnail container
const displayedImg = document.querySelector('.displayed-img'); // Main displayed image
const overlay = document.querySelector('.overlay'); // Dark overlay effect
const darkenBtn = document.querySelector('.dark'); // Button to toggle dark mode

// Populate the thumbnail bar with images
images.forEach(filename => { // Loop through each filename in the images array
    const img = document.createElement('img'); // Create a new img element
    img.src = `images/${filename}`;  // Set image source
    img.alt = imageAlts[filename];   // Set alt text for accessibility
    thumbBar.appendChild(img); // Add the image to the thumbnail bar
    
    // Add event listener to change the displayed image when a thumbnail is clicked
    img.addEventListener('click', () => {
        displayedImg.src = img.src; // Update displayed image source
        displayedImg.alt = img.alt; // Update alt text accordingly
    });
});

// Toggle darken effect using the class attribute
darkenBtn.addEventListener('click', () => {
    const btnClass = darkenBtn.getAttribute('class'); // Get current class of the button

    if (btnClass === 'dark') {
        // Apply dark overlay effect
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        darkenBtn.textContent = 'Lighten'; // Change button text
        darkenBtn.setAttribute('class', 'light'); // Change button class to light
    } else {
        // Remove dark overlay effect
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        darkenBtn.textContent = 'Darken'; // Change button text back
        darkenBtn.setAttribute('class', 'dark'); // Change button class back to dark
    }
});