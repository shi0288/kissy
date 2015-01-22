KISSY.add("vs-round-input", ["./node", "./base"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    function VsRoundInput(container, config) {
        var self = this;
        if (!(self instanceof VsRoundInput)) {
            return new VsRoundInput(container, config);
        }
        /**
         * 容器元素
         * @type {Element}
         */
        self.container = container = S.one(container);
        if (!container) return;
        VsRoundInput.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsRoundInput, Base);

    VsRoundInput.ATTRS = {
        width:{
            value:190
        },
        height:{
            value:30
        },
        focusout:{
            value:null
        }
    };

    S.augment(VsRoundInput, {
        _init:function()
        {
            var self = this;
            var initValue = self.container.attr("initValue");
            if(!initValue)
            {
                initValue = "";
            }
            //self.container.html('<input type="text" style="width:172px;" value="请选择父级"/>');
            self.container.append('<div class="clearfix"><div class="vs_div_table_border_head_left"></div><div class="vs_div_table_border_head"></div><div class="vs_div_table_border_head_right"></div></div>');
            self.container.append('<div class="clearfix"><div class="vs_div_table_border_content_left"></div><div class="vs_div_table_border_content"></div><div class="vs_div_table_border_content_right"></div></div>');
            self.container.append('<div class="clearfix"><div class="vs_div_table_border_bottom_left"></div><div class="vs_div_table_border_bottom"></div><div class="vs_div_table_border_bottom_right"></div></div>');
            //设置中间行的宽度
            var divList = self.container.children();
            S.each(divList, function(row){
                var trueWidth = self.get("width") - 40;
                var middleDiv = Node.one(row.childNodes[1]);
                middleDiv.css("width", trueWidth);
            });
            var setHDiv = divList[1];
            S.each(setHDiv.childNodes, function(item){
                var trueHeight = self.get("height") - 40;
                var middleDiv = Node.one(item);
                middleDiv.css("height", 0);
                middleDiv.css("font-size", "0px");
            });
            var headDiv = divList[0];
            S.each(headDiv.childNodes, function(item){
                var trueHeight = 10;
                var headChildDiv = Node.one(item);
                headChildDiv.css("height", trueHeight);
                headChildDiv.css("font-size", trueHeight + "px");
            });
            var btmDiv = divList[2];
            S.each(btmDiv.childNodes, function(item){
                var trueHeight = 20;
                var btmChildDiv = Node.one(item);
                btmChildDiv.css("height", trueHeight);
                btmChildDiv.css("font-size", trueHeight + "px");
            });

            var cWidth = self.get("width") - 16;
            var cHeight = self.get("height") - 10;
            var cTable = Node.one('<div class="clearfix"></div>');
            var cTableContent = Node.one('<div style="overflow-x: hidden;padding:1px;position:absolute;left:8px;top:6px;width:' + (cWidth - 1) + 'px;height:' + cHeight + 'px;"></div>');
            self.cInput = Node.one('<input type="text" value="' + initValue + '" style="width:' + (cWidth-4) + 'px;height:' + (cHeight - 4) + 'px;border:none;outline:none;"/>');
            cTableContent.append(self.cInput);
            cTable.append(cTableContent);
            self.container.append(cTable);

            var fOutFn = self.get("focusout");
            if(fOutFn)
            {
                self.cInput.on("focusout", fOutFn)
            }
        },
        setData:function(data)
        {
            var self = this;
            self.cInput.val(data);
        },
        getData:function()
        {
            var self = this;
            return self.cInput.val();
        }
    });
    return VsRoundInput;
});