YUI.add('index-view', function (Y) {
    Y.IndexView = Y.Base.create('indexView', Y.View, [], {
        template: Y.one('#index-template').getHTML(),

        initializer: function () {
            var list = this.get('modelList');

            list.after(['add', 'remove', 'reset'], this.render, this);
            list.after('*:change', this.render, this);
        },


        render: function () {
            var container = this.get('container');

            var template = new Y.Template(),
                html  = template.render(this.template, this.get('modelList').toJSON());

            container.setHTML(html);

            if (!container.inDoc()) {
                Y.one('body').append(container);
            }

            return this;
        }
    });
}, '0.0.1', {
    requires: ['view', 'template', 'item-list']
});