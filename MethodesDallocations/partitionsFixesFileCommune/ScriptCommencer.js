var adrdébut = 100;
let taille = 0;
var able = false;
let nombreP = 0;
let nnn = 0;
let nbPart = 0;
let tabtai = [];
let tabtem = [];
let tabTaillePart = [];
let tab = [];
let tabrect = [];
let tabrectx = [];
let tabtext1 = [];
let tabtext2 = [];
let tabtext3 = [];
let tabtext1x = [];
let tabtext2x = [];
let tabtext3x = [];
let tabfrag2 = [];
let pause = 1;
let datatable = [];
let tabclr = [nombreP]
tabclr[0] = "#160A47"
tabclr[1] = " #01579b"
tabclr[2] = "#039be5"
tabclr[3] = "#bbdefb"
tabclr[4] = " #01579b"
tabclr[5] = "#039be5"
tabclr[6] = "#bbdefb"
tabclr[7] = "#039be5"
tabclr[8] = "#bbdefb"
ecc = false;
var w = 0;
var rr = "vrai";
class Enreg {
    constructor(taille, etat, ident) {
        this.taille = taille;
        this.etat = etat;
        this.ident = ident;

    }
}
class Prosseecus {
    constructor(taille, temps, identificateur) {
            this.taille = taille;
            this.temps = temps; //en seconde 
            this.temps_fin = 0; //temps du systeme 
            this.etat = "pret";
            /// this.temps_restant=temps_restant;
            this.identificateur = identificateur; //table etat
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
            console.log(this.temps_fin - h1);
            return this.temps_fin - h1;

        }
    fin_prpo() {
        if (this.cal_temps_restant == 0) {
            this.etat = "fin";
        }
    }
    fin_anomal() {
        if (this.cal_temps_restant != 0) {
            this.etat = "bloqué";
        }
    }
    getTemps() {
        return this.temps;
    }
}
class File {

    constructor(n, nbr_psus, file_vide, file_pleine, maFile) {
        this.n = n; //nombre max de psus que peut contenir la file
        this.nbr_psus = nbr_psus;
        this.file_vide = file_vide;
        this.file_pleine = file_pleine;
        this.maFile = maFile;
    }
    enfiler(proc) {
        if (this.file_pleine == "faux") {
            this.maFile.push(proc); //inserer ds la derniere case de tableau
            this.nbr_psus++;
            this.file_vide = "faux";
            if (this.nbr_psus == this.n) {
                this.file_pleine = "vrai";
            }
        } else {
            console.log("vous pouvez pas enfiler un nouveau psus car la file est pleine");
        }
    }
    defiler() {
        if (this.file_vide == "faux") {
            this.nbr_psus--;
            if (this.nbr_psus == 0) {
                this.file_vide = "vrai";
            }
            return this.maFile.shift(); //retourner le premier élément du tableau
        } else {
            console.log("vous pouver pas défiler un psus car la file est vide");
        }
    }
    getnbPsus() {
        return this.nbr_psus;
    }
    getfile_vide() {
        return this.file_vide;
    }
}

class Mémoire {

    constructor(taille, tailleOS, nbPart) {

        this.taille = taille;
        this.tailleOS = tailleOS;
        this.nbPart = nbPart;
        this.tabMem = [nbPart]
        this.tabEtat = [nbPart];
        this.tabFile = [nbPart];
        for (var i = 0; i < nbPart; i++) {
            this.tabMem[i] = null;
        }


    }


    initialiserTabEtat(tabTaillePart, canvas) {

        var adrdébut = 100;
        var y = 47;
        var z = 53;
        console.log("noooobre parrrt" + this.nbPart);

        for (var i = 0; i < this.nbPart; i++) {

            this.tabEtat[i] = new Enreg(tabTaillePart[i], "libre", i);

            console.log(this.tabEtat[i].taille);
            console.log(this.tabEtat[i].etat);
            console.log(this.tabEtat[i].ident);
            //rectangle
            //rr="vrai";
            /*  if (rr == "vrai") {
                  var rect = canvas.append("rect")
                      .attr("x", 48)
                      .attr("y", z)
                      .attr("width", 240)
                      .attr("height", 20)
                      .attr("fill", "#EFF0F5");
                  var rect2 = canvas.append("rect")
                      .attr("x", 288)
                      .attr("y", z)
                      .attr("width", 230)
                      .attr("height", 20)
                      .attr("fill", "#EFF0F5");

                  rr = "faux";
              } else { rr = "vrai" }*/

            var text = canvas.append("text")
                .text(i)
                .attr("x", 53)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var text = canvas.append("text")
                .text(adrdébut)
                .attr("x", 90)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            adrdébut = adrdébut + this.tabEtat[i].taille;
            var text = canvas.append("text")
                .text(this.tabEtat[i].taille)
                .attr("x", 165)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var text = canvas.append("text")
                .text(this.tabEtat[i].etat)
                .attr("x", 242)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            y = y + 20;
            z = z + 20;







        }


    }

    gettabEtat() {
        return this.tabEtat;
    }
    gettabMem() {
        return this.tabMem;
    }
}


class TabEtat2 {
    constructor(nbPart, tabEtat, id) {
        this.nbPart = nbPart;
        //  this.taillePsus = taillePsus;
        this.tabEtat = tabEtat;
        this.id = id;
        this.trouv = "faux";
        this.stop = "faux";


    }
    affichage() {

        for (var i = 0; i < this.nbPart; i++) {
            console.log(this.tabEtat[i].taille);
            console.log(this.tabEtat[i].etat);
            console.log(this.tabEtat[i].ident);

        }
    }
    rechPart2(taillePsus) {
        console.log("j'ai entré dans rech part");
        var i = 0;
        var w = 0;
        this.trouv = "faux";

        while ((i < this.nbPart) && (this.trouv == "faux")) {
            console.log("j'ai entré dans while de  rechpart");
            if ((taillePsus <= this.tabEtat[i].taille) && (this.tabEtat[i].etat == "libre")) {
                console.log("j'ai entré dans if de  rechpart");
                this.id = i;
                console.log("ident choisie est:" + this.id);
                this.trouv = "vrai";


            } else {
                i++;
            }

        }
        if (this.trouv == "faux") {
            this.stop = "vrai";
            while (w < this.nbPart) {
                if (taillePsus <= this.tabEtat[w].taille) {
                    this.stop = "faux";
                }
                w++;

            }
        }


    }
    getident() {
        return this.id;
    }
    getTrouv() {
        return this.trouv;
    }
    getstop() {
        return this.stop;
    }

}
var t = 105;
var s = 540;
var d = 700;
var tabfrag = [];
class partition {
    constructor(etat, tabEtat, id, tailleLibre, frag, tabMem, taille) {
        this.etat = etat;
        // this.identPs = identPs;
        this.tabEtat = tabEtat;
        //this.id = jj.getident();
        this.id = id;
        //this.taillePsus = taillePsus;
        this.tailleLibre = tailleLibre;
        this.frag = frag;
        this.tabMem = tabMem;
        this.taille = taille;

    }



