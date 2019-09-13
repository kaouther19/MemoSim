window.onload=function(){
    let svg = d3.select('#svg');
    let memCP;
    let memVP;
    let fen;
    let com;
    let order=0;
    let j=0;
    let dataTable=[];
    let maxAtteint=false;
    let simulation=false;   
    let nbC=0;
    let nbP=0;
    let nbRef=0;
    let tab=[];
    let recup=false;
    let k=0;
    let chaineRecuperee = false;
    let contin = false;
    let able = false;
    let memC;
    let memV;
    let flou;
    let fenetre;
    let button;
    let text;    
    var commencer = false;
    let tabRef;
    let termineAble=false;
    /********************************************************* */
    let chaine=new ChaineRef(d3.select("#chaine")); 
    document.getElementById("nbC").disabled=true; 
    document.getElementById("nbP").disabled=true; 
    document.getElementById("page").disabled=true; 
    document.getElementById("nbRef").disabled=true; 
    document.getElementById("pageRef").disabled=true; 
  
        chaineRecuperee=false;
        document.getElementById("nbC").disabled=false;
        document.getElementById("nbP").disabled=false;
        document.getElementById("page").disabled=false;
        document.getElementById("nbRef").disabled=false;
        memCP=new MemoireCent(svg,'grey',971,440,5,150,30,971+164,465,"18px",400,'black',5,3,'#C4C4C4C4','#C4C4C4C4');
        memVP= new MemoireVirt(svg,'grey',234,440,5,150,30,290,465,"18px",400,'black',10,3,'#C4C4C4C4',"rgb(28,200,138)");
        d3.select("#affichage").style("visibility","visible");
        d3.select("#chaineText").style('visibility','visible');
        fen=svg.append("rect").attr("x",-400).attr("y",-400).attr("width",2000).attr("height",2000).attr("fill","#DEE6FA").style("opacity",0.8).attr("id","fen");
        com=svg.append("image").attr("x",450).attr("y",310).attr("height",400).attr("width",400).attr("href",'img/commencer2.png').attr("id","commencer");
        d3.select('#commencer').on('click',commence);
        d3.select("#terminer").on('click',termine);
 
   
  

    d3.select("#valider1").on('click',Recupererpage1);
    d3.select("#valider").on('click',RecupererChaine);
        
        document.getElementById('ref').addEventListener('submit', function(e){
            RecupererChaine();
            e.preventDefault();
        }, false); 
        
        document.getElementById('ajout').addEventListener('submit', function(e){
            Recupererpage1();
            e.preventDefault();
        }, false); 
        d3.select("#tour").on('click',tour);    
        /**************Commencer le scénario */ 
function commence () {
            if(commencer){
                /*Animer les boutons*/
                d3.select('#file').on('mouseover',function () {
                    d3.select("#file").attr('fill','lightgrey');});
                d3.select('#file').on('mouseout',function () {
                     d3.select("#file").attr('fill','#C4C4C4');});
                d3.select('#tabP').on('mouseover',function () {
                     d3.select("#tabP").attr('fill','lightgrey');});
                d3.select('#tabP').on('mouseout',function () {
                      d3.select("#tabP").attr('fill','#C4C4C4');});
                d3.select('#reg').on('mouseover',function () {
                      d3.select("#reg").attr('fill','lightgrey');});
                d3.select('#reg').on('mouseout',function () {
                       d3.select("#reg").attr('fill','#C4C4C4');});        
                d3.select('#ok').on('mouseover',function () {
                       d3.select("#ok").style('background-color','white');});
                d3.select('#ok').on('mouseout',function () {
                       d3.select('#ok').style('background-color','rgb(152, 180, 178)');});    
                d3.select('#traduction').on('mouseover',function () {
                       d3.select("#trad").attr('fill','white');});
                d3.select('#traduction').on('mouseout',function () {
                        d3.select("#trad").attr('fill','#C4C4C4');});
                d3.select("#tour").on('click',tour);
                simulation=true;
                termineAble=true;
                document.getElementById("pageRef").disabled=false; 
                d3.select("#suivant").style("visibility","visible").style("cursor","pointer");   
                com.remove();
                fen.remove();
                memCP.remove();
                memVP.remove();
                commencer = false;
                memC=new MemoireCent(svg,'grey',971,440,5,150,30,971+164,465,"18px",400,'black',nbC,3,'#C4C4C4C4','#C4C4C4C4');
                memV= new MemoireVirt(svg,'grey',234,440,5,150,30,290,465,"18px",400,'black',nbP,3,'#C4C4C4C4',"rgb(28,200,138)");
                demande= new Rectangle(svg,'rgb(236,104,94)',299,425,5,20,15,0,0,0,0,'black');
                p= new Rectangle(svg,'rgb(54,185,204)',1037,330,5,20,15,0,0,0,0,'black');
                p.visibility('hidden',0);
                tabRef=new TableRef(tab,svg,1000,650,nbC); 
                {   //Dessiner les fenetres
                     flou =  svg.append('rect')
                        .attr('height',3000)
                        .attr('width',3000)
                        .attr('x',-500)
                        .attr('y',-500)
                        .attr('fill','transparent')
                        .style('visibility','hidden' );
                      fenetre = svg.append('rect')
                        .attr('height',1187/2-10)
                        .attr('width',1404/2)
                        .attr('x',1187/4+40)
                        .attr('y',0)
                        .attr('fill','transparent')
                        .style('visibility','hidden' );
            }
            fifo=new FifoPage(svg,'black',550,500,5,nbC,50,40,'#F6D55C',6,8,950,970,525,48,900,'black');
            fifo.cacherFifo(0);
            mm=new MmuFifo(nbC,nbP,memC,memV,fifo);
            /****** Afficher le mécanisme de traduction d'adresse */
            async function traduction()
            {
            if (able)
            {
            able=false;
            fenetr=new Rectangle(svg,'transparent',200,200,0,1000,640,630,280,20,900,'white'); 
            fenetr.opacity(0,0,0);
            fenetreT=new Texte(svg,'#33403C',630,240,20,900);
            fenetreT.changeText("Traduction d'adresse",1000); 
            fenetr.changeColor('white',10);
            fenetr.opacity(1,500,500);
            
            await sleep(1000);
            traduc=new simAdr(svg);
            fle=new Rectangle(svg,'#DEE6FA',-200,-200,0,3000,3000,630,280,20,900,'white'); 
            fle.opacity(0,0,0);
            continu=d3.select('#svg').append('rect')
                            .attr('rx',30)
                            .attr('ry',30)
                            .attr('height',56)
                            .attr('width',150)
                            .attr('x',610)
                            .attr('y',520)    
                            .attr('fill','grey')
                            .style('visibility','hidden')
                            .style("cursor","pointer");
            textC=svg.append('text')
                .attr('x',650)
                .attr('y',555)
                .attr('fill','white')
                .attr('weight',500)
                .style('visibility','hidden')
                .text('Continuer'); 
            fle.opacity(0.8,16500,500);
            continu.transition().style('visibility','visible').duration(500).delay(16600);
            textC.transition().style('visibility','visible').duration(500).delay(16600);
            continu.on('click',cachsimAdr);
            }
            }
            function cachsimAdr()
                    {
                        fenetreT.remove();
                        traduc.clear();
                        fle.remove(800);
                        fenetr.remove(900);
                        continu.transition().style('visibility','hidden').duration(600);
                        textC.transition().style('visibility','hidden').duration(600);
                        sleep(900);
                        able=true;
                    }
                    /********affichage de la file */
    function afficheFenFifo(delay,dure)
    {
        flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
        fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
        flou.transition().attr('fill',"#DEE6FA").attr('opacity',0.6).duration(500).delay(delay);
        fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(delay+500);
        button=d3.select('#svg').append('rect')
        .attr('rx',20)
        .attr('ry',20)
        .attr('height',40)
        .attr('width',120)
        .attr('x',1187/4+340)
        .attr('y',1404/4+435)     
                            .attr('fill','grey')
                            .style('visibility','hidden')
                            .style("cursor","pointer");
        text=svg.append('text')
        .attr('x',1187/4+364)
        .attr('y',1404/4+460)
                .attr('fill','white')
                .style('visibility','hidden')
                .text('Continuer'); 
        button.transition().style('visibility','visible').duration(500).delay(delay+500+dure);
        text.transition().style('visibility','visible').duration(500).delay(delay+500+dure);
        button.on('click',cacherFen);
    }
    function cacherFen() {
        fifo.cacherFifo(0);
        text.transition().attr('fill','transparent');
        button.transition().attr('fill','transparent');
        fenetre.transition().attr('fill','transparent').duration(500);
        flou.transition().attr('fill','transparent').duration(500);
        fenetre.transition().style('visibility','hidden').delay(500);
        flou.transition().style('visibility','hidden').delay(500);
        button.transition().style('visibility','hidden');
        text.transition().style('visibility','hidden');
        pret=true;
    }
    /********afficher la table de pages */
    function afficherTab()
    {
        flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
        fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
        flou.transition().attr('fill','#DEE6FA').attr('opacity',0.6).duration(500);
        fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(500);
        button=d3.select('#svg').append('rect')
        
        .attr('rx',20)
        .attr('ry',20)
        .attr('height',40)
        .attr('width',120)
        .attr('x',1187/4+340)
        .attr('y',1404/4+435)     
                            .attr('fill','grey')
                            .style("cursor","pointer")
                            .style('visibility','hidden');
        tabPage= new TabPageFifo(svg,mm.tabPages(),nbP,560,410)
        tabPage.appear(1000);
        text=svg.append('text')
        .attr('x',1187/4+364)
        .attr('y',1404/4+460)
                .attr('fill','white')
                .style('visibility','hidden')
                .text('Continuer'); 
        button.transition().style('visibility','visible').duration(500).delay(1000);
        text.transition().style('visibility','visible').duration(500).delay(1000);
        button.on('click',cacherFenTab);
    }
    function cacherFenTab() {
        tabPage.hide(0);
        text.transition().attr('fill','transparent');
        button.transition().attr('fill','transparent');
        fenetre.transition().attr('fill','transparent').duration(500);
        flou.transition().attr('fill','transparent').duration(500);
        fenetre.transition().style('visibility','hidden').delay(500);
        flou.transition().style('visibility','hidden').delay(500);
        button.transition().style('visibility','hidden');
        text.transition().style('visibility','hidden');
    }
    function fileCilck()
    {
        flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
        fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
        flou.transition().attr('fill','#DEE6FA').attr('opacity',0.6).duration(500);
        fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(500);
        button=svg.append('rect')
        .attr('rx',20)
        .attr('ry',20)
        .attr('height',40)
        .attr('width',120)
        .attr('x',1187/4+340)
        .attr('y',1404/4+435)    
                            .attr('fill','grey')
                            .style('visibility','hidden');
        fifo.apparaitreFifo(1000); 
        fifo.textFifo('File des pages en MC',1000);                 
        text=svg.append('text')
                .attr('x',1187/4+364)
                .attr('y',1404/4+460)
                .attr('fill','white')
                .style('visibility','hidden')
                .style("cursor","pointer")
                .text('Continuer'); 
        button.transition().style('visibility','visible').duration(500).delay(1000);
        text.transition().style('visibility','visible').duration(500).delay(1000);
        button.on('click',cacherFen); 
    }
    
    d3.select('#file').on('click',fileCilck)
    d3.select('#file').style("cursor","pointer");
    d3.select('#traduction').on('click',traduction)
    d3.select('#traduction').style("cursor","pointer");
    d3.select('#tabP').on('click',afficherTab);
    d3.select('#tabP').style("cursor","pointer");
    /* LA pagination*/
    let t=0;
    let i=0;
    d3.select('#suivant').on('click',function(){
        if(i>=tab.length){
            if(i>=18){
                swal.fire({
                    title: "Fin  de la simulation",
                    text: "Appuyer pour afficher le bilan de la simulation ",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Bilan'
                      }).then((result) => {
                        if (result.value) {
                            creerTab();
                            termineAble=false;
                        }
                })
                return;
            }
            else if (i<18){
                Swal.fire({
                    title: 'Pas de page à référencer!',
                    text: "Vous pouvez ajouter une référence, ou bien terminer la simulation et afficher son bilan",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: "rgb(28,200,138)",
                    confirmButtonText: 'Terminer la simulation',
                    cancelButtonText: 'Continuer'
                  }).then((result) => {
                    if (result.value) {
                        creerTab();
                        termineAble=false;
                    }
                  })
                  return;
                }
                return;
        }else
        {
            if(able){
                able=false;
                pret=false;
                chaine.referencer(i);
                if(i!=0)
                            chaine.dereferencer(i-1);
                             
        fifo.cacherFifo(0);
        memV.referancer(tab[i],0);
        demande.visibility('visible',0);
        demande.glisserVertic(1000,378,0);
        demande.glisserHoriz(1000,535,1000);
        d3.select('#rect1').transition()
                .style("opacity","0.7")
        d3.select('#rect2').transition()
                .style("opacity","0.7")
        d3.select('#rect3').transition()
                 .style("opacity","0.7")
        d3.select('#etat').transition()
                 .text('');
        /*Referance (utilisation)*/ 
        if(mm.page(tab[i]).valide())
        {   
            d3.select('#etat').transition()
            .delay(2000)
            .attr('x',620)
            .text('Utilisation');

            d3.select('#switch').transition()
                                .delay(2000)
                                .attr('cx',760);
            d3.select('#rect3').transition()
                               .delay(2000)
                               .style("opacity","0")
            demande.visibility('hidden',2000);
            demande.glisserHoriz(0,778,3000);
            demande.visibility('visible',4000);
            afficheFenFifo(2500,500);
            fifo.textFifo('File des pages en MC',3000);
            fifo.apparaitreFifo(3500);
            fifo.etatFifo("Utilisation de la page résidente "+tab[i],3500,570);
            let id= setInterval(function(){
                if(pret)
                {   
                    clearInterval(id);
                    demande.glisserHoriz(1000,1037,0);
                    demande.glisserVertic(1000,425,1000);
                    demande.visibility('hidden',2000);
                    demande.glisser(0,299,425,2100);
                    memC.signe(mm.page(tab[i]).getIdcase(),2000)
                    memC.referencer(mm.page(tab[i]).getIdcase(),2410);
                    memV.chargerPage(tab[i],2000);
                    pret=false;
                    mm.page(tab[i]).utiliser();
                    dataTable.push([
                        "("+j+")",
                        "P"+tab[i],
                        "Utilisation",
                        "Aucune",
                        "C"+mm.page(tab[i]).getIdcase(),
                        tab[i]
                    ]);
                    setTimeout(function(){able=true; i++; t++;j++;},2900);
                    
                }

            },30);
            
            
        }
        else
        {
            if(mm.pleine()===false)
            {   
                
                
                d3.select('#etat').transition()
                .delay(2000)
                .attr('x',620)
                .text('Chargement');
                d3.select('#switch').transition()
                                .delay(2000)
                                .attr('cx',665);
                d3.select('#rect2').transition()
                                .delay(2000)
                               .style("opacity","0")
                let idC= mm.casLibre();
                mm.cas(idC).allouer();
                demande.visibility('hidden',2000);
                demande.glisserHoriz(0,778,3000);
                demande.visibility('visible',4000);
                afficheFenFifo(2500,3500);
                fifo.textFifo('File des pages en MC',3000);
                fifo.apparaitreFifo(3500);
                fifo.etatFifo("Chargement de la page "+tab[i],3500,600);
                mm.chargerpage(tab[i],idC,t,1000,4000);
                let id= setInterval(function(){
                    if(pret)
                    {   
                        clearInterval(id);
                        demande.glisserHoriz(1000,1037,0);
                        demande.visibility('hidden',1000);
                        demande.glisser(0,299,425,1100);
                        p.visibility('visible',1100);
                        p.glisserVertic(1000,425,1100);
                        p.visibility('hidden',2000);
                        p.glisserVertic(0,330,2100);
                        memV.chargerPage(tab[i],2000);
                        memC.allouerCase(idC,tab[i],2000);
                        pret=false;
                        mm.page(tab[i]).utiliser();
                        dataTable.push([
                            "("+j+")",
                            "P"+tab[i],
                            "Chargement",
                            "Aucune",
                            "C"+mm.page(tab[i]).getIdcase(),
                            tab[i]
                        ]);
                        setTimeout(function(){able=true; i++; t++;j++;},2500);
                        
                    }

                },30);   
            }
            else
            {   
                d3.select('#etat').transition()
                .delay(2000)
                .attr('x',620)
                .text('Remplacement');
                d3.select('#switch').transition()
                                    .delay(2000)
                                   .attr('cx',569.5);
                d3.select('#rect1').transition()
                                  .delay(2000)
                                  .style("opacity","0")
                demande.visibility('hidden',2000);
                demande.glisserHoriz(0,778,3000);
                demande.visibility('visible',4000);
                afficheFenFifo(2500,4500);
                fifo.textFifo('File des pages en MC',3000);
                fifo.apparaitreFifo(3500);
                let pag=mm.remplacer(tab[i],t,400,1000,4000);
                fifo.etatFifo("Remplacement de la page "+pag+" par la page "+tab[i],3500,550);
                let idC=mm.page(pag).getIdcase();
                mm.chargerPage(tab[i],idC,t,8000);
                let id= setInterval(function(){
                    if(pret)
                    {   
                        clearInterval(id);
                        demande.glisserHoriz(1000,1037,0);
                        demande.visibility('hidden',1000);
                        demande.glisser(0,299,425,1100);
                        p.visibility('visible',1100);
                        p.glisserVertic(1000,425,1100);
                        p.visibility('hidden',2000);
                        p.glisserVertic(0,330,2100);
                        memC.signe(idC,2000);
                        memV.chargerPage(tab[i],2410);
                        memV.dechargerPage(pag,2000);
                        mm.page(pag).decharger();
                        memC.allouerCase(idC,tab[i],2410);
                        pret=false;
                        mm.page(tab[i]).utiliser();
                        dataTable.push([
                            "("+j+")",
                            "P"+tab[i],
                            "Remplacement",
                            "P"+pag,
                            "C"+mm.page(tab[i]).getIdcase(),
                            tab[i]
                        ]);
                        setTimeout(function(){able=true; i++; t++;j++;},2900);    
                    }

                },30);

                
            
            }
        }
     }
     
 }
})

            }
}
function termine(){
    if(able && termineAble){
    Swal.fire({
        title: 'Terminer la simulation ',
        text: "Un bilan de la simulation s'affichera, mais vous ne pouvez plus la continuez",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "rgb(28,200,138)",
        confirmButtonText: 'Afficher le bilan',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
            creerTab();
            termineAble=false;
        }
      })
    }
}


