export function noop() {}

export function toString(value: any) {
  return Object.prototype.toString.call(value);
}

export function getType(value: any) {
  let str = toString(value);
  return /^\[object (.+)\]$/i.exec(str)[1];
}

/**
 * 验证一个对象是否为NULL
 * @method isNull
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}       结果
 * @static
 */
export function isNull(value: any): value is null {
  return value === undefined || value === null;
}

/**
 * 验证一个对象是否为Function
 * @method isFunction
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isFunction(value: any): value is Function {
  if (isNull(value)) return false;
  return typeof value === "function";
}

/**
 * 验证一个对象是否为 AsyncFunction
 * @method isAsyncFunction
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}       结果
 * @static
 */
export function isAsyncFunction(value: any): value is Function {
  if (isNull(value)) return false;
  return getType(value) === "AsyncFunction";
}

/**
 * 验证一个对象是否为 GeneratorFunction
 * @method isGeneratorFunction
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isGeneratorFunction(value: any): value is GeneratorFunction {
  if (isNull(value)) return false;
  return getType(value) === "GeneratorFunction";
}

/**
 * 验证一个对象是否为String
 * @method isString
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isString(value: any): value is string {
  if (isNull(value)) return false;
  return getType(value) === "String";
}

/**
 * 验证一个对象是否为Number
 * @method isNumber
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isNumber(value: any): value is number {
  if (isNull(value)) return false;
  return getType(value) === "Number";
}

/**
 * 验证一个对象是否为Boolean
 * @method isBoolean
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isBoolean(value: any): value is boolean {
  if (isNull(value)) return false;
  return getType(value) === "Boolean";
}

/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isElement(value: any): value is Element {
  if (isNull(value)) return false;
  if (typeof Element !== "undefined") {
    return value instanceof Element;
  } else {
    return (
      value.tagName &&
      value.nodeType &&
      value.nodeName &&
      value.attributes &&
      value.ownerDocument
    );
  }
}

/**
 * 验证一个对象是否为HTML Text Element
 * @method isText
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isText(value: any): value is Text {
  if (isNull(value)) return false;
  return value instanceof Text;
}

/**
 * 验证一个对象是否为Object
 * @method isObject
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isObject(value: any): value is object {
  if (isNull(value)) return false;
  const type = getType(value);
  return type === "Object" || type === "Array";
}

/**
 * 验证一个对象是否为Array或伪Array
 * @method isArray
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isArray(value: any): value is any[] {
  if (isNull(value)) return false;
  const v1 = getType(value) === "Array";
  const v2 = value instanceof Array;
  const v3 =
    !isString(value) && isNumber(value.length) && isFunction(value.splice);
  const v4 = !isString(value) && isNumber(value.length) && value[0];
  return v1 || v2 || v3 || v4;
}

/**
 * 验证一个对象是否为typed array
 * @method isTypedArray
 * @param  {Object}  value 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export function isTypedArray(value: any) {
  return ArrayBuffer.isView(value) && !(value instanceof DataView);
}

/**
 * 验证是不是一个日期对象
 * @method isDate
 * @param {Object} value   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
export function isDate(value: any): value is Date {
  if (isNull(value)) return false;
  return value instanceof Date;
}

export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp;
}

export function toArray<T = any>(array: any): T[] {
  if (isNull(array)) return [];
  return Array.prototype.slice.call(array);
}

export function toDate(value: any): Date {
  if (isNumber(value)) {
    return new Date(value);
  } else if (isDate(value)) {
    return value;
  } else if (isString(value)) {
    return new Date(replace(replace(value, "-", "/"), "T", " "));
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

export function each(
  list: any,
  handler: (key: string | number, value: any) => any,
  scope: any
) {
  if (isNull(list) || isNull(handler)) return;
  if (isArray(list)) {
    const listLength = list.length;
    for (let i = 0; i < listLength; i++) {
      const rs = handler.call(scope || list[i], i, list[i]);
      if (!isNull(rs)) return rs;
    }
  } else {
    for (let key in list) {
      const rs = handler.call(scope || list[key], key, list[key]);
      if (!isNull(rs)) return rs;
    }
  }
}

export function copy(src: any, dst?: any, ignores?: string[]) {
  dst = dst || (isArray(src) ? [] : {});
  Object.keys(src).forEach((key: string) => {
    if (ignores && ignores.indexOf(key) > -1) return;
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

export function clone(src: any, ignores?: string[]) {
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
  Object.keys(src).forEach(key => {
    const value = src[key];
    if (objClone[key] !== value && !ignores.includes(key)) {
      if (isObject(value)) {
        objClone[key] = clone(value, ignores);
      } else {
        objClone[key] = value;
      }
    }
  });
  ["toString", "valueOf"].forEach(key => {
    if (ignores.includes(key)) return;
    final(objClone, key, src[key]);
  });
  return objClone;
}

export function getPrototypeOf(obj: any) {
  return Object.getPrototypeOf(obj);
}

export function setPrototypeOf(obj: any, proto: any) {
  return Object.setPrototypeOf(obj, proto);
}

export function create(proto: any) {
  return Object.create(proto);
}

/**
 * 合并对象
 * @method mix
 * @return 合并后的对象
 * @param {Object} dst 目标对象
 * @param {Object} src 源对象
 * @param {Array} ignores 忽略的属性名,
 * @param {Number} mode 模式
 */
