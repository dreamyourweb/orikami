// var w = 1024,
//       h = w/2,
//       rx = w / 2,
//       ry = h / 2,
//       m0,
//       rotate = 0;

// var splines = [];
// var svg;

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

Template.portfolio.helpers({
  portfolio_data: function() {
    return PortfolioData;
  }
});