# LoopBack + webpack build example

This is a fork of the [Getting started with LoopBack](http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack) tutorial demonstrating how to build a LoopBack application with [webpack](https://webpack.github.io/). Specifically we handle issues relating to [loopback-boot](https://apidocs.strongloop.com/loopback-boot/) and associated dynamic module dependencies.

This follows the general outline of [Simon Degraeve](https://github.com/SimonDegraeve)'s [loopback-webpack-plugin](https://github.com/SimonDegraeve/loopback-webpack-plugin) which appears to have been abandoned and no longer working. We also draw on ideas from [webpack-node-externals](https://github.com/liady/webpack-node-externals).

The key features of the approach are:
* Rather than call `boot()` at runtime, we perform a `loopback-boot` *compile* at build time and store the resulting boot instructions as a bundled JSON resource.
* At runtime, we just call the `loopback-boot` executor to perform the boot. This avoids many problems trying to bundle the compiler and also provides much faster boot times for complex applications.
* We specify which `node_modules` dependencies will be bundled (internalized) and which will not. `loopback-boot/lib/executor` must be bundled so webpack can handle resolution of models, boot scripts, etc.
* Dynamic configuration files (such as `config.json` and `datasources.json`) are excluded from the bundle (externalized) so that they can be modified without re-building.
* [gulp](http://gulpjs.com) is used trivially to perform the build.

#### Installation

```bash
git clone git://github.com/zamb3zi/loopback-getting-started
cd loopback-getting-started
npm install
gulp
node build/main.bundle.js
```

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
