
const BarChart = function BarChart(parent_selector, data, options) {
//==========================Boiler Plate =======================================
	const wrap = (text, width) => {
	  text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.4, // ems
				yy = text.attr("y"),
				xx = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", xx).attr("y", yy).attr("dy", dy + "em");

			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").attr("x", xx).attr("y", yy).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
	  });
	}//wrap

  const cfg = {
	 w: 200,
	 h: 200,
	 margin: {top: 20, right: 20, bottom: 20, left: 20},
	 levels: 3,
	 maxValue: 0,
	 labelFactor: 1.25,
	 wrapWidth: 60,
	 opacityArea: 0.35,
	 dotRadius: 4,
	 opacityCircles: 0.1,
	 strokeWidth: 2,
	 roundStrokes: false,
	 color: d3.scaleOrdinal(d3.schemeCategory10),
	 format: '.2%',
	 unit: '',
	 legend: false
	};

	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if

  /////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////
	const parent = d3.select(parent_selector);

	//Remove whatever chart with the same id/class was present before
	parent.select("svg").remove();

	let svg = parent.append("svg")
      .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
      .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + cfg.margin.left + "," + cfg.margin.top + ")");

//==========================Boiler Plate END=======================================
// call out height and width parameters as cfg.h and cfg.w
//The stuff Below is how I create the Parallel coordinates chart.


  // For each dimension, I build a linear scale. I store all in a y object
  var y = {}
  for (i in dimensions) {
    name = dimensions[i]
    y[name] = d3.scaleLinear()
      .domain( d3.extent(data, function(d) { return +d[name]; }) )
      .range([cfg.h, 0])
  }

  // Build the X scale -> it find the best position for each Y axis
  x = d3.scalePoint()
    .range([0, cfg.w])
    .domain(dimensions);

  // Highlight the specie that is hovered


  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
  function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
  }

  // Draw the lines
  svg
    .selectAll("myPath")
    .data(data)
    .enter()
    .append("path")
      .attr("class", function (d) { return "line " + d.Player} ) // 2 class for each line: 'line' and the group name
      .attr("d",  path)
      .style("fill", "none" )
      .style("stroke", function(d){ return( cfg.color(d.Player))} )
      .style("opacity", 0.95)


  // Draw the axis:
  svg.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
    // Add axis title
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; })
      .style("fill", "black")
}
