function initializeServiceWindow() {



    // Enter the next service window date here in dd-mm-yyyy format

    ////////////////////////////////// 
    const serviceDateStr = '30-10-2024';
    /////////////////////////////////

    const daysToWarning = 30 // Change when the warning call-out should appear

    const serviceWindow = document.getElementById('service-window-warning');
    const timeToWindow = document.getElementById('time-to-window');


    const serviceDateParts = serviceDateStr.split('-');
    const serviceDate = new Date(serviceDateParts[2], serviceDateParts[1] - 1, serviceDateParts[0]);
    const currentDate = new Date();

    const timeDifference = serviceDate - currentDate;

    // If the service date is within the next 30 days, the show the warning
    if (timeDifference > 0 && timeDifference <= daysToWarning * 24 * 60 * 60 * 1000) {
        serviceWindow.style.display = 'block';
        // Calculate time left
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        timeToWindow.innerHTML = `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, and ${secondsLeft} seconds`;

        document.getElementById('service-date').innerHTML = serviceDateStr;
    } else {
        // If the service date is not within the next 30 days
        serviceWindow.style.display = 'none';
        timeToWindow.innerHTML = '';
    }
};

// Call the initialization function when the page is loaded
initializeServiceWindow();
