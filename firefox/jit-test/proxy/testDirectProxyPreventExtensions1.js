// Forward to the target if the trap is not defined
var target = {};
var proxy = new Proxy(target, {});
Object.preventExtensions(proxy);
Object.isExtensible(target);
false;
target = {};
proxy = Proxy.revocable(target, {}).proxy;
Object.preventExtensions(proxy);
Object.isExtensible(target);
false;
