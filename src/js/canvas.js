const	_= require('underscore'),
		PIXI= require('pixi.js');

const	Areas= require('./areas'),
		Particles= require('./particles');

module.exports= class {

	constructor(models, stg, pictures){

		const	pixi= new PIXI.Application({
					view: stg,
					transparent: true
				}),
				container= new PIXI.Container();

		const	areas= new Areas(container),
				particles= new Particles(container);

		pixi.renderer.autoResize= true;
		pixi.stage.addChild(container);

		this._pictures= pictures;
		this._models= models;

		this._pixi= pixi;
		this._areas= areas;
		this._container= container;
		this._particles= particles;

		// this._pictureW= 0;
		// this._pictureH= 0;

		pixi.ticker.add((delta)=>{
			PIXI.tweenManager.update();
		});

		window.addEventListener(
			'resize',
			_.debounce(this._resizeHandler.bind(this), 250));

		this._resizeHandler();
	}

	_resizeHandler(){

		const	root= document.documentElement,
				screenW= root.clientWidth,
				screenH= root.clientHeight;

		this._pixi.renderer.resize(screenW, screenH);
		this._container.position.set(screenW/2, screenH/2);
		this._particles.setViewport(0, 0, screenW, screenH);
	}

	// setPictureSize(pictureW, pictureH){
	// 	// console.log('setPictureSize');
	//
	// 	this._pictureW= pictureW;
	// 	this._pictureH= pictureH;
	// }

	move(index){

		return new Promise((resolve, reject)=>{

			const	stg= this._pixi.view,
					model= this._models[index],
					size= this._pictures.getSize(index);

			stg.classList.add('visible');

			this._areas.calcTransform(
				model.areas,
				size.width,
				size.height);

			this._particles.animate(
				this._areas.children,
				size,
				500);

			setTimeout(()=>{
				resolve(index);
			}, 2700);

			setTimeout(()=>{
				stg.classList.remove('visible');
			}, 3200);
		});
	}
};
