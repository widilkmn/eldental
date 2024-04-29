document.addEventListener('DOMContentLoaded', function() {
    // Side Navigation Function
    var elems = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(elems, {
        edge: "right",
        dragTargetWidth: "30px",
        preventScrolling: true
    });

    var menuItems = document.querySelectorAll('.sidenav .menu-item');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            M.Sidenav.getInstance(elems[0]).close();
        });
    });

    // Fetch and process JSON data
    fetch('./resources/dokter.json')
        .then(response => response.json())
        .then(data => {
            var carousel = document.getElementById('schedule');
            var carouselHTML = ''; // Construct HTML string for all cards

            data.dokter.forEach(function(dokter, index) {
                carouselHTML += `
                    <a class="carousel-item" href="#${index + 1}!">
                        <div class="card">
                            <div class="card-image">
                                <img src="${dokter.foto}" class="responsive-img"> <!-- Added responsive-img class -->
                            </div>
                            <div class="card-content">
                                <span class="card-title">${dokter.nama}</span>
                                <p>${dokter.title}</p>
                            </div>
                        </div>
                    </a>
                `;
            });

            carousel.innerHTML = carouselHTML; // Append all cards at once

            // Initialize Materialize Carousel
            var elems = document.querySelectorAll('.schedule');
            var options = { 
                dist: -200,
                duration: 50, // Adjust transition duration
                // indicators: true // Show indicators
            };
            var instances = M.Carousel.init(elems, options);
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });

    // Carousel Result Image Function
    var elems = document.querySelectorAll('#carousel-result');
    var options = {
        duration: 50,
        dist: -150,
        fullWidth: true,
        indicators: true
    };
    var instances = M.Carousel.init(elems, options);
    setInterval(function() {
        M.Carousel.getInstance(elems[0]).next();
    }, 7000);
});
