
function generateGauge(needleValue) {

	// Trig to calc meter point
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
//  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
//                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
//                         'rgba(210, 206, 145, .5)', 
//                         'rgba(255, 255, 255, 0)']},
			marker: {colors:["darkcyan", "cadetblue", "darkturquoise", "mediumturquoise", "turquoise",
							"cyan", "aquamarine", "paleturquoise", "lightcyan",
							"white"]},
  		hole: .5,
  		type: 'pie',
  		showlegend: false
	}];

	var layout = {
  		shapes:[{
      		type: 'path',
      		path: path,
      		fillcolor: '850000',
      		line: {
        		color: '850000'
      		}
    	}],
  		title: "Scrubs per Week",
  		height: 500,
  		width: 450,
  		margin: { t: 70, r: 20, l: 15, b: 5 },
  		xaxis: {type:'category',zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
  		yaxis: {type:'category',zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]}
	};



	Plotly.newPlot('gauge', data, layout);

}