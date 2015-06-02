var importStyle = require('../index.js');
var expect = require('expect.js');

describe('importStyle', function() {

  it('should ', function() {
    importStyle('.a { color: blue }');
    importStyle('.b { color: red }', 'b.css');
    importStyle('.c { color: green }', 'c.css');
    importStyle('.b { color: red }', 'b.css');
    importStyle('.d { color: yellow }');
    importStyle('.e { color: white }');

    var styleCount = document.getElementsByTagName('style').length;
    expect(styleCount).to.equal(3);

    var styleEl = document.getElementById('b-css');
    var cssText = styleEl.innerHTML || styleEl.styleSheet.cssText;
    expect(cssText).to.contain('.b');

    styleEl = document.getElementsByTagName('style')[0];
    cssText = styleEl.innerHTML || styleEl.styleSheet.cssText;
    expect(cssText).to.contain('.d');
    expect(cssText).to.contain('.e');
    expect(cssText).to.not.contain('.b');
    expect(cssText).to.not.contain('.c');
  });

});
