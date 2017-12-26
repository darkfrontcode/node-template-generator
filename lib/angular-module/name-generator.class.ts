import * as Utils from '../utils'

export class NameGenerator implements Utils.INormalizeName
{
	public name:string
	public captalizeName:string
	public hyphenateName:string

	constructor(name:string)
	{
		this.name = this.normalize(name)
		this.captalizeName = this.captalize()
		this.hyphenateName = this.hyphenate()
	}

	private captalize() : string
	{
		return this.name
			.toLowerCase()
			.split('.')
			.map(s => this.capitalizeFirstLetter(s))
			.join('')
	}

	private hyphenate() : string
	{
		return this.name
			.toLowerCase()
			.split('.')
			.join('-')
	}

	private capitalizeFirstLetter(string:string) : string
	{
		return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
	}

	public normalize(name: string): string
	{
		return name.toLowerCase().replace(/[^a-zA-Z.]/g, '')
	}
}