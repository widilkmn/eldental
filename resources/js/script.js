// Side Navigation Function
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(elems, {
        edge: "right",
        dragTargetWidth: "30px",
        preventScrolling: true
    });

    // Get all menu items within the sidenav
    var menuItems = document.querySelectorAll('.sidenav .menu-item');

    // Add click event listener to each menu item
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Close the sidenav after selecting a menu item
            var instance = M.Sidenav.getInstance(elems[0]);
            instance.close();
        });
    });
});

// Carousel Doctor Schedule Function
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data from an external file
    fetch('./resources/dokter.json')
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            // Find the carousel container
            var carousel = document.getElementById('schedule');

            // Function to create carousel items
            data.dokter.forEach(function(dokter, index) {
                var item = document.createElement('a');
                item.className = 'carousel-item';
                item.href = `#${index + 1}!`;
                item.innerHTML = `
                    <div class="card">
                        <div class="card-image">
                            <img src="${dokter.foto}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${dokter.nama}</span>
                            <p>${dokter.title}</p>
                        </div>
                    </div>
                `;

                carousel.appendChild(item);
            });

            // Initialize the Materialize Carousel
            var elems = document.querySelectorAll('.schedule');
            var options = { 
                // indicators: true, 
                // padding: 10,
                // shift: 150,
                dist: -200 
            };
            var instances = M.Carousel.init(elems, options);
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });
});

// Carousel Result Image Function
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('#carousel-result');
    var options = {
        duration: 200,
        dist: -150,
        fullWidth: true,
        indicators: true
        // dist: -150
    }
    var instances = M.Carousel.init(elems, options);
    // Automatically slide the carousel every 3 seconds
    setInterval(function() {
        var carouselInstance = M.Carousel.getInstance(elems[0]); // Assuming only one carousel instance
        carouselInstance.next(); // Navigate to the next slide
    }, 7000); // interval in milliseconds
});

