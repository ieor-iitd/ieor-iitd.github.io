// header-footer-loader.js - Put this in a separate file
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch("/02-resources/025-components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            // Dispatch event AFTER header content is set
            document.dispatchEvent(new Event('headerLoaded'));
        })
        .catch(error => console.error("Error loading header:", error));

    // Load footer
    fetch("/02-resources/025-components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});