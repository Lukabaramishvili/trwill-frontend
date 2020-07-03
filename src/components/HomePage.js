import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class HomePage extends Component {

componentDidMount() {
  const chart = am4core.create("chartdiv", am4maps.MapChart);

  chart.geodata = am4geodata_worldLow;

  // Set projection
  chart.projection = new am4maps.projections.NaturalEarth1();

  // Create map polygon series
  const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#00BFFF");

  // Create hover state and set alternative fill color
  const hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#367B25");

  // Remove Antarctica
  polygonSeries.exclude = ["AQ"];

  polygonSeries.data = [{
    "id": "US",
    "name": "United States",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "ES",
    "name": "Spain",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "GR",
    "name": "Germany",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "PT",
    "name": "Portugal",
    "fill": am4core.color("#5C5CFF")
  }, {
    "id": "CZ",
    "name": "Czech Republic",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "IS",
    "name": "Iceland",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "GB",
    "name": "United Kingdom",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "NL",
    "name": "Netherlands",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "GE",
    "name": "Georgia",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "BE",
    "name": "Belgium",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "DK",
    "name": "Denmark",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "GR",
    "name": "Greece",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "HU",
    "name": "Hungary",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "IT",
    "name": "Italy",
    "fill": am4core.color("#F05C5C")
  }, {
    "id": "FR",
    "name": "France",
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
      <div className="ui landing-image fluid container">
      <h1 className="ui  header">
         Welcome to Subscription Based Travel
      </h1>
      <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>

      <div className="pusher">
          <div className="ui fixed text ">
          </div>
          <div className="ui vertical segment center aligned">

          <div >
          <div className="ui vertical stripe segment">
            <div className="ui text container box">
              <h1>Travel multiple times per year for just $50/month</h1>
              <Link to="/destinations" >
              <div className="ui huge primary button">See Destinations<i className="right arrow icon"></i></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">
            <div className="center aligned row">
              <div className="column box">
              <h1><Icon name="check" size="big"/></h1>
              <h3> CHOOSE YOUR SUBSCRIPTION</h3>
              <p>Low cost monthly payments makes travel affordable</p>
            </div>
              <div className="column box">
              <h1><Icon name="pin" size="big"/></h1>
              <h3>PICK DESTINATION</h3>
              <p>Our destination packages include Hotel and round trip airplain tickets</p>
            </div>
              <div className="column box">
              <h1><Icon name="plane" size="big"/></h1>
              <h3>TRAVEL</h3>
              <p>Book a trip every 4 month</p>
            </div>
            </div>
            </div>
          </div>
    </div>
        </div>
        </div>
    </>

    );
  }
}

function mapStateToProps(state){

  return {
    destinations: state.destinations
  }
}

export default connect(mapStateToProps)(HomePage);
