
function generateBar(otuIds, otuLabels, sampleValues, idChosen) {

	// create a JS object for sorting
	var otuObject = [];

	// loop through list of study data and build the object
	for (var i = 0; i < otuIds.length; i++) {
		var tempObject = {};

		tempObject = { "otu_id": otuIds[i], "otu_label": otuLabels[i], "sample_value": sampleValues[i]};
		otuObject.push(tempObject);
	}

	// sort the object by sample value
	var sortedOTUs = otuObject.sort((a, b) => b.sample_value - a.sample_value);

	// slice the first 10 objects for plotting
	slicedOTUs = sortedOTUs.slice(0, 10);

	// Reverse the array to accommodate Plotly's defaults
	reversedOTUs = slicedOTUs.reverse();

	// locate the area to display the bar chart and
	// clear out the HTML
	var barChart = d3.select("#bar");
	barChart.html("");

	
	// create our data trace for the bar chart
	var data = [{
   		x: reversedOTUs.map(object => object.sample_value),
		y: reversedOTUs.map(object => `OTU ${object.otu_id} `),
   		text: reversedOTUs.map(object => object.otu_label),
		name: "Sample Value",
   		type: "bar",
   		orientation: "h",
		marker: {
			color: 'rgb(236, 141, 81)',
			opacity: 0.5
		}
 	}];

	// define our bar chart layout values
	var layout = {
		title: `Top 10 OTUs for Subject ${idChosen}`,
		paper_bgcolor: 'rgba(245,246,249,1)',
		plot_bgcolor: 'rgba(245,246,249,1)',
		height: 450,
		xaxis: {
			title: "Sample Value",
			titlefont: {
				size: 12
			}
		},
		showlegend: false,
		annotations: []	
	};

	// place the bar chart in the "bar" div
	Plotly.newPlot("bar", data, layout);

}
