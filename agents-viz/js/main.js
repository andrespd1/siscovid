vega.scheme( 'siscovid', [ '#f98a4b', '#f64438', '#317372' ] );

var quarantine = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "height": 100,
  "width": 350,
  "data": {
    "url": "data/agents.csv"
  },
  "mark": "area",
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    },
    "y": {
      "field": "Cuarentena",
      "type": "quantitative",
      "format": ".2%",
      "scale": {
        "domain": [ 0, 1 ]
      },
      "axis": {
        "title": "% cuarentena",
        "format": ".0%"
      }
    },
    "tooltip": [
      {
        "field": "Fecha",
        "type": "temporal"
      },
      {
        "field": "Cuarentena",
        "type": "quantitative",
        "format": ".2%"
      }
    ]
  }
};

vegaEmbed( '#quarantine', quarantine, { actions: false } );

var generalSeries = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Casos graves, críticos y fallecidos a través del tiempo",
  "data": {
    "url": "data/agents2.csv"
  },
  "width": 580,
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
          "axis": {
            "title": "Tipo"
          }

        },
        "y": {
          "field": "value",
          "type": "quantitative",
          "format": ".2%",
          "scale": {
            "domain": [ 0, 0.004 ]
          },
          "axis": {
            "title": "Casos",
            "format": ".2%"
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
          "mark": "point"
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
            "format": ".2%"
          },
          {
            "field": "Críticos",
            "type": "quantitative",
            "format": ".2%"
          },
          {
            "field": "Fallecidos",
            "type": "quantitative",
            "format": ".2%"
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

vegaEmbed( '#general-series', generalSeries, { actions: false } );

var attackRate = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Tasa de ataque",
  "height": 85,
  "width": 290,
  "data": {
    "url": "data/agents.csv"
  },
  "mark": "line",
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    },
    "y": {
      "field": "R0",
      "type": "quantitative",
      "scale": {
        "domain": [ 0, 1 ]
      }
    },
    "tooltip": [
      {
        "field": "Fecha",
        "type": "temporal"
      },
      {
        "field": "R0",
        "type": "quantitative"
      }
    ]
  }
};

vegaEmbed( '#attack-rate', attackRate, { actions: false } );

var reproductionRate = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Tasa de reproducción efectiva",
  "height": 85,
  "width": 290,
  "data": {
    "url": "data/agents.csv"
  },
  "mark": "line",
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    },
    "y": {
      "field": "Rt",
      "type": "quantitative",
      "scale": {
        "domain": [ 0, 1 ]
      }
    },
    "tooltip": [
      {
        "field": "Fecha",
        "type": "temporal"
      },
      {
        "field": "Rt",
        "type": "quantitative"
      }
    ]
  }
};

vegaEmbed( '#reproducion-rate', reproductionRate, { actions: false } );

var localidaes = [ 'San Cristóbal',
 'Bosa',
 'Ciudad Bolívar',
 'Antonio Nariño',
 'Engativá',
 'Suba',
 'Usaquén',
 'Fontibón',
 'Usme',
 'Kennedy',
 'Tunjuelito',
 'Rafael Uribe Uribe',
 'Puente Aranda',
 'Chapinero',
 'Barrios Unidos',
 'Santa Fé',
 'Teusaquillo',
 'Los Mártires',
 'La Candelaria' ];

for ( var i = 0 ; i < localidaes.length ; i++ ) {
  
  var locSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": localidaes[ i ],
    "data": {
      "url": "data/agents-locs2.csv"
    },
    "width": 220,
    "height": 120,
    "transform": [
      {
        "filter": "datum.Localidad==='" + localidaes[ i ] + "'"
      }
    ],
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
            "axis": {
              "title": "Tipo"
            }
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "format": ".2%",
            "scale": {
              "domain": [ 0, 0.012 ]
            },
            "axis": {
              "title": "Casos",
              "format": ".2%"
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
            "mark": "point"
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
              "format": ".2%"
            },
            {
              "field": "Críticos",
              "type": "quantitative",
              "format": ".2%"
            },
            {
              "field": "Fallecidos",
              "type": "quantitative",
              "format": ".2%"
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

  vegaEmbed( ( '#loc-series-' + i ), locSeries, { actions: false } );

}

var locAttackRate = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Tasa de ataque por localdiad",
    "data": {
      "url": "data/agents-locs.csv"
    },
    "width": 800,
    "height": 300,
    "mark": "line",
    "encoding": {
      "x": {
        "field": "Fecha",
        "type": "temporal"
      },
      "y": {
        "field": "R0",
        "type": "quantitative"
      },
      "color": {
        "field": "Localidad",
        "type": "nominal",
        "scale": {
          "scheme": "category20"
        }
      },
      "tooltip": [
        {
          "field": "Fecha",
          "type": "temporal"
        },
        {
          "field": "R0",
          "type": "quantitative",
          "format": ".2f"
        },
        {
          "field": "Localidad",
          "type": "nominal"
      }
    ]
  }
};

vegaEmbed( ( '#loc-attack-rate' ), locAttackRate, { actions: false } );
