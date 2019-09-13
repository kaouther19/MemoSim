let dataTable = [];
let  tab_pri = new Array();///ça se crée avec ins
let vara=false;
let rrrr=0;
let fait2=false;
let fen;
let commencer = false;
let com;
let okfait=false;
let finn=false;
let dataTab=[]

class file_prio{
    constructor(taille,ident,orde)
    {
        this.taille = taille;
        this.etat = "ocupée";
        this.ident = ident;///de la table d'etat
        this.orde = orde;
        this.file_p=new Array();
    }  
    enfiler(psus)
    {
        this.file_p.push(psus);
    }
    defiler(t)
    {
        return this.file_p.splice(t)
    }
    }

class DisqDur
{
     constructor(taille,canvas)
    {
        this.taille=taille;
        this.tab = new Array()
       
       
    }
    insertPsus(psus)
    {
        this.tab.push(psus)
       
    }
    donnerPsus(i)
    {
        var p=this.tab[i]
        this.tab.splice(i,1);
        return p;
        
    }
}
class enreg {
    constructor(taille, etat, ident) {
        this.taille = taille;
        this.etat = etat;
        this.ident = ident;

    }
}
class Prosseecus {
    constructor(taille, temps,identificateur,ord) {
            this.taille = taille;
            this.temps = temps; //en seconde 
            this.tm=temps;
            this.temps_fin = 0; //temps du systeme 
            this.etat = "pret";
            this.temps_bloc=0;
            this.blocPsus.identificateur=identificateur
            this.bb=false;
            this.ord=ord;
            /// this.temps_restant=temps_restant;
        }
        //La méthode Date.now() renvoie le nombre de millisecondes écoulées depuis le 1er Janvier 1970
        //ms*2000=
        //par ex 20ms-->40s
    lancer_procssecus() {
        this.etat = "actif";
        var start = Date.now();
        this.temps_fin = start + (this.temps * 1000); ///seconde
        return this.temps_fin;
    }
    cal_temps_restant() //le resultat est en miliseconde mais acceptable  
        {
            var h1 = Date.now();
            return this.temps_fin - h1;

        }
    fin_prpo() {
        if (this.cal_temps_restant() == 0) {
            this.etat = "fin";
        }
    }
    fin_anomal() {
        if (this.cal_temps_restant() != 0) {
            this.etat = "fin";
        }}
    blocPsus()
    {
        console.log(this.cal_temps_restant());
        if (this.cal_temps_restant() > 0) {
            var h1 = Date.now();
            this.temps_bloc= this.temps_fin - h1;
            this.etat = "bloqué";
            this.bb=true;
          
        }
    }
    debloquer_psus()
    {
        this.etat = "actif";
        var start = Date.now();
        this.temps_fin = start + (this.temps_bloc ); ///miliseconde
        return this.temps_fin;
    }
    blocPsus1()
    {
        console.log(this.cal_temps_restant());
        if (this.cal_temps_restant() > 0) {
            this.etat = "pret";
        var start = Date.now();
        this.temps_fin = start + (this.temps_bloc ); ///miliseconde

        this.temps=Math.trunc((this.temps_fin-start)/1000);
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        
        }

    }
  
    
}
class partition {

    constructor ( adr_debut , taille,  etat, identificateur, psus,orde)
    {
        this.adr_debut=adr_debut;
        this.taille=taille;
        this.etat=etat;
        this.identificateur=identificateur
        this.psus=psus
        this.frag=0
        this.orde=orde
    }
}
//coment l'initialiser en lisant les tailles
class Memory {

