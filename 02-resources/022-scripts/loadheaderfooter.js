fetch("./02-resources/025-components/header.html")
    .then(response => response.text())
    .then(data => document.getElementById("header").innerHTML = data)
    .catch(error => console.error("Error loading header:", error));

fetch("./02-resources/025-components/footer.html")
    .then(response => response.text())
    .then(data => document.getElementById("footer").innerHTML = data)
    .catch(error => console.error("Error loading footer:", error));
