import * as path 				from 'path'
import * as fs 					from 'fs'
import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

const nameGenerator				= new NameGenerator('stylus-magazine')
const componentTemplate 		= TemplateGenerator.component(nameGenerator)
const controllerTemplate 		= TemplateGenerator.controller(nameGenerator)
const pugTemplate 				= TemplateGenerator.pug(nameGenerator)
const stylusTemplate 			= TemplateGenerator.stylus(nameGenerator)

// fs.mkdirSync(dirname, (err) => {
// 	if(err) throw err
// 	console.log('Created!')
// })

// fs.appendFile('mynewfile1.txt', 'Hello content!', (err) =>
// {
// 	if (err) throw err
// 	console.log('Saved!')
// })

// function ensureDirectoryExistence(filePath)
// {	
// 	const dirname = path.dirname(filePath)
	
// 	if (fs.existsSync(dirname))
// 	{
// 		return true
// 	}

// 	ensureDirectoryExistence(dirname)
// 	fs.mkdirSync(dirname);
// }