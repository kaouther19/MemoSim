let taille = 0;
let nombreP = 0;
let nbPart = 0;
let tabtai = [];
let tabtem = [];
let tab = [];
let tabTaillePart = [];
let tabNbPsus = [];
let tabFileP = [];
let tabFileV = [];
let tabPsus = [];
let tabfrag2 = [];
let n = 10;
let adrdébut = 100;
let tabrectf = [nombreP];
let q = [nbPart];
let tabrect = new Array();
let datatable = [];
let ecc = false;


///var tabrect = [];
let v = 0;
let g = 0
let nnn = 0;
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
}

class File {

    constructor(n, nbr_psus, file_pleine, file_vide, maFile, id) {
        this.n = n; //nombre max de psus que peut contenir la file
        this.nbr_psus = nbr_psus;
        this.file_pleine = file_pleine;
        this.file_vide = file_vide;
        this.maFile = maFile;
        // this.id = ll.getident();
        this.id = id;
    }
    enfiler(proc, tabPsus, tabNbPsus, tabFileP, tabFileV) {

        if (this.file_pleine == "faux") {
            this.maFile.push(proc.identificateur); //inserer ds la derniere case de tableau
            this.nbr_psus++;
            tabNbPsus[this.id]++;
            tabFileV[this.id] = "faux";
            // tabPsus[this.id].push(proc.identificateur);

            if (tabNbPsus[this.id] == this.n) {
                this.file_pleine = "vrai";
                tabFileP[this.id] = "vrai"
            }
        } else {
            console.log("vous pouvez pas enfiler un nouveau psus car la file est pleine");
        }
    }
    defiler(tabPsus, tabNbPsus, tabFileP, tabFileV) {
        if (this.file_vide == "faux") {
            this.nbr_psus--;
            tabNbPsus[this.id]--;
            tabFileP[this.id] = "faux";
            if (tabNbPsus[this.id] == 0) {
                this.file_vide = "vrai";
                tabFileV[this.id] = "vrai"
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
        this.tabMem = [];
        this.tabEtat = [nbPart];
        this.tabFile = [nbPart];


    }


    initialiserTabEtat(tabTaillePart, canvas) {
        var y = 53;

        for (var i = 0; i < nbPart; i++) {
            this.tabEtat[i] = new Enreg(tabTaillePart[i], "libre", i);
            this.tabMem[i] = null;
            console.log(this.tabEtat[i].taille);
            console.log(this.tabEtat[i].etat);
            console.log(this.tabEtat[i].ident);
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





        }

    }

    gettabEtat() {
        return this.tabEtat;
    }


    gettabMem() {
        return this.tabMem;
    }

}

class TabEtat {
    constructor(nbPart, tabEtat, id) {
        this.nbPart = nbPart;
        //  this.taillePsus = taillePsus;
        //  this.tabEtat = dd.gettabEtat();
        this.tabEtat = tabEtat;
        this.id = id;


    }
    affichage() {

        for (var i = 0; i < this.nbPart; i++) {
            console.log(this.tabEtat[i].taille);
            console.log(this.tabEtat[i].etat);
            console.log(this.tabEtat[i].ident);

        }
    }


    rechPart(taillePsus) {
        console.log("la tailleeeeee" + taillePsus);
        var i = 0;
        var j = 0;

        // var id = 0;
        this.id = 0;
        while (i < this.nbPart) {
            if (taillePsus <= this.tabEtat[i].taille) {
                this.id = i;
                j = 0;
                while (j <= i) {
                    if ((this.tabEtat[j].taille < this.tabEtat[this.id].taille) && (taillePsus <= this.tabEtat[j].taille)) {
                        this.id = j;
                    }
                    j++
                }

            }
            i++;
        }
        console.log("gggggg" + this.id);

        if (taillePsus > this.tabEtat[this.id].taille) {
            this.id = null;
            console.log("pas de partition pour de processus");
            console.log("la taille du processus est supérieur à la taille de toutes les partitions");

        }
        /* var d = 1;
         for (var c = 0; c < this.nbPart; c++) {
             if ((this.tabEtat[c].taille) == (this.tabEtat[d].taille)) {
                 //partition égaux
                  
             }
             d++;

         }*/





        console.log("identificateur de partition  est " + this.id);
    }
    getident() {
        return this.id;
    }
}
var t = 105;

var s = 540;
var d = 700;
tabfrag = [];
//tabfrag2 = [null, null, null, null, null, null];

class partition {
    constructor(etat, tabEtat, id, tailleLibre, frag, tabMem, taille) {


        this.etat = etat;
        // this.identPs = identPs;
        //  this.tabEtat = dd.gettabEtat();
        this.tabEtat = tabEtat;
        // this.id = ll.getident();
        this.id = id;
        // this.taillePsus = taillePsus;
        this.tailleLibre = tailleLibre;
        this.frag = frag;
        // this.tabMem = dd.gettabMem();
        this.tabMem = tabMem;
        this.taille = taille;
    }


    insertion(proc, q, canvas) {
        var f = 400 / this.taille;

        console.log("id est ;" + this.id);
        console.log("la taille de la partition:" + this.tabEtat[this.id].taille);
        console.log("la taille du psus" + proc.taille);
        if (proc.taille <= this.tabEtat[this.id].taille) {

            this.tabMem[this.id] = proc;
            this.etat = "occupé";
            this.tailleLibre = ((this.tabEtat[this.id].taille) - (proc.taille));
            this.tabEtat[this.id].etat = "occupé";
            console.log(" -------- la partition " + this.id + "est" + this.tabEtat[this.id].etat);
            var w = this.tabEtat[this.id].taille - proc.taille
            datatable.push([proc.identificateur, proc.taille, proc.temps, this.tabEtat[this.id].taille, w])
            console.log("insertion avec succé");
            var part = canvas.append("rect").attr("width", 150).attr("height", (proc.taille) * f).attr("fill", "#009D8E").attr("x", 800).attr("y", (q[this.id] - 30)).attr("ry", 6);

            var y = 53,
                x = 0;
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
            tabfrag2[this.id] = "aucune";




        }
        if (this.tailleLibre != 0) {
            this.frag = "vrai";
            console.log("**fragmentation interne**");
            console.log("la taille de la fragmentation:" + this.tailleLibre);
            tabfrag[this.id] = this.tailleLibre;
            tabfrag2[this.id] = this.tailleLibre;
            var part = canvas.append("rect")
                .attr("width", 150)
                .attr("height", this.tailleLibre * f)
                .attr("fill", "#EF6060")
                .attr("x", 800)
                .attr("y", (q[this.id] + (proc.taille) * f) - 30)
                .attr("ry", 6);

        } else {
            this.frag = "faux"
            console.log("pas de fragmmentation interne");

        }
        // s = s + 20;


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

        console.log("je suis dans libération");
        if (this.tabEtat[this.id].etat == "occupé") {
            this.tabMem[this.id] = null;
            this.etat = "libre";
            this.tabEtat[this.id].etat = "libre";
            this.tailleLibre = this.tabEtat[this.id].taille;
            this.frag = "false";
            tabfrag2[this.id] = null;
            console.log("libération avec succés");
            var part = canvas.append("rect").attr("width", 150).attr("height", this.tailleLibre * f).attr("fill", "#B0EFC1").attr("x", 800).attr("y", q[this.id] - 30).attr("ry", 6);
            var y = 53,
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
            /*     var text = canvas.append("text")
                     .text(this.id)

                 .attr("x", 510)
                     .attr("y", y)
                     .attr("font-size", 16)
                     .attr("font-family", "monospace")
                     .attr("fill", "#EFF0F5");
                 var text = canvas.append("text")
                     .text(tabfrag[this.id])
                     .attr("x", 590)
                     .attr("y", y)
                     .attr("font-size", 16)
                     .attr("font-family", "monospace")
                     .attr("fill", "#EFF0F5");
                 var text = canvas.append("text")
                     .text("aucune")

                 .attr("x", 590)
                     .attr("y", y)
                     .attr("font-size", 16)
                     .attr("font-family", "monospace")
                     .attr("fill", "#EFF0F5");*/





        } else {
            if (this.tabEtat[this.id].etat == "libre") {
                console.log("la partition est déja libre");
            } else {
                console.log("le processus est encore en cours d'éxecution");
            }
        }

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
class listeFile {
    constructor(id, nbPart, n, maFile, uu) {
        // this.id = ll.getident();
        this.id = id;
        this.nbPart = nbPart;
        this.n = n;
        this.maFile = maFile;
        this.uu = uu;


    }
    rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus) {
        if (this.id < this.nbPart) {
            // var maFile = new Array();
            this.maFile = tabPsus[this.id];
            this.uu = new File(this.n, tabNbPsus[this.id], tabFileP[this.id], tabFileV[this.id], this.maFile, this.id)
        }
        console.log("la file:" + this.maFile);
        console.log("nb pross dans la file" + tabNbPsus[this.id]);
        console.log("file pleine:" + tabFileP[this.id]);
        console.log("file vide:" + tabFileV[this.id]);
        // console.log("nb proc:" + uu.nbr_psus);


    }
    getuu() {
        return this.uu;
    }
    getmaFile() {
        return this.maFile;

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
                    .transition().delay(7000).remove()
                canvas.append("text").text("car c'est la plus petite partition vide, assez large")
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

    var bilan = 0
    var eff = false;

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

    let fen;
    let com;
    let commencer = false;

    function senariof() {
        if (eff) {



            d3.select("#illustration").remove();
            let canvas = d3.select("#svg2");

            var rect = canvas.append("rect")
                .attr("width", 190)
                .attr("height", 25)
                .attr("fill", "#B0EFC1")

            .attr("x", 170)
                .attr("y", -10)
                .attr("ry", 6);
            // la table d'état

            var text = canvas.append("text")
                .text("Table d'état")
                .attr("x", 220)
                .attr("y", 5)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "black");
            var line3 = canvas.append("line")
                .attr("x1", 48)
                .attr("y1", 39)
                .attr("x2", 283)
                .attr("y2", 39)
                .attr("stroke", "#0C0101")
                .attr("stroke-width", 1.5);
            var text = canvas.append("text")
                .text("Id")
                .attr("x", 50)
                .attr("y", 34)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("@Début")
                .attr("x", 85)
                .attr("y", 34)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Taille")
                .attr("x", 160)
                .attr("y", 34)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Etat")
                .attr("x", 240)
                .attr("y", 34)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");

            var line4 = canvas.append("line")
                .attr("x1", 292)
                .attr("y1", 39)
                .attr("x2", 497)
                .attr("y2", 39)
                .attr("stroke", "#0C0101")
                .attr("stroke-width", 1.5);

            var text = canvas.append("text")
                .text("Processus")
                .attr("x", 300)
                .attr("y", 34)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Temps")
                .attr("x", 390)
                .attr("y", 34)
                .attr("font-size", 14)
                .attr("font-family", "monospace")
                .attr("fill", "#EF6060");
            var text = canvas.append("text")
                .text("Taille")
                .attr("x", 450)
                .attr("y", 34)
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
            var y = 10;
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
            document.getElementById("psok").removeAttribute("disabled");;
            var v = 0;
            var g = 0
            var canvas2 = d3.select("#cpt1").append("text").text(v);
            var canvas3 = d3.select("#cpt").append("text").text(g)
            var canvas4 = d3.select("#cpt3").append("text").text(0)
                /*Récuperer input avec entrer*/
            document.getElementById('taips').addEventListener('submit', function(e) {
                ss();
                e.preventDefault();
            }, false);
            document.getElementById('pss1').addEventListener('submit', function(e) {
                taipart();
                e.preventDefault();
            }, false);
            nbPart = parseInt(document.getElementById('nbpa').value);


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
                    swal.fire("Vous devez saisir la taille et le temps de ce processus");
                } else {
                    if ((t <= 0) || (t1 <= 0)) {
                        if (t <= 0) {
                            swal.fire("La taille doit étre supérieure à 0,veuillez réintroduire les attributs")
                        }
                        if (t1 <= 0) {
                            swal.fire("La temps doit étre supérieur à 0,veuillez réintroduire les attributs")
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
                    swal.fire("vous devez entrer la taille de cette partition");
                } else {
                    if (tabTaillePart[g] <= 0) {
                        swal.fire("la taille de la partition doit étre supérieure à 0")
                        document.getElementById("taipart").value = "";

                    } else {
                        if (g == (nbPart - 1)) {
                            if (tabTaillePart[g] != (taille - ancien)) {
                                swal.fire("la taille de la derniére partition doit étre égale à " + (taille - ancien) + " ko,veuillez la réintroduire:");
                                tabTaillePart[g] = (taille - ancien);
                                g--;
                            }
                            g++;
                        } else {

                            if (tabTaillePart[g] >= taille - ancien) {

                                swal.fire("la taille de la partition " + g + " doit étre iférieure à " + (taille - ancien) + " ko, veuillez la réintroduire:");
                                //  swal("veuillez entrer une nouvelle taille pour la partiton " + g);
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
            let dd = new Mémoire(10, 15, nbPart);
            dd.initialiserTabEtat(tabTaillePart, canvas);
            let ll = new TabEtat(nbPart, dd.gettabEtat(), 0)
            let uu;
            let maFile = new Array();

            /*let rr = new listeFile(ll.getident(), nbPart, 10, maFile, uu);*/

            d3.select('#ajoutok').on('click', function() {

                nombreP = parseInt(document.getElementById('nbp').value);
                //  nnn = parseInt(document.getElementById('cpt3').value);
                t = parseInt(document.getElementById('taips1').value);
                // document.getElementById("taips").disabled = true;
                t1 = parseInt(document.getElementById('tmps1').value);
                if ((document.getElementById('taips1').value == "") || (document.getElementById('tmps1').value == "")) {
                    swal.fire("Vous devez saisir la taille et le temps de ce processus");
                } else {
                    if ((t <= 0) || (t1 <= 0)) {
                        if (t <= 0) {
                            swal.fire("La taille doit étre supérieure à 0,veuillez réintroduire les attributs")
                        }
                        if (t1 <= 0) {
                            swal.fire("La temps doit étre supérieur à 0,veuillez réintroduire les attributs")
                        }

                    } else {
                        //  tabtai[v] = t;
                        //  tabtem[v] = t1;

                        nnn = nnn + 1;
                        nombreP = nombreP + nnn;

                        p1 = new Prosseecus(t, t1, v);

                        tab[v] = p1;
                        console.log('777777777777777777777777777777777')
                        console.log(v)
                        console.log('777777777777777777777777777777777')
                        i = v;
                        tabrect[i] = canvas.append("rect")
                            .attr("x", 80)
                            .attr("y", 265)
                            .attr("ry", 6)
                            .attr("width", 20)
                            .attr("height", 20)
                            .attr("fill", tabclr[i]);
                        v++;

                        console.log(nombreP);

                        canvas4.transition().text(1);
                        ll.rechPart(p1.taille);
                        console.log("la taille de proc" + p1.taille);
                        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhn')

                        console.log("la partition choisie est" + ll.getident())
                        if ((ll.getident()) == null) {
                            //  alert("la taille du psus " + j + " est supérieure à la taille de toutes les partitions");
                            tabrect[i].transition()
                                .delay(1000)
                                .attr("fill", "red")
                                .transition()
                                .attr("y", 320)

                            .remove().duration(1000);
                            //fragmentation externe

                            var texta = canvas.append("text")
                                .text(p1.identificateur)
                                .attr("x", 310)
                                .attr("y", p)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black")
                                .transition()
                                .delay(5000)
                                .remove().duration(6000);


                            var textb = canvas.append("text")
                                .text(p1.taille)
                                .attr("y", p)
                                .attr("x", 380)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black")
                                .transition()
                                .delay(5000)
                                .remove().duration(6000);
                            p = p + 15;


                        } else {
                            /* var uu;
                             var maFile = new Array();*/
                            let rr = new listeFile(ll.getident(), nbPart, 10, maFile, uu);
                            rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);
                            rr.getuu().enfiler(p1, tabPsus, tabNbPsus, tabFileP, tabFileV);
                            //  z = tabnbfile[ll.getident()] * 25;
                            tabrect[i].transition()
                                .delay(1500)
                                .duration(1500)
                                .attr("x", 550)
                                .transition()
                                .duration(1500)

                            .attr("y", tabrectf[ll.getident()])
                                .transition()
                                .attr("x", 730);
                            //  tabnbfile[ll.getident()] = tabnbfile[ll.getident()] + 1;


                            // await sleep(1500);


                            console.log("la file apés enfilement;" + rr.getmaFile());

                            console.log("tab de processus aprés enfilement;" + tabPsus[ll.getident()]);
                        }
                    }

                    document.getElementById("taips1").value = "";
                    document.getElementById("tmps1").value = "";



                }


            })
            d3.select('#commencer').on('click', function() {
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
                    able = true;
                    com.remove();

                    //bool recuper donn

                    let f = 400 / taille;
                    for (j = 0; j < nbPart; j++) {
                        tabPsus[j] = new Array();
                        tabNbPsus[j] = 0;
                        tabFileP[j] = "faux";
                        tabFileV[j] = "vrai";
                        tabfrag2[j] = null;
                    }
                    // la mémoire
                    var y = 15;
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
                    //les files séparées **file de chaque partition**

                    for (var d = 0; d < nbPart; d++) {
                        var p = (tabTaillePart[d] * f / 2) - 38;
                        tabrectf[d] = q[d] + p;
                        var line1 = canvas.append("line")
                            .attr("x1", 650)
                            .attr("y1", tabrectf[d])
                            .attr("x2", 750)
                            .attr("y2", tabrectf[d])
                            .attr("stroke", "#0C0101")
                            .attr("stroke-width", 3);
                        var line2 = canvas.append("line")
                            .attr("x1", 650)
                            .attr("y1", tabrectf[d] + 20)
                            .attr("x2", 750)
                            .attr("y2", tabrectf[d] + 20)
                            .attr("stroke", "#0C0101")
                            .attr("stroke-width", 3);

                    }
                    for (var i = 0; i < nombreP; i++) {
                        ps = new Prosseecus(tabtai[i], tabtem[i], i);
                        tab[i] = ps;
                    }
                    let dd = new Mémoire(10, 15, nbPart);
                    dd.initialiserTabEtat(tabTaillePart, canvas);
                    let ll = new TabEtat(nbPart, dd.gettabEtat(), 0);
                    // table de rectangle


                    var tabrectp = [nombreP];
                    //animation des psus
                    var x = 295;

                    for (var y = 0; y < nombreP; y++) {

                        tabrect[y] = canvas.append("rect")
                            .attr("x", x)
                            .attr("y", 275)
                            .attr("ry", 6)
                            .attr("width", 20)
                            .attr("height", 20)
                            .attr("fill", tabclr[y]);


                        x = x - 60;

                    }
                    /* var maFile = new Array();
                     var uu;*/
                    let cond = false;
                    let compteur = 1;
                    var tabnbfile = [nbPart];
                    for (var c = 0; c < nbPart; c++) {
                        tabnbfile[c] = 0;
                    }
                    var table = dd.gettabEtat();

                    var table2 = dd.gettabMem();
                    //tester si les partitions sont égaux
                    async function enfil() {
                        var non = "faux"; //non égaux
                        for (var u = 0; u < nbPart; u++) {
                            var k = 1;
                            while (k < nbPart) {
                                if (tabTaillePart[u] != tabTaillePart[k]) {
                                    non = "vrai";
                                }
                                k++;
                            }
                        }
                        //enfilement

                        var z = 0;
                        var p = 390;
                        var ta = 0;

                        if (non == "faux") {
                            for (var j = 0; j < nombreP; j++) {


                                ll.rechPart(tab[j].taille);

                                console.log("la partition choisie est" + ll.getident())
                                if ((ll.getident()) == null) {
                                    //  alert("la taille du psus " + j + " est supérieure à la taille de toutes les partitions");
                                    tabrect[j].transition()
                                        .delay(1000)
                                        .attr("fill", "red")
                                        .transition()
                                        .attr("y", 320)

                                    .remove().duration(1000);
                                    //fragmentation externe

                                    var texta = canvas.append("text")
                                        .text(tab[j].identificateur)
                                        .attr("x", 310)
                                        .attr("y", p)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black")
                                        .transition()
                                        .delay(5000)
                                        .remove().duration(6000);


                                    var textb = canvas.append("text")
                                        .text(tab[j].taille)
                                        .attr("y", p)
                                        .attr("x", 380)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black")
                                        .transition()
                                        .delay(5000)
                                        .remove().duration(6000);
                                    p = p + 15;


                                } else {

                                    if (ta < nbPart) {
                                        let rr = new listeFile(ta, nbPart, 10, maFile, uu);
                                        rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);

                                        // inser = "faux";
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
                                        console.log("affffffffffffffffffff" + ll.getident())
                                        a.remplissage(dd.gettabEtat(), tab[j], ll.getident(), canvas)
                                            //flou1.transition().delay(7000).remove()

                                        await sleep(7000)
                                        cacherFen();

                                        rr.getuu().enfiler(tab[j], tabPsus, tabNbPsus, tabFileP, tabFileV);
                                        compteur++;
                                        z = tabnbfile[ta] * 25;
                                        tabrect[j].transition()
                                            .delay(1500)
                                            .duration(1500)
                                            .attr("x", 550)
                                            .transition()
                                            .duration(1500)

                                        .attr("y", tabrectf[ta])
                                            .transition()
                                            .attr("x", 730 - z);
                                        tabnbfile[ta] = tabnbfile[ta] + 1;


                                        // await sleep(1500);


                                        console.log("la file apés enfilement;" + rr.getmaFile());

                                        console.log("tab de processus aprés enfilement;" + tabPsus[ta]);
                                        ta++;
                                    } else {
                                        ta = 0;
                                        let rr = new listeFile(ta, nbPart, 10, maFile, uu);
                                        rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);


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
                                        console.log("affffffffffffffffffff" + ll.getident())
                                        a.remplissage(dd.gettabEtat(), tab[j], ll.getident(), canvas)
                                            //flou1.transition().delay(7000).remove()

                                        await sleep(7000)
                                        cacherFen();

                                        rr.getuu().enfiler(tab[j], tabPsus, tabNbPsus, tabFileP, tabFileV);
                                        compteur++;
                                        z = tabnbfile[ta] * 25;
                                        tabrect[j].transition()
                                            .delay(1500)
                                            .duration(1500)
                                            .attr("x", 650)
                                            .transition()
                                            .duration(1500)

                                        .attr("y", tabrectf[ta])
                                            .transition()
                                            .attr("x", 730 - z);
                                        tabnbfile[ta] = tabnbfile[ta] + 1;
                                        ta++;

                                    }
                                }

                                await sleep(9000);
                            }
                            cond = true;

                        } else {
                            // cond = false;

                            for (var j = 0; j < nombreP; j++) {

                                ll.rechPart(tab[j].taille);

                                console.log("la partition choisie est" + ll.getident())
                                if ((ll.getident()) == null) {
                                    //  alert("la taille du psus " + j + " est supérieure à la taille de toutes les partitions");
                                    tabrect[j].transition()
                                        .delay(1000)
                                        .attr("fill", "red")
                                        .transition()
                                        .attr("y", 320)

                                    .remove().duration(1000);
                                    //fragmentation externe

                                    var texta = canvas.append("text")
                                        .text(tab[j].identificateur)
                                        .attr("x", 310)
                                        .attr("y", p)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black")
                                        .transition()
                                        .delay(5000)
                                        .remove().duration(6000);


                                    var textb = canvas.append("text")
                                        .text(tab[j].taille)
                                        .attr("y", p)
                                        .attr("x", 380)
                                        .attr("font-size", 14)
                                        .attr("font-family", "monospace")
                                        .attr("fill", "black")
                                        .transition()
                                        .delay(5000)
                                        .remove().duration(6000);
                                    p = p + 15;


                                } else {
                                    let rr = new listeFile(ll.getident(), nbPart, 10, maFile, uu);
                                    rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);


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
                                    console.log("affffffffffffffffffff" + ll.getident())
                                    a.remplissage(dd.gettabEtat(), tab[j], ll.getident(), canvas)
                                        //flou1.transition().delay(7000).remove()

                                    await sleep(7000)
                                    cacherFen();

                                    rr.getuu().enfiler(tab[j], tabPsus, tabNbPsus, tabFileP, tabFileV);
                                    compteur++;
                                    z = tabnbfile[ll.getident()] * 25;
                                    tabrect[j].transition()
                                        .delay(1500)
                                        .duration(1500)
                                        .attr("x", 550)
                                        .transition()
                                        .duration(1500)

                                    .attr("y", tabrectf[ll.getident()])
                                        .transition()
                                        .attr("x", 730 - z);
                                    tabnbfile[ll.getident()] = tabnbfile[ll.getident()] + 1;


                                    // await sleep(1500);


                                    console.log("la file apés enfilement;" + rr.getmaFile());

                                    console.log("tab de processus aprés enfilement;" + tabPsus[ll.getident()]);
                                }

                                await sleep(9000);
                            }
                            cond = true;
                        }
                    }
                    enfil();
                    if (compteur == nombreP) {
                        cond = true;
                    }
                    var cpt = 0;
                    var j = 0;
                    var inser = "vrai";
                    console.log("ffffffffffffffffffffffff");
                    console.log("la valeure de cond" + cond);

                    var u = setInterval(async function() {

                        s = 390;
                        rect = canvas.append("rect")
                            .attr("x", 55)
                            .attr("y", 380)
                            .attr("ry", 6)
                            .attr("width", 200)
                            .attr("height", 200)
                            .attr("fill", "white");






                        var y = 0


                        while (y < nbPart) {
                            //  var maFile = new Array();
                            let rr = new listeFile(y, nbPart, 10, maFile, uu);
                            console.log("la partiton " + y);
                            rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);

                            //console.log("la file avant ;" + rr.getmaFile());
                            console.log("l'état de la partiton " + dd.gettabEtat()[y].etat);
                            //fragmentation
                            if (tabfrag2[y] != null) {
                                var text = canvas.append("text")
                                    .text(y)
                                    .attr("x", 85)
                                    .attr("y", s)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                var text = canvas.append("text")
                                    .text(tabfrag2[y])
                                    .attr("x", 150)
                                    .attr("y", s)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                s = s + 15;
                            }
                            console.log("etat---------" + table[y].etat);
                            if (cond == true) {
                                if (((rr.getuu().getfile_vide()) == "faux") && (table[y].etat == "libre")) {
                                    console.log("inssser" + inser);
                                    if (inser == "vrai") {

                                        var id = rr.getuu().defiler(tabPsus, tabNbPsus, tabFileP, tabFileV);
                                        console.log("id du psus défilée" + id);
                                        tabnbfile[y] = tabnbfile[y] - 1;
                                        console.log('1111111111111111111111111111111111111111')
                                        console.log(id)
                                        tabrect[id].transition()
                                            .delay(4000)
                                            // .duration(2000)
                                            .attr("x", 770)
                                            .remove().duration(1000);
                                        var c = 0;
                                        var h = 0;
                                        var f = 730;
                                        //transition des psus qui restent dans la file
                                        while (h < (tabnbfile[y])) {

                                            tabrect[rr.getmaFile()[c]].transition()
                                                .delay(5000)
                                                .duration(200)
                                                .attr("x", f);

                                            h++;
                                            c++;
                                            f = f - 25;

                                        }






                                        await sleep(5000);




                                    }





                                    /*  tabrect[id].transition()
                                          .delay(4000)
                                          .duration(2000)
                                          .attr("x", 800)
                                          .remove().duration(1000);
                                      await sleep(5000);*/





                                    cpt++;
                                    var proc = tab[id];
                                    console.log("la file aprés défilement;" + rr.getmaFile());
                                    console.log("pss " + id);

                                    let ss = new partition("libre", dd.gettabEtat(), y, 0, "false", dd.gettabMem(), taille);
                                    console.log("baliiiiiiiiiiiiiizz");

                                    ss.insertion(proc, q, canvas);

                                    console.log("ssssssssssss");

                                    inser = "vrai";
                                    // proc.lancer_procssecus();

                                }
                            }
                            y++;
                            // inser="faux"
                        }











                    }, 10000);

                    setInterval(function() {

                        //libération

                        var t = 53;
                        var table2 = dd.gettabMem();
                        console.log("j'ai entré dans la condition");
                        /* rect = canvas.append("rect")
                             .attr("x", 375)
                             .attr("y", 75)
                             .attr("ry", 6)
                             .attr("width", 200)
                             .attr("height", 90)
                             .attr("fill", "#EFF0F5");*/
                        //


                        for (var i = 0; i < nbPart; i++) {
                            // console.log("l'etat partition " + i + "est" + table[i].etat);
                            // console.log("la partition " + i + "est" + table2[i]);

                            if (table[i].etat == "occupé") {
                                console.log("l'etaaaaat de lz partiton" + table[i].etat);
                                table2[i].temps--;
                                rect = canvas.append("rect")
                                    .attr("x", 300)
                                    .attr("y", t - 10)

                                .attr("width", 250)
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
                                    .text(table2[i].temps + " s")
                                    .attr("y", t)
                                    .attr("x", 400)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");
                                canvas.append("text")
                                    .text(table2[i].taille + " ko")
                                    .attr("y", t)
                                    .attr("x", 455)
                                    .attr("font-size", 14)
                                    .attr("font-family", "monospace")
                                    .attr("fill", "black");

                                console.log("le temps du psus" + table2[i].temps);
                                if (table2[i].temps == 0) {
                                    rect = canvas.append("rect")
                                        .attr("x", 300)
                                        .attr("y", t - 10)

                                    .attr("width", 200)
                                        .attr("height", 20)
                                        .attr("fill", "white");


                                    console.log("je suis dans l'ibération");
                                    console.log("c'est la partition" + i);
                                    console.log("l'etaaaaaaaaaaaaaaaaaaaaaaat" + table[i].etat);

                                    //  let tt = new partition("libre", dd.gettabEtat(), i, 0, "false", dd.gettabMem());
                                    let tt = new partition("libre", dd.gettabEtat(), i, 0, "false", dd.gettabMem(), taille);
                                    tt.libération(q, canvas);
                                    //  table[i].etat = "libre";
                                    console.log("l'etat de la partition aprés libération" + table[i].etat);
                                    console.log("l'etat de la partition aprés libération" + (dd.gettabEtat())[i].etat);

                                }
                            }
                            t = t + 20;

                        }


                    }, 1000);
                }


































            })



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
                        window.location.href = "fileSéparéeSansExemple.html";
                    })
                    $('#example').DataTable({
                        ordering: false,
                        data: datatable,
                        columns: [
                            { title: "Le processus:" },
                            { title: "La taille(Ko)" },
                            { title: "le temps(S)" },
                            { title: " la taille de partition choisie(Ko)" },
                            { title: "Fragmentation(Ko)" },

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    d3.select("#restart").on('click', function() {
        window.location.reload();
    });
    d3.select("#senario").on('click', function() {
        eff = true
        senariof()
    })
    d3.select("#exemple").on('click', function() {
        // window.open("essss.html", "newFenetre", "width=device-width,height=device-width");
        d3.select("#illustration").remove();
        let canvas = d3.select("#svg2");
        d3.select('#terminer').on('click', function() {
                able = true;
                terminer()
            })
            ///dessin

        // fen = canvas.append("rect").attr("x", -400).attr("y", -400).attr("width", 2000).attr("height", 2000).attr("fill", "#DEE6FA").style("opacity", 0.8).attr("id", "fen");
        // com = canvas.append("image").attr("x", 340).attr("y", 100).attr("height", 280).attr("width", 280).attr("href", 'img/commencer2.png').attr("id", "commencer").style("cursor", "pointer");


        // la table d'état
        var rect = canvas.append("rect")
            .attr("width", 190)
            .attr("height", 25)
            .attr("fill", "#B0EFC1")

        .attr("x", 170)
            .attr("y", -10)
            .attr("ry", 6);
        var text = canvas.append("text")
            .text("Table d'état")
            .attr("x", 220)
            .attr("y", 5)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "black");
        var line3 = canvas.append("line")
            .attr("x1", 48)
            .attr("y1", 39)
            .attr("x2", 283)
            .attr("y2", 39)
            .attr("stroke", "#0C0101")
            .attr("stroke-width", 1.5);
        var text = canvas.append("text")
            .text("Id")
            .attr("x", 50)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 9)
            .attr("data-intro", "l'identificateur de la partition");
        introJs().goToStep(9).start();
        var text = canvas.append("text")
            .text("@Début")
            .attr("x", 85)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 10)
            .attr("data-intro", "l'adresse début de la partition");
        introJs().goToStep(10).start();
        var text = canvas.append("text")
            .text("Taille")
            .attr("x", 160)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 11)
            .attr("data-intro", " la taille de la partition");
        introJs().goToStep(11).start();
        var text = canvas.append("text")
            .text("Etat")
            .attr("x", 240)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 12)
            .attr("data-intro", "l'état de la partition (libre/occupée)");
        introJs().goToStep(12).start();

        var line4 = canvas.append("line")
            .attr("x1", 292)
            .attr("y1", 39)
            .attr("x2", 497)
            .attr("y2", 39)
            .attr("stroke", "#0C0101")
            .attr("stroke-width", 1.5);

        var text = canvas.append("text")
            .text("Processus")
            .attr("x", 300)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 13)
            .attr("data-intro", "l'identificateur du processus qui occupe cette partition");
        introJs().goToStep(13).start();
        var text = canvas.append("text")
            .text("Temps")
            .attr("x", 390)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 14)
            .attr("data-intro", "le temps de présence du processus dans la mémoire");
        introJs().goToStep(14).start();
        var text = canvas.append("text")
            .text("Taille")
            .attr("x", 450)
            .attr("y", 34)
            .attr("font-size", 14)
            .attr("font-family", "monospace")
            .attr("fill", "#EF6060")
            .attr("data-step", 15)
            .attr("data-intro", "la taille du processus");
        introJs().goToStep(15).start();

