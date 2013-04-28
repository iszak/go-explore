YUI.add('index-view', function (Y) {
    Y.IndexView = Y.Base.create('indexView', Y.View, [], {
        template: Y.one('#index-template').getHTML(),

        render: function () {
            var container = this.get('container');
            
            var template = new Y.Template(),
                html  = template.render(this.template);

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