// створення обєкта
var app = app || {};

$(function () {

    //створення прототипу моделі
    app.MyObject = Backbone.Model.extend({
        //стандартні властивості
        defaults: {
            name: "name",
            description: "-",
            size: 100
        },

        //ініціалізація створення обєкту
        initialize: function() {
            console.log('obj created');

            //слухаємо змінни обєкта
            this.on('change',function(){
                console.log('obj changed');
                //получаємо тільки змінений атрибут
                var json = this.changedAttributes();
                console.log(json);
            });
        },

        //валідатор розміру
        validate: function(attrs) {
            if (attrs.size>500) {
                console.log('Incorrect size');
                return 'Incorrect size';
            }
            //якщо менше 500 нічого не повертаємо
        },

        //функія яка збільшує розмір
        increaseSize: function() {
            this.set({
                size: this.get('size')+100
            },{
                validate:true //перевірка на валідність
            });
        }
    });

    //створюєм обєкт 
    app.myObject = new app.MyObject({
        name: "rocket",
        description: "super"
    });

    //створюмо нові атрибути
    app.myObject.set({
        size: 250,
        type: 'active'
    });

    //збільшуємо розмір при нажиманні на кнопку
    $('#b1').live('click',function(){
        app.myObject.increaseSize();
    });

});
