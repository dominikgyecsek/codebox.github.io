var Interface = function() {
	this.isNavOpen = false
}

$(document).ready(function() {
	
	$(".menu-toggle-btn").click(interface.toggleMenu);
	$(".nav-links").click( function() { interface.switchSection( $(this) ) } )

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

	$(".section-active").removeClass("section-active").addClass("section-out");

	$("section[data-section-id='" + sectionId + "']").addClass("section-active");

	setTimeout(function() {
		$(".section-out").removeClass("section-out");
	}, 350)

}

var interface = new Interface();
interface.init();