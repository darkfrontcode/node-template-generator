import * as path 				from 'path'
import * as fs 					from 'fs'
import * as readline			from 'readline'
import chalk 					from 'chalk'

import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

const log = console.log

export const task = () => {
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	
	log(chalk`{magenta Type component name:}`)
	log(chalk`{gray {cyan Example:} 'header, modal-async, lazy-loader-require, etc' }`)
	
	rl.on('line', (name:string) => {
	
		rl.close()
		
		const nameGenerator				= new NameGenerator(name)
		const componentTemplate 		= TemplateGenerator.component(nameGenerator)
		const controllerTemplate 		= TemplateGenerator.controller(nameGenerator)
		const pugTemplate 				= TemplateGenerator.pug(nameGenerator)
		const stylusTemplate 			= TemplateGenerator.stylus(nameGenerator)
	
		async function build()
		{
			log(chalk`{cyan {underline criating directory.. }}`)
			await fs.mkdirSync(name)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating component entry.. }}`)
			await fs.writeFileSync(`${name}/index.ts`, componentTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating controllers.. }}`)
			await fs.writeFileSync(`${name}/${name}.controller.ts`, controllerTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating pug templates.. }}`)
			await fs.writeFileSync(`${name}/${name}.template.pug`, pugTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating styles.. }}`)
			await fs.writeFileSync(`${name}/${name}.style.styl`, stylusTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{magenta {underline ${ name } component created!}}`)
		}
	
		build()
	
	})
}