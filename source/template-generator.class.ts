import { NameGenerator } from './name-generator.class'

export class TemplateGenerator
{	
	public static module(nameGenerator: NameGenerator) : string
	{
		return `import * as angular 				from 'angular'
import UIRouter 					from '@uirouter/angularjs'
import { Router } 					from './router'
import { StylusMagazineComponent } 	from './components/stylus-magazine'

export const StylusMagazineModule = angular
	.module("stylus.magazine", [ UIRouter ])
	.component(StylusMagazineComponent.alias, new StylusMagazineComponent())
	.config(Router)
		`
	}

	public static component(nameGenerator: NameGenerator) : string
	{
		return `import { ${ nameGenerator.controllerName } } from './${ nameGenerator.name }.controller'
import './${ nameGenerator.name }.style'
const template = require('./${ nameGenerator.name }.template')

export class ${ nameGenerator.componentName } implements ng.IComponentOptions
{
	public static alias = '${ nameGenerator.aliasName }'
	public controller: ng.Injectable<ng.IControllerConstructor>
	public controllerAs: string
	public template: string

	constructor() {
		this.controller = ${ nameGenerator.controllerName }
		this.controllerAs = "$ctrl"
		this.template = template()
	}
}
`
	}

	public static controller(nameGenerator: NameGenerator) : string
	{
		return `export class ${ nameGenerator.controllerName } implements ng.IComponentController
{

}
`
	}

	public static pug(nameGenerator: NameGenerator) : string
	{
		return `h2 ${ nameGenerator.captalizeName } Template`
	}

	public static stylus(nameGenerator: NameGenerator) : string
	{
		return `/* ==========================================================================
-- ${ nameGenerator.captalizeName } Component
========================================================================== */
`
	}
}