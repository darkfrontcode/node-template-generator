import * as fs 					from 'fs'
import * as Utils 				from '../utils'
import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

export const task = () => {
	
	run()

	async function run()
	{

		const componentName 			= await Utils.readLineData(Utils.Log.componentName, Utils.Log.componentExample)
		const nameGenerator				= new NameGenerator(componentName)
		const componentTemplate 		= TemplateGenerator.component(nameGenerator)
		const controllerTemplate 		= TemplateGenerator.controller(nameGenerator)
		const pugTemplate 				= TemplateGenerator.pug(nameGenerator)
		const stylusTemplate 			= TemplateGenerator.stylus(nameGenerator)
		
		build()

		async function build()
		{
			Utils.Log.creatingDirectory()
			await fs.mkdirSync(componentName)
			
			Utils.Log.creatingComponent()
			await fs.writeFileSync(`${componentName}/index.ts`, componentTemplate)

			Utils.Log.creatingController()
			await fs.writeFileSync(`${componentName}/${componentName}.controller.ts`, controllerTemplate)

			Utils.Log.creatingPug()
			await fs.writeFileSync(`${componentName}/${componentName}.template.pug`, pugTemplate)

			Utils.Log.creatingStyle()
			await fs.writeFileSync(`${componentName}/${componentName}.style.styl`, stylusTemplate)
			
			Utils.Log.componentDone(componentName)
			Utils.Log.done()
			
		}
	}
}