class ManufacturingOrder{
  ArrayList products = new ArrayList();
  int numberOfProducts;
  int finishedProducts = 0;
  int id;
  
  ManufacturingOrder(int pid, int pnumberOfProducts){
    id = pid;
    numberOfProducts = pnumberOfProducts;
    
    for(int i=0; i<pnumberOfProducts;i++){
      products.add(new Product(this));
    }
    
  }
  
  void draw(){
  }
}