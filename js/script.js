window.onload = function(e){
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

//procédure de fusion pour objet [Object]
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
	lb.load();
	//lb.liste();
	//alert(lb.o.type);
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
		boutton	: [],
		close	: "img/close12.png"
	};
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
	load: function(){},
	verify:function(){
		return (
			(this.o.text != "undefined" && this.o.text != null && typeof(this.o.text) == "string") &&
			(this.o.titre != "undefined" && this.o.titre != null && typeof(this.o.titre) == "string") &&
			(this.o.type != "undefined" && this.o.type != null && typeof(this.o.type) == "string") &&
			(this.o.boutton instanceof Array) &&
			true
		);	
	},
	build:function(){
		var body = document.body;
		var bbox = document.createElement("div");
		var bclose = document.createElement("img");
		var btitre = document.createElement("p");
		var bcontent = document.createElement("div");
		var overlay = document.createElement("div");
		
		with(overlay){
			setAttribute("id","boxOverlay");
			//style.float = "left";
		}
		with(bclose){
			setAttribute("scr",this.o.close);
			setAttribute("class","bt-close");
		}
		with(bcontent){
			setAttribute("class","box-content");
			innerHTML = this.o.text;
		}
		with(btitre){
			setAttribute("class","box-titre");
			innerHTML = this.o.titre;
		}
		var dim = getPosition(e);
		with (bbox){
			setAttribute("class","msgbox "+this.o.type);
			appendChild(bclose);
			appendChild(btitre);
			appendChild(bcontent);
			style.top = parseInt(dim.h)+"px";
		}
		body.appendChild(overlay);
		body.appendChild(bbox);
		//console.log(dim);
	}
};

function boxOverlay(box){
	var ov = 0;
}

function getPosition(e){
	return {
		e:e,
		w:window.screen.availWidth,
		//h:window.screen.availHeight,
		h:window.document.body.clientHeight,
	}
}

document.getElementsByName("click1")[0].onclick = function(){msgBox({text:"Toutes les tâches demandées ont été effectuées avec succès",titre:"Tâches terminées",type:"normal"});}
document.getElementsByName("click2")[0].onclick = function(){msgBox({text:"Attention!<br/>Ceci est un message d'avertissement sans risque majeur",titre:"Signal d'avertissement",type:"warning"});}
document.getElementsByName("click3")[0].onclick = function(){msgBox({text:"Les données envoyées n'ont pas pu être enregistrées dans la base de données",titre:"Message non envoyé",type:"error"});}
}