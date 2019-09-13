
window.onload = function(){
     /*Ce code gère l'animation de pagination Lfu ging en faisant appel aux différentges classes d'affichage et de noyau */
    //Les variables
    let memCP;
    let memVP;
    let fen;
    let com;
    let ordre=0;
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
    let svg = d3.select('#svg2');
    let memC;
    let memV;
    let flou;
    let fenetre;
    let button;
    let text;    
    var commencer = false;
    let chaine=new ChaineRef(d3.select("#chaine"));
    /***********************************************/ 
    document.getElementById("nbC").disabled=true; 
    document.getElementById("nbP").disabled=true; 
    document.getElementById("page").disabled=true; 
    document.getElementById("nbRef").disabled=true; 
    d3.select("#senario").style("cursor","pointer");
    d3.select("#exemple").style("cursor","pointer");
    d3.select("#senario").on('click',function(){
        chaineRecuperee=false;
        document.getElementById("nbC").disabled=false;
        document.getElementById("nbP").disabled=false;
        document.getElementById("page").disabled=false;
        document.getElementById("nbRef").disabled=false;
        d3.select("#illustration").remove();
        d3.select("#svg2").attr("viewBox","220 200 900 650");
        d3.select("#affichage").style("visibility","visible");
        memCP = new Memoire(svg,6,'#C4C4C4',971,440);
        memVP = new memoireVirtuelle(svg,10,'#C4C4C4',234,440);
        d3.select("#chaineText").style('visibility','visible');
        fen=svg.append("rect").attr("x",-400).attr("y",-400).attr("width",2000).attr("height",2000).attr("fill","#DEE6FA").style("opacity",0.8).attr("id","fen");
        com=svg.append("image").attr("x",450).attr("y",310).attr("height",400).attr("width",400).attr("href",'img/commencer2.png').attr("id","commencer").style("cursor","pointer");
        d3.select('#commencer').on('click',commence);
        d3.select("#terminer").on('click',termine);

    })
    /*Effets d'affichage */
    d3.select("#exemple").on('click',function(){
        exemple();
     })
    d3.select("#exemple").on('mouseover',function(){
        d3.select("#exe").attr("fill","#6EC5A8");})
    d3.select("#senario").on('mouseover',function(){
            d3.select("#sen").attr("fill","#6EC5A8");  
    })
    d3.select("#exemple").on('mouseout',function(){
        d3.select("#exe").attr("fill","#00AA71");})
    d3.select("#senario").on('mouseout',function(){
            d3.select("#sen").attr("fill","#00AA71");
    })
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
    /*********************************************************** */
    function commence() {
        /*Commencer une simulation  */
        if(commencer){
            d3.select('#file').on('mouseover',function () {
                d3.select("#file").attr('fill','lightgrey');});
            d3.select('#file').on('mouseout',function () {
                 d3.select("#file").attr('fill','#C4C4C4');});
            d3.select('#tabP').on('mouseover',function () {
                 d3.select("#tabP").attr('fill','lightgrey');});
            d3.select('#tabP').on('mouseout',function () {
                  d3.select("#tabP").attr('fill','#C4C4C4');});
            d3.select('#Reg').on('mouseover',function () {
                  d3.select("#Reg").attr('fill','lightgrey');});
            d3.select('#Reg').on('mouseout',function () {
                   d3.select("#Reg").attr('fill','#C4C4C4');});           
            d3.select('#traduction').on('mouseover',function () {
                   d3.select("#trad").attr('fill','white');});
            d3.select('#traduction').on('mouseout',function () {
                    d3.select("#trad").attr('fill','#C4C4C4');});
            console.log("LA table")
            console.log(tab);
            simulation=true;
            d3.select("#suivant").style("visibility","visible").style("cursor","pointer");    
            com.remove();
            fen.remove();
            memCP.remove();
            memVP.remove();
            commencer = false;
            memC = new Memoire(svg,nbC,'#C4C4C4',971,440);
            memV = new memoireVirtuelle(svg,nbP,'#C4C4C4',234,440);
            
        /*il faut dessiner  avant la table et le petit à cause de l'ordre*/ 
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
        let M= new Mmu(nbC,nbP,6,memC,memV,250,50,svg);
        d3.selectAll('#tabP').on('click',fenTabApp);
        /*M vas dessiner le tableau, mais dans le constructeur du tableau on affecte au style hidden c pr ça ma ybanch*/
        /*fonction qui fait apparaitre le tableau et la fenetre et l'espace flou*/
        function fenTabApp(){
             //afficher le fenetre contenant la table en appuiyant
            flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
            fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
            flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500);
            fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(500);
            M.getTabPages().appear(1000);
            button=svg.append('rect')
                                .attr('rx',20)
                                .attr('ry',20)
                                .attr('height',40)
                                .attr('width',120)
                                .attr('x',1187/4+340)
                                .attr('y',1404/4+435)   
                                .style("cursor","pointer") 
                                .attr('fill','transparent');
            text=svg.append('text')
                    .attr('x',1187/4+364)
                    .attr('y',1404/4+460)
                    .attr('fill','transparent')
                    .text('Continuer'); 
    
            text1= svg.append('text')
                    .attr('x',1187/4+300)
                    .attr('y',1404/4-36)
                    .attr('fill','white')
                    .style('visibility','hidden')
                    .attr('font-size',28)
                    .text('La table de pages');
            text1.transition().style('visibility','visible').delay(1000);
            button.transition().attr('fill','grey').duration(500).delay(1000);
            text.transition().attr('fill','white').duration(500).delay(1000);
            button.on('click',cacherFen);
        }
         /*fonction pour cacher le fenetre*/
        function cacherFen() {
            button.remove()
            fenetre.transition().attr('fill','transparent').duration(500);
            flou.transition().attr('fill','transparent').duration(500);
            text1.transition().attr('fill','transparent').duration(500);
            text1.transition().style('visibility','hidden').delay(500);
            fenetre.transition().style('visibility','hidden').delay(500);
            flou.transition().style('visibility','hidden').delay(500);
            text.transition().style('visibility','hidden').delay(500);
            M.getTabPages().hide(0);
        }
        //Affichage des fenetres
        function fenTabAutoCharg(t,idC){   
            flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
            fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
            flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500).delay(t);
            fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(t+500);
            M.getTabPages().appear(t+1000);
            text1= svg.append('text')
                      .attr('x',1187/4+300)
                      .attr('y',1404/4-36)
                      .attr('fill','white')
                      .style('visibility','hidden')
                      .attr('font-size',28)
                      .text('La table de pages');
            text1.transition().style('visibility','visible').delay(t+1000);
            text2= svg.append('text')
                        .attr('x',1187/4+250)
                        .attr('y',1404/4+420)
                        .attr('fill','white')
                        .style('visibility','hidden')
                        .attr('font-size',22)
                        .text('Chargement dans la case : C'+idC);
            text2.transition().style('visibility','visible').delay(t+1000);
            button=svg.append('rect')
                                    .attr('rx',20)
                                    .attr('ry',20)
                                    .attr('height',40)
                                    .attr('width',120)
                                    .attr('x',1187/4+340)
                                    .attr('y',1404/4+435) 
                                    .style("cursor","pointer")   
                                    .attr('fill','transparent');
            text=svg.append('text')
                    .attr('x',1187/4+364)
                    .attr('y',1404/4+460)
                    .attr('fill','transparent')
                    .text('Continuer'); 
            button.transition().attr('fill','grey').duration(500).delay(1000+t);
            text.transition().attr('fill','white').duration(500).delay(1000+t);
            button.on('click',function(){
                cacherFen();
                text2.transition().attr('fill','transparent').delay(0);
                text2.transition().style('visibility','hidden').delay(0);
                let rect1=new chemain(svg,778,378,'rgb(236,104,94)',16,15);
                rect1.hide(0,0);
                rect1.appear(500,0);
                rect1.glisserH(500,1000,1037);  
                rect1.disappear(1500,500);   
                let rect2=new chemain(svg,1037,332,'#3382E2',16,15);
                rect2.hide(0,0);
                rect2.appear(2000,0);                    
                rect2.glisserV(2000,1000,423);
                rect2.disappear(3000,500);                      
                memC.allouer(idC,tab[i],0,2800);
                memV.pageM(tab[i]).charger(0,2800);
                j=i+1;
                //tabRef.colonne(i).inserer(M.getTabEtat(),0);
                dataTable.push([
                    "("+j+")",
                    "P"+tab[i],
                    "Chargement",
                    "Aucune",
                    M.page(tab[i]).getNbUsage()+" fois",
                    M.page(tab[i]).getOrdre(),
                    "C"+M.page(tab[i]).getIdcase(),
                    tab[i]
                ]);
                sleep(2800).then(()=>{
                    i++;
                    able=true;
                })
            });
        }  
        function fenTabAutoRef(t){   
            flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
            fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
            flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500).delay(t);
            fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(t+500);
            M.getTabPages().appear(t+1000);
            text1= svg.append('text')
                      .attr('x',1187/4+300)
                      .attr('y',1404/4-36)
                      .attr('fill','white')
                      .style('visibility','hidden')
                      .attr('font-size',28)
                      .text('La table de pages');
            text1.transition().style('visibility','visible').delay(t+1000);
            text2= svg.append('text')
                        .attr('x',1187/4+240)
                        .attr('y',1404/4+420)
                        .attr('fill','white')
                        .style('visibility','hidden')
                        .attr('font-size',22)
                        .text('Incrémentation du nombre de références');
            text2.transition().style('visibility','visible').delay(t+1000);
            button=svg.append('rect')
                                    .attr('rx',20)
                                    .attr('ry',20)
                                    .attr('height',40)
                                    .attr('width',120)
                                    .attr('x',1187/4+340)
                                    .attr('y',1404/4+435)    
                                    .attr('fill','transparent')
                                    .style("cursor","pointer")
            text=svg.append('text')
                    .attr('x',1187/4+364)
                    .attr('y',1404/4+460)
                    .attr('fill','transparent')
                    .text('Continuer'); 
            button.transition().attr('fill','grey').duration(500).delay(1000+t);
            text.transition().attr('fill','white').duration(500).delay(1000+t);
            button.on('click',function(){
                cacherFen();
                text2.transition().attr('fill','transparent').delay(0);
                text2.transition().style('visibility','hidden').delay(0);
                let rect1=new chemain(svg,778,378,'rgb(236,104,94)',16,15);
                rect1.hide(0,0);
                rect1.appear(500,0);
                rect1.glisserH(500,1000,1037);                   
                rect1.glisserV(2000,1000,423);
                rect1.disappear(3000,500);                      
                memC.caseM(idC).referencer(0,2500);
                memV.pageM(tab[i]).charger(0,2800);
                //tabRef.colonne(i).inserer(M.getTabEtat(),0);
                j=i+1;
                dataTable.push([
                    "("+j+")",
                    "P"+tab[i],
                    "Utilisation",
                    "Aucune",
                    M.page(tab[i]).getNbUsage()+" fois",
                    M.page(tab[i]).getOrdre(),
                    "C"+M.page(tab[i]).getIdcase()
                ]);
                sleep(2800).then(()=>{
                    i++;
                    able=true;
                })
                
            });
        }  
        function fenTabAutoRemp(t){   
            flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
            fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
            flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500).delay(t);
            fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(t+500);
            M.getTabPages().appear(t+1000);
            text1= svg.append('text')
                      .attr('x',1187/4+300)
                      .attr('y',1404/4-36)
                      .attr('fill','white')
                      .style('visibility','hidden')
                      .attr('font-size',28)
                      .text('La table de pages');
            text1.transition().style('visibility','visible').delay(t+1000);
            text2= svg.append('text')
                        .attr('x',1187/4+240)
                        .attr('y',1404/4+420)
                        .attr('fill','white')
                        .style('visibility','hidden')
                        .attr('font-size',22)
                        .text('La page à remplacer : P'+victime);
            text2.transition().style('visibility','visible').delay(t+1000);
            button=svg.append('rect')
                                    .attr('rx',20)
                                    .attr('ry',20)
                                    .attr('height',40)
                                    .attr('width',120)
                                    .attr('x',1187/4+340)
                                    .attr('y',1404/4+435)  
                                    .style("cursor","pointer")  
                                    .attr('fill','transparent');
            text=svg.append('text')
                    .attr('x',1187/4+364)
                    .attr('y',1404/4+460)
                    .attr('fill','transparent')
                    .text('Continuer'); 
            button.transition().attr('fill','grey').duration(500).delay(1000+t);
            text.transition().attr('fill','white').duration(500).delay(1000+t);
            button.on('click',function(){
                cacherFen();
                text2.transition().attr('fill','transparent').delay(0);
                text2.transition().style('visibility','hidden').delay(0);
                let rect1=new chemain(svg,778,378,'rgb(236,104,94)',16,15);
                rect1.hide(0,0);
                rect1.appear(500,0);
                rect1.glisserH(500,1000,1037);                   
                rect1.disappear(1500,500);                      
                let rect3=new chemain(svg,1037,332,'#3382E2',16,15);
                rect3.hide(0,0);
                rect3.appear(3200,0);                    
                rect3.glisserV(3200,1000,423);
                rect3.disappear(4200,500);                      
                memC.caseM(idC).remplacer(tab[i],0,2000)//(idC,);
                memV.pageM(tab[i]).charger(0,4000);
                memV.pageM(victime).decharger(0,4000);
                //tabRef.colonne(i).inserer(M.getTabEtat(),0);
                j=j+1;
                dataTable.push([
                    "("+j+")",
                    "P"+tab[i],
                    "Remplacement",
                    "P"+victime,
                    M.page(tab[i]).getNbUsage()+" fois",
                    M.page(tab[i]).getOrdre(),
                    "C"+M.page(tab[i]).getIdcase()
                ]);   
                sleep(4000).then(()=>{
                    i++; 
                    able=true;
                })       
            });
        }   
        /*traduction des adresses*/
        async function traduction()
        {
            console.log("able false")
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
         continu=d3.select('#svg2').append('rect')
                        .attr('rx',30)
                        .attr('ry',30)
                        .attr('height',56)
                        .attr('width',150)
                        .attr('x',610)
                        .attr('y',520)    
                        .attr('fill','grey')
                        .style('visibility','hidden')
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
        /**Evenemnts de touche du MMU  */
        d3.select("#traduction").on("click",traduction);  
        d3.select("#tabP").style("cursor","pointer");
        d3.select("#tabP").on('click',fenTabApp);
        /*traitement des cas de La pagination */ 
        let i=0;
        let idC;
        let victime;
        d3.select('#suivant').on('click',function(){
            if(i>=tab.length){
                if(i>=18){
                    Swal.fire({
                        title: 'Fin de la simulation ',
                        text: "Appuyer pour afficher le bilan de la simulation ",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Bilan'
                      }).then((result) => {
                        if (result.value) {
                            creerTab();
                        }
                      })
                    
                    return;
                }else if(i<18){
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
                        }
                      })
                      return;
                }
                return;
            }else{
                if(able){
                    able=false;
                    chaine.referencer(i);
                    if(i!=0)
                        chaine.dereferencer(i-1);
                    if(M.page(tab[i]).valide()){

                        /* reférencer */
                        d3.select('#etat').transition().attr('x',620).text('Utilisation');
            
                        d3.select('#switch').transition()
                                            .attr('cx',760);
                        d3.select('#rect1').transition()
                                        .style("opacity","0.7")
                        d3.select('#rect2').transition()
                                        .style("opacity","0.7")
                        d3.select('#rect3').transition()
                                        .style("opacity","0")
                        memV.pageM(tab[i]).referencer(0);
                        let rectang=new chemain(svg,301,423,'rgb(236,104,94)',16,15);
                        rectang.glisserV(0,1000,378);
                        rectang.glisserH(1000,2000,538);
                        fenTabAutoRef(3000,0);
                        rectang.hide(3000,0);
                        M.page(tab[i]).utiliser();
                        idC =M.page(tab[i]).getIdcase();
                        M.getTabPages().page(tab[i]).utiliser(0,5000);
                    }else{
                        if(!M.getMemPleine()){
                        /* chargement direct */ 
                            d3.select('#etat').transition().attr('x',620)
                            .text('Chargement');
                            d3.select('#switch').transition()
                                            .attr('cx',665);
                            d3.select('#rect1').transition()
                                        .style("opacity","0.7")
                            d3.select('#rect2').transition()
                                        .style("opacity","0")
                            d3.select('#rect3').transition()
                                        .style("opacity","0.7")
                            memV.pageM(tab[i]).referencer(0);
                            let rectang=new chemain(svg,301,423,'rgb(236,104,94)',16,15);
                            rectang.glisserV(0,1000,378);
                            rectang.glisserH(1000,2000,538);
                            let idC = M.casLibre();
                            fenTabAutoCharg(3000,idC);
                            rectang.hide(3000,0);
                            M.cas(idC).allouer();
                            ordre++;
                            console.log(ordre);
                            
                            M.chargerPage(tab[i],idC,Date.now(),ordre,0,5000);
                            M.page(tab[i]).utiliser();
                            M.getTabPages().page(tab[i]).utiliser(0,5000);
                        }else{
                                /*remplacement*/
                                    d3.select('#etat').transition().attr('x',620).text('Remplacement');
                                    d3.select('#switch').transition()
                                                    .attr('cx',569.5);
                                    d3.select('#rect1').transition()
                                                    .style("opacity","0")
                                    d3.select('#rect2').transition()
                                                    .style("opacity","0.7")
                                    d3.select('#rect3').transition()
                                                    .style("opacity","0.7")    
                                    memV.pageM(tab[i]).referencer(0);
                                    let rectang=new chemain(svg,301,423,'rgb(236,104,94)',16,15);
                                    rectang.glisserV(0,1000,378);
                                    rectang.glisserH(1000,2000,538);
                                    victime = M.victime();
                                    fenTabAutoRemp(3000);
                                    rectang.hide(3000,0);
                                    ordre++;
                                    idC=M.remplacer(victime,tab[i],Date.now(),0,5000,ordre);
                                    M.page(tab[i]).utiliser();
                                    M.getTabPages().page(tab[i]).utiliser(0,5000);
                                }
                            }
                        }     
                    }
                    console.log(dataTable);  
                });
        }
    }
    function termine(){
        /** Terminer la simulation*/
        if(able){
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
                simulation = false;
                document.getElementById("ajout").disabled = true;
                able=false;
                creerTab();
            }
          })
        }
    }
    function exemple(){
        /*Lancer l'exemple */
         d3.select("#illustration").remove();
         d3.select("#svg2").attr("viewBox","220 200 900 650");
         d3.select("#affichage").style("visibility","visible");
         nbC=3;
         nbP=5;
         tab=[0,1,3,0,2];
         memC = new Memoire(svg,nbC,'#C4C4C4',971,440);
         memV = new memoireVirtuelle(svg,nbP,'#C4C4C4',234,440);
         var intro = introJs();
         intro.start();
         intro.onexit(function(){
             Swal.fire({
                 title: 'Exemple',
                 html: "Dans cette exemple animé, les données utilisées sont : <br> - Nombre de page : 5 <br> - Nombre de cases: 3 <br> - Chaine de référence : 0 , 1, 3, 0, 2.",                 animation: false,
                 showConfirmButton : true,
                 confirmButtonText: 'Commencer',
               }).then((result) => {
                chaine.afficher(0,0)
                chaine.afficher(1,1)
                chaine.afficher(2,3)
                chaine.afficher(3,0)
                chaine.afficher(4,2)
                d3.select("#cpt").text(6)
                d3.select("#cpt1").text(6);        
               commencer=true; 
               able=true;
               k=5;
               
               commenceExemple();
               })
         })

    }
    function commenceExemple() {

         if(commencer){
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
            simulation=true;
            d3.select("#suivant").style("visibility","visible").style("cursor","pointer");    
            commencer = false;
            able = false;
             /*il faut dessiner hadak le carée flou lkbir avant la table et le petit 3la jal l'ordre*/ 
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
         let M= new Mmu(nbC,nbP,6,memC,memV,250,50,svg);

         /*M vas dessiner le tableau, mais dans le constructeur du tableau on affecte au style hidden c pr ça ma ybanch*/
         /*fonction qui fait apparaitre le tableau et la fenetre et l'espace flou*/
         function fenTabApp(){
              //afficher le fenetre contenant la table en appuiyant
             flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
             fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
             flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500);
             fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(500);
             M.getTabPages().appear(1000);
             button=svg.append('rect')
                                 .attr('rx',20)
                                 .attr('ry',20)
                                 .attr('height',40)
                                 .attr('width',120)
                                 .attr('x',1187/4+340)
                                 .attr('y',1404/4+435)    
                                 .attr('fill','transparent');
             text=svg.append('text')
                     .attr('x',1187/4+364)
                     .attr('y',1404/4+460)
                     .attr('fill','transparent')
                     .text('Continuer'); 
    
             text1= svg.append('text')
                     .attr('x',1187/4+300)
                     .attr('y',1404/4-36)
                     .attr('fill','white')
                     .style('visibility','hidden')
                     .attr('font-size',28)
                     .text('La table de pages');
             text1.transition().style('visibility','visible').delay(1000);
             button.transition().attr('fill','grey').duration(500).delay(1000);
             text.transition().attr('fill','white').duration(500).delay(1000);
             button.on('click',cacherFen);
         }
          /*fonction pour cacher le fenetre*/
         function cacherFen() {
             text.transition().attr('fill','transparent').duration(0);
             button.remove()
             fenetre.transition().attr('fill','transparent').duration(500);
             flou.transition().attr('fill','transparent').duration(500);
             text1.transition().attr('fill','transparent').duration(500);
             text1.transition().style('visibility','hidden').delay(500);
             fenetre.transition().style('visibility','hidden').delay(500);
             flou.transition().style('visibility','hidden').delay(500);

             text.transition().style('visibility','hidden').delay(500);
             M.getTabPages().hide(0);
         }
         function fenTabAutoChargExe(t,idC){   
             flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
             fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
             flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500).delay(t);
             fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(t+500);
             M.getTabPages().appear(t+1000);
             text1= svg.append('text')
                       .attr('x',1187/4+300)
                       .attr('y',1404/4-36)
                       .attr('fill','white')
                       .style('visibility','hidden')
                       .attr('font-size',28)
                       .text('La table de pages');
             text1.transition().style('visibility','visible').delay(t+1000);
             text2= svg.append('text')
                         .attr('x',1187/4+250)
                         .attr('y',1404/4+420)
                         .attr('fill','white')
                         .style('visibility','hidden')
                         .attr('font-size',22)
                         .text('Chargement dans la case : C'+idC);
             text2.transition().style('visibility','visible').delay(t+1000);
             button=svg.append('rect')
                                     .attr('rx',20)
                                     .attr('ry',20)
                                     .attr('height',40)
                                     .attr('width',120)
                                     .attr('x',1187/4+340)
                                     .attr('y',1404/4+435)    
                                     .attr('fill','transparent');
             text=svg.append('text')
                     .attr('x',1187/4+364)
                     .attr('y',1404/4+460)
                     .attr('fill','transparent')
                     .text('Continuer'); 
             button.transition().attr('fill','grey').duration(500).delay(1000+t);
             text.transition().attr('fill','white').duration(500).delay(1000+t);
             button.on('click',function(){
                 cacherFen();
                 text2.transition().attr('fill','transparent').delay(0);
                 text2.transition().style('visibility','hidden').delay(0);
                 let rect1=new chemain(svg,778,378,'rgb(236,104,94)',16,15);
                 rect1.hide(0,0);
                 rect1.appear(500,0);
                 rect1.glisserH(500,1000,1037);  
                 rect1.disappear(1500,500);   
                 let rect2=new chemain(svg,1037,332,'#3382E2',16,15);
                 rect2.hide(0,0);
                 rect2.appear(2000,0);                    
                 rect2.glisserV(2000,1000,423);
                 rect2.disappear(3000,500);                      
                 memC.allouer(idC,tab[i],0,2800);
                 memV.pageM(tab[i]).charger(0,2800);
                 j=i+1;
                 //tabRef.colonne(i).inserer(M.getTabEtat(),0);
                 dataTable.push([
                     "("+j+")",
                     "P"+tab[i],
                     "Chargement",
                     "Aucune",
                     M.page(tab[i]).getNbUsage()+" fois",
                     M.page(tab[i]).getOrdre(),
                     "C"+M.page(tab[i]).getIdcase(),
                     tab[i]
                 ]);

                 sleep(2800).then(()=>{
                    i++;
                    switch(i){
                         case 1:{
                            tour2=introJs();         
                            d3.select("#tabP").attr("data-step","9").attr('data-intro',"Vous pouvez afficher la table de pages à la volonté");
                            d3.select("#suivant").attr("data-step","10").attr('data-intro',"Appuyez sur le boutton pour avancer dans la chaine de références");
                            tour2.goToStepNumber(9).start();
                            tour2.onexit(function(){
                                d3.select("#tabP").attr("data-step",null).attr('data-intro',null)
                                d3.select("#suivant").attr("data-step",null).attr('data-intro',null);
                                tour2=null;
                                able=true;})
                         }
                         break;
                         case 2 :{
                            tour2=introJs();         
                            d3.select("#suivant").attr("data-step","9").attr('data-intro',"Appuyez sur le boutton pour avancer dans la chaine de références");
                            tour2.goToStepNumber(9).start();
                            tour2.onexit(function(){
                                d3.select("#suivant").attr("data-step",null).attr('data-intro',null);
                                tour2=null;
                                able=true;
                            })
                         }
                         break;
                        case 3 :{
                            tour2=introJs();         
                                d3.select("#traduction").attr("data-step","9").attr('data-intro',"Vous pouvez voir le mécanisme de traduction d'adresse en cliquant ici");
                                d3.select("#suivant").attr("data-step","10").attr('data-intro',"Appuyez sur le boutton pour avancer dans la chaine de références");
                                tour2.goToStepNumber(9).start();
                                tour2.onexit(function(){
                                    d3.select("#traduction").attr("data-step",null).attr('data-intro',null)
                                    d3.select("#suivant").attr("data-step",null).attr('data-intro',null);
                                    tour2=null;
                                    able=true;
                                })
                        }
                        break;
                     }
                 })
                 
             });
         }  
         function fenTabAutoRefExe(t){   
             flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
             fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
             flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500).delay(t);
             fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(t+500);
             M.getTabPages().appear(t+1000);
             text1= svg.append('text')
                       .attr('x',1187/4+300)
                       .attr('y',1404/4-36)
                       .attr('fill','white')
                       .style('visibility','hidden')
                       .attr('font-size',28)
                       .text('La table de pages');
             text1.transition().style('visibility','visible').delay(t+1000);
             text2= svg.append('text')
                         .attr('x',1187/4+240)
                         .attr('y',1404/4+420)
                         .attr('fill','white')
                         .style('visibility','hidden')
                         .attr('font-size',22)
                         .text('Incrémentation du nombre de références');
             text2.transition().style('visibility','visible').delay(t+1000);
             button=svg.append('rect')
                                     .attr('rx',20)
                                     .attr('ry',20)
                                     .attr('height',40)
                                     .attr('width',120)
                                     .attr('x',1187/4+340)
                                     .attr('y',1404/4+435)    
                                     .style("cursor","pointer")
                                     .attr('fill','transparent');
             text=svg.append('text')
                     .attr('x',1187/4+364)
                     .attr('y',1404/4+460)
                     .attr('fill','transparent')
                     .text('Continuer'); 
             button.transition().attr('fill','grey').duration(500).delay(1000+t);
             text.transition().attr('fill','white').duration(500).delay(1000+t);
             button.on('click',function(){
                 cacherFen();
                 text2.transition().attr('fill','transparent').delay();
                 text2.transition().style('visibility','hidden').delay();
                 let rect1=new chemain(svg,778,378,'rgb(236,104,94)',16,15);
                 rect1.hide(0,0);
                 rect1.appear(500,0);
                 rect1.glisserH(500,1000,1037);                   
                 rect1.glisserV(2000,1000,423);
                 rect1.disappear(3000,500);                      
                 memC.caseM(idC).referencer(0,2500);
                 memV.pageM(tab[i]).charger(0,2800);
                 //tabRef.colonne(i).inserer(M.getTabEtat(),0);
                 j=i+1;
                 dataTable.push([
                     "("+j+")",
                     "P"+tab[i],
                     "Utilisation",
                     "Aucune",
                     M.page(tab[i]).getNbUsage()+" fois",
                     M.page(tab[i]).getOrdre(),
                     "C"+M.page(tab[i]).getIdcase()
                 ]);
                 sleep(4000).then(()=>{
                    i++;
                    tour2=introJs();         
                            d3.select("#suivant").attr("data-step","9").attr('data-intro',"Appuyez sur le boutton pour avancer dans la chaine de références");
                            tour2.goToStepNumber(9).start();
                            tour2.onexit(function(){
                                d3.select("#suivant").attr("data-step",null).attr('data-intro',null);
                                tour2=null;
                                able=true;
                            })
                })                 


             });
         }  
         function fenTabAutoRempExe(t){   
             flou.attr('fill','transparent').attr('opacity',1.0).style('visibility','visible');
             fenetre.attr('fill','transparent').attr('y',0).style('visibility','visible');
             flou.transition().attr("fill","#DEE6FA").style("opacity",0.8).duration(500).delay(t);
             fenetre.transition().attr('fill','#404040').attr('y',1404/4-100).duration(500).delay(t+500);
             M.getTabPages().appear(t+1000);
             text1= svg.append('text')
                       .attr('x',1187/4+300)
                       .attr('y',1404/4-36)
                       .attr('fill','white')
                       .style('visibility','hidden')
                       .attr('font-size',28)
                       .text('La table de pages');
             text1.transition().style('visibility','visible').delay(t+1000);
             text2= svg.append('text')
                         .attr('x',1187/4+240)
                         .attr('y',1404/4+420)
                         .attr('fill','white')
                         .style('visibility','hidden')
                         .attr('font-size',22)
                         .text('La page à remplacer : P'+victime);
             text2.transition().style('visibility','visible').delay(t+1000);
             button=svg.append('rect')
                                     .attr('rx',20)
                                     .attr('ry',20)
                                     .attr('height',40)
                                     .attr('width',120)
                                     .attr('x',1187/4+340)
                                     .attr('y',1404/4+435)   
                                     .style("cursor","pointer") 
                                     .attr('fill','transparent')
                                     .style("cursor","pointer")
             text=svg.append('text')
                     .attr('x',1187/4+364)
                     .attr('y',1404/4+460)
                     .attr('fill','transparent')
                     .text('Continuer'); 
             button.transition().attr('fill','grey').duration(500).delay(1000+t);
             text.transition().attr('fill','white').duration(500).delay(1000+t);
             button.on('click',function(){
                 cacherFen();
                 text2.transition().attr('fill','transparent').delay(0);
                 text2.transition().style('visibility','hidden').delay(0);
                 let rect1=new chemain(svg,778,378,'rgb(236,104,94)',16,15);
                 rect1.hide(0,0);
                 rect1.appear(500,0);
                 rect1.glisserH(500,1000,1037);                   
                 rect1.disappear(1500,500);                      
                 //memC.allouer(tab[i],0,2800);
                 let rect3=new chemain(svg,1037,332,'#3382E2',16,15);
                 rect3.hide(0,0);
                 rect3.appear(3200,0);                    
                 rect3.glisserV(3200,1000,423);
                 rect3.disappear(4200,500);                      
                 memC.caseM(idC).remplacer(tab[i],0,2000)//(idC,);
                 memV.pageM(tab[i]).charger(0,4000);
                 memV.pageM(victime).decharger(0,4000);
                 //tabRef.colonne(i).inserer(M.getTabEtat(),0);
                 j=j+1;
                 dataTable.push([
                     "("+j+")",
                     "P"+tab[i],
                     "Remplacement",
                     "P"+victime,
                     M.page(tab[i]).getNbUsage()+" fois",
                     M.page(tab[i]).getOrdre(),
                     "C"+M.page(tab[i]).getIdcase()
                 ]);          
                 sleep(4000).then(()=>{
                    i++;
                    tour2=introJs();         
                    d3.select("#ajouter").attr("data-step","9").attr('data-intro',"Tant que le nombre de pages référéncées ne dépasse pas 18, vous pouvez référencer d'autre page d'ici");
                    tour2.goToStepNumber(9).start();
                    tour2.onexit(function(){
                            d3.select("#ajouter").attr("data-step",null).attr('data-intro',null);
                            tour2=null;
                            able=true;                          
                            tour2=introJs();         
                            d3.select("#terminer").attr("data-step","9").attr('data-intro',"Si vous ne voulez pas référencer d'autre pages, appuyez pour terminer la simulation et afficher le bilan");
                            tour2.goToStepNumber(9).start();
                            tour2.onexit(function(){
                                    d3.select("#suivant").attr("data-step",null).attr('data-intro',null);
                                    d3.select("#terminer").attr("data-step","5").attr('data-intro',"Terminer la simulation et afficher le bilan");
                                    tour2=null;
                                    able=true;
                            })
                    })
             });
         })   
         }
         async function traduction()
         {
             console.log("able false")
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
          continu=d3.select('#svg2').append('rect')
                         .attr('rx',30)
                         .attr('ry',30)
                         .attr('height',56)
                         .attr('width',150)
                         .attr('x',610)
                         .attr('y',520)    
                         .attr('fill','grey')
                         .style('visibility','hidden')
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
         d3.select("#traduction").on("click",traduction);  
         d3.select("#tabP").style("cursor","pointer");
         d3.select("#tabP").on('click',fenTabApp);
         d3.select("#traduction").on("click",traduction);        
         d3.select("#terminer").on("click",function(){
             terminerExemple();
         })
         /*La pagination */
        sleep("1000").then(() => {
        let chaineTour = introJs();
        d3.select("#chaine").attr("data-step","9").attr('data-intro',"La chaine de référence, permet de suivre le déroulement de la simulation ,on peut y ajouter des pages tant que la taille max n'est pas atteinte(18 pages)")
        d3.select("#suivant").attr("data-step","10").attr('data-intro',"Appuyez sur le boutton pour avancer dans la chaine de références");
        chaineTour.goToStepNumber(9).start();
        chaineTour.onexit(function(){
                d3.select("#chaine").attr("data-step",null).attr('data-intro',null)
                d3.select("#suivant").attr("data-step",null).attr('data-intro',null);
                chaineTour=null;
                able=true;
        })})
         let i=0;
         let idC;
         let victime;
         d3.select('#suivant').on('click',function(){
             if(i>=tab.length){
                 if(i>=18){
                     Swal.fire({
                         title: 'Fin de la simulation ',
                         text: "Appuyer pour afficher le bilan de la simulation ",
                         confirmButtonColor: '#3085d6',
                         confirmButtonText: 'Bilan'
                       }).then((result) => {
                         if (result.value) {
                             creerTabExemple();
                         }
                       })
                     return;
                 }else if(i<18){
                       return;
                 }
                 return;
             }else{
                 if(able){
                     able=false;
                     chaine.referencer(i);
                     if(i!=0)
                         chaine.dereferencer(i-1);
                     if(M.page(tab[i]).valide()){
                         /* reférencer */
                         d3.select('#etat').transition().attr('x',620).text('Utilisation');
                         d3.select('#switch').transition()
                                             .attr('cx',760);
                         d3.select('#rect1').transition()
                                         .style("opacity","0.7")
                         d3.select('#rect2').transition()
                                         .style("opacity","0.7")
                         d3.select('#rect3').transition()
                                         .style("opacity","0")
                         memV.pageM(tab[i]).referencer(0);
                         let rectang=new chemain(svg,301,423,'rgb(236,104,94)',16,15);
                         rectang.glisserV(0,1000,378);
                         rectang.glisserH(1000,2000,538);
                         fenTabAutoRefExe(3000,0);
                         rectang.hide(3000,0);
                         M.page(tab[i]).utiliser();
                         idC =M.page(tab[i]).getIdcase();
                         M.getTabPages().page(tab[i]).utiliser(0,5000);
                     }else{
                         if(!M.getMemPleine()){
                         /* chargement direct */ 
                             d3.select('#etat').transition().attr('x',620)
                             .text('Chargement');
                             d3.select('#switch').transition()
                                             .attr('cx',665);
                             d3.select('#rect1').transition()
                                         .style("opacity","0.7")
                             d3.select('#rect2').transition()
                                         .style("opacity","0")
                             d3.select('#rect3').transition()
                                         .style("opacity","0.7")
                             memV.pageM(tab[i]).referencer(0);
                             let rectang=new chemain(svg,301,423,'rgb(236,104,94)',16,15);
                             rectang.glisserV(0,1000,378);
                             rectang.glisserH(1000,2000,538);
                             let idC = M.casLibre();
                             fenTabAutoChargExe(3000,idC);
                             rectang.hide(3000,0);
                             M.cas(idC).allouer();
                             ordre++;
                             M.chargerPage(tab[i],idC,Date.now(),ordre,0,5000);
                             M.page(tab[i]).utiliser();
                             M.getTabPages().page(tab[i]).utiliser(0,5000);
                         }else{
                                 /*remplacement*/
                                     d3.select('#etat').transition().attr('x',620).text('Remplacement');
                                     d3.select('#switch').transition()
                                                     .attr('cx',569.5);
                                     d3.select('#rect1').transition()
                                                     .style("opacity","0")
                                     d3.select('#rect2').transition()
                                                     .style("opacity","0.7")
                                     d3.select('#rect3').transition()
                                                     .style("opacity","0.7")    
                                     memV.pageM(tab[i]).referencer(0);
                                     let rectang=new chemain(svg,301,423,'rgb(236,104,94)',16,15);
                                     rectang.glisserV(0,1000,378);
                                     rectang.glisserH(1000,2000,538);
                                     victime = M.victime();
                                     fenTabAutoRempExe(3000);
                                     rectang.hide(3000,0);
                                     ordre++;
                                     idC=M.remplacer(victime,tab[i],Date.now(),0,5000,ordre);
                                     M.page(tab[i]).utiliser();
                                     M.getTabPages().page(tab[i]).utiliser(0,5000);
                                 }
                             }
                         }     
                    }
                });
            }
        }  
    function terminerExemple(){
        if(able){
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
                    simulation = false;
                    document.getElementById("ajout").disabled = true;
                    able=false;
                    creerTabExemple();
                }
              })
            }
    }
    function creerTabExemple(){
            creerTab();
            let foot=d3.select("#card").append("div").attr("class","card-footer");
            let btn=foot.append("button").attr("class","btn btn-primary btn-icon-split ").style("width","200px").style("height","40px").style("left","44%").style("position","relative").append("span").text("Introduire un scenario");
            btn.on("click",function(){
                window.location.href="paginLfuSansExemple.html";
            })
    }
    function tour(){
        var intro = introJs();
        intro.start();
    }
    function creerTab(){
        /*Creation du bilan*/
            d3.select("#svg2").remove();
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
                    { title: "nombre d'usages" },
                    { title: "Ordre de chargement" },
                    { title: "Case mémoire " }
                ]
            });
    }
    //Recuperation des données//
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
                Swal.fire('Veuillez introduire le nombre de cases');
                return;
            }
            if(!RecuperernbP()){
                Swal.fire('Veuillez introduire le nombre de pages');
                return;
            }
            if(!RecuperernbRef()){
                Swal.fire('Veuillez introduire le nombre de références');
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