//Classes utilisées pour la traduction des adresses
class Texte
{
    constructor(svgContainer,color,x,y,size,weight)
     {
        this.texte=svgContainer.append('text')
                               .attr('x',x)
                               .attr('y',y)
                               .attr('fill',color)
                               .style('fonte-size',size)
                               .style('font-family', 'Roboto')
                               .attr('font-weight',weight)
        this.texte.text('')
     }
     changeText(text,delay)
     {
         this.texte.transition()
         .delay(delay)
         .text(text);
     }
     depTextHoriz(duration,dx,delay)
     {
       this.texte.transition()
       .delay(delay)
       .duration(duration)
       .attr('x',dx)
     }
     depTextVert(duration,dy,delay)
     {
       this.texte.transition()
       .delay(delay)
       .duration(duration)
       .attr('y',dy)
     }
     visibility(vis,delay)
      {
         this.texte.transition().delay(delay).style('visibility',vis);
      }
      opacity(deg,delay)
      {
          
          this.texte.transition()
                   .delay(delay)
                   .style('opacity',deg);

      }
      texto(text,delay)
      {
          this.texte.transition().delay(delay).text(text);
      }
      remove(delay)
      {
          this.texte.transition().delay(delay).remove();
      }
      remove()
      {
          this.texte.remove();
      }
      textSize(s)
      {
          this.texte.transition().style('font-size',s);
      }
}
class Circle
{
    constructor(svgContainer,cx,cy)
    {
        this.circ=svgContainer.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 4)
        .style("fill", 'grey') ;
    }
    changeColor(color,delay)
    {
        this.circ.transition()
                 .delay(delay)
                 .style("fill", color);
    }
    visibility(vis,delay)
    {
        this.circ.transition().delay(delay).style('visibility',vis);
    }
    remove(delay)
      {
          this.circ.transition().delay(delay).remove();
      }
      remove()
      {
          this.circ.remove();
      }
}
/* la classe rectangle représente la creation d'un rectangle
 avec les caractéristique qu'on va utuliser dans les animatin*/
  class Rectangle 
  {
    constructor(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill)
    {
        this.svgContainer= svgContainer;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.rx=rx;
        this.color=color;
        this.textX=textX;
        this.textY=textY;
        this.textSize=textSize;
        this.textWeight=textWeight;
        this.textFill=textFill;
        this.rect=svgContainer.append('rect')
                       .attr('x',x)
                       .attr('y',y)
                       .attr('rx',rx)
                       .attr('ry',rx)
                       .attr('width',width)
                       .attr('height',height)
                       .attr('fill',color)
        this.texte=new Texte(svgContainer,textFill,textX,textY,textSize,textWeight);
    }
    //les getter///////////
    getX()
    {
        return this.x;
    }
    getY()
    {
        return this.y;
    }
    height()
    {
        return this.height;
    }
    width()
    {
        return this.width;
    }
    //////////////////////////
    changeColor(color,delay)
    {
        this.rect.transition()
                 .delay(delay)
                 .attr('fill',color);
    }
    changeColor(color,delay,duration)
    {
        this.rect.transition()
                 .delay(delay)
                 .duration(duration)
                 .attr('fill',color);
    }
    changeText(text,delay)
    {
          this.texte.changeText(text,delay);
    }
    textSize(s)
    {
        this.texte.textSize(s);
    }
    glisser(duration,dx,dy,delay)
    {
          this.texte.depTextHoriz(duration,dx+(this.textX-this.x),delay);
          this.rect.transition()
                   .delay(delay)
                   .duration(duration)
                   .attr('x',dx)
                   .attr('y',dy)
                   
    }
    glisserHoriz(duration,dx,delay)
    {
          this.texte.depTextHoriz(duration,dx+(this.textX-this.x),delay);
          this.rect.transition()
                   .delay(delay)
                   .duration(duration)
                   .attr('x',dx)
                   
    }
      glisserVertic(duration,dy,delay)
      {   
          this.texte.depTextVert(duration,dy+(this.textY-this.y),delay);
          this.rect.transition()
                   .delay(delay)
                   .duration(duration)
                   .attr('y',dy)
                   
      }
      visibility(vis,delay)
      {
        this.texte.visibility(vis,delay); 
        this.rect.transition().delay(delay).style('visibility',vis);
      }
      opacity(deg,delay,dure)
      {
          this.texte.opacity(deg,delay);
          this.rect.transition()
                   .delay(delay)
                   .duration(dure)
                   .style('opacity',deg);

      }
      texto(text,delay)
      {
          this.texte.texto(text,delay);
      }
      remove(delay)
      {
          this.texte.remove(delay);
          this.rect.transition().delay(delay).remove();
      
      }
      remove()
      {
          this.texte.remove();
          this.rect.remove();
      
      }
      intro(id,data,step)
      {
         this.rect.attr("id",id)
                  .attr("data-intro",data)
                  .attr("data-step",step)
                  .attr("data-position", "top");
          
      }
     
}
 // cette classe représente une case mémoire
 class CaseTradM
  {
      constructor(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill,id,colOcup)
      {
          
          this.case=new Rectangle(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill);
          this.page=new Rectangle(svgContainer,'transparent',x+3,y+3,0,width-6,height-6,x+width/3,textY,textSize,textWeight,textFill);
          this.colOcup=colOcup;
          this.color=color;
          this.id=id;
          this.case.changeText('C '+id,0);
      }
      occuperCase(idP,delay)
      {
          this.referencer(delay);
          this.page.changeText('Page '+idP,delay);
      }
      libererCase(delay)
      {
          this.page.changeColor(this.color,delay);
          
      }
      remove(delay)
      {
          this.case.remove(delay);
          this.page.remove(delay);
      }
      remove()
      {
          this.case.remove();
          this.page.remove();
      }
      referencer(delay)
      {
         this.page.opacity(0,delay-10,0);
         this.page.changeColor('rgb(54,185,204)',delay-5);
         this.page.opacity(1,delay,500);
      }
      signe(delay)
      {
        this.page.opacity(0,delay-10,0);
        this.page.changeColor('rgb(236,104,94)',delay-5);
        this.page.opacity(1,delay,400);
      }
  } 
  // cette class représente une page
  class PageMTrad
  {
      constructor(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill,id,colChar)
      {
          
          this.page=new Rectangle(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill);
          this.colChar=colChar;
          this.color=color;
          this.id=id;
          this.page.changeText('Page '+this.id,0);
      }
      charger(delay)
      {
          this.page.changeColor(this.colChar,delay);
      }
      decharger(delay)
      {
          this.page.changeColor(this.color,delay);
      }
      referancer(delay)
      {
          this.page.changeColor('rgb(236,104,94)',delay);
      }
      remove(delay)
      {
          this.page.remove(delay);
      }
      remove()
      {
          this.page.remove();
      }
  }
  // cette class représente la mémoire centralle
  class MemoireCentTrad
  {
      constructor(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill,nbCase,padding,caseCol,colOccup)
      {
          this.widthM=width+padding*2;
          this.heightM=(height+padding)*(nbCase+1)+padding;
          this.mc=new Rectangle(svgContainer,color,x,y,rx,this.widthM,this.heightM,x+15,textY+this.heightM,textSize,550,textFill);
          this.mc.changeText('Mémoire Centrale',0);
          this.nbCase=nbCase;
          this.cases=[];
          for (let i = 0; i < this.nbCase; i++) 
          {
              this.cases[i]=new CaseTradM(svgContainer,caseCol,x+padding,y+padding,rx,width,height,textX,textY,textSize,textWeight,textFill,i,colOccup);
              y=y+height+padding;
              textY=textY+height+padding;
              
          }
          this.os=new Rectangle(svgContainer,'white',x+padding,y+padding,rx,width,height,x+60,textY,textSize,textWeight,textFill);
          this.os.changeText("--OS--",0);
      }
      allouerCase(idC,idP,delay)
      {
          this.cases[idC].occuperCase(idP,delay);
      }
      libererCase(idC,delay)
      {
          this.cases[idC].libererCase(delay);
      }
      remove(delay)
      {
          this.mc.remove(delay);
          this.os.remove(delay);
          for (let i = 0; i < this.cases.length; i++) {
           
                this.cases[i].remove(delay); 
          }
      }
      remove()
      {
          this.mc.remove();
          this.os.remove();
          for (let i = 0; i < this.cases.length; i++) {
           
                this.cases[i].remove(); 
          }
      }
      intro(id,data,step)
      {
          this.mc.intro(id,data,step);
      }
      referencer(id,delay)
      {
          this.cases[id].referencer(delay);
      }
      signe(idC,delay)
      {
          this.cases[idC].signe(delay);
      }
      elimineTitr()
      {
          this.mc.changeText("",0);
      }
      
  }
  //cette class représente la mémoire virtuell
  class MemoireVirtTrad
  {
      constructor(svgContainer,color,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill,nbPage,padding,pageCol,colChar)
      {
          this.widthP=width+padding*2;
          this.heightP=(height+padding)*(nbPage)+padding;
          this.mv=new Rectangle(svgContainer,color,x,y,rx,this.widthP,this.heightP,x+15,textY+this.heightP,textSize,550,textFill);
          this.mv.changeText('Mémoire virtulle',0);
          this.nbPage=nbPage;
          this.pages=[];
          for (let i = 0; i < this.nbPage; i++) 
          {
              this.pages[i]=new PageMTrad(svgContainer,pageCol,x+padding,y+padding,rx,width,height,textX,textY,textSize,textWeight,textFill,i,colChar);
              y=y+padding+height;
              textY=textY+height+padding;
          }
      }
      chargerPage(id,delay)
      {
          this.pages[id].charger(delay);
      }
      dechargerPage(id,delay)
      {
          this.pages[id].decharger(delay);
      }
      referancer(id,delay)
      {
          this.pages[id].referancer(delay);
      }
      remove(delay)
      {
          this.mv.remove(delay);
          for (let i = 0; i < this.pages.length; i++) {
           
                this.pages[i].remove(delay); 
          }
      }
      remove()
      {
          this.mv.remove();
          for (let i = 0; i < this.pages.length; i++) {
           
                this.pages[i].remove(); 
          }
      }
      intro(id,data,step)
      {
          this.mv.intro(id,data,step);
      }
      elimineTitr()
      {
          this.mv.changeText("",0);
      }
      
  }
  // cette classe représente un maillon

 class HardD
 {
    constructor(svgContainer)
    {
        this.rect=svgContainer.append('rect')
                       .attr('x',950)
                       .attr('y',400-70)
                       .attr('rx',0)
                       .attr('ry',0)
                       .attr('width',200)
                       .attr('height',40)
                       .attr('fill','#C4C4C4')
        this.hard1=svgContainer.append("ellipse")
                       .attr("cx", 1050)
                       .attr("cy", 440-70)
                       .attr("r",100)
                       .attr("rx", 100)
                       .attr("ry",20)
                       .style("fill", '#C4C4C4') ; 
        this.hard2=svgContainer.append("ellipse")
        .attr("cx", 1050)
        .attr("cy", 400-70)
        .attr("r",100)
        .attr("rx", 100)
        .attr("ry",20)
        .style("fill", '#757575') ; 
        this.hard3=svgContainer.append("ellipse")
        .attr("cx", 1050)
        .attr("cy", 400-70)
        .attr("r",20)
        .attr("rx", 20)
        .attr("ry",5)
        .style("fill", '#212121') ; 
        this.hard4=svgContainer.append("ellipse")
        .attr("cx", 1050)
        .attr("cy", 400-70)
        .attr("r",10)
        .attr("rx", 10)
        .attr("ry",3)
        .style("fill", '#C4C4C4') ; 
        
    
    }
    visibility(vis,delay)
    {
        this.hard1.transition().delay(delay).style('visibility',vis);
        this.hard2.transition().delay(delay).style('visibility',vis);
        this.hard3.transition().delay(delay).style('visibility',vis);
        this.hard4.transition().delay(delay).style('visibility',vis);
        this.rect.transition().delay(delay).style('visibility',vis);
    }
    remove(delay)
    {
        this.hard1.transition().delay(delay).remove();
        this.hard2.transition().delay(delay).remove();
        this.hard3.transition().delay(delay).remove();
        this.hard4.transition().delay(delay).remove();
        this.rect.transition().delay(delay).remove();
    }
    remove()
    {
        this.hard1.remove();
        this.hard2.remove();
        this.hard3.remove();
        this.hard4.remove();
        this.rect.remove();
    }
 } 
 function sleep(ms)
 {
    return new Promise(resolve=> setTimeout(resolve,ms));
 }
 class simAdr
 {
     constructor(svgContainer)
     {     
       // await sleep(500);
        this.circuit=[];
        this.circuit1=[];
        this.circuit2=[];
        this.circuit3=[];
        this.circuit4=[];
        this.cx=300;
        this.dx=14;
        this.cy=270;
        this.dy=14;
        let j=0;
         for (let i = 0; i < 58; i++)
          {
             this.circuit1[i]=new Circle(svgContainer,this.cx+this.dx*i,this.cy);  
             this.circuit[j]=this.circuit1[i];
             j++;
          }
          for (let i = 0; i < 40; i++) {
              
             this.circuit2[i]=new Circle(svgContainer,364,280+this.dy*i); 
             this.circuit[j]=this.circuit2[i];
             j++; 
          }
          for (let i = 0; i < 58; i++)
          {
             this.circuit3[i]=new Circle(svgContainer,this.cx+this.dx*i,834);  
             this.circuit[j]=this.circuit3[i];
             j++;
          }
          for (let i = 0; i < 40; i++) {
              
            this.circuit4[i]=new Circle(svgContainer,1050,280+this.dy*i);  
            this.circuit[j]=this.circuit4[i];
             j++;
          }
         // CPU
          this.cpu=new Rectangle(svgContainer,'grey',300,310,5,125,75,260,310,12,900,'grey');
          this.cpu.changeText("CPU",0);
          this.cpub=[];
          for (let i = 0; i < 3; i++) {
             this.cpub[i]= new Rectangle(svgContainer,'grey',313+17*i,290,9,8,30,260,390,12,900,'white');
             this.cpub[i+3]= new Rectangle(svgContainer,'grey',313+17*i,445-70,9,8,30,260,390,12,900,'white');
          }
          for (let i = 3; i < 6; i++) {
            this.cpub[i+3]= new Rectangle(svgContainer,'grey',320+17*i,370-80,9,8,30,260,390,12,900,'white');
            this.cpub[i+6]= new Rectangle(svgContainer,'grey',320+17*i,445-70,9,8,30,260,390,12,900,'white');
          }
          for (let i = 0; i < 4; i++) 
          {
            this.cpub[i+12]= new Rectangle(svgContainer,'grey',285,392+17*i-70,9,30,8,260,390,12,900,'white');
            this.cpub[i+16]= new Rectangle(svgContainer,'grey',413,392+17*i-70,9,30,8,260,390,12,900,'white');
          }
          this.cpu2=new Rectangle(svgContainer,'white',305,316,5,115,65,260,390,12,900,'#33403C'); 
          this.adrl=new Rectangle(svgContainer,'grey',270,510-80,5,200,30,260,530-80,12,900,'#33403C'); 
          this.adrL=new Rectangle(svgContainer,'#C4C4C4',275,513-80,4,190,24,325,530-80,12,900,'#33403C'); 
          this.adrL.changeText('@ Logique',0);
          this.adrf=new Rectangle(svgContainer,'grey',950,915-200,5,200,30,260,390-200,12,900,'#33403C'); 
          this.adrF=new Rectangle(svgContainer,'#C4C4C4',955,918-200,4,190,24,1005,935-200,12,900,'#33403C');
          this.adrF.changeText('@ Physique',0);
          this.mmu=new Rectangle(svgContainer,'grey',250,590-90,2,250,246,360,600-90,12,600,'#33403C');
          this.mmU=new Rectangle(svgContainer,'white',255,595-90,2,240,234,350,620-90,12,600,'#33403C');
          this.mmU.changeText('MMU',10);
         
          this.mv=new MemoireVirtTrad(svgContainer,'#C4C4C4',400,615-90,5,70,30,415,640-90,12,500,'black',5,5,'#42C7CB','#C4C4C4');
          this.mv.elimineTitr();
          this.MV=new Texte(svgContainer,'grey',430,815-90,12,100);
          this.MV.changeText('MV',10);
          //table de page
          this.table=new Rectangle(svgContainer,'#424242',265,660-90,1,120,120,275,650-90,4,100,'#33403C');
          this.table.changeText('Table de Pages',10);
          this.title=new Rectangle(svgContainer,'#757575',268,663-90,1,114,23,280,680-90,4,100,'black');
          this.title.changeText('Page',10);
          this.ncas=new Texte(svgContainer,'black',340,680-90,34,100);
          this.ncas.changeText('Case',10);
          this.tab=[];
          this.cas=[];
        for (let i = 0; i < 5; i++)
        {
            this.tab[i]=new Rectangle(svgContainer,'#9E9E9E',268,689+(18)*i-90,3,70,15,300,702+(18)*i-90,6,100,'black');
            this.tab[i].changeText(i,0);
            this.cas[i]=new Rectangle(svgContainer,'#9E9E9E',340,689+(18)*i-90,3,43,15,358,702+(18)*i-90,12,400,'black'); 

        }
        this.cas[0].changeText(0,0);
        this.cas[2].changeText(1,0);
        this.cas[4].changeText(2,0);
        this.cas[3].changeText(3,0);
        this.cas[1].changeColor('#616161',0);
        
        // MC
        this.mc=new MemoireCentTrad(svgContainer,'#A9ADAD',1000,600-160,5,100,40,1050,630-160,12,500,'black',4,6,'#42C7CB','#C4C4C4');
        this.mc.elimineTitr();
        this.MC=new Texte(svgContainer,'grey',1070,860-168,12,600);
        this.MC.changeText('MC',10);
        //hard disq
        this.hard=new HardD(svgContainer)
        

        //this.circuit[58].changeColor('red',500);
        // debut de traduction
       
        for (let i = 58; i < 70; i++) {
            this.circuit[i].changeColor('red',2000);    
        }
        this.etat=[];
        this.ettxt=[];
        this.et1=new Etape(svgContainer,428,490-78,1,3000);
        this.etat.push(this.et1);
        this.ettxt1=new Texte(svgContainer,'#33403C',458,500-78,12,100);
        this.ettxt1.changeText("Demande de la page 2 avec un deplacement d",3100);
        this.ettxt.push(this.ettxt1);
        this.adrL.changeText(" P : 010 || dep d ",3600)
        for (let i = 70; i < 76; i++) {
            this.circuit[i].changeColor('red',4400);    
        }
        this.et2=new Etape(svgContainer,530,490,2,4500);
        this.etat.push(this.et2);
        this.ettxt2=new Texte(svgContainer,'#33403C',560,496,12,100);
        this.ettxt2.changeText("Recherche dans la table de pages",4600);
        this.ettxt.push(this.ettxt2);
        this.tab[2].changeColor('#0097a7',5000);
        this.cas[2].changeColor('#0097a7',5000);
        this.et3=new Etape(svgContainer,530,640,3,6000);
        this.etat.push(this.et3);
        this.ettxt3=new Texte(svgContainer,'#33403C',560,646,12,100);
        this.ettxt3.changeText("La page existe dans la case n° 1",6100);
        this.ettxt.push(this.ettxt3);
        for (let i = 90; i < 98; i++) {
            this.circuit[i].changeColor('red',7000);    
        }
        
        this.et4=new Etape(svgContainer,530,720,4,8000);
        this.etat.push(this.et4);
        this.ettxt4=new Texte(svgContainer,'#33403C',560,726,12,100);
        this.ettxt4.changeText("Géneration de l'@ physique",8100);
        for (let i = 98; i < 156; i++) {
            this.circuit[i].changeColor('red',9000);    
        }
        for (let i = 195; i > 155; i--) {
            this.circuit[i].changeColor('red',9000);    
        }
        this.ettxt.push(this.ettxt4);
        this.ettxt5=new Texte(svgContainer,'#33403C',400,780,12,100);
        this.ettxt5.changeText("La traduction d'@ logique en adresse physique se fait par remplacement de N° de page",9500);
        this.ettxt.push(this.ettxt5);
        this.ettxt6=new Texte(svgContainer,'#33403C',550,800,12,100);
        this.ettxt6.changeText("par le N° de case. Dans ce cas on remplace 2 par 1 ",9800);
        this.ettxt.push(this.ettxt6);
        this.ettxt7=new Texte(svgContainer,'#33403C',540,780,12,100);
        this.ettxt7.changeText("",11000);
        this.ettxt.push(this.ettxt7);
        this.adrF.changeText(" C : 001 || dep d ",11200);
        this.et5=new Etape(svgContainer,780+16,600-50,5,11400);
        this.etat.push(this.et5);
        this.ettxt8=new Texte(svgContainer,'#33403C',820,606-50,12,100);
        this.ettxt8.changeText("Utilisation de la case 1",11500);
        this.ettxt.push(this.ettxt8);
    }
        clear()
        {
         this.hard.remove();
         for (let i = 0; i < this.circuit.length; i++) 
         {
             this.circuit[i].remove();
             
         }
         this.cpu.remove();
         this.cpu2.remove();
         for (let i = 0; i < this.cpub.length; i++) {
            this.cpub[i].remove();
             
         }
         for (let i = 0; i < this.ettxt.length; i++) {
            this.ettxt[i].remove();
            
        }
        for (let i = 0; i < this.etat.length; i++) {
           this.etat[i].remove();
           
       }
       for (let i = 0; i < this.tab.length; i++) {
           this.tab[i].remove();
           
       }
       for (let i = 0; i < this.cas.length; i++) {
          this.cas[i].remove();
          
      }
         this.adrl.remove();
         this.adrL.remove();
         this.adrF.remove();
         this.adrf.remove();
         this.mmu.remove();
         this.mmU.remove();
         this.mv.remove();
         this.MV.remove();
         this.table.remove();
         this.title.remove();
         this.ncas.remove();
         this.mc.remove();
         this.MC.remove();
        
       
    }

     }
 

class Etape
     {
         constructor(svgContainer,cx,cy,et,delay)
         {
            this.circ=svgContainer.append("circle")
                            .attr("cx", cx)
                            .attr("cy", cy)
                            .attr("r", 15)
                            .style("fill", 'transparent') ;
            this.circ.transition()
                     .delay(delay)
                     .style("fill", '#CC8548') ;
            this.circl=svgContainer.append("circle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", 12)
            .style("fill", 'transparent') ;
            this.circl.transition()
                     .delay(delay)
                     .style("fill", '#ffc400 ') ;
            this.text=new Texte(svgContainer,'white',cx-3,cy+3,12,900);
            this.text.changeText(et,delay);
         }
         remove()
         {
             this.circ.remove();
             this.circl.remove();
             this.text.remove();
         }
     }

