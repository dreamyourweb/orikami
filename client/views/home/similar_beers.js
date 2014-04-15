var w = 1024,
      h = 1024,
      rx = w / 2,
      ry = h / 2,
      m0,
      rotate = 0;

  var splines = [];

  var svg;

var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return "<p><strong>Style:</strong> " + d.style + "</p><p><strong>Taste:</strong> " + d.taste + "</p>"; });

Template.similarBeers.rendered = function(){


  $('#similarBeersChart').height($('#similarBeersChart').width());
  $(window).resize(function() {
    $('#similarBeersChart').height($('#similarBeersChart').width());
  });

  var cluster = d3.layout.cluster()
      .size([360, ry - 240])
      .sort(function(a, b) { return d3.ascending(a.key, b.key); });

  var bundle = d3.layout.bundle();

  var line = d3.svg.line.radial()
      .interpolate("bundle")
      .tension(.85)
      .radius(function(d) { return d.y; })
      .angle(function(d) { return d.x / 180 * Math.PI; });

  svg = d3.select("#similarBeersChart").append("svg:svg")
      .attr("viewBox", "0 0 " + w + " " + h)
      .attr("preserveAspectRatio", "xMidYMid")
    .append("svg:g")
      .attr("transform", "translate(" + rx + "," + ry + ")");

  svg.call(tip);

  svg.append("svg:path")
      .attr("class", "arc")
      .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
      .on("mousedown", mousedown);

  d3.json("d3jsbeers.json", function(classes) {
    var nodes = cluster.nodes(packages.root(classes));
    var links = packages.imports(nodes);
    var new_links = [];
    for (var i = links.length - 1; i >= 0; i--) {
      if (links[i].source != undefined && links[i].target != undefined){
        new_links.push(links[i]);
      }
    };
    links = new_links;
    splines = bundle(links);

    var path = svg.selectAll("path.link")
        .data(links)
      .enter().append("svg:path")
        .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key + " " + d.source.style.replace(/ /g,"-"); })
        .attr("d", function(d, i) { return line(splines[i]); });

    svg.selectAll("g.node")
        .data(nodes.filter(function(n) { return !n.children; }))
      .enter().append("svg:g")
        .attr("class", "node")
        .attr("id", function(d) { return "node-" + d.key; })
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
      .append("svg:text")
        .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function(d) { return d.pretty_key; })
        .attr("class", function(d) { return d.style.replace(/ /g,"-"); })
        .attr("title", function(d) { return d.style; })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    d3.select("input[type=range]").on("change", function() {
      line.tension(this.value / 100);
      path.attr("d", function(d, i) { return line(splines[i]); });
    });
  });

  d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

}

function mouse(e) {
  return [e.pageX - rx, e.pageY - ry];
}

function mousedown() {
  m0 = mouse(d3.event);
  d3.event.preventDefault();
}

function mousemove() {
  if (m0) {
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
    div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
  }
}

function mouseup() {
  if (m0) {
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

    rotate += dm;
    if (rotate > 360) rotate -= 360;
    else if (rotate < 0) rotate += 360;
    m0 = null;

    div.style("-webkit-transform", null);

    svg
        .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
      .selectAll("g.node text")
        .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
        .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
  }
}

function mouseover(d) {
  tip.direction(function(d) {
    if(d.x > 45 && d.x <= 135) return 'e';
    if(d.x > 135 && d.x <= 225) return 's';
    if(d.x > 225 && d.x <= 315) return 'w';
    if(d.x > 315 || d.x <= 45) return 'n';
  })
  tip.show(d);
  svg.selectAll("path.link.target-" + d.key)
      .classed("target", true)
      .each(updateNodes("source", true));

  svg.selectAll("path.link.source-" + d.key)
      .classed("source", true)
      .each(updateNodes("target", true));
}

function mouseout(d) {
  tip.hide();
  svg.selectAll("path.link.source-" + d.key)
      .classed("source", false)
      .each(updateNodes("target", false));

  svg.selectAll("path.link.target-" + d.key)
      .classed("target", false)
      .each(updateNodes("source", false));
}

function updateNodes(name, value) {
  return function(d) {
    if (value) this.parentNode.appendChild(this);
    svg.select("#node-" + d[name].key).classed(name, value);
  };
}

function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}


var packages = {

  // Lazily construct the package hierarchy from class names.
  root: function(classes) {
    var map = {};

    function find(name, data) {
      var node = map[name], i;
      if (!node) {
        node = map[name] = data || {name: name, children: []};
        if (name.length) {
          node.parent = find(name.substring(0, i = name.lastIndexOf("//")));
          node.parent.children.push(node);
          node.key = name.substring(i + 2).replace(/\W/g,"-");
          node.pretty_key = name.substring(i + 2);
          if (data){
            node.taste = data['taste'] || "";
          }
        }
      }
      return node;
    }

    classes.forEach(function(d) {
      find(d.name, d);
    });

    return map[""];
  },

  // Return a list of imports for the given array of nodes.
  imports: function(nodes) {
    var map = {},
        imports = [];

    // Compute a map from name to node.
    nodes.forEach(function(d) {
      map[d.name] = d;
    });

    // For each import, construct a link from the source to target node.
    nodes.forEach(function(d) {
      // console.dir(d);
      if (d.similar) d.similar.forEach(function(i) {
        imports.push({source: map[d.name], target: map[i]});
      });
    });

    return imports;
  }

}