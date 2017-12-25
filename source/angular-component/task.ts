import * as path 				from 'path'
import * as fs 					from 'fs'
import * as readline			from 'readline'
import { Log } 					from '../utils/log.class'

import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

export const task = () => {
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	
	Log.componentName()
	Log.componentExample()
	
	rl.on('line', (name:string) => {
	
		rl.close()
		
		const nameGenerator				= new NameGenerator(name)
		const componentTemplate 		= TemplateGenerator.component(nameGenerator)
		const controllerTemplate 		= TemplateGenerator.controller(nameGenerator)
		const pugTemplate 				= TemplateGenerator.pug(nameGenerator)
		const stylusTemplate 			= TemplateGenerator.stylus(nameGenerator)
	
		async function build()
		{
			Log.creatingDirectory()
			await fs.mkdirSync(name)
			
			Log.creatingComponent()
			await fs.writeFileSync(`${name}/index.ts`, componentTemplate)

			Log.creatingController()
			await fs.writeFileSync(`${name}/${name}.controller.ts`, controllerTemplate)

			Log.creatingPug()
			await fs.writeFileSync(`${name}/${name}.template.pug`, pugTemplate)

			Log.creatingStyle()
			await fs.writeFileSync(`${name}/${name}.style.styl`, stylusTemplate)
			
			Log.componentDone(name)
			Log.done()
			
		}
	
		build()
	
	})
}