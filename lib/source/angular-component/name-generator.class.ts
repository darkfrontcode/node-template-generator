export class NameGenerator
{
	public name:string
	public captalizeName:string
	public aliasName: string
	public controllerName: string
	public componentName: string

	constructor(name:string)
	{
		this.name = name
		this.captalizeName = this.captalize()
		this.aliasName = this.alias()
		this.controllerName = this.controller()
		this.componentName = this.component()
	}

	private captalize() : string
	{
		return this.name
			.split('-')
			.map(s => this.capitalizeFirstLetter(s))
			.join(' ')
	}

	private alias() : string
	{
		return this.name
			.split('-')
			.map((s, i) => {
				if(i!=0) s = this.capitalizeFirstLetter(s)
				return s
			})
			.join('')
	}
 
	private controller() : string
	{
		return this.name
			.concat('-controller')
			.split('-')
			.map(s => this.capitalizeFirstLetter(s))
			.join('')
	}

	private component() : string
	{
		return this.name
			.concat('-component')
			.split('-')
			.map(s => this.capitalizeFirstLetter(s))
			.join('')
	}

	private capitalizeFirstLetter(string:string) : string
	{
		return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
	}
}