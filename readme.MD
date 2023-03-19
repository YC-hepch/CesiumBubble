1.引入Bubble.js文件和popup.css
2. 初始化气泡对象 
      var popup = new Popup(viewer, {
            maxWidth: 300,
            minWidth: 300,
            maxHeight: 300
        });
3.传入展示内容
               position = Cesium.Cartesian3.fromDegrees(0, 0, 0);            
                var content = "<p>属性html</p><ul><li>1</li><li>2</li><li>3</li></ul>"         
                popup.showInfo(content, position)
具体参数见接口注释