define([
    'jqueryui',
    'lodash',
    'backbone',
    'jst',
    'models/modelMain',
    'views/viewLoader',
    'datepicker_localization' //this module doesn't create own global - only extends jquery ui
], function($, _, Backbone, JST, ModelMain, ViewLoader){
    var ViewMain = Backbone.View.extend({
        el: '.body',
        events:{
           
        },
        className: 'main-layout',
        initialize: function (){
            this.model=new ModelMain();
            window.globalData=this.model.toJSON(); //сразу же расширяем глобальный объект window.globalData
            this.setListeners();
            this.render();
            //GlobalEvents.trigger('may_i_change_tab', {index: 2});
        },
        setListeners:function (){
            this.listenTo(this.model, 'change', this.rewriteGlobalData);
            this.listenTo(GlobalEvents, 'widget:change', this.updateModel);
        },
        rewriteGlobalData:function (){
            window.globalData=this.model.toJSON();
        },
        updateModel:function (data){
			//alert('widget:change');
            this.model.set(data);
            //window.globalData=this.model.toJSON();
        },        
        initComponents:function (){
            this.viewLoader=new ViewLoader();
        },
        render: function(){
            this.$el.html(JST.mainLayout());
            this.$el.find('.datepicker').datepicker(); //jquery ui example
            this.initComponents();
			
            //GlobalEvents.trigger('loader_show');     
            //$("#datepicker" ).datepicker(); 
        }
    });
    // Наш модуль теперь вернёт наше представление
    return ViewMain;
});