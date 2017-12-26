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
			await fs.mkdirSync(nameGenerator.name)
			
			Utils.Log.creatingComponent()
			await fs.writeFileSync(`${nameGenerator.name}/index.ts`, componentTemplate)

			Utils.Log.creatingController()
			await fs.writeFileSync(`${nameGenerator.name}/${nameGenerator.name}.controller.ts`, controllerTemplate)

			Utils.Log.creatingPug()
			await fs.writeFileSync(`${nameGenerator.name}/${nameGenerator.name}.template.pug`, pugTemplate)

			Utils.Log.creatingStyle()
			await fs.writeFileSync(`${nameGenerator.name}/${nameGenerator.name}.style.styl`, stylusTemplate)
			
			Utils.Log.componentDone(nameGenerator.name)
			Utils.Log.done()
			
		}
	}
}