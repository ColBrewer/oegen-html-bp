/******************************************************

	Any JS solely for development purposes
	- does not get compiled to production

******************************************************/



$(".js-include").each(function(){
    var inc=$(this);
    $.get(inc.attr("data-src"), function(data){
        inc.replaceWith(data);
    });
});