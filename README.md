# Plotly-Dashboard

   
   This functionality creates an interactive dashboard using data gathered in a belly button biodiversity study using javascript and plotly.
   
   
   To run this page, visit: https://kmspitzer.github.io/plotly-challenge/
   
   
   Inputs:
   -------  
   data/samples.json


   
   Dashboard Elements:
   -----------------------
    
   Test Subject Dropdown Menu
   --------------------------
   
   A dropdown menu is generated using the array of subject IDs provided in the samples.json dataset.  This list allows the
   user to choose only valid subject IDs with which to generate charts.  The select tag is used in index.html to display
   the menu, and uses an event listener to generate and display new data/charts on change.
          
   
   Metadata (Demographics) Box
   ---------------------------
   
   Using the subject ID chosen by the user, metadata is filtered out of the dataset, and displayed as key:value pairs in
   this box.  On hover, a brief explanation of the box purpose is displayed.
   
   
   Horizontal Bar Chart
   --------------------
   
   Using OTU and sample data, filtered by current subject ID, a horizontal bar chart is generated showing the top 10 OTUs
   found in the current subject's sample, and the frequency at which it is found.  On hover, a brief explanation of the
   chart is displayed.
   
   
   Bubble Chart
   ------------
   
   Using OTU and sample data, a bubble chart is generated showing all OTUs found for the current subject ID at what frequency. 
   The color of bubble indicates the OTU id (as well as its location on the x-axis), and the size of the bubble indicates the
   frequency the OTU was found (as well as its location on the y-axis).  On hover, a brief explanation of the
   chart is displayed.


   BONUS Gauge Chart
   -----------------
   
   The gauge chart needle indicates the number of times the current subject washed their navel per week during the study.  It
   uses the wfreq value that is part of the demographics data.  The chart is generated using plotly pie chart type, and trig
   functions to calculate the location of the needle.  On hover, a brief explanation of the chart is displayed.
   *********
	  NOTE: Code was located on the plotly.com community forum and
    modified to render this chart
   *********
   
   ![image](/images/dashboardss1.png)
   ![image](/images/dashboardss2.png)
   
   
   
   
