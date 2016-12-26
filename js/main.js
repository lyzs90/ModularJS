(function() {
    var people = {
        people: ['Will', 'Laura'],
        init: function() {
            this.cacheDOM(); // i.e. people.cacheDOM
            this.bindEvents(); // i.e. people.bindEvents
            this.render(); // i.e. people.render
        },
        cacheDOM: function() {
            this.$el = $('#peopleModule'); // good practice to prepend $ to indicate jquery obj searches
            this.$button = this.$el.find('button');
            this.$input = this.$el.find('input');
            this.$ul = this.$el.find('ul');
            this.template = this.$el.find('#people-template').html(); // no $ because its just going to be a html string
        },
        bindEvents: function() { // only responsible for binding events
            this.$button.on('click', this.addPerson.bind(this)); // context of 'this' will change to addPerson. so must rebind to people module.
            this.$ul.delegate('span.del', 'click', this.deletePerson.bind(this)); // delegate: Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.
        },
        render: function() { // only render methods interacts with html
            var data = {
                people: this.people
            };
            this.$ul.html(Mustache.render(this.template, data));
        },
        addPerson: function() {
            this.people.push(this.$input.val());
            this.render();
            this.$input.val('');
        },
        deletePerson: function(event) {
            var $remove = $(event.target).closest('li');
            var i = this.$ul.find('li').index($remove); // find the index of closest li
            this.people.splice(i, 1);
            this.render();
        }
    };

    people.init();
})()
