/* auteur: Jasper Lelijveld
* studentnummer: 11401753
* vak: Data Processing
* Week 5 - d3Line
*/

// Een moedige poging om het met één dataset te doen inplaats van twee.
d3.json("Data.json", function(data){

    var Leeuwarden = data[0];
    var Maastricht = data[1];

    var margin = {boven: 30, rechts: 30, onder: 50, links: 50},
        width = 1200 - margin.links - margin.rechts,
        height = 600 - margin.boven - margin.onder;

    var	parseDate = d3.time.format("%y-%m-%d").parse;

    var Datum = [];

    for (var i in Leeuwarden.Datum)   {
		Leeuwarden.Datum[i] = parseDate(Datum[i]);
	};

    var minDate = d3.min(Datum, function(d) { return Datum; });
    var maxDate = d3.max(Datum, function(d) { return Datum; });

    var y = d3.scale.linear()
        .domain([-40, d3.max(data, function(d) { return Leeuwarden.MaximumTemperatuur; })])
        .range([height, 0]);

    var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

    var line0 = d3.svg.line()
        .x(function(d) { return x(Leeuwarden.Datum); })
        .y(function(d) { return y(Leeuwarden.GemiddeldeTemperatuur); })
    var line1 = d3.svg.line()
        .x(function(d) { return x(Leeuwarden.Datum); })
        .y(function(d) { return y(Leeuwarden.MaximumTemperatuur); })
    var line2 = d3.svg.line()
        .x(function(d) { return x(Datum); })
        .y(function(d) { return y(Leeuwarden.MinimumTemperatuur); })

    var line3 = d3.svg.line()
        .x(function(d) { return x(Leeuwarden.Datum); })
        .y(function(d) { return y(Maastricht.GemiddeldeTemperatuur); })
    var line4 = d3.svg.line()
        .x(function(d) { return x(Leeuwarden.Datum); })
        .y(function(d) { return y(Maastricht.MaximumTemperatuur); })
    var line5 = d3.svg.line()
        .x(function(d) { return x(Leeuwarden.Datum); })
        .y(function(d) { return y(Maastricht.MinimumTemperatuur); })

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(15, "mm")
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(15, "mm")
        .orient("left");

///
    var	svg1 = d3.select("body")
        .append("svg")
            .attr("width", width + margin.links + margin.rechts)
            .attr("height", (height + margin.boven + margin.onder))
        .append("g")
            .attr("transform", "translate(" + margin.links + "," + margin.boven + ")");

    var	svg2 = d3.select("body")
        .append("svg")
            .attr("width", width + margin.links + margin.rechts)
            .attr("height", (height + margin.boven + margin.onder))
        .append("g")
            .attr("transform", "translate(" + margin.links + "," + margin.boven + ")");


    svg1.append("svg:path")
        .attr("class", "line0")
        .attr("d", line0(Leeuwarden))
        .attr("stroke", "green");

    svg1.append("svg:path")
        .attr("class", "line1")
        .attr("d", line1(Leeuwarden))
        .attr("stroke", "red");

    svg1.append("svg:path")
        .attr("class", "line2")
        .attr("d", line2(Leeuwarden))
        .attr("stroke", "blue");

    svg2.append("svg:path")
        .attr("class", "line3")
        .attr("d", line0(Maastricht))
        .attr("stroke", "green");

    svg2.append("svg:path")
        .attr("class", "line4")
        .attr("d", line1(Maastricht))
        .attr("stroke", "red");

    svg2.append("svg:path")
        .attr("class", "line5")
        .attr("d", line2(Maastricht))
        .attr("stroke", "blue");

    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);

    svg1.append("g")
        .attr("class", "y axis")
        .attr("y", 40)
        .call(yAxis);

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);

    svg2.append("g")
        .attr("class", "y axis")
        .attr("y", 40)
        .call(yAxis);

    svg1.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width/2) +","+(height + 40)+")")
        .text("Datum");

    svg1.append("text")
        .attr("text-anchor", "middle")
        .text("Temperatuur");

    console.log(data);
});