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
			'assets/images/0Z7A1882.JPG',
			'assets/images/0Z7A1942.JPG',
			'assets/images/0Z7A1968.JPG',
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
