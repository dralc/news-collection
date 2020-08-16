# VSCode launch configs
```
{
	"name": "NPM run dev",
	"request": "launch",
	"runtimeArgs": [
		"run-script",
		"dev"
	],
	"runtimeExecutable": "npm",
	"skipFiles": [
		"<node_internals>/**"
	],
	"type": "pwa-node"
},
{
	"type": "node",
	"request": "launch",
	"name": "AVA",
	"runtimeExecutable": "${workspaceFolder}/node_modules/.bin/ava",
	"runtimeArgs": [
		"--config", "${workspaceFolder}/ava.config.js",
		"${file}",
	],
	"outputCapture": "std",
	"skipFiles": [
		"<node_internals>/**/*.js"
	]
}
```