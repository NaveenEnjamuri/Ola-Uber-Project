let map;
let directionsService;
let directionsRenderer;

function generateLink() {
    var pickupPoint = document.getElementById("pickup").value;
    var destinationPoint = document.getElementById("destination").value;
    if (pickupPoint && destinationPoint) {
        var link = "https://www.google.com/maps/dir/" + encodeURIComponent(pickupPoint) + "/" + encodeURIComponent(destinationPoint);
        window.open(link, "_blank");
    } else {
        alert("Please enter both pickup and destination.");
    }
}  //Directions request failed due to REQUEST_DENIED

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 17.511929601870765, lng: 78.34879393943918 },
        zoom: 8
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
}

function calculateDistance() {
    let pickup = document.getElementById("pickup").value;
    let destination = document.getElementById("destination").value;
    if (pickup && destination) {
        let request = {
            origin: pickup,
            destination: destination,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(result);
                let distance = result.routes[0].legs[0].distance.value; // Distance in meters
                let distanceInKm = distance / 1000; // Convert meters to kilometers
                let bikeFare = calculateFare(distanceInKm, 'bike');
                let carFare = calculateFare(distanceInKm, 'car');
                alert(`Distance: ${distanceInKm.toFixed(2)} km\nBike Fare: $${bikeFare}\nCar Fare: $${carFare}`);
            } else {
                alert('Directions request failed due to ' + status);
            }
        });
    } else {
        alert("Please enter both pickup and destination.");
    }
}

function calculateFare(distance, vehicleType) {
    // Sample fare calculation logic based on distance and vehicle type
    let baseFare = 2; // Base fare for the ride
    let ratePerKm;
    if (vehicleType === 'bike') {
        ratePerKm = 1; // Fare rate per kilometer for bike
    } else if (vehicleType === 'car') {
        ratePerKm = 2; // Fare rate per kilometer for car
    }
    return baseFare + ratePerKm * distance;
}