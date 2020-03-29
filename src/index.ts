export function noop() { }

export function toString(obj: any) {
  return Object.prototype.toString.call(obj);
}

export function getType(obj: any) {
  let str = toString(obj);
  return /^\[object (.+)\]$/i.exec(str)[1];
}

/**
 * 验证一个对象是否为NULL
 * @method isNull
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isNull(obj: any) {
  return obj === undefined || obj === null;
}

/**
 * 验证一个对象是否为Function
 * @method isFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isFunction(obj: any) {
  if (isNull(obj)) return false;
  return typeof obj === "function";
}

/**
 * 验证一个对象是否为 AsyncFunction
 * @method isAsyncFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isAsyncFunction(obj: any) {
  if (isNull(obj)) return false;
  return getType(obj) === "AsyncFunction";
}

/**
 * 验证一个对象是否为 GeneratorFunction
 * @method isGeneratorFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isGeneratorFunction(obj: any) {
  if (isNull(obj)) return false;
  return getType(obj) === "GeneratorFunction";
}

/**
 * 验证一个对象是否为String
 * @method isString
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isString(obj: any) {
  if (isNull(obj)) return false;
  return getType(obj) === "String";
}

/**
 * 验证一个对象是否为Number
 * @method isNumber
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isNumber(obj: any) {
  if (isNull(obj)) return false;
  return getType(obj) === "Number";
}

/**
 * 验证一个对象是否为Boolean
 * @method isBoolean
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isBoolean(obj: any) {
  if (isNull(obj)) return false;
  return getType(obj) === "Boolean";
}

/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isElement(obj: any) {
  if (isNull(obj)) return false;
  if (typeof Element !== "undefined") {
    return obj instanceof Element;
  } else {
    return (
      obj.tagName &&
      obj.nodeType &&
      obj.nodeName &&
      obj.attributes &&
      obj.ownerDocument
    );
  }
}

/**
 * 验证一个对象是否为HTML Text Element
 * @method isText
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isText(obj: any) {
  if (isNull(obj)) return false;
  return obj instanceof Text;
}

/**
 * 验证一个对象是否为Object
 * @method isObject
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isObject(obj: any) {
  if (isNull(obj)) return false;
  const type = getType(obj);
  return type === "Object" || type === "Array";
}

/**
 * 验证一个对象是否为Array或伪Array
 * @method isArray
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isArray(obj: any): boolean {
  if (isNull(obj)) return false;
  const v1 = getType(obj) === "Array";
  const v2 = obj instanceof Array;
  const v3 = !isString(obj) && isNumber(obj.length) && isFunction(obj.splice);
  const v4 = !isString(obj) && isNumber(obj.length) && obj[0];
  return v1 || v2 || v3 || v4;
}

/**
 * 验证一个对象是否为typed array
 * @method isTypedArray
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isTypedArray(obj: any) {
  return ArrayBuffer.isView(obj) && !(obj instanceof DataView);
}

/**
 * 验证是不是一个日期对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
export function isDate(val: any) {
  if (isNull(val)) return false;
  return val instanceof Date;
}

export function isRegExp(val: any) {
  return val instanceof RegExp;
}

export function toArray<T = any>(array: any): T[] {
  if (isNull(array)) return [];
  return Array.prototype.slice.call(array);
}

export function toDate(val: any): Date {
  if (isNumber(val)) {
    return new Date(val);
  } else if (isDate(val)) {
    return val;
  } else if (isString(val)) {
    return new Date(replace(replace(val, "-", "/"), "T", " "));
  } else {
    return null;
  }
}

export function replace(str: string, from: string, to: string) {
  if (isNull(str)) return str;
  return str.replace(new RegExp(from, "g"), to);
}

export function formatDate(
  value: Date | number | string,
  format: string,
  dict?: any
): string {
  if (isNull(format) || isNull(value)) return String(value);
  const date = toDate(value);
  dict = dict || {};
  const placeholder: any = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "h+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "w+": date.getDay(), // week
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    // tslint:disable-next-line
    "S": date.getMilliseconds() // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let key in placeholder) {
    if (new RegExp("(" + key + ")").test(format)) {
      let value = placeholder[key];
      value = dict[value] || value;
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? value
          : ("00" + value).substr(("" + value).length)
      );
    }
  }
  return format;
}

export function copy(src: any, dst?: any, igonres?: string[]) {
  dst = dst || (isArray(src) ? [] : {});
  Object.keys(src).forEach((key: string) => {
    if (igonres && igonres.indexOf(key) > -1) return;
    delete dst[key];
    if (Object.getOwnPropertyDescriptor) {
      try {
        Object.defineProperty(
          dst,
          key,
          Object.getOwnPropertyDescriptor(src, key)
        );
      } catch (ex) {
        dst[key] = src[key];
      }
    } else {
      dst[key] = src[key];
    }
  });
  return dst;
}

export function clone(src: any, igonres?: string[]) {
  if (
    isNull(src) ||
    isString(src) ||
    isNumber(src) ||
    isBoolean(src) ||
    isDate(src)
  ) {
    return src;
  }
  if (isTypedArray(src)) {
    return src.slice();
  }
  let objClone: any;
  try {
    objClone = new src.constructor();
  } catch {
    objClone = {};
  }
  Object.entries(src).forEach(([key, value]) => {
    if (objClone[key] !== value && !igonres.includes(key)) {
      if (isObject(value)) {
        objClone[key] = clone(value, igonres);
      } else {
        objClone[key] = value;
      }
    }
  });
  ["toString", "valueOf"].forEach(key => {
    if (igonres.includes(key)) return;
    final(objClone, key, src[key]);
  });
  return objClone;
}

/**
 * 合并对象
 * @method mix
 * @return 合并后的对象
 * @param {Object} dst 目标对象
 * @param {Object} src 源对象
 * @param {Array} igonres 忽略的属性名,
 * @param {Number} mode 模式
 */
