class WorkStation{
  int posX;
  int posY;
  int tam = 50;
  int timeToSolve = 0;
  int time = -1;
  boolean stop = false;
  Product currentProduct;
  ArrayList finishedProducts = new ArrayList();
  
  
  WorkStation(int ppos, int pposX, int pposY){
    posX = pposX + (ppos * (tam + tam/2));
    posY = pposY;
  }
  
  void draw(){
    if(!stop){if(finished()){fill(255,255,0);}else{fill(100);}}else{fill(255,0,0);}
    
    //Workstation
    rect(posX, posY, tam, tam);
    //Connector
    line(posX + tam, posY + tam/2, posX + tam + tam/2, posY + tam/2);
    //Finished Products
    for(int i=0; i<finishedProducts.size(); i++){
      line(posX + tam, posY + tam/2 - 5 - 5*i, posX + tam + tam/4, posY + tam/2 - 5 - 5*i);
    }
    
    if(hasProduct()){
      textSize(20);
      fill(0,255,0);
      text(currentProduct.manufacturingOrder.id, posX + tam/3, posY + tam * 2/3);
    }
    
    textSize(10);
    fill(255);
    text(timeToSolve, posX + tam - 10, posY + 10);
  }
  
  void doAction(){
    if(hasProduct() && !finished() && !stop){
      time++;
      if(finished()){
        finishedProducts.add(currentProduct);
        removeProduct();
      }
      
    }
  }
  
  void addProduct(Product pproduct){
    if(!stop){
      time = 0;
      currentProduct = pproduct;
      timeToSolve = round(currentProduct.m) + round(random(1,2));
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
  
  Product removeFinishedProduct(){
    if(hasFinishedProducts()){
      return finishedProducts.remove(0);
    }
    
    return null;
  }
  
  boolean hasFinishedProducts(){
    return finishedProducts.size() > 0;
  }
  
  void mouseClicked(){
    if(mouseX > posX && mouseX < posX + tam && mouseY > posY && mouseY < posY + tam){
      stop = !stop;
    }
  }
  
}