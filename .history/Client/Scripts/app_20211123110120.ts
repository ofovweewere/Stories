//IIFE -- Immediately Invoked Function Expression
"use strict";

(function(){

    function confirmDelete()
    {
      // confirm deletion
      $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
          event.preventDefault();
          location.href = '/clothing-list';
        }       
      });
    }

    function Start():void
    {
        console.log("App Started");
        if(!!window.performance && window.performance.navigation.type == 2)
{
    window.location.reload();
}
        confirmDelete();  
    }

    window.addEventListener("load", Start);

})();
