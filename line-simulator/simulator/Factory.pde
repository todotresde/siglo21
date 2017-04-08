class Factory{
  ArrayList<Line> lines = new ArrayList<Line>();
  ArrayList<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();
  
  Factory(){
  }
  
  void draw(){
    for(int i=0; i<manufacturingOrders.size();i++){
      ManufacturingOrder manufacturingOrder = manufacturingOrders.get(i);
      textSize(20);
      text(manufacturingOrder.numberOfProducts, 50, (50 * i) + 30);
    }
    
    for(int i=0; i<lines.size();i++){
      Line line = lines.get(i);
      line.draw();
    }
  }
  
  void doAction(){
    
  }
  
  void addLine(Line line){
    this.lines.add(line);
  }
  
  void addManufacturingOrder(ManufacturingOrder manufacturingOrder){
    manufacturingOrders.add(manufacturingOrder);
  }
  
  void mouseClicked(){
  }
}