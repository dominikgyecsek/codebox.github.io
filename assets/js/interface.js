var Interface = function() {
	this.isNavOpen = false;
	this.prevScroll = 0;
	this.galleryBoundery = 5;
	this.currentGallery = 1;
	this.galleryInterval;
}

$(document).ready(function() {
	
	$("#notify-me").click(server.validate);
	$(".menu-toggle-btn").click(interface.toggleMenu);
	$(".nav-links").click( function() { interface.switchSection( $(this) ) } )
	$("section").scroll(function() { interface.scroll( $(this) ) })
	$("#send-feedback").click( server.msg );
	$(".gallery-swipe, #auto-swipe").click(function() { 

		var left = false;
		var auto = false;

		if ( $(this).hasClass("left") ) left = true;
		if ( $(this).attr("id") == "auto-swipe" ) auto = true;

		interface.galerySwipe(left, auto)

	});
	
	$("#more-feature").click( function() {

		console.log($("#features-more").position().top)
		$(".section-active").first().animate({
			scrollTop: $("#mockup-holder").prop("scrollHeight")
		}, 300);
	} )

	$("#mockup, #close-carousel").click(function() {

		$("#mockup").parent().parent().toggleClass("mockup-active");
		if ( $(this).attr("id") == "close-carousel" ) {
			clearInterval(interface.galleryInterval);
			interface.initilizeCarousel();
		}

	})

	$(".input-holder:not(.textarea)").keyup(function(e) {
		if (e.keyCode == 13)
			$("#send-feedback").trigger("click");
	})
	
	$("#buy-btn").click(function() {
		$("#buy-hide").hide();
		$("#buy-show").show();
	})

})

var Server = function() {
	
}

Server.prototype.validate = function() {
	
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	result = re.test( $("#email").val() );
	
	if (result) {
		$("#email").removeClass("email-error");
		server.sendMsg(["1", $("#email").val()])
	} else {
		$("#email").addClass("email-error");
	}
	
}

Server.prototype.msg = function() {

	$(".input-holder").removeClass("error");

	var name = $("#name-2").val();
    if ( (name.length == 0) || (name.length > 128) ) {
    	$("#name-2").parent().addClass("error");
    	return;
    }

	var email = $("#email-2").val();
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(email);

    if (!result) {
    	$("#email-2").parent().addClass("error");
    	return;
    }

    var msg = $("#msg").val();

    if ( (msg.length == 0) || (msg.length > 2048) ) {
    	$("#msg").parent().addClass("error");
    	return;
    }

    var subject = $("#subject").val();

    if ( (subject.length == 0) || (subject.length > 256) ) {
    	$("#subject").parent().addClass("error");
    	return;
    }

    server.sendMsg(["2", email, name, msg, subject]);

}

Server.prototype.sendMsg = function( data ) {
	
	$(".input-holder").removeClass("error");
	
	$.ajax({
		url: '/CodeBox/assets/php/cbnc.php',
		type: 'POST',
		dataType: 'JSON',
		data: {
			data: data
		},
		success: function(data) {
			
			console.log(data);
			
			if (data[0] == "1") {
				$("#email, #notify-me").fadeOut();
				interface.openNotification("You will be notified when CodeBox is ready", true);
			} else if (data[0] == "2") {
				interface.openNotification("Message Sent", true);
				$(".contact-input").val("");
			}
			
		},
		error: function(data) {

			interface.openNotification("Connection Error", false);
			
		}
	})
	
}

var server = new Server();

Interface.prototype.openNotification = function(msg, success) {
	
	interface.closeNotification();
	
	$("#notification-msg").text(msg);
	$("#notification-wrapper").addClass("notification-wrapper-open");

	if (success) {
		$("#notification-wrapper").addClass("notification-success");
	} else {
		$("#notification-wrapper").addClass("notification-error");
	}
	
	setTimeout(function() {
		interface.closeNotification();
	}, 4000);
	
}

Interface.prototype.closeNotification = function() {
	
	$("#notification-wrapper").removeClass("notification-wrapper-open");
	$("#notification-wrapper").removeClass("notification-success notification-error");
	
}

Interface.prototype.init = function() {

	this.isNavOpen = false;

	var platform;

	if (navigator.appVersion.indexOf("Win")!=-1) {
		platform="1";
	} else if (navigator.appVersion.indexOf("Mac")!=-1) {
		platform="2";
	} else if (navigator.appVersion.indexOf("Linux")!=-1) {
		platform="3";
	}

	$(".platform[data-platform='" + platform + "']").show();
	$(".platform-alt[data-platform='" + platform + "']").hide();

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("html").addClass("mobile");
	}

	setTimeout(function() {
		$("#auto-swipe").trigger("click");
		interface.initilizeCarousel();
	}, 800);

}

Interface.prototype.initilizeCarousel = function() {

	interface.galleryInterval = setInterval(function() {
		$("#auto-swipe").trigger("click");
	}, 2500);

}

Interface.prototype.galerySwipe = function (isLeft, auto) {

	if (!auto) clearInterval(interface.galleryInterval);

	var id = interface.currentGallery;

	if ( isLeft )
		id--;
	else
		id++;

	if (id == 0)
		id = interface.galleryBoundery;
	else if (interface.galleryBoundery == id - 1)
		id = 1

	$("#mockup").attr("src", "assets/images/interface_" + id + ".jpg");

	interface.currentGallery = id;

}

Interface.prototype.toggleMenu = function() {

	if (interface.isNavOpen) $("#mobile-nav").removeClass("mobile-nav-show");
	else $("#mobile-nav").addClass("mobile-nav-show");

	interface.isNavOpen = !interface.isNavOpen

}

Interface.prototype.switchSection = function( $this ) {

	if ( $this.hasClass("mobil-link") ) $(".menu-toggle-btn").first().trigger("click");

	var sectionId = $this.attr("data-section-id-a");
	var currectSectionId = $(".section-active").first().attr("data-section-id");
	
	$(".active-nav-section").removeClass("active-nav-section");
	$this.parent().addClass("active-nav-section");

	if (sectionId == currectSectionId) return;

	if ( $this.hasClass("prevent-nav") ) $(".menu-toggle-btn").first().trigger("click");

	$(".section-active").removeClass("section-active").addClass("section-out");

	$("section[data-section-id='" + sectionId + "']").addClass("section-active");

	setTimeout(function() {
		$(".section-out").removeClass("section-out");
		$(".footer-active").removeClass("footer-active");
	}, 350)

	$(".section-active").scrollTop(0);
	
	interface.prevScroll = 0;

}

Interface.prototype.scroll = function ( $this ) {

	var scrollPosition = $this.scrollTop();
	var scrollHeight = $this[0].scrollHeight;
	var outerHeight = $this.outerHeight();

	if ( interface.prevScroll < scrollPosition ) $("footer").removeClass("footer-active");
	else $("footer").addClass("footer-active");
	if ( outerHeight + scrollPosition + 20 >= scrollHeight ) $("footer").addClass("footer-active");

	interface.prevScroll = scrollPosition;

}

var interface = new Interface();
interface.init();