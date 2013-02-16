/**
* HomeClass
* Contains the model and view controler for the /home and / routes
* Created by DH on 02/16/2013
*/
var SearchClass = {};
(function($){
    $(document).ready(function(){    
        /**
         * Search Model
         */
        SearchClass.SearchModel = Backbone.Model.extend({
            urlRoot:'../search'
        });
        /**
         * Search Model Collection
         */
        SearchClass.SearchModelCollection = Backbone.Collection.extend({
            url:'../search',
            model:SearchClass.SearchModel 
        });
        
        /**
         * Search View
         */
        SearchClass.SearchView = Backbone.View.extend({  
            tagName:'div',
            template:_.template($('#temp_search').html()),
            initialize:function(){
                console.log("Search View Initialized")
                this.model.bind('change',this.render,this);
            },
            render:function(){
                console.log('Render called');
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            }
        });
        
        /**
         * App Router
         */
        SearchClass.AppRouter = function(router){
           console.log('Search Called')
           router.search = new SearchClass.SearchModelCollection();
           var self = router;
           router.search.fetch({
              success:function(){                      
                  console.log("Success Search Fetch");
                  MenuClass.fixCSS('search');
                  self.searchView = new SearchClass.SearchView({model:self.search});                      
                  $('#content').html(self.searchView.render().el);
              } 
           });
       }
    })
})(jQuery);
    
        