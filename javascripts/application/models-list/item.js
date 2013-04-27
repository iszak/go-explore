YUI.add('item-list', function (Y) {
    Y.ItemList = Y.Base.create('itemList', Y.ModelList, [], {
        comparator: function (model) {
            return model.get('distance');
        }
    });
}, '0.0.1', {
    requires: ['model-list']
});