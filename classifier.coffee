mit_textbooks_re = /(http:\/\/.*)?((([A-Za-z]{2,3})|(([1][0-2,4-8]|[2][0-2,4]|[1-9])[AWFHLMawfhlm]?))\.(([sS]?[0-9]{2,4}[AJaj]?)|([uU][aA][TtRr])))/g
mit_textbooks_re_search = /([\s,\(]|^)((([A-Za-z]{2,3})|(([1][0-2,4-8]|[2][0-2,4]|[1-9])[AWFHLMawfhlm]?))\.(([sS]?[0-9]{2,4}[AJaj]?)|([uU][aA][TtRr])))(([,\s\?\!\)](?!([%]|GB)))|([\.](?!([0-9])))|$)/g

excludes = [
  'script'
  'a'
  'input'
  'button'
  'textarea'
  'font'
  'h1'
  'h2'
  'h3'
  'header'
  'markdown'
  'code'
  'pre'
]
bad_roles = [
  'textbox'
  'alert'
]

class Classifier
  constructor: (body) ->
    @body = body or document.body

  checkNode: (node) ->
    if node.prop('tagName').toLowerCase() in excludes
      false
    else if node.attr('role') in bad_roles
      false
    else if node.css('cursor') == 'pointer'
      false
    else if node.attr('id') == 'header'
      false
    else if node.hasClass('markdown')
      false
    else if node.attr('draggable') == 'true'
      false
    else
      true

  replaceText: (fullName, node) ->
    span = document.createElement('span')
    span.innerHTML = fullName
    node.parentNode.replaceChild span, node

  transformDom: ->
    walker = document.createTreeWalker @body, NodeFilter.SHOW_TEXT, (node) ->
      if node.textContent.match(mit_textbooks_re_search)
        NodeFilter.FILTER_ACCEPT
      else
        NodeFilter.FILTER_SKIP
    , false
    while walker.nextNode()
      node = walker.currentNode
      continue unless node.parentNode?
      okay = $(node).parents().toArray().reduce (status, value) =>
        status and @checkNode $(value)
      , true
      continue unless okay
      klass = node.nodeValue.match(mit_textbooks_re)?[0]
      continue unless klass?
      do (node) =>
        $.getJSON "https://mit-textbooks.herokuapp.com/popover/#{klass}", (data) =>
          @replaceText(data.class_info.n, node) if data.class_info?


window.Classifier = Classifier
