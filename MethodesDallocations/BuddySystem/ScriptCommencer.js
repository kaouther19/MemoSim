function Processus(tii,tem,idn8)
      {
         this.taille=tii;
         this.temps=tem;
         this.etat="en attante";
         this.tempsRestant=tem;
         this.idn=idn8;
         this.TaillePartionSub=0;

         this.SetTaillePartionSub=function(ppp)
         {
          this.TaillePartionSub=ppp;
         }
         this.GetTaillePartionSub=function()
         {
          return this.TaillePartionSub;
         }

         this.SetEtat = function (ett) {
         this.etat = ett;
         }
         this.GetEtat = function () {
         return this.etat ;
         }
         this.getIdntf=function() {
         return this.idn;
         }
         this.getTaille=function() {
         return this.taille;
         }
         this.setTaille=function(tai) {
         this.taille=tai;
         }
         this.SetTemps = function (ett) {
         this.temps = ett;
         this.tempsRestant=ett;
         }
         this.GetTemps = function () {
         return this.temps ;
         }
         this.SetTempsRestant = function (ett) {
         this.tempsRestant = ett;
         }
         this.GetTempsRestant = function () {
         return this.tempsRestant;}
         this.tick = function() {
           this.tempsRestant -=1;
         };
      }

function Partition(ttt)
      {
        this.head = null;
        this.taille=ttt;
        this.adresseDebut=0;
        this.adresseFin=0;
        this.etat="Libre";
        this.processus=null;
        this.indLibre=0;
        this.indMem=0;
        
        this.setEtatPartition = function (ett) 
              {
                  this.etat = ett;
             }
         this.GetEtat = function ()
           {
             return this.etat ;
           }
         this.setIndLibre=function(ind) 
            {
              this.indLibre=ind;
            }
          this.getIndLibre=function() 
            {
              return this.indLibre;
             }
          this.setIndMem=function(ind)
            {
              this.indMem=ind;
            }
           this.getIndMem=function()
             {
               return this.indMem;
             }
          this.setProcessus=function(proc)
             {
              this.processus =proc;
              }
           this.getProcessus=function()
              {
                 return this.processus;
                }
           this.getTaille=function()
              {
                return this.taille;
              }
           this.setTaille=function(tai)
              {
               this.taille=tai;
               }
           this.setAdresseDebut=function(adresse)
               {
                 this.adresseDebut=adresse;
                  this.adresseFin=adresse+this.taille;
                }
           this.getAdresseDebut=function()
             {
                return this.adresseDebut;
               }
           this.getAdresseFin=function() {
              return this.adresseFin;
                }
           this.AfficherProcessus=function()
              {
                console.log("la taille de proccesus :"+this.processus.getTaille() + " , L'etat : "+ this.processus.GetEtat()+ " , le temps :"+this.processus. GetTemps());
               }
            this.AfficherPartion=function()
              {
                console.log("adresse debut :"+this.adresseDebut+" , taille :"+this.taille+" , etat :"+this.etat," ,indice dans la memoire :"+this.indMem,", indice dans la liste libre :"+this.indLibre);
                if (this.etat=="Occuper")
                 {
                  this.AfficherProcessus();
                 }
              } 
       };

function Memoire(to) 
 {
    
    this.taille=to;
    this.ListePartitionTotal=[],
    this.getTaille=function()
          {
             return this.taille;
          }
    this.setTaille=function(taille) 
          {
             this.taille = taille;
          }
    this.getEtat=function()
          {
            return Etat;
          }
    this.setEtat=function( etat) 
          {
            this.Etat = etat;
          }
    this.getListePartitionTotal=function() 
          {
                return this.ListePartitionTotal;
          }
    this.setListePartionTotale=function(x)
           {
             this.ListePartitionTotal.push(x);
    
           }
    this.AfficherMemoire=function()
              {
                 console.log("*** L'etat de la memoire ****");
                 var k=this.ListePartitionTotal.length;
                 var i=0;
                 while (i<this.ListePartitionTotal.length)
                 {
                    console.log(" Partition n : "+i);
                    console.log("Etat :"+this.ListePartitionTotal[i].GetEtat());
                    console.log("taille :"+this.ListePartitionTotal[i].getTaille());
                    console.log("adresse debut :"+this.ListePartitionTotal[i].getAdresseDebut());
                    if (this.ListePartitionTotal[i].GetEtat()=="Occuper")
                      {
                           this.ListePartitionTotal[i].AfficherProcessus();
                      }
                    i++;

                  }
              } 
    this.SortMemoire=function()
              {
                this.ListePartitionTotal.sort(function(a,b)
                {
                  return a.getAdresseDebut()-b.getAdresseDebut();

                });
              }
    this.toString = function()
               {
                   string = "[|";
                   //block = this.head;
                   var TotaleListe=this.getListePartitionTotal();
                   var k=TotaleListe.length;
                   var i=0;

                    prefix = "";
                    suffix = "</span> |";
                    while (i<k)  {
                    if (TotaleListe[i].GetEtat()=="Libre") {prefix = "<span style='color: #01DF01;'> "} else {prefix = "<span style='color: #FF0000;'> "};
                    string += (prefix + TotaleListe[i].getTaille() + suffix);
                    i++;
                     };

                   string += "]"
                 return string;
               };
    this.repain=function()
         {
          
          memoryDiv.innerHTML = "";
          //memory2Div.innerHTML = "";
         // memory4Div.innerHTML="";


          var TotaleListe=this.getListePartitionTotal();
          var k=TotaleListe.length;
          var i=0;

                                   console.log("le k ="+k);
                                   // Create div block element
                                    divBlock = document.createElement("div");
                                    divBlock.style.height = 30+"px";
                                    divBlock.setAttribute("id", "blockSys");
                                    //divBlock.className = "blockSys";
                                    divBlock.innerHTML="Systeme d'exploitation";
                                     memoryDiv.appendChild(divBlock);


          while (i<k) {
                                   height = ((this.getListePartitionTotal()[i].getTaille()/this.taille)*93);
                                    /*if (block.fromPartition) {
                                                     height += (memControlBlockSize/heap.size)*100;
                                                             };*/

                                     // Create div block element
                                    divBlock = document.createElement("div");
                                    divBlock.style.height = (height + "%");
                                    divBlock.setAttribute("id", "block");
                                    if (this.getListePartitionTotal()[i].GetEtat()=="Libre") {divBlock.className = "available"} else {divBlock.className = "unavailable"};
                                     memoryDiv.appendChild(divBlock);

                                     // Add size label
                                     // TODO: Show process details on mouse over
                                    blockLabel = document.createElement("div");
                                    blockLabel.setAttribute("id", "blockLabel");
                                     //blockLabel.style.height = (height + "%");
                                     
                                    blockLabel.innerHTML =this.getListePartitionTotal()[i].getTaille() + "K";
                                   /* if (height <= 2) {
                                          blockLabel.style.display = "none";
                                     };*/
                                    divBlock.appendChild(blockLabel);



                                    blockNumPartition = document.createElement("div");
                                    blockNumPartition.setAttribute("id", "blockNumPartition");
                                     //blockLabel.style.height = (height + "%");
                                     buddy.RecherchePartionMemoire(this.getListePartitionTotal()[i]);
                                    blockNumPartition.innerHTML =this.getListePartitionTotal()[i].getIndMem();
                                   /* if (height <= 2) {
                                          blockLabel.style.display = "none";
                                     };*/
                                    divBlock.appendChild(blockNumPartition);








                                    /*div2Block = document.createElement("div");
                                    div2Block.style.height = (height + "%");
                                    div2Block.setAttribute("id", "block2");

                                     memory2Div.appendChild(div2Block);*/
                                     height2=12;

                                     MarginTTop = (height2*100)/height;

                                     block2Label = document.createElement("div");
                                    block2Label.setAttribute("id", "block2Label");
                                    block2Label.style.visibility= "hidden";
                                   
                                    
                                  

                                     if (this.getListePartitionTotal()[i].GetEtat()=="Occuper")
                                      {
                                        

                                        block2Label.innerHTML="<p>Taille de processus : "+this.getListePartitionTotal()[i].getProcessus().getTaille()+"K"+"</p><p> Temps d'execution : "+this.getListePartitionTotal()[i].getProcessus().GetTemps()+"</p>";
                                        //div2Block.appendChild(block2Label);
                                        divBlock.appendChild(block2Label);

                                        var leftTime=TotaleListe[i].getProcessus().GetTemps();

                                        divTempsRestant= document.createElement("div");
                                        divTempsRestant.setAttribute("id", "temRes"+leftTime);
                                        divTempsRestant.innerHTML="<p>Temps Restant : "+this.getListePartitionTotal()[i].getProcessus().GetTempsRestant()+"</p>";
                                        block2Label.appendChild(divTempsRestant);
                                      }
                                      
                                    
                                    if (height <= 2) {
                                          block2Label.style.display = "none";
                                     };
                                      //div2Block.appendChild(block2Label);
                                      

                                     i++;
                                 };
         }    
    
    this.refreshTable=function()
        {
          var GeneralListe=this.getListePartitionTotal();
          var T=GeneralListe.length;
          var j=0;
           while (j<T) 
           {   
               if (this.getListePartitionTotal()[j].GetEtat()=="Occuper")
            {
            document.getElementById("temRes"+this.getListePartitionTotal()[j].getProcessus().GetTemps()).innerHTML ="Temps Restant : "+ this.getListePartitionTotal()[j].getProcessus().GetTempsRestant();
            document.getElementById("process2" + this.getListePartitionTotal()[j].getProcessus().getIdntf() + "timeLeft").innerHTML=this.getListePartitionTotal()[j].getProcessus().GetTempsRestant();
            buddy.RecherchePartionMemoire(this.getListePartitionTotal()[j]);
            document.getElementById("process2" + this.getListePartitionTotal()[j].getProcessus().getIdntf() + "NbPart").innerHTML=this.getListePartitionTotal()[j].getIndMem();
            }
            j++;
           } 
         
         }
 }        

