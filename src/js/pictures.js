const	Picture= require('./picture');

module.exports= class {

	constructor(models, stg){

		const	images= document.createElement('div'),
				frame= document.createElement('div'),
				el= document.createElement('div');

		images.classList.add('images');
		el.appendChild(images);

		frame.classList.add('frame');
		el.appendChild(frame);

		el.classList.add('picture', 'first');
		stg.appendChild(el);

		this._pictures= models.map((model)=>{
			const picture= new Picture(model, stg, images);
			return picture;
		});

		// this._stg= stg;
		this._images= images;
		this._frame= frame;
		this._el= el;

		this._width= 0,
		this._height= 0;
	}

	preload(arg){

		return new Promise((resolve, reject)=>{

			const promises= this._pictures.map((picture)=>{
				return picture.load();
			});

			Promise
				.all(promises)
				.then(()=>{
					resolve(arg);
				}, (err)=>{
					reject(err);
				});
		});
	}

	_setDimensions(picture){

		const	el= this._el,
				frame= this._frame;

		const	borderWidth= picture.borderWidth,
				width= picture.width,
				height= picture.height;

		el.style.width= width+'px';
		el.style.height= height+'px';
		el.style.filter= 'drop-shadow('+(borderWidth*0.25)+'px '+(borderWidth*0.5)+'px '+(borderWidth*0.25)+'px rgba(0, 0, 0, 0.75))'

		frame.style.borderWidth= (borderWidth)+'px';
		frame.style.margin= -(borderWidth)+'px';
	}

	getSize(index){
		const picture= this._pictures[index];
		return {
			width: picture.width,
			height: picture.height
		};
	}

	show(index){

		return new Promise((resolve, reject)=>{

			const picture= this._pictures[index];

			picture.show();

			setTimeout(()=>{
				this._setDimensions(picture);
				setTimeout(()=>{
					resolve(index);
				}, 1000);
			}, 0);
		});
	}

	hide(index){

		return new Promise((resolve, reject)=>{

			this._el.classList.remove('first');
			this._pictures[index].hide();

			setTimeout(()=>{
				resolve(index);
			}, 0);
		});
	}

	dotify(index){
		this._pictures[index].dotify();
	}

	undotify(index){
		this._pictures[index].undotify();
	}
};
