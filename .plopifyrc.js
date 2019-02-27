module.exports = {
	prompts: [{
		name: 'project_name',
		message: 'Project name:',
		validate: (input) => /^[a-z0-9\-]+$/.test(input) ? true : 'Must be a dash-case-name'
	}, {
		type: 'emoji',
		name: 'project_emoji',
		message: 'Project emoji:'
	}, {
		name: 'github_username',
		message: 'GitHub Username:'
	}, {
		name: 'author_name',
		message: 'Author Name:',
	}, {
		name: 'author_email',
		message: 'Author Email:',
		validate: (input) => /^[^@]+@[^.]+\..+$/.test(input) ? true : 'Please enter a valid email address'
	}],
	updatePolicies: [{
		patternFromFile: '.gitignore',
		pattern: [
			'yarn.lock',
			'CHANGELOG.md',
			'test/**/*',
			'src/**/*'
		],
		action: 'ignore'
	}, {
		pattern: '.plopifyrc.json',
		action: 'accept'
	}, {
		pattern: 'README.md',
		action: 'ask',
		granularity: 'blocks'
	}],
	hooks: {
		postGenerate: [
			'yarn install',
			'git init',
			'git add .',
			'git commit -a -m "chore: initial project scaffolding"',
			'plopify svc github-create {{project_name}}',
			'git remote add origin https://github.com/{{github_username}}/{{project_name}}.git',
			'plopify svc travis-enable {{github_username}}/{{project_name}}',
			'plopify svc coveralls-enable {{github_username}}/{{project_name}}',
			'git push -u origin master'
		],
		postUpdate: [
			'yarn install'
		]
	}
};
