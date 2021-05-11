"use strict";

$(document).ready(function () {
  $('.compl-work__colomn').length;
  console.log(length);
  $('.burger').click(function () {
    $('.burger, .menu').toggleClass('active');
    $('body').toggleClass('lock');
    button.fadeOut();
  });
}); //-------------------------------- fixed ----------------------------------------

$(window).scroll(function () {
  if ($(document).scrollTop()) $('.header').addClass('fixed');else $('.header').removeClass('fixed');
}); // -------------------------------- button - scroll - top -----------------------------

$(document).ready(function () {
  var button = $('.top');
  button.fadeOut();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      button.fadeIn();
    } else {
      button.fadeOut();
    }
  });
  button.on('click', function () {
    $('body, html').animate({
      scrollTop: 0
    }, 1200);
    return false;
  });
}); //-------------------------------- Dynamic Adapt v.1 ----------------------------
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-move="item,2,992"
// Andrikanych Yevhen 2020

var move_array = [];
var move_objects = document.querySelectorAll("[data-move]");

if (move_objects.length > 0) {
  for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
    var _el6 = move_objects[_index10];

    var data_move = _el6.getAttribute("data-move");

    if (data_move != "" || data_move != null) {
      _el6.setAttribute("data-move-index", _index10);

      move_array[_index10] = {
        parent: _el6.parentNode,
        index: index_in_parent(_el6)
      };
    }
  }
}

function dynamic_adapt() {
  var w = document.querySelector("body").offsetWidth;

  if (move_objects.length > 0) {
    for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
      var _el7 = move_objects[_index11];

      var _data_move = _el7.getAttribute("data-move");

      if (_data_move != "" || _data_move != null) {
        var data_array = _data_move.split(",");

        var data_parent = document.querySelector("." + data_array[0]);
        var data_index = data_array[1];
        var data_bp = data_array[2];

        if (w < data_bp) {
          if (!_el7.classList.contains("js-move_done_" + data_bp)) {
            if (data_index > 0) {
              //insertAfter
              var actual_index = index_of_elements(data_parent)[data_index];
              data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
            } else {
              data_parent.insertBefore(_el7, data_parent.firstChild);
            }

            _el7.classList.add("js-move_done_" + data_bp);
          }
        } else {
          if (_el7.classList.contains("js-move_done_" + data_bp)) {
            dynamic_adaptive_back(_el7);

            _el7.classList.remove("js-move_done_" + data_bp);
          }
        }
      }
    }
  }

  custom_adapt(w);
}

function dynamic_adaptive_back(el) {
  var index_original = el.getAttribute("data-move-index");
  var move_place = move_array[index_original];
  var parent_place = move_place["parent"];
  var index_place = move_place["index"];

  if (index_place > 0) {
    //insertAfter
    var actual_index = index_of_elements(parent_place)[index_place];
    parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
  } else {
    parent_place.insertBefore(el, parent_place.firstChild);
  }
}

function index_in_parent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;

  for (var _i2 = 0; _i2 < children.length; _i2++) {
    if (children[_i2] == node) return num;
    if (children[_i2].nodeType == 1) num++;
  }

  return -1;
}

function index_of_elements(parent) {
  var children = [];

  for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
    if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
      children.push(_i3);
    }
  }

  return children;
}

window.addEventListener("resize", function (event) {
  dynamic_adapt();
});
dynamic_adapt();

function custom_adapt(w) {}

var btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');

if (btn) {
  for (var _index12 = 0; _index12 < btn.length; _index12++) {
    var _el8 = btn[_index12];

    _el8.addEventListener('click', form_submit);
  }
}

function form_submit() {
  var error = 0;
  var btn = event.target;
  var form = btn.closest('form');
  var form_req = form.querySelectorAll('._req');

  if (form_req) {
    for (var _index13 = 0; _index13 < form_req.length; _index13++) {
      var _el9 = form_req[_index13];
      error += form_validate(_el9);
    }
  }

  if (error == 0) {
    //SendForm
    form_clean(form);
    popup_close(); //popup_open('message');
    //event.preventDefault();
  } else {
    var form_error = form.querySelectorAll('._error');

    if (form_error && form.classList.contains('_goto-error')) {
      _goto(form_error[0], 1000, 50);
    }

    event.preventDefault();
  }
}

function form_validate(input) {
  var error = 0;
  var input_g_value = input.getAttribute('data-value');

  if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
    if (input.value != input_g_value) {
      var em = input.value.replace(" ", "");
      input.value = em;
    }

    if (email_test(input) || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
    form_add_error(input);
    error++;
  } else {
    if (input.value == '' || input.value == input_g_value) {
      form_add_error(input);
      error++;
    } else {
      form_remove_error(input);
    }
  }

  return error;
}

function form_add_error(input) {
  input.classList.add('_error');
  input.parentElement.classList.add('_error');
  var input_error = input.parentElement.querySelector('.form__error');

  if (input_error) {
    input.parentElement.removeChild(input_error);
  }

  var input_error_text = input.getAttribute('data-error');

  if (input_error_text && input_error_text != '') {
    input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
  }
}

function form_remove_error(input) {
  input.classList.remove('_error');
  input.parentElement.classList.remove('_error');
  var input_error = input.parentElement.querySelector('.form__error');

  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
}

; // ------------------------- ul slider -----------------------------------

$(function () {
  $(".ui-slider").slider({
    value: 0,
    min: 0,
    max: 3,
    step: 1,
    slide: function slide(event, ui) {
      $("#amount").val("$" + ui.value);
    }
  });
  $("#amount").val("$" + $(".ui-slider").slider("value"));
});
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011вЂ“2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */

!function (a) {
  function f(a, b) {
    if (!(a.originalEvent.touches.length > 1)) {
      a.preventDefault();
      var c = a.originalEvent.changedTouches[0],
          d = document.createEvent("MouseEvents");
      d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d);
    }
  }

  if (a.support.touch = "ontouchend" in document, a.support.touch) {
    var e,
        b = a.ui.mouse.prototype,
        c = b._mouseInit,
        d = b._mouseDestroy;
    b._touchStart = function (a) {
      var b = this;
      !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"));
    }, b._touchMove = function (a) {
      e && (this._touchMoved = !0, f(a, "mousemove"));
    }, b._touchEnd = function (a) {
      e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1);
    }, b._mouseInit = function () {
      var b = this;
      b.element.bind({
        touchstart: a.proxy(b, "_touchStart"),
        touchmove: a.proxy(b, "_touchMove"),
        touchend: a.proxy(b, "_touchEnd")
      }), c.call(b);
    }, b._mouseDestroy = function () {
      var b = this;
      b.element.unbind({
        touchstart: a.proxy(b, "_touchStart"),
        touchmove: a.proxy(b, "_touchMove"),
        touchend: a.proxy(b, "_touchEnd")
      }), d.call(b);
    };
  }
}(jQuery); // -------------------------------- slick slider --------------------------

$(document).ready(function () {
  $('.slider').slick({
    arrows: false,
    dots: true
  });
});