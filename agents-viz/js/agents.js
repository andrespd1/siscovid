vega.scheme( 'siscovid', [ '#f98a4b', '#f64438', '#317372' ] );

var quarantine = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "height": 50,
  "width": 270,
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
  "title": "Casos graves, críticos y fallecidos",
  "data": {
    "url": "data/agents2.csv"
  },
  "width": 660,
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
  "height": 105,
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
      },
      "axis": {
        "title": "Tasa de ataque",
        "format": ".0%"
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
        "format": ".2%"
      }
    ]
  }
};

vegaEmbed( '#attack-rate', attackRate, { actions: false } );

var reproductionRate = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Tasa de reproducción efectiva",
  "height": 105,
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
        "type": "quantitative",
        "format": ".2f"
      }
    ]
  }
};

vegaEmbed( '#reproducion-rate', reproductionRate, { actions: false } );

/* Localidades */

var localidaes = [ 
  {
    'id': 'loc-antonio-narino',
    'name': 'Antonio Nariño'
  },
  {
    'id': 'loc-barrios-unidos',
    'name': 'Barrios Unidos'
  },
  {
    'id': 'loc-bosa',
    'name': 'Bosa'
  },
  {
    'id': 'loc-chapinero',
    'name': 'Chapinero'
  },
  {
    'id': 'loc-ciudad-bolivar',
    'name': 'Ciudad Bolívar'
  },
  {
    'id': 'loc-engativa',
    'name': 'Engativá'
  },
  {
    'id': 'loc-fontibon',
    'name': 'Fontibón'
  },
  {
    'id': 'loc-kennedy',
    'name': 'Kennedy'
  },
  {
    'id': 'loc-la-candelaria',
    'name': 'La Candelaria'
  },
  {
    'id': 'loc-los-martires',
    'name': 'Los Mártires'
  },
  {
    'id': 'loc-puente-aranda',
    'name': 'Puente Aranda'
  },
  {
    'id': 'loc-rafael-uribe-uribe',
    'name': 'Rafael Uribe Uribe'
  },
  {
    'id': 'loc-san-cristobal',
    'name': 'San Cristóbal'
  },
  {
    'id': 'loc-santa-fe',
    'name': 'Santa Fé'
  },
  {
    'id': 'loc-suba',
    'name': 'Suba'
  },
  {
    'id': 'loc-teusaquillo',
    'name': 'Teusaquillo'
  },
  {
    'id': 'loc-tunjuelito',
    'name': 'Tunjuelito'
  },
  {
    'id': 'loc-usaquen',
    'name': 'Usaquén'
  },
  {
    'id': 'loc-usme',
    'name': 'Usme'
  }
];

var initLocs = [ 'loc-kennedy', 'loc-bosa', 'loc-rafael-uribe-uribe' ];

