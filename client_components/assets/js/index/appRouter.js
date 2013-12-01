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
                "how":"how",
                "project":"project",
                "project/new":"project"
            },
            home:function(){HomeClass.AppRouter(this)},            
            search:function(){SearchClass.AppRouter(this)},
            how:function(){HowClass.AppRouter(this)},
            project:function(){console.log("In Projects");}
            
        });
        app = new AppRouter();
        Backbone.history.start();
    });
})(jQuery);
