class Case
{
   
    constructor(iD)
    {
        this.iD=iD;
        this.occupee=false;
        this.idPage=null;
    }
    allouer()
    {
        this.occupee=true;
    }
    liberer()
    {
        this.occupee=false;
        this.idPage=-1;
    }
    setIdPage(idP)
    {
        this.idPage=idP;
    }
    getIdPage()
    {
        return this.idPage;
    }
}

class Page
{
   
    
    constructor(iD)
    {
        this.iD=iD;
        this.presente=false;
        this.referenece=0;
        this.temps=null;
        this.idCase=null;
        this.nbUsage=0;
    }
    
    valide()
    {
        return this.presente;
    }
    getIdcase()
    {
        return this.idCase;
    }
    getIdpage()
    {
        return this.iD;
    }
    charger(idCase,temps)
    {   
        this.temps=temps;
        this.presente=true;
        this.idCase=idCase;
        
       
        
    }
    decharger()
    {
        this.idCase=null;
        this.presente=false;
        this.nbUsage=0;
        this.temps=null;
    }

    utiliser()
    {   
        
        this.nbUsage++;
    }
    setTemps(temps)
    {
        this.temps=temps;
    }
    getTemps()
    {
        return this.temps;
    }
    
}

 class Mmu
 {
     
     constructor(nbCase,nbPage,mc,mv)
    {
        this.mv=mv;
        this.mc=mc;
        this.tabCase=[nbCase];
        this.tabPage=[nbPage]; 
        this.tabEtat=[nbCase];
        this.nbCase=nbCase;
        this.nbPage=nbPage;
        this.cLibre=0; 
        this.memPleine= false ;
        for (let i = 0; i < nbCase; i++)
         {
             this.tabCase[i]= new Case(i);
             this.tabEtat[i]=null;

        }
            
        
        for (let i = 0; i < nbPage; i++)
         {
             this.tabPage[i]= new Page(i);
            
        }
    }
    
    casLibre()//retourne le id de la premiere case libre
    {
        if(this.memPleine==false)
        {   
            let i=this.cLibre;
            this.cLibre++;
            if(this.cLibre === this.nbCase){
                this.memPleine=true;
            }
            return i;
        }
    } 
    pleine()
    {
        return this.memPleine;
    }
    chargerPage(idP,idC,temps,delay)
    {
        this.tabEtat[idC]=idP;
        this.page(idP).charger(idC,temps);
        this.cas(idC).setIdPage(idP);
        //this.mc.allouerCase(idC,idP,delay);
        //this.mv.chargerPage(idP,delay);
    }
    traduireAdr(idP)
    {
        return this.Page(idP).getIdcase();
    }
    page(id)
    {
        return this.tabPage[id];
    }
    cas(id)
    {
        return this.tabCase[id];
    }
    tabPages()
    {
        return this.tabPage;
    }
 } 
 class MmuFifo extends Mmu
 {  
    constructor(nbCase,nbPage,mc,mv,fifo)
    {
      super(nbCase,nbPage,mc,mv); 
      this.fifo=fifo;
      this.fifoPage=[];
    }
    enfilerPage(idP,dure,delay)
    {
        this.fifoPage.push(idP);
        this.fifo.enfilerM(idP,dure,delay);
    }
     chargerpage(idP,idC,temps,dure,delay)
    {   
        this.chargerPage(idP,idC,temps,delay+dure*3);
        this.enfilerPage(idP,dure,delay);
    }
    victime(id,dx,dure,delay) 
    {
        this.fifo.defilerFifo(id,dx,dure,delay)   
        let pos= this.fifoPage.shift();
        return pos;

    }
    
    remplacer(idP2,temps,dx1,dure,delay)
    {   
        this.fifo.apparaitreFifo();
        let idP1=this.victime(idP2,dx1,dure,delay);
        this.fifoPage.push(idP2);
        //this.mv.dechargerPage(idP1,delay);
        //this.mc.libererCase(this.page(idP1).getIdcase(),delay);
        //this.chargerPage(idP2,this.page(idP1).getIdcase(),temps,delay);
        //this.page(idP1).decharger();
        //this.mc.allouerCase(this.page(idP2).getIdcase(),idP2,delay);
        return idP1;
        
    }
      pagination(idP,temps,dx1,dure,delay)
     {  
        
         this.mv.referancer(idP);
        d3.select('#rect1').transition()
                .style("opacity","0.7")
        d3.select('#rect2').transition()
                .style("opacity","0.7")
        d3.select('#rect3').transition()
                 .style("opacity","0.7")
        if(this.page(idP).valide())
        {   
            d3.select('#etat').transition()
            .delay(delay+dure*3)
            .attr('x',620)
            .text('Utilisation');

            d3.select('#switch').transition()
                                .delay(delay+dure*3)
                                .attr('cx',760);
            d3.select('#rect3').transition()
                               .delay(delay+dure*3)
                               .style("opacity","0")
            this.fifo.apparaitreFifo(delay+dure*3);
            this.mv.chargerPage(idP,delay+dure*3);
            this.page(idP).utiliser();
            return 0;
        }
        else
        {
            if(!this.memPleine)
            {   
                
                
                d3.select('#etat').transition()
                .delay(delay+dure*3)
                .attr('x',620)
                .text('Chargement');
                d3.select('#switch').transition()
                                .delay(delay+dure*3)
                                .attr('cx',665);
                d3.select('#rect2').transition()
                                .delay(delay+dure*3)
                               .style("opacity","0")
                let idC= this.casLibre();
                this.cas(idC).allouer();
                this.fifo.apparaitreFifo(delay+dure*3);
                this.chargerpage(idP,idC,temps,dure,delay+dure*3);
                this.page(idP).utiliser();
                return 1;  
            }
            else
            {   
                d3.select('#etat').transition()
                .delay(delay+dure*3)
                .attr('x',620)
                .text('Remplacement');
                d3.select('#switch').transition()
                                    .delay(delay+dure*3)
                                   .attr('cx',569.5);
                d3.select('#rect1').transition()
                                  .delay(delay+dure*3)
                                  .style("opacity","0")
                this.fifo.apparaitreFifo(delay+dure*3);
                this.remplacer(idP,temps,dx1,delay+dure*3);

                this.page(idP).utiliser();
                return -1;  
            }
        }
     }
 }

 class MmuLRU extends Mmu
 {  
    
     
    constructor(nbCase,nbPage,taille,tabRef,fifo)
    {
      super(nbCase,nbPage,taille,tabRef); 
      this.fifoPage=[];
      this.fifo=fifo;
    }
    
    chainerPage(idP)
    {
       this.fifoPage.unshift(idP);
    }
    
    /*chargerPage(idP,idC,temps)
   {
       super.chargerPage(idP,idC,temps);
       this.chainerPage(idP);
       
   }*/
   
   depl(idP)
   {
       for (let i = 0; i < this.fifoPage.length; i++) 
       {
           if(this.fifoPage[i]==idP)
           {
               this.fifoPage.splice(i,1);
               this.fifoPage.push(idP);
              
           }
       }
   }
   enfilerPage(idP,dure,delay)
    {
        this.fifoPage.push(idP);
        this.fifo.enfilerM(idP,dure,delay);
    }
     chargerpage(idP,idC,temps,dure,delay)
    {   
        this.chargerPage(idP,idC,temps,delay+dure*3);
        this.enfilerPage(idP,dure,delay);
    }
    victime(id,dx,dure,delay) 
    {
        this.fifo.defilerFifo(id,dx,dure,delay)   
        let pos= this.fifoPage.shift();
        return pos;

    }
    
    remplacer(idP2,temps,dx1,dure,delay)
    {   
        this.fifo.apparaitreFifo();
        let idP1=this.victime(idP2,dx1,dure,delay);
        this.fifoPage.push(idP2);
        return idP1;
        
    }
   pagination(idP,temps)
    {
       if(this.page(idP).valide())
       {
           this.page(idP).utiliser();
           this.page(idP).setTemps(temps);
           this.depl(idP);
       }
       else
       {
           if(!this.memPleine)
           {
               let idC= this.casLibre();
               this.cas(idC).allouer();
               this.chargerPage(idP,idC,temps);
               this.page(idP).utiliser();
               
           }
           else
           {
              
               
               this.remplacer(this.victime(),idP,temps);
               this.page(idP).utiliser();
               
               
           }
       }
    }
 }