    constructor(taille, tailleOS, nbPart, tabTaillePart, canvas) {

        this.taille = taille;
        this.tailleOS = tailleOS;
        this.nbPart = nbPart;
        this.tabMem = new Array()
        this.tabEtat = new Array()
        this.tabEtat[0] = new partition (0 ,tailleOS, "occupé", 0,null)
        this.tabMem[0]= new partition (0 ,tailleOS, "occupé", 0,null)
        this.tabTaillePart=tabTaillePart
       
       
        //initialiser la memoire et la table d'etat avec l'animation
   
        var adr = tailleOS
        var y=0
        let bb=this.taille;
        let ff=400/bb;
        var yetat = 47
        
        var cach=canvas.append("rect").attr("x",40).attr("y",64).attr("width",300).attr("height",190).attr("fill","white")
        for (var i = 1; i < nbPart+1; i++) {
            this.tabEtat[i] = new partition (adr ,this.tabTaillePart[i-1], "libre", i,null)
            this.tabMem[i]= new partition (adr ,this.tabTaillePart[i-1], "libre", i,null)
            adr =adr + this.tabTaillePart[i-1] 
            //la table d'etat
           var entidtxt = canvas.append("text").attr("x",53).attr("y",yetat).text(this.tabEtat[i].identificateur).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
            var entidtxt = canvas.append("text").attr("x",90).attr("y",yetat).text(this.tabEtat[i].adr_debut).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
           var entidtxt = canvas.append("text").attr("x",165).attr("y",yetat).text(this.tabEtat[i].taille).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
            var entidtxt = canvas.append("text").attr("x",242).attr("y",yetat).text(this.tabEtat[i].etat).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
            yetat=yetat+20   
            //la memoire 
           
        if(this.tabMem[i].etat=="occupé")
            {

                var part = canvas.append("rect").attr("width",200).attr("ry",6)
                .attr("height",this.tabMem[i].taille*ff)
            .attr("fill","#009D8E").attr("stroke","white")
            .attr("x",800).attr("y",y+40)
            var idtxt = canvas.append("text").attr("x",950).attr("y",64+y).text(this.tabMem[i].identificateur).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
        
            }
            else{
                if(this.tabMem[i].etat=="libre")
                {
                    var part = canvas.append("rect").attr("width",150).attr("ry",6)
                    .attr("height",this.tabMem[i].taille*ff).attr("fill","#B0EFC1").attr("stroke","white")
                    .attr("x",800).attr("y",y+40)
                    var idtxt = canvas.append("text").attr("x",950).attr("y",64+y).text(this.tabMem[i].identificateur).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
                }
                
                
            }
          //  var iden=canvas.append("text").text(this.tabMem[i].identificateur).attr("fill","black").attr("x",1060).attr("y",61+y)
         
            y=y+this.tabMem[i].taille*ff;
        }
       
}

recherche(psus,canvas)
{
  var trouv="faux"
  var i=1
 
  while((i<this.nbPart+1)&&(trouv=="faux"))
  {
      console.log("la taille"+this.tabEtat[i].taille)
      if((this.tabEtat[i].taille>=psus.taille)&&(this.tabEtat[i].etat=="libre"))
      {
          console.log("trrrrrrrrrrrrrrvs")
          trouv="vrai"
          var id=i;
          /*var entidtxt = canvas.append("text").attr("x",43).attr("y",75+(i-1)*20).text(this.tabEtat[i].identificateur).attr("fill","red")
        var entidtxt = canvas.append("text").attr("x",92).attr("y",75+(i-1)*20).text(this.tabEtat[i].adr_debut).attr("fill","red")
       var entidtxt = canvas.append("text").attr("x",160).attr("y",75+(i-1)*20).text(this.tabEtat[i].taille).attr("fill","red")
        var entidtxt = canvas.append("text").attr("x",235).attr("y",75+(i-1)*20).text(this.tabEtat[i].etat).attr("fill","red")*/
     // Swal.fire("la partition choisie est la parttion numero "+i)
  
       /*var rcre=canvas.append("rect").attr("fill","grey").attr("x",300).attr("y",170).attr("width",500).attr("height",60)
       .attr("ry",3).attr("rx",3)
       var ch=canvas.append("text").attr("x",320).attr("y",210).text("la partition choisie est la parttion numero "+i).attr("fill","white")
       .attr("font-size",25)
       rcre.transition().remove().duration(4000)
       ch.transition().remove().duration(4000)
*/
      }
      i++
  }
  if(trouv=="faux")
  {
      console.log("on ne peut pas")
      return -1;
  }
  else{return id}
}
inserer(ps,id,canvas)
{
    console.log("inssssssssssssssssssssssseeeeeeeeeeeerrrrrrrrrrrrrrr")
    this.tabEtat[id].psus=ps

    this.tabMem[id].psus=ps
    this.tabMem[id].orde=ps.ord
    this.tabMem[id].etat="occupé"
    this.tabEtat[id].etat="occupé"
    ps.identificateur=id;
    this.tabMem[id].frag=this.tabMem[id].taille-ps.taille
    var yetat =47
    var y=0
    let bb=this.taille;
    let ff=400/bb;
    var cach=canvas.append("rect").attr("x",30).attr("y",37).attr("width",255).attr("height",190).attr("fill","white")
   //aniamtion de la mem et table d'etat
    for(var j=1;j<this.tabMem.length;j++)
    {
        //la table d'etat
        var entidtxt = canvas.append("text").attr("x",53).attr("y",yetat).text(this.tabEtat[j].identificateur).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
        var entidtxt = canvas.append("text").attr("x",90).attr("y",yetat).text(this.tabEtat[j].adr_debut).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
       var entidtxt = canvas.append("text").attr("x",165).attr("y",yetat).text(this.tabEtat[j].taille).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
        var entidtxt = canvas.append("text").attr("x",242).attr("y",yetat).text(this.tabEtat[j].etat).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
        yetat=yetat+20  
        if(this.tabMem[j].etat=="occupé")
        {
            console.log(this.tabMem[j].psus)
                var part = canvas.append("rect").attr("width",150).attr("ry",6)
                .attr("height",this.tabMem[j].taille*ff).attr("fill","#009D8E").attr("stroke","pink").attr("x",800).attr("y",40+y)
                .attr("stroke","white")
                var fraganim = canvas.append("rect").attr("fill","#EF6060").attr("x",800).attr("y",40+y+this.tabMem[j].psus.taille*ff).attr("height",this.tabMem[j].frag*ff).attr("width",150)
                .attr("ry",6)
               // var idtxt = canvas.append("text").attr("x",955).attr("y",55+y).text(this.tabMem[j].identificateur).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
        }
            if(this.tabMem[j].etat=="libre")
            {
                var part = canvas.append("rect").attr("width",150).attr("ry",6)
                .attr("height",this.tabMem[j].taille*ff).attr("fill","#B0EFC1").attr("x",800).attr("y",40+y)
                .attr("stroke","white")
              //  var idtxt = canvas.append("text").attr("x",955).attr("y",55+y).text(this.tabMem[j].identificateur).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
            
            }
            
        
        
        y=y+this.tabMem[j].taille*ff;

    }
}
liberer(id,canvas)
{
    this.tabMem[id].psus=null
    this.tabEtat[id].psus=null
    this.tabMem[id].etat="libre"
    this.tabEtat[id].etat="libre"
    this.tabMem[id].frag=0
    let bb=this.taille;
    let ff=400/bb;
    var y=0
    var yetat =47
    var cach=canvas.append("rect").attr("x",30).attr("y",37).attr("width",260).attr("height",190).attr("fill","white")
    for(var j=1;j<this.tabMem.length;j++)
    {
       //la table d'etat
       var entidtxt = canvas.append("text").attr("x",53).attr("y",yetat).text(this.tabEtat[j].identificateur).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
       var entidtxt = canvas.append("text").attr("x",90).attr("y",yetat).text(this.tabEtat[j].adr_debut).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
      var entidtxt = canvas.append("text").attr("x",165).attr("y",yetat).text(this.tabEtat[j].taille).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
       var entidtxt = canvas.append("text").attr("x",242).attr("y",yetat).text(this.tabEtat[j].etat).attr("fill","black").attr("font-size",14).attr("font-family",'monospace')
       yetat=yetat+20  
        //la memoire
        if(this.tabMem[j].etat=="occupé")
        {
            console.log(this.tabMem[j].psus)
                var part = canvas.append("rect").attr("width",150).attr("ry",6)
                .attr("height",this.tabMem[j].taille*ff).attr("fill","#009D8E").attr("stroke","pink").attr("x",800).attr("y",40+y)
                .attr("stroke","white")
                var fraganim = canvas.append("rect").attr("fill","#EF6060").attr("x",800).attr("y",40+y+this.tabMem[j].psus.taille*ff).attr("height",this.tabMem[j].frag*ff).attr("width",150)
                .attr("ry",6)
        }
            if(this.tabMem[j].etat=="libre")
            {
                var part = canvas.append("rect").attr("width",150).attr("ry",6)
                .attr("height",this.tabMem[j].taille*ff).attr("fill","#B0EFC1").attr("x",800).attr("y",40+y)
                .attr("stroke","white")
            }
            
            
        
         y=y+this.tabMem[j].taille*ff

    }
 }
}
class afficheurRecherche{
    constructor(canvas)
    {
       
        var tx=canvas.append("text").text("Recherche de partition") 
        .attr("x",420).attr("y",80).attr("fill",'white').attr("font-size",14)
       .transition().delay(5000).remove()
       var tx1=canvas.append("text").text("les partitions libres")
       .attr("x",280).attr("y",100).attr("fill",'white').attr("font-size",11)
      .transition().delay(5000).remove()
      ///////////////////
      var rid=canvas.append("rect").attr("x",270).attr("y",110).attr("width",40).attr("height",20).attr("fill",'white')
      .attr("rx",3).attr("ry",3)
      .transition().delay(5000).remove()
      var txid=canvas.append("text").text("id")
      .attr("x",283).attr("y",123).attr("fill",'black').attr("font-size",13)
     .transition().delay(5000).remove()
     var rtai=canvas.append("rect").attr("x",315).attr("y",110).attr("width",80).attr("height",20).attr("fill",'white')
      .attr("rx",3).attr("ry",3)
      .transition().delay(5000).remove()
      var txtai=canvas.append("text").text("taille (ko)")
      .attr("x",325).attr("y",123).attr("fill",'black').attr("font-size",13)
     .transition().delay(5000).remove()
     var tabTaille=[];
     var tabid=[]
     var y=135
     for(var i=0;i<9;i++)
     {
         tabTaille[i]=canvas.append("rect").attr("x",315).attr("y",y).attr("width",80).attr("height",20).attr("fill",'white')
         .attr("rx",3).attr("ry",3).transition().delay(5000).remove()
tabid[i]=canvas.append("rect").attr("x",270).attr("y",y).attr("width",40).attr("height",20).attr("fill",'white')
.attr("rx",3).attr("ry",3)
.transition().delay(5000).remove()
y=y+25
     }   
    }
   
