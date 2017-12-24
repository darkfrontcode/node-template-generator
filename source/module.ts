import * as path 				from 'path'
import * as fs 					from 'fs'
import * as readline			from 'readline'
import chalk 					from 'chalk'

import { NameGenerator } 		from './name-generator.class'
import { TemplateGenerator } 	from './template-generator.class'

const log = console.log

export const module = () => {

	async function getNames()
	{
		const moduleName = await getConsoleData('Type module name:', 'app, app.core, app.core.services, etc')
		const componentName = await getConsoleData('Type component name:', 'header, modal-async, lazy-loader-require, etc')
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
				log(chalk`{gray {white Example:} '${example}' }`)

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