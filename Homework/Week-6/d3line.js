/* auteur: Jasper Lelijveld
* studentnummer: 11401753
* vak: Data Processing
* Week 5 - d3Line
* Met dank aan: https://bl.ocks.org/mbostock/3902569, voor de mouse function
*/

window.onload = function () {
// laad dataset
d3.json("d3lineLeeuwarden.json", function(data){

//marges
    var margin = {boven: 30, rechts: 50, onder: 50, links: 50},
        width = 1000 - margin.links - margin.rechts,
        height = 500 - margin.boven - margin.onder;
//javascript datum format
    var	parseDate = d3.time.format("%y-%m-%d").parse;
//parse de datums
    data.forEach(function(d) {
		d.Datum = parseDate(d.Datum);
	});
// min en max datum voor x-as
    var minDate = d3.min(data, function(d) { return d.Datum; });
    minDate.setDate(minDate.getDate() - 1);
    var maxDate = d3.max(data, function(d) { return d.Datum; });
// x en y scaling
    var y = d3.scale.linear()
        .domain([-60, d3.max(data, function(d) { return 350; })])
        .range([height, 0]);

    var x = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);
// Lijn grafieken definiëren
    var line0 = d3.svg.line()
        .x(function(d) { return x(d.Datum); })
        .y(function(d) { return y(d.GemiddeldeTemperatuur); })
    var line1 = d3.svg.line()
        .x(function(d) { return x(d.Datum); })
        .y(function(d) { return y(d.MaximumTemperatuur); })
    var line2 = d3.svg.line()
        .x(function(d) { return x(d.Datum); })
        .y(function(d) { return y(d.MinimumTemperatuur); })
// x en y as definiëren
    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(15, "mm")
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(15, "mm")
        .orient("left");
// maak en append svg aan body
    var	svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.links + margin.rechts)
            .attr("height", (height + margin.boven + margin.onder))
        .append("g")
            .attr("transform", "translate(" + margin.links + "," + margin.boven + ")");
// append de Gemiddelde temperatuur grafiek
    svg.append("svg:path")
        .attr("class", "line0")
        .attr("d", line0(data))
        .attr("stroke", "green");
// on button click voeg maximum en/of minimum toe
    document.getElementById("myBtn1").addEventListener("click", function(){
        svg.append("svg:path")
            .attr("class", "line0")
            .attr("d", line1(data))
            .attr("stroke", "Red");
    });
    document.getElementById("myBtn2").addEventListener("click", function(){
        svg.append("svg:path")
            .attr("class", "line0")
            .attr("d", line2(data))
            .attr("stroke", "Blue");
    });
// append x en y as
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("y", 40)
        .call(yAxis);
// append tekst voor x en y as en grafiek titel
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width/2) +","+(height + 40)+")")
        .text("Datum");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width/2) +")")
        .text("Leeuwarden. Temperatuur in 0.1 graden Celsius (34 = 3,4 C )");

    svg.append("text")
        .attr("text-anchor", "middle")
        .text("Temperatuur");
// bron zie boven
// bisect data
    var bisectDate = d3.bisector(function(d) { return d.Datum; }).left;
// append focus
    var point = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
// append cirkel aan focus
    point.append("circle")
        .attr("r", 4.5);
// append text aan focus
    point.append("text")
        .attr("x", 10)
        .attr("y", 5)
        .attr("fill", "black");
// creëer onzichtbare overlay over de svg die de muisbeweging/positie tracked
// met de bijbehorende functies
    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { point.style("display", null); })
        .on("mouseout", function() { point.style("display", "none"); })
        .on("mousemove", mousemove);
// de mousemove functie welke de juiste y waardes bij de x waarde zoekt
// laat zowel de gemiddelde temperatuur, als de minimum en maximum temperatuur zien
    function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.Datum > d1.Datum - x0 ? d1 : d0;
    point.attr("transform", "translate(" + x(d.Datum) + "," + y(d.GemiddeldeTemperatuur) + ")");
// maak text de verschillende y data punten
    point.select("text").text("Gemiddeld: " + d.GemiddeldeTemperatuur + ", Maximum: " + d.MaximumTemperatuur + ", Minimum: " + d.MinimumTemperatuur);
    }
// log de data
    console.log(data);
});
}
