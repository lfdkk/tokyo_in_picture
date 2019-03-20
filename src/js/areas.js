const	PIXI= require('pixi.js');

module.exports= class {

	constructor(stg){

		this._container= new PIXI.Container();
		stg.addChild(this._container);

		this._texture= new PIXI.Texture.fromImage('./images/area.png');
	}

	calcTransform(models, pictureW, pictureH){

		this._container.removeChildren();

		models.forEach((model)=>{

			// const	sprite= new PIXI.Sprite(PIXI.Texture.WHITE);
			const	sprite= new PIXI.Sprite(this._texture);

			sprite.anchor.set(0.5, 0.5);
			// sprite.alpha= 0.5;
			sprite.alpha= 0;
			this._container.addChild(sprite);

			sprite.setTransform(
				model.x * pictureW,
				model.y * pictureH,
				model.scaleX * pictureW,
				model.scaleY * pictureH,
				model.rotation,
				model.skewX,
				model.skewY,
				0,
				0
			);
		});

		this._container.updateTransform();
	}

	get children(){

		return this._container.children;
	}
};
