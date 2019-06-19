// First Histogram
const histogram = function histogram(parent_selector, data) {
// set the dimensions and margins of the graph
	var margin = {top: 5, right: 30, bottom: 30, left: 30},
			width = 100 - margin.left - margin.right,
			height = 100 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#Histograms")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
					"translate(" + margin.left + "," + margin.top + ")");

	// get the data
	// d3.csv("/data/NFL_Draft_Stats_Final.v6.csv", function(data) {
	console.log(hist1_val);
	// edit 5/11/19 - data should exist in hist1_val

	// X axis: scale and draw:
	var x = d3.scaleLinear()
			// .domain([120, 400])
			.domain([d3.min(hist1_val)-10, d3.max(hist1_val)+10]) // can use this instead to have the min/max of data
			.range([0, width]);

	svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

	// set the parameters for the histogram
	var histogram = d3.histogram()
			.value(hist1_val)   // I need to give the vector of value
			.domain(x.domain())  // then the domain of the graphic
			.thresholds(x.ticks(70)); // then the numbers of bins

	// And apply this function to data to get the bins
	var bins = histogram(hist1_val);

	// Y axis: scale and draw:
	var y = d3.scaleLinear()
			.range([height, 0]);
			y.domain([0, d3.max(bins, function(d) { return hist1_val.length; })]);   // d3.hist has to be called before the Y axis obviously
	svg.append("g")
				.call(d3.axisLeft(y));

	// append the bar rectangles to the svg element
	svg.selectAll("rect")
			.data(bins)
			.enter()
			.append("rect")
				.attr("x", 1)
				.attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
				.attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
				.attr("height", function(d) { return height - y(d.length); })
				.style("fill", "green")

	// Append a vertical line to highlight the separation
	svg
		.append("line")
			.attr("x1", x(124) )
			.attr("x2", x(124) )
			.attr("y1", y(0))
			.attr("y2", y(400))
			.attr("stroke", "steelblue")
			.attr("stroke-dasharray", "4")
	svg
		.append("text")
		.attr("x", x(129))
		.attr("y", y(195))
		.text("broad: 124")
		.style("font-size", "12px")
}
