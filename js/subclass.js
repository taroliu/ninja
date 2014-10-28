/**
 * subclassing.js Created by Taro on 2014/10/28.
 */
(function () {
  var initializing = false,
      superPattern =
          /xyz/.test(function () {
            xyz;
          }) ? /\b_super\b/ : /.*/;

  Object.subClass = function (properties) {
    console.log('111111 properties:');
    console.log(properties);
    var _super = this.prototype;
    console.log('22222222 _super:');
    console.log(_super);

    initializing = true;
    var proto = new this();
    console.log('33333333 super class *******');
    console.log(proto);
    console.log('44444444 super class end *******');
    initializing = false;

    for (var name in properties) {
      console.log(name);
      console.log(properties[name]);
      proto[name] = typeof properties[name] == 'function' &&
          typeof _super[name] == 'function' &&
          superPattern.test(properties[name]) ?

          // define overloading function
          (function (name, fn) {
            return function () {
              console.log('555555555 func name: '+name);
              var tmp = this._super;
              this._super = _super[name];
              var ret = fn.apply(this, arguments);
              this._super = tmp;
              return ret;
            };
          })(name, properties[name]) : properties[name];
    }

    function Class() {
      console.log('6666666 init Class: '+initializing);
      console.log('7777777 init func:');
      console.log(this.init);
      // All construction is actually done in the init method
      if (!initializing && this.init) {
        console.log('888888 call init method');
        this.init.apply(this, arguments);
      }
    }

    Class.prototype = proto;
    Class.constructor = Class;
    Class.subClass = arguments.callee;
    console.log('9999999 Class');

    return Class
  };
})();