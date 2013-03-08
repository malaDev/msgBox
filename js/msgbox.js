/********************************************************
	File 		: msgbox.js
	Description	: behavior of msgbox elements
	Version		: 1.0.1
	Author		: Irzhy RANAIVOARIVONY (alias malaDev)
	e-mail		: malagroup.systems@gmail.com
********************************************************/

//fonction utiles
function _ev(op){
	return op;
}

function _w(text){
	document.write(text+"<br/>");
}

function _liste(json){
	for(el in json){
		if (typeof(json[el]) != "function")
		_w("<b>&nbsp;&nbsp;<font color = '#3a821e'>" + el + "</font></b><i> [" + typeof (json[el]) + "]</i> : <font color='#ff0000'>" + json[el] + "</font>");
	}
}

//Style fadeOut
function _hide(body,elm,d){
	var op = elm.style.opacity;
	var pas = 0.001;
	elm.style.opacity = 0.6;
	do {
		elm.style.opacity -= pas;
	}while(elm.style.opacity !=0);
	body.removeChild(elm);
}

//Procédure de fusion pour objet [Object]
Object.prototype.fusion = function(json){
	var result = this;
	for (key in json){
		result[key] = json[key];
	}
	return result;
}

//Déclaration de la fonction msgBox
function msgBox(o){
	var lb;
	if (o === undefined || o === null) lb = new _msgBox();
	else lb =  new _msgBox(o);
	lb.build();
	return lb;
}

//Définition de la classe msgBox
function _msgBox(o){
	var _default = {
		id 		: "msgbox",
		text 	: "Ce message est un exemple d'alert",
		type 	: "normal",
		titre 	: "Avis d'alerte",
		//boutton	: [{name:"clikc OK",click:function(){console.log("evenement click")}}],
		boutton	: [],
		anim	: false, 
		close	: "img/close12.png",
		onclose	: function(){}
	};
	this.body = document.body;
	this.o = (o === undefined || o === null) ? _default: o;
	this.args = arguments;
	switch (this.args.length){
		case 0: break;
		case 1:
			if (typeof(o)=="object") this.o = _default.fusion(o);
			else this.o = _default.fusion({text:this.args[0].toString()});			
			break;
		case 2:
			if (typeof(this.args[0])=="string") {
				this.o = _default.fusion({
					text:this.args[0],
					type:(typeof(this.args[1])=="string") ? this.args[1] : _ev(this.args[1])
				});
			}else{
			//erreur dans le contenu des données arguments
				this.o = _default;
			}
			if(this.args[1] instanceof String) this.o.type = this.args[1];
			if(this.args[1] == "normal") this.o.titre = "Avis d'alerte!";
			if(this.args[1] == "warning") this.o.titre = "Message d'avertissement!";
			if(this.args[1] == "error") this.o.titre = "Message d'erreur!";
			break;
		case 3:
			if (typeof(this.args[0])=="string") {
				this.o = _default.fusion({
					text:this.args[0],
					type:(typeof(this.args[1])=="string") ? this.args[1] : _ev(this.args[1]),
					titre:(typeof(this.args[2])=="string") ? this.args[2] : _ev(this.args[2])
				});
			}
			break;
		case 4:
			//erreur de contenu
			this.o = _default;
			break;
		default:break;
	}
	this.valid = this.verify();
	return this;
}

_msgBox.prototype = {
	liste: function(){
		_w("<b>args</b>");
		_liste(this.args);
		if(this.valid){
			_w("<b>options</b>");
			_liste(this.o);
		}
		_w("<b>validité : </b>" + this.valid);	
	},
	verify:function(){
		return (
			(this.o.text != "undefined" && this.o.text != null && typeof(this.o.text) == "string") &&
			(this.o.titre != "undefined" && this.o.titre != null && typeof(this.o.titre) == "string") &&
			(this.o.type != "undefined" && this.o.type != null && typeof(this.o.type) == "string") &&
			(this.o.boutton instanceof Array) &&
			true
		);	
	},
	close:function(c){
		c.o.onclose();
		if(c.o.anim == false){
			c.body.removeChild(c.box);
			c.body.removeChild(c.overlay);
		}else{
			_hide(c.body,c.box,c.o.anim);
			_hide(c.body,c.overlay,c.o.anim);
		}
	},
	destruct:function(){
		if(document.getElementById(this.o.id)!==null){
			var bbox = document.getElementById(this.o.id);
			var overlay = document.getElementById("boxOverlay");
			var body = document.body;
			body.removeChild(bbox);
			body.removeChild(overlay);
		}
		return true;
	},
	build:function(){
		this.destruct();
		var bbox = document.createElement("div");
		var bclose = document.createElement("img");
		var btitre = document.createElement("p");
		var bcontent = document.createElement("div");
		var overlay = document.createElement("div");
		var ob = this;
		with(overlay){
			setAttribute("id","boxOverlay");
			onclick = function(){ob.close(ob)};
		}
		with(bclose){
			src = this.o.close;
			setAttribute("class","box-close");
			onclick = function(){ob.close(ob)};
		}
		with(bcontent){
			setAttribute("class","box-content");
			innerHTML = this.o.text;
		}
		with(btitre){
			setAttribute("class","box-titre");
			innerHTML = this.o.titre;
		}
		var dim = getPosition(bbox);
		with (bbox){
			id=this.o.id;
			setAttribute("class","msgbox "+this.o.type);
			appendChild(bclose);
			appendChild(btitre);
			appendChild(bcontent);
			style.top = parseInt(dim.h)/4+"px";
			style.left = parseInt(dim.w)/2+"px";
			//style.top = "0px";
		}
		//console.log(dim);
		//Contrôle fermeture sur esc
		window.onkeyup = function(e){if(e.keyCode == 27) ob.close(ob);}
		
		//Ajout de bouttons dans o.boutton
		if(ob.o.boutton.length != 0){
			console.log("boutton existants : "+ob.o.boutton.length);
			var bbutton = document.createElement("div");
			bbutton.setAttribute("class","div-boutton");
			for (var i = 0; i<ob.o.boutton.length ; i++){
				var inp = document.createElement("input");
				inp.setAttribute("name" , "bt-"+ob.o.boutton[i].name.replace(/\ /,"_"));
				inp.setAttribute("value" , ob.o.boutton[i].name);
				inp.setAttribute("type" , "button");
				inp.setAttribute("onclick" , ob.o.boutton[i].click);
				bbutton.appendChild(inp);
			}
			bbox.appendChild(bbutton);
		}
		//Ajout des éléments dans body : overlay, bbox
		this.body.appendChild(overlay);
		this.body.appendChild(bbox);
		//correction position
		dim.ew = bbox.clientWidth;
		bbox.style.top = "160px";
		bbox.style.left = (parseInt(dim.w)-parseInt(dim.ew))/2+"px";
		
		this.box = bbox;
		this.overlay = overlay;
	}
};

function getPosition(elm){
	return {
		ew:elm.clientWidth,
		eh:elm.clientHeight,
		w:window.screen.availWidth,
		h:window.document.body.clientHeight,
	}
}