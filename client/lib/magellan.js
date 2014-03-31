$(window).scroll(function(){
  if ($(window).scrollTop() >= window.innerHeight - 50){
    Session.set("navbar_visible", true);
  }
  else
  {
    Session.set("navbar_visible", false);
  }
  $("[data-arrival]").removeClass("active");
  $("[data-destination]").each(function(i,v){
    if ( ($(window).scrollTop() >= $(this).offset().top - 50)
      && ($("[data-destination]")[i+1] && ($(window).scrollTop() < $($("[data-destination]")[i+1]).offset().top - 50) || !$("[data-destination]")[i+1])
      ) {
      // $("[data-arrival]").removeClass("active");
      $("[data-arrival=" + $(this).data("destination") + "]").addClass("active");
    }
  });
});