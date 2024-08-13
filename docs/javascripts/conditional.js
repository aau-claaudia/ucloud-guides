document$.subscribe(function() {
    // This function executes on `DOMContentLoaded` and on instant navigation

    // Put your code here
    applyConditionalRendering();
});

function applyConditionalRendering() {
    // Get the site title
    var siteTitle = document.title;

    // Determine which content to show based on the site title
    var showOnAiLab = siteTitle.includes("AI-LAB Documentation");
    var showOnAiCloud = siteTitle.includes("AI Cloud Documentation");

    // Store the visibility state in session storage
    sessionStorage.setItem('showOnAiLab', showOnAiLab);
    sessionStorage.setItem('showOnAiCloud', showOnAiCloud);

    // Update the visibility of elements based on stored values
    updateVisibility();
}

function updateVisibility() {
    var showOnAiLab = sessionStorage.getItem('showOnAiLab') === 'true';
    var showOnAiCloud = sessionStorage.getItem('showOnAiCloud') === 'true';

    // Show or hide elements based on stored values
    var elementsLab = document.querySelectorAll('.show-on-ai-lab');
    elementsLab.forEach(function(element) {
        element.style.display = showOnAiLab ? 'block' : 'none';
    });

    var elementsCloud = document.querySelectorAll('.show-on-ai-cloud');
    elementsCloud.forEach(function(element) {
        element.style.display = showOnAiCloud ? 'block' : 'none';
    });
}
