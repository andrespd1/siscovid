
var svg = d3.select( '#chart' ),
  margin = { top: 30, right: 35, bottom: 15, left: 45 },
  width = +svg.attr( 'width' ) - margin.left - margin.right,
  height = +svg.attr( 'height' ) - margin.top - margin.bottom;

var parseTime = d3.timeParse( '%Y-%m-%d' ),
  formatDate = d3.timeFormat( '%Y-%m-%d' ),
  bisectDate = d3.bisector( d => d.date ).left, // What is this?
  formatValue = d3.format( ',.0f' );

d3.csv( './data/daily-cases-by-city.csv' ).then( d => draw_chart( d ) );
d3.csv( './data/interventions.csv' ).then( d => draw_interventions( d ) );

function draw_chart( data ) {
  
  var keys = data.columns.slice( 1 );

  data = data.map( d => {
    d.date = parseTime( d.date );
    d[ 'Barranquilla' ] = d[ 'Barranquilla' ] / 1206319 * 100000;
    d[ 'Bogotá D.C.' ] = d[ 'Bogotá D.C.' ] / 7412566 * 100000;
    d[ 'Cali' ] = d[ 'Cali' ] / 2227642 * 100000;
    d[ 'Cartagena' ] = d[ 'Cartagena' ] / 973045 * 100000;
    d[ 'Medellín' ] = d[ 'Medellín' ] / 2427129 * 100000;
    return d;
  } );

  var cities = keys.map( function( id ) {
    return {
      id: id,
      values: data.map( d => { return { date: d.date, cases: +d[ id ] } } )
    };
  } );

  var x = d3.scaleTime()
    .rangeRound( [ margin.left, width - margin.right ] )
    .domain( d3.extent( data, d => d.date ) )

  var y = d3.scaleLinear()
    .rangeRound( [ height - margin.bottom - 250 , margin.top ] )
    .domain( [
      d3.min( cities, d => d3.min( d.values, c => c.cases ) ),
      d3.max( cities, d => d3.max( d.values, c => c.cases ) )
    ] ).nice();

  var z = d3.scaleOrdinal()
    .domain( [ 'Barranquilla', 'Bogotá D.C.', 'Cali', 'Cartagena', 'Medellín' ] )
    .range([ '#307373', '#F90A3E', '#4C80E6', '#C4D041', '#FA8B4D' ] );

  var line = d3.line()
    .curve( d3.curveCardinal )
    .x( d => x( d.date ) )
    .y( d => y( d.cases ) );

  svg.append( 'g' )
    .attr( 'class', 'x-axis' )
    .attr( 'transform', 'translate(0,' + ( height - margin.bottom - 250 ) + ')' )
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
      .text( 'Casos diarios / 100.000 habs.' );

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
      .data( keys );

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
    .enter().append( 'g' )
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

  legends.append( 'rect' )
    .attr( 'x', 0 )
    .attr( 'y', 0 )
    .attr( 'width', 10 )
    .attr( 'height', 10 )
    .style( 'fill', d => z( d ) );

  legends.append( 'text' )
    .attr( 'x', 20 )
    .attr( 'y', 10 )
    .text(d => d );

}

function draw_interventions( data ) {

  data = data.map( d => {
    d.init_date = parseTime( d.init_date );
    d.end_date = parseTime( d.end_date );
    return d;
  } );

  // TODO: Dynamic dates
  var x = d3.scaleTime()
    .rangeRound( [ margin.left, width - margin.right ] )
    .domain( [ parseTime( '2020-03-06' ), parseTime( '2020-08-05' ) ] );

  var y = d3.scaleBand()
    .range( [ height - margin.bottom , margin.top + 290 ] )
    .domain( data.map( d => d.name ).sort().reverse() );

  svg.append( 'g' )
    .attr( 'class', 'x-axis' )
    .attr( 'transform', 'translate(0,' + ( height - margin.bottom ) + ')' )
    .call( d3.axisBottom( x ).tickFormat( d3.timeFormat( '%b' ) ) );

  svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .call( y ).append( 'text' )
      .attr( 'transform', 'rotate(-90)' )
      .attr( 'x', -325 )
      .attr( 'y', 0 )
      .attr( 'dy', '1em' )
      .style( 'font-size', 13 )
      .style( 'text-anchor', 'end' )
      .text( 'Intervenciones' );

  svg.append( 'g' )
    .attr( 'class', 'y-axis' )
    .attr( 'transform', 'translate(' + margin.left + ',0)' )
    .call( d3.axisLeft( y ).tickSize( -width + margin.right + margin.left ) );

  console.log( data );

  svg.selectAll( '.window-interventions' )
    .data( data.filter( d => d.end_date !== null ) )
    .enter().append( 'line' )          
      .style('stroke', '92D04F' )
      .style( 'stroke-width', 2 )
      .attr( 'x1', d => x( d.init_date ) )     
      .attr( 'y1', d => y( d.name ) + 8 )
      .attr( 'x2', d => ( d.end_date <= parseTime( '2020-08-05' ) ) ? x( d.end_date ) : x( parseTime( '2020-08-05' ) ) )
      .attr( 'y2', d => y( d.name ) + 8 );

  svg.selectAll( '.int_interventions' )
    .data( data ).enter().append( 'circle' )
      .attr( 'class', 'int_interventions' )
      .attr( 'cx', d => x( d.init_date ) )
      .attr( 'cy', d => y( d.name ) + 8 )
      .attr( 'r', 4 )
      .style( 'stroke', '#92D04F' )
      .style( 'stroke-width', 3 )
      .style( 'fill', 'white' );

  svg.selectAll( '.end_interventions' )
    .data( data ).enter().append( 'circle' )
      .attr( 'class', 'end_interventions' )
      .attr( 'cx', d => x( d.end_date ) )
      .attr( 'cy', d => y( d.name ) + 8 )
      .attr( 'r', 4 )
      .style( 'stroke', '#92D04F' )
      .style( 'stroke-width', 3 )
      .style( 'fill', 'white' );

}



