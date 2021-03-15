const dataFile = "./data/samples.json";



// read in the id list and build the 
// dropdown menu
d3.json(dataFile).then((importedData) => {

	// grab the array of ids
	var ids = importedData.names;
	var demographics = importedData.metadata;
	var samples = importedData.samples;


	// locate the target for the dropdown values
	var dropdownTarget = d3.select("#selDataset");

	// loop through the ids and add them to the
	// dropdown menu
	for (let i = 0; i < ids.length; i++) {
		dropdownTarget.append("option").attr("value", ids[i]).text(ids[i]);
	}

	// initialize page with data
	optionChanged();
	

	// On change to the DOM, call getData()
	d3.selectAll("#selDataset").on("change", optionChanged);

	// Function called by DOM changes
	function optionChanged() {
		var dropdownMenu = d3.select("#selDataset");

		// Assign the value of the dropdown menu option to a variable
		var idChosen = dropdownMenu.property("value");
		console.log(idChosen);
  

		function filterId(data) {
			return data.id == idChosen;
		}
  
		// 2. Use filter() to pass the function as its argument
		var currDemo = demographics.filter(filterId);

		var demoTarget = d3.select("#sample-metadata");
		demoTarget.html("");

		var demoTbl = demoTarget.append("table");

		// loop through the key/value pairs in the metadata
		// and display them in the panel
		var demoKeys = Object.keys(currDemo[0]);
			demoKeys.forEach(key => {
				var demoRow = demoTbl.append("tr");
				demoRow.append("td").text((`${key}: ${currDemo[0][key]}`));
		});

		var numScrubs = currDemo[0].wfreq;
		console.log(numScrubs);

		var currSample = samples.filter(filterId);
	//	console.log(currSample);

		var otuIds = currSample[0].otu_ids;
		var otuLabels = currSample[0].otu_labels;
		var sampleValues = currSample[0].sample_values;

		//console.log(`Number of samples: ${otuIds.length}`)
		// console.log(otuIds);
		// console.log(otuLabels);
		// console.log(sampleValues);

		var otuObject = [];

		for (var i = 0; i < otuIds.length; i++) {
			var tempObject = {};

			tempObject = { "otu_id": otuIds[i], "otu_label": otuLabels[i], "sample_value": sampleValues[i]};
			otuObject.push(tempObject);
		}
//		console.log(otuObject);

		// Sort the data by Greek search results
		var sortedOTUs = otuObject.sort((a, b) => b.sample_value - a.sample_value);

//		console.log(sortedOTUs);

		// Slice the first 10 objects for plotting
		slicedOTUs = sortedOTUs.slice(0, 10);

		// Reverse the array to accommodate Plotly's defaults
		reversedOTUs = slicedOTUs.reverse();

		var barChart = d3.select("#bar");
		barChart.html("");

		// Trace1 for the Greek Data
		var data = [{
   			x: reversedOTUs.map(object => object.sample_value),
			y: reversedOTUs.map(object => `OTU ${object.otu_id} `),
   			text: reversedOTUs.map(object => object.otu_label),
			name: "Sample Value",
   			type: "bar",
   			orientation: "h",
			marker: {
				color: 'rgb(142,124,195)',
				opacity: 0.5
			}
 		}];


		// Apply the group bar mode to the layout
		var layout = {
			title: `Top 10 OTUs for Subject ${idChosen}`,
			paper_bgcolor: 'rgba(245,246,249,1)',
			plot_bgcolor: 'rgba(245,246,249,1)',
			width: 450,
			height: 550,
			xaxis: {
				title: "Sample Value",
				titlefont: {
					size: 12
				}
			},
			showlegend: false,
			annotations: [],
			hoverlabel: {
				bgcolor: 'rgba(245,246,249,1)',
				font: {
					color: 'rgba(7, 7, 7, 0.97)'
				}
			}	
		};

		// Render the plot to the div tag with id "plot"
		Plotly.newPlot("bar", data, layout);


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
			height: 600,
			width: 1000
		};
		  
		Plotly.newPlot('bubble', data, layout);


		var data = [{
			  type: "indicator",
			  mode: "gauge+number",
			  value: numScrubs,
			  title: { text: "Scrubs per Week", font: { size: 18 } },
			  gauge: {
				axis: { range: [null, 9] },
				bar: { color: "lightgrey" },
				bgcolor: "white",
				borderwidth: 0,
				steps: [
				  { range: [0, 1], color: "lightcyan" },
				  { range: [1, 2], color: "paleturquoise" },
				  { range: [2, 3], color: "aquamarine" },
				  { range: [3, 4], color: "cyan" },
				  { range: [4, 5], color: "turquoise" },
				  { range: [5, 6], color: "mediumturquoise" },
				  { range: [6, 7], color: "darkturquoise" },
				  { range: [7, 8], color: "cadetblue" },
				  { range: [8, 9], color: "darkcyan"}
				]
			  }
			}];
		  
		  var layout = {
			width: 450,
			height: 350,
			margin: { t: 0, r: 15, l: 15, b: 5 },
			paper_bgcolor: 'rgba(245,246,249,1)'
		  };
		  
		  Plotly.newPlot('gauge', data, layout);

  
	}
  
});