    remplissage(m,ps,i,canvas)
    { var y=148
      /*  var tmp1=new Array()
            var ind=0;
            for (var qq=0;qq<m.tabEtat.length;qq++)
            {
                if(m.tabEtat[qq].etat=='libre')
                {
                    tmp1[ind]=m.tabEtat[qq];
                    ind++;
                }
            }*/
            //var k=0
            var cpttt=0;
       for(var j=0;j<m.tabEtat.length;j++)
       {
         
          
        if(m.tabEtat[j].etat=='libre')
        { 
            cpttt++;

           if(j==i)
            {
                canvas.append("rect").attr("x",270).attr("y",(cpttt-1)*25+135).attr("width",40).attr("height",20).attr("fill",'red')
                .attr("rx",3).attr("ry",3)
                .transition().delay(5000).remove()
                canvas.append("rect").attr("x",315).attr("y",(cpttt-1)*25+135).attr("width",80).attr("height",20).attr("fill",'red')
                .attr("rx",3).attr("ry",3)
                .transition().delay(5000).remove()
            }
   
           canvas.append("text").text(m.tabEtat[j].identificateur).attr("x",283).attr("y",y).attr("fill",'black').attr("font-size",13)
           .transition().delay(5000).remove()
           canvas.append("text").text(m.tabEtat[j].taille).attr("x",325).attr("y",y).attr("fill",'black').attr("font-size",13)
     .transition().delay(5000).remove()
     y=y+25;
     //les textes
     canvas.append("text").text("le processus P"+ps.ord +" de taille "+ps.taille+" ko").attr("fill",'black')
     .attr("fill",'white').attr("font-size",15).attr("x",450).attr("y",150)
     .transition().delay(5000).remove()
     canvas.append("text").text("le numero de la partition est "+i).attr("fill",'black')
     .attr("fill",'white').attr("font-size",14).attr("x",425).attr("y",180)
     .transition().delay(5000).remove()
     canvas.append("text").text("car elle peut contenir ce processus ").attr("fill",'black')
     .attr("fill",'white').attr("font-size",14).attr("x",425).attr("y",200)
     .transition().delay(5000).remove()
    
       }
    }
    }
    
   
}

