import * as path 				from 'path'
import * as fs 					from 'fs'
import * as readline			from 'readline'
import chalk 					from 'chalk'

import * as angularComponent 	from '../angular-component'
import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

const log = console.log

export const task = () => {

	async function getNames()
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

			const path = `${moduleName}/components/${componentName}`

			log(chalk`{cyan {underline criating directory.. }}`)
			await fs.mkdirSync(moduleName)
			await fs.mkdirSync(`${moduleName}/components`)
			await fs.mkdirSync(path)
			log(chalk`{yellow done.}`)

			log(chalk`{cyan {underline criating module.. }}`)
			await fs.writeFileSync(`${moduleName}/index.ts`, moduleTemplate)
			log(chalk`{yellow done.}`)

			log(chalk`{cyan {underline criating router.. }}`)
			await fs.writeFileSync(`${moduleName}/router.ts`, routerTemplate)
			log(chalk`{yellow done.}`)

			log(chalk`{cyan {underline criating component entry.. }}`)
			await fs.writeFileSync(`${path}/index.ts`, componentTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating controllers.. }}`)
			await fs.writeFileSync(`${path}/${componentName}.controller.ts`, controllerTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating pug templates.. }}`)
			await fs.writeFileSync(`${path}/${componentName}.template.pug`, pugTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{cyan {underline criating styles.. }}`)
			await fs.writeFileSync(`${path}/${componentName}.style.styl`, stylusTemplate)
			log(chalk`{yellow done.}`)
	
			log(chalk`{magenta {underline ${ moduleName } module created!}}`)
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

				log(chalk`{magenta ${msg}}`)
				log(chalk`{gray {cyan Example:} '${example}' }`)

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

	getNames()

}