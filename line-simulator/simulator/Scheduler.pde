class Scheduler{
  Factory factory;
  
  Scheduler(){
    factory = new Factory();
    
    for(int i=0; i<numberOfLines;i++){
      factory.addLine(new Line(5, 200, (100 * i) + 30));
    }
    
    
    
  }
  
  void draw(){
    if(frameCount%300==0){
      //this.addManufacturingOrders();
      factory.doAction();
    }
    factory.draw();
    
    this.drawAddManufacturingOrderButton();
  }
  
  void addManufacturingOrders(){
    int numberOfMO = round(random(1,4));
    for(int i=0; i<numberOfMO; i++){
      factory.addManufacturingOrder(new ManufacturingOrder(round(random(1,10))));
    }
  }
  
  void mouseClicked(){
    this.clickButtonAddManufacturingOrder();
    factory.mouseClicked();
  }
  
  void drawAddManufacturingOrderButton(){
    ellipse(width-100,height-100,50,50);
  }
  
  void clickButtonAddManufacturingOrder(){
    if(dist(mouseX, mouseY, width-100, height-100)<25){
      this.addManufacturingOrders();
    }
  }
}