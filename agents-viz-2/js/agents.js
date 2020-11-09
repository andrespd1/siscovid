
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
      "filter": "datum.variable!=='Sin cuarentena'"
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
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Actual",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 100%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 30%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 50%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Sin cuarentena",
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
      "filter": "datum.variable!=='Sin cuarentena'"
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
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Actual",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 100%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 30%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 50%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Sin cuarentena",
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
      "filter": "datum.variable!=='Sin cuarentena'"
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
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Actual",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 100%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 30%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 50%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Sin cuarentena",
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
      "filter": "datum.variable!=='Sin cuarentena'"
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
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Actual",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 100%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 30%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 50%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Sin cuarentena",
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
      "filter": "datum.variable!=='Sin cuarentena'"
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
        "tooltip": [
          {
            "field": "Fecha",
            "type": "temporal"
          },
          {
            "field": "Actual",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 100%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 30%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Apertura 50%",
            "type": "quantitative",
            "format": ".3%"
          },
          {
            "field": "Sin cuarentena",
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
  ],
  "config": config
};

vegaEmbed( '#rt-series', rtSeries, { actions: false } );