var app;
(function($){
    $(document).ready(function(){
        //Views
    //    var menuBarView = Backbone.Model.extend({
    //        
    //    });
    //    
    //    var loginView = Backbone.Model.extend({
    //        
    //    });
    //    
    //    var newProjectView = Backbone.Model.extend({
    //        
    //    });
        
        var AppRouter = Backbone.Router.extend({
            routes:{
                "":"home",
                "home":"home",
                "search":"search",
                "how":"how"
            },
            home:function(){HomeClass.AppRouter(this)},            
            search:function(){SearchClass.AppRouter(this)},
            how:function(){
               console.log('How Called')
            }
        });
        app = new AppRouter();
        Backbone.history.start();
    });
})(jQuery);
