$(document).ready(function() {
      
  $(document).on("click", ".colorchanger", function() {
    var prevColor = $("body").css('background-color');
    if(!compareColors(prevColor, $(this).data('color'))) {
      $("body").css('background', $(this).data('color'));
      if($(this).data('color') !== 'white') {
        $(".reset").css('visibility', 'visible');
      }
      else {
        $(".reset").css('visibility', 'hidden');
      }
      save();        
    }
  });
  
  $(document).on('click', '.clone', function() {
    var clone = $(".colorchangerbox").first().clone();
    clone.css('margin-top', '20px');
    $(".container").append(clone);                  
    save();      
  });
  
  $(document).on('click', '.delete', function(e) {
    
    var count = $(".colorchangerbox").length;
    if(count > 1) {
      $(this).parents(".colorchangerbox").remove();
      save();
    }
    else {
      alert("Can't remove the last widget.");
    }            
  });    
});

var save = function() {
  var data = {};
  data.widgetcount = $(".colorchangerbox").length;
  data.bodybg = rgb2hex($("body").css('background-color'));
  $.post('save', data);    
};

var rgb2hex = function(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};


/* This compare colors function exists to make sure we don't 
    perform an unnecessary save, wasting bandwidth & db storage,
    when a user doesn't actually change the color of the page 
    
    (because they clicked a button corresponding to the current 
    page color)
    
*/
    
var compareColors;

if (window.getComputedStyle) { // Chrome, Safari, Firefox, IE9
  compareColors = (function() {
    var tempElement = document.createElement("span");
    tempElement.className = "_color-converter";
    tempElement.style.display = "none";

    function _getRgb(color) {
      tempElement.style.color = color;
      return window.getComputedStyle(tempElement, null).getPropertyValue("color");
    }

    return function(color1, color2) {
      if (!tempElement.parentNode) {
        document.body.appendChild(tempElement);
      }
      return _getRgb(color1) === _getRgb(color2);
    };
  })();
  
} else if (window.createPopup) { // MSIE

  compareColors = (function() {
    var body;

    function _getHex(color) {
      var range,
          value;
      body = body || createPopup().document.body;
      range = body.createTextRange();
      body.style.color = color;
      value = range.queryCommandValue("ForeColor");
      value = ((value & 0x0000ff) << 16) | (value & 0x00ff00) | ((value & 0xff0000) >>> 16);
      value = value.toString(16);
      return "#000000".slice(0, 7 - value.length) + value;
    }

    return function(color1, color2) {
      return _getHex(color1) === _getHex(color2);
    };
  })();

} else { // Let's default to assuming they're different; err on the side of caution...
  compareColors = function() {
    return true;
  };
}
