// First Histogram
const hist = function hist(parent_selector, data1, data2, data3, position, h_Array,color, opti) {
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
// svg.remove();

// if logic for stats by avg_position


if (position == 'OL'){
 // display a message
}else {

	if (position == 'CB') {
		var i = 0;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Tackles';
		stattwoDesc = 'Interceptions';
		statthreeDesc = 'Passes Defended';

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].DT);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].DI);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].DPD);
		}
	}else if (position == 'DL') {
		var i = 0;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Tackles';
		stattwoDesc = 'Tackles(Loss)';
		statthreeDesc = 'Sacks';

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].DT);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].DLT);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].DSA);
		}
	}else if (position == 'LB') {
		var i = 0;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Tackles';
		stattwoDesc = 'Tackles(Loss)';
		statthreeDesc = 'Tackles(Assist)';

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].DT);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].DLT);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].DAT);
		}
	}else if (position == 'QB') {
		var i = 0;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Passing Yards';
		stattwoDesc = 'Passing TDs';
		statthreeDesc = 'Interceptions';

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].PPY);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].PPT);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].PPI);
		}
	}else if (position == 'RB') {
		var i;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Rushing Yards';
		stattwoDesc = 'Rushing TDs';
		statthreeDesc = 'Attempts';

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].RRUY);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].RRUT);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].RRRA);
		}
	}else if (position == 'S') {
		var i;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Tackles';
		stattwoDesc = 'Interceptions';
		statthreeDesc = 'Passes Defended';

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].DT);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].DI);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].DPD);
		}
	}else if (position == 'TE') {
		var i;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Receptions'
		stattwoDesc = 'TDs'
		statthreeDesc = 'Receiving Yards'

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].RR);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].RRT);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].RRY);
		}
	}else if (position == 'WR') {
		var i;
		statoneArray = [];
		stattwoArray = [];
		statthreeArray = [];
		statoneDesc = 'Receptions'
		stattwoDesc = 'TDs'
		statthreeDesc = 'Receiving Yards'

		for (i = 0; i < h_Array.length; i++) {
			statoneArray.push(h_Array[i].RR);
		}
		for (i = 0; i < h_Array.length; i++) {
			stattwoArray.push(h_Array[i].RRT);
		}
		for (i = 0; i < h_Array.length; i++) {
			statthreeArray.push(h_Array[i].RRY);
		}
	}

	// insert clear logic here


	// first histogram
		if (opti == 1){
		statoneDesc = statoneDesc;
		statoneArray = statoneArray;
	} else if (opti == 2){
		statoneDesc = stattwoDesc;
		statoneArray = stattwoArray;

	}else if (opti == 3){
		statoneDesc = statthreeDesc;
		statoneArray = statthreeArray;
	};

str1 = ".";
var value1 = str1.concat(parent_selector);

console.log(value1)
	// set the dimensions and margins of the graph
		var margin = {top: 5, right: 30, bottom: 30, left: 30},
				width = 350 - margin.left - margin.right,
				height = 90 - margin.top - margin.bottom;


		const parent = d3.select(value1);
		parent.select("svg").remove();

		// append the svg object to the body of the page
		let svg = parent.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
						"translate(" + margin.left + "," + margin.top + ")");

		// allocate the data
		max_val = (d3.max(statoneArray));
		hist1_val = data1;

		// X axis: scale and draw:
		var x = d3.scaleLinear()
				// .domain([120, 400])
				.domain([d3.min(statoneArray), d3.max(statoneArray)]) // can use this instead to have the min/max of data
				.range([0, width]);

		svg.append("g")
				.style("font-size", "8px")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

		// set the parameters for the histogram
		var histogram = d3.histogram()
				.value(statoneArray)   // I need to give the vector of values
				.value(function(statoneArray) { return statoneArray; })
				.domain(x.domain())  // then the domain of the graphic
				.thresholds(x.ticks(50)); // then the numbers of bins

		// And apply this function to data to get the bins
		var bins = histogram(statoneArray);

		// Y axis: scale and draw:
		var y = d3.scaleLinear()
				.range([height, 0]);
				y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

		svg.append("g")
				.style("font-size", "8px")
				.call(d3.axisLeft(y)
					.ticks(4));

		// append the bar rectangles to the svg element
		svg.selectAll("rect")
				.data(bins)
				.enter()
				.append("rect")
					.attr("x", 1)
					.attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
					.attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
					.attr("height", function(d) { return height - y(d.length); })
					.style("fill", color);

//		svg
//			.append("text")
//			.attr("x", x(235))
//			.attr("y", y(56))
//			.text("College Stats" )
//			.style("font-size", "14px");

			// text label for the x axis
		  svg.append("text")
		      .attr("transform",
		            "translate(" + (width/2) + " ," +
		                           (height + margin.top + 20) + ")")
		      .style("text-anchor", "middle")
					.style("font-size", "11px")
		      .text(statoneDesc + ". Selected Player's Score: " + hist1_val);

			// text label for the y axis
	  svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -5 - margin.left)
	      .attr("x",0 - (height / 2))
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
				.style("font-size", "11px")
	      .text("player count");



	}
}