export function mix(
  dst: any,
  src: any,
  igonres?: string[],
  mode?: 0 | 1 | 2 | 3 | 4,
  igonreNull?: boolean
): any {
  // 根据模式来判断，默认是Obj to Obj的
  if (mode) {
    switch (mode) {
      case 1: // proto to proto
        return mix(dst.prototype, src.prototype, igonres, 0);
      case 2: // object to object and proto to proto
        mix(dst.prototype, src.prototype, igonres, 0);
        break; // pass through
      case 3: // proto to static
        return mix(dst, src.prototype, igonres, 0);
      case 4: // static to proto
        return mix(dst.prototype, src, igonres, 0);
      default: // object to object is what happens below
    }
  }
  // ---
  src = src || {};
  dst = dst || (isArray(src) ? [] : {});
  Object.keys(src).forEach(key => {
    if (igonres.includes(key)) return;
    if (igonreNull && isNull(src[key])) return;
    if (
      isObject(src[key]) &&
      (src[key].constructor === Object ||
        src[key].constructor === Array ||
        src[key].constructor === null)
    ) {
      dst[key] = mix(dst[key], src[key], igonres, 0, igonreNull);
    } else {
      dst[key] = src[key];
    }
  });
  return dst;
}

export function final(obj: any, name: string, value: any): void {
  if (arguments.length === 0) throw new Error("Parameter missing");
  if (arguments.length === 1) {
    return Object.entries(obj).forEach(([name, value]) => {
      final(obj, name, value);
    });
  }
  if (arguments.length === 2) return final(obj, name, obj[name]);
  try {
    Object.defineProperty(obj, name, {
      get() {
        return value;
      },
      set() {
        throw new Error("Cannot assign to final property:" + name);
      },
      enumerable: false, // 不能枚举
      configurable: false // 不能重写定义
    });
  } catch (err) {
    obj[name] = value;
  }
}

export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  const allKeys = aKeys.concat(bKeys);
  return !allKeys.some(key => !deepEqual(a[key], b[key]));
}

