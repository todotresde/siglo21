class ManufacturingOrder{
  ArrayList<Product> products = new ArrayList<Product>();
  int numberOfProducts;
  int finishedProducts = 0;
  int id;
  float startTime;
  float endTime;
  int timeSpent;
  
  ManufacturingOrder(int pid, int pnumberOfProducts){
    id = pid;
    numberOfProducts = pnumberOfProducts;
    
    for(int i=0; i<pnumberOfProducts;i++){
      products.add(new Product(this));
    }  
  }
  
  void draw(){
  }
  
  void doAction(){
    startTime++;
  }
  
  void setStartTime(float minutesPerSecod){
    startTime = frameCount / minutesPerSecod;
  }
  
  void setEndTime(float minutesPerSecod){
    endTime = frameCount / minutesPerSecod;
  }
  
  int getTimeSpent(){
    if(startTime != 0)
      return round(endTime-startTime);
    else
      return 0;
  }
}