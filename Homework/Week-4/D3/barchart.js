/* auteur: Jasper Lelijveld
* studentnummer: 11401753
* vak: Data Processing
* Data van de gemiddelde maandelijkse neerslag van De Bilt in een barchart
*/
// Zekerheid dat data geladen is voor de funtie wordt uitgevoerd
// Barchart.json is mijn Json file
d3.json("Barchart.json", function(data){
    var width = 1000,
        height = 700;

    // x as marge
    var axisMargin = -30

    // y as schaalt op basis van de veld hoogte
    var y = d3.scale.linear()
        .range([height, 0]);

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    // creëer svg in body
    var chart = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / data.length;

    // x as
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // y as
    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(15, "mm")
        .orient("right");

    // voor alle waardes in json maak een g
    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",-35)"; })
        .attr("height", height + 50);
    // bepaald x op basis van waardes in Json
    x.domain(data.map(function(d) { return d.Maand; }));
    // y is hard gecodeerd
    y.domain([0, 1600]);

    // maak een rect met de volgende eigenschappen:
    bar.append("rect")
        .attr("class", "rect")
        .attr("width", barWidth - 5)
        .attr("y", function(d) { return y(d.Neerslag); })
        .attr("height", function(d) { return height - y(d.Neerslag); })

    // maak x as
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + axisMargin) + ")")
        .call(xAxis);

    // maak y as
    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + axisMargin + ")")
        .attr("y", 40)
        .call(yAxis);

    // log
    console.log(data);
});
