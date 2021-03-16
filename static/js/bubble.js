function generateBubble(otuIds, otuLabels, sampleValues, idChosen) {
	// create our data trace for the bubble chart
	var data = [{
		x: otuIds,
		y: sampleValues,
		text: otuLabels,
		mode: 'markers',
		marker: {
			color: otuIds,
			colorscale: "Portland",
			size: sampleValues
		}
	}];

	// define our bubble chart layout values  
	var layout = {
		title: `Sample Distribution for Subject ${idChosen}`,
		xaxis: {
			title: "OTU ID",
			titlefont: {
				size: 12
			}
		},
		yaxis: {
			title: "Sample Value",
			titlefont: {
				size: 12
			}
		},
		showlegend: false,
		height: 700
	};

	// generate bubble chart and place it in the
	// bubble div
	Plotly.newPlot('bubble', data, layout);

}