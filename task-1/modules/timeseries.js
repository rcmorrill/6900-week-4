

/*d3.custom = {};

d3.custom.timeSeries = function(){

}*/


d3.timeSeries = function(){
	//internal variables
	//will need default values which can be overwritten later

	var width = 800,
		height = 800,
		margin = {t:25,r:25,b:25,l:25},
		chartW = width - margin.l - margin.r,
		chartH = height - margin.t - margin.b,
		timeRange = [new Date(), new Date()],
		binSize,
		value = function(d){return d},
		maxY = 1000,
		scaleX = d3.time.scale().range([0,chartW]).domain(timeRange),
		scaleY = d3.scale.linear().range([chartH,0]).domain([0,maxY]);

		
console.log(width,height);



//main function "exports"

function exports (selection){


		//this took forever(!) to solve ("why is my chart a different size?")
		chartW = width - margin.l - margin.r,
		chartH = height - margin.t - margin.b,

		scaleX.range([0,chartW]).domain(timeRange);
		scaleY.range([chartH,0]).domain([0,maxY]);


	var layout = d3.layout.histogram()
		.value(value)
		.range(timeRange)
		.bins(binSize.range(timeRange[0],timeRange[1]));


		scaleX.range([0,chartW]).domain(timeRange);
		scaleY.range([chartH,0]).domain([0,maxY]);

//take the data and use a histogram layout to transform it into a series of x and y coordinates

	selection.each(function(d){
		//"selection" --> d3.select('.plot')
		var data = layout(d);
		console.log(data);

		//append DOM elements
		//draw the x y coordinates as a line and maybe an area
		//make an axis



//generators

		var lineGenerator = d3.svg.line()
			.x(function(d){ return scaleX(d.x)})  //.getTime() + d.dx/2)
			.y(function(d){ return scaleY(d.y)})
			.interpolate('basis');

		var areaGenerator = d3.svg.area()
			.x(function(d){ return scaleX(d.x)})  //.getTime() + d.dx/2)
			.y0(chartH)
			.y1(function(d){return scaleY(d.y)})
			.interpolate('basis');

//axis

      var axisX = d3.svg.axis()
          .orient('bottom')
          .scale(scaleX)
          .ticks(d3.time.year);


	var svg = d3.select(this)//just to account for multiple selections
		.append('svg')
		.attr('class','plot_area')
		.attr('width',w).attr('height',h);

	var group = svg.append('g')
		.attr('transform','translate('+ margin.l+','+ margin.t+')');

		group.append('path').attr('class','line')
			.datum(data)
			.attr('d',lineGenerator)

		group.append('path').attr('class','area')
			.datum(data)
			.attr('d',areaGenerator)

		 svg.append('g')
		 .attr('class','axis')
		 .attr('transform','translate('+margin.l+','+(margin.t+chartH)+')')
		 .call(axisX);

		 svg.select('.axis')
            .call(axisX);

	})

}


//getter + setter
//modify and access internal variables

exports.width = function(_x){
		if(!arguments.length) return width;
		width = _x;
		return this;//return exports
	}

exports.height = function(_x){
		if(!arguments.length) return height;
		height = _x;
		return this;//return exports
	}

exports.timeRange = function(_r){
	if(!arguments.length) return timeRange;
	timeRange = _r;
	return this;
	}

exports.binSize = function(interval){
	if(!arguments.length) return binSize;
	binSize= interval;
	return this;
}

exports.value = function(accessor){
	if(!arguments.length) return value;
	value= accessor;
	return this;
}

exports.maxY = function(_y){
	if(!arguments.length) return maxY;
	maxY= _y;
	return this;
}


exports.chartH= function(_y){
	if(!arguments.length) return chartH;
	chartH= _y;
	return this;
}





//return main function
return exports;


}