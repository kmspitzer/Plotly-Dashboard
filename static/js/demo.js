
function displayDemographics(currDemo) {

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
}