    insertion(proc, q, canvas) {


        console.log("id est ;" + this.id);
        console.log("la taille de la partition:" + this.tabEtat[this.id].taille);
        console.log("la taille du psus" + proc.taille);
        var f = 400 / this.taille;

        if (proc.taille <= this.tabEtat[this.id].taille) {
            this.tabMem[this.id] = proc;
            this.etat = "occupé";
            this.tailleLibre = ((this.tabEtat[this.id].taille) - (proc.taille));

            this.tabEtat[this.id].etat = "occupé";
            console.log("insertion avec succé");
            var w = this.tabEtat[this.id].taille - proc.taille
            datatable.push([proc.identificateur, proc.taille, proc.temps, this.tabEtat[this.id].taille, w]);
            //  tabfrag[this.id] = "faux";
            tabfrag[this.id] = 0;
            tabfrag2[this.id] = "aucune";

            var part = canvas.append("rect").attr("width", 150).attr("height", (proc.taille) * f).attr("fill", "#009D8E").attr("x", 800).attr("y", (q[this.id] - 30)).attr("ry", 6);
            /* rect = canvas.append("rect")
                 .attr("x", 200)
                 .attr("y", 510)
                 .attr("ry", 6)
                 .attr("width", 200)
                 .attr("height", 200)
                 .attr("fill", "red");*/

            /*  var pos = q[this.id] - 30 + proc.taille;
              var text5 = canvas.append("text")
                  .text("Processus " + proc.identificateur)
                  .attr("x", 900)
                  .attr("y", pos - ((proc.taille) * f / 2))
                  .attr("font-size", 16)
                  .attr("font-family", "monospace")
                  .attr("fill", "white");*/


            var y = 47
            var x = 0;
            while (x < this.id) {
                y = y + 20;
                x++;
            }
            var text = canvas.append("text")
                .text("libre")
                .attr("x", 242)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "white");
            var text = canvas.append("text")
                .text(this.tabEtat[this.id].etat)
                .attr("x", 242)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");


            t = t + 20;
            /* var text = canvas.append("text")
                 .text(this.id)
                 .attr("x", 510)
                 .attr("y", s)
                 .attr("font-size", 16)
                 .attr("font-family", "monospace")
                 .attr("fill", "black");
             var text = canvas.append("text")
                 .text("aucune")
                 .attr("x", 590)
                 .attr("y", s)
                 .attr("font-size", 16)
                 .attr("font-family", "monospace")
                 .attr("fill", "black");*/



        }
        if (this.tailleLibre != 0) {
            this.frag = "vrai";
            console.log("**fragmentation interne**");
            console.log("la taille de la fragmentation:" + this.tailleLibre);
            // var fr = this.tailleLibre;
            //  tabfrag[this.id] = "vrai";
            tabfrag[this.id] = this.tailleLibre;
            tabfrag2[this.id] = this.tailleLibre;
            var part = canvas.append("rect")
                .attr("width", 150)
                .attr("height", this.tailleLibre * f)
                .attr("fill", "#EF6060")
                .attr("x", 800)
                .attr("y", (q[this.id] + (proc.taille) * f) - 30)
                .attr("ry", 6);
            //table de fragmentation
            /*  var text = canvas.append("text")
                  .text("aucune")
                  .attr("x", 590)
                  .attr("y", s)
                  .attr("font-size", 16)
                  .attr("font-family", "monospace")
                  .attr("fill", "#EFF0F5");
              var text = canvas.append("text")
                  .text(this.tailleLibre)
                  .attr("x", 590)
                  .attr("y", s)
                  .attr("font-size", 16)
                  .attr("font-family", "monospace")
                  .attr("fill", "black");*/
            // s = s + 20;
        } else {
            this.frag = "faux";
            console.log("pas de fragmentation interne")
        }
        s = s + 20;
    }
    getetat() {
        return this.tabEtat[this.id].etat;
    }
    affichage2(nbPart) {
        console.log("la taille libre dans la partition est:" + this.tailleLibre);
        console.log("présence d'une fragmentation:" + this.frag);
        for (var i = 0; i < nbPart; i++) {
            console.log(this.tabEtat[i].taille);
            console.log(this.tabEtat[i].etat);
            console.log(this.tabEtat[i].ident);

        }


    }
    libération(q, canvas) {
        var f = 400 / this.taille;
        console.log("je suis dans lbération ");
        if (this.tabEtat[this.id].etat == "occupé") {
            this.tabMem[this.id] = null;
            this.etat = "libre";
            this.tabEtat[this.id].etat = "libre";

            this.tailleLibre = this.tabEtat[this.id].taille;
            this.frag = "false";
            console.log("la frag" + this.frag);
            console.log("libération avec succé");
            tabfrag2[this.id] = null;
            var part = canvas.append("rect").attr("width", 150).attr("height", this.tailleLibre * f).attr("fill", "#B0EFC1").attr("x", 800).attr("y", q[this.id] - 30).attr("ry", 6);
            var y = 47
            x = 0;
            while (x < this.id) {
                y = y + 20;
                x++;
            }
            var text = canvas.append("text")
                .text("occupé")
                .attr("x", 242)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "white");
            var text = canvas.append("text")
                .text(this.tabEtat[this.id].etat)
                .attr("x", 242)
                .attr("y", y)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            // table de fragmentation
            var y = 540,
                x = 0;
            while (x < this.id) {
                y = y + 20;
                x++;
            }





        } else {
            if (this.tabEtat[this.id].etat == "libre") {
                console.log("la partition est déja libre");
            }
            /*else {
                           console.log("le processus est encore en cours d'éxecution");
                       }*/
        }
        console.log("l'etat de libération dans methode liber de" + this.id + "est" + this.tabEtat[this.id].etat);
    }
    affichage3(nbPart) {
        console.log("c'est la partition d'ident:" + this.id);
        console.log("l'état de la partition" + this.etat);
        console.log("la taille libre dans la partition" + this.tailleLibre)
        console.log("présence d'une fragmentation:" + this.frag);
        for (var i = 0; i < nbPart; i++) {
            console.log(this.tabEtat[i].taille);
            console.log(this.tabEtat[i].etat);
            console.log(this.tabEtat[i].ident);

        }

    }


}
class afficheurRecherche {
    constructor(canvas) {

        var tx = canvas.append("text").text("Recherche de partition")
            .attr("x", 420).attr("y", 80).attr("fill", 'white').attr("font-size", 14)
            .transition().delay(7000).remove()
        var tx1 = canvas.append("text").text("les partitions libres")
            .attr("x", 280).attr("y", 100).attr("fill", 'white').attr("font-size", 11)
            .transition().delay(7000).remove()
            ///////////////////
        var rid = canvas.append("rect").attr("x", 270).attr("y", 110).attr("width", 40).attr("height", 20).attr("fill", 'white')
            .attr("rx", 3).attr("ry", 3)
            .transition().delay(7000).remove()
        var txid = canvas.append("text").text("id")
            .attr("x", 283).attr("y", 123).attr("fill", 'black').attr("font-size", 13)
            .transition().delay(7000).remove()
        var rtai = canvas.append("rect").attr("x", 315).attr("y", 110).attr("width", 80).attr("height", 20).attr("fill", 'white')
            .attr("rx", 3).attr("ry", 3)
            .transition().delay(7000).remove()
        var txtai = canvas.append("text").text("taille (ko)")
            .attr("x", 325).attr("y", 123).attr("fill", 'black').attr("font-size", 13)
            .transition().delay(7000).remove()
        var tabTaille = [];
        var tabid = []
        var y = 135
        for (var i = 0; i < 9; i++) {
            tabTaille[i] = canvas.append("rect").attr("x", 315).attr("y", y).attr("width", 80).attr("height", 20).attr("fill", 'white')
                .attr("rx", 3).attr("ry", 3).transition().delay(7000).remove()
            tabid[i] = canvas.append("rect").attr("x", 270).attr("y", y).attr("width", 40).attr("height", 20).attr("fill", 'white')
                .attr("rx", 3).attr("ry", 3)
                .transition().delay(7000).remove()
            y = y + 25
        }
    }

    remplissage(tabEtat, ps, i, canvas) {
        var y = 148
        var k = 0;
        for (var j = 0; j < tabEtat.length; j++) {
            if ((tabEtat[j].etat) == "libre") {
                k++;
                if (j == i) {
                    canvas.append("rect").attr("x", 270).attr("y", (k - 1) * 25 + 135).attr("width", 40).attr("height", 20).attr("fill", 'red')
                        .attr("rx", 3).attr("ry", 3)
                        .transition().delay(7000).remove()
                    canvas.append("rect").attr("x", 315).attr("y", (k - 1) * 25 + 135).attr("width", 80).attr("height", 20).attr("fill", 'red')
                        .attr("rx", 3).attr("ry", 3)
                        .transition().delay(7000).remove()
                }
                canvas.append("text").text(tabEtat[j].ident)
                    .attr("x", 283).attr("y", y).attr("fill", 'black').attr("font-size", 13)
                    .transition().delay(7000).remove()
                canvas.append("text").text(tabEtat[j].taille)
                    .attr("x", 325).attr("y", y).attr("fill", 'black').attr("font-size", 13)
                    .transition().delay(7000).remove()
                y = y + 25;
                //les textes
                canvas.append("text").text("le processus " + ps.identificateur + " de taille " + ps.taille + " ko")
                    .attr("fill", 'white').attr("font-size", 15).attr("x", 450).attr("y", 150)
                    .transition().delay(7000).remove()
                canvas.append("text").text("la partition choisie est la partition numéro " + i)
                    .attr("fill", 'white').attr("font-size", 14).attr("x", 425).attr("y", 200)
                    .transition().delay(6500).remove()
                canvas.append("text").text("car c'est la prémiere partition libre")
                    .attr("fill", 'white').attr("font-size", 14).attr("x", 425).attr("y", 230)
                    .transition().delay(7000).remove()
                canvas.append("text").text("pouvant contenir ce processus ")
                    .attr("fill", 'white').attr("font-size", 14).attr("x", 425).attr("y", 260)
                    .transition().delay(7000).remove()

            }
        }

    }


}









