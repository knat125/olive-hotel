function addMap() {

	var mapProp = {
		center: new google.maps.LatLng(50.480296, 30.480315),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), mapProp);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(50.480296, 30.480315),
		map: map,
		title: 'вулиця Сошенка, 32'
	});
	marker.setMap(map);

}
google.maps.event.addDomListener(window, 'load', addMap);
