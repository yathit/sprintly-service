(function (name, definition, context) {if (typeof context['module'] !== 'undefined' && context['module']['exports']) {context['module']['exports'] = definition.apply(context);}else if (typeof context['define'] !== 'undefined' && context['define'] === 'function' && context['define']['amd']) {define(name, [], definition);}else {context[name] = definition();}})('ydn', function () {var l, q = this;
function r(a) {
  return void 0 !== a;
}
function aa(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
}
function s(a) {
  return "array" == aa(a);
}
function t(a) {
  var b = aa(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
}
function u(a) {
  return "string" == typeof a;
}
function ba(a) {
  return "boolean" == typeof a;
}
function w(a) {
  return "number" == typeof a;
}
function ca(a) {
  return "function" == aa(a);
}
function y(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
}
var da = "closure_uid_" + (1E9 * Math.random() >>> 0), ea = 0;
function fa(a, b, c) {
  return a.call.apply(a.bind, arguments);
}
function ga(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
}
function ha(a, b, c) {
  ha = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? fa : ga;
  return ha.apply(null, arguments);
}
function ia(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b);
  };
}
var ja = Date.now || function() {
  return+new Date;
};
function ka(a, b) {
  var c = a.split("."), d = q;
  c[0] in d || !d.execScript || d.execScript("var " + c[0]);
  for (var e;c.length && (e = c.shift());) {
    !c.length && r(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {};
  }
}
function z(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.r = b.prototype;
  a.prototype = new c;
  a.Ib = function(a, c, f) {
    return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2));
  };
}
;function la(a) {
  a.prototype.then = a.prototype.then;
  a.prototype.$goog_Thenable = !0;
}
function ma(a) {
  if (!a) {
    return!1;
  }
  try {
    return!!a.$goog_Thenable;
  } catch (b) {
    return!1;
  }
}
;function na(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, na);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
}
z(na, Error);
na.prototype.name = "CustomError";
function oa(a) {
  for (var b = 0;1 > b;b++) {
    if ('"' == a.charAt(0) && '"' == a.charAt(a.length - 1)) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
}
var qa = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"}, ra = {"'":"\\'"};
function sa(a) {
  a = String(a);
  if (!a.quote) {
    for (var b = ['"'], c = 0;c < a.length;c++) {
      var d = a.charAt(c), e = d.charCodeAt(0), f = c + 1, g;
      if (!(g = qa[d])) {
        if (!(31 < e && 127 > e)) {
          if (d in ra) {
            d = ra[d];
          } else {
            if (d in qa) {
              d = ra[d] = qa[d];
            } else {
              e = d;
              g = d.charCodeAt(0);
              if (31 < g && 127 > g) {
                e = d;
              } else {
                if (256 > g) {
                  if (e = "\\x", 16 > g || 256 < g) {
                    e += "0";
                  }
                } else {
                  e = "\\u", 4096 > g && (e += "0");
                }
                e += g.toString(16).toUpperCase();
              }
              d = ra[d] = e;
            }
          }
        }
        g = d;
      }
      b[f] = g;
    }
    b.push('"');
  }
}
function ta(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
;function ua(a) {
  q.setTimeout(function() {
    throw a;
  }, 0);
}
var va;
function wa() {
  if (q.Promise && q.Promise.resolve) {
    var a = q.Promise.resolve();
    return function(b) {
      a.then(function() {
        try {
          b();
        } catch (a) {
          ua(a);
        }
      });
    };
  }
  var b = q.MessageChannel;
  "undefined" === typeof b && "undefined" !== typeof window && window.postMessage && window.addEventListener && (b = function() {
    var a = document.createElement("iframe");
    a.style.display = "none";
    a.src = "";
    document.documentElement.appendChild(a);
    var b = a.contentWindow, a = b.document;
    a.open();
    a.write("");
    a.close();
    var c = "callImmediate" + Math.random(), d = b.location.protocol + "//" + b.location.host, a = ha(function(a) {
      if (a.origin == d || a.data == c) {
        this.port1.onmessage();
      }
    }, this);
    b.addEventListener("message", a, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      b.postMessage(c, d);
    }};
  });
  if ("undefined" !== typeof b) {
    var c = new b, d = {}, e = d;
    c.port1.onmessage = function() {
      d = d.next;
      var a = d.Ra;
      d.Ra = null;
      a();
    };
    return function(a) {
      e.next = {Ra:a};
      e = e.next;
      c.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
    var b = document.createElement("script");
    b.onreadystatechange = function() {
      b.onreadystatechange = null;
      b.parentNode.removeChild(b);
      b = null;
      a();
      a = null;
    };
    document.documentElement.appendChild(b);
  } : function(a) {
    q.setTimeout(a, 0);
  };
}
;function xa(a, b) {
  if (!ya) {
    var c = za;
    ca(q.setImmediate) ? q.setImmediate(c) : (va || (va = wa()), va(c));
    ya = !0;
  }
  Aa.push(new Ba(a, b));
}
var ya = !1, Aa = [];
function za() {
  for (;Aa.length;) {
    var a = Aa;
    Aa = [];
    for (var b = 0;b < a.length;b++) {
      var c = a[b];
      try {
        c.a.call(c.b);
      } catch (d) {
        ua(d);
      }
    }
  }
  ya = !1;
}
function Ba(a, b) {
  this.a = a;
  this.b = b;
}
;function Ca(a, b) {
  this.b = Da;
  this.f = void 0;
  this.a = this.c = null;
  this.d = this.e = !1;
  try {
    var c = this;
    a.call(b, function(a) {
      Ea(c, Fa, a);
    }, function(a) {
      Ea(c, Ga, a);
    });
  } catch (d) {
    Ea(this, Ga, d);
  }
}
var Da = 0, Fa = 2, Ga = 3;
Ca.prototype.then = function(a, b, c) {
  return Ha(this, ca(a) ? a : null, ca(b) ? b : null, c);
};
la(Ca);
function Ia(a) {
  a.b == Da && xa(function() {
    var a = new Ja(void 0);
    Ka(this, a);
  }, a);
}
function Ka(a, b) {
  if (a.b == Da) {
    if (a.c) {
      var c = a.c;
      if (c.a) {
        for (var d = 0, e = -1, f = 0, g;g = c.a[f];f++) {
          if (g = g.la) {
            if (d++, g == a && (e = f), 0 <= e && 1 < d) {
              break;
            }
          }
        }
        0 <= e && (c.b == Da && 1 == d ? Ka(c, b) : (d = c.a.splice(e, 1)[0], Ga == Fa ? d.Da(b) : (La(c), d.Ea(b))));
      }
    } else {
      Ea(a, Ga, b);
    }
  }
}
function Ma(a, b) {
  a.a && a.a.length || a.b != Fa && a.b != Ga || Na(a);
  a.a || (a.a = []);
  a.a.push(b);
}
function Ha(a, b, c, d) {
  var e = {la:null, Da:null, Ea:null};
  e.la = new Ca(function(a, g) {
    e.Da = b ? function(c) {
      try {
        var e = b.call(d, c);
        a(e);
      } catch (m) {
        g(m);
      }
    } : a;
    e.Ea = c ? function(b) {
      try {
        var e = c.call(d, b);
        !r(e) && b instanceof Ja ? g(b) : a(e);
      } catch (m) {
        g(m);
      }
    } : g;
  });
  e.la.c = a;
  Ma(a, e);
  return e.la;
}
Ca.prototype.g = function(a) {
  this.b = Da;
  Ea(this, Fa, a);
};
Ca.prototype.i = function(a) {
  this.b = Da;
  Ea(this, Ga, a);
};
function Ea(a, b, c) {
  if (a.b == Da) {
    if (a == c) {
      b = Ga, c = new TypeError("Promise cannot resolve to itself");
    } else {
      if (ma(c)) {
        a.b = 1;
        c.then(a.g, a.i, a);
        return;
      }
      if (y(c)) {
        try {
          var d = c.then;
          if (ca(d)) {
            Oa(a, c, d);
            return;
          }
        } catch (e) {
          b = Ga, c = e;
        }
      }
    }
    a.f = c;
    a.b = b;
    Na(a);
    b != Ga || c instanceof Ja || Pa(a, c);
  }
}
function Oa(a, b, c) {
  function d(b) {
    f || (f = !0, a.i(b));
  }
  function e(b) {
    f || (f = !0, a.g(b));
  }
  a.b = 1;
  var f = !1;
  try {
    c.call(b, e, d);
  } catch (g) {
    d(g);
  }
}
function Na(a) {
  a.e || (a.e = !0, xa(a.l, a));
}
Ca.prototype.l = function() {
  for (;this.a && this.a.length;) {
    var a = this.a;
    this.a = [];
    for (var b = 0;b < a.length;b++) {
      var c = a[b], d = this.f;
      this.b == Fa ? c.Da(d) : (La(this), c.Ea(d));
    }
  }
  this.e = !1;
};
function La(a) {
  for (;a && a.d;a = a.c) {
    a.d = !1;
  }
}
function Pa(a, b) {
  a.d = !0;
  xa(function() {
    a.d && Qa.call(null, b);
  });
}
var Qa = ua;
function Ja(a) {
  na.call(this, a);
}
z(Ja, na);
Ja.prototype.name = "cancel";
var A = Array.prototype, Ra = A.indexOf ? function(a, b, c) {
  return A.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (u(a)) {
    return u(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (;c < a.length;c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return-1;
}, Sa = A.forEach ? function(a, b, c) {
  A.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = u(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a);
  }
}, Ta = A.map ? function(a, b, c) {
  return A.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = Array(d), f = u(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a));
  }
  return e;
}, Ua = A.some ? function(a, b, c) {
  return A.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = u(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return!0;
    }
  }
  return!1;
}, Va = A.every ? function(a, b, c) {
  return A.every.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = u(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && !b.call(c, e[f], f, a)) {
      return!1;
    }
  }
  return!0;
};
function Wa(a, b) {
  var c = Xa(a, b, void 0);
  return 0 > c ? null : u(a) ? a.charAt(c) : a[c];
}
function Xa(a, b, c) {
  for (var d = a.length, e = u(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return f;
    }
  }
  return-1;
}
function Ya(a) {
  if (!s(a)) {
    for (var b = a.length - 1;0 <= b;b--) {
      delete a[b];
    }
  }
  a.length = 0;
}
function Za(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return[];
}
function $a(a, b) {
  for (var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if (s(d) || (e = t(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) {
      a.push.apply(a, d);
    } else {
      if (e) {
        for (var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h];
        }
      } else {
        a.push(d);
      }
    }
  }
}
function ab(a, b, c, d) {
  A.splice.apply(a, bb(arguments, 1));
}
function bb(a, b, c) {
  return 2 >= arguments.length ? A.slice.call(a, b) : A.slice.call(a, b, c);
}
function cb(a, b) {
  if (!t(a) || !t(b) || a.length != b.length) {
    return!1;
  }
  for (var c = a.length, d = db, e = 0;e < c;e++) {
    if (!d(a[e], b[e])) {
      return!1;
    }
  }
  return!0;
}
function eb(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function db(a, b) {
  return a === b;
}
function fb(a, b) {
  var c;
  c = gb || eb;
  for (var d = 0, e = a.length, f;d < e;) {
    var g = d + e >> 1, h;
    h = c(b, a[g]);
    0 < h ? d = g + 1 : (e = g, f = !h);
  }
  c = f ? d : ~d;
  0 > c && ab(a, -(c + 1), 0, b);
}
;/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function C(a, b) {
  this.i = [];
  this.U = b || null;
  this.b = this.c = !1;
  this.e = void 0;
  this.V = this.G = this.m = !1;
  this.g = 0;
  this.d = null;
  this.w = 0;
}
l = C.prototype;
l.ma = function(a, b) {
  this.m = !1;
  hb(this, a, b);
};
function hb(a, b, c) {
  a.c = !0;
  a.e = c;
  a.b = !b;
  a.za();
}
function ib(a) {
  if (a.c) {
    if (!a.V) {
      throw new jb;
    }
    a.V = !1;
  }
}
l.callback = function(a) {
  ib(this);
  hb(this, !0, a);
};
l.j = function(a) {
  ib(this);
  hb(this, !1, a);
};
l.n = function(a, b) {
  return kb(this, a, null, b);
};
l.gb = function(a, b) {
  return kb(this, null, a, b);
};
l.B = function(a, b) {
  return kb(this, a, a, b);
};
function kb(a, b, c, d) {
  a.i.push([b, c, d]);
  a.c && a.za();
  return a;
}
l.then = function(a, b, c) {
  var d, e, f = new Ca(function(a, b) {
    d = a;
    e = b;
  });
  kb(this, d, function(a) {
    e(a);
  });
  return f.then(a, b, c);
};
la(C);
function lb(a, b) {
  kb(a, b.callback, b.j, b);
}
function mb(a, b) {
  b instanceof C ? a.n(ha(b.qb, b)) : a.n(function() {
    return b;
  });
}
C.prototype.qb = function(a) {
  var b = new C;
  lb(this, b);
  a && (b.d = this, this.w++);
  return b;
};
function nb(a) {
  return Ua(a.i, function(a) {
    return ca(a[1]);
  });
}
C.prototype.za = function() {
  this.g && this.c && nb(this) && (ob(this.g), this.g = 0);
  this.d && (this.d.w--, delete this.d);
  for (var a = this.e, b = !1, c = !1;this.i.length && !this.m;) {
    var d = this.i.shift(), e = d[0], f = d[1], d = d[2];
    if (e = this.b ? f : e) {
      try {
        var g = e.call(d || this.U, a);
        r(g) && (this.b = this.b && (g == a || g instanceof Error), this.e = a = g);
        ma(a) && (this.m = c = !0);
      } catch (h) {
        a = h, this.b = !0, nb(this) || (b = !0);
      }
    }
  }
  this.e = a;
  c && (c = ha(this.ma, this, !0), g = ha(this.ma, this, !1), a instanceof C ? (kb(a, c, g), a.G = !0) : a.then(c, g));
  b && (a = new pb(a), qb[a.ra] = a, this.g = a.ra);
};
function jb() {
  na.call(this);
}
z(jb, na);
jb.prototype.message = "Deferred has already fired";
jb.prototype.name = "AlreadyCalledError";
function pb(a) {
  this.ra = q.setTimeout(ha(this.b, this), 0);
  this.a = a;
}
pb.prototype.b = function() {
  delete qb[this.ra];
  throw this.a;
};
var qb = {};
function ob(a) {
  var b = qb[a];
  b && (q.clearTimeout(b.ra), delete qb[a]);
}
;function D(a) {
  na.call(this, a);
  this.name = "ydn.error.ArgumentException";
}
z(D, na);
function rb(a) {
  na.call(this, a);
  this.name = "ydn.error.NotSupportedException";
}
z(rb, na);
function sb(a) {
  na.call(this, a);
  this.name = "ydn.error.InvalidOperationException";
}
z(sb, na);
function tb(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, tb) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.InternalError";
}
z(tb, Error);
tb.prototype.name = "ydn.error.InternalError";
function ub(a, b) {
  for (var c = t(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && (a = a[d[c]], r(a));c++) {
  }
  return a;
}
var vb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function wb(a, b) {
  for (var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var f = 0;f < vb.length;f++) {
      c = vb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
}
;var xb = "StopIteration" in q ? q.StopIteration : Error("StopIteration");
function yb() {
}
yb.prototype.next = function() {
  throw xb;
};
yb.prototype.xa = function() {
  return this;
};
function zb(a) {
  if (a instanceof yb) {
    return a;
  }
  if ("function" == typeof a.xa) {
    return a.xa(!1);
  }
  if (t(a)) {
    var b = 0, c = new yb;
    c.next = function() {
      for (;;) {
        if (b >= a.length) {
          throw xb;
        }
        if (b in a) {
          return a[b++];
        }
        b++;
      }
    };
    return c;
  }
  throw Error("Not implemented");
}
function Ab(a, b) {
  if (t(a)) {
    try {
      Sa(a, b, void 0);
    } catch (c) {
      if (c !== xb) {
        throw c;
      }
    }
  } else {
    a = zb(a);
    try {
      for (;;) {
        b.call(void 0, a.next(), void 0, a);
      }
    } catch (d) {
      if (d !== xb) {
        throw d;
      }
    }
  }
}
;function Bb(a, b) {
  this.b = {};
  this.a = [];
  this.d = this.c = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var d = 0;d < c;d += 2) {
      Cb(this, arguments[d], arguments[d + 1]);
    }
  } else {
    if (a) {
      var e;
      if (a instanceof Bb) {
        e = a.ba(), d = a.Ba();
      } else {
        var c = [], f = 0;
        for (e in a) {
          c[f++] = e;
        }
        e = c;
        c = [];
        f = 0;
        for (d in a) {
          c[f++] = a[d];
        }
        d = c;
      }
      for (c = 0;c < e.length;c++) {
        Cb(this, e[c], d[c]);
      }
    }
  }
}
l = Bb.prototype;
l.Sa = function() {
  return this.c;
};
l.Ba = function() {
  Db(this);
  for (var a = [], b = 0;b < this.a.length;b++) {
    a.push(this.b[this.a[b]]);
  }
  return a;
};
l.ba = function() {
  Db(this);
  return this.a.concat();
};
l.clear = function() {
  this.b = {};
  this.d = this.c = this.a.length = 0;
};
function Db(a) {
  if (a.c != a.a.length) {
    for (var b = 0, c = 0;b < a.a.length;) {
      var d = a.a[b];
      Object.prototype.hasOwnProperty.call(a.b, d) && (a.a[c++] = d);
      b++;
    }
    a.a.length = c;
  }
  if (a.c != a.a.length) {
    for (var e = {}, c = b = 0;b < a.a.length;) {
      d = a.a[b], Object.prototype.hasOwnProperty.call(e, d) || (a.a[c++] = d, e[d] = 1), b++;
    }
    a.a.length = c;
  }
}
l.get = function(a, b) {
  return Object.prototype.hasOwnProperty.call(this.b, a) ? this.b[a] : b;
};
function Cb(a, b, c) {
  Object.prototype.hasOwnProperty.call(a.b, b) || (a.c++, a.a.push(b), a.d++);
  a.b[b] = c;
}
l.forEach = function(a, b) {
  for (var c = this.ba(), d = 0;d < c.length;d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this);
  }
};
l.clone = function() {
  return new Bb(this);
};
l.xa = function(a) {
  Db(this);
  var b = 0, c = this.a, d = this.b, e = this.d, f = this, g = new yb;
  g.next = function() {
    for (;;) {
      if (e != f.d) {
        throw Error("The map has changed since the iterator was created");
      }
      if (b >= c.length) {
        throw xb;
      }
      var g = c[b++];
      return a ? g : d[g];
    }
  };
  return g;
};
var Eb;
a: {
  var Fb = q.navigator;
  if (Fb) {
    var Gb = Fb.userAgent;
    if (Gb) {
      Eb = Gb;
      break a;
    }
  }
  Eb = "";
}
function Hb(a) {
  return-1 != Eb.indexOf(a);
}
;var Ib = Hb("Opera") || Hb("OPR"), Jb = Hb("Trident") || Hb("MSIE"), Kb = Hb("Gecko") && -1 == Eb.toLowerCase().indexOf("webkit") && !(Hb("Trident") || Hb("MSIE")), Lb = -1 != Eb.toLowerCase().indexOf("webkit");
function Nb() {
  var a = q.document;
  return a ? a.documentMode : void 0;
}
var Ob = function() {
  var a = "", b;
  if (Ib && q.opera) {
    return a = q.opera.version, ca(a) ? a() : a;
  }
  Kb ? b = /rv\:([^\);]+)(\)|;)/ : Jb ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Lb && (b = /WebKit\/(\S+)/);
  b && (a = (a = b.exec(Eb)) ? a[1] : "");
  return Jb && (b = Nb(), b > parseFloat(a)) ? String(b) : a;
}(), Pb = {};
function Qb(a) {
  var b;
  if (!(b = Pb[a])) {
    b = 0;
    for (var c = String(Ob).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0;0 == b && f < e;f++) {
      var g = c[f] || "", h = d[f] || "", k = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
      do {
        var p = k.exec(g) || ["", "", ""], n = m.exec(h) || ["", "", ""];
        if (0 == p[0].length && 0 == n[0].length) {
          break;
        }
        b = ta(0 == p[1].length ? 0 : parseInt(p[1], 10), 0 == n[1].length ? 0 : parseInt(n[1], 10)) || ta(0 == p[2].length, 0 == n[2].length) || ta(p[2], n[2]);
      } while (0 == b);
    }
    b = Pb[a] = 0 <= b;
  }
  return b;
}
var Rb = q.document, Sb = Rb && Jb ? Nb() || ("CSS1Compat" == Rb.compatMode ? parseInt(Ob, 10) : 5) : void 0;
function Tb() {
}
;function H(a, b) {
  C.call(this, 0, b);
  this.f = [];
}
z(H, C);
H.prototype.F = function(a, b) {
  this.f.push([a, b]);
  return this;
};
function Ub(a, b) {
  for (var c = 0;c < a.f.length;c++) {
    a.f[c][0].call(a.f[c][1], b);
  }
}
H.prototype.callback = function(a) {
  this.f.length = 0;
  H.r.callback.call(this, a);
};
H.prototype.j = function(a) {
  this.f.length = 0;
  H.r.j.call(this, a);
};
H.prototype.rb = function() {
  return this;
};
var Vb = {READ_ONLY:"readonly", READ_WRITE:"readwrite", VERSION_CHANGE:"versionchange"}, Wb = q.IDBRequest && "LOADING" in q.IDBRequest ? q.IDBTransaction : q.webkitIDBRequest && "LOADING" in q.webkitIDBRequest && 1 === q.webkitIDBTransaction.READ_WRITE ? q.webkitIDBTransaction : Vb, I = Wb.READ_ONLY, J = Wb.READ_WRITE, Xb = Wb.VERSION_CHANGE, Yb = q.indexedDB || q.mozIndexedDB || q.webkitIndexedDB || q.moz_indexedDB || q.msIndexedDB;
C.prototype.done = C.prototype.n;
C.prototype.fail = C.prototype.gb;
C.prototype.always = C.prototype.B;
H.prototype.then = H.prototype.then;
function Zb(a, b) {
  var c, d;
  2 == arguments.length && u(arguments[1]) ? (c = !0, d = arguments[1].split(".")) : d = (c = t(b)) ? b : arguments;
  for (c = c ? 0 : 1;c < d.length && (a = a[d[c]], r(a));c++) {
  }
  return a;
}
function $b(a, b, c) {
  if (a) {
    if (-1 == b.indexOf(".")) {
      a[b] = c;
    } else {
      b = b.split(".");
      for (var d = b.pop(), e;e = b.shift();) {
        y(a[e]) || (a[e] = {}), a = a[e];
      }
      a[d] = c;
    }
  }
}
var ac = {};
function bc(a) {
  a = [a];
  for (var b = new cc, c = 0, d, e;void 0 !== (e = a.pop());) {
    0 === c % 4 && 12 < c + 4 && (b.write(c), c = 0);
    d = typeof e;
    if (e instanceof Array) {
      if (c += 4, 0 < e.length) {
        a.push(ac);
        for (d = e.length;d--;) {
          a.push(e[d]);
        }
        continue;
      } else {
        b.write(c);
      }
    } else {
      if ("number" === d) {
        c += 1, b.write(c), dc(b, e);
      } else {
        if (e instanceof Date) {
          c += 2, b.write(c), dc(b, e.valueOf());
        } else {
          if ("string" === d) {
            c += 3;
            b.write(c);
            c = b;
            for (d = 0;d < e.length;d++) {
              var f = e.charCodeAt(d);
              126 >= f ? c.write(f + 1) : 16510 >= f ? (f -= 127, c.write(128 | f >> 8, f & 255)) : c.write(192 | f >> 10, f >> 2 | 255, (f | 3) << 6);
            }
            c.write(0);
          } else {
            if (e === ac) {
              b.write(0);
            } else {
              return "";
            }
          }
        }
      }
    }
    c = 0;
  }
  return b.trim().toString();
}
function dc(a, b) {
  var c, d, e;
  c = b;
  var f = e = d = 0;
  if (0 !== c) {
    if (isFinite(c)) {
      0 > c && (d = 1, c = -c);
      f = 0;
      if (2.2250738585072014E-308 <= c) {
        for (e = c;1 > e;) {
          f--, e *= 2;
        }
        for (;2 <= e;) {
          f++, e /= 2;
        }
        e = f + 1023;
      }
      f = e ? Math.floor(4503599627370496 * (c / Math.pow(2, f) - 1)) : Math.floor(c / 4.9E-324);
    } else {
      e = 2047, isNaN(c) ? f = 0x8000000000000 : -Infinity === c && (d = 1);
    }
  }
  c = d;
  d = e;
  e = f;
  c && (e = 0xfffffffffffff - e, d = 2047 - d);
  a.write((c ? 0 : 128) | d >> 4);
  a.write((d & 15) << 4 | 0 | e / 281474976710656);
  e %= 281474976710656;
  c = 0 | e / 4294967296;
  a.write(c >> 8, c & 255);
  e %= 4294967296;
  c = 0 | e / 65536;
  a.write(c >> 8, c & 255);
  c = e % 65536;
  a.write(c >> 8, c & 255);
}
function ec(a) {
  var b = fc(a) | 0, c = b >> 7 ? !1 : !0, d = c ? -1 : 1, e = (b & 127) << 4, b = fc(a) | 0, e = e + (b >> 4);
  c && (e = 2047 - e);
  for (var b = [c ? 15 - (b & 15) : b & 15], f = 6;f--;) {
    b.push(c ? 255 - (fc(a) | 0) : fc(a) | 0);
  }
  a = 0;
  for (f = 7;f--;) {
    a = a / 256 + b[f];
  }
  a /= 16;
  return 0 === a && 0 === e ? 0 : (a + 1) * Math.pow(2, e - 1023) * d;
}
function gc(a) {
  for (var b = [], c = 0, d = 0, e = 0, f, g;;) {
    f = fc(a);
    if (0 === f || null == f) {
      break;
    }
    0 === c ? (g = f >> 6, 2 > g && !isNaN(f) ? b.push(String.fromCharCode(f - 1)) : (c = g, d = f << 10, e++)) : 2 === c ? (b.push(String.fromCharCode(d + f + 127)), c = d = e = 0) : 2 === e ? (d += f << 2, e++) : (b.push(String.fromCharCode(d | f >> 6)), c = d = e = 0);
  }
  return b.join("");
}
function hc(a) {
  this.a = null;
  this.b = a;
  this.c = this.b.length - 1;
  this.index = -1;
}
function fc(a) {
  return a.a = a.index < a.c ? parseInt(a.b[++a.index] + a.b[++a.index], 16) : null;
}
function cc() {
  this.a = [];
  this.b = void 0;
}
cc.prototype.write = function(a) {
  for (var b = 0;b < arguments.length;b++) {
    this.b = arguments[b].toString(16), this.a.push(2 === this.b.length ? this.b : this.b = "0" + this.b);
  }
};
cc.prototype.trim = function() {
  for (var a = this.a.length;"00" === this.a[--a];) {
  }
  this.a.length = ++a;
  return this;
};
cc.prototype.toString = function() {
  return this.a.length ? this.a.join("") : "";
};
function ic(a, b) {
  var c = bc(a), d = bc(b);
  return c > d ? 1 : c == d ? 0 : -1;
}
;function K(a, b, c) {
  H.call(this, 0, c);
  this.l = a;
  this.f = [];
  this.q = [];
  this.Ya = [];
  this.a = null;
  this.Y = "";
  this.Q = 0;
}
z(K, H);
l = K.prototype;
l.Y = "";
l.logger = null;
function jc(a, b, c) {
  a.a = b;
  a.Y = c;
  if (b) {
    for (c = 0;c < a.q.length;c++) {
      a.q[c][0].call(a.q[c][1], b);
    }
    a.q.length = 0;
  }
}
function kc(a) {
  var b = new K(a.l);
  a.Q++;
  jc(b, a.a, a.Y + "C" + a.Q);
  return b;
}
l.hb = function() {
  return!!this.a;
};
l.abort = function() {
  if (this.a) {
    if (ca(this.a.abort)) {
      this.a.abort();
    } else {
      if (ca(this.a.executeSql)) {
        this.a.executeSql("ABORT", [], function() {
        }, function() {
          return!0;
        });
      } else {
        throw new rb;
      }
    }
  } else {
    throw new lc("");
  }
};
function L(a, b, c) {
  var d = a.Ya.shift();
  c = !!c;
  d ? d[0].call(d[1], b, c, function(b, c) {
    L(a, b, c);
  }) : c ? a.j(b) : a.callback(b);
}
function mc(a, b, c) {
  a.Ya.push([b, c]);
}
function M(a, b, c) {
  a.a ? b.call(c, a.a) : a.q.push([b, c]);
}
l.callback = function(a) {
  K.r.callback.call(this, a);
};
l.j = function(a) {
  K.r.j.call(this, a);
};
function nc(a) {
  var b = "";
  a.Y && (b = a.a ? "*" : "", b = "[" + a.Y + b + "]");
  return a.l + b;
}
function oc(a, b) {
  var c = new K(a);
  L(c, b);
  return c;
}
l.toString = function() {
  return "Request:" + nc(this);
};
l.za = function() {
  this.g && this.c && nb(this) && (ob(this.g), this.g = 0);
  this.d && (this.d.w--, delete this.d);
  for (var a = this.e, b = !1;this.i.length && !this.m;) {
    var c = this.i.shift(), d = c[0], e = c[1], c = c[2];
    if (d = this.b ? e : d) {
      d = d.call(c || this.U, a), r(d) && (this.b = this.b && (d == a || d instanceof Error), this.e = a = d), ma(a) && (this.m = b = !0);
    }
  }
  this.e = a;
  b && (b = ha(this.ma, this, !0), d = ha(this.ma, this, !1), a instanceof C ? (kb(a, b, d), a.G = !0) : a.then(b, d));
};
l.toJSON = function() {
  var a = (this.Y || "").match(/B(\d+)T(\d+)(?:Q(\d+?))?(?:R(\d+))?/) || [];
  return{method:this.l ? this.l.split(":") : [], branchNo:parseFloat(a[1]), transactionNo:parseFloat(a[2]), queueNo:parseFloat(a[3]), requestNo:parseFloat(a[4])};
};
var pc = Yb && Yb.cmp ? ha(Yb.cmp, Yb) : ic, qc = [];
function rc() {
  0 != sc && (tc[this[da] || (this[da] = ++ea)] = this);
}
var sc = 0, tc = {};
rc.prototype.F = !1;
rc.prototype.oa = function() {
  if (!this.F && (this.F = !0, this.M(), 0 != sc)) {
    var a = this[da] || (this[da] = ++ea);
    delete tc[a];
  }
};
rc.prototype.M = function() {
  if (this.G) {
    for (;this.G.length;) {
      this.G.shift()();
    }
  }
};
function uc(a, b) {
  this.type = a;
  this.a = this.target = b;
  this.Xa = !0;
}
uc.prototype.oa = function() {
};
uc.prototype.preventDefault = function() {
  this.Xa = !1;
};
function vc(a, b) {
  uc.call(this, a, b);
}
z(vc, uc);
vc.prototype.h = function() {
  return this.b;
};
function wc(a, b, c, d, e) {
  uc.call(this, a, b);
  this.version = c;
  this.cb = d;
  this.Va = e;
}
z(wc, vc);
l = wc.prototype;
l.name = "ReadyEvent";
l.version = NaN;
l.cb = NaN;
l.Va = null;
l.Eb = function() {
  return this.version;
};
l.jb = function() {
  return this.cb;
};
l.ib = function() {
  return this.Va;
};
function xc(a, b, c) {
  uc.call(this, c || "error", a);
  this.error = b;
}
z(xc, vc);
xc.prototype.toString = function() {
  return this.name + ":" + (this.error ? this.error : "");
};
xc.prototype.name = "ErrorEvent";
xc.prototype.error = null;
xc.prototype.c = function() {
  return this.error;
};
function yc(a, b) {
  xc.call(this, a, b, "fail");
}
z(yc, xc);
yc.prototype.name = "FailEvent";
function zc(a, b, c, d, e) {
  uc.call(this, a, b);
  this.b = c;
  this.key = d;
  this.value = e;
}
z(zc, vc);
zc.prototype.name = "RecordEvent";
zc.prototype.c = function() {
  return this.key;
};
zc.prototype.u = function() {
  return this.value;
};
function Ac(a, b, c, d, e) {
  uc.call(this, a, b);
  this.b = c;
  this.c = d;
  this.H = e;
}
z(Ac, vc);
Ac.prototype.name = "StoreEvent";
Ac.prototype.ba = function() {
  return this.c;
};
Ac.prototype.Ba = function() {
  return this.H;
};
function Bc(a, b, c) {
  var d;
  if (y(a)) {
    d = a.store, b = a.id, null != a.parent && (c = new Bc(a.parent));
  } else {
    if (r(b)) {
      d = a;
    } else {
      if (d = a.lastIndexOf("^|"), b = a, 0 < d && (b = a.substr(d), c = new Bc(a.substring(0, d))), b = b.split("^:"), d = b[0], b = b[1], !r(b)) {
        throw Error("Invalid key value: " + a);
      }
    }
  }
  this.b = d;
  this.id = b;
  this.a = c || null;
}
l = Bc.prototype;
l.toJSON = function() {
  var a = {store:this.b, id:this.id};
  this.a && (a.parent = this.a.toJSON());
  return a;
};
l.valueOf = function() {
  return(this.a ? this.a.valueOf() + "^|" : "") + this.b + "^:" + this.id;
};
l.toString = function() {
  return this.valueOf().replace("^|", "|").replace("^:", ":");
};
l.h = function() {
  return this.b;
};
l.s = function() {
  return this.id;
};
l.wb = function() {
  return this.a;
};
function Cc(a) {
  return w(a) || u(a) || s(a) && Va(a, Cc) || a instanceof Date;
}
function Dc(a) {
  if (t(a)) {
    for (var b = [], c = 0, d = a.length;c < d;c++) {
      b[c] = a[c];
    }
    return b;
  }
  return a;
}
;function N(a, b, c, d) {
  this.lower = a;
  this.upper = b;
  this.lowerOpen = !!c;
  this.upperOpen = !!d;
}
N.prototype.lower = void 0;
N.prototype.upper = void 0;
N.prototype.toJSON = function() {
  var a;
  a = this || {};
  return{lower:a.lower, upper:a.upper, lowerOpen:a.lowerOpen, upperOpen:a.upperOpen};
};
function Ec(a) {
  return Fc(a);
}
N.only = function(a) {
  return new N(a, a, !1, !1);
};
N.bound = function(a, b, c, d) {
  return new N(a, b, c, d);
};
N.upperBound = function(a, b) {
  return new N(void 0, a, void 0, !!b);
};
N.lowerBound = function(a, b) {
  return new N(a, void 0, !!b, void 0);
};
function Gc(a) {
  var b;
  if (s(a)) {
    b = Za(a), b.push("\uffff");
  } else {
    if (u(a)) {
      b = a + "\uffff";
    } else {
      if (w(a)) {
        b = a + 2.220460492503131E-16, a -= 2.220460492503131E-16;
      } else {
        return N.only(a);
      }
    }
  }
  return N.bound(a, b, !1, !0);
}
function Fc(a) {
  return null != a ? null != a.upper && null != a.lower ? Hc.bound(a.lower, a.upper, !!a.lowerOpen, !!a.upperOpen) : null != a.upper ? Hc.upperBound(a.upper, a.upperOpen) : null != a.lower ? Hc.lowerBound(a.lower, a.lowerOpen) : null : null;
}
function Ic(a, b) {
  var c = a.lower, d = a.upper, e = a.lowerOpen, f = a.upperOpen;
  null != b.lower && (null == a.lower || b.lower >= a.lower) && (c = b.lower, e = b.lowerOpen || a.lowerOpen);
  null != b.upper && (null == a.upper || b.upper <= a.upper) && (d = b.upper, f = b.upperOpen || a.upperOpen);
  return N.bound(c, d, e, f);
}
function Jc(a, b, c, d) {
  var e, f, g, h;
  if ("starts" == a || "^" == a) {
    return Gc(b);
  }
  if ("<" == a || "<=" == a) {
    e = b, g = "<" == a;
  } else {
    if (">" == a || ">=" == a) {
      f = b, h = ">" == a;
    } else {
      if ("=" == a || "==" == a) {
        e = f = b;
      } else {
        throw new D("invalid op: " + a);
      }
    }
  }
  if ("<" == c || "<=" == c) {
    e = d, g = "<" == c;
  } else {
    if (">" == c || ">=" == c) {
      f = d, h = ">" == c;
    } else {
      if (r(c)) {
        throw new D("invalid op2: " + c);
      }
    }
  }
  return N.bound(f, e, h, g);
}
var Hc = q.IDBKeyRange || q.webkitIDBKeyRange || N;
function Kc(a, b, c, d, e, f) {
  r(e) || (e = s(a) ? a.join(", ") : a);
  if (null != a && !u(a) && !t(a)) {
    throw new D("index keyPath for " + e + " must be a string or array, but " + a + " is " + typeof a);
  }
  !r(a) && r(e) && (a = e);
  this.keyPath = a;
  this.e = t(this.keyPath);
  this.a = e;
  this.type = Lc(b);
  if (r(b)) {
    if (!r(this.type)) {
      throw new D("type invalid in index: " + this.a);
    }
    if (s(this.keyPath)) {
      throw new D('composite key for store "' + this.a + '" must not specified type');
    }
  }
  this.unique = !!c;
  this.multiEntry = !!d;
  this.d = u(e) ? e : s(a) ? this.keyPath.join(",") : a;
  sa(this.d);
  this.b = this.e ? null : this.keyPath.split(".");
  this.c = f || null;
}
var Mc = ["BLOB", "DATE", "INTEGER", "NUMERIC", "TEXT"];
function Lc(a) {
  if (u(a)) {
    return a = Ra(Mc, a), Mc[a];
  }
}
Kc.prototype.getName = function() {
  return this.a;
};
Kc.prototype.toJSON = function() {
  return{name:this.a, keyPath:this.keyPath, type:this.type, unique:this.unique, multiEntry:this.multiEntry};
};
Kc.prototype.clone = function() {
  var a = s(this.keyPath) ? Za(this.keyPath) : this.keyPath;
  return new Kc(a, this.type, this.unique, this.multiEntry, this.a, this.c);
};
function Nc(a, b) {
  return null != a || null != b ? null != a ? null != b ? t(a) && t(b) ? cb(a, b) ? null : "expect: " + a + ", but: " + b : Oc(a, b) ? null : "expect: " + a + ", but: " + b : "keyPath: " + a + " no longer defined" : "newly define " + b : null;
}
;function Pc(a, b, c, d, e, f, g, h) {
  this.a = a;
  if (!u(this.a)) {
    throw new D("store name must be a string");
  }
  this.keyPath = r(b) ? b : null;
  this.d = t(this.keyPath);
  if (null !== this.keyPath && !u(this.keyPath) && !this.d) {
    throw new D("keyPath must be a string or array");
  }
  this.autoIncrement = c;
  var k;
  if (null != d) {
    k = Lc(d);
    if (!r(k)) {
      throw new D('type "' + d + '" for primary key in store "' + this.a + '" is invalid.');
    }
    if (this.d) {
      throw new D('composite key for store "' + this.a + '" must not specified type');
    }
  }
  this.type = null != k ? k : this.autoIncrement ? "INTEGER" : void 0;
  this.b = u(this.keyPath) ? this.keyPath.split(".") : [];
  this.indexes = e || [];
  this.O = !!f;
  this.eb = !!g;
  this.f = s(this.keyPath) ? this.keyPath.join(",") : u(this.keyPath) ? this.keyPath : "_ROWID_";
  sa(this.f);
  this.e = !!h;
  this.c = [];
}
l = Pc.prototype;
l.O = !1;
l.eb = !1;
l.toJSON = function() {
  for (var a = [], b = 0;b < this.indexes.length;b++) {
    a.push(this.indexes[b].toJSON());
  }
  return{name:this.a, keyPath:this.keyPath, autoIncrement:this.autoIncrement, type:this.type, indexes:a};
};
function Qc(a) {
  var b = [], c = a.indexes || [];
  if (s(c)) {
    for (var d = 0;d < c.length;d++) {
      var e;
      e = c[d];
      e = new Kc(e.keyPath, e.type, e.unique, e.multiEntry, e.name, e.generator);
      r(e.keyPath) && e.keyPath === a.keyPath || b.push(e);
    }
  }
  return new Pc(a.name, a.keyPath, a.autoIncrement, "undefined" === a.type || "null" === a.type ? void 0 : a.type, b, a.dispatchEvents, a.fixed, a.encrypted);
}
l.clone = function() {
  return Qc(this.toJSON());
};
l.index = function(a) {
  return this.indexes[a] || null;
};
function Rc(a, b) {
  return Wa(a.indexes, function(a) {
    return a.getName() == b;
  });
}
function Sc(a, b) {
  for (var c = 0;c < a.indexes.length;c++) {
    if (!Nc(a.indexes[c].keyPath, b)) {
      return a.indexes[c];
    }
  }
  return null;
}
function Tc(a, b) {
  return b === a.keyPath ? !0 : Ua(a.indexes, function(a) {
    return a.getName() == b;
  });
}
l.getName = function() {
  return this.a;
};
function Uc(a, b, c) {
  if (b) {
    if (!a.keyPath && null != c) {
      return c;
    }
    if (a.d) {
      c = [];
      for (var d = 0;d < a.keyPath.length;d++) {
        c.push(Zb(b, a.keyPath[d]));
      }
      return c;
    }
    if (a.keyPath) {
      return ub(b, a.b);
    }
  }
}
function Vc(a, b, c) {
  for (var d = 0;d < a.b.length;d++) {
    var e = a.b[d];
    if (d == a.b.length - 1) {
      b[e] = c;
      break;
    }
    r(b[e]) || (b[e] = {});
    b = b[e];
  }
}
function Wc(a, b) {
  if (!b) {
    return "missing store: " + a.a;
  }
  if (a.a != b.a) {
    return "store name, expect: " + a.a + ", but: " + b.a;
  }
  var c = Nc(a.keyPath, b.keyPath);
  if (c) {
    return "keyPath, " + c;
  }
  if (r(a.autoIncrement) && r(b.autoIncrement) && a.autoIncrement != b.autoIncrement) {
    return "autoIncrement, expect:  " + a.autoIncrement + ", but: " + b.autoIncrement;
  }
  if (a.indexes.length != b.indexes.length) {
    return "indexes length, expect:  " + a.indexes.length + ", but: " + b.indexes.length;
  }
  if (r(a.type) && r(b.type) && (t(a.type) ? !cb(a.type, b.type) : a.type != b.type)) {
    return "data type, expect:  " + a.type + ", but: " + b.type;
  }
  for (c = 0;c < a.indexes.length;c++) {
    var d = Rc(b, a.indexes[c].getName()), e;
    e = a.indexes[c];
    if (d) {
      if (e.a != d.a) {
        e = "name, expect: " + e.a + ", but: " + d.a;
      } else {
        var f = Nc(e.keyPath, d.keyPath);
        e = f ? "keyPath, " + f : null != e.unique && null != d.unique && e.unique != d.unique ? "unique, expect: " + e.unique + ", but: " + d.unique : null != e.multiEntry && null != d.multiEntry && e.multiEntry != d.multiEntry ? "multiEntry, expect: " + e.multiEntry + ", but: " + d.multiEntry : r(e.type) && r(d.type) && (t(e.type) ? !cb(e.type, d.type) : e.type != d.type) ? "data type, expect: " + e.type + ", but: " + d.type : "";
      }
    } else {
      e = "no index for " + e.a;
    }
    if (0 < e.length) {
      return'index "' + a.indexes[c].getName() + '" ' + e;
    }
  }
  return "";
}
function Xc(a, b) {
  if (b) {
    for (var c = 0;c < a.indexes.length;c++) {
      var d = a.indexes[c], e = b;
      if (d.c) {
        var f = d.c(e), g = typeof f;
        if ("string" == g || "number" == g || f instanceof Date || s(f)) {
          for (g = 0;g < d.b.length - 1;g++) {
            y(e[d.b[g]]) || (e[d.b[g]] = {});
          }
          e[d.b[d.b.length - 1]] = f;
        }
      }
    }
  }
}
function Yc(a, b) {
  a.c.push(b);
}
function Zc(a, b, c, d, e) {
  for (var f = 0;f < a.c.length;f++) {
    d !== f && a.c[f].call(e, b, c);
  }
}
;function $c(a) {
  return eval("(" + a + ")");
}
function ad() {
}
function bd(a, b, c) {
  switch(typeof b) {
    case "string":
      cd(b, c);
      break;
    case "number":
      c.push(isFinite(b) && !isNaN(b) ? b : "null");
      break;
    case "boolean":
      c.push(b);
      break;
    case "undefined":
      c.push("null");
      break;
    case "object":
      if (null == b) {
        c.push("null");
        break;
      }
      if (s(b)) {
        var d = b.length;
        c.push("[");
        for (var e = "", f = 0;f < d;f++) {
          c.push(e), bd(a, b[f], c), e = ",";
        }
        c.push("]");
        break;
      }
      c.push("{");
      d = "";
      for (e in b) {
        Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), cd(e, c), c.push(":"), bd(a, f, c), d = ","));
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof b);;
  }
}
var dd = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, ed = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function cd(a, b) {
  b.push('"', a.replace(ed, function(a) {
    if (a in dd) {
      return dd[a];
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return dd[a] = e + b.toString(16);
  }), '"');
}
;function fd(a) {
  return!u(a) || /^[\s\xa0]*$/.test(a) ? {} : "undefined" == typeof q.JSON ? $c(a) : JSON.parse(a);
}
function gd(a) {
  var b;
  try {
    b = hd(a);
  } catch (c) {
    b = "";
  }
  return b ? b.substr(0, 70) + (70 < b.length ? "..." : "") : "";
}
function hd(a) {
  if ("undefined" == typeof q.JSON) {
    var b = [];
    bd(new ad, a, b);
    a = b.join("");
  } else {
    a = JSON.stringify(a, void 0, void 0);
  }
  return a;
}
;function id(a, b, c) {
  this.b = a;
  this.a = b;
  this.c = c || 1;
}
id.prototype.h = function() {
  return this.b;
};
function jd(a, b, c, d) {
  this.name = a;
  this.indexes = b;
  this.b = c || "";
  this.c = d || null;
  this.a = null;
}
jd.prototype.getName = function() {
  return this.name;
};
jd.prototype.count = function() {
  return this.indexes.length;
};
jd.prototype.index = function(a) {
  return this.indexes[a];
};
function kd(a, b, c) {
  return Wa(a.indexes, function(a) {
    return a.h() == b && a.a == c;
  });
}
function ld(a) {
  if (!s(a.sources)) {
    throw new D("indexes require for full text search index " + a.name + ", but " + a.sources + " of type " + typeof a.sources + " found.");
  }
  var b = a.sources.map(function(a) {
    return new id(a.storeName, a.keyPath, a.weight);
  });
  return new jd(a.name, b, a.lang);
}
;function md(a, b) {
  var c, d, e = b;
  if (y(a)) {
    d = a;
    c = d.version;
    for (var e = [], f = d.stores || [], g = 0;g < f.length;g++) {
      var h = Qc(f[g]);
      e.push(h);
    }
  } else {
    u(a) ? c = 0 == a.length ? void 0 : parseFloat(a) : w(a) && (c = a);
  }
  if (r(c)) {
    if (!w(c) || 0 > c) {
      throw new D("Invalid version: " + c + " (" + a + ")");
    }
    isNaN(c) && (c = void 0);
  }
  if (r(b) && (!s(b) || 0 < b.length && !(b[0] instanceof Pc))) {
    throw new D("stores");
  }
  this.version = c;
  this.c = !r(this.version);
  this.stores = e || [];
  c = [];
  if (d && d.fullTextCatalogs) {
    for (g = 0;g < d.fullTextCatalogs.length;g++) {
      e = ld(d.fullTextCatalogs[g]), c[g] = e, P(this, e.getName()) || (f = [new Kc("k", "TEXT"), new Kc("v", "TEXT")], e = new Pc(e.getName(), "id", !1, void 0, f, !1, !1, !1), this.stores.push(e));
    }
  }
  this.b = c;
}
md.prototype.toJSON = function() {
  var a = Ta(this.stores, function(a) {
    return a.toJSON();
  }), b = {};
  b.stores = a;
  r(this.version) && (b.version = this.version);
  return b;
};
md.prototype.c = !1;
md.prototype.a = function() {
  return!1;
};
function nd(a) {
  return Ta(a.stores, function(a) {
    return a.getName();
  });
}
md.prototype.count = function() {
  return this.stores.length;
};
function P(a, b) {
  return Wa(a.stores, function(a) {
    return a.getName() == b;
  });
}
function od(a, b) {
  return Ua(a.stores, function(a) {
    return a.getName() == b;
  });
}
function pd(a, b) {
  if (!b || a.stores.length != b.stores.length) {
    return "Number of store: " + a.stores.length + " vs " + b.stores.length;
  }
  for (var c = 0;c < a.stores.length;c++) {
    var d = P(b, a.stores[c].getName());
    if (d) {
      for (var e = d, f = a.stores[c], g = 0;g < f.indexes.length;g++) {
        var h = f.indexes[g];
        Tc(e, h.getName()) || "BLOB" != h.type || (h = new Kc(h.keyPath, h.type, h.unique, h.multiEntry, h.getName()), e.indexes.push(h));
      }
      d = Wc(a.stores[c], d);
      if (0 < d.length) {
        return'store: "' + a.stores[c].getName() + '" ' + d;
      }
    } else {
      return'missing object store "' + a.stores[c].getName() + '"';
    }
  }
  return "";
}
function qd(a, b) {
  return Wa(a.b, function(a) {
    return a.getName() == b;
  });
}
;function rd(a, b) {
  md.call(this, a, b);
}
z(rd, md);
rd.prototype.a = function() {
  return!0;
};
function sd(a, b) {
  a.stores.push(b);
}
;function td(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, td) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.ArgumentException";
}
z(td, Error);
z(td, Error);
function ud(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, ud) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.NotImplementedException";
}
z(ud, Error);
function vd(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, vd) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.InternalError";
}
z(vd, Error);
vd.prototype.name = "ydn.InternalError";
function wd(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, wd) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.ConstraintError";
}
z(wd, Error);
wd.prototype.name = "ydn.error.ConstraintError";
function xd(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, xd) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.InvalidOperationException";
}
z(td, Error);
function yd(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, yd) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.error.InvalidOperationError";
}
z(yd, Error);
function Oc(a, b) {
  var c;
  c = c || {};
  if (null != a && null != b) {
    if (t(a) && t(b)) {
      if (a.length != b.length) {
        return!1;
      }
      for (var d = 0;d < a.length;d++) {
        if (-1 == Wa(b, function(b) {
          return Oc(b, a[d]);
        })) {
          return!1;
        }
      }
      return!0;
    }
    if (t(a)) {
      return 1 == a.length && Oc(a[0], b);
    }
    if (t(b)) {
      return 1 == b.length && Oc(b[0], a);
    }
    if (y(a) && y(a)) {
      for (var e in a) {
        if (a.hasOwnProperty(e) && !c[e]) {
          var f = Oc(a[e], b[e]);
          if (!f) {
            return!1;
          }
        }
      }
      for (e in b) {
        if (b.hasOwnProperty(e) && !c[e] && (f = Oc(a[e], b[e]), !f)) {
          return!1;
        }
      }
      return!0;
    }
    return a === b;
  }
  return!1;
}
;/*
 Copyright 2012 YDN Authors, Yathit. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");.
*/
function Q(a, b, c) {
  var d = c || {};
  this.G = d.mechanisms || zd;
  this.Q = r(d.connectionTimeout) ? d.connectionTimeout : 6E4;
  this.b = null;
  this.f = [];
  this.sa = !1;
  var e;
  if (b instanceof md) {
    e = b;
  } else {
    if (y(b)) {
      d.autoSchema || !r(b.stores) ? e = new rd(b) : e = new md(b);
      var f = b.stores ? b.stores.length : 0;
      for (c = 0;c < f;c++) {
        P(e, b.stores[c].name);
      }
    } else {
      e = new rd;
    }
  }
  this.Za(d.Encryption);
  this.c = e;
  for (c = 0;c < this.c.count();c++) {
    (this.c.stores[c] || null).e && this.Oa(this.c.stores[c] || null);
  }
  r(a) && this.q(a);
  this.i = null;
  this.e = new C;
}
Q.prototype.logger = null;
Q.prototype.U = function(a) {
  if (r(a)) {
    var b = function(b) {
      a(b.toJSON());
      a = void 0;
    };
    if (this.b) {
      Ad(this.b, b);
    } else {
      var c = this;
      this.$(function(a) {
        Ad(c.b, b, a);
      }, null, I);
    }
  }
  return this.c ? this.c.toJSON() : null;
};
function Bd(a, b) {
  var c = b instanceof Pc ? b : Qc(b), d = P(a.c, b.name);
  if (0 == Wc(c, d).length) {
    (new C).callback(!1);
  } else {
    if (a.c instanceof rd) {
      sd(a.c, c), a.b ? (a.b.close(), a.b = null, Cd(a)) : (new C).callback(!1);
    } else {
      throw new wd("");
    }
  }
}
Q.prototype.q = function(a) {
  if (this.b) {
    throw new sb("Already connected with " + this.g);
  }
  this.g = a;
  Cd(this);
};
Q.prototype.getName = function() {
  return this.g;
};
var zd = "indexeddb sqlite websql localstorage sessionstorage userdata memory".split(" ");
l = Q.prototype;
l.ya = function() {
  return null;
};
function Cd(a) {
  function b(b, e) {
    b ? (a.Ta = NaN, d.Ja = function(b) {
      a.C(new xc(a, b));
    }, d.bb = function(b) {
      a.C(new yc(a, b));
      a.b = null;
    }, d.Wa = function(b) {
      a.C(b);
    }, setTimeout(function() {
      Dd(a, e);
      Ed(a);
    }, 10), c.callback(e)) : (setTimeout(function() {
      Dd(a, new yc(a, e));
      if (a.f) {
        for (var b;b = a.f.shift();) {
          b.A && b.A("error", e);
        }
      }
    }, 10), c.j(e));
  }
  for (var c = new C, d = null, e = a.G, f = 0;f < e.length;f++) {
    var g = e[f].toLowerCase();
    if (d = a.ya(g)) {
      d = a.ya(g);
      break;
    }
  }
  null === d ? (e = new wd("No storage mechanism found."), b(!1, new yc(a, e))) : kb(Fd(d, a.g, a.c), function(a) {
    this.b = d;
    b(!0, new wc("ready", this, parseFloat(d.o ? parseFloat(d.o.version) : void 0), parseFloat(a), null));
  }, function(a) {
    b(!1, a);
  }, a);
}
l.wa = function() {
  if (this.b) {
    return "indexeddb";
  }
};
l.ua = function(a, b) {
  this.e.B(a, b);
};
function Dd(a, b) {
  setTimeout(function() {
    a.c.c && a.e.c || (b instanceof xc ? a.e.j(b.error) : a.e.callback(), a.C(b));
  }, 4);
}
function Gd(a) {
  return!!a.b && !!a.b.o;
}
l.close = function() {
  this.b && (this.b.close(), this.b = null);
};
l.Bb = function() {
  return this.b ? this.b.o || null : null;
};
l.Ta = NaN;
function Ed(a) {
  var b = a.f.shift();
  b && a.$(b.pa, b.ob, b.mode, b.A);
  a.Ta = ja();
}
l.sa = !1;
l.$ = function(a, b, c, d) {
  var e = b;
  u(b) ? e = [b] : null != b || (e = null);
  if (this.b && this.b.o && !this.sa) {
    var f = this, g = r(c) ? c : I;
    g == Xb && (this.sa = !0);
    Hd(this.b, function(b) {
      a(b);
      a = null;
    }, e, g, function(a, b) {
      ca(d) && (d(a, b), d = void 0);
      g == Xb && (f.sa = !1);
      Ed(f);
    });
  } else {
    this.f.push({pa:a, ob:e, mode:c, A:d});
  }
};
l.Oa = function() {
};
l.Za = function() {
  return!1;
};
l.Pa = function() {
};
l.C = function() {
};
Q.prototype.close = Q.prototype.close;
Q.prototype.getType = Q.prototype.wa;
Q.prototype.getName = Q.prototype.getName;
Q.prototype.getSchema = Q.prototype.U;
Q.prototype.onReady = Q.prototype.ua;
Q.prototype.setName = Q.prototype.q;
Q.prototype.transaction = Q.prototype.$;
Q.prototype.db = Q.prototype.Bb;
ka("ydn.db.version", "1.0.3");
ka("ydn.db.cmp", pc);
ka("ydn.db.deleteDatabase", function(a, b) {
  for (var c, d = 0;d < qc.length;d++) {
    var e = qc[d](a, b);
    e && (c = e);
  }
  return c || oc("vc", null);
});
wc.prototype.name = wc.prototype.name;
wc.prototype.getVersion = wc.prototype.Eb;
wc.prototype.getOldVersion = wc.prototype.jb;
wc.prototype.getOldSchema = wc.prototype.ib;
xc.prototype.getError = xc.prototype.c;
K.prototype.abort = K.prototype.abort;
K.prototype.canAbort = K.prototype.hb;
H.prototype.progress = H.prototype.F;
H.prototype.promise = H.prototype.rb;
function Id(a, b, c) {
  rc.call(this);
  this.U = c;
  this.V = c.getName();
  this.l = void 0;
  this.m = !1;
  this.Ma = null;
  this.e = a;
  this.w = 0;
  this.f = this.d = !1;
  this.q = this.c = this.b = void 0;
  this.g = function() {
    throw new tb;
  };
  this.i = function() {
    throw new tb;
  };
  this.Q = function() {
  };
}
z(Id, rc);
function Jd(a, b, c, d, e) {
  if (r(b)) {
    var f = a.U;
    b = s(b) ? Sc(f, b) : Rc(f, b);
    a.l = b.getName();
  }
  a.m = u(a.l);
  a.Ma = c || null;
  a.w = 0;
  a.d = !1;
  a.f = !1;
  a.ia = "prev" == d || "prevunique" == d;
  a.unique = "nextunique" == d || "prevunique" == d;
  a.I = d;
  a.Ca = e;
  a.b = void 0;
  a.c = void 0;
  a.q = void 0;
}
l = Id.prototype;
l.I = "";
l.Ma = null;
l.unique = !1;
l.ia = !1;
l.Ca = !0;
l.logger = null;
function Kd(a, b, c, d) {
  null == b && (a.d = !0);
  a.b = b;
  a.c = c;
  a.q = d;
  a.w++;
  a.d ? (a.g(), Ld(a)) : a.g(a.b);
}
l.M = function() {
  this.e = null;
};
function Ld(a) {
  null != a.c ? a.c = Dc(a.c) : a.c = void 0;
  null != a.b ? a.b = Dc(a.b) : a.b = void 0;
  a.Q(a.f, a.b, a.c);
}
l.open = function(a, b, c, d) {
  this.e = a;
  this.d = this.f = !1;
  this.b = c;
  this.c = d;
  this.openCursor(this.b, this.c);
};
function Md(a) {
  a.f = !0;
  Ld(a);
}
l.Sa = function() {
  return this.w;
};
l.Db = function() {
  return this.b;
};
l.p = function() {
  return this.m ? this.c : this.b;
};
l.u = function() {
  return this.Ca ? this.p() : this.q;
};
l.La = function() {
};
l.ha = function() {
};
function Nd() {
}
;function R(a, b, c, d, e, f, g) {
  this.f = a;
  this.c = b;
  this.e = g;
  this.l = !!this.c;
  this.a = r(f) ? f : !!u(this.c);
  a = "next";
  d && e ? a = "prevunique" : d ? a = "prev" : e && (a = "nextunique");
  this.i = a;
  this.b = Fc(c);
  this.d = Od;
  this.q = NaN;
}
z(R, Nd);
R.prototype.a = !0;
function Pd(a, b, c) {
  if (3 < arguments.length) {
    throw new D("too many argument");
  }
  R.call(this, a, void 0, b, c, void 0, !0);
}
z(Pd, R);
function Qd(a, b, c, d, e) {
  if (!u(b)) {
    throw new D("index name must be string");
  }
  R.call(this, a, b, c, d, e, !0);
}
z(Qd, R);
function Rd(a, b, c) {
  if (3 < arguments.length) {
    throw new D("too many argument");
  }
  R.call(this, a, void 0, b, c, void 0, !1);
}
z(Rd, R);
function Sd(a, b, c, d, e) {
  return new Rd(a, Jc(b, c, d, e));
}
function Td(a, b, c, d, e) {
  if (!u(b)) {
    throw new D("index name must be string");
  }
  R.call(this, a, b, c, d, e, !1);
}
z(Td, R);
var Od = "init";
l = R.prototype;
l.logger = null;
l.h = function() {
  return this.f;
};
l.sb = function() {
  return this.c;
};
l.$a = function() {
  return this.b ? this.b instanceof Hc ? this.b : Hc.bound(this.b.lower, this.b.upper, this.b.lowerOpen, this.b.upperOpen) : null;
};
l.ub = function() {
  return this.a;
};
l.lb = function() {
  return this.l;
};
l.clone = function() {
  var a = new R(this.f, this.c, this.b, this.N(), this.Z(), this.a, this.e);
  a.q = this.q;
  return a;
};
l.unique = function(a) {
  return new R(this.f, this.c, this.b, this.N(), a, this.a, this.e);
};
l.ab = function(a, b) {
  var c = new R(this.f, this.c, this.b, this.N(), this.Z(), this.a, this.e);
  c.g = a;
  c.m = b;
  c.d = "rest";
  return c;
};
l.vb = function() {
  return new R(this.f, this.c, this.b, !this.N(), this.Z(), this.a, this.e);
};
l.N = function() {
  return "prev" === this.i || "prevunique" === this.i;
};
l.Z = function() {
  return "nextunique" === this.i || "prevunique" === this.i;
};
l.kb = function() {
  return this.d;
};
l.load = function(a) {
  a = a[0];
  Jd(a, this.e || this.c, this.b, this.i, this.a);
  this.d = "busy";
  var b = this;
  a.Q = function(a, d, e) {
    b.g = d;
    b.m = e;
    b.d = a ? "rest" : "done";
  };
  a.openCursor(this.g, this.m);
  return a;
};
l.tb = function() {
  return this.g;
};
l.p = function() {
  return this.m;
};
l.Ha = function(a, b, c) {
  a = a || Od;
  "busy" != this.d && (this.g = b, this.m = c, this.d = a);
};
l.stores = function() {
  return[this.f];
};
function Ud(a, b, c, d) {
  if ("transaction" in a) {
    this.g = a, this.d = this.f = null;
  } else {
    if ("objectStore" in a) {
      this.g = null, this.f = a.db, this.d = a;
    } else {
      throw new td("storage instance require.");
    }
  }
  this.i = b;
  this.l = c;
  this.m = d;
  this.b = [];
  this.a = 0;
  this.c = !1;
}
Ud.prototype.logger = null;
Ud.prototype.c = !1;
function Vd(a, b) {
  a.a++;
  b.onsuccess = function(b) {
    if (b = b.target.result) {
      if (ca(a.m)) {
        var d = b.value;
        a.m(b.primaryKey, null != a.l ? d[a.l] : d);
      }
      if (b && 0 < a.b.length) {
        b["continue"](a.b.shift());
      } else {
        a.a--, 0 == a.a && a.L && a.L();
      }
    }
  };
  b.onerror = function() {
    a.a--;
    0 == a.a && a.L && a.L();
  };
}
function Wd(a, b) {
  0 == a.b.length && 0 == a.a ? b() : a.L = b;
}
function Xd(a) {
  if (!a.c) {
    var b = function() {
      a.d = null;
    }, c = function(b) {
      var c = a.b.shift();
      b = b.objectStore(a.i);
      Vd(a, b.openCursor(c));
    };
    if (a.d) {
      c(a.d);
    } else {
      if (a.f) {
        a.e = a.f.transaction([a.i], I), a.e.oncomplete = function() {
          b();
        }, a.e.onerror = function() {
          b();
        }, a.e.onabort = function() {
          b();
        };
      } else {
        if (a.g) {
          a.c = !0, a.g.$(function(b) {
            a.c = !1;
            c(b);
          }, [a.i], I, b);
        } else {
          throw new vd("");
        }
      }
    }
  }
}
;function Yd(a, b, c) {
  a && a instanceof Q ? this.ga = a : a && a.db && (this.ga = null, Zd(this, a));
  if (!u(b)) {
    throw new D("a store name required.");
  }
  this.c = b;
  if (r(c) && !u(c)) {
    throw new D("projection index name must be a string.");
  }
  this.va = c;
  this.S = null;
  this.b = [];
  this.a = [];
  this.ca = !1;
}
l = Yd.prototype;
l.logger = null;
l.ga = null;
l.Ia = null;
l.S = null;
l.pb = function(a) {
  this.Ia = a;
};
function Zd(a, b) {
  if (b.db) {
    a.S = new Ud(b, a.c, a.va, ha(a.L, a));
  } else {
    throw new D("Invalid IndexedDB Transaction.");
  }
}
function $d(a) {
  var b = 0 < a.a.length;
  if (b && !a.ca && ca(a.Ia)) {
    var c = function() {
      $d(a);
    }, d = a.b.shift(), e = a.a.shift(), b = 0 < a.a.length, c = a.Ia(d, e, b ? c : null);
    b && !c && $d(a);
  }
}
l.ca = !1;
l.Ab = function(a) {
  if (this.S) {
    this.ca = !0;
    var b = this;
    Wd(this.S, function() {
      a(b.b, b.a);
      b.b = [];
      b.a = [];
      b.ca = !1;
    });
  } else {
    a(this.b, this.a), this.b = [], this.a = [];
  }
};
l.L = function(a, b) {
  this.b.push(a);
  this.a.push(b);
  $d(this);
};
l.push = function(a, b) {
  if (this.ca) {
    throw new yd("");
  }
  if (2 <= arguments.length) {
    this.L(a, b);
  } else {
    if (!this.S) {
      if (!this.ga) {
        throw new yd("Database connection is not setup.");
      }
      var c = this.ga.wa();
      if (c) {
        if ("indexeddb" === c) {
          this.S = new Ud(this.ga, this.c, this.va, ha(this.L, this));
        } else {
          throw new ud(c);
        }
      } else {
        throw new yd("Database is not connected.");
      }
    }
    c = this.S;
    c.b.push(a);
    Xd(c);
  }
};
l.h = function() {
  return this.c;
};
function ae(a, b) {
  this.a = a || null;
  this.g = b;
  this.e = 0;
  this.b = !1;
  this.d = a instanceof Yd && !!a.va;
}
ae.prototype.logger = null;
ae.prototype.f = function(a, b) {
  var c;
  this.b = b[0].N();
  this.a instanceof Yd && Zd(this.a, a);
  if (this.d && (c = b[0], (c = c.e || c.c) && 1 < c.length && c[c.length - 1] != this.a.va)) {
    throw new yd("Output streamer projection field must be same as postfix field in the iterator");
  }
  for (c = 0;c < b.length;c++) {
  }
  return!1;
};
function be(a, b, c) {
  var d, e = null != d;
  if (!r(d)) {
    d = c[0];
    for (var e = null != d, f = 1;e && f < c.length;f++) {
      null != c[f] && 0 == pc(c[f], d) || (e = !1);
    }
  }
  return e && (a.e++, a.a && (a.d ? a.a.push(d, void 0) : a.a.push(d)), r(a.g) && a.e >= a.g) ? [] : b;
}
ae.prototype.c = function() {
  return[];
};
function ce(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, ce) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ConstraintError";
}
z(ce, Error);
ce.prototype.name = "ConstraintError";
function lc(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, lc) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "InvalidStateError";
}
z(lc, Error);
function de(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, de) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "InvalidAccessError";
}
z(de, Error);
function ee(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, ee) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "NotFoundError";
}
z(ee, Error);
ee.prototype.name = "NotFoundError";
function fe(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, fe) : this.stack = Error().stack || "";
  a && (this.message = String(a));
  this.name = "ydn.db.TimeoutError";
}
z(fe, Error);
function ge(a, b) {
  this.a = b;
}
ge.prototype.logger = null;
function he(a) {
  this.d = a;
  this.a = null;
  this.b = 0;
}
he.prototype.logger = null;
he.prototype.D = null;
function ie(a) {
  return!!a.a && !a.c;
}
he.prototype.A = null;
function je(a, b, c, d, e, f) {
  this.i = a;
  this.G = b;
  this.a = this.d = 0;
  this.F = d;
  this.w = e;
  this.f = c || ke;
  this.l = f || 0;
}
je.prototype.logger = null;
je.prototype.type = function() {
  return this.i.wa();
};
je.prototype.K = function() {
  return "B" + this.G + "T" + this.d;
};
var ke = "single";
function le(a) {
  if (a) {
    if (ca(a.abort)) {
      a.abort();
    } else {
      if (ca(a.executeSql)) {
        a.executeSql("ABORT", [], null, function() {
          return!0;
        });
      } else {
        throw new rb;
      }
    }
  } else {
    throw new lc("No active transaction");
  }
}
;function me(a, b, c, d, e, f) {
  je.call(this, a, b, c, d, e, f);
  this.c = [];
  this.e = [];
  this.g = null;
  this.b = new he(b);
  this.m = f || 0;
  this.q = !1;
}
z(me, je);
l = me.prototype;
l.logger = null;
function ne(a, b, c) {
  if ("multi" == a.f) {
    a: {
      if (a = a.b, !a.D || !a.mode || c != a.mode && (a.mode != J || c != I) || b.length > a.D.length) {
        b = !1;
      } else {
        for (c = 0;c < b.length;c++) {
          if (-1 == a.D.indexOf(b[c])) {
            b = !1;
            break a;
          }
        }
        b = !0;
      }
    }
  } else {
    if ("repeat" == a.f) {
      a: {
        if (a = a.b, a.D && a.mode && c == a.mode && a.D.length == b.length) {
          for (c = 0;c < b.length;c++) {
            if (-1 == a.D.indexOf(b[c])) {
              b = !1;
              break a;
            }
          }
          b = !0;
        } else {
          b = !1;
        }
      }
    } else {
      b = "all" == a.f ? !0 : !1;
    }
  }
  return b;
}
function oe(a) {
  var b = 0 < a.c.length ? a.c[0].D : null, c = 0 < a.c.length ? a.c[0].mode : null;
  return null != b && null != c ? ne(a, b, c) : !1;
}
l.abort = function() {
  le(this.g);
};
l.R = function(a, b, c, d) {
  var e = u(b) ? [b] : b, f = r(c) ? c : I, g = this;
  if (this.b.a || !Gd(this.i) && this.q) {
    this.c.push({pa:a, D:b, mode:f, A:d});
  } else {
    d && this.e.push(d);
    if (this.m && this.d >= this.m) {
      throw new sb("Exceed maximum number of transactions of " + this.m);
    }
    this.q = !0;
    this.i.$(function(c) {
      var d = g.b;
      d.a = c;
      d.c = !1;
      d.D = b;
      d.mode = f;
      d.b++;
      d.A = null;
      hd(b);
      a(g);
      for (a = null;oe(g);) {
        c = g.c.shift(), c.A && g.e.push(c.A), c.pa();
      }
    }, e, f, function(a, b) {
      var c = g.b;
      c.a && (c.a = null, c.D = null, c.mode = null, ca(c.A) && c.A(a, b), c.A = null);
      for (c = 0;c < g.e.length;c++) {
        (0,g.e[c])(a, b);
      }
      g.e.length = 0;
      (c = g.c.shift()) && g.R(c.pa, c.D, c.mode, c.A);
      g.a = 0;
    });
  }
};
l.K = function() {
  var a = this.b;
  return "B" + a.d + "T" + a.b;
};
l.request = function(a, b, c, d) {
  function e(a, b) {
    f.a = null;
    d && d(a, b);
  }
  var f = new K(a);
  a = c || I;
  var g = this;
  ie(this.b) && ne(this, b, a) ? (b = this.b.a, this.a++, jc(f, b, this.K() + "R" + this.a), this.e.push(e)) : g.R(function() {
    var a = g.b.a;
    g.a++;
    jc(f, a, g.K() + "R" + g.a);
  }, b, a, e);
  return f;
};
l.J = function(a, b, c, d, e) {
  d = d || I;
  var f = this, g;
  if (ie(f.b) && ne(this, c, d)) {
    var h = f.b.a;
    f.a++;
    g = f.K() + "R" + f.a;
    b(h, g, function(b, c) {
      f.g = h;
      c ? a.j(b) : a.callback(b);
      f.g = null;
    });
    b = null;
  } else {
    f.R(function() {
      var c = f.b.a;
      f.a++;
      g = f.K() + "R" + f.a;
      b(c, g, function(b, d) {
        f.g = c;
        d ? a.j(b) : a.callback(b);
        f.g = null;
      });
      b = null;
    }, c, d, e);
  }
};
l.getName = function() {
  return this.i.getName();
};
function pe(a, b) {
  me.call(this, a, b);
}
z(pe, me);
pe.prototype.logger = null;
pe.prototype.request = function(a, b, c) {
  var d, e, f, g = pe.r.request.call(this, a, b, c, function(a, b) {
    g.a = null;
    if (d) {
      "complete" != a && (f = !0, e = b), d(e, f);
    } else {
      var c = new fe;
      L(g, c, !0);
    }
  });
  mc(g, function(a, b, c) {
    f = b;
    e = a;
    d = c;
  });
  return g;
};
pe.prototype.J = function(a, b, c, d, e) {
  var f, g, h = new C;
  kb(h, function(a) {
    g = !1;
    f = a;
  }, function(a) {
    g = !0;
    f = a;
  });
  pe.r.J.call(this, h, b, c, d, function(b, c) {
    if ("complete" != b) {
      a.j(c);
    } else {
      if (!0 === g) {
        a.j(f);
      } else {
        if (!1 === g) {
          a.callback(f);
        } else {
          var d = new fe;
          a.j(d);
        }
      }
    }
    e && (e(b, c), e = void 0);
  });
};
function qe(a, b, c, d) {
  this.c = a;
  this.b = b;
  this.a = c;
  this.e = d;
  this.d = null;
}
qe.prototype.logger = null;
qe.prototype.f = function() {
  return this.a.d;
};
qe.prototype.abort = function() {
  this.a.abort();
};
function S(a) {
  if (!a.d) {
    var b;
    b = a.c;
    var c = b.wa();
    if ("indexeddb" == c) {
      b = new re(0, b.c);
    } else {
      throw new tb("No executor for " + c);
    }
    a.d = b;
  }
  return a.d;
}
;function T(a, b, c, d) {
  qe.call(this, a, b, c, d);
}
z(T, qe);
l = T.prototype;
l.logger = null;
l.count = function(a, b, c, d) {
  var e, f, g, h;
  if (null != a) {
    if (s(a)) {
      if (r(c) || r(b)) {
        throw new D("too many arguments.");
      }
      f = a;
      for (var k = 0;k < f.length;k++) {
        if (!od(this.b, f[k])) {
          throw new D('store name "' + f[k] + '" at ' + k + " not found.");
        }
      }
      Tb("countStores: " + hd(f));
      e = this.a.request("d", f);
      M(e, function() {
        se(S(this), e, f);
      }, this);
    } else {
      if (u(a)) {
        k = P(this.b, a);
        if (!k) {
          throw new D('store name "' + a + '" not found.');
        }
        f = [a];
        if (u(b)) {
          g = b, y(c) ? h = Fc(c) : h = null;
        } else {
          if (y(b) || null == b) {
            if (y(b)) {
              h = Fc(b);
            } else {
              if (null != b) {
                throw new D("key range must be  an object but found " + gd(b) + " of type " + typeof b);
              }
              h = null;
            }
          } else {
            throw new D('invalid second argument for count "' + gd(c) + '" of type ' + typeof b);
          }
        }
        Tb("countKeyRange: " + a + " " + (g ? g : "") + hd(h));
        e = this.a.request("d", f);
        Zc(k, e, arguments);
        M(e, function() {
          te(S(this), e, f[0], h, g);
        }, this);
      } else {
        throw new D("Invalid store name or store names.");
      }
    }
  } else {
    k = nd(this.b), e = this.a.request("d", k), mc(e, function(a, b, c) {
      if (b) {
        c(a, !0);
      } else {
        for (var d = b = 0;d < a.length;d++) {
          b += a[d];
        }
        c(b, !1);
      }
    }, this), M(e, function() {
      se(S(this), e, f);
    }, this);
  }
  return e;
};
l.get = function(a, b) {
  var c = this, d;
  if (a instanceof Bc) {
    var e = a, f = e.h(), g = P(this.b, f);
    if (!g) {
      if (this.b.a()) {
        if (Gd(this.c)) {
          return oc("e", void 0);
        }
        d = new K("e");
        this.c.ua(function() {
          kb(c.get(a, b), function(a) {
            d.callback(a);
          }, function(a) {
            d.j(a);
          });
        });
        return d;
      }
      throw new D("Store: " + f + " not found.");
    }
    var h = e.s();
    d = this.a.request("ek", [f]);
    Zc(g, d, arguments, void 0, this);
    M(d, function() {
      ue(S(this), d, f, h);
    }, this);
  } else {
    if (u(a) && r(b)) {
      var k = a, g = P(this.b, k);
      if (!g) {
        if (this.b.a()) {
          if (Gd(this.c)) {
            return oc("e", void 0);
          }
          d = new K("e");
          this.c.ua(function() {
            kb(c.get(a, b), function(a) {
              d.callback(a);
            }, function(a) {
              d.j(a);
            });
          });
          return d;
        }
        throw new D('Store name "' + k + '" not found.');
      }
      var m = b;
      d = this.a.request("e", [k]);
      Zc(g, d, arguments, void 0, this);
      M(d, function() {
        ue(S(this), d, k, m);
      }, this);
    } else {
      throw new D("get require valid input arguments.");
    }
  }
  return d;
};
l.aa = function(a, b, c, d, e, f, g) {
  var h, k, m = null, p = !1, n = !1, v = a, x = P(this.b, v);
  if (this.b.a() && !x) {
    return oc("g", []);
  }
  var B;
  if (u(b)) {
    var G = b, m = Fc(c);
    if (w(d)) {
      h = d;
    } else {
      if (r(d)) {
        throw new D("limit must be a number");
      }
      h = 100;
    }
    if (w(e)) {
      k = e;
    } else {
      if (r(e)) {
        throw new D("offset must be a number");
      }
      k = 0;
    }
    if (r(f)) {
      if (ba(f)) {
        p = f;
      } else {
        throw new D("reverse must be a boolean");
      }
    }
    if (r(g)) {
      if (ba(g)) {
        n = g;
      } else {
        throw new D("unique must be a boolean");
      }
    }
    B = this.a.request("i", [v]);
    Zc(x, B, arguments);
    M(B, function() {
      ve(S(this), B, 2, v, G, m, h, k, p, n);
    }, this);
  } else {
    y(b) ? m = Fc(b) : m = null;
    if (w(c)) {
      h = c;
    } else {
      if (r(c)) {
        throw new D("limit must be a number");
      }
      h = 100;
    }
    if (w(d)) {
      k = d;
    } else {
      if (r(d)) {
        throw new D("offset must be a number");
      }
      k = 0;
    }
    if (r(e)) {
      if (ba(e)) {
        p = e;
      } else {
        throw new D("reverse must be a boolean");
      }
    }
    B = this.a.request("g", [v]);
    Zc(x, B, arguments);
    M(B, function() {
      ve(S(this), B, 2, v, null, m, h, k, p, !1);
    }, this);
  }
  return B;
};
l.H = function(a, b, c, d, e, f, g) {
  var h = this, k, m, p, n = !1, v = !1;
  if (u(a)) {
    var x = a, B = P(this.b, x);
    if (!B) {
      if (this.b.a()) {
        if (Gd(this.c)) {
          return oc("s", []);
        }
        k = new K("s");
        this.c.ua(function() {
          kb(h.H(a, b, c, d, e, f), function(a) {
            k.callback(a);
          }, function(a) {
            k.j(a);
          });
        });
        return k;
      }
      throw new ee(x);
    }
    if (s(b)) {
      var G = b;
      k = this.a.request("v", [x]);
      Zc(B, k, arguments, void 0, this);
      M(k, function() {
        we(S(this), k, x, G);
      }, this);
    } else {
      if (u(b)) {
        var F = b, E = Fc(c);
        if (r(d)) {
          if (w(d)) {
            m = d;
          } else {
            throw new D("limit must be a number.");
          }
        } else {
          m = 100;
        }
        if (r(e)) {
          if (w(e)) {
            p = e;
          } else {
            throw new D("offset must be a number.");
          }
        } else {
          p = 0;
        }
        if (ba(f)) {
          n = f;
        } else {
          if (r(f)) {
            throw new D("reverse must be a boolean, but " + f);
          }
        }
        if (r(g)) {
          if (ba(g)) {
            v = g;
          } else {
            throw new D("unique must be a boolean");
          }
        }
        k = this.a.request("u", [x]);
        Zc(B, k, arguments);
        M(k, function() {
          ve(S(this), k, 4, x, F, E, m, p, n, v);
        }, this);
      } else {
        E = null;
        y(b) && (E = Fc(b));
        if (r(c)) {
          if (w(c)) {
            m = c;
          } else {
            throw new D("limit must be a number, but " + c + " is " + typeof c);
          }
        } else {
          m = 100;
        }
        if (r(d)) {
          if (w(d)) {
            p = d;
          } else {
            throw new D("offset must be a number, but " + d + " is " + typeof d);
          }
        } else {
          p = 0;
        }
        if (r(e)) {
          if (ba(e)) {
            n = e;
          } else {
            throw new D("reverse must be a boolean, but " + e + " is " + typeof e);
          }
        }
        k = this.a.request("s", [x]);
        Zc(B, k, arguments);
        M(k, function() {
          ve(S(this), k, 4, x, null, E, m, p, n, !1);
        }, this);
      }
    }
  } else {
    if (s(a)) {
      if (a[0] instanceof Bc) {
        for (var B = [], O = a, Z = 0;Z < O.length;Z++) {
          var pa = O[Z].h();
          if (!od(this.b, pa)) {
            if (this.b.a()) {
              return B = [], B[O.length - 1] = void 0, oc("e", B);
            }
            throw new D("Store: " + pa + " not found.");
          }
          0 <= Ra(B, pa) || B.push(pa);
        }
        Tb("listByKeys: " + hd(B) + " " + O.length + " keys");
        k = this.a.request("w", B);
        M(k, function() {
          xe(S(this), k, O);
        }, this);
      } else {
        throw new D("first argumentmust be array of ydn.db.Key, but " + a[0] + " of " + typeof a[0] + " found.");
      }
    } else {
      throw new D("first argument " + a + " is invalid.");
    }
  }
  return k;
};
l.add = function(a, b, c) {
  var d = u(a) ? a : y(a) ? a.name : void 0;
  if (!u(d)) {
    throw new D("store name " + d + " must be a string, but " + typeof d);
  }
  var e = P(this.b, d);
  if (!e) {
    if (!this.b.a()) {
      throw new D('store name "' + d + '" not found.');
    }
    e = Qc(y(a) ? a : {name:d});
    Bd(this.c, e);
  } else {
    if (this.b.a() && y(a) && (a = Qc(a), a = Wc(e, a))) {
      throw new rb(a);
    }
  }
  var f;
  if (!e) {
    throw new D('store name "' + d + '" not found.');
  }
  if (u(e.keyPath) && r(c)) {
    throw new D("key must not be provided while the store uses in-line key.");
  }
  if (!e.keyPath && !e.autoIncrement && !r(c)) {
    throw new D("out-of-line key must be provided.");
  }
  if (s(b)) {
    for (a = 0;a < b.length;a++) {
      Xc(e, b[a]);
    }
    f = this.a.request("b", [d], J);
    M(f, function() {
      ye(S(this), f, !1, !1, d, b, c);
    }, this);
    e.O && f.n(function(a) {
      this.c.C(new Ac("created", this.c, e.getName(), a, b));
    }, this);
  } else {
    if (y(b)) {
      Uc(e, b, c), Xc(e, b), f = this.a.request("a", [d], J), M(f, function() {
        ye(S(this), f, !1, !0, d, [b], [c]);
      }, this), e.O && f.n(function(a) {
        this.c.C(new zc("created", this.c, e.getName(), a, b));
      }, this);
    } else {
      throw new D("record must be an object or array list of objects, but " + b + " of type " + typeof b + " found.");
    }
  }
  return f;
};
function ze(a, b) {
  var c = u(b) ? b : y(b) ? b.name : void 0;
  if (!u(c)) {
    throw new D("store name must be a string");
  }
  var d = P(a.b, c);
  if (!d) {
    if (!a.b.a()) {
      throw new ee(c);
    }
    d = Qc(y(b) ? b : {name:c});
    Bd(a.c, d);
  } else {
    if (a.b.a() && y(b)) {
      var e = Qc(b);
      if (e = Wc(d, e)) {
        throw new rb(e);
      }
    }
  }
  if (!d) {
    throw new ee(c);
  }
  return d;
}
l.load = function(a, b, c) {
  var d = c || ",", e = ze(this, a).getName();
  a = this.a.request("i3", [e]);
  var f = this;
  this.a.J(a, function(a, c, k) {
    Ae(S(f), a, k, e, b, d);
  }, [e], J);
  return a;
};
function Be(a, b) {
  var c = Ce(b), d = a.a.request("qb", c, I);
  M(d, function() {
    S(this);
    De(b, function(a, c, g, h) {
      var k = kc(d);
      ve(0, k, 4, a, c, Fc(g), 100, 0, !1, !1);
      k.B(function(a) {
        var c = null;
        a instanceof Array || (c = a, a = []);
        for (var e = 0;e < a.length;e++) {
          var f;
          f = a[e];
          var g = f.id, h = void 0;
          if (u(g)) {
            for (var k = h = [], F = void 0, E = [], O = void 0, Z = void 0, g = new hc(g);null != fc(g);) {
              if (0 === g.a) {
                k = E.pop();
              } else {
                if (null === g.a) {
                  break;
                }
                do {
                  for (var O = g.a / 4 | 0, F = g.a % 4, pa = 0;pa < O;pa++) {
                    Z = [], k.push(Z), E.push(k), k = Z;
                  }
                  if (0 === F && 12 < g.a + 4) {
                    fc(g);
                  } else {
                    break;
                  }
                } while (1);
                1 === F ? k.push(ec(g)) : 2 === F ? k.push(new Date(ec(g))) : 3 === F ? k.push(gc(g)) : 0 === F && (k = E.pop());
              }
            }
            h = h[0];
          } else {
            h = g;
          }
          g = h;
          h = g[3];
          (f = 1 == this.type && h != this.value ? null : new Ee(this, g[0], g[2], g[1], h, f.k, f.loc)) && b.d.push(f);
        }
        b.c--;
        a = 0 == b.c ? !1 : b.b[b.b.length - 1].g === this.g ? !0 : null;
        !0 === a ? Ub(d, b) : !1 === a && d.callback(b.e());
        if (c) {
          throw c;
        }
      }, h);
    });
  }, a);
  return d;
}
l.put = function(a, b, c) {
  var d, e = this;
  if (a instanceof Bc) {
    var f = a, g = f.h(), h = P(this.b, g);
    if (!h) {
      throw new D('store "' + g + '" not found.');
    }
    if (h.keyPath) {
      var k = Uc(h, b);
      if (null != k) {
        if (0 != pc(k, f.s())) {
          throw new D("Inline key must be " + f + " but " + k + " found.");
        }
      } else {
        Vc(h, b, f.s());
      }
      return this.put(g, b);
    }
    return this.put(g, b, f.s());
  }
  if (s(a)) {
    for (var m = a, p = b, f = [], g = 0, h = m.length;g < h;g++) {
      k = m[g].h();
      -1 == Ra(f, k) && f.push(k);
      var n = P(this.b, k);
      if (!n) {
        throw new D('store "' + k + '" not found.');
      }
      n.keyPath && Vc(n, p[g], m[g].s());
    }
    Tb("putByKeys: to " + hd(f) + " " + p.length + " objects");
    for (g = 0;g < p.length;g++) {
      Xc(n, p[g]);
    }
    d = this.a.request("l", f, J);
    Zc(n, d, arguments);
    M(d, function() {
      Fe(S(e), d, p, m);
    }, this);
  } else {
    if (u(a) || y(a)) {
      var n = ze(this, a), v = n.getName();
      if (n.keyPath && r(c)) {
        throw new D("key must not be provided while the store uses in-line key.");
      }
      if (!n.keyPath && !n.autoIncrement && !r(c)) {
        throw new D("out-of-line key must be provided.");
      }
      if (s(b)) {
        for (var x = b, B = c, g = 0;g < x.length;g++) {
          Xc(n, x[g]);
        }
        d = this.a.request("k", [v], J);
        Zc(n, d, arguments);
        M(d, function() {
          ye(S(this), d, !0, !1, v, x, B);
        }, this);
        n.O && d.n(function(a) {
          this.c.C(new Ac("updated", this.c, v, a, x));
        }, this);
      } else {
        if (y(b)) {
          var G = b, F = c;
          if (r(q.Blob) && G instanceof Blob && n.eb && !n.keyPath && 0 == n.indexes.length && Lb) {
            d = new K("j"), f = new FileReader, f.onload = function(a) {
              var b = a.target.result, c = e.a.request("j", [v], J);
              Zc(n, c, [v, G, F]);
              M(c, function() {
                ye(S(e), c, !0, !0, v, [b], [F]);
              }, this);
              kb(c, function(a) {
                d.callback(a);
              }, function(a) {
                d.j(a);
              });
            }, f.onerror = function(a) {
              d.j(a);
            }, f.onabort = function(a) {
              d.j(a);
            }, f.readAsDataURL(G);
          } else {
            Xc(n, G);
            d = this.a.request("j", [v], J);
            var E = [v, G, F];
            Zc(n, d, E);
            M(d, function() {
              var a = r(F) ? [E[2]] : void 0;
              ye(S(e), d, !0, !0, v, [E[1]], a);
            }, this);
          }
          n.O && d.n(function(a) {
            this.c.C(new zc("updated", this.c, v, a, G));
          }, this);
        } else {
          throw new D("put record value must be Object or array of Objects");
        }
      }
    } else {
      throw new D("the first argument of put must be store name, store schema or array of keys.");
    }
  }
  return d;
};
function Ge(a, b, c) {
  var d = a.e, e, f;
  if (u(b)) {
    for (var g = P(a.b, b), h = 0;h < c.length;h++) {
      Xc(g, c[h]);
    }
    e = [b];
  } else {
    f = b;
    e = [];
    for (var h = 0, k = f.length;h < k;h++) {
      var m = f[h].h(), g = P(a.b, m);
      -1 == Ra(e, m) && e.push(m);
      Xc(g, c[h]);
    }
  }
  var p;
  u(b) ? (g = P(a.b, b), p = d.request("k", e, J), M(p, function() {
    ye(S(this), p, !0, !1, b, c, void 0);
  }, a)) : (p = d.request("l", e, J), M(p, function() {
    Fe(S(this), p, c, f);
  }, a));
  return p;
}
function He(a, b, c) {
  var d = a.e.request("n", [b], J);
  M(d, function() {
    Ie(S(this), d, b, c || null);
  }, a);
  return d;
}
function Je(a, b) {
  var c = [], d = b.length;
  if (0 == d) {
    return oc("g", []);
  }
  for (var e = 0;e < d;e++) {
    var f = b[e].h();
    -1 == Ra(c, f) && c.push(f);
  }
  var g = a.e.request("g", c);
  M(g, function() {
    xe(S(a), g, b);
  }, a);
  return g;
}
l.clear = function(a, b) {
  var c;
  if (u(a)) {
    var d = P(this.b, a);
    if (!d) {
      throw new D('store name "' + a + '" not found.');
    }
    if (y(b)) {
      var e = Fc(b);
      if (null === e) {
        throw new D("clear method requires a valid non-null KeyRange object.");
      }
      Tb("clearByKeyRange: " + a + ":" + hd(e));
      c = this.a.request("c", [a], J);
      Zc(d, c, [a, e]);
      M(c, function() {
        Ke(S(this), c, a, e);
      }, this);
    } else {
      if (r(b)) {
        throw new D("clear method requires a valid KeyRange object as second argument, but found " + b + " of type " + typeof b);
      }
      c = this.a.request("c", [a], J);
      M(c, function() {
        Le(S(this), c, [a]);
      }, this);
    }
  } else {
    if (!r(a) || s(a) && u(a[0])) {
      var f = a || nd(this.b);
      Tb("clearByStores: " + hd(f));
      c = this.a.request("c", f, J);
      M(c, function() {
        Le(S(this), c, f);
      }, this);
    } else {
      throw new D('first argument "' + a + '" is invalid.');
    }
  }
  return c;
};
l.t = function(a, b, c) {
  var d;
  if (u(a)) {
    var e = P(this.b, a);
    if (!e) {
      throw new D('store name "' + a + '" not found.');
    }
    if (r(c)) {
      if (u(b)) {
        var f = Rc(e, b);
        if (!f) {
          throw new D("index: " + b + " not found in " + a);
        }
        if (y(c) || null === c) {
          var g = Fc(c);
          d = this.a.request("p", [a], J);
          M(d, function() {
            Me(S(this), d, a, f.getName(), g);
          }, this);
        } else {
          throw new D("key range " + c + ' is invalid type "' + typeof c + '".');
        }
      } else {
        throw new D('index name "' + b + '" must be a string, but ' + typeof b + " found.");
      }
    } else {
      if (u(b) || w(b) || t(b) || b instanceof Date) {
        d = this.a.request("m", [a], J);
        var h = [a, b];
        Zc(e, d, h);
        M(d, function() {
          Ne(S(this), d, a, h[1]);
        }, this);
        e.O && d.n(function(c) {
          this.c.C(new zc("deleted", this.c, a, 1 == c ? b : void 0, void 0));
        }, this);
      } else {
        if (y(b)) {
          g = Fc(b), Tb("removeByKeyRange: " + a + ":" + hd(g)), d = this.a.request("n", [a], J), Zc(e, d, [a, g]), M(d, function() {
            Ie(S(this), d, a, g);
          }, this), e.O && d.n(function(b) {
            var c = [];
            c.length = b;
            this.c.C(new Ac("deleted", this.c, a, c, void 0));
          }, this);
        } else {
          throw new D('Invalid key or key range "' + b + '" of type ' + typeof b);
        }
      }
    }
  } else {
    if (a instanceof Bc) {
      var k = a.h(), e = P(this.b, k);
      d = this.a.request("m", [k], J);
      var m = [k, a.s()];
      Zc(e, d, m);
      M(d, function() {
        Ne(S(this), d, k, m[1]);
      }, this);
    } else {
      if (s(a)) {
        c = [];
        for (var e = 0, p = a.length;e < p;e++) {
          var n = a[e].h();
          -1 == Ra(c, n) && c.push(n);
        }
        if (1 > c.length) {
          throw new D('at least one valid key required in key list "' + gd(a) + '"');
        }
        d = this.a.request("o", c, J);
        M(d, function() {
          Oe(S(this), d, a);
        }, this);
      } else {
        throw new D('first argument requires store name, key (ydn.db.Key) or list of keys (array) , but "' + gd(a) + '" (' + aa(a) + ") found.");
      }
    }
  }
  return d;
};
function U(a, b, c, d) {
  qe.call(this, a, b, c, d);
}
z(U, T);
l = U.prototype;
l.logger = null;
l.get = function(a, b) {
  if (a instanceof R) {
    var c = a.h(), d = P(this.b, c);
    if (!d) {
      throw new D('store "' + c + '" not found.');
    }
    var e = a.c;
    if (r(e) && !Tc(d, e)) {
      throw new D('index "' + e + '" not found in store "' + c + '".');
    }
    var f = this.a.request("f", [c]);
    M(f, function() {
      Pe(this, 5, f, a, 1);
    }, this);
    return f;
  }
  return U.r.get.call(this, a, b);
};
l.aa = function(a, b, c, d, e, f, g) {
  if (a instanceof R) {
    var h = 100;
    if (w(b)) {
      if (h = b, 1 > h) {
        throw new D("limit must be a positive value, but " + b);
      }
    } else {
      if (r(b)) {
        throw new D("limit must be a number,  but " + b);
      }
    }
    if (r(c)) {
      throw new D("offset must not be specified");
    }
    var k = this.a.request("h", [a.h()]);
    M(k, function() {
      a.l ? Pe(this, 1, k, a, h) : Pe(this, 2, k, a, h);
    }, this);
    return k;
  }
  return U.r.aa.call(this, a, b, c, d, e, f, g);
};
l.count = function(a, b, c, d) {
  if (a instanceof R) {
    if (r(b) || r(c)) {
      throw new D("too many arguments.");
    }
    var e = this.a.request("d", [a.h()]);
    M(e, function() {
      Pe(this, 6, e, a);
    }, this);
    return e;
  }
  return U.r.count.call(this, a, b, c, d);
};
l.H = function(a, b, c, d, e, f) {
  if (a instanceof R) {
    var g;
    if (w(b)) {
      if (g = b, 1 > g) {
        throw new D("limit must be a positive value, but " + g);
      }
    } else {
      if (r(b)) {
        throw new D("limit must be a number, but " + b);
      }
    }
    if (r(c)) {
      throw new D("offset must not be specified");
    }
    var h = this.a.request("t", [a.h()]);
    M(h, function() {
      a.a ? Pe(this, 2, h, a, g) : Pe(this, 4, h, a, g);
    }, this);
    return h;
  }
  return U.r.H.call(this, a, b, c, d, e, f);
};
l.Ka = function(a, b, c) {
  var d;
  c = c || I;
  var e = [];
  for (d = 0;d < b.length;d++) {
    for (var f = b[d].stores(), g = 0;g < f.length;g++) {
      0 <= Ra(e, f[g]) || e.push(f[g]);
    }
  }
  var h = this;
  d = this.a.request("qa", e);
  this.a.J(d, function(c, d, e) {
    function f() {
      for (var a = 0, d = 0;d < b.length;d++) {
        var e = b[d], m = [Qe(S(h), c, e.h())], e = e.load(m);
        e.i = g;
        e.g = ia(x, a);
        Z[d] = e;
        F[a] = d;
        a++;
      }
      G = b.length;
    }
    function g(a) {
      for (var b = 0;b < Z.length;b++) {
        Md(Z[b]);
      }
      Ya(Z);
      e(a, !0);
    }
    function x(c, d) {
      if (B) {
        throw new vd;
      }
      pa++;
      var f = pa === G, g = F[c], h = b[g], k = Z[g], g = k.p(), k = k.u();
      E[c] = d;
      O[c] = h.l ? h.a ? g : k : h.a ? d : k;
      if (f) {
        var m;
        a instanceof ae ? m = a.c(E, O) : m = a(E, O);
        f = [];
        h = [];
        g = [];
        k = [];
        if (s(m)) {
          for (var n = 0;n < m.length;n++) {
            !0 === m[n] ? g[n] = 1 : !1 === m[n] ? k[n] = !0 : h[n] = m[n];
          }
        } else {
          if (null === m) {
            f = [];
          } else {
            if (r(m)) {
              if (y(m)) {
                f = m.continuePrimary || [], h = m["continue"] || [], g = m.advance || [], k = m.restart || [];
              } else {
                throw new sb("scan callback output");
              }
            } else {
              for (f = [], n = 0;n < b.length;n++) {
                r(F[n]) && (g[n] = 1);
              }
            }
          }
        }
        for (n = pa = m = 0;n < b.length;n++) {
          null != f[n] || r(h[n]) || null != k[n] || null != g[n] || pa++;
        }
        for (n = 0;n < b.length;n++) {
          if (null != f[n] || r(h[n]) || null != k[n] || null != g[n]) {
            var v = F[n];
            if (!r(v)) {
              throw new xd(n + " is not an iterator.");
            }
            var v = b[v], x = Z[n];
            E[n] = void 0;
            O[n] = void 0;
            if (null != k[n]) {
              v = x, v.d = !1, v.f = !1, v.openCursor(void 0, void 0);
            } else {
              if (r(h[n])) {
                x.ha(h[n]);
              } else {
                if (null != f[n]) {
                  x.La(f[n]);
                } else {
                  if (null != g[n]) {
                    x.advance(1);
                  } else {
                    throw new vd(v + ": has no action");
                  }
                }
              }
            }
            m++;
          }
        }
        if (0 == m) {
          for (m = 0;m < Z.length;m++) {
            Md(Z[m]);
          }
          B = !0;
          Ya(Z);
          e(void 0);
        }
      }
    }
    var B = !1, G, F = [], E = [], O = [], Z = [], pa = 0;
    a instanceof ae ? a.f(c, b, function() {
      f();
    }) || f() : f();
  }, e, c);
  return d;
};
l.open = function(a, b, c, d) {
  c = c || I;
  var e = this, f = this.a.request("i5", b.stores(), c);
  M(f, function(c) {
    for (var h = b.stores(), k = [], m = 0;m < h.length;m++) {
      k[m] = Qe(S(e), c, h[m]);
    }
    var p = b.load(k);
    p.i = function(a) {
      L(f, a, !0);
    };
    p.g = function(b) {
      if (null != b) {
        var c = a.call(d, p);
        !0 === c ? (p.d = !1, p.f = !1, p.openCursor(void 0, void 0)) : y(c) ? !0 === c.restart ? (b = c["continue"], c = c.continuePrimary, p.d = !1, p.f = !1, p.openCursor(c, b)) : null != c["continue"] ? p.ha(c["continue"]) : null != c.continuePrimary ? p.La(c.continuePrimary) : (Md(p), L(f, void 0)) : null === c ? (Md(p), L(f, void 0)) : null != c ? p.ha(c) : p.advance(1);
      } else {
        Md(p), L(f, void 0);
      }
    };
  }, this);
  return f;
};
l.map = function(a, b) {
  for (var c = this, d = a.stores(), e, f = 0;e = d[f];f++) {
    if (!e) {
      throw new D('Store "' + e + '" not found.');
    }
  }
  e = this.a.request("i4", d);
  this.a.J(e, function(d, e, f) {
    e = a.stores();
    for (var m = [], p = 0;p < e.length;p++) {
      m[p] = Qe(S(c), d, e[p]);
    }
    var n = a.load(m);
    n.i = function(a) {
      f(a, !1);
    };
    n.g = function(c) {
      if (null != c) {
        var d;
        a.l ? a.a ? d = c : d = n.p() : a.a ? d = c : d = n.u();
        b(d);
        n.advance(1);
      } else {
        f(void 0), b = null;
      }
    };
  }, d, I);
  return e;
};
l.reduce = function(a, b, c) {
  for (var d = this, e = a.stores(), f, g = 0;f = e[g];g++) {
    if (!f) {
      throw new D('Store "' + f + '" not found.');
    }
  }
  f = this.a.request("m0", e);
  var h = y(c) ? fd(hd(c)) : c;
  this.a.J(f, function(c, e, f) {
    e = a.stores();
    for (var g = [], v = 0;v < e.length;v++) {
      g[v] = Qe(S(d), c, e[v]);
    }
    var x = a.load(g);
    x.i = function(a) {
      f(a, !0);
    };
    var B = 0;
    x.g = function(c) {
      if (null != c) {
        var d;
        a.l ? a.a ? d = c : d = x.p() : a.a ? d = c : d = x.u();
        h = b(h, d, B++);
        x.advance(1);
      } else {
        f(h);
      }
    };
  }, e, I);
  return f;
};
function Re(a, b, c, d) {
  var e = c.h(), f = c.c || null, g = d || 100, h = a.a.request("u", [e]), k = "done" == c.d || c.d == Od ? [] : [c.g, c.p()];
  M(h, function() {
    ve(S(this), h, b, e, f, c.$a(), g, 0, c.N(), c.Z(), k);
  }, a);
  h.n(function() {
    null != k[0] ? c.Ha("rest", k[0], k[1]) : c.Ha();
  });
  return h;
}
function Pe(a, b, c, d, e) {
  var f = [], g = c.a;
  a = S(a);
  for (var h = [], k = d.stores(), m = 0;m < k.length;m++) {
    h[m] = Qe(a, g, k[m]);
  }
  var p = d.load(h);
  p.i = function(a) {
    Md(p);
    L(c, a, !0);
  };
  var n = 0, v = !1;
  p.g = function(a) {
    v || (v = !0);
    null != a ? (n++, 1 == b ? f.push(a) : 2 == b ? f.push(p.p()) : 3 == b ? f.push([a, p.p()]) : 6 != b && f.push(p.u()), 5 == b ? (Md(p), L(c, f[0])) : 6 == b || !r(e) || n < e ? p.ha() : (Md(p), L(c, f))) : (Md(p), L(c, 5 == b ? f[0] : 6 == b ? n : f));
  };
}
;function Se(a, b, c, d) {
  this.d = a;
  this.a = Za(c);
  this.b = d;
  this.c = [];
}
Se.prototype.d = null;
function Te(a, b, c) {
  if (a.d) {
    c && a.c.push(c), b(a.d);
  } else {
    throw new tb("tx committed on ParallelTxExecutor");
  }
}
;function Xe(a, b, c, d, e, f) {
  je.call(this, a, b, c, d, e, f);
  this.c = this.b = null;
}
z(Xe, je);
l = Xe.prototype;
l.logger = null;
l.abort = function() {
  le(this.c);
};
l.fb = function(a, b) {
  var c;
  if ("multi" == this.f) {
    a: {
      if (c = this.b, !c.a || !c.b || b != c.b && (c.b != J || b != I) || a.length > c.a.length) {
        c = !1;
      } else {
        for (var d = 0;d < a.length;d++) {
          if (-1 == c.a.indexOf(a[d])) {
            c = !1;
            break a;
          }
        }
        c = !0;
      }
    }
  } else {
    if ("repeat" == this.f) {
      a: {
        if (c = this.b, c.a && c.b && b == c.b && c.a.length == a.length) {
          for (d = 0;d < a.length;d++) {
            if (-1 == c.a.indexOf(a[d])) {
              c = !1;
              break a;
            }
          }
          c = !0;
        } else {
          c = !1;
        }
      }
    } else {
      c = "all" == this.f ? !0 : !1;
    }
  }
  return c;
};
l.R = function(a, b, c, d) {
  function e(c) {
    h.d++;
    k = new Se(c, 0, b, g);
    hd(b);
    h.b = k;
    Te(h.b, a, d);
  }
  function f(a, b) {
    if (k) {
      for (var c = k, d = 0;d < c.c.length;d++) {
        c.c[d](a, b);
      }
      c.c.length = 0;
      c.d = null;
      c.a = null;
      c.c = null;
    }
    h.a = 0;
  }
  this.F && (b = this.F);
  this.w && (c = this.w);
  var g = r(c) ? c : I, h = this, k;
  if (this.b && this.b.d && this.fb(b, g)) {
    Te(this.b, a, d);
  } else {
    if (this.l && this.d >= this.l) {
      throw new sb("Exceed maximum number of transactions of " + this.l);
    }
    this.i.$(e, b, g, f);
  }
};
l.request = function(a, b, c, d) {
  var e = new K(a), f = this;
  this.R(function(a) {
    f.a++;
    jc(e, a, f.K() + "R" + f.a);
  }, b, c || I, function(a, b) {
    e.a = null;
    d && d(a, b);
  });
  return e;
};
l.J = function(a, b, c, d, e) {
  var f = this, g;
  this.R(function(c) {
    f.a++;
    g = f.K() + "R" + f.a;
    b(c, g, function(b, d) {
      f.c = c;
      g = f.K() + "R" + f.a;
      d ? a.j(b) : a.callback(b);
      f.c = null;
    });
    b = null;
  }, c, d, e);
};
function Ye(a, b) {
  Xe.call(this, a, b, ke);
}
z(Ye, Xe);
Ye.prototype.logger = null;
Ye.prototype.fb = function() {
  return!1;
};
Ye.prototype.request = function(a, b, c) {
  var d, e, f, g = Ye.r.request.call(this, a, b, c, function(a, b) {
    g.a = null;
    if (d) {
      "complete" != a && (f = !0, e = b), d(e, f);
    } else {
      var c = new fe;
      L(g, c, !0);
    }
  });
  mc(g, function(a, b, c) {
    f = b;
    e = a;
    d = c;
  });
  return g;
};
Ye.prototype.J = function(a, b, c, d, e) {
  var f, g, h = new C;
  kb(h, function(a) {
    g = !1;
    f = a;
  }, function(a) {
    g = !0;
    f = a;
  });
  Ye.r.J.call(this, h, b, c, d, function(b, c) {
    if ("complete" != b) {
      a.j(c);
    } else {
      if (!0 === g) {
        a.j(f);
      } else {
        if (!1 === g) {
          a.callback(f);
        } else {
          var d = new fe;
          a.j(d);
        }
      }
    }
    e && (e(b, c), e = void 0);
  });
};
function V(a, b, c) {
  Q.call(this, a, b, c);
  this.T = 0;
  a = !0;
  b = ke;
  c && (r(c.isSerial) && (a = !!c.isSerial), c.policy && (b = c.policy));
  c = Ze(this, b, a);
  this.m = Ze(this, "atomic", !1);
  this.a = this.da(c, this.m);
}
z(V, Q);
l = V.prototype;
l.T = 0;
l.Na = function(a, b, c, d, e, f) {
  a = a || ke;
  var g;
  "readonly" == d ? g = I : "readwrite" == d && (g = J);
  a = Ze(this, a, b, c, g, e);
  return this.da(a, f ? null : this.m);
};
l.da = function(a, b) {
  return new qe(this, this.c, a, b);
};
function Ze(a, b, c, d, e, f) {
  if (c) {
    if ("multi" == b || "repeat" == b || "all" == b || b == ke) {
      return new me(a, a.T++, b, d, e, f);
    }
    if ("atomic" == b) {
      return new pe(a, a.T++);
    }
    throw new D('Invalid requestType "' + b + '"');
  }
  if ("multi" == b || "repeat" == b || "all" == b || b == ke) {
    return new Xe(a, a.T++, b, d, e, f);
  }
  if ("atomic" == b) {
    return new Ye(a, a.T++);
  }
  throw new D('Invalid requestType "' + b + '"');
}
l.X = function(a, b, c) {
  this.T++;
  b = b || nd(this.c);
  var d = I;
  if (c) {
    if ("readwrite" == c) {
      d = J;
    } else {
      if ("readonly" != c) {
        throw new D('Invalid transaction mode "' + c + '"');
      }
    }
  }
  var e = Ze(this, "all", !1, b, d, 1), f = this.da(e, this.m), g = new K("q");
  e.R(function(b) {
    jc(g, b, e.K() + "R0");
    a(f);
  }, b, d, function(a) {
    g.a = null;
    L(g, e.d, "complete" !== a);
  });
  return g;
};
l.Hb = function() {
  return this.a ? this.a.a.d : NaN;
};
function W(a, b, c) {
  V.call(this, a, b, c);
  a = this.c;
  for (b = 0;b < a.b.length;b++) {
    c = a.b[b];
    var d = P(a, c.getName());
    if (d) {
      if (!Tc(d, "k")) {
        throw new D('full text index store "' + d.getName() + '" must have "keyword" index');
      }
      if (!Tc(d, "v")) {
        throw new D('full text index store "' + d.getName() + '" must have "keyword" index');
      }
      if ("id" != d.keyPath) {
        throw new D('full text index store "' + d.getName() + '" must use "id" as key path.');
      }
    } else {
      throw new D('full text index store "' + c.getName() + '" required.');
    }
    for (d = 0;d < c.count();d++) {
      var e = c.index(d), f = P(a, e.h());
      if (f) {
        this.Pa(f, c);
      } else {
        throw new D('full text source store "' + e.h() + '" does not exist for full text index "' + c.getName() + '"');
      }
    }
  }
}
z(W, V);
l = W.prototype;
l.da = function(a, b) {
  return new T(this, this.c, a, b);
};
l.add = function(a, b, c) {
  return this.a.add(a, b, c);
};
l.count = function(a, b, c, d) {
  return this.a.count(a, b, c, d);
};
l.get = function(a, b) {
  return this.a.get(a, b);
};
l.aa = function(a, b, c, d, e, f, g) {
  return this.a.aa(a, b, c, d, e, f, g);
};
l.H = function(a, b, c, d, e, f) {
  return this.a.H(a, b, c, d, e, f);
};
l.load = function(a, b, c) {
  return this.a.load(a, b, c);
};
l.put = function(a, b, c) {
  return this.a.put(a, b, c);
};
l.clear = function(a, b, c) {
  return this.a.clear(a, b, c);
};
l.t = function(a, b, c) {
  return this.a.t(a, b, c);
};
function X(a, b, c) {
  W.call(this, a, b, c);
}
z(X, W);
l = X.prototype;
l.da = function(a, b) {
  return new U(this, this.c, a, b);
};
l.open = function(a, b, c, d) {
  return this.a.open(a, b, c, d);
};
l.Cb = function(a, b) {
  return this.a.Ka(a, b);
};
l.map = function(a, b) {
  return this.a.map(a, b);
};
l.reduce = function(a, b, c) {
  return this.a.reduce(a, b, c);
};
function $e(a, b, c) {
  Id.call(this, a, 0, c);
  this.a = null;
}
z($e, Id);
l = $e.prototype;
l.logger = null;
l.na = function(a) {
  (a = a.target.result) ? Kd(this, a.key, a.primaryKey, a.value) : Kd(this);
};
l.openCursor = function(a, b) {
  function c(a, b, c) {
    n.a = p;
    n.a.onsuccess = ha(n.na, n);
    Kd(n, a, n.m ? b : void 0, c);
    p = null;
  }
  var d = this.Ma, e = this.e.objectStore(this.V), f = u(this.l) ? e.index(this.l) : null;
  if (r(a)) {
    var g = f ? !r(b) : !0, h = d ? d.lower : void 0, k = d ? d.upper : void 0, m = d ? !!d.lowerOpen : !1, d = d ? !!d.upperOpen : !1, d = Ec(this.ia ? new N(h, a, m, g) : new N(a, k, g, d))
  }
  var p;
  this.Ca ? f ? p = null != this.I ? f.openKeyCursor(d, this.I) : null != d ? f.openKeyCursor(d) : f.openKeyCursor() : p = null != this.I ? e.openCursor(d, this.I) : null != d ? e.openCursor(d) : e.openCursor() : f ? p = null != this.I ? f.openCursor(d, this.I) : null != d ? f.openCursor(d) : f.openCursor() : p = null != this.I ? e.openCursor(d, this.I) : null != d ? e.openCursor(d) : e.openCursor();
  var n = this;
  p.onerror = function(a) {
    var b = p.error;
    a.preventDefault();
    n.i(b);
    Ld(n);
    n.d = !0;
  };
  null != a ? p.onsuccess = function(d) {
    if (d = d.target.result) {
      var e = Yb.cmp(d.key, a), f = n.ia ? -1 : 1;
      if (e == f) {
        c(d.key, d.primaryKey, d.value);
      } else {
        if (e == -f) {
          d["continue"](a);
        } else {
          if (null != b) {
            if (Yb.cmp(d.primaryKey, b) == f) {
              c(d.key, d.primaryKey, d.value);
            } else {
              d["continue"]();
            }
          } else {
            d["continue"]();
          }
        }
      }
    } else {
      c();
    }
  } : (n.a = p, n.a.onsuccess = ha(n.na, n));
};
l.update = function(a) {
  var b = this.a.result;
  if (b) {
    var c = new C;
    a = b.update(a);
    a.onsuccess = function(a) {
      c.callback(a.target.result);
    };
    a.onerror = function(a) {
      a.preventDefault();
      c.j(a);
    };
    return c;
  }
  throw new de("cursor gone");
};
l.clear = function() {
  var a = this.a.result;
  if (a) {
    var b = new C, a = a["delete"]();
    a.onsuccess = function() {
      b.callback(1);
    };
    a.onerror = function(a) {
      a.preventDefault();
      b.j(a);
    };
    return b;
  }
  throw new de("cursor gone");
};
l.advance = function(a) {
  var b = this.a.result;
  if (1 == a) {
    b["continue"]();
  } else {
    b.advance(a);
  }
};
l.La = function(a) {
  var b, c = this.a.result, d = this;
  this.a.onsuccess = function(e) {
    if (c = e.target.result) {
      if (b = Yb.cmp(c.primaryKey, a), 0 == b || 1 == b && !d.ia || -1 == b && d.ia) {
        d.a.onsuccess = ha(d.na, d), Kd(d, c.key, d.m ? c.primaryKey : void 0, c.value);
      } else {
        c["continue"]();
      }
    } else {
      d.a.onsuccess = ha(d.na, d), Kd(d);
    }
  };
  c["continue"]();
};
l.ha = function(a) {
  var b = this.a.result;
  if (null != a) {
    b["continue"](a);
  } else {
    b["continue"]();
  }
};
l.M = function() {
  $e.r.M.call(this);
  this.a = null;
};
function af(a, b) {
  this.a = b;
}
z(af, ge);
af.prototype.logger = null;
function se(a, b, c) {
  function d(a) {
    var g = b.a.objectStore(c[a]).count();
    g.onsuccess = function(g) {
      e[a] = g.target.result;
      a++;
      a == c.length ? L(b, e) : d(a);
    };
    g.onerror = function(a) {
      a.preventDefault();
      L(b, g.error, !0);
    };
  }
  var e = [];
  0 == c.length ? L(b, []) : d(0);
}
function ye(a, b, c, d, e, f, g) {
  function h(a) {
    if (null == f[a]) {
      if (m++, m == f.length) {
        L(b, k, p);
      } else {
        var e = a + 10;
        e < f.length && h(e);
      }
    }
    var B, e = f[a];
    B = g && null != g[a] ? c ? n.put(e, g[a]) : n.add(e, g[a]) : c ? n.put(e) : n.add(e);
    B.onsuccess = function(c) {
      m++;
      k[a] = c.target.result;
      m == f.length ? L(b, d ? k[0] : k, p) : (c = a + 10, c < f.length && h(c));
    };
    B.onerror = function(c) {
      m++;
      var e = B.error;
      gd(f[a]);
      k[a] = e;
      p = !0;
      c.preventDefault();
      m == f.length ? L(b, d ? k[0] : k, p) : (c = a + 10, c < f.length && h(c));
    };
  }
  var k = [], m = 0, p = !1, n = b.a.objectStore(e);
  if (0 < f.length) {
    for (a = 0;10 > a && a < f.length;a++) {
      h(a);
    }
  } else {
    L(b, []);
  }
}
function Fe(a, b, c, d) {
  function e(a) {
    var m = d[a], p = b.a.objectStore(m.h()), n;
    n = null === p.keyPath ? p.put(c[a], m.s()) : p.put(c[a]);
    n.onsuccess = function(d) {
      g++;
      f[a] = d.target.result;
      g == c.length ? L(b, f, h) : (d = a + 10, d < c.length && e(d));
    };
    n.onerror = function(d) {
      g++;
      f[a] = n.error;
      h = !0;
      d.preventDefault();
      g == c.length ? L(b, f, h) : (d = a + 10, d < c.length && e(d));
    };
  }
  var f = [], g = 0, h = !1;
  if (0 < c.length) {
    for (a = 0;10 > a && a < c.length;a++) {
      e(a);
    }
  } else {
    L(b, f, h);
  }
}
function Ae(a, b, c, d, e, f) {
  function g() {
    var a = {}, b = e.indexOf("\n", m), d = !1, G;
    -1 == b ? (d = !0, G = e.substring(m)) : (G = e.substring(m, b), m = b + 1);
    b = G.split(f);
    for (G = 0;G < p.length;G++) {
      var F = b[G];
      n[G] && ("TEXT" == n[G] ? F = oa(F) : "INTEGER" == n[G] ? F = parseInt(F, 10) : "NUMERIC" == n[G] && (F = parseFloat(F)));
      a[p[G]] = F;
    }
    var E = h.put(a);
    E.onsuccess = function(a) {
      k.push(a.target.result);
      d ? c(k) : g();
    };
    E.onerror = function(a) {
      a.preventDefault();
      c(E.error, !0);
    };
  }
  a = P(a.a, d);
  var h = b.objectStore(d), k = [], m = e.indexOf("\n"), p = e.substr(0, m).split(f), n = [];
  for (b = 0;b < p.length;b++) {
    (d = Rc(a, p[b])) ? n[b] = d.type : p[b] == a.keyPath && (n[b] = a.type);
  }
  m++;
  g();
}
function Ne(a, b, c, d) {
  var e = b.a.objectStore(c).openCursor(Hc.only(d));
  e.onsuccess = function(a) {
    if (a = a.target.result) {
      var c = a["delete"]();
      c.onsuccess = function() {
        L(b, 1);
      };
      c.onerror = function() {
        L(b, c.error, !0);
      };
    } else {
      L(b, 0);
    }
  };
  e.onerror = function(a) {
    a.preventDefault();
    L(b, e.error, !0);
  };
}
function Oe(a, b, c) {
  function d(a) {
    a++;
    if (a >= c.length) {
      0 < h.length ? L(b, h, !0) : L(b, e);
    } else {
      c[a].h() != f && (f = c[a].h(), g = b.a.objectStore(f));
      var m = g["delete"](c[a].s());
      m.onsuccess = function() {
        e++;
        d(a);
      };
      m.onerror = function(b) {
        b.preventDefault();
        h[a] = m.error;
        d(a);
      };
    }
  }
  var e = 0, f, g, h = [];
  d(-1);
}
function Ie(a, b, c, d) {
  var e = b.a.objectStore(c), f = e.count(d);
  f.onsuccess = function(a) {
    var c = a.target.result, f = e["delete"](d);
    f.onsuccess = function() {
      L(b, c);
    };
    f.onerror = function() {
      L(b, f.error, !0);
    };
  };
  f.onerror = function(a) {
    a.preventDefault();
    L(b, f.error, !0);
  };
}
function Ke(a, b, c, d) {
  var e = b.a.objectStore(c)["delete"](d);
  e.onsuccess = function() {
    L(b, void 0);
  };
  e.onerror = function(a) {
    a.preventDefault();
    L(b, e.error, !0);
  };
}
function Me(a, b, c, d, e) {
  var f = [], g = b.a.objectStore(c).index(d).openCursor(e), h = 0;
  g.onsuccess = function(a) {
    var c = a.target.result;
    if (c) {
      var d = c["delete"]();
      d.onsuccess = function() {
        h++;
        c["continue"]();
      };
      d.onerror = function(a) {
        f.push(d.error);
        a.preventDefault();
        c["continue"]();
      };
    } else {
      0 < f.length ? L(b, f, !0) : L(b, h);
    }
  };
  g.onerror = function(a) {
    a.preventDefault();
    L(b, g.error, !0);
  };
}
function Le(a, b, c) {
  var d = c.length, e = 0;
  for (a = 0;a < d;a++) {
    var f = b.a.objectStore(c[a]).clear();
    f.onsuccess = function() {
      e++;
      e == d && L(b, e);
    };
    f.onerror = function(a) {
      e++;
      a.preventDefault();
      e == d && L(b, f.error, !0);
    };
  }
}
function ue(a, b, c, d) {
  var e = b.a.objectStore(c), f = e.get(d);
  f.onsuccess = function(a) {
    var c = a.target.result;
    if (!e.keyPath && 0 == e.indexNames.length && Lb && u(c) && 0 <= c.indexOf(";base64,")) {
      '"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substr(1, c.length - 2));
      c = c.split(";base64,");
      a = c[0].split(":")[1];
      for (var c = window.atob(c[1]), d = c.length, f = new Uint8Array(d), p = 0;p < d;++p) {
        f[p] = c.charCodeAt(p);
      }
      L(b, new Blob([f.buffer], {type:a}));
    } else {
      L(b, a.target.result);
    }
  };
  f.onerror = function(a) {
    a.preventDefault();
    L(b, f.error, !0);
  };
}
function we(a, b, c, d) {
  function e(a) {
    if (null == d[a]) {
      if (g++, f[a] = void 0, g == k) {
        L(b, f);
      } else {
        var c = a + 10;
        c < k && e(c);
      }
    }
    var n;
    n = h.get(d[a]);
    n.onsuccess = function(c) {
      g++;
      f[a] = c.target.result;
      g == k ? L(b, f) : (c = a + 10, c < k && e(c));
    };
    n.onerror = function(a) {
      g++;
      a.preventDefault();
      L(b, n.error, !0);
    };
  }
  var f = [];
  f.length = d.length;
  var g = 0, h = b.a.objectStore(c), k = d.length;
  if (0 < k) {
    for (a = 0;10 > a && a < k;a++) {
      e(a);
    }
  } else {
    L(b, []);
  }
}
function xe(a, b, c) {
  function d(a) {
    var h = c[a], k = b.a.objectStore(h.h()).get(h.s());
    k.onsuccess = function(h) {
      f++;
      e[a] = h.target.result;
      f == c.length ? L(b, e) : (h = a + 10, h < c.length && d(h));
    };
    k.onerror = function(a) {
      f++;
      a.preventDefault();
      L(b, k.error, !0);
    };
  }
  var e = [];
  e.length = c.length;
  var f = 0;
  if (0 < c.length) {
    for (a = 0;10 > a && a < c.length;a++) {
      d(a);
    }
  } else {
    L(b, []);
  }
}
function te(a, b, c, d, e) {
  a = b.a.objectStore(c);
  d && hd(d);
  var f;
  null != e ? (e = a.index(e), f = null != d ? e.count(d) : e.count()) : f = null != d ? a.count(d) : a.count();
  f.onsuccess = function(a) {
    L(b, a.target.result);
  };
  f.onerror = function(a) {
    a.preventDefault();
    L(b, f.error, !0);
  };
}
function ve(a, b, c, d, e, f, g, h, k, m, p) {
  var n = [], v = b.a.objectStore(d);
  a = k ? m ? "prevunique" : "prev" : m ? "nextunique" : "next";
  d = nc(b) + " " + c + " " + d + (e ? ":" + e : "") + (f ? hd(f) : "");
  k && (d += " reverse");
  m && (d += " unique");
  if (p && r(p[0])) {
    m = e ? !r(p[1]) : !0;
    var x = p[0], B = f ? f.lower : void 0, G = f ? f.upper : void 0, F = f ? !!f.lowerOpen : !1;
    f = f ? !!f.upperOpen : !1;
    f = Ec(k ? new N(B, x, F, m) : new N(x, G, m, f));
    d += " starting from " + hd(p[0]);
    r(p[1]) && (d += ", " + hd(p[1]));
  }
  var E;
  E = 1 == c || 2 == c || 3 == c ? e ? v.index(e).openKeyCursor(f, a) : v.openCursor(f, a) : e ? v.index(e).openCursor(f, a) : v.openCursor(f, a);
  var O = !1;
  E.onsuccess = function(a) {
    if (a = a.target.result) {
      if (!O) {
        if (0 < h) {
          O = !0;
          a.advance(h);
          return;
        }
        if (p && e && r(p[0])) {
          if (r(p[1])) {
            var d = Yb.cmp(a.key, p[0]), f = k ? -1 : 1;
            if (0 == d) {
              d = Yb.cmp(a.primaryKey, p[1]);
              if (0 == d) {
                O = !0;
                a["continue"]();
                return;
              }
              if (d == f) {
                O = !0;
              } else {
                a["continue"]();
                return;
              }
            } else {
              O = !0;
            }
          } else {
            O = !0;
          }
        } else {
          O = !0;
        }
      }
      1 == c ? n.push(a.key) : 2 == c ? n.push(a.primaryKey) : 3 == c ? (f = {}, e && (f[e] = a.key), v.keyPath ? f[v.keyPath] = a.primaryKey : f._ROWID_ = a.primaryKey, n.push(f)) : 4 == c ? n.push(a.value) : n.push([a.key, a.primaryKey, a.value]);
      if (n.length < g) {
        a["continue"]();
      } else {
        p && (p[0] = Dc(a.key), p[1] = Dc(a.primaryKey)), L(b, n);
      }
    } else {
      p && (p[0] = void 0, p[1] = void 0), L(b, n);
    }
  };
  E.onerror = function(a) {
    a.preventDefault();
    L(b, E.error, !0);
  };
}
;function re(a, b) {
  this.a = b;
}
z(re, af);
re.prototype.logger = null;
function Qe(a, b, c) {
  a = P(a.a, c);
  return new $e(b, 0, a);
}
;function bf(a, b) {
  this.o = null;
  this.ea = b || NaN;
}
function Fd(a, b, c) {
  function d(a, b) {
    for (var d = 0;d < c.stores.length;d++) {
      cf(a, b, c.stores[d]);
    }
    for (var e = a.objectStoreNames, f = e.length, d = 0;d < f;d++) {
      od(c, e[d]) || a.deleteObjectStore(e[d]);
    }
  }
  function e(b, c) {
    f.c || (r(c) ? (a.o = null, f.j(c)) : (a.o = b, a.o.onabort = function(b) {
      a.Ja(b.target.error);
    }, a.o.onerror = function(b) {
      a.Ja(b.target.error);
    }, a.o.onversionchange = function(b) {
      if (a.o && (a.o.onabort = null, a.o.onblocked = null, a.o.onerror = null, a.o.onversionchange = null, a.Wa(b), !b.defaultPrevented)) {
        a.o.close();
        a.o = null;
        var c = Error();
        c.name = b.type;
        a.bb(c);
      }
    }, f.callback(parseFloat(g))));
  }
  var f = new C, g = void 0, h = c.version, k;
  k = r(h) ? Yb.open(b, h) : Yb.open(b);
  k.onsuccess = function(f) {
    var h = f.target.result;
    r(g) || (g = h.version);
    if (c.c) {
      Ad(a, function(a) {
        if (c instanceof rd) {
          for (var f = 0;f < a.stores.length;f++) {
            od(c, a.stores[f].getName()) || sd(c, a.stores[f].clone());
          }
        }
        if (0 < pd(c, a).length) {
          if (a = w(h.version) ? h.version + 1 : 1, "IDBOpenDBRequest" in q) {
            h.close();
            var g = Yb.open(b, a);
            g.onupgradeneeded = function(a) {
              d(a.target.result, g.transaction);
            };
            g.onsuccess = function(a) {
              e(a.target.result);
            };
            g.onerror = function() {
              e(null);
            };
          } else {
            var k = h.setVersion(a + "");
            k.a = function(a) {
              e(null, a);
            };
            k.onsuccess = function() {
              k.transaction.oncomplete = m;
              d(h, k.transaction);
            };
            var m = function() {
              var a = Yb.open(b);
              a.onsuccess = function(a) {
                e(a.target.result);
              };
              a.onerror = function() {
                e(null);
              };
            };
            null != k.transaction && (k.transaction.oncomplete = m);
          }
        } else {
          e(h);
        }
      }, void 0, h);
    } else {
      if (c.version > h.version) {
        var k = h.setVersion(c.version);
        k.a = function(a) {
          e(null, a);
        };
        k.onsuccess = function() {
          d(h, k.transaction);
        };
      } else {
        Ad(a, function(a) {
          a = pd(c, a);
          0 < a.length ? e(null, new wd("different schema: " + a)) : e(h);
        }, void 0, h);
      }
    }
  };
  k.onupgradeneeded = function(a) {
    a = a.target.result;
    g = NaN;
    d(a, k.transaction);
  };
  k.onerror = function(a) {
    e(null, a);
  };
  k.onblocked = function(a) {
    e(null, a);
  };
  w(a.ea) && !isNaN(a.ea) && setTimeout(function() {
    "done" != k.readyState && e(null, new fe("connection timeout after " + a.ea));
  }, a.ea);
  return f;
}
l = bf.prototype;
l.ea = 18E4;
l.bb = function() {
};
l.Ja = function() {
};
l.Wa = function() {
};
l.logger = null;
l.o = null;
function Ad(a, b, c, d) {
  a = d || a.o;
  if (r(c)) {
    if (null === c) {
      if (0 == a.objectStoreNames.length) {
        b(new md(a.version));
        return;
      }
      throw new vd;
    }
    a = c.db;
  } else {
    c = [];
    for (d = a.objectStoreNames.length - 1;0 <= d;d--) {
      c[d] = a.objectStoreNames[d];
    }
    if (0 == c.length) {
      b(new md(a.version));
      return;
    }
    c = a.transaction(c, I);
  }
  var e = a.objectStoreNames, f = [], g = e.length;
  for (d = 0;d < g;d++) {
    for (var h = c.objectStore(e[d]), k = [], m = 0, p = h.indexNames.length;m < p;m++) {
      var n = h.index(h.indexNames[m]);
      k[m] = new Kc(n.keyPath, void 0, n.unique, n.multiEntry, n.name);
    }
    f[d] = new Pc(h.name, h.keyPath, h.autoIncrement, void 0, k);
  }
  c = new md(a.version, f);
  b(c);
}
function cf(a, b, c) {
  function d() {
    var b = {autoIncrement:!!c.autoIncrement};
    null != c.keyPath && (b.keyPath = c.keyPath);
    return a.createObjectStore(c.getName(), b);
  }
  if (a.objectStoreNames.contains(c.getName())) {
    b = b.objectStore(c.getName());
    Nc(c.keyPath || "", b.keyPath || "") ? (a.deleteObjectStore(c.getName()), b = d()) : ba(b.autoIncrement) && ba(c.autoIncrement) && b.autoIncrement != c.autoIncrement && (a.deleteObjectStore(c.getName()), b = d());
    for (var e = b.indexNames, f = 0;f < c.indexes.length;f++) {
      var g = c.index(f);
      !e.contains(g.getName()) && g.c && b.clear();
    }
    for (var h = 0, k = 0, m = 0, f = 0;f < c.indexes.length;f++) {
      var g = c.index(f), p = !1;
      if (e.contains(g.getName())) {
        var n = b.index(g.getName()), v = null != n.unique && null != g.unique && n.unique != g.unique, x = null != n.multiEntry && null != g.multiEntry && n.multiEntry != g.multiEntry, n = null != n.keyPath && null != g.keyPath && !!Nc(n.keyPath, g.keyPath);
        if (v || x || n) {
          b.deleteIndex(g.getName()), p = !0, h--, m++;
        }
      } else {
        "BLOB" != g.type && (p = !0);
      }
      p && (g.unique || g.multiEntry ? (p = {unique:g.unique, multiEntry:g.multiEntry}, b.createIndex(g.getName(), g.keyPath, p)) : b.createIndex(g.getName(), g.keyPath), h++);
    }
    for (f = 0;f < e.length;f++) {
      Tc(c, e[f]) || (b.deleteIndex(e[f]), k++);
    }
  } else {
    for (b = d(), f = 0;f < c.indexes.length;f++) {
      g = c.index(f), "BLOB" != g.type && (g.unique || g.multiEntry ? (p = {unique:g.unique, multiEntry:g.multiEntry}, b.createIndex(g.getName(), g.keyPath, p)) : b.createIndex(g.getName(), g.keyPath));
    }
  }
}
function Hd(a, b, c, d, e) {
  a = a.o;
  if (!c) {
    c = [];
    for (var f = a.objectStoreNames.length - 1;0 <= f;f--) {
      c[f] = a.objectStoreNames[f];
    }
  }
  0 == c.length ? b(null) : (c = a.transaction(c, d), c.oncomplete = function(a) {
    e("complete", a);
  }, c.onabort = function(a) {
    e("abort", a);
  }, b(c), b = null);
}
l.close = function() {
  this.o.close();
};
qc.push(function(a, b) {
  if (!Yb || b && "indexeddb" != b) {
    return null;
  }
  var c = Yb.deleteDatabase(a), d = new K("vc");
  c.onblocked = function(a) {
    Ub(d, a);
  };
  c.onerror = function(a) {
    d.j(a);
  };
  c.onsuccess = function(a) {
    d.callback(a);
  };
  return d;
});
/*
 Copyright 2012 YDN Authors, Yathit. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");.
*/
V.prototype.ya = function(a) {
  return "indexeddb" == a && Yb ? new bf(0, this.Q) : null;
};
/*
 Copyright 2012 YDN Authors, Yathit. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");.
*/
V.prototype.branch = V.prototype.Na;
V.prototype.getTxNo = V.prototype.Hb;
qe.prototype.getTxNo = qe.prototype.f;
V.prototype.run = V.prototype.X;
W.prototype.branch = W.prototype.Na;
W.prototype.add = W.prototype.add;
W.prototype.get = W.prototype.get;
W.prototype.keys = W.prototype.aa;
W.prototype.values = W.prototype.H;
W.prototype.put = W.prototype.put;
W.prototype.clear = W.prototype.clear;
W.prototype.remove = W.prototype.t;
W.prototype.count = W.prototype.count;
T.prototype.add = T.prototype.add;
T.prototype.get = T.prototype.get;
T.prototype.keys = T.prototype.aa;
T.prototype.values = T.prototype.H;
T.prototype.put = T.prototype.put;
T.prototype.clear = T.prototype.clear;
T.prototype.remove = T.prototype.t;
T.prototype.count = T.prototype.count;
ka("ydn.db.Key", Bc);
Bc.prototype.id = Bc.prototype.s;
Bc.prototype.parent = Bc.prototype.wb;
Bc.prototype.storeName = Bc.prototype.h;
ka("ydn.db.KeyRange", N);
N.upperBound = N.upperBound;
N.lowerBound = N.lowerBound;
N.bound = N.bound;
N.only = N.only;
N.starts = Gc;
vc.prototype.store_name = vc.prototype.b;
vc.prototype.getStoreName = vc.prototype.h;
zc.prototype.name = zc.prototype.name;
zc.prototype.getKey = zc.prototype.c;
zc.prototype.getValue = zc.prototype.u;
Ac.prototype.name = Ac.prototype.name;
Ac.prototype.getKeys = Ac.prototype.ba;
Ac.prototype.getValues = Ac.prototype.Ba;
function df(a, b, c) {
  W.call(this, a, b, c);
}
z(df, X);
ka("ydn.db.Storage", df);
function ef() {
  this.a = ja();
}
new ef;
ef.prototype.get = function() {
  return this.a;
};
!Kb && !Jb || Jb && Jb && 9 <= Sb || Kb && Qb("1.9.1");
Jb && Qb("9");
var ff = !Jb || Jb && 9 <= Sb, gf = Jb && !Qb("9");
!Lb || Qb("528");
Kb && Qb("1.9b") || Jb && Qb("8") || Ib && Qb("9.5") || Lb && Qb("528");
Kb && !Qb("8") || Jb && Qb("9");
function hf(a) {
  hf[" "](a);
  return a;
}
hf[" "] = function() {
};
function jf(a, b) {
  uc.call(this, a ? a.type : "");
  this.a = this.target = null;
  this.clientY = this.clientX = 0;
  this.b = null;
  if (a) {
    this.type = a.type;
    this.target = a.target || a.srcElement;
    this.a = b;
    var c = a.relatedTarget;
    if (c && Kb) {
      try {
        hf(c.nodeName);
      } catch (d) {
      }
    }
    this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
    this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
    this.b = a;
    a.defaultPrevented && this.preventDefault();
  }
}
z(jf, uc);
jf.prototype.preventDefault = function() {
  jf.r.preventDefault.call(this);
  var a = this.b;
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    if (a.returnValue = !1, gf) {
      try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1;
        }
      } catch (b) {
      }
    }
  }
};
function kf(a, b) {
  rc.call(this);
  this.d = b;
  this.b = [];
  if (a > this.d) {
    throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
  }
  for (var c = 0;c < a;c++) {
    this.b.push(this.a());
  }
}
z(kf, rc);
kf.prototype.a = function() {
  return{};
};
kf.prototype.c = function(a) {
  if (y(a)) {
    if (ca(a.oa)) {
      a.oa();
    } else {
      for (var b in a) {
        delete a[b];
      }
    }
  }
};
kf.prototype.M = function() {
  kf.r.M.call(this);
  for (var a = this.b;a.length;) {
    this.c(a.pop());
  }
  delete this.b;
};
function lf() {
  this.a = [];
  this.c = new Bb;
  this.d = new Bb;
  this.f = 1;
  this.e = new kf(0, 4E3);
  this.e.a = function() {
    return new mf;
  };
  this.g = new kf(0, 50);
  this.g.a = function() {
    return new nf;
  };
  var a = this;
  this.b = new kf(0, 2E3);
  this.b.a = function() {
    return String(a.f++);
  };
  this.b.c = function() {
  };
}
function nf() {
  this.time = this.count = 0;
}
nf.prototype.toString = function() {
  var a = [];
  a.push(this.type, " ", this.count, " (", Math.round(10 * this.time) / 10, " ms)");
  return a.join("");
};
function mf() {
}
function of(a, b, c) {
  var d = [];
  -1 == b ? d.push("    ") : d.push(pf(a.b - b));
  d.push(" ", qf(a.b - 0));
  0 == a.a ? d.push(" Start        ") : 1 == a.a ? (d.push(" Done "), d.push(pf(a.e - a.startTime), " ms ")) : d.push(" Comment      ");
  d.push(c, a);
  0 < a.d && d.push("[VarAlloc ", a.d, "] ");
  return d.join("");
}
mf.prototype.toString = function() {
  return null == this.type ? this.c : "[" + this.type + "] " + this.c;
};
lf.prototype.toString = function() {
  for (var a = [], b = -1, c = [], d = 0;d < this.a.length;d++) {
    var e = this.a[d];
    1 == e.a && c.pop();
    a.push(" ", of(e, b, c.join("")));
    b = e.b;
    a.push("\n");
    0 == e.a && c.push("|  ");
  }
  if (0 != this.c.Sa()) {
    var f = ja();
    a.push(" Unstopped timers:\n");
    Ab(this.c, function(b) {
      a.push("  ", b, " (", f - b.startTime, " ms, started at ", qf(b.startTime), ")\n");
    });
  }
  b = this.d.ba();
  for (d = 0;d < b.length;d++) {
    c = this.d.get(b[d]), 1 < c.count && a.push(" TOTAL ", c, "\n");
  }
  a.push("Total tracers created ", 0, "\n", "Total comments created ", 0, "\n", "Overhead start: ", 0, " ms\n", "Overhead end: ", 0, " ms\n", "Overhead comment: ", 0, " ms\n");
  return a.join("");
};
function pf(a) {
  a = Math.round(a);
  var b = "";
  1E3 > a && (b = " ");
  100 > a && (b = "  ");
  10 > a && (b = "   ");
  return b + a;
}
function qf(a) {
  a = Math.round(a);
  return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4);
}
new lf;
var rf = "closure_listenable_" + (1E6 * Math.random() | 0), sf = 0;
function tf(a, b, c, d, e) {
  this.P = a;
  this.a = null;
  this.src = b;
  this.type = c;
  this.ka = !!d;
  this.qa = e;
  this.key = ++sf;
  this.W = this.ja = !1;
}
function uf(a) {
  a.W = !0;
  a.P = null;
  a.a = null;
  a.src = null;
  a.qa = null;
}
;function vf(a) {
  this.src = a;
  this.a = {};
  this.b = 0;
}
vf.prototype.add = function(a, b, c, d, e) {
  var f = a.toString();
  a = this.a[f];
  a || (a = this.a[f] = [], this.b++);
  var g = wf(a, b, d, e);
  -1 < g ? (b = a[g], c || (b.ja = !1)) : (b = new tf(b, this.src, f, !!d, e), b.ja = c, a.push(b));
  return b;
};
function xf(a, b) {
  var c = b.type;
  if (!(c in a.a)) {
    return!1;
  }
  var d = a.a[c], e = Ra(d, b), f;
  (f = 0 <= e) && A.splice.call(d, e, 1);
  f && (uf(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
  return f;
}
function wf(a, b, c, d) {
  for (var e = 0;e < a.length;++e) {
    var f = a[e];
    if (!f.W && f.P == b && f.ka == !!c && f.qa == d) {
      return e;
    }
  }
  return-1;
}
;var yf = "closure_lm_" + (1E6 * Math.random() | 0), zf = {}, Af = 0;
function Bf(a, b, c, d, e) {
  if (s(b)) {
    for (var f = 0;f < b.length;f++) {
      Bf(a, b[f], c, d, e);
    }
  } else {
    c = Cf(c), a && a[rf] ? a.Ua(b, c, d, e) : Df(a, b, c, !1, d, e);
  }
}
function Df(a, b, c, d, e, f) {
  if (!b) {
    throw Error("Invalid event type");
  }
  var g = !!e, h = Ef(a);
  h || (a[yf] = h = new vf(a));
  c = h.add(b, c, d, e, f);
  c.a || (d = Ff(), c.a = d, d.src = a, d.P = c, a.addEventListener ? a.addEventListener(b.toString(), d, g) : a.attachEvent(Gf(b.toString()), d), Af++);
}
function Ff() {
  var a = Hf, b = ff ? function(c) {
    return a.call(b.src, b.P, c);
  } : function(c) {
    c = a.call(b.src, b.P, c);
    if (!c) {
      return c;
    }
  };
  return b;
}
function If(a, b, c, d, e) {
  if (s(b)) {
    for (var f = 0;f < b.length;f++) {
      If(a, b[f], c, d, e);
    }
  } else {
    c = Cf(c), a && a[rf] ? a.b.add(String(b), c, !0, d, e) : Df(a, b, c, !0, d, e);
  }
}
function Jf(a, b, c, d, e) {
  if (s(b)) {
    for (var f = 0;f < b.length;f++) {
      Jf(a, b[f], c, d, e);
    }
  } else {
    (c = Cf(c), a && a[rf]) ? (a = a.b, b = String(b).toString(), b in a.a && (f = a.a[b], c = wf(f, c, d, e), -1 < c && (uf(f[c]), A.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = Ef(a)) && (b = a.a[b.toString()], a = -1, b && (a = wf(b, c, !!d, e)), (c = -1 < a ? b[a] : null) && Kf(c));
  }
}
function Kf(a) {
  if (!w(a) && a && !a.W) {
    var b = a.src;
    if (b && b[rf]) {
      b.Fa(a);
    } else {
      var c = a.type, d = a.a;
      b.removeEventListener ? b.removeEventListener(c, d, a.ka) : b.detachEvent && b.detachEvent(Gf(c), d);
      Af--;
      (c = Ef(b)) ? (xf(c, a), 0 == c.b && (c.src = null, b[yf] = null)) : uf(a);
    }
  }
}
function Gf(a) {
  return a in zf ? zf[a] : zf[a] = "on" + a;
}
function Lf(a, b, c, d) {
  var e = 1;
  if (a = Ef(a)) {
    if (b = a.a[b.toString()]) {
      for (b = b.concat(), a = 0;a < b.length;a++) {
        var f = b[a];
        f && f.ka == c && !f.W && (e &= !1 !== Mf(f, d));
      }
    }
  }
  return Boolean(e);
}
function Mf(a, b) {
  var c = a.P, d = a.qa || a.src;
  a.ja && Kf(a);
  return c.call(d, b);
}
function Hf(a, b) {
  if (a.W) {
    return!0;
  }
  if (!ff) {
    var c;
    if (!(c = b)) {
      a: {
        c = ["window", "event"];
        for (var d = q, e;e = c.shift();) {
          if (null != d[e]) {
            d = d[e];
          } else {
            c = null;
            break a;
          }
        }
        c = d;
      }
    }
    e = c;
    c = new jf(e, this);
    d = !0;
    if (!(0 > e.keyCode || void 0 != e.returnValue)) {
      a: {
        var f = !1;
        if (0 == e.keyCode) {
          try {
            e.keyCode = -1;
            break a;
          } catch (g) {
            f = !0;
          }
        }
        if (f || void 0 == e.returnValue) {
          e.returnValue = !0;
        }
      }
      e = [];
      for (f = c.a;f;f = f.parentNode) {
        e.push(f);
      }
      for (var f = a.type, h = e.length - 1;0 <= h;h--) {
        c.a = e[h], d &= Lf(e[h], f, !0, c);
      }
      for (h = 0;h < e.length;h++) {
        c.a = e[h], d &= Lf(e[h], f, !1, c);
      }
    }
    return d;
  }
  return Mf(a, new jf(b, this));
}
function Ef(a) {
  a = a[yf];
  return a instanceof vf ? a : null;
}
var Nf = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function Cf(a) {
  return ca(a) ? a : a[Nf] || (a[Nf] = function(b) {
    return a.handleEvent(b);
  });
}
;function Of() {
  rc.call(this);
  this.b = new vf(this);
  this.f = this;
  this.e = null;
}
z(Of, rc);
Of.prototype[rf] = !0;
l = Of.prototype;
l.addEventListener = function(a, b, c, d) {
  Bf(this, a, b, c, d);
};
l.removeEventListener = function(a, b, c, d) {
  Jf(this, a, b, c, d);
};
function Pf(a, b) {
  var c, d = a.e;
  if (d) {
    for (c = [];d;d = d.e) {
      c.push(d);
    }
  }
  var d = a.f, e = b, f = e.type || e;
  if (u(e)) {
    e = new uc(e, d);
  } else {
    if (e instanceof uc) {
      e.target = e.target || d;
    } else {
      var g = e, e = new uc(f, d);
      wb(e, g);
    }
  }
  var g = !0, h;
  if (c) {
    for (var k = c.length - 1;0 <= k;k--) {
      h = e.a = c[k], g = Qf(h, f, !0, e) && g;
    }
  }
  h = e.a = d;
  g = Qf(h, f, !0, e) && g;
  g = Qf(h, f, !1, e) && g;
  if (c) {
    for (k = 0;k < c.length;k++) {
      h = e.a = c[k], g = Qf(h, f, !1, e) && g;
    }
  }
}
l.M = function() {
  Of.r.M.call(this);
  if (this.b) {
    var a = this.b, b = 0, c;
    for (c in a.a) {
      for (var d = a.a[c], e = 0;e < d.length;e++) {
        ++b, uf(d[e]);
      }
      delete a.a[c];
      a.b--;
    }
  }
  this.e = null;
};
l.Ua = function(a, b, c, d) {
  return this.b.add(String(a), b, !1, c, d);
};
l.Fa = function(a) {
  return xf(this.b, a);
};
function Qf(a, b, c, d) {
  b = a.b.a[String(b)];
  if (!b) {
    return!0;
  }
  b = b.concat();
  for (var e = !0, f = 0;f < b.length;++f) {
    var g = b[f];
    if (g && !g.W && g.ka == c) {
      var h = g.P, k = g.qa || g.src;
      g.ja && a.Fa(g);
      e = !1 !== h.call(k, d) && e;
    }
  }
  return e && !1 != d.Xa;
}
;/*
 Copyright 2012 YDN Authors, Yathit. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");.
*/
function Rf(a) {
  a.i || (a.i = new Of);
  return a.i;
}
V.prototype.addEventListener = function(a, b, c, d) {
  "ready" == a ? If(Rf(this), a, b, c, d) : Bf(Rf(this), a, b, c, d);
};
V.prototype.removeEventListener = function(a, b, c, d) {
  Jf(Rf(this), a, b, c, d);
};
V.prototype.C = function(a) {
  Pf(Rf(this), a);
};
V.prototype.addEventListener = V.prototype.addEventListener;
V.prototype.removeEventListener = V.prototype.removeEventListener;
X.prototype.scan = X.prototype.Cb;
X.prototype.map = X.prototype.map;
X.prototype.reduce = X.prototype.reduce;
X.prototype.open = X.prototype.open;
U.prototype.scan = U.prototype.Ka;
U.prototype.map = U.prototype.map;
U.prototype.reduce = U.prototype.reduce;
U.prototype.open = U.prototype.open;
Id.prototype.getKey = Id.prototype.Db;
Id.prototype.getPrimaryKey = Id.prototype.p;
Id.prototype.getValue = Id.prototype.u;
Id.prototype.update = Id.prototype.update;
Id.prototype.clear = Id.prototype.clear;
ka("ydn.db.Iterator", R);
ka("ydn.db.KeyIterator", Pd);
ka("ydn.db.ValueIterator", Rd);
ka("ydn.db.IndexIterator", Qd);
ka("ydn.db.IndexValueIterator", Td);
R.prototype.getState = R.prototype.kb;
R.prototype.getKeyRange = R.prototype.$a;
R.prototype.getIndexName = R.prototype.sb;
R.prototype.getStoreName = R.prototype.h;
R.prototype.isReversed = R.prototype.N;
R.prototype.isUnique = R.prototype.Z;
R.prototype.isKeyIterator = R.prototype.ub;
R.prototype.isIndexIterator = R.prototype.lb;
R.prototype.getPrimaryKey = R.prototype.p;
R.prototype.getKey = R.prototype.tb;
R.prototype.resume = R.prototype.ab;
R.prototype.reset = R.prototype.Ha;
R.prototype.reverse = R.prototype.vb;
Pd.where = function(a, b, c, d, e) {
  return new Pd(a, Jc(b, c, d, e));
};
Rd.where = Sd;
Qd.where = function(a, b, c, d, e, f) {
  return new Qd(a, b, Jc(c, d, e, f));
};
Td.where = function(a, b, c, d, e, f) {
  return new Td(a, b, Jc(c, d, e, f));
};
ka("ydn.db.Streamer", Yd);
Yd.prototype.push = Yd.prototype.push;
Yd.prototype.collect = Yd.prototype.Ab;
Yd.prototype.setSink = Yd.prototype.pb;
function Sf(a, b) {
  ae.call(this, a, b);
}
z(Sf, ae);
Sf.prototype.f = function() {
  return!1;
};
Sf.prototype.c = function(a, b) {
  function c(b) {
    r(a[b]) ? (e = !1, d[b] = !0) : (d[b] = !1, 0 <= b - 1 && c(b - 1));
  }
  var d = [], e = !0;
  c(a.length - 1);
  e && (d = []);
  return be(this, d, b);
};
function Tf(a, b) {
  ae.call(this, a, b);
}
z(Tf, ae);
Tf.prototype.c = function(a, b) {
  var c = [], d = b[0];
  if (null == d) {
    return[];
  }
  for (var e = !0, f = !1, g = d, h = [], k = 1;k < a.length;k++) {
    if (null != b[k]) {
      var m = pc(d, b[k]);
      h[k] = m;
      this.b ? -1 == m ? e = !1 : 1 == m && (e = !1, f = !0, -1 == pc(b[k], g) && (g = b[k])) : 1 == m ? e = !1 : -1 == m && (e = !1, f = !0, 1 == pc(b[k], g) && (g = b[k]));
    } else {
      e = !1, f = !0;
    }
  }
  if (e) {
    for (f = 0;f < a.length;f++) {
      null != b[f] && (c[f] = !0);
    }
  } else {
    if (f) {
      for (f = 0;f < a.length;f++) {
        null != b[f] && (this.b ? -1 == pc(g, b[f]) && (c[f] = g) : 1 == pc(g, b[f]) && (c[f] = g));
      }
    } else {
      for (k = this.b ? -1 : 1, f = 1;f < a.length;f++) {
        h[f] === k && (c[f] = d);
      }
    }
  }
  return e ? (this.e++, this.a && this.a.push(g), c) : {continuePrimary:c};
};
function Uf(a, b) {
  ae.call(this, a, b);
}
z(Uf, ae);
Uf.prototype.logger = null;
Uf.prototype.c = function(a, b) {
  function c(a, b) {
    var c = a.slice(0, a.length - 1);
    c.push(b);
    return c;
  }
  function d(a) {
    return a[a.length - 1];
  }
  var e = [];
  if (0 == a.length || null == a[0] || null == a[0]) {
    return[];
  }
  for (var f = !0, g = 0, h = d(a[g]), k = [], m = 1;m < a.length;m++) {
    if (null != a[m]) {
      var p = d(a[m]), n = pc(h, p);
      k[m] = n;
      this.b ? -1 == n ? f = !1 : 1 == n && (f = !1, h = p, g = 1) : 1 == n ? f = !1 : -1 == n && (f = !1, h = p, g = 1);
    } else {
      return[];
    }
  }
  m = this.b ? -1 : 1;
  if (f) {
    for (f = 0;f < a.length;f++) {
      null != a[f] && (e[f] = !0);
    }
    this.a && (this.d ? this.a.push(b[0], h) : this.a.push(b[0]));
    return e;
  }
  if (0 == g) {
    for (f = 1;f < a.length;f++) {
      k[f] == m && (e[f] = c(a[f], h));
    }
  } else {
    for (f = 0;f < a.length;f++) {
      f != g && null != a[f] && pc(h, d(a[f])) === m && (e[f] = c(a[f], h));
    }
  }
  return{"continue":e};
};
ka("ydn.db.algo.NestedLoop", Sf);
ka("ydn.db.algo.ZigzagMerge", Uf);
ka("ydn.db.algo.SortedMerge", Tf);
function Vf(a) {
  this.b = a || [];
}
Vf.prototype.a = function(a) {
  return-1 == this.b.indexOf(a) ? a : null;
};
function Wf() {
}
Wf.prototype.a = function(a) {
  var b = {ational:"ate", tional:"tion", enci:"ence", anci:"ance", izer:"ize", bli:"ble", alli:"al", entli:"ent", eli:"e", ousli:"ous", ization:"ize", ation:"ate", ator:"ate", alism:"al", iveness:"ive", fulness:"ful", ousness:"ous", aliti:"al", iviti:"ive", biliti:"ble", logi:"log"}, c = {icate:"ic", ative:"", alize:"al", iciti:"ic", ical:"ic", ful:"", ness:""};
  a = a.toLowerCase();
  var d, e, f = a;
  if (3 > a.length) {
    return a;
  }
  var g, h;
  a = a.substr(0, 1);
  "y" == a && (f = a.toUpperCase() + f.substr(1));
  g = /^(.+?)(ss|i)es$/;
  e = /^(.+?)([^s])s$/;
  g.test(f) ? f = f.replace(g, "$1$2") : e.test(f) && (f = f.replace(e, "$1$2"));
  g = /^(.+?)eed$/;
  e = /^(.+?)(ed|ing)$/;
  g.test(f) ? (e = g.exec(f), g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(e[1]) && (g = /.$/, f = f.replace(g, ""))) : e.test(f) && (e = e.exec(f), d = e[1], e = /^([^aeiou][^aeiouy]*)?[aeiouy]/, e.test(d) && (f = d, e = /(at|bl|iz)$/, h = /([^aeiouylsz])\1$/, d = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/, e.test(f) ? f += "e" : h.test(f) ? (g = /.$/, f = f.replace(g, "")) : d.test(f) && (f += "e")));
  g = /^(.+?)y$/;
  g.test(f) && (e = g.exec(f), d = e[1], g = /^([^aeiou][^aeiouy]*)?[aeiouy]/, g.test(d) && (f = d + "i"));
  g = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  g.test(f) && (e = g.exec(f), d = e[1], e = e[2], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(d) && (f = d + b[e]));
  g = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  g.test(f) && (e = g.exec(f), d = e[1], e = e[2], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(d) && (f = d + c[e]));
  g = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  e = /^(.+?)(s|t)(ion)$/;
  g.test(f) ? (e = g.exec(f), d = e[1], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, g.test(d) && (f = d)) : e.test(f) && (e = e.exec(f), d = e[1] + e[2], e = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, e.test(d) && (f = d));
  g = /^(.+?)e$/;
  g.test(f) && (e = g.exec(f), d = e[1], g = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, e = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$/, h = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/, g.test(d) || e.test(d) && !h.test(d)) && (f = d);
  g = /ll$/;
  e = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/;
  g.test(f) && e.test(f) && (g = /.$/, f = f.replace(g, ""));
  "y" == a && (f = a.toLowerCase() + f.substr(1));
  return f;
};
function Xf(a) {
  this.b = a;
}
Xf.prototype.a = function(a) {
  a = a.toLowerCase();
  a = a.replace(/([^c])\1/g, "$1");
  a = function(a) {
    return a.match(/^(kn|gn|pn|ae|wr)/) ? a.substr(1, a.length - 1) : a;
  }(a);
  a = a.replace(/mb$/, "m");
  a = a.replace(/ck/g, "k");
  a = function(a) {
    a = a.replace(/([^s]|^)(c)(h)/g, "$1x$3").trim();
    a = a.replace(/cia/g, "xia");
    a = a.replace(/c(i|e|y)/g, "s$1");
    return a = a.replace(/c/g, "k");
  }(a);
  a = function(a) {
    a = a.replace(/d(ge|gy|gi)/g, "j$1");
    return a = a.replace(/d/g, "t");
  }(a);
  a = function(a) {
    a = a.replace(/gh(^$|[^aeiou])/g, "h$1");
    return a = a.replace(/g(n|ned)$/g, "$1");
  }(a);
  a = function(a) {
    a = a.replace(/([^g]|^)(g)(i|e|y)/g, "$1j$3");
    a = a.replace(/gg/g, "g");
    return a = a.replace(/g/g, "k");
  }(a);
  a = a.replace(/([aeiou])h([^aeiou])/g, "$1$2");
  a = a.replace(/ph/g, "f");
  a = a.replace(/q/g, "k");
  a = a.replace(/s(h|io|ia)/g, "x$1");
  a = function(a) {
    a = a.replace(/^x/, "s");
    return a = a.replace(/x/g, "ks");
  }(a);
  a = function(a) {
    a = a.replace(/t(ia|io)/g, "x$1");
    return a = a.replace(/th/, "0");
  }(a);
  a = a.replace(/tch/g, "ch");
  a = a.replace(/v/g, "f");
  a = a.replace(/^wh/, "w");
  a = a.replace(/w([^aeiou]|$)/g, "$1");
  a = a.replace(/y([^aeiou]|$)/g, "$1");
  a = a.replace(/z/, "s");
  a = a.charAt(0) + a.substr(1, a.length).replace(/[aeiou]/g, "");
  a.length >= this.b && (a = a.substring(0, this.b));
  return a = a.toUpperCase();
};
var Yf = new Xf(32), Zf = new Wf, $f = new Vf("a a's able about above according accordingly across actually after afterwards again against ain't all allow allows almost alone along already also although always am among amongst an and another any anybody anyhow anyone anything anyway anyways anywhere apart appear appreciate appropriate are aren't around as aside ask asking associated at available away awfully b be became because become becomes becoming been before beforehand behind being believe below beside besides best better between beyond both brief but by c c'mon c's came can can't cannot cant cause causes certain certainly changes clearly co com come comes concerning consequently consider considering contain containing contains corresponding could couldn't course currently d definitely described despite did didn't different do does doesn't doing don't done down downwards during e each edu eg eight either else elsewhere enough entirely especially et etc even ever every everybody everyone everything everywhere ex exactly example except f far few fifth first five followed following follows for former formerly forth four from further furthermore g get gets getting given gives go goes going gone got gotten greetings h had hadn't happens hardly has hasn't have haven't having he he's hello help hence her here here's hereafter hereby herein hereupon hers herself hi him himself his hither hopefully how howbeit however i i'd i'll i'm i've ie if ignored immediate in inasmuch inc indeed indicate indicated indicates inner insofar instead into inward is isn't it it'd it'll it's its itself j just k keep keeps kept know knows known l last lately later latter latterly least less lest let let's like liked likely little look looking looks ltd m mainly many may maybe me mean meanwhile merely might more moreover most mostly much must my myself n name namely nd near nearly necessary need needs neither never nevertheless new next nine no nobody non none noone nor normally not nothing novel now nowhere o obviously of off often oh ok okay old on once one ones only onto or other others otherwise ought our ours ourselves out outside over overall own p particular particularly per perhaps placed please plus possible presumably probably provides q que quite qv r rather rd re really reasonably regarding regardless regards relatively respectively right s said same saw say saying says second secondly see seeing seem seemed seeming seems seen self selves sensible sent serious seriously seven several shall she should shouldn't since six so some somebody somehow someone something sometime sometimes somewhat somewhere soon sorry specified specify specifying still sub such sup sure t t's take taken tell tends th than thank thanks thanx that that's thats the their theirs them themselves then thence there there's thereafter thereby therefore therein theres thereupon these they they'd they'll they're they've think third this thorough thoroughly those though three through throughout thru thus to together too took toward towards tried tries truly try trying twice two u un under unfortunately unless unlikely until unto up upon us use used useful uses using usually uucp v value various very via viz vs w want wants was wasn't way we we'd we'll we're we've welcome well went were weren't what what's whatever when whence whenever where where's whereafter whereas whereby wherein whereupon wherever whether which while whither who who's whoever whole whom whose why will willing wish with within without won't wonder would wouldn't x y yes yet you you'd you'll you're you've your yours yourself yourselves z zero".split(" "));
function ag(a) {
  this.data = a;
  this.a = 0;
}
ag.prototype.next = function(a) {
  for (var b = this.a, c = this.data[b], c = 1, d = 0;0 <= b && b < this.data.length;) {
    c = this.data[b];
    if (c instanceof Array) {
      if (a < c[0]) {
        c = -1;
      } else {
        if (a > c[1]) {
          c = 1;
        } else {
          return this.a = b, !0;
        }
      }
    } else {
      if (c == a) {
        return this.a = b, !0;
      }
      c = a < c ? -1 : 1;
    }
    if (0 == d) {
      d = c;
    } else {
      if (d != c) {
        break;
      }
    }
    b += c;
    if (b > this.data.length || 0 > b) {
      break;
    }
  }
  return!1;
};
function bg(a, b) {
  for (var c = 0, d = 0, e = a.length, f = 0;f < e;++f) {
    a: {
      var d = a.charCodeAt(f), g = new ag(categ_letters_numbers_data);
      if (w(d)) {
        d = g.next(d);
      } else {
        for (var h = 0, k = d.length;h < k;++h) {
          if (!1 === g.next(d[h])) {
            d = !1;
            break a;
          }
        }
        d = !0;
      }
    }
    d || ((d = f - c) && b(c, d), c = f + 1);
  }
  (d = e - c) && b(c, d);
}
;var cg, dg;
dg = cg = !1;
var eg = Eb;
eg && (-1 != eg.indexOf("Firefox") ? cg = !0 : -1 != eg.indexOf("Camino") || -1 != eg.indexOf("iPhone") || -1 != eg.indexOf("iPod") || -1 != eg.indexOf("iPad") || -1 != eg.indexOf("Chrome") && (dg = !0));
var fg = cg, gg = dg;
function hg(a, b) {
  this.d = b;
  this.value = a;
}
hg.prototype.u = function() {
  return this.value;
};
hg.prototype.b = function() {
  return 1;
};
var ig = gg || fg;
hg.prototype.s = function() {
  return this.value;
};
function jg(a, b, c, d, e, f) {
  hg.call(this, d, e);
  this.f = a;
  this.c = b;
  this.e = c;
  this.ta = f || [];
}
z(jg, hg);
jg.prototype.fa = function() {
  return{k:this.d, v:this.value.toLowerCase(), id:this.s(), loc:this.ta};
};
jg.prototype.s = function() {
  var a = [this.f, this.e, this.c, this.value];
  return ig ? a : bc(a);
};
jg.prototype.h = function() {
  return this.f;
};
jg.prototype.p = function() {
  return this.e;
};
function kg(a, b, c, d, e) {
  hg.call(this, b, c);
  this.g = d;
  this.a = e;
  this.type = a;
  this.Qa = 1;
}
z(kg, hg);
kg.prototype.b = function() {
  return this.a * this.type * this.Qa;
};
kg.prototype.s = function() {
  return this.value + "|" + this.g;
};
function lg(a, b) {
  jg.call(this, b.h(), b.c, b.p(), b.u(), b.d, []);
  this.i = a;
  this.a = [b];
}
z(lg, jg);
lg.prototype.count = function() {
  return this.a.length;
};
function mg(a, b) {
  for (var c = b.a[0], d = 0;d < a.a.length;d++) {
    if (a.a[d].c == c.c && a.a[d].value == c.value) {
      return;
    }
  }
  a.a.push(c);
}
lg.prototype.b = function() {
  for (var a = 0, b = 0;b < this.a.length;b++) {
    var c = this.a[b], d = kd(this.i, c.h(), c.c), c = c.b(), a = a + c * d.c
  }
  return a;
};
function gb(a, b) {
  var c = a.b(), d = b.b();
  return c <= d ? 1 : -1;
}
lg.prototype.fa = function() {
  for (var a = {value:this.value, primaryKey:this.e, storeName:this.f, score:this.b(), tokens:[]}, b = 0;b < this.a.length;b++) {
    a.tokens[b] = this.a[b].fa();
  }
  return a;
};
function ng(a) {
  var b = [], c;
  a = a.split(/\s+/);
  for (var d = 0;d < a.length;d++) {
    c = a[d];
    for (var e = c.length - 1, f = Array(e), g = 0;g < e;g++) {
      f[g] = c.substring(g, g + 2);
    }
    c = f;
    b.push.apply(b, c);
  }
  return b;
}
;function Ee(a, b, c, d, e, f, g) {
  jg.call(this, b, c, d, e, f, g);
  this.a = a;
}
z(Ee, jg);
Ee.prototype.b = function() {
  var a, b = this.value;
  a = ng(this.a.value.toLowerCase().replace(/^\s+|\s+$/g, ""));
  var b = ng(b.toLowerCase().replace(/^\s+|\s+$/g, "")), c = 0, d = a.length + b.length, e, f, g, h;
  for (e = 0;e < a.length;e++) {
    for (g = a[e], f = 0;f < b.length;f++) {
      if (h = b[f], g == h) {
        c++;
        delete b[f];
        break;
      }
    }
  }
  a = 2 * c / d;
  b = Math.log(this.ta.length + 1);
  c = this.a.b();
  return b * a * c;
};
Ee.prototype.fa = function() {
  return{keyPath:this.c, value:this.value, loc:this.ta.slice()};
};
function og(a, b) {
  this.a = a;
  this.b = b;
  this.d = [];
  this.c = 0;
}
function De(a, b) {
  for (var c, d, e = a.a.getName(), f = 0;f < a.b.length;f++) {
    var g = a.b[f], h = g.type;
    .4 == h || .6 == h ? (d = "v", c = g.u().toLowerCase(), c = Gc(c)) : (d = "v", c = g.u().toLowerCase(), c = N.only(c));
    b(e, d, c, g);
    a.c++;
    .6 == h && (d = "k", c = g.d, c = N.only(c), b(e, d, c, g), a.c++);
  }
}
function Ce(a) {
  for (var b = [a.a.getName()], c = 0;c < a.a.count();c++) {
    var d = a.a.index(c).h();
    -1 == b.indexOf(d) && b.push(d);
  }
  return b;
}
og.prototype.e = function() {
  for (var a = [], b = [], c = 0;c < this.d.length;c++) {
    var d = this.d[c];
    if (0 == d.a.type) {
      -1 == Xa(b, function(a) {
        return a.p() == d.p() && a.h() == d.h();
      }) && b.push(d);
    } else {
      var e = new lg(this.a, d), f = Xa(a, function(a) {
        return a.p() == e.p() && a.h() == e.h();
      });
      if (0 <= f) {
        var g = a[f];
        A.splice.call(a, f, 1);
        mg(g, e);
        e = g;
      }
      fb(a, e);
    }
  }
  for (f = 0;f < b.length;f++) {
    for (g = b[f], c = a.length - 1;0 <= c;--c) {
      var h = a[c];
      if (g.p() == h.p() && g.h() == h.h()) {
        a.splice(f, 1);
        break;
      }
    }
  }
  return a.map(function(a) {
    return a.fa();
  });
};
function pg(a) {
  this.a = a;
  if ("en" == a.b) {
    a = a.c || ["stop", "stemmer", "metaphone"];
    for (var b = [], c = 0;c < a.length;c++) {
      "metaphone" == a[c] ? b.push(Yf) : "stemmer" == a[c] ? b.push(Zf) : "stop" == a[c] && b.push($f);
    }
    a = b;
  } else {
    a = [];
  }
  this.b = a;
}
function qg(a, b) {
  for (var c = 0;c < a.b.length;c++) {
    var d = a.b[c].a(b);
    if (d) {
      b = d;
    } else {
      return null;
    }
  }
  return b;
}
function rg(a, b) {
  var c = [], d = [];
  bg(b, function(a, e) {
    c.push(b.substr(a, e));
    d.push(a);
  });
  for (var e = [], f = 0;f < c.length;f++) {
    e[f] = qg(a, c[f]);
  }
  for (var g = [], h = 0, f = 0;f < c.length;f++) {
    var k = c[f], m = e[f], p = "*" == b.charAt(d[f] + k.length), n = p ? d[f] + k.length + 1 : d[f] + k.length, n = '"' == b.charAt(d[f] - 1) && '"' == b.charAt(n), v = "-" == b.charAt(n ? d[f] - 2 : d[f] - 1), x = .8;
    p ? x = .4 : n ? x = 1 : v ? x = 0 : null != m && (x = .6);
    k = new kg(x, k, m, d[f], 1 / (f + 2));
    g.push(k);
    h += k.b();
  }
  for (f = 0;f < g.length;++f) {
    g[f].Qa = 1 / h;
  }
  return g;
}
function sg(a, b, c, d) {
  var e = [], f = [];
  bg(b, function(a, c) {
    e.push(b.substr(a, c));
    f.push(a);
  });
  for (var g = [], h = 0;h < e.length;h++) {
    g[h] = qg(a, e[h]);
  }
  a = c.h();
  c = c.a;
  for (var k = [], h = 0;h < e.length;h++) {
    var m = e[h], p = g[h];
    if (null != p) {
      var n = Wa(k, function(a) {
        return a.u() == m;
      });
      n || (n = new jg(a, c, d, m, p), k.push(n));
      n.ta.push(f[h]);
    }
  }
  return k;
}
function tg(a, b, c, d) {
  for (var e = [], f = 0;f < a.a.count();f++) {
    var g = a.a.index(f);
    if (g.h() == b) {
      var h = Zb(d, g.a);
      u(h) && (e = e.concat(sg(a, h, g, c)));
    }
  }
  return e;
}
;W.prototype.Pa = function(a, b) {
  var c = this;
  b.a = new pg(b);
  Yc(a, function(d, e) {
    function f(e) {
      var f = a.getName();
      Cc(e) && mc(d, function(a, g, h) {
        if (g) {
          h(a, g);
        } else {
          Ub(d, a);
          var k = Ec(N.bound([f, e], [f, e, "\uffff"]));
          He(c.a, b.getName(), k).B(function() {
            h(a, g);
          });
        }
      });
    }
    function g(b) {
      var e = a.getName();
      mc(d, function(a, f, g) {
        f ? g(a, f) : (Ub(d, a), b && (b = Ec(N.bound([e, b.lower], [e, b.upper, "\uffff"]))), He(c.a, e, b).B(function() {
          g(a, f);
        }));
      });
    }
    function h(e, f) {
      var g = a.getName();
      mc(d, function(a, h, k) {
        Ub(d, a);
        if (h) {
          k(a, h);
        } else {
          var G = b.getName();
          s(a) || (a = [a]);
          for (var F = 0;F < a.length;F++) {
            var E = a[F];
            if (Cc(E)) {
              if (f) {
                var O = Ec(N.bound([g, E], [g, E, "\uffff"]));
                He(c.a, G, O);
              }
              E = tg(b.a, g, E, e[F]).map(function(a) {
                return a.fa();
              });
              E = Ge(c.a, G, E);
              F == a.length - 1 && E.B(function() {
                k(a, h);
              });
            }
          }
        }
      });
    }
    var k = d.l;
    "j" == k ? h([e[1]], !0) : "k" == k ? h(e[1], !0) : "a" == k ? h([e[1]], !1) : "b" == k ? h(e[1], !1) : "n" == k || "c" == k ? g(e[1]) : "m" == k && f(e[1]);
  });
};
W.prototype.V = function(a, b) {
  var c = qd(this.c, a);
  if (!c) {
    throw new D('full text index catalog "' + a + '" not found.');
  }
  var c = c.a, d = rg(c, b), c = 0 == d.length ? null : new og(c.a, d);
  return c ? Be(this.a, c) : (this.logger.a('query "' + b + '" contains only noise and search is ignored'), oc("qb", null));
};
W.prototype.search = W.prototype.V;
og.prototype.collect = og.prototype.e;
function ug(a) {
  this.f = a;
  this.b = this.f.length / 4;
  this.d = this.b + 6;
  this.c = [[], [], [], []];
  this.e = [[], [], [], []];
  this.a = Array(4 * (this.d + 1));
  for (a = 0;a < this.b;a++) {
    this.a[a] = [this.f[4 * a], this.f[4 * a + 1], this.f[4 * a + 2], this.f[4 * a + 3]];
  }
  var b = Array(4);
  for (a = this.b;a < 4 * (this.d + 1);a++) {
    b[0] = this.a[a - 1][0];
    b[1] = this.a[a - 1][1];
    b[2] = this.a[a - 1][2];
    b[3] = this.a[a - 1][3];
    if (0 == a % this.b) {
      var c = b, d = c[0];
      c[0] = c[1];
      c[1] = c[2];
      c[2] = c[3];
      c[3] = d;
      vg(b);
      b[0] ^= wg[a / this.b][0];
      b[1] ^= wg[a / this.b][1];
      b[2] ^= wg[a / this.b][2];
      b[3] ^= wg[a / this.b][3];
    } else {
      6 < this.b && 4 == a % this.b && vg(b);
    }
    this.a[a] = Array(4);
    this.a[a][0] = this.a[a - this.b][0] ^ b[0];
    this.a[a][1] = this.a[a - this.b][1] ^ b[1];
    this.a[a][2] = this.a[a - this.b][2] ^ b[2];
    this.a[a][3] = this.a[a - this.b][3] ^ b[3];
  }
}
function xg(a, b) {
  for (var c, d = 0;4 > d;d++) {
    for (var e = 0;4 > e;e++) {
      c = 4 * e + d, c = b[c], a.c[d][e] = c;
    }
  }
}
function yg(a) {
  for (var b = [], c = 0;4 > c;c++) {
    for (var d = 0;4 > d;d++) {
      b[4 * d + c] = a.c[c][d];
    }
  }
  return b;
}
function zg(a, b) {
  for (var c = 0;4 > c;c++) {
    for (var d = 0;4 > d;d++) {
      a.c[c][d] ^= a.a[4 * b + d][c];
    }
  }
}
function Ag(a, b) {
  for (var c = 0;4 > c;c++) {
    for (var d = 0;4 > d;d++) {
      a.c[c][d] = b[a.c[c][d]];
    }
  }
}
function Bg(a) {
  for (var b = 1;4 > b;b++) {
    for (var c = 0;4 > c;c++) {
      a.e[b][c] = a.c[b][c];
    }
  }
  for (b = 1;4 > b;b++) {
    for (c = 0;4 > c;c++) {
      a.c[b][c] = a.e[b][(c + b) % 4];
    }
  }
}
function Cg(a) {
  for (var b = 1;4 > b;b++) {
    for (var c = 0;4 > c;c++) {
      a.e[b][(c + b) % 4] = a.c[b][c];
    }
  }
  for (b = 1;4 > b;b++) {
    for (c = 0;4 > c;c++) {
      a.c[b][c] = a.e[b][c];
    }
  }
}
function vg(a) {
  a[0] = Dg[a[0]];
  a[1] = Dg[a[1]];
  a[2] = Dg[a[2]];
  a[3] = Dg[a[3]];
}
var Dg = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 
80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 
87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22], Eg = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 
104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 
75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125], wg = [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], 
[54, 0, 0, 0]], Fg = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 
214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 27, 25, 31, 29, 19, 17, 23, 21, 11, 9, 15, 13, 3, 1, 7, 5, 59, 57, 63, 61, 51, 49, 55, 53, 43, 41, 47, 45, 35, 33, 39, 37, 91, 89, 95, 93, 83, 81, 87, 85, 75, 73, 79, 77, 67, 65, 71, 69, 123, 121, 127, 125, 115, 113, 119, 117, 107, 105, 111, 109, 99, 97, 103, 101, 155, 153, 159, 157, 147, 145, 151, 149, 139, 137, 143, 141, 131, 129, 135, 133, 187, 185, 191, 189, 179, 177, 183, 181, 171, 169, 175, 
173, 163, 161, 167, 165, 219, 217, 223, 221, 211, 209, 215, 213, 203, 201, 207, 205, 195, 193, 199, 197, 251, 249, 255, 253, 243, 241, 247, 245, 235, 233, 239, 237, 227, 225, 231, 229], Gg = [0, 3, 6, 5, 12, 15, 10, 9, 24, 27, 30, 29, 20, 23, 18, 17, 48, 51, 54, 53, 60, 63, 58, 57, 40, 43, 46, 45, 36, 39, 34, 33, 96, 99, 102, 101, 108, 111, 106, 105, 120, 123, 126, 125, 116, 119, 114, 113, 80, 83, 86, 85, 92, 95, 90, 89, 72, 75, 78, 77, 68, 71, 66, 65, 192, 195, 198, 197, 204, 207, 202, 201, 216, 
219, 222, 221, 212, 215, 210, 209, 240, 243, 246, 245, 252, 255, 250, 249, 232, 235, 238, 237, 228, 231, 226, 225, 160, 163, 166, 165, 172, 175, 170, 169, 184, 187, 190, 189, 180, 183, 178, 177, 144, 147, 150, 149, 156, 159, 154, 153, 136, 139, 142, 141, 132, 135, 130, 129, 155, 152, 157, 158, 151, 148, 145, 146, 131, 128, 133, 134, 143, 140, 137, 138, 171, 168, 173, 174, 167, 164, 161, 162, 179, 176, 181, 182, 191, 188, 185, 186, 251, 248, 253, 254, 247, 244, 241, 242, 227, 224, 229, 230, 239, 236, 
233, 234, 203, 200, 205, 206, 199, 196, 193, 194, 211, 208, 213, 214, 223, 220, 217, 218, 91, 88, 93, 94, 87, 84, 81, 82, 67, 64, 69, 70, 79, 76, 73, 74, 107, 104, 109, 110, 103, 100, 97, 98, 115, 112, 117, 118, 127, 124, 121, 122, 59, 56, 61, 62, 55, 52, 49, 50, 35, 32, 37, 38, 47, 44, 41, 42, 11, 8, 13, 14, 7, 4, 1, 2, 19, 16, 21, 22, 31, 28, 25, 26], Hg = [0, 9, 18, 27, 36, 45, 54, 63, 72, 65, 90, 83, 108, 101, 126, 119, 144, 153, 130, 139, 180, 189, 166, 175, 216, 209, 202, 195, 252, 245, 238, 
231, 59, 50, 41, 32, 31, 22, 13, 4, 115, 122, 97, 104, 87, 94, 69, 76, 171, 162, 185, 176, 143, 134, 157, 148, 227, 234, 241, 248, 199, 206, 213, 220, 118, 127, 100, 109, 82, 91, 64, 73, 62, 55, 44, 37, 26, 19, 8, 1, 230, 239, 244, 253, 194, 203, 208, 217, 174, 167, 188, 181, 138, 131, 152, 145, 77, 68, 95, 86, 105, 96, 123, 114, 5, 12, 23, 30, 33, 40, 51, 58, 221, 212, 207, 198, 249, 240, 235, 226, 149, 156, 135, 142, 177, 184, 163, 170, 236, 229, 254, 247, 200, 193, 218, 211, 164, 173, 182, 191, 
128, 137, 146, 155, 124, 117, 110, 103, 88, 81, 74, 67, 52, 61, 38, 47, 16, 25, 2, 11, 215, 222, 197, 204, 243, 250, 225, 232, 159, 150, 141, 132, 187, 178, 169, 160, 71, 78, 85, 92, 99, 106, 113, 120, 15, 6, 29, 20, 43, 34, 57, 48, 154, 147, 136, 129, 190, 183, 172, 165, 210, 219, 192, 201, 246, 255, 228, 237, 10, 3, 24, 17, 46, 39, 60, 53, 66, 75, 80, 89, 102, 111, 116, 125, 161, 168, 179, 186, 133, 140, 151, 158, 233, 224, 251, 242, 205, 196, 223, 214, 49, 56, 35, 42, 21, 28, 7, 14, 121, 112, 
107, 98, 93, 84, 79, 70], Ig = [0, 11, 22, 29, 44, 39, 58, 49, 88, 83, 78, 69, 116, 127, 98, 105, 176, 187, 166, 173, 156, 151, 138, 129, 232, 227, 254, 245, 196, 207, 210, 217, 123, 112, 109, 102, 87, 92, 65, 74, 35, 40, 53, 62, 15, 4, 25, 18, 203, 192, 221, 214, 231, 236, 241, 250, 147, 152, 133, 142, 191, 180, 169, 162, 246, 253, 224, 235, 218, 209, 204, 199, 174, 165, 184, 179, 130, 137, 148, 159, 70, 77, 80, 91, 106, 97, 124, 119, 30, 21, 8, 3, 50, 57, 36, 47, 141, 134, 155, 144, 161, 170, 183, 
188, 213, 222, 195, 200, 249, 242, 239, 228, 61, 54, 43, 32, 17, 26, 7, 12, 101, 110, 115, 120, 73, 66, 95, 84, 247, 252, 225, 234, 219, 208, 205, 198, 175, 164, 185, 178, 131, 136, 149, 158, 71, 76, 81, 90, 107, 96, 125, 118, 31, 20, 9, 2, 51, 56, 37, 46, 140, 135, 154, 145, 160, 171, 182, 189, 212, 223, 194, 201, 248, 243, 238, 229, 60, 55, 42, 33, 16, 27, 6, 13, 100, 111, 114, 121, 72, 67, 94, 85, 1, 10, 23, 28, 45, 38, 59, 48, 89, 82, 79, 68, 117, 126, 99, 104, 177, 186, 167, 172, 157, 150, 139, 
128, 233, 226, 255, 244, 197, 206, 211, 216, 122, 113, 108, 103, 86, 93, 64, 75, 34, 41, 52, 63, 14, 5, 24, 19, 202, 193, 220, 215, 230, 237, 240, 251, 146, 153, 132, 143, 190, 181, 168, 163], Jg = [0, 13, 26, 23, 52, 57, 46, 35, 104, 101, 114, 127, 92, 81, 70, 75, 208, 221, 202, 199, 228, 233, 254, 243, 184, 181, 162, 175, 140, 129, 150, 155, 187, 182, 161, 172, 143, 130, 149, 152, 211, 222, 201, 196, 231, 234, 253, 240, 107, 102, 113, 124, 95, 82, 69, 72, 3, 14, 25, 20, 55, 58, 45, 32, 109, 96, 
119, 122, 89, 84, 67, 78, 5, 8, 31, 18, 49, 60, 43, 38, 189, 176, 167, 170, 137, 132, 147, 158, 213, 216, 207, 194, 225, 236, 251, 246, 214, 219, 204, 193, 226, 239, 248, 245, 190, 179, 164, 169, 138, 135, 144, 157, 6, 11, 28, 17, 50, 63, 40, 37, 110, 99, 116, 121, 90, 87, 64, 77, 218, 215, 192, 205, 238, 227, 244, 249, 178, 191, 168, 165, 134, 139, 156, 145, 10, 7, 16, 29, 62, 51, 36, 41, 98, 111, 120, 117, 86, 91, 76, 65, 97, 108, 123, 118, 85, 88, 79, 66, 9, 4, 19, 30, 61, 48, 39, 42, 177, 188, 
171, 166, 133, 136, 159, 146, 217, 212, 195, 206, 237, 224, 247, 250, 183, 186, 173, 160, 131, 142, 153, 148, 223, 210, 197, 200, 235, 230, 241, 252, 103, 106, 125, 112, 83, 94, 73, 68, 15, 2, 21, 24, 59, 54, 33, 44, 12, 1, 22, 27, 56, 53, 34, 47, 100, 105, 126, 115, 80, 93, 74, 71, 220, 209, 198, 203, 232, 229, 242, 255, 180, 185, 174, 163, 128, 141, 154, 151], Kg = [0, 14, 28, 18, 56, 54, 36, 42, 112, 126, 108, 98, 72, 70, 84, 90, 224, 238, 252, 242, 216, 214, 196, 202, 144, 158, 140, 130, 168, 
166, 180, 186, 219, 213, 199, 201, 227, 237, 255, 241, 171, 165, 183, 185, 147, 157, 143, 129, 59, 53, 39, 41, 3, 13, 31, 17, 75, 69, 87, 89, 115, 125, 111, 97, 173, 163, 177, 191, 149, 155, 137, 135, 221, 211, 193, 207, 229, 235, 249, 247, 77, 67, 81, 95, 117, 123, 105, 103, 61, 51, 33, 47, 5, 11, 25, 23, 118, 120, 106, 100, 78, 64, 82, 92, 6, 8, 26, 20, 62, 48, 34, 44, 150, 152, 138, 132, 174, 160, 178, 188, 230, 232, 250, 244, 222, 208, 194, 204, 65, 79, 93, 83, 121, 119, 101, 107, 49, 63, 45, 
35, 9, 7, 21, 27, 161, 175, 189, 179, 153, 151, 133, 139, 209, 223, 205, 195, 233, 231, 245, 251, 154, 148, 134, 136, 162, 172, 190, 176, 234, 228, 246, 248, 210, 220, 206, 192, 122, 116, 102, 104, 66, 76, 94, 80, 10, 4, 22, 24, 50, 60, 46, 32, 236, 226, 240, 254, 212, 218, 200, 198, 156, 146, 128, 142, 164, 170, 184, 182, 12, 2, 16, 30, 52, 58, 40, 38, 124, 114, 96, 110, 68, 74, 88, 86, 55, 57, 43, 37, 15, 1, 19, 29, 71, 73, 91, 85, 127, 113, 99, 109, 215, 217, 203, 197, 239, 225, 243, 253, 167, 
169, 187, 181, 159, 145, 131, 141];
function Lg(a) {
  for (var b = [], c = 0, d = 0;d < a.length;d++) {
    for (var e = a.charCodeAt(d);255 < e;) {
      b[c++] = e & 255, e >>= 8;
    }
    b[c++] = e;
  }
  return b;
}
function Mg(a, b) {
  for (var c = [], d = 0;d < a.length;d++) {
    c.push(a[d] ^ b[d]);
  }
  return c;
}
;function Ng(a) {
  this.a = a;
}
;function Og() {
  this.b = -1;
}
;function Pg(a, b) {
  this.b = -1;
  this.b = Qg;
  this.d = q.Uint8Array ? new Uint8Array(this.b) : Array(this.b);
  this.e = this.c = 0;
  this.a = [];
  this.g = a;
  this.f = b;
  this.i = q.Int32Array ? new Int32Array(64) : Array(64);
  r(Rg) || (q.Int32Array ? Rg = new Int32Array(Sg) : Rg = Sg);
  this.e = this.c = 0;
  this.a = q.Int32Array ? new Int32Array(this.f) : Za(this.f);
}
var Rg;
z(Pg, Og);
for (var Qg = 64, Tg = Qg - 1, Ug = [], Vg = 0;Vg < Tg;Vg++) {
  Ug[Vg] = 0;
}
var Wg = function(a) {
  return A.concat.apply(A, arguments);
}(128, Ug);
function Xg(a) {
  for (var b = a.d, c = a.i, d = 0, e = 0;e < b.length;) {
    c[d++] = b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3], e = 4 * d;
  }
  for (b = 16;64 > b;b++) {
    var e = c[b - 15] | 0, d = c[b - 2] | 0, f = (c[b - 16] | 0) + ((e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3) | 0, g = (c[b - 7] | 0) + ((d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10) | 0;
    c[b] = f + g | 0;
  }
  for (var d = a.a[0] | 0, e = a.a[1] | 0, h = a.a[2] | 0, k = a.a[3] | 0, m = a.a[4] | 0, p = a.a[5] | 0, n = a.a[6] | 0, f = a.a[7] | 0, b = 0;64 > b;b++) {
    var v = ((d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10)) + (d & e ^ d & h ^ e & h) | 0, g = m & p ^ ~m & n, f = f + ((m >>> 6 | m << 26) ^ (m >>> 11 | m << 21) ^ (m >>> 25 | m << 7)) | 0, g = g + (Rg[b] | 0) | 0, g = f + (g + (c[b] | 0) | 0) | 0, f = n, n = p, p = m, m = k + g | 0, k = h, h = e, e = d, d = g + v | 0
  }
  a.a[0] = a.a[0] + d | 0;
  a.a[1] = a.a[1] + e | 0;
  a.a[2] = a.a[2] + h | 0;
  a.a[3] = a.a[3] + k | 0;
  a.a[4] = a.a[4] + m | 0;
  a.a[5] = a.a[5] + p | 0;
  a.a[6] = a.a[6] + n | 0;
  a.a[7] = a.a[7] + f | 0;
}
Pg.prototype.update = function(a, b) {
  r(b) || (b = a.length);
  var c = 0, d = this.c;
  if (u(a)) {
    for (;c < b;) {
      this.d[d++] = a.charCodeAt(c++), d == this.b && (Xg(this), d = 0);
    }
  } else {
    if (s(a)) {
      for (;c < b;) {
        var e = a[c++];
        if (!("number" == typeof e && 0 <= e && 255 >= e && e == (e | 0))) {
          throw Error("message must be a byte array");
        }
        this.d[d++] = e;
        d == this.b && (Xg(this), d = 0);
      }
    } else {
      throw Error("message must be string or array");
    }
  }
  this.c = d;
  this.e += b;
};
function Yg(a) {
  var b = [], c = 8 * a.e;
  56 > a.c ? a.update(Wg, 56 - a.c) : a.update(Wg, a.b - (a.c - 56));
  for (var d = 63;56 <= d;d--) {
    a.d[d] = c & 255, c /= 256;
  }
  Xg(a);
  for (d = c = 0;d < a.g;d++) {
    for (var e = 24;0 <= e;e -= 8) {
      b[c++] = a.a[d] >> e & 255;
    }
  }
  return b;
}
var Sg = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 
3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
function Zg() {
  Pg.call(this, 8, $g);
}
z(Zg, Pg);
var $g = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
function ah() {
  this.c = [];
  this.b = this.a = 0;
}
;var bh = null, ch = null;
function dh(a, b, c, d, e) {
  this.c = a;
  this.d = Lg(b);
  this.e = c;
  this.a = !!d;
  this.b = e || "aes-cbc";
}
dh.prototype.logger = null;
function eh(a, b) {
  var c = new Zg;
  c.update(Lg(b));
  c.update(a.d);
  c = Yg(c);
  if (!t(c)) {
    throw Error("encodeByteArray takes an array as a parameter");
  }
  if (!bh) {
    bh = {};
    ch = {};
    for (var d = 0;65 > d;d++) {
      bh[d] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d), ch[d] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(d);
    }
  }
  for (var d = ch, e = [], f = 0;f < c.length;f += 3) {
    var g = c[f], h = f + 1 < c.length, k = h ? c[f + 1] : 0, m = f + 2 < c.length, p = m ? c[f + 2] : 0, n = g >> 2, g = (g & 3) << 4 | k >> 4, k = (k & 15) << 2 | p >> 6, p = p & 63;
    m || (p = 64, h || (k = 64));
    e.push(d[n], d[g], d[k], d[p]);
  }
  return e.join("");
}
function fh(a, b, c, d, e) {
  var f = new Zg;
  f.update(Lg(c));
  f.update(b);
  f.update(a.d);
  c = Yg(f);
  d = Lg(d);
  if ("rc4" == a.b) {
    b = new ah;
    var g;
    g || (g = c.length);
    e = b.c;
    for (a = 0;256 > a;++a) {
      e[a] = a;
    }
    for (a = f = 0;256 > a;++a) {
      var f = f + e[a] + c[a % g] & 255, h = e[a];
      e[a] = e[f];
      e[f] = h;
    }
    b.a = 0;
    b.b = 0;
    c = b.a;
    g = b.b;
    e = b.c;
    for (a = 0;1536 > a;++a) {
      c = c + 1 & 255, g = g + e[c] & 255, f = e[c], e[c] = e[g], e[g] = f;
    }
    b.a = c;
    b.b = g;
    c = d;
    var k;
    k || (k = c.length);
    g = b.a;
    e = b.b;
    a = b.c;
    for (f = 0;f < k;++f) {
      g = g + 1 & 255, e = e + a[g] & 255, h = a[g], a[g] = a[e], a[e] = h, c[f] ^= a[a[g] + a[e] & 255];
    }
    b.a = g;
    b.b = e;
  } else {
    k = b.length - d.length % b.length;
    for (g = 0;g < k;g++) {
      d.push(10);
    }
    k = new ug(c);
    k = new Ng(k);
    if (e) {
      for (c = [], g = 0, e = b;g < d.length;) {
        b = bb(d, g, g + 16);
        a = k.a;
        xg(a, b);
        zg(a, a.d);
        for (f = 1;f < a.d;++f) {
          Cg(a);
          Ag(a, Eg);
          zg(a, a.d - f);
          for (var h = a.c, m = a.e[0], p = 0;4 > p;p++) {
            m[0] = h[0][p], m[1] = h[1][p], m[2] = h[2][p], m[3] = h[3][p], h[0][p] = Kg[m[0]] ^ Ig[m[1]] ^ Jg[m[2]] ^ Hg[m[3]], h[1][p] = Hg[m[0]] ^ Kg[m[1]] ^ Ig[m[2]] ^ Jg[m[3]], h[2][p] = Jg[m[0]] ^ Hg[m[1]] ^ Kg[m[2]] ^ Ig[m[3]], h[3][p] = Ig[m[0]] ^ Jg[m[1]] ^ Hg[m[2]] ^ Kg[m[3]];
          }
        }
        Cg(a);
        Ag(a, Eg);
        zg(a, 0);
        e = Mg(e, yg(a));
        $a(c, e);
        e = b;
        g += 16;
      }
    } else {
      for (c = [], g = b, b = 0;b < d.length;b += 16) {
        e = Mg(bb(d, b, b + 16), g);
        g = k.a;
        xg(g, e);
        zg(g, 0);
        for (e = 1;e < g.d;++e) {
          Ag(g, Dg);
          Bg(g);
          a = g.c;
          f = g.e[0];
          for (h = 0;4 > h;h++) {
            f[0] = a[0][h], f[1] = a[1][h], f[2] = a[2][h], f[3] = a[3][h], a[0][h] = Fg[f[0]] ^ Gg[f[1]] ^ f[2] ^ f[3], a[1][h] = f[0] ^ Fg[f[1]] ^ Gg[f[2]] ^ f[3], a[2][h] = f[0] ^ f[1] ^ Fg[f[2]] ^ Gg[f[3]], a[3][h] = Gg[f[0]] ^ f[1] ^ f[2] ^ Fg[f[3]];
          }
          zg(g, e);
        }
        Ag(g, Dg);
        Bg(g);
        zg(g, g.d);
        g = yg(g);
        $a(c, g);
      }
    }
    d = c;
  }
  if (8192 > d.length) {
    d = String.fromCharCode.apply(null, d);
  } else {
    k = "";
    for (b = 0;b < d.length;b += 8192) {
      k += String.fromCharCode.apply(null, bb(d, b, b + 8192));
    }
    d = k;
  }
  return d;
}
function gh(a, b) {
  return a.a ? eh(a, b) : b;
}
function hh(a, b, c) {
  for (var d, e = eh(a, b), f = [], g = 0;16 > g;++g) {
    f[g] = 256 * Math.random() | 0;
  }
  c = fh(a, f, e, hd(c));
  g = {};
  g.salt = f;
  g.data = c;
  r(d) || (d = a.e);
  d && (g.expiration = d + ja());
  g.creation = ja();
  g["key-name"] = a.c;
  return a.a ? [e, g] : [b, g];
}
;W.prototype.Oa = function(a) {
  var b = this;
  Yc(a, function(a, d) {
    var e = a.l;
    if ("a" == e || "j" == e) {
      var e = b.d[0], f = d[2], g = d[1];
      u(f) && (e = hh(e, f, g), d[2] = e[0], d[1] = e[1]);
    } else {
      if ("e" == e) {
        var h = d[0], k = d[1];
        mc(a, function(a, c, d) {
          if (r(a)) {
            d(a, c);
          } else {
            for (var e = [], f = 0;f < b.d.length;f++) {
              e.push(new Bc(h, gh(b.d[f], k)));
            }
            kb(Je(b.a, e), function(a) {
              for (var c = 0;c < a.length;++c) {
                if (null != a[c]) {
                  try {
                    var f;
                    a: {
                      var g = b.d[c], h = e[c].s(), k = a[c];
                      if (k) {
                        var m = h;
                        g.a || (m = eh(g, h));
                        if (k["key-name"] == g.c) {
                          var p = k.salt, x = k.data;
                          if (!u(x) || !s(p) || !p.length) {
                            throw "Storage: Invalid value was encountered";
                          }
                          var Mb = fh(g, p, m, x, !0);
                          try {
                            if ("rc4" != g.b) {
                              var Ue = Mb.lastIndexOf(String.fromCharCode(10));
                              32 >= Mb.length - Ue && (Mb = Mb.substr(0, Ue));
                            }
                            k.data = fd(Mb);
                          } catch (vh) {
                            throw "Storage: The value could not be decrypted";
                          }
                          var Ve = k.creation, We = k.expiration;
                          f = We && We < ja() || Ve && Ve > ja() ? void 0 : k.data;
                          break a;
                        }
                      }
                      f = void 0;
                    }
                    if (null != f) {
                      d(f);
                      return;
                    }
                  } catch (wh) {
                  }
                }
              }
              d(void 0);
            }, function() {
              d(a, c);
            });
          }
        });
      } else {
        "m" == e && (h = d[0], k = d[1], u(k) && (d[1] = eh(b.d[0], k)));
      }
    }
  });
};
W.prototype.Za = function(a) {
  if (!a) {
    return!1;
  }
  this.d = [];
  this.F = [];
  var b = !1, c = a.expiration, d = a.secrets, e = !!a.encryptKey;
  a = a.method;
  for (var f = 0;f < d.length;f++) {
    b = d[f], this.F.push(b.name), this.d.push(new dh(b.name, b.key, c, e, a)), b = !0;
  }
  return b;
};
function ih(a, b, c) {
  this.db = a;
  this.b = b;
  this.type = c || 0;
  this.c = null;
}
;function jh(a, b, c, d) {
  this.d = a;
  this.a = b || null;
  this.f = !!c;
  this.e = !!d;
  this.b = [];
  this.c = [];
}
function kh(a, b) {
  if ((0 != a.b.length || 0 != a.c.length) && lh(a) && !mh(a)) {
    throw new ce('Require index "' + a.b.concat(a.c).join(", ") + '" not found in store "' + a.d.getName() + '"');
  }
  var c = new R(a.d.getName(), nh(a), a.a, a.f, a.e, !!b);
  c.q = a.b.length;
  return c;
}
jh.prototype.h = function() {
  return this.d.getName();
};
jh.prototype.clone = function() {
  var a = new jh(this.d, this.a, this.f, this.e);
  a.c = this.c.slice();
  a.b = this.b.slice();
  return a;
};
function mh(a) {
  var b = a.b.concat(a.c), c = Sc(a.d, b);
  return c || b[b.length - 1] == a.d.keyPath && (c = Sc(a.d, b.slice(0, b.length - 1))) ? c : null;
}
function nh(a) {
  return(a = mh(a)) ? a.getName() : void 0;
}
jh.prototype.unique = function(a) {
  var b = this.clone();
  b.e = !!a;
  return b;
};
function lh(a) {
  return 0 < a.b.length ? !0 : 1 == a.c.length ? a.c[0] != a.d.keyPath : 1 < a.c.length ? !0 : !1;
}
jh.prototype.Ga = function(a, b, c, d, e) {
  c = Jc(b, c, d, e);
  if (0 < this.b.length) {
    if (this.a) {
      if (null != this.a.lower && null != this.a.upper && 0 == pc(this.a.lower, this.a.upper)) {
        a = s(this.a.lower) ? this.a.lower.slice().push(b) : [this.a.lower, b], d = null != d ? d : "\uffff", c = s(this.a.upper) ? this.a.upper.slice().push(d) : [this.a.upper, d], this.a = Jc(b, a, d, c);
      } else {
        if (1 == this.b.length && this.b[0] == a || s(a) && cb(this.b, a)) {
          this.a = Ic(this.a, c);
        } else {
          return "cannot use where clause with existing filter";
        }
      }
    } else {
      return "cannot use where clause with existing filter";
    }
  } else {
    this.b = s(a) ? a : [a], this.a = this.a ? Ic(this.a, c) : c;
  }
  return null;
};
function oh(a, b, c, d) {
  ih.call(this, a, b, c);
  this.a = d;
}
z(oh, ih);
oh.prototype.open = function() {
  var a = {push:function() {
  }}, a = ph(this) ? new Uf(a) : new Tf(a);
  return this.db.Ka(a, qh(this), J);
};
function qh(a) {
  for (var b = [], c = 0;c < a.a.length;c++) {
    b[c] = kh(a.a[c]);
  }
  return b;
}
function ph(a) {
  for (var b = 0;b < a.a.length;b++) {
    if (0 < a.a[b].b.length) {
      return!0;
    }
  }
  return!1;
}
oh.prototype.Aa = function() {
  return this.a.slice();
};
function Y(a, b, c, d) {
  ih.call(this, a, b, c);
  this.a = d;
}
z(Y, ih);
l = Y.prototype;
l.xb = function() {
  return new Y(this.db, this.b, this.type, this.a.clone());
};
l.zb = function() {
  var a = this.a, b = a.clone();
  b.f = !a.f;
  return new Y(this.db, this.b, this.type, b);
};
l.unique = function(a) {
  if (!ba(a)) {
    throw new D("unique value must be a boolean, but " + typeof a + " found");
  }
  a = this.a.unique(a);
  return new Y(this.db, this.b, this.type, a);
};
l.mb = function(a) {
  var b = u(a) ? [a] : a;
  a = this.a.clone();
  for (var c = b.length - 1;0 <= c;c--) {
    if (b[c] == a.b[a.b.length - 1]) {
      b = b.slice(0, c);
    } else {
      break;
    }
  }
  a.c = b;
  return new Y(this.db, this.b, this.type, a);
};
l.Ga = function(a, b, c, d, e) {
  if (nh(this.a) && nh(this.a) != a) {
    var f = Jc(b, c, d, e), f = new jh(P(this.b, this.a.h()), f, this.a.f, this.a.e), f = (new Y(this.db, this.b, this.type, f)).Aa().concat(this.Aa());
    return new oh(this.db, this.b, this.type, f);
  }
  if (!nh(this.a) && !Tc(P(this.b, this.a.h()), a)) {
    throw new D('index "' + a + '" not exists in ' + this.a.h());
  }
  f = this.a.clone();
  if (a = f.Ga(a, b, c, d, e)) {
    throw new D(a);
  }
  return new Y(this.db, this.b, this.type, f);
};
l.yb = function(a) {
  a = a || 100;
  var b = 4, c = rh(this);
  this.c && this.c[0] && (c = c.ab(this.c[0], this.c[1]));
  if (2 == this.type || 3 == this.type || 1 == this.type) {
    b = this.type;
  }
  a = Re(this.db, b, c, a);
  a.n(function() {
    "rest" == c.d && (this.c = [c.g, c.p()]);
  }, this);
  return a;
};
l.Aa = function() {
  return[this.a.clone()];
};
function rh(a) {
  return kh(a.a, !(2 == a.type || 3 == a.type || 1 == a.type));
}
l.nb = function(a, b) {
  var c = rh(this);
  c.a && (c = new R(c.f, c.c, c.b, c.N(), c.Z(), !1, c.e));
  var d = this.db.open(function(c) {
    var f = c.u();
    if (u(a)) {
      $b(f, a, b);
    } else {
      if (s(a)) {
        for (var g = 0;g < a.length;g++) {
          $b(f, a[g], b[g]);
        }
      } else {
        if (y(a)) {
          for (g in a) {
            a.hasOwnProperty(g) && (f[g] = a[g]);
          }
        }
      }
    }
    mb(d, c.update(f));
  }, c, J, this);
  return d;
};
l.open = function(a, b) {
  return this.db.open(a, rh(this), J, b);
};
l.count = function() {
  return lh(this.a) ? this.a.e ? this.db.count(kh(this.a)) : this.db.count(this.a.h(), nh(this.a), this.a.a) : this.db.count(this.a.h(), this.a.a);
};
l.clear = function() {
  return lh(this.a) ? this.db.clear(this.a.h(), nh(this.a), this.a.a) : this.db.clear(this.a.h(), this.a.a);
};
X.prototype.l = function(a, b, c, d, e) {
  if (!od(this.c, a)) {
    throw new D('Store "' + a + '" not found.');
  }
  var f = null;
  if (r(b)) {
    if (!r(c)) {
      throw new D("boundary value must be defined.");
    }
    f = Jc(b, c, d, e);
  } else {
    if (r(d)) {
      throw new D("second boundary must not be defined.");
    }
  }
  a = new jh(P(this.c, a), f);
  return new Y(this.a, this.c, null, a);
};
U.prototype.l = function(a, b, c, d, e) {
  if (!od(this.b, a)) {
    throw new D('Store "' + a + '" not found.');
  }
  var f = null;
  if (r(b)) {
    if (!r(c)) {
      throw new D("boundary value must be defined.");
    }
    f = Jc(b, c, d, e);
  } else {
    if (r(d)) {
      throw new D("second boundary must not be defined.");
    }
  }
  a = new jh(P(this.b, a), f);
  return new Y(this, this.b, null, a);
};
Y.prototype.copy = Y.prototype.xb;
Y.prototype.count = Y.prototype.count;
Y.prototype.list = Y.prototype.yb;
Y.prototype.order = Y.prototype.mb;
Y.prototype.patch = Y.prototype.nb;
Y.prototype.reverse = Y.prototype.zb;
Y.prototype.unique = Y.prototype.unique;
Y.prototype.where = Y.prototype.Ga;
X.prototype.from = X.prototype.l;
U.prototype.from = U.prototype.l;
function $(a, b, c) {
  Of.call(this);
  this.c = a;
  this.name = b;
  this.db = c;
  this.d = this.db.Na("atomic", !1);
  this.a = null;
}
z($, Of);
function sh(a, b, c, d) {
  var e = {op:b, entity:a.name, id:c, "new":d, timestamp:(new Date).getTime()};
  if ("add" == b) {
    return a.db.put("_ydn_sync_history", e).n(function(a) {
      e.sequence = a;
      return e;
    });
  }
  var f = new C;
  th(a, c).n(function(a) {
    e.old = a[0];
    e.key = [c];
    null != a[1] && e.key.push(a[1]);
    lb(this.db.put("_ydn_sync_history", e).n(function(a) {
      e.sequence = a;
      return e;
    }), f);
  }, a);
  return f;
}
function uh(a, b, c, d) {
  a.c.list(function(d, f, g) {
    200 == d ? (d = f.length, 0 < d ? (a.db.put(a.name, f), c += d, g ? (Ub(b, c), uh(a, b, c, g)) : b.callback(c)) : b.callback(c)) : b.j(d);
  }, a.name, d);
}
l = $.prototype;
l.update = function() {
  this.a || (this.a = new H, this.a.F(function() {
    Pf(this, new uc("change", this));
  }, this), this.a.n(function(a) {
    0 < a && Pf(this, new uc("updated", this));
    var b = this;
    setTimeout(function() {
      b.a = null;
    }, 200);
  }, this), uh(this, this.a, 0, null));
  return this.a;
};
function th(a, b) {
  var c = Sd(a.name, "starts", [b]), d, e;
  return a.d.open(function(a) {
    e = a.b[1];
    d = a.u();
    return null;
  }, c, I, a).n(function() {
    return[d, e];
  });
}
l.get = function(a) {
  var b = new H, c = this.db, d = this.name;
  th(this, a).n(function(e) {
    var f = e[0];
    e = e[1];
    f && Ub(b, f);
    this.c.get(function(e, h, k) {
      200 == e ? (e = [a], null != k && e.push(k), c.put(d, h, e), b.callback(h)) : 404 == e ? (f && c.clear(d, Gc([a])), b.callback(void 0)) : 304 == e ? b.callback(f) : b.j(Error("Unknown " + e));
    }, this.name, a, e);
  }, this);
  return b;
};
l.add = function(a) {
  var b = this;
  return this.d.add(this.name, a).n(function(c) {
    return sh(b, "add", c, a).n(function(d) {
      var e = new C;
      b.c.add(function(f, g, h, k) {
        200 == f || 201 == f ? b.db.X(function(d) {
          d.t(b.name, c);
          var e = [h];
          null != k && e.push(h);
          d.add(b.name, g || a, e);
        }, [b.name, "_ydn_sync_history"], "readwrite").B(function() {
          e.callback(g);
        }) : b.db.X(function(a) {
          d.old ? a.put(b.name, d.old, d.key) : a.t(b.name, d.key);
          a.t("_ydn_sync_history", d.sequence);
        }, [b.name, "_ydn_sync_history"], "readwrite").B(function() {
          e.j(f);
        });
      }, b.name, a);
      return e;
    });
  });
};
l.put = function(a, b) {
  var c = this;
  return sh(this, "put", a, b).n(function(d) {
    return c.d.put(c.name, b, d.key).n(function() {
      var e = new C;
      c.c.put(function(a, g, h, k) {
        200 == a || 201 == a ? c.db.X(function(a) {
          a.t("_ydn_sync_history", d.sequence);
          a.t(c.name, d.key).n(function() {
            var d = [h];
            null != k && d.push(k);
            a.put(c.name, g || b, d);
          });
        }, [c.name, "_ydn_sync_history"], "readwrite").B(function() {
          e.callback(g);
        }) : c.db.X(function(a) {
          d.old ? a.put(c.name, d.old, d.key) : a.t(c.name, d.key);
          a.t("_ydn_sync_history", d.sequence);
        }, [c.name, "_ydn_sync_history"], "readwrite").B(function() {
          e.j(a);
        });
      }, c.name, b, a, d.key[1]);
      return e;
    });
  });
};
l.Gb = function(a) {
  return sh(this, "del", a, null).n(function(b) {
    return this.db.t(this.name, b.key).n(function(c) {
      var d = new C, e = this;
      this.c.remove(function(a) {
        200 == a || 404 == a ? (e.db.t("_ydn_sync_history", b.sequence), d.callback(c)) : e.db.X(function(a) {
          b.old ? a.put(e.name, b.old, b.key) : a.t(e.name, b.key);
          a.t("_ydn_sync_history", b.sequence);
        }, [e.name, "_ydn_sync_history"], "readwrite").B(function() {
          d.j(a);
        });
      }, e.name, a, b.key[1]);
      return d;
    }, this);
  }, this);
};
l.Fb = function() {
  return this.db;
};
l.getName = function() {
  return this.name;
};
X.prototype.w = function(a, b) {
  return new $(a, b, this);
};
ka("ydn.db.sync.Entity", $);
$.schema = {name:"_ydn_sync_history", keyPath:"sequence", autoIncrement:!0, indexes:[{name:"key", keyPath:["entity", "id"]}]};
$.prototype.add = $.prototype.add;
$.prototype.get = $.prototype.get;
$.prototype.getName = $.prototype.getName;
$.prototype.getStorage = $.prototype.Fb;
$.prototype.put = $.prototype.put;
$.prototype.remove = $.prototype.Gb;
$.prototype.update = $.prototype.update;
X.prototype.entity = X.prototype.w;
rc.prototype.dispose = rc.prototype.oa;
Of.prototype.listen = Of.prototype.Ua;
Of.prototype.unlistenByKey = Of.prototype.Fa;
 