window.onload = function() {

    var bilan = 0;

    function afficheFenFifo(delay) {
        flou.attr('fill', 'transparent').attr('opacity', 1.0).style('visibility', 'visible');
        fenetre.attr('fill', 'transparent').attr('y', -200).style('visibility', 'visible');
        flou.transition().attr('fill', 'lightgray').attr('opacity', 0.6).duration(100) //.delay(delay);
        fenetre.transition().attr('fill', '#404040').attr('y', 50).duration(100) //.delay(delay+500);
            // afficheur.visible("visible",delay+700)

    }

    function cacherFen() {

        //afficheur.visible("hidden",0);
        fenetre.transition().attr('fill', 'transparent').duration(500);
        flou.transition().attr('fill', 'transparent').duration(500);
        fenetre.transition().style('visibility', 'hidden').delay(500);
        flou.transition().style('visibility', 'hidden').delay(500);


    }

    function senariof() {

        if (eff) {
            d3.select("#illustration").remove();
            let canvas = d3.select("#svg2");

            ///dessin
            // la file vide 
            var text = canvas.append("text")
                .text("La file")
                .attr("x", 70)
                .attr("y", 250)
                .attr("font-size", 16)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var line1 = canvas.append("line")
                .attr("x1", 70)
                .attr("y1", 260)
                .attr("x2", 500)
                .attr("y2", 260)
                .attr("stroke", "#0C0101")
                .attr("stroke-width", 2);
            var line2 = canvas.append("line")
                .attr("x1", 70)
                .attr("y1", 310)
                .attr("x2", 500)
                .attr("y2", 310)
                .attr("stroke", "#0C0101")
                .attr("stroke-width", 2);






            // la table d'état
            var rect = canvas.append("rect")
                .attr("width", 190)
                .attr("height", 25)
                .attr("fill", "#B0EFC1")

            .attr("x", 170)
                .attr("y", -17)
                .attr("ry", 6);
            var text = canvas.append("text")
                .text("Table d'état")
                .attr("x", 220)
                .attr("y", -3)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var line3 = canvas.append("line")
                .attr("x1", 48)
                .attr("y1", 32)
                .attr("x2", 283)
                .attr("y2", 32)
                .attr("stroke", "#0C0101")
                .attr("stroke-width", 1.5);
            var text = canvas.append("text")
                .text("Id")
                .attr("x", 50)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("@Début")
                .attr("x", 85)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Taille")
                .attr("x", 160)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Etat")
                .attr("x", 240)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");

            var line4 = canvas.append("line")
                .attr("x1", 292)
                .attr("y1", 32)
                .attr("x2", 497)
                .attr("y2", 32)
                .attr("stroke", "#0C0101")
                .attr("stroke-width", 1.5);

            var text = canvas.append("text")
                .text("Processus")
                .attr("x", 300)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Temps")
                .attr("x", 390)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Taille")
                .attr("x", 450)
                .attr("y", 27)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            //  fragmentation externe
            var rect = canvas.append("rect")
                .attr("width", 150)
                .attr("height", 25)
                .attr("fill", "#B0EFC1")

            .attr("x", 280)
                .attr("y", 330)
                .attr("ry", 6);
            var text = canvas.append("text")
                .text("Fragmentation externe")
                .attr("x", 287)
                .attr("y", 345)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var text = canvas.append("text")
                .text("Processus")
                .attr("x", 287)
                .attr("y", 370)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Taille")
                .attr("x", 375)
                .attr("y", 370)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");

            var line5 = canvas.append("line")
                .attr("x1", 285)
                .attr("y1", 375)
                .attr("x2", 425)
                .attr("y2", 375)
                .attr("stroke", " black")
                .attr("stroke-width", 1.5);
            //fragmentation interne
            var rect = canvas.append("rect")
                .attr("width", 150)
                .attr("height", 25)
                .attr("fill", "#B0EFC1")
                .attr("x", 55)
                .attr("y", 330)
                .attr("ry", 6);
            var text = canvas.append("text")
                .text("Fragmentation interne")
                .attr("x", 61)
                .attr("y", 345)
                .attr("font-size", 12)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var line6 = canvas.append("line")
                .attr("x1", 58)
                .attr("y1", 375)
                .attr("x2", 200)
                .attr("y2", 375)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5);
            var text = canvas.append("text")
                .text("Partition")
                .attr("x", 60)
                .attr("y", 370)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Taille")
                .attr("x", 150)
                .attr("y", 370)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");

            //systéme d'exploitatipn
            var y = 3;
            var part = canvas.append("rect").attr("width", 150).attr("height", 40).attr("fill", "pink").attr("x", 800).attr("y", y - 20).attr("ry", 6);
            var text = canvas.append("text")
                .text("Systéme d'exploitation")
                .attr("x", 810)
                .attr("y", 5 + y)
                .attr("font-size", 11)
                .attr("font-family", "monospace")
                .attr("fill", "black")






            fen = canvas.append("rect").attr("x", -400).attr("y", -400).attr("width", 2000).attr("height", 2000).attr("fill", "#DEE6FA").style("opacity", 0.8).attr("id", "fen");
            com = canvas.append("image").attr("x", 340).attr("y", 100).attr("height", 280).attr("width", 280).attr("href", 'img/commencer2.png').attr("id", "commencer").style("cursor", "pointer");

            //débloquer les imput
            document.getElementById("taime").removeAttribute("disabled");
            document.getElementById("nbpa").removeAttribute("disabled");
            document.getElementById("taipart").removeAttribute("disabled");
            document.getElementById("taipartok").removeAttribute("disabled");
            document.getElementById("nbp").removeAttribute("disabled");
            document.getElementById("taips").removeAttribute("disabled");
            document.getElementById("tmps").removeAttribute("disabled");
            document.getElementById("psok").removeAttribute("disabled");
            // document.getElementById("commencer").removeAttribute("disabled");





            var v = 0;
            var g = 0
            var canvas2 = d3.select("#cpt1").append("text").text(v);
            var canvas3 = d3.select("#cpt").append("text").text(g)
            var canvas4 = d3.select("#cpt3").append("text").text(0)


            maFile = new Array();
            gg = new File(9, 0, "faux", "faux", maFile);
            /*Récuperer input avec entrer*/
            document.getElementById('taips').addEventListener('submit', function(e) {
                ss();
                e.preventDefault();
            }, false);
            document.getElementById('pss1').addEventListener('submit', function(e) {
                taipart();
                e.preventDefault();
            }, false);


            var t, t1;


            d3.select('#ajoutok').on('click', function() {

                nombreP = parseInt(document.getElementById('nbp').value);
                //  nnn = parseInt(document.getElementById('cpt3').value);
                t = parseInt(document.getElementById('taips1').value);
                // document.getElementById("taips").disabled = true;
                t1 = parseInt(document.getElementById('tmps1').value);
                if ((document.getElementById('taips1').value == "") || (document.getElementById('tmps1').value == "")) {
                    Swal.fire("Vous devez saisir la taille et le temps de ce processus");
                } else {
                    if ((t <= 0) || (t1 <= 0)) {
                        if (t <= 0) {
                            Swal.fire("La taille doit étre supérieure à 0,veuillez réintroduire les attributs")
                        }
                        if (t1 <= 0) {
                            Swal.fire("Le temps doit étre supérieur à 0,veuillez réintroduire les attributs")
                        }

                    } else {
                        //  tabtai[v] = t;
                        //  tabtem[v] = t1;

                        nnn = nnn + 1;
                        nombreP = nombreP + nnn;

                        p1 = new Prosseecus(t, t1, v);
                        gg.enfiler(p1.identificateur);
                        tab[v] = p1;
                        i = v;
                        tabrect[i] = canvas.append("rect")
                            .attr("x", 80)
                            .attr("y", 265)
                            .attr("ry", 6)
                            .attr("width", 40)
                            .attr("height", 40)
                            .attr("fill", tabclr[i]);
                        tabtext1[i] = canvas.append("text")
                            .text(tab[i].identificateur)
                            .attr("x", 90)
                            .attr("y", 277)
                            .attr("font-size", 12)
                            .attr("font-family", "monospace")
                            .attr("fill", "white");
                        tabtext2[i] = canvas.append("text")
                            .text(tab[i].taille + "ko")
                            .attr("x", 75)
                            .attr("y", 288)
                            .attr("font-size", 12)
                            .attr("font-family", "monospace")
                            .attr("fill", "white");
                        tabtext3[i] = canvas.append("text")
                            .text(tab[i].temps + "s")
                            .attr("x", 90)
                            .attr("y", 300)
                            .attr("font-size", 12)
                            .attr("font-family", "monospace")
                            .attr("fill", "white");
                        v++;
                        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhn')
                        console.log(nombreP);

                        canvas2.transition().text(v);
                    }

                    document.getElementById("taips1").value = "";
                    document.getElementById("tmps1").value = "";



                }


            })
            var inc2 = false;
            var inc3 = false;

            d3.select('#psok').on('click', ss)


            function ss() {

                nombreP = parseInt(document.getElementById('nbp').value);
                document.getElementById("nbp").disabled = true;
                t = parseInt(document.getElementById('taips').value);
                // document.getElementById("taips").disabled = true;
                t1 = parseInt(document.getElementById('tmps').value);

                if ((document.getElementById('taips').value == "") || (document.getElementById('tmps').value == "")) {
                    Swal.fire("vous devez saisir la taille et le temps de ce processus");
                } else {
                    if ((t <= 0) || (t1 <= 0)) {
                        if (t <= 0) {
                            Swal.fire("la taille doit étre supérieur à 0,veuillez réintroduire les attributs")
                        }
                        if (t1 <= 0) {
                            Swal.fire("la temps doit étre supérieur à 0,veuillez réintroduire les attributs")
                        }

                    } else {
                        tabtai[v] = t;
                        inc2 = true;

                        tabtem[v] = t1;
                        inc3 = true;

                        v++;
                        canvas2.transition().text(v);
                    }

                    document.getElementById("taips").value = "";
                    document.getElementById("tmps").value = "";
                    if (v == nombreP) {
                        document.getElementById("taips").disabled = true;
                        document.getElementById("tmps").disabled = true;

                    }



                }

            }

            var ancien = 0;
            var inc = false;

            d3.select('#taipartok').on('click', taipart)

            function taipart() {

                tabTaillePart[g] = parseInt(document.getElementById('taipart').value);
                inc = true;
                taille = parseInt(document.getElementById('taime').value);
                document.getElementById("taime").disabled = true;
                nbPart = parseInt(document.getElementById('nbpa').value);
                document.getElementById("nbpa").disabled = true;
                if (document.getElementById('taipart').value == "") {
                    Swal.fire("Vous devez introduire la taille de cette partition");
                } else {
                    if (tabTaillePart[g] <= 0) {
                        Swal.fire("La taille de la partition doit étre supérieure à 0")
                        document.getElementById("taipart").value = "";

                    } else {
                        if (g == (nbPart - 1)) {
                            if (tabTaillePart[g] != (taille - ancien)) {
                                Swal.fire("La taille de la dernière partition doit étre égale à " + (taille - ancien) + " ko,veuillez la réintroduire:");
                                tabTaillePart[g] = (taille - ancien);
                                g--;
                            }
                            g++;
                        } else {

                            if (tabTaillePart[g] >= taille - ancien) {

                                Swal.fire("la taille de la partition " + g + " doit étre iférieure à " + (taille - ancien) + " ko, veuillez la réintroduire:");
                                //  Swal.fire("veuillez entrer une nouvelle taille pour la partition " + g);
                            } else {
                                ancien = ancien + tabTaillePart[g];
                                g++;
                            }
                        }


                        document.getElementById("taipart").value = "";


                        canvas3.transition().text(g);
                    }
                    if (g == nbPart) {
                        document.getElementById("taipart").disabled = true;

                    }

                }

            }





            d3.select('#commencer').on('click', function() {
                able = true;
                d3.select('#terminer').on('click', function() {
                    terminer()
                })
                taille = parseInt(document.getElementById('taime').value);
                nombreP = parseInt(document.getElementById('nbp').value);
                nbPart = parseInt(document.getElementById('nbpa').value);
                if ((taille != 0) & (nbPart != 0) & (nombreP != 0) & (inc == true) & (inc2 == true) & (inc3 == true)) {
                    commencer = true;
                }
                if (commencer) {
                    fen.remove();
                    com.remove();
                    let f = 400 / taille;
                    var q = [nbPart];
                    let dd = new Mémoire(30, 15, nbPart);
                    dd.initialiserTabEtat(tabTaillePart, canvas);
                    let jj = new TabEtat2(nbPart, dd.gettabEtat(), 0);
                    let proc;


                    // la mémoire
                    var y = 8;
                    for (var j = 0; j < nbPart; j++) {
                        var part = canvas.append("rect").attr("width", 150).attr("height", tabTaillePart[j] * f).attr("fill", "#B0EFC1").attr("x", 800).attr("y", (y + 19)).attr("ry", 6);
                        q[j] = y + 49;
                        //q[j] = y + 80;

                        var text8 = canvas.append("text")
                            .text(j)
                            .attr("x", 952)
                            .attr("y", q[j] - 20)
                            .attr("font-size", 14)
                            .attr("font-family", "monospace")
                            .attr("fill", "black");
                        y = y + tabTaillePart[j] * f + 4;
                        tabfrag2[j] = null;
                    }


                    //ajouter un ou plusieurs psus
                    for (var i = 0; i < nombreP; i++) {
                        ps = new Prosseecus(tabtai[i], tabtem[i], i);
                        tab[i] = ps;
                        tabrect[i] = canvas.append("rect")
                            .attr("x", 80)
                            .attr("y", 265)
                            .attr("ry", 6)
                            .attr("width", 40)
                            .attr("height", 40)
                            .attr("fill", tabclr[i]);
                        tabtext1[i] = canvas.append("text")
                            .text(tab[i].identificateur)
                            .attr("x", 90)
                            .attr("y", 277)
                            .attr("font-size", 12)
                            .attr("font-family", "monospace")
                            .attr("fill", "white");
                        tabtext2[i] = canvas.append("text")
                            .text(tab[i].taille + "ko")
                            .attr("x", 75)
                            .attr("y", 288)
                            .attr("font-size", 12)
                            .attr("font-family", "monospace")
                            .attr("fill", "white");
                        tabtext3[i] = canvas.append("text")
                            .text(tab[i].temps + "s")
                            .attr("x", 90)
                            .attr("y", 300)
                            .attr("font-size", 12)
                            .attr("font-family", "monospace")
                            .attr("fill", "white");

                    }





                    var rect0, rect1, rect2, rect3, text1, text2, text3;







                    //enfilement
                    var x = 450,
                        x1 = 455;
                    for (var e = 0; e < nombreP; e++) {
                        gg.enfiler(tab[e].identificateur);
                        tabrect[e].transition()
                            .duration(1500)
                            .attr("x", x)
                        tabrectx[e] = x;
                        tabtext1[e].transition()

                        .duration(1500)
                            .attr("x", x1);
                        tabtext1x[e] = x1;
                        tabtext2[e].transition()

                        .duration(1500)
                            .attr("x", x1);
                        tabtext2x[e] = x1;
                        tabtext3[e].transition()

                        .duration(1500)
                            .attr("x", x1);
                        tabtext3x[e] = x1;
                        x = x - 50;
                        x1 = x1 - 50;
                    }

                    function afficheFenFifo(delay) {
                        flou.attr('fill', 'transparent').attr('opacity', 1.0).style('visibility', 'visible');
                        fenetre.attr('fill', 'transparent').attr('y', -200).style('visibility', 'visible');
                        flou.transition().attr('fill', 'lightgray').attr('opacity', 0.6).duration(100) //.delay(delay);
                        fenetre.transition().attr('fill', '#404040').attr('y', 50).duration(100) //.delay(delay+500);
                            // afficheur.visible("visible",delay+700);


                    }

                    function cacherFen() {

                        //afficheur.visible("hidden",0);
                        fenetre.transition().attr('fill', 'transparent').duration(500);
                        flou.transition().attr('fill', 'transparent').duration(500);
                        fenetre.transition().style('visibility', 'hidden').delay(500);
                        flou.transition().style('visibility', 'hidden').delay(500);


                    }








                    var l = 0;
                    var cpt = 0;
                    var p = 390;

                    var table1 = dd.gettabEtat();
                    var r = setInterval(async function() {
                        console.log("la fiiiilleeee" + gg.getfile_vide());
                        //fragmentation
                        s = 390;
                        rect = canvas.append("rect")
                            .attr("x", 55)
                            .attr("y", 380)
                            .attr("ry", 6)
                            .attr("width", 200)
                            .attr("height", 200)
                            .attr("fill", "white");
                        var r = 0;
                        while (r < nbPart) {
                            if (tabfrag2[r] != null) {
                                var text = canvas.append("text")
                                    .text(r)
                                    .attr("x", 85)
                                    .attr("y", s)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                var text = canvas.append("text")
                                    .text(tabfrag2[r])
                                    .attr("x", 150)
                                    .attr("y", s)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                s = s + 15;
                            }
                            r++;
                        }
                        if ((gg.getfile_vide() == "faux") && (cpt != nombreP)) {
                            var z = maFile[0];
                            console.log("le z:" + z);
                            proc = tab[z];
                            console.log("la taille du proc" + proc.taille);
                            jj.rechPart2(proc.taille);
                            console.log(jj.getident());

                            console.log("trouv est " + jj.getTrouv());
                            if (jj.getTrouv() == "vrai") {
                                pause = 0;
                                /*  flou1 = canvas.append('rect')
                                      .attr('height', 3000)
                                      .attr('width', 3000)
                                      .attr('x', -100)
                                      .attr('y', 0)
                                      .attr('fill', 'white')*/
                                ///////////////
                                flou = canvas.append('rect')
                                    .attr('height', 3000)
                                    .attr('width', 3000)
                                    .attr('x', -100)
                                    .attr('y', -200)
                                    .attr('fill', 'transparent')
                                    .style('visibility', 'hidden');
                                fenetre = canvas.append('rect')
                                    .attr('height', 400)
                                    .attr('width', 500)
                                    .attr('x', 250)
                                    .attr('y', 0)
                                    .attr('fill', 'transparent')
                                    .style('visibility', 'hidden');
                                ////////////////////////////

                                afficheFenFifo(0);
                                a = new afficheurRecherche(canvas)
                                console.log("affffffffffffffffffff" + jj.getident())
                                a.remplissage(dd.gettabEtat(), proc, jj.getident(), canvas)
                                    //flou1.transition().delay(7000).remove()

                                await sleep(7000)
                                cacherFen();



                                /*  rec = canvas.append("rect")
                                      .attr("x", 200)
                                      .attr("y", 200)
                                      .attr("ry", 6)
                                      .attr("width", 370)
                                      .attr("height", 40)
                                      .attr("fill", "#D6CFD2")
                                      .transition()
                                      .remove().duration(2000);
                                  tex = canvas.append("text")
                                      .text("Recherche:La partition choisie est:" + jj.getident())
                                      .attr("x", 220)
                                      .attr("y", 220)

                                  .attr("font-size", 16)
                                      .attr("font-family", "monospace")
                                      .attr("fill", "black")
                                      .transition()
                                      .remove().duration(2000);*/


                                console.log("je suis dans if ");
                                /*défilement*/
                                proc.identificateur = gg.defiler();
                                cpt++;
                                tabrect[l].transition()
                                    .duration(200)
                                    .attr("x", 600)
                                    .transition()
                                    .attr("y", q[jj.getident()] - 5)
                                    .remove().duration(1000);

                                tabtext1[l].transition()
                                    .duration(200)
                                    .attr("x", 610)
                                    .transition()
                                    .attr("y", q[jj.getident()] + 5)
                                    .remove().duration(1000);

                                tabtext2[l].transition()
                                    .duration(200)
                                    .attr("x", 610)
                                    .transition()
                                    .attr("y", q[jj.getident()] + 20)
                                    .remove().duration(1000);
                                tabtext3[l].transition()
                                    .duration(200)
                                    .attr("x", 610)
                                    .transition()
                                    .attr("y", q[jj.getident()] + 35)
                                    .remove().duration(1000);
                                var c = 1;
                                var h = 0;
                                var f = 450;
                                //transition des psus qui restent dans la file
                                while (h < (nombreP - cpt)) {

                                    tabrect[l + c].transition()
                                        .duration(200)
                                        .attr("x", f);
                                    tabrect[l + c].attr("fill", tabclr[h]);
                                    tabtext1[l + c].transition()
                                        .duration(200)
                                        .attr("x", f + 12);
                                    tabtext2[l + c].transition()
                                        .duration(200)
                                        .attr("x", f + 12);
                                    tabtext3[l + c].transition()
                                        .duration(200)
                                        .attr("x", f + 12);
                                    h++;
                                    c++;
                                    f = f - 45;

                                }






                                l++;
                                await sleep(1500);

                                console.log("défilement du :" + proc.identificateur);
                                console.log("la file;" + maFile);
                                let ff = new partition("libre", dd.gettabEtat(), jj.getident(), 0, "false", dd.gettabMem(), taille);
                                ff.insertion(proc, q, canvas);
                                //  var part = canvas.append("rect").attr("width", 200).attr("height", proc.taille).attr("fill", "blue").attr("x", 1100).attr("y", q[jj.getident()]);
                                console.log("etat de la partition" + ff.getetat());
                                pause = 1;

                            } else {

                                //  alert("la taille du psus est supérieure à la taille de toutes les partitions");
                                if (jj.getstop() == "vrai") {
                                    cpt++;
                                    //alert("La taille du processus est supérieure à la taille de toutes les partitions")
                                    proc.identificateur = gg.defiler();
                                    tabrect[l].transition()
                                        .duration(80)
                                        .attr("x", 600)
                                        .remove().duration(1000);

                                    tabtext1[l].transition()
                                        .duration(80)
                                        .attr("x", 620)
                                        .remove().duration(1000);

                                    tabtext2[l].transition()
                                        .duration(80)
                                        .attr("x", 620)
                                        .remove().duration(1000);
                                    tabtext3[l].transition()
                                        .duration(200)
                                        .attr("x", 620)
                                        .remove().duration(1000);
                                    //fragmentation externe

                                    var texta = canvas.append("text")
                                        .text(proc.identificateur)
                                        .attr("x", 310)
                                        .attr("y", p)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black")
                                        .transition()
                                        .delay(5000)
                                        .remove().duration(6000);



                                    var textb = canvas.append("text")
                                        .text(proc.taille)
                                        .attr("y", p)
                                        .attr("x", 380)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black")
                                        .transition()
                                        .delay(5000)
                                        .remove().duration(6000);

                                    p = p + 15;








                                    var c = 1;
                                    var h = 0;
                                    var f = 450;
                                    //transition des psus qui restent dans la file
                                    while (h < (nombreP - cpt)) {

                                        tabrect[l + c].transition()
                                            .duration(200)
                                            .attr("x", f);
                                        tabrect[l + c].attr("fill", tabclr[h]);
                                        tabtext1[l + c].transition()
                                            .duration(200)
                                            .attr("x", f + 12);
                                        tabtext2[l + c].transition()
                                            .duration(200)
                                            .attr("x", f + 12);
                                        tabtext3[l + c].transition()
                                            .duration(200)
                                            .attr("x", f + 12);
                                        h++;
                                        c++;
                                        f = f - 45;

                                    }



                                    l++;
                                }
                            }



                            // cpt++;
                            console.log("la valeur de cpt" + cpt);






                        } else {
                            /*  if (cpt == nombreP) {
                                  rect = canvas.append("rect")
                                      .attr("x", 310)
                                      .attr("y", 510)
                                      .attr("ry", 6)
                                      .attr("width", 200)
                                      .attr("height", 200)
                                      .attr("fill", "#EFF0F5");
                              

                              }*/
                        }

                        /*else {
                                                   clearInterval(r);
                                               }*/
                    }, 9000);



                    setInterval(function() {
                        if (pause == 1) {
                            //libération
                            var t = 47
                            console.log("j'ai entré dans la condition");
                            var table2 = dd.gettabMem();
                            console.log("tab mem", +table2);
                            /*   rect = canvas.append("rect")
                                   .attr("x", 375)
                                   .attr("y", 75)
                                   .attr("ry", 6)
                                   .attr("width", 200)
                                   .attr("height", 90)
                                   .attr("fill", "#EFF0F5");*/


                            for (var i = 0; i < nbPart; i++) {
                                console.log("la partition " + i + "est" + table2[i]);
                                if (table1[i].etat == "occupé") {

                                    table2[i].temps--;
                                    rect = canvas.append("rect")
                                        .attr("x", 300)
                                        .attr("y", t - 10)

                                    .attr("width", 200)
                                        .attr("height", 20)
                                        .attr("fill", "white");
                                    var text = canvas.append("text")
                                        .text(table2[i].identificateur)
                                        .attr("x", 320)
                                        .attr("y", t)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black");
                                    canvas.append("text")
                                        .text(table2[i].temps)
                                        .attr("y", t)
                                        .attr("x", 400)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black");
                                    canvas.append("text")
                                        .text(table2[i].taille)
                                        .attr("y", t)
                                        .attr("x", 460)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black");



                                    if (table2[i].temps == 0) {
                                        //  clearInterval(u);
                                        rect = canvas.append("rect")
                                            .attr("x", 300)
                                            .attr("y", t - 10)

                                        .attr("width", 200)
                                            .attr("height", 20)
                                            .attr("fill", "white");

                                        console.log("c'est la partition" + i);
                                        let tt = new partition("libre", dd.gettabEtat(), i, 0, "false", dd.gettabMem(), taille);
                                        tt.libération(q, canvas);


                                        console.log("l'etat de la partition aprés libération" + table1[i].etat);
                                        console.log("l'etat de la partition aprés libération" + (dd.gettabEtat())[i].etat);
                                        // tt.affichage3(4);
                                    }

                                }
                                t = t + 20


                            }

                        }
                    }, 1000);
                }
            });























            console.log("c'est finie");













        }
    }

    function terminer() {
        if (able) {
            Swal.fire({
                title: "Terminer la simulation ",
                text: "un bilan de la simulation s'affichera,mais vous ne pouvez plus la continuer",
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: 'rgb(28,200,138)',
                cancelButtonText: "Annuler",
                confirmButtonText: "Afficher le bilan ",
                confirmButtonColor: "#3085D6"
            }).then((result) => {
                if (result.value) {
                    able = false;
                    d3.select("#svg2").remove();
                    //d3.select("#chaine").remove();
                    // d3.select("#footer").remove();
                    let head = d3.select("#card").append("div").attr("class", "card-header");
                    head.append("h3").text("Le Bilan");
                    let bodyC = d3.select("#card").append("div").attr("class", "card-body").style("width", "100%");
                    bodyC.append("table").attr("id", "example").attr("width", "80%").style("position", "relative").style("left", "10%").attr("class", "table table-bordered").attr("cellspacing", "0");
                    let footer = d3.select("#card").append("div").attr("class", "card-footer")
                    let btn=footer.append("button").attr("class","btn btn-primary btn-icon-split ").style("width","200px").style("height","40px").style("left","44%").style("position","relative").append("span").text("Introduire un scenario");
                    btn.on('click', function() {
                        window.location.href = "FileCommuneFinaleSansExemple.html";
                    })
                    $('#example').DataTable({
                        ordering: false,
                        data: datatable,
                        columns: [
                            { title: "Le processus:" },
                            { title: "La taille (kO)" },
                            { title: "le temps (S)" },
                            { title: "la taille de partition choisie (kO)" },
                            { title: "fragmentation" },

                        ]
                    })

                }

            });


        }
    }
    //bloquer les imput
    document.getElementById("taime").disabled = true;
    document.getElementById("nbpa").disabled = true;
    document.getElementById("taipart").disabled = true;
    document.getElementById("taipartok").disabled = true;
    document.getElementById("nbp").disabled = true;
    document.getElementById("taips").disabled = true;
    document.getElementById("tmps").disabled = true;
    document.getElementById("psok").disabled = true;
    let fen;
    let com;
    let commencer = false;
    d3.select("#senario").on('click', function() {
        eff = true
        senariof()
    })

    d3.select("#exemple").on('click', function() {
        // window.open("essss.html", "newFenetre", "width=device-width,height=device-width");
        d3.select("#illustration").remove();
        d3.select('#terminer').on('click', function() {
            able = true;
            terminer()
        })
        let canvas = d3.select("#svg2");

        introJs()

        introJs().start()


        // la file vide 
        var text = canvas.append("text")
            .text("La file")
            .attr("x", 70)
            .attr("y", 250)
            .attr("font-size", 16)
            .attr("font-family", "monospace")
            .attr("fill", "black");
        var line1 = canvas.append("line")
            .attr("x1", 70)
            .attr("y1", 260)
            .attr("x2", 500)
            .attr("y2", 260)
            .attr("stroke", "#0C0101")
            .attr("stroke-width", 2);
        var line2 = canvas.append("line")
            .attr("x1", 70)
            .attr("y1", 310)
            .attr("x2", 500)
            .attr("y2", 310)
            .attr("stroke", "#0C0101")
            .attr("stroke-width", 2);






        // la table d'état
        var rect = canvas.append("rect")
            .attr("width", 190)
            .attr("height", 25)
            .attr("fill", "#B0EFC1")

        .attr("x", 170)
            .attr("y", -17)
            .attr("ry", 6);
        var text = canvas.append("text")
            .text("Table d'état")
            .attr("x", 220)
            .attr("y", -3)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "black");
        var line3 = canvas.append("line")
            .attr("x1", 48)
            .attr("y1", 32)
            .attr("x2", 283)
            .attr("y2", 32)
            .attr("stroke", "#0C0101")
            .attr("stroke-width", 1.5);
        var text = canvas.append("text")
            .text("Id")
            .attr("x", 50)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 9)
            .attr("data-intro", "l'identificateur de la partition");
        introJs().goToStep(9).start();
        var text = canvas.append("text")
            .text("@Début")
            .attr("x", 85)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 10)
            .attr("data-intro", "l'adresse début de la partition");
        introJs().goToStep(10).start();
        var text = canvas.append("text")
            .text("Taille")
            .attr("x", 160)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 11)
            .attr("data-intro", " la taille de la partition");
        introJs().goToStep(11).start();
        var text = canvas.append("text")
            .text("Etat")
            .attr("x", 240)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 12)
            .attr("data-intro", "l'état de la partition (libre/occupée)");
        introJs().goToStep(12).start();

        var line4 = canvas.append("line")
            .attr("x1", 292)
            .attr("y1", 32)
            .attr("x2", 497)
            .attr("y2", 32)
            .attr("stroke", "#0C0101")
            .attr("stroke-width", 1.5);

        var text = canvas.append("text")
            .text("Processus")
            .attr("x", 300)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 13)
            .attr("data-intro", "l'identificateur du processus qui occupe cette partition");
        introJs().goToStep(13).start();
        var text = canvas.append("text")
            .text("Temps")
            .attr("x", 390)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 14)
            .attr("data-intro", "le temps de présence du processus dans la mémoire");
        introJs().goToStep(14).start();
        var text = canvas.append("text")
            .text("Taille")
            .attr("x", 450)
            .attr("y", 27)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 15)
            .attr("data-intro", "la taille du processus");
        introJs().goToStep(15).start();
        //systéme d'exploitatipn
        var y = 3;
        var part = canvas.append("rect").attr("width", 150).attr("height", 40).attr("fill", "pink").attr("x", 800).attr("y", y - 20).attr("ry", 6)
            .attr("data-step", 16)
            .attr("data-intro", "la partie de la mémoire  de 30 KO est réservée pour l'OS");
        introJs().goToStep(16).start();
        var text = canvas.append("text")
            .text("Systéme d'exploitation")
            .attr("x", 810)
            .attr("y", 5 + y)
            .attr("font-size", 11)
            .attr("font-family", "monospace")
            .attr("fill", "black");

        //  fragmentation interne
        var rect = canvas.append("rect")
            .attr("width", 150)
            .attr("height", 25)
            .attr("fill", "#B0EFC1")

        .attr("x", 54)
            .attr("y", 330)
            .attr("ry", 6);


        var text = canvas.append("text")
            .text("Fragmentation interne")
            .attr("x", 61)
            .attr("y", 345)
            .attr("font-size", 12)
            .attr("font-family", "monospace")
            .attr("fill", "black");
        var line6 = canvas.append("line")
            .attr("x1", 58)
            .attr("y1", 375)
            .attr("x2", 200)
            .attr("y2", 375)
            .attr("stroke", "black")
            .attr("stroke-width", 1.5);
        var text = canvas.append("text")
            .text("Partition")
            .attr("x", 60)
            .attr("y", 370)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 17)
            .attr("data-intro", "l'identificateur de la partition ou se trouve la fragmentation interne");
        introJs().goToStep(17).start();
        var text = canvas.append("text")
            .text("Taille")
            .attr("x", 150)
            .attr("y", 370)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 18)
            .attr("data-intro", " la taille de la fragmentation interne");
        introJs().goToStep(18).start();


        //  fragmentation externe
        var rect = canvas.append("rect")
            .attr("width", 150)
            .attr("height", 25)
            .attr("fill", "#B0EFC1")

        .attr("x", 280)
            .attr("y", 330)
            .attr("ry", 6);
        var text = canvas.append("text")
            .text("Fragmentation externe")
            .attr("x", 287)
            .attr("y", 345)
            .attr("font-size", 12)
            .attr("font-family", "monospace")
            .attr("fill", "black");
        var text = canvas.append("text")
            .text("Processus")
            .attr("x", 287)
            .attr("y", 370)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 19)
            .attr("data-intro", "l'identificateur du processus qui a causé une fragmentation externe");
        introJs().goToStep(19).start();
        var text = canvas.append("text")
            .text("Taille")
            .attr("x", 375)
            .attr("y", 370)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 20)
            .attr("data-intro", "la taille de la fragmentation externe");
        introJs().goToStep(20).start();

        var line5 = canvas.append("line")
            .attr("x1", 285)
            .attr("y1", 375)
            .attr("x2", 425)
            .attr("y2", 375)
            .attr("stroke", " black")
            .attr("stroke-width", 1.5);

        var into = introJs()
        into.onexit(function() {
            Swal.fire({
                title: 'Exemple',
                html: "Dans cette exemple animé, les données utilisées sont : <br> - taille de la mémoire : 500 ko <br> - Nombre de processus: 3 <br> - les processus(taille,temps) :p0(120,20) , p1(520,30) , p2(70,15)",
                animation: false,
                showConfirmButton: true,
                confirmButtonText: 'Commencer',

            }).then((result) => {






                let proc;
                var tabfrag2 = [null, null, null, null];
                var taille = 400;

                var nombreP = 3;
                var nbPart = 4;
                var q = [nbPart];
                let f = 400 / taille;
                maFile = new Array();
                gg = new File(9, 0, "faux", "faux", maFile);


                var tabTaillePart = [100, 80, 50, 170];
                let dd = new Mémoire(30, 15, nbPart);
                dd.initialiserTabEtat(tabTaillePart, canvas);
                let jj = new TabEtat2(nbPart, dd.gettabEtat(), 0);


                // la mémoire
                var y = 8;
                for (var j = 0; j < nbPart; j++) {
                    var part = canvas.append("rect").attr("width", 150).attr("height", tabTaillePart[j] * f).attr("fill", "#B0EFC1").attr("x", 800).attr("y", (y + 19)).attr("ry", 6);
                    q[j] = y + 49;
                    //q[j] = y + 80;

                    var text8 = canvas.append("text")
                        .text(j)
                        .attr("x", 952)
                        .attr("y", q[j] - 20)
                        .attr("font-size", 14)
                        .attr("font-family", "monospace")
                        .attr("fill", "black");
                    y = y + tabTaillePart[j] * f + 4;
                    tabfrag2[j] = null;
                }







                // la file vide 
                var text = canvas.append("text")
                    .text("La file")
                    .attr("x", 70)
                    .attr("y", 250)
                    .attr("font-size", 16)
                    .attr("font-family", "monospace")
                    .attr("fill", "black");
                var line1 = canvas.append("line")
                    .attr("x1", 70)
                    .attr("y1", 260)
                    .attr("x2", 500)
                    .attr("y2", 260)
                    .attr("stroke", "#0C0101")
                    .attr("stroke-width", 2);
                var line2 = canvas.append("line")
                    .attr("x1", 70)
                    .attr("y1", 310)
                    .attr("x2", 500)
                    .attr("y2", 310)
                    .attr("stroke", "#0C0101")
                    .attr("stroke-width", 2);

                tab[0] = new Prosseecus(100, 20, 0);
                tab[1] = new Prosseecus(60, 15, 1);
                tab[2] = new Prosseecus(20, 10, 2);
                //ajouter un ou plusieurs psus
                for (var i = 0; i < nombreP; i++) {


                    tabrect[i] = canvas.append("rect")
                        .attr("x", 80)
                        .attr("y", 265)
                        .attr("ry", 6)
                        .attr("width", 40)
                        .attr("height", 40)
                        .attr("fill", tabclr[i]);
                    tabtext1[i] = canvas.append("text")
                        .text(tab[i].identificateur)
                        .attr("x", 90)
                        .attr("y", 277)
                        .attr("font-size", 12)
                        .attr("font-family", "monospace")
                        .attr("fill", "white");
                    tabtext2[i] = canvas.append("text")
                        .text(tab[i].taille + "ko")
                        .attr("x", 75)
                        .attr("y", 288)
                        .attr("font-size", 12)
                        .attr("font-family", "monospace")
                        .attr("fill", "white");
                    tabtext3[i] = canvas.append("text")
                        .text(tab[i].temps + "s")
                        .attr("x", 90)
                        .attr("y", 300)
                        .attr("font-size", 12)
                        .attr("font-family", "monospace")
                        .attr("fill", "white");

                }





                var rect0, rect1, rect2, rect3, text1, text2, text3;







                //enfilement
                var x = 450,
                    x1 = 455;
                for (var e = 0; e < nombreP; e++) {
                    gg.enfiler(tab[e].identificateur);
                    tabrect[e].transition()
                        .duration(1500)
                        .attr("x", x)
                    tabrectx[e] = x;
                    tabtext1[e].transition()

                    .duration(1500)
                        .attr("x", x1);
                    tabtext1x[e] = x1;
                    tabtext2[e].transition()

                    .duration(1500)
                        .attr("x", x1);
                    tabtext2x[e] = x1;
                    tabtext3[e].transition()

                    .duration(1500)
                        .attr("x", x1);
                    tabtext3x[e] = x1;
                    x = x - 50;
                    x1 = x1 - 50;
                }

                function afficheFenFifo(delay) {
                    flou.attr('fill', 'transparent').attr('opacity', 1.0).style('visibility', 'visible');
                    fenetre.attr('fill', 'transparent').attr('y', -200).style('visibility', 'visible');
                    flou.transition().attr('fill', 'lightgray').attr('opacity', 0.6).duration(100) //.delay(delay);
                    fenetre.transition().attr('fill', '#404040').attr('y', 50).duration(100) //.delay(delay+500);
                        // afficheur.visible("visible",delay+700);


                }

                function cacherFen() {

                    //afficheur.visible("hidden",0);
                    fenetre.transition().attr('fill', 'transparent').duration(500);
                    flou.transition().attr('fill', 'transparent').duration(500);
                    fenetre.transition().style('visibility', 'hidden').delay(500);
                    flou.transition().style('visibility', 'hidden').delay(500);


                }








                var l = 0;
                var cpt = 0;
                var p = 390;

                var table1 = dd.gettabEtat();
                var r = setInterval(async function() {
                    console.log("la fiiiilleeee" + gg.getfile_vide());
                    //fragmentation
                    s = 390;
                    rect = canvas.append("rect")
                        .attr("x", 55)
                        .attr("y", 380)
                        .attr("ry", 6)
                        .attr("width", 200)
                        .attr("height", 200)
                        .attr("fill", "white");
                    var r = 0;
                    while (r < nbPart) {
                        if (tabfrag2[r] != null) {
                            var text = canvas.append("text")
                                .text(r)
                                .attr("x", 85)
                                .attr("y", s)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black");
                            var text = canvas.append("text")
                                .text(tabfrag2[r])
                                .attr("x", 150)
                                .attr("y", s)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black");
                            s = s + 15;
                        }
                        r++;
                    }
                    if ((gg.getfile_vide() == "faux") && (cpt != nombreP)) {
                        var z = maFile[0];
                        console.log("le z:" + z);
                        proc = tab[z];
                        console.log("la taille du proc" + proc.taille);
                        jj.rechPart2(proc.taille);
                        console.log(jj.getident());

                        console.log("trouv est " + jj.getTrouv());
                        if (jj.getTrouv() == "vrai") {
                            pause = 0;
                            /*  flou1 = canvas.append('rect')
                                  .attr('height', 3000)
                                  .attr('width', 3000)
                                  .attr('x', -100)
                                  .attr('y', 0)
                                  .attr('fill', 'white')*/
                            ///////////////
                            flou = canvas.append('rect')
                                .attr('height', 3000)
                                .attr('width', 3000)
                                .attr('x', -100)
                                .attr('y', -200)
                                .attr('fill', 'transparent')
                                .style('visibility', 'hidden');
                            fenetre = canvas.append('rect')
                                .attr('height', 400)
                                .attr('width', 500)
                                .attr('x', 250)
                                .attr('y', 0)
                                .attr('fill', 'transparent')
                                .style('visibility', 'hidden');
                            ////////////////////////////

                            afficheFenFifo(0);
                            a = new afficheurRecherche(canvas)
                            console.log("affffffffffffffffffff" + jj.getident())
                            a.remplissage(dd.gettabEtat(), proc, jj.getident(), canvas)
                                //flou1.transition().delay(7000).remove()

                            await sleep(7000)
                            cacherFen();





                            console.log("je suis dans if ");
                            /*défilement*/
                            proc.identificateur = gg.defiler();
                            cpt++;
                            tabrect[l].transition()
                                .duration(200)
                                .attr("x", 600)
                                .transition()
                                .attr("y", q[jj.getident()] - 5)
                                .remove().duration(1000);

                            tabtext1[l].transition()
                                .duration(200)
                                .attr("x", 610)
                                .transition()
                                .attr("y", q[jj.getident()] + 5)
                                .remove().duration(1000);

                            tabtext2[l].transition()
                                .duration(200)
                                .attr("x", 610)
                                .transition()
                                .attr("y", q[jj.getident()] + 20)
                                .remove().duration(1000);
                            tabtext3[l].transition()
                                .duration(200)
                                .attr("x", 610)
                                .transition()
                                .attr("y", q[jj.getident()] + 35)
                                .remove().duration(1000);
                            var c = 1;
                            var h = 0;
                            var f = 450;
                            //transition des psus qui restent dans la file
                            while (h < (nombreP - cpt)) {

                                tabrect[l + c].transition()
                                    .duration(200)
                                    .attr("x", f);
                                tabrect[l + c].attr("fill", tabclr[h]);
                                tabtext1[l + c].transition()
                                    .duration(200)
                                    .attr("x", f + 12);
                                tabtext2[l + c].transition()
                                    .duration(200)
                                    .attr("x", f + 12);
                                tabtext3[l + c].transition()
                                    .duration(200)
                                    .attr("x", f + 12);
                                h++;
                                c++;
                                f = f - 45;

                            }






                            l++;
                            await sleep(1500);

                            console.log("défilement du :" + proc.identificateur);
                            console.log("la file;" + maFile);
                            let ff = new partition("libre", dd.gettabEtat(), jj.getident(), 0, "false", dd.gettabMem(), taille);
                            ff.insertion(proc, q, canvas);
                            //  var part = canvas.append("rect").attr("width", 200).attr("height", proc.taille).attr("fill", "blue").attr("x", 1100).attr("y", q[jj.getident()]);
                            console.log("etat de la partition" + ff.getetat());
                            pause = 1;

                        } else {

                            //  alert("la taille du psus est supérieure à la taille de toutes les partitions");
                            if (jj.getstop() == "vrai") {
                                cpt++;
                                //alert("La taille du processus est supérieure à la taille de toutes les partitions")
                                proc.identificateur = gg.defiler();
                                tabrect[l].transition()
                                    .duration(80)
                                    .attr("x", 600)
                                    .remove().duration(1000);

                                tabtext1[l].transition()
                                    .duration(80)
                                    .attr("x", 620)
                                    .remove().duration(1000);

                                tabtext2[l].transition()
                                    .duration(80)
                                    .attr("x", 620)
                                    .remove().duration(1000);
                                tabtext3[l].transition()
                                    .duration(200)
                                    .attr("x", 620)
                                    .remove().duration(1000);
                                //fragmentation externe

                                var texta = canvas.append("text")
                                    .text(proc.identificateur)
                                    .attr("x", 310)
                                    .attr("y", p)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black")
                                    .transition()
                                    .delay(5000)
                                    .remove().duration(6000);



                                var textb = canvas.append("text")
                                    .text(proc.taille)
                                    .attr("y", p)
                                    .attr("x", 380)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black")
                                    .transition()
                                    .delay(5000)
                                    .remove().duration(6000);

                                p = p + 15;








                                var c = 1;
                                var h = 0;
                                var f = 450;
                                //transition des psus qui restent dans la file
                                while (h < (nombreP - cpt)) {

                                    tabrect[l + c].transition()
                                        .duration(200)
                                        .attr("x", f);
                                    tabrect[l + c].attr("fill", tabclr[h]);
                                    tabtext1[l + c].transition()
                                        .duration(200)
                                        .attr("x", f + 12);
                                    tabtext2[l + c].transition()
                                        .duration(200)
                                        .attr("x", f + 12);
                                    tabtext3[l + c].transition()
                                        .duration(200)
                                        .attr("x", f + 12);
                                    h++;
                                    c++;
                                    f = f - 45;

                                }



                                l++;
                            }
                        }



                        // cpt++;
                        console.log("la valeur de cpt" + cpt);






                    } else {
                        /*  if (cpt == nombreP) {
                              rect = canvas.append("rect")
                                  .attr("x", 310)
                                  .attr("y", 510)
                                  .attr("ry", 6)
                                  .attr("width", 200)
                                  .attr("height", 200)
                                  .attr("fill", "#EFF0F5");
                          

                          }*/
                    }

                    /*else {
                                               clearInterval(r);
                                           }*/
                }, 9000);



                setInterval(function() {
                    if (pause == 1) {
                        //libération
                        var t = 47
                        console.log("j'ai entré dans la condition");
                        var table2 = dd.gettabMem();
                        console.log("tab mem", +table2);
                        /*   rect = canvas.append("rect")
                               .attr("x", 375)
                               .attr("y", 75)
                               .attr("ry", 6)
                               .attr("width", 200)
                               .attr("height", 90)
                               .attr("fill", "#EFF0F5");*/


                        for (var i = 0; i < nbPart; i++) {
                            console.log("la partition " + i + "est" + table2[i]);
                            if (table1[i].etat == "occupé") {

                                table2[i].temps--;
                                rect = canvas.append("rect")
                                    .attr("x", 300)
                                    .attr("y", t - 10)

                                .attr("width", 200)
                                    .attr("height", 20)
                                    .attr("fill", "white");
                                var text = canvas.append("text")
                                    .text(table2[i].identificateur)
                                    .attr("x", 320)
                                    .attr("y", t)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                canvas.append("text")
                                    .text(table2[i].temps)
                                    .attr("y", t)
                                    .attr("x", 400)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                canvas.append("text")
                                    .text(table2[i].taille)
                                    .attr("y", t)
                                    .attr("x", 460)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");



                                if (table2[i].temps == 0) {
                                    //  clearInterval(u);
                                    rect = canvas.append("rect")
                                        .attr("x", 300)
                                        .attr("y", t - 10)

                                    .attr("width", 200)
                                        .attr("height", 20)
                                        .attr("fill", "white");

                                    console.log("c'est la partition" + i);
                                    let tt = new partition("libre", dd.gettabEtat(), i, 0, "false", dd.gettabMem(), taille);
                                    tt.libération(q, canvas);


                                    console.log("l'etat de la partition aprés libération" + table1[i].etat);
                                    console.log("l'etat de la partition aprés libération" + (dd.gettabEtat())[i].etat);
                                    // tt.affichage3(4);
                                }

                            }
                            t = t + 20


                        }

                    }
                }, 1000);














            })










        })

        into.start()


































    })
    d3.select("#exemple").on('mouseover', function() {
        d3.select("#exe").attr("fill", "#6EC5A8");
    })
    d3.select('#tour').on('click', function() {
        var into = introJs()
        into.start()
    })
    d3.select("#senario").on('mouseover', function() {
        d3.select("#sen").attr("fill", "#6EC5A8");

    })
    d3.select("#exemple").on('mouseout', function() {
        d3.select("#exe").attr("fill", "#00AA71");
    })
    d3.select("#senario").on('mouseout', function() {
            d3.select("#sen").attr("fill", "#00AA71");
        })
        /*Recommencer la simulation*/
    d3.select("#restart").on('click', function() {
        window.location.reload();
    });




    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}