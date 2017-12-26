import * as readline from 'readline'

export function readLineData(message:any, example:any) : Promise<string>
{
	return new Promise((res:any, rej:any) => {

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		message()
		example()

		rl.on('line', (line:string) => {
			rl.close()
			res(line)
		})

	})
}