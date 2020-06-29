var urlParams = new URLSearchParams( window.location.search );
var city = urlParams.get( 'city' );
console.log( 'City: ', city );

var projection = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Proyección de fallecidos (95% CIs)",
  "width": 480,
  "height": 250,
  "encoding": {
    "x": {
      "field": "date",
      "type": "temporal",
      "axis": {
        "title": "Fecha"
      }
    }
  },
  "layer": [
    {
      "data": {
        "url": "./data/" + city + "-meta.csv"
      },
      "mark": {
        "type": "errorband",
        "extent": "ci"
      },
      "encoding": {
        "y": {
          "field": "fallecidos",
          "type": "quantitative",
          "title": "Casos",
          "axis": {
            "format": ".0f"
          }
        },
        "color": {
          "value": "#f64438"
        }
      }
    },
    {
      "data": {
        "url": "./data/" + city + "-meta.csv"
      },
      "mark": "line",
      "encoding": {
        "y": {
          "aggregate": "mean",
          "field": "fallecidos",
          "type": "quantitative",
          "axis": {
            "title": "Casos",
            "format": ".0f"
          }
        },
        "color": {
          "value": "#f64438"
        }
      }
    },
    {
      "data": {
        "url": "./data/" + city + "-deaths.csv"
      },
      "mark": {
        "type": "point",
        "size": 5,
        "tooltip": true
      },
      "encoding": {
        "y": {
          "field": "Fallecidos_reales",
          "type": "quantitative",
          "axis": {
            "title": "Casos",
            "format": ".0f"
          }
        },
        "color": {
          "value": "#317372"
        }
      }
    }
  ]
};

vegaEmbed( '#projection', projection, { actions: false } );

var betaValues = {
  'barranquilla': [
    { "beta": "1", "value": 1.3612 },
    { "beta": "2", "value": 0.4631 },
    { "beta": "3", "value": 0.1270 },
    { "beta": "4", "value": 0.4725 },
    { "beta": "5", "value": 0.7898 },
    { "beta": "6", "value": 0.0463 },
    { "beta": "7", "value": 1.0597 }
  ],
  'bogota': [
    { "beta": "1", "value": 2.2188 },
    { "beta": "2", "value": 0.0024 },
    { "beta": "3", "value": 0.1461 },
    { "beta": "4", "value": 0.1817 },
    { "beta": "5", "value": 0.5723 },
    { "beta": "6", "value": 0.1115 },
    { "beta": "7", "value": 0.7678 }
  ],
  'cali': [
    { "beta": "1", "value": 1.3561 },
    { "beta": "2", "value": 0.0045 },
    { "beta": "3", "value": 0.0410 },
    { "beta": "4", "value": 0.5246 },
    { "beta": "5", "value": 0.0998 },
    { "beta": "6", "value": 0.1281 },
    { "beta": "7", "value": 0.4224 }
  ]
};

var phiValues = {
  'barranquilla': 0.6138,
  'bogota': 0.4362,
  'cali': 0.0274
}

var betas = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Tasa de contacto efectiva β (π = " + phiValues[ city ] + ")",
  "width": 480,
  "height": 250,
  "data": {
    "values": betaValues[ city ]
  },
  "mark": {
    "type": "line",
    "tooltip": true
  },
  "encoding": {
    "x": {
      "field": "beta", 
      "type": "ordinal",
      "title": "β",
      "axis": {
        "labelAngle": 0
      }
    },
    "y": {
      "field": "value",
      "type": "quantitative",
      "title": "Valor"
    }
  }
};

vegaEmbed( '#betas', betas, { actions: false } );