// in JS, everything wrapped in parenthesis gets evaluated, then you can execute it right away. i.e. (function(name){//some code...})("Will"). No need for init function because IIFE is immediately executed

var people = (function() {
    var people = ['Will', 'Laura'];

    // cache DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    // bind events
    $button.on('click', addPerson);
    $ul.delegate('span.del', 'click', deletePerson);

    _render(); // use _ to indicate private methods

    function _render() {
        $ul.html(Mustache.render(template, {people: people}));
    }

    function addPerson(value) { // expose as API for other methods to call i.e. people.addPerson('Jasmine')
        var name = (typeof value === "string") ? value : $input.val();
        people.push(name);
        _render();
        $input.val('');
    }

    function deletePerson(event) { // expose as API for other methods to call i.e. people.deletePerson(1)
        var i;
        if (typeof event === "number") {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            var i = $ul.find('li').index($remove);
        }
        people.splice(i, 1);
        _render();
    }

    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    };

})();
