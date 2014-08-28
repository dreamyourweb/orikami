// var w = 1024,
//       h = w/2,
//       rx = w / 2,
//       ry = h / 2,
//       m0,
//       rotate = 0;

// var splines = [];
var svg;

// var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
//   return "<div class='row'>" +
//             "<div class='small-3 columns'>" +
//               "<img src='" + d.img + "'></img>" +
//             "</div>" +
//             "<div class='small-9 columns'>" +
//               "<p><strong>Name: </strong>" + d.name + "</p><p><strong>Taste:</strong> " + d.href + "</p>" +
//             "</div>" +
//           "</div>"
// });

// Template.portfolio.rendered = function(){
//   $('#portfolio').height($('#portfolio').width()*0.5);
//   $(window).resize(function() {
//     $('#portfolio').height($('#portfolio').width()*0.5);
//   });
//   svg = d3.select("#portfolio").append("svg:svg")
//       .attr("viewBox", "0 0 " + w + " " + h)
//       .attr("preserveAspectRatio", "xMidYMid")

//   var portfolioGroup = svg.selectAll("g")
//                   .data(PortfolioData)
//                  .enter()
//                  .append("g")
//   var circles = portfolioGroup.append("circle")
//   circles.attr("cx", function(d) {
//             return d.x_pos;
//         })
//        .attr("cy", function(d) {
//             return d.y_pos;
//         })
//        .attr("r", function(d) {
//             return Math.sqrt(d.hours);
//        })
//        .attr("fill", function(d) {
//         return d.color;
//        })

//   var text = portfolioGroup.append("text");
//   var textLabels = text
//                  .attr("x", function(d) { return d.x_pos; })
//                 .attr("y", function(d) { return (d.y_pos + 5); })
//                 .text( function (d) { return d.name; })
//                 .attr("font-family", "santor")
//                 .attr("font-size", "16px")
//                 .attr("fill", "#fff")
//                 .attr("text-anchor", "middle");

//   portfolioGroup.on("click", function() {
//     d3.select(this)
//     .append("line")
//     .attr("x1", function(d) {
//       return d.x_pos;
//     })
//     .attr("y1", function(d) {
//       return d.y_pos;
//     })
//     .attr("x2", function(d) {
//       return d.x_pos;
//     })
//     .attr("y2",  function(d) {
//       return 500;
//     })
//     .attr("stroke-width", 7)
//     .attr("stroke", function(d) {
//       return d.color;
//     })
//     .transition()
//     .duration(250)
//     .append('div')
//   });

// }
// 
Template.portfolio.rendered = function(){

  var containerHeight = $("#portfolioSVG").width();
  $("#portfolioSVG").height(containerHeight*0.3)

  svg = d3.select("#portfolio svg")
  portfolioGroup = svg.selectAll("g")
    .data(PortfolioData)
    .enter()
    .append("g")
    .on("click", function(){
      portfolioGroup.select("rect").transition().attr("height", 0);
      d3.select(this).select("rect").transition().attr("height", 30);

      index = d3.select(this).select("circle").attr("panel-target");
      $(".portfolio-panel").removeClass("active");
      $("#portfolioPanel" + index).addClass("active");

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
  $("#portfolioSVG").height(containerHeight*0.3);
});