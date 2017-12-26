import { NameGenerator } from './name-generator.class'
import AngularComponent from '../angular-component'

export class TemplateGenerator
{	
	public static module(moduleNameGenerator: NameGenerator, componentNameGenerator: AngularComponent.NameGenerator) : string
	{
		return `import * as angular 				from 'angular'
import UIRouter 					from '@uirouter/angularjs'
import { Router } 					from './router'
import { ${ componentNameGenerator.componentName } } 				from './components/${ componentNameGenerator.name }'

export const ${ moduleNameGenerator.captalizeName }Module = angular
	.module("${ moduleNameGenerator.name }", [ UIRouter ])
	.component(${ componentNameGenerator.componentName }.alias, new ${ componentNameGenerator.componentName }())
	.config(Router)
		`
	}

	public static router(componentNameGenerator: AngularComponent.NameGenerator) : string
	{
		return `import { ${ componentNameGenerator.componentName } } from './components/${ componentNameGenerator.name }'

export const Router = (
	$stateProvider : ng.ui.IStateProvider, 
	$urlRouterProvider : ng.ui.IUrlRouterProvider
) => {
	
	$stateProvider.state('${ componentNameGenerator.name }', {
		url: '/${ componentNameGenerator.name }',
		component: ${ componentNameGenerator.componentName }.alias
	})
} 

Router.$inject = [
	'$stateProvider',
	'$urlRouterProvider'
]
		`
	}

}