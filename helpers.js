/**
 * 扩展swig模板的filter
 *
 * @method extend_swig_filters
 * @param {Object} swig
 */
exports.extend_swig_filters = function(swig) {

  /**
   * Filter: | value_array(key)
   * 根据对象的键名生成对象数组的值数组
   *
   * Usage:
   *   var books = [
   *     { author: 'Dickens', title: 'A Tale of Two Cities' },
   *     { author: 'Hugo', title: 'Miserables' },
   *     { author: 'Margaret', title: 'Gone With the Wind' }
   *   ];
   *   
   *   books | value_array(author)
   *   ==> [ 'Dickens', 'Hugo', 'Margaret' ]
   */
  swig.setFilter('value_array', function(input, key) {
    if (!input) return [];

    var arr = [];
    input.forEach(function(o) { if (o[key]) arr.push(o[key]); });
    return arr;
  });
};

/**
 * Logger
 *
 * @method extend_swig_filters
 * @param {Object} swig
 */
