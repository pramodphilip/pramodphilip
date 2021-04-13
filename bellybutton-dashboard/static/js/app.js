/***********************************************/
// Import JSON data from samples.json
d3.json("../../data/samples.json").then(function(d){
    var data = d;

    /***********************************************/
    // Grab reference to dropdown menu id
    var dropDown = d3.select('#selDataset');

    // Grab list of subject ID No. for dropdown menu
    var namePeople = data[0].names;

    // Loop through list of names in import 
    namePeople.forEach((item) => {
        // Append dropdown option to menu
        dropDown.append("option").text(item)
    });

    /***********************************************/
    // Default Graphs - For Subject ID 940
    /***********************************************/
    // Value of selected dropdown option
    var selectedID = dropDown.property("value");
    // Individual data of subject 940
    var indivData = d[0].samples.filter(item => item.id === "940");

    // Top 10 Samples values for subject 940
    var sampleValues = indivData[0].sample_values.slice(0,10);

    // First 10 otu IDs for subject 940
    var otuID = indivData[0].otu_ids.slice(0,10);
    // Initialize new array for string version of otuID
    var otuID_10 = [];
    // Loop through otuID and push strings in format of "OTU (otu_id)"
    otuID.forEach(item => 
    {
        // String to be pushed to otuID_10
        var substring = otuID_10.push(`OTU ${item}`);
    })
    
    // First 10 otu labels for subject 940
    var otuLabels = indivData[0].otu_labels.slice(0,10);

    // Data for bar chart
    var data = [{
        x: sampleValues,
        y: otuID_10,
        mode:'markers',
        text:otuLabels,
        type: 'bar',
        orientation: 'h'
    }];

    // Layout for bar chart
    var layout = {
        xaxis:{title:'Sample Values'},
        yaxis:{title:'OTU ID Number',autorange:'reversed'}
    };

    // Bar chart plotted
    Plotly.newPlot('bar', data, layout);

    // Extract all sample values
    var sampleValues = indivData[0].sample_values;
    // Extract all otu ids
    var otuID = indivData[0].otu_ids;
    // Extract all otu labels
    var otuLabels = indivData[0].otu_labels;

    // Data for bubble chart
    var data = [{
        x: otuID,
        y: sampleValues,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuID,
          colorscale: [[0, 'rgb(211, 55, 170)'], [1, 'rgba(21, 152, 212, 1)']]
        },
        text:otuLabels
      }];
      
    // Layout for bubble chart
    var layout = {
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis:{title:'OTU ID'}
      };

    // Bubble chart plotted
    Plotly.newPlot('bubble', data, layout);

    // Get metadata for individual person
    var indivMeta = d[0].metadata.filter(item => item.id === 940);

    // Grab reference to div for demographic info box
    var metaTag = d3.select('#sample-metadata');

    // Grab keys from indivMeta
    const keys = Object.keys(indivMeta[0]);

    keys.forEach((key,index) => {
        metaTag.append('p').text(`${key}: ${indivMeta[0][key]}`);
    });

    // Data for gauge chart 
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: indivMeta[0].wfreq,
          title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              {range: [0, 1], color: "rgba(255, 255, 207, 1)"},
              {range: [1,2], color: "rgba(255, 236, 207, 1)"},
              {range: [2,3], color: "rgba(255, 209, 207, 1)"},
              {range: [3,4], color: "rgba(255, 209, 134, 1)"},
              {range: [4,5], color: "rgba(255, 172, 134, 1)"},
              {range: [5,6], color: "rgba(255, 137, 134, 1)"},
              {range: [6,7], color: "rgba(255, 95, 81, 1)"},
              {range: [7,8], color: "rgba(255, 51, 57, 1)"},
              {range: [8,9], color: "rgba(171, 51, 0, 1)"}
            ],
         }
        }
      ];

      // Layout for gauge chart
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      // Gauge chart plotted
      Plotly.newPlot('gauge', data, layout);

    /***********************************************/
    // Dropdown menu function - activates when drop down option is changed
    /***********************************************/

    // Activate change in drop down menu
    dropDown.on("change",function() {
        // Value of selected dropdown option for subject ID
        var selectedID = dropDown.property("value");
        // Individual data of selected subject
        var indivData = d[0].samples.filter(item => item.id === selectedID);

        // Extract first 10 sample values
        var sampleValues = indivData[0].sample_values.slice(0,10);
        // Extract first 10 otu ids
        var otuID = indivData[0].otu_ids.slice(0,10);
        // Initialize array for string versions of otu IDs
        var otuID_10 = [];
        // Loop through otuID and push strings in form of "OTU (ID)"
        otuID.forEach(item => 
        {
            // String to push to otuID_10
            otuID_10.push(`OTU ${item}`);
        })
        // Extract first 10 otu labels
        var otuLabels = indivData[0].otu_labels.slice(0,10);

        /********************************* */
        // Horizontal Bar Chart
        /********************************* */
        // Data for selected subject top 10 OTUs bar chart
        var data = [{
            x: sampleValues,
            y: otuID_10,
            mode:'markers',
            text:otuLabels,
            type: 'bar',
            orientation: 'h'
        }];

        // Layout for selected subject top 10 OTUs bar chart
        var layout = {
            xaxis:{title:'Sample Values'},
            yaxis:{title:'OTU ID Number',autorange:'reversed'}
        }

        // Config for making chart responsive
        var config = {responsive:true};
        // Top 10 OTU bar chart plotted
        Plotly.newPlot('bar', data, layout, config);

        /********************************* */
        // Bubble Chart
        /********************************* */
          
        // Extract all sample values
        var sampleValues = indivData[0].sample_values;
        // Extract all otu ids
        var otuID = indivData[0].otu_ids;
        // Extract all otu labels
        var otuLabels = indivData[0].otu_labels;

        // Data for selected subject bubble chart
        var data = [{
            x: otuID,
            y: sampleValues,
            mode: 'markers',
            marker: {
              size: sampleValues,
              color: otuID,
              // Set colorscale for bubble chart
              colorscale: [[0, 'rgb(211, 55, 170)'], [1, 'rgba(21, 152, 212, 1)']]
            },
            text:otuLabels
          }];
          
        // Layout for selected subject bubble chart
        var layout = {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis:{title:'OTU ID'}
          };

        // Selected subject bubble chart plotted
        Plotly.newPlot('bubble', data, layout);
       
        /********************************* */
        // Demographic Info
        /********************************* */

        // Get metadata for individual person
        var indivMeta = d[0].metadata.filter(item => item.id === parseInt(selectedID));
        // 
        console.log(indivMeta);

        // Grab reference to div for demographic info box
        var metaTag = d3.select('#sample-metadata');

        // Clear text
        metaTag.text("");

        // Append unordered list to metaTag
        var metaUL = metaTag.append('ul'); //.attr('style: list-style-type: none;')

        // Grab keys from indivMeta
        const keys = Object.keys(indivMeta[0]);

        keys.forEach((key,index) => {
            metaTag.append('p').text(`${key}: ${indivMeta[0][key]}`);
        });

        /********************************* */
        // Gauge Chart
        /********************************* */

        // Data for selected subject gauge chart
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: indivMeta[0].wfreq,
              title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                steps: [ 
                  // Each section of the gauge chart colored with unique color
                  {range: [0, 1], color: "rgba(255, 255, 207, 1)"},
                  {range: [1,2], color: "rgba(255, 236, 207, 1)"},
                  {range: [2,3], color: "rgba(255, 172, 134, 1)"},
                  {range: [3,4], color: "rgba(255, 209, 134, 1)"},
                  {range: [4,5], color: "rgba(255, 209, 207, 1)"},
                  {range: [5,6], color: "rgba(255, 137, 134, 1)"},
                  {range: [6,7], color: "rgba(255, 95, 81, 1)"},
                  {range: [7,8], color: "rgba(255, 51, 57, 1)"},
                  {range: [8,9], color: "rgba(171, 51, 0, 1)"}
                ],
             }
            }
          ];
          
          // Layout for selected subject gauge chart
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          // Selected subject gauge chart plotted
          Plotly.newPlot('gauge', data, layout);

    });//end of dropdown activation function
}); // end of code