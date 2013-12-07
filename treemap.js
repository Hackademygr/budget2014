var margin = {
    top: 10,
    right: 1,
    bottom: 10,
    left: 1
},

width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function (d) {
    return d.size;
});

var realcolor = d3.scale.linear()
    .domain([-50, 0, 10])
    .range(["red", "white", "green"]);

var div = d3.select("body").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

var node = div.datum(budget).selectAll(".node")
    .data(treemap.nodes)
    .enter().append("div")
    .attr("class", "node")
    .call(position)
    .style("background", function (d) {
    return realcolor(d.change);
});

node.on("mouseout", function (d) {
    d3.select(this)
        .attr("class","node");

    d3.select("#tooltip").classed("hidden", true);
});


node.on("mousemove", function (d) {
      d3.select(this)
        .attr("class","node_selected");

    var xPosition = d3.event.pageX + 5;
    var yPosition = d3.event.pageY + 5;

    var coordinates = [0, 0];
    coordinates = d3.mouse(this);
    var mouseX = coordinates[0];
    var mouseY = coordinates[1];

    var title = d.name;

    var content = "Προϋπολογισμός (2014): " + d.value + "€";
    var percent = "Μεταβολή (απο 2013): " + d.change + "%";

    d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .select(".title")
        .text(title)
        .style("font-weight", "bold")
        .style("font-size", "11px")

    d3.select("#tooltip")
        .select(".value")
        .text(content)
        .style("font-size", "11px")

    d3.select("#tooltip")
        .select(".percent")
        .text(percent)
        .style("font-size", "11px")

    d3.select("#tooltip").classed("hidden", false);
});

function position() {
    this.style("right", function (d) {
        return d.x + "px";
    })
        .style("bottom", function (d) {
        return d.y + "px";
    })
        .style("width", function (d) {
        return Math.max(0, d.dx - 2) + "px";
    })
        .style("height", function (d) {
        return Math.max(0, d.dy - 2) + "px";
    });
}
