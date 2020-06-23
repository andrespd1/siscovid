var metaSeries = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Casos graves, críticos y fallecidos",
  "data": {
    "url": "data/meta.csv"
  },
  "transform": [
    {
      "filter": "(datum.variable!=='Fallecidos (reales)')"
    }
  ],
  "width": 675,
  "height": 250,
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    }
  },
  "layer": [
    {
      "encoding": {
        "color": {
          "field": "variable",
          "type": "nominal",
          "scale": {
            "scheme": "siscovid"
          },
          "legend": {
            "orient": "top",
            "title": null,
            "padding": 10,
            "offset": 5,
            "symbolType": "stroke"
          }
        },
        "y": {
          "field": "value",
          "type": "quantitative",
          "format": ".0f",
          "axis": {
            "title": "Casos",
            "format": ".0f"
          }
        }
      },
      "layer": [
        {
          "mark": "line"
        },
        {
          "transform": [
            {
              "filter": {
                "selection": "hover"
              }
            }
          ], 
          "mark": "circle"
        }
      ]
    },
    {
      "transform": [
        {
          "pivot": "variable",
          "value": "value",
          "groupby": [ "Fecha" ]
        }
      ],
      "mark": "rule",
      "encoding": {
        "opacity": {
          "condition": {
            "value": 0.3,
            "selection": "hover"
          },
          "value": 0
        },
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Graves",
            "type": "quantitative",
            "format": ".0f"
          },
          {
            "field": "Críticos",
            "type": "quantitative",
            "format": ".0f"
          },
          {
            "field": "Fallecidos",
            "type": "quantitative",
            "format": ".0f"
          }
        ]
      },
      "selection": {
        "hover": {
          "type": "single",
          "fields": [ "Fecha" ],
          "nearest": true,
          "on": "mouseover",
          "empty": "none",
          "clear": "mouseout"
        }
      }
    }
  ]
};

vegaEmbed( '#meta-series', metaSeries, { actions: false } );

var metaCompareSeries = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Fallecidos reales y proyectados",
  "data": {
    "url": "data/meta.csv"
  },
  "transform": [
    {
      "filter": "(datum.variable!=='Críticos') && (datum.variable!=='Graves')"
    }
  ],
  "width": 290,
  "height": 250,
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    }
  },
  "layer": [
    {
      "encoding": {
        "strokeDash": {
          "field": "variable",
          "type": "nominal",
          "scale": {
            "scheme": "siscovid"
          },
          "legend": {
            "symbolType": "stroke",
            "orient": "top",
            "title": null,
            "padding": 10,
            "offset": 5,
            "symbolDash": [ 3, 3 ]
          }
        },
        "y": {
          "field": "value",
          "type": "quantitative",
          "format": ".0f",
          "axis": {
            "title": "Casos",
            "format": ".0f"
          }
        },
        "color": {
          "value": "#f64438"
        }
      },
      "layer": [
        {
          "mark": "line"
        },
        {
          "transform": [
            {
              "filter": {
                "selection": "hover"
              }
            }
          ], 
          "mark": "circle"
        }
      ]
    },
    {
      "transform": [
        {
          "pivot": "variable",
          "value": "value",
          "groupby": [ "Fecha" ]
        }
      ],
      "mark": "rule",
      "encoding": {
        "opacity": {
          "condition": {
            "value": 0.3,
            "selection": "hover"
          },
          "value": 0
        },
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Fallecidos",
            "type": "quantitative",
            "format": ".0f"
          },
          {
            "field": "Fallecidos (reales)",
            "type": "quantitative",
            "format": ".0f"
          }
        ]
      },
      "selection": {
        "hover": {
          "type": "single",
          "fields": [ "Fecha" ],
          "nearest": true,
          "on": "mouseover",
          "empty": "none",
          "clear": "mouseout"
        }
      }
    }
  ]
};

vegaEmbed( '#meta-compare-series', metaCompareSeries, { actions: false } );