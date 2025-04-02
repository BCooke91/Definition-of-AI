// Code for Silly Story
// Story template with placeholders
const storyText = "It was :temperature: outside, so :insertx: went for a walk. When they saw :inserty:, they were shocked. Then, :insertx: :insertz:. They weighed 300 pounds. It was quite the day!";

// Arrays for random selection
const insertX = ["Bob", "Alice", "Charlie"];
const insertY = ["a giant talking frog", "a tiny robot", "a wizard casting spells"];
const insertZ = ["started dancing", "ran away screaming", "took a selfie with them"];

// Function to get a random value from an array
function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to generate the story
function result() {
    let newStory = storyText;
    
    // Select random elements
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    
    // Replace placeholders with random values
    newStory = newStory.replace(/:insertx:/g, xItem)
                       .replace(/:inserty:/g, yItem)
                       .replace(/:insertz:/g, zItem)
                       .replace(":temperature:", "94°F");

    // Custom name replacement
    const customName = document.getElementById("customName").value.trim();
    if (customName.length > 0) {
        newStory = newStory.replace(new RegExp(xItem, "g"), customName);
    }

    // Check if UK units are selected
    if (document.getElementById("ukUnits").checked) {
        // Convert 94°F to Celsius
        let celsius = ((94 - 32) * 5 / 9).toFixed(1);
        newStory = newStory.replace("94°F", `${celsius}°C`);

        // Convert 300 lbs to stones (1 stone = 14 lbs)
        newStory = newStory.replace("300 pounds", `${(300 / 14).toFixed(1)} stones`);
    }

    // Display the story
    document.getElementById("storyOutput").textContent = newStory;
}

// Event listener for the button
document.getElementById("generate").addEventListener("click", result);;
