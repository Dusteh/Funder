var MenuClass = {};
(function($){
    $(document).ready(function(){
        MenuClass.MenuModel = Backbone.Model.extend({
            url:'../menu'
        });
        
        MenuClass.MenuView = Backbone.View.extend({
           template:_.template($('#temp_menu').html()),
           initialize:function(){
               console.log('Menu Initialized');
               this.model.bind('change',this.render,this);
           },
           render:function(eventName){
                console.log('Render called');
                $(this.el).html(this.template(this.model.toJSON()));              
				var el = this.el;  
				var loginModel = new MenuClass.LoginModel();
				loginModel.fetch({
					type:'POST',
					success:function(){
                        console.log(loginModel.toJSON());
						if(loginModel.toJSON().loggedIn){
							var loggedIn = new MenuClass.LoggedInView({model:loginModel});
							$(el).find("#login").html(loggedIn.render().el);
						}else{
							var login = new MenuClass.LoginView();
							$(el).find("#login").html(login.render().el);
						}
					}
				});
			
                return this;
           },
           events:{
               "click li":"navigate"
           },
           navigate:function(event){               
               $(this.el).find("li").removeClass("active");
               $(event.target).parents("li").addClass("active");
           }
        });        
        
		MenuClass.LoginModel = Backbone.Model.extend({
			url:'../login'
		});

        MenuClass.LoginView = Backbone.View.extend({
           tagName:"div",
           template:_.template($("#temp_menu_login").html()),
           initialize:function(){
//               this.model.bind('change',this.render,this);
           },
           render:function(eventName){
               $(this.el).html(this.template());
               return this;
           },
           events:{
               "click button":"login",
               "keypress input":"login_press"
           },
           login:function(event){
				console.log('Login event');
				var loginModel = new MenuClass.LoginModel();
                
                var el = MenuClass.MenuView.el;
				loginModel.fetch({
                    type:'POST',
					data:{
						userName:$("#login_text").val(),
						password:$("#password").val()					
					},
                    processData:true,
					success:function(){
						if(loginModel.toJSON().loggedIn){
    						var loggedIn = new MenuClass.LoggedInView({model:loginModel});
							$(el).find("#login").html(loggedIn.render().el);
						}else{
							var login = new MenuClass.LoginView();
							$(el).find("#login").html(login.render().el);
						}
					},
					error:function(){
						console.log('error');
					}
				})
           },
           login_press:function(event){
            	if(event.which == 13){
					this.login(event);
				}
           }
           
        });

        MenuClass.LoggedInView = Backbone.View.extend({
			tagName:"div",
			template:_.template($("#temp_menu_loggedin").html()),
			initialize:function(){
				this.model.bind('change',this.render,this);
			},
			render:function(eventName){
                console.log("Menu LoggedInView:Render: ");
                console.log(this.model.toJSON());
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		});
        MenuClass.init = function(){            
            MenuClass.menuModel = new MenuClass.MenuModel();        
            MenuClass.menuModel.fetch({
               success:function(){
                    MenuClass.menuView = new MenuClass.MenuView({model:MenuClass.menuModel});
                    $("#menu_bar").html(MenuClass.menuView.render().el);
               } 
            });            
        }
        
        MenuClass.fixCSS = function(selectedMenu){
            console.log("Fixing CSS for "+selectedMenu)
            if(MenuClass.fixCSSTimeout){
                clearTimeout(MenuClass.fixCSSTimeout);
            }
            
            if(MenuClass.menuView != undefined){
                $(MenuClass.menuView.el).find(".active").removeClass("active");
                $(MenuClass.menuView.el).find("a[href='#"+selectedMenu+"']").parents("li").addClass("active");
            }else{//Wait till it is and then do it?
                MenuClass.fixCSSTimeout = setTimeout(function() {
                    MenuClass.fixCSS(selectedMenu);
                }, 10);
                
            }
        }
        
        MenuClass.init();
    });    
})(jQuery);
