var svg;

Template.portfolio.rendered = function(){
  var containerHeight = $("#portfolioSVG").width();
  $("#portfolioSVG").height(containerHeight*0.4)

  svg = d3.select("#portfolio svg")
  portfolioGroup = svg.selectAll("g")
    .data(PortfolioData)
    .enter()
    .append("g")
    .on("click", function(){
      portfolioGroup.select("rect").transition().attr("height", 0);
      d3.select(this).select("rect").transition().attr("height", 40);

      index = d3.select(this).select("circle").attr("panel-target");
      $(".portfolio-panel.active #carousel").unslick();
      $(".portfolio-panel").removeClass("active");
      $("#portfolioPanel" + index).addClass("active");
      $("#portfolioPanel" + index + " #carousel").slick({
        dots: true,
        arrows: true
      });
    });

  $("#portfolioPanel1 #carousel").slick({
        dots: true,
        arrows: true
      });

  portfolioGroup
    .append("circle")
      .attr("cx", function(d){return d.x})
      .attr("cy", function(d){return d.y})
      .attr("r", function(d){return d.r})
      .attr("fill", function(d){return d.color})
      .attr("panel-target", function(d){return d.index});

  portfolioGroup
    .append("rect")
      .attr("x", function(d){ return d.x - 0.5 })
      .attr("y", function(d){ return d.y })
      .attr("width", 1)
      .attr("height", function(d,i){ if ( i == 0 ) { return 30; } else { return 0 } })
      .attr("fill", function(d){return d.color});

  portfolioGroup
    .append("text")
      .attr("x", function(d){return d.x})
      .attr("y", function(d){return d.y + 0.5})
      .text( function(d) { return d.name; });

}

Template.portfolio.helpers({
  portfolio_data: function() {
    return PortfolioData;
  },

  portfolio_svg_data: function() {
    return _.map(PortfolioData, function(item) {
      return {
        x: item.x,
        y: item.y,
        r: item.r,
        index: item.index,
        color: item.color,
        x_line: item.x - 0.5,
        y_text: item.y + 0.5,
        id: "portfolioCircle" + item.index,
        label: item.name
      };
    });
  }
});

Template.portfolio.events({
  "click .portfolio-circle": function(event){
    index = $(event.currentTarget).data("panel-target");
    $(".portfolio-panel").removeClass("active");
    $("#portfolioPanel" + index).addClass("active");
  }
});

$(window).resize(function() { 
  var containerHeight = $("#portfolioSVG").width();
  $("#portfolioSVG").height(containerHeight*0.4);
});