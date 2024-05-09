// Hide the navbar initially
document.getElementById("webgazerNavbar").style.display = "none";

// Initialize WebGazer
console.log("Initializing WebGazer...");
webgazer.begin();

var animationFrameId = null; // Variable to store the animation frame ID
var fontSize = 1.2; // Initial font size

// Set up gaze listener
webgazer.setGazeListener(function(data, elapsedTime) {
    console.log("Gaze event triggered...");
    // Check if gaze data is not null
    if (data != null) {
        // Access predicted gaze coordinates
        var xprediction = data.x;
        var yprediction = data.y;

        // Get the element under the gaze
        var elementUnderGaze = document.elementFromPoint(xprediction, yprediction);

        // Check if the element under the gaze is a paragraph inside .headline-container
        if (elementUnderGaze && elementUnderGaze.tagName.toLowerCase() === 'p' && elementUnderGaze.closest('.headline-container')) {
            // Start increasing font size when the gaze is directly over the paragraph
            console.log("Paragraph under gaze: " + elementUnderGaze.innerText);
            continuousFontSizeIncrease(elementUnderGaze);
        } else {
            // If gaze is not over a paragraph, cancel ongoing font size animation
            console.log("No paragraph under gaze. Cancelling animation...");
            cancelAnimation(); // Cancel animation when gaze moves away
        }
    } else {
        console.log("Gaze data is null.");
    }
});

// Function to continuously increase font size
function continuousFontSizeIncrease(paragraph) {
    console.log("Increasing font size...");
    // Function to increase font size
    function increaseFontSize() {
        fontSize += 0.1; // Increase font size by 0.1 each time
        paragraph.style.fontSize = fontSize + 'em'; // Apply new font size

        animationFrameId = requestAnimationFrame(increaseFontSize); // Request next animation frame
    }

    // Start increasing font size only if animation is not already running
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(increaseFontSize);
    }
}


// Function to cancel animation
function cancelAnimation() {
    console.log("Cancelling animation...");
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId); // Cancel ongoing font size animation
        animationFrameId = null; // Reset animationFrameId
    }
}

// Function to generate circles for each headline item
function generateCircles() {
    var headlineItems = document.querySelectorAll('.headline-item');
    // Remove any existing circles
    document.querySelectorAll('.circle').forEach(circle => circle.remove());
    // Loop through the headline items to add circles between them
    for (var i = 0; i < headlineItems.length - 1; i++) {
        // Create a new circle element
        var circle = document.createElement('div');
        circle.classList.add('circle');
        // Append the circle element to the next headline item
        headlineItems[i + 1].querySelector('.headline-wrapper').appendChild(circle);
    }
}



// Define an array of keywords
var keywords = [
    "drake", 
    "starwars", 
    "kendricklamar", 
    "kendrick", 
    "maythe4thbewithyou",
    "diadelasmadres",
    "cincodemayo",
    "maythe4th",
    "may4th",
    "starwarsday",
    "familymatters",
    "kentuckyderby",
    "kdot",
    "beef",
    "пасха",
    "diss",
    "canelo",
    "rapbeef",
    "metagala",
    "disstrack",
    "jcole",
    "darthvader",
    "maytheforcebewithyou",
    "starwarstiktok",
    "starwarsfan",
    "caneloalvarez",
    "theamazingdigitalcircus",
    "anakinskywalker",
    "youngsheldon",
    "tadc",
    "drakediss",
    "derby",
    "jedi",
    "maythefourthbewithyou",
    "kyrieirving",
    "lightsaber",
    "fnf",
    "munguia",
    "ovo",
    "maythefourth",
    "caneloalvarez🇲🇽",
    "drakevskendrick",
    "lukeskywalker",
    "drizzy",
    "yoda",
    "fridaynightfunkin",
    "sith",
    "viraledits",
    "wwwbacklash",
    "starwarsedit",
    "pomni",
    "loversandfriends",
    "youngsheldonedit",
    "jaimemunguia",
    "textedits",
    "obiwankenobi",
    "showclips",
    "kendrickdiss",
    "may4thbewithyou",
    "jax",
    "textedit",
    "happysaturday",
    "911onabc",
    "rapbattle",
    "obiwan",
    "youngsheldonmissy",
    "youngsheldonmissyedit",
    "digitalcircus",
    "miamigp",
    "aebriann",
    "keyshiacole",
    "galaxyedge",
    "clonewars",
    "collegegrad",
    "backlash",
    "canelomunguia",
    "5demayo",
    "legostarwars",
    "mandalorian",
    "earthquake",
    "maestro",
    "yuri",
    "summit"
];

// Function to shuffle the array randomly
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/// Function to generate headline items dynamically
function generateHeadlineItems() {
    // Shuffle the array to randomize the order
    shuffleArray(keywords);
    
    // Get the headline container
    var headlineContainer = document.getElementById("headlineContainer");
    
    // Clear any existing items
    headlineContainer.innerHTML = "";
    
    // Calculate the maximum number of headlines that can fit within the container
    var maxHeadlines = 60; // Maximum number of headlines
    
    // Loop through the shuffled array and create headline items until the maximum number is reached or the array ends
    for (var i = 0; i < Math.min(maxHeadlines, keywords.length); i++) {
        // Create headline item container
        var headlineItem = document.createElement("div");
        headlineItem.classList.add("headline-item");
        
        // Create wrapper div for paragraph and circle
        var wrapper = document.createElement("div");
        wrapper.classList.add("headline-wrapper");
        
        // Create paragraph element for the keyword
        var paragraph = document.createElement("p");
        paragraph.textContent = keywords[i];
        
        // Append paragraph to wrapper
        wrapper.appendChild(paragraph);
        
        // Append wrapper to headline item
        headlineItem.appendChild(wrapper);
        
        // Append headline item to headline container
        headlineContainer.appendChild(headlineItem);
    }

    // Add circles between headline items
    var headlineItems = document.querySelectorAll('.headline-item');
    headlineItems.forEach(function(item, index) {
        // Create a new circle element for even indices
        if (index % 2 === 0) {
            var circle = document.createElement('div');
            circle.classList.add('circle');
            // Append the circle element to the headline wrapper
            item.querySelector('.headline-wrapper').appendChild(circle);
        }
    });
}





// Call the function to generate headline items
generateHeadlineItems();


// Call the function to generate circles
generateCircles();

// Add the rest of the code from main.js here

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and resetting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
    // Show the navbar after calibration is complete
    document.getElementById("webgazerNavbar").style.display = "block";
}
