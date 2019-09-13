let dataTable=[]
class meth_allo
{
    constructor (processSize,blockSize,num_methode)
    {
       this.processSize=processSize;//psus esl la liste des taille des prossecus
       this.blockSize=blockSize;//psus esl la liste des taille libre 
       this.num_methode=num_methode;
      /// this.alloca=alloca;
    }
   
   
	 bestFit( ) 
	{ 
        var m = this.blockSize.length; 
        ///var n = this.processSize.length;
		
		this.alloca = -1; 
		
			var bestIdx = -1; 
			for (var j=0; j<m; j++) //block
			{ 
				if (this.blockSize[j] >= this.processSize) 
				{ 
					if (bestIdx == -1) 
						bestIdx = j; 
					else if (this.blockSize[bestIdx] > this.blockSize[j]) 
						bestIdx = j; 
				} 
			} 
			if (bestIdx != -1) 
			{ 
			// Reduce available memory in this block. 
            this.blockSize[bestIdx] -= this.processSize; 
            this.alloca=bestIdx;
			} 
    } 
    firsrFit()
    {
        var m = this.blockSize.length;
        this.alloca = -1; 
      
          for (var j = 0; j < m; j++) 
          { 
            if (this.blockSize[j] >= this.processSize) 
            { 
                  this.alloca = j; 
                  this.blockSize[j] -= this.processSize; 

                break; 
            } 
           } 
    }
    worstFit()
    {
        var m = this.blockSize.length; 
		this.alloca=-1;
			var worstIdx = -1; 
			for (var j=0; j<m; j++) //block
			{ 
				if (this.blockSize[j] >= this.processSize) 
				{ 
					if (worstIdx == -1) 
						worstIdx = j; 
					else if (this.blockSize[worstIdx] < this.blockSize[j]) 
						worstIdx = j; 
				} 
			} 
			if (worstIdx != -1) 
			{ 
				this.alloca = worstIdx; 
        	// Reduce available memory in this block. 
				this.blockSize[worstIdx] -= this.processSize; 
            } 
    
    }
    nextFit()
    {
        var m = this.blockSize.length; 
        this.alloca=-1;
        var  j = 0;
        var cpt =0;
       // Do not start from beginning 
            while (j < m) { 
  
                if (this.blockSize[j] >=this.processSize) { 
  
                    this.alloca= j; 
                    this.blockSize[j] -= this.processSize; 
  
                    break; 
                }
                if (cpt == m)
                break ;
  
                // mod m will help in traversing the blocks from 
                // starting block after we reach the end.  
                j = (j + 1) % m;
                cpt++; 
                console.log(j);
            }      
    }
 

 }
 class Listes{
    constructor()
    {
        this.liste= new Array()
        this.NBR=0
        this.i=0;
    }
    insert(adr_debut , taille,  etat, identificateur, psus)
     {
         this.liste[this.i]= new Partition(adr_debut , taille,  etat, identificateur, psus);
        return (this.i++);
         
     }
     libererIden(identi)// pour supp ds les listes occupées
     {
         var j=0
         var trouv="faux"
         while ((j<this.liste.length) && (trouv=="faux"))
         {
    
             if(this.liste[j].identificateur==identi)
             {
                
                 trouv="vrai"
                 this.liste.splice(j,1);
             }
             j++;
         }

         if(this.i==1)
         {
            this.liste[this.i-1]=null
         }
         return this.i--;
         
         
     }
    
     
}
class Prosseecus{
    constructor (tai,temps,canvas,pc,id)
    {  var tabclr=[8] 
        tabclr[7]="#CADBEA"
        tabclr[6]="#9FC4E5"
        tabclr[5]="#65A6E1"
        tabclr[4]="#2385DE"
        tabclr[3]="#BBDEFB"
        tabclr[2]="#039BE5"
        tabclr[1]="#01579B"
        tabclr[0]="#160A47"
        tabclr[3]="pink"
        this.tai=tai;
        this.id=id
        this.np=0;
        if(pc>7)
        {
            pc=0
        }
        this.temps=temps;//en seconde 
        this.temps_fin=0;//temps du systeme 
        this.etat="pret";
        this.psu = canvas.append("rect").attr("width",45).attr("height",45)
        .attr("fill",tabclr[pc]).attr("x",203).attr("y",408).attr("ry",6)
        this.txtid = canvas.append("text").attr("x",213).attr("y",425).attr("fill","black")
        .text(this.id).attr("font-size",13)
        this.txttai = canvas.append("text").attr("x",213).attr("y",435).attr("fill","black")
        .text(this.tai +" ko").attr("font-size",13)
        this.txttem = canvas.append("text").attr("x",213).attr("fill","black")
        .attr("y",445).text(this.temps +" s").attr("font-size",13)
        
      
    }

}
class File{
       
