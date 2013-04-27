YUI.add('indexView', function (Y) {
    Y.IndexView = Y.Base.create('indexView', Y.View, [], {
        render: function () {
            var name = this.get('name');
            this.get('container').set('text', 'Hello ' + (name || 'World') + '!');
            return this;
        }
    });
}, '0.0.1', {
    requires: ['view']
});