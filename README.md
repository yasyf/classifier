# MIT Javascript Class Classifier

A simple little script to update any references to MIT classes on your site, adding the full class name where there are only numbers. For example, the following

- 2.001
- 2.005
- 2.086

is transformed to

- 2.001 Mechanics and Materials I
- 2.005 Thermal-Fluids Engineering I
- 2.086 Numerical Computation for Mechanical Engineers

## Usage

Simply include [the compiled script](gen/classifier.js) in your page's `<head/>`, and construct a new `Classifier` object. The constructor takes an optional parameter, which is the DOM element you which to look for class numbers in (it defaults to the entire `<body/>`). Call `Classifier.transformDom()` when you are ready to replace the class numbers with names.

An example is given below.

```html
  <head>
    <script src="//path/to/classifier.js"></script>
  </head>
```

```javascript
  var classifier = new Classifier()
  $(document).ready(function() {
    classifier.transformDom();
  });
```
