class WorkStation{
  int posX;
  int posY;
  int tam = 50;
  
  WorkStation(int ppos, int pposX, int pposY){
    posX = pposX + (ppos * (tam + tam/2));
    posY = pposY;
  }
  
  void draw(){
    rect(posX, posY, tam, tam);
    line(posX + tam, posY + tam/2, posX + tam + tam/2, posY + tam/2);
  }
  
}