import * as fs 					from 'fs'
import * as Utils 				from '../utils'
import * as angularComponent 	from '../angular-component'
import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

export const task = () => {

	run()

	async function run()
	{

		const moduleName 				= await Utils.readLineData(Utils.Log.moduleName, Utils.Log.moduleExample)
		const componentName 			= await Utils.readLineData(Utils.Log.componentName, Utils.Log.componentExample)

		const moduleNameGenerator 		= new NameGenerator(moduleName)
		const componentNameGenerator 	= new angularComponent.NameGenerator(componentName) 

		const moduleTemplate 			= TemplateGenerator.module(moduleNameGenerator, componentNameGenerator)
		const routerTemplate			= TemplateGenerator.router(componentNameGenerator)
		const componentTemplate 		= angularComponent.TemplateGenerator.component(componentNameGenerator)
		const controllerTemplate 		= angularComponent.TemplateGenerator.controller(componentNameGenerator)
		const pugTemplate 				= angularComponent.TemplateGenerator.pug(componentNameGenerator)
		const stylusTemplate 			= angularComponent.TemplateGenerator.stylus(componentNameGenerator)

		build()

		async function build()
		{

			const fullpath = `${moduleNameGenerator.hyphenateName}/components/${componentNameGenerator.name}`

			Utils.Log.creatingDirectory()
			await fs.mkdirSync(moduleNameGenerator.hyphenateName)
			await fs.mkdirSync(`${moduleNameGenerator.hyphenateName}/components`)
			await fs.mkdirSync(fullpath)

			Utils.Log.creatingModule()
			await fs.writeFileSync(`${moduleNameGenerator.hyphenateName}/index.ts`, moduleTemplate)

			Utils.Log.creatingRouter()
			await fs.writeFileSync(`${moduleNameGenerator.hyphenateName}/router.ts`, routerTemplate)

			Utils.Log.creatingComponent()
			await fs.writeFileSync(`${fullpath}/index.ts`, componentTemplate)
			
			Utils.Log.creatingController()
			await fs.writeFileSync(`${fullpath}/${componentNameGenerator.name}.controller.ts`, controllerTemplate)
			
			Utils.Log.creatingPug()
			await fs.writeFileSync(`${fullpath}/${componentNameGenerator.name}.template.pug`, pugTemplate)
			
			Utils.Log.creatingStyle()
			await fs.writeFileSync(`${fullpath}/${componentNameGenerator.name}.style.styl`, stylusTemplate)
			
			Utils.Log.moduleDone(moduleNameGenerator.name)
			Utils.Log.done()
			
		}

	}

}