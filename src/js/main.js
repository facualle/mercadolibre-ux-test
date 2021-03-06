/*
 * MercadoLibre UX Test v1.0
 * https://github.com/facualle/mercadolibre-ux-test/
 *
 * author: Facundo Allemand
 * http://www.fallemand.com
 */

$(window).on("load", function () {
    
    // Create a new carousel.
    var carousel = new ch.Carousel($('.ch-carousel'));
    
    // Add tooltip to similar products
    var tooltips = $('[data-toggle=tooltip]').tooltip({
        'side': 'bottom',
        'align': 'center',
        'content' : 'Ipad Mini Apple 16 GB Wifi Led 7.9' 
    });
    
    //Zoom the image
    var zoom = new ch.Zoom($('.description .image a'));
});