export function mix(
  dst: any,
  src: any,
  ignores?: string[],
  mode?: 0 | 1 | 2 | 3 | 4,
  ignoreNull?: boolean
): any {
  ignores = ignores || [];
  // 根据模式来判断，默认是Obj to Obj的
  if (mode) {
    switch (mode) {
      case 1: // proto to proto
        return mix(dst.prototype, src.prototype, ignores, 0);
      case 2: // object to object and proto to proto
        mix(dst.prototype, src.prototype, ignores, 0);
        break; // pass through
      case 3: // proto to static
        return mix(dst, src.prototype, ignores, 0);
      case 4: // static to proto
        return mix(dst.prototype, src, ignores, 0);
      default: // object to object is what happens below
    }
  }
  // ---
  src = src || {};
  dst = dst || (isArray(src) ? [] : {});
  Object.keys(src).forEach(key => {
    if (ignores.includes(key)) return;
    if (ignoreNull && isNull(src[key])) return;
    if (
      isObject(src[key]) &&
      (src[key].constructor === Object ||
        src[key].constructor === Array ||
        src[key].constructor === null)
    ) {
      dst[key] = mix(dst[key], src[key], ignores, 0, ignoreNull);
    } else {
      dst[key] = src[key];
    }
  });
  return dst;
}

export function final(obj: any, name: string, value: any): void {
  if (arguments.length === 0) throw new Error("Parameter missing");
  if (arguments.length === 1) {
    return Object.keys(obj).forEach(name => {
      const value = obj[name];
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
  return !allKeys.some(key => !deepEqual((a as any)[key], (b as any)[key]));
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
    path = path
      .replace(/\[/, ".")
      .replace(/\]/, ".")
      .split(".");
  }
  path.forEach((name, index) => {
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
  filter?: (value?: any, key?: string, obj?: any) => boolean
) {
  if (isNull(obj) || isNull(path) || path === "") return obj;
  if (!isArray(path)) {
    path = path
      .replace(/\[/, ".")
      .replace(/\]/, ".")
      .split(".");
  }
  path.forEach(name => {
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

export function filterHTML(html: string) {
  if (!html) return "";
  const tagRegExp = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
  return html.replace(tagRegExp, "<$1></$2>");
}

export function parseHTML(str: string) {
  str = str || " ";
  const parent = document.createElement("div");
  parent.innerHTML = filterHTML(str);
  const childNodes = toArray<ChildNode>(parent.childNodes);
  // 先 clone 一份再通过 innerHTML 清空
  // 否则 IE9 下，清空时会导不通过返回的 DOM 没有子结点
  // if (firstNode) firstNode = firstNode.cloneNode(true);
  // window._NPH_.innerHTML = '';
  childNodes.forEach(childNode => parent.removeChild(childNode));
  return childNodes;
}
