// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Select all our interactive elements
    const planSelect = document.getElementById('plan');
    const monthInput = document.getElementById('months');
    const discountSelect = document.getElementById('discount');
    const priceDisplay = document.getElementById('totalPrice');
    const dynamicFeature = document.getElementById('dynamicFeature');

    // Function to calculate and update the UI
    const updateMembership = () => {
        const basePrice = parseFloat(planSelect.value);
        const months = parseInt(monthInput.value) || 1;
        const discountRate = parseFloat(discountSelect.value);

        // Basic Math: (Price x Months x Discount) / Months for the average
        let total = (basePrice * months) * discountRate;
        let monthlyAverage = total / months;

        // Update Price with 2 decimal places
        priceDisplay.innerText = `$${monthlyAverage.toFixed(2)}`;

        // Dynamic Feature Text Logic
        if (basePrice >= 120) {
            dynamicFeature.innerText = "24/7 Access + Sauna";
            dynamicFeature.style.color = "#00f2fe";
        } else if (basePrice >= 70) {
            dynamicFeature.innerText = "Pool & Classes";
            dynamicFeature.style.color = "#4facfe";
        } else {
            dynamicFeature.innerText = "Standard Hours";
            dynamicFeature.style.color = "#94a3b8";
        }
    };

    // Attach "listeners" to trigger the function whenever something changes
    planSelect.addEventListener('change', updateMembership);
    monthInput.addEventListener('input', updateMembership);
    discountSelect.addEventListener('change', updateMembership);

    // Initial run to set default values
    updateMembership();
});
