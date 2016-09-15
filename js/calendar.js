function calendar(id, year, month) {
	// get the last day of current month
	var Dlast = new Date(year, month+1, 0).getDate(); 
	// get the last number of day in current month
	var D = new Date(year, month, Dlast);
	// get current day
	var DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
	// get first day of this month
	var DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
	var calendar = '<tr></tr>';
	var month = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
	if (DNfirst != 0) {
		for (var i = 1; i < DNfirst; i++) calendar += '<td>';
	}
else {
	for(var i = 0; i < 6; i++) calendar += '<td>';
}
for (var i = 1; i <= Dlast; i++) {
	if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
		calendar += '<td class="today" data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
	}
	else if (Date.parse(new Date()) > Date.parse(new Date(D.getFullYear(), D.getMonth(), i))) {
		calendar += '<td class="past" data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
	}
	else {
		calendar += '<td data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
	}
	if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
		calendar += '<tr>';
	}
}
for (var i = DNlast; i < 7; i++) { 
	calendar += '<td>&nbsp;';
	document.querySelector('#'+id+' tbody').innerHTML = calendar;
	document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
	document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
	if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  
		document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
	}
}
}

calendar('calendarCheckin', new Date().getFullYear(), new Date().getMonth());
/* To the previous month */
document.querySelector('#calendarCheckin thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
	calendar('calendarCheckin', document.querySelector('#calendarCheckin thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarCheckin thead td:nth-child(2)').dataset.month)-1);
}
/* To the next month */
document.querySelector('#calendarCheckin thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
	calendar('calendarCheckin', document.querySelector('#calendarCheckin thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarCheckin thead td:nth-child(2)').dataset.month)+1);
}

calendar('calendarCheckout', new Date().getFullYear(), new Date().getMonth());
/* To the previous month */
document.querySelector('#calendarCheckout thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
	calendar('calendarCheckout', document.querySelector('#calendarCheckout thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarCheckout thead td:nth-child(2)').dataset.month)-1);
}
/* To the next month */
document.querySelector('#calendarCheckout thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
	calendar('calendarCheckout', document.querySelector('#calendarCheckout thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarCheckout thead td:nth-child(2)').dataset.month)+1);
}

var calendarCheckin = document.getElementById('calendarCheckin');
var calendarCheckout = document.getElementById('calendarCheckout');

var checkinInput = document.getElementById('checkinInput');
var checkoutInput = document.getElementById('checkoutInput');
var checkPhone = document.getElementById('phone');
var checkGuests = document.getElementById('guests');

var calendarCheckinBody = document.getElementById('calendarCheckinBody');
var calendarCheckoutBody = document.getElementById('calendarCheckoutBody');

var monthes = {
	0: 'січня',
	1: 'лютого',
	2: 'березня',
	3: 'квітня',
	4: 'травня',
	5: 'червня',
	6: 'липня',
	7: 'серпня',
	8: 'вересня',
	9: 'жовтня',
	10: 'листопада',
	11: 'грудня'
}

var pickedDateIn;
calendarCheckinBody.addEventListener('click', function(event) {
	var inputValue = new Date();
	pickedDateIn = event.target.getAttribute('data-date');
	inputValue.setTime(pickedDateIn);
	if (pickedDateIn >= Date.parse(new Date())) {
		checkinInput.value = inputValue.getDate() +  ' ' + monthes[inputValue.getMonth()] + ', ' + inputValue.getFullYear();
		calendarCheckin.style.display = 'none';
	};
});

var pickedDateOut;
calendarCheckoutBody.addEventListener('click', function(event) {
	var inputValue = new Date();
	pickedDateOut = event.target.getAttribute('data-date');
	inputValue.setTime(pickedDateOut);
	if (pickedDateOut >= Date.parse(new Date())) {
		checkoutInput.value = inputValue.getDate() +  ' ' + monthes[inputValue.getMonth()] + ', ' + inputValue.getFullYear();
		calendarCheckout.style.display = 'none';
	}
});

function getCalendarCheckin() {
	calendarCheckin.style.display = 'block';
}

function hideCalendarCheckin() {
	calendarCheckin.style.display = 'none';
}

