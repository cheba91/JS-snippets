<script async src="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initializeMap"></script>
<script>
  const markers = [];
  function initializeMap() {
    const center = { lat: 39.19596062880188, lng: -76.44212489291941 };
    map = new google.maps.Map(document.querySelector('#gMap'), {});
    // Bound points
    const boundPoints = [
      { lat: 39.77157536723103, lng: -79.54170845672725 },
      { lat: 37.99911287542788, lng: -75.01952969391974 },
    ];
    // Style map
    const styles = [
      { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
      { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
      { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
      { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
      { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
      { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
      { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
      { featureType: 'road.arterial', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
      { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#dadada' }] },
      { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
      { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#e5e5e5' }] },
      { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] },
      { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
    ];
    // Maryland coords
    const marylandCoords = [
      { lat: 39.722, lng: -79.4778 },
      { lat: 39.722, lng: -78.36 },
      { lat: 39.722, lng: -75.7878 },
      { lat: 39.5655, lng: -75.7809 },
      { lat: 39.3152, lng: -75.7617 },
      { lat: 38.9498, lng: -75.7329 },
      { lat: 38.4611, lng: -75.6944 },
      { lat: 38.4515, lng: -74.9859 },
      { lat: 38.0277, lng: -75.169 },
      { lat: 38.0275, lng: -75.2316 },
      { lat: 37.9962, lng: -75.6079 },
      { lat: 37.9951, lng: -75.623 },
      { lat: 37.9464, lng: -75.6436 },
      { lat: 37.9529, lng: -75.7288 },
      { lat: 37.9117, lng: -75.8084 },
      { lat: 37.9095, lng: -75.9512 },
      { lat: 37.9464, lng: -75.943 },
      { lat: 37.9529, lng: -76.0584 },
      { lat: 37.8889, lng: -76.2396 },
      { lat: 37.9474, lng: -76.3454 },
      { lat: 37.9669, lng: -76.4154 },
      { lat: 38.0146, lng: -76.4703 },
      { lat: 38.0275, lng: -76.517 },
      { lat: 38.0751, lng: -76.5363 },
      { lat: 38.1464, lng: -76.6063 },
      { lat: 38.1616, lng: -76.6928 },
      { lat: 38.167, lng: -76.7601 },
      { lat: 38.1637, lng: -76.8494 },
      { lat: 38.208, lng: -76.9482 },
      { lat: 38.2748, lng: -76.9908 },
      { lat: 38.3093, lng: -77.0306 },
      { lat: 38.3761, lng: -77.0114 },
      { lat: 38.4009, lng: -77.043 },
      { lat: 38.3697, lng: -77.0897 },
      { lat: 38.3697, lng: -77.1432 },
      { lat: 38.332, lng: -77.2627 },
      { lat: 38.4525, lng: -77.3135 },
      { lat: 38.5514, lng: -77.2737 },
      { lat: 38.5954, lng: -77.249 },
      { lat: 38.6373, lng: -77.1281 },
      { lat: 38.6737, lng: -77.1378 },
      { lat: 38.7112, lng: -77.076 },
      { lat: 38.7187, lng: -77.0361 },
      { lat: 38.7766, lng: -77.0416 },
      { lat: 38.8451, lng: -77.032 },
      { lat: 38.9025, lng: -77.0708 },
      { lat: 38.957, lng: -77.1395 },
      { lat: 38.9773, lng: -77.2335 },
      { lat: 39.024, lng: -77.2462 },
      { lat: 39.0634, lng: -77.3431 },
      { lat: 39.0717, lng: -77.4351 },
      { lat: 39.0792, lng: -77.4636 },
      { lat: 39.1218, lng: -77.5202 },
      { lat: 39.1804, lng: -77.5092 },
      { lat: 39.2269, lng: -77.4577 },
      { lat: 39.3051, lng: -77.5666 },
      { lat: 39.3067, lng: -77.6321 },
      { lat: 39.3202, lng: -77.7159 },
      { lat: 39.3383, lng: -77.7626 },
      { lat: 39.381, lng: -77.7544 },
      { lat: 39.4288, lng: -77.7602 },
      { lat: 39.4367, lng: -77.8038 },
      { lat: 39.4606, lng: -77.7997 },
      { lat: 39.5019, lng: -77.7859 },
      { lat: 39.5062, lng: -77.8436 },
      { lat: 39.521, lng: -77.8217 },
      { lat: 39.5337, lng: -77.8354 },
      { lat: 39.5231, lng: -77.8656 },
      { lat: 39.5591, lng: -77.8848 },
      { lat: 39.6015, lng: -77.8821 },
      { lat: 39.6078, lng: -77.9974 },
      { lat: 39.6247, lng: -78.0222 },
      { lat: 39.6924, lng: -78.143 },
      { lat: 39.6945, lng: -78.1924 },
      { lat: 39.6839, lng: -78.2062 },
      { lat: 39.6839, lng: -78.2419 },
      { lat: 39.6586, lng: -78.2281 },
      { lat: 39.6226, lng: -78.2776 },
      { lat: 39.6438, lng: -78.3517 },
      { lat: 39.612, lng: -78.3765 },
      { lat: 39.6036, lng: -78.4067 },
      { lat: 39.5824, lng: -78.4177 },
      { lat: 39.575, lng: -78.4245 },
      { lat: 39.5464, lng: -78.4232 },
      { lat: 39.5146, lng: -78.4698 },
      { lat: 39.5189, lng: -78.5687 },
      { lat: 39.5337, lng: -78.6676 },
      { lat: 39.5888, lng: -78.739 },
      { lat: 39.6015, lng: -78.772 },
      { lat: 39.6184, lng: -78.7363 },
      { lat: 39.6438, lng: -78.7775 },
      { lat: 39.6036, lng: -78.7912 },
      { lat: 39.6036, lng: -78.8187 },
      { lat: 39.5549, lng: -78.8571 },
      { lat: 39.4913, lng: -78.9203 },
      { lat: 39.4426, lng: -78.9725 },
      { lat: 39.4834, lng: -79.0542 },
      { lat: 39.4738, lng: -79.0604 },
      { lat: 39.4553, lng: -79.1043 },
      { lat: 39.3853, lng: -79.1936 },
      { lat: 39.3449, lng: -79.2705 },
      { lat: 39.3014, lng: -79.3282 },
      { lat: 39.2535, lng: -79.4044 },
      { lat: 39.2073, lng: -79.4696 },
      { lat: 39.2051, lng: -79.4861 },
      { lat: 39.2546, lng: -79.4861 },
      { lat: 39.3444, lng: -79.4854 },
      { lat: 39.3454, lng: -79.484 },
      { lat: 39.5316, lng: -79.4833 },
      { lat: 39.7214, lng: -79.4772 },
    ];
    const marylandPolygon = new google.maps.Polygon({
      paths: marylandCoords,
      strokeColor: '#13396c',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: '#13396c',
      fillOpacity: 0.1,
    });
    map.setOptions({ styles: styles });
    marylandPolygon.setMap(map);
    const bounds = new google.maps.LatLngBounds();
    boundPoints.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds);
  }

  function addMarker(locationData, cardHours, locationLink) {
    const infoWindow = new google.maps.InfoWindow();
    const markerHTML = document.createElement('div');
    markerHTML.classList.add('marker');
    const marker = new google.maps.Marker({
      position: locationData.location,
      content: markerHTML,
      icon: 'link-to-custom-marker.svg',
      map,
    });
    // Create an infoWindow, center...etc
    ((marker, locationData) => {
      google.maps.event.addListener(marker, 'click', function (e) {
        infoWindow.setContent(`
        <a href="${locationLink}" class="info-window">
            <div class="info-window__row">${locationData.name}</div>
            <div class="info-window__row">${cardHours}</div>
        </a>
        `);
        infoWindow.open(map, marker);
      });
    })(marker, locationData);
    // Save marker
    markers.push(marker);
    google.maps.event.addListener(map, 'click', function () {
      infoWindow.close();
    });
  }
  const mapData = {};
  // Create all initial markers
  window.addEventListener('load', function () {
    const cards = document.querySelectorAll('.map__left .map__left__item');
    cards.forEach((card, i) => {
      // Get data from the card
      const cardName = card.querySelector('.location__full-name').outerHTML;
      const cardCoords = card.querySelector('.location__coords').innerText;
      const cardHours = card.querySelector('.location__hours').outerHTML;
      const locationLink = card.querySelector('.location__link').href;
      const cardLocation = {
        lat: parseFloat(cardCoords.split(',')[0]),
        lng: parseFloat(cardCoords.split(',')[1]),
      };

      // save data
      const locationData = {
        name: cardName,
        location: cardLocation,
      };
      mapData[i] = locationData;
      // Create a marker on the map
      addMarker(locationData, cardHours, locationLink);

      card.addEventListener('click', (e) => {
        cards.forEach((card) => card.classList.remove('active'));
        card.classList.add('active');
        console.log('Card clicked');
        const coords = card.querySelector('.location__coords').textContent;
        const lat = parseFloat(coords.split(',')[0]);
        const lng = parseFloat(coords.split(',')[1]);
        console.log(lat, lng);
        if (!lat || !lng) return;
        const center = { lat, lng };
        map.setZoom(14);
        map.panTo(center);
        // Open the marker that is in the center
        markers.forEach((marker) => {
          if (marker.position.lat() === lat && marker.position.lng() === lng) {
            setTimeout(() => google.maps.event.trigger(marker, 'click'), 200);
          }
        });
      });
    });
  });
