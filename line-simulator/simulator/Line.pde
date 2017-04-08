class Line{
  int posX;
  int posY;
  
  ArrayList<WorkStation> workStations = new ArrayList<WorkStation>();
  
  Line(int numberOfWorkStations, int pposX, int pposY){
    posX = pposX;
    posY = pposY;
    
    for(int i=0; i<numberOfWorkStations;i++){
      workStations.add(new WorkStation(i, posX, posY));
    }
  }
  
  void draw(){
    for(int i=0; i<workStations.size();i++){
      WorkStation workStation = workStations.get(i);
      workStation.draw();
    }
  }
}