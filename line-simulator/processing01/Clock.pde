class Clock{
  int posX;
  int posY;
  
  int year;
  int month;
  int day;
  int hour;
  int minute;
  
  Clock(int pposX, int pposY){
    posX = pposX;
    posY = pposY;
    
    year = year();
    month = month();
    day = day();
    hour = hour();
    minute = minute();
  }
  
  void draw(){
    fill(0);
    textSize(20);
    text(day + "-" + month + "-" + year + " " + hour + ":" + minute, posX, posY);
  }
  
  void doAction(){
    int auxYear = year;
    int auxMonth = month;
    int auxHour = hour;
    int auxMinute = minute + 1;
    
    if(auxMinute == 60){
      auxHour = hour + 1;
      auxMinute = 0;
    }
    
    if(auxHour == 24){
      auxMonth = month + 1;
      auxHour = 0;
    }
    
    if(auxMonth == 13){
      auxYear = year + 1;
      auxMonth = 1;
    }
    
    year = auxYear;
    month = auxMonth;
    hour = auxHour;
    minute = auxMinute;
  }
}