// window.onload = function() {
//     // Adjust the value (100 in this case) to scroll more or less
//     window.scrollBy(0, -100); // Negative value scrolls up
// }

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
                    <a class="carousel-item" href="#${index + 1}!">
                        <div class="card">
                            <div class="card-image">
                                <img src="${dokter.foto}" class="responsive-img">
                                <div class="activator waves-effect waves-light" style="position:absolute;top:0;bottom:0;right:0;left:0;"></div>
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

    // Carousel Result Image Function
    var resultSlider = document.querySelectorAll('#carousel-result');
    var resultInstances = M.Carousel.init(resultSlider, {
        duration: 200,
        // dist: -150,
        fullWidth: true,
        indicators: true
    });
    setInterval(function() {
        M.Carousel.getInstance(resultSlider[0]).next();
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

// // Function to handle NAVBAR in small screen
// const hamburgerIcon = document.querySelector('.hamburger-icon');
// const navWrapperContent = document.querySelector('.nav-wrapper-content');

// // Function to handle the visibility of nav-wrapper-content
// function toggleNavContentVisibility() {
//     if (window.getComputedStyle(hamburgerIcon).display === 'none') {
//         // Hamburger icon is hidden, show nav-wrapper-content
//         navWrapperContent.style.display = 'block';
//     } else {
//         // Hamburger icon is shown, hide nav-wrapper-content
//         navWrapperContent.style.display = 'none';
//     }
// }

// // Initial call to set initial visibility
// toggleNavContentVisibility();

// // Listen for window resize event to update visibility
// window.addEventListener('resize', toggleNavContentVisibility);
