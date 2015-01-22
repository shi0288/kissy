/*
Copyright 2013, KISSY v1.42
MIT Licensed
build time: Dec 4 22:18
*/
KISSY.add("tree/node-xtpl",["component/extension/content-xtpl"],function(i,f,g,k){return function(d){var a,h=this,b;a=this.config.utils;"undefined"!==typeof k&&k.kissy&&(b=k);var n=a.runBlockCommand,e=a.renderOutput,g=a.getProperty,i=a.runInlineCommand,o=a.getPropertyOrRunCommand;a='<div id="ks-tree-node-row-';var c=o(h,d,{},"id",0,1);a+=e(c,!0);a+='"\n     class="';var c={},j=[];j.push("row");c.params=j;c=i(h,d,c,"getBaseCssClasses",2);a+=e(c,!0);a+="\n     ";var c={},j=[],m=g(h,d,"selected",0,3);
j.push(m);c.params=j;c.fn=function(a){var l;l="\n        ";var b={},c=[];c.push("selected");b.params=c;a=i(h,a,b,"getBaseCssClasses",4);l+=e(a,!0);return l+"\n     "};a+=n(h,d,c,"if",3);a+='\n     ">\n    <div id="ks-tree-node-expand-icon-';c=o(h,d,{},"id",0,7);a+=e(c,!0);a+='"\n         class="';c={};j=[];j.push("expand-icon");c.params=j;c=i(h,d,c,"getBaseCssClasses",8);a+=e(c,!0);a+='">\n    </div>\n    ';c={};j=[];m=g(h,d,"checkable",0,10);j.push(m);c.params=j;c.fn=function(a){var l;l='\n    <div id="ks-tree-node-checked-';
var b=o(h,a,{},"id",0,11);l+=e(b,!0);l+='"\n         class="';var b={},c=[],d=g(h,a,"checkState",0,12);c.push("checked"+d);b.params=c;a=i(h,a,b,"getBaseCssClasses",12);l+=e(a,!0);return l+'"></div>\n    '};a+=n(h,d,c,"if",10);a+='\n    <div id="ks-tree-node-icon-';c=o(h,d,{},"id",0,14);a+=e(c,!0);a+='"\n         class="';c={};j=[];j.push("icon");c.params=j;c=i(h,d,c,"getBaseCssClasses",15);a+=e(c,!0);a+='">\n\n    </div>\n    ';c={};j=[];j.push("component/extension/content-xtpl");c.params=j;b&&(f("component/extension/content-xtpl"),
c.params[0]=b.resolveByName(c.params[0]));b=i(h,d,c,"include",18);a+=e(b,!1);a+='\n</div>\n<div id="ks-tree-node-children-';b=o(h,d,{},"id",0,20);a+=e(b,!0);a+='"\n     class="';b={};c=[];c.push("children");b.params=c;b=i(h,d,b,"getBaseCssClasses",21);a+=e(b,!0);a+='"\n';b={};c=[];j=g(h,d,"expanded",0,22);c.push(j);b.params=c;b.fn=function(){return'\nstyle="display:none"\n'};c=b.fn;b.fn=b.inverse;b.inverse=c;a+=n(h,d,b,"if",22);return a+"\n>\n</div>"}});
KISSY.add("tree/node-render",["component/container","./node-xtpl","component/extension/content-render"],function(i,f){var g=f("component/container"),k=f("./node-xtpl"),d=f("component/extension/content-render");return g.getDefaultRender().extend([d],{beforeCreateDom:function(a,d){i.mix(a.elAttrs,{role:"tree-node","aria-labelledby":"ks-content"+a.id,"aria-expanded":a.expanded?"true":"false","aria-selected":a.selected?"true":"false","aria-level":a.depth,title:a.tooltip});i.mix(d,{expandIconEl:"#ks-tree-node-expand-icon-{id}",
rowEl:"#ks-tree-node-row-{id}",iconEl:"#ks-tree-node-icon-{id}",childrenEl:"#ks-tree-node-children-{id}",checkIconEl:"#ks-tree-node-checked-{id}"})},refreshCss:function(a,d){var b=this.control,g=b.get("iconEl"),e,f=b.get("expandIconEl"),k=b.get("childrenEl");d?(b="file-icon",e="expand-icon-{t}"):b.get("expanded")?(b="expanded-folder-icon",e="expand-icon-{t}minus"):(b="collapsed-folder-icon",e="expand-icon-{t}plus");g[0].className=this.getBaseCssClasses(b);f[0].className=this.getBaseCssClasses(i.substitute(e,
{t:a?"l":"t"}));k[0].className=this.getBaseCssClasses(a?"lchildren":"children")},_onSetExpanded:function(a){this.control.get("childrenEl")[a?"show":"hide"]();this.el.setAttribute("aria-expanded",a)},_onSetSelected:function(a){this.control.get("rowEl")[a?"addClass":"removeClass"](this.getBaseCssClasses("selected"));this.el.setAttribute("aria-selected",a)},_onSetDepth:function(a){this.el.setAttribute("aria-level",a)},_onSetCheckState:function(a){a=this.getBaseCssClasses("checked").split(/\s+/).join(a+
" ")+a;this.control.get("checkIconEl").removeClass(this.getBaseCssClasses("checked0 checked1 checked2")).addClass(a)},getChildrenContainerEl:function(){return this.control.get("childrenEl")}},{ATTRS:{contentTpl:{value:k}},HTML_PARSER:{rowEl:function(a){return a.one("."+this.getBaseCssClass("row"))},childrenEl:function(a){return a.one("."+this.getBaseCssClass("children"))},isLeaf:function(a){if(a.hasClass(this.getBaseCssClass("leaf")))return!0;if(a.hasClass(this.getBaseCssClass("folder")))return!1},
expanded:function(a){return"none"!==a.one("."+this.getBaseCssClass("children")).css("display")},expandIconEl:function(a){return a.one("."+this.getBaseCssClass("expand-icon"))},checkState:function(a){if(a=a.one("."+this.getBaseCssClass("checked")))for(var d="checked0 checked1 checked2".split(/\s+/),b=0;b<d.length;b++)if(a.hasClass(this.getBaseCssClass(d[b])))return b;return 0},iconEl:function(a){return a.one("."+this.getBaseCssClass("icon"))},checkIconEl:function(a){return a.one("."+this.getBaseCssClass("checked"))}}})});
KISSY.add("tree/node",["node","component/container","./node-render"],function(i,f){function g(a){if(a.target===this){var l=a.component,b=this.get("depth"),a=a.index,c=this.get("tree");c&&(e(c,l,b+1),p(this,a))}}function k(a){a.target===this&&(e(this.get("tree"),a.component),p(this,a.index))}function d(a){a.target===this&&this.el.setAttribute("aria-setsize",this.get("children").length)}function a(a){var b=a.get("parent"),b=(b=b&&b.get("children"))&&b[b.length-1];return!b||b===a}function h(a){var b=
a.get("isLeaf");return!(!1===b||void 0===b&&a.get("children").length)}function b(a){var c=a.get("children");return!a.get("expanded")||!c.length?a:b(c[c.length-1])}function n(b){b.get&&b.view&&b.view.refreshCss(a(b),h(b))}function e(a,b,c){void 0!==c&&b.set("depth",c);i.each(b.get("children"),function(b){"number"===typeof c?e(a,b,c+1):e(a,b)})}function p(a,b){n(a);for(var b=Math.max(0,b-1),c=a.get("children"),d,e=c.length;b<e;b++)d=c[b],n(d),d.el.setAttribute("aria-posinset",b+1)}var q=f("node"),o=
f("component/container"),c=f("./node-render"),j=q.all,m=q.KeyCode;return o.extend({bindUI:function(){this.on("afterAddChild",g);this.on("afterRemoveChild",k);this.on("afterAddChild afterRemoveChild",d)},syncUI:function(){n(this);d.call(this,{target:this})},handleKeyDownInternal:function(a){var c=!0,d=this.get("tree"),e=this.get("expanded"),h,g=this.get("isLeaf"),f=this.get("children");switch(a.keyCode){case m.ENTER:return this.handleClickInternal(a);case m.HOME:h=d;break;case m.END:h=b(d);break;case m.UP:h=
a=(a=this.prev())?b(a):this.get("parent");break;case m.DOWN:a=this.get("children");if(this.get("expanded")&&a.length)h=a[0];else{a=this.next();for(d=this;!a&&(d=d.get("parent"));)a=d.next();h=a}break;case m.LEFT:e&&(f.length||!1===g)?this.set("expanded",!1):h=this.get("parent");break;case m.RIGHT:if(f.length||!1===g)e?h=f[0]:this.set("expanded",!0);break;default:c=!1}h&&h.select();return c},next:function(){var a=this.get("parent"),b;if(!a)return null;a=a.get("children");b=i.indexOf(this,a);return b===
a.length-1?null:a[b+1]},prev:function(){var a=this.get("parent"),b;if(!a)return null;a=a.get("children");b=i.indexOf(this,a);return 0===b?null:a[b-1]},select:function(){this.set("selected",!0)},handleClickInternal:function(a){var b=j(a.target),c=this.get("expanded");this.get("tree").focus();this.callSuper(a);b.equals(this.get("expandIconEl"))?this.set("expanded",!c):(this.select(),this.fire("click"));return!0},createChildren:function(){this.renderChildren.apply(this,arguments);if(this===this.get("tree")){var a=
this.get("tree");a&&(e(a,this,0),p(this,0))}},_onSetExpanded:function(a){n(this);this.fire(a?"expand":"collapse")},_onSetSelected:function(a,b){var c=this.get("tree");if(!b||!b.byPassSetTreeSelectedItem)c.set("selectedItem",a?this:null)},expandAll:function(){this.set("expanded",!0);i.each(this.get("children"),function(a){a.expandAll()})},collapseAll:function(){this.set("expanded",!1);i.each(this.get("children"),function(a){a.collapseAll()})}},{ATTRS:{xrender:{value:c},checkable:{value:!1,view:1},
handleMouseEvents:{value:!1},isLeaf:{view:1},expandIconEl:{},iconEl:{},selected:{view:1},expanded:{sync:0,value:!1,view:1},tooltip:{view:1},tree:{getter:function(){for(var a=this;a&&!a.isTree;)a=a.get("parent");return a}},depth:{view:1},focusable:{value:!1},defaultChildCfg:{value:{xclass:"tree-node"}}},xclass:"tree-node"})});
KISSY.add("tree/tree-manager",["node","component/extension/delegate-children"],function(i,f){function g(){}var k=f("node"),d=f("component/extension/delegate-children"),a=i.UA.ieMode,h=k.Gesture,b=i.Features.isTouchEventSupported();g.ATTRS={showRootNode:{value:!0,view:1},selectedItem:{},focusable:{value:!0},handleMouseEvents:{value:!0}};i.augment(g,d,{isTree:1,__bindUI:function(){var d=this.get("prefixCls")+"tree-node",e=h.tap;b||(e+=a&&9>a?" dblclick ":"");this.$el.delegate(e,"."+d,this.handleChildrenEvents,
this)},_onSetSelectedItem:function(a,b){a&&b.prevVal&&b.prevVal.set("selected",!1,{data:{byPassSetTreeSelectedItem:1}})},_onSetShowRootNode:function(a){this.get("rowEl")[a?"show":"hide"]()}});return g});
KISSY.add("tree/control",["./node","./tree-manager"],function(i,f){var g=f("./node"),k=f("./tree-manager");return g.extend([k],{handleKeyDownInternal:function(d){var a=this.get("selectedItem");return a===this?this.callSuper(d):a&&a.handleKeyDownInternal(d)},_onSetFocused:function(d){this.callSuper(d);d&&!this.get("selectedItem")&&this.select()}},{ATTRS:{defaultChildCfg:{value:{xclass:"tree-node"}}},xclass:"tree"})});
KISSY.add("tree/check-node",["node","./node"],function(i,f){var g=f("node"),k=f("./node"),d=g.all,g=k.extend({handleClickInternal:function(a){var h=this.get("expanded"),b=this.get("expandIconEl"),f=this.get("tree"),e=d(a.target);f.focus();this.callSuper(a);if(e.equals(b))this.set("expanded",!h);else return a=this.get("checkState"),this.set("checkState",1===a?0:1),this.fire("click"),!0},_onSetCheckState:function(a){var d=this.get("parent"),b,f,e,g;(1===a||0===a)&&i.each(this.get("children"),function(b){b.set("checkState",
a)});if(d){b=0;g=d.get("children");for(f=0;f<g.length;f++){e=g[f];e=e.get("checkState");if(2===e){d.set("checkState",2);return}1===e&&b++}0===b?d.set("checkState",0):b===g.length?d.set("checkState",1):d.set("checkState",2)}}},{ATTRS:{checkIconEl:{},checkable:{value:!0,view:1},checkState:{value:0,sync:0,view:1},defaultChildCfg:{value:{xclass:"check-tree-node"}}},xclass:"check-tree-node"});g.CheckState={PARTIAL_CHECK:2,CHECK:1,EMPTY:0};return g});
KISSY.add("tree/check-tree",["./check-node","./tree-manager"],function(i,f){var g=f("./check-node"),k=f("./tree-manager");return g.extend([k],{handleKeyDownInternal:function(d){var a=this.get("selectedItem");return a===this?this.callSuper(d):a&&a.handleKeyDownInternal(d)},_onSetFocused:function(d,a){this.callSuper(d,a);d&&!this.get("selectedItem")&&this.select()}},{ATTRS:{defaultChildCfg:{value:{xclass:"check-tree-node"}}},xclass:"check-tree"})});
KISSY.add("tree",["tree/control","tree/node","tree/check-node","tree/check-tree"],function(i,f){var g=f("tree/control"),k=f("tree/node"),d=f("tree/check-node"),a=f("tree/check-tree");g.Node=k;g.CheckNode=d;g.CheckTree=a;return g});
