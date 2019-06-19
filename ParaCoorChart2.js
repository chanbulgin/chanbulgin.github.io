
const PCChart = function PCChart(parent_selector, data, options) {
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
	 w: 200,				//Width of the circle
	 h: 200,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scaleOrdinal(d3.schemeCategory10),	//Color function,
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

dimensions = ['Player','Height','Weight','Forty','Vertical','Bench','Broad','ThreeCone','Shuttle'];

//color.domain["Player","1st Round","2nd Round", "3rd Round", "4th Round", "5th Round", "6th Round", "7th Round"];

  // Here I set the list of dimension manually to control the order of axis:
  //dimensions = ["Petal_Length", "Petal_Width", "Sepal_Length", "Sepal_Width"]



  // For each dimension, I build a linear scale. I store all in a y object
	console.log(data);
  var y = {}
  for (i in dimensions) {
    name = dimensions[i]
		if(i==0){
			y[name] = d3.scaleOrdinal()
			.domain( d3.extent(data, function(d) { return +d[name]; }) )
			.range([(1*cfg.h/8),(2*cfg.h/8),(3*cfg.h/8),(4*cfg.h/8),(5*cfg.h/8),(6*cfg.h/8),
			(7*cfg.h/8),(8*cfg.h/8)])
		}
		else{
    y[name] = d3.scaleLinear()
      .domain( d3.extent(data, function(d) { return +d[name]; }) )
      .range([cfg.h,0])
		}
  }
console.log(y);
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
    .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(10).scale(y[d])); })
    // Add axis title
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; })
      .style("fill", "black")


}