function getCalendarCheckout() {
	calendarCheckout.style.display = 'block';
}

function hideCalendarCheckout() {
	calendarCheckout.style.display = 'none';
}

function submitForm() {
	var roomsGrammar = {
		1: 'людину',
		2: 'людей',
		3: 'людей',
		4: 'людей',
		5: 'людей'
	}
	var peopleNumber = document.getElementById('peopleNumber');
	var checkinNumber = document.getElementById('checkinNumber');
	var checkoutNumber = document.getElementById('checkoutNumber');
	var phoneNumber = document.getElementById('phoneNumber');
	var error = document.getElementById('error');
	var popup = document.getElementById('popup');
	var phoneReg = /^(\(?[0-9]{3}\)?)[\s\-_]?[0-9]{3}[\s\-_]?[0-9]{2}[\s\-_]?[0-9]{2}$/;
	var dateReg = /^[0-9]{1,2}\s{1}[а-я]{5,10},\s{1}[0-9]{4}/;
	
	if (checkinInput.value === undefined || checkoutInput.value === undefined || checkPhone.value === undefined || pickedDateIn >= pickedDateOut || phoneReg.test(checkPhone.value) === false || dateReg.test(checkinInput.value) === false || dateReg.test(checkoutInput.value) === false) {
		error.style.display = 'block';
	}
	else {
		error.style.display = 'none';
		checkinNumber.innerHTML = checkinInput.value + ' року';
		checkoutNumber.innerHTML = checkoutInput.value + ' року';
		phoneNumber.innerHTML = checkPhone.value;
		peopleNumber.innerHTML = checkGuests.value + ' ' + roomsGrammar[checkGuests.value];
		popup.style.display = 'block';
		var timerForHiding = setTimeout(function() {
			popup.style.display = 'none';
		}, 8000);
	}
}

function getCertainCalendarCheckin(el) {
	var localStorage = window.localStorage;
	var curRoom = el.getAttribute('data-room');
	var roomNumber;
	var bookedDateCheckin;
	var bookedDateCheckout;

	for (key in localStorage) {
		if (key == curRoom) {
			roomNumber = key;
		}
		if (roomNumber !== undefined) {
			bookedDateCheckin = localStorage[roomNumber].slice(0, 13);
			bookedDateCheckout = localStorage[roomNumber].slice(14, 27);
		}
		else {
			bookedDateCheckin = 0;
			bookedDateCheckout = 0;
		}
	}

	function calendarN(id, year, month) {
		// get the last day of current month
		var Dlast = new Date(year, month+1, 0).getDate(); 
		// get the last number of day in current month
		var D = new Date(year, month, Dlast);
		// get current day
		var DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
		// get first day of this month
		var DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
		var calendarN = '<tr></tr>';
		var month = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
		if (DNfirst != 0) {
			for (var i = 1; i < DNfirst; i++) calendarN += '<td>';
		}
		else {
			for(var i = 0; i < 6; i++) calendarN += '<td>';
		}
		for (var i = 1; i <= Dlast; i++) {
			if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
				calendarN += '<td class="today" data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
			}
			else if (Date.parse(new Date()) > Date.parse(new Date(D.getFullYear(), D.getMonth(), i))) {
				calendarN += '<td class="past" data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
			}
			else if (Number(bookedDateCheckin) <= Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) && Number(bookedDateCheckout) >= Date.parse(new Date(D.getFullYear(), D.getMonth(), i))) {
				calendarN += '<td class="booked" data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
			}
			else {
				calendarN += '<td data-date="' + Date.parse(new Date(D.getFullYear(), D.getMonth(), i)) + '">' + i;
			}
			if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
				calendarN += '<tr>';
			}
		}
		for (var i = DNlast; i < 7; i++) {
			calendarN += '<td>&nbsp;';
			document.querySelector('#'+id+' tbody').innerHTML = calendarN;
			document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
			document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
			document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
			if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  
				document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
			}
		}
	}

