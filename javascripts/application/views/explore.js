YUI.add('explore-view', function (Y) {
    Y.ExploreView = Y.Base.create('exploreView', Y.View, [], {
        template: Y.one('#explore-template').getHTML(),
        
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
    requires: ['view']
});