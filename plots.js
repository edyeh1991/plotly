
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text('ID: ' + result.id);
    PANEL.append("h6").text('ETHNICITY: ' + result.ethnicity);
    PANEL.append("h6").text('GENDER: ' + result.gender);
    PANEL.append("h6").text('AGE: ' + result.age);
    PANEL.append("h6").text('LOCATION: ' + result.location);
    PANEL.append("h6").text('BBTYPE: ' + result.bbtype);
    PANEL.append("h6").text('WFREQ: ' + result.wfreq);

  });
}

function buildCharts(sample) {
  d3.json('samples.json').then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    


    var bar = [
         {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otu => `OTU: ${otu}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h" 
        }
    ];

    var barlayout = {
        title: "Top 10 OTUs Found",
        margin: {t: 30, l: 150}
     };

    Plotly.newPlot("bar", bar, barlayout);

    var bubble = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
    }];

    var bublayout = {
      title: 'OTUs',
      xaxis: {title: 'OTU IDs'},
      yaxis: {title: '# of OTUs'}
    };
    
    Plotly.newPlot('bubble', bubble, bublayout);

  });
}

function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);

    buildCharts(sampleNames[0]);
    buildMetadata(sampleNames[0]);
    });
})}

init();