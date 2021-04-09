/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


/* =====================
Define functions
===================== */
var data;
var markers;
var featureGroup;
var proverty = {
  "Yes" : "Current census tract is a high proverty area", 
  "No" : "Current census tract isn't a high proverty area"
};

var page1 = {
  title: "Main Page",
  subtitle:"Philly Food Landscape",
  note:"",
  content: "",
  Style_lst: ["red","orange", "blue"],
  legend_type: "a",
  filter: function(feature) {
    if(feature.properties.HPSS_ACCESS === null){
      return false;
    }
    else
      return true;
  },
  page_fun: function(){
    map.setView([40.000, -75.1090],11);
    $('#mybutton').remove();
    $('#intro').show();
    $('#summary').hide();
    $('.legend-labels-b').hide();
    $('.legend-labels-c').hide();
    $('.legend-labels-a').show();
    $('#content').text("");
  },
  myStyle: function(feature) {
    switch (feature.properties.HPSS_ACCESS) {
     case 'No Access': return {color: 'red'};
     case 'Moderate or High Access': return {color: 'blue'};
     case 'Low Access': return {color: 'orange'};
    }
  },
  eachFeatureFunction: function(layer) {
    layer.on('click', function (event) {
      map.fitBounds(layer.getBounds());
      $('#content').text("Current census tract has "+layer.feature.properties.HPSS_ACCESS);
      $('#content').show();
      $('#buttondiv2').html('<button id="mybutton">Close</button>')
      $('#mybutton').css({top:0, right:0, position:'absolute'})
      $('#mybutton').click(function() { closeButton(); })
    });
  }
};
var page2 = {
  title: "Page 2",
  subtitle:"Tracts with no access to high-produce supply stores",
  note:"",
  content: "",
  Style_lst: ["red","orange", "blue"],
  legend_type: "a",
  filter : function(feature) {
    if(feature.properties.HPSS_ACCESS === "No Access"){
      return true;
    }
    else
      return false;
  },
  page_fun: function(){
    map.setView([40.000, -75.1090],11);
    $('#mybutton').remove();
    $('#intro').hide();
    $('#summary').show();
    $('.legend-labels-b').hide();
    $('.legend-labels-c').hide();
    $('.legend-labels-a').show();
    $('#summary').text("There are "+Object.keys(featureGroup._layers).length+" areas that have no access to health food");
  },
  myStyle: function(feature) {
    switch (feature.properties.HPSS_ACCESS) {
     case 'No Access': return {color: 'red'};
     case 'Moderate or High Access': return {color: 'blue'};
     case 'Low Access': return {color: 'orange'};
    }
  },
  eachFeatureFunction: function(layer) {
    layer.on('click', function (event) {
      map.fitBounds(layer.getBounds());
      $('#content').text("Current census tract has "+layer.feature.properties.HPSS_ACCESS);
      showResults();
      $('#buttondiv2').html('<button id="mybutton">Close</button>')
      $('#mybutton').css({top:0, right:0, position:'absolute'})
      $('#mybutton').click(function() { closeButton(); })
    });
  }
};
var page3 = {
  title: "Page 3",
  subtitle:"Tracts with low access to high-produce supply stores",
  note:"",
  content: "",
  Style_lst: ["red","orange", "blue"],
  legend_type: "a",
  filter : function(feature) {
    if(feature.properties.HPSS_ACCESS === "Low Access"){
      return true;
    }
    else
      return false;
  },
  page_fun: function(){
    map.setView([40.000, -75.1090],11);
    $('#mybutton').remove();
    $('#intro').hide();
    $('#summary').show();
    $('.legend-labels-b').hide();
    $('.legend-labels-c').hide();
    $('.legend-labels-a').show();
    $('#content').text("");
    $('#summary').text("There are "+Object.keys(featureGroup._layers).length+" areas that have no access to health food");
  },
  myStyle: function(feature) {
    switch (feature.properties.HPSS_ACCESS) {
     case 'No Access': return {color: 'red'};
     case 'Moderate or High Access': return {color: 'blue'};
     case 'Low Access': return {color: 'orange'};
    }
  },
  eachFeatureFunction: function(layer) {
    layer.on('click', function (event) {
      map.fitBounds(layer.getBounds());
      $('#content').text("Current census tract has "+layer.feature.properties.HPSS_ACCESS);
      showResults();
      $('#buttondiv2').html('<button id="mybutton">Close</button>')
      $('#mybutton').css({top:0, right:0, position:'absolute'})
      $('#mybutton').click(function() { closeButton(); })
    });
  }
};
var page4 = {
  title: "Page 4",
  subtitle:"Total low-produce supply stores",
  note:"",
  content: "",
  Style_lst: ["red","orange","yellow","green", "blue"],
  legend_type: "c",
  filter : function(feature) {
    if(feature.properties.TOTAL_LPSS === null){
      return false;
    }
    else
      return true;
  },
  page_fun: function(){
    map.setView([40.000, -75.1090],11);
    $('#mybutton').remove();
    $('#intro').hide();
    $('#summary').hide();
    $('.legend-labels-a').hide();
    $('.legend-labels-b').hide();
    $('.legend-labels-c').show();
    $('#content').text("");
  },
  myStyle: function(feature) {
    if(feature.properties.TOTAL_LPSS>43){
      return {color: 'blue'};
    }
    else if(feature.properties.TOTAL_LPSS > 31){
      return {color: 'green'};
    }
    else if(feature.properties.TOTAL_LPSS > 23){
      return {color: 'yellow'};
    }
    else if(feature.properties.TOTAL_LPSS > 13){
      return {color: 'orange'};
    }
    else{
      return {color: 'red'};
    }
  },
  eachFeatureFunction: function(layer) {
    layer.on('click', function (event) {
      map.fitBounds(layer.getBounds());
      $('#content').text("Current census tract has "+layer.feature.properties.TOTAL_LPSS+" low-produce supply stores");
      showResults();
      $('#buttondiv2').html('<button id="mybutton">Close</button>')
      $('#mybutton').css({top:0, right:0, position:'absolute'})
      $('#mybutton').click(function() { closeButton(); })
    });
  }
};
var page5 = {
  title: "Page 5",
  subtitle:"Areas with high proverty",
  note:"(High poverty is defined as 20% or more of the block group being below the federal poverty level)",
  content: "",
  Style_lst: ["red", "blue"],
  legend_type: "b",
  filter : function(feature) {
    if(feature.properties.HIGH_POVERTY === null){
      return false;
    }
    else
      return true;
  },
  page_fun: function(){
    map.setView([40.000, -75.1090],11);
    $('#mybutton').remove();
    $('#intro').hide();
    $('#summary').hide();
    $('.legend-labels-a').hide();
    $('.legend-labels-c').hide();
    $('.legend-labels-b').show();
    $('#content').text("");
  },
  myStyle: function(feature) {
    switch (feature.properties.HIGH_POVERTY) {
     case 'Yes': return {color: 'red'};
     case 'No': return {color: 'blue'};
    }
  },
  eachFeatureFunction: function(layer) {
    layer.on('click', function (event) {
      map.fitBounds(layer.getBounds());
      var isPoor = proverty[layer.feature.properties.HIGH_POVERTY];
      $('#content').text(isPoor);
      showResults();
      $('#buttondiv2').html('<button id="mybutton">Close</button>')
      $('#mybutton').css({top:0, right:0, position:'absolute'})
      $('#mybutton').click(function() { closeButton(); })
    });
  }
};


