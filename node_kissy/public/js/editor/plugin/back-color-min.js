/*
Copyright 2014, KISSY v1.42
MIT Licensed
build time: Jan 6 12:44
*/
KISSY.add("editor/plugin/back-color",["./color/btn","./back-color/cmd"],function(d,b){function c(a){this.config=a||{}}var e=b("./color/btn"),f=b("./back-color/cmd");d.augment(c,{pluginRenderUI:function(a){f.init(a);e.init(a,{defaultColor:"rgb(255, 217, 102)",cmdType:"backColor",tooltip:"\u80cc\u666f\u989c\u8272"})}});return c});