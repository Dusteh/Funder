/**
* HomeClass
* Contains the model and view controler for the /home and / routes
* Created by DH on 02/16/2013
*/
var HomeClass = {};
(function($){
    $(document).ready(function(){
        /**
         * Model of news that belongs to the home class
         */
        HomeClass.HomeModel = Backbone.Model.extend({
           urlRoot:'../home' 
        });
        /**
         *Collection of HomeModel(s) 
         */
        HomeClass.HomeModelCollection = Backbone.Collection.extend({
           url:'../home',
           model:HomeClass.HomeModel
        });
        /**
         * View Controler for all of the Home class
         */
        HomeClass.HomeView = Backbone.View.extend({
            tagName:'div', 
            template:_.template($('#temp_home').html()),
            initialize:function(){
                console.log('Initialized Home View');
                this.model.bind('change',this.render,this);
               
            },
            render:function(eventName){
                console.log('HomeView Render called');
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            }
        });
        /**
         * Routing function
         */
        HomeClass.AppRouter = function(router){            
            console.log('Home called');
            router.home = new HomeClass.HomeModelCollection();
            var self = router;
            router.home.fetch({
                success:function(){
                    console.log('Success Home Fetch');
                    MenuClass.fixCSS('home');
                    self.homeView = new HomeClass.HomeView({model:self.home});
                    $('#content').html(self.homeView.render().el);
                }
            });   
        }
    })
})(jQuery);