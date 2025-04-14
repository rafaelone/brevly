export class BadRequest extends Error {
	constructor(message = "BadRequest") {
		super(message);
		this.name = "BadRequest";
	}
}
