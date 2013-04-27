YUI.add('index-view', function (Y) {
    Y.IndexView = Y.Base.create('IndexView', Y.View, [], {
        modelList: Y.ItemList,

        render: function () {
            var name = this.get('name');
            this.get('container').set('text', 'Hello ' + (name || 'World') + '!');
            return this;
        }
    });
}, '0.0.1', {
    requires: ['view', 'item-list']
});