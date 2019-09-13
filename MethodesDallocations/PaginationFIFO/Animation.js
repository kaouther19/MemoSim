// pour afficher un texte
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
                               .style('font-weight',weight)
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
    getText()
    {
        return this.texte;
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
    glisserText(delay,dx)
    {
        this.texte.depTextHoriz(0,dx,delay);
    }
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
 class CaseM
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
  class PageV
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
  class MemoireCent
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
              this.cases[i]=new CaseM(svgContainer,caseCol,x+padding,y+padding,rx,width,height,textX,textY,textSize,textWeight,textFill,i,colOccup);
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
  class MemoireVirt
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
              this.pages[i]=new PageV(svgContainer,pageCol,x+padding,y+padding,rx,width,height,textX,textY,textSize,textWeight,textFill,i,colChar);
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
  class Maillon
  {
     constructor(svgContainer,fillCol,x,y,rx,width,height,textX,textY,textSize,textWeight,textFill)
     {
        this.fillCol=fillCol; 
        this.id;
        this.maillon=new Rectangle(svgContainer,'transparent',x,y,rx,width,height,textX,textY,textSize,textWeight,textFill);

     }
     getId()
     {
         return this.id;
     }
     setId(id)
     {
         this.id=id;
     }
     enfiler(id,dx,dure,delay)  
      {
            this.id=id;
            this.maillon.changeColor(this.fillCol,delay);
            this.maillon.changeText(id,delay);
            this.maillon.glisserHoriz(dure,dx,delay+dure);
         }
      defiler(dx,dure,delay)
      {     
            
            this.maillon.glisserHoriz(dure,dx,delay);
           
      }
      deplacerHoriz(dure,dx,delay)
      {
        this.maillon.glisserHoriz(dure,dx,delay);   
      }
      deplacerVert(dure,dy,delay)
      {
        this.maillon.glisserVertic(dure,dy,delay);
      }
      visibility(vis,delay)
      {
         this.maillon.visibility(vis,delay);
      }
      changeColor(color,delay)
      {
         this.maillon.changeColor(color,delay);
      }
      changeText(text)
      {
        this.maillon.changeText(text);
      }
      texto(text,delay)
      {
          this.maillon.texto(text,delay);
      }
  }
  class FifoPage
  {
      constructor(svgContainer,color,x,y,rx,nbCase,width,height,fillCol,padding,heightP,xm,textX,textY,textSize,textWeight,textFill)
      {
            this.fileh=new Rectangle(svgContainer,'transparent',x,y,rx,(width+padding)*nbCase-padding,heightP,610,360,"22px",textWeight,'white');
            this.fileb=new Rectangle(svgContainer,'transparent',x,y+height+2*padding+heightP,rx,(width+padding)*nbCase-padding,heightP,600,390,textSize,textWeight,'white');
            this.fillCol=fillCol;
            this.height=height;
            this.heightP=heightP;
            this.width=width;
            this.padding=padding;
            this.nbCase=nbCase;
            this.color=color;
            this.fifo=[];
            this.etat=[];
            this.x=x;
            this.y=y;
            this.tauRemp=0;
            this.xm=xm;
            for (let i = 0; i <nbCase; i++)     
            { 
                this.fifo[i]=new Maillon(svgContainer,fillCol,xm,y+padding+heightP,rx,width,height,textX,textY+padding+heightP,textSize,textWeight,textFill);
            }
    
      }
      textFifo(text,delay)
      {
          this.fileh.changeText(text,delay);
      }
      etatFifo(text,delay,dx)
      {
        this.fileb.glisserText(delay,dx);
        this.fileb.changeText(text,delay+5);
      }
      cacherFifo(delay)
      {
          this.fileh.visibility('hidden',delay);
          this.fileb.visibility('hidden',delay);
          this.fileh.changeColor(this.color,0);
          this.fileb.changeColor(this.color,0);
          for (let i = 0; i <this.nbCase; i++)     
            { 
                this.fifo[i].visibility('hidden',delay);
            }
           
      }
      apparaitreFifo(delay)
      {
        this.fileh.visibility('visible',delay);
        this.fileb.visibility('visible',delay);
        for (let i = 0; i <this.nbCase; i++)     
            { 
                this.fifo[i].visibility('visible',delay);
            }

      }   
      enfilerM(id,dure,delay)
      {
            let dx;
            if(this.tauRemp===this.nbCase)
            {
                dx=this.nbCase-1;
            }
            else
            {
                dx=this.tauRemp;
            }
            this.etat[this.tauRemp]=id;
            this.fifo[this.tauRemp].enfiler(id,this.x+(this.width+this.padding)*dx,dure,delay);
            this.tauRemp++;
            
      }
      defilerFifo(id,dx,dure,delay)
      {
          this.etat.shift()
          this.fifo[this.tauRemp]=this.fifo[0];
          this.fifo[0].defiler(dx,dure,delay);
          this.fifo[0].visibility('hidden',delay+dure);
          this.fifo[this.tauRemp].deplacerHoriz(0,this.xm,dure+delay); 
          for (let i = 1; i < this.nbCase; i++) 
          {  
           this.fifo[i].deplacerHoriz(dure,this.x+(this.padding+this.width)*(i-1),delay+dure*i);
          }
          this.fifo[0].texto(id,delay+dure*(this.nbCase));
          this.fifo[0].visibility('visible',delay+dure*(this.nbCase))
          this.fifo[0].deplacerHoriz(dure,this.x+(this.padding+this.width)*(this.nbCase-1)-1,delay+dure*(this.nbCase));
          this.fifo[0].setId(id);
          this.etat[this.tauRemp-1]=id;
          for (let i = 0; i < this.tauRemp; i++) 
          {
            this.fifo[i]=this.fifo[i+1];
              
          }
      }
      calculDep(id)
      {
       let j=this.tauRemp-1;
       let i=1;
        while(this.fifo[j].getId()!=id)
        {
            j--;
            i++;
        }
        return i;
      }
 
      reorganiser(id,dure,delay)
      {
           if(this.fifo[this.tauRemp-1].getId()!=id)
           {
               let j=this.tauRemp-1;
               let i=0;
               let hauteur=this.y+this.padding*2+this.heightP*2+this.height+(this.padding*2+this.width)*j;
               while(this.fifo[j].getId()!=id)
               {
                    this.fifo[j].deplacerHoriz(dure,this.xm-(this.width+this.padding),delay+dure*i);
                    i++;
                    this.fifo[j].deplacerVert(dure,hauteur,delay+dure*i);
                    i++;
                    j--;
                    hauteur=hauteur-(this.padding+this.height);
               }
               this.fifo[j].deplacerHoriz(dure,this.xm,delay+dure*i);
               this.fifo[this.tauRemp]=this.fifo[j];
               i++;
               for (let k = j+1 ; k <this.tauRemp; k++) 
               {
                    this.fifo[k].deplacerVert(dure,this.y+this.padding+this.heightP,delay+dure*i);
                    i++;
                    this.fifo[k].deplacerHoriz(dure,this.x+(this.width+this.padding)*(k-1),delay+dure*i);
                    i++;  
                    this.fifo[k-1]=this.fifo[k];
               }
               this.fifo[this.tauRemp-1]=this.fifo[this.tauRemp];
               this.fifo[this.tauRemp-1].deplacerHoriz(dure,(this.x+(this.width+this.padding)*(this.tauRemp-1)),delay+dure*i);

               
           }



      }
      textSize(s){
          this.fileh.textSize(s);
      }
  }
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
         
          this.mv=new MemoireVirt(svgContainer,'#C4C4C4',400,615-90,5,70,30,415,640-90,12,500,'black',5,5,'#42C7CB','#C4C4C4');
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
        this.mc=new MemoireCent(svgContainer,'#A9ADAD',1000,600-160,5,100,40,1050,630-160,12,500,'black',4,6,'#42C7CB','#C4C4C4');
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
 
 class traductionAdr
 {
     constructor(svgContainer)
     {
        this.mv=[];
        this.mc=[];
        // le flou
        //this.flou=new Rectangle(svgContainer,'#212121',0,0,0,1215,1404,0,0,0,0,'white'); 
        //this.flou.opacity('0.5',0);
        //this.flou.visibility('hidden',0);
        // la fenetre
        this.fenetre=new Rectangle(svgContainer,'#212121',200,200,0,1000,800,630,280,20,900,'white'); 
        //this.fenetre.visibility('hidden',0);
        this.fenetre.changeText("Traduction d'adresse",10);
        // @ logique
        this.adrL= new Rectangle(svgContainer,'grey',320,370,1,180,20,360,350,20,900,'white');
        //this.adrL.visibility('hidden',0);
        this.adrL.changeText('@ Logique',10);
        this.adrl=new Texte(svgContainer,'black',350,385,16,900);
       // this.adrl.visibility('hidden',0);
        this.adrl.changeText(" N° page i Offsef d ",10);
        // @ phisyque
        this.adrF= new Rectangle(svgContainer,'grey',910,810,1,180,20,960,795,20,900,'white');
        //this.adrF.visibility('hidden',0);
        this.adrF.changeText('@ Physique',10);
        this.adrf=new Texte(svgContainer,'black',930,825,16,900);
        //this.adrf.visibility('hidden',0);
        this.adrf.changeText("N° Case i | Offsef d",10);
        // MMU
        this.mmu=new Rectangle(svgContainer,'grey',650,410,3,150,30,700,430,20,900,'Black');
        this.mmu.changeText('MMU',10);
        this.mmuA= new Rectangle(svgContainer,'#5b8991',650,445,3,150,50,455,200,20,900,'black');
        // memoire virtuelle
        this.memv=new Texte(svgContainer,'white',395,430,16,900);
        //this.memv.visibility('hidden',0);
        this.memv.changeText('MV',10);
        for (let i = 0; i < 5; i++)
        {
            this.mv[i]=new Rectangle(svgContainer,'#041941',345,450+(33)*i,3,130,30,390,455+(33)*i+16,12,400,'white');
            //this.mv[i].visibility('hidden',0);
            this.mv[i].changeText('Page '+i,10);      
        }
        // memoire centrale
        this.memc=new Texte(svgContainer,'white',1000,460,16,900);
        //this.memc.visibility('hidden',0);
        this.memc.changeText('MC',10);
        for (let i = 0; i < 3; i++)
        {
            this.mv[i]=new Rectangle(svgContainer,'#124f67',950,475+(33)*i,3,130,30,990,475+(33)*i+18,12,600,'black');
            //this.mv[i].visibility('hidden',0);
            this.mv[i].changeText('Case '+i,10);  
        }
        // Table de page
        this.table=new Rectangle(svgContainer,'#424242',610,600,1,220,177,665,590,12,600,'white');
        this.table.changeText('Table de Pages',10);
        this.title=new Rectangle(svgContainer,'#757575',613,603,1,214,30,660,622,12,600,'black');
        this.title.changeText('Page',10);
        this.ncas=new Texte(svgContainer,'black',620,602,34,600);
        this.ncas.changeText('Case',10);
        this.tab=[];
        this.cas=[];
        for (let i = 0; i < 5; i++)
        {
            this.tab[i]=new Rectangle(svgContainer,'#9E9E9E',613,636+(28)*i,3,130,25,640,610,12,600,'#303F9F');
            this.cas[i]=new Rectangle(svgContainer,'#9E9E9E',746,636+(28)*i,3,81,25,390,610,12,400,'white'); 

        }
        

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
class TabPageFifo
{
    constructor(svgContainer,tab,nbP,x,y)
    {
        this.tab=[];
        this.titre=new Texte(svgContainer,'white',630,360,48,900);
        this.titre.changeText('Table de pages',1000);
        this.tab=tab;
        this.tabP=[];   
        this.ligne=[];
        this.ligne[0]=new Rectangle(svgContainer,'grey',x,y,4,50,30,x+14,y+18,6,550,'black');
        this.ligne[0].changeText('ID',0);
        this.ligne[0].visibility('hidden',2);
        this.ligne[1]=new Rectangle(svgContainer,'grey',x+53,y,4,60,30,x+60,y+18,6,550,'black');
        this.ligne[1].changeText('enMem',0);
        this.ligne[1].visibility('hidden',2);
        this.ligne[2]=new Rectangle(svgContainer,'grey',x+116,y,4,60,30,x+128,y+18,6,550,'black');
        this.ligne[2].changeText('IDcase',0);
        this.ligne[2].visibility('hidden',2);
        this.ligne[3]=new Rectangle(svgContainer,'grey',x+179,y,4,90,30,x+200,y+18,6,550,'black');
        this.ligne[3].changeText('temps',0);
        this.ligne[3].visibility('hidden',2);
        for (let i = 0; i < nbP; i++) 
        {
            this.tabP[i]=new Ligne(svgContainer,x,y+33*(i+1),this.tab[i]);
        }  
        
    }
    appear(delay)
    {
        for (let i = 0; i < 4; i++)
        {
            this.ligne[i].visibility('visible',delay);
        }
        for (let i = 0; i < this.tabP.length; i++) 
        {
            this.tabP[i].visibility('visible',delay);
        }
    }
    hide(delay)
    {
        for (let i = 0; i < 4; i++)
        {
            this.ligne[i].remove(delay);
        }
        for (let i = 0; i < this.tabP.length; i++) 
        {
            this.tabP[i].remove(delay);
        } 
        this.titre.remove(delay);
    }
}
class Ligne
{   
    
    constructor(svgContainer,x,y,page)
    {
        this.ligne=[];
        this.ligne[0]=new Rectangle(svgContainer,'white',x,y,4,50,30,x+14,y+18,6,550,'black');
        this.ligne[0].changeText('P'+page.getIdpage(),0);
        this.ligne[0].visibility('hidden',2);
        this.ligne[1]=new Rectangle(svgContainer,'white',x+53,y,4,60,30,x+63,y+18,6,550,'black');
        this.ligne[1].changeText(page.valide(),0);
        this.ligne[1].visibility('hidden',2);
        this.ligne[2]=new Rectangle(svgContainer,'white',x+116,y,4,60,30,x+145,y+18,6,550,'black');
        this.ligne[2].changeText(page.getIdcase(),0);
        this.ligne[2].visibility('hidden',2);
        this.ligne[3]=new Rectangle(svgContainer,'white',x+179,y,4,90,30,x+200,y+18,6,550,'black');
        this.ligne[3].changeText(page.getTemps(),0);
        this.ligne[3].visibility('hidden',2);
        
    }
    remove(delay)
    {
        for (let i = 0; i < 4; i++) 
        {
            this.ligne[i].remove(delay);
            
        }
    }
    visibility(vis,delay)
    {
        for (let i = 0; i < 4; i++) 
        {
            this.ligne[i].visibility(vis,delay);
            
        }
    }
}
class Affichage
{
    constructor(svgContainer,x,y)
    {   
       
       
                                
        this.rect1=new Rectangle(svgContainer,'black',x,y,20,260,60,x+20,y+20,12,900);
        this.rect1.opacity('0.8',0,0);
        this.rect2=new Rectangle(svgContainer,'grey',x+15,y+15,8,230,30,x+30,y+30,12,900);
        this.rect2.opacity('0.2',0,0);
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