(function (ntils) {

  /**
   * 空函数
   */
  ntils.noop = function () { };

  /**
   * 验证一个对象是否为NULL
   * @method isNull
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isNull = function (obj) {
    return obj === null || typeof obj === "undefined";
  };

  /**
   * 除去字符串两端的空格
   * @method trim
   * @param  {String} str 源字符串
   * @return {String}     结果字符串
   * @static
   */
  ntils.trim = function (str) {
    if (this.isNull(str)) return str;
    if (str.trim) {
      return str.trim();
    } else {
      return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
    }
  };

  /**
   * 替换所有
   * @method replace
   * @param {String} str 源字符串
   * @param {String} str1 要替换的字符串
   * @param {String} str2 替换为的字符串
   * @static
   */
  ntils.replace = function (str, str1, str2) {
    if (this.isNull(str)) return str;
    return str.replace(new RegExp(str1, 'g'), str2);
  };

  /**
   * 从字符串开头匹配
   * @method startWith
   * @param {String} str1 源字符串
   * @param {String} str2 要匹配的字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  ntils.startWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === 0;
  };

  /**
   * 是否包含
   * @method contains
   * @param {String} str1 源字符串
   * @param {String} str2 检查包括字符串
   * @return {Boolean} 结果
   * @static
   */
  ntils.contains = function (str1, str2) {
    var self = this;
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) > -1;
  };

  /**
   * 从字符串结束匹配
   * @method endWidth
   * @param {String} str1 源字符串
   * @param {String} str2 匹配字符串
   * @return {Boolean} 匹配结果
   * @static
   */
  ntils.endWith = function (str1, str2) {
    if (this.isNull(str1) || this.isNull(str2)) return false;
    return str1.indexOf(str2) === (str1.length - str2.length);
  };

  /**
   * 是否包含属性
   * @method hasProperty
   * @param  {Object}  obj  对象
   * @param  {String}  name 属性名
   * @return {Boolean}      结果
   * @static
   */
  ntils.has = ntils.hasProperty = function (obj, name) {
    if (this.isNull(obj) || this.isNull(name)) return false;
    return (name in obj) || (obj.hasOwnProperty(name));
  };

  /**
   * 验证一个对象是否为Function
   * @method isFunction
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isFunction = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "function";
  };

  /**
   * 验证一个对象是否为String
   * @method isString
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isString = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'string' || obj instanceof String;
  };

  /**
   * 验证一个对象是否为Number
   * @method isNumber
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isNumber = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'number' || obj instanceof Number;
  };

  /**
   * 验证一个对象是否为Boolean
   * @method isBoolean
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isBoolean = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === 'boolean' || obj instanceof Boolean;
  };

  /**
   * 验证一个对象是否为HTML Element
   * @method isElement
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isElement = function (obj) {
    if (this.isNull(obj)) return false;
    if (window.Element) {
      return obj instanceof Element;
    }
    else {
      return (obj.tagName && obj.nodeType && obj.nodeName && obj.attributes && obj.ownerDocument);
    }
  };

  /**
   * 验证一个对象是否为HTML Text Element
   * @method isText
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isText = function (obj) {
    if (this.isNull(obj)) return false;
    return obj instanceof Text;
  };

  /**
   * 验证一个对象是否为Object
   * @method isObject
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isObject = function (obj) {
    if (this.isNull(obj)) return false;
    return typeof obj === "object";
  };

  /**
   * 验证一个对象是否为Array或伪Array
   * @method isArray
   * @param  {Object}  obj 要验证的对象
   * @return {Boolean}     结果
   * @static
   */
  ntils.isArray = function (obj) {
    if (this.isNull(obj)) return false;
    var v1 = Object.prototype.toString.call(obj) === '[object Array]';
    var v2 = obj instanceof Array;
    var v3 = !this.isString(obj) && this.isNumber(obj.length) && this.isFunction(obj.splice);
    var v4 = !this.isString(obj) && this.isNumber(obj.length) && obj[0];
    return v1 || v2 || v3 || v4;
  };

  /**
   * 验证是不是一个日期对象
   * @method isDate
   * @param {Object} val   要检查的对象
   * @return {Boolean}           结果
   * @static
   */
  ntils.isDate = function (val) {
    if (this.isNull(val)) return false;
    return val instanceof Date;
  };

  /**
   * 转换为数组
   * @method toArray
   * @param {Array|Object} array 伪数组
   * @return {Array} 转换结果数组
   * @static
   */
  ntils.toArray = function (array) {
    if (this.isNull(array)) return [];
    return Array.prototype.slice.call(array);
  };

  /**
   * 转为日期格式
   * @method toDate
   * @param {Number|String} val 日期字符串或整型数值
   * @return {Date} 日期对象
   * @static
   */
  ntils.toDate = function (val) {
    var self = this;
    if (self.isNumber(val))
      return new Date(val);
    else if (self.isString(val))
      return new Date(self.replace(self.replace(val, '-', '/'), 'T', ' '));
    else if (self.isDate(val))
      return val;
    else
      return null;
  };

  /**
   * 遍历一个对像或数组
   * @method each
   * @param  {Object or Array}   obj  要遍历的数组或对象
   * @param  {Function} fn            处理函数
   * @return {void}                   无返回值
   * @static
   */
  ntils.each = function (list, handler, scope) {
    if (this.isNull(list) || this.isNull(handler)) return;
    if (this.isArray(list)) {
      var listLength = list.length;
      for (var i = 0; i < listLength; i++) {
        var rs = handler.call(scope || list[i], i, list[i]);
        if (!this.isNull(rs)) return rs;
      }
    } else {
      for (var key in list) {
        var rs = handler.call(scope || list[key], key, list[key]);
        if (!this.isNull(rs)) return rs;
      }
    }
  };

  /**
   * 格式化日期
   * @method formatDate
   * @param {Date|String|Number} date 日期
   * @param {String} format 格式化字符串
   * @param {object} dict 反译字典
   * @return {String} 格式化结果
   * @static
   */
  ntils.formatDate = function (date, format, dict) {
    if (this.isNull(format) || this.isNull(date)) return date;
    date = this.toDate(date);
    dict = dict || {};
    var placeholder = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "w+": date.getDay(), //week
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var key in placeholder) {
      if (new RegExp("(" + key + ")").test(format)) {
        var value = placeholder[key];
        value = dict[value] || value;
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? value : ("00" + value).substr(("" + value).length));
      }
    }
    return format;
  };

  /**
   * 深度克隆对象
   * @method clone
   * @param {Object} obj 源对象
   * @return {Object} 新对象
   * @static
   */
  ntils.clone = function (obj, igonreArray) {
    if (this.isNull(obj) || this.isString(obj) || this.isNumber(obj) || this.isBoolean(obj) || this.isDate(obj)) {
      return obj;
    }
    var objClone = obj;
    try {
      objClone = new obj.constructor();
    } catch (ex) { }
    for (var key in obj) {
      if (objClone[key] != obj[key] && !this.contains(igonreArray, key)) {
        if (typeof (obj[key]) === 'object') {
          objClone[key] = this.clone(obj[key], igonreArray);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
    this.each(['toString', 'valueOf'], function (i, name) {
      if (this.contains(igonreArray, key)) return;
      objClone[name] = obj[name];
    }, this);
    return objClone;
  };

  /**
   * 拷贝对象
   * @method copy
   * @param {Object} obj1 源对象
   * @param {Object} obj2 目标对象
   * @static
   */
  ntils.copy = function (obj1, obj2, igonreArray, errorMessage) {
    obj2 = obj2 || {};
    this.each(obj1, function (name) {
      if (igonreArray && igonreArray.indexOf(name) > -1) {
        if (errorMessage) throw new Error(errorMessage.replace('{name}', name));
        return;
      }
      try {
        if (Object.getOwnPropertyDescriptor) {
          Object.defineProperty(obj2, name, Object.getOwnPropertyDescriptor(obj1, name));
        } else {
          obj2[name] = obj1[name];
        }
      } catch (ex) { }
    })
    return obj2;
  };

  /**
   * 定义不可遍历的属性
   **/
  ntils.defineFreezeProp = function (obj, name, value) {
    Object.defineProperty(obj, name, {
      value: value,
      enumerable: false,
      configurable: true, //能不能重写定义
      writable: false //能不能用「赋值」运算更改
    });
  };

  /**
   * 获取所有 key 
   */
  ntils.keys = function (obj) {
    if (Object.keys) return Object.keys(obj);
    var keys = [];
    this.each(obj, function (key) {
      keys.push(key);
    });
    return keys;
  };

  /**
   * 创建一个对象
   */
  ntils.create = function (proto) {
    if (Object.create) return Object.create(proto);
    return { __proto__: proto };
  };

  /**
   * 设置 proto
   */
  ntils.setProto = function (obj, prototype) {
    if (obj.__proto__) {
      return ntils.setPrototype(obj.__proto__);
    } else {
      obj.__proto__ = prototype;
    }
  };

  /**
   * 是否深度相等
   */
  ntils.deepEqual = function (a, b) {
    if (a === b) return true;
    if (!this.isObject(a) || !this.isObject(b)) return false;
    var aKeys = this.keys(a);
    var bKeys = this.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    var allKeys = aKeys.concat(bKeys);
    var checkedMap = this.create(null);
    var result = true;
    this.each(allKeys, function (i, key) {
      if (checkedMap[key]) return;
      if (!this.deepEqual(a[key], b[key])) result = false;
      checkedMap[key] = true;
    }, this);
    return result;
  };

  /**
   * 从一个数值循环到别一个数
   * @param {number} fromNum 开始数值
   * @param {Number} toNum 结束数值
   * @param {Number} step 步长值
   * @param {function} handler 执行函数
   * @returns {void} 无返回
   */
  ntils.fromTo = function (fromNum, toNum, step, handler) {
    if (!handler) handler = [step, step = handler][0];
    step = Math.abs(step || 1);
    if (fromNum < toNum) {
      for (var i = fromNum; i <= toNum; i += step) handler(i);
    } else {
      for (var i = fromNum; i >= toNum; i -= step) handler(i);
    }
  };

  /**
   * 生成一个Guid
   * @method newGuid
   * @return {String} GUID字符串
   * @static
   */
  ntils.newGuid = function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  /**
   * 对象变换
   **/
  ntils.map = function (list, fn) {
    var buffer = this.isArray(list) ? [] : {};
    this.each(list, function (name, value) {
      buffer[name] = fn(name, value);
    });
    return buffer;
  };

  /**
   * 通过路径设置属性值
   */
  ntils.setByPath = function (obj, path, value) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (index === path.length - 1) {
        obj[name] = value;
      } else {
        obj[name] = obj[name] || {};
        obj = obj[name];
      }
    }, this);
  };

  /**
   * 通过路径获取属性值
   */
  ntils.getByPath = function (obj, path) {
    if (this.isNull(obj) || this.isNull(path) || path === '') {
      return obj;
    }
    if (!this.isArray(path)) {
      path = path.replace(/\[/, '.').replace(/\]/, '.').split('.');
    }
    this.each(path, function (index, name) {
      if (this.isNull(name) || name.length < 1) return;
      if (!this.isNull(obj)) obj = obj[name];
    }, this);
    return obj;
  };

  /**
   * 数组去重
   **/
  ntils.unique = function (array) {
    if (this.isNull(array)) return array;
    var newArray = [];
    this.each(array, function (i, value) {
      if (newArray.indexOf(value) > -1) return;
      newArray.push(value);
    });
    return newArray;
  };

  /**
   * 解析 function 的参数列表
   **/
  ntils.getFunctionArgumentNames = function (fn) {
    if (!fn) return [];
    var src = fn.toString();
    var parts = src.split(')')[0].split('=>')[0].split('(');
    return (parts[1] || parts[0]).split(',').map(function (name) {
      return name.trim();
    }).filter(function (name) {
      return name != 'function';
    });
  };

  /**
   * 合并对象
   * @method mix
   * @return 合并后的对象
   * @param {Object} r 目标对象
   * @param {Object} s 源对象
   * @param {Boolean} ov 是否覆盖
   * @param {Object} wl 白名单
   * @param {Number} mode 模式
   * @param {Boolean} merge 深度合并
   */
  ntils.mix = function (r, s, ov, wl, mode, merge) {
    if (!s || !r) {
      return r || ntils;
    }
    //根据模式来判断，默认是Obj to Obj的  
    if (mode) {
      switch (mode) {
        case 1: // proto to proto  
          return ntils.mix(r.prototype, s.prototype, ov, wl, 0, merge);
        case 2: // object to object and proto to proto  
          ntils.mix(r.prototype, s.prototype, ov, wl, 0, merge);
          break; // pass through  
        case 3: // proto to static  
          return ntils.mix(r, s.prototype, ov, wl, 0, merge);
        case 4: // static to proto  
          return ntils.mix(r.prototype, s, ov, wl, 0, merge);
        default: // object to object is what happens below  
      }
    }
    // Maybe don't even need this wl && wl.length check anymore??  
    var i, l, p, type;
    //白名单如果有值，就对白名单里面的属性进行合并，如果有ov，那么就  
    if (wl && wl.length) {
      for (i = 0, l = wl.length; i < l; ++i) {
        p = wl[i];
        isObject = ntils.isObject(r[p]); //看具体的属性是什么类型的  
        if (s.hasOwnProperty(p)) { //如果这个属性是p自己的  
          if (merge && isObject) { //如果设定了merge并且属性是一个对象，那么就调用mix本身，把s[p]的属性加到r[p]上面  
            ntils.mix(r[p], s[p]);
          } else if (ov || !(p in r)) { //如果允许ov或者r里面没有p，那么就在r里面加上p这个属性  
            r[p] = s[p];
          }
        }
      }
    } else { //如果没有wl  
      for (i in s) { //遍历s里面的属性  
        if (s.hasOwnProperty(i)) { //如果i是s本身的属性，就按规则合并属性  
          if (merge && ntils.isObject(r[i], true)) {
            ntils.mix(r[i], s[i], ov, wl, 0, true); // recursive  
          } else if (ov || !(i in r)) {
            r[i] = s[i];
          }
        }
      }
    }
    return r;
  };

  /**
   * 缩短字符串
   */
  ntils.short = function (str, maxLength) {
    if (!str) return str;
    maxLength = maxLength || 40;
    var strLength = str.length;
    var trimLength = maxLength / 2;
    return strLength > maxLength ? str.substr(0, trimLength) + '...' + str.substr(strLength - trimLength) : str;
  };

  /**
   * 首字母大写
   */
  ntils.firstUpper = function (str) {
    if (this.isNull(str)) return;
    str[0] = str[0].toLowerCase();
    return str;
  };

  /**
   * 解析字符串为 dom 
   * @param {string} str 字符串
   * @returns {HTMLNode} 解析后的 DOM 
   */
  ntils.parseDom = function (str) {
    this._PARSER_DOM_DIV = this._PARSER_DOM_DIV || document.createElement('dev');
    this._PARSER_DOM_DIV.innerHTML = str;
    var domNodes = this.toArray(this._PARSER_DOM_DIV.childNodes);
    this._PARSER_DOM_DIV.innerHTML = '';
    return domNodes;
  };

})((typeof exports === 'undefined') ? (window.ntils = {}) : exports);