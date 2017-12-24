export class NameGenerator
{
	public name:string
	public captalizeName:string

	constructor(name:string)
	{
		this.name = name
		this.captalizeName = this.captalize()
	}

	private captalize() : string
	{
		return this.name
			.split('.')
			.map(s => this.capitalizeFirstLetter(s))
			.join('')
	}

	private capitalizeFirstLetter(string) : string
	{
		return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
	}
}