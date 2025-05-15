function getMouseCoords(e) {
    var e = e || window.event;
    document.getElementById('msg').innerHTML = e.clientX + ', ' +
      e.clientY + '<br>' + e.screenX + ', ' + e.screenY;
  }
  
    var followCursor = (
    function() {
    var s = document.querySelector('.circle');
  
    return {
      init: function() {
        document.body.appendChild(s);
      },
  
      run: function(e) {
        var e = e || window.event;
        s.style.left = (e.clientX - 2) + 'px';
        s.style.top = (e.clientY - 2) + 'px';
        getMouseCoords(e);
      }
    };
  }());
  
  window.onload = function() {
    followCursor.init();
    document.body.onmousemove = followCursor.run;
  }