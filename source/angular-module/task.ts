import * as path 				from 'path'
import * as fs 					from 'fs'
import * as readline			from 'readline'

import { Log } 					from '../utils/log.class'
import * as angularComponent 	from '../angular-component'
import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

export const task = () => {

	run()

	async function run()
	{
		const moduleName = await getConsoleData(
			'Type module name:', 
			'app, app.core, app.core.services, etc'
		)

		const componentName = await getConsoleData(
			'Type component name:', 
			'header, modal-async, lazy-loader-require, etc'
		)

		const moduleNameGenerator 		= new NameGenerator(moduleName)
		const componentNameGenerator 	= new angularComponent.NameGenerator(componentName) 

		const moduleTemplate 			= TemplateGenerator.module(moduleNameGenerator, componentNameGenerator)
		const routerTemplate			= TemplateGenerator.router(moduleNameGenerator, componentNameGenerator)
		const componentTemplate 		= angularComponent.TemplateGenerator.component(componentNameGenerator)
		const controllerTemplate 		= angularComponent.TemplateGenerator.controller(componentNameGenerator)
		const pugTemplate 				= angularComponent.TemplateGenerator.pug(componentNameGenerator)
		const stylusTemplate 			= angularComponent.TemplateGenerator.stylus(componentNameGenerator)

		async function build()
		{

			const fullpath = `${moduleName}/components/${componentName}`

			Log.creatingDirectory()
			await fs.mkdirSync(moduleName)
			await fs.mkdirSync(`${moduleName}/components`)
			await fs.mkdirSync(fullpath)

			Log.creatingModule()
			await fs.writeFileSync(`${moduleName}/index.ts`, moduleTemplate)

			Log.creatingRouter()
			await fs.writeFileSync(`${moduleName}/router.ts`, routerTemplate)

			Log.creatingComponent()
			await fs.writeFileSync(`${fullpath}/index.ts`, componentTemplate)
			
			Log.creatingController()
			await fs.writeFileSync(`${fullpath}/${componentName}.controller.ts`, controllerTemplate)
			
			Log.creatingPug()
			await fs.writeFileSync(`${fullpath}/${componentName}.template.pug`, pugTemplate)
			
			Log.creatingStyle()
			await fs.writeFileSync(`${fullpath}/${componentName}.style.styl`, stylusTemplate)
			
			Log.done()
			Log.moduleDone(moduleName)
			
		}
	
		build()

	}

	function getConsoleData(msg:string, example:string) : Promise<string>
	{
		return new Promise((res, rej) => {

			try
			{			
				const rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				})

				Log.moduleName(msg)
				Log.moduleExample(example)

				rl.on('line', (line:string) => {
					rl.close()
					res(line)
				})

			}
			catch(err)
			{
				throw err
			}

		})
	}

}