(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/app.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var Kidstat = require('./components/kidstat');
var options = {};


var element = React.createElement(Kidstat, options);
ReactDOM.render(element, document.querySelector('.main-container'));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDOUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCOztBQUVBLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG52YXIgS2lkc3RhdCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9raWRzdGF0Jyk7XG52YXIgb3B0aW9ucyA9IHt9O1xuXG5cbnZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChLaWRzdGF0LCBvcHRpb25zKTtcblJlYWN0RE9NLnJlbmRlcihlbGVtZW50LCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKSk7XG4iXX0=
},{"./components/kidstat":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/kidstat.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/node_modules/whatwg-fetch/fetch.js":[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx":[function(require,module,exports){
(function (global){
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

module.exports = Reflux.createActions([
    'CheckAuthorization',
    'Login',
    'Logout',
    'getKids',
    'addNewKid',
    'deleteKid',
    'getObservations'
]);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2FjdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUNsQyxvQkFBb0I7SUFDcEIsT0FBTztJQUNQLFFBQVE7SUFDUixTQUFTO0lBQ1QsV0FBVztJQUNYLFdBQVc7SUFDWCxpQkFBaUI7Q0FDcEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgICAnQ2hlY2tBdXRob3JpemF0aW9uJyxcbiAgICAnTG9naW4nLFxuICAgICdMb2dvdXQnLFxuICAgICdnZXRLaWRzJyxcbiAgICAnYWRkTmV3S2lkJyxcbiAgICAnZGVsZXRlS2lkJyxcbiAgICAnZ2V0T2JzZXJ2YXRpb25zJ1xuXSk7Il19
},{}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/api.jsx":[function(require,module,exports){
var Fetch = require('whatwg-fetch');
var rootUrl = '/api/v1/';
var tokenName = 'accessToken';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

module.exports = {
    storeToken(token){
        localStorage.setItem(tokenName, token);
    },
    getToken(){
        return localStorage.getItem(tokenName);
    },
    removeToken(){
        localStorage.removeItem(tokenName);
    },
    post(url, body){
        return fetch(rootUrl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(checkStatus)
            .then(parseJSON);
    },
    authorizedGet(url){
        return fetch(rootUrl + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            }
        })
            .then(checkStatus)
            .then(parseJSON);
    },
    authorizedPost(url, data){
        return fetch(rootUrl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            },
            body: JSON.stringify(data)
        })
            .then(checkStatus)
            .then(parseJSON);
    },
    authorizedDelete(url){
       return fetch(rootUrl + url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.getToken()
            }
        })
            .then(checkStatus)
            .then(parseJSON);
    }
};

},{"whatwg-fetch":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/node_modules/whatwg-fetch/fetch.js"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/header.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var LoginWindow = require('./login-window');
var AuthStore = require('../stores/auth-store');
var Actions = require('../actions');


var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;

var NavItem = ReactBootstrap.NavItem;

module.exports = React.createClass({displayName: "exports",
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction: function(event){
        if (event == 'authenticated'){ this.setState({authenticated: true}); }
        else if (event == 'logout') { this.setState({authenticated: false}); }
    },
    getInitialState: function () {
        return {authenticated: false}
    },
    openLogin: function () {
        this.refs.login_window.open();
    },
    render: function () {
        var nav;
        if (this.state.authenticated) {
            nav = (
                React.createElement(Nav, {pullRight: true}, 
                    React.createElement(NavItem, {eventKey: 3, onClick: Actions.Logout, href: "#"}, "Logout")
                )
            )

        } else {
            nav = (
                React.createElement(Nav, {pullRight: true}, 
                    React.createElement(NavItem, {eventKey: 1, onClick: this.openLogin, href: "#"}, "Login"), 
                    React.createElement(NavItem, {eventKey: 3, href: "#"}, "Register")
                )
            );
        }
        return (
            React.createElement("div", null, 
                React.createElement(Navbar, null, 
                    React.createElement(Navbar.Header, null, 
                        React.createElement(Navbar.Brand, null, 
                            React.createElement("a", {href: "#"}, "Kidstat")
                        )
                    ), 
                    nav
                ), 
                React.createElement(LoginWindow, {ref: "login_window"})
            )
        )
    }

});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNoRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM1QyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEM7O0FBRUEsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUNuQyxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDOztBQUU3QixJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDOztBQUVyQyxvQ0FBb0MsdUJBQUE7SUFDaEMsTUFBTSxFQUFFO1FBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUM7S0FDakQ7SUFDRCxnQkFBZ0IsRUFBRSxTQUFTLEtBQUssQ0FBQztRQUM3QixJQUFJLEtBQUssSUFBSSxlQUFlLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTthQUNqRSxJQUFJLEtBQUssSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtLQUN6RTtJQUNELGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO0tBQ2hDO0lBQ0QsU0FBUyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDakM7SUFDRCxNQUFNLEVBQUUsWUFBWTtRQUNoQixJQUFJLEdBQUcsQ0FBQztRQUNSLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDMUIsR0FBRztnQkFDQyxvQkFBQyxHQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBQyxDQUFBLEVBQUE7b0JBQ0Ysb0JBQUMsT0FBTyxFQUFBLENBQUEsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxDQUFDLEVBQUMsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxPQUFPLENBQUMsTUFBTSxFQUFDLENBQUMsSUFBQSxFQUFJLENBQUMsR0FBSSxDQUFBLEVBQUEsUUFBZ0IsQ0FBQTtnQkFDdEUsQ0FBQTtBQUN0QixhQUFhOztTQUVKLE1BQU07WUFDSCxHQUFHO2dCQUNDLG9CQUFDLEdBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFDLENBQUEsRUFBQTtvQkFDRixvQkFBQyxPQUFPLEVBQUEsQ0FBQSxDQUFDLFFBQUEsRUFBUSxDQUFFLENBQUMsRUFBQyxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFJLENBQUEsRUFBQSxPQUFlLENBQUEsRUFBQTtvQkFDdkUsb0JBQUMsT0FBTyxFQUFBLENBQUEsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxDQUFDLEVBQUMsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFJLENBQUEsRUFBQSxVQUFrQixDQUFBO2dCQUMvQyxDQUFBO2FBQ1QsQ0FBQztTQUNMO1FBQ0Q7WUFDSSxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO2dCQUNELG9CQUFDLE1BQU0sRUFBQSxJQUFDLEVBQUE7b0JBQ0osb0JBQUMsYUFBYSxFQUFBLElBQUMsRUFBQTt3QkFDWCxvQkFBQyxZQUFZLEVBQUEsSUFBQyxFQUFBOzRCQUNWLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsR0FBSSxDQUFBLEVBQUEsU0FBVyxDQUFBO3dCQUNaLENBQUE7b0JBQ0gsQ0FBQSxFQUFBO29CQUNmLEdBQUk7Z0JBQ0EsQ0FBQSxFQUFBO2dCQUNULG9CQUFDLFdBQVcsRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsY0FBYyxDQUFFLENBQUE7WUFDL0IsQ0FBQTtTQUNUO0FBQ1QsS0FBSzs7Q0FFSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpO1xudmFyIFJlYWN0Qm9vdHN0cmFwID0gcmVxdWlyZSgncmVhY3QtYm9vdHN0cmFwJyk7XG52YXIgTG9naW5XaW5kb3cgPSByZXF1aXJlKCcuL2xvZ2luLXdpbmRvdycpO1xudmFyIEF1dGhTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9hdXRoLXN0b3JlJyk7XG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcblxuXG52YXIgTmF2YmFyID0gUmVhY3RCb290c3RyYXAuTmF2YmFyO1xudmFyIE5hdiA9IFJlYWN0Qm9vdHN0cmFwLk5hdjtcblxudmFyIE5hdkl0ZW0gPSBSZWFjdEJvb3RzdHJhcC5OYXZJdGVtO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBtaXhpbnM6IFtcbiAgICAgICAgUmVmbHV4Lmxpc3RlblRvKEF1dGhTdG9yZSwgXCJoYW5kbGVBdXRoQWN0aW9uXCIpXG4gICAgXSxcbiAgICBoYW5kbGVBdXRoQWN0aW9uOiBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGlmIChldmVudCA9PSAnYXV0aGVudGljYXRlZCcpeyB0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGVkOiB0cnVlfSk7IH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQgPT0gJ2xvZ291dCcpIHsgdGhpcy5zZXRTdGF0ZSh7YXV0aGVudGljYXRlZDogZmFsc2V9KTsgfVxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7YXV0aGVudGljYXRlZDogZmFsc2V9XG4gICAgfSxcbiAgICBvcGVuTG9naW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWZzLmxvZ2luX3dpbmRvdy5vcGVuKCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5hdjtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYXV0aGVudGljYXRlZCkge1xuICAgICAgICAgICAgbmF2ID0gKFxuICAgICAgICAgICAgICAgIDxOYXYgcHVsbFJpZ2h0PlxuICAgICAgICAgICAgICAgICAgICA8TmF2SXRlbSBldmVudEtleT17M30gb25DbGljaz17QWN0aW9ucy5Mb2dvdXR9IGhyZWY9XCIjXCI+TG9nb3V0PC9OYXZJdGVtPlxuICAgICAgICAgICAgICAgIDwvTmF2PlxuICAgICAgICAgICAgKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYXYgPSAoXG4gICAgICAgICAgICAgICAgPE5hdiBwdWxsUmlnaHQ+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZJdGVtIGV2ZW50S2V5PXsxfSBvbkNsaWNrPXt0aGlzLm9wZW5Mb2dpbn0gaHJlZj1cIiNcIj5Mb2dpbjwvTmF2SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPE5hdkl0ZW0gZXZlbnRLZXk9ezN9IGhyZWY9XCIjXCI+UmVnaXN0ZXI8L05hdkl0ZW0+XG4gICAgICAgICAgICAgICAgPC9OYXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxOYXZiYXI+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXIuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE5hdmJhci5CcmFuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPktpZHN0YXQ8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L05hdmJhci5CcmFuZD5cbiAgICAgICAgICAgICAgICAgICAgPC9OYXZiYXIuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICB7bmF2fVxuICAgICAgICAgICAgICAgIDwvTmF2YmFyPlxuICAgICAgICAgICAgICAgIDxMb2dpbldpbmRvdyByZWY9XCJsb2dpbl93aW5kb3dcIi8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxufSk7Il19
},{"../actions":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx","../stores/auth-store":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/auth-store.jsx","./login-window":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/login-window.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/kids-list.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var Image = ReactBootstrap.Image;
var KidsStore = require('../stores/kids-store');
var Actions = require('../actions');

var oneDay = 24*60*60*1000;

module.exports = React.createClass({displayName: "exports",
    mixins: [
        Reflux.listenTo(KidsStore, "handleKids")
    ],
    getInitialState: function () {
        return {kids: []}
    },
    componentWillMount: function () {
        Actions.getKids();
    },
    handleKids: function (event, kids) {
        if (event == 'change'){
            this.setState({kids: kids});
        }
    },
    getAgeDays: function(kid){
        var today = new Date();
        var birthday = Date.parse(kid.birthday);
        return Math.round((today.getTime() - birthday) / oneDay)
    },
    updateKid: function(kid){},
    deleteKid: function(kid){
        Actions.deleteKid(kid);
    },
    renderKidsList: function () {
        return this.state.kids.map(function (kid) {
            return React.createElement("li", {className: "list-group-item", key: kid.id}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-2"}, 
                         React.createElement(Image, {src: "http://placehold.it/150x150", circle: true})
                    ), 
                    React.createElement("div", {className: "col-md-4"}, 
                        React.createElement("h3", null, kid.name), 
                        React.createElement("p", null, "Age: ", this.getAgeDays(kid), " days")
                    ), 
                    React.createElement("div", {className: "col-md-3"}, 
                        React.createElement("p", null, "Width: N/A"), 
                        React.createElement("p", null, "Height: N/A")
                    ), 
                    React.createElement("div", {className: "col-md-3"}, 
                        React.createElement("div", {className: "pull-right"}, 
                        React.createElement("i", {className: "fa fa-pencil", 
                           onClick: this.updateKid.bind(this, kid)}), 
                        React.createElement("i", {className: "fa fa-trash", 
                           onClick: this.deleteKid.bind(this, kid)})
                        )
                    )
                )
            )
        }.bind(this));
    },
    render: function () {
        return React.createElement("div", null, 
            React.createElement("div", null, 
                React.createElement("ul", {className: "list-group"}, 
                    this.renderKidsList()
                )
            )
        )
    }

})
;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMva2lkcy1saXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2hELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFL0IsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztBQUNqQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXBDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs7QUFFM0Isb0NBQW9DLHVCQUFBO0lBQ2hDLE1BQU0sRUFBRTtRQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztLQUMzQztJQUNELGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0tBQ3BCO0lBQ0Qsa0JBQWtCLEVBQUUsWUFBWTtRQUM1QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDckI7SUFDRCxVQUFVLEVBQUUsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQy9CLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDL0I7S0FDSjtJQUNELFVBQVUsRUFBRSxTQUFTLEdBQUcsQ0FBQztRQUNyQixJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLElBQUksTUFBTSxDQUFDO0tBQzNEO0lBQ0QsU0FBUyxFQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUU7SUFDMUIsU0FBUyxFQUFFLFNBQVMsR0FBRyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUI7SUFDRCxjQUFjLEVBQUUsWUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTtZQUN0QyxPQUFPLG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsaUJBQUEsRUFBaUIsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxHQUFHLENBQUMsRUFBSSxDQUFBLEVBQUE7Z0JBQ2hELG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsS0FBTSxDQUFBLEVBQUE7b0JBQ2pCLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7eUJBQ3JCLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUMsNkJBQUEsRUFBNkIsQ0FBQyxNQUFBLEVBQUEsQ0FBQSxDQUFHLENBQUE7b0JBQzNDLENBQUEsRUFBQTtvQkFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFVBQVcsQ0FBQSxFQUFBO3dCQUN0QixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFDLEdBQUcsQ0FBQyxJQUFVLENBQUEsRUFBQTt3QkFDbkIsb0JBQUEsR0FBRSxFQUFBLElBQUMsRUFBQSxPQUFBLEVBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQyxPQUFTLENBQUE7b0JBQ3JDLENBQUEsRUFBQTtvQkFDTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFVBQVcsQ0FBQSxFQUFBO3dCQUN0QixvQkFBQSxHQUFFLEVBQUEsSUFBQyxFQUFBLFlBQWMsQ0FBQSxFQUFBO3dCQUNqQixvQkFBQSxHQUFFLEVBQUEsSUFBQyxFQUFBLGFBQWUsQ0FBQTtvQkFDaEIsQ0FBQSxFQUFBO29CQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7d0JBQ3RCLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7d0JBQzVCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBQSxFQUFjOzJCQUN4QixPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFFLENBQUUsQ0FBQSxFQUFBO3dCQUM3QyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQUEsRUFBYTsyQkFDdkIsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBRSxDQUFFLENBQUE7d0JBQ3ZDLENBQUE7b0JBQ0osQ0FBQTtnQkFDSixDQUFBO1lBQ0wsQ0FBQTtTQUNSLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDakI7SUFDRCxNQUFNLEVBQUUsWUFBWTtRQUNoQixPQUFPLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7WUFDUixvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO2dCQUNELG9CQUFBLElBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7b0JBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUc7Z0JBQ3RCLENBQUE7WUFDSCxDQUFBO1FBQ0osQ0FBQTtBQUNkLEtBQUs7O0NBRUosQ0FBQztBQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0Qm9vdHN0cmFwID0gcmVxdWlyZSgncmVhY3QtYm9vdHN0cmFwJyk7XG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XG5cbnZhciBJbWFnZSA9IFJlYWN0Qm9vdHN0cmFwLkltYWdlO1xudmFyIEtpZHNTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9raWRzLXN0b3JlJyk7XG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcblxudmFyIG9uZURheSA9IDI0KjYwKjYwKjEwMDA7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG1peGluczogW1xuICAgICAgICBSZWZsdXgubGlzdGVuVG8oS2lkc1N0b3JlLCBcImhhbmRsZUtpZHNcIilcbiAgICBdLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge2tpZHM6IFtdfVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEFjdGlvbnMuZ2V0S2lkcygpO1xuICAgIH0sXG4gICAgaGFuZGxlS2lkczogZnVuY3Rpb24gKGV2ZW50LCBraWRzKSB7XG4gICAgICAgIGlmIChldmVudCA9PSAnY2hhbmdlJyl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtraWRzOiBraWRzfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFnZURheXM6IGZ1bmN0aW9uKGtpZCl7XG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBiaXJ0aGRheSA9IERhdGUucGFyc2Uoa2lkLmJpcnRoZGF5KTtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHRvZGF5LmdldFRpbWUoKSAtIGJpcnRoZGF5KSAvIG9uZURheSlcbiAgICB9LFxuICAgIHVwZGF0ZUtpZDogZnVuY3Rpb24oa2lkKXt9LFxuICAgIGRlbGV0ZUtpZDogZnVuY3Rpb24oa2lkKXtcbiAgICAgICAgQWN0aW9ucy5kZWxldGVLaWQoa2lkKTtcbiAgICB9LFxuICAgIHJlbmRlcktpZHNMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmtpZHMubWFwKGZ1bmN0aW9uIChraWQpIHtcbiAgICAgICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCIga2V5PXtraWQuaWR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPVwiaHR0cDovL3BsYWNlaG9sZC5pdC8xNTB4MTUwXCIgY2lyY2xlIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+e2tpZC5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5BZ2U6IHt0aGlzLmdldEFnZURheXMoa2lkKX0gZGF5czwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPldpZHRoOiBOL0E8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5IZWlnaHQ6IE4vQTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMudXBkYXRlS2lkLmJpbmQodGhpcywga2lkKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdHJhc2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5kZWxldGVLaWQuYmluZCh0aGlzLCBraWQpfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJLaWRzTGlzdCgpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuXG59KVxuOyJdfQ==
},{"../actions":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx","../stores/kids-store":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/kids-store.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/kidstat.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

var Button = ReactBootstrap.Button;

var AuthStore = require('../stores/auth-store');
var Header = require('./header');
var KidsList = require('./kids-list');
var PublicIndex = require('./public-index');
var Actions = require('../actions');
var Loader = require('./loading.jsx');

module.exports = React.createClass({displayName: "exports",
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuthAction")
    ],
    handleAuthAction: function (event) {
        if (event == 'authenticated') {
            this.setState({authenticated: true});
        }
        else if (event == 'logout') {
            this.setState({authenticated: false});
        }
    },
    componentWillMount: function () {
        Actions.CheckAuthorization();
    },
    getInitialState: function () {
        return {authorized: false, loaded: false}
    },
    render: function () {

        var body;
        if (this.state.authenticated) {
            body = React.createElement("div", null, 
                React.createElement("div", {className: "row"}
                ), 
                React.createElement("div", null, 
                    React.createElement(KidsList, null)
                ), 
                React.createElement("p", null, "Under construction")
            )
        } else {
            body = React.createElement(PublicIndex, null)
        }
        return (React.createElement("div", null, 
            React.createElement(Header, null), 
            React.createElement("div", {className: "container"}, 
                body
            ), 
            React.createElement(Loader, {ref: "loader"})
        ))
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMva2lkc3RhdC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNoRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7O0FBRW5DLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2hELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDNUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFdEMsb0NBQW9DLHVCQUFBO0lBQ2hDLE1BQU0sRUFBRTtRQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDO0tBQ2pEO0lBQ0QsZ0JBQWdCLEVBQUUsVUFBVSxLQUFLLEVBQUU7UUFDL0IsSUFBSSxLQUFLLElBQUksZUFBZSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN4QzthQUNJLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekM7S0FDSjtJQUNELGtCQUFrQixFQUFFLFlBQVk7UUFDNUIsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDaEM7SUFDRCxlQUFlLEVBQUUsWUFBWTtRQUN6QixPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQzVDO0FBQ0wsSUFBSSxNQUFNLEVBQUUsWUFBWTs7UUFFaEIsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQzFCLElBQUksR0FBRyxvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO2dCQUNSLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsS0FBTSxDQUFBO2dCQUNmLENBQUEsRUFBQTtnQkFDTixvQkFBQSxLQUFJLEVBQUEsSUFBQyxFQUFBO29CQUNELG9CQUFDLFFBQVEsRUFBQSxJQUFFLENBQUE7Z0JBQ1QsQ0FBQSxFQUFBO2dCQUNOLG9CQUFBLEdBQUUsRUFBQSxJQUFDLEVBQUEsb0JBQXNCLENBQUE7WUFDdkIsQ0FBQTtTQUNULE1BQU07WUFDSCxJQUFJLEdBQUcsb0JBQUMsV0FBVyxFQUFBLElBQUUsQ0FBQTtTQUN4QjtRQUNELFFBQVEsb0JBQUEsS0FBSSxFQUFBLElBQUMsRUFBQTtZQUNULG9CQUFDLE1BQU0sRUFBQSxJQUFFLENBQUEsRUFBQTtZQUNULG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsV0FBWSxDQUFBLEVBQUE7Z0JBQ3RCLElBQUs7WUFDSixDQUFBLEVBQUE7WUFDTixvQkFBQyxNQUFNLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLFFBQVEsQ0FBRSxDQUFBO1FBQ3BCLENBQUEsQ0FBQztLQUNWO0NBQ0osQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdEJvb3RzdHJhcCA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcCcpO1xudmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpO1xuXG52YXIgQnV0dG9uID0gUmVhY3RCb290c3RyYXAuQnV0dG9uO1xuXG52YXIgQXV0aFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2F1dGgtc3RvcmUnKTtcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlcicpO1xudmFyIEtpZHNMaXN0ID0gcmVxdWlyZSgnLi9raWRzLWxpc3QnKTtcbnZhciBQdWJsaWNJbmRleCA9IHJlcXVpcmUoJy4vcHVibGljLWluZGV4Jyk7XG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcbnZhciBMb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRpbmcuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG1peGluczogW1xuICAgICAgICBSZWZsdXgubGlzdGVuVG8oQXV0aFN0b3JlLCBcImhhbmRsZUF1dGhBY3Rpb25cIilcbiAgICBdLFxuICAgIGhhbmRsZUF1dGhBY3Rpb246IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgPT0gJ2F1dGhlbnRpY2F0ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGVkOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQgPT0gJ2xvZ291dCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2F1dGhlbnRpY2F0ZWQ6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xuICAgICAgICBBY3Rpb25zLkNoZWNrQXV0aG9yaXphdGlvbigpO1xuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7YXV0aG9yaXplZDogZmFsc2UsIGxvYWRlZDogZmFsc2V9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgYm9keTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYXV0aGVudGljYXRlZCkge1xuICAgICAgICAgICAgYm9keSA9IDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8S2lkc0xpc3QvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwPlVuZGVyIGNvbnN0cnVjdGlvbjwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IDxQdWJsaWNJbmRleC8+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICg8ZGl2PlxuICAgICAgICAgICAgPEhlYWRlci8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIHtib2R5fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8TG9hZGVyIHJlZj1cImxvYWRlclwiLz5cbiAgICAgICAgPC9kaXY+KVxuICAgIH1cbn0pOyJdfQ==
},{"../actions":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx","../stores/auth-store":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/auth-store.jsx","./header":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/header.jsx","./kids-list":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/kids-list.jsx","./loading.jsx":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/loading.jsx","./public-index":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/public-index.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/loading.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AuthStore = require('../stores/auth-store');
var KidsStore = require('../stores/kids-store');
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);

module.exports = React.createClass({displayName: "exports",
    mixins: [
        Reflux.listenTo(AuthStore, "handleAuth"),
        Reflux.listenTo(KidsStore, "handleAuth")
    ],
    handleAuth: function(event){
        if (event == 'loading'){
            this.show();
        } else {
            this.hide();
        }
    },
    getInitialState: function () {
        return {active: false}
    },
    show: function(){
        this.setState({active: true})
    },
    hide: function(){
        this.setState({active: false})
    },
    render: function(){
        return React.createElement("div", {className: this.state.active ? '' : 'hidden', id: "loading"}, 
                React.createElement("img", {id: "loading-image", src: "/static/images/loader.gif", alt: "Loading..."})
            )
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMvbG9hZGluZy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLG9DQUFvQyx1QkFBQTtJQUNoQyxNQUFNLEVBQUU7UUFDSixNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7UUFDeEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO0tBQzNDO0lBQ0QsVUFBVSxFQUFFLFNBQVMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZixNQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7S0FDSjtJQUNELGVBQWUsRUFBRSxZQUFZO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxFQUFFLFVBQVU7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsSUFBSSxFQUFFLFVBQVU7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsTUFBTSxFQUFFLFVBQVU7UUFDZCxPQUFPLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLFFBQVEsRUFBQyxDQUFDLEVBQUEsRUFBRSxDQUFDLFNBQVUsQ0FBQSxFQUFBO2dCQUMvRCxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLEVBQUEsRUFBRSxDQUFDLGVBQUEsRUFBZSxDQUFDLEdBQUEsRUFBRyxDQUFDLDJCQUFBLEVBQTJCLENBQUMsR0FBQSxFQUFHLENBQUMsWUFBWSxDQUFBLENBQUcsQ0FBQTtZQUN6RSxDQUFBO0tBQ2I7Q0FDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEF1dGhTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9hdXRoLXN0b3JlJyk7XG52YXIgS2lkc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2tpZHMtc3RvcmUnKTtcbnZhciBSZWZsdXggPSByZXF1aXJlKCdyZWZsdXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbWl4aW5zOiBbXG4gICAgICAgIFJlZmx1eC5saXN0ZW5UbyhBdXRoU3RvcmUsIFwiaGFuZGxlQXV0aFwiKSxcbiAgICAgICAgUmVmbHV4Lmxpc3RlblRvKEtpZHNTdG9yZSwgXCJoYW5kbGVBdXRoXCIpXG4gICAgXSxcbiAgICBoYW5kbGVBdXRoOiBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGlmIChldmVudCA9PSAnbG9hZGluZycpe1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7YWN0aXZlOiBmYWxzZX1cbiAgICB9LFxuICAgIHNob3c6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogdHJ1ZX0pXG4gICAgfSxcbiAgICBoaWRlOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGZhbHNlfSlcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXt0aGlzLnN0YXRlLmFjdGl2ZSA/ICcnIDogJ2hpZGRlbid9IGlkPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgaWQ9XCJsb2FkaW5nLWltYWdlXCIgc3JjPVwiL3N0YXRpYy9pbWFnZXMvbG9hZGVyLmdpZlwiIGFsdD1cIkxvYWRpbmcuLi5cIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgfVxufSk7Il19
},{"../stores/auth-store":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/auth-store.jsx","../stores/kids-store":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/kids-store.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/login-form.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Input = ReactBootstrap.Input;
var ButtonInput = ReactBootstrap.ButtonInput;

var Actions = require('../actions');

module.exports = React.createClass({displayName: "exports",
    getInitialState() {
        return {email: '', password: ''};
    },
    login(event){
        event.preventDefault();
        Actions.Login(this.state.email, this.state.password);
    },
    handleEmailChange(){
        this.setState({email: this.refs.email.getValue()})
    },
    handlePasswordChange(){
        this.setState({password: this.refs.password.getValue()})
    },
    render: function() {
    return (
    React.createElement("form", null, 
        React.createElement(Input, {type: "email", label: "Email Address", placeholder: "Enter email", 
               value: this.state.email, 
               onChange: this.handleEmailChange, 
               hasFeedback: true, 
               addonBefore: "@", 
               ref: "email"}
        ), 
        React.createElement(Input, {type: "password", label: "Password", 
               value: this.state.password, 
               onChange: this.handlePasswordChange, 
               ref: "password"}
        ), 
        React.createElement(ButtonInput, {type: "submit", onClick: this.login, value: "Login"})
    )
    )
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMvbG9naW4tZm9ybS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNoRCxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ2pDLElBQUksV0FBVyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUM7O0FBRTdDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFcEMsb0NBQW9DLHVCQUFBO0lBQ2hDLGVBQWUsR0FBRztRQUNkLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNwQztJQUNELEtBQUssT0FBTztRQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDeEQ7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUNyRDtJQUNELG9CQUFvQixFQUFFO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUNELE1BQU0sRUFBRSxXQUFXO0lBQ25CO0lBQ0Esb0JBQUEsTUFBSyxFQUFBLElBQUMsRUFBQTtRQUNGLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsT0FBQSxFQUFPLENBQUMsS0FBQSxFQUFLLENBQUMsZUFBQSxFQUFlLEVBQUUsV0FBQSxFQUFXLENBQUMsYUFBQSxFQUFhO2VBQzdELEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDO2VBQ3hCLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBQztlQUNqQyxXQUFBLEVBQVcsQ0FBRSxJQUFJLEVBQUM7ZUFDbEIsV0FBQSxFQUFXLENBQUMsR0FBQSxFQUFHO2VBQ2YsR0FBQSxFQUFHLENBQUMsT0FBTyxDQUFBO1FBQ2hCLENBQUEsRUFBQTtRQUNGLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsVUFBQSxFQUFVLENBQUMsS0FBQSxFQUFLLENBQUMsVUFBQSxFQUFVO2VBQ2hDLEtBQUEsRUFBSyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDO2VBQzNCLFFBQUEsRUFBUSxDQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBQztlQUNwQyxHQUFBLEVBQUcsQ0FBQyxVQUFVLENBQUE7UUFDbkIsQ0FBQSxFQUFBO1FBQ0Ysb0JBQUMsV0FBVyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxRQUFBLEVBQVEsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsS0FBQSxFQUFLLENBQUMsT0FBTyxDQUFFLENBQUE7SUFDNUQsQ0FBQTtLQUNOO0dBQ0Y7Q0FDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlYWN0Qm9vdHN0cmFwID0gcmVxdWlyZSgncmVhY3QtYm9vdHN0cmFwJyk7XG52YXIgSW5wdXQgPSBSZWFjdEJvb3RzdHJhcC5JbnB1dDtcbnZhciBCdXR0b25JbnB1dCA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbklucHV0O1xuXG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4ge2VtYWlsOiAnJywgcGFzc3dvcmQ6ICcnfTtcbiAgICB9LFxuICAgIGxvZ2luKGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgQWN0aW9ucy5Mb2dpbih0aGlzLnN0YXRlLmVtYWlsLCB0aGlzLnN0YXRlLnBhc3N3b3JkKTtcbiAgICB9LFxuICAgIGhhbmRsZUVtYWlsQ2hhbmdlKCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2VtYWlsOiB0aGlzLnJlZnMuZW1haWwuZ2V0VmFsdWUoKX0pXG4gICAgfSxcbiAgICBoYW5kbGVQYXNzd29yZENoYW5nZSgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYXNzd29yZDogdGhpcy5yZWZzLnBhc3N3b3JkLmdldFZhbHVlKCl9KVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgIDxmb3JtPlxuICAgICAgICA8SW5wdXQgdHlwZT1cImVtYWlsXCIgbGFiZWw9XCJFbWFpbCBBZGRyZXNzXCIgIHBsYWNlaG9sZGVyPVwiRW50ZXIgZW1haWxcIlxuICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZW1haWx9XG4gICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVFbWFpbENoYW5nZX1cbiAgICAgICAgICAgICAgIGhhc0ZlZWRiYWNrPXt0cnVlfVxuICAgICAgICAgICAgICAgYWRkb25CZWZvcmU9XCJAXCJcbiAgICAgICAgICAgICAgIHJlZj1cImVtYWlsXCJcbiAgICAgICAgLz5cbiAgICAgICAgPElucHV0IHR5cGU9XCJwYXNzd29yZFwiIGxhYmVsPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFzc3dvcmR9XG4gICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVQYXNzd29yZENoYW5nZX1cbiAgICAgICAgICAgICAgIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvbklucHV0IHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXt0aGlzLmxvZ2lufSB2YWx1ZT1cIkxvZ2luXCIvPlxuICAgIDwvZm9ybT5cbiAgICApXG4gIH1cbn0pOyJdfQ==
},{"../actions":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/login-window.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var AuthStore = require('../stores/auth-store');
var LoginForm = require('./login-form');
var ModalWindow = require('./modal');

module.exports = React.createClass({displayName: "exports",
    mixins: [
        Reflux.listenTo(AuthStore, "authenticated")
    ],
    authenticated(event){
        if (event == 'authenticated'){this.refs.modal.close();}
    },
    open: function(){
        this.refs.modal.open()
    },
    render: function () {
        return React.createElement(ModalWindow, {ref: "modal", title: "Login"}, 
            React.createElement(LoginForm, null)
            )
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMvbG9naW4td2luZG93LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVyQyxvQ0FBb0MsdUJBQUE7SUFDaEMsTUFBTSxFQUFFO1FBQ0osTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO0tBQzlDO0lBQ0QsYUFBYSxPQUFPO1FBQ2hCLElBQUksS0FBSyxJQUFJLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDMUQ7SUFDRCxJQUFJLEVBQUUsVUFBVTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtLQUN6QjtJQUNELE1BQU0sRUFBRSxZQUFZO1FBQ2hCLE9BQU8sb0JBQUMsV0FBVyxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxPQUFBLEVBQU8sQ0FBQyxLQUFBLEVBQUssQ0FBQyxPQUFRLENBQUEsRUFBQTtZQUMxQyxvQkFBQyxTQUFTLEVBQUEsSUFBRSxDQUFBO1lBQ0UsQ0FBQTtLQUNyQjtDQUNKLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XG52YXIgQXV0aFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2F1dGgtc3RvcmUnKTtcbnZhciBMb2dpbkZvcm0gPSByZXF1aXJlKCcuL2xvZ2luLWZvcm0nKTtcbnZhciBNb2RhbFdpbmRvdyA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbWl4aW5zOiBbXG4gICAgICAgIFJlZmx1eC5saXN0ZW5UbyhBdXRoU3RvcmUsIFwiYXV0aGVudGljYXRlZFwiKVxuICAgIF0sXG4gICAgYXV0aGVudGljYXRlZChldmVudCl7XG4gICAgICAgIGlmIChldmVudCA9PSAnYXV0aGVudGljYXRlZCcpe3RoaXMucmVmcy5tb2RhbC5jbG9zZSgpO31cbiAgICB9LFxuICAgIG9wZW46IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMucmVmcy5tb2RhbC5vcGVuKClcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gPE1vZGFsV2luZG93IHJlZj1cIm1vZGFsXCIgdGl0bGU9XCJMb2dpblwiPlxuICAgICAgICAgICAgPExvZ2luRm9ybS8+XG4gICAgICAgICAgICA8L01vZGFsV2luZG93PlxuICAgIH1cbn0pOyJdfQ==
},{"../stores/auth-store":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/auth-store.jsx","./login-form":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/login-form.jsx","./modal":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/modal.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/modal.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Modal = ReactBootstrap.Modal;

module.exports = React.createClass({displayName: "exports",
    getInitialState() {return {showModal: false};},
    close() {this.setState({showModal: false});},
    open() {this.setState({showModal: true});},
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Modal, {show: this.state.showModal, onHide: this.close}, 
                    React.createElement(Modal.Header, {closeButton: true}, 
                        React.createElement(Modal.Title, null, this.props.title)
                    ), 
                    React.createElement(Modal.Body, null, 
                         this.props.children
                    )
                )
            ))
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMvbW9kYWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDaEQsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQzs7QUFFakMsb0NBQW9DLHVCQUFBO0lBQ2hDLGVBQWUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5QyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQyxNQUFNLEVBQUUsWUFBWTtRQUNoQjtZQUNJLG9CQUFBLEtBQUksRUFBQSxJQUFDLEVBQUE7Z0JBQ0Qsb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxDQUFDLE1BQUEsRUFBTSxDQUFFLElBQUksQ0FBQyxLQUFPLENBQUEsRUFBQTtvQkFDbkQsb0JBQUMsWUFBWSxFQUFBLENBQUEsQ0FBQyxXQUFBLEVBQUMsQ0FBQSxFQUFBO3dCQUNYLG9CQUFDLFdBQVcsRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFvQixDQUFBO29CQUNsQyxDQUFBLEVBQUE7b0JBQ2Ysb0JBQUMsVUFBVSxFQUFBLElBQUMsRUFBQTt3QkFDUCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFFO29CQUNkLENBQUE7Z0JBQ1QsQ0FBQTtZQUNOLENBQUEsQ0FBQztLQUNkO0NBQ0osQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWFjdEJvb3RzdHJhcCA9IHJlcXVpcmUoJ3JlYWN0LWJvb3RzdHJhcCcpO1xudmFyIE1vZGFsID0gUmVhY3RCb290c3RyYXAuTW9kYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtyZXR1cm4ge3Nob3dNb2RhbDogZmFsc2V9O30sXG4gICAgY2xvc2UoKSB7dGhpcy5zZXRTdGF0ZSh7c2hvd01vZGFsOiBmYWxzZX0pO30sXG4gICAgb3BlbigpIHt0aGlzLnNldFN0YXRlKHtzaG93TW9kYWw6IHRydWV9KTt9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8TW9kYWwgc2hvdz17dGhpcy5zdGF0ZS5zaG93TW9kYWx9IG9uSGlkZT17dGhpcy5jbG9zZX0+XG4gICAgICAgICAgICAgICAgICAgIDxNb2RhbC5IZWFkZXIgY2xvc2VCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TW9kYWwuVGl0bGU+e3RoaXMucHJvcHMudGl0bGV9PC9Nb2RhbC5UaXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbC5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxNb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cbiAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbC5Cb2R5PlxuICAgICAgICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxufSk7Il19
},{}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/components/public-index.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

module.exports = React.createClass({displayName: "exports",

    render: function(){
        return React.createElement("div", {className: "text-center"}, 
            React.createElement("h1", null, "Welcome to the Kidstat!"), 
            React.createElement("img", {src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Baby2.gif"}), 
            React.createElement("p", null, "This a web site, where you can track how your baby grows!")
        )
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL2NvbXBvbmVudHMvcHVibGljLWluZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU3QixvQ0FBb0MsdUJBQUE7O0lBRWhDLE1BQU0sRUFBRSxVQUFVO1FBQ2QsT0FBTyxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO1lBQ2hDLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEseUJBQTRCLENBQUEsRUFBQTtZQUNoQyxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLCtEQUErRCxDQUFFLENBQUEsRUFBQTtZQUMxRSxvQkFBQSxHQUFFLEVBQUEsSUFBQyxFQUFBLDJEQUE2RCxDQUFBO1FBQzlELENBQUE7S0FDVDtDQUNKLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPGgxPldlbGNvbWUgdG8gdGhlIEtpZHN0YXQhPC9oMT5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy80LzQ2L0JhYnkyLmdpZlwiLz5cbiAgICAgICAgICAgIDxwPlRoaXMgYSB3ZWIgc2l0ZSwgd2hlcmUgeW91IGNhbiB0cmFjayBob3cgeW91ciBiYWJ5IGdyb3dzITwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufSk7Il19
},{}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/auth-store.jsx":[function(require,module,exports){
(function (global){
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var Api = require('../api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    triggerAuthenticated(){
        this.trigger('authenticated');
    },
    triggerLogout(){
        this.trigger('logout');
    },
    triggerLoading(){
        this.trigger('loading');
    },
    Login(email, password){
        this.triggerLoading();
        var body = JSON.stringify({
            email: email,
            password: password
        });
        return Api.post('auth', body)
            .then(function (data) {
                Api.storeToken(data['access_token']);
                this.triggerAuthenticated();
            }.bind(this));
    },
    CheckAuthorization(){
        this.triggerLoading();
        var token = Api.getToken();
        if (token){
            Api.authorizedGet('check-token')
                .then(function (data) {
                    this.triggerAuthenticated();
                }.bind(this))
                .catch(function(error){
                    this.triggerLogout()
                }.bind(this))
        } else {
            this.triggerLogout();
        }

    },
    Logout(){
        Api.removeToken();
        this.triggerLogout();
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL3N0b3Jlcy9hdXRoLXN0b3JlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXBDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNoQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDdEIsb0JBQW9CLEVBQUU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNqQztJQUNELGFBQWEsRUFBRTtRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDMUI7SUFDRCxjQUFjLEVBQUU7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsS0FBSyxpQkFBaUI7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDdEIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzthQUN4QixJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQy9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFDRCxrQkFBa0IsRUFBRTtRQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksS0FBSyxDQUFDO1lBQ04sR0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7aUJBQzNCLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtvQkFDbEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7aUJBQy9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNaLEtBQUssQ0FBQyxTQUFTLEtBQUssQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRTtpQkFDdkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEIsTUFBTTtZQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNqQyxTQUFTOztLQUVKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN4QjtDQUNKLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWZsdXggPSByZXF1aXJlKCdyZWZsdXgnKTtcbnZhciBBcGkgPSByZXF1aXJlKCcuLi9hcGknKTtcbnZhciBBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmx1eC5jcmVhdGVTdG9yZSh7XG4gICAgbGlzdGVuYWJsZXM6IFtBY3Rpb25zXSxcbiAgICB0cmlnZ2VyQXV0aGVudGljYXRlZCgpe1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2F1dGhlbnRpY2F0ZWQnKTtcbiAgICB9LFxuICAgIHRyaWdnZXJMb2dvdXQoKXtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2dvdXQnKTtcbiAgICB9LFxuICAgIHRyaWdnZXJMb2FkaW5nKCl7XG4gICAgICAgIHRoaXMudHJpZ2dlcignbG9hZGluZycpO1xuICAgIH0sXG4gICAgTG9naW4oZW1haWwsIHBhc3N3b3JkKXtcbiAgICAgICAgdGhpcy50cmlnZ2VyTG9hZGluZygpO1xuICAgICAgICB2YXIgYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEFwaS5wb3N0KCdhdXRoJywgYm9keSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgQXBpLnN0b3JlVG9rZW4oZGF0YVsnYWNjZXNzX3Rva2VuJ10pO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckF1dGhlbnRpY2F0ZWQoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICBDaGVja0F1dGhvcml6YXRpb24oKXtcbiAgICAgICAgdGhpcy50cmlnZ2VyTG9hZGluZygpO1xuICAgICAgICB2YXIgdG9rZW4gPSBBcGkuZ2V0VG9rZW4oKTtcbiAgICAgICAgaWYgKHRva2VuKXtcbiAgICAgICAgICAgIEFwaS5hdXRob3JpemVkR2V0KCdjaGVjay10b2tlbicpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXV0aGVudGljYXRlZCgpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJMb2dvdXQoKVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckxvZ291dCgpO1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIExvZ291dCgpe1xuICAgICAgICBBcGkucmVtb3ZlVG9rZW4oKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyTG9nb3V0KCk7XG4gICAgfVxufSk7Il19
},{"../actions":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx","../api":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/api.jsx"}],"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/stores/kids-store.jsx":[function(require,module,exports){
(function (global){
/**
 * Created by nikolaygolub on 20/02/16.
 */
var Reflux = (typeof window !== "undefined" ? window['Reflux'] : typeof global !== "undefined" ? global['Reflux'] : null);
var Api = require('../api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getKids: function(){
        return Api.authorizedGet('kids')
            .then(function(data){
                this.kids = data.data;
                this.triggerKidsReceived()
            }.bind(this));
    },
    addNewKid: function(kid){
        this.triggerLoading();
        return Api.authorizedPost('kids', kid)
            .then(function(new_kid){
                    this.kids.push(new_kid);
                    this.triggerKidsReceived();
            }.bind(this));
    },
    deleteKid: function(kid){
        this.triggerLoading();
        var url = 'kids/' + kid['id'];
        return Api.authorizedDelete(url)
            .then(function(response){
                var kid_idx = this.findKidIndex(kid);
                if (kid_idx > -1){
                    this.kids.splice(kid_idx, 1);
                }
                this.triggerKidsReceived()
            }.bind(this))
    },
    findKidIndex: function(kid){
        var idx = -1;
        for(var i = 0; i < this.kids.length; i++){
            if (this.kids[i]['id'] === kid['id']){
                idx = i;
                break
            }
        }
        return idx;
    },
    triggerKidsReceived: function(){
        this.trigger('change', this.kids);
    },
    triggerLoading: function(){
        this.trigger('loading');
    }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWtvbGF5Z29sdWIvd29ya3NwYWNlL215L2tpZHN0YXQva2lkc3RhdC9jbGllbnQvc3JjL3N0b3Jlcy9raWRzLXN0b3JlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7QUFDSCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ2hDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUN0QixPQUFPLEVBQUUsVUFBVTtRQUNmLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDM0IsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDO2dCQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTthQUM3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3JCO0lBQ0QsU0FBUyxFQUFFLFNBQVMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQzthQUNqQyxJQUFJLENBQUMsU0FBUyxPQUFPLENBQUM7b0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ2xDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFDRCxTQUFTLEVBQUUsU0FBUyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO2FBQzNCLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQztnQkFDcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7YUFDN0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7SUFDRCxZQUFZLEVBQUUsU0FBUyxHQUFHLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDUixLQUFLO2FBQ1I7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0tBQ2Q7SUFDRCxtQkFBbUIsRUFBRSxVQUFVO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQztJQUNELGNBQWMsRUFBRSxVQUFVO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDM0I7Q0FDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbmlrb2xheWdvbHViIG9uIDIwLzAyLzE2LlxuICovXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XG52YXIgQXBpID0gcmVxdWlyZSgnLi4vYXBpJyk7XG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWZsdXguY3JlYXRlU3RvcmUoe1xuICAgIGxpc3RlbmFibGVzOiBbQWN0aW9uc10sXG4gICAgZ2V0S2lkczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIEFwaS5hdXRob3JpemVkR2V0KCdraWRzJylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIHRoaXMua2lkcyA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJLaWRzUmVjZWl2ZWQoKVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuICAgIGFkZE5ld0tpZDogZnVuY3Rpb24oa2lkKXtcbiAgICAgICAgdGhpcy50cmlnZ2VyTG9hZGluZygpO1xuICAgICAgICByZXR1cm4gQXBpLmF1dGhvcml6ZWRQb3N0KCdraWRzJywga2lkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24obmV3X2tpZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2lkcy5wdXNoKG5ld19raWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJLaWRzUmVjZWl2ZWQoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICBkZWxldGVLaWQ6IGZ1bmN0aW9uKGtpZCl7XG4gICAgICAgIHRoaXMudHJpZ2dlckxvYWRpbmcoKTtcbiAgICAgICAgdmFyIHVybCA9ICdraWRzLycgKyBraWRbJ2lkJ107XG4gICAgICAgIHJldHVybiBBcGkuYXV0aG9yaXplZERlbGV0ZSh1cmwpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgdmFyIGtpZF9pZHggPSB0aGlzLmZpbmRLaWRJbmRleChraWQpO1xuICAgICAgICAgICAgICAgIGlmIChraWRfaWR4ID4gLTEpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtpZHMuc3BsaWNlKGtpZF9pZHgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJLaWRzUmVjZWl2ZWQoKVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0sXG4gICAgZmluZEtpZEluZGV4OiBmdW5jdGlvbihraWQpe1xuICAgICAgICB2YXIgaWR4ID0gLTE7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmtpZHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKHRoaXMua2lkc1tpXVsnaWQnXSA9PT0ga2lkWydpZCddKXtcbiAgICAgICAgICAgICAgICBpZHggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkeDtcbiAgICB9LFxuICAgIHRyaWdnZXJLaWRzUmVjZWl2ZWQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcy5raWRzKTtcbiAgICB9LFxuICAgIHRyaWdnZXJMb2FkaW5nOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2xvYWRpbmcnKTtcbiAgICB9XG59KTsiXX0=
},{"../actions":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/actions.jsx","../api":"/Users/nikolaygolub/workspace/my/kidstat/kidstat/client/src/api.jsx"}]},{},["./src/app.jsx"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzeCIsIm5vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJzcmMvYWN0aW9ucy5qc3giLCIvVXNlcnMvbmlrb2xheWdvbHViL3dvcmtzcGFjZS9teS9raWRzdGF0L2tpZHN0YXQvY2xpZW50L3NyYy9hcGkuanN4Iiwic3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzeCIsInNyYy9jb21wb25lbnRzL2tpZHMtbGlzdC5qc3giLCJzcmMvY29tcG9uZW50cy9raWRzdGF0LmpzeCIsInNyYy9jb21wb25lbnRzL2xvYWRpbmcuanN4Iiwic3JjL2NvbXBvbmVudHMvbG9naW4tZm9ybS5qc3giLCJzcmMvY29tcG9uZW50cy9sb2dpbi13aW5kb3cuanN4Iiwic3JjL2NvbXBvbmVudHMvbW9kYWwuanN4Iiwic3JjL2NvbXBvbmVudHMvcHVibGljLWluZGV4LmpzeCIsInNyYy9zdG9yZXMvYXV0aC1zdG9yZS5qc3giLCJzcmMvc3RvcmVzL2tpZHMtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEMsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ3pCLElBQUksU0FBUyxHQUFHLGFBQWEsQ0FBQzs7QUFFOUIsU0FBUyxXQUFXLENBQUMsUUFBUSxFQUFFO0VBQzdCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDbkQsT0FBTyxRQUFRO0dBQ2hCLE1BQU07SUFDTCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDMUIsTUFBTSxLQUFLO0dBQ1o7QUFDSCxDQUFDOztBQUVELFNBQVMsU0FBUyxDQUFDLFFBQVEsRUFBRTtFQUMzQixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDeEIsQ0FBQzs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsVUFBVSxPQUFPO1FBQ2IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUM7SUFDRCxRQUFRLEVBQUU7UUFDTixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUM7SUFDRCxXQUFXLEVBQUU7UUFDVCxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsSUFBSSxXQUFXO1FBQ1gsT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUN4QixNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixjQUFjLEVBQUUsa0JBQWtCO2FBQ3JDO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO2FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEI7SUFDRCxhQUFhLEtBQUs7UUFDZCxPQUFPLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDNUM7U0FDSixDQUFDO2FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEI7SUFDRCxjQUFjLFdBQVc7UUFDckIsT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUN4QixNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixjQUFjLEVBQUUsa0JBQWtCO2dCQUNsQyxlQUFlLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDNUM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDN0IsQ0FBQzthQUNHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3hCO0lBQ0QsZ0JBQWdCLEtBQUs7T0FDbEIsT0FBTyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUN2QixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUU7Z0JBQ0wsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsZUFBZSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO2FBQzVDO1NBQ0osQ0FBQzthQUNHLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3hCO0NBQ0o7OztBQzVFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG52YXIgUmVhY3RET00gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3RET00nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0RE9NJ10gOiBudWxsKTtcbnZhciBLaWRzdGF0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2tpZHN0YXQnKTtcbnZhciBvcHRpb25zID0ge307XG5cblxudmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KEtpZHN0YXQsIG9wdGlvbnMpO1xuUmVhY3RET00ucmVuZGVyKGVsZW1lbnQsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRhaW5lcicpKTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXVhV3R2YkdGNVoyOXNkV0l2ZDI5eWEzTndZV05sTDIxNUwydHBaSE4wWVhRdmEybGtjM1JoZEM5amJHbGxiblF2YzNKakwyRndjQzVxYzNnaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJMRWxCUVVrc1MwRkJTeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTTNRaXhKUVVGSkxGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN1FVRkRjRU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMSE5DUVVGelFpeERRVUZETEVOQlFVTTdRVUZET1VNc1NVRkJTU3hQUVVGUExFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEycENPenRCUVVWQkxFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVc3NRMEZCUXl4aFFVRmhMRU5CUVVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzBGQlEzQkVMRkZCUVZFc1EwRkJReXhOUVVGTkxFTkJRVU1zVDBGQlR5eEZRVUZGTEZGQlFWRXNRMEZCUXl4aFFVRmhMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXl4RFFVRkRJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdVbVZoWTNRZ1BTQnlaWEYxYVhKbEtDZHlaV0ZqZENjcE8xeHVkbUZ5SUZKbFlXTjBSRTlOSUQwZ2NtVnhkV2x5WlNnbmNtVmhZM1F0Wkc5dEp5azdYRzUyWVhJZ1MybGtjM1JoZENBOUlISmxjWFZwY21Vb0p5NHZZMjl0Y0c5dVpXNTBjeTlyYVdSemRHRjBKeWs3WEc1MllYSWdiM0IwYVc5dWN5QTlJSHQ5TzF4dVhHNWNiblpoY2lCbGJHVnRaVzUwSUQwZ1VtVmhZM1F1WTNKbFlYUmxSV3hsYldWdWRDaExhV1J6ZEdGMExDQnZjSFJwYjI1ektUdGNibEpsWVdOMFJFOU5MbkpsYm1SbGNpaGxiR1Z0Wlc1MExDQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJXRnBiaTFqYjI1MFlXbHVaWEluS1NrN1hHNGlYWDA9IiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtuYW1lXVxuICAgIGlmICghbGlzdCkge1xuICAgICAgbGlzdCA9IFtdXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IGxpc3RcbiAgICB9XG4gICAgbGlzdC5wdXNoKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldIHx8IFtdXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gW25vcm1hbGl6ZVZhbHVlKHZhbHVlKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMubWFwW25hbWVdLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcylcbiAgICAgIH0sIHRoaXMpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIC8vIE9ubHkgc3VwcG9ydCBBcnJheUJ1ZmZlcnMgZm9yIFBPU1QgbWV0aG9kLlxuICAgICAgICAvLyBSZWNlaXZpbmcgQXJyYXlCdWZmZXJzIGhhcHBlbnMgdmlhIEJsb2JzLCBpbnN0ZWFkLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQgOiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG4gICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpKSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gaW5wdXRcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gaGVhZGVycyh4aHIpIHtcbiAgICB2YXIgaGVhZCA9IG5ldyBIZWFkZXJzKClcbiAgICB2YXIgcGFpcnMgPSAoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKS50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHZhciBzcGxpdCA9IGhlYWRlci50cmltKCkuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHNwbGl0LnNoaWZ0KCkudHJpbSgpXG4gICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc6JykudHJpbSgpXG4gICAgICBoZWFkLmFwcGVuZChrZXksIHZhbHVlKVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1c1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBvcHRpb25zLnN0YXR1c1RleHRcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDogbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdFxuICAgICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpICYmICFpbml0KSB7XG4gICAgICAgIHJlcXVlc3QgPSBpbnB1dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgZnVuY3Rpb24gcmVzcG9uc2VVUkwoKSB7XG4gICAgICAgIGlmICgncmVzcG9uc2VVUkwnIGluIHhocikge1xuICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF2b2lkIHNlY3VyaXR5IHdhcm5pbmdzIG9uIGdldFJlc3BvbnNlSGVhZGVyIHdoZW4gbm90IGFsbG93ZWQgYnkgQ09SU1xuICAgICAgICBpZiAoL15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSkge1xuICAgICAgICAgIHJldHVybiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMoeGhyKSxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVVJMKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFJlZmx1eCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWZsdXgnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlZmx1eCddIDogbnVsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAgICdDaGVja0F1dGhvcml6YXRpb24nLFxuICAgICdMb2dpbicsXG4gICAgJ0xvZ291dCcsXG4gICAgJ2dldEtpZHMnLFxuICAgICdhZGROZXdLaWQnLFxuICAgICdkZWxldGVLaWQnLFxuICAgICdnZXRPYnNlcnZhdGlvbnMnXG5dKTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXVhV3R2YkdGNVoyOXNkV0l2ZDI5eWEzTndZV05sTDIxNUwydHBaSE4wWVhRdmEybGtjM1JoZEM5amJHbGxiblF2YzNKakwyRmpkR2x2Ym5NdWFuTjRJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVN4SlFVRkpMRTFCUVUwc1IwRkJSeXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdPMEZCUlM5Q0xFMUJRVTBzUTBGQlF5eFBRVUZQTEVkQlFVY3NUVUZCVFN4RFFVRkRMR0ZCUVdFc1EwRkJRenRKUVVOc1F5eHZRa0ZCYjBJN1NVRkRjRUlzVDBGQlR6dEpRVU5RTEZGQlFWRTdTVUZEVWl4VFFVRlRPMGxCUTFRc1YwRkJWenRKUVVOWUxGZEJRVmM3U1VGRFdDeHBRa0ZCYVVJN1EwRkRjRUlzUTBGQlF5SXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpZG1GeUlGSmxabXgxZUNBOUlISmxjWFZwY21Vb0ozSmxabXgxZUNjcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRkpsWm14MWVDNWpjbVZoZEdWQlkzUnBiMjV6S0Z0Y2JpQWdJQ0FuUTJobFkydEJkWFJvYjNKcGVtRjBhVzl1Snl4Y2JpQWdJQ0FuVEc5bmFXNG5MRnh1SUNBZ0lDZE1iMmR2ZFhRbkxGeHVJQ0FnSUNkblpYUkxhV1J6Snl4Y2JpQWdJQ0FuWVdSa1RtVjNTMmxrSnl4Y2JpQWdJQ0FuWkdWc1pYUmxTMmxrSnl4Y2JpQWdJQ0FuWjJWMFQySnpaWEoyWVhScGIyNXpKMXh1WFNrN0lsMTkiLCJ2YXIgRmV0Y2ggPSByZXF1aXJlKCd3aGF0d2ctZmV0Y2gnKTtcbnZhciByb290VXJsID0gJy9hcGkvdjEvJztcbnZhciB0b2tlbk5hbWUgPSAnYWNjZXNzVG9rZW4nO1xuXG5mdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfSBlbHNlIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aHJvdyBlcnJvclxuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0b3JlVG9rZW4odG9rZW4pe1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0b2tlbk5hbWUsIHRva2VuKTtcbiAgICB9LFxuICAgIGdldFRva2VuKCl7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0b2tlbk5hbWUpO1xuICAgIH0sXG4gICAgcmVtb3ZlVG9rZW4oKXtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odG9rZW5OYW1lKTtcbiAgICB9LFxuICAgIHBvc3QodXJsLCBib2R5KXtcbiAgICAgICAgcmV0dXJuIGZldGNoKHJvb3RVcmwgKyB1cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IGJvZHlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGNoZWNrU3RhdHVzKVxuICAgICAgICAgICAgLnRoZW4ocGFyc2VKU09OKTtcbiAgICB9LFxuICAgIGF1dGhvcml6ZWRHZXQodXJsKXtcbiAgICAgICAgcmV0dXJuIGZldGNoKHJvb3RVcmwgKyB1cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnSldUICcgKyB0aGlzLmdldFRva2VuKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGNoZWNrU3RhdHVzKVxuICAgICAgICAgICAgLnRoZW4ocGFyc2VKU09OKTtcbiAgICB9LFxuICAgIGF1dGhvcml6ZWRQb3N0KHVybCwgZGF0YSl7XG4gICAgICAgIHJldHVybiBmZXRjaChyb290VXJsICsgdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnSldUICcgKyB0aGlzLmdldFRva2VuKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oY2hlY2tTdGF0dXMpXG4gICAgICAgICAgICAudGhlbihwYXJzZUpTT04pO1xuICAgIH0sXG4gICAgYXV0aG9yaXplZERlbGV0ZSh1cmwpe1xuICAgICAgIHJldHVybiBmZXRjaChyb290VXJsICsgdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdKV1QgJyArIHRoaXMuZ2V0VG9rZW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oY2hlY2tTdGF0dXMpXG4gICAgICAgICAgICAudGhlbihwYXJzZUpTT04pO1xuICAgIH1cbn07IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG52YXIgUmVmbHV4ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlZmx1eCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVmbHV4J10gOiBudWxsKTtcbnZhciBSZWFjdEJvb3RzdHJhcCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWFjdEJvb3RzdHJhcCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVhY3RCb290c3RyYXAnXSA6IG51bGwpO1xudmFyIExvZ2luV2luZG93ID0gcmVxdWlyZSgnLi9sb2dpbi13aW5kb3cnKTtcbnZhciBBdXRoU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvYXV0aC1zdG9yZScpO1xudmFyIEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zJyk7XG5cblxudmFyIE5hdmJhciA9IFJlYWN0Qm9vdHN0cmFwLk5hdmJhcjtcbnZhciBOYXYgPSBSZWFjdEJvb3RzdHJhcC5OYXY7XG5cbnZhciBOYXZJdGVtID0gUmVhY3RCb290c3RyYXAuTmF2SXRlbTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuICAgIG1peGluczogW1xuICAgICAgICBSZWZsdXgubGlzdGVuVG8oQXV0aFN0b3JlLCBcImhhbmRsZUF1dGhBY3Rpb25cIilcbiAgICBdLFxuICAgIGhhbmRsZUF1dGhBY3Rpb246IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgaWYgKGV2ZW50ID09ICdhdXRoZW50aWNhdGVkJyl7IHRoaXMuc2V0U3RhdGUoe2F1dGhlbnRpY2F0ZWQ6IHRydWV9KTsgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9PSAnbG9nb3V0JykgeyB0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGVkOiBmYWxzZX0pOyB9XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHthdXRoZW50aWNhdGVkOiBmYWxzZX1cbiAgICB9LFxuICAgIG9wZW5Mb2dpbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlZnMubG9naW5fd2luZG93Lm9wZW4oKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmF2O1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hdXRoZW50aWNhdGVkKSB7XG4gICAgICAgICAgICBuYXYgPSAoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOYXYsIHtwdWxsUmlnaHQ6IHRydWV9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOYXZJdGVtLCB7ZXZlbnRLZXk6IDMsIG9uQ2xpY2s6IEFjdGlvbnMuTG9nb3V0LCBocmVmOiBcIiNcIn0sIFwiTG9nb3V0XCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYXYgPSAoXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOYXYsIHtwdWxsUmlnaHQ6IHRydWV9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChOYXZJdGVtLCB7ZXZlbnRLZXk6IDEsIG9uQ2xpY2s6IHRoaXMub3BlbkxvZ2luLCBocmVmOiBcIiNcIn0sIFwiTG9naW5cIiksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE5hdkl0ZW0sIHtldmVudEtleTogMywgaHJlZjogXCIjXCJ9LCBcIlJlZ2lzdGVyXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE5hdmJhciwgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTmF2YmFyLkhlYWRlciwgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE5hdmJhci5CcmFuZCwgbnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwge2hyZWY6IFwiI1wifSwgXCJLaWRzdGF0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgICAgICBuYXZcbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExvZ2luV2luZG93LCB7cmVmOiBcImxvZ2luX3dpbmRvd1wifSlcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cblxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMMk52YlhCdmJtVnVkSE12YUdWaFpHVnlMbXB6ZUNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRXNTVUZCU1N4TFFVRkxMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzBGQlF6ZENMRWxCUVVrc1RVRkJUU3hIUVVGSExFOUJRVThzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0QlFVTXZRaXhKUVVGSkxHTkJRV01zUjBGQlJ5eFBRVUZQTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zUTBGQlF6dEJRVU5vUkN4SlFVRkpMRmRCUVZjc1IwRkJSeXhQUVVGUExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1EwRkJRenRCUVVNMVF5eEpRVUZKTEZOQlFWTXNSMEZCUnl4UFFVRlBMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hKUVVGSkxFOUJRVThzUjBGQlJ5eFBRVUZQTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1FVRkRjRU03TzBGQlJVRXNTVUZCU1N4TlFVRk5MRWRCUVVjc1kwRkJZeXhEUVVGRExFMUJRVTBzUTBGQlF6dEJRVU51UXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhqUVVGakxFTkJRVU1zUjBGQlJ5eERRVUZET3p0QlFVVTNRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eGpRVUZqTEVOQlFVTXNUMEZCVHl4RFFVRkRPenRCUVVWeVF5eHZRMEZCYjBNc2RVSkJRVUU3U1VGRGFFTXNUVUZCVFN4RlFVRkZPMUZCUTBvc1RVRkJUU3hEUVVGRExGRkJRVkVzUTBGQlF5eFRRVUZUTEVWQlFVVXNhMEpCUVd0Q0xFTkJRVU03UzBGRGFrUTdTVUZEUkN4blFrRkJaMElzUlVGQlJTeFRRVUZUTEV0QlFVc3NRMEZCUXp0UlFVTTNRaXhKUVVGSkxFdEJRVXNzU1VGQlNTeGxRVUZsTEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zWVVGQllTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSVHRoUVVOcVJTeEpRVUZKTEV0QlFVc3NTVUZCU1N4UlFVRlJMRVZCUVVVc1JVRkJSU3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNZVUZCWVN4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJUdExRVU42UlR0SlFVTkVMR1ZCUVdVc1JVRkJSU3haUVVGWk8xRkJRM3BDTEU5QlFVOHNRMEZCUXl4aFFVRmhMRVZCUVVVc1MwRkJTeXhEUVVGRE8wdEJRMmhETzBsQlEwUXNVMEZCVXl4RlFVRkZMRmxCUVZrN1VVRkRia0lzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU03UzBGRGFrTTdTVUZEUkN4TlFVRk5MRVZCUVVVc1dVRkJXVHRSUVVOb1FpeEpRVUZKTEVkQlFVY3NRMEZCUXp0UlFVTlNMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eGhRVUZoTEVWQlFVVTdXVUZETVVJc1IwRkJSenRuUWtGRFF5eHZRa0ZCUXl4SFFVRkhMRVZCUVVFc1EwRkJRU3hEUVVGRExGTkJRVUVzUlVGQlF5eERRVUZCTEVWQlFVRTdiMEpCUTBZc2IwSkJRVU1zVDBGQlR5eEZRVUZCTEVOQlFVRXNRMEZCUXl4UlFVRkJMRVZCUVZFc1EwRkJSU3hEUVVGRExFVkJRVU1zUTBGQlF5eFBRVUZCTEVWQlFVOHNRMEZCUlN4UFFVRlBMRU5CUVVNc1RVRkJUU3hGUVVGRExFTkJRVU1zU1VGQlFTeEZRVUZKTEVOQlFVTXNSMEZCU1N4RFFVRkJMRVZCUVVFc1VVRkJaMElzUTBGQlFUdG5Ra0ZEZEVVc1EwRkJRVHRCUVVOMFFpeGhRVUZoT3p0VFFVVktMRTFCUVUwN1dVRkRTQ3hIUVVGSE8yZENRVU5ETEc5Q1FVRkRMRWRCUVVjc1JVRkJRU3hEUVVGQkxFTkJRVU1zVTBGQlFTeEZRVUZETEVOQlFVRXNSVUZCUVR0dlFrRkRSaXh2UWtGQlF5eFBRVUZQTEVWQlFVRXNRMEZCUVN4RFFVRkRMRkZCUVVFc1JVRkJVU3hEUVVGRkxFTkJRVU1zUlVGQlF5eERRVUZETEU5QlFVRXNSVUZCVHl4RFFVRkZMRWxCUVVrc1EwRkJReXhUUVVGVExFVkJRVU1zUTBGQlF5eEpRVUZCTEVWQlFVa3NRMEZCUXl4SFFVRkpMRU5CUVVFc1JVRkJRU3hQUVVGbExFTkJRVUVzUlVGQlFUdHZRa0ZEZGtVc2IwSkJRVU1zVDBGQlR5eEZRVUZCTEVOQlFVRXNRMEZCUXl4UlFVRkJMRVZCUVZFc1EwRkJSU3hEUVVGRExFVkJRVU1zUTBGQlF5eEpRVUZCTEVWQlFVa3NRMEZCUXl4SFFVRkpMRU5CUVVFc1JVRkJRU3hWUVVGclFpeERRVUZCTzJkQ1FVTXZReXhEUVVGQk8yRkJRMVFzUTBGQlF6dFRRVU5NTzFGQlEwUTdXVUZEU1N4dlFrRkJRU3hMUVVGSkxFVkJRVUVzU1VGQlF5eEZRVUZCTzJkQ1FVTkVMRzlDUVVGRExFMUJRVTBzUlVGQlFTeEpRVUZETEVWQlFVRTdiMEpCUTBvc2IwSkJRVU1zWVVGQllTeEZRVUZCTEVsQlFVTXNSVUZCUVR0M1FrRkRXQ3h2UWtGQlF5eFpRVUZaTEVWQlFVRXNTVUZCUXl4RlFVRkJPelJDUVVOV0xHOUNRVUZCTEVkQlFVVXNSVUZCUVN4RFFVRkJMRU5CUVVNc1NVRkJRU3hGUVVGSkxFTkJRVU1zUjBGQlNTeERRVUZCTEVWQlFVRXNVMEZCVnl4RFFVRkJPM2RDUVVOYUxFTkJRVUU3YjBKQlEwZ3NRMEZCUVN4RlFVRkJPMjlDUVVObUxFZEJRVWs3WjBKQlEwRXNRMEZCUVN4RlFVRkJPMmRDUVVOVUxHOUNRVUZETEZkQlFWY3NSVUZCUVN4RFFVRkJMRU5CUVVNc1IwRkJRU3hGUVVGSExFTkJRVU1zWTBGQll5eERRVUZGTEVOQlFVRTdXVUZETDBJc1EwRkJRVHRUUVVOVU8wRkJRMVFzUzBGQlN6czdRMEZGU2l4RFFVRkRJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdVbVZoWTNRZ1BTQnlaWEYxYVhKbEtDZHlaV0ZqZENjcE8xeHVkbUZ5SUZKbFpteDFlQ0E5SUhKbGNYVnBjbVVvSjNKbFpteDFlQ2NwTzF4dWRtRnlJRkpsWVdOMFFtOXZkSE4wY21Gd0lEMGdjbVZ4ZFdseVpTZ25jbVZoWTNRdFltOXZkSE4wY21Gd0p5azdYRzUyWVhJZ1RHOW5hVzVYYVc1a2IzY2dQU0J5WlhGMWFYSmxLQ2N1TDJ4dloybHVMWGRwYm1SdmR5Y3BPMXh1ZG1GeUlFRjFkR2hUZEc5eVpTQTlJSEpsY1hWcGNtVW9KeTR1TDNOMGIzSmxjeTloZFhSb0xYTjBiM0psSnlrN1hHNTJZWElnUVdOMGFXOXVjeUE5SUhKbGNYVnBjbVVvSnk0dUwyRmpkR2x2Ym5NbktUdGNibHh1WEc1MllYSWdUbUYyWW1GeUlEMGdVbVZoWTNSQ2IyOTBjM1J5WVhBdVRtRjJZbUZ5TzF4dWRtRnlJRTVoZGlBOUlGSmxZV04wUW05dmRITjBjbUZ3TGs1aGRqdGNibHh1ZG1GeUlFNWhka2wwWlcwZ1BTQlNaV0ZqZEVKdmIzUnpkSEpoY0M1T1lYWkpkR1Z0TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlGSmxZV04wTG1OeVpXRjBaVU5zWVhOektIdGNiaUFnSUNCdGFYaHBibk02SUZ0Y2JpQWdJQ0FnSUNBZ1VtVm1iSFY0TG14cGMzUmxibFJ2S0VGMWRHaFRkRzl5WlN3Z1hDSm9ZVzVrYkdWQmRYUm9RV04wYVc5dVhDSXBYRzRnSUNBZ1hTeGNiaUFnSUNCb1lXNWtiR1ZCZFhSb1FXTjBhVzl1T2lCbWRXNWpkR2x2YmlobGRtVnVkQ2w3WEc0Z0lDQWdJQ0FnSUdsbUlDaGxkbVZ1ZENBOVBTQW5ZWFYwYUdWdWRHbGpZWFJsWkNjcGV5QjBhR2x6TG5ObGRGTjBZWFJsS0h0aGRYUm9aVzUwYVdOaGRHVmtPaUIwY25WbGZTazdJSDFjYmlBZ0lDQWdJQ0FnWld4elpTQnBaaUFvWlhabGJuUWdQVDBnSjJ4dloyOTFkQ2NwSUhzZ2RHaHBjeTV6WlhSVGRHRjBaU2g3WVhWMGFHVnVkR2xqWVhSbFpEb2dabUZzYzJWOUtUc2dmVnh1SUNBZ0lIMHNYRzRnSUNBZ1oyVjBTVzVwZEdsaGJGTjBZWFJsT2lCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjdZWFYwYUdWdWRHbGpZWFJsWkRvZ1ptRnNjMlY5WEc0Z0lDQWdmU3hjYmlBZ0lDQnZjR1Z1VEc5bmFXNDZJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV5WldaekxteHZaMmx1WDNkcGJtUnZkeTV2Y0dWdUtDazdYRzRnSUNBZ2ZTeGNiaUFnSUNCeVpXNWtaWEk2SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUc1aGRqdGNiaUFnSUNBZ0lDQWdhV1lnS0hSb2FYTXVjM1JoZEdVdVlYVjBhR1Z1ZEdsallYUmxaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdibUYySUQwZ0tGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeE9ZWFlnY0hWc2JGSnBaMmgwUGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThUbUYyU1hSbGJTQmxkbVZ1ZEV0bGVUMTdNMzBnYjI1RGJHbGphejE3UVdOMGFXOXVjeTVNYjJkdmRYUjlJR2h5WldZOVhDSWpYQ0krVEc5bmIzVjBQQzlPWVhaSmRHVnRQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2VG1GMlBseHVJQ0FnSUNBZ0lDQWdJQ0FnS1Z4dVhHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J1WVhZZ1BTQW9YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQRTVoZGlCd2RXeHNVbWxuYUhRK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhPWVhaSmRHVnRJR1YyWlc1MFMyVjVQWHN4ZlNCdmJrTnNhV05yUFh0MGFHbHpMbTl3Wlc1TWIyZHBibjBnYUhKbFpqMWNJaU5jSWo1TWIyZHBiand2VG1GMlNYUmxiVDVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BFNWhka2wwWlcwZ1pYWmxiblJMWlhrOWV6TjlJR2h5WldZOVhDSWpYQ0krVW1WbmFYTjBaWEk4TDA1aGRrbDBaVzArWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5T1lYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQW9YRzRnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhPWVhaaVlYSStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4T1lYWmlZWEl1U0dWaFpHVnlQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQRTVoZG1KaGNpNUNjbUZ1WkQ1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThZU0JvY21WbVBWd2lJMXdpUGt0cFpITjBZWFE4TDJFK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwwNWhkbUpoY2k1Q2NtRnVaRDVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BDOU9ZWFppWVhJdVNHVmhaR1Z5UGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdibUYyZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR3dlRtRjJZbUZ5UGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4TWIyZHBibGRwYm1SdmR5QnlaV1k5WENKc2IyZHBibDkzYVc1a2IzZGNJaTgrWEc0Z0lDQWdJQ0FnSUNBZ0lDQThMMlJwZGo1Y2JpQWdJQ0FnSUNBZ0tWeHVJQ0FnSUgxY2JseHVmU2s3SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBSZWFjdCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWFjdCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVhY3QnXSA6IG51bGwpO1xudmFyIFJlYWN0Qm9vdHN0cmFwID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0Qm9vdHN0cmFwJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdEJvb3RzdHJhcCddIDogbnVsbCk7XG52YXIgUmVmbHV4ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlZmx1eCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVmbHV4J10gOiBudWxsKTtcblxudmFyIEltYWdlID0gUmVhY3RCb290c3RyYXAuSW1hZ2U7XG52YXIgS2lkc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2tpZHMtc3RvcmUnKTtcbnZhciBBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucycpO1xuXG52YXIgb25lRGF5ID0gMjQqNjAqNjAqMTAwMDtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuICAgIG1peGluczogW1xuICAgICAgICBSZWZsdXgubGlzdGVuVG8oS2lkc1N0b3JlLCBcImhhbmRsZUtpZHNcIilcbiAgICBdLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge2tpZHM6IFtdfVxuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEFjdGlvbnMuZ2V0S2lkcygpO1xuICAgIH0sXG4gICAgaGFuZGxlS2lkczogZnVuY3Rpb24gKGV2ZW50LCBraWRzKSB7XG4gICAgICAgIGlmIChldmVudCA9PSAnY2hhbmdlJyl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtraWRzOiBraWRzfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFnZURheXM6IGZ1bmN0aW9uKGtpZCl7XG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBiaXJ0aGRheSA9IERhdGUucGFyc2Uoa2lkLmJpcnRoZGF5KTtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHRvZGF5LmdldFRpbWUoKSAtIGJpcnRoZGF5KSAvIG9uZURheSlcbiAgICB9LFxuICAgIHVwZGF0ZUtpZDogZnVuY3Rpb24oa2lkKXt9LFxuICAgIGRlbGV0ZUtpZDogZnVuY3Rpb24oa2lkKXtcbiAgICAgICAgQWN0aW9ucy5kZWxldGVLaWQoa2lkKTtcbiAgICB9LFxuICAgIHJlbmRlcktpZHNMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmtpZHMubWFwKGZ1bmN0aW9uIChraWQpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwge2NsYXNzTmFtZTogXCJsaXN0LWdyb3VwLWl0ZW1cIiwga2V5OiBraWQuaWR9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwicm93XCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImNvbC1tZC0yXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7c3JjOiBcImh0dHA6Ly9wbGFjZWhvbGQuaXQvMTUweDE1MFwiLCBjaXJjbGU6IHRydWV9KVxuICAgICAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImNvbC1tZC00XCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBraWQubmFtZSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgXCJBZ2U6IFwiLCB0aGlzLmdldEFnZURheXMoa2lkKSwgXCIgZGF5c1wiKVxuICAgICAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImNvbC1tZC0zXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiV2lkdGg6IE4vQVwiKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIkhlaWdodDogTi9BXCIpXG4gICAgICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiY29sLW1kLTNcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInB1bGwtcmlnaHRcIn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlcIiwge2NsYXNzTmFtZTogXCJmYSBmYS1wZW5jaWxcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiB0aGlzLnVwZGF0ZUtpZC5iaW5kKHRoaXMsIGtpZCl9KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7Y2xhc3NOYW1lOiBcImZhIGZhLXRyYXNoXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljazogdGhpcy5kZWxldGVLaWQuYmluZCh0aGlzLCBraWQpfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtjbGFzc05hbWU6IFwibGlzdC1ncm91cFwifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyS2lkc0xpc3QoKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cblxufSlcbjtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXVhV3R2YkdGNVoyOXNkV0l2ZDI5eWEzTndZV05sTDIxNUwydHBaSE4wWVhRdmEybGtjM1JoZEM5amJHbGxiblF2YzNKakwyTnZiWEJ2Ym1WdWRITXZhMmxrY3kxc2FYTjBMbXB6ZUNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRXNTVUZCU1N4TFFVRkxMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzBGQlF6ZENMRWxCUVVrc1kwRkJZeXhIUVVGSExFOUJRVThzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8wRkJRMmhFTEVsQlFVa3NUVUZCVFN4SFFVRkhMRTlCUVU4c1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6czdRVUZGTDBJc1NVRkJTU3hMUVVGTExFZEJRVWNzWTBGQll5eERRVUZETEV0QlFVc3NRMEZCUXp0QlFVTnFReXhKUVVGSkxGTkJRVk1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU1zUTBGQlF6dEJRVU5vUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhQUVVGUExFTkJRVU1zV1VGQldTeERRVUZETEVOQlFVTTdPMEZCUlhCRExFbEJRVWtzVFVGQlRTeEhRVUZITEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF6czdRVUZGTTBJc2IwTkJRVzlETEhWQ1FVRkJPMGxCUTJoRExFMUJRVTBzUlVGQlJUdFJRVU5LTEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1UwRkJVeXhGUVVGRkxGbEJRVmtzUTBGQlF6dExRVU16UXp0SlFVTkVMR1ZCUVdVc1JVRkJSU3haUVVGWk8xRkJRM3BDTEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJSU3hEUVVGRE8wdEJRM0JDTzBsQlEwUXNhMEpCUVd0Q0xFVkJRVVVzV1VGQldUdFJRVU0xUWl4UFFVRlBMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03UzBGRGNrSTdTVUZEUkN4VlFVRlZMRVZCUVVVc1ZVRkJWU3hMUVVGTExFVkJRVVVzU1VGQlNTeEZRVUZGTzFGQlF5OUNMRWxCUVVrc1MwRkJTeXhKUVVGSkxGRkJRVkVzUTBGQlF6dFpRVU5zUWl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zU1VGQlNTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1UwRkRMMEk3UzBGRFNqdEpRVU5FTEZWQlFWVXNSVUZCUlN4VFFVRlRMRWRCUVVjc1EwRkJRenRSUVVOeVFpeEpRVUZKTEV0QlFVc3NSMEZCUnl4SlFVRkpMRWxCUVVrc1JVRkJSU3hEUVVGRE8xRkJRM1pDTEVsQlFVa3NVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMUZCUTNoRExFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhQUVVGUExFVkJRVVVzUjBGQlJ5eFJRVUZSTEVsQlFVa3NUVUZCVFN4RFFVRkRPMHRCUXpORU8wbEJRMFFzVTBGQlV5eEZRVUZGTEZOQlFWTXNSMEZCUnl4RFFVRkRMRVZCUVVVN1NVRkRNVUlzVTBGQlV5eEZRVUZGTEZOQlFWTXNSMEZCUnl4RFFVRkRPMUZCUTNCQ0xFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1MwRkRNVUk3U1VGRFJDeGpRVUZqTEVWQlFVVXNXVUZCV1R0UlFVTjRRaXhQUVVGUExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhWUVVGVkxFZEJRVWNzUlVGQlJUdFpRVU4wUXl4UFFVRlBMRzlDUVVGQkxFbEJRVWNzUlVGQlFTeERRVUZCTEVOQlFVTXNVMEZCUVN4RlFVRlRMRU5CUVVNc2FVSkJRVUVzUlVGQmFVSXNRMEZCUXl4SFFVRkJMRVZCUVVjc1EwRkJSU3hIUVVGSExFTkJRVU1zUlVGQlNTeERRVUZCTEVWQlFVRTdaMEpCUTJoRUxHOUNRVUZCTEV0QlFVa3NSVUZCUVN4RFFVRkJMRU5CUVVNc1UwRkJRU3hGUVVGVExFTkJRVU1zUzBGQlRTeERRVUZCTEVWQlFVRTdiMEpCUTJwQ0xHOUNRVUZCTEV0QlFVa3NSVUZCUVN4RFFVRkJMRU5CUVVNc1UwRkJRU3hGUVVGVExFTkJRVU1zVlVGQlZ5eERRVUZCTEVWQlFVRTdlVUpCUTNKQ0xHOUNRVUZETEV0QlFVc3NSVUZCUVN4RFFVRkJMRU5CUVVNc1IwRkJRU3hGUVVGSExFTkJRVU1zTmtKQlFVRXNSVUZCTmtJc1EwRkJReXhOUVVGQkxFVkJRVUVzUTBGQlFTeERRVUZITEVOQlFVRTdiMEpCUXpORExFTkJRVUVzUlVGQlFUdHZRa0ZEVGl4dlFrRkJRU3hMUVVGSkxFVkJRVUVzUTBGQlFTeERRVUZETEZOQlFVRXNSVUZCVXl4RFFVRkRMRlZCUVZjc1EwRkJRU3hGUVVGQk8zZENRVU4wUWl4dlFrRkJRU3hKUVVGSExFVkJRVUVzU1VGQlF5eEZRVUZETEVkQlFVY3NRMEZCUXl4SlFVRlZMRU5CUVVFc1JVRkJRVHQzUWtGRGJrSXNiMEpCUVVFc1IwRkJSU3hGUVVGQkxFbEJRVU1zUlVGQlFTeFBRVUZCTEVWQlFVMHNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlF5eFBRVUZUTEVOQlFVRTdiMEpCUTNKRExFTkJRVUVzUlVGQlFUdHZRa0ZEVGl4dlFrRkJRU3hMUVVGSkxFVkJRVUVzUTBGQlFTeERRVUZETEZOQlFVRXNSVUZCVXl4RFFVRkRMRlZCUVZjc1EwRkJRU3hGUVVGQk8zZENRVU4wUWl4dlFrRkJRU3hIUVVGRkxFVkJRVUVzU1VGQlF5eEZRVUZCTEZsQlFXTXNRMEZCUVN4RlFVRkJPM2RDUVVOcVFpeHZRa0ZCUVN4SFFVRkZMRVZCUVVFc1NVRkJReXhGUVVGQkxHRkJRV1VzUTBGQlFUdHZRa0ZEYUVJc1EwRkJRU3hGUVVGQk8yOUNRVU5PTEc5Q1FVRkJMRXRCUVVrc1JVRkJRU3hEUVVGQkxFTkJRVU1zVTBGQlFTeEZRVUZUTEVOQlFVTXNWVUZCVnl4RFFVRkJMRVZCUVVFN2QwSkJRM1JDTEc5Q1FVRkJMRXRCUVVrc1JVRkJRU3hEUVVGQkxFTkJRVU1zVTBGQlFTeEZRVUZUTEVOQlFVTXNXVUZCWVN4RFFVRkJMRVZCUVVFN2QwSkJRelZDTEc5Q1FVRkJMRWRCUVVVc1JVRkJRU3hEUVVGQkxFTkJRVU1zVTBGQlFTeEZRVUZUTEVOQlFVTXNZMEZCUVN4RlFVRmpPekpDUVVONFFpeFBRVUZCTEVWQlFVOHNRMEZCUlN4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNSMEZCUnl4RFFVRkZMRU5CUVVVc1EwRkJRU3hGUVVGQk8zZENRVU0zUXl4dlFrRkJRU3hIUVVGRkxFVkJRVUVzUTBGQlFTeERRVUZETEZOQlFVRXNSVUZCVXl4RFFVRkRMR0ZCUVVFc1JVRkJZVHN5UWtGRGRrSXNUMEZCUVN4RlFVRlBMRU5CUVVVc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1EwRkJSU3hEUVVGRkxFTkJRVUU3ZDBKQlEzWkRMRU5CUVVFN2IwSkJRMG9zUTBGQlFUdG5Ra0ZEU2l4RFFVRkJPMWxCUTB3c1EwRkJRVHRUUVVOU0xFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkRha0k3U1VGRFJDeE5RVUZOTEVWQlFVVXNXVUZCV1R0UlFVTm9RaXhQUVVGUExHOUNRVUZCTEV0QlFVa3NSVUZCUVN4SlFVRkRMRVZCUVVFN1dVRkRVaXh2UWtGQlFTeExRVUZKTEVWQlFVRXNTVUZCUXl4RlFVRkJPMmRDUVVORUxHOUNRVUZCTEVsQlFVY3NSVUZCUVN4RFFVRkJMRU5CUVVNc1UwRkJRU3hGUVVGVExFTkJRVU1zV1VGQllTeERRVUZCTEVWQlFVRTdiMEpCUTNSQ0xFbEJRVWtzUTBGQlF5eGpRVUZqTEVWQlFVYzdaMEpCUTNSQ0xFTkJRVUU3V1VGRFNDeERRVUZCTzFGQlEwb3NRMEZCUVR0QlFVTmtMRXRCUVVzN08wTkJSVW9zUTBGQlF6dEJRVU5HSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SjJZWElnVW1WaFkzUWdQU0J5WlhGMWFYSmxLQ2R5WldGamRDY3BPMXh1ZG1GeUlGSmxZV04wUW05dmRITjBjbUZ3SUQwZ2NtVnhkV2x5WlNnbmNtVmhZM1F0WW05dmRITjBjbUZ3SnlrN1hHNTJZWElnVW1WbWJIVjRJRDBnY21WeGRXbHlaU2duY21WbWJIVjRKeWs3WEc1Y2JuWmhjaUJKYldGblpTQTlJRkpsWVdOMFFtOXZkSE4wY21Gd0xrbHRZV2RsTzF4dWRtRnlJRXRwWkhOVGRHOXlaU0E5SUhKbGNYVnBjbVVvSnk0dUwzTjBiM0psY3k5cmFXUnpMWE4wYjNKbEp5azdYRzUyWVhJZ1FXTjBhVzl1Y3lBOUlISmxjWFZwY21Vb0p5NHVMMkZqZEdsdmJuTW5LVHRjYmx4dWRtRnlJRzl1WlVSaGVTQTlJREkwS2pZd0tqWXdLakV3TURBN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdVbVZoWTNRdVkzSmxZWFJsUTJ4aGMzTW9lMXh1SUNBZ0lHMXBlR2x1Y3pvZ1cxeHVJQ0FnSUNBZ0lDQlNaV1pzZFhndWJHbHpkR1Z1Vkc4b1MybGtjMU4wYjNKbExDQmNJbWhoYm1Sc1pVdHBaSE5jSWlsY2JpQWdJQ0JkTEZ4dUlDQWdJR2RsZEVsdWFYUnBZV3hUZEdGMFpUb2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZTJ0cFpITTZJRnRkZlZ4dUlDQWdJSDBzWEc0Z0lDQWdZMjl0Y0c5dVpXNTBWMmxzYkUxdmRXNTBPaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lFRmpkR2x2Ym5NdVoyVjBTMmxrY3lncE8xeHVJQ0FnSUgwc1hHNGdJQ0FnYUdGdVpHeGxTMmxrY3pvZ1puVnVZM1JwYjI0Z0tHVjJaVzUwTENCcmFXUnpLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaGxkbVZ1ZENBOVBTQW5ZMmhoYm1kbEp5bDdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbk5sZEZOMFlYUmxLSHRyYVdSek9pQnJhV1J6ZlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUxGeHVJQ0FnSUdkbGRFRm5aVVJoZVhNNklHWjFibU4wYVc5dUtHdHBaQ2w3WEc0Z0lDQWdJQ0FnSUhaaGNpQjBiMlJoZVNBOUlHNWxkeUJFWVhSbEtDazdYRzRnSUNBZ0lDQWdJSFpoY2lCaWFYSjBhR1JoZVNBOUlFUmhkR1V1Y0dGeWMyVW9hMmxrTG1KcGNuUm9aR0Y1S1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUUxaGRHZ3VjbTkxYm1Rb0tIUnZaR0Y1TG1kbGRGUnBiV1VvS1NBdElHSnBjblJvWkdGNUtTQXZJRzl1WlVSaGVTbGNiaUFnSUNCOUxGeHVJQ0FnSUhWd1pHRjBaVXRwWkRvZ1puVnVZM1JwYjI0b2EybGtLWHQ5TEZ4dUlDQWdJR1JsYkdWMFpVdHBaRG9nWm5WdVkzUnBiMjRvYTJsa0tYdGNiaUFnSUNBZ0lDQWdRV04wYVc5dWN5NWtaV3hsZEdWTGFXUW9hMmxrS1R0Y2JpQWdJQ0I5TEZ4dUlDQWdJSEpsYm1SbGNrdHBaSE5NYVhOME9pQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxuTjBZWFJsTG10cFpITXViV0Z3S0daMWJtTjBhVzl1SUNocmFXUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlBOGJHa2dZMnhoYzNOT1lXMWxQVndpYkdsemRDMW5jbTkxY0MxcGRHVnRYQ0lnYTJWNVBYdHJhV1F1YVdSOVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTk9ZVzFsUFZ3aWNtOTNYQ0krWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTk9ZVzFsUFZ3aVkyOXNMVzFrTFRKY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThTVzFoWjJVZ2MzSmpQVndpYUhSMGNEb3ZMM0JzWVdObGFHOXNaQzVwZEM4eE5UQjRNVFV3WENJZ1kybHlZMnhsSUM4K1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2WkdsMlBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56VG1GdFpUMWNJbU52YkMxdFpDMDBYQ0krWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4YURNK2UydHBaQzV1WVcxbGZUd3ZhRE0rWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4Y0Q1QloyVTZJSHQwYUdsekxtZGxkRUZuWlVSaGVYTW9hMmxrS1gwZ1pHRjVjend2Y0Q1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM05PWVcxbFBWd2lZMjlzTFcxa0xUTmNJajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3UGxkcFpIUm9PaUJPTDBFOEwzQStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjRDVJWldsbmFIUTZJRTR2UVR3dmNENWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNOT1lXMWxQVndpWTI5c0xXMWtMVE5jSWo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNOT1lXMWxQVndpY0hWc2JDMXlhV2RvZEZ3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BHa2dZMnhoYzNOT1lXMWxQVndpWm1FZ1ptRXRjR1Z1WTJsc1hDSmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzl1UTJ4cFkyczllM1JvYVhNdWRYQmtZWFJsUzJsa0xtSnBibVFvZEdocGN5d2dhMmxrS1gwdlBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BHa2dZMnhoYzNOT1lXMWxQVndpWm1FZ1ptRXRkSEpoYzJoY0lseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiMjVEYkdsamF6MTdkR2hwY3k1a1pXeGxkR1ZMYVdRdVltbHVaQ2gwYUdsekxDQnJhV1FwZlM4K1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyeHBQbHh1SUNBZ0lDQWdJQ0I5TG1KcGJtUW9kR2hwY3lrcE8xeHVJQ0FnSUgwc1hHNGdJQ0FnY21WdVpHVnlPaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlBOFpHbDJQbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BHUnBkajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4ZFd3Z1kyeGhjM05PWVcxbFBWd2liR2x6ZEMxbmNtOTFjRndpUGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjdkR2hwY3k1eVpXNWtaWEpMYVdSelRHbHpkQ2dwZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR3dmRXdytYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ2ZWeHVYRzU5S1Z4dU95SmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG52YXIgUmVhY3RCb290c3RyYXAgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3RCb290c3RyYXAnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0Qm9vdHN0cmFwJ10gOiBudWxsKTtcbnZhciBSZWZsdXggPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVmbHV4J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWZsdXgnXSA6IG51bGwpO1xuXG52YXIgQnV0dG9uID0gUmVhY3RCb290c3RyYXAuQnV0dG9uO1xuXG52YXIgQXV0aFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2F1dGgtc3RvcmUnKTtcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2hlYWRlcicpO1xudmFyIEtpZHNMaXN0ID0gcmVxdWlyZSgnLi9raWRzLWxpc3QnKTtcbnZhciBQdWJsaWNJbmRleCA9IHJlcXVpcmUoJy4vcHVibGljLWluZGV4Jyk7XG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcbnZhciBMb2FkZXIgPSByZXF1aXJlKCcuL2xvYWRpbmcuanN4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcImV4cG9ydHNcIixcbiAgICBtaXhpbnM6IFtcbiAgICAgICAgUmVmbHV4Lmxpc3RlblRvKEF1dGhTdG9yZSwgXCJoYW5kbGVBdXRoQWN0aW9uXCIpXG4gICAgXSxcbiAgICBoYW5kbGVBdXRoQWN0aW9uOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09ICdhdXRoZW50aWNhdGVkJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YXV0aGVudGljYXRlZDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50ID09ICdsb2dvdXQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGVkOiBmYWxzZX0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgQWN0aW9ucy5DaGVja0F1dGhvcml6YXRpb24oKTtcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge2F1dGhvcml6ZWQ6IGZhbHNlLCBsb2FkZWQ6IGZhbHNlfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGJvZHk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgICAgIGJvZHkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyb3dcIn1cbiAgICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEtpZHNMaXN0LCBudWxsKVxuICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiVW5kZXIgY29uc3RydWN0aW9uXCIpXG4gICAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5ID0gUmVhY3QuY3JlYXRlRWxlbWVudChQdWJsaWNJbmRleCwgbnVsbClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRlciwgbnVsbCksIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImNvbnRhaW5lclwifSwgXG4gICAgICAgICAgICAgICAgYm9keVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRlciwge3JlZjogXCJsb2FkZXJcIn0pXG4gICAgICAgICkpXG4gICAgfVxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMMk52YlhCdmJtVnVkSE12YTJsa2MzUmhkQzVxYzNnaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJMRWxCUVVrc1MwRkJTeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTTNRaXhKUVVGSkxHTkJRV01zUjBGQlJ5eFBRVUZQTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zUTBGQlF6dEJRVU5vUkN4SlFVRkpMRTFCUVUwc1IwRkJSeXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdPMEZCUlM5Q0xFbEJRVWtzVFVGQlRTeEhRVUZITEdOQlFXTXNRMEZCUXl4TlFVRk5MRU5CUVVNN08wRkJSVzVETEVsQlFVa3NVMEZCVXl4SFFVRkhMRTlCUVU4c1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4RFFVRkRPMEZCUTJoRUxFbEJRVWtzVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRCUVVOcVF5eEpRVUZKTEZGQlFWRXNSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU03UVVGRGRFTXNTVUZCU1N4WFFVRlhMRWRCUVVjc1QwRkJUeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1FVRkROVU1zU1VGQlNTeFBRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8wRkJRM0JETEVsQlFVa3NUVUZCVFN4SFFVRkhMRTlCUVU4c1EwRkJReXhsUVVGbExFTkJRVU1zUTBGQlF6czdRVUZGZEVNc2IwTkJRVzlETEhWQ1FVRkJPMGxCUTJoRExFMUJRVTBzUlVGQlJUdFJRVU5LTEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1UwRkJVeXhGUVVGRkxHdENRVUZyUWl4RFFVRkRPMHRCUTJwRU8wbEJRMFFzWjBKQlFXZENMRVZCUVVVc1ZVRkJWU3hMUVVGTExFVkJRVVU3VVVGREwwSXNTVUZCU1N4TFFVRkxMRWxCUVVrc1pVRkJaU3hGUVVGRk8xbEJRekZDTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhoUVVGaExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTjRRenRoUVVOSkxFbEJRVWtzUzBGQlN5eEpRVUZKTEZGQlFWRXNSVUZCUlR0WlFVTjRRaXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNZVUZCWVN4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGVrTTdTMEZEU2p0SlFVTkVMR3RDUVVGclFpeEZRVUZGTEZsQlFWazdVVUZETlVJc1QwRkJUeXhEUVVGRExHdENRVUZyUWl4RlFVRkZMRU5CUVVNN1MwRkRhRU03U1VGRFJDeGxRVUZsTEVWQlFVVXNXVUZCV1R0UlFVTjZRaXhQUVVGUExFTkJRVU1zVlVGQlZTeEZRVUZGTEV0QlFVc3NSVUZCUlN4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRE8wdEJRelZETzBGQlEwd3NTVUZCU1N4TlFVRk5MRVZCUVVVc1dVRkJXVHM3VVVGRmFFSXNTVUZCU1N4SlFVRkpMRU5CUVVNN1VVRkRWQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNZVUZCWVN4RlFVRkZPMWxCUXpGQ0xFbEJRVWtzUjBGQlJ5eHZRa0ZCUVN4TFFVRkpMRVZCUVVFc1NVRkJReXhGUVVGQk8yZENRVU5TTEc5Q1FVRkJMRXRCUVVrc1JVRkJRU3hEUVVGQkxFTkJRVU1zVTBGQlFTeEZRVUZUTEVOQlFVTXNTMEZCVFN4RFFVRkJPMmRDUVVObUxFTkJRVUVzUlVGQlFUdG5Ra0ZEVGl4dlFrRkJRU3hMUVVGSkxFVkJRVUVzU1VGQlF5eEZRVUZCTzI5Q1FVTkVMRzlDUVVGRExGRkJRVkVzUlVGQlFTeEpRVUZGTEVOQlFVRTdaMEpCUTFRc1EwRkJRU3hGUVVGQk8yZENRVU5PTEc5Q1FVRkJMRWRCUVVVc1JVRkJRU3hKUVVGRExFVkJRVUVzYjBKQlFYTkNMRU5CUVVFN1dVRkRka0lzUTBGQlFUdFRRVU5VTEUxQlFVMDdXVUZEU0N4SlFVRkpMRWRCUVVjc2IwSkJRVU1zVjBGQlZ5eEZRVUZCTEVsQlFVVXNRMEZCUVR0VFFVTjRRanRSUVVORUxGRkJRVkVzYjBKQlFVRXNTMEZCU1N4RlFVRkJMRWxCUVVNc1JVRkJRVHRaUVVOVUxHOUNRVUZETEUxQlFVMHNSVUZCUVN4SlFVRkZMRU5CUVVFc1JVRkJRVHRaUVVOVUxHOUNRVUZCTEV0QlFVa3NSVUZCUVN4RFFVRkJMRU5CUVVNc1UwRkJRU3hGUVVGVExFTkJRVU1zVjBGQldTeERRVUZCTEVWQlFVRTdaMEpCUTNSQ0xFbEJRVXM3V1VGRFNpeERRVUZCTEVWQlFVRTdXVUZEVGl4dlFrRkJReXhOUVVGTkxFVkJRVUVzUTBGQlFTeERRVUZETEVkQlFVRXNSVUZCUnl4RFFVRkRMRkZCUVZFc1EwRkJSU3hEUVVGQk8xRkJRM0JDTEVOQlFVRXNRMEZCUXp0TFFVTldPME5CUTBvc1EwRkJReUlzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWRtRnlJRkpsWVdOMElEMGdjbVZ4ZFdseVpTZ25jbVZoWTNRbktUdGNiblpoY2lCU1pXRmpkRUp2YjNSemRISmhjQ0E5SUhKbGNYVnBjbVVvSjNKbFlXTjBMV0p2YjNSemRISmhjQ2NwTzF4dWRtRnlJRkpsWm14MWVDQTlJSEpsY1hWcGNtVW9KM0psWm14MWVDY3BPMXh1WEc1MllYSWdRblYwZEc5dUlEMGdVbVZoWTNSQ2IyOTBjM1J5WVhBdVFuVjBkRzl1TzF4dVhHNTJZWElnUVhWMGFGTjBiM0psSUQwZ2NtVnhkV2x5WlNnbkxpNHZjM1J2Y21WekwyRjFkR2d0YzNSdmNtVW5LVHRjYm5aaGNpQklaV0ZrWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMmhsWVdSbGNpY3BPMXh1ZG1GeUlFdHBaSE5NYVhOMElEMGdjbVZ4ZFdseVpTZ25MaTlyYVdSekxXeHBjM1FuS1R0Y2JuWmhjaUJRZFdKc2FXTkpibVJsZUNBOUlISmxjWFZwY21Vb0p5NHZjSFZpYkdsakxXbHVaR1Y0SnlrN1hHNTJZWElnUVdOMGFXOXVjeUE5SUhKbGNYVnBjbVVvSnk0dUwyRmpkR2x2Ym5NbktUdGNiblpoY2lCTWIyRmtaWElnUFNCeVpYRjFhWEpsS0NjdUwyeHZZV1JwYm1jdWFuTjRKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1VtVmhZM1F1WTNKbFlYUmxRMnhoYzNNb2UxeHVJQ0FnSUcxcGVHbHVjem9nVzF4dUlDQWdJQ0FnSUNCU1pXWnNkWGd1YkdsemRHVnVWRzhvUVhWMGFGTjBiM0psTENCY0ltaGhibVJzWlVGMWRHaEJZM1JwYjI1Y0lpbGNiaUFnSUNCZExGeHVJQ0FnSUdoaGJtUnNaVUYxZEdoQlkzUnBiMjQ2SUdaMWJtTjBhVzl1SUNobGRtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9aWFpsYm5RZ1BUMGdKMkYxZEdobGJuUnBZMkYwWldRbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbk5sZEZOMFlYUmxLSHRoZFhSb1pXNTBhV05oZEdWa09pQjBjblZsZlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdaV3h6WlNCcFppQW9aWFpsYm5RZ1BUMGdKMnh2WjI5MWRDY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YzJWMFUzUmhkR1VvZTJGMWRHaGxiblJwWTJGMFpXUTZJR1poYkhObGZTazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1SUNBZ0lHTnZiWEJ2Ym1WdWRGZHBiR3hOYjNWdWREb2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCQlkzUnBiMjV6TGtOb1pXTnJRWFYwYUc5eWFYcGhkR2x2YmlncE8xeHVJQ0FnSUgwc1hHNGdJQ0FnWjJWMFNXNXBkR2xoYkZOMFlYUmxPaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCN1lYVjBhRzl5YVhwbFpEb2dabUZzYzJVc0lHeHZZV1JsWkRvZ1ptRnNjMlY5WEc0Z0lDQWdmU3hjYmlBZ0lDQnlaVzVrWlhJNklHWjFibU4wYVc5dUlDZ3BJSHRjYmx4dUlDQWdJQ0FnSUNCMllYSWdZbTlrZVR0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWMzUmhkR1V1WVhWMGFHVnVkR2xqWVhSbFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ltOWtlU0E5SUR4a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjMDVoYldVOVhDSnliM2RjSWo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4WkdsMlBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4UzJsa2MweHBjM1F2UGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh3UGxWdVpHVnlJR052Ym5OMGNuVmpkR2x2Ymp3dmNENWNiaUFnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ltOWtlU0E5SUR4UWRXSnNhV05KYm1SbGVDOCtYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ2c4WkdsMlBseHVJQ0FnSUNBZ0lDQWdJQ0FnUEVobFlXUmxjaTgrWEc0Z0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpUbUZ0WlQxY0ltTnZiblJoYVc1bGNsd2lQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSHRpYjJSNWZWeHVJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBOFRHOWhaR1Z5SUhKbFpqMWNJbXh2WVdSbGNsd2lMejVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStLVnh1SUNBZ0lIMWNibjBwT3lKZGZRPT0iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUmVhY3QgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKTtcbnZhciBBdXRoU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvYXV0aC1zdG9yZScpO1xudmFyIEtpZHNTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9raWRzLXN0b3JlJyk7XG52YXIgUmVmbHV4ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlZmx1eCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVmbHV4J10gOiBudWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuICAgIG1peGluczogW1xuICAgICAgICBSZWZsdXgubGlzdGVuVG8oQXV0aFN0b3JlLCBcImhhbmRsZUF1dGhcIiksXG4gICAgICAgIFJlZmx1eC5saXN0ZW5UbyhLaWRzU3RvcmUsIFwiaGFuZGxlQXV0aFwiKVxuICAgIF0sXG4gICAgaGFuZGxlQXV0aDogZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBpZiAoZXZlbnQgPT0gJ2xvYWRpbmcnKXtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge2FjdGl2ZTogZmFsc2V9XG4gICAgfSxcbiAgICBzaG93OiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IHRydWV9KVxuICAgIH0sXG4gICAgaGlkZTogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBmYWxzZX0pXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IHRoaXMuc3RhdGUuYWN0aXZlID8gJycgOiAnaGlkZGVuJywgaWQ6IFwibG9hZGluZ1wifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCB7aWQ6IFwibG9hZGluZy1pbWFnZVwiLCBzcmM6IFwiL3N0YXRpYy9pbWFnZXMvbG9hZGVyLmdpZlwiLCBhbHQ6IFwiTG9hZGluZy4uLlwifSlcbiAgICAgICAgICAgIClcbiAgICB9XG59KTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXVhV3R2YkdGNVoyOXNkV0l2ZDI5eWEzTndZV05sTDIxNUwydHBaSE4wWVhRdmEybGtjM1JoZEM5amJHbGxiblF2YzNKakwyTnZiWEJ2Ym1WdWRITXZiRzloWkdsdVp5NXFjM2dpWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanRCUVVGQkxFbEJRVWtzUzBGQlN5eEhRVUZITEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRCUVVNM1FpeEpRVUZKTEZOQlFWTXNSMEZCUnl4UFFVRlBMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hKUVVGSkxGTkJRVk1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNjMEpCUVhOQ0xFTkJRVU1zUTBGQlF6dEJRVU5vUkN4SlFVRkpMRTFCUVUwc1IwRkJSeXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdPMEZCUlM5Q0xHOURRVUZ2UXl4MVFrRkJRVHRKUVVOb1F5eE5RVUZOTEVWQlFVVTdVVUZEU2l4TlFVRk5MRU5CUVVNc1VVRkJVU3hEUVVGRExGTkJRVk1zUlVGQlJTeFpRVUZaTEVOQlFVTTdVVUZEZUVNc1RVRkJUU3hEUVVGRExGRkJRVkVzUTBGQlF5eFRRVUZUTEVWQlFVVXNXVUZCV1N4RFFVRkRPMHRCUXpORE8wbEJRMFFzVlVGQlZTeEZRVUZGTEZOQlFWTXNTMEZCU3l4RFFVRkRPMUZCUTNaQ0xFbEJRVWtzUzBGQlN5eEpRVUZKTEZOQlFWTXNRMEZCUXp0WlFVTnVRaXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTTdVMEZEWml4TlFVRk5PMWxCUTBnc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFOQlEyWTdTMEZEU2p0SlFVTkVMR1ZCUVdVc1JVRkJSU3haUVVGWk8xRkJRM3BDTEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRE8wdEJRM3BDTzBsQlEwUXNTVUZCU1N4RlFVRkZMRlZCUVZVN1VVRkRXaXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRMmhETzBsQlEwUXNTVUZCU1N4RlFVRkZMRlZCUVZVN1VVRkRXaXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRXRCUVVzc1EwRkJReXhEUVVGRE8wdEJRMnBETzBsQlEwUXNUVUZCVFN4RlFVRkZMRlZCUVZVN1VVRkRaQ3hQUVVGUExHOUNRVUZCTEV0QlFVa3NSVUZCUVN4RFFVRkJMRU5CUVVNc1UwRkJRU3hGUVVGVExFTkJRVVVzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1JVRkJSU3hIUVVGSExGRkJRVkVzUlVGQlF5eERRVUZETEVWQlFVRXNSVUZCUlN4RFFVRkRMRk5CUVZVc1EwRkJRU3hGUVVGQk8yZENRVU12UkN4dlFrRkJRU3hMUVVGSkxFVkJRVUVzUTBGQlFTeERRVUZETEVWQlFVRXNSVUZCUlN4RFFVRkRMR1ZCUVVFc1JVRkJaU3hEUVVGRExFZEJRVUVzUlVGQlJ5eERRVUZETERKQ1FVRkJMRVZCUVRKQ0xFTkJRVU1zUjBGQlFTeEZRVUZITEVOQlFVTXNXVUZCV1N4RFFVRkJMRU5CUVVjc1EwRkJRVHRaUVVONlJTeERRVUZCTzB0QlEySTdRMEZEU2l4RFFVRkRJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdVbVZoWTNRZ1BTQnlaWEYxYVhKbEtDZHlaV0ZqZENjcE8xeHVkbUZ5SUVGMWRHaFRkRzl5WlNBOUlISmxjWFZwY21Vb0p5NHVMM04wYjNKbGN5OWhkWFJvTFhOMGIzSmxKeWs3WEc1MllYSWdTMmxrYzFOMGIzSmxJRDBnY21WeGRXbHlaU2duTGk0dmMzUnZjbVZ6TDJ0cFpITXRjM1J2Y21VbktUdGNiblpoY2lCU1pXWnNkWGdnUFNCeVpYRjFhWEpsS0NkeVpXWnNkWGduS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlNaV0ZqZEM1amNtVmhkR1ZEYkdGemN5aDdYRzRnSUNBZ2JXbDRhVzV6T2lCYlhHNGdJQ0FnSUNBZ0lGSmxabXgxZUM1c2FYTjBaVzVVYnloQmRYUm9VM1J2Y21Vc0lGd2lhR0Z1Wkd4bFFYVjBhRndpS1N4Y2JpQWdJQ0FnSUNBZ1VtVm1iSFY0TG14cGMzUmxibFJ2S0V0cFpITlRkRzl5WlN3Z1hDSm9ZVzVrYkdWQmRYUm9YQ0lwWEc0Z0lDQWdYU3hjYmlBZ0lDQm9ZVzVrYkdWQmRYUm9PaUJtZFc1amRHbHZiaWhsZG1WdWRDbDdYRzRnSUNBZ0lDQWdJR2xtSUNobGRtVnVkQ0E5UFNBbmJHOWhaR2x1WnljcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXphRzkzS0NrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtaHBaR1VvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwc1hHNGdJQ0FnWjJWMFNXNXBkR2xoYkZOMFlYUmxPaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCN1lXTjBhWFpsT2lCbVlXeHpaWDFjYmlBZ0lDQjlMRnh1SUNBZ0lITm9iM2M2SUdaMWJtTjBhVzl1S0NsN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YzJWMFUzUmhkR1VvZTJGamRHbDJaVG9nZEhKMVpYMHBYRzRnSUNBZ2ZTeGNiaUFnSUNCb2FXUmxPaUJtZFc1amRHbHZiaWdwZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbk5sZEZOMFlYUmxLSHRoWTNScGRtVTZJR1poYkhObGZTbGNiaUFnSUNCOUxGeHVJQ0FnSUhKbGJtUmxjam9nWm5WdVkzUnBiMjRvS1h0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUR4a2FYWWdZMnhoYzNOT1lXMWxQWHQwYUdsekxuTjBZWFJsTG1GamRHbDJaU0EvSUNjbklEb2dKMmhwWkdSbGJpZDlJR2xrUFZ3aWJHOWhaR2x1WjF3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEeHBiV2NnYVdROVhDSnNiMkZrYVc1bkxXbHRZV2RsWENJZ2MzSmpQVndpTDNOMFlYUnBZeTlwYldGblpYTXZiRzloWkdWeUxtZHBabHdpSUdGc2REMWNJa3h2WVdScGJtY3VMaTVjSWlBdlBseHVJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ2ZWeHVmU2s3SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBSZWFjdCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWFjdCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVhY3QnXSA6IG51bGwpO1xudmFyIFJlYWN0Qm9vdHN0cmFwID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0Qm9vdHN0cmFwJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdEJvb3RzdHJhcCddIDogbnVsbCk7XG52YXIgSW5wdXQgPSBSZWFjdEJvb3RzdHJhcC5JbnB1dDtcbnZhciBCdXR0b25JbnB1dCA9IFJlYWN0Qm9vdHN0cmFwLkJ1dHRvbklucHV0O1xuXG52YXIgQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtlbWFpbDogJycsIHBhc3N3b3JkOiAnJ307XG4gICAgfSxcbiAgICBsb2dpbihldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIEFjdGlvbnMuTG9naW4odGhpcy5zdGF0ZS5lbWFpbCwgdGhpcy5zdGF0ZS5wYXNzd29yZCk7XG4gICAgfSxcbiAgICBoYW5kbGVFbWFpbENoYW5nZSgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlbWFpbDogdGhpcy5yZWZzLmVtYWlsLmdldFZhbHVlKCl9KVxuICAgIH0sXG4gICAgaGFuZGxlUGFzc3dvcmRDaGFuZ2UoKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFzc3dvcmQ6IHRoaXMucmVmcy5wYXNzd29yZC5nZXRWYWx1ZSgpfSlcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCBudWxsLCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwge3R5cGU6IFwiZW1haWxcIiwgbGFiZWw6IFwiRW1haWwgQWRkcmVzc1wiLCBwbGFjZWhvbGRlcjogXCJFbnRlciBlbWFpbFwiLCBcbiAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmVtYWlsLCBcbiAgICAgICAgICAgICAgIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUVtYWlsQ2hhbmdlLCBcbiAgICAgICAgICAgICAgIGhhc0ZlZWRiYWNrOiB0cnVlLCBcbiAgICAgICAgICAgICAgIGFkZG9uQmVmb3JlOiBcIkBcIiwgXG4gICAgICAgICAgICAgICByZWY6IFwiZW1haWxcIn1cbiAgICAgICAgKSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHt0eXBlOiBcInBhc3N3b3JkXCIsIGxhYmVsOiBcIlBhc3N3b3JkXCIsIFxuICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc3RhdGUucGFzc3dvcmQsIFxuICAgICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMuaGFuZGxlUGFzc3dvcmRDaGFuZ2UsIFxuICAgICAgICAgICAgICAgcmVmOiBcInBhc3N3b3JkXCJ9XG4gICAgICAgICksIFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbklucHV0LCB7dHlwZTogXCJzdWJtaXRcIiwgb25DbGljazogdGhpcy5sb2dpbiwgdmFsdWU6IFwiTG9naW5cIn0pXG4gICAgKVxuICAgIClcbiAgfVxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMMk52YlhCdmJtVnVkSE12Ykc5bmFXNHRabTl5YlM1cWMzZ2lYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTEVsQlFVa3NTMEZCU3l4SFFVRkhMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dEJRVU0zUWl4SlFVRkpMR05CUVdNc1IwRkJSeXhQUVVGUExFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1EwRkJRenRCUVVOb1JDeEpRVUZKTEV0QlFVc3NSMEZCUnl4alFVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRE8wRkJRMnBETEVsQlFVa3NWMEZCVnl4SFFVRkhMR05CUVdNc1EwRkJReXhYUVVGWExFTkJRVU03TzBGQlJUZERMRWxCUVVrc1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXpzN1FVRkZjRU1zYjBOQlFXOURMSFZDUVVGQk8wbEJRMmhETEdWQlFXVXNSMEZCUnp0UlFVTmtMRTlCUVU4c1EwRkJReXhMUVVGTExFVkJRVVVzUlVGQlJTeEZRVUZGTEZGQlFWRXNSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRMUVVOd1F6dEpRVU5FTEV0QlFVc3NUMEZCVHp0UlFVTlNMRXRCUVVzc1EwRkJReXhqUVVGakxFVkJRVVVzUTBGQlF6dFJRVU4yUWl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdTMEZEZUVRN1NVRkRSQ3hwUWtGQmFVSXNSVUZCUlR0UlFVTm1MRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTXNRMEZCUXp0TFFVTnlSRHRKUVVORUxHOUNRVUZ2UWl4RlFVRkZPMUZCUTJ4Q0xFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4UlFVRlJMRVZCUVVVc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1EwRkJRenRMUVVNelJEdEpRVU5FTEUxQlFVMHNSVUZCUlN4WFFVRlhPMGxCUTI1Q08wbEJRMEVzYjBKQlFVRXNUVUZCU3l4RlFVRkJMRWxCUVVNc1JVRkJRVHRSUVVOR0xHOUNRVUZETEV0QlFVc3NSVUZCUVN4RFFVRkJMRU5CUVVNc1NVRkJRU3hGUVVGSkxFTkJRVU1zVDBGQlFTeEZRVUZQTEVOQlFVTXNTMEZCUVN4RlFVRkxMRU5CUVVNc1pVRkJRU3hGUVVGbExFVkJRVVVzVjBGQlFTeEZRVUZYTEVOQlFVTXNZVUZCUVN4RlFVRmhPMlZCUXpkRUxFdEJRVUVzUlVGQlN5eERRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhGUVVGRE8yVkJRM2hDTEZGQlFVRXNSVUZCVVN4RFFVRkZMRWxCUVVrc1EwRkJReXhwUWtGQmFVSXNSVUZCUXp0bFFVTnFReXhYUVVGQkxFVkJRVmNzUTBGQlJTeEpRVUZKTEVWQlFVTTdaVUZEYkVJc1YwRkJRU3hGUVVGWExFTkJRVU1zUjBGQlFTeEZRVUZITzJWQlEyWXNSMEZCUVN4RlFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGQk8xRkJRMmhDTEVOQlFVRXNSVUZCUVR0UlFVTkdMRzlDUVVGRExFdEJRVXNzUlVGQlFTeERRVUZCTEVOQlFVTXNTVUZCUVN4RlFVRkpMRU5CUVVNc1ZVRkJRU3hGUVVGVkxFTkJRVU1zUzBGQlFTeEZRVUZMTEVOQlFVTXNWVUZCUVN4RlFVRlZPMlZCUTJoRExFdEJRVUVzUlVGQlN5eERRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1VVRkJVU3hGUVVGRE8yVkJRek5DTEZGQlFVRXNSVUZCVVN4RFFVRkZMRWxCUVVrc1EwRkJReXh2UWtGQmIwSXNSVUZCUXp0bFFVTndReXhIUVVGQkxFVkJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVRTdVVUZEYmtJc1EwRkJRU3hGUVVGQk8xRkJRMFlzYjBKQlFVTXNWMEZCVnl4RlFVRkJMRU5CUVVFc1EwRkJReXhKUVVGQkxFVkJRVWtzUTBGQlF5eFJRVUZCTEVWQlFWRXNRMEZCUXl4UFFVRkJMRVZCUVU4c1EwRkJSU3hKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZETEVOQlFVTXNTMEZCUVN4RlFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRkxFTkJRVUU3U1VGRE5VUXNRMEZCUVR0TFFVTk9PMGRCUTBZN1EwRkRSaXhEUVVGRElpd2labWxzWlNJNkltZGxibVZ5WVhSbFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUoyWVhJZ1VtVmhZM1FnUFNCeVpYRjFhWEpsS0NkeVpXRmpkQ2NwTzF4dWRtRnlJRkpsWVdOMFFtOXZkSE4wY21Gd0lEMGdjbVZ4ZFdseVpTZ25jbVZoWTNRdFltOXZkSE4wY21Gd0p5azdYRzUyWVhJZ1NXNXdkWFFnUFNCU1pXRmpkRUp2YjNSemRISmhjQzVKYm5CMWREdGNiblpoY2lCQ2RYUjBiMjVKYm5CMWRDQTlJRkpsWVdOMFFtOXZkSE4wY21Gd0xrSjFkSFJ2YmtsdWNIVjBPMXh1WEc1MllYSWdRV04wYVc5dWN5QTlJSEpsY1hWcGNtVW9KeTR1TDJGamRHbHZibk1uS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlNaV0ZqZEM1amNtVmhkR1ZEYkdGemN5aDdYRzRnSUNBZ1oyVjBTVzVwZEdsaGJGTjBZWFJsS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2UyVnRZV2xzT2lBbkp5d2djR0Z6YzNkdmNtUTZJQ2NuZlR0Y2JpQWdJQ0I5TEZ4dUlDQWdJR3h2WjJsdUtHVjJaVzUwS1h0Y2JpQWdJQ0FnSUNBZ1pYWmxiblF1Y0hKbGRtVnVkRVJsWm1GMWJIUW9LVHRjYmlBZ0lDQWdJQ0FnUVdOMGFXOXVjeTVNYjJkcGJpaDBhR2x6TG5OMFlYUmxMbVZ0WVdsc0xDQjBhR2x6TG5OMFlYUmxMbkJoYzNOM2IzSmtLVHRjYmlBZ0lDQjlMRnh1SUNBZ0lHaGhibVJzWlVWdFlXbHNRMmhoYm1kbEtDbDdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMyVjBVM1JoZEdVb2UyVnRZV2xzT2lCMGFHbHpMbkpsWm5NdVpXMWhhV3d1WjJWMFZtRnNkV1VvS1gwcFhHNGdJQ0FnZlN4Y2JpQWdJQ0JvWVc1a2JHVlFZWE56ZDI5eVpFTm9ZVzVuWlNncGUxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5ObGRGTjBZWFJsS0h0d1lYTnpkMjl5WkRvZ2RHaHBjeTV5WldaekxuQmhjM04zYjNKa0xtZGxkRlpoYkhWbEtDbDlLVnh1SUNBZ0lIMHNYRzRnSUNBZ2NtVnVaR1Z5T2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNCeVpYUjFjbTRnS0Z4dUlDQWdJRHhtYjNKdFBseHVJQ0FnSUNBZ0lDQThTVzV3ZFhRZ2RIbHdaVDFjSW1WdFlXbHNYQ0lnYkdGaVpXdzlYQ0pGYldGcGJDQkJaR1J5WlhOelhDSWdJSEJzWVdObGFHOXNaR1Z5UFZ3aVJXNTBaWElnWlcxaGFXeGNJbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZzZFdVOWUzUm9hWE11YzNSaGRHVXVaVzFoYVd4OVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdmJrTm9ZVzVuWlQxN2RHaHBjeTVvWVc1a2JHVkZiV0ZwYkVOb1lXNW5aWDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2hoYzBabFpXUmlZV05yUFh0MGNuVmxmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZV1JrYjI1Q1pXWnZjbVU5WENKQVhDSmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxaajFjSW1WdFlXbHNYQ0pjYmlBZ0lDQWdJQ0FnTHo1Y2JpQWdJQ0FnSUNBZ1BFbHVjSFYwSUhSNWNHVTlYQ0p3WVhOemQyOXlaRndpSUd4aFltVnNQVndpVUdGemMzZHZjbVJjSWx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1Gc2RXVTllM1JvYVhNdWMzUmhkR1V1Y0dGemMzZHZjbVI5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2YmtOb1lXNW5aVDE3ZEdocGN5NW9ZVzVrYkdWUVlYTnpkMjl5WkVOb1lXNW5aWDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsWmoxY0luQmhjM04zYjNKa1hDSmNiaUFnSUNBZ0lDQWdMejVjYmlBZ0lDQWdJQ0FnUEVKMWRIUnZia2x1Y0hWMElIUjVjR1U5WENKemRXSnRhWFJjSWlCdmJrTnNhV05yUFh0MGFHbHpMbXh2WjJsdWZTQjJZV3gxWlQxY0lreHZaMmx1WENJdlBseHVJQ0FnSUR3dlptOXliVDVjYmlBZ0lDQXBYRzRnSUgxY2JuMHBPeUpkZlE9PSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBSZWFjdCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWFjdCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVhY3QnXSA6IG51bGwpO1xudmFyIFJlZmx1eCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWZsdXgnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlZmx1eCddIDogbnVsbCk7XG52YXIgQXV0aFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL2F1dGgtc3RvcmUnKTtcbnZhciBMb2dpbkZvcm0gPSByZXF1aXJlKCcuL2xvZ2luLWZvcm0nKTtcbnZhciBNb2RhbFdpbmRvdyA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuICAgIG1peGluczogW1xuICAgICAgICBSZWZsdXgubGlzdGVuVG8oQXV0aFN0b3JlLCBcImF1dGhlbnRpY2F0ZWRcIilcbiAgICBdLFxuICAgIGF1dGhlbnRpY2F0ZWQoZXZlbnQpe1xuICAgICAgICBpZiAoZXZlbnQgPT0gJ2F1dGhlbnRpY2F0ZWQnKXt0aGlzLnJlZnMubW9kYWwuY2xvc2UoKTt9XG4gICAgfSxcbiAgICBvcGVuOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJlZnMubW9kYWwub3BlbigpXG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxXaW5kb3csIHtyZWY6IFwibW9kYWxcIiwgdGl0bGU6IFwiTG9naW5cIn0sIFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMb2dpbkZvcm0sIG51bGwpXG4gICAgICAgICAgICApXG4gICAgfVxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMMk52YlhCdmJtVnVkSE12Ykc5bmFXNHRkMmx1Wkc5M0xtcHplQ0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFc1NVRkJTU3hMUVVGTExFZEJRVWNzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPMEZCUXpkQ0xFbEJRVWtzVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRCUVVNdlFpeEpRVUZKTEZOQlFWTXNSMEZCUnl4UFFVRlBMRU5CUVVNc2MwSkJRWE5DTEVOQlFVTXNRMEZCUXp0QlFVTm9SQ3hKUVVGSkxGTkJRVk1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNN1FVRkRlRU1zU1VGQlNTeFhRVUZYTEVkQlFVY3NUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE96dEJRVVZ5UXl4dlEwRkJiME1zZFVKQlFVRTdTVUZEYUVNc1RVRkJUU3hGUVVGRk8xRkJRMG9zVFVGQlRTeERRVUZETEZGQlFWRXNRMEZCUXl4VFFVRlRMRVZCUVVVc1pVRkJaU3hEUVVGRE8wdEJRemxETzBsQlEwUXNZVUZCWVN4UFFVRlBPMUZCUTJoQ0xFbEJRVWtzUzBGQlN5eEpRVUZKTEdWQlFXVXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NSVUZCUlN4RFFVRkRMRU5CUVVNN1MwRkRNVVE3U1VGRFJDeEpRVUZKTEVWQlFVVXNWVUZCVlR0UlFVTmFMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NSVUZCUlR0TFFVTjZRanRKUVVORUxFMUJRVTBzUlVGQlJTeFpRVUZaTzFGQlEyaENMRTlCUVU4c2IwSkJRVU1zVjBGQlZ5eEZRVUZCTEVOQlFVRXNRMEZCUXl4SFFVRkJMRVZCUVVjc1EwRkJReXhQUVVGQkxFVkJRVThzUTBGQlF5eExRVUZCTEVWQlFVc3NRMEZCUXl4UFFVRlJMRU5CUVVFc1JVRkJRVHRaUVVNeFF5eHZRa0ZCUXl4VFFVRlRMRVZCUVVFc1NVRkJSU3hEUVVGQk8xbEJRMFVzUTBGQlFUdExRVU55UWp0RFFVTktMRU5CUVVNaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJblpoY2lCU1pXRmpkQ0E5SUhKbGNYVnBjbVVvSjNKbFlXTjBKeWs3WEc1MllYSWdVbVZtYkhWNElEMGdjbVZ4ZFdseVpTZ25jbVZtYkhWNEp5azdYRzUyWVhJZ1FYVjBhRk4wYjNKbElEMGdjbVZ4ZFdseVpTZ25MaTR2YzNSdmNtVnpMMkYxZEdndGMzUnZjbVVuS1R0Y2JuWmhjaUJNYjJkcGJrWnZjbTBnUFNCeVpYRjFhWEpsS0NjdUwyeHZaMmx1TFdadmNtMG5LVHRjYm5aaGNpQk5iMlJoYkZkcGJtUnZkeUE5SUhKbGNYVnBjbVVvSnk0dmJXOWtZV3duS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlNaV0ZqZEM1amNtVmhkR1ZEYkdGemN5aDdYRzRnSUNBZ2JXbDRhVzV6T2lCYlhHNGdJQ0FnSUNBZ0lGSmxabXgxZUM1c2FYTjBaVzVVYnloQmRYUm9VM1J2Y21Vc0lGd2lZWFYwYUdWdWRHbGpZWFJsWkZ3aUtWeHVJQ0FnSUYwc1hHNGdJQ0FnWVhWMGFHVnVkR2xqWVhSbFpDaGxkbVZ1ZENsN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsZG1WdWRDQTlQU0FuWVhWMGFHVnVkR2xqWVhSbFpDY3BlM1JvYVhNdWNtVm1jeTV0YjJSaGJDNWpiRzl6WlNncE8zMWNiaUFnSUNCOUxGeHVJQ0FnSUc5d1pXNDZJR1oxYm1OMGFXOXVLQ2w3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbVZtY3k1dGIyUmhiQzV2Y0dWdUtDbGNiaUFnSUNCOUxGeHVJQ0FnSUhKbGJtUmxjam9nWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1BFMXZaR0ZzVjJsdVpHOTNJSEpsWmoxY0ltMXZaR0ZzWENJZ2RHbDBiR1U5WENKTWIyZHBibHdpUGx4dUlDQWdJQ0FnSUNBZ0lDQWdQRXh2WjJsdVJtOXliUzgrWEc0Z0lDQWdJQ0FnSUNBZ0lDQThMMDF2WkdGc1YybHVaRzkzUGx4dUlDQWdJSDFjYm4wcE95SmRmUT09IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG52YXIgUmVhY3RCb290c3RyYXAgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3RCb290c3RyYXAnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0Qm9vdHN0cmFwJ10gOiBudWxsKTtcbnZhciBNb2RhbCA9IFJlYWN0Qm9vdHN0cmFwLk1vZGFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJleHBvcnRzXCIsXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge3JldHVybiB7c2hvd01vZGFsOiBmYWxzZX07fSxcbiAgICBjbG9zZSgpIHt0aGlzLnNldFN0YXRlKHtzaG93TW9kYWw6IGZhbHNlfSk7fSxcbiAgICBvcGVuKCkge3RoaXMuc2V0U3RhdGUoe3Nob3dNb2RhbDogdHJ1ZX0pO30sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwsIHtzaG93OiB0aGlzLnN0YXRlLnNob3dNb2RhbCwgb25IaWRlOiB0aGlzLmNsb3NlfSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwuSGVhZGVyLCB7Y2xvc2VCdXR0b246IHRydWV9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwuVGl0bGUsIG51bGwsIHRoaXMucHJvcHMudGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1vZGFsLkJvZHksIG51bGwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpXG4gICAgfVxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMMk52YlhCdmJtVnVkSE12Ylc5a1lXd3Vhbk40SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3UVVGQlFTeEpRVUZKTEV0QlFVc3NSMEZCUnl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03UVVGRE4wSXNTVUZCU1N4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRU5CUVVNN1FVRkRhRVFzU1VGQlNTeExRVUZMTEVkQlFVY3NZMEZCWXl4RFFVRkRMRXRCUVVzc1EwRkJRenM3UVVGRmFrTXNiME5CUVc5RExIVkNRVUZCTzBsQlEyaERMR1ZCUVdVc1IwRkJSeXhEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVNNVF5eExRVUZMTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zVTBGQlV5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVNMVF5eEpRVUZKTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zVTBGQlV5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVNeFF5eE5RVUZOTEVWQlFVVXNXVUZCV1R0UlFVTm9RanRaUVVOSkxHOUNRVUZCTEV0QlFVa3NSVUZCUVN4SlFVRkRMRVZCUVVFN1owSkJRMFFzYjBKQlFVTXNTMEZCU3l4RlFVRkJMRU5CUVVFc1EwRkJReXhKUVVGQkxFVkJRVWtzUTBGQlJTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1JVRkJReXhEUVVGRExFMUJRVUVzUlVGQlRTeERRVUZGTEVsQlFVa3NRMEZCUXl4TFFVRlBMRU5CUVVFc1JVRkJRVHR2UWtGRGJrUXNiMEpCUVVNc1dVRkJXU3hGUVVGQkxFTkJRVUVzUTBGQlF5eFhRVUZCTEVWQlFVTXNRMEZCUVN4RlFVRkJPM2RDUVVOWUxHOUNRVUZETEZkQlFWY3NSVUZCUVN4SlFVRkRMRVZCUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZ2UWl4RFFVRkJPMjlDUVVOc1F5eERRVUZCTEVWQlFVRTdiMEpCUTJZc2IwSkJRVU1zVlVGQlZTeEZRVUZCTEVsQlFVTXNSVUZCUVR0M1FrRkRVQ3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkZPMjlDUVVOa0xFTkJRVUU3WjBKQlExUXNRMEZCUVR0WlFVTk9MRU5CUVVFc1EwRkJRenRMUVVOa08wTkJRMG9zUTBGQlF5SXNJbVpwYkdVaU9pSm5aVzVsY21GMFpXUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpZG1GeUlGSmxZV04wSUQwZ2NtVnhkV2x5WlNnbmNtVmhZM1FuS1R0Y2JuWmhjaUJTWldGamRFSnZiM1J6ZEhKaGNDQTlJSEpsY1hWcGNtVW9KM0psWVdOMExXSnZiM1J6ZEhKaGNDY3BPMXh1ZG1GeUlFMXZaR0ZzSUQwZ1VtVmhZM1JDYjI5MGMzUnlZWEF1VFc5a1lXdzdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnVW1WaFkzUXVZM0psWVhSbFEyeGhjM01vZTF4dUlDQWdJR2RsZEVsdWFYUnBZV3hUZEdGMFpTZ3BJSHR5WlhSMWNtNGdlM05vYjNkTmIyUmhiRG9nWm1Gc2MyVjlPMzBzWEc0Z0lDQWdZMnh2YzJVb0tTQjdkR2hwY3k1elpYUlRkR0YwWlNoN2MyaHZkMDF2WkdGc09pQm1ZV3h6WlgwcE8zMHNYRzRnSUNBZ2IzQmxiaWdwSUh0MGFHbHpMbk5sZEZOMFlYUmxLSHR6YUc5M1RXOWtZV3c2SUhSeWRXVjlLVHQ5TEZ4dUlDQWdJSEpsYm1SbGNqb2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnS0Z4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFRXOWtZV3dnYzJodmR6MTdkR2hwY3k1emRHRjBaUzV6YUc5M1RXOWtZV3g5SUc5dVNHbGtaVDE3ZEdocGN5NWpiRzl6WlgwK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHhOYjJSaGJDNUlaV0ZrWlhJZ1kyeHZjMlZDZFhSMGIyNCtYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThUVzlrWVd3dVZHbDBiR1UrZTNSb2FYTXVjSEp2Y0hNdWRHbDBiR1Y5UEM5TmIyUmhiQzVVYVhSc1pUNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5TmIyUmhiQzVJWldGa1pYSStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4TmIyUmhiQzVDYjJSNVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2V5QjBhR2x6TG5CeWIzQnpMbU5vYVd4a2NtVnVJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1BDOU5iMlJoYkM1Q2IyUjVQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2VFc5a1lXdytYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajRwWEc0Z0lDQWdmVnh1ZlNrN0lsMTkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUmVhY3QgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiZXhwb3J0c1wiLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInRleHQtY2VudGVyXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIldlbGNvbWUgdG8gdGhlIEtpZHN0YXQhXCIpLCBcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge3NyYzogXCJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzQvNDYvQmFieTIuZ2lmXCJ9KSwgXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlRoaXMgYSB3ZWIgc2l0ZSwgd2hlcmUgeW91IGNhbiB0cmFjayBob3cgeW91ciBiYWJ5IGdyb3dzIVwiKVxuICAgICAgICApXG4gICAgfVxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMMk52YlhCdmJtVnVkSE12Y0hWaWJHbGpMV2x1WkdWNExtcHplQ0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFc1NVRkJTU3hMUVVGTExFZEJRVWNzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPenRCUVVVM1FpeHZRMEZCYjBNc2RVSkJRVUU3TzBsQlJXaERMRTFCUVUwc1JVRkJSU3hWUVVGVk8xRkJRMlFzVDBGQlR5eHZRa0ZCUVN4TFFVRkpMRVZCUVVFc1EwRkJRU3hEUVVGRExGTkJRVUVzUlVGQlV5eERRVUZETEdGQlFXTXNRMEZCUVN4RlFVRkJPMWxCUTJoRExHOUNRVUZCTEVsQlFVY3NSVUZCUVN4SlFVRkRMRVZCUVVFc2VVSkJRVFJDTEVOQlFVRXNSVUZCUVR0WlFVTm9ReXh2UWtGQlFTeExRVUZKTEVWQlFVRXNRMEZCUVN4RFFVRkRMRWRCUVVFc1JVRkJSeXhEUVVGRExDdEVRVUVyUkN4RFFVRkZMRU5CUVVFc1JVRkJRVHRaUVVNeFJTeHZRa0ZCUVN4SFFVRkZMRVZCUVVFc1NVRkJReXhGUVVGQkxESkVRVUUyUkN4RFFVRkJPMUZCUXpsRUxFTkJRVUU3UzBGRFZEdERRVU5LTEVOQlFVTWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW5aaGNpQlNaV0ZqZENBOUlISmxjWFZwY21Vb0ozSmxZV04wSnlrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdVbVZoWTNRdVkzSmxZWFJsUTJ4aGMzTW9lMXh1WEc0Z0lDQWdjbVZ1WkdWeU9pQm1kVzVqZEdsdmJpZ3BlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdQR1JwZGlCamJHRnpjMDVoYldVOVhDSjBaWGgwTFdObGJuUmxjbHdpUGx4dUlDQWdJQ0FnSUNBZ0lDQWdQR2d4UGxkbGJHTnZiV1VnZEc4Z2RHaGxJRXRwWkhOMFlYUWhQQzlvTVQ1Y2JpQWdJQ0FnSUNBZ0lDQWdJRHhwYldjZ2MzSmpQVndpYUhSMGNITTZMeTkxY0d4dllXUXVkMmxyYVcxbFpHbGhMbTl5Wnk5M2FXdHBjR1ZrYVdFdlkyOXRiVzl1Y3k4MEx6UTJMMEpoWW5reUxtZHBabHdpTHo1Y2JpQWdJQ0FnSUNBZ0lDQWdJRHh3UGxSb2FYTWdZU0IzWldJZ2MybDBaU3dnZDJobGNtVWdlVzkxSUdOaGJpQjBjbUZqYXlCb2IzY2dlVzkxY2lCaVlXSjVJR2R5YjNkeklUd3ZjRDVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ2ZWeHVmU2s3SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBSZWZsdXggPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVmbHV4J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWZsdXgnXSA6IG51bGwpO1xudmFyIEFwaSA9IHJlcXVpcmUoJy4uL2FwaScpO1xudmFyIEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBsaXN0ZW5hYmxlczogW0FjdGlvbnNdLFxuICAgIHRyaWdnZXJBdXRoZW50aWNhdGVkKCl7XG4gICAgICAgIHRoaXMudHJpZ2dlcignYXV0aGVudGljYXRlZCcpO1xuICAgIH0sXG4gICAgdHJpZ2dlckxvZ291dCgpe1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2xvZ291dCcpO1xuICAgIH0sXG4gICAgdHJpZ2dlckxvYWRpbmcoKXtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2FkaW5nJyk7XG4gICAgfSxcbiAgICBMb2dpbihlbWFpbCwgcGFzc3dvcmQpe1xuICAgICAgICB0aGlzLnRyaWdnZXJMb2FkaW5nKCk7XG4gICAgICAgIHZhciBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQXBpLnBvc3QoJ2F1dGgnLCBib2R5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBBcGkuc3RvcmVUb2tlbihkYXRhWydhY2Nlc3NfdG9rZW4nXSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXV0aGVudGljYXRlZCgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuICAgIENoZWNrQXV0aG9yaXphdGlvbigpe1xuICAgICAgICB0aGlzLnRyaWdnZXJMb2FkaW5nKCk7XG4gICAgICAgIHZhciB0b2tlbiA9IEFwaS5nZXRUb2tlbigpO1xuICAgICAgICBpZiAodG9rZW4pe1xuICAgICAgICAgICAgQXBpLmF1dGhvcml6ZWRHZXQoJ2NoZWNrLXRva2VuJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJBdXRoZW50aWNhdGVkKCk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckxvZ291dCgpXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyTG9nb3V0KCk7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgTG9nb3V0KCl7XG4gICAgICAgIEFwaS5yZW1vdmVUb2tlbigpO1xuICAgICAgICB0aGlzLnRyaWdnZXJMb2dvdXQoKTtcbiAgICB9XG59KTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTlWYzJWeWN5OXVhV3R2YkdGNVoyOXNkV0l2ZDI5eWEzTndZV05sTDIxNUwydHBaSE4wWVhRdmEybGtjM1JoZEM5amJHbGxiblF2YzNKakwzTjBiM0psY3k5aGRYUm9MWE4wYjNKbExtcHplQ0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPMEZCUVVFc1NVRkJTU3hOUVVGTkxFZEJRVWNzVDBGQlR5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMEZCUXk5Q0xFbEJRVWtzUjBGQlJ5eEhRVUZITEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRCUVVNMVFpeEpRVUZKTEU5QlFVOHNSMEZCUnl4UFFVRlBMRU5CUVVNc1dVRkJXU3hEUVVGRExFTkJRVU03TzBGQlJYQkRMRTFCUVUwc1EwRkJReXhQUVVGUExFZEJRVWNzVFVGQlRTeERRVUZETEZkQlFWY3NRMEZCUXp0SlFVTm9ReXhYUVVGWExFVkJRVVVzUTBGQlF5eFBRVUZQTEVOQlFVTTdTVUZEZEVJc2IwSkJRVzlDTEVWQlFVVTdVVUZEYkVJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eGxRVUZsTEVOQlFVTXNRMEZCUXp0TFFVTnFRenRKUVVORUxHRkJRV0VzUlVGQlJUdFJRVU5ZTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03UzBGRE1VSTdTVUZEUkN4alFVRmpMRVZCUVVVN1VVRkRXaXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMHRCUXpOQ08wbEJRMFFzUzBGQlN5eHBRa0ZCYVVJN1VVRkRiRUlzU1VGQlNTeERRVUZETEdOQlFXTXNSVUZCUlN4RFFVRkRPMUZCUTNSQ0xFbEJRVWtzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNN1dVRkRkRUlzUzBGQlN5eEZRVUZGTEV0QlFVczdXVUZEV2l4UlFVRlJMRVZCUVVVc1VVRkJVVHRUUVVOeVFpeERRVUZETEVOQlFVTTdVVUZEU0N4UFFVRlBMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTEVsQlFVa3NRMEZCUXp0aFFVTjRRaXhKUVVGSkxFTkJRVU1zVlVGQlZTeEpRVUZKTEVWQlFVVTdaMEpCUTJ4Q0xFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzSkRMRWxCUVVrc1EwRkJReXh2UWtGQmIwSXNSVUZCUlN4RFFVRkRPMkZCUXk5Q0xFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkRja0k3U1VGRFJDeHJRa0ZCYTBJc1JVRkJSVHRSUVVOb1FpeEpRVUZKTEVOQlFVTXNZMEZCWXl4RlFVRkZMRU5CUVVNN1VVRkRkRUlzU1VGQlNTeExRVUZMTEVkQlFVY3NSMEZCUnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRE8xRkJRek5DTEVsQlFVa3NTMEZCU3l4RFFVRkRPMWxCUTA0c1IwRkJSeXhEUVVGRExHRkJRV0VzUTBGQlF5eGhRVUZoTEVOQlFVTTdhVUpCUXpOQ0xFbEJRVWtzUTBGQlF5eFZRVUZWTEVsQlFVa3NSVUZCUlR0dlFrRkRiRUlzU1VGQlNTeERRVUZETEc5Q1FVRnZRaXhGUVVGRkxFTkJRVU03YVVKQlF5OUNMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzJsQ1FVTmFMRXRCUVVzc1EwRkJReXhUUVVGVExFdEJRVXNzUTBGQlF6dHZRa0ZEYkVJc1NVRkJTU3hEUVVGRExHRkJRV0VzUlVGQlJUdHBRa0ZEZGtJc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVMEZEY0VJc1RVRkJUVHRaUVVOSUxFbEJRVWtzUTBGQlF5eGhRVUZoTEVWQlFVVXNRMEZCUXp0QlFVTnFReXhUUVVGVE96dExRVVZLTzBsQlEwUXNUVUZCVFN4RlFVRkZPMUZCUTBvc1IwRkJSeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFGQlEyeENMRWxCUVVrc1EwRkJReXhoUVVGaExFVkJRVVVzUTBGQlF6dExRVU40UWp0RFFVTktMRU5CUVVNaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJblpoY2lCU1pXWnNkWGdnUFNCeVpYRjFhWEpsS0NkeVpXWnNkWGduS1R0Y2JuWmhjaUJCY0drZ1BTQnlaWEYxYVhKbEtDY3VMaTloY0drbktUdGNiblpoY2lCQlkzUnBiMjV6SUQwZ2NtVnhkV2x5WlNnbkxpNHZZV04wYVc5dWN5Y3BPMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUZKbFpteDFlQzVqY21WaGRHVlRkRzl5WlNoN1hHNGdJQ0FnYkdsemRHVnVZV0pzWlhNNklGdEJZM1JwYjI1elhTeGNiaUFnSUNCMGNtbG5aMlZ5UVhWMGFHVnVkR2xqWVhSbFpDZ3BlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuUnlhV2RuWlhJb0oyRjFkR2hsYm5ScFkyRjBaV1FuS1R0Y2JpQWdJQ0I5TEZ4dUlDQWdJSFJ5YVdkblpYSk1iMmR2ZFhRb0tYdGNiaUFnSUNBZ0lDQWdkR2hwY3k1MGNtbG5aMlZ5S0Nkc2IyZHZkWFFuS1R0Y2JpQWdJQ0I5TEZ4dUlDQWdJSFJ5YVdkblpYSk1iMkZrYVc1bktDbDdYRzRnSUNBZ0lDQWdJSFJvYVhNdWRISnBaMmRsY2lnbmJHOWhaR2x1WnljcE8xeHVJQ0FnSUgwc1hHNGdJQ0FnVEc5bmFXNG9aVzFoYVd3c0lIQmhjM04zYjNKa0tYdGNiaUFnSUNBZ0lDQWdkR2hwY3k1MGNtbG5aMlZ5VEc5aFpHbHVaeWdwTzF4dUlDQWdJQ0FnSUNCMllYSWdZbTlrZVNBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0h0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1Z0WVdsc09pQmxiV0ZwYkN4Y2JpQWdJQ0FnSUNBZ0lDQWdJSEJoYzNOM2IzSmtPaUJ3WVhOemQyOXlaRnh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUVGd2FTNXdiM04wS0NkaGRYUm9KeXdnWW05a2VTbGNiaUFnSUNBZ0lDQWdJQ0FnSUM1MGFHVnVLR1oxYm1OMGFXOXVJQ2hrWVhSaEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdRWEJwTG5OMGIzSmxWRzlyWlc0b1pHRjBZVnNuWVdOalpYTnpYM1J2YTJWdUoxMHBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWRISnBaMmRsY2tGMWRHaGxiblJwWTJGMFpXUW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHVZbWx1WkNoMGFHbHpLU2s3WEc0Z0lDQWdmU3hjYmlBZ0lDQkRhR1ZqYTBGMWRHaHZjbWw2WVhScGIyNG9LWHRjYmlBZ0lDQWdJQ0FnZEdocGN5NTBjbWxuWjJWeVRHOWhaR2x1WnlncE8xeHVJQ0FnSUNBZ0lDQjJZWElnZEc5clpXNGdQU0JCY0drdVoyVjBWRzlyWlc0b0tUdGNiaUFnSUNBZ0lDQWdhV1lnS0hSdmEyVnVLWHRjYmlBZ0lDQWdJQ0FnSUNBZ0lFRndhUzVoZFhSb2IzSnBlbVZrUjJWMEtDZGphR1ZqYXkxMGIydGxiaWNwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTG5Sb1pXNG9ablZ1WTNScGIyNGdLR1JoZEdFcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NTBjbWxuWjJWeVFYVjBhR1Z1ZEdsallYUmxaQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwdVltbHVaQ2gwYUdsektTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXVZMkYwWTJnb1puVnVZM1JwYjI0b1pYSnliM0lwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG5SeWFXZG5aWEpNYjJkdmRYUW9LVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDB1WW1sdVpDaDBhR2x6S1NsY2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWRISnBaMmRsY2t4dloyOTFkQ2dwTzF4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNCOUxGeHVJQ0FnSUV4dloyOTFkQ2dwZTF4dUlDQWdJQ0FnSUNCQmNHa3VjbVZ0YjNabFZHOXJaVzRvS1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTUwY21sbloyVnlURzluYjNWMEtDazdYRzRnSUNBZ2ZWeHVmU2s3SWwxOSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qKlxuICogQ3JlYXRlZCBieSBuaWtvbGF5Z29sdWIgb24gMjAvMDIvMTYuXG4gKi9cbnZhciBSZWZsdXggPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVmbHV4J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWZsdXgnXSA6IG51bGwpO1xudmFyIEFwaSA9IHJlcXVpcmUoJy4uL2FwaScpO1xudmFyIEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgICBsaXN0ZW5hYmxlczogW0FjdGlvbnNdLFxuICAgIGdldEtpZHM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBBcGkuYXV0aG9yaXplZEdldCgna2lkcycpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICB0aGlzLmtpZHMgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyS2lkc1JlY2VpdmVkKClcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICBhZGROZXdLaWQ6IGZ1bmN0aW9uKGtpZCl7XG4gICAgICAgIHRoaXMudHJpZ2dlckxvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIEFwaS5hdXRob3JpemVkUG9zdCgna2lkcycsIGtpZClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKG5ld19raWQpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtpZHMucHVzaChuZXdfa2lkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyS2lkc1JlY2VpdmVkKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgZGVsZXRlS2lkOiBmdW5jdGlvbihraWQpe1xuICAgICAgICB0aGlzLnRyaWdnZXJMb2FkaW5nKCk7XG4gICAgICAgIHZhciB1cmwgPSAna2lkcy8nICsga2lkWydpZCddO1xuICAgICAgICByZXR1cm4gQXBpLmF1dGhvcml6ZWREZWxldGUodXJsKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgIHZhciBraWRfaWR4ID0gdGhpcy5maW5kS2lkSW5kZXgoa2lkKTtcbiAgICAgICAgICAgICAgICBpZiAoa2lkX2lkeCA+IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5raWRzLnNwbGljZShraWRfaWR4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyS2lkc1JlY2VpdmVkKClcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9LFxuICAgIGZpbmRLaWRJbmRleDogZnVuY3Rpb24oa2lkKXtcbiAgICAgICAgdmFyIGlkeCA9IC0xO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5raWRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmICh0aGlzLmtpZHNbaV1bJ2lkJ10gPT09IGtpZFsnaWQnXSl7XG4gICAgICAgICAgICAgICAgaWR4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfSxcbiAgICB0cmlnZ2VyS2lkc1JlY2VpdmVkOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXMua2lkcyk7XG4gICAgfSxcbiAgICB0cmlnZ2VyTG9hZGluZzogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2FkaW5nJyk7XG4gICAgfVxufSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ6dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk5VmMyVnljeTl1YVd0dmJHRjVaMjlzZFdJdmQyOXlhM053WVdObEwyMTVMMnRwWkhOMFlYUXZhMmxrYzNSaGRDOWpiR2xsYm5RdmMzSmpMM04wYjNKbGN5OXJhV1J6TFhOMGIzSmxMbXB6ZUNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pTzBGQlFVRTdPMGRCUlVjN1FVRkRTQ3hKUVVGSkxFMUJRVTBzUjBGQlJ5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRMMElzU1VGQlNTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRE8wRkJRelZDTEVsQlFVa3NUMEZCVHl4SFFVRkhMRTlCUVU4c1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6czdRVUZGY0VNc1RVRkJUU3hEUVVGRExFOUJRVThzUjBGQlJ5eE5RVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRPMGxCUTJoRExGZEJRVmNzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXp0SlFVTjBRaXhQUVVGUExFVkJRVVVzVlVGQlZUdFJRVU5tTEU5QlFVOHNSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJReXhOUVVGTkxFTkJRVU03WVVGRE0wSXNTVUZCU1N4RFFVRkRMRk5CUVZNc1NVRkJTU3hEUVVGRE8yZENRVU5vUWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTTdaMEpCUTNSQ0xFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSVHRoUVVNM1FpeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE8wdEJRM0pDTzBsQlEwUXNVMEZCVXl4RlFVRkZMRk5CUVZNc1IwRkJSeXhEUVVGRE8xRkJRM0JDTEVsQlFVa3NRMEZCUXl4alFVRmpMRVZCUVVVc1EwRkJRenRSUVVOMFFpeFBRVUZQTEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFZEJRVWNzUTBGQlF6dGhRVU5xUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhQUVVGUExFTkJRVU03YjBKQlEyWXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdiMEpCUTNoQ0xFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1JVRkJSU3hEUVVGRE8yRkJRMnhETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03UzBGRGNrSTdTVUZEUkN4VFFVRlRMRVZCUVVVc1UwRkJVeXhIUVVGSExFTkJRVU03VVVGRGNFSXNTVUZCU1N4RFFVRkRMR05CUVdNc1JVRkJSU3hEUVVGRE8xRkJRM1JDTEVsQlFVa3NSMEZCUnl4SFFVRkhMRTlCUVU4c1IwRkJSeXhIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdVVUZET1VJc1QwRkJUeXhIUVVGSExFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1IwRkJSeXhEUVVGRE8yRkJRek5DTEVsQlFVa3NRMEZCUXl4VFFVRlRMRkZCUVZFc1EwRkJRenRuUWtGRGNFSXNTVUZCU1N4UFFVRlBMRWRCUVVjc1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0blFrRkRja01zU1VGQlNTeFBRVUZQTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN2IwSkJRMklzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzJsQ1FVTm9RenRuUWtGRFJDeEpRVUZKTEVOQlFVTXNiVUpCUVcxQ0xFVkJRVVU3WVVGRE4wSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UzBGRGNFSTdTVUZEUkN4WlFVRlpMRVZCUVVVc1UwRkJVeXhIUVVGSExFTkJRVU03VVVGRGRrSXNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFlpeEpRVUZKTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU03V1VGRGNrTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dG5Ra0ZEYWtNc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dG5Ra0ZEVWl4TFFVRkxPMkZCUTFJN1UwRkRTanRSUVVORUxFOUJRVThzUjBGQlJ5eERRVUZETzB0QlEyUTdTVUZEUkN4dFFrRkJiVUlzUlVGQlJTeFZRVUZWTzFGQlF6TkNMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVVVGQlVTeEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOeVF6dEpRVU5FTEdOQlFXTXNSVUZCUlN4VlFVRlZPMUZCUTNSQ0xFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1MwRkRNMEk3UTBGRFNpeERRVUZESWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaXBjYmlBcUlFTnlaV0YwWldRZ1lua2dibWxyYjJ4aGVXZHZiSFZpSUc5dUlESXdMekF5THpFMkxseHVJQ292WEc1MllYSWdVbVZtYkhWNElEMGdjbVZ4ZFdseVpTZ25jbVZtYkhWNEp5azdYRzUyWVhJZ1FYQnBJRDBnY21WeGRXbHlaU2duTGk0dllYQnBKeWs3WEc1MllYSWdRV04wYVc5dWN5QTlJSEpsY1hWcGNtVW9KeTR1TDJGamRHbHZibk1uS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlNaV1pzZFhndVkzSmxZWFJsVTNSdmNtVW9lMXh1SUNBZ0lHeHBjM1JsYm1GaWJHVnpPaUJiUVdOMGFXOXVjMTBzWEc0Z0lDQWdaMlYwUzJsa2N6b2dablZ1WTNScGIyNG9LWHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRUZ3YVM1aGRYUm9iM0pwZW1Wa1IyVjBLQ2RyYVdSekp5bGNiaUFnSUNBZ0lDQWdJQ0FnSUM1MGFHVnVLR1oxYm1OMGFXOXVLR1JoZEdFcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YTJsa2N5QTlJR1JoZEdFdVpHRjBZVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuUnlhV2RuWlhKTGFXUnpVbVZqWldsMlpXUW9LVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTNWlhVzVrS0hSb2FYTXBLVHRjYmlBZ0lDQjlMRnh1SUNBZ0lHRmtaRTVsZDB0cFpEb2dablZ1WTNScGIyNG9hMmxrS1h0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTUwY21sbloyVnlURzloWkdsdVp5Z3BPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdRWEJwTG1GMWRHaHZjbWw2WldSUWIzTjBLQ2RyYVdSekp5d2dhMmxrS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdMblJvWlc0b1puVnVZM1JwYjI0b2JtVjNYMnRwWkNsN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWEybGtjeTV3ZFhOb0tHNWxkMTlyYVdRcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuUnlhV2RuWlhKTGFXUnpVbVZqWldsMlpXUW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHVZbWx1WkNoMGFHbHpLU2s3WEc0Z0lDQWdmU3hjYmlBZ0lDQmtaV3hsZEdWTGFXUTZJR1oxYm1OMGFXOXVLR3RwWkNsN1hHNGdJQ0FnSUNBZ0lIUm9hWE11ZEhKcFoyZGxja3h2WVdScGJtY29LVHRjYmlBZ0lDQWdJQ0FnZG1GeUlIVnliQ0E5SUNkcmFXUnpMeWNnS3lCcmFXUmJKMmxrSjEwN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCQmNHa3VZWFYwYUc5eWFYcGxaRVJsYkdWMFpTaDFjbXdwWEc0Z0lDQWdJQ0FnSUNBZ0lDQXVkR2hsYmlobWRXNWpkR2x2YmloeVpYTndiMjV6WlNsN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR3RwWkY5cFpIZ2dQU0IwYUdsekxtWnBibVJMYVdSSmJtUmxlQ2hyYVdRcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hyYVdSZmFXUjRJRDRnTFRFcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtdHBaSE11YzNCc2FXTmxLR3RwWkY5cFpIZ3NJREVwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMblJ5YVdkblpYSkxhV1J6VW1WalpXbDJaV1FvS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdmUzVpYVc1a0tIUm9hWE1wS1Z4dUlDQWdJSDBzWEc0Z0lDQWdabWx1WkV0cFpFbHVaR1Y0T2lCbWRXNWpkR2x2YmlocmFXUXBlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2FXUjRJRDBnTFRFN1hHNGdJQ0FnSUNBZ0lHWnZjaWgyWVhJZ2FTQTlJREE3SUdrZ1BDQjBhR2x6TG10cFpITXViR1Z1WjNSb095QnBLeXNwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVhMmxrYzF0cFhWc25hV1FuWFNBOVBUMGdhMmxrV3lkcFpDZGRLWHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWkhnZ1BTQnBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR0p5WldGclhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdsa2VEdGNiaUFnSUNCOUxGeHVJQ0FnSUhSeWFXZG5aWEpMYVdSelVtVmpaV2wyWldRNklHWjFibU4wYVc5dUtDbDdYRzRnSUNBZ0lDQWdJSFJvYVhNdWRISnBaMmRsY2lnblkyaGhibWRsSnl3Z2RHaHBjeTVyYVdSektUdGNiaUFnSUNCOUxGeHVJQ0FnSUhSeWFXZG5aWEpNYjJGa2FXNW5PaUJtZFc1amRHbHZiaWdwZTF4dUlDQWdJQ0FnSUNCMGFHbHpMblJ5YVdkblpYSW9KMnh2WVdScGJtY25LVHRjYmlBZ0lDQjlYRzU5S1RzaVhYMD0iXX0=
