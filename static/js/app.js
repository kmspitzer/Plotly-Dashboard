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

		var currSample = samples.filter(filterId);
		console.log(currSample);

		var otuIds = currSample[0].otu_ids;
		var otuLabels = currSample[0].otu_labels;
		var sampleValues = currSample[0].sample_values;
		// console.log(otuIds);
		// console.log(otuLabels);
		// console.log(sampleValues);

		var otuObject = [];

		for (var i = 0; i < otuIds.length; i++) {
			var tempObject = {};

			tempObject = { "otu_id": otuIds[i], "otu_label": otuLabels[i], "sample_value": sampleValues[i]};
			otuObject.push(tempObject);
		}
		console.log(otuObject);

		// Sort the data by Greek search results
//		var sortedSampleValues = data.sort((a, b) => b.sample - a.greekSearchResults);

// Slice the first 10 objects for plotting
//slicedData = sortedByGreekSearch.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
//reversedData = slicedData.reverse();

// Trace1 for the Greek Data
// var trace1 = {
//   x: reversedData.map(object => object.greekSearchResults),
//   y: reversedData.map(object => object.greekName),
//   text: reversedData.map(object => object.greekName),
//   name: "Greek",
//   type: "bar",
//   orientation: "h"
// };

// // data
// var data = [trace1];

// // Apply the group bar mode to the layout
// var layout = {
//   title: "Greek gods search results",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("plot", data, layout);

  
	}
  
});