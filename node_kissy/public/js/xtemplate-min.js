/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:19
*/
KISSY.add("xtemplate",["xtemplate/runtime","xtemplate/compiler"],function(g,h){function b(a,c){c=g.merge(k,c);if("string"===typeof a){var e=a,f=c,d;if(!f.cache||!(d=i[e]))d=j.compileToFn(e,f),f.cache&&(i[e]=d);a=d}b.superclass.constructor.call(this,a,c)}var a=h("xtemplate/runtime"),j=h("xtemplate/compiler"),i=b.cache={},k={cache:!0};g.extend(b,a,{},{compiler:j,Scope:a.Scope,RunTime:a,addCommand:a.addCommand,removeCommand:a.removeCommand});return b});
