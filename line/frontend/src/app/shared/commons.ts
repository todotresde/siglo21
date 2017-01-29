export class Commons {
  constructor() {}

  public static delay(time:number = 2){
  	return new Promise((resolve) => setTimeout(resolve, time * 1000))	
  }
}