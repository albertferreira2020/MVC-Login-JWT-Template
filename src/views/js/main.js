

/////////////////////////////main page
(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);
/////////////////////////////main page
 

/////////////////////////////////////////////////////////////////////////////////////////////////        
 $("form").submit(function(event) { // You can change "form" to whatever ID/class your form has
 event.preventDefault();
 console.log($( "form" ).serialize())
 })
        
  
 $( document ).ready(function() {

    var data = {'token' : localStorage.getItem('token')}
        
        $.ajax({
        url: 'https://'+ URLServer +':' + Porta + '/validate',
        type:'POST',
        data: data , 
        crossDomain: true,
        cache: false,
        success : function(result) {
        return  eval(result);
        },
        error: function(xhr, resp, text) {
        //alert('Erro no Token');
        //top.location.href='/'
        console.log(xhr, resp, text);
        }
        })

         

    

});

 

