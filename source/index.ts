import * as path 				from 'path'
import * as fs 					from 'fs'
import * as readline			from 'readline'
import * as angularModule		from './angular-module'
import * as angularComponent 	from './angular-component'
import { Log } 					from './utils/log.class'

run()

/* ==========================================================================
	-- Run
========================================================================== */

function run()
{
	Log.welcome()
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
			Log.bye()
		break
	}
}

function actions()
{
	Log.choice()

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	rl.on('line', (line) => {

		const option = +line
	
		if(isNaN(option))
		{
			Log.numbersOnly()
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
				Log.invalidOption()
			}
		}
	})
	
}