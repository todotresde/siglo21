class WorkStation{
  int posX;
  int posY;
  int tam = 50;
  int timeToSolve = 0;
  int time = -1;
  boolean stop = false;
  Product product;
  
  
  WorkStation(int ppos, int pposX, int pposY){
    posX = pposX + (ppos * (tam + tam/2));
    posY = pposY;
  }
  
  void draw(){
    if(!stop){fill(100);}else{fill(255,0,0);}
    
    rect(posX, posY, tam, tam);
    line(posX + tam, posY + tam/2, posX + tam + tam/2, posY + tam/2);
    
    if(hasProduct()){
      textSize(20);
      fill(0,255,0);
      text(product.manufacturingOrder.id, posX + tam/3, posY + tam * 2/3);
    }
    
    textSize(10);
    fill(255);
    text(timeToSolve, posX + tam - 10, posY + 10);
  }
  
  void doAction(){
    if(hasProduct() && !finished() && !stop){
      time++;
    }
  }
  
  void addProduct(Product pproduct){
    if(!stop){
      time = 0;
      product = pproduct;
      timeToSolve = round(random(3,6));
    }
  }
  
  void removeProduct(){
    if(!stop){
      time = -1;
      timeToSolve = 0;
    }
  }
  
  boolean hasProduct(){
    return time != -1;
  }
  
  boolean finished(){
    return time == timeToSolve;
  }
  
  boolean stopped(){
    return stop;
  }
  
  void mouseClicked(){
    if(mouseX > posX && mouseX < posX + tam && mouseY > posY && mouseY < posY + tam){
      stop = !stop;
    }
  }
  
}