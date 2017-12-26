import * as readline			from 'readline'
import * as angularModule		from './angular-module'
import * as angularComponent 	from './angular-component'
import * as Utils 				from './utils'

nodeTemplateGenerator()

function nodeTemplateGenerator()
{
	Utils.Log.welcome()
	actions()
}

function menu(option:number)
{
	switch(option)
	{
		case 1:
			angularModule.task()
		break
		case 2:
			angularComponent.task()
		break
		case 3:
			Utils.Log.bye()
		break
	}
}

function actions()
{
	Utils.Log.choice()

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	rl.on('line', (line) => {

		const option = +line
	
		if(isNaN(option))
		{
			Utils.Log.numbersOnly()
		}
		else
		{
			if(option > 0 && option < 4)
			{
				rl.close()
				menu(option)
			}
			else
			{
				Utils.Log.invalidOption()
			}
		}
	})
	
}