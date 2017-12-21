/**
 * 空函数
 */
export declare function noop(): void;
export declare function toString(obj: any): any;
export declare function getType(obj: any): string;
/**
 * 验证一个对象是否为NULL
 * @method isNull
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isNull(obj: any): boolean;
/**
 * 除去字符串两端的空格
 * @method trim
 * @param  {String} str 源字符串
 * @return {String}     结果字符串
 * @static
 */
export declare function trim(str: string): string;
/**
 * 替换所有
 * @method replace
 * @param {String} str 源字符串
 * @param {String} str1 要替换的字符串
 * @param {String} str2 替换为的字符串
 * @static
 */
export declare function replace(str: string, str1: string, str2: string): string;
/**
 * 从字符串开头匹配
 * @method startWith
 * @param {String} str1 源字符串
 * @param {String} str2 要匹配的字符串
 * @return {Boolean} 匹配结果
 * @static
 */
export declare function startWith(str1: string, str2: string): boolean;
/**
 * 是否包含
 * @method contains
 * @param {String} str1 源字符串
 * @param {String} str2 检查包括字符串
 * @return {Boolean} 结果
 * @static
 */
export declare function contains(str1: string, str2: string): boolean;
/**
 * 从字符串结束匹配
 * @method endWidth
 * @param {String} str1 源字符串
 * @param {String} str2 匹配字符串
 * @return {Boolean} 匹配结果
 * @static
 */
export declare function endWith(str1: string, str2: string): boolean;
/**
 * 是否包含属性
 * @method hasProperty
 * @param  {Object}  obj  对象
 * @param  {String}  name 属性名
 * @return {Boolean}      结果
 * @static
 */
export declare function has(obj: Object, name: string): boolean;
export declare const hasProperty: typeof has;
/**
 * 验证一个对象是否为Function
 * @method isFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isFunction(obj: any): boolean;
/**
 * 验证一个对象是否为 AsyncFunction
 * @method isAsyncFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isAsyncFunction(obj: any): boolean;
/**
 * 验证一个对象是否为 GeneratorFunction
 * @method isGeneratorFunction
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isGeneratorFunction(obj: any): boolean;
/**
 * 验证一个对象是否为String
 * @method isString
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isString(obj: any): boolean;
/**
 * 验证一个对象是否为Number
 * @method isNumber
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isNumber(obj: any): boolean;
/**
 * 验证一个对象是否为Boolean
 * @method isBoolean
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isBoolean(obj: any): boolean;
/**
 * 验证一个对象是否为HTML Element
 * @method isElement
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isElement(obj: any): any;
/**
 * 验证一个对象是否为HTML Text Element
 * @method isText
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isText(obj: any): boolean;
/**
 * 验证一个对象是否为Object
 * @method isObject
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isObject(obj: any): boolean;
/**
 * 验证一个对象是否为Array或伪Array
 * @method isArray
 * @param  {Object}  obj 要验证的对象
 * @return {Boolean}     结果
 * @static
 */
export declare function isArray(obj: any): any;
/**
 * 验证是不是一个日期对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
export declare function isDate(val: any): boolean;
/**
 * 验证是不是一个正则对象
 * @method isDate
 * @param {Object} val   要检查的对象
 * @return {Boolean}           结果
 * @static
 */
export declare function isRegexp(val: any): boolean;
/**
 * 转换为数组
 * @method toArray
 * @param {Array|Object} array 伪数组
 * @return {Array} 转换结果数组
 * @static
 */
export declare function toArray(array: any): any;
/**
 * 转为日期格式
 * @method toDate
 * @param {Number|String} val 日期字符串或整型数值
 * @return {Date} 日期对象
 * @static
 */
export declare function toDate(val: any): any;
/**
 * 遍历一个对像或数组
 * @method each
 * @param  {Object or Array}   obj  要遍历的数组或对象
 * @param  {Function} fn            处理函数
 * @return {void}                   无返回值
 * @static
 */
export declare function each(list: any, handler: Function, scope?: any): any;
/**
 * 格式化日期
 * @method formatDate
 * @param {Date|String|Number} date 日期
 * @param {String} format 格式化字符串
 * @param {object} dict 反译字典
 * @return {String} 格式化结果
 * @static
 */
export declare function formatDate(date: any, format: string, dict?: any): any;
/**
 * 拷贝对象
 * @method copy
 * @param {Object} src 源对象
 * @param {Object} dst 目标对象
 * @static
 */
export declare function copy(src: any, dst: any, igonres?: any): any;
/**
 * 深度克隆对象
 * @method clone
 * @param {Object} src 源对象
 * @return {Object} 新对象
 * @static
 */
export declare function clone(src: any, igonres: any): any;
/**
 * 合并对象
 * @method mix
 * @return 合并后的对象
 * @param {Object} dst 目标对象
 * @param {Object} src 源对象
 * @param {Array} igonres 忽略的属性名,
 * @param {Number} mode 模式
 */
export declare function mix(dst: any, src: any, igonres?: any, mode?: any, igonreNull?: any): any;
/**
 * 定义不可遍历的属性
 **/
export declare function final(obj: any, name: any, value: any): any;
/**
 * 获取所有 key
 */
export declare function keys(obj: any): any[];
/**
 * 创建一个对象
 */
export declare function create(proto: any, props?: any): any;
/**
 * 设置 proto
 * 在不支持 setPrototypeOf 也不支持 __proto__ 的浏览器
 * 中，会采用 copy 方式
 */
export declare function setPrototypeOf(obj: any, proto: any): any;
/**
 * 获取 proto
 */
export declare function getPrototypeOf(obj: any): any;
/**
 * 是否深度相等
 */
export declare function deepEqual(a: any, b: any): boolean;
/**
 * 从一个数值循环到别一个数
 * @param {number} fromNum 开始数值
 * @param {Number} toNum 结束数值
 * @param {Number} step 步长值
 * @param {function} handler 执行函数
 * @returns {void} 无返回
 */
export declare function fromTo(fromNum: any, toNum: any, step: any, handler: any): void;
/**
 * 生成一个Guid
 * @method newGuid
 * @return {String} GUID字符串
 * @static
 */
export declare function newGuid(): string;
/**
 * 对象变换
 **/
export declare function map(list: any, fn: any): any;
/**
 * 通过路径设置属性值
 */
export declare function setByPath(obj: any, path: any, value: any): void;
/**
 * 通过路径获取属性值
 */
export declare function getByPath(obj: any, path: any): any;
/**
 * 数组去重
 **/
export declare function unique(array: any): any;
/**
 * 解析 function 的参数列表
 **/
export declare function getFunctionArgumentNames(fn: Function): string[];
/**
 * 缩短字符串
 */
export declare function short(str: string, maxLength: number): string;
/**
 * 首字母大写
 */
export declare function firstUpper(str: string): string;
/**
 * 编码正则字符串
 */
export declare function escapeRegExp(str: string): string;
/**
  * 将字符串转成「驼峰」式
  * @param {string} str 原始字符串
  * @param {number} mode 1 大驼峰，0 小驼峰
  * @return {string} 转换后的字符串
  */
export declare function toCamelCase(str: string, mode?: number): string;
/**
 * 将字符串转成分隔形式
 * @param {string} str 原始字符串
 * @return {string} 转换后的字符串
 */
export declare function toSplitCase(str: string): string;
export declare function htmlPrefilter(html: string): string;
/**
 * 解析字符串为 dom
 * @param {string} str 字符串
 * @returns {HTMLNode} 解析后的 DOM
 */
export declare function parseHTML(str: string): any;
