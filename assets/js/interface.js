var Interface = function() {
	this.isNavOpen = false
	this.prevScroll = 0
}

$(document).ready(function() {
	
	$(".menu-toggle-btn").click(interface.toggleMenu);
	$(".nav-links").click( function() { interface.switchSection( $(this) ) } )
	$("section").scroll(function() { interface.scroll( $(this) ) })

})

Interface.prototype.init = function() {

	this.isNavOpen = false;

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