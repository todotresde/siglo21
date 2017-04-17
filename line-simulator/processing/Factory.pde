class Factory{
  ArrayList<Line> lines = new ArrayList<Line>();
  ArrayList<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();
  ArrayList<ManufacturingOrder> manufacturingOrdersStatus = new ArrayList<ManufacturingOrder>();
  
  float minutesPerSecod;
  
  Factory(){
  }
  
  void draw(){
    //In comming
    for(int i=0; i<manufacturingOrders.size();i++){
      ManufacturingOrder manufacturingOrder = manufacturingOrders.get(i);
      textSize(20);
      fill(0);
      text(manufacturingOrder.id + "(" + manufacturingOrder.numberOfProducts + ")", (80 * i) + 30, 30);
    }
    
    for(int i=0; i<lines.size();i++){
      Line line = lines.get(i);
      line.draw();
    }
    
    //Status
    rect(0,height - 100, width, 100);
    for(int i=0; i<manufacturingOrdersStatus.size();i++){
      ManufacturingOrder manufacturingOrder = manufacturingOrdersStatus.get(i);
      textSize(15);
      if(manufacturingOrder.finishedProducts == manufacturingOrder.numberOfProducts){
        fill(0,255,0);
      }else{
        fill(255,0,0);
        manufacturingOrder.setEndTime(minutesPerSecod);
      }
      text(manufacturingOrder.id + "(" + manufacturingOrder.finishedProducts + "/" + manufacturingOrder.numberOfProducts + " - " + manufacturingOrder.getTimeSpent() + ")", (90 * (i%12)) + 30, height - 80 + 25 * (i/12));
    }
  }
  
  void doAction(){
    for(int i=0; i<lines.size();i++){
      lines.get(i).doAction();
    }  
  }
  
  void addLine(Line line){
    line.factory = this;
    this.lines.add(line);
  }
  
  void addManufacturingOrder(ManufacturingOrder manufacturingOrder){
    manufacturingOrders.add(manufacturingOrder);
  }
  
  void releaseManufacturingOrders(){
    int numberOfMO = (manufacturingOrders.size() > 5) ? 5 : manufacturingOrders.size();
    int currentLine = 0;
    
    for(int i=0; i<numberOfMO; i++){
      ManufacturingOrder manufacturingOrder = manufacturingOrders.remove(0);
      
      for(int p=0; p<manufacturingOrder.products.size(); p++){
        this.lines.get(currentLine).addProduct(manufacturingOrder.products.get(p));
        currentLine = (currentLine >= this.lines.size() - 1) ? 0 : currentLine+1;
      }
      
      manufacturingOrdersStatus.add(manufacturingOrder);
    }
  }
  
  void setFinishedProduct(Product product){
    for(int m=0; m<manufacturingOrdersStatus.size(); m++){
      if(manufacturingOrdersStatus.get(m).id == product.manufacturingOrder.id){
        manufacturingOrdersStatus.get(m).finishedProducts++;
      }
    }
  }
  
  void mouseClicked(){
    for(int i=0; i<lines.size();i++){
      lines.get(i).mouseClicked();
    }  
  }
}