window.onload=function(){
    d3.select('#tour').on('click', ddd) 
function ddd()
{

    var intro = introJs();
    console.log("touuuur")
    intro.start();

}

    var bilan=0;
    function sleep(ms)
{
 return new Promise(resolve=>setTimeout(resolve,ms))
}
    function afficheFenFifo(delay)
           {
               flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
               fenetre.attr('fill','transparent').attr('y',-200).style('visibility','visible');
               flou.transition().attr('fill','lightgray').attr('opacity',0.6).duration(100)//.delay(delay);
               fenetre.transition().attr('fill','#404040').attr('y',50).duration(100)//.delay(delay+500);
               // afficheur.visible("visible",delay+700);
               
              
           }
           function cacherFen() {
               
               //afficheur.visible("hidden",0);
               fenetre.transition().attr('fill','transparent').duration(500);
               flou.transition().attr('fill','transparent').duration(500);
               fenetre.transition().style('visibility','hidden').delay(500);
               flou.transition().style('visibility','hidden').delay(500);
              
               
           }
   
          d3.select("#vaEtVient").style('visibility','hidden')
    document.getElementById("terminer").disabled = true;
    document.getElementById("taime").disabled = true;
    document.getElementById("nbpa").disabled = true;
    document.getElementById("taipart").disabled = true;
    document.getElementById("taipartok").disabled = true;
    document.getElementById("nbp").disabled = true;
    document.getElementById("taips").disabled = true;
    document.getElementById("tmps").disabled = true;
    document.getElementById("psok").disabled = true;
    document.getElementById("ajoutok").disabled = true;
    document.getElementById("tmps1").disabled = true;
    document.getElementById("taips1").disabled = true;
    document.getElementById("block").disabled = true;
    document.getElementById("blockok").disabled = true;
    document.getElementById("dblock").disabled = true;
    document.getElementById("dblockok").disabled = true;
   
    let fen;
    let com;
    let commencer = false;

  console.log('------------------------------------');
  console.log(44444444444444444444);
  console.log('------------------------------------');
      //  d3.select("#illustration").remove();
   //    d3.select("#svg2").remove();
        d3.select("#vaEtVient").style("visibility",'visible')
        let canvas = d3.select("#svg2");
        var lin=canvas.append("line").attr("x1",292).attr("y1",32).attr("x2",497).attr("y2",32).attr("stroke","#0C0101").attr("stroke-width",1.5)
var t=canvas.append("text").text("processus").attr("x",300).attr("y",27).attr("fill","#EF6060").attr("font-size",14).attr("fill","black").attr("data-step",14).attr("data-intro","l'identificateur du processus")
var t=canvas.append("text").text("temps").attr("x",390).attr("y",27).attr("fill","#EF6060").attr("font-size",14).attr("fill","black").attr("data-step",15).attr("data-intro","la temps restant du processus")
var t=canvas.append("text").text("taille").attr("x",450).attr("y",27).attr("fill","#EF6060").attr("font-size",14).attr("fill","black").attr("data-step",16).attr("data-intro","la taille du processus")

/////////////////entete de la table d'etat
 var re=canvas.append("rect").attr("width",190).attr("height",25).attr("fill","#B0EFC1").attr("x",170).attr("y",-17).attr("ry",6)
 var t1=canvas.append("text").text("Table d'état").attr("fill","black").attr("x",220).attr("y",-3).attr("font-size",14).attr("font-family","monospace")
 //entet table etat
 var lin=canvas.append("line").attr("x1",48).attr("y1",32).attr("x2",283).attr("y2",32).attr("stroke","#0C0101").attr("stroke-width",1.5)
  var entidtxt = canvas.append("text").attr("x",50).attr("y",27).text("id").attr("fill","black").attr("font-size",14).attr("data-step",10).attr("data-intro","l'identificateur de la partition")
  var entidtxt = canvas.append("text").attr("x",85).attr("y",27).text("@debut").attr("fill","black").attr("font-size",14).attr("data-step",11).attr("data-intro","l'adresse début de la partition")
  var entidtxt = canvas.append("text").attr("x",160).attr("y",27).text("taille").attr("fill","black").attr("font-size",14).attr("data-step",12).attr("data-intro","la taille de la partition")
  var entidtxt = canvas.append("text").attr("x",240).attr("y",27).text("état").attr("fill","black").attr("font-size",14).attr("data-step",13).attr("data-intro","l'état de la partition")
 //initialiser le os
 var rec=canvas.append("rect").attr("width",150).attr("height",40).attr("fill",'pink').attr("x",800).attr("y",0)
.attr("ry",6)
let group = canvas.append("g").attr('id',"disque")
 var tc=canvas.append("text").text("Systéme d'éxploitation").attr("x",810).attr("y",32).attr("fill","black").attr("font-size",11).attr("font-family","monospace")
let ec=group.append("ellipse").attr("cx",465).attr("cy",441.5).attr("rx",65).attr("ry",16.5).attr("fill","#333333").attr("data-step",17).attr("data-intro","le disque dur")
 let  ec1 = group.append("rect").attr("x",400).attr("y",410).attr("width",130).attr("height",29).attr("fill","#363131")
 let ec2 = group.append("ellipse").attr("cx",465).attr("cy",412.5).attr("rx",65).attr("ry",22.5).attr("fill","#857575")

        ///dessin

        fen = canvas.append("rect").attr("x", -400).attr("y", -400).attr("width", 2000).attr("height", 2000).attr("fill", "#DEE6FA").style("opacity", 0.8).attr("id", "fen");
        com = canvas.append("image").attr("x", 340).attr("y", 100).attr("height", 280).attr("width", 280).attr("href", 'img/commencer2.png').attr("id", "commencer").style("cursor", "pointer");
       //DEBLOQUER
       
        document.getElementById("taime").removeAttribute("disabled");
        document.getElementById("nbpa").removeAttribute("disabled");
        document.getElementById("taipart").removeAttribute("disabled");
        document.getElementById("taipartok").removeAttribute("disabled");
        document.getElementById("nbp").removeAttribute("disabled");
        document.getElementById("taips").removeAttribute("disabled");
        document.getElementById("tmps").removeAttribute("disabled");
        document.getElementById("psok").removeAttribute("disabled");

    let pause=1;
    d3.select('#flech').attr('x',550).attr('y',230).append()
      d3.select("#illustration").remove();
    
      let canvas2 = d3.select("#cpt").append('text').text(0);
      let canvas3 = d3.select("#cpt1").append('text').text(0);
      let canvas4 = d3.select("#cpt3").append('text').text(0);
      var tee = canvas3
                .attr("x", 10)
                .attr("y", 20)
                .attr("font-size", 20)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            text1 = canvas2
                .attr("x", 10)
                .attr("y", 20)
                .attr("font-size", 20)
                .attr("font-family", "monospace")
                .attr("fill", "black");
                var tee1 = canvas4;
    var max=0;

    let taille = 0;
   let nombrep=0;
    let nbPart = 0;
    var tabtai = [];
    var tabtem = [];
    let tabTaillePart = [];
    let v = 0;
    var tab_pri = new Array();///ça se crée avec ins
    
                let g = 0
                
                    var ttt=0;
                   
                  
               
                var t, t1;///
                ///
                ///
            ///
            ///
            let cpttt=1;
            let v1=false;
            let v2=false;

          /*  var canvas= d3.select("#svg2")
            var d=new DisqDur(0,canvas);
            var m=new Memory(0,0,0,0, canvas);*/
            document.getElementById('pss1').addEventListener('submit',function(e)

            {
                taipart2();
                e.preventDefault();
            },false);
            document.getElementById("taips").value = "";
            document.getElementById("tmps").value = ""; 
            document.getElementById('nbp').value=0;

                d3.select('#psok').on('click', taipart2) 
                function  taipart2()
                {
                    nombrep = parseInt(document.getElementById('nbp').value);
                    t = parseInt(document.getElementById('taips').value);
                    t1 = parseInt(document.getElementById('tmps').value);           
if((t<=0) ||(t1<=0)||(document.getElementById('taips').value=="")||(document.getElementById('tmps').value=="")||document.getElementById('nbp').value==0)
{

    if((document.getElementById('taips').value=="")&&(document.getElementById('tmps').value==""))
    {
        Swal.fire("veuillez introduire le taille et le temps")
    }
    else
    {
            if(document.getElementById('taips').value=="")
                        {
                            Swal.fire("veuillez introduire le taille")
                        }
              else       
                        {
                            Swal.fire("veuillez introduire le temps")
                        }
                    }
    if(document.getElementById('nbp').value==0)
    {
        Swal.fire("veuillez introduire le nombre de perocessus")
      }  

    if(t<=0)
    {
        Swal.fire("la taille doit etre supérieur à 0,veuillez reintroduire les attributs")
    }
    if(t1<=0)
    {
        Swal.fire("le temps doit etre supérieur à 0,veuillez reintroduire les attributs")
    }
}
else
{
    tabtai[v] = t;
    tabtem[v] = t1;
    v++;
    tee.transition().text(v);
    document.getElementById("taips").value = "";
document.getElementById("tmps").value = "";  
console.log('------------------------------------');
console.log(v,nombrep);
console.log('------------------------------------');
if ( nombrep== v)     
{
    document.getElementById("taips").disabled=true;
    document.getElementById("tmps").disabled=true;   
    console.log('------------------------------------');
    console.log('HHHHHHH');
    console.log('------------------------------------');
      wow =0;
      v1=true;
}       
document.getElementById('nbp').disabled='true';
}   
                }
                /////////////////////////////////////////////////
                var k=0;
                var ancien = 0;
                document.getElementById('nbpa').value=0;
                document.getElementById('taipart').value="";
                document.getElementById('pss').addEventListener('submit',function(e)

                {
                    taipart();
                    e.preventDefault();
                },false);

                d3.select('#taipartok').on('click', taipart)

                function taipart()
                {
                    tabTaillePart[g] = parseInt(document.getElementById('taipart').value);
                    taille = parseInt(document.getElementById('taime').value); 
                    nbPart = parseInt(document.getElementById('nbpa').value);
                 
                    if(( nbPart==0)||( document.getElementById('taipart').value==""))
                    {
                        if(document.getElementById('nbp').value==0)
                        {
                            Swal.fire("veuillez introduire le nombre de partitions")
                        }
                         if( document.getElementById('taipart').value=="")   
                        {
                            Swal.fire("veuillez introduire la taille de la partition numéro "+g)
                        }
                    }
                    else
                    {

                        console.log(g);
                        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                        console.log(nbPart);
                   
                        if (g == (nbPart-1 )) {
                  
              
                            if (tabTaillePart[g] != (taille - ancien)) {
                                
                                Swal.fire("La taille de la derniére partition doit étre égale à " + (taille - ancien))

                                tabTaillePart[g] = (taille - ancien);
                                g++;
                              text1.transition().text(g);
                                
                            }
                            else{
                                tabTaillePart[g] = (taille - ancien);
                    
                                g++;
                              text1.transition().text(g);
                             
                            }
                            parseInt(document.getElementById('taipart').disabled='true');
                            v2=true;
                        }
                         else
                          {
    
                            if ( tabTaillePart[g] >= taille - ancien) {
    
                                Swal.fire("la taille de la partition " + g + "doit étre iférieure à " + (taille - ancien));
                                Swal.fire("Veuillez entrer une nouvelle taille pour la partition " + g);
                            } else {
                                ancien = ancien + tabTaillePart[g];
                                g++;
                            }
                 
                            document.getElementById("taipart").value = "";
                      text1.transition().text(g);
                    }
                    parseInt(document.getElementById('taime').disabled='true');
                  
                    parseInt(document.getElementById('nbpa').disabled='true');
                    }

            }
                //ajout
                

            

///commencer les animations*********************************************************


function  termine()
{ 
    if(okfait==false)
    {
       
    Swal.fire({
        title: 'Terminer la simulation ',
        text: "Un bilan de la simulation s'affichera, mais vous ne pouvez plus la continuez",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "rgb(28,200,138)",
        confirmButtonText: 'Afficher le bilan',
        cancelButtonText: 'Annuler'


    }).then((result)=>{
       
            if(result.value)

            {
                if(finn==true)
                {
               okfait=true;
            d3.select("#svg2").remove();
            let head = d3.select("#card").append("div").attr("class","card-header");
                                head.append("h3").text("BILAN DE LA SIMULATION")
            let bodyC=d3.select("#card").append("div").attr("class","card-body").style("width","100%");
            bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
            $('#example').DataTable( {
                ordering: false,
                data: dataTable,
                columns: [
                    { title: "Processus"},
                    { title: "Taille (kO)" },
                    { title: "Temps (S)" },
                    { title: "Partition choisie " },
                    { title: "Taille de la partition(KO)" },
                    { title: "Bloqué " },
                ]
            })
        }
        else
        {
            okfait=true;
                    d3.select("#svg2").remove();
                    let head = d3.select("#card").append("div").attr("class","card-header");
                    head.append("h3").text("BILAN DE LA SIMULATION")
                    let bodyC=d3.select("#card").append("div").attr("class","card-body").style("width","100%");
                    bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
                    $('#example').DataTable( {
                        ordering: false,
                        data: dataTab,
                        columns: [
                            { title: "Processus"},
                            { title: "Taille (kO)" },
                            { title: "Temps (S)" },
                            { title: "Partition choisie " },
                            { title: "Taille de la partition(KO)" },
                            { title: "Bloqué " },
                        ]
                    })
        }

            /*CREATION TABLEAU*/

            let foot=d3.select("#card").append("div").attr("class","card-footer");
            let btn1=foot.append("button").attr("class","btn btn-primary btn-icon-split ").style("width","200px").style("height","40px").style("left","44%").style("position","relative").append("span").text("Introduire un scenario");
            btn1.on("click",function(){
               window.location.href="VaEtVient.html";
            })
        }
    })

    console.log(dataTable);
}
}
d3.select('#commencer').on('click', function() {
    d3.select('#terminer').on('click', termine)
   

    d3.select('#blockok').on('click', function() {
        var res=-1;
        ttt = parseInt(document.getElementById('block').value);
        //le num de psus a bloquer
        for (var z=1;z<m.tabMem.length;z++)
        {
            console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
            console.log('------------------------------------');
            console.log(m.tabMem[z]);
            console.log(m.tabMem[z].orde);
            console.log('------------------------------------');
            if(m.tabMem[z].orde==ttt)
            {
                res=z;
                console.log('yeeeeeeeeeeeeeeeeeeeeeees');
                console.log(m.tabMem[z].orde);
             
            }
        }
        if(res!=-1)
        {
            if(ttt==m.tabMem[res].orde)
            {
    
            
        p=m.tabMem[res].psus;
        p.blocPsus()
        m.tabMem[res].orde=0;
       
        
        if (tab_pri.length==0)
            {
                fp1=new Array();
                var case1 = new file_prio(p.taille,p.identificateur,p.ord,fp1);
                var i = 0;
                tab_pri[i]=case1;
                tab_pri[i].enfiler(p);
               // d.insertPsus(p);
                for(var cp=0;cp<d.tab.length;cp++)
                {
                    if((d.tab[cp].ord==p.ord)&&(d.tab[cp].etat=='actif'))
                    {
                        d.donnerPsus(cp);
                    }
                }
            }
        else
        { 
            var tmp =-1;
            var i=0;
            for(var i=0;i<tab_pri.length;i++)
                {
                    if (tab_pri[i].ident==p.identificateur)
                     {tmp = i;
                    console.log("d555555555555555alna")}
                   
                }
            if (tmp ==-1)
            {
    
                fp2=new Array();  
                var case2 = new file_prio(p.taille,p.identificateur,p.ord,fp2);
                i=tab_pri.length;
                tab_pri[i]=case2;
                tab_pri[i].enfiler(p);
            //   d.insertPsus(p);
                for(var cp=0;cp<d.tab.length;cp++)
                {
                    if((d.tab[cp].ord==p.ord)&&(d.tab[cp].etat=='actif'))
                    {
                        d.donnerPsus(cp);
                    }
                }
            }
            else
            {
                tab_pri[tmp].enfiler(p);
             //  d.insertPsus(p);
                for(var cp=0;cp<d.tab.length;cp++)
                {
                    if((d.tab[cp].ord==p.ord)&&(d.tab[cp].etat=='actif'))
                    {
                        d.donnerPsus(cp);
                    }
                }
            }
            
        }
      
        m.liberer(p.identificateur,canvas) 
        console.log("hnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(tab_pri.length)
        console.log("tab_pri")
        for(var i=0;i<tab_pri.length;i++)
        {
            console.log('------------------11111111111111111111111111111111111111------------------');
            console.log(tab_pri[i].ident);
            console.log(tab_pri[i].file_p);
            console.log('------------------------------------');
        }
    }
    else
    {
        Swal.fire('ce processus n est pas dans la mémoire');
    }}
    
    else
    {
        Swal.fire('ce processus n est pas dans la mémoire');
    }
    })
     ///debloquer
    d3.select('#dblockok').on('click',async function() {
    var res=0;
    ttt = parseInt(document.getElementById('dblock').value);
    
    /*  for (var z=1;z<m.tabMem.length;z++)
    {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        console.log('------------------------------------');
        console.log(m.tabMem[z].psus.ord);
        console.log('------------------------------------');
        if(m.tabMem[z].psus.ord==ttt)
        {
            res=z;
            console.log('yeeeeeeeeeeeeeeeeeeeeeees');
            console.log(m.tabMem[z].psus.ord);
         
        }
    }*/
    
    var tmp=-1;
    let ll=-1;
    ///  console.log(tab_pri.length);
    for(var i=0;i<tab_pri.length;i++)
        {
           console.log('--------4444444444444444----------------------------');
            console.log(tab_pri[i].orde);
            console.log('------------------------------------');
           
            for(var w=0;w<tab_pri[i].file_p.length;w++)
            {
    
                if(tab_pri[i].file_p[w].ord==ttt)
                { 
                    tmp = i;
                    ll=tab_pri[i].ident;
                console.log("zzzzzzzzzzzzzzzzzzzzz44444444444444444444444")
            var p0=tab_pri[i].file_p[w];
           tab_pri[i].file_p.splice(w)
    
                }
            }
            /*if ((tab_pri[i].orde==ttt)&&(tab_pri[i].file_p!=null))
            {tmp = i;
                console.log("zzzzzzzzzzzzzzzzzzzzz44444444444444444444444")
            var p0=tab_pri[i].defiler();}*/
        }
    if (tmp==-1)
    {Swal.fire("ce processus n'est pas blouqué")}
    else
    {
        res=p0.identificateur;
        if (m.tabMem[ll].psus==null)
        {
    
            p0.debloquer_psus();
            for (var f=0;f<d.tab.length;f++)
            {
                if (d.tab[f].identificateur==p0.identificateur)
                {
                    var n=f;
                    break;
                }
            }
            p1 = d.donnerPsus(n)
            m.inserer(p0,p0.identificateur,canvas)
            d.insertPsus(p0)
        }
        else///il y a un psus à ça place 
        {
            //blockage
            console.log('-----------blockage---------------le else ------------------');
            p=m.tabMem[ll].psus;
            m.liberer(p.identificateur,canvas) 
            await sleep(6000);
            p0.debloquer_psus();
         
            var n=0;
            for (var f=0;f<d.tab.length;f++)
            {
                if (d.tab[f].identificateur==p0.identificateur)
                {
                    var n=f;
                    break;
                }
            }
            p1 = d.donnerPsus(n)
           
            m.inserer(p0,p0.identificateur,canvas)
            d.insertPsus(p0)
    
    
    
    
    
            p.blocPsus()
            m.tabMem[p0.identificateur].orde=0;
            p.blocPsus1()
            if (tab_pri.length==0)
                {
                    fp1=new Array();
                    var case1 = new file_prio(p.taille,p.identificateur,p.ord,fp1);
                    var i = 0;
                    tab_pri[i]=case1;
                    tab_pri[i].enfiler(p);
                   // d.insertPsus(p);
                }
            else
            { 
              
                var tmp =-1;
                for(var i=0;i<tab_pri.length;i++)
                    {
                        if (tab_pri[i].ident==p.identificateur)
                        tmp = i;
                        break;
                    }
                if (tmp ==-1)
                {
                    fp2=new Array();  
                    var case2 = new file_prio(p.taille,p.identificateur,p.ord,fp2);
                    i=tab_pri.length;
                    tab_pri[i]=case2;
                    tab_pri[i].enfiler(p);
                   // d.insertPsus(p);
                }
                else
                {
                    tab_pri[tmp].enfiler(p);
                    //d.insertPsus(p);
                }
               
                
                
               
            }
           
         
          
    
    
        }
    
    }
    
    })
      d3.select('#ajoutok').on('click', function() {
      
                            t = parseInt(document.getElementById('taips1').value);
                            t1 = parseInt(document.getElementById('tmps1').value);
        if((t<=0) ||(t1<=0))
        {
            if(t<=0)
            {
                Swal.fire("la taille doit etre supérieur à 0,veuillez reintroduire les attributs")
            }
            if(t1<=0)
            {
                Swal.fire("le temps doit etre supérieur à 0,veuillez reintroduire les attributs")
            }
        }
        else
        {
           // tabtai[v] = t;
          //  tabtem[v] = t1;
           
            v++;
            //tee.transition().text(v);
        }
        document.getElementById("taips").value = "";
        document.getElementById("tmps").value = ""; 
        nombrep=nombrep+1;       
        tee1.transition().text(nombrep);    
      
        
       
     
            p=new Prosseecus(t,t1,-1,nombrep)
            d.insertPsus(p)
        
        
        
        /////////////////////////////////////////////////////////
        
        /////////////////////////////////////////
       /* console.log(d.tab)// une fonction pour lire et insere ds le disque
        var i=0
        var cpt =0;///afin de tester sur un seul proc
        var n=0;
        var clock= setInterval(async function(){
            
            if(d.tab.length!=0)
            {
                if(n>d.tab.l&ength-1)
                {
                    n=0;
                }
                 var p= d.tab[n];
                 if ((p.taille<=max)&&(p.etat=="pret"))
                 {
                    var panim=canvas.append("rect").attr("width",45).attr("height",45).attr("fill","blue")
                    .attr("x",450).attr("y",350)
                    txtanim = canvas.append("text").attr("x",451).attr("y",361)
                    .text(p.taille +" ko")
                    txanim = canvas.append("text").attr("x",451)
                    .attr("y",381).text(p.temps +" s")
                    var r=m.recherche(p,canvas)
                    console.log('------------rechhhhhhhhhhhhh------------------------');
                    console.log(r);
                    console.log('------------------------------------');
        
                if(r!=-1)
                {  
                panim.transition().duration(2000).delay(3000).attr("x",700).attr("y",180).transition().remove().duration(1000)
                txtanim.transition().duration(2000).delay(3000).attr("x",701).attr("y",191).transition().remove().duration(1000)
                txanim.transition().duration(2000).delay(3000).attr("x",701).attr("y",211).transition().remove().duration(1000)
                await sleep(3500)
                    var p = d.donnerPsus(n)
                    m.inserer(p,r,canvas)
                    p.lancer_procssecus();
                    i++;
                }
                else{
                    n++;
                }
            }
            else
            {
                n++;
                if(p.taille>max)
                {
                Swal.fire("la taille de ce processus est supérieur à la taille de toutes les partitions de la mémoire ")
                var p = d.donnerPsus()
                panim.transition().remove().duration(1000)
                txtanim.transition().remove().duration(1000)
                txanim.transition().remove().duration(1000)
            }}
               
                   
                }
            
             if((d.tab.length==0)&&(i!=0))
             {
                 clearInterval(20000)
             }
        },5000)
        var clock = setInterval(function() {
           
            var t=85
            var rect=canvas.append("rect").attr("x",375).attr("y",75).attr("width",400).attr("height",90).attr("fill","#EFF0F5")
            for(var i=1;i<m.tabMem.length;i++)
            { 
                if(m.tabMem[i].etat == "occupé")
                {
                   m.tabMem[i].psus.temps--;
                  var text=canvas.append("text").text(m.tabMem[i].identificateur).attr("x",420).attr("y",t)
                  .attr("font-size",16).attr("font-family","monospace").attr("fill","black")
                  var txt=canvas.append("text").text(m.tabMem[i].psus.temps).attr("x",520).attr("y",t)
                  .attr("font-size",16).attr("font-family","monospace").attr("fill","black")
                  var tia=canvas.append("text").text(m.tabMem[i].psus.taille).attr("x",620).attr("y",t)
                  .attr("fill","black").attr("font-size",16).attr("font-family","monospace")
        
                  t=t+20
                  if( m.tabMem[i].psus.temps==0)
                  {
                    m.liberer(i,canvas)
                  }
                }     
            }        
        },1000)
        
        //////disk
        
        /////////////////////////////////////////////////////////////////
        
       
        .on('click',function(){
            console.log(d.tab)
            ec2.transition().attr("fill","blue")  
            ec2.transition().delay(4000).attr("fill","#857575")
            var re=canvas.append("rect").attr("width",200).attr("height",30).attr("fill","#D6CFD2").attr("x",80).attr("y",300).attr("ry",6)
            var t1=canvas.append("text").text("le contenu du disque dur").attr("fill","black").attr("x",85).attr("y",320).attr("font-size",14).attr("font-family","monospace")
            re.transition().attr("fill","#EFF0F5").delay(7000)
            t1.transition().attr("fill","#EFF0F5").delay(7000)
            var ln=canvas.append("line").attr("x1",30).attr("y1",370).attr("x2",350).attr("y2",370).attr("stroke","#0C0101").attr("stroke-width",5)
            .attr("stroke","#0C0101").attr("stroke-width",2)
            var tx2=canvas.append("text").text("id").attr("x",50).attr("y",360).attr("fill","#EF6060").attr("font-size",16)
            tx2.transition().attr("fill","#EFF0F5").delay(7000)
            ln.transition().attr("stroke","#EFF0F5").delay(7000)
            var tx1=canvas.append("text").text("temps (s)").attr("x",100).attr("y",360).attr("fill","#EF6060").attr("font-size",16)
            tx1.transition().attr("fill","#EFF0F5").delay(7000)
            var tx2=canvas.append("text").text("taille (ko)").attr("x",200).attr("y",360).attr("fill","#EF6060").attr("font-size",16)
            tx2.transition().attr("fill","#EFF0F5").delay(7000)
            var tx2=canvas.append("text").text("état").attr("x",300).attr("y",360).attr("fill","#EF6060").attr("font-size",16)
            tx2.transition().attr("fill","#EFF0F5").delay(7000)
            var ty=390
            var cachdisk=canvas.append("rect").attr("x",45).attr("y",375).attr("fill","#EFF0F5").attr("height",200).attr("width",350)
            for(var i=0;i<d.tab.length;i++)
            {
                var id=canvas.append("text").text(d.tab[i].identificateur).attr("x",60).attr("y",ty).attr("fill","black")
                var taips=canvas.append("text").text(d.tab[i].taille).attr("x",210).attr("y",ty).attr("fill","black")
                var temp=canvas.append("text").text(d.tab[i].temps).attr("x",110).attr("y",ty).attr("fill","black")
                var et=canvas.append("text").text(d.tab[i].etat).attr("x",300).attr("y",ty).attr("fill","black")
               
                taips.transition().attr("fill","#EFF0F5").delay(7000)
                temp.transition().attr("fill","#EFF0F5").delay(7000)
                et.transition().attr("fill","#EFF0F5").delay(7000)
                id.transition().attr("fill","#EFF0F5").delay(7000)
                ty=ty+20
            }    
          })*/
    
          })
   
    console.log('------------------------------------');
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111111111111');
    console.log('------------------------------------');
    if((v1==true)&&(v2==true))
    {
        commencer=true;
    }
    else
    {
        if ((v1==false)&&(v2==false))
        {
              Swal.fire('Introduisez les informations du processus et des partitions')
        }
        if (v1==false)
        {
            Swal.fire('Introduisez les informations du processus')
        }
        if(v2==false)
        { 
            Swal.fire('Introduisez les informations du partition')
        }
    }
  
    if(commencer)
    {
        document.getElementById("block").removeAttribute("disabled");
        document.getElementById("blockok").removeAttribute("disabled");
        document.getElementById("dblock").removeAttribute("disabled");
        document.getElementById("dblockok").removeAttribute("disabled");
        document.getElementById("taips1").removeAttribute("disabled");
        document.getElementById("tmps1").removeAttribute("disabled");
        
        document.getElementById("ajoutok").removeAttribute("disabled");
   fen.remove()
   com.remove()
  //  d3.select("#flech").append();
                    var canvas= d3.select("#svg2")//.append("svg")//.attr("width",1500).attr("height",631)
                    d3.select("body").transition().style("background-color","#EFF0F5");
                    //entete table des psus


var lin=canvas.append("line").attr("x1",292).attr("y1",32).attr("x2",497).attr("y2",32).attr("stroke","#0C0101").attr("stroke-width",1.5)
var t=canvas.append("text").text("processus").attr("x",300).attr("y",27).attr("fill","#EF6060").attr("font-size",14).attr("fill","black")
var t=canvas.append("text").text("temps").attr("x",390).attr("y",27).attr("fill","#EF6060").attr("font-size",14).attr("fill","black")
var t=canvas.append("text").text("taille").attr("x",450).attr("y",27).attr("fill","#EF6060").attr("font-size",14).attr("fill","black")

/////////////////entete de la table d'etat
 var re=canvas.append("rect").attr("width",190).attr("height",25).attr("fill","#B0EFC1").attr("x",170).attr("y",-17).attr("ry",6)
 var t1=canvas.append("text").text("Table d'état").attr("fill","black").attr("x",220).attr("y",-3).attr("font-size",14).attr("font-family","monospace")
 //entet table etat
 var lin=canvas.append("line").attr("x1",48).attr("y1",32).attr("x2",283).attr("y2",32).attr("stroke","#0C0101").attr("stroke-width",1.5)
  var entidtxt = canvas.append("text").attr("x",50).attr("y",27).text("id").attr("fill","black").attr("font-size",14)
  var entidtxt = canvas.append("text").attr("x",85).attr("y",27).text("@debut").attr("fill","black").attr("font-size",14)
  var entidtxt = canvas.append("text").attr("x",160).attr("y",27).text("taille").attr("fill","black").attr("font-size",14)
  var entidtxt = canvas.append("text").attr("x",240).attr("y",27).text("état").attr("fill","black").attr("font-size",14)
 //initialiser le os
 var rec=canvas.append("rect").attr("width",150).attr("height",40).attr("fill",'pink').attr("x",800).attr("y",0)
.attr("ry",6)
 var tc=canvas.append("text").text("Systéme d'éxploitation").attr("x",810).attr("y",32).attr("fill","black").attr("font-size",11).attr("font-family","monospace")
 /////////////////////////////////
   

    


///rech_max

for (var z=0; z<tabTaillePart.length;z++)
{
    if (max <  tabTaillePart[z])
    {
        max = tabTaillePart[z]
    }

} 
 //main
 m1 = new Memory(taille,25,nbPart,tabTaillePart, canvas)
 m=m1;
d1 = new DisqDur(nombrep,canvas)
d=d1;
for(var i=0;i<nombrep;i++)
{
    p=new Prosseecus(tabtai[i],tabtem[i],-1,i+1)
    d.insertPsus(p)
    dataTab.push([d.tab[i].ord,d.tab[i].taille,d.tab[i].tm,0,0,d.tab[i].bb])
}


/////////////////////////////////////////////////////////

/////////////////////////////////////////

console.log(d.tab)// une fonction pour lire et insere ds le disque
var i=0
var cpt =0;///afin de tester sur un seul proc
var n=0;
var clock= setInterval(async function(){
    
    if(d.tab.length!=0)
    {
        if(n>d.tab.length-1)
        {
            n=0;
        }
         var p= d.tab[n];
         if ((p.taille<=max)&&(p.etat=="pret"))
         {
            var r=m.recherche(p,canvas)
            pause=0;
           
          
         
            console.log('----------INESSSSSSSSSS-----------------------');
            console.log(r);
            console.log('------------------------------------');

        if(r!=-1)
        {  
            var panim=canvas.append("rect").attr("width",51).attr("height",51).attr("fill","rgba(109, 191, 216, 0.664)").attr("ry",6)
            .attr("x",450).attr("y",350)
            tdd = canvas.append("text").attr("x",451).attr("y",361)
            .text(r).attr("fill","black")
            txtanim = canvas.append("text").attr("x",451).attr("y",381)
            .text(p.taille +" ko").attr("fill","black")
            txanim = canvas.append("text").attr("x",451)
            .attr("y",401).text(p.temps +" s").attr("fill","black")
           //montrer la partition choisie
          /*  flou1 =  canvas.append('rect')
            .attr('height',3000)
            .attr('width',3000)
            .attr('x',-100)
            .attr('y',0)
            .attr('fill','white')*/
            ///////////////
            flou =  canvas.append('rect')
            .attr('height',3000)
            .attr('width',3000)
            .attr('x',-100)
            .attr('y',-200)
            .attr('fill','transparent')
            .style('visibility','hidden' );
 fenetre = canvas.append('rect')
                .attr('height',400)
                .attr('width',500)
                .attr('x',250)
                .attr('y',0)
                .attr('fill','transparent')
                .style('visibility','hidden' );
 ////////////////////////////
 
            afficheFenFifo(0);
            a=new afficheurRecherche(canvas)
            a.remplissage(m,p,r,canvas)
       //  flou1.transition().delay(7000).remove()
            
            await sleep(5000)
            cacherFen();
        panim.transition().duration(2000).delay(3000).attr("x",700).attr("y",180).transition().remove().duration(1000)
        txtanim.transition().duration(2000).delay(3000).attr("x",701).attr("y",211).transition().remove().duration(1000)
        txanim.transition().duration(2000).delay(3000).attr("x",701).attr("y",231).transition().remove().duration(1000)
        tdd.transition().duration(2000).delay(3000).attr("x",701).attr("y",191).transition().remove().duration(1000)
        await sleep(3000)
            var p = d.donnerPsus(n)
            m.inserer(p,r,canvas)
            p.lancer_procssecus();
            d.insertPsus(p)
            i++;
        }
        else{
           
            n++;
        }
    }
    else
    {
        n++;
        if(p.taille>max)
        {
       Swal.fire("la taille de ce processus est supérieur à la taille de toutes les partitions de la mémoire ")
        var p = d.donnerPsus()
        panim.transition().remove().duration(1000)
        txtanim.transition().remove().duration(1000)
        txanim.transition().remove().duration(1000)
    }}
       
          pause=1; 
        }
        
    
     if((d.tab.length==0)&&(i!=0))
     {
         clearInterval(20000)
     }
},10000)
var clock = setInterval(function() {
   
        console.log(d.tab)
       /// ec2.transition().attr("fill","blue")  
        
         
     
    if (pause==1)
    { 
     
    var t=47
    if(rrrr==0)
        {
        var re=canvas.append("rect").attr("width",200).attr("height",30).attr("fill","#B0EFC1").attr("x",90).attr("y",230).attr("ry",6)
        var t1=canvas.append("text").text("le contenu du disque dur").attr("fill","black").attr("x",95).attr("y",250).attr("font-size",14).attr("font-family","monospace")
       
        var ln=canvas.append("line").attr("x1",30).attr("y1",285).attr("x2",350).attr("y2",285).attr("stroke","#0C0101").attr("stroke-width",5)
        .attr("stroke","#0C0101").attr("stroke-width",1.5)
        var tx2=canvas.append("text").text("id").attr("x",50).attr("y",275).attr("font-size",14).attr("fill","black")
       
        var tx1=canvas.append("text").text("temps (s)").attr("x",100).attr("y",275).attr("fill","black").attr("font-size",14)
       
        var tx2=canvas.append("text").text("taille (ko)").attr("x",200).attr("y",275).attr("fill","black").attr("font-size",14)
    
        var tx2=canvas.append("text").text("état").attr("x",300).attr("y",275).attr("fill","black").attr("font-size",14)
    rrrr++;    
    }
        var ty=305
       var cachdisk=canvas.append("rect").attr("x",30).attr("y",290).attr("fill","white").attr("height",300).attr("width",350)
        for(var i=0;i<d.tab.length;i++)
        {
            var id=canvas.append("text").text(d.tab[i].ord).attr("x",60).attr("y",ty).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
           
            var taips=canvas.append("text").text(d.tab[i].taille).attr("x",210).attr("y",ty).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
            var et=canvas.append("text").text(d.tab[i].etat).attr("x",300).attr("y",ty).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
           
            if(d.tab[i].etat=='actif')
           {
            var temp=canvas.append("text").text(d.tab[i].temps-1).attr("x",110).attr("y",ty).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
           
           }
           else{
            var temp=canvas.append("text").text(d.tab[i].temps).attr("x",110).attr("y",ty).attr("fill","black").attr("font-size",14).attr("font-family","monospace")
           }
           
            ty=ty+20
        } 
    ///var rect=canvas.append("rect").attr("x",375).attr("y",75).attr("width",400).attr("height",90).attr("fill","white")
    for(var i=1;i<m.tabMem.length;i++)
    { 
        if(m.tabMem[i].etat == "occupé")
        {
           m.tabMem[i].psus.temps--;
           var rect=canvas.append("rect").attr("x",300).attr("y",t-10).attr("width",200).attr("height",20).attr("fill","white")
          var text=canvas.append("text").text(m.tabMem[i].psus.ord).attr("x",320).attr("y",t)
          .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
          var txt=canvas.append("text").text(m.tabMem[i].psus.temps).attr("x",400).attr("y",t)
          .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
          var tia=canvas.append("text").text(m.tabMem[i].psus.taille).attr("x",460).attr("y",t)
          .attr("fill","black").attr("font-size",14).attr("font-family","monospace")

      
          if( m.tabMem[i].psus.temps==0)
          {
            var rect=canvas.append("rect").attr("x",300).attr("y",t-10).attr("width",200).attr("height",20).attr("fill","white")
            dataTable.push([m.tabMem[i].psus.ord,m.tabMem[i].psus.taille,m.tabMem[i].psus.tm,m.tabMem[i].identificateur,m.tabMem[i].taille,m.tabMem[i].psus.bb])
            finn=true
            for(var cp=0;cp<d.tab.length;cp++)
           {
               if(d.tab[cp].ord==m.tabMem[i].psus.ord)
               {
                   d.donnerPsus(cp);
               }
           }
            m.liberer(i,canvas)
           
          }
        
        }  
  t=t+20;
    }
}        
},1000)

}
})
 
}