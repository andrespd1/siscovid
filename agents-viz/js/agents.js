var urlParams = new URLSearchParams( window.location.search );
var city = urlParams.get( 'city' );
console.log( 'City: ', city );

vega.scheme( 'siscovid', [ '#f98a4b', '#f64438', '#317372' ] );

/* Scenaries */

var quarantine = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "height": 50,
  "width": 270,
  "data": {
    "url": "data/" + city + "-agents.csv"
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

/* Indicators and general series */

var indicators = {
  'bogota': {
    'serious': 0.40,
    'criticals': 0.08,
    'deaths': 0.12
  },
  'cartagena': {
    'serious': 0.16,
    'criticals': 0.02,
    'deaths': 0.01
  }
};

Object.keys( indicators[ city ] )
  .map( i => {
    $( '#ind-' + i ).text( indicators[ city ][ i ] + '%' );
  } );

var generalSeries = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Casos graves, críticos y fallecidos",
  "data": {
    "url": "data/" + city + "-agents2.csv"
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
            "symbolStrokeWidth": 6,
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
    "url": "data/" + city + "-agents.csv"
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
    "url": "data/" + city + "-agents.csv"
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

var localidaes = {
  'bogota': [ 
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
  ],
  'cartagena': [
    {
      'id': 'loc-virgen-turistica',
      'name': 'De la virgen y turistica'
    },
    {
      'id': 'loc-industrial-bahia',
      'name': 'Industrial de la bahia'
    },
    {
      'id': 'loc-historica-caribe',
      'name': 'Historica y del caribe norte'
    }
  ]
};

var initLocs = {
  'bogota': [ 'loc-kennedy', 'loc-bosa', 'loc-rafael-uribe-uribe' ],
  'cartagena': [ 'loc-virgen-turistica', 'loc-industrial-bahia', 'loc-historica-caribe' ]
};

var locControls = $( '#loc-controls' );
for ( var i = 0 ; i < localidaes[ city ].length ; i++ ) {
  var loc = localidaes[ city ][ i ];
  
  var checked = '';
  if( initLocs[ city ].indexOf( loc[ 'id' ] ) !== -1 ) {
    checked = 'checked';
  }

  locControls.append( '<div class="form-check">' +
            '<input class="form-check-input" type="checkbox" value="" id="' + loc[ 'id' ] + '" ' + checked + '>' +
            '<label class="form-check-label" for="' + loc[ 'id' ] + '">' + loc[ 'name' ] + '</label>' +
          '</div>' );

}

function draw_action_locs() {

  var filter = localidaes[ city ].filter( l => initLocs[ city ].includes( l[ 'id' ] ) )
                .map( l => "(datum.Localidad==='" + l[ 'name' ] + "')" ).join( ' || ' );

  var tooltips= [
    { "field": "Fecha", "type": "temporal" }
  ];

  localidaes[ city ].filter( l => initLocs[ city ].includes( l[ 'id' ] ) )
    .forEach( l => tooltips.push( {
              "field": l[ 'name' ],
              "type": "quantitative",
              "format": ".2%"
            } ) )


  var locSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Fallecidos por localidades",
    "data": {
      "url": "data/" + city + "-agents-locs2.csv"
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
              "symbolStrokeWidth": 6,
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
      "url": "data/" + city + "-agents-locs.csv"
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
              "symbolStrokeWidth": 6,
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
    if( initLocs[ city ].indexOf( id ) === -1 ) {
      initLocs[ city ].push( id )
    }
  } else {
    const index = initLocs[ city ].indexOf( id );
    if( index > -1 ) {
      initLocs[ city ].splice( index, 1 );
    }
  }

  console.log( initLocs[ city ] );
  draw_action_locs();

} );

for ( var i = 0 ; i < localidaes[ city ].length ; i++ ) {
  
  var locSeriesN = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": localidaes[ city ][ i ][ 'name' ],
    "data": {
      "url": "data/" + city + "-agents-locs2.csv"
    },
    "width": 270,
    "height": 120,
    "transform": [
      {
        "filter": "datum.Localidad==='" + localidaes[ city ][ i ][ 'name' ] + "'"
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
              "symbolStrokeWidth": 6,
              "symbolType": "stroke"
            }
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "format": ".2%",
            "scale": {
              "domain": [ 0, ( city == 'bogota' ) ? 0.012 : 0.003 ]
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

var ages = {
  'bogota': [ 
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
  ],
  'cartagena': [ 
    {
      'id': 'age-0-9',
      'name': '0-9'
    },
    {
      'id': 'age-10-19',
      'name': '10-19'
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
  ]
};

var initAges = {
 'bogota': [ 'age-40-59', 'age-60' ],
 'cartagena': [ 'age-40-59', 'age-60' ]
};

var ageControls = $( '#age-controls' );
for ( var i = 0 ; i < ages[ city ].length ; i++ ) {
  var age = ages[ city ][ i ];
  
  var checked = '';
  if( initAges[ city ].indexOf( age[ 'id' ] ) !== -1 ) {
    checked = 'checked';
  }

  ageControls.append( '<div class="form-check">' +
            '<input class="form-check-input" type="checkbox" value="" id="' + age[ 'id' ] + '" ' + checked + '>' +
            '<label class="form-check-label" for="' + age[ 'id' ] + '">' + age[ 'name' ] + '</label>' +
          '</div>' );

}

function draw_action_ages() {

  var filter = ages[ city ].filter( l => initAges[ city ].includes( l[ 'id' ] ) )
                .map( l => "(datum['Grupo de edad']==='" + l[ 'name' ] + "')" ).join( ' || ' );

  var tooltips= [
    { "field": "Fecha", "type": "temporal" }
  ];

  ages[ city ].filter( l => initAges[ city ].includes( l[ 'id' ] ) )
    .forEach( l => tooltips.push( {
              "field": l[ 'name' ],
              "type": "quantitative",
              "format": ".2%"
            } ) )


  var ageSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Fallecidos por grupos de edad",
    "data": {
      "url": "data/" + city + "-agents-ages2.csv"
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
              "symbolStrokeWidth": 6,
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
    if( initAges[ city ].indexOf( id ) === -1 ) {
      initAges[ city ].push( id )
    }
  } else {
    const index = initAges[ city ].indexOf( id );
    if( index > -1 ) {
      initAges[ city ].splice( index, 1 );
    }
  }

  console.log( initAges[ city ] );
  draw_action_ages();

} );

for ( var i = 0 ; i < ages[ city ].length ; i++ ) {
  
  var ageSeriesN = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": ages[ city ][ i ][ 'name' ],
    "data": {
      "url": "data/" + city + "-agents-ages2.csv"
    },
    "width": 270,
    "height": 120,
    "transform": [
      {
        "filter": "datum['Grupo de edad']==='" + ages[ city ][ i ][ 'name' ] + "'"
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
              "symbolStrokeWidth": 6,
              "symbolType": "stroke"
            }
          },
          "y": {
            "field": "value",
            "type": "quantitative",
            "format": ".2%",
            "scale": {
              "domain": [ 0, ( city == 'bogota' ) ? 0.015 : 0.0045 ]
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