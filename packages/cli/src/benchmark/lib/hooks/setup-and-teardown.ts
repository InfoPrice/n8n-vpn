import Container from 'typedi';
import { Config } from '@oclif/core';
import { Start } from '@/commands/start';
import { n8nDir } from './n8nDir';
import { ActiveWorkflowRunner } from '@/ActiveWorkflowRunner';
import { seedInstanceOwner, seedWorkflows } from './seed';
import { log } from '../log';

let main: Start;

export async function setup() {
	n8nDir();

	main = new Start([], new Config({ root: __dirname })); // @TODO: Silence stdout

	await main.init();
	await main.run();

	await seedInstanceOwner();
	const files = await seedWorkflows();

	await Container.get(ActiveWorkflowRunner).init();

	log('Activated workflows', files);
}

export async function teardown() {
	await main.stopProcess();
}