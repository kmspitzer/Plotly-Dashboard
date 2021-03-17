//
//
//   UCSD Data Science and Visualization Bootcamp
//     Plotly Challenge
//
//     Kate Spitzer
//
//  The generateBubble() function receives 3 arrays of study data, as
//  well as the current subject id.  The 3 arrays are used to build
//  a Plotly bubble chart.  The x-axis will represent OTU id, and the
//  y-axis will indicate the sample value.
//
//

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