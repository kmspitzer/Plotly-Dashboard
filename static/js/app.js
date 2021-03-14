const dataFile = "./data/samples.json"


// var ids = d3.json(dataFile).then(data => data.names);


// console.log(ids);




d3.json(dataFile).then((importedData) => {
	// console.log(importedData);
	var ids = importedData.names;

	var dropdownTarget = d3.select("#selDataset");

	for (let i = 0; i < ids.length; i++) {
	 	dropdownTarget.append("option").attr("value", ids[i]).text(ids[i]);
 	}
  

	
  
	
});
  