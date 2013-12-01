/**
 * How Backbone Route Controller
 * - Controlls the how we work page
 * - Created by DH on 05/25/2013
 */
var HowClass = {};
(function($){
    $(document).ready(function(){
        /**
         * How model 
         */
        HowClass.HowModel = Backbone.Model.extend({
            urlRoot:'../how'
        });
        HowClass.HowQACollection = Backbone.Collection.extend({
            url:'../how',
            model:HowClass.HowModel
        });
        /**
        * How View
        */
        HowClass.HowView = Backbone.View.extend({
            tagName:'div',
            template:_.template($('#temp_how').html()),
            initialize:function(){
                this.model.bind('change',this.render,this);               
            },
            render:function(){
                console.log(this.model.toJSON()[0]);
               $(this.el).html(this.template(this.model.toJSON()[0]));
               return this;
            }
        });
        /**
         * App router
         */
        HowClass.AppRouter = function(router){
           
           router.howQA = new HowClass.HowQACollection();
           var self = router;
           router.howQA.fetch({
               success:function(){
                    MenuClass.fixCSS('how');
                    self.howView = new HowClass.HowView({model:self.howQA});
                    $('#content').html(self.howView.render().el);        
               }
           })
           
        }
       
    });
})(jQuery)