function tour(){
    var intro = introJs();
    intro.start();
}


function creerTab(){
    if(able){
        d3.select("#svg").remove();
        d3.select("#chaine").remove();
        d3.select("#footer").remove();
        let head = d3.select("#card").append("div").attr("class","card-header");
        head.append("h3").text("Le nombre de cases :"+nbC+", Le nombre de pages :"+nbP);
        let bodyC=d3.select("#card").append("div").attr("class","card-body").style("width","100%");
        bodyC.append("table").attr("id","example").attr("width","80%").style("position","relative").style("left","10%").attr("class","table table-bordered").attr("cellspacing","0");
        $('#example').DataTable( {
            ordering: false,
            data: dataTable,
            columns: [
                { title: "La référence:"},
                { title: "La Page" },
                { title: "Operation" },
                { title: "Victime" },
                { title: "Case mémoire " }
            ]
        });
    }
}


function RecuperernbC(){
    nbC=parseInt(document.getElementById("nbC").value);
    if(nbC==0){
        return false;
    }else{return true;} 
}
function RecuperernbP(){
    nbP=parseInt(document.getElementById("nbP").value);
    if(nbP==0){
        return false;
    }else{return true;} 
}
function RecuperernbRef(){
    nbRef=parseInt(document.getElementById("nbRef").value);
    if(nbRef==0){
        return false;
    }else{return true;} 
}
function Recupererpage(){
    if(!chaineRecuperee){
        /*Les tests*/ 
        if(parseInt(document.getElementById("page").value)>=nbP) {
            Swal.fire("Cette page n'existe pas!")
            return;
        }else if(document.getElementById("page").value==""){
            Swal.fire('Veuillez introduire un nombre correct');
            return;
        }else{
        chaine.afficher(k,parseInt(document.getElementById("page").value))
        tab[k]=parseInt(document.getElementById("page").value);
        console.log("done");
        k++;
        d3.select("#cpt1").text(k+1);
        /*Création de l'élément dans la chaine*/
        if(k==nbRef){    
            able=true;
            chaineRecuperee=true;
            document.getElementById('page').value = '';
            document.getElementById('page').placeholder ='GO!';
            document.getElementById("page").disabled=true;
            if(!contin){
                commencer=true;
            }else{
                tabRef.supp(0);
                tabRef=new TableRef(tab,svg,1000,650,nbC);
            }
        }else{
            d3.select("#cpt").text(k+1);
        }
    }
    }
}
function Recupererpage1(){
    if(simulation && !maxAtteint){
        /*Les tests*/ 
        if(parseInt(document.getElementById("pageRef").value)>=nbP) {
            Swal.fire("Cette page n'existe pas!")
            return;
        }else {
            if(document.getElementById("pageRef").value == ""){
                Swal.fire('Veuillez introduire un nombre correct');
                return;
            }else{
            chaine.afficher(k,parseInt(document.getElementById("pageRef").value))
            tab[k]=parseInt(document.getElementById("pageRef").value);
            k++;
            /*Création de l'élément dans la chaine*/
            if(k==18){
                document.getElementById("pageRef").disable=true;
                maxAtteint=true;
            }else{
                d3.select("#cpt1").text(k+1);
            }
        }
    }
    }
}
function RecupererChaine(){
    if(!recup){
        if(!RecuperernbC()){
            alert('Veuillez introduire le nombre de cases');
            return;
        }
        if(!RecuperernbP()){
            alert('Veuillez introduire le nombre de pages');
            return;
        }
        if(!RecuperernbRef()){
            alert('Veuillez introduire le nombre de références');
            return;
        }
        document.getElementById("nbC").disabled=true;
        document.getElementById("nbP").disabled=true;
        document.getElementById("nbRef").disabled=true;
        recup=true;
    }
    Recupererpage();
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

}