var categ_letters_numbers_data=[[48,57],[65,90],[97,122],170,[178,179],181,[185,186],[188,190],[192,214],[216,246],[248,705],[710,721],[736,740],748
	,750,[880,884],[886,887],[890,893],902,[904,906],908,[910,929],[931,1013],[1015,1153],[1162,1319],[1329,1366],1369
	,[1377,1415],[1488,1514],[1520,1522],[1568,1610],[1632,1641],[1646,1647],[1649,1747],1749,[1765,1766],[1774,1788],1791
	,1808,[1810,1839],[1869,1957],1969,[1984,2026],[2036,2037],2042,[2048,2069],2074,2084,2088,[2112,2136],2208,[2210,2220]
	,[2308,2361],2365,2384,[2392,2401],[2406,2415],[2417,2423],[2425,2431],[2437,2444],[2447,2448],[2451,2472],[2474,2480]
	,2482,[2486,2489],2493,2510,[2524,2525],[2527,2529],[2534,2545],[2548,2553],[2565,2570],[2575,2576],[2579,2600]
	,[2602,2608],[2610,2611],[2613,2614],[2616,2617],[2649,2652],2654,[2662,2671],[2674,2676],[2693,2701],[2703,2705]
	,[2707,2728],[2730,2736],[2738,2739],[2741,2745],2749,2768,[2784,2785],[2790,2799],[2821,2828],[2831,2832],[2835,2856]
	,[2858,2864],[2866,2867],[2869,2873],2877,[2908,2909],[2911,2913],[2918,2927],[2929,2935],2947,[2949,2954],[2958,2960]
	,[2962,2965],[2969,2970],2972,[2974,2975],[2979,2980],[2984,2986],[2990,3001],3024,[3046,3058],[3077,3084],[3086,3088]
	,[3090,3112],[3114,3123],[3125,3129],3133,[3160,3161],[3168,3169],[3174,3183],[3192,3198],[3205,3212],[3214,3216]
	,[3218,3240],[3242,3251],[3253,3257],3261,3294,[3296,3297],[3302,3311],[3313,3314],[3333,3340],[3342,3344],[3346,3386]
	,3389,3406,[3424,3425],[3430,3445],[3450,3455],[3461,3478],[3482,3505],[3507,3515],3517,[3520,3526],[3585,3632]
	,[3634,3635],[3648,3654],[3664,3673],[3713,3714],3716,[3719,3720],3722,3725,[3732,3735],[3737,3743],[3745,3747],3749
	,3751,[3754,3755],[3757,3760],[3762,3763],3773,[3776,3780],3782,[3792,3801],[3804,3807],3840,[3872,3891],[3904,3911]
	,[3913,3948],[3976,3980],[4096,4138],[4159,4169],[4176,4181],[4186,4189],4193,[4197,4198],[4206,4208],[4213,4225],4238
	,[4240,4249],[4256,4293],4295,4301,[4304,4346],[4348,4680],[4682,4685],[4688,4694],4696,[4698,4701],[4704,4744]
	,[4746,4749],[4752,4784],[4786,4789],[4792,4798],4800,[4802,4805],[4808,4822],[4824,4880],[4882,4885],[4888,4954]
	,[4969,4988],[4992,5007],[5024,5108],[5121,5740],[5743,5759],[5761,5786],[5792,5866],[5870,5872],[5888,5900]
	,[5902,5905],[5920,5937],[5952,5969],[5984,5996],[5998,6000],[6016,6067],6103,6108,[6112,6121],[6128,6137],[6160,6169]
	,[6176,6263],[6272,6312],6314,[6320,6389],[6400,6428],[6470,6509],[6512,6516],[6528,6571],[6593,6599],[6608,6618]
	,[6656,6678],[6688,6740],[6784,6793],[6800,6809],6823,[6917,6963],[6981,6987],[6992,7001],[7043,7072],[7086,7141]
	,[7168,7203],[7232,7241],[7245,7293],[7401,7404],[7406,7409],[7413,7414],[7424,7615],[7680,7957],[7960,7965]
	,[7968,8005],[8008,8013],[8016,8023],8025,8027,8029,[8031,8061],[8064,8116],[8118,8124],8126,[8130,8132],[8134,8140]
	,[8144,8147],[8150,8155],[8160,8172],[8178,8180],[8182,8188],[8304,8305],[8308,8313],[8319,8329],[8336,8348],8450,8455
	,[8458,8467],8469,[8473,8477],8484,8486,8488,[8490,8493],[8495,8505],[8508,8511],[8517,8521],8526,[8528,8585]
	,[9312,9371],[9450,9471],[10102,10131],[11264,11310],[11312,11358],[11360,11492],[11499,11502],[11506,11507],11517
	,[11520,11557],11559,11565,[11568,11623],11631,[11648,11670],[11680,11686],[11688,11694],[11696,11702],[11704,11710]
	,[11712,11718],[11720,11726],[11728,11734],[11736,11742],11823,[12293,12295],[12321,12329],[12337,12341],[12344,12348]
	,[12353,12438],[12445,12447],[12449,12538],[12540,12543],[12549,12589],[12593,12686],[12690,12693],[12704,12730]
	,[12784,12799],[12832,12841],[12872,12879],[12881,12895],[12928,12937],[12977,12991],13312,19893,19968,40908
	,[40960,42124],[42192,42237],[42240,42508],[42512,42539],[42560,42606],[42623,42647],[42656,42735],[42775,42783]
	,[42786,42888],[42891,42894],[42896,42899],[42912,42922],[43000,43009],[43011,43013],[43015,43018],[43020,43042]
	,[43056,43061],[43072,43123],[43138,43187],[43216,43225],[43250,43255],43259,[43264,43301],[43312,43334],[43360,43388]
	,[43396,43442],[43471,43481],[43520,43560],[43584,43586],[43588,43595],[43600,43609],[43616,43638],43642,[43648,43695]
	,43697,[43701,43702],[43705,43709],43712,43714,[43739,43741],[43744,43754],[43762,43764],[43777,43782],[43785,43790]
	,[43793,43798],[43808,43814],[43816,43822],[43968,44002],[44016,44025],44032,55203,[55216,55238],[55243,55291]
	,[63744,64109],[64112,64217],[64256,64262],[64275,64279],64285,[64287,64296],[64298,64310],[64312,64316],64318
	,[64320,64321],[64323,64324],[64326,64433],[64467,64829],[64848,64911],[64914,64967],[65008,65019],[65136,65140]
	,[65142,65276],[65296,65305],[65313,65338],[65345,65370],[65382,65470],[65474,65479],[65482,65487],[65490,65495]
	,[65498,65500],[65536,65547],[65549,65574],[65576,65594],[65596,65597],[65599,65613],[65616,65629],[65664,65786]
	,[65799,65843],[65856,65912],65930,[66176,66204],[66208,66256],[66304,66334],[66336,66339],[66352,66378],[66432,66461]
	,[66464,66499],[66504,66511],[66513,66517],[66560,66717],[66720,66729],[67584,67589],67592,[67594,67637],[67639,67640]
	,67644,[67647,67669],[67672,67679],[67840,67867],[67872,67897],[67968,68023],[68030,68031],68096,[68112,68115]
	,[68117,68119],[68121,68147],[68160,68167],[68192,68222],[68352,68405],[68416,68437],[68440,68466],[68472,68479]
	,[68608,68680],[69216,69246],[69635,69687],[69714,69743],[69763,69807],[69840,69864],[69872,69881],[69891,69926]
	,[69942,69951],[70019,70066],[70081,70084],[70096,70105],[71296,71338],[71360,71369],[73728,74606],[74752,74850]
	,[77824,78894],[92160,92728],[93952,94020],94032,[94099,94111],[110592,110593],[119648,119665],[119808,119892]
	,[119894,119964],[119966,119967],119970,[119973,119974],[119977,119980],[119982,119993],119995,[119997,120003]
	,[120005,120069],[120071,120074],[120077,120084],[120086,120092],[120094,120121],[120123,120126],[120128,120132],120134
	,[120138,120144],[120146,120485],[120488,120512],[120514,120538],[120540,120570],[120572,120596],[120598,120628]
	,[120630,120654],[120656,120686],[120688,120712],[120714,120744],[120746,120770],[120772,120779],[120782,120831]
	,[126464,126467],[126469,126495],[126497,126498],126500,126503,[126505,126514],[126516,126519],126521,126523,126530
	,126535,126537,126539,[126541,126543],[126545,126546],126548,126551,126553,126555,126557,126559,[126561,126562],126564
	,[126567,126570],[126572,126578],[126580,126583],[126585,126588],126590,[126592,126601],[126603,126619],[126625,126627]
	,[126629,126633],[126635,126651],[127232,127242],131072,173782,173824,177972,177984,178205,[194560,195101]];
;

//# sourceMappingURL=ydn.db-i-core-e-cur-qry-sync-text-dev.js.map
return ydn;}, (this || {}));
            