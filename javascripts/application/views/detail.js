YUI.add('detail-view', function (Y) {
    Y.DetailView = Y.Base.create('detailView', Y.View, [], {
        template: Y.one('#detail-template').getHTML(),

        render: function () {
            var container = this.get('container');

            var template = new Y.Template(),
                html  = template.render(this.template, this.get('model').toJSON());

            container.setHTML(html);

            if (!container.inDoc()) {
                Y.one('body').append(container);
            }

            return this;
        }
    });
}, '0.0.1', {
    requires: ['view']
});