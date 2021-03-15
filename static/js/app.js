//
//
//   UCSD Data Science and Visualization Bootcamp
//     Plotly Challenge
//
//     Kate Spitzer
//
//  This functionality reads in a JSON file containing study
//  data related to bacteria present in human navels.
//
//  Using the data, a dropdown menu of subject ids is created,
//  allowing the user to choose valid subject ids that are part
//  of the study.  Based on the subject id chosen by the user,
//  study data is used to display metadata/demographic info
//  related to the subject, and generate a horizontal bar chart
//  and bubble chart to visualize the subject's data results.
//
//  A function is called at the end to generate a bonus gauge
//  chart to display the frequency with which the subject
//  washed their navel.
//
//  Javascript, D3, and Plotly were employed to develop this
//  challenge.
//
//


// initialize data filename
const dataFile = "./data/samples.json";


// read in the JSON study data 
d3.json(dataFile).then((importedData) => {

	// pull out the subject ids, the demographics data,
	// and the data samples
	var ids = importedData.names;
	var demographics = importedData.metadata;
	var samples = importedData.samples;


	// locate the target for the dropdown values
	var dropdownTarget = d3.select("#selDataset");

	// loop through the ids and add them to the
	// dropdown menu as options
	for (let i = 0; i < ids.length; i++) {
		dropdownTarget.append("option").attr("value", ids[i]).text(ids[i]);
	}

	// initialize page with data
	optionChanged();
	

	// wait on change, and refresh the page
	d3.selectAll("#selDataset").on("change", optionChanged);

	// layout the page with the selected subject id
	function optionChanged() {

		// locate the dropdown input
		var dropdownMenu = d3.select("#selDataset");

		// assign the value of the dropdown menu option to a variable
		var idChosen = dropdownMenu.property("value");
  

		// function to filter data by selected ID
		function filterId(data) {
			return data.id == idChosen;
		}



		//////////////////////////
		//                      //
		//  DEMOGRAPHICS PANEL  //
		//                      //
		//////////////////////////
  
		// use filter() to pass the function as its argument
		var currDemo = demographics.filter(filterId);


		// locate the output position of the demographics
		// table, and clear the data
		var demoTarget = d3.select("#sample-metadata");
		demoTarget.html("");

		// create a table to display the data
		var demoTbl = demoTarget.append("table");

		// loop through the key/value pairs in the demographics
		// and display them in the panel
		var demoKeys = Object.keys(currDemo[0]);
		demoKeys.forEach(key => {
			var demoRow = demoTbl.append("tr");
			demoRow.append("td").text((`${key}: ${currDemo[0][key]}`));
		});

		////////////////////////////
		//                        //
		//  HORIZONTAL BAR CHART  //
		//                        //
		////////////////////////////

		// use filter() to pass the function as its argument
		var currSample = samples.filter(filterId);

		// we will need a list of OTU ids, OTU labels
		// and sample values
		var otuIds = currSample[0].otu_ids;
		var otuLabels = currSample[0].otu_labels;
		var sampleValues = currSample[0].sample_values;


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
				color: 'rgb(142,124,195)',
				opacity: 0.5
			}
 		}];

		// define our bar chart layout values
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
			annotations: []	
		};

		// place the bar chart in the "bar" div
		Plotly.newPlot("bar", data, layout);



		///////////////////
		//               //
		//  BUBBLE CHART //
		//               //
		///////////////////

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
			height: 800,
			width: 1200
		};
		
		// generate bubble chart
		Plotly.newPlot('bubble', data, layout);


		////////////////////////////////////////////
		//                                        //
		//  		BONUS GAUGE CHART             //
		//                                        //
		// generate BONUS gauge chart using       //
		// wash frequency for the current subject //
		//                                        //
		////////////////////////////////////////////
		generateGauge(currDemo[0].wfreq);
	}
  
});
