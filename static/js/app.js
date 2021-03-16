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


	// layout the page with the selected subject id
	function optionChanged() {

		// locate the dropdown input
		var dropdownMenu = d3.select("#selDataset");

		// assign the value of the dropdown menu option to a variable
		var idChosen = dropdownMenu.property("value");
  
		// filter out demographics for current ID
		var currDemo = demographics.filter(data => data.id == idChosen);
		
		// filter out sample for current ID
		var currSample = samples.filter(data => data.id == idChosen);

		// we will need a list of OTU ids, OTU labels
		// and sample values
		var otuIds = currSample[0].otu_ids;
		var otuLabels = currSample[0].otu_labels;
		var sampleValues = currSample[0].sample_values;


		//////////////////////////
		//                      //
		//  DEMOGRAPHICS PANEL  //
		//                      //
		//////////////////////////
		displayDemographics(currDemo);


		////////////////////////////
		//  HORIZONTAL BAR CHART  //
		////////////////////////////
		generateBar(otuIds, otuLabels, sampleValues, idChosen);
		

		///////////////////
		//  BUBBLE CHART //
		///////////////////
		generateBubble(otuIds, otuLabels, sampleValues, idChosen);


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
	
	////////////////
	// BEGIN MAIN //
	////////////////
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
	
}); 
