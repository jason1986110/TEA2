---
layout: guide
title: Config
date: 2015-01-25
---

#Config

##Overview
In this chapter, we introduce how to configure a module in order to make better use of this framework.

##Base Usage

###Set Config Value

~~~js
demo.config(key,value);
//demo is a module
~~~
Key is the name of the option you desire to change and value is what you want it to be.

###Get Config Value

~~~js
var val=demo.config(key);
//the option of key
var opt=demo.config();
//get all config values
~~~

###Load The Config
It's not enough to make your config effective just calling config function, you need to reload the module after the config process.

~~~js
demo.config(key,val);
...
demo.load();
~~~

##Namespace
The namespace part has been explained in the [module chapter](http://zetajs.io/guide/Module.html).

##What To Config

###Specific Directory

The root variable equals to the prefix of your all path while the public means the prefix of the static files' path.

~~~js
//default option
demo.config('root',process.cwd());
demo.config('public',"public");
~~~

###Display Option
- loadinfo:Boolean
True means to print detailed information in the load process, default option is false.

~~~js
//default
demo.config('loadinfo',false);
~~~

- debug:Boolean
True means to print the detailed debug information,default option is true.

~~~js
demo.config('debug',true);
~~~

###Static Server
- indexFile:Array, the suffix of index files that will be searched automatically.

~~~js
//default option
demo.config.of('built-in').of('static-server').val('indexFile', ['.html', '.htm', '.md']);
~~~

- processFun:Object

~~~js
//default option
demo.config.of('built-in').of('static-server').val('processFun', {});
~~~

###Error Handler
- guard:Boolen
True means that you can use the guard service to handle those errors occurred in handlers, default option is false.

~~~js
//default option
demo.config('guard',false);
~~~

- globalDomain:Boolean
True means using one single global domain for your global EventEmitter instances for exception handling, default option is false.

~~~js
//default option
demo.config('globalDomain',false);
~~~

###Other
- serviceCache:Boolean
True means reading service from cache in order to speed up, default is true.

~~~js
//default option
demo.config('serviceCache',true);
~~~