function CalculeTailleConvenable(p)
             {
                var  m=p.getTaille();
                var n=Math.ceil(Math.log(m)/Math.log(2.0));
                var k=Math.pow(2.0,n);
                return k;
              }       
function CalculeNbSub(TM,TC)
             {
               var r=0;
               var tal=TM;
               while (tal!=TC)
               {
                tal=tal/2;
                r++;
               }
                return r;
              }                

function BuddySystem(mem)
    {
           this.memoire=mem;
           this.AdresseDDebut=0;
           this.ListePartitionLibre=[];
           this.setMemoire=function(memo)
             { this.memoire=memo;
             }
           this.setAdresseDDebut=function(adresse)
             {
             this.adresseDDebut=adresse;
              }
           this.getAdresseDDebut=function() {
              return this.AdresseDDebut;
              }
           this.getListePartitionLibre=function() {
              return this.ListePartitionLibre;
              }
           
           this.RecherchePartition=function(taille )
             {
              var test=false;
              var k=this.ListePartitionLibre.length;
              var i=0;
              var bol=false;
              while ((i<k)&&(bol==false))
              {
                if(this.ListePartitionLibre[i].getTaille()==taille)
                  {
                    test=true;
                    bol=true;
                  }
                i++;
                }
                return test;
             }
           this.RecherchePartitionOCCUPERconv=function(taille ) /// elle cherche dans la memoire si la partition convenable est occuper
             {
              /*var testB=false;
              var k=this.memoire.getListePartitionTotal().length;
              var i=0;
              var bol=false;
              while ((i<k)&&(bol==false))
              {
                if((this.memoire.getListePartitionTotal()[i].getTaille()==taille)&&(this.memoire.getListePartitionTotal()[i].GetEtat()=="Occuper"))
                  {
                    testB=true;
                    bol=true;
                  }
                i++;
                }*/

                var k = this.ListePartitionLibre.length;
                 var i = 0;
                 var testC=false;
                 var Bol = false;
                 while ((Bol == false)&&(taille < this.memoire.getTaille()+1))
                  {
                     i = 0;
                     while ((i < k) && (Bol == false))
                     {
                       if (this.ListePartitionLibre[i].getTaille() == taille)
                        {
                           Bol=true;
                           testC=true;
                        }
                      i++;
                    }
                      if (Bol == false) {
                       taille = taille * 2;
                         }
                   }

                    /*if(((testC==true)&&( testB==true))||((testB==false)&&(testC==true)))
                      {
                         testB=false; 
                       }
                       else{
                        testB=true;
                     } 
                     if(testC==false)
                       { 
                        testB =true;
                       }*/



                return testC;
             }    
           this.RecherchePartition2=function(taille,partition)
              {

                 var k = this.ListePartitionLibre.length;
                 var i = 0;
                 var Bol = false;
                 while ((Bol == false)&&(taille < this.memoire.getTaille()+1))
                  {
                     i = 0;
                     while ((i < k) && (Bol == false))
                     {
                       if (this.ListePartitionLibre[i].getTaille() == taille)
                        {
                           Bol=true;
                        }
                      i++;
                    }
                      if (Bol == false) {
                       taille = taille * 2;
                         }
                   }
                  partition=this.ListePartitionLibre[i-1];
                  console.log("la taille de partition en recherch 2 :"+partition.getTaille());
                 partition.setIndLibre(i);
                 return partition;
              }  
           this.RecherchePartitionLibreTaille=function( partition)
              {
                var k=this.ListePartitionLibre.length;
                var i=0;
                var stop=false;
                var r=1;
                while ((r!=0)&&(i<k))
                   {
                     if(this.ListePartitionLibre[i].getTaille()==partition.getTaille())
                   {
                    r=0;
                   }
                   i++;
                   }
                 partition.setIndLibre(i-1);
             }
           this.RecherchePartitionMemoireTaille=function(partition)
             {
               var k=this.memoire.getListePartitionTotal().length;
               var i=0;
               var stop=false;
               while ((i<k)&&(stop==false))
               {
                 if ((memoire.getListePartitionTotal()[i].getTaille()==partition.getTaille())&&(memoire.getListePartitionTotal()[i].GetEtat()=="Libre"))
                 {
                   stop=true;
                 }
                 i++;
                }
               partition.setIndMem(i-1);
             } 
           this.Allocation=async function(partition3)
              {  
                var part=partition3;
                this.memoire.setEtat("Occuper");
                this.RecherchePartitionMemoireTaille(part);
                this.RecherchePartitionLibreTaille(part);
                var L=part.getIndMem();
                part.setIndMem(L);
                part.setIndLibre(part.getIndLibre());
                console.log("Allocation indice dans memoire :"+part.getIndMem());
                console.log("Allocation indice dans Liste Libre :"+part.getIndLibre());

                 AfficherBoiteDialogue("Le Proceeus doit etre inséré dans la partition numéro : "+part.getIndMem());
                 await sleep(4000);

                 if((L-1)>-1)
                 {
                   //partition.setAdresseDebut(memoire.getListePartitionTotal()[L-1].getAdresseFin()+1);
                   part.setAdresseDebut(memoire.getListePartitionTotal()[L-1].getAdresseFin());
                 }
                 else {
                  //partition.setAdresseDebut(this.getAdresseDebut());
                  part.setAdresseDebut(this.getAdresseDDebut());
                 }
                //partition.getProcessus().SetEtat("active");
                part.getProcessus().SetEtat("active");
                part.setEtatPartition("Occuper");
                //this.memoire.getListePartitionTotal().splice(part.getIndMem(), 1, part);
                this.memoire.getListePartitionTotal()[part.getIndMem()]=part;
                this.ListePartitionLibre.splice(part.getIndLibre(),1);
                addProcessToTable(part.getProcessus(),part.getIndMem());
              }
           this.RecherchePartitionListeLibre=function(partition)
               {
                 var k=this.ListePartitionLibre.length;
                 var i=0;
                 var stop=false;
                 var r=1;
                 while ((r!=0)&&(i<k))
                 {
                   if(this.ListePartitionLibre[i].getAdresseDebut()==partition.getAdresseDebut())
                   {
                     r=0;
                   }
                  i++;
                  }
                   partition.setIndLibre(i-1);    
               }   
           this.RecherchePartionMemoire=function( partition)
                {
                   var k=this.memoire.getListePartitionTotal().length;
                   var i=0;
                   var stop=false;
                   while ((i<k)&&(stop==false))
                   {
                     if (this.memoire.getListePartitionTotal()[i].getAdresseDebut()==partition.getAdresseDebut())
                       {
                         stop=true;
                       }
                    i++;
                   }
                   partition.setIndMem(i-1);
                }
           this.Reorganisation= async function(taille,partition9)
             {
                  var i=1;
                  var ok=false;
                  //partition9=new Partition(0);
                 // partition9=this.RecherchePartition2(taille,partition9);// donne la partition la plus grande a la taille convenable 
                  
                  if (partition9.getTaille()<taille)
                  {
                     ok=true;
                  }

                  AfficherBoiteDialogue("La partition qui sera subdivisée est de taille : "+partition9.getTaille()+" (K) de numéro :"+partition9.getIndMem());
                  await sleep(3500);

                  console.log(" la taille de la :"+partition9.getIndMem());
                  console.log("Reorganisation 1 -- indice dans memoire :"+partition9.getIndMem());
                  console.log("Reorganisation 1 -- indice dans Liste Libre :"+partition9.getIndLibre());      
                  /*this.RecherchePartionMemoire(partition); //  recherche selon l'adresse debut
                  this.RecherchePartitionListeLibre(partition);*/
                if (ok==false) 
                 {
                

                  this.RecherchePartitionLibreTaille(partition9);
                  this.RecherchePartitionMemoireTaille(partition9);
                  var L=partition9.getIndMem();
                  var M=partition9.getIndLibre();

                  console.log("Reorganisation 1 -- indice dans memoire :"+L);
                  console.log("Reorganisation 1 -- indice dans Liste Libre :"+M); 
                  var tai=0;//la taille de la partition en subdivision
                  var n=partition9.getTaille();
                  console.log("la taille de la partition en subdivision est :"+n); 
                  var p1=partition9;
                  if (n>taille)
                  {
                  while ((taille != n))
                  {
                    console.log("******* dans la boucle ****");
                     n=n/2;
                     partition1=new Partition(n);
                     partition1.setAdresseDebut(p1.getAdresseDebut());
                     partition1.setEtatPartition("Libre");
                     var partition2=new Partition(n);
                     partition2.setAdresseDebut(p1.getAdresseDebut()+n);
                     partition2.setEtatPartition("Libre");
                     this.memoire.getListePartitionTotal().splice(L,1,partition1);
                     this.memoire.getListePartitionTotal().splice(L+1,0,partition2);
                     this.ListePartitionLibre.splice(M,1,partition1);
                     this.ListePartitionLibre.push(partition2);
                     p1=partition1;
                     this.memoire.repain();
                     buddy.repainLibre();
                     await sleep(1500);

                  }
                }
              }
             }
           this.AffichierPartitionLibre=function()
              {
                
                this.ListePartitionLibre.sort(function(a,b)
                {
                  return a.getAdresseDebut()-b.getAdresseDebut();

                });
                  console.log("*** Les partitions Libres ****");
                  var k=this.ListePartitionLibre.length;
                  var i=0;
                  while (i<k)
                  {
                       console.log(" Partition n : "+i);
                       console.log("Etat :"+this.ListePartitionLibre[i].GetEtat());
                       console.log("taille :"+this.ListePartitionLibre[i].getTaille());
                       console.log("adresse debut :"+this.ListePartitionLibre[i].getAdresseDebut());
                          i++;
                  }

              }  
           this.SortListePartitionLIbres=function()
              {
                return this.ListePartitionLibre.sort(function(a,b)
                {
                  return a.getAdresseDebut()-b.getAdresseDebut();

                });
              }
           this.Liberation2=async function(j1)
             {     
                        removeProcessFromTable(this.memoire.getListePartitionTotal()[j1].getProcessus());
                        this.memoire.getListePartitionTotal()[j1].setEtatPartition("Libre");
                        this.memoire.getListePartitionTotal()[j1].setProcessus(null);
                        this.ListePartitionLibre.push(this.memoire.getListePartitionTotal()[j1]);
                        
                        this.Fusion4(j1);

                        memoire.repain(); 
                        buddy.repainLibre();
                        await sleep(1500);

                        var oui9=0;
                             while (oui9<memoire.getListePartitionTotal().length) 
                                 {   
                                    if (memoire.getListePartitionTotal()[oui9].GetEtat()=="Libre")
                                     {
                                         
                                     //var verification=buddy.Fusion3(oui);
                                     var verification=buddy.Fusion4(oui9);
                                      if (verification==true)
                                        {
                                          memoire.repain(); 
                                          buddy.repainLibre(); 
                                          memoire.refreshTable();
                                          await sleep(1500);

                                        }
                                      }
                                    oui9++;
                                  }

                                  var oui2020=0;
                             //ici on prend bcp de temps
                             while (oui2020<memoire.getListePartitionTotal().length) 
                                 {   
                                    if (memoire.getListePartitionTotal()[oui2020].GetEtat()=="Libre")
                                     {
                                     var verification=buddy.Fusion4(oui2020);
                                     if (verification==true)
                                        {
                                          memoire.repain(); 
                                          buddy.repainLibre(); 
                                          memoire.refreshTable();
                                          await sleep(1500);
                                        } 
                                      }                           
                                    oui2020++;
                                  }
                                  /*memoire.repain(); 
                                          buddy.repainLibre(); 
                                          memoire.refreshTable();
                                          await sleep(1500);*/
                                   
             }  
          this.Fusion3=function(s5)
               {  
                var onAfusioner=false;
                   console.log("{{{{avant le fusion {{{{");
                      this.memoire.AfficherMemoire();
                      this.AffichierPartitionLibre();

                       console.log("{{{{///////////////////////// {{{{");
                    
                 var i=Math.log(this.memoire.getListePartitionTotal()[s5].getAdresseDebut())/Math.log(2.0);
                 if (this.memoire.getListePartitionTotal()[s5].getAdresseDebut()==0)
                    {
                      var companiant=s5+1;
                    }else
                    {
                        if (i==Math.ceil(i))
                          {
                           var  companiant=s5+1;
                          }
                          else
                          {
                           var   companiant=s5-1;
                          }
                      }
                      if (companiant==this.memoire.getListePartitionTotal().length) {companiant=s5-1;}
                      
                      if (companiant >-1)
                      {
                      if (this.memoire.getListePartitionTotal()[companiant].getTaille()!=this.memoire.getListePartitionTotal()[s5].getTaille())
                          {
                            if (s5>companiant)
                            {
                              companiant=s5+1;
                            }
                            else{
                              companiant=s5-1;
                            }
                          }
                         } 


                        if (s5+1!=this.memoire.getListePartitionTotal().length){
                          if (s5-1 > -1)
                          {
                           if((this.memoire.getListePartitionTotal()[s5-1].GetEtat()=="Libre")&&(this.memoire.getListePartitionTotal()[s5+1].GetEtat()=="Libre")&&(this.memoire.getListePartitionTotal()[s5-1].getTaille()==this.memoire.getListePartitionTotal()[s5+1].getTaille())) 
                            {
                              companiant=s5-1;
                            }
                          }
                       }

                       console.log("s5 = "+s5);
                      console.log("companiant = "+companiant);
                 if (companiant >-1)
                 {
                  if (companiant!=this.memoire.getListePartitionTotal().length)
                  {

                   if((this.memoire.getListePartitionTotal()[companiant].GetEtat()=="Libre")&&(this.memoire.getListePartitionTotal()[companiant].getTaille()==this.memoire.getListePartitionTotal()[s5].getTaille()))  
                     {
                        if (s5<companiant)
                           {
                            console.log(" &&&&& cas 1 &&&&&7");
                             this.memoire.getListePartitionTotal()[s5].setTaille(this.memoire.getListePartitionTotal()[s5].getTaille()*2);
                             this.RecherchePartitionListeLibre(this.memoire.getListePartitionTotal()[companiant]);
                             var M4=this.memoire.getListePartitionTotal()[companiant].getIndLibre();
                             this.ListePartitionLibre.splice(M4,1);
                             //this.ListePartitionLibre[M4].setTaille(this.memoire.getListePartitionTotal()[s5].getTaille());
                             //this.ListePartitionLibre[M4].setAdresseDebut(this.memoire.getListePartitionTotal()[s5].getAdresseDebut());
                             this.memoire.getListePartitionTotal().splice(companiant, 1);
                             onAfusioner=true;
                            }
                          else
                           { 
                            console.log(" &&&&& cas 2 &&&&&7");

                            this.RecherchePartitionListeLibre(this.memoire.getListePartitionTotal()[s5]);
                             var L=this.memoire.getListePartitionTotal()[s5].getIndLibre();
                              console.log("la valeur de  L : "+L);
                             this.ListePartitionLibre.splice(L,1);



                             this.RecherchePartitionListeLibre(this.memoire.getListePartitionTotal()[companiant]);
                             var M=this.memoire.getListePartitionTotal()[companiant].getIndLibre();
                             console.log("la valeur de  M : "+M);
                             console.log(" la taille de partition : "+this.ListePartitionLibre[M].getTaille());
                             //var t8=this.ListePartitionLibre[M].getTaille()*2;

                             //this.ListePartitionLibre[M].setTaille(t8);

                             

                             this.memoire.getListePartitionTotal()[companiant].setTaille(this.memoire.getListePartitionTotal()[companiant].getTaille()*2);
                             this.memoire.getListePartitionTotal().splice(s5,1);
                             onAfusioner=true;
                           }
                      }
                     }   
                    }  

                      console.log("{{{{Apres le fusion {{{{");
                     this.AffichierPartitionLibre();
                     return onAfusioner;


               } 
          this.Fusion4=function(s6)
            {
                var  companiant;
                 var i=Math.log(this.memoire.getListePartitionTotal()[s6].getAdresseDebut())/Math.log(2.0);
                 
                        if ((i==Math.ceil(i))&(s6%2)==0)
                          {
                             companiant=s6+1;
                          }else
                          {
                             if ((i!=Math.ceil(i))&(s6%2)==0)
                              {
                                 companiant=s6-1;
                              }else
                              {
                                if ((i==Math.ceil(i))&(s6%2)!=0)
                                 {
                                    companiant=s6-1;
                                 }else
                                   {
                                    if ((i!=Math.ceil(i))&(s6%2)!=0)
                                        {
                                          companiant=s6-1;
                                        }
                                   }

                              } 
                          }

                          console.log("s6 = "+s6);
                          console.log("companiant = "+companiant);


                  if ((companiant>-1)&&( companiant<this.memoire.getListePartitionTotal().length)){
                     if((this.memoire.getListePartitionTotal()[companiant].GetEtat()=="Libre")&&(this.memoire.getListePartitionTotal()[companiant].getTaille()==this.memoire.getListePartitionTotal()[s6].getTaille()))  
                     {
                        if (s6<companiant)
                           {
                            console.log(" &&&&& cas 1 &&&&&7");
                             this.memoire.getListePartitionTotal()[s6].setTaille(this.memoire.getListePartitionTotal()[s6].getTaille()*2);
                             this.RecherchePartitionListeLibre(this.memoire.getListePartitionTotal()[companiant]);
                             var M4=this.memoire.getListePartitionTotal()[companiant].getIndLibre();
                             this.ListePartitionLibre.splice(M4,1);
                             //this.ListePartitionLibre[M4].setTaille(this.memoire.getListePartitionTotal()[s5].getTaille());
                             //this.ListePartitionLibre[M4].setAdresseDebut(this.memoire.getListePartitionTotal()[s5].getAdresseDebut());
                             this.memoire.getListePartitionTotal().splice(companiant, 1);
                             onAfusioner=true;
                            }
                          else
                           { 
                            console.log(" &&&&& cas 2 &&&&&7");

                            this.RecherchePartitionListeLibre(this.memoire.getListePartitionTotal()[s6]);
                             var L=this.memoire.getListePartitionTotal()[s6].getIndLibre();
                              console.log("la valeur de  L : "+L);
                             this.ListePartitionLibre.splice(L,1);



                             this.RecherchePartitionListeLibre(this.memoire.getListePartitionTotal()[companiant]);
                             var M=this.memoire.getListePartitionTotal()[companiant].getIndLibre();
                             console.log("la valeur de  M : "+M);
                             console.log(" la taille de partition : "+this.ListePartitionLibre[M].getTaille());
                             //var t8=this.ListePartitionLibre[M].getTaille()*2;

                             //this.ListePartitionLibre[M].setTaille(t8);   

                             this.memoire.getListePartitionTotal()[companiant].setTaille(this.memoire.getListePartitionTotal()[companiant].getTaille()*2);
                             this.memoire.getListePartitionTotal().splice(s6,1);
                             onAfusioner=true;
                           }
                      }
                      }     
            }
          this.repainLibre=function()
            {
                 this.ListePartitionLibre.sort(function(a,b)
                {
                  return a.getAdresseDebut()-b.getAdresseDebut();

                });
                memory3Div.innerHTML = "";
               var TotaleListe=this.ListePartitionLibre;
               var k=TotaleListe.length;
                var i=0;

                                   console.log("le k ="+k);
                      while (i<this.ListePartitionLibre.length) {

                                    this.RecherchePartionMemoire(this.ListePartitionLibre[i]);
                                   
                                     // Create div block element
                                    div3Block = document.createElement("div");
                                    //div3Block.style.height = (height + "%");
                                    div3Block.setAttribute("id", "block3");
                                    div3Block.innerHTML="id :"+this.ListePartitionLibre[i].getIndMem()+" taille: "+this.ListePartitionLibre[i].getTaille()+"K   @: "+this.ListePartitionLibre[i].getAdresseDebut();
                                     memory3Div.appendChild(div3Block);
                                     i++;
                                 };
            }        
          this.repainNumPartition=function()
          {} 

        this.TraiterProcessus= async function(yyy)
        {
        	if (TabValeur[yyy] != null)
                     {
                          //alert("he he he  there is traitement");
                          processus=TabValeur[yyy];                               
                          var taiiCon=CalculeTailleConvenable(processus);
                          console.log("la taille convenable :"+taiiCon);
                          partition7=new Partition(taiiCon);
                          partition7.setEtatPartition("Occuper");
                          partition7.setProcessus(processus);
                          /*document.getElementById("numb2").value="";
                          document.getElementById("numb3").value="";*/
                          var test=this.RecherchePartition(taiiCon);
                          console.log("le test :"+test);
                          if (test==true)
                               {
                                      this.Allocation(partition7);
                                      await sleep(4500);
                                      memoire.repain();  
                                      buddy.repainLibre();
                                      tableauInformation[yyy].SetTaillePartionSub("Aucune");
                                      processusT=new Processus(0,0,0)
                                      processusT=TabValeur[yyy]
                                      TabValeur[yyy]=null;
                                       DisplayFile2();
                                      //addProcessToTable(processusT,i1);
                                      f++;
                              }
                          else{
                               var testTO=this.RecherchePartitionOCCUPERconv(taiiCon);//retourn true si la partition exixte dans la memoire et elle est occuper
                               console.log(" le test C = "+testTO);
                                     if (testTO==true)
                                     {
                                        var tempsAnim=1050;
                                         partition2020=new Partition(0);
                                         partition2020=this.RecherchePartition2(taiiCon,partition2020);// donne la partition la plus grande a la taille convenable
                                         //swal("la partition qui sera subdiviser est de taille "+partition2020.getTaille());
                          
                                         this.Reorganisation(taiiCon,partition2020);
                                         console.log("****** avant allocation******* :");
                                         this.memoire.AfficherMemoire();
                                         var nbSub=CalculeNbSub(partition2020.getTaille(),taiiCon)
                                         //swal("le nombre de subdiviant est :"+nbSub);
                                          var tttt=nbSub*(1500+1050)+5000;
                                         console.log("*********************** :");
                                         await sleep(tttt);
                                         tttt=0;
                                          tableauInformation[yyy].SetTaillePartionSub(partition2020.getTaille());

                                         this.Allocation(partition7);
                                          await sleep(4500);
                                         memoire.repain();  
                                         buddy.repainLibre();
                                         processusT=new Processus(0,0,0)
                                         processusT=TabValeur[yyy];
                                         TabValeur[yyy]=null;
                                          DisplayFile2();
                                          
                                          dataTable.push([
                                                         yyy,
                                                         tableauInformation[yyy].getTaille(),
                                                         CalculeTailleConvenable(tableauInformation[yyy]),
                                                         tableauInformation[yyy].GetTemps(),
                                                         tableauInformation[yyy].GetTaillePartionSub()
                  
                                                         ]);
                                          
                                         //addProcessToTable(processusT,i1);
                                         f++;
                                      }
                              }
                          this.memoire.AfficherMemoire();
                          this.AffichierPartitionLibre();

                     } 
        } 

    };
 
