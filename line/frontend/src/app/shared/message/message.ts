import { MESSAGE_TYPE } from './message.constant';

export class Message {
	type: MESSAGE_TYPE = MESSAGE_TYPE.None;
	message: string = "";

	success(message?: string): void{
		this.type = MESSAGE_TYPE.Success;
		this.message = (message) ? message : "operation-success";
	}

	info(message?: string): void{
		this.type = MESSAGE_TYPE.Info;
		this.message = (message) ? message : "operation-info";
	}

	warning(message?: string): void{
		this.type = MESSAGE_TYPE.Warning;
		this.message = (message) ? message : "operation-warning";
	}

	error(message?: string): void{
		this.type = MESSAGE_TYPE.Error;
		this.message = (message) ? message : "operation-error";
	}

	none(): void{
		this.type = MESSAGE_TYPE.None;
		this.message = "";
	}
}
