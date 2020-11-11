var urlParams = new URLSearchParams( window.location.search );
var city = urlParams.get( 'city' );
console.log( 'City: ', city );

var config = {
  "axis": { 
    "labelFont": "oswald",
    "titleFont": "oswald",
    "labelFontSize": 10
  },
  "title": {
    "fontSize": 15,
    "font": "oswald"
  }
};

var series = [
  {
    'id': 'actual',
    'color': '#E41A1C',
    'name': 'Actual',
    'active': true
  },
  {
    'id': 'apertura-100',
    'color': '#377EB8',
    'name': 'Apertura 100%',
    'active': true
  },
  {
    'id': 'apertura-30',
    'color': '#4DAF4A',
    'name': 'Apertura 30%',
    'active': true
  },
  {
    'id': 'apertura-50',
    'color': '#984EA3',
    'name': 'Apertura 50%',
    'active': true
  },
  {
    'id': 'no-cuarentena',
    'color': '#FA7F01',
    'name': 'Sin cuarentena',
    'active': false
  }
];

function draw() {

  let subseries = series.filter( s => s.active );
  
  let tx_filter = subseries.map( s => "datum.variable==='" + s.name + "'" )
                        .join( ' || ' );

  var tooltip = [
    {
      "field": "Fecha",
      "type": "temporal"
    }
  ];
  
  subseries.map( s => {
    tooltip.push( {
      "field": s.name,
      "type": "quantitative",
      "format": ".3%"
    } );
  } );

  vega.scheme( 'set1', subseries.map( s => s.color ) );

  var ucisSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Evolución de críticos (UCIs)",
    "width": 580,
    "height": 230,
    "data": {
      "url": "data/cali-ucis.csv"
    },
    "transform": [
      {
        "filter": tx_filter
      }
    ],
    "encoding": {
      "x": {
        "field": "Fecha",
        "type": "temporal"
      }
    },
    "resolve": {
      "scale": {
        "color": "independent"
      }
    },
    "layer": [
      {
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "axis": {
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
            "mark": "circle"
          }
        ]
      },
      {
        "mark": {
          "type": "errorband",
          "extent": "ci"
        },
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null,
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "title": "Casos",
          }
        }
      },
      {
        "transform": [
          {
            "pivot": "variable",
            "value": "value",
            "groupby": [ "Fecha" ],
            "op": "mean"
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
          "tooltip": tooltip
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
    ],
    "config": config
  };

  vegaEmbed( '#ucis-series', ucisSeries, { actions: false } );

  var deathsSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Evolución de fallecidos",
    "width": 580,
    "height": 230,
    "data": {
      "url": "data/cali-deaths.csv"
    },
    "transform": [
      {
        "filter": tx_filter
      }
    ],
    "encoding": {
      "x": {
        "field": "Fecha",
        "type": "temporal"
      }
    },
    "resolve": {
      "scale": {
        "color": "independent"
      }
    },
    "layer": [
      {
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "axis": {
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
            "mark": "circle"
          }
        ]
      },
      {
        "mark": {
          "type": "errorband",
          "extent": "ci"
        },
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null,
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "title": "Casos",
          }
        }
      },
      {
        "transform": [
          {
            "pivot": "variable",
            "value": "value",
            "groupby": [ "Fecha" ],
            "op": "mean"
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
          "tooltip": tooltip
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
    ],
    "config": config
  };

  vegaEmbed( '#deaths-series', deathsSeries, { actions: false } );

  var quarantineSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Porcentaje de cuarentena",
    "width": 395,
    "height": 130,
    "data": {
      "url": "data/cali-quarantine.csv"
    },
    "transform": [
      {
        "filter": tx_filter
      }
    ],
    "encoding": {
      "x": {
        "field": "Fecha",
        "type": "temporal"
      }
    },
    "resolve": {
      "scale": {
        "color": "independent"
      }
    },
    "layer": [
      {
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "axis": {
              "format": ".0%"
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
        "mark": {
          "type": "errorband",
          "extent": "ci"
        },
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null,
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "title": "%",
          }
        }
      },
      {
        "transform": [
          {
            "pivot": "variable",
            "value": "value",
            "groupby": [ "Fecha" ],
            "op": "mean"
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
          "tooltip": tooltip
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
    ],
    "config": config
  };

  vegaEmbed( '#quarantine-series', quarantineSeries, { actions: false } );

  var r0series = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Tasa de ataque",
    "width": 395,
    "height": 130,
    "data": {
      "url": "data/cali-r0.csv"
    },
    "transform": [
      {
        "filter": tx_filter
      }
    ],
    "encoding": {
      "x": {
        "field": "Fecha",
        "type": "temporal"
      }
    },
    "resolve": {
      "scale": {
        "color": "independent"
      }
    },
    "layer": [
      {
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "axis": {
              "format": ".0%"
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
        "mark": {
          "type": "errorband",
          "extent": "ci"
        },
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null,
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "title": "R0",
          }
        }
      },
      {
        "transform": [
          {
            "pivot": "variable",
            "value": "value",
            "groupby": [ "Fecha" ],
            "op": "mean"
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
          "tooltip": tooltip
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
    ],
    "config": config
  };

  vegaEmbed( '#r0-series', r0series, { actions: false } );

  var rtSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Tasa de reproducción efectiva",
    "width": 395,
    "height": 130,
    "data": {
      "url": "data/cali-rt.csv"
    },
    "transform": [
      {
        "filter": tx_filter
      }
    ],
    "encoding": {
      "x": {
        "field": "Fecha",
        "type": "temporal"
      }
    },
    "resolve": {
      "scale": {
        "color": "independent"
      }
    },
    "layer": [
      {
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "axis": {
              "format": ".0%"
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
        "mark": {
          "type": "errorband",
          "extent": "ci"
        },
        "encoding": {
          "color": {
            "field": "variable",
            "type": "nominal",
            "scale": {
              "scheme": "set1"
            },
            "legend": null,
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "title": "Rt",
          }
        }
      },
      {
        "transform": [
          {
            "pivot": "variable",
            "value": "value",
            "groupby": [ "Fecha" ],
            "op": "mean"
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
          "tooltip": tooltip
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
    ],
    "config": config
  };

  vegaEmbed( '#rt-series', rtSeries, { actions: false } );

}



draw();

d3.selectAll( '.square' )
  .on( 'click', function() {
    
    var element = d3.select( this );
    
    element
      .classed( 'unselected', ( !element.classed( 'unselected' ) ) ? true : false );

    series.forEach( s => {
      if ( s.id === element.attr( 'id' ) )
        if ( s.active ) {
          s.active = false;
        } else {
          s.active = true;
        }
    } );

    draw();

  } );
  