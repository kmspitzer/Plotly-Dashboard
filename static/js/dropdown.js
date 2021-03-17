
//
//
//   UCSD Data Science and Visualization Bootcamp
//     Plotly Challenge
//
//     Kate Spitzer
//
//  The buildDropdown() function receives an array of subject ids, and
//  loops through them add option elements to a dropdown menu.
//
//

function buildDropdown(idList) {
	// locate the target for the dropdown values
	var dropdownTarget = d3.select("#selDataset");

	// loop through the ids and add them to the
	// dropdown menu as options
	for (let i = 0; i < idList.length; i++) {
		dropdownTarget.append("option").attr("value", idList[i]).text(idList[i]);
	}
}