var slides = [page1, page2, page3, page4, page5]

var currentPage = 0;

var nextPage = function(){
  tearDown();
  var nextPage = currentPage + 1;
  currentPage = nextPage;
  buildPage(slides[nextPage]);

}
var prevPage = function(){
  tearDown();
  var prevPage = currentPage - 1;
  currentPage = prevPage;
  buildPage(slides[prevPage]);

}

var buildPage = function(pageDefinition){
  featureGroup = L.geoJson(data, {
    style: pageDefinition.myStyle,
    filter: pageDefinition.filter
  }).addTo(map);
  featureGroup.eachLayer(pageDefinition.eachFeatureFunction);

  if(pageDefinition.page_fun=== undefined){
    thePagefun = function() {return true}
  } else{
    thePagefun = pageDefinition.page_fun
  }
  thePagefun();
  $('#title').text(pageDefinition.title);
  $('#subtitle').text(pageDefinition.subtitle);
  $('#note').text(pageDefinition.note);

  if(currentPage===0){
    $('#prev').prop("disabled",true)
  } else {
    $('#prev').prop("disabled",false)
  }

  if(currentPage===slides.length-1){
    $('#next').prop("disabled",true)
  } else {
    $('#next').prop("disabled",false)}
  
  for(i=0; i<pageDefinition.Style_lst.length; i++) {
    var str = "#"+pageDefinition.legend_type+"label"+String(i+1);
    $(str).css({backgroundColor:pageDefinition.Style_lst[i]});
}
}

var tearDown = function(){
  featureGroup.eachLayer(function(layer) {
    map.removeLayer(layer);
  });
}

var showResults = function() {
  $('#intro').hide();
  $('#content').show();
};

var closeButton = function() {
  map.setView([40.000, -75.1090],11);
  $('#mybutton').remove();
  $('#content').hide();
};

// begin
var dataset = "https://raw.githubusercontent.com/zenithchen/CPLN692Midterm/main/NeighborhoodFoodRetail.geojson";

$(document).ready(function() {
  $.ajax(dataset).done(function(json) {
    data = JSON.parse(json);
    console.log(data);

    buildPage(slides[currentPage]); 
  });
  $('#next').click(nextPage);
  $('#prev').click(prevPage);
});
