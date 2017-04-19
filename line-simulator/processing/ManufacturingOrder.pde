class ManufacturingOrder{
  ArrayList<Product> products = new ArrayList<Product>();
  int numberOfProducts;
  int finishedProducts = 0;
  int id;
  float startTime = 0;
  float endTime = 0;
  int timeSpent = 0;
  
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
    startTime = 0;
  }
  
  void setEndTime(float minutesPerSecod){
    endTime = frameCount / minutesPerSecod;
  }
  
  int getTimeSpent(){
    return round(startTime);
  }
}