        //os
        //systéme d'exploitatipn
        var y = 10;
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
            .attr("fill", "black")

        //fragmentation interne
        var rect = canvas.append("rect")
            .attr("width", 150)
            .attr("height", 25)
            .attr("fill", "#B0EFC1")
            .attr("x", 55)
            .attr("y", 330)
            .attr("ry", 6)

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

        maFile = new Array();
        gg = new File(9, 0, "faux", "faux", maFile);


        var into = introJs()
        into.onexit(function() {
            Swal.fire({
                title: 'Exemple',
                html: "Dans cette exemple animé, les données utilisées sont : <br> - taille de la mémoire :400 ko <br> - Nombre de processus: 3 <br> - les processus(taille,temps) :p0(100,30) , p1(60,15) , p2(20,20)",
                animation: false,
                showConfirmButton: true,
                confirmButtonText: 'Commencer',

            }).then((result) => {
                taille = 400;
                nombreP = 3;
                nbPart = 4;
                q = [nbPart];
                tabTaillePart = [100, 80, 50, 170];
                let f = 400 / taille;
                for (j = 0; j < nbPart; j++) {
                    tabPsus[j] = new Array();
                    tabNbPsus[j] = 0;
                    tabFileP[j] = "faux";
                    tabFileV[j] = "vrai";
                    tabfrag2[j] = null;
                }




                // la mémoire
                var y = 15;
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
                //les files séparées **file de chaque partition**

                for (var d = 0; d < nbPart; d++) {
                    var p = (tabTaillePart[d] * f / 2) - 38;
                    tabrectf[d] = q[d] + p;
                    var line1 = canvas.append("line")
                        .attr("x1", 650)
                        .attr("y1", tabrectf[d])
                        .attr("x2", 750)
                        .attr("y2", tabrectf[d])
                        .attr("stroke", "#0C0101")
                        .attr("stroke-width", 3);
                    var line2 = canvas.append("line")
                        .attr("x1", 650)
                        .attr("y1", tabrectf[d] + 20)
                        .attr("x2", 750)
                        .attr("y2", tabrectf[d] + 20)
                        .attr("stroke", "#0C0101")
                        .attr("stroke-width", 3);

                }
                tab[0] = new Prosseecus(100, 30, 0);
                tab[1] = new Prosseecus(60, 15, 1);
                tab[2] = new Prosseecus(20, 20, 2);

                let dd = new Mémoire(10, 15, nbPart);
                dd.initialiserTabEtat(tabTaillePart, canvas);
                let uu;
                let ll = new TabEtat(nbPart, dd.gettabEtat(), 0);

                // table de rectangle
                tabrect = [nombreP];

                tabrectp = [nombreP];
                //animation des psus
                var x = 295;

                for (var y = 0; y < nombreP; y++) {

                    tabrect[y] = canvas.append("rect")
                        .attr("x", x)
                        .attr("y", 275)
                        .attr("ry", 6)
                        .attr("width", 20)
                        .attr("height", 20)
                        .attr("fill", tabclr[y]);


                    x = x - 60;

                }
                /* var maFile = new Array();
                 var uu;*/
                var tabnbfile = [nbPart];
                for (var c = 0; c < nbPart; c++) {
                    tabnbfile[c] = 0;
                }
                var table = dd.gettabEtat();

                var table2 = dd.gettabMem();
                //enfilement
                var z = 0;
                var p = 520; {

                    for (var j = 0; j < nombreP; j++) {

                        ll.rechPart(tab[j].taille);

                        console.log("la partition choisie est" + ll.getident())
                        if ((ll.getident()) == null) {
                            //  alert("la taille du psus " + j + " est supérieure à la taille de toutes les partitions");
                            tabrect[j].transition()
                                .delay(1000)
                                .attr("fill", "red")
                                .transition()
                                .attr("y", 320)

                            .remove().duration(1000);
                            //fragmentation externe

                            var texta = canvas.append("text")
                                .text(tab[j].identificateur)
                                .attr("x", 310)
                                .attr("y", p)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black")
                                .transition()
                                .delay(5000)
                                .remove().duration(6000);


                            var textb = canvas.append("text")
                                .text(tab[j].taille)
                                .attr("y", p)
                                .attr("x", 380)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black")
                                .transition()
                                .delay(5000)
                                .remove().duration(6000);
                            p = p + 15;


                        } else {
                            let rr = new listeFile(ll.getident(), nbPart, 10, maFile, uu);
                            rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);
                            rr.getuu().enfiler(tab[j], tabPsus, tabNbPsus, tabFileP, tabFileV);
                            z = tabnbfile[ll.getident()] * 25;
                            tabrect[j].transition()
                                .delay(1500)
                                .duration(1500)
                                .attr("x", 550)
                                .transition()
                                .duration(1500)

                            .attr("y", tabrectf[ll.getident()])
                                .transition()
                                .attr("x", 730 - z);
                            tabnbfile[ll.getident()] = tabnbfile[ll.getident()] + 1;


                            // await sleep(1500);


                            console.log("la file apés enfilement;" + rr.getmaFile());

                            console.log("tab de processus aprés enfilement;" + tabPsus[ll.getident()]);
                        }
                    }
                }


                var cpt = 0;
                var j = 0;
                var inser = "vrai";


                var u = setInterval(async function() {

                    s = 390;
                    rect = canvas.append("rect")
                        .attr("x", 55)
                        .attr("y", 380)
                        .attr("ry", 6)
                        .attr("width", 200)
                        .attr("height", 200)
                        .attr("fill", "white");






                    var y = 0


                    while (y < nbPart) {
                        //  var maFile = new Array();
                        let rr = new listeFile(y, nbPart, 10, maFile, uu);
                        console.log("la partiton " + y);
                        rr.rechFile(tabNbPsus, tabFileP, tabFileV, tabPsus);

                        //console.log("la file avant ;" + rr.getmaFile());
                        console.log("l'état de la partiton " + dd.gettabEtat()[y].etat);
                        //fragmentation
                        if (tabfrag2[y] != null) {
                            var text = canvas.append("text")
                                .text(y)
                                .attr("x", 85)
                                .attr("y", s)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black");
                            var text = canvas.append("text")
                                .text(tabfrag2[y])
                                .attr("x", 150)
                                .attr("y", s)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black");
                            s = s + 15;
                        }

                        if (((rr.getuu().getfile_vide()) == "faux") && (table[y].etat == "libre")) {
                            console.log("inssser" + inser);
                            if (inser == "vrai") {
                                inser = "faux";
                                var id = rr.getuu().defiler(tabPsus, tabNbPsus, tabFileP, tabFileV);
                                console.log("id du psus défilée" + id);
                                tabnbfile[y] = tabnbfile[y] - 1;
                                console.log('1111111111111111111111111111111111111111')
                                console.log(id)
                                tabrect[id].transition()
                                    .delay(4000)
                                    // .duration(2000)
                                    .attr("x", 770)
                                    .remove().duration(1000);
                                var c = 0;
                                var h = 0;
                                var f = 730;
                                //transition des psus qui restent dans la file
                                while (h < (tabnbfile[y])) {

                                    tabrect[rr.getmaFile()[c]].transition()
                                        .delay(5000)
                                        .duration(200)
                                        .attr("x", f);

                                    h++;
                                    c++;
                                    f = f - 25;

                                }






                                await sleep(5000);




                            }





                            /*  tabrect[id].transition()
                                  .delay(4000)
                                  .duration(2000)
                                  .attr("x", 800)
                                  .remove().duration(1000);
                              await sleep(5000);*/





                            cpt++;
                            var proc = tab[id];
                            console.log("la file aprés défilement;" + rr.getmaFile());
                            console.log("pss " + id);

                            let ss = new partition("libre", dd.gettabEtat(), y, 0, "false", dd.gettabMem(), taille);
                            console.log("baliiiiiiiiiiiiiizz");

                            ss.insertion(proc, q, canvas);
                            console.log("ssssssssssss");

                            inser = "vrai";
                            // proc.lancer_procssecus();

                        }
                        y++;
                        // inser="faux"
                    }










                }, 2000);
                setInterval(function() {
                    //libération
                    var t = 53;
                    var table2 = dd.gettabMem();
                    console.log("j'ai entré dans la condition");
                    /* rect = canvas.append("rect")
                         .attr("x", 375)
                         .attr("y", 75)
                         .attr("ry", 6)
                         .attr("width", 200)
                         .attr("height", 90)
                         .attr("fill", "#EFF0F5");*/
                    //


                    for (var i = 0; i < nbPart; i++) {
                        // console.log("l'etat partition " + i + "est" + table[i].etat);
                        // console.log("la partition " + i + "est" + table2[i]);

                        if (table[i].etat == "occupé") {
                            console.log("l'etaaaaat de lz partiton" + table[i].etat);
                            table2[i].temps--;
                            rect = canvas.append("rect")
                                .attr("x", 300)
                                .attr("y", t - 10)

                            .attr("width", 250)
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
                                .text(table2[i].temps + " s")
                                .attr("y", t)
                                .attr("x", 400)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black");
                            canvas.append("text")
                                .text(table2[i].taille + " ko")
                                .attr("y", t)
                                .attr("x", 455)
                                .attr("font-size", 14)
                                .attr("font-family", "monospace")
                                .attr("fill", "black");

                            console.log("le temps du psus" + table2[i].temps);
                            if (table2[i].temps == 0) {
                                rect = canvas.append("rect")
                                    .attr("x", 300)
                                    .attr("y", t - 10)

                                .attr("width", 200)
                                    .attr("height", 20)
                                    .attr("fill", "white");


                                console.log("je suis dans l'ibération");
                                console.log("c'est la partition" + i);
                                console.log("l'etaaaaaaaaaaaaaaaaaaaaaaat" + table[i].etat);

                                //  let tt = new partition("libre", dd.gettabEtat(), i, 0, "false", dd.gettabMem());
                                let tt = new partition("libre", dd.gettabEtat(), i, 0, "false", dd.gettabMem(), taille);
                                tt.libération(q, canvas);
                                //  table[i].etat = "libre";
                                console.log("l'etat de la partition aprés libération" + table[i].etat);
                                console.log("l'etat de la partition aprés libération" + (dd.gettabEtat())[i].etat);

                            }
                        }
                        t = t + 20;

                    }

                }, 1000);
























                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms))
                }













            })









        })



        into.start()




















    })
    d3.select('#tour').on('click', function() {
        var into = introJs()
        into.start()
    })

    d3.select("#exemple").on('mouseover', function() {
        d3.select("#exe").attr("fill", "#6EC5A8");
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
}