export class Commons {
    constructor() {}

    public static delay(time: number = 2) {
        return new Promise((resolve) => setTimeout(resolve, time * 1000))
    }

    public static sort(array: Array < any > , args: string): Array < any > {
        if(array){
	        array.sort((a: any, b: any) => {
	            if (a[args] < b[args]) {
	                return -1;
	            } else if (a[args] > b[args]) {
	                return 1;
	            } else {
	                return 0;
	            }
	        });
	    }
	    return array;
    }
}
