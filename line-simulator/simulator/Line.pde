class Line{
  int posX;
  int posY;
  
  ArrayList<Product> inProducts = new ArrayList<Product>();
  ArrayList<Product> outProducts = new ArrayList<Product>();
  ArrayList<WorkStation> workStations = new ArrayList<WorkStation>();
  
  Factory factory;
  
  Line(int numberOfWorkStations, int pposX, int pposY){
    posX = pposX;
    posY = pposY;
    
    for(int i=0; i<numberOfWorkStations;i++){
      workStations.add(new WorkStation(i, posX, posY));
    }
  }
  
  void draw(){
    textSize(20);
    //In Products
    for(int i=0; i<inProducts.size();i++){
      fill(255);
      text(inProducts.get(i).manufacturingOrder.id, (50 * -i) + posX - 30, posY + 30);
    }
    
    //Out Products
    for(int i=outProducts.size()-1; i>=0;i--){
      fill(255);
      text(outProducts.get(i).manufacturingOrder.id, posX + 10 + ( 75 * workStations.size()) + (50 * (outProducts.size() - i - 1)), posY + 30);
    }
    
    
    for(int i=0; i<workStations.size();i++){
      WorkStation workStation = workStations.get(i);
      workStation.draw();
    }
  }
  
  void addProduct(Product product){
    inProducts.add(product);
  }
  
  void doAction(){
    for(int i=workStations.size()-1; i>=0;i--){
      
      WorkStation workStation = workStations.get(i);
      workStation.doAction();
      
      /*if(workStation.finished() && !workStation.stopped()){
        if(i<workStations.size()-1){
          if(!workStations.get(i+1).hasProduct() && !workStations.get(i+1).stopped()){
            Product product = workStation.product;
            workStation.removeProduct();
          
            workStations.get(i+1).addProduct(product);
          }
        }else{
          Product product = workStation.product;
          workStation.removeProduct();
            
          outProducts.add(product);
          factory.setFinishedProduct(product);
        }
      }*/
      if(!workStation.stopped()){
        if(i>0 && i<workStations.size()){
          if(workStations.get(i-1).hasFinishedProducts() && !workStation.hasProduct()){
            workStation.addProduct(workStations.get(i-1).removeFinishedProduct());
          }
        }
        
        if(i==workStations.size()-1 && workStation.hasFinishedProducts()){
          Product product = workStation.removeFinishedProduct();
          outProducts.add(product);
          factory.setFinishedProduct(product);
        }
      }
    }
    
    if(firstWorkStationIsFree() && hasProducts()){
      workStations.get(0).addProduct(this.inProducts.remove(0));
    }
  }
  
  boolean firstWorkStationIsFree(){
    return !workStations.get(0).hasProduct() && !workStations.get(0).stopped();
  }
  
  boolean hasProducts(){
    return this.inProducts.size() > 0;
  }
  
  void mouseClicked(){
    for(int i=0; i<workStations.size();i++){
      workStations.get(i).mouseClicked();
    }  
  }
}