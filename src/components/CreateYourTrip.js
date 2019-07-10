import React, { Component, Fragment } from 'react';
import { Card, Segment, Icon, Comment, CommentGroup, Form, Grid, Header } from 'semantic-ui-react'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class CreateYourTrip extends Component {



  componentDidMount() {
  var chart = am4core.create("chartdiv", am4maps.MapChart);

chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.NaturalEarth1();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#00BFFF");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

// Remove Antarctica
polygonSeries.exclude = ["AQ"];

polygonSeries.data = [{
  "id": "US",
  "name": "United States",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "ES",
  "name": "Spain",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "GR",
  "name": "Germany",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "PT",
  "name": "Portugal",
  "value": 100,
  "fill": am4core.color("#5C5CFF")
}, {
  "id": "CZ",
  "name": "Czech Republic",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "IS",
  "name": "Iceland",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "GB",
  "name": "United Kingdom",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "NL",
  "name": "Netherlands",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "GE",
  "name": "Georgia",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "BE",
  "name": "Belgium",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "DK",
  "name": "Denmark",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "GR",
  "name": "Greece",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "HU",
  "name": "Hungary",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "IT",
  "name": "Italy",
  "value": 100,
  "fill": am4core.color("#F05C5C")
}, {
  "id": "FR",
  "name": "France",
  "value": 50,
  "fill": am4core.color("#5C5CFF")
}];

polygonTemplate.propertyFields.fill = "fill";
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }


  render() {
    return (
      <>
    <Header>Welcome</Header>
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </>
    );
  }

}

export default CreateYourTrip;
