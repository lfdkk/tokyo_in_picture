module.exports= class {

	constructor(el){
		this._el= el;
	}

	fadeOut(arg){

		return new Promise((resolve, reject)=>{
			this._el.classList.add('black');

			setTimeout(()=>{
				resolve(arg);
			}, 1000);
		});
	}

	fadeIn(arg){

		return new Promise((resolve, reject)=>{
			this._el.classList.remove('black');

			setTimeout(()=>{
				resolve(arg);
			}, 1000);
		});
	}
};
