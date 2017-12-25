// import chalk from 'chalk'

// const log = console.log

export class Log
{

/* ==========================================================================
	-- Global
========================================================================== */

	public static done() : void
	{
		// log(chalk`{yellow done.}`)
	}

	public static creatingDirectory() : void
	{
		// log(chalk`{cyan {underline criating directory.. }}`)
	}

	public static creatingModule() : void
	{
		// log(chalk`{cyan {underline criating module.. }}`)
	}

	public static creatingRouter() : void
	{
		// log(chalk`{cyan {underline criating router.. }}`)
	}

	public static creatingComponent() : void
	{
		// log(chalk`{cyan {underline criating component.. }}`)
	}

	public static creatingController() : void
	{
		// log(chalk`{cyan {underline criating controller.. }}`)
	}

	public static creatingPug() : void
	{
		// log(chalk`{cyan {underline criating pug.. }}`)
	}

	public static creatingStyle() : void
	{
		// log(chalk`{cyan {underline criating style.. }}`)
	}

/* ==========================================================================
	-- Angular Component
========================================================================== */

	public static componentName() : void
	{
		// log(chalk`{magenta Enter a name for the component:}`)
	}

	public static componentExample() : void
	{
		// log(chalk`{gray {cyan Example:} 'header, modal-async, lazy-loader-require, etc' }`)
	}

	public static componentDone(name:string) : void
	{
		// log(chalk`{magenta {underline ${ name } component created!}}`)
	}

/* ==========================================================================
	-- Angular Module
========================================================================== */

	public static moduleDone(name:string) : void
	{
		// log(chalk`{magenta {underline ${ name } module created!}}`)
	}

	public static moduleName() : void
	{
		// log(chalk`{magenta Enter a name for the module:}`)
	}

	public static moduleExample(example:string) : void
	{
		// log(chalk`{gray {cyan Example:} 'app, app.core, app.core.services, etc' }`)
	}
	
/* ==========================================================================
	-- Index
========================================================================== */

	public static choice() : void
	{
		// log(chalk`{magenta What's your choice: }`)
	}
	
	public static numbersOnly() : void
	{
		// log(chalk`{red Error: {white Only numbers are allowed}}`)
		this.choice()
	}
	
	public static invalidOption() : void
	{
		// log(chalk`{red Error: {white Option must be between 1-3 }}`)
		this.choice()
	}
	
	public static bye() : void
	{
		// log(chalk`{cyan Bye}`)
	}
	
	public static welcome() : void
	{
// 		log(chalk.yellow(chalk`/* ==========================================================================
// 			{white Welcome to generator}
// ========================================================================== */

// {white Choose an option below:}
// ----------------------

// {white 1} - Module generator
// {white 2} - Component generator
// {white 3} - Exit
// 		`))
	
	}
}