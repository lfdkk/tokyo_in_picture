const	_= require('underscore'),
		PIXI= require('pixi.js'),
		Victor= require('victor');
		require('pixi-tween');

Object.defineProperties(Victor, {
	Zero: {
		value: new Victor(0, 0)
	},
	Identity: {
		value: new Victor(1, 0)
	}
});

Victor.prototype.swapXY= function(){
	const tmp= this.x;
	this.x= this.y;
	this.y= tmp;
	return this;
};

Victor.prototype.swap= function(vec){
	const x= this.x;
	const y= this.y;
	this.x= vec.x;
	this.y= vec.y;
	vec.x= x;
	vec.y= y;
	return this;
};

Math.PI2= Math.PI*2;

const	DEFAULT_SIZE= 0.0075;//0.015;

const	easing0= PIXI.tween.Easing.outSine(),
		easing1= PIXI.tween.Easing.inOutQuad();

function hslToRgb(h, s, l){
	var r, g, b;

	if(s == 0){
		r = g = b = l; // achromatic
	}else{
		var hue2rgb = function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	return (Math.round(r*255) << 16)|(Math.round(g*255) << 8)|(Math.round(b*255));
}

module.exports= class {

	constructor(texture){
		const	view= new PIXI.Sprite(texture);
		// const	view= new PIXI.Sprite(PIXI.Texture.EMPTY);

		// const	tintR= Math.floor(Math.random()*192+128),
		// 		tintG= Math.floor(Math.random()*192+128),
		// 		tintB= Math.floor(Math.random()*192+128),
		// 		tint= (tintR << 16)|(tintG << 8)|(tintB);

		// const	h= Math.random(),
		// const	h= _.sample([0.15, 0.5, 0.85]),
		const	h= 0.15,//Math.random()*0.075 + 0.075,
				s= 1.0,
				l= 0.9,//0.25+Math.random()*0.75,
				// l= 0.5,
				tint= hslToRgb(h, s, l);

		view.anchor.set(0.5, 0.5);
		view.scale.set(DEFAULT_SIZE);
		// view.blendMode= PIXI.BLEND_MODES.ADD;
		// view.alpha= 0.5;
		view.tint= tint;

		this._view= view;
		this._first= true;

		// this._g= new PIXI.Graphics();
		// stg.addChild(this._g);
	}

	get view(){
		return this._view;
	}

	animate(area, i, size, delay){

		const	body= document.body;

		const	position= this._view.position,
				currVec= new Victor(this._view.position.x, this._view.position.y);

		if(this._first){
			this._first= false;
			currVec.x-= body.clientWidth;
		}

		const	transform= area.localTransform,
				destUV= new PIXI.Point(Math.random()*0.8-0.4, Math.random()*0.8-0.4),
				dest= transform.apply(destUV),
				destVec= new Victor(dest.x, dest.y);

		destVec.y-= body.clientHeight*0.05;

		const	dx= Math.max(size.width-currVec.x, currVec.x),
				dy= Math.max(size.height-currVec.y, currVec.y),
				d= Math.sqrt(dx*dx, dy*dy);

		const	len0= (Math.random()*0.75+0.25)*d,
				len1= len0 * 0.1,
				cpLen0= Math.random()*0.05+0.05,
				cpLen1= Math.random()*1.0+1.0,
				rad0= Math.random()*Math.PI2,
				rad1= Math.PI2 - rad0,
				scale= Math.random()*0.2+DEFAULT_SIZE;

		const	duration0= 300+Math.random()*500,
				duration1= 1200+Math.random()*200;

		const	to0= Victor.Identity.clone()
					.rotate(rad0)
					.multiplyScalar(len0),
				to1= Victor.Identity.clone()
					.rotate(rad1)
					.multiplyScalar(len1),
				to2= Victor.Zero.clone()
					.add(destVec);

		const pts= [
			{
				from: currVec.clone(),
				cp0: Victor.Zero.clone()
					.add(currVec),

				to: to0,
				cp1: to0.clone()
					.invertX()
					.swapXY()
					.multiplyScalar(cpLen0)
					.add(to0)
					.add(currVec)
			},
			{
				from: to0,
				cp0: to0.clone()
					.invertY()
					.swapXY()
					.multiplyScalar(cpLen0)
					.add(to0)
					.add(currVec),
				to: to1,
				cp1: to1.clone()
					.invertX()
					.swapXY()
					.multiplyScalar(cpLen1)
					.add(to1)
					.add(destVec)
			},
			{
				from: to1,
				cp0: to1.clone()
					.invertY()
					.swapXY()
					.multiplyScalar(cpLen1)
					.add(to1)
					.add(destVec),
				to: to2,
				cp1: to2.clone()
			}
		];

		if(Math.random()<0.5){
			pts[0].cp1.swap(pts[1].cp0);
		}

		if(Math.random()<0.5){
			pts[1].cp1.swap(pts[2].cp0);
		}

		pts[0].to.add(currVec);
		pts[1].to.add(destVec);



		// const	g= this._g;
		// g.clear();
		//
		// const colors= [0xff0000, 0x00ff00, 0x0000ff];
		//
		// pts.forEach((pt, i)=>{
		//
		// 	g.lineStyle(0);
		//
		// 	g.beginFill(colors[i]);
		// 	g.drawRect(pt.to.x-2, pt.to.y-2, 4, 4);
		// 	g.endFill();
		//
		// 	g.beginFill(colors[i]|0x999999);
		// 	g.drawRect(pt.cp0.x-2, pt.cp0.y-2, 4, 4);
		// 	g.drawRect(pt.cp1.x-2, pt.cp1.y-2, 4, 4);
		// 	g.endFill();
		//
		// 	g.lineStyle(1, 0x999999);
		// 	g.moveTo(pt.from.x, pt.from.y);
		// 	g.lineTo(pt.cp0.x, pt.cp0.y);
		// 	g.moveTo(pt.cp1.x, pt.cp1.y);
		// 	g.lineTo(pt.to.x, pt.to.y);
		//
		// });
		//
		// g.lineStyle(1, 0xffff00);
		// g.moveTo(currVec.x, currVec.y);
		// pts.forEach((pt)=>{
		// 	g.bezierCurveTo(
		// 		pt.cp0.x, pt.cp0.y,
		// 		pt.cp1.x, pt.cp1.y,
		// 		pt.to.x, pt.to.y
		// 	);
		// });



		const	path0= new PIXI.tween.TweenPath(),
				path1= new PIXI.tween.TweenPath();

		path0.moveTo(currVec.x, currVec.y);
		path0.bezierCurveTo(
			pts[0].cp0.x, pts[0].cp0.y,
			pts[0].cp1.x, pts[0].cp1.y,
			pts[0].to.x, pts[0].to.y
		);

		path1.moveTo(pts[0].to.x, pts[0].to.y);
		path1.bezierCurveTo(
			pts[1].cp0.x, pts[1].cp0.y,
			pts[1].cp1.x, pts[1].cp1.y,
			pts[1].to.x, pts[1].to.y
		);
		path1.bezierCurveTo(
			pts[2].cp0.x, pts[2].cp0.y,
			pts[2].cp1.x, pts[2].cp1.y,
			pts[2].to.x, pts[2].to.y
		);

		PIXI.tweenManager.createTween(this._view, {
			path: path0,
			time: duration0,
			easing: easing0,
			delay: delay + i*1.5,
			to: {
				scale: {x: scale, y: scale}
			}
		}).start().chain(PIXI.tweenManager.createTween(this._view, {
			path: path1,
			time: duration1,
			easing: easing1,
			to: {
				scale: {x: DEFAULT_SIZE, y: DEFAULT_SIZE}
			}
		}));
	}
};
