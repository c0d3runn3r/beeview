/**
 * Constructior
 *
 * @param name the name of the bee
 * @return a bee object
 */
function Bee(name) {

	this.wander=true;
	this.theta=Math.random()*2*3.1415;
	this.velocity=50;
	this.name=name;
	this._interval=null;

	// Generate a random ID
	this._id=Math.random().toString(36).slice(-8);


	return this;
}

/**
 * Generate HTML representation
 *
 * @param retun the HTML code representing the bee
 */

Bee.prototype.html=function(){


	return 	"<div class='bee' id='"+this._id+"'>"
			+"<div class='bee-image'><img src='img/bumble_bee_50px.png'></div>"
			+"<div class='bee-title'>"+this.name+"</div>"
			+"</div>";

};

/**
 * Start the bee
 *
 */
Bee.prototype.run=function() {


	// Make sure we aren't already running
	if(this._interval) {

		return;
	}

	var delta_t=.1;

	var self=this;
	this._interval=setInterval(function(){

		var $self=$(self.selector());

		// Get current position
		var position=$self.offset();

		// Modify it
		position.left+=(delta_t*self.velocity*Math.cos(self.theta));
		position.top+=(delta_t*self.velocity*Math.sin(self.theta));

		// Update
		$self.offset(position);

		// Set rotation
		$self.find(".bee-image").css("transform","rotate("+(self.theta*self.rad2deg)+"deg)");

		// If are wandering
		if(self.wander) {

			// If we are not inside the parent, pick a new direction
			var $parent=$self.offsetParent();
			if(!self.inside($parent)) {

				// Get back inside
				self.move_inside($parent);

				// Random new direction
				self.theta=Math.random()*2*3.1415;
			}


			// Every 2s or so (1 in 2/delta_t tries), get bored and pick a new direction
			if(Math.floor(Math.random()*2/delta_t) == 5){

//				console.log(self.name+" is bored");
				self.theta=Math.random()*2*3.1415;

			}

		}

	},delta_t * 1000);


};

/**
 * Get bounds of an arbitrary object
 *
 * @param the jquery object
 * @param type inner|outer (default is outer)
 * @return object with top/bottom/left/right values
 */
Bee.prototype.bounds=function($o,type){

	// Default type is outer
	type = typeof type !== 'undefined' ? type : "outer";

	var o=$o.offset();
	var width=(type=="inner")?($o.innerWidth()):($o.outerWidth());
	var height=(type=="inner")?($o.innerHeight()):($o.outerHeight());

	o.right=o.left+width;
	o.bottom=o.top+height;

	return o;
};

/**
 * Are we inside?
 *
 * @param jQuery object
 * @return true if inside
 */
 Bee.prototype.inside=function($object) {

	var $self=$(this.selector());

 	var me=this.bounds($self,"outer");
 	var it=this.bounds($object,"inner");

	// Are we inside its bounds?
	return (
				me.left > it.left
			&&	me.right < it.right
			&& 	me.top > it.top
			&& 	me.bottom < it.bottom
	);

 };

/**
 * Move inside
 *
 * @param jQuery object
 */
 Bee.prototype.move_inside=function($object) {

	var $self=$(this.selector());

	var position=$self.offset();

 	var me=this.bounds($self,"outer");
 	var it=this.bounds($object,"inner");


 	// Adjust position to be inside
 	if(me.left < it.left) {

 		position.left=it.left+1;		// HACK ... we arbitrarily choose this offset (1px)
 	}

 	if(me.right > it.right) {

 		position.left-=((me.right - it.right)+1);
 	}

 	if(me.top < it.top) {

 		position.top=it.top+1;
 	}

 	if(me.bottom > it.bottom) {

 		position.top-=((me.bottom - it.bottom)+1);
 	}

	// Set new position
	$self.offset(position);

 };

/**
 * Stop the bee
 *
 */
Bee.prototype.stop=function() {

	if(this._interval) {

		clearInterval(this._interval);
		this._interval=null;
	}

};



/**
 * Identifier
 *
 * Get the CSS selector string for this bee
 *
 * @return CSS selector string
 */
Bee.prototype.selector=function() {

	return "div.bee#"+this._id;

};


// Constants
Bee.prototype.rad2deg=180/3.14159;;















