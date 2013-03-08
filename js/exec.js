/*****************************************
	File 		: exec.js
	Description	: Samples for msgBox use
	Author		: Irzhy RANAIVOARIVONY (alias malaDev)
	e-mail		: malagroup.systems@gmail.com
******************************************/
document.getElementsByName("click0")[0].onclick = function(){msgBox("Toutes les tâches demandées ont été effectuées avec succès");}
document.getElementsByName("click1")[0].onclick = function(){msgBox({text:"Toutes les tâches demandées ont été effectuées avec succès",titre:"Tâches terminées",type:"normal"});}
document.getElementsByName("click2")[0].onclick = function(){msgBox({text:"Attention!<br/>Ceci est un message d'avertissement sans risque majeur",titre:"Signal d'avertissement",type:"warning"});}
document.getElementsByName("click3")[0].onclick = function(){msgBox({text:"Les données envoyées n'ont pas pu être enregistrées dans la base de données",titre:"Message non envoyé",type:"error"});}	