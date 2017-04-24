class WorkStation{
  int posX;
  int posY;
  int tam = 50;
  
  int id;
  
  int time;
  
  String line;
  boolean first = false;
  
  Factory factory;
  Product currentProduct;
  ArrayList<Product> finishedProducts = new ArrayList<Product>();
  
  ArrayList<WorkStation> nextWorkStations = new ArrayList<WorkStation>(); 
  
  WorkStation(int id, Factory factory){
    this.id = id;
    this.factory = factory;
  }
  
  void draw(){
    //Workstation
    fill(150);
    rect(posX, posY, tam, tam);
    
    //Next WorkStations
    for(int nW=0; nW<nextWorkStations.size(); nW++){
      //Connector
      line(posX + tam, posY + tam/2, posX + tam + tam/2, posY + tam/2 + this.factory.spaceBetweenLines * nW);
      //Next WorkStation
      nextWorkStations.get(nW).draw();
    }

  }
  
  void doAction(){

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

  }
  
  void addNextWorkStation(WorkStation workStation){
    nextWorkStations.add(workStation);
  }
  
  boolean isFirst(){
    return first;
  }
  
}