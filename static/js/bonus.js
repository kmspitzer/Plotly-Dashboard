//
//
//   UCSD Data Science and Visualization Bootcamp
//     Plotly Challenge
//
//     Kate Spitzer
//
//  This function receives the wash frequency of the current
//  the current study subject and renders a gauge chart using
//  Plotly pie chart functionality.
//
//  *********
//	NOTE: Code was located on the plotly.com community forum and
//  modified to render this chart
//	*********
//
//


function generateGauge(needleValue) {

	// trig to calc meter point
	var degrees = 180 - (needleValue*20);
   	var radius = .5;
	var radians = degrees * Math.PI / 180;
	var x = radius * Math.cos(radians);
	var y = radius * Math.sin(radians);

	// Path: may have to change to create a better triangle
	var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     	pathX = String(x),
     	space = ' ',
     	pathY = String(y),
     	pathEnd = ' Z';
	var path = mainPath.concat(pathX,space,pathY,pathEnd);

	// create data trace for our gauge chart
	var data = [{ type: 'category',
		x: [0], y:[0],
    	marker: {size: 28, color:'850000'},
    	showlegend: false,
    	hoverinfo: "none"},
  		{ values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  			rotation: 90,
  			hoverinfo: "none",
  			text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1"],
  			textinfo: 'text',
  			textposition:'inside',      
			marker: {colors:["darkcyan", "cadetblue", "darkturquoise", "mediumturquoise", "turquoise",
							"cyan", "aquamarine", "paleturquoise", "lightcyan",
							"lightgrey"]},
  		hole: .5,
  		type: 'pie',
  		showlegend: false
	}];

	// define our chart layout
	var layout = {
  		shapes:[{
      		type: 'path',
      		path: path,
      		fillcolor: '850000',
      		line: {
        		color: '850000'
      		}
    	}],
  		height: 400,
  		margin: { t: 0, r: 0, l: 0, b: 0 },
  		xaxis: {type:'category',zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
  		yaxis: {type:'category',zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
		plot_bgcolor: "lightgrey"
	};


	// render the gauge chart in the gauge div
	// on our page
	Plotly.newPlot('gauge', data, layout);

}