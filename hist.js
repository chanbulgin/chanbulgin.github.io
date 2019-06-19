// First Histogram
const hist = function hist(parent_selector, data1, data2, data3, position, h_Array) {
// ** 3 Histograms ** //

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

	// first histogram


	// set the dimensions and margins of the graph
		const margin = {top: 5, right: 30, bottom: 30, left: 30},
				width = 350 - margin.left - margin.right,
				height = 90 - margin.top - margin.bottom;


const parent= d3.select(parent_selector)
				parent.select("svg").remove();

		// append the svg object to the body of the page
		let svg1 = parent.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
						"translate(" + margin.left + "," + margin.top + ")");

		// allocate the data
		max_val = (d3.max(statoneArray));
		hist1_val = data1;

		// X axis: scale and draw:
		let x1 = d3.scaleLinear()
				// .domain([120, 400])
				.domain([d3.min(statoneArray), d3.max(statoneArray)]) // can use this instead to have the min/max of data
				.range([0, width]);

		svg1.append("g")
				.style("font-size", "8px")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x1));

		// set the parameters for the histogram
		let histogram = d3.histogram()
				.value(statoneArray)   // I need to give the vector of values
				.value(function(statoneArray) { return statoneArray; })
				.domain(x1.domain())  // then the domain of the graphic
				.thresholds(x1.ticks(50)); // then the numbers of bins

		// And apply this function to data to get the bins
		var bins1 = histogram(statoneArray);

		// Y axis: scale and draw:
		let y1 = d3.scaleLinear()
				.range([height, 0]);
				y1.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

		svg1.append("g")
				.style("font-size", "8px")
				.call(d3.axisLeft(y1)
					.ticks(4));

		// append the bar rectangles to the svg element
		svg1.selectAll("rect")
				.data(bins1)
				.enter()
				.append("rect")
					.attr("x", 1)
					.attr("transform", function(d) { return "translate(" + x1(d.x0) + "," + y1(d.length) + ")"; })
					.attr("width", function(d) { return x1(d.x1) - x1(d.x0) -1 ; })
					.attr("height", function(d) { return height - y1(d.length); })
					.style("fill", "green");

//		svg
//			.append("text")
//			.attr("x", x(235))
//			.attr("y", y(56))
//			.text("College Stats" )
//			.style("font-size", "14px");

			// text label for the x axis
		  svg1.append("text")
		      .attr("transform",
		            "translate(" + (width/2) + " ," +
		                           (height + margin.top + 20) + ")")
		      .style("text-anchor", "middle")
					.style("font-size", "11px")
		      .text(statoneDesc + ". Selected Player's Score: " + hist1_val);

			// text label for the y axis
	  svg1.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", -5 - margin.left)
	      .attr("x",0 - (height / 2))
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
				.style("font-size", "11px")
	      .text("player count");


	// second histogram

			// append the svg object to the body of the page
			let svg2 = parent.append("svg")

			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
						"translate(" + margin.left + "," + margin.top + ")");

		// allocate the data
		max_val = (d3.max(stattwoArray));
		hist1_val = data2;

		// X axis: scale and draw:
		let x2 = d3.scaleLinear()
				// .domain([120, 400])
				.domain([d3.min(stattwoArray), d3.max(stattwoArray)]) // can use this instead to have the min/max of data
				.range([0, width]);

		svg2.append("g")
				.style("font-size", "8px")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x2));

		// set the parameters for the histogram
		let histogram2 = d3.histogram()
				.value(stattwoArray)   // I need to give the vector of values
				.value(function(stattwoArray) { return stattwoArray; })
				.domain(x2.domain())  // then the domain of the graphic
				.thresholds(x2.ticks(50)); // then the numbers of bins

		// And apply this function to data to get the bins
		let bins2 = histogram2(stattwoArray);

		// Y axis: scale and draw:
		let y2 = d3.scaleLinear()
				.range([height, 0]);
				y2.domain([0, d3.max(bins2, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

		svg2.append("g")
				.style("font-size", "8px")
				.call(d3.axisLeft(y2)
					.ticks(4));

		// append the bar rectangles to the svg element
		svg2.selectAll("rect")
				.data(bins2)
				.enter()
				.append("rect")
					.attr("x", 1)
					.attr("transform", function(d) { return "translate(" + x2(d.x0) + "," + y2(d.length) + ")"; })
					.attr("width", function(d) { return x2(d.x1) - x2(d.x0) -1 ; })
					.attr("height", function(d) { return height - y2(d.length); })
					.style("fill", "steelblue");

			// text label for the x axis
		  svg2.append("text")
		      .attr("transform",
		            "translate(" + (width/2) + " ," +
		                           (height + margin.top + 20) + ")")
		      .style("text-anchor", "middle")
					.style("font-size", "11px")
		      .text(stattwoDesc + ". Selected Player's Score: " + hist1_val);

			// text label for the y axis
		svg2.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", -5 - margin.left)
		    .attr("x",0 - (height / 2))
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
				.style("font-size", "11px")
		    .text("player count");


	// third histogram

			// append the svg object to the body of the page
			let svg3 = parent.append("svg")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform",
							"translate(" + margin.left + "," + margin.top + ")");

			// allocate the data

			max_val = (d3.max(statthreeArray));
			hist1_val = data3;

			// X axis: scale and draw:
			let x3 = d3.scaleLinear()
					// .domain([120, 400])
					.domain([d3.min(statthreeArray), d3.max(statthreeArray)]) // can use this instead to have the min/max of data
					.range([0, width]);

			svg3.append("g")
				.style("font-size", "8px")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x3));

			// set the parameters for the histogram
			let histogram3 = d3.histogram()
					.value(statthreeArray)   // I need to give the vector of values
					.value(function(statthreeArray) { return statthreeArray; })
					.domain(x3.domain())  // then the domain of the graphic
					.thresholds(x3.ticks(50)); // then the numbers of bins

			// And apply this function to data to get the bins
			var bins3 = histogram3(statthreeArray);

			// Y axis: scale and draw:
			var y3 = d3.scaleLinear()
					.range([height, 0]);
					y3.domain([0, d3.max(bins3, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

			svg3.append("g")
				.style("font-size", "8px")
				.call(d3.axisLeft(y3)
				.ticks(4));

			// append the bar rectangles to the svg element
			svg3.selectAll("rect")
					.data(bins3)
					.enter()
					.append("rect")
						.attr("x", 1)
						.attr("transform", function(d) { return "translate(" + x3(d.x0) + "," + y3(d.length) + ")"; })
						.attr("width", function(d) { return x3(d.x1) - x3(d.x0) -1 ; })
						.attr("height", function(d) { return height - y3(d.length); })
						.style("fill", "#a0500e");

				// text label for the x axis
			  svg3.append("text")
			      .attr("transform",
			            "translate(" + (width/2) + " ," +
			                           (height + margin.top + 20) + ")")
			      .style("text-anchor", "middle")
						.style("font-size", "11px")
			      .text(statthreeDesc + ". Selected Player's Score: " + hist1_val);

				// text label for the y axis
		  svg3.append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", -5 - margin.left)
		      .attr("x",0 - (height / 2))
		      .attr("dy", "1em")
		      .style("text-anchor", "middle")
					.style("font-size", "11px")
		      .text("player count");

	}

}
