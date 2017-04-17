int numberOfLines = 5;
float minutesPerSecod = 0.1 * 60;

Scheduler scheduler;

void setup(){
  size(1200,700);
  
  scheduler = new Scheduler();
}

void draw(){
  background(200);
  scheduler.draw();
}

void mouseClicked(){
  scheduler.mouseClicked();
}