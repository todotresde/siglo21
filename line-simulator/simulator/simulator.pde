int numberOfLines = 3;

Scheduler scheduler;

void setup(){
  size(800,600);
  
  scheduler = new Scheduler();
}

void draw(){
  scheduler.draw();
}

void mouseClicked(){
  scheduler.mouseClicked();
}