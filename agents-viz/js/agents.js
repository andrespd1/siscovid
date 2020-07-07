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
    "url": "data/" + city + "-agents-multi.csv"
  },
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    }
  },
  "layer": [
    {
      "mark": "rule",
      "encoding": {
        "color": {
          "value": "#c0c0c0" 
        },
        "opacity": {
          "condition": {
            "value": 1,
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
            "field": "Cuarentena",
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
    },
    {
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
      ],
      "encoding": {
        "y": {
          "aggregate": "mean",
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
        }
      }
    }
  ]
};

vegaEmbed( '#quarantine', quarantine, { actions: false } );

/* Indicators and general series */

d3.csv( 'data/' + city + '-agents2-multi.csv' )
  .then( function( data ) {

    var grouped_data = d3.nest()
      .key( d => d[ 'variable' ]  )
      .key( d => d[ 'Fecha' ]  )
      .rollup( function( v ) { return d3.mean( v, function( d ) { return +d[ 'value' ]; } ); } )
      .entries( data );

    grouped_data.map( s => {
        return { 
          'serie': s[ 'key' ],
          'value': d3.format( '.3%' )( d3.max( s[ 'values' ].map( v => v[ 'value' ] ) ) )
        };
      } )
      .map( i => {
        $( '#ind-' + i[ 'serie' ] ).text( i[ 'value' ] );
      } );



  } )
  .catch( function( error ) {
    console.log( 'Error loading data' );
  } );

var generalSeries = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Casos graves, críticos y fallecidos",
  "data": {
    "url": "data/" + city + "-agents2-multi.csv"
  },
  "width": 660,
  "height": 250,
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
            "scheme": "siscovid"
          },
          "legend": {
            "orient": "top",
            "title": null,
            "padding": 10,
            "offset": 5,
            "symbolStrokeWidth": 6,
            "symbolType": "stroke",
            "symbolOpacity": 1
          }
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
            "scheme": "siscovid"
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
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Graves",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Críticos",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Fallecidos",
            "type": "quantitative",
            "format": ".3%"
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
    "url": "data/" + city + "-agents-multi.csv"
  },
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    }
  },
  "layer": [
    {
      "mark": "rule",
      "encoding": {
        "color": {
          "value": "#c0c0c0" 
        },
        "opacity": {
          "condition": {
            "value": 1,
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
            "aggregate": "mean",
            "field": "R0",
            "type": "quantitative",
            "title": "R0",
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
    },
    {
      "mark": {
        "type": "errorband",
        "extent": "ci"
      },
      "encoding": {
        "y": {
          "field": "R0",
          "type": "quantitative"
        }
      }
    },
    {
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
      ],
      "encoding": {
        "y": {
          "aggregate": "mean",
          "field": "R0",
          "type": "quantitative",
          "format": ".2%",
          "title": "R0",
          "axis": {
            "format": ".0%"
          }
        }
      }
    }
  ]
};

vegaEmbed( '#attack-rate', attackRate, { actions: false } );

var reproductionRate = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": "Tasa de reproducción efectiva",
  "height": 105,
  "width": 290,
  "data": {
    "url": "data/" + city + "-agents-multi.csv"
  },
  "encoding": {
    "x": {
      "field": "Fecha",
      "type": "temporal"
    }
  },
  "layer": [
    {
      "mark": "rule",
      "encoding": {
        "color": {
          "value": "#c0c0c0" 
        },
        "opacity": {
          "condition": {
            "value": 1,
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
            "aggregate": "mean",
            "field": "Rt",
            "type": "quantitative",
            "title": "Rt",
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
    },
    {
      "mark": {
        "type": "errorband",
        "extent": "ci"
      },
      "encoding": {
        "y": {
          "field": "Rt",
          "type": "quantitative"
        }
      }
    },
    {
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
      ],
      "encoding": {
        "y": {
          "aggregate": "mean",
          "field": "Rt",
          "type": "quantitative",
          "format": ".2%",
          "axis": {
            "title": "Rt",
            "format": ".0%"
          }
        }
      }
    }
  ]
};

vegaEmbed( '#reproducion-rate', reproductionRate, { actions: false } );

/* Localidades */

var localidaes = {
  'barranquilla': [
    {
      'id': 'loc-sur-occidente',
      'name': 'SUR OCCIDENTE'
    },
    {
      'id': 'loc-rio-mar',
      'name': 'RIO MAR'
    },
    {
      'id': 'loc-centro-historico',
      'name': 'CENTRO HISTORICO'
    },
    {
      'id': 'loc-metropolitana',
      'name': 'METROPOLITANA'
    },
    {
      'id': 'loc-sur-oriente',
      'name': 'SUR ORIENTE'
    }
  ],
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
  'barranquilla': [ 'loc-metropolitana', 'loc-sur-oriente' ],
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

  var tooltips = [
    { "field": "Fecha", "type": "temporal" }
  ];

  localidaes[ city ].filter( l => initLocs[ city ].includes( l[ 'id' ] ) )
    .forEach( l => tooltips.push( {
              "field": l[ 'name' ],
              "type": "quantitative",
              "format": ".3%"
            } ) )


  var locSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Fallecidos por localidades",
    "data": {
      "url": "data/" + city + "-agents2-locs-multi.csv"
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
    "resolve": {
      "scale": {
        "color": "independent"
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
              "symbolType": "stroke",
              "symbolOpacity": 1
            }
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
            "field": "Localidad",
            "type": "nominal",
            "scale": {
              "scheme": "dark2"
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
            "pivot": "Localidad",
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
      "url": "data/" + city + "-agents-locs-multi.csv"
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
    "resolve": {
      "scale": {
        "color": "independent"
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
              "symbolType": "stroke",
              "symbolOpacity": 1
            }
          },
          "y": {
            "aggregate": "mean",
            "field": "R0",
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
            "field": "Localidad",
            "type": "nominal",
            "scale": {
              "scheme": "dark2"
            },
            "legend": null
          },
          "y": {
            "field": "R0",
            "type": "quantitative",
            "title": "R0",
          }
        }
      },
      {
        "transform": [
          {
            "pivot": "Localidad",
            "value": "R0",
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
      "url": "data/" + city + "-agents2-locs-multi.csv"
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
              "scheme": "siscovid"
            },
            "legend": {
              "orient": "top",
              "title": null,
              "padding": 10,
              "offset": 5,
              "symbolStrokeWidth": 6,
              "symbolType": "stroke",
              "symbolOpacity": 1
            }
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "scale": {
              "domain": [ 0, ( city == 'bogota' ) ? 0.0042 : ( city == 'barranquilla' ) ? 0.0031 : 0.003 ]
            },
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
              "scheme": "siscovid"
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
          "tooltip": [
            {
              "field": "Fecha",
              "type": "temporal"
            },
            {
              "field": "Graves",
              "type": "quantitative",
              "format": ".3%"
            },
            {
              "field": "Críticos",
              "type": "quantitative",
              "format": ".3%"
            },
            {
              "field": "Fallecidos",
              "type": "quantitative",
              "format": ".3%"
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
  'barranquilla': [ 
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
  ],
  'bogota': [ 
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
 'barranquilla': [ 'age-40-59', 'age-60' ],
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
              "format": ".3%"
            } ) )


  var ageSeries = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "title": "Fallecidos por grupos de edad",
    "data": {
      "url": "data/" + city + "-agents2-ages-multi.csv"
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
    "resolve": {
      "scale": {
        "color": "independent"
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
              "symbolType": "stroke",
              "symbolOpacity": 1
            }
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
            "field": "Grupo de edad",
            "type": "nominal",
            "scale": {
              "scheme": "dark2"
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
            "pivot": "Grupo de edad",
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
      "url": "data/" + city + "-agents2-ages-multi.csv"
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
              "scheme": "siscovid"
            },
            "legend": {
              "orient": "top",
              "title": null,
              "padding": 10,
              "offset": 5,
              "symbolStrokeWidth": 6,
              "symbolType": "stroke",
              "symbolOpacity": 1
            }
          },
          "y": {
            "aggregate": "mean",
            "field": "value",
            "type": "quantitative",
            "scale": {
              "domain": [ 0, ( city == 'bogota' ) ? 0.003 : ( city == 'barranquilla' ) ? 0.0056 : 0.0045 ]
            },
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
              "scheme": "siscovid"
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
          "tooltip": [
            {
              "field": "Fecha",
              "type": "temporal"
            },
            {
              "field": "Graves",
              "type": "quantitative",
              "format": ".3%"
            },
            {
              "field": "Críticos",
              "type": "quantitative",
              "format": ".3%"
            },
            {
              "field": "Fallecidos",
              "type": "quantitative",
              "format": ".3%"
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