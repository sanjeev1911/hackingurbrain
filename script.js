// Event listeners for buttons
document.getElementById('calculate-button').addEventListener('click', calculateCarbonFootprint);
document.getElementById('button-17').addEventListener('click', showPopup);
document.getElementById('close-popup').addEventListener('click', hidePopup);

// Facts to display in the popup
const texts = [
    "Each year, human activities release over 40 billion tCO₂ into the atmosphere.",
    "The production of one kilogram of beef is associated with approximately 26 kgCO₂ emissions.",
    "The transportation sector accounts for nearly 25% of global CO₂ emissions.",
    "Deforestation contributes to about 10% of global carbon emissions.",
    "Driving an electric vehicle can reduce an individual's carbon footprint by around 50% compared to a conventional gasoline-powered car.",
    // Add more facts as needed
];

// Country-specific emission factors (example values)
const countryFactors = {
    "USA": 1.2,
    "Canada": 1.1,
    "UK": 0.9,
    "Germany": 0.8,
    "India": 0.6,
    "Australia": 1.0,
    "China": 1.3,
    "Brazil": 0.7,
    // Add more countries and their factors as needed
};

// Function to calculate carbon footprint
function calculateCarbonFootprint() {
    // Household Inputs
    const numPeople = parseFloat(document.getElementById('num-people').value) || 0;
    const country = document.getElementById('country').value;
    const housingSize = parseFloat(document.getElementById('housing-size').value) || 0;
    const housingType = document.getElementById('housing-type').value;
    const electricityConsumption = parseFloat(document.getElementById('electricity-consumption').value) || 0;
    const cleanEnergySource = parseFloat(document.getElementById('clean-energy-source').value) || 0;

    // Transport Inputs
    const intercityTrainHours = parseFloat(document.getElementById('intercity-train').value) || 0;
    const subwayHours = parseFloat(document.getElementById('subway').value) || 0;
    const intercityBusHours = parseFloat(document.getElementById('intercity-bus').value) || 0;
    const cityBusHours = parseFloat(document.getElementById('city-bus').value) || 0;
    const tramHours = parseFloat(document.getElementById('tram').value) || 0;
    const bikeWalkHours = parseFloat(document.getElementById('bike-walk').value) || 0;

    const useCar = document.getElementById('use-car').value;
    const useMotorbike = document.getElementById('use-motorbike').value;

    // Flight Inputs
    const privateFlights = parseFloat(document.getElementById('private-flights').value) || 0;
    const veryLongRangeFlights = parseFloat(document.getElementById('very-long-range-flights').value) || 0;
    const longRangeFlights = parseFloat(document.getElementById('long-range-flights').value) || 0;
    const mediumRangeFlights = parseFloat(document.getElementById('medium-range-flights').value) || 0;
    const shortRangeFlights = parseFloat(document.getElementById('short-range-flights').value) || 0;

    // Lifestyle Inputs
    const preferredDiet = document.getElementById('preferred-diet').value;
    const buyLocal = document.getElementById('buy-local').value;
    const buyEnvironmentallyResponsible = document.getElementById('buy-environmentally-responsible').value;
    const eatOutTimes = parseFloat(document.getElementById('eat-out').value) || 0;

    // Get the country factor
    const countryFactor = countryFactors[country] || 1; // Default to 1 if no country is selected

    // Calculate the carbon footprint
    const householdFootprint = (electricityConsumption * (1 - cleanEnergySource / 100) * 0.5) * countryFactor; // Example factor for electricity
        const transportFootprint = (intercityTrainHours * 0.1 + subwayHours * 0.05 + intercityBusHours * 0.1 + cityBusHours * 0.05 + tramHours * 0.05 + bikeWalkHours * 0.01) * countryFactor; // Example factors for public transport

    // Car and motorbike usage
    const carFootprint = (useCar === "yes" ? 0.2 * numPeople : 0); // Example factor for car usage
    const motorbikeFootprint = (useMotorbike === "yes" ? 0.1 * numPeople : 0); // Example factor for motorbike usage

    // Calculate flight emissions (example values)
    const flightEmissions = (veryLongRangeFlights * 4.0) + 
                            (longRangeFlights * 2.5) + 
                            (mediumRangeFlights * 1.5) + 
                            (shortRangeFlights * 0.5); // Example factors for flights

    const totalFlightFootprint = flightEmissions * countryFactor;

    // Lifestyle Footprint Calculations
    let lifestyleFootprint = 0;

    // Diet impact on carbon footprint
    switch (preferredDiet) {
        case 'meat':
            lifestyleFootprint += 1.5 * numPeople; // Higher impact for meat-heavy diets
            break;
        case 'vegetarian':
            lifestyleFootprint += 1.0 * numPeople; // Moderate impact for vegetarian diets
            break;
        case 'vegan':
            lifestyleFootprint += 0.5 * numPeople; // Lower impact for vegan diets
            break;
        case 'mixed':
            lifestyleFootprint += 1.2 * numPeople; // Mixed diet impact
            break;
    }

    // Local products impact
    if (buyLocal === "yes") {
        lifestyleFootprint -= 0.2 * numPeople; // Reduce footprint if buying local
    }

    // Environmentally responsible companies impact
    if (buyEnvironmentallyResponsible === "yes") {
        lifestyleFootprint -= 0.3 * numPeople; // Further reduce footprint if buying responsibly
    }

    // Eating out impact
    lifestyleFootprint += eatOutTimes * 0.1 * numPeople; // Add impact for eating out

    // Total footprint calculation
    const totalFootprint = (householdFootprint + transportFootprint + carFootprint + motorbikeFootprint + totalFlightFootprint + lifestyleFootprint) * numPeople; // Multiply by number of people

    // Display the result
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerText = `Your estimated carbon footprint is ${totalFootprint.toFixed(2)} kgCO₂ per month.`;
    } else {
        console.error("Result element not found.");
    }
}

// Function to show the popup
function showPopup() {
    changeText(); // Set the text before showing the popup
    document.getElementById('popup').style.display = 'block'; // Show the popup
    document.querySelector('.overlay').classList.add('active'); // Show the overlay
}

// Function to hide the popup
function hidePopup() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup
    document.querySelector('.overlay').classList.remove('active'); // Hide the overlay
}

// Function to change the text in the popup
function changeText() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const newText = texts[randomIndex];
    document.getElementById('popupText').innerText = newText; // Update the popup text
}

// Function to open a specific tab
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none"; // Hide all tabs
    }
    document.getElementById(tabName).style.display = "block"; // Show the selected tab

    // Update active tab button
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    // Add event parameter to get the current button
    const currentButton = Array.from(tabButtons).find(button => button.innerText === tabName.charAt(0).toUpperCase() + tabName.slice(1));
    if (currentButton) {
        currentButton.classList.add("active");
    }
}

// Initialize the first tab as active
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('popup').style.display = 'none'; // Hide the popup initially
    openTab('household'); // Open the Household tab by default
});