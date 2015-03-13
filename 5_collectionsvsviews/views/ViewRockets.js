var UsersView = Backbone.View.extend({

    events: {
        "click .addObject": "addObject",
        "click [data-sort]": "renderList"
    },

    initialize: function() {
        this.template = _.template($('#viewUsers').html());
        this.$el.html(this.template());
        this.coll = new  UsersCollection();
        this.listenTo(this.coll, "all", this.render);
        this.listenTo(this.coll, "add", this.addOne);
    },

    render: function() {
        
        this.$('.users-count').text(this.coll.length);
    },

    addObject: function() {
        this.coll.add({});
    },

    addOne: function(model) {
        var view = new UsersView({model: model});
        this.$('.userslist').append(view.render());
    },

    renderList: function (e) {
        this.$('.userslist').html('');
        this.coll.sortParam = $(e.target).attr('data-sort');
        this.coll.sortMode = this.coll.sortMode*(-1);
        this.coll.sort();
        var that = this;
        this.coll.each(function(model,index){
            that.addOne(model);
        });
    }
    
});
