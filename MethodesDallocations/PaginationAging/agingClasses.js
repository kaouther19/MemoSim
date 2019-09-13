/*Case*/
class Case{
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
    getEtat(){
        return this.occupee;
    }
}
/*page aging*/
class Page{
    constructor(iD,tailCpt)
    {
        this.ordre=0;
        this.iD=iD;
        this.presente=false;
        this.referenece=0;
        this.temps=null;
        this.idCase=null;
        this.cpt=new Compteur(tailCpt)
    }
    valide()
    {
        return this.presente;
    }
    getIdcase()
    {
        return this.idCase;
    }
    getOrdre(){
        return this.ordre;
    }
    getIdpage()
    {
        return this.iD;
    }
    charger(idCase,temps,ordre)
    {   
        this.ordre = ordre;
        this.temps = temps;
        this.presente=true;
        this.idCase=idCase;
    }
    decharger()
    {
        this.idCase=null;
        this.presente=false;
        this.nbUsage=0;
        this.cpt.miseAZ();
    }
    utiliser()
    {   
        this.referenece=1;
    }
    getNbUsage(){
        return this.nbUsage;
    }
    getTemps(){
        return this.temps;
    }
    getCpt(){
        return this.cpt;
    }
    getRi(){
        return this.referenece;
    }
    setRi(ri){
        this.referenece=ri;
    }
}
/*compteur à décalage */
class Compteur{
    constructor(taille){

        this.tab=[taille];
        this.taille=taille;
        this.miseAZ();
    }

    afficher(){
        let string="["+this.elem(0);
        for(let i=1;i<this.taille;i++){
            string+=","+this.elem(i);
        }
        string+=']';
        return string;
    }
    getValeur(){
        let string="";
        for(let i=0;i<this.taille;i++){
            string+=this.elem(i);
        }
        return string;
    }
    miseAZ(){
        for(let i=0;i<this.taille;i++){
            this.tab[i]=0;
        }
    }
    decaler(ri){
        this.tab.unshift(ri);
        this.tab.pop();
    }
    comparer(cmp){
        let stop=false;
        let i=0;
        let res=0;
        while(!stop){
            if(cmp.elem(i) == this.elem(i)){
                i++;
                if(i==this.taille){
                    stop=true;
                }
            }else{
                stop=true;
                if(cmp.elem(i) < this.elem(i)){
                    res++;
                }else{
                    res--;
                }
            }
        }
        return res;
    }
    elem(i){
        return this.tab[i];
    }
}
/*MMU aging*/
class Mmu{
    constructor(nbCase,nbPage,taille,tailCpt,memoireC,memoireV,tabReg,x,y,svg)
    {
        this.tabReg=tabReg;
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
        for (let i = 0; i < nbCase; i++){
             this.tabCase[i]= new Case(i);
             this.tabEtat[i]=null;
        }
        for (let i = 0; i < nbPage; i++){
             this.tabPage[i]= new Page(i,tailCpt);
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
        //this.tabP.page(idP).presente(dr,dl);
        // this.memV.pageM(idP).charger();
        // this.memC.allouer(idC,idP);
        this.cas(idC).setIdPage(idP);
    }
    remplacer(idP1,idP2,temps,ordre,dr,dl){
        this.chargerPage(idP2,this.page(idP1).getIdcase(),temps,ordre,dl,dr);
        this.page(idP1).decharger();
        // this.tabP.page(idP2).presente(dr,dl);
        // this.tabP.page(idP1).presente(dr,dl);
        // this.tabP.page(idP2).utiliser(dr,dl);
        return this.page(idP2).getIdcase();
        // this.memV.pageM(idP1).decharger();
    }
    /*Victime aging */
    victime(){
        if(this.memPleine){
            let victime=this.cas(0).getIdPage();
            for(let i=1;i<this.nbCase;i++){               
                if((this.page(this.cas(i).getIdPage()).getCpt().comparer(this.page(victime).getCpt())) < 0){
                    victime =this.cas(i).getIdPage();
                }
                else if((this.page(this.cas(i).getIdPage()).getCpt().comparer(this.page(victime).getCpt())) ==0){
                    if(this.page(this.cas(i).getIdPage()).getTemps()-this.page(victime).getTemps()<0){
                        victime =this.cas(i).getIdPage();                       
                    }
                }
            }
            console.log("la page victime => "+victime);
            return victime;
        }
    }
    /*dacaler tous les compteurs*/
    decalerCpt(dl){
        for(let i=0;i<this.nbCase;i++){
            if(this.cas(i).getEtat()){
                this.page(this.cas(i).getIdPage()).getCpt().decaler(this.page(this.cas(i).getIdPage()).referenece);
                this.tabReg.decale((this.cas(i).getIdPage()),dl);
            }
        }
    }
    pagination(idP,temps){
        if(idP>=this.nbPAge)
            return;
        if( this.page(idP).valide()){
            this.page(idP).utiliser();
            this.tabReg.insereRi(1,idP,0);
            this.decalerCpt(dl);
            this.page(idP).setRi(0);
        }else{
            if(this.memPleine==false){
                let idC = this.casLibre();
                this.cas(idC).allouer();
                this.chargerPage(idP,idC,temps);
                this.tabReg.activerReg(idP,0)
                this.page(idP).utiliser();
                this.tabReg.insereRi(1,idP,0);
                this.decalerCpt();
                this.page(idP).setRi(0);
            }else{
                //remplacement
                let v=this.victime();
                this.remplacer(v,idP,temps);
                this.tabReg.desactiverReg(v,0);
                this.tabReg.activerReg(idP,0);
                this.page(idP).utiliser();
                this.tabReg.insereRi(1,idP,0);
                this.decalerCpt();
                this.page(idP).setRi(0);
            }
        }
    }
    afficherMem(){
        for(let i =0;i<this.nbCase;i++){
            console.log("case "+i+":"+this.tabEtat[i]);//cas(i).getIdPage());       
        }
    }
    afficherCpt(){
        for(let i=0;i<this.nbCase;i++){
            if(this.cas(i).getEtat()){
                console.log("page"+this.cas(i).getIdPage()+":"+this.page(this.cas(i).getIdPage()).getCpt().afficher());
            }
        } 
    }
    tabPages(){
        return this.tabPage;
    }
    getTabEtat(){
        return this.tabEtat;
    }
    getMemPleine(){
        return this.memPleine;
    }
    afficherMem(){
        for(let i =0;i<this.nbCase;i++){
            console.log("case "+i+":"+this.tabEtat[i]);//cas(i).getIdPage());       
        }
    }
    // getTabPages(){
    //     return this.tabP;
    // }
    getTabRegistres(){
        return this.tabReg;
    }
}