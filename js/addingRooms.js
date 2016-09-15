function roomInfo(title, rooms, places, classType, floor, price) {
	this.title = title;
	this.rooms = rooms;
	this.places = places;
	this.classType = classType;
	this.floor = floor;
	this.price = price;
};

var roomFirst = new roomInfo('Апартаменти', 2, 2, 'apartment', 2, 650);
var roomSecond = new roomInfo('Стандарт', 1, 2, 'standart', 4, 270);
var roomThird = new roomInfo('Апартаменти', 1, 1, 'apartment', 3, 430);
var roomFourth = new roomInfo('LUX', 2, 2, 'lux', 4, 980);
var roomFifth = new roomInfo('Стандарт', 1, 4, 'standart', 2, 520);
var roomSixth = new roomInfo('LUX', 4, 3, 'lux', 3, 1450);
var roomSeventh = new roomInfo('Апартаменти', 3, 3, 'apartment', 2, 920);
var roomEighth = new roomInfo('Стандарт', 3, 5, 'standart', 4, 870);
var roomNineth = new roomInfo('Апартаменти', 2, 2, 'apartment', 2, 490);
var roomTenth = new roomInfo('LUX', 2, 2, 'lux', 4, 1010);
var roomEleventh = new roomInfo('Стандарт', 2, 4, 'standart', 2, 660);
var roomTwelfth = new roomInfo('LUX', 3, 3, 'lux', 4, 1330);
var roomThirteenth = new roomInfo('Стандарт', 1, 3, 'standart', 2, 330);
var roomFourteenth = new roomInfo('Стандарт', 2, 5, 'standart', 3, 700);
var roomFifteenth = new roomInfo('Апартаменти', 2, 3, 'apartment', 3, 840);
var roomSixteenth = new roomInfo('Стандарт', 1, 1, 'standart', 2, 180);
var roomSeventeenth = new roomInfo('Апартаменти', 1, 2, 'apartment', 3, 320);
var roomEighteenth = new roomInfo('Стандарт', 1, 1, 'standart', 4, 160);

var allRoomsUnfiltered = [roomFirst, roomSecond, roomThird, roomFourth, roomFifth, roomSixth, roomSeventh, roomEighth, roomNineth, roomTenth, roomEleventh, roomTwelfth, roomThirteenth, roomFourteenth, roomFifteenth, roomSixteenth, roomSeventeenth, roomEighteenth];

var allRooms = allRoomsUnfiltered;

document.getElementById('rooms').innerHTML = window.Templates.Rooms(allRooms);

var filterChange = function() {
	allRooms = [roomFirst, roomSecond, roomThird, roomFourth, roomFifth, roomSixth, roomSeventh, roomEighth, roomNineth, roomTenth, roomEleventh, roomTwelfth, roomThirteenth, roomFourteenth, roomFifteenth, roomSixteenth, roomSeventeenth, roomEighteenth];

	allRoomsFiltered = [];

	var roomsSelect = document.getElementById('roomsSelector');
	var placesSelect = document.getElementById('placesSelector');
	var classTypeSelect = document.getElementById('classTypeSelector');

	var selectedRooms = roomsSelect.options[roomsSelect.selectedIndex].value;
	var selectedPlaces = placesSelect.options[placesSelect.selectedIndex].value;
	var selectedTypeSelect = classTypeSelect.options[classTypeSelect.selectedIndex].value;

	console.log(selectedRooms, selectedPlaces, selectedTypeSelect);

	allRooms.forEach(function(room) {
		if ((selectedRooms === 'all' || selectedRooms == room.rooms) && (selectedPlaces == room.places || selectedPlaces === 'all') && (selectedTypeSelect === room.classType || selectedTypeSelect === 'all')) {
			allRoomsFiltered.push(room);
		}
	});

	allRooms = allRoomsFiltered;

	document.getElementById('rooms').innerHTML = window.Templates.Rooms(allRooms);
}

var sortChange = function(select) {
	var selectedSort = select.options[select.selectedIndex].value;

	var allRoomsFiltered = allRooms; 

	console.log(selectedSort, allRooms);

	switch (selectedSort) {
		case 'default':
		function defaultFiltering() {
			return allRoomsFiltered;
		};
		break
		case 'placesToTop':
		function comparePlacesToTop(roomA, roomB) {
			return roomA.places - roomB.places;
		};
		allRoomsFiltered.sort(comparePlacesToTop);
		break
		case 'placesToBottom':
		function comparePlacesToBottom(roomA, roomB) {
			return roomB.places - roomA.places;
		};
		allRoomsFiltered.sort(comparePlacesToBottom);
		break
		case 'priceToTop':
		function comparePriceToTop(roomA, roomB) {
			return roomA.price - roomB.price;
		};
		allRoomsFiltered.sort(comparePriceToTop);
		break
		case 'priceToBottom':
		function comparePriceToBottom(roomA, roomB) {
			return roomB.price - roomA.price;
		};
		allRoomsFiltered.sort(comparePriceToBottom);
		break
		case 'roomsToTop':
		function compareRoomsToTop(roomA, roomB) {
			return roomA.rooms - roomB.rooms;
		};
		allRoomsFiltered.sort(compareRoomsToTop);
		break
		case 'roomsToBottom':
		function compareRoomsToBottom(roomA, roomB) {
			return roomB.rooms - roomA.rooms;
		};
		allRoomsFiltered.sort(compareRoomsToBottom);
	}

	allRooms = allRoomsFiltered; 

	document.getElementById('rooms').innerHTML = window.Templates.Rooms(allRooms);
}