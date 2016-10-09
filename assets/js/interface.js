var Interface = function() {
	this.isNavOpen = false;
	this.prevScroll = 0;
	this.galleryBoundery = 5;
	this.currentGallery = 5;
	this.galleryInterval;
}

$(document).ready(function() {
	
	$(".menu-toggle-btn").click(interface.toggleMenu);
	$(".nav-links").click( function() { interface.switchSection( $(this) ) } )
	$("section").scroll(function() { interface.scroll( $(this) ) })
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
			interface.initilizeCarousel();
		}

	})

})

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
		$(".right.gallery-swipe").first().trigger("click");
		interface.initilizeCarousel();
	}, 800);

}

Interface.prototype.initilizeCarousel = function() {

	interface.galleryInterval = setInterval(function() {
		$("#auto-swipe").trigger("click");
	}, 3500);

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

	$("#mockup").attr("src", "assets/images/interface_" + id + ".png");

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
	if ( outerHeight + scrollPosition == scrollHeight ) $("footer").addClass("footer-active");

	interface.prevScroll = scrollPosition;

}

var interface = new Interface();
interface.init();