    constructor(nbr_psus,file_vide,file_pleine,maFile,canvas)
    {
        this.file_pleine=file_pleine;
        this.file_vide=file_vide;
        this.nbr_psus=nbr_psus;
        this.maFile= new Array();
        var lin=canvas.append("line").attr("x1",150).attr("y1",405).attr("x2",600).attr("y2",405).attr("stroke","#0C0101").attr("stroke-width",2)
       var lin1=canvas.append("line").attr("x1",150).attr("y1",455).attr("x2",600).attr("y2",455).attr("stroke","#0C0101").attr("stroke-width",2)
       var fi=canvas.append("text").text("La file").attr("x",250).attr("y",400).attr("fill","black").attr("font-size",20)
       this.x=550
       
    }
    enfiler(psus)
    {
      this.maFile.push(psus);//inserer ds la derniere case de tableau
      psus.psu.transition().delay(2000).duration(1000).attr("x",this.x)//.attr("fill","grey")
      psus.txttai.transition().delay(2000).duration(1000).attr("x",this.x+2)
      psus.txttem.transition().delay(2000).duration(1000).attr("x",this.x+2)
      psus.txtid.transition().delay(2000).duration(1000).attr("x",this.x+2)
      this.x=this.x-47
      //psus.psu.remove()
    }
    defiler()
    {
        var p = this.maFile.shift()
        p.psu.transition().attr("x",710).transition().attr("y",408).transition().delay(2000).attr("fill","white")
        p.txttai.transition().attr("x",713).transition().attr("y",435).transition().delay(2000).attr("fill","white")
        p.txttem.transition().attr("x",713).transition().attr("y",445).transition().delay(2000).attr("fill","white")
        p.txtid.transition().attr("x",713).transition().attr("y",425).transition().delay(2000).attr("fill","white")
        this.x=this.x+47;
        var pos=550;
        for(var i=0;i<this.maFile.length;i++)
        {
            this.maFile[i].psu.transition().attr("x",pos)
            this.maFile[i].txttai.transition().attr("x",pos+2)
            this.maFile[i].txtid.transition().attr("x",pos+2)
            this.maFile[i].txttem.transition().attr("x",pos+2)
            pos=pos-47;
        }
        // p.psu.remove().duration(2000)
        return p;
       // this.x=this.x+49;

    }
    defiler1()
    {
        return this.maFile.shift()
    }
    }
class Partition {

