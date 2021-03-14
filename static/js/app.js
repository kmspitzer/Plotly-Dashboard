const dataFile = "./data/samples.json";



// read in the id list and build the 
// dropdown menu
d3.json(dataFile).then((importedData) => {

	// grab the array of ids
	var ids = importedData.names;
	var demographics = importedData.metadata;
	var samples = importedData.samples;

	console.log(samples);

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
	//	console.log(currDemo);

		var currSample = samples.filter(filterId);
		console.log(currSample);

		var demoTarget = d3.select("#sample-metadata");
		demoTarget.html("");

		var demoTbl = demoTarget.append("table");

		// loop through the key/value pairs in the metadata
		// and display them in the panel

		var demoKeys = Object.keys(currDemo[0]);
//			console.log(demoKeys);
			demoKeys.forEach(key => {
				var demoRow = demoTbl.append("tr");
				demoRow.append("td").text((`${key}: ${currDemo[0][key]}`));
		});
  
//   //  Check to make sure your filtered your cities.
//   console.log(filteredCities);
  
//   // 3. Use the map method with the arrow function to return all the filtered cities.
//   var cities = filteredCities.map(city => city.City);
  
//   //  Check your filtered cities
//   console.log(cities);
  
//   // 4. Use the map method with the arrow function to return all the filtered cities population.
//   var population = filteredCities.map(city => city.population);
  
//   //  Check the populations of your filtered cities
//   console.log(population);
	}
  
});