function TerminerSimu()
          {

            /*Swal.fire("leeeeeeeeeeee");*/

              Swal.fire({
                        title: 'Fin de la simulation ',
                        text: "Appuyez pour afficher le bilan de la simulation ",
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: "rgb(28,200,138)",
                        confirmButtonText: 'Afficher le bilan',
                        cancelButtonText: 'Annuler'
                       
                      }).then((result) => {
                        if (result.value) {
                            creerTab();
                        }
                      })



          }

function creerTab(){
            d3.select("#fenetreAnim").remove();
            let head = d3.select("#RightContainer").append("div").attr("id","infor").attr("class","card-header");
            head.append("h3").text("Le Bilan ");
            let bodyC=d3.select("#RightContainer").append("div").attr("id","FenetreTabl").attr("class","card-body").style("width","100%");
            bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
            let footer = d3.select("#RightContainer").append("div").attr("id","FoterDiv").attr("class","card-footer");
            let btn=footer.append("button").attr("class","btn btn-primary btn-icon-split ").style("width","200px").style("height","40px").style("left","44%").style("position","relative").append("span").text("Introduire un scenario");
            btn.on('click',function(){
                                    document.getElementById('FenetreTabl').remove();
                                    document.getElementById('infor').remove();
                                     document.getElementById('FoterDiv').remove();
                                    fenetre = document.createElement("div");
                                    fenetre.setAttribute("id", "fenetreAnim");
                                    fenetre.style.opacity=0.5;
                                    document.getElementById('RightContainer').appendChild(fenetre);
                                     document.getElementById("tailleMem").disabled=false;
                                     document.getElementById("nbPss").disabled=false;
                                     document.getElementById("taillePss").disabled=false;
                                     document.getElementById("tempsPss").disabled=false;
                                     document.getElementById("tailleP").disabled=true;
                                     document.getElementById("page").disabled=true;
                                     abel2=true;
                                     dataTable=null;
                                     dataTable=[];
                                     CommencerAfficher222();




            })
           $('#example').DataTable( {
                ordering: false,
                data: dataTable,
                columns: [
                    { title: "Process ID"},
                    { title: "Taille (K)" },
                    { title: "Taille convenable (K)" },
                    { title: "Temps (s)" },
                    { title: "Taille de partition subdiviser 's il existe (K)" },
                ]
            });


    }

