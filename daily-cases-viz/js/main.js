
var svg = d3.select( '#chart'),
  margin = { top: 30, right: 35, bottom: 15, left: 45 },
  width = +svg.attr( 'width' ) - margin.left - margin.right,
  height = +svg.attr( 'height' ) - margin.top - margin.bottom;

d3.csv( './data/daily-cases-by-city.csv' ).then( d => draw_chart( d ) );

function draw_chart( data ) {
  
  var keys = data.columns.slice( 1 );
  console.log( keys );

  var parseTime = d3.timeParse( '%Y-%m-%d' ),
    formatDate = d3.timeFormat( '%Y-%m-%d' ),
    bisectDate = d3.bisector( d => d.date ).left, // What is this?
    formatValue = d3.format( ',.0f' );

  data.forEach( d => {
    d.date = parseTime( d.date );
    return d;
  } );
  console.log( data );

  var cities = keys.map(function( id ) {
    return {
      id: id,
      values: data.map( d => { return { date: d.date, cases: +d[ id ] } } )
    };
  } );
  console.log( cities );

  var x = d3.scaleTime()
    .rangeRound( [ margin.left, width - margin.right ] )
    .domain( d3.extent( data, d => d.date ) )

  var y = d3.scaleLinear()
    .rangeRound( [ height - margin.bottom, margin.top ] )
    .domain( [
      d3.min( cities, d => d3.min( d.values, c => c.cases ) ),
      d3.max( cities, d => d3.max( d.values, c => c.cases ) )
    ] ).nice();

  var z = d3.scaleOrdinal()
    .domain( [ 'Barranquilla', 'Bogotá D.C.', 'Cali', 'Cartagena de Indias', 'Medellín' ] )
    .range([ '#C5D124', '#437EEB', '#FA8B4D', '#bebada', '#307373' ] );

  var line = d3.line()
    .curve( d3.curveCardinal )
    .x( d => x( d.date ) )
    .y( d => y( d.cases ) );

  svg.append( 'g' )
    .attr( 'class', 'x-axis' )
    .attr( 'transform', 'translate(0,' + ( height - margin.bottom ) + ')' )
    .call( d3.axisBottom( x ).tickFormat( d3.timeFormat( '%b' ) ) );

  svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .call( y ).append( 'text' )
      .attr( 'transform', 'rotate(-90)' )
      .attr( 'x', -28 )
      .attr( 'y', 0 )
      .attr( 'dy', '1em' )
      .style( 'font-size', 13 )
      .style( 'text-anchor', 'end' )
      .text( 'Casos diarios' );

  svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr( 'transform', 'translate(' + margin.left + ',0)' )
    .call( d3.axisLeft( y ).tickSize( -width + margin.right + margin.left ) );

  /* Focus */

  var focus = svg.append( 'g' )
    .attr( 'class', 'focus' )
    .style( 'display', 'none' );

  focus.append( 'line' )
    .attr( 'class', 'lineHover' )
    .style( 'stroke', '#999' )
    .attr( 'stroke-width', 1 )
    .style( 'shape-rendering', 'crispEdges' )
    .style( 'opacity', 0.5 )
    .attr( 'y1', -height )
    .attr( 'y2',0 );

  focus.append( 'text' )
    .attr( 'class', 'lineHoverDate' )
    .attr( 'text-anchor', 'middle' )
    .attr( 'font-size', 12 );

  var overlay = svg.append( 'rect' )
    .attr( 'class', 'overlay' )
    .attr( 'x', margin.left )
    .attr( 'width', width - margin.right - margin.left )
    .attr( 'height', height );

  var city = svg.selectAll( '.cities' )
    .data( cities );

  city.enter().insert( 'g', '.focus' ).append( 'path' )
    .attr( 'class', 'line cities' )
    .style( 'stroke', d => z( d.id ) )
    .merge( city )
    .attr( 'd', d => line( d.values ) );

  /* Tooltip */

  var labels = focus.selectAll( '.lineHoverText' )
      .data( keys )

  labels.enter().append( 'text' )
    .attr( 'class', 'lineHoverText' )
    .style( 'fill', d => z( d ) )
    .attr( 'text-anchor', 'start' )
    .attr( 'font-size', 12 )
    .attr( 'dy', ( _, i ) => 1 + i * 2 + 'em' )
    .merge( labels );

  var circles = focus.selectAll( '.hoverCircle' )
    .data( keys )

  circles.enter().append( 'circle' )
    .attr( 'class', 'hoverCircle' )
    .style( 'fill', d => z( d ) )
    .attr( 'r', 2.5 )
    .merge( circles );

  svg.selectAll( '.overlay' )
    .on( 'mouseover', function() { focus.style( 'display', null ); } )
    .on( 'mouseout', function() { focus.style( 'display', 'none' ); } )
    .on( 'mousemove', mousemove );

  function mousemove() {

    var x0 = x.invert( d3.mouse( this )[ 0 ] ),
      i = bisectDate( data, x0, 1 ),
      d0 = data[ i - 1 ],
      d1 = data[ i ],
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    focus.select( '.lineHover' )
      .attr( 'transform', 'translate(' + x( d.date ) + ',' + height + ')' );

    focus.select( '.lineHoverDate' )
      .attr( 'transform', 'translate(' + x( d.date ) + ',' + ( height + margin.bottom ) + ')' )
      .text( formatDate( d.date ) );

    focus.selectAll( '.hoverCircle' )
      .attr( 'cy', e => y( d[ e ] ) )
      .attr( 'cx', x( d.date ) );

    focus.selectAll( '.lineHoverText' )
      .attr( 'transform',  'translate(' + ( x( d.date ) ) + ',' + height / 5 + ')' )
      .text( e => e + ': ' + formatValue( d[ e ] ) );

    x( d.date ) > ( width - width / 4 ) 
      ? focus.selectAll( 'text.lineHoverText' )
        .attr( 'text-anchor', 'end' )
        .attr( 'dx', -10 )
      : focus.selectAll( 'text.lineHoverText' )
        .attr( 'text-anchor', 'start' )
        .attr( 'dx', 10 );

  }

  /* Legend */

  var legend = svg.append( 'g' )
    .attr( 'class', 'legend' );

  var dataL = 0,
    offset = 140;

  var legends = legend.selectAll( 'g' )
    .data( keys )
    .enter().append('g')
      .attr( 'transform', function ( d, i ) {
        if( i === 0 ) {
          dataL = d.length + offset 
          return 'translate(50,0)'
        } else { 
          var newdataL = dataL
          dataL +=  d.length + offset
          return 'translate(' + ( newdataL + 50 ) + ',0)'
        }
      } );

  legends.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', d => z( d ) );

  legends.append( 'text' )
    .attr( 'x', 20 )
    .attr( 'y', 10 )
    .text(d => d );

}



