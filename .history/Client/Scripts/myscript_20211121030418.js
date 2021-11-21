$(function () {
   
    'use strict';
    
    var CountSelect = $('.countries'),
    
        myCountries = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
        
        Alberta = ['Airdrie','Beaumont','Brooks','Calgary','Camrose','Chestermere','Cold Lake','Edmonton','Fort Saskatchewan','Grande Prairie','Lacombe','Leduc','Lethbridge','Lloydminster', 'Medicine Hat','Red Deer','Spruce Grove','St. Albert','Wetaskiwin' ],
        
        Antarctica = ['Amundsen-Scott'],
        
        Asia = ['Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'East Timor', 'India'],
        
        Europe = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia-Herzegovina', 'Bulgaria'];
        
    // Function Create Option    
    
    function CreateOption(valriable, elementToAppend) {
        
        var i;
        
        for (i = 0; i < valriable.length; i += 1) {
    
            $('<option>', {value: valriable[i], text: valriable[i], id: valriable[i]})
                .appendTo(elementToAppend);
        }
    }
    
    
    // Create Option myCountries
    CreateOption(myCountries, $('.countries'));
    
    // Create Option Africa
    CreateOption(Africa, $('.Alberta'));
    
    // Create Option Africa
    CreateOption(Antarctica, $('.Antarctica'));
    
    // Create Option Africa
    CreateOption(Asia, $('.Asia'));
    
    // Create Option Africa
    CreateOption(Europe, $('.Europe'));
    
    // Hide All Select
    $('.option select').hide();
    
    // Show First Selected
    $('.Alberta').show().css('display', 'inline-block');
    
    
    
    // Show List Option City Whene user Chosse Countries
    
    CountSelect.on('change', function () {
        
        // get Id option 
        var myId = $(this).find(':selected').attr('id');
        console.log($(this).val());
        // Show Select Has class = Id And Hide Siblings
        $('.option select').filter('.' + myId).fadeIn(400).siblings('select').hide();
        
    });
    
});