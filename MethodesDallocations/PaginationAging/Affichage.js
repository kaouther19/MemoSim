/*Les éléments affichés dans les animations*/
class CaseM
/*Case mémoire affichée*/
{
    constructor(svg,couleur,x,y){
        this.case=svg.append('rect')
                     .attr('x',x)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',150)
                     .attr('height',30)
                     .attr('fill',couleur);
        this.svg = svg;
        this.x=x;
        this.y=y;
        this.allouee=this.svg.append('rect')
                .attr('x',this.x+3)
                .attr('y',this.y+3)
                .attr('width',144)
                .attr('height',24)
                .attr('fill','transparent')
        this.titre=this.svg.append('text')
                .attr('x',this.x+65)
                .attr('y',this.y+18)
                .attr('fill',"white");
        this.couleur=couleur;
    }
    occuperCase(idP,dr,dl){
        this.titre.transition().attr('fill',"transparent").delay(dl);
        this.allouee.transition().attr('fill','rgb(54,185,204)').duration(500).delay(dl);
        this.titre.transition().text('P'+idP).attr('fill',"white").delay(dl+500);
    }
    libererCase(dr,dl){
        /* quand on trouvra d'autres alternatives (animations) on les utilisera*/
        this.allouee.transition().attr('fill','transparent').duration(500).delay(dl);
        this.titre.transition().text('P'+idP).attr('fill',"transparent").delay(dl);
    }
    remplacer(idP,dr,dl){
        this.titre.transition().attr('fill',"transparent").delay(dl);
        this.allouee.transition().attr('fill',this.couleur).duration(1000).delay(dl)
                    .transition().attr('fill','rgb(54,185,204)').duration(1000);
        this.titre.transition().text('P'+idP).attr('fill',"white").delay(dl+1500);     
    }
    referencer(dr,dl){
        this.allouee.transition().attr('fill','rgb(236,104,94)').duration(1000).delay(dl)
                    .transition().attr('fill','rgb(54,185,204)').duration(500);
    }
    remove(){
        this.allouee.remove();
        this.case.remove();
        this.titre.remove();
    }
}
class Memoire
/*La mémoire affichée*/
{
    constructor(svg,nbCase,couleur,x,y){
        this.svg=svg;
        this.cases=[]; 
        this.tabC=[]; 
        this.plan=this.svg.append('rect')
                .attr('x',x-3)
                .attr('y',y-3)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',156)
                .attr('height', (33*nbCase)+50)
                .attr('fill','grey');
        for (let i = 0; i <nbCase; i++) 
        {
            this.tabC[i]=svg.append('text')
                .attr('x',x+164)
                .attr('y',y+25)
                .attr('font-size',"18px")
                .attr('font-weight',"700")
                .attr('fill',"black");
             this.tabC[i].text("C"+i);
            this.cases[i]=new CaseM(svg,couleur,x,y);
            y=y+33;
        }
        this.osC=this.svg.append('rect')
                .attr('x',x)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',150)
                .attr('height',40 )
                .attr('fill','beige');
        this.ostitre=svg.append('text')
                .attr('x',x+54)
                .attr('y',y+30)
                .attr('font-size',"18px")
                .attr('font-weight',"600")
                .attr('fill',"grey");
        this.ostitre.text("--OS--");     
        y=y+70;
        this.titre=svg.append('text')
                .attr('x',x+3)
                .attr('y',y)
                .attr('font-size',"18px")
                .attr('font-weight',"600")
                .attr('fill',"rgb(58,59,69)");
        this.titre.text("Memoire centrale");     
    }
    allouer(idC,idP,dr,dl){
        this.cases[idC].occuperCase(idP,dr,dl);
    }
    liberer(idC,dr,dl){
        this.cases[idC].libererCase(dr,dl);
    }
    caseM(idC){
        return this.cases[idC];
    }
    remove(){
        this.titre.remove();
        this.plan.remove();
        for (let index = 0; index < this.tabC.length; index++) {
            this.tabC[index].remove();
            this.cases[index].remove();
        }
        this.osC.remove();
        this.ostitre.remove();
    }
}
class PageM
/*Page mémoire affichée*/
{
    constructor(svg,couleur,x,y,id){
        this.page=svg.append('rect')
                     .attr('x',x)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',150)
                     .attr('height',30)
                     .attr('fill',couleur);
        this.titre=svg.append('text')
                      .attr('x',x+60)
                      .attr('y',y+22)
                      .attr('fill',"black")
                      .attr('fonte-size',11 );
        this.titre.text('Page'+id);
        this.svg = svg;
        this.x=x;
        this.y=y;
        this.couleur=couleur;
    }
    charger(dr,dl){
        this.titre.transition().attr('fill','white').duration(500).delay(dl);
        this.page.transition().attr('fill',"rgb(28,200,138)").duration(500).delay(dl);
    }
    decharger(dr,dl){
        this.page.transition().attr('fill',this.couleur).duration(500).delay(dl);
        this.titre.transition().attr('fill','black').duration(500).delay(dl);
    }
    referencer(dl){
        this.page.transition().attr('fill','rgb(236,104,94)').delay(dl);      
    }
    remove(){
        this.titre.remove();
        this.page.remove();
    }
}
class memoireVirtuelle
/*La mémoire virtuelle Affichée*/
{
    constructor(svg,nbPage,couleur,x,y){
        this.svg=svg;
        this.pages=[];    
        this.plan=this.svg.append('rect')
                .attr('x',x-3)
                .attr('y',y-3)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',156)
                .attr('height', (33*nbPage)+10)
                .attr('fill','grey');
        for (let i = 0; i <nbPage; i++) {
            this.pages[i]=new PageM(svg,couleur,x,y,i);
            y=y+33;
        }
        this.titre = svg.append('text')
                        .attr('x',x+3)
                        .attr('y',y+30)
                        .attr('font-size',"18px")
                        .attr('font-weight',"600")
                        .attr('fill',"rgb(58,59,69)");
        this.titre.text("Memoire virtuelle");   
    }
    pageM(idP){
        return this.pages[idP];
    }
    remove(){
        this.plan.remove();
        for (let index = 0; index < this.pages.length; index++) {
            this.pages[index].remove();
        }
        this.titre.remove();
    }
}
class TabPages
/* La table des Pages affichée*/ 
{
    constructor(tab,x,y,svg){
        y=y-33;
        this.y=y;
        this.idA=svg.append('rect')
                .attr('x',x)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',50)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.id =svg.append('text')
                .attr('x',x+4)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("ID");
        this.valA=svg.append('rect')
                .attr('x',x+53)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',60)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.val = svg.append('text')
                .attr('x',x+53)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("EnMem");
        this.idcA=svg.append('rect')
                .attr('x',x+116)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',60)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.idc= svg.append('text')
                .attr('x',x+125)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("IDcase");
        this.ordreA=svg.append('rect')
                .attr('x',x+179)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',44)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.ordre= svg.append('text')
                .attr('x',x+182)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("Ordre");
        this.tabP=[];
        y=y+33;
        for (let i = 0; i < tab.length; i++) {
            this.tabP[i]=new LigneAging(tab[i],x,y,svg);
            y = y + 33;
        }
    }
    page(idP){
        return this.tabP[idP];
    }
    supp(t){
        
        this.id.transition().remove().delay(t);
        this.idA.transition().remove().delay(t);
        this.idc.transition().remove().delay(t);
        this.idcA.transition().remove().delay(t);
        this.val.transition().remove().delay(t);
        this.valA.transition().remove().delay(t);
        this.ordre.transition().remove().delay(t);
        this.ordreA.transition().remove().delay(t);
        for (let i = 0; i < this.tabP.length; i++) {
            this.tabP[i].supp(t);
        }
    }
    hide(t){
        
        this.id.transition().style('visibility','hidden').delay(t);
        this.idA.transition().style('visibility','hidden').delay(t);
        this.idc.transition().style('visibility','hidden').delay(t);
        this.idcA.transition().style('visibility','hidden').delay(t);
        this.val.transition().style('visibility','hidden').delay(t);
        this.valA.transition().style('visibility','hidden').delay(t);
        this.ordre.transition().style('visibility','hidden').delay(t);
        this.ordreA.transition().style('visibility','hidden').delay(t);
        for (let i = 0; i < this.tabP.length; i++) {
            this.tabP[i].hide(t);
        }
    }
    appear(t){
        
        this.id.transition().style('visibility','visible').delay(t);
        this.idA.transition().style('visibility','visible').delay(t);
        this.idc.transition().style('visibility','visible').delay(t);
        this.idcA.transition().style('visibility','visible').delay(t);
        this.val.transition().style('visibility','visible').delay(t);
        this.valA.transition().style('visibility','visible').delay(t);
        this.ordre.transition().style('visibility','visible').delay(t);
        this.ordreA.transition().style('visibility','visible').delay(t);

        for (let i = 0; i < this.tabP.length; i++) {
            this.tabP[i].appear(t);
        }
    }
}
class TabPagesLFU
/* La table des Pages affichée*/ 
{
    constructor(tab,x,y,svg){
        y=y-33;
        this.y=y;
        this.idA=svg.append('rect')
                .attr('x',x)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',50)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.id =svg.append('text')
                .attr('x',x+4)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("ID");
        this.valA=svg.append('rect')
                .attr('x',x+53)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',60)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.val = svg.append('text')
                .attr('x',x+53)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("EnMem");
        this.idcA=svg.append('rect')
                .attr('x',x+116)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',60)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.idc= svg.append('text')
                .attr('x',x+125)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("IDcase");
        this.nbA=svg.append('rect')
                .attr('x',x+179)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',40)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.nb= svg.append('text')
                .attr('x',x+182)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("Ref");
        this.ordreA=svg.append('rect')
                .attr('x',x+222)
                .attr('y',y)
                .attr('rx',4)
                .attr('ry',4)
                .attr('width',40)
                .attr('height',30)
                .attr('stroke','grey')
                .attr('fill','grey')
                .style('visibility','hidden' );
        this.ordre= svg.append('text')
                .attr('x',x+224)
                .attr('y',y+18)
                .attr('fill',"black")
                .style('visibility','hidden' )
                .text("Ordre");
        this.tabP=[];
        y=y+33;
        for (let i = 0; i < tab.length; i++) {
            this.tabP[i]=new Ligne(tab[i],x,y,svg);
            y = y + 33;
        }
    }
    page(idP){
        return this.tabP[idP];
    }
    supp(t){
        this.nb.transition().remove().delay(t);
        this.nbA.transition().remove().delay(t);
        this.id.transition().remove().delay(t);
        this.idA.transition().remove().delay(t);
        this.idc.transition().remove().delay(t);
        this.idcA.transition().remove().delay(t);
        this.val.transition().remove().delay(t);
        this.valA.transition().remove().delay(t);
        this.ordreA.transition().remove().delay(t);
        this.ordre.transition().remove().delay(t);
        for (let i = 0; i < this.tabP.length; i++) {
            this.tabP[i].supp(t);
        }
    }
    hide(t){
        this.nb.transition().style('visibility','hidden').delay(t);
        this.nbA.transition().style('visibility','hidden').delay(t);
        this.id.transition().style('visibility','hidden').delay(t);
        this.idA.transition().style('visibility','hidden').delay(t);
        this.idc.transition().style('visibility','hidden').delay(t);
        this.idcA.transition().style('visibility','hidden').delay(t);
        this.val.transition().style('visibility','hidden').delay(t);
        this.valA.transition().style('visibility','hidden').delay(t);
        this.ordre.transition().style('visibility','hidden').delay(t);
        this.ordreA.transition().style('visibility','hidden').delay(t);
        for (let i = 0; i < this.tabP.length; i++) {
            this.tabP[i].hide(t);
        }
    }
    appear(t){
        this.nb.transition().style('visibility','visible').delay(t);
        this.nbA.transition().style('visibility','visible').delay(t);
        this.id.transition().style('visibility','visible').delay(t);
        this.idA.transition().style('visibility','visible').delay(t);
        this.idc.transition().style('visibility','visible').delay(t);
        this.idcA.transition().style('visibility','visible').delay(t);
        this.val.transition().style('visibility','visible').delay(t);
        this.valA.transition().style('visibility','visible').delay(t);
        this.ordre.transition().style('visibility','visible').delay(t);
        this.ordreA.transition().style('visibility','visible').delay(t);
        for (let i = 0; i < this.tabP.length; i++) {
            this.tabP[i].appear(t);
        }
    }
}
class Ligne {
    constructor(page,x,y,svg){
        this.page = page;
        this.idA=svg.append('rect')
                     .attr('x',x)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',50)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.id =svg.append('text')
                     .attr('x',x+14)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text("P"+page.getIdpage());
        this.valA=svg.append('rect')
                     .attr('x',x+53)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',60)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.val = svg.append('text')
                     .attr('x',x+63)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text(page.valide());
        this.idcA=svg.append('rect')
                     .attr('x',x+116)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',60)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.idc= svg.append('text')
                     .attr('x',x+145)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text(page.getIdcase());
        this.nbA=svg.append('rect')
                     .attr('x',x+179)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',40)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.nb= svg.append('text')
                     .attr('x',x+192)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text(page.getNbUsage());
            this.ordreA=svg.append('rect')
                     .attr('x',x+222)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',40)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
             this.ordre= svg.append('text')
                            .attr('x',x+234)
                            .attr('y',y+18)
                            .attr('fill',"black")
                            .style('visibility','hidden' )
                            .text(page.getOrdre());
        this.svg = svg;
        this.x=x;
        this.y=y;
    }
    presente(dr,dl){
        console.log("doneHreeeerere");

        this.valA.transition().attr('fill',"rgb(28,200,138)").duration(500).delay(dl)
                 .transition().attr('fill','white').duration(1000);
        this.idcA.transition().attr('fill',"rgb(28,200,138)").duration(500).delay(dl)
                 .transition().attr('fill','white').duration(1000);
        this.val.transition().text(this.page.valide()).delay(dl);
        this.idc.transition().text(this.page.getIdcase()).delay(dl);
        this.ordre.transition().text(this.page.getOrdre()).delay(dl);
        
    }
    utiliser(dr,dl){
        console.log("doneHreeeerere");
        this.nbA.transition().attr('fill',"rgb(28,200,138)").duration(500).delay(dl)
                 .transition().attr('fill','white').duration(1000);
        this.nb.transition().text(this.page.getNbUsage()).delay(dl);
    }
    supp(t){
        console.log("doneHreeeerere");

        this.nb.transition().remove().delay(t);
        this.nbA.transition().remove().delay(t);
        this.id.transition().remove().delay(t);
        this.idA.transition().remove().delay(t);
        this.idc.transition().remove().delay(t);
        this.idcA.transition().remove().delay(t);
        this.val.transition().remove().delay(t);
        this.valA.transition().remove().delay(t);
        this.ordre.transition().remove().delay(t);
        this.ordreA.transition().remove().delay(t);
    }
    hide(t){
        this.nb.transition().style('visibility','hidden').delay(t);
        this.nbA.transition().style('visibility','hidden').delay(t);
        this.id.transition().style('visibility','hidden').delay(t);
        this.idA.transition().style('visibility','hidden').delay(t);
        this.idc.transition().style('visibility','hidden').delay(t);
        this.idcA.transition().style('visibility','hidden').delay(t);
        this.val.transition().style('visibility','hidden').delay(t);
        this.valA.transition().style('visibility','hidden').delay(t);
        this.ordre.transition().style('visibility','hidden').delay(t);
        this.ordreA.transition().style('visibility','hidden').delay(t);
    }
    appear(t){
        this.nb.transition().style('visibility','visible').delay(t);
        this.nbA.transition().style('visibility','visible').delay(t);
        this.id.transition().style('visibility','visible').delay(t);
        this.idA.transition().style('visibility','visible').delay(t);
        this.idc.transition().style('visibility','visible').delay(t);
        this.idcA.transition().style('visibility','visible').delay(t);
        this.val.transition().style('visibility','visible').delay(t);
        this.valA.transition().style('visibility','visible').delay(t);
        this.ordre.transition().style('visibility','visible').delay(t);
        this.ordreA.transition().style('visibility','visible').delay(t);
    }
}
class LigneAging {
    constructor(page,x,y,svg){
        this.page = page;
        this.idA=svg.append('rect')
                     .attr('x',x)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',50)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.id =svg.append('text')
                     .attr('x',x+14)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text("P"+page.getIdpage());
        this.valA=svg.append('rect')
                     .attr('x',x+53)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',60)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.val = svg.append('text')
                     .attr('x',x+63)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text(page.valide());
        this.idcA=svg.append('rect')
                     .attr('x',x+116)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',60)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
        this.idc= svg.append('text')
                     .attr('x',x+145)
                     .attr('y',y+18)
                     .attr('fill',"black")
                     .style('visibility','hidden' )
                     .text(page.getIdcase());
            this.ordreA=svg.append('rect')
                     .attr('x',x+179)
                     .attr('y',y)
                     .attr('rx',4)
                     .attr('ry',4)
                     .attr('width',44)
                     .attr('height',30)
                     .attr('stroke','grey')
                     .attr('fill','white')
                     .style('visibility','hidden' );
             this.ordre= svg.append('text')
                            .attr('x',x+189)
                            .attr('y',y+18)
                            .attr('fill',"black")
                            .style('visibility','hidden' )
                            .text(page.getOrdre());
        this.svg = svg;
        this.x=x;
        this.y=y;
    }
    presente(dr,dl){
        console.log("doneHreeeerere");
        this.val.transition().text(this.page.valide()).delay(dl);
        this.idc.transition().text(this.page.getIdcase()).delay(dl);
        this.ordre.transition().text(this.page.getOrdre()).delay(dl);
    }
    utiliser(dr,dl){   
    }
    supp(t){
        console.log("doneHreeeerere");
    
        this.id.transition().remove();
        this.idA.transition().remove();
        this.idc.transition().remove();
        this.idcA.transition().remove();
        this.val.transition().remove();
        this.valA.transition().remove();
        this.ordre.transition().remove();
        this.ordreA.transition().remove();
    }
    hide(t){
    
        this.id.transition().style('visibility','hidden').delay(t);
        this.idA.transition().style('visibility','hidden').delay(t);
        this.idc.transition().style('visibility','hidden').delay(t);
        this.idcA.transition().style('visibility','hidden').delay(t);
        this.val.transition().style('visibility','hidden').delay(t);
        this.valA.transition().style('visibility','hidden').delay(t);
        this.ordre.transition().style('visibility','hidden').delay(t);
        this.ordreA.transition().style('visibility','hidden').delay(t);
    }
    appear(t){
        this.id.transition().style('visibility','visible').delay(t);
        this.idA.transition().style('visibility','visible').delay(t);
        this.idc.transition().style('visibility','visible').delay(t);
        this.idcA.transition().style('visibility','visible').delay(t);
        this.val.transition().style('visibility','visible').delay(t);
        this.valA.transition().style('visibility','visible').delay(t);
        this.ordre.transition().style('visibility','visible').delay(t);
        this.ordreA.transition().style('visibility','visible').delay(t);
    }
}
class TableRef
/*La table de références Affichée*/
{
    constructor(tab,svg,x,y,nbC){
        this.tab=[tab.lenght];
        for (let i = 0; i < tab.length; i++) {
            this.tab[i]=new Colonne(x,y,svg,tab[i],nbC);
            x = x + 33;
        }
    }
    colonne(id){
        return this.tab[id];
    }
    hide(dl,dr){
        for (let i = 0; i < this.tab.length; i++) {
            this.tab[i].hide(dl,dr);
        }
    }
    appear(dl,dr){
        for (let i = 0; i < this.tab.length; i++) {
            this.tab[i].appear(dl,dr);
        }
    }
    supp(dl,dr){
        for (let i = 0; i < this.tab.length; i++) {
            this.tab[i].supp(dl,dr);
        }
    }
}
class Colonne
/*Colonne De La Tab le De Référrences*/
{
    constructor(x,y,svg,id,nb){

        this.svg=svg;
        this.tabRec=[nb];
        this.tabTex=[nb];
        this.idA=svg.append('rect')
                    .attr('x',x)
                    .attr('y',y)
                    .attr('width',30)
                    .attr('height',30)
                    .attr('stroke','grey')
                    .style('visibility','hidden')
                    .attr('fill','grey');

        this.id = svg.append('text')
                     .attr('x',x+14)
                     .attr('y',y+18)
                     .attr('fill',"white")
                     .style('visibility','hidden')
                     .text(id);
        y = y + 33;
        for (let i = 0; i < nb; i++) {
            this.tabRec[i]=svg.append('rect')
                                .attr('x',x)
                                .attr('y',y)
                                .attr('width',30)
                                .attr('height',30)
                                .attr('stroke','grey')
                                .style('visibility','hidden')
                                .attr('fill','white');
            this.tabTex[i] = svg.append('text')
                                .attr('x',x+14)
                                .attr('y',y+18)
                                .style('visibility','hidden')
                                .attr('fill',"black");
            y = y + 33;
        }
    }
    inserer(tab,dl){
        this.idA.transition().attr('fill','yello').duration(500).delay(dl)
                .transition().attr('fill','grey').duration(1000);
        for (let i = 0; i < tab.length; i++) {
            this.tabTex[i].transition().text(tab[i]).delay(dl);
        }
    }
    hide(dl,dr){
        for (let i = 0; i < this.tabRec.length; i++) {
            this.tabTex[i].transition().style('visibility','hidden').delay(dl).duration(dr);
            this.tabRec[i].transition().style('visibility','hidden').delay(dl).duration(dr);
        }
        this.id.transition().style('visibility','hidden').delay(dl).duration(dr);
        this.idA.transition().style('visibility','hidden').delay(dl).duration(dr);   
    }
    appear(dl,dr){
        for (let i = 0; i < this.tabRec.length; i++) {
            this.tabTex[i].transition().style('visibility','visible').delay(dl).duration(dr);
            this.tabRec[i].transition().style('visibility','visible').delay(dl).duration(dr);
        }
        this.id.transition().style('visibility','visible').delay(dl).duration(dr);
        this.idA.transition().style('visibility','visible').delay(dl).duration(dr);   
    }
    supp(dl,dr){
        for (let i = 0; i < this.tabRec.length; i++) {
            this.tabTex[i].transition().remove().delay(dl);
            this.tabRec[i].transition().remove().delay(dl);
        }
        this.id.transition().remove().delay(dl);
        this.idA.transition().remove().delay(dl);       
    }
}
class Registre 
{
    constructor(svg,taille,x,y,registre){
        this.reg = registre;
        this.tabRec=[];
        this.tabTex=[];
        this.tabX=[];
        this.taille=taille;
        this.x=x;
        this.y=y;
        this.svg=svg;
        this.bitEntr =   svg.append('rect')
                            .attr('x',x)
                            .attr('y',y)
                            .attr('rx',2)
                            .attr('ry',2)
                            .attr('width',30)
                            .attr('height',30)
                            .attr('fill',"rgb(28,200,138)")
                            .style('visibility','hidden' );
            this.bit=svg.append('text')
                        .attr('x',x+11)
                        .attr('y',y+18)
                        .attr('fill',"white")
                        .text("0")
                        .style('visibility','hidden' );
            x=x+50;
            let gray = 202020;
            for (let i = 0; i < taille; i++) {
            this.tabRec[i]=svg.append('rect')
                            .attr('x',x)
                            .attr('y',y)
                            .attr('rx',2)
                            .attr('ry',2)
                            .attr('width',30)
                            .attr('height',30)
                            .attr('fill','#'+gray)
                            .style('visibility','hidden' );
            this.tabTex[i]=svg.append('text')
                            .attr('x',x+11)
                            .attr('y',y+18)
                            .attr('fill',"white")
                            .text("0")
                            .style('visibility','hidden' );
            this.tabX[i]=x;
            x=x+33;
            gray+=101010;
        }
    }
    insererRi(ri,t){
        let riRec=this.svg.append('rect')
                          .attr('x',this.x)
                          .attr('y',this.y+60)
                          .attr('rx',2)
                          .attr('ry',2)
                          .attr('width',30)
                          .attr('height',30)
                          .attr('fill','transparent'); 
        let Ri= this.svg.append('text')
                        .attr('x',this.x+11)
                        .attr('y',this.y+78)
                        .attr('fill',"transparent")
                        .text(ri);   
        this.bitEntr.transition().attr('y',this.y-60).attr('fill','transparent').duration(2000).delay(t).remove();
        this.bit.transition().attr('y',this.y-60+18).attr('fill','transparent').duration(2000).delay(t).remove();
        riRec.transition().attr('y',this.y).attr('fill',"rgb(28,200,138)").duration(2000).delay(t);
        Ri.transition().attr('y',this.y+18).attr('fill','white').duration(2000).delay(t);
        this.bitEntr=riRec;
        this.bit=Ri;
    }
    decaler(t){
        this.tabRec[this.taille-1].transition().attr('x',this.tabX[this.taille-1]+60).attr('fill','transparent').duration(2000).delay(t);
        this.tabTex[this.taille-1].transition().attr('x',this.tabX[this.taille-1]+74).attr('fill','transparent').duration(2000).delay(t);
        for (let i = this.taille-2; i>=0; i--) {
            this.tabRec[i].transition().attr('x',this.tabX[i]+33).attr('fill','#'+(202020+(i+1)*101010)).duration(2000).delay(t);
            this.tabTex[i].transition().attr('x',this.tabX[i]+44).duration(2000).delay(t);
            this.tabRec[i+1]=this.tabRec[i];
            this.tabTex[i+1]=this.tabTex[i];           
        }
        this.bitEntr.transition().attr('x',this.x+50).attr('fill','#202020').duration(2000).delay(t);
        this.bit.transition().attr('x',this.x+61).duration(2000).delay(t);
        this.tabRec[0]=this.bitEntr;
        this.tabTex[0]=this.bit;
        this.bitEntr =this.svg.append('rect')
                            .attr('x',this.x)
                            .attr('y',this.y)
                            .attr('rx',2)
                            .attr('ry',2)
                            .attr('width',30)
                            .attr('height',30)
                            .attr('fill','transparent');
        this.bit=this.svg.append('text')
                    .attr('x',this.x+11)
                    .attr('y',this.y+18)
                    .attr('fill',"transparent")
                    .text("0");
        this.bitEntr.transition().attr('fill',"rgb(28,200,138)").duration(2000).delay(1000+t);
        this.bit.transition().attr('fill','white').duration(2000).delay(1000+t);
    }
    miseA0(t){
        for (let i = 0; i < this.taille; i++) {
            this.tabTex[i].transition().attr('fill','transparent').duration(500).delay(t);
        }
        for (let i = 0; i < this.taille; i++) {
            this.tabTex[i].transition().text("0").attr('fill','white').duration(500).delay(t+500);
        }
    }
    hide(t){
        this.bit.transition().style('visibility','hidden').duration(500).delay(t)
        this.bitEntr.transition().style('visibility','hidden').duration(500).delay(t)
        for (let i = 0; i < this.taille; i++) {
            this.tabRec[i].transition().style('visibility','hidden').duration(500).delay(t);    
            this.tabTex[i].transition().style('visibility','hidden').duration(500).delay(t);
        }
    }
    appear(t){
        this.bit.transition().style('visibility','visible').duration(500).delay(t)
        this.bitEntr.transition().style('visibility','visible').duration(500).delay(t)
        for (let i = 0; i < this.taille; i++) {
            this.tabRec[i].transition().style('visibility','visible').duration(500).delay(t);    
            this.tabTex[i].transition().style('visibility','visible').duration(500).delay(t);
        }
    }
}
class TabReg
{
    constructor(nb,taille,x,y,svg){
        this.tab=[];
        this.tabRect=[];
        this.tabY=[];
        this.tabTxt=[];
        this.y=y;
        this.x=x;
        this.taille=taille;
        for (let i = 0; i < nb; i++) {
            this.tab[i]= new Registre(svg,taille,x,y);
            this.tabRect[i]=svg.append('rect')
                                .attr('x',this.x-4)
                                .attr('y',y)
                                .attr('width',taille*30+100)
                                .attr('height',33)
                                .attr('fill','#404040')
                                .style('visibility','hidden')
                                .attr('opacity',0.8);  
            this.tabY[i]=y;
            this.tabTxt[i]=svg.append('text')
                                .attr('x',this.x-34)
                                .attr('y',y+18)
                                .attr('fill','white')
                                .style('visibility','hidden')
                                .text('P'+i); 
            y = y + 40;  
        }
        this.svg=svg; 
    }
    activerReg(i,t){
        this.tabRect[i].transition().attr('opacity',0).duration(500).delay(t);
        console.log("activer");
    }
    desactiverReg(i,t){
        this.tabRect[i]=this.svg.append('rect')
                        .attr('x',this.x-4)
                        .attr('y',this.tabY[i])
                        .attr('width',this.taille*30+100)
                        .attr('height',33)
                        .attr('fill','#404040')
                        .style('visibility','hidden')
                        .attr('opacity',0.8);  
        this.tabRect[i].transition().style('visibility','visible').attr('opacity',0.8).duration(500).delay(t);        
    }
    insereRi(ri,i,t){
        this.tab[i].insererRi(ri,t);
    }
    decale(i,t){
        this.tab[i].decaler(t);
    }
    hide(dl,dt){    
        for (let i = 0; i< this.tab.length; i++) {
            this.tab[i].hide(dl);
            this.tabRect[i].transition().style('visibility','hidden').delay(dl);
            this.tabTxt[i].transition().style('visibility','hidden').delay(dl);
        }
    }
    appear(dl,dt){
        for (let i = 0; i < this.tab.length; i++) {
            this.tab[i].appear(dl);
            this.tabRect[i].transition().style('visibility','visible').delay(dl);
            this.tabTxt[i].transition().style('visibility','visible').delay(dl);

        }
    }
    getReg(idP){
        return this.tab[idP];
    }
}
class chemain{
    constructor(svg,x,y,couleur,w,h){
        this.svg=svg;
        this.rect=svg.append('rect')
                     .attr('x',x)
                     .attr('y',y)
                     .attr('width',w)
                     .attr('height',h)
                     .attr('fill',couleur)
                     .attr('rx',3)
                     .style('visibility','visible');
        this.Xinit=x;
        this.Yinit=y;
        this.couleur=couleur;
    }
    glisserV(dl,dr,y){

        this.rect.transition().duration(dr).delay(dl).attr('y',y);
    }
    glisserH(dl,dr,x){
        this.rect.transition().duration(dr).delay(dl).attr('x',x);       
    }
    hide(dl,dr){
        this.rect.transition().style('visibility','hidden').duration(dr).delay(dl);
    }
    appear(dl,dr){
        this.rect.transition().style('visibility','visible').duration(dr).delay(dl);
    }
    disappear(dl,dr){
        this.rect.transition().attr('fill','transparent').duration(dr).delay(dl);
    }
}
class ChaineRef{
    constructor(svg){
        this.chaine=[];
        for (let index = 0; index < 18; index++) {
            this.chaine[index]=d3.select("#G"+index);   
        }
        this.x=184;
        this.y=22;
        this.svg=svg;
    }
    afficher(i,page){
        this.chaine[i].style("visibility","visible");
        this.svg.append('text').attr("x",this.x+i*40+2*i).attr("y",this.y).attr("fill","black").text(page);
    }
    referencer(i){
        this.chaine[i].select("circle").transition(200).attr('fill','rgb(236,104,94)');
    }
    dereferencer(i){
        this.chaine[i].select("circle").transition(200).attr('fill',"rgb(136,238,160)");
    }
    
}
