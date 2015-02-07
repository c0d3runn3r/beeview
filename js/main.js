$(document).ready(function(){

	// All bees go here
	var bees=[];

	// Create some bees
	bees.push(new Bee("Joseph Sullivan"));
	bees.push(new Bee("Jonathan Woo"));
	bees.push(new Bee("Bryan Walcott"));

	for(n in bees){

		$("div.box").append(bees[n].html());
	}


	$("#run").click(function(){

		for(n in bees){
		
			bees[n].run();
		}
	});

	$("#stop").click(function(){

		for(n in bees){
		
			bees[n].stop();
		}
	});

//	console.log(b.html());
});
