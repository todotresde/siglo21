class Factory{
  int posX;
  int posY;
  
  int numberOfWorkStations = 26;
  ArrayList<WorkStation> workStations = new ArrayList<WorkStation>();
  ArrayList<ManufacturingOrder> manufacturingOrders = new ArrayList<ManufacturingOrder>();
  
  int spaceBetweenLines = 80;
  
  Factory(int posX, int posY){
    this.posX = posX;
    this.posY = posY;
  }
  
  void draw(){
    int numberOfLevels = 0;
    
    for(int w = 0; w < workStations.size(); w++){
      if(workStations.get(w).isFirst()){
        workStations.get(w).draw();
        numberOfLevels++;
      }
    }
  } 
  
  void doAction(){

  }
  
  
  void addManufacturingOrder(ManufacturingOrder manufacturingOrder){
    manufacturingOrders.add(manufacturingOrder);
  }
  
  void releaseManufacturingOrders(){
    
  }
  
  void mouseClicked(){
   
  }
  
  void createWorkStationConfigurations(){
    for(int w = 0; w < numberOfWorkStations; w++){
      workStations.add(new WorkStation(w, this));
    }
    
    //Line1
    //W - 0
    WorkStation w0 = workStations.get(0);
    w0.line = "line1";
    w0.first = true;
    w0.posX = 300; w0.posY = 100;
    w0.addNextWorkStation(workStations.get(1));
    w0.addNextWorkStation(workStations.get(6));
    //W - 1
    WorkStation w1 = workStations.get(1);
    w1.line = "line1";
    w1.posX = 300; w0.posY = 100;
    w1.addNextWorkStation(workStations.get(2));
    w1.addNextWorkStation(workStations.get(7));
    //W - 2
    WorkStation w2 = workStations.get(2);
    w2.line = "line1";
    w2.addNextWorkStation(workStations.get(3));
    w2.addNextWorkStation(workStations.get(8));
    //W - 3
    WorkStation w3 = workStations.get(3);
    w3.line = "line1";
    w3.addNextWorkStation(workStations.get(4));
    w3.addNextWorkStation(workStations.get(9));
    //W - 4
    WorkStation w4 = workStations.get(4);
    w4.line = "line1";
    
    //Line2
    //W - 5
    WorkStation w5 = workStations.get(5);
    w5.line = "line2";
    w5.first = true;
    w5.addNextWorkStation(workStations.get(6));
    //W - 6
    WorkStation w6 = workStations.get(6);
    w6.line = "line2";
    w6.addNextWorkStation(workStations.get(7));
    //W - 7
    WorkStation w7 = workStations.get(7);
    w7.line = "line2";
    w7.addNextWorkStation(workStations.get(8));
    //W - 8
    WorkStation w8 = workStations.get(8);
    w8.line = "line2";
    w8.addNextWorkStation(workStations.get(9));
    //W - 9
    WorkStation w9 = workStations.get(9);
    w9.line = "line2";
  }
}