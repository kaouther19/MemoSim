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
    getIdPage(idP)
    {
        return this.idPage;
    }
}
class Page
{
    constructor(iD)
    {
        this.ordre=null;
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
    charger(idCase,temps,ordre)
    {   
        this.temps=temps;
        this.presente=true;
        this.idCase=idCase;
        this.ordre=ordre;
    }
    decharger()
    {
        this.idCase=null;
        this.presente=false;
        this.nbUsage=0;
        this.ordre=null;
    }
    utiliser()
    {   
        this.nbUsage++;
    }
    getNbUsage(){
        return this.nbUsage;
    }
    getTemps(){
        return this.temps;
    }
    getOrdre(){
        return this.ordre;
    }
}
class Mmu
{
    constructor(nbCase,nbPage,taille,memoireC,memoireV,x,y,svg,)
    {
        this.memC=memoireC;
        this.memV=memoireV;
        this.tabCase=[nbCase];
        this.tabPage=[nbPage]; 
        this.tabEtat=[nbCase];
        this.taille=taille;
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
        this.tabP = new TabPagesLFU(this.tabPages(),564,360,svg);
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
    page(id)
    {
        return this.tabPage[id];
    }
    cas(id){
        return this.tabCase[id];
    }
    chargerPage(idP,idC,temps,ordre,dr,dl){
        this.tabEtat[idC]=idP;
        this.page(idP).charger(idC,temps,ordre);
        this.tabP.page(idP).presente(dr,dl);
        // this.memV.pageM(idP).charger();
        // this.memC.allouer(idC,idP);
        this.cas(idC).setIdPage(idP);
    }
    remplacer(idP1,idP2,temps,dr,dl,ordre){
        this.chargerPage(idP2,this.page(idP1).getIdcase(),temps,ordre);
        this.page(idP1).decharger();
        this.tabP.page(idP2).presente(dr,dl);
        this.tabP.page(idP1).presente(dr,dl);
        this.tabP.page(idP1).utiliser(dr,dl);
        return this.page(idP2).getIdcase();
        // this.memV.pageM(idP1).decharger();
    }
    victime(){
        if(this.memPleine){
            let min=9999;
            let victi=-1;
            for(let i=0;i<this.nbCase;i++){               
                if((this.page(this.cas(i).getIdPage()).getNbUsage()-min)<0){
                    min=this.page(this.cas(i).getIdPage()).getNbUsage();
                    victi =this.cas(i).getIdPage();
                }
                else if(this.page(this.cas(i).getIdPage()).getNbUsage()==min){
                    if(this.page(this.cas(i).getIdPage()).getTemps() <this.page(victi).getTemps()){
                        victi =this.cas(i).getIdPage();
                        console.log("La victime est :"+victi);                       
                    }
                }
            }
            console.log("la page victime => "+victi);
            return victi;
        }
    }
    pagination(idP,temps){
        if(idP>=this.nbPage)
            return;
        if( this.page(idP).valide()){
            this.page(idP).utiliser();
        }else{
            if(this.memPleine==false){
                let idC = this.casLibre();
                this.cas(idC).allouer();
                this.chargerPage(idP,idC,temps);
                this.page(idP).utiliser();
            }else{
                //remplacement
                this.remplacer(this.victime(),idP,temps);
                this.page(idP).utiliser();
            }
        }
    }
    getMemPleine(){
        return this.memPleine;
    }
    afficherMem(){
        for(let i =0;i<this.nbCase;i++){
            console.log("case "+i+":"+this.tabEtat[i]);//cas(i).getIdPage());       
        }
    }
    tabPages(){
        return this.tabPage;
    }
    getTabEtat(){
        return this.tabEtat;
    }
    getTabPages(){
        return this.tabP;
    }
 }
