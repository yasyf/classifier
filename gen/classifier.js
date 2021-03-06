// Generated by CoffeeScript 1.9.3
(function() {
  var Classifier, bad_roles, excludes, mit_textbooks_re, mit_textbooks_re_search,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  mit_textbooks_re = /(http:\/\/.*)?((([A-Za-z]{2,3})|(([1][0-2,4-8]|[2][0-2,4]|[1-9])[AWFHLMawfhlm]?))\.(([sS]?[0-9]{2,4}[AJaj]?)|([uU][aA][TtRr])))/g;

  mit_textbooks_re_search = /([\s,\(]|^)((([A-Za-z]{2,3})|(([1][0-2,4-8]|[2][0-2,4]|[1-9])[AWFHLMawfhlm]?))\.(([sS]?[0-9]{2,4}[AJaj]?)|([uU][aA][TtRr])))(([,\s\?\!\)](?!([%]|GB)))|([\.](?!([0-9])))|$)/g;

  excludes = ['script', 'a', 'input', 'button', 'textarea', 'font', 'h1', 'h2', 'h3', 'header', 'markdown', 'code', 'pre'];

  bad_roles = ['textbox', 'alert'];

  Classifier = (function() {
    function Classifier(body) {
      this.body = body || document.body;
    }

    Classifier.prototype.checkNode = function(node) {
      var ref, ref1;
      if (ref = node.prop('tagName').toLowerCase(), indexOf.call(excludes, ref) >= 0) {
        return false;
      } else if (ref1 = node.attr('role'), indexOf.call(bad_roles, ref1) >= 0) {
        return false;
      } else if (node.css('cursor') === 'pointer') {
        return false;
      } else if (node.attr('id') === 'header') {
        return false;
      } else if (node.hasClass('markdown')) {
        return false;
      } else if (node.attr('draggable') === 'true') {
        return false;
      } else {
        return true;
      }
    };

    Classifier.prototype.replaceText = function(fullName, node) {
      var span;
      span = document.createElement('span');
      span.innerHTML = fullName;
      return node.parentNode.replaceChild(span, node);
    };

    Classifier.prototype.transformDom = function() {
      var klass, node, okay, ref, results, walker;
      walker = document.createTreeWalker(this.body, NodeFilter.SHOW_TEXT, function(node) {
        if (node.textContent.match(mit_textbooks_re_search)) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_SKIP;
        }
      }, false);
      results = [];
      while (walker.nextNode()) {
        node = walker.currentNode;
        if (node.parentNode == null) {
          continue;
        }
        okay = $(node).parents().toArray().reduce((function(_this) {
          return function(status, value) {
            return status && _this.checkNode($(value));
          };
        })(this), true);
        if (!okay) {
          continue;
        }
        klass = (ref = node.nodeValue.match(mit_textbooks_re)) != null ? ref[0] : void 0;
        if (klass == null) {
          continue;
        }
        results.push((function(_this) {
          return function(node) {
            return $.getJSON("https://mit-textbooks.herokuapp.com/popover/" + klass, function(data) {
              if (data.class_info != null) {
                return _this.replaceText(data.class_info.n, node);
              }
            });
          };
        })(this)(node));
      }
      return results;
    };

    return Classifier;

  })();

  window.Classifier = Classifier;

}).call(this);

//# sourceMappingURL=classifier.js.map
