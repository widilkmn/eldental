// General Function
document.addEventListener('DOMContentLoaded', function() {
    // Side Navigation Function
    var elems = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(elems, {
        edge: "right",
        dragTargetWidth: "30px"
    });

    var menuItems = document.querySelectorAll('.sidenav .menu-item');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            console.log(elems[0]);
            var instance = M.Sidenav.getInstance(elems[0]);
            console.log('Sidenav Instance:', instance);
            if (instance) {
                instance.close();
            }
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
                    <a class="carousel-item" href="#${index + 1}">
                        <div class="card">
                            <div class="card-image">
                                <img src="${dokter.foto}" class="responsive-img">
                            </div>
                            <div class="card-content">
                                <button class="card-title activator btn waves-effect waves-light teal accent-4 jadwal"><p>Info Jadwal</p></button>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title"><i class="material-icons right">close</i>Jadwal</span>
                                <br>
                                ${generateScheduleTable(dokter.jadwal)}
                            </div>
                        </div>
                    </a>
                `;
            });

            carousel.innerHTML = carouselHTML; // Append all cards at once

            // Initialize Materialize Carousel
            var elems = document.querySelectorAll('#schedule');
            var instances;

            // Check if screen size is less than 450px
            if (window.innerWidth < 450) {
                instances = M.Carousel.init(elems, { 
                    dist: -200,
                    duration: 100 
                });
            } else {
                instances = M.Carousel.init(elems, { 
                    duration: 100 
                });
            }
        })
        .catch(error => {
            console.error('Error loading the data:', error);
        });

    // Carousel Image-1 Function
    var aboutImg1Slider = document.querySelector('#carousel-about-img-1');
    var aboutImg1 = M.Carousel.init(aboutImg1Slider, {
        duration: 200,
        // dist: -150,
        fullWidth: true,
        indicators: true
    });

    // Get img-1 instance
    var aboutImg1Instances = M.Carousel.getInstance(aboutImg1Slider);

    document.getElementById('about-img-1-left').addEventListener('click', function() {
        aboutImg1Instances.prev();
    });

    document.getElementById('about-img-1-right').addEventListener('click', function() {
        aboutImg1Instances.next();
    });

    // Carousel Image-2 Function
    var aboutImg2Slider = document.querySelector('#carousel-about-img-2');
    var aboutImg2 = M.Carousel.init(aboutImg2Slider, {
        duration: 200,
        // dist: -150,
        fullWidth: true,
        indicators: true
    });

    // Get img-2 instance
    var aboutImg2Instances = M.Carousel.getInstance(aboutImg2Slider);

    document.getElementById('about-img-2-left').addEventListener('click', function() {
        aboutImg2Instances.prev();
    });

    document.getElementById('about-img-2-right').addEventListener('click', function() {
        aboutImg2Instances.next();
    });

    // Carousel Result Image Function
    var resultSlider = document.querySelector('#carousel-result');
    var resultCarousel = M.Carousel.init(resultSlider, {
        duration: 200,
        // dist: -150,
        fullWidth: true,
        indicators: true
    });

    // Get result-carousel instance
    var resultInstances = M.Carousel.getInstance(resultSlider);

    document.getElementById('result-button-left').addEventListener('click', function() {
        resultInstances.prev();
    });

    document.getElementById('result-button-right').addEventListener('click', function() {
        resultInstances.next();
    });

    // Auto scroll result-carousel
    setInterval(function() {
        resultInstances.next();
    }, 10000);
});

// Function to generate schedule table HTML
function generateScheduleTable(jadwal) {
    let tableHTML = '<table class="centered"><thead><tr><th>Hari</th><th>Jam</th></tr></thead><tbody>';

    for (const [hari, jam] of Object.entries(jadwal)) {
        if (jam !== "") {
            tableHTML += `<tr><td>${hari}</td><td>${jam}</td></tr>`;
        }
    }

    tableHTML += '</tbody></table>';
    return tableHTML;
}

// Get the navigation bar element
const navbar = document.getElementById('main-navbar');
const contactUs = document.getElementById('contact-us');

// Get the initial scroll position
let lastScrollTop = 0;

// Function to handle scroll event
window.addEventListener('scroll', function() {
    
    // Change the Contact Us Button

    // Check if the window width is greater than 992px
    if (window.innerWidth > 992) {
        // Add class to position "Contact Us" image at bottom right
        if (window.scrollY > 0) {
            contactUs.classList.add('bottom-right');
        } else {
            // Remove class if scroll position is at top
            contactUs.classList.remove('bottom-right');
        }
    }


    // Check if screen size is greater than 450px
if (window.innerWidth > 992) {
    // Get the current scroll position
    const scrollTop = document.documentElement.scrollTop;

    // Determine the scroll direction
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden-nav');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden-nav');
        navbar.classList.add('show-nav'); // Add class to show the navigation bar
    }

    // Update the last scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}
});
