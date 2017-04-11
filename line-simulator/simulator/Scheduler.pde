class Scheduler{
  Factory factory;
  int manufacturingOrdersCounter = 0;
  int periodSeconds = 1;
  
  Scheduler(){
    factory = new Factory();
    
    for(int i=0; i<numberOfLines;i++){
      factory.addLine(new Line(5, 400, 50 + (100 * i) + 30));
    }
    
  }
  
  void draw(){
    if(frameCount%(periodSeconds*60)==0){
      factory.releaseManufacturingOrders();
      factory.doAction();
    }
    factory.draw();
    
    this.drawAddManufacturingOrderButton();
  }
  
  void addManufacturingOrders(){
    int numberOfMO = round(random(1,4));
    for(int i=0; i<numberOfMO; i++){
      factory.addManufacturingOrder(new ManufacturingOrder(manufacturingOrdersCounter,round(random(1,10))));
      manufacturingOrdersCounter++;
    }
  }
  
  void mouseClicked(){
    this.clickButtonAddManufacturingOrder();
    factory.mouseClicked();
  }
  
  void drawAddManufacturingOrderButton(){
    ellipse(width-50,height-50,50,50);
  }
  
  void clickButtonAddManufacturingOrder(){
    if(dist(mouseX, mouseY, width-50, height-50)<25){
      this.addManufacturingOrders();
    }
  }
}