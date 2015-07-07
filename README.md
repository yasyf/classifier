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

Simply include [the compiled script](gen/classifier.js) in your page's `<head/>`, and initialize it. An example is given below.

```html
  <script src="//path/to/classifier.js"></script>
```

```javascript
  var classifier = new Classifier()
  $(document).ready(function() {
    classifier.transformDom()
  });
```
