class Product{
  ManufacturingOrder manufacturingOrder;
  float w = 0;
  float h = 0;
  float m = 0;
  
  Product(ManufacturingOrder pmanufacturingOrder){
    this.manufacturingOrder = pmanufacturingOrder;
    
    w = random(0.50,2);
    h = random(0.50,10);
    m = w * h;
  }
}