document.getElementById('calendars').className = curRoom;
calendarN('certainCalendarCheckin', new Date().getFullYear(), new Date().getMonth());
/* To the previous month */
document.querySelector('#certainCalendarCheckin thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
	calendarN('certainCalendarCheckin', document.querySelector('#certainCalendarCheckin thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#certainCalendarCheckin thead td:nth-child(2)').dataset.month)-1);
}
/* To the next month */
document.querySelector('#certainCalendarCheckin thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
	calendarN('certainCalendarCheckin', document.querySelector('#certainCalendarCheckin thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#certainCalendarCheckin thead td:nth-child(2)').dataset.month)+1);
}
calendarN('certainCalendarCheckout', new Date().getFullYear(), new Date().getMonth());
/* To the previous month */
document.querySelector('#certainCalendarCheckout thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
	calendarN('certainCalendarCheckout', document.querySelector('#certainCalendarCheckout thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#certainCalendarCheckout thead td:nth-child(2)').dataset.month)-1);
}
/* To the next month */
document.querySelector('#certainCalendarCheckout thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
	calendarN('certainCalendarCheckout', document.querySelector('#certainCalendarCheckout thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#certainCalendarCheckout thead td:nth-child(2)').dataset.month)+1);
}

var calendars = document.getElementById('calendars');
calendars.style.display = 'block';

var bookN = document.getElementById('book');
bookN.className = el.getAttribute('data-room');

document.querySelector('#calendars h4').style.display = 'none';
}

var certainCalendarCheckinBody = document.getElementById('certainCalendarCheckinBody');
var certainCalendarCheckoutBody = document.getElementById('certainCalendarCheckoutBody');
var ob = [];

/* Choose checkin date */
certainCalendarCheckinBody.addEventListener('click', function(event) {
	var picked = document.querySelector('#certainCalendarCheckin .picked');
	var checkinDate = event.target.getAttribute('data-date');
	if (picked == null) {
		if (event.target.getAttribute('class') == null || event.target.getAttribute('class').length == 0) {
			event.target.className += 'picked';
			ob[0] = checkinDate;
		}
	}
	else {
		if (event.target.getAttribute('class') == null) {
			picked.className = '';
			event.target.className += 'picked';
			ob[0] = checkinDate;
		}
	}
});
/* Choose checkout date */
certainCalendarCheckoutBody.addEventListener('click', function(event) {
	var picked = document.querySelector('#certainCalendarCheckout .picked');
	var checkoutDate = event.target.getAttribute('data-date');
	if (picked == null) {
		if (event.target.getAttribute('class') == null || event.target.getAttribute('class').length == 0) {
			event.target.className += 'picked';
			ob[1] = checkoutDate;
		}
	}
	else {
		if (event.target.getAttribute('class') == null) {
			picked.className = '';
			event.target.className += 'picked';
			ob[1] = checkoutDate;
		}
	}
});

/* Add new booking to localStorage */
function book() {
	var localStorage = window.localStorage;

	var bookN = document.getElementById('book');
	var room = bookN.getAttribute('class');
	var calendars = document.getElementById('calendars');
	var localStorage = window.localStorage;
	var roomNumber;
	var bookedDateCheckin;
	var bookedDateCheckout;
	var today = Math.round(new Date().getTime());


	for (key in localStorage) {
		if (key == room) {
			roomNumber = key;
		}
		if (roomNumber !== undefined) {
			bookedDateCheckin = localStorage[roomNumber].slice(0, 13);
			bookedDateCheckout = localStorage[roomNumber].slice(14, 27);
			if (today < ob[0] && ob[1] > ob[0] && ob[0] < bookedDateCheckin || ob[0] > bookedDateCheckout && ob[1] < bookedDateCheckin || ob[0] > bookedDateCheckout) {
				localStorage.setItem(room, ob);
				document.querySelector('#calendars h4').style.display = 'none';
				calendars.style.display = 'none';
			}
			else {
				document.querySelector('#calendars h4').style.display = 'block';
			}
		}

		if (roomNumber === undefined) { 
			
			if (today < ob[0] && ob[1] > ob[0]) {
				localStorage.setItem(room, ob);
				calendars.style.display = 'none';
				document.querySelector('#calendars h4').style.display = 'none';
			}		
			else {
				document.querySelector('#calendars h4').style.display = 'block';
			}
		}
	}	
}