    constructor ( adr_debut , taille,  etat, identificateur, psus)
    {
        this.adr_debut=adr_debut;
        this.taille=taille;
        this.etat=etat;
        this.identificateur=identificateur
        this.psus=psus
    }
}
class Memoire
{
    constructor(tail,taiOs,canvas)
    {
        this.mem = new Array()
       var os = new Prosseecus(taiOs,200,canvas)
       os.psu.remove()
       os.txttai.remove()
       os.txttem.remove()
        this.mem[0] = new Partition(0, taiOs,"occupé",0, os)
        this.mem[1] = new Partition(taiOs, tail-taiOs,"libre", 1 , null)
        this.listeLibre = new Listes();
        this.listeOccupe = new Listes()
        this.listeLibre.insert( taiOs, tail-taiOs,"libre", 1 , null)
        this.listeLibre.NBR++
        this.listeOccupe.insert(0, taiOs,"occupé",0, os)
        this.listeOccupe.NBR++
        this.nbrPartition=1;
        this.tail=tail;
      //la 1ere partition libre
   var lib = canvas.append("rect").attr("x",60).attr("y",30).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
      var txtlib1=canvas.append("text").attr("x",40).attr("y",30+15).text("("+this.listeLibre.liste[0].identificateur+")").attr("fill","black")
      var txtlib2=canvas.append("text").attr("x",81).attr("y",30+10).text("adr_debut: "+this.listeLibre.liste[0].adr_debut).attr("fill","black")
      .attr("font-size",11)
      var txtlib3=canvas.append("text").attr("x",81).attr("y",30+25).text("taille: "+this.listeLibre.liste[0].taille).attr("fill","black")
     .attr("font-size",11)
        //memory
        var part = canvas.append("rect").attr("width",150).attr("height",this.mem[1].taille*400 / tail ).attr("fill","#B0EFC1").attr("x",800).attr("y",41)
        .attr('rx',4).attr('ry',4).attr("stroke","white")
    var tp1=canvas.append("text").text(this.mem[1].identificateur).attr("y",94).attr("x",950).attr("fill","black").attr("font-size",14)
    }
    insertMemory(ps,identificateur,canvas ) //j'ai besoin surtout de sa taille et l'identificateur de la partition ou je vais ineserer le psus
    {
        
         var t=this.mem[identificateur].taille
         
         if(t-ps.tai==0)
         {
            this.mem[identificateur].taille=ps.tai;
            this.mem[identificateur].etat="occupé"
            this.mem[identificateur].psus=ps;
        }
         else
         {
            this.mem[identificateur].taille=t-ps.tai;
            
            // le decalage
         
         var i=identificateur+1
         var j=this.mem.length
         while (j>i)
         {
            this.mem[j]=this.mem[j-1];
            j=j-1;
           
         }
         
         this.mem[identificateur+1]= new Partition(this.mem[identificateur].taille+this.mem[identificateur].adr_debut, ps.tai,"occupé",identificateur+1, ps)
        
         for(var j=identificateur+2;j<this.mem.length;j++)
         {
             this.mem[j].identificateur++;
           
         }
        }
        for(var j=0;j<this.mem.length;j++)
        {
            this.mem[j].identificateur=j
        }
          
    this.nbrPartition++ ;
    var y=41
    var l=0
    var o=0
    var yp=64
    var cach=canvas.append("rect").attr("x",950).attr("y",64).attr("width",10).attr("height",400).attr("fill","white")
      
    for(var j=1;j<this.mem.length;j++)
    {
        if(this.mem[j].etat=="occupé")
        {
            this.listeOccupe.liste[o]=this.mem[j]
            o++;
            var part = canvas.append("rect").attr("width",150).attr("height",this.mem[j].taille*400 / this.tail ).attr("fill","#009D8E").attr("stroke","pink").attr("x",800).attr("y",y)
            .attr('rx',4).attr('ry',4).attr("stroke","white")
            
        }
        else{
            if(this.mem[j].etat=="libre")
            {
                this.listeLibre.liste[l]=this.mem[j]
                l++;
                var part = canvas.append("rect").attr("width",150).attr("height",this.mem[j].taille*400 / this.tail ).attr("fill","#B0EFC1").attr("x",800).attr("y",y)
                .attr('rx',4).attr('ry',4).attr("stroke","white")
            }
            
        }
        var tp1=canvas.append("text").text(this.mem[j].identificateur).attr("y",yp).attr("x",950).attr("fill","black").attr("font-size",14)
        
        yp=yp+this.mem[j].taille *400 / this.tail +1
       y=y+this.mem[j].taille*400 / this.tail +1
        this.listeLibre.NBR=l
        this.listeOccupe.NBR=o

    }
    }
    libererMemory(identi,canvas)
    {
        if(identi==this.mem.length-1)
        {
            if(this.mem[identi-1].etat=="libre")
            {
                this.mem[identi-1].taille=this.mem[identi-1].taille+this.mem[identi].taille
                this.mem.splice(identi,1)
            }
            else
            {
                this.mem[identi].etat="libre"
            }
        }
        else
        {
            
            if((this.mem[identi-1].etat=="occupé") && (this.mem[identi+1].etat=="occupé"))
            {
                this.mem[identi].etat="libre"
            }
            else
            {
                if((this.mem[identi-1].etat=="libre") && (this.mem[identi+1].etat=="occupé"))
                {
                    this.mem[identi-1].taille=this.mem[identi-1].taille+this.mem[identi].taille
                    this.mem.splice(identi,1)
                    //decalage identificateur memoire
                    var j=identi
                    while(j<this.mem.length)
                    {
                        this.mem[j].identificateur--
                        j++
                    }
                   
                }
                else
                {
                if((this.mem[identi+1].etat=="libre") && (this.mem[identi-1].etat=="occupé"))
                 {
                    this.mem[identi+1].taille=this.mem[identi+1].taille+this.mem[identi].taille
                    this.mem.splice(identi,1)
                    //decalage identificateur
                    var j=identi
                    while(j<this.mem.length)
                    {
                        this.mem[j].identificateur--
                        j++
                    }
                    }
                 else
                 {
                     if((this.mem[identi+1].etat=="libre") && (this.mem[identi-1].etat=="libre"))
                      {
                         this.mem[identi-1].taille=this.mem[identi-1].taille+this.mem[identi].taille+this.mem[identi+1].taille
                        this.mem.splice(identi,2)
                        var j=identi
                        
                        while(j<this.mem.length)
                         {
                            
                            this.mem[j].identificateur=this.mem[j].identificateur-2
                            j++
                         }
                        

                      }
                 }
                }
            }
        }
        for(var j=0;j<this.mem.length;j++)
        {
            this.mem[j].identificateur=j
        }
        var o=0
        var l=0
        var y=41
        var yp=64
       var cach=canvas.append("rect").attr("x",950).attr("y",75).attr("width",10).attr("height",400).attr("fill","white")
       //await sleep(3000) 
        for(var j=1;j<this.mem.length;j++)
        {
            if(this.mem[j].etat=="occupé")
            {
                this.listeOccupe.liste[o]=this.mem[j]
                o++;
                var part = canvas.append("rect").attr("width",150).attr("height",this.mem[j].taille*400 / this.tail ).attr("fill","#009D8E").attr("stroke","pink").attr("x",800).attr("y",y)
                .attr('rx',4).attr('ry',4).attr("stroke","white")
                
            }
            else{
                if(this.mem[j].etat=="libre")
                {
                    this.listeLibre.liste[l]=this.mem[j]
                    l++;
                    var part = canvas.append("rect").attr("width",150).attr("height",this.mem[j].taille*400 / this.tail ).attr("fill","#B0EFC1").attr("x",800).attr("y",y)
                    .attr('rx',4).attr('ry',4).attr("stroke","white")
                }
                
            }
            var tp1=canvas.append("text").text(this.mem[j].identificateur).attr("y",yp).attr("x",950).attr("fill","black").attr("font-size",14)
            yp=yp+this.mem[j].taille*400 / this.tail +1
            y=y+this.mem[j].taille*400 / this.tail +1
            this.listeLibre.NBR=l
            this.listeOccupe.NBR=o
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
       for(var j=0;j<m.listeLibre.NBR;j++)
       {
           if(j==i)
            {
                canvas.append("rect").attr("x",270).attr("y",i*25+135).attr("width",40).attr("height",20).attr("fill",'red')
                .attr("rx",3).attr("ry",3)
                .transition().delay(5000).remove()
                canvas.append("rect").attr("x",315).attr("y",i*25+135).attr("width",80).attr("height",20).attr("fill",'red')
                .attr("rx",3).attr("ry",3)
                .transition().delay(5000).remove()
            }
           canvas.append("text").text(m.listeLibre.liste[j].identificateur)
            .attr("x",283).attr("y",y).attr("fill",'black').attr("font-size",13)
           .transition().delay(5000).remove()
           canvas.append("text").text(m.listeLibre.liste[j].taille)
      .attr("x",325).attr("y",y).attr("fill",'black').attr("font-size",13)
     .transition().delay(5000).remove()
     y=y+25;
     //les textes
     canvas.append("text").text("le processus P"+ps.id+" de taille "+ps.tai+" ko")
     .attr("fill",'white').attr("font-size",15).attr("x",450).attr("y",150)
     .transition().delay(5000).remove()
     canvas.append("text").text("la partition choisie est la partition numero "+m.listeLibre.liste[i].identificateur)
     .attr("fill",'white').attr("font-size",14).attr("x",425).attr("y",200)
     .transition().delay(5000).remove()
     canvas.append("text").text("car elle représente le plus grand espace libre ")
     .attr("fill",'white').attr("font-size",14).attr("x",425).attr("y",230)
     .transition().delay(5000).remove()
     canvas.append("text").text("pouvant contenir ce processus ")
     .attr("fill",'white').attr("font-size",14).attr("x",445).attr("y",260)
     .transition().delay(5000).remove()

       }
    }
    
   
}
window.onload=function(){
    var eff=true;
    var effa="true"
    var bilan=true
    document.getElementById("tai").disabled='true';
    document.getElementById("pss").disabled='true';
    document.getElementById("taips").disabled='true';
    document.getElementById("tmps").disabled='true';
    document.getElementById("taips1").disabled='true';
    document.getElementById("tmps1").disabled='true';
    
    var k2=0;
    var k1=0; 
    let fen;
    let com;
    senarioF();
    function afficheFenFifo(delay)
    {
        flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
        fenetre.attr('fill','transparent').attr('y',-400).style('visibility','visible');
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
    function senarioF()
    {
    document.getElementById("taips").removeAttribute("disabled")
    document.getElementById("tmps").removeAttribute("disabled")
    document.getElementById("pss").removeAttribute("disabled")
    document.getElementById("tai").removeAttribute("disabled")

    let canvas = d3.select("#svg2");
//liste occupé
var re1=canvas.append("rect").attr("width",150).attr("height",25).attr("fill","#B0EFC1").attr("x",230).attr("y",0).attr("ry",6)
         
var tx2=canvas.append("text").text("Les partitions occupés").attr("x",233).attr("y",15).attr("fill","black").attr("font-size",12).attr("font-family","monospace")

//liste libre
var re1=canvas.append("rect").attr("width",150).attr("height",25).attr("fill","#B0EFC1")
.attr("x",40).attr("y",0).attr("ry",6)
var tx2=canvas.append("text").text("Les partitions libres").attr("x",45).attr("y",15).attr("fill","black").attr("font-size",12).attr("font-family","monospace")

//initialiser le os
var rec=canvas.append("rect").attr("width",150).attr("height",40)
.attr("fill",'pink').attr("x",800).attr("y",0)
.attr("ry",6)
var tc=canvas.append("text").text("Systéme d'éxploitation").attr("x",810).attr("y",22).attr("fill","black").attr("font-size",11).attr("font-family","monospace")
//entete table des psus
var re=canvas.append("rect").attr("width",150).attr("height",25).attr("fill","#B0EFC1").attr("x",545).attr("y",00).attr("ry",6)
var tx=canvas.append("text").text("Table de processus").attr("x",555).attr("y",15).attr("fill","black").attr("font-size",12).attr("font-family","monospace")
var lin=canvas.append("line").attr("x1",520).attr("y1",55).attr("x2",720).attr("y2",55).attr("stroke","black").attr("stroke-width",2)
var t=canvas.append("text").text("n partition").attr("x",520).attr("y",45).attr("fill","#EF6060").attr("font-size",13)
var t=canvas.append("text").text("id psus").attr("x",600).attr("y",45).attr("fill","#EF6060").attr("font-size",13)
var t=canvas.append("text").text("temps(s)").attr("x",670).attr("y",45).attr("fill","#EF6060").attr("font-size",13)

/////////////////////
maFile=new Array()
 var pause=1 
 var retar=1
ess = new File(5,"faux","faux",maFile,canvas)
////////////////////////
fen = canvas.append("rect").attr("x", -400).attr("y", -400).attr("width", 2000).attr("height", 2000).attr("fill", "#DEE6FA").style("opacity", 0.8).attr("id", "fen");
com = canvas.append("image").attr("x", 340).attr("y", 100).attr("height", 280).attr("width", 280).attr("href", 'img/commencer2.png').attr("id", "commencer").style("cursor", "pointer");

 
///////////////////////////////




 let taille=0;
 let nbP=0;
 let tabtai=[];
 let tabtem=[];
 var i=0;
 var k=0;
 let wow=8;
 var pc=0
 var id=0
 var re1=d3.select("#cpt").append("text").text(i);
 var re2=d3.select("#cpt2").append("text").text(i);
 var r=1
 d3.select('#psok').on('click',function(){
    nbP=parseInt(document.getElementById('pss').value);
   taille=parseInt(document.getElementById('tai').value);

   // document.getElementById("tai").value = "";
    k1++;
    if(k1==1)
    {
        document.getElementById("pss").disabled = "true";
        document.getElementById("tai").disabled = "true";
    } 
    var t=parseInt(document.getElementById('taips').value);
var t1=parseInt(document.getElementById('tmps').value);
if((document.getElementById('taips').value=="") ||(document.getElementById('tmps').value==""))
{
    Swal.fire("vous devez saisir la taille et le temps de ce processus")
}
else{
if((t<=0)||(t1<=0))
{ 
    if(t1<=0)
    {
        Swal.fire("le temps doit etre supérieur à 0 ,veuillez reintroduire les attributs ")
    }
    if(t<=0)
    {
        Swal.fire("la taille doit etre supérieure à 0 ,veuillez reintroduire les attributs ")
    }
   
}
else {
        tabtai[i]=t;
        tabtem[i]=t1;
        i++;
        k2++;
        re2.transition().text(i)
        re1.transition().text(i)
        if(i==nbP)
        {
            document.getElementById("taips").disabled='true';
            document.getElementById("tmps").disabled='true';
            

        }
        
}

          document.getElementById("taips").value = "";
          document.getElementById("tmps").value = "";}
     
})

 d3.select('#commencer').on('click',function(){
    d3.select("#terminer").on('click',function()
    {
        effa="true"
        termine()});
   
    if((taille!= 0)&(nbP==tabtai.length))
    {
        fen.remove()
        com.remove()
      
        if(k2==0)
        {
            Swal.fire("on peut pas commencer l'animation, vous n'avez introduit aucun processus")
        }
        else{
         // d3.select("body").transition().style("background-color","white");
          m=new Memoire(taille,0,canvas)
         
          var x=3;
         for(var i=0;i<nbP;i++)
         {
             ps=new Prosseecus(tabtai[i],tabtem[i],canvas,pc,id)
           
            ess.enfiler(ps) 
            if(pc==3)
            {
                pc=0;
            }
            pc++
            id++
         }
        var k=0;
        var tai=0
        var i =1;
     
       
        var car=0
        var nn=0
         var clock = setInterval(async function() {
             
           
         nn++;
            if(nn>1)
            {
                car=0
                for(var i=0;i<10000000;i++)
                {}
            }
              if(ess.maFile.length>9)
              {
               document.getElementById("taips1").disabled='true';
               document.getElementById("tmps1").disabled='true';
              }
              else{
               document.getElementById("taips1").removeAttribute("disabled")
               document.getElementById("tmps1").removeAttribute("disabled") 
              }
               
                if(ess.maFile.length>0)
                {
                    
                       var p = ess.maFile[0] 
                       var proo=p.tai
                       if (proo>taille)
                       {
                           p=ess.defiler();
                           Swal.fire("la taille de ce processus est supérieur à la taille de la mémoire ")
                       }
                      else
                      {
                     var lst = new Array()
               for (var i=0;i<m.listeLibre.NBR;i++)
               {
   
                   lst[i]=m.listeLibre.liste[i].taille;
                    }
                     var met = new meth_allo(proo,lst,2)
                     
               met.worstFit()
               
               if (met.alloca != -1)
               {pause=0
                  
                   var proo=p.tai
                   var hh = m.listeLibre.liste[met.alloca].identificateur
                 
                   ///////////////
                   flou =  canvas.append('rect')
                   .attr('height',3000)
                   .attr('width',3000)
                   .attr('x',-100)
                   .attr('y',0)
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
                   a.remplissage(m,p,met.alloca,canvas)
               // flou1.transition().delay(5000).remove()
                   
                   await sleep(5000)
                   cacherFen();
                   p = ess.defiler()
                   await sleep(1500)
                   m.insertMemory(p,hh,canvas)
                   dataTable.push([
                    "P"+p.id,p.tai+" (Ko)",p.temps+" (S)",m.listeLibre.liste[met.alloca].taille+" (Ko)"                            ])
                
               l=0;
                    ///afficher la liste libre
                       var y=30
                       var carre=canvas.append("rect").attr("x",20).attr("y",25).attr("rx",4).attr("ry",4).attr("width",400).attr("height",300).attr("fill","white")
                         for(var i=0;i<m.listeLibre.NBR;i++)
                       {
                         var lib = canvas.append("rect").attr("x",60).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
                          var txtlib1=canvas.append("text").attr("x",30).attr("y",y+15).text("("+m.listeLibre.liste[i].identificateur+")").attr("fill","black")
                          var txtlib2=canvas.append("text").attr("x",71).attr("y",y+10).text("adr_debut: "+m.listeLibre.liste[i].adr_debut)
                          .attr("fill","black").attr("font-size",11)
                          var txtlib3=canvas.append("text").attr("x",71).attr("y",y+25).text("taille: "+m.listeLibre.liste[i].taille).attr("fill","black").attr("font-size",11)
                           y=y+35
                       }
                       
                       ///afficher la liste occupé
                       var y=30
                       for(var i=0;i<m.listeOccupe.NBR;i++)
                       {
                          var lib = canvas.append("rect").attr("x",250).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
                         var txtlib1=canvas.append("text").attr("x",220).attr("y",y+15).text("("+m.listeOccupe.liste[i].identificateur+")")
                         .attr("fill","black")
                         var txtlib2=canvas.append("text").attr("x",260).attr("y",y+10).text("adr_debut: "+m.listeOccupe.liste[i].adr_debut)
                         .attr("font-size",11).attr("fill","black")
                          var txtlib3=canvas.append("text").attr("x",260).attr("y",y+25).text("taille: "+m.listeOccupe.liste[i].taille)
                          .attr("font-size",11).attr("fill","black")
                          y=y+35
                       }
                       
                      pause=1
                      console.log("rrrrrrrrrrrrrrrrrr11111111111")
                       k++
                   }
               }
                }
                else
                {
                    if((ess.maFile.length==0) && (k!=0))
                    {
                        clearInterval(20000)
                    }
                }
         
         
        
            },7000)
         
         // Loop through all processes and allocate those that require allocation. Deallocate those that have <0 time remaining
         var clock = setInterval(function() {
            // console.log("arrrrrrrrrrrrrrrrrrr"+arr)
           
             if(pause==1)
             {
                var t=70
                var rect=canvas.append("rect").attr("x",530).attr("y",59).attr("width",200).attr("height",300).attr("fill","white")
             // .transition().delay(1000).remove()
               for(var i=1;i<m.mem.length;i++)
               { 
                   if(m.mem[i].etat == "occupé")
                   {
                      m.mem[i].psus.temps--;
                      //id partition
                     var text=canvas.append("text").text(m.mem[i].identificateur).attr("x",540).attr("y",t)
                     .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
                    
                     //id psus
                     var txt=canvas.append("text").text(m.mem[i].psus.id).attr("x",620).attr("y",t)
                     .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
                     
                     //temp psus
                     var txt=canvas.append("text").text(m.mem[i].psus.temps).attr("x",690).attr("y",t)
                     .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
                    
                     t=t+20
                     if( m.mem[i].psus.temps==0)
                     {
                       //  await sleep(2000)
                       m.libererMemory(i,canvas)
                         ///afficher la liste libre
                       var y=30
                      var carre=canvas.append("rect").attr("x",20).attr("y",25).attr("rx",4).attr("ry",4).attr("width",400).attr("height",300).attr("fill","white")
                        for(var i=0;i<m.listeLibre.NBR;i++)
                      {
                        var lib = canvas.append("rect").attr("x",60).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
                         var txtlib1=canvas.append("text").attr("x",30).attr("y",y+15).text("("+m.listeLibre.liste[i].identificateur+")").attr("fill","black")
                         var txtlib2=canvas.append("text").attr("x",71).attr("y",y+10).text("adr_debut: "+m.listeLibre.liste[i].adr_debut)
                         .attr("fill","black").attr("font-size",11)
                         var txtlib3=canvas.append("text").attr("x",71).attr("y",y+25).text("taille: "+m.listeLibre.liste[i].taille).attr("fill","black").attr("font-size",11)
                          y=y+35
                      }
                      
                      ///afficher la liste occupé
  //var carre1=canvas.append("rect").attr("x",250).attr("y",49).attr("rx",4).attr("ry",4).attr("width",130).attr("height",300).attr("fill","white")
  var y=30
  for(var i=0;i<m.listeOccupe.NBR;i++)
  {
     var lib = canvas.append("rect").attr("x",250).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
    var txtlib1=canvas.append("text").attr("x",220).attr("y",y+15).text("("+m.listeOccupe.liste[i].identificateur+")")
    .attr("fill","black")
    var txtlib2=canvas.append("text").attr("x",260).attr("y",y+10).text("adr_debut: "+m.listeOccupe.liste[i].adr_debut)
    .attr("font-size",11).attr("fill","black")
     var txtlib3=canvas.append("text").attr("x",260).attr("y",y+25).text("taille: "+m.listeOccupe.liste[i].taille)
     .attr("font-size",11).attr("fill","black")
     y=y+35
  }
  
                       
                     }
                   }   
                   }
                      
             }
              
         },1000)
         
          
          function sleep(ms)
          {
           return new Promise(resolve=>setTimeout(resolve,ms))
          }}
        
    }})
d3.select('#ajoutok').on('click',function(){
        document.getElementById("taips1").removeAttribute("disabled")
        document.getElementById("tmps1").removeAttribute("disabled")
     var t=parseInt(document.getElementById('taips1').value);
   var t1=parseInt(document.getElementById('tmps1').value);
   if((document.getElementById('taips1').value=="") ||(document.getElementById('tmps1').value==""))
   {
       Swal.fire("vous devez saisir la taille et le temps de ce processus")
   }
   else{
    if((t<=0)||(t1<=0))
    { 
        if(t1<=0)
        {
            Swal.fire("le temps doit etre supérieur à 0 ,veuillez reintroduire les attributs ")
        }
        if(t<=0)
        {
            Swal.fire("la taille doit etre supérieure à 0 ,veuillez reintroduire les attributs ")
        }
       
    }
    else {
           tabtai[i]=t;
            tabtem[i]=t1;
            i++;
            k2++;
            re2.transition().text(i)
            re1.transition().text(i)
            }
      

     
     ps=new Prosseecus(t,t1,canvas,pc,id)
     ess.enfiler(ps) 
     pc++
     id++
     document.getElementById("taips1").value = "";
     document.getElementById("tmps1").value = "";
        }})

    }
    function termine()
    {
        if(bilan)
        {
            Swal.fire({
                title: 'Exemple',
                html: "Un bilan de l'animation va s'afficher si vous appuyez sur (Afficher le bilan) ",
                animation: false,
                showCancelButton : true,
                cancelButtonText: "continuer l'animation",
                showConfirmButton : true,
                confirmButtonText: 'Afficher le bilan',

              }).then((result) =>{   
      if(result.value)
      {
        d3.select("#svg2").remove();
        bilan=false;
         ////  d3.select("#chaine").remove();
        //d3.select("#footer").remove();
        let head = d3.select("#card").append("div").attr("class","card-header");
        head.append("h3").text("la taille de la mémoire est "+m.tail);
        let bodyC=d3.select("#card").append("div").attr("class","card-body").style("width","100%");
        bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
        $('#example').DataTable( {
            ordering: false,
            data: dataTable,
            columns: [
                { title: "Le processus"},
                { title: "La taille" },
                { title: "le temps d'execution" },
                { title: "La taille de la partition choisie" }
               /* { title: "nombre d'usages" },
                { title: "Ordre de chargement" },
                { title: "Case mémoire " }*/
            ]
        });
    }})}
     
    }
    function termineExemple()
    {
        Swal.fire({
            title: 'Exemple',
            html: "Un bilan de l'animation va s'afficher si vous appuyez sur (Afficher le bilan) ",
            animation: false,
            showCancelButton : true,
            cancelButtonText: "continuer l'animation",
            showConfirmButton : true,
            confirmButtonText: 'Afficher le bilan',

          }).then((result) =>{   
  if(result.value)
  {
    console.log("ici terminer exemple");
    d3.select("#svg2").remove();
    let head = d3.select("#card").append("div").attr("class","card-header");
    head.append("h3").text("la taille de la mémoire est "+m.tail);
    let bodyC=d3.select("#card").append("div").attr("class","card-body").style("width","100%");
    bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
    let footer=d3.select("#card").append("div").attr("class","card-footer")
    let btn=footer.append("button").attr("class","btn btn-primary btn-icon-split ").style("width","200px").style("height","40px").style("left","44%").style("position","relative").append("span").text("Introduire un scenario");
    btn.on('click',function(){
        bodyC.remove();
        head.remove();
        footer.remove();
        removeIlustratopn = false;
        d3.select("#card").append("svg").attr("id","svg2").attr("width",1000).style("position","relative").style("height",'550px').style("width","100%").attr("viewBox","0 0 967 460").attr("fill",'none');  
        senarioF()
    })
    bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
    $('#example').DataTable( {
        ordering: false,
        data: dataTable,
        columns: [
            { title: "Le processus"},
            { title: "La taille" },
            { title: "le temps d'execution" },
            { title: "La taille de la partition choisie" }
        ]
    });
  }})
       
    }
    ////////////////////////////////////////////////
   
    d3.select("#senario").on('click', function()
    {
        eff="true"
        senarioF()
        }) 
   
   d3.select('#exemple').on('click',function(){
    d3.select("#terminer").on("click",function(){
        termineExemple();
    })
       var effex=0
        d3.select("#illustration").remove();
        let canvas = d3.select("#svg2");
     //liste occupé
     var re1=canvas.append("rect").attr("width",150).attr("height",25).attr("fill","#B0EFC1").attr("x",230).attr("y",0).attr("ry",6)
     .attr("data-step",9).attr("data-intro","la liste des partition occupées de la mémoire ")
     var tx2=canvas.append("text").text("Les partitions occupés").attr("x",233).attr("y",15).attr("fill","black").attr("font-size",12).attr("font-family","monospace")
 
     //liste libre
     var re1=canvas.append("rect").attr("width",150).attr("height",25).attr("fill","#B0EFC1")
     .attr("x",40).attr("y",0).attr("ry",6).attr("data-step",8).attr("data-intro","la liste des partition libres de la mémoire ")
     var tx2=canvas.append("text").text("Les partitions libres").attr("x",45).attr("y",15).attr("fill","black").attr("font-size",12).attr("font-family","monospace")
  
   //initialiser le os
 var rec=canvas.append("rect").attr("width",150).attr("height",40)
 .attr("fill",'pink').attr("x",800).attr("y",0)
 .attr("ry",6)
 var tc=canvas.append("text").text("Systéme d'éxploitation").attr("x",810).attr("y",22).attr("fill","black").attr("font-size",11).attr("font-family","monospace")
 //entete table des psus
 var re=canvas.append("rect").attr("width",150).attr("height",25).attr("fill","#B0EFC1").attr("x",545).attr("y",00).attr("ry",6)
 var tx=canvas.append("text").text("Table de processus").attr("x",555).attr("y",15).attr("fill","black").attr("font-size",12).attr("font-family","monospace")
 var lin=canvas.append("line").attr("x1",520).attr("y1",55).attr("x2",720).attr("y2",55).attr("stroke","black").attr("stroke-width",2)
 var t=canvas.append("text").text("n partition").attr("x",520).attr("y",45).attr("fill","#EF6060").attr("font-size",13)
 .attr("data-step",10).attr("data-intro","le numéro de la partition ")
 var t=canvas.append("text").text("id psus").attr("x",600).attr("y",45).attr("fill","#EF6060").attr("font-size",13)
 .attr("data-step",11).attr("data-intro","l'identificateur de processus qui occupe cette partition")
 var t=canvas.append("text").text("temps(s)").attr("x",670).attr("y",45).attr("fill","#EF6060").attr("font-size",13)
 .attr("data-step",12).attr("data-intro","le temps restant avant la fin d'éxécution de processus qui est dans cette partition ")
      
 maFile=new Array()
           var pause=1 
           ess = new File(5,"faux","faux",maFile,canvas)
              var into = introJs()   
              into.onexit(function()
              {
                  Swal.fire({
                    title: 'Exemple',
                    html: "Dans cette exemple animé, les données utilisées sont : <br> - taille de la mémoire : 500 ko <br> - Nombre de processus: 3 <br> - les processus(taille,temps) :p0(120,20) , p1(520,30) , p2(70,15)",
                    animation: false,
                    showConfirmButton : true,
                    confirmButtonText: 'Commencer',

                  }).then((result) => {
                    
                    m=new Memoire(500,0,canvas)
                    
                    var x=3;
                    ps1=new Prosseecus(120,20,canvas,0,0)
                    ess.enfiler(ps1) 
                    ps2=new Prosseecus(300,30,canvas,1,1)
                    ess.enfiler(ps2) 
                    ps3=new Prosseecus(70,15,canvas,2,2)
                    ess.enfiler(ps3) 
                  
                  
                  var k=0;
                  var tai=0
                  var i =1;
               
                 
                  var car=0
                  var nn=0
                  var no=0
                   var clock = setInterval(async function() {
                       
                     
                   nn++;
                      if(nn>1)
                      {
                          car=0
                          for(var i=0;i<10000000;i++)
                          {}
                      }
      
                         
                          if(ess.maFile.length>0)
                          {
                              
                                 var p = ess.maFile[0] 
                                 var proo=p.tai
                                 if (proo>500)
                                 {
                                     p=ess.defiler();
                                     Swal.fire("la taille de ce processus est supérieur à la taille de la mémoire ")
                                 }
                                else
                                {
                               var lst = new Array()
                         for (var i=0;i<m.listeLibre.NBR;i++)
                         {
             
                             lst[i]=m.listeLibre.liste[i].taille;
                              }
                               var met = new meth_allo(proo,lst,2)
                               
                         met.worstFit()
                         
                         if (met.alloca != -1)
                         {pause=0
                            // var p = ess.defiler() 
                             var proo=p.tai
                             var hh = m.listeLibre.liste[met.alloca].identificateur
                            
                             //montrer la partition choisie
                            /* flou1 =  canvas.append('rect')
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
                             .attr('y',0)
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
                             a.remplissage(m,p,met.alloca,canvas)
                         // flou1.transition().delay(5000).remove()
                             
                             await sleep(5000)
                             cacherFen();
                             p = ess.defiler()
                             await sleep(1500)
                             m.insertMemory(p,hh,canvas)
                             dataTable.push([
                                "P"+p.id,p.tai+" (Ko)",p.temps+" (S)",m.listeLibre.liste[met.alloca].taille+" (Ko)"                            ])
                            
                             no++
                         l=0;
                              ///afficher la liste libre
                                 var y=30
                                 var carre=canvas.append("rect").attr("x",20).attr("y",25).attr("rx",4).attr("ry",4).attr("width",400).attr("height",300).attr("fill","white")
                                   for(var i=0;i<m.listeLibre.NBR;i++)
                                 {
                                   var lib = canvas.append("rect").attr("x",60).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
                                    var txtlib1=canvas.append("text").attr("x",30).attr("y",y+15).text("("+m.listeLibre.liste[i].identificateur+")").attr("fill","black")
                                    var txtlib2=canvas.append("text").attr("x",71).attr("y",y+10).text("adr_debut: "+m.listeLibre.liste[i].adr_debut)
                                    .attr("fill","black").attr("font-size",11)
                                    var txtlib3=canvas.append("text").attr("x",71).attr("y",y+25).text("taille: "+m.listeLibre.liste[i].taille).attr("fill","black").attr("font-size",11)
                                     y=y+35
                                 }
                                 
                                 ///afficher la liste occupé
                                 var y=30
                                 for(var i=0;i<m.listeOccupe.NBR;i++)
                                 {
                                    var lib = canvas.append("rect").attr("x",250).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
                                   var txtlib1=canvas.append("text").attr("x",220).attr("y",y+15).text("("+m.listeOccupe.liste[i].identificateur+")")
                                   .attr("fill","black")
                                   var txtlib2=canvas.append("text").attr("x",260).attr("y",y+10).text("adr_debut: "+m.listeOccupe.liste[i].adr_debut)
                                   .attr("font-size",11).attr("fill","black")
                                    var txtlib3=canvas.append("text").attr("x",260).attr("y",y+25).text("taille: "+m.listeOccupe.liste[i].taille)
                                    .attr("font-size",11).attr("fill","black")
                                    y=y+35
                                 }
                                 
                                pause=1
                                console.log("rrrrrrrrrrrrrrrrrr11111111111")
                                 k++
                             }
                         }
                          }
                          else
                          {
                              if((ess.maFile.length==0) && (k!=0))
                              {
                                  clearInterval(20000)
                              }
                          }
                   
                   
                  
                      },7000)
                   
                   // Loop through all processes and allocate those that require allocation. Deallocate those that have <0 time remaining
                   var clock = setInterval(function() {
                      // console.log("arrrrrrrrrrrrrrrrrrr"+arr)
                     
                       if(pause==1)
                       {
                          var t=70
                          var rect=canvas.append("rect").attr("x",530).attr("y",59).attr("width",200).attr("height",300).attr("fill","white")
                       // .transition().delay(1000).remove()
                         for(var i=1;i<m.mem.length;i++)
                         { 
                             if(m.mem[i].etat == "occupé")
                             {
                                m.mem[i].psus.temps--;
                                //id partition
                               var text=canvas.append("text").text(m.mem[i].identificateur).attr("x",540).attr("y",t)
                               .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
                              
                               //id psus
                               var txt=canvas.append("text").text(m.mem[i].psus.id).attr("x",620).attr("y",t)
                               .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
                               
                               //temp psus
                               var txt=canvas.append("text").text(m.mem[i].psus.temps).attr("x",690).attr("y",t)
                               .attr("font-size",14).attr("font-family","monospace").attr("fill","black")
                              
                               t=t+20
                               if( m.mem[i].psus.temps==0)
                               {
                                 //  await sleep(2000)
                                 m.libererMemory(i,canvas)
                                   ///afficher la liste libre
                                 var y=30
                                var carre=canvas.append("rect").attr("x",20).attr("y",25).attr("rx",4).attr("ry",4).attr("width",400).attr("height",300).attr("fill","white")
                                  for(var i=0;i<m.listeLibre.NBR;i++)
                                {
                                  var lib = canvas.append("rect").attr("x",60).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
                                   var txtlib1=canvas.append("text").attr("x",30).attr("y",y+15).text("("+m.listeLibre.liste[i].identificateur+")").attr("fill","black")
                                   var txtlib2=canvas.append("text").attr("x",71).attr("y",y+10).text("adr_debut: "+m.listeLibre.liste[i].adr_debut)
                                   .attr("fill","black").attr("font-size",11)
                                   var txtlib3=canvas.append("text").attr("x",71).attr("y",y+25).text("taille: "+m.listeLibre.liste[i].taille).attr("fill","black").attr("font-size",11)
                                    y=y+35
                                }
                                
                                ///afficher la liste occupé
            //var carre1=canvas.append("rect").attr("x",250).attr("y",49).attr("rx",4).attr("ry",4).attr("width",130).attr("height",300).attr("fill","white")
            var y=30
            for(var i=0;i<m.listeOccupe.NBR;i++)
            {
               var lib = canvas.append("rect").attr("x",250).attr("y",y).attr("rx",4).attr("ry",4).attr("width",100).attr("height",30).attr("fill","pink").attr("stroke","pink")
              var txtlib1=canvas.append("text").attr("x",220).attr("y",y+15).text("("+m.listeOccupe.liste[i].identificateur+")")
              .attr("fill","black")
              var txtlib2=canvas.append("text").attr("x",260).attr("y",y+10).text("adr_debut: "+m.listeOccupe.liste[i].adr_debut)
              .attr("font-size",11).attr("fill","black")
               var txtlib3=canvas.append("text").attr("x",260).attr("y",y+25).text("taille: "+m.listeOccupe.liste[i].taille)
               .attr("font-size",11).attr("fill","black")
               y=y+35
            }
            
                                 
                               }
                             }   
                             }
                                
                       }
                        
                   },1000)
                   
                    
                    function sleep(ms)
                    {
                     return new Promise(resolve=>setTimeout(resolve,ms))
                    }
                 })
              })
               into.start()
               if(no==3){
                effex=1
               }

        })
   d3.select('#tour').on('click',function(){
         var into=introJs()
         into.start()
   })
     d3.select("#exemple").on('mouseover',function(){
        d3.select("#exe").attr("fill","#6EC5A8");})
    d3.select("#senario").on('mouseover',function(){
            d3.select("#sen").attr("fill","#6EC5A8");
        
    })
    d3.select("#exemple").on('mouseout',function(){
        d3.select("#exe").attr("fill","#00AA71");})
    d3.select("#senario").on('mouseout',function(){
            d3.select("#sen").attr("fill","#00AA71");})
    }
