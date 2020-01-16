var size = 20;
var grid = [];

mod = (n) => {
	if(n<0){
		return size-1;
	}
	else if(n>size-1){
		return 0;
	}
	else{
		return n;
	}
}

sum = (a) => {
	n=0;
	a.forEach(function(i) {n += i;});
	return n;
}

stringy = (x,y) => {
	return (x + "-" + y);
}

neigh = (x,y,grid) => {
	n = [grid[mod(x+1)][y],
		grid[x][mod(y+1)],
		grid[mod(x+1)][mod(y+1)],
		grid[mod(x-1)][y],
		grid[x][mod(y-1)],
		grid[mod(x-1)][mod(y-1)],
		grid[mod(x+1)][mod(y-1)],
		grid[mod(x-1)][mod(y+1)]];

	return sum(n);
}

function initgrid (){
	for(let x=0; x<size; x++){
		ul = "<ul id=" + x + "></ul>";
		$('#grid').append(ul);
		grid[x] = [];
		for(let y=0; y<size; y++){
			$("#" + x).append("<li id=" + stringy(x,y)  + "></li>");
			r = Math.random();
			if(r>0.5) {
				$("#" + stringy(x,y)).css("background", "#000000");
				grid[x][y] = 1;
			}
			else
			{
				$("#" + stringy(x,y)).css("background", "#ffffff");
				grid[x][y] = 0;
			}
		}
	}
}

function cel (grid){
	gcopy = grid.slice(0);
	for(let x=0; x<size; x++){
		for(let y=0; y<size; y++){
			n = neigh(x,y,grid);

			if(grid[x][y]==1){
				if(n<2 || n>3){
					$("#" + stringy(x,y)).css("background", "#ffffff");
					gcopy[x][y] = 0;
				}
			}
			else{
				if(n == 3){
					$("#" + stringy(x,y)).css("background", "#000000");
					gcopy[x][y] = 1;
				}
			}
		}
	}
	return gcopy;
}

function kick (){
	grid = cel(grid);
}

window.onload = function() {
	initgrid();
	kick();
	console.log(grid);
	//setInterval(kick, 200);
};