function draw_action_locs() {

  var filter = localidaes.filter( l => initLocs.includes( l[ 'id' ] ) )
                .map( l => "(datum.Localidad==='" + l[ 'name' ] + "')" ).join( ' || ' );

  var tooltips= [
    { "field": "Fecha", "type": "temporal" }
  ];

  localidaes.filter( l => initLocs.includes( l[ 'id' ] ) )
    .forEach( l => tooltips.push( {
              "field": l[ 'name' ],
              "type": "quantitative",
              "format": ".2%"
            } ) )


  var locSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Fallecidos por localidades",
    "data": {
      "url": "data/agents-locs2.csv"
    },
    "width": 360,
    "height": 200,
    "transform": [
      {
        "filter": "datum.variable==='Fallecidos'"
      },
      {
        "filter": filter
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
            "field": "Localidad",
            "type": "nominal",
            "scale": {
              "scheme": "dark2"
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
            "format": ".2%",
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
            "mark": "circle"
          }
        ]
      },
      {
        "transform": [
          {
            "pivot": "Localidad",
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
          "tooltip": tooltips
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

  vegaEmbed( ( '#loc-series' ), locSeries, { actions: false } );

  var locAttackRate = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Tasa de ataque por localidades",
    "data": {
      "url": "data/agents-locs.csv"
    },
    "width": 360,
    "height": 200,
    "transform": [
      {
        "filter": filter
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
            "field": "Localidad",
            "type": "nominal",
            "scale": {
              "scheme": "dark2"
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
            "field": "R0",
            "type": "quantitative",
            "scale": {
              "domain": [ 0, 1 ]
            },
            "axis": {
              "title": "Tasa de ataque",
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
        "transform": [
          {
            "pivot": "Localidad",
            "value": "R0",
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
          "tooltip": tooltips
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

  vegaEmbed( ( '#loc-attack-rate' ), locAttackRate, { actions: false } );

}

draw_action_locs();

$( '[id^=loc-]' ).change( function() {
  var id = $( this ).attr( 'id' );
  var checked = $( this ).prop( 'checked' );
  console.log( id + ': ' + checked );

  if( checked ) {
    if( initLocs.indexOf( id ) === -1 ) {
      initLocs.push( id )
    }
  } else {
    const index = initLocs.indexOf( id );
    if( index > -1 ) {
      initLocs.splice( index, 1 );
    }
  }

  console.log( initLocs );
  draw_action_locs();

} );

for ( var i = 0 ; i < localidaes.length ; i++ ) {
  
  var locSeriesN = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": localidaes[ i ][ 'name' ],
    "data": {
      "url": "data/agents-locs2.csv"
    },
    "width": 270,
    "height": 120,
    "transform": [
      {
        "filter": "datum.Localidad==='" + localidaes[ i ][ 'name' ] + "'"
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

  vegaEmbed( ( '#loc-series-' + i ), locSeriesN, { actions: false } );

}

/* Ages */

var ages = [ 
  {
    'id': 'age-0-4',
    'name': '0-4'
  },
  {
    'id': 'age-5-19',
    'name': '5-19'
  },
  {
    'id': 'age-20-39',
    'name': '20-39'
  },
  {
    'id': 'age-40-59',
    'name': '40-59'
  },
  {
    'id': 'age-60',
    'name': '>60'
  }
];

var initAges = [ 'age-40-59', 'age-60' ];

function draw_action_ages() {

  var filter = ages.filter( l => initAges.includes( l[ 'id' ] ) )
                .map( l => "(datum['Grupo de edad']==='" + l[ 'name' ] + "')" ).join( ' || ' );

  var tooltips= [
    { "field": "Fecha", "type": "temporal" }
  ];

  ages.filter( l => initAges.includes( l[ 'id' ] ) )
    .forEach( l => tooltips.push( {
              "field": l[ 'name' ],
              "type": "quantitative",
              "format": ".2%"
            } ) )


  var ageSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Fallecidos por grupos de edad",
    "data": {
      "url": "data/agents-ages2.csv"
    },
    "width": 360,
    "height": 200,
    "transform": [
      {
        "filter": "datum.variable==='Fallecidos'"
      },
      {
        "filter": filter
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
            "field": "Grupo de edad",
            "type": "nominal",
            "scale": {
              "scheme": "dark2"
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
            "format": ".2%",
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
            "mark": "circle"
          }
        ]
      },
      {
        "transform": [
          {
            "pivot": "Grupo de edad",
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
          "tooltip": tooltips
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

  vegaEmbed( ( '#age-series' ), ageSeries, { actions: false } );

}

draw_action_ages();

$( '[id^=age-]' ).change( function() {
  var id = $( this ).attr( 'id' );
  var checked = $( this ).prop( 'checked' );
  console.log( id + ': ' + checked );

  if( checked ) {
    if( initAges.indexOf( id ) === -1 ) {
      initAges.push( id )
    }
  } else {
    const index = initAges.indexOf( id );
    if( index > -1 ) {
      initAges.splice( index, 1 );
    }
  }

  console.log( initAges );
  draw_action_ages();

} );

for ( var i = 0 ; i < ages.length ; i++ ) {
  
  var ageSeriesN = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": ages[ i ][ 'name' ],
    "data": {
      "url": "data/agents-ages2.csv"
    },
    "width": 270,
    "height": 120,
    "transform": [
      {
        "filter": "datum['Grupo de edad']==='" + ages[ i ][ 'name' ] + "'"
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
            "format": ".2%",
            "scale": {
              "domain": [ 0, 0.015 ]
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

  vegaEmbed( ( '#age-series-' + i ), ageSeriesN, { actions: false } );

}