window.onload=function(){


                                    d3.select("#senario").on('click',function(){
                                    d3.select("#illustration").remove();
                                    d3.select("#svg2").remove();

                                    fenetre = document.createElement("div");
                                    fenetre.setAttribute("id", "fenetreAnim");
                                    fenetre.style.opacity=0.5;
                                    document.getElementById('RightContainer').appendChild(fenetre);
                                     document.getElementById("tailleMem").disabled=false;
                                     document.getElementById("nbPss").disabled=false;
                                     document.getElementById("taillePss").disabled=false;
                                     document.getElementById("tempsPss").disabled=false;
                                     abel2=true;
                                     CommencerAfficher222();



})
      d3.select("#SimTER").on('click',termine);

       d3.select("#exemple").on('click',function(){

        Exemple();
        //window.location.href="../Tutorial/BuddySystem.html";

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
var indice=0; 
var indice2=0;  
var f=0;
var abel=false;
var abel2=false;
var abel3=false;
var TailleComplet=0;
var TabValeur = new Array();
var TabValeur2 = new Array();
var tableauInformation = new Array();
var tableauInformation2 = new Array();
var AjoutAlow=false;
var ChampsCo=false;
let dataTable=[];








function TestBoutonComencer()
    {
         if((document.getElementById("taillePss").value=="")||(document.getElementById("tempsPss").value==""))
          {
            
             //alert("vous dever introduir les informations complet du process");
             //swal.fire("vous dever introduir les informations complet du process");
             Swal.fire("Vous devez introduire toutes les informations  du processus");
          }
          else{
               //alert("its ok ");
               CommencerAfficher();
           }
    }


//Avant d'introduire les informations
function CommencerAfficher222()
     {

                LL=128; 
                memoire=new Memoire(LL);
                partition=new Partition(LL);
                partition.setEtatPartition("Libre");
                partition.setAdresseDebut(0);     
                buddy=new BuddySystem(memoire);



                fenetre=document.getElementById("fenetreAnim");
                memContainer=document.createElement("div");
                memContainer.setAttribute("id", "memoryContainer");

                memoryDiv=document.createElement("div");
                memoryDiv.setAttribute("id", "memory");

                memory3Div=document.createElement("div");
                memory3Div.setAttribute("id", "memory2");

                memContainer.appendChild(memoryDiv);
                memContainer.appendChild(memory3Div);

                fenetre.appendChild(memContainer);

                file1=document.createElement("div");
                file1.setAttribute("id", "File");

                fileWord=document.createElement("div");
                fileWord.setAttribute("id", "fileWord");
                fileWord.innerHTML="File";

                file2=document.createElement("div");
                file2.setAttribute("id", "File2");

                file2.appendChild(file1);
                file2.appendChild(fileWord);

                fenetre.appendChild(file2);

                tableauProcessus=document.createElement("div");
                tableauProcessus.setAttribute("id", "tableauProcessus");

                tablWord=document.createElement("div");
                tablWord.setAttribute("id", "tablWord");
                tablWord.innerHTML="Table de processus";

                processTable=document.createElement("table");
                processTable.setAttribute("id","processTable");

                row0 = document.createElement("tr");
                
                colProcessID = document.createElement("th");
                colProcessID.innerHTML="Process ID";

                colTaille= document.createElement("th");
                colTaille.innerHTML="Taille (K)";

                colTailleConvenable= document.createElement("th");
                colTailleConvenable.innerHTML="Taille convenable (K)";

                colTempsRestant = document.createElement("th");
                colTempsRestant.innerHTML="Temps Restant";

                colNpartition = document.createElement("th");
               colNpartition.innerHTML="N de partition";

                row0.appendChild(colProcessID);
                row0.appendChild(colTaille);
                row0.appendChild(colTailleConvenable);
                row0.appendChild(colTempsRestant);
                row0.appendChild(colNpartition);

                processTable.appendChild(row0);

                tableauProcessus.appendChild(processTable);
                tableauProcessus.appendChild(tablWord);

                fenetre.appendChild(tableauProcessus);

                var image=document.createElement('img');
                image.setAttribute("id","imageCommencer");

                image.src="img/commencer2.png";

                image.setAttribute("onclick","TestBoutonComencer()");

                fenetre.appendChild(image);

                document.getElementById('RightContainer').appendChild(fenetre);

                memoire.getListePartitionTotal().push(partition);
                buddy.getListePartitionLibre().push(partition);
                buddy.setAdresseDDebut(0);
                memoire.repain();
                buddy.repainLibre();
     }
//avant la simulation
async function CommencerAfficher()
     {
       document.getElementById("fenetreAnim").style.opacity=1;                             

      document.getElementById("memoryContainer").remove();
      
      document.getElementById("imageCommencer").remove();
      document.getElementById("File2").remove();
      document.getElementById("tableauProcessus").remove();
      

        document.getElementById("tailleMem").disabled=true;
     	  document.getElementById("nbPss").disabled=true;
                  document.getElementById("taillePss").disabled=true; 
                  document.getElementById("tempsPss").disabled=true;


     	if(document.getElementById("tailleMem").value=="")
     	{
     		Swal.fire("Introduisez la taille de la m�moire");
        //swal.fire("Donner une taille pour la memoire");
     	}else{
     		    LL=document.getElementById("tailleMem").value; 
                memoire=new Memoire(LL);
                partition=new Partition(LL);
                partition.setEtatPartition("Libre");
                partition.setAdresseDebut(0);     
                buddy=new BuddySystem(memoire);



                fenetre=document.getElementById("fenetreAnim");
                memContainer=document.createElement("div");
                memContainer.setAttribute("id", "memoryContainer");

                memoryDiv=document.createElement("div");
                memoryDiv.setAttribute("id", "memory");

                memory3Div=document.createElement("div");
                memory3Div.setAttribute("id", "memory2");

                memContainer.appendChild(memoryDiv);
                memContainer.appendChild(memory3Div);

                fenetre.appendChild(memContainer);

                file1=document.createElement("div");
                file1.setAttribute("id", "File");

                fileWord=document.createElement("div");
                fileWord.setAttribute("id", "fileWord");
                fileWord.innerHTML="File";

                file2=document.createElement("div");
                file2.setAttribute("id", "File2");

                file2.appendChild(file1);
                file2.appendChild(fileWord);

                fenetre.appendChild(file2);

                tableauProcessus=document.createElement("div");
                tableauProcessus.setAttribute("id", "tableauProcessus");

                tablWord=document.createElement("div");
                tablWord.setAttribute("id", "tablWord");
                tablWord.innerHTML="Table de processus";

                processTable=document.createElement("table");
                processTable.setAttribute("id","processTable");

                row0 = document.createElement("tr");
                
                colProcessID = document.createElement("th");
                colProcessID.innerHTML="Process ID";

                colTaille= document.createElement("th");
                colTaille.innerHTML="Taille (K)";

                colTailleConvenable= document.createElement("th");
                colTailleConvenable.innerHTML="Taille convenable (K)";

                colTempsRestant = document.createElement("th");
                colTempsRestant.innerHTML="Temps Restant";

                colNpartition = document.createElement("th");
               colNpartition.innerHTML="N de partition";

                row0.appendChild(colProcessID);
                row0.appendChild(colTaille);
                row0.appendChild(colTailleConvenable);
                row0.appendChild(colTempsRestant);
                row0.appendChild(colNpartition);

                processTable.appendChild(row0);

                tableauProcessus.appendChild(processTable);
                tableauProcessus.appendChild(tablWord);

                fenetre.appendChild(tableauProcessus);
                document.getElementById('RightContainer').appendChild(fenetre);

                memoire.getListePartitionTotal().push(partition);
                buddy.getListePartitionLibre().push(partition);
                buddy.setAdresseDDebut(0);
                memoire.repain();
                buddy.repainLibre();
                await sleep(1000);

                DisplayFile2();
                        

                await sleep(1500);
                myFunction();

                document.getElementById("page").disabled=false;
                document.getElementById("tailleP").disabled=false;
     	     }
     }

//ok  lire les info de processus
async function myFunction3()
     {
        if(abel2==true){   
          
          if(document.getElementById("tailleMem").value=="")
     	  {
     		Swal.fire("Introduisez la taille de la m�moire");
     		//alert("non non");
     	   }else{

     	   	      document.getElementById("tailleMem").disabled=true;


     	   	     if(AjoutAlow==false){
     	   	     	var TailleMem=document.getElementById("tailleMem").value;
                  var ProNb=parseInt(document.getElementById("nbPss").value);
                  var tProc=parseInt(document.getElementById("taillePss").value) ;
                  var temProc=parseInt(document.getElementById("tempsPss").value);

     	   	     }else{

     	   	     	var TailleMem=document.getElementById("tailleMem").value;
                  var ProNb=1;
                  var tProc=parseInt(document.getElementById("tailleP").value) ;
                  var temProc=parseInt(document.getElementById("page").value);
     	   	     }
                
                  
           
               console.log("la taille de processus :"+tProc);
             console.log("la taille de la memoire :"+TailleMem);

             if(Number.isInteger(parseInt(document.getElementById("taillePss").value))==false)
             {
             	Swal.fire("Introduisez un nombre entier");
             }

         if((document.getElementById("taillePss").value=="")||(document.getElementById("tempsPss").value=="")||(document.getElementById("taillePss").value==0))
         {
         	//alert("vous dever introduir les informations complet du process");
         	Swal.fire("Vous devez introduire toutes les informations  du process");
         }else{   
                 if((Number.isInteger(parseInt(document.getElementById("tempsPss").value))==false)||(Number.isInteger(parseInt(document.getElementById("taillePss").value))==false))
                 {
                 	Swal.fire(" La taille et le temps de processus doivent etre des entiers");

                 	if(Number.isInteger(parseInt(document.getElementById("taillePss").value))==false)
                 		{document.getElementById("taillePss").value=""; }else{document.getElementById("tempsPss").value="";}
                 	
                 }else{ 

                      if (tProc > TailleMem)
                        {
               
                         //console.log("on est dans le si");
                         //alert("la taille de processus est plus grande que la taille de la memoire");
                         Swal.fire("La taille de processus est plus grande que la taille de la memoire");
                        }
                       else{
                        processus=new Processus(tProc,temProc,indice);
                        TabValeur[indice]=processus;
                        tableauInformation[indice]=processus;
                        indice++;
                        indice2++;
                        document.getElementById("cpt").innerHTML=indice2;
                        document.getElementById("taillePss").innerHTML=" ";
                        document.getElementById("tempsPss").innerHTML=" ";
                        console.log("la taille de processus :"+tProc);
                        console.log("la taille de la memoire :"+TailleMem);
                        }

                       if(indice2 >=parseInt(document.getElementById("nbPss").value))
                        {
                        /* var valide=document.createElement("button");
                        valide.setAttribute("id","validBoton");
                        valide.setAttribute("onclick","myFunction()");
                        valide.setAttribute("value","VALIDEZ");
                        valide.innerHTML="VALIDEZ";
                        document.getElementById("leftContainer").appendChild(valide);*//////////////////////////////////
                        indice=TabValeur.length;
                        indice2=0;
                        document.getElementById("nbPss").value=1;
                        document.getElementById("nbPss").disabled=true;
                        document.getElementById("taillePss").disabled=true;
                        document.getElementById("tempsPss").disabled=true;
                        abel2=false;

                        
                        AjoutAlow=true;
                        
                        ////DisplayFile2();
                        await sleep(1000);
                        //myFunction();
                       
                       }     
                       //DisplayFile2();
                    }   
               } 
               }     
             }       
     } 
//ok  
//

//le traitement des processus  
async function myFunction()
 {
                                  document.getElementById("cpt").innerHTML=" ";
                                  var i1=0;
                                  var TestTr=false;
                                  while(i1<TabValeur.length)
                                  {
                                    ///on doit selectionner le processus traite
                                    if(TabValeur[i1]!=null)
                                    {
                                      var taiiCon10=CalculeTailleConvenable(TabValeur[i1]);
                                      AfficherBoiteDialogue("La taille convenable pour ce processus est : "+taiiCon10+" (Ko)");
                                      await sleep(4000);
                                      var test80=buddy.RecherchePartition(taiiCon10);///est ce que cette existe;
                                      partition2030=new Partition(0);
                                      partition2030=buddy.RecherchePartition2(taiiCon10,partition2030);// donne la partition la plus grande a la taille convenable
                                       
                                      if(partition2030.getTaille()>=taiiCon10)
                                        {
                                          var nbSub10=CalculeNbSub(partition2030.getTaille(),taiiCon10)
                                          var tttt10=nbSub10*(1500+1050)+5000; //4000 pour l'affichage de num de partition
                                          TestTr=true;
                                          //TabValeur[i1].SetTaillePartionSub(partition2030.getTaille());
                                        }else
                                        {
                                          alert (" on est dans le else:"+partition2030.getTaille());
                                           AfficherBoiteDialogue("Ce processus ne peut pas etre inséré car sa taille est supérieur � toute les partitions libres existant.");
                                           await sleep(4000);
                                        }
                                        if(TestTr==true)
                                        {
                                           buddy.TraiterProcessus(i1);
                                           DisplayFile2();
                                           memoire.repain(); 
                                           buddy.repainLibre(); 
                                           await sleep(tttt10);
                                        } 

                                    }
                                  ////
                                  /*if(TestTr==true)
                                   {
                                     buddy.TraiterProcessus(i1);
                                     DisplayFile2();
                                     memoire.repain(); 
                                     buddy.repainLibre(); 
                                     await sleep(tttt10);
                                   }*/
                                   i1++;  
                                  }

                                  abel=true;
                                          
  }

//Ajouter un processus
async function myFunction4()
  {
  	myFunction3();
    abel2=true;
    await sleep(1000);

  	myFunction();
  }


//Afficher la viritable file
function DisplayFile2()
   {
      //var o=TabValeur.length;
      document.getElementById("File").innerHTML=" ";
      var MarLeft=442;
      var o=0;
         while(o<TabValeur.length)
            { 
                animBlock = document.createElement("div");
                animBlock.setAttribute("id", "MidleContainer");
              if(TabValeur[o] !=null)
              { var vv=o%4;
                if (vv==0)
                {
                  animBlock.style.backgroundColor="#041F60";
                  

                }
                if (vv==1)
                {
                  animBlock.style.backgroundColor="#0476D0";
                }
                if (vv==2)
                {
                   animBlock.style.backgroundColor="#2CEEF0";
                }
                if (vv==3)
                {
                   animBlock.style.backgroundColor="#B4F5F0";
                }  
                animBlock.style.left=MarLeft +"px";               
                animBlock.innerHTML="<p>ID "+o+"<br>"+TabValeur[o].getTaille()+"K <br>"+TabValeur[o].GetTemps()+"s <b></p>";
              
                document.getElementById("File").appendChild(animBlock);
                MarLeft=MarLeft-60;
              }
                o++;
            }  

        
   }


//Afficher la viritable file
function DisplayFile3Exemple()
   {
      //var o=TabValeur.length;
      document.getElementById("File").innerHTML=" ";
      var MarLeft=442;
      var o=0;
         while(o<TabValeur2.length)
            { 
                animBlock = document.createElement("div");
                animBlock.setAttribute("id", "MidleContainer");
              if(TabValeur2[o] !=null)
              { var vv=o%4;
                if (vv==0)
                {
                  animBlock.style.backgroundColor="#041F60";
                  

                }
                if (vv==1)
                {
                  animBlock.style.backgroundColor="#0476D0";
                }
                if (vv==2)
                {
                   animBlock.style.backgroundColor="#2CEEF0";
                }
                if (vv==3)
                {
                   animBlock.style.backgroundColor="#B4F5F0";
                }  
                animBlock.style.left=MarLeft +"px";               
                animBlock.innerHTML="<p><b>ID "+o+"<br>"+TabValeur2[o].getTaille()+"K <br>"+TabValeur2[o].GetTemps()+"s <b></p>";
                document.getElementById("File").appendChild(animBlock);
                MarLeft=MarLeft-60;
              }
                o++;
            }  

        
   }   

 


function addProcessToTable(process2,zz)
  {

    console.log(" les info de add process");
    //console.log(process2);
     console.log(process2.getTaille());
    row = document.createElement("tr");
    row.setAttribute("id", "process2" + process2.getIdntf());

    //identifiant
    colIdntf = document.createElement("td");
    colIdntf.innerHTML = process2.getIdntf();

    //taille
    colTaille = document.createElement("td");
    colTaille.innerHTML = process2.getTaille();

    //taille convenable
     colTailleConv = document.createElement("td");
     colTailleConv.innerHTML = CalculeTailleConvenable(process2);

     //Temps
     /*
     colTime = document.createElement("td");
     colTime.innerHTML = process2.GetTemps();*/

  
     //Temps Restant
     colTimeRestant = document.createElement("td");
     colTimeRestant.setAttribute("id", "process2" + process2.getIdntf() + "timeLeft");
     colTimeRestant.innerHTML = process2.GetTempsRestant();
     //
     //NbPartition
     colNbPartition = document.createElement("td");
     colNbPartition.setAttribute("id", "process2" + process2.getIdntf() + "NbPart");
     colNbPartition.innerHTML = zz;

     row.appendChild(colIdntf);
     row.appendChild(colTaille);
     row.appendChild(colTailleConv);
     //row.appendChild(colTime);
     row.appendChild(colTimeRestant);
     row.appendChild(colNbPartition);

     processTable.appendChild(row);
  };

function removeProcessFromTable(process2) 
  {
     processTable.removeChild(document.getElementById("process2" + process2.getIdntf())); 
  };     


function sleep(ms) 
        {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

async function AfficherBoiteDialogue(message)
    {

     
             dialog= document.createElement("dialog");
             dialog.setAttribute("id", "Dialog");
             //msg=document.createElement("h2");
             dialog.innerHTML=message;

             //dialog.appendChild(msg);
             //document.body.appendChild(dialog);

             document.getElementById("fenetreAnim").appendChild(dialog);

             var dialog = document.getElementById('Dialog');
               dialog.showModal(); 

               await sleep(3000);
               dialog.close();

               dialog.remove();
    }

function Tour()
   {
      var intro =  introJs();
      intro.start();
   }

var clock = setInterval(async function() 
                                {

                                 /* var oui2=0;
                                 while (oui2<memoire.getListePartitionTotal().length) 
                                 {   
                                    if (memoire.getListePartitionTotal()[oui2].GetEtat()=="Libre")
                                     {
                                     var verification=buddy.Fusion4(oui2);
                                     if (verification==true)
                                        {
                                          memoire.repain(); 
                                          buddy.repainLibre(); 
                                          memoire.refreshTable();
                                          await sleep(1500);
                                        } 
                                      }                           
                                    oui2++;
                                  } *////////////////////////
                                 var GeneralListe2=memoire.getListePartitionTotal();
                                 //var T=GeneralListe2.length;
                                 var T=memoire.getListePartitionTotal().length;
                                 var j30=0;
                                 while (j30<memoire.getListePartitionTotal().length) 
                                 {   
                                    if (memoire.getListePartitionTotal()[j30].GetEtat()=="Occuper")
                                     {
                                          memoire.getListePartitionTotal()[j30].getProcessus().tick();
                                        if(memoire.getListePartitionTotal()[j30].getProcessus().GetTempsRestant()<0)
                                             {
                                                buddy.Liberation2(j30);
                                                 memoire.repain();
                                                 buddy.repainLibre(); 
                                                 memoire.refreshTable();
                                                 await sleep(1000); 
                                                 //await sleep(1000);
                                                //insererLeReste();
                                                DisplayFile2();
                                              }
                                      }
                                    j30++;
                                  }
                                          memoire.repain();  
                                          buddy.repainLibre();
                                          memoire.refreshTable();
                                          await sleep(1000);     
                                          //DisplayFile2();    
                                  }, 1500);            

//avant la simulation2Exemple
async function CommencerAfficherExemple()
     {
                                  
                  document.getElementById("tailleMem").disabled=true;
                  document.getElementById("nbPss").disabled=true;
                  document.getElementById("taillePss").disabled=true; 
                  document.getElementById("tempsPss").disabled=true;


      
                LL=128; 
                memoire=new Memoire(LL);
                partition=new Partition(LL);
                partition.setEtatPartition("Libre");
                partition.setAdresseDebut(0);     
                buddy=new BuddySystem(memoire);

                document.getElementById("memoryContainer").remove();
                document.getElementById("File2").remove();
                document.getElementById("tableauProcessus").remove();



                fenetre=document.getElementById("fenetreAnim");
                memContainer=document.createElement("div");
                memContainer.setAttribute("id", "memoryContainer");

                memoryDiv=document.createElement("div");
                memoryDiv.setAttribute("id", "memory");

                memory3Div=document.createElement("div");
                memory3Div.setAttribute("id", "memory2");

                memContainer.appendChild(memoryDiv);
                memContainer.appendChild(memory3Div);

                fenetre.appendChild(memContainer);

                file1=document.createElement("div");
                file1.setAttribute("id", "File");

                fileWord=document.createElement("div");
                fileWord.setAttribute("id", "fileWord");
                fileWord.innerHTML="File";

                file2=document.createElement("div");
                file2.setAttribute("id", "File2");

                file2.appendChild(file1);
                file2.appendChild(fileWord);

                fenetre.appendChild(file2);

                tableauProcessus=document.createElement("div");
                tableauProcessus.setAttribute("id", "tableauProcessus");

                tablWord=document.createElement("div");
                tablWord.setAttribute("id", "tablWord");
                tablWord.innerHTML="Table de processus";

                processTable=document.createElement("table");
                processTable.setAttribute("id","processTable");

                row0 = document.createElement("tr");
                
                colProcessID = document.createElement("th");
                colProcessID.innerHTML="Process ID";

                colTaille= document.createElement("th");
                colTaille.innerHTML="Taille (K)";

                colTailleConvenable= document.createElement("th");
                colTailleConvenable.innerHTML="Taille convenable (K)";

                colTempsRestant = document.createElement("th");
                colTempsRestant.innerHTML="Temps Restant";

                colNpartition = document.createElement("th");
               colNpartition.innerHTML="N de partition";

                row0.appendChild(colProcessID);
                row0.appendChild(colTaille);
                row0.appendChild(colTailleConvenable);
                row0.appendChild(colTempsRestant);
                row0.appendChild(colNpartition);

                processTable.appendChild(row0);

                tableauProcessus.appendChild(processTable);
                tableauProcessus.appendChild(tablWord);

                fenetre.appendChild(tableauProcessus);
                document.getElementById('RightContainer').appendChild(fenetre);

                memoire.getListePartitionTotal().push(partition);
                buddy.getListePartitionLibre().push(partition);
                buddy.setAdresseDDebut(0);
                memoire.repain();
                buddy.repainLibre();
                await sleep(1000);

                DisplayFile2();
                        

                await sleep(1500);
                await sleep(5000);
                //myFunction();
                myFunction();

                document.getElementById("page").disabled=true;
                document.getElementById("tailleP").disabled=true;
           
     }


async function AfficherExemple()
      {
                        processus1=new Processus(32,50,0);
                        TabValeur[0]=processus1;
                        tableauInformation[0]=processus1;
                        processus2=new Processus(16,30,1);
                        tableauInformation[1]=processus2;
                        TabValeur[1]=processus2;
                        processus3=new Processus(4,20,2);
                        tableauInformation[2]=processus3;
                        TabValeur[2]=processus3;
                        CommencerAfficherExemple();

                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(9000);
                        await sleep(1500);


                        
                        document.getElementById("SimTER").setAttribute("data-step",7);

                        var intro3 =  introJs();
                        intro3.goToStepNumber(7).start();

                        //TerminerSimu();
                        document.getElementById("SimTER").setAttribute("data-step",5);



      }     

function Exemple()
       {

                                  d3.select("#illustration").remove();
                                    d3.select("#svg2").remove();

                                    fenetre = document.createElement("div");
                                    fenetre.setAttribute("id", "fenetreAnim");
                                    fenetre.style.opacity=1;
                                    document.getElementById('RightContainer').appendChild(fenetre);


                                    CommencerAfficher222();
                                    document.getElementById('imageCommencer').remove();

                                    
                                  var intro2 =  introJs();
                                  intro2.start();

                                  intro2.onexit(function(){
                                  Swal.fire({
                                  title: 'Exemple',
                                  html: 'Dans cet exemple animé, les données utilisées sont : <br> - Taille de la mémoire : 128(K) <br> - Nombre de processus insérer : 3 <br> <table style=" position: relative;left:125px;"> <tr><th>Process ID</th><th>Taille (K)</th><th>Temps</th></tr>  <tr><td>0</td><td>32</td><td>50</td></tr>  <tr><td>1</td><td>16</td><td>30</td></tr> <tr><td>2</td><td>4</td><td>20</td></tr> </table>',
                                  animation: false,
                 
                                  showConfirmButton : true,
                                  confirmButtonText: 'Commencer'
                                  }).then((result) => {
                                    AfficherExemple();
                  
                                   })
                                   })
       }


function termine(){

        if(abel==true)
              {
                TerminerSimu();
                abel=false;
              }
        //window.location.href="../Tutorial/BuddySystem.html";

      }