export function fromTo(
  from: number,
  to: number,
  handler: (value?: number) => void,
  step = 1
) {
  step = Math.abs(step || 1);
  if (from < to) {
    for (let i = from; i <= to; i += step) handler(i);
  } else {
    for (let i = from; i >= to; i -= step) handler(i);
  }
}

export function newGuid() {
  const s4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

export function setByPath(obj: any, path: string | string[], value: any) {
  if (isNull(obj) || isNull(path) || path === "") {
    return;
  }
  if (!isArray(path)) {
    path = (path as string)
      .replace(/\[/, ".")
      .replace(/\]/, ".")
      .split(".");
  }
  (path as string[]).forEach((name, index) => {
    if (isNull(name) || name.length < 1) return;
    if (index === path.length - 1) {
      obj[name] = value;
    } else {
      obj[name] = obj[name] || {};
      obj = obj[name];
    }
  });
}

export function getByPath(
  obj: any,
  path: string | string[],
  filter?: (valeu?: any, key?: string, obj?: any) => boolean
) {
  if (isNull(obj) || isNull(path) || path === "") return obj;
  if (!isArray(path)) {
    path = (path as string)
      .replace(/\[/, ".")
      .replace(/\]/, ".")
      .split(".");
  }
  (path as string[]).forEach(name => {
    if (isNull(obj) || isNull(name) || name.length < 1) return;
    obj = filter ? filter(obj[name], name, obj) : obj[name];
  });
  return obj;
}

export function getFunctionArgumentNames(fn: Function) {
  if (!fn) return [];
  const src = fn.toString();
  const parts = src
    .split(")")[0]
    .split("=>")[0]
    .split("(");
  return (parts[1] || parts[0])
    .split(",")
    .map(name => (name || "").trim())
    .filter(name => name !== "function");
}

export const FUNC_REGEXP = /^function\s*\(([\s\S]*?)\)\s*\{([\s\S]*?)\}$/i;

export function isFunctionString(str: string) {
  return FUNC_REGEXP.test(str);
}

export function toFunction(str: string) {
  const info = FUNC_REGEXP.exec(str);
  if (!info || info.length < 3) return;
  const params = info[1]
    .split(",")
    .filter(p => !!p)
    .map(p => p.trim());
  const body = info[2];
  // tslint:disable-next-line
  return new Function(...params, body);
}

export function short(str: string, maxLength: number) {
  if (!str) return str;
  maxLength = maxLength || 40;
  let strLength = str.length;
  let trimLength = maxLength / 2;
  return strLength > maxLength
    ? str.substr(0, trimLength) + "..." + str.substr(strLength - trimLength)
    : str;
}

export function firstUpper(str: string) {
  if (!isString(str)) return "";
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

export function escapeRegExp(str: string) {
  if (!isString(str)) return "";
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function toCamelCase(str: string, mode: 1 | 0) {
  if (!isString(str)) return "";
  if (str) {
    str = str.replace(/\-[a-z0-9]/g, $1 => {
      return $1.slice(1).toUpperCase();
    });
    str = str.replace(/^[a-z]/i, $1 => {
      return mode ? $1.toUpperCase() : $1.toLowerCase();
    });
  }
  return str;
}

export function toSplitCase(str: string) {
  if (!isString(str)) return "";
  if (str) {
    str = str.replace(/([A-Z])/g, "-$1");
    if (str[0] === "-") str = str.slice(1);
  }
  return str.toLowerCase();
}

export function htmlPrefilter(html: string) {
  if (!html) return "";
  const rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  return html.replace(rxhtmlTag, "<$1></$2>");
}

export function parseHTML(str: string) {
  str = str || " ";
  const parent = document.createElement("div");
  parent.innerHTML = htmlPrefilter(str);
  const childNodes = toArray<ChildNode>(parent.childNodes);
  // 先 clone 一份再通过 innerHTML 清空
  // 否则 IE9 下，清空时会导不通过返回的 DOM 没有子结点
  // if (firstNode) firstNode = firstNode.cloneNode(true);
  // window._NPH_.innerHTML = '';
  childNodes.forEach(childNode => parent.removeChild(childNode));
  return childNodes;
}
