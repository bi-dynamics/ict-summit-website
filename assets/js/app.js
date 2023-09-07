$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#subject').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

	var gallery = document.querySelector('.gallery');
	var galleryItems = document.querySelectorAll('.gallery-item');
	var numOfItems = gallery.children.length;
	var itemWidth = 23; // percent: as set in css
	
	var featured = document.querySelector('.featured-item');
	
	var leftBtn = document.querySelector('.move-btn.left');
	var rightBtn = document.querySelector('.move-btn.right');
	var leftInterval;
	var rightInterval;
	
	var scrollRate = 0.2;
	var left;
	
	function selectItem(e) {
		if (e.target.classList.contains('active')) return;
		
		featured.style.backgroundImage = e.target.style.backgroundImage;
		
		for (var i = 0; i < galleryItems.length; i++) {
			if (galleryItems[i].classList.contains('active'))
				galleryItems[i].classList.remove('active');
		}
		
		e.target.classList.add('active');
	}
	
	function galleryWrapLeft() {
		var first = gallery.children[0];
		gallery.removeChild(first);
		gallery.style.left = -itemWidth + '%';
		gallery.appendChild(first);
		gallery.style.left = '0%';
	}
	
	function galleryWrapRight() {
		var last = gallery.children[gallery.children.length - 1];
		gallery.removeChild(last);
		gallery.insertBefore(last, gallery.children[0]);
		gallery.style.left = '-23%';
	}
	
	function moveLeft() {
		left = left || 0;
	
		leftInterval = setInterval(function() {
			gallery.style.left = left + '%';
	
			if (left > -itemWidth) {
				left -= scrollRate;
			} else {
				left = 0;
				galleryWrapLeft();
			}
		}, 1);
	}
	
	function moveRight() {
		//Make sure there is element to the leftd
		if (left > -itemWidth && left < 0) {
			left = left  - itemWidth;
			
			var last = gallery.children[gallery.children.length - 1];
			gallery.removeChild(last);
			gallery.style.left = left + '%';
			gallery.insertBefore(last, gallery.children[0]);	
		}
		
		left = left || 0;
	
		leftInterval = setInterval(function() {
			gallery.style.left = left + '%';
	
			if (left < 0) {
				left += scrollRate;
			} else {
				left = -itemWidth;
				galleryWrapRight();
			}
		}, 1);
	}
	
	function stopMovement() {
		clearInterval(leftInterval);
		clearInterval(rightInterval);
	}
	
	leftBtn.addEventListener('mouseenter', moveLeft);
	leftBtn.addEventListener('mouseleave', stopMovement);
	rightBtn.addEventListener('mouseenter', moveRight);
	rightBtn.addEventListener('mouseleave', stopMovement);
	
	
	//Start this baby up
	(function init() {
		var images = [
			'assets/gallery/0Z7A1904.jpg',
			'assets/gallery/0Z7A1912.jpg',
			'assets/gallery/0Z7A1920.jpg',
			'assets/gallery/0Z7A1913.jpg',
			'assets/gallery/0Z7A1924.jpg',
			'assets/gallery/0Z7A1929.jpg',
			'assets/gallery/0Z7A1943.jpg',
			'assets/gallery/0Z7A1947.jpg',
			'assets/gallery/0Z7A1952.jpg',
			'assets/gallery/0Z7A1960.jpg',
			'assets/gallery/0Z7A1982.jpg',
			'assets/gallery/0Z7A1993.jpg',
			'assets/gallery/0Z7A2002.jpg',
			'assets/gallery/0Z7A2006.jpg',
			'assets/gallery/0Z7A2025.jpg',
			'assets/gallery/0Z7A2037.jpg',
			'assets/gallery/0Z7A2055.jpg',
			'assets/gallery/0Z7A2063.jpg',
			'assets/gallery/0Z7A2076.jpg',
			'assets/gallery/0Z7A2081.jpg',
			'assets/gallery/0Z7A2085.jpg',
			'assets/gallery/0Z7A2098.jpg',
			'assets/gallery/0Z7A2102.jpg',
			'assets/gallery/0Z7A2109.jpg',
			'assets/gallery/0Z7A2112.jpg',
			'assets/gallery/0Z7A2119.jpg',
			'assets/gallery/0Z7A2123.jpg',
			'assets/gallery/0Z7A2137.jpg',
			'assets/gallery/0Z7A2197.jpg',
			'assets/gallery/0Z7A2222.jpg',
			'assets/gallery/0Z7A2230.jpg',
			'assets/gallery/0Z7A2306.jpg',
			'assets/gallery/0Z7A2317.jpg',
			'assets/gallery/0Z7A2341.jpg',
			'assets/gallery/0Z7A2342.jpg',
			'assets/gallery/0Z7A2355.jpg',
			'assets/gallery/0Z7A2359.jpg',
			'assets/gallery/0Z7A2367.jpg',
			'assets/gallery/0Z7A2371.jpg',
			'assets/gallery/0Z7A2382.jpg',
			'assets/gallery/0Z7A2388.jpg',
			'assets/gallery/0Z7A2399.jpg',
			'assets/gallery/0Z7A2409.jpg',
			'assets/gallery/0Z7A2415.jpg',
			'assets/gallery/0Z7A2422.jpg',
			'assets/gallery/0Z7A2428.jpg',
			'assets/gallery/0Z7A2434.jpg',
			'assets/gallery/0Z7A2745.jpg',
			'assets/gallery/0Z7A2749.jpg',
			'assets/gallery/0Z7A2752.jpg',
			'assets/gallery/0Z7A2768.jpg',
			'assets/gallery/0Z7A2791.jpg',
			'assets/gallery/0Z7A2794.jpg',
			'assets/gallery/0Z7A2796.jpg',
			'assets/gallery/0Z7A2809.jpg',
			'assets/gallery/0Z7A2839.jpg',
			'assets/gallery/0Z7A2842.jpg',
			'assets/gallery/0Z7A2920.jpg',
			'assets/gallery/0Z7A2936.jpg',
			'assets/gallery/0Z7A2951.jpg',
			'assets/gallery/0Z7A2957.jpg',
			'assets/gallery/0Z7A2963.jpg',
			'assets/gallery/0Z7A2987.jpg',
			'assets/gallery/0Z7A3065.jpg',
			'assets/gallery/0Z7A3118.jpg',
			'assets/gallery/0Z7A3025.jpg',
			'assets/gallery/0Z7A3020.jpg',
			'assets/gallery/0Z7A3028.jpg',
			'assets/gallery/IMG_9486.jpg',
			'assets/gallery/IMG_9491.jpg',
			'assets/gallery/IMG_9492.jpg',
			'assets/gallery/IMG_9494.jpg',
			'assets/gallery/IMG_9500.jpg',
			'assets/gallery/IMG_9504.jpg',
			'assets/gallery/IMG_9514.jpg',
			'assets/gallery/IMG_9515.jpg',
			'assets/gallery/IMG_9525.jpg',
			'assets/gallery/IMG_9530.jpg',
			'assets/gallery/IMG_9535.jpg',
			'assets/gallery/IMG_9539.jpg',
			'assets/gallery/IMG_9552.jpg',
			'assets/gallery/IMG_9558.jpg',
			'assets/gallery/IMG_9566.jpg',
			'assets/gallery/IMG_9570.jpg',
			'assets/gallery/IMG_9580.jpg',
			'assets/gallery/IMG_9582.jpg',
			'assets/gallery/IMG_9592.jpg',
			'assets/gallery/IMG_9595.jpg',
			'assets/gallery/IMG_9600.jpg',
			'assets/gallery/IMG_9601.jpg',
			'assets/gallery/IMG_9607.jpg',
			'assets/gallery/IMG_9613.jpg',
			'assets/gallery/IMG_9617.jpg',
			'assets/gallery/IMG_9619.jpg',
			'assets/gallery/IMG_9626.jpg',
			'assets/gallery/IMG_9627.jpg',
			'assets/gallery/IMG_9640.jpg',
			'assets/gallery/IMG_9645.jpg',
				                     	];
		
		//Set Initial Featured Image
		featured.style.backgroundImage = 'url(' + images[0] + ')';
		
		//Set Images for Gallery and Add Event Listeners
		for (var i = 0; i < galleryItems.length; i++) {
			galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
			galleryItems[i].addEventListener('click', selectItem);
		}
	})();

});
