//Width and height of map
let width = 400;
let height = 700;

// D3 Projection
let projection = d3.geoAlbers()
  .center([100.0, 13.5])
  .rotate([0, 24])
  .parallels([5, 21])
  .scale(1200 * 2)
  .translate([-100, 200]);

// // Define path generator
// let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
//   .projection(projection); // tell path generator to use albersUsa projection

// Define linear scale for output
let color = d3.scaleLinear()
  .domain([0, 1])
  .range(["gainsboro", "#eb307c"]);

let legendText = ["เคยไป", "ไม่เคยไป"];

// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
let legend = d3.select("#result").append("svg")
    .attr("class", "legend")
    .attr("width", 140)
    .attr("height", 100)
    .selectAll("g")
  .data(color.domain().slice().reverse())
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0,${i * 20})`);
legend.append("rect")
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);
legend.append("text")
  .data(legendText)
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(d => d);

//Create SVG element and append map to the SVG
let svg = d3.select("#result")
  .append("svg")
  .attr("class", "map")
  .attr("width", width)
  .attr("height", height);

// Append Div for tooltip to SVG
let tooltip = d3.select("body")
  .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// adapted from d3 hexbin
let hex = function (coordinates, [x0, y0], [dx, dy], radius) {
  const num = coordinates.length;
  if (num >= 6) {
    const numPerSide = Math.floor(num / 6);
    const remainder = num - (numPerSide * 6);

    const thirdPi = Math.PI / 6;
    const angles = [thirdPi, thirdPi * 3, thirdPi * 5, thirdPi * 7, thirdPi * 9, thirdPi * 11];

    x0 = (x0 - ((y0 % 2 === 0) ? 0.5 : 0)) * radius * Math.sqrt(3);
    y0 *= radius * 3 / 2;

    //find the closest angle to offset
    const centroid = d3.polygonCentroid(coordinates);
    const angleOffset = Math.atan2(coordinates[0][1] - centroid[1], coordinates[0][0] - centroid[0]);
    const angles2 = angles.map(a => Math.abs((a - angleOffset) % (2 * Math.PI)));
    const indexOffset = angles2.indexOf(d3.min(angles2));

    let corners = angles.map(function (angle) {
      let x1 = Math.cos(angle) * radius;
      let y1 = Math.sin(angle) * radius;
      return [dx + x0 + x1, dy + y0 + y1];
    });
    let hex = [];
    for (let i = indexOffset; i < indexOffset + 6; i++) {
      let n = numPerSide + ((i % 6 < remainder) ? 1 : 0);
      for (let j = 0; j < n; j++) {
        hex.push(d3.interpolateArray(corners[i % 6], corners[(i + 1) % 6])(j / n));
      }
    }
    return hex;
  } else {
    return [];
  }
}
const thaiHexMap = [
  { id: 57, y: 0, x: 2 },

  { id: 50, y: 1, x: 0 },
  { id: 52, y: 1, x: 1 },
  { id: 56, y: 1, x: 2 },

  { id: 58, y: 2, x: 0 },
  { id: 51, y: 2, x: 1 },
  { id: 53, y: 2, x: 2 },
  { id: 55, y: 2, x: 3 },

  { id: 54, y: 3, x: 0 },
  { id: 64, y: 3, x: 1 },
  { id: 65, y: 3, x: 2 },
  { id: 67, y: 3, x: 3 },
  { id: 43, y: 3, x: 5 },
  { id: 38, y: 3, x: 6 },
  { id: 48, y: 3, x: 7 },

  { id: 63, y: 4, x: 1 },
  { id: 62, y: 4, x: 2 },
  { id: 66, y: 4, x: 3 },
  { id: 42, y: 4, x: 4 },
  { id: 39, y: 4, x: 5 },
  { id: 41, y: 4, x: 6 },
  { id: 47, y: 4, x: 7 },
  { id: 49, y: 4, x: 8 },

  { id: 61, y: 5, x: 1 },
  { id: 18, y: 5, x: 2 },
  { id: 60, y: 5, x: 3 },
  { id: 36, y: 5, x: 4 },
  { id: 40, y: 5, x: 5 },
  { id: 46, y: 5, x: 6 },
  { id: 35, y: 5, x: 7 },

  { id: 71, y: 6, x: 1 },
  { id: 15, y: 6, x: 2 },
  { id: 17, y: 6, x: 3 },
  { id: 16, y: 6, x: 4 },
  { id: 30, y: 6, x: 5 },
  { id: 44, y: 6, x: 6 },
  { id: 45, y: 6, x: 7 },
  { id: 37, y: 6, x: 8 },

  { id: 72, y: 7, x: 1 },
  { id: 14, y: 7, x: 2 },
  { id: 13, y: 7, x: 3 },
  { id: 19, y: 7, x: 4 },
  { id: 31, y: 7, x: 5 },
  { id: 32, y: 7, x: 6 },
  { id: 33, y: 7, x: 7 },
  { id: 34, y: 7, x: 8 },

  { id: 70, y: 8, x: 1 },
  { id: 12, y: 8, x: 2 },
  { id: 10, y: 8, x: 3 },
  { id: 26, y: 8, x: 4 },
  { id: 25, y: 8, x: 5 },

  { id: 73, y: 9, x: 1 },
  { id: 74, y: 9, x: 2 },
  { id: 11, y: 9, x: 3 },
  { id: 24, y: 9, x: 4 },
  { id: 27, y: 9, x: 5 },

  { id: 76, y: 10, x: 1 },
  { id: 75, y: 10, x: 2 },
  { id: 20, y: 10, x: 4 },
  { id: 21, y: 10, x: 5 },
  { id: 22, y: 10, x: 6 },

  { id: 77, y: 11, x: 1 },
  { id: 23, y: 11, x: 6 },

  { id: 86, y: 12, x: 1 },

  { id: 85, y: 13, x: 0 },

  { id: 84, y: 14, x: 1 },

  { id: 82, y: 15, x: 0 },
  { id: 80, y: 15, x: 1 },

  { id: 83, y: 16, x: 0 },
  { id: 81, y: 16, x: 1 },

  { id: 92, y: 17, x: 1 },
  { id: 93, y: 17, x: 2 },

  { id: 91, y: 18, x: 2 },
  { id: 90, y: 18, x: 3 },
  { id: 94, y: 18, x: 4 },

  { id: 95, y: 19, x: 3 },
  { id: 96, y: 19, x: 4 },
];

let geo;
let updateGeo = function (province, visited) {
  for (let i = 0; i < geo.length; i++) {
    if (province === geo[i].properties.NAME_1) {
      if (typeof visited != "undefined") {
        geo[i].properties.visited = visited;
        break;
      } else {
        return geo[i].properties.visited;
      }
    }
  }
}
let updateMap = function () {
  svg.selectAll("path")
    .style("fill", function (d) {
      let value = d.properties.visited;
      return value ? color(value) : "gainsboro";
    })
    // .transition()
    // .duration(2000)
    .attr("d", function (d) {
      let coords = d.geometry.coordinates[0];
      if (coords.length == 1) { //find the biggest part in each province
        let max_length = -1;
        let max_i = -1;
        for (let i = 0; i < d.geometry.coordinates.length; i++) {
          if (max_length < d.geometry.coordinates[i][0].length) {
            max_length = d.geometry.coordinates[i][0].length;
            max_i = i;
          }
        }
        coords = d.geometry.coordinates[max_i][0];
      }
      // let circleCoords = circle(coords.map(function (coord) { return projection(coord); }));
      let hexCenter = thaiHexMap.find(h => h.id === +d.properties.ISO);
      let hexCoords = hex(coords.map(coord => projection(coord)), [hexCenter.x, hexCenter.y], [80, 50], 20);
      return "M" + hexCoords.join("L") + "Z";
    });
}

let provinces;
let findProvinceTH = function(province) {
  // Find the corresponding province inside the GeoJSON
  for (let i = 0; i < provinces.length; i++)  {
    if (province === provinces[i].province) {
      return provinces[i].provinceTH;
    }
  }
}

d3.csv("data/provinces-visited.csv").then(function(data) {
  provinces = data;

  // dropdown
  let $provinces = $("#provinces");
  provinces.forEach(function(row) {
    $provinces.append($("<option>", {
      value: row.province,
      text: row.provinceTH
    }));
  });
  $('.ui.dropdown')
    .dropdown({
      onAdd: function(value, text, $selectedItem) {
        updateGeo(value, 1);
        updateMap();
      },
      onRemove: function(value, text, $selectedItem) {
        updateGeo(value, 0);
        updateMap();
      }
    });

  // Load GeoJSON data and merge with states data
  d3.json("data/thailand-topo.json").then(function(json) {
    geo = topojson.feature(json, json.objects.thailand).features;

    // Loop through each province in the .csv file
    provinces.forEach(function(d) {
      updateGeo(d.province, d.visited);
    });

    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(geo)
      .enter()
        .append("path")
        // .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .on("mouseover", function (d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.8);
          tooltip.html(findProvinceTH(d.properties.NAME_1))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 30) + "px");
        })
        .on("mouseout", function (d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .on("click", function (d) {
          if (updateGeo(d.properties.NAME_1) == 0) {
            $("#provinces").dropdown("set selected", d.properties.NAME_1);
            updateGeo(d.properties.NAME_1, 1);
          } else {
            $("#provinces").dropdown("remove selected", d.properties.NAME_1);
            updateGeo(d.properties.NAME_1, 0);
          }
          updateMap();
        });
    updateMap();
  });
// })
});