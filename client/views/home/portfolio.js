var w = 1024,
      h = 1024,
      rx = w / 2,
      ry = h / 2,
      m0,
      rotate = 0;

var splines = [];
var svg;

var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
  return "<div class='row'>" +
            "<div class='small-3 columns'>" +
              "<img src='" + d.img + "'></img>" +
            "</div>" +
            "<div class='small-9 columns'>" +
              "<p><strong>Name: </strong>" + d.name + "</p><p><strong>Taste:</strong> " + d.href + "</p>" +
            "</div>" +
          "</div>"
});

Template.portfolio.rendered = function(){
  $('#portfolio').height($('#portfolio').width());
  $(window).resize(function() {
    $('#portfolio').height($('#portfolio').width());
  });
  svg = d3.select("#portfolio").append("svg:svg")
      .attr("viewBox", "0 0 " + w + " " + h)
      .attr("preserveAspectRatio", "xMidYMid")
  svg.call(tip);

  var circles = svg.selectAll("circle")
                 .data(PortfolioData)
                 .enter()
                 .append("circle");
  circles.attr("cx", function(d, i) {
            return (i * 50) + 50;
        })
       .attr("cy", h/2)
       .attr("r", function(d) {
            return d.hours;
       });


  d3.select("#portfolio").selectAll("p")
    .data(PortfolioData)
    .enter()
    .append("p")
    .text(function(d) { return "name = " + d.name; })
    .style("color","red");
};
