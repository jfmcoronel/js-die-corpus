// Bug 1031632 - Map.prototype.set, WeakMap.prototype.set and
// Set.prototype.add should be chainable
var m = new Map();
m.set('oof', 'RAB');
m;
var a = m.set('foo', 'BAR').get('foo');
a;
'BAR';
