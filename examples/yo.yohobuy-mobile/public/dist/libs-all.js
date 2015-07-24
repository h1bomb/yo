if (typeof seajs === 'undefined') {
/*
 SeaJS - A Module Loader for the Web
 v2.3.0 | seajs.org | MIT Licensed
*/
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return z++}function e(a){return a.match(C)[0]}function f(a){for(a=a.replace(D,"/"),a=a.replace(F,"$1/");a.match(E);)a=a.replace(E,"/");return a}function g(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||"/"===c?a:a+".js"}function h(a){var b=u.alias;return b&&w(b[a])?b[a]:a}function i(a){var b=u.paths,c;return b&&(c=a.match(G))&&w(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=u.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(H,function(a,c){return w(b[c])?b[c]:a})),a}function k(a){var b=u.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=y(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charAt(0);if(I.test(a))c=a;else if("."===d)c=f((b?e(b):u.cwd)+a);else if("/"===d){var g=u.cwd.match(J);c=g?g[0]+a.substring(1):a}else c=u.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=j(a),a=g(a);var c=l(a,b);return c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c){var d=K.createElement("script");if(c){var e=y(c)?c(a):c;e&&(d.charset=e)}p(d,b,a),d.async=!0,d.src=a,R=d,Q?P.insertBefore(d,Q):P.appendChild(d),R=null}function p(a,b,c){function d(){a.onload=a.onerror=a.onreadystatechange=null,u.debug||P.removeChild(a),a=null,b()}var e="onload"in a;e?(a.onload=d,a.onerror=function(){B("error",{uri:c,node:a}),d()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&d()}}function q(){if(R)return R;if(S&&"interactive"===S.readyState)return S;for(var a=P.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return S=c}}function r(a){var b=[];return a.replace(U,"").replace(T,function(a,c,d){d&&b.push(d)}),b}function s(a,b){this.uri=a,this.dependencies=b||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!a.seajs){var t=a.seajs={version:"2.3.0"},u=t.data={},v=c("Object"),w=c("String"),x=Array.isArray||c("Array"),y=c("Function"),z=0,A=u.events={};t.on=function(a,b){var c=A[a]||(A[a]=[]);return c.push(b),t},t.off=function(a,b){if(!a&&!b)return A=u.events={},t;var c=A[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete A[a];return t};var B=t.emit=function(a,b){var c=A[a],d;if(c){c=c.slice();for(var e=0,f=c.length;f>e;e++)c[e](b)}return t},C=/[^?#]*\//,D=/\/\.\//g,E=/\/[^/]+\/\.\.\//,F=/([^:/])\/+\//g,G=/^([^/:]+)(\/.+)$/,H=/{([^{]+)}/g,I=/^\/\/.|:\//,J=/^.*?\/\/.*?\//,K=document,L=location.href&&0!==location.href.indexOf("about:")?e(location.href):"",M=K.scripts,N=K.getElementById("seajsnode")||M[M.length-1],O=e(n(N)||L);t.resolve=m;var P=K.head||K.getElementsByTagName("head")[0]||K.documentElement,Q=P.getElementsByTagName("base")[0],R,S;t.request=o;var T=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,U=/\\\\/g,V=t.cache={},W,X={},Y={},Z={},$=s.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};s.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=s.resolve(b[d],a.uri);return c},s.prototype.load=function(){var a=this;if(!(a.status>=$.LOADING)){a.status=$.LOADING;var c=a.resolve();B("load",c);for(var d=a._remain=c.length,e,f=0;d>f;f++)e=s.get(c[f]),e.status<$.LOADED?e._waitings[a.uri]=(e._waitings[a.uri]||0)+1:a._remain--;if(0===a._remain)return a.onload(),b;var g={};for(f=0;d>f;f++)e=V[c[f]],e.status<$.FETCHING?e.fetch(g):e.status===$.SAVED&&e.load();for(var h in g)g.hasOwnProperty(h)&&g[h]()}},s.prototype.onload=function(){var a=this;a.status=$.LOADED,a.callback&&a.callback();var b=a._waitings,c,d;for(c in b)b.hasOwnProperty(c)&&(d=V[c],d._remain-=b[c],0===d._remain&&d.onload());delete a._waitings,delete a._remain},s.prototype.fetch=function(a){function c(){t.request(g.requestUri,g.onRequest,g.charset)}function d(){delete X[h],Y[h]=!0,W&&(s.save(f,W),W=null);var a,b=Z[h];for(delete Z[h];a=b.shift();)a.load()}var e=this,f=e.uri;e.status=$.FETCHING;var g={uri:f};B("fetch",g);var h=g.requestUri||f;return!h||Y[h]?(e.load(),b):X[h]?(Z[h].push(e),b):(X[h]=!0,Z[h]=[e],B("request",g={uri:f,requestUri:h,onRequest:d,charset:u.charset}),g.requested||(a?a[g.requestUri]=c:c()),b)},s.prototype.exec=function(){function a(b){return s.get(a.resolve(b)).exec()}var c=this;if(c.status>=$.EXECUTING)return c.exports;c.status=$.EXECUTING;var e=c.uri;a.resolve=function(a){return s.resolve(a,e)},a.async=function(b,c){return s.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=y(f)?f(a,c.exports={},c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=$.EXECUTED,B("exec",c),g},s.resolve=function(a,b){var c={id:a,refUri:b};return B("resolve",c),c.uri||t.resolve(c.id,b)},s.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,x(a)?(c=a,a=b):c=b),!x(c)&&y(d)&&(c=r(""+d));var f={id:a,uri:s.resolve(a),deps:c,factory:d};if(!f.uri&&K.attachEvent){var g=q();g&&(f.uri=g.src)}B("define",f),f.uri?s.save(f.uri,f):W=f},s.save=function(a,b){var c=s.get(a);c.status<$.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=$.SAVED,B("save",c))},s.get=function(a,b){return V[a]||(V[a]=new s(a,b))},s.use=function(b,c,d){var e=s.get(d,x(b)?b:[b]);e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=V[d[f]].exec();c&&c.apply(a,b),delete e.callback},e.load()},t.use=function(a,b){return s.use(a,b,u.cwd+"_use_"+d()),t},s.define.cmd={},a.define=s.define,t.Module=s,u.fetchedList=Y,u.cid=d,t.require=function(a){var b=s.get(s.resolve(a));return b.status<$.EXECUTING&&(b.onload(),b.exec()),b.exports},u.base=O,u.dir=O,u.cwd=L,u.charset="utf-8",t.config=function(a){for(var b in a){var c=a[b],d=u[b];if(d&&v(d))for(var e in c)d[e]=c[e];else x(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),u[b]=c}return B("config",a),t}}}(this);

/*! Seajs-css 1.0.4 */
!function(){function a(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function b(a){return"[object Function]"=={}.toString.call(a)}function c(a,c,e){var f=u.test(a),g=r.createElement(f?"link":"script");if(e){var h=b(e)?e(a):e;h&&(g.charset=h)}d(g,c,f,a),f?(g.rel="stylesheet",g.href=a):(g.async=!0,g.src=a),p=g,t?s.insertBefore(g,t):s.appendChild(g),p=null}function d(a,b,c,d){function f(){a.onload=a.onerror=a.onreadystatechange=null,c||seajs.data.debug||s.removeChild(a),a=null,b()}var g="onload"in a;return!c||!v&&g?(g?(a.onload=f,a.onerror=function(){seajs.emit("error",{uri:d,node:a}),f()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&f()},void 0):(setTimeout(function(){e(a,b)},1),void 0)}function e(a,b){var c,d=a.sheet;if(v)d&&(c=!0);else if(d)try{d.cssRules&&(c=!0)}catch(f){"NS_ERROR_DOM_SECURITY_ERR"===f.name&&(c=!0)}setTimeout(function(){c?b():e(a,b)},20)}function f(a){return a.match(x)[0]}function g(a){for(a=a.replace(y,"/"),a=a.replace(A,"$1/");a.match(z);)a=a.replace(z,"/");return a}function h(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||".css"===a.substring(b-3)||"/"===c?a:a+".js"}function i(a){var b=w.alias;return b&&q(b[a])?b[a]:a}function j(a){var b,c=w.paths;return c&&(b=a.match(B))&&q(c[b[1]])&&(a=c[b[1]]+b[2]),a}function k(a){var b=w.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(C,function(a,c){return q(b[c])?b[c]:a})),a}function l(a){var c=w.map,d=a;if(c)for(var e=0,f=c.length;f>e;e++){var g=c[e];if(d=b(g)?g(a)||a:a.replace(g[0],g[1]),d!==a)break}return d}function m(a,b){var c,d=a.charAt(0);if(D.test(a))c=a;else if("."===d)c=g((b?f(b):w.cwd)+a);else if("/"===d){var e=w.cwd.match(E);c=e?e[0]+a.substring(1):a}else c=w.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function n(a,b){if(!a)return"";a=i(a),a=j(a),a=k(a),a=h(a);var c=m(a,b);return c=l(c)}function o(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}var p,q=a("String"),r=document,s=r.head||r.getElementsByTagName("head")[0]||r.documentElement,t=s.getElementsByTagName("base")[0],u=/\.css(?:\?|$)/i,v=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;seajs.request=c;var w=seajs.data,x=/[^?#]*\//,y=/\/\.\//g,z=/\/[^/]+\/\.\.\//,A=/([^:/])\/+\//g,B=/^([^/:]+)(\/.+)$/,C=/{([^{]+)}/g,D=/^\/\/.|:\//,E=/^.*?\/\/.*?\//,r=document,F=location.href&&0!==location.href.indexOf("about:")?f(location.href):"",G=r.scripts,H=r.getElementById("seajsnode")||G[G.length-1];f(o(H)||F),seajs.resolve=n,define("seajs/seajs-css/1.0.4/seajs-css",[],{})}();
}

if (typeof g_spm_init === 'undefined') {
(function() {
  var cache = [];
  var timer = null;
  g_spm_init = function(entry) {
    cache.push(entry);
    timer && clearTimeout(timer);
    timer = setTimeout(init, 100);
  };
  function init() {
    var entry = cache.shift();
    if (entry) {
      seajs.use(entry, init);
    }
  }
})();
}

define("jquery/jquery", [], function(require, exports, module){
/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function( window, undefined ) {
var
        // A central reference to the root jQuery(document)
        rootjQuery,

        // The deferred used on DOM ready
        readyList,

        // Use the correct document accordingly with window argument (sandbox)
        document = window.document,
        location = window.location,
        navigator = window.navigator,

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$,

        // Save a reference to some core methods
        core_push = Array.prototype.push,
        core_slice = Array.prototype.slice,
        core_indexOf = Array.prototype.indexOf,
        core_toString = Object.prototype.toString,
        core_hasOwn = Object.prototype.hasOwnProperty,
        core_trim = String.prototype.trim,

        // Define a local copy of jQuery
        jQuery = function( selector, context ) {
                // The jQuery object is actually just the init constructor 'enhanced'
                return new jQuery.fn.init( selector, context, rootjQuery );
        },

        // Used for matching numbers
        core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

        // Used for detecting and trimming whitespace
        core_rnotwhite = /\S/,
        core_rspace = /\s+/,

        // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

        // Match a standalone tag
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

        // JSON RegExp
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
                return ( letter + "" ).toUpperCase();
        },

        // The ready event handler and self cleanup method
        DOMContentLoaded = function() {
                if ( document.addEventListener ) {
                        document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                        jQuery.ready();
                } else if ( document.readyState === "complete" ) {
                        // we're here because readyState === "complete" in oldIE
                        // which is good enough for us to call the dom ready!
                        document.detachEvent( "onreadystatechange", DOMContentLoaded );
                        jQuery.ready();
                }
        },

        // [[Class]] -> type pairs
        class2type = {};

jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function( selector, context, rootjQuery ) {
                var match, elem, ret, doc;

                // Handle $(""), $(null), $(undefined), $(false)
                if ( !selector ) {
                        return this;
                }

                // Handle $(DOMElement)
                if ( selector.nodeType ) {
                        this.context = this[0] = selector;
                        this.length = 1;
                        return this;
                }

                // Handle HTML strings
                if ( typeof selector === "string" ) {
                        if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                                // Assume that strings that start and end with <> are HTML and skip the regex check
                                match = [ null, selector, null ];

                        } else {
                                match = rquickExpr.exec( selector );
                        }

                        // Match html or make sure no context is specified for #id
                        if ( match && (match[1] || !context) ) {

                                // HANDLE: $(html) -> $(array)
                                if ( match[1] ) {
                                        context = context instanceof jQuery ? context[0] : context;
                                        doc = ( context && context.nodeType ? context.ownerDocument || context : document );

                                        // scripts is true for back-compat
                                        selector = jQuery.parseHTML( match[1], doc, true );
                                        if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                                                this.attr.call( selector, context, true );
                                        }

                                        return jQuery.merge( this, selector );

                                // HANDLE: $(#id)
                                } else {
                                        elem = document.getElementById( match[2] );

                                        // Check parentNode to catch when Blackberry 4.6 returns
                                        // nodes that are no longer in the document #6963
                                        if ( elem && elem.parentNode ) {
                                                // Handle the case where IE and Opera return items
                                                // by name instead of ID
                                                if ( elem.id !== match[2] ) {
                                                        return rootjQuery.find( selector );
                                                }

                                                // Otherwise, we inject the element directly into the jQuery object
                                                this.length = 1;
                                                this[0] = elem;
                                        }

                                        this.context = document;
                                        this.selector = selector;
                                        return this;
                                }

                        // HANDLE: $(expr, $(...))
                        } else if ( !context || context.jquery ) {
                                return ( context || rootjQuery ).find( selector );

                        // HANDLE: $(expr, context)
                        // (which is just equivalent to: $(context).find(expr)
                        } else {
                                return this.constructor( context ).find( selector );
                        }

                // HANDLE: $(function)
                // Shortcut for document ready
                } else if ( jQuery.isFunction( selector ) ) {
                        return rootjQuery.ready( selector );
                }

                if ( selector.selector !== undefined ) {
                        this.selector = selector.selector;
                        this.context = selector.context;
                }

                return jQuery.makeArray( selector, this );
        },

        // Start with an empty selector
        selector: "",

        // The current version of jQuery being used
        jquery: "1.8.3",

        // The default length of a jQuery object is 0
        length: 0,

        // The number of elements contained in the matched element set
        size: function() {
                return this.length;
        },

        toArray: function() {
                return core_slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {
                return num == null ?

                        // Return a 'clean' array
                        this.toArray() :

                        // Return just the object
                        ( num < 0 ? this[ this.length + num ] : this[ num ] );
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems, name, selector ) {

                // Build a new jQuery matched element set
                var ret = jQuery.merge( this.constructor(), elems );

                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;

                ret.context = this.context;

                if ( name === "find" ) {
                        ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
                } else if ( name ) {
                        ret.selector = this.selector + "." + name + "(" + selector + ")";
                }

                // Return the newly-formed element set
                return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function( callback, args ) {
                return jQuery.each( this, callback, args );
        },

        ready: function( fn ) {
                // Add the callback
                jQuery.ready.promise().done( fn );

                return this;
        },

        eq: function( i ) {
                i = +i;
                return i === -1 ?
                        this.slice( i ) :
                        this.slice( i, i + 1 );
        },

        first: function() {
                return this.eq( 0 );
        },

        last: function() {
                return this.eq( -1 );
        },

        slice: function() {
                return this.pushStack( core_slice.apply( this, arguments ),
                        "slice", core_slice.call(arguments).join(",") );
        },

        map: function( callback ) {
                return this.pushStack( jQuery.map(this, function( elem, i ) {
                        return callback.call( elem, i, elem );
                }));
        },

        end: function() {
                return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: core_push,
        sort: [].sort,
        splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
                target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( length === i ) {
                target = this;
                --i;
        }

        for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) != null ) {
                        // Extend the base object
                        for ( name in options ) {
                                src = target[ name ];
                                copy = options[ name ];

                                // Prevent never-ending loop
                                if ( target === copy ) {
                                        continue;
                                }

                                // Recurse if we're merging plain objects or arrays
                                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                                        if ( copyIsArray ) {
                                                copyIsArray = false;
                                                clone = src && jQuery.isArray(src) ? src : [];

                                        } else {
                                                clone = src && jQuery.isPlainObject(src) ? src : {};
                                        }

                                        // Never move original objects, clone them
                                        target[ name ] = jQuery.extend( deep, clone, copy );

                                // Don't bring in undefined values
                                } else if ( copy !== undefined ) {
                                        target[ name ] = copy;
                                }
                        }
                }
        }

        // Return the modified object
        return target;
};

jQuery.extend({
        noConflict: function( deep ) {
                if ( window.$ === jQuery ) {
                        window.$ = _$;
                }

                if ( deep && window.jQuery === jQuery ) {
                        window.jQuery = _jQuery;
                }

                return jQuery;
        },

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function( hold ) {
                if ( hold ) {
                        jQuery.readyWait++;
                } else {
                        jQuery.ready( true );
                }
        },

        // Handle when the DOM is ready
        ready: function( wait ) {

                // Abort if there are pending holds or we're already ready
                if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                        return;
                }

                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if ( !document.body ) {
                        return setTimeout( jQuery.ready, 1 );
                }

                // Remember that the DOM is ready
                jQuery.isReady = true;

                // If a normal DOM Ready event fired, decrement, and wait if need be
                if ( wait !== true && --jQuery.readyWait > 0 ) {
                        return;
                }

                // If there are functions bound, to execute
                readyList.resolveWith( document, [ jQuery ] );

                // Trigger any bound ready events
                if ( jQuery.fn.trigger ) {
                        jQuery( document ).trigger("ready").off("ready");
                }
        },

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function( obj ) {
                return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function( obj ) {
                return jQuery.type(obj) === "array";
        },

        isWindow: function( obj ) {
                return obj != null && obj == obj.window;
        },

        isNumeric: function( obj ) {
                return !isNaN( parseFloat(obj) ) && isFinite( obj );
        },

        type: function( obj ) {
                return obj == null ?
                        String( obj ) :
                        class2type[ core_toString.call(obj) ] || "object";
        },

        isPlainObject: function( obj ) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                        return false;
                }

                try {
                        // Not own constructor property must be Object
                        if ( obj.constructor &&
                                !core_hasOwn.call(obj, "constructor") &&
                                !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                                return false;
                        }
                } catch ( e ) {
                        // IE8,9 Will throw exceptions on certain host objects #9897
                        return false;
                }

                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.

                var key;
                for ( key in obj ) {}

                return key === undefined || core_hasOwn.call( obj, key );
        },

        isEmptyObject: function( obj ) {
                var name;
                for ( name in obj ) {
                        return false;
                }
                return true;
        },

        error: function( msg ) {
                throw new Error( msg );
        },

        // data: string of html
        // context (optional): If specified, the fragment will be created in this context, defaults to document
        // scripts (optional): If true, will include scripts passed in the html string
        parseHTML: function( data, context, scripts ) {
                var parsed;
                if ( !data || typeof data !== "string" ) {
                        return null;
                }
                if ( typeof context === "boolean" ) {
                        scripts = context;
                        context = 0;
                }
                context = context || document;

                // Single tag
                if ( (parsed = rsingleTag.exec( data )) ) {
                        return [ context.createElement( parsed[1] ) ];
                }

                parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
                return jQuery.merge( [],
                        (parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
        },

        parseJSON: function( data ) {
                if ( !data || typeof data !== "string") {
                        return null;
                }

                // Make sure leading/trailing whitespace is removed (IE can't handle it)
                data = jQuery.trim( data );

                // Attempt to parse using the native JSON parser first
                if ( window.JSON && window.JSON.parse ) {
                        return window.JSON.parse( data );
                }

                // Make sure the incoming data is actual JSON
                // Logic borrowed from http://json.org/json2.js
                if ( rvalidchars.test( data.replace( rvalidescape, "@" )
                        .replace( rvalidtokens, "]" )
                        .replace( rvalidbraces, "")) ) {

                        return ( new Function( "return " + data ) )();

                }
                jQuery.error( "Invalid JSON: " + data );
        },

        // Cross-browser xml parsing
        parseXML: function( data ) {
                var xml, tmp;
                if ( !data || typeof data !== "string" ) {
                        return null;
                }
                try {
                        if ( window.DOMParser ) { // Standard
                                tmp = new DOMParser();
                                xml = tmp.parseFromString( data , "text/xml" );
                        } else { // IE
                                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                                xml.async = "false";
                                xml.loadXML( data );
                        }
                } catch( e ) {
                        xml = undefined;
                }
                if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
                        jQuery.error( "Invalid XML: " + data );
                }
                return xml;
        },

        noop: function() {},

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function( data ) {
                if ( data && core_rnotwhite.test( data ) ) {
                        // We use execScript on Internet Explorer
                        // We use an anonymous function so that context is window
                        // rather than jQuery in Firefox
                        ( window.execScript || function( data ) {
                                window[ "eval" ].call( window, data );
                        } )( data );
                }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function( string ) {
                return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },

        nodeName: function( elem, name ) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function( obj, callback, args ) {
                var name,
                        i = 0,
                        length = obj.length,
                        isObj = length === undefined || jQuery.isFunction( obj );

                if ( args ) {
                        if ( isObj ) {
                                for ( name in obj ) {
                                        if ( callback.apply( obj[ name ], args ) === false ) {
                                                break;
                                        }
                                }
                        } else {
                                for ( ; i < length; ) {
                                        if ( callback.apply( obj[ i++ ], args ) === false ) {
                                                break;
                                        }
                                }
                        }

                // A special, fast, case for the most common use of each
                } else {
                        if ( isObj ) {
                                for ( name in obj ) {
                                        if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
                                                break;
                                        }
                                }
                        } else {
                                for ( ; i < length; ) {
                                        if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
                                                break;
                                        }
                                }
                        }
                }

                return obj;
        },

        // Use native String.trim function wherever possible
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
                function( text ) {
                        return text == null ?
                                "" :
                                core_trim.call( text );
                } :

                // Otherwise use our own trimming functionality
                function( text ) {
                        return text == null ?
                                "" :
                                ( text + "" ).replace( rtrim, "" );
                },

        // results is for internal usage only
        makeArray: function( arr, results ) {
                var type,
                        ret = results || [];

                if ( arr != null ) {
                        // The window, strings (and functions) also have 'length'
                        // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
                        type = jQuery.type( arr );

                        if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
                                core_push.call( ret, arr );
                        } else {
                                jQuery.merge( ret, arr );
                        }
                }

                return ret;
        },

        inArray: function( elem, arr, i ) {
                var len;

                if ( arr ) {
                        if ( core_indexOf ) {
                                return core_indexOf.call( arr, elem, i );
                        }

                        len = arr.length;
                        i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

                        for ( ; i < len; i++ ) {
                                // Skip accessing in sparse arrays
                                if ( i in arr && arr[ i ] === elem ) {
                                        return i;
                                }
                        }
                }

                return -1;
        },

        merge: function( first, second ) {
                var l = second.length,
                        i = first.length,
                        j = 0;

                if ( typeof l === "number" ) {
                        for ( ; j < l; j++ ) {
                                first[ i++ ] = second[ j ];
                        }

                } else {
                        while ( second[j] !== undefined ) {
                                first[ i++ ] = second[ j++ ];
                        }
                }

                first.length = i;

                return first;
        },

        grep: function( elems, callback, inv ) {
                var retVal,
                        ret = [],
                        i = 0,
                        length = elems.length;
                inv = !!inv;

                // Go through the array, only saving the items
                // that pass the validator function
                for ( ; i < length; i++ ) {
                        retVal = !!callback( elems[ i ], i );
                        if ( inv !== retVal ) {
                                ret.push( elems[ i ] );
                        }
                }

                return ret;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
                var value, key,
                        ret = [],
                        i = 0,
                        length = elems.length,
                        // jquery objects are treated as arrays
                        isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

                // Go through the array, translating each of the items to their
                if ( isArray ) {
                        for ( ; i < length; i++ ) {
                                value = callback( elems[ i ], i, arg );

                                if ( value != null ) {
                                        ret[ ret.length ] = value;
                                }
                        }

                // Go through every key on the object,
                } else {
                        for ( key in elems ) {
                                value = callback( elems[ key ], key, arg );

                                if ( value != null ) {
                                        ret[ ret.length ] = value;
                                }
                        }
                }

                // Flatten any nested arrays
                return ret.concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
                var tmp, args, proxy;

                if ( typeof context === "string" ) {
                        tmp = fn[ context ];
                        context = fn;
                        fn = tmp;
                }

                // Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                if ( !jQuery.isFunction( fn ) ) {
                        return undefined;
                }

                // Simulated bind
                args = core_slice.call( arguments, 2 );
                proxy = function() {
                        return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
                };

                // Set the guid of unique handler to the same of original handler, so it can be removed
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;

                return proxy;
        },

        // Multifunctional method to get and set values of a collection
        // The value/s can optionally be executed if it's a function
        access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
                var exec,
                        bulk = key == null,
                        i = 0,
                        length = elems.length;

                // Sets many values
                if ( key && typeof key === "object" ) {
                        for ( i in key ) {
                                jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
                        }
                        chainable = 1;

                // Sets one value
                } else if ( value !== undefined ) {
                        // Optionally, function values get executed if exec is true
                        exec = pass === undefined && jQuery.isFunction( value );

                        if ( bulk ) {
                                // Bulk operations only iterate when executing function values
                                if ( exec ) {
                                        exec = fn;
                                        fn = function( elem, key, value ) {
                                                return exec.call( jQuery( elem ), value );
                                        };

                                // Otherwise they run against the entire set
                                } else {
                                        fn.call( elems, value );
                                        fn = null;
                                }
                        }

                        if ( fn ) {
                                for (; i < length; i++ ) {
                                        fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
                                }
                        }

                        chainable = 1;
                }

                return chainable ?
                        elems :

                        // Gets
                        bulk ?
                                fn.call( elems ) :
                                length ? fn( elems[0], key ) : emptyGet;
        },

        now: function() {
                return ( new Date() ).getTime();
        }
});

jQuery.ready.promise = function( obj ) {
        if ( !readyList ) {

                readyList = jQuery.Deferred();

                // Catch cases where $(document).ready() is called after the browser event has already occurred.
                // we once tried to use readyState "interactive" here, but it caused issues like the one
                // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                if ( document.readyState === "complete" ) {
                        // Handle it asynchronously to allow scripts the opportunity to delay ready
                        setTimeout( jQuery.ready, 1 );

                // Standards-based browsers support DOMContentLoaded
                } else if ( document.addEventListener ) {
                        // Use the handy event callback
                        document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

                        // A fallback to window.onload, that will always work
                        window.addEventListener( "load", jQuery.ready, false );

                // If IE event model is used
                } else {
                        // Ensure firing before onload, maybe late but safe also for iframes
                        document.attachEvent( "onreadystatechange", DOMContentLoaded );

                        // A fallback to window.onload, that will always work
                        window.attachEvent( "onload", jQuery.ready );

                        // If IE and not a frame
                        // continually check to see if the document is ready
                        var top = false;

                        try {
                                top = window.frameElement == null && document.documentElement;
                        } catch(e) {}

                        if ( top && top.doScroll ) {
                                (function doScrollCheck() {
                                        if ( !jQuery.isReady ) {

                                                try {
                                                        // Use the trick by Diego Perini
                                                        // http://javascript.nwbox.com/IEContentLoaded/
                                                        top.doScroll("left");
                                                } catch(e) {
                                                        return setTimeout( doScrollCheck, 50 );
                                                }

                                                // and execute any waiting functions
                                                jQuery.ready();
                                        }
                                })();
                        }
                }
        }
        return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
        var object = optionsCache[ options ] = {};
        jQuery.each( options.split( core_rspace ), function( _, flag ) {
                object[ flag ] = true;
        });
        return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *      options: an optional list of space-separated options that will change how
 *                      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *      once:                   will ensure the callback list can only be fired once (like a Deferred)
 *
 *      memory:                 will keep track of previous values and will call any callback added
 *                                      after the list has been fired right away with the latest "memorized"
 *                                      values (like a Deferred)
 *
 *      unique:                 will ensure a callback can only be added once (no duplicate in the list)
 *
 *      stopOnFalse:    interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
                ( optionsCache[ options ] || createOptions( options ) ) :
                jQuery.extend( {}, options );

        var // Last fire value (for non-forgettable lists)
                memory,
                // Flag to know if list was already fired
                fired,
                // Flag to know if list is currently firing
                firing,
                // First callback to fire (used internally by add and fireWith)
                firingStart,
                // End of the loop when firing
                firingLength,
                // Index of currently firing callback (modified by remove if needed)
                firingIndex,
                // Actual callback list
                list = [],
                // Stack of fire calls for repeatable lists
                stack = !options.once && [],
                // Fire callbacks
                fire = function( data ) {
                        memory = options.memory && data;
                        fired = true;
                        firingIndex = firingStart || 0;
                        firingStart = 0;
                        firingLength = list.length;
                        firing = true;
                        for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                                if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                                        memory = false; // To prevent further calls using add
                                        break;
                                }
                        }
                        firing = false;
                        if ( list ) {
                                if ( stack ) {
                                        if ( stack.length ) {
                                                fire( stack.shift() );
                                        }
                                } else if ( memory ) {
                                        list = [];
                                } else {
                                        self.disable();
                                }
                        }
                },
                // Actual Callbacks object
                self = {
                        // Add a callback or a collection of callbacks to the list
                        add: function() {
                                if ( list ) {
                                        // First, we save the current length
                                        var start = list.length;
                                        (function add( args ) {
                                                jQuery.each( args, function( _, arg ) {
                                                        var type = jQuery.type( arg );
                                                        if ( type === "function" ) {
                                                                if ( !options.unique || !self.has( arg ) ) {
                                                                        list.push( arg );
                                                                }
                                                        } else if ( arg && arg.length && type !== "string" ) {
                                                                // Inspect recursively
                                                                add( arg );
                                                        }
                                                });
                                        })( arguments );
                                        // Do we need to add the callbacks to the
                                        // current firing batch?
                                        if ( firing ) {
                                                firingLength = list.length;
                                        // With memory, if we're not firing then
                                        // we should call right away
                                        } else if ( memory ) {
                                                firingStart = start;
                                                fire( memory );
                                        }
                                }
                                return this;
                        },
                        // Remove a callback from the list
                        remove: function() {
                                if ( list ) {
                                        jQuery.each( arguments, function( _, arg ) {
                                                var index;
                                                while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                                                        list.splice( index, 1 );
                                                        // Handle firing indexes
                                                        if ( firing ) {
                                                                if ( index <= firingLength ) {
                                                                        firingLength--;
                                                                }
                                                                if ( index <= firingIndex ) {
                                                                        firingIndex--;
                                                                }
                                                        }
                                                }
                                        });
                                }
                                return this;
                        },
                        // Control if a given callback is in the list
                        has: function( fn ) {
                                return jQuery.inArray( fn, list ) > -1;
                        },
                        // Remove all callbacks from the list
                        empty: function() {
                                list = [];
                                return this;
                        },
                        // Have the list do nothing anymore
                        disable: function() {
                                list = stack = memory = undefined;
                                return this;
                        },
                        // Is it disabled?
                        disabled: function() {
                                return !list;
                        },
                        // Lock the list in its current state
                        lock: function() {
                                stack = undefined;
                                if ( !memory ) {
                                        self.disable();
                                }
                                return this;
                        },
                        // Is it locked?
                        locked: function() {
                                return !stack;
                        },
                        // Call all callbacks with the given context and arguments
                        fireWith: function( context, args ) {
                                args = args || [];
                                args = [ context, args.slice ? args.slice() : args ];
                                if ( list && ( !fired || stack ) ) {
                                        if ( firing ) {
                                                stack.push( args );
                                        } else {
                                                fire( args );
                                        }
                                }
                                return this;
                        },
                        // Call all the callbacks with the given arguments
                        fire: function() {
                                self.fireWith( this, arguments );
                                return this;
                        },
                        // To know if the callbacks have already been called at least once
                        fired: function() {
                                return !!fired;
                        }
                };

        return self;
};
jQuery.extend({

        Deferred: function( func ) {
                var tuples = [
                                // action, add listener, listener list, final state
                                [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                                [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                                [ "notify", "progress", jQuery.Callbacks("memory") ]
                        ],
                        state = "pending",
                        promise = {
                                state: function() {
                                        return state;
                                },
                                always: function() {
                                        deferred.done( arguments ).fail( arguments );
                                        return this;
                                },
                                then: function( /* fnDone, fnFail, fnProgress */ ) {
                                        var fns = arguments;
                                        return jQuery.Deferred(function( newDefer ) {
                                                jQuery.each( tuples, function( i, tuple ) {
                                                        var action = tuple[ 0 ],
                                                                fn = fns[ i ];
                                                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                                        deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
                                                                function() {
                                                                        var returned = fn.apply( this, arguments );
                                                                        if ( returned && jQuery.isFunction( returned.promise ) ) {
                                                                                returned.promise()
                                                                                        .done( newDefer.resolve )
                                                                                        .fail( newDefer.reject )
                                                                                        .progress( newDefer.notify );
                                                                        } else {
                                                                                newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                                                                        }
                                                                } :
                                                                newDefer[ action ]
                                                        );
                                                });
                                                fns = null;
                                        }).promise();
                                },
                                // Get a promise for this deferred
                                // If obj is provided, the promise aspect is added to the object
                                promise: function( obj ) {
                                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                                }
                        },
                        deferred = {};

                // Keep pipe for back-compat
                promise.pipe = promise.then;

                // Add list-specific methods
                jQuery.each( tuples, function( i, tuple ) {
                        var list = tuple[ 2 ],
                                stateString = tuple[ 3 ];

                        // promise[ done | fail | progress ] = list.add
                        promise[ tuple[1] ] = list.add;

                        // Handle state
                        if ( stateString ) {
                                list.add(function() {
                                        // state = [ resolved | rejected ]
                                        state = stateString;

                                // [ reject_list | resolve_list ].disable; progress_list.lock
                                }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
                        }

                        // deferred[ resolve | reject | notify ] = list.fire
                        deferred[ tuple[0] ] = list.fire;
                        deferred[ tuple[0] + "With" ] = list.fireWith;
                });

                // Make the deferred a promise
                promise.promise( deferred );

                // Call given func if any
                if ( func ) {
                        func.call( deferred, deferred );
                }

                // All done!
                return deferred;
        },

        // Deferred helper
        when: function( subordinate /* , ..., subordinateN */ ) {
                var i = 0,
                        resolveValues = core_slice.call( arguments ),
                        length = resolveValues.length,

                        // the count of uncompleted subordinates
                        remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

                        // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                        // Update function for both resolve and progress values
                        updateFunc = function( i, contexts, values ) {
                                return function( value ) {
                                        contexts[ i ] = this;
                                        values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
                                        if( values === progressValues ) {
                                                deferred.notifyWith( contexts, values );
                                        } else if ( !( --remaining ) ) {
                                                deferred.resolveWith( contexts, values );
                                        }
                                };
                        },

                        progressValues, progressContexts, resolveContexts;

                // add listeners to Deferred subordinates; treat others as resolved
                if ( length > 1 ) {
                        progressValues = new Array( length );
                        progressContexts = new Array( length );
                        resolveContexts = new Array( length );
                        for ( ; i < length; i++ ) {
                                if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                                        resolveValues[ i ].promise()
                                                .done( updateFunc( i, resolveContexts, resolveValues ) )
                                                .fail( deferred.reject )
                                                .progress( updateFunc( i, progressContexts, progressValues ) );
                                } else {
                                        --remaining;
                                }
                        }
                }

                // if we're not waiting on anything, resolve the master
                if ( !remaining ) {
                        deferred.resolveWith( resolveContexts, resolveValues );
                }

                return deferred.promise();
        }
});
jQuery.support = (function() {

        var support,
                all,
                a,
                select,
                opt,
                input,
                fragment,
                eventName,
                i,
                isSupported,
                clickFn,
                div = document.createElement("div");

        // Setup
        div.setAttribute( "className", "t" );
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

        // Support tests won't run in some limited or non-browser environments
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[ 0 ];
        if ( !all || !a || !all.length ) {
                return {};
        }

        // First batch of tests
        select = document.createElement("select");
        opt = select.appendChild( document.createElement("option") );
        input = div.getElementsByTagName("input")[ 0 ];

        a.style.cssText = "top:1px;float:left;opacity:.5";
        support = {
                // IE strips leading whitespace when .innerHTML is used
                leadingWhitespace: ( div.firstChild.nodeType === 3 ),

                // Make sure that tbody elements aren't automatically inserted
                // IE will insert them into empty tables
                tbody: !div.getElementsByTagName("tbody").length,

                // Make sure that link elements get serialized correctly by innerHTML
                // This requires a wrapper element in IE
                htmlSerialize: !!div.getElementsByTagName("link").length,

                // Get the style information from getAttribute
                // (IE uses .cssText instead)
                style: /top/.test( a.getAttribute("style") ),

                // Make sure that URLs aren't manipulated
                // (IE normalizes it by default)
                hrefNormalized: ( a.getAttribute("href") === "/a" ),

                // Make sure that element opacity exists
                // (IE uses filter instead)
                // Use a regex to work around a WebKit issue. See #5145
                opacity: /^0.5/.test( a.style.opacity ),

                // Verify style float existence
                // (IE uses styleFloat instead of cssFloat)
                cssFloat: !!a.style.cssFloat,

                // Make sure that if no value is specified for a checkbox
                // that it defaults to "on".
                // (WebKit defaults to "" instead)
                checkOn: ( input.value === "on" ),

                // Make sure that a selected-by-default option has a working selected property.
                // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
                optSelected: opt.selected,

                // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
                getSetAttribute: div.className !== "t",

                // Tests for enctype support on a form (#6743)
                enctype: !!document.createElement("form").enctype,

                // Makes sure cloning an html5 element does not cause problems
                // Where outerHTML is undefined, this still works
                html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

                // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
                boxModel: ( document.compatMode === "CSS1Compat" ),

                // Will be defined later
                submitBubbles: true,
                changeBubbles: true,
                focusinBubbles: false,
                deleteExpando: true,
                noCloneEvent: true,
                inlineBlockNeedsLayout: false,
                shrinkWrapBlocks: false,
                reliableMarginRight: true,
                boxSizingReliable: true,
                pixelPosition: false
        };

        // Make sure checked status is properly cloned
        input.checked = true;
        support.noCloneChecked = input.cloneNode( true ).checked;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Test to see if it's possible to delete an expando from an element
        // Fails in Internet Explorer
        try {
                delete div.test;
        } catch( e ) {
                support.deleteExpando = false;
        }

        if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
                div.attachEvent( "onclick", clickFn = function() {
                        // Cloning a node shouldn't copy over any
                        // bound event handlers (IE does this)
                        support.noCloneEvent = false;
                });
                div.cloneNode( true ).fireEvent("onclick");
                div.detachEvent( "onclick", clickFn );
        }

        // Check if a radio maintains its value
        // after being appended to the DOM
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute( "type", "radio" );
        support.radioValue = input.value === "t";

        input.setAttribute( "checked", "checked" );

        // #11217 - WebKit loses check when the name is after the checked attribute
        input.setAttribute( "name", "t" );

        div.appendChild( input );
        fragment = document.createDocumentFragment();
        fragment.appendChild( div.lastChild );

        // WebKit doesn't clone checked state correctly in fragments
        support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        support.appendChecked = input.checked;

        fragment.removeChild( input );
        fragment.appendChild( div );

        // Technique from Juriy Zaytsev
        // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
        // We only care about the case where non-standard event systems
        // are used, namely in IE. Short-circuiting here helps us to
        // avoid an eval call (in setAttribute) which can cause CSP
        // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
        if ( div.attachEvent ) {
                for ( i in {
                        submit: true,
                        change: true,
                        focusin: true
                }) {
                        eventName = "on" + i;
                        isSupported = ( eventName in div );
                        if ( !isSupported ) {
                                div.setAttribute( eventName, "return;" );
                                isSupported = ( typeof div[ eventName ] === "function" );
                        }
                        support[ i + "Bubbles" ] = isSupported;
                }
        }

        // Run tests that need a body at doc ready
        jQuery(function() {
                var container, div, tds, marginDiv,
                        divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                        body = document.getElementsByTagName("body")[0];

                if ( !body ) {
                        // Return for frameset docs that don't have a body
                        return;
                }

                container = document.createElement("div");
                container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
                body.insertBefore( container, body.firstChild );

                // Construct the test element
                div = document.createElement("div");
                container.appendChild( div );

                // Check if table cells still have offsetWidth/Height when they are set
                // to display:none and there are still other visible table cells in a
                // table row; if so, offsetWidth/Height are not reliable for use when
                // determining if an element has been hidden directly using
                // display:none (it is still safe to use offsets if a parent element is
                // hidden; don safety goggles and see bug #4512 for more information).
                // (only IE 8 fails this test)
                div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                tds = div.getElementsByTagName("td");
                tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
                isSupported = ( tds[ 0 ].offsetHeight === 0 );

                tds[ 0 ].style.display = "";
                tds[ 1 ].style.display = "none";

                // Check if empty table cells still have offsetWidth/Height
                // (IE <= 8 fail this test)
                support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

                // Check box-sizing and margin behavior
                div.innerHTML = "";
                div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
                support.boxSizing = ( div.offsetWidth === 4 );
                support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

                // NOTE: To any future maintainer, we've window.getComputedStyle
                // because jsdom on node.js will break without it.
                if ( window.getComputedStyle ) {
                        support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
                        support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

                        // Check if div with explicit width and no margin-right incorrectly
                        // gets computed margin-right based on width of container. For more
                        // info see bug #3333
                        // Fails in WebKit before Feb 2011 nightlies
                        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                        marginDiv = document.createElement("div");
                        marginDiv.style.cssText = div.style.cssText = divReset;
                        marginDiv.style.marginRight = marginDiv.style.width = "0";
                        div.style.width = "1px";
                        div.appendChild( marginDiv );
                        support.reliableMarginRight =
                                !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
                }

                if ( typeof div.style.zoom !== "undefined" ) {
                        // Check if natively block-level elements act like inline-block
                        // elements when setting their display to 'inline' and giving
                        // them layout
                        // (IE < 8 does this)
                        div.innerHTML = "";
                        div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                        support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

                        // Check if elements with layout shrink-wrap their children
                        // (IE 6 does this)
                        div.style.display = "block";
                        div.style.overflow = "visible";
                        div.innerHTML = "<div></div>";
                        div.firstChild.style.width = "5px";
                        support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

                        container.style.zoom = 1;
                }

                // Null elements to avoid leaks in IE
                body.removeChild( container );
                container = div = tds = marginDiv = null;
        });

        // Null elements to avoid leaks in IE
        fragment.removeChild( div );
        all = a = select = opt = input = fragment = div = null;

        return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;

jQuery.extend({
        cache: {},

        deletedIds: [],

        // Remove at next major release (1.9/2.0)
        uuid: 0,

        // Unique for each copy of jQuery on the page
        // Non-digits removed to match rinlinejQuery
        expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

        // The following elements throw uncatchable exceptions if you
        // attempt to add expando properties to them.
        noData: {
                "embed": true,
                // Ban all objects except for Flash (which handle expandos)
                "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                "applet": true
        },

        hasData: function( elem ) {
                elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
                return !!elem && !isEmptyDataObject( elem );
        },

        data: function( elem, name, data, pvt /* Internal Use Only */ ) {
                if ( !jQuery.acceptData( elem ) ) {
                        return;
                }

                var thisCache, ret,
                        internalKey = jQuery.expando,
                        getByName = typeof name === "string",

                        // We have to handle DOM nodes and JS objects differently because IE6-7
                        // can't GC object references properly across the DOM-JS boundary
                        isNode = elem.nodeType,

                        // Only DOM nodes need the global jQuery cache; JS object data is
                        // attached directly to the object so GC can occur automatically
                        cache = isNode ? jQuery.cache : elem,

                        // Only defining an ID for JS objects if its cache already exists allows
                        // the code to shortcut on the same path as a DOM node with no cache
                        id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

                // Avoid doing any more work than we need to when trying to get data on an
                // object that has no data at all
                if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
                        return;
                }

                if ( !id ) {
                        // Only DOM nodes need a new unique ID for each element since their data
                        // ends up in the global cache
                        if ( isNode ) {
                                elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
                        } else {
                                id = internalKey;
                        }
                }

                if ( !cache[ id ] ) {
                        cache[ id ] = {};

                        // Avoids exposing jQuery metadata on plain JS objects when the object
                        // is serialized using JSON.stringify
                        if ( !isNode ) {
                                cache[ id ].toJSON = jQuery.noop;
                        }
                }

                // An object can be passed to jQuery.data instead of a key/value pair; this gets
                // shallow copied over onto the existing cache
                if ( typeof name === "object" || typeof name === "function" ) {
                        if ( pvt ) {
                                cache[ id ] = jQuery.extend( cache[ id ], name );
                        } else {
                                cache[ id ].data = jQuery.extend( cache[ id ].data, name );
                        }
                }

                thisCache = cache[ id ];

                // jQuery data() is stored in a separate object inside the object's internal data
                // cache in order to avoid key collisions between internal data and user-defined
                // data.
                if ( !pvt ) {
                        if ( !thisCache.data ) {
                                thisCache.data = {};
                        }

                        thisCache = thisCache.data;
                }

                if ( data !== undefined ) {
                        thisCache[ jQuery.camelCase( name ) ] = data;
                }

                // Check for both converted-to-camel and non-converted data property names
                // If a data property was specified
                if ( getByName ) {

                        // First Try to find as-is property data
                        ret = thisCache[ name ];

                        // Test for null|undefined property data
                        if ( ret == null ) {

                                // Try to find the camelCased property
                                ret = thisCache[ jQuery.camelCase( name ) ];
                        }
                } else {
                        ret = thisCache;
                }

                return ret;
        },

        removeData: function( elem, name, pvt /* Internal Use Only */ ) {
                if ( !jQuery.acceptData( elem ) ) {
                        return;
                }

                var thisCache, i, l,

                        isNode = elem.nodeType,

                        // See jQuery.data for more information
                        cache = isNode ? jQuery.cache : elem,
                        id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

                // If there is already no cache entry for this object, there is no
                // purpose in continuing
                if ( !cache[ id ] ) {
                        return;
                }

                if ( name ) {

                        thisCache = pvt ? cache[ id ] : cache[ id ].data;

                        if ( thisCache ) {

                                // Support array or space separated string names for data keys
                                if ( !jQuery.isArray( name ) ) {

                                        // try the string as a key before any manipulation
                                        if ( name in thisCache ) {
                                                name = [ name ];
                                        } else {

                                                // split the camel cased version by spaces unless a key with the spaces exists
                                                name = jQuery.camelCase( name );
                                                if ( name in thisCache ) {
                                                        name = [ name ];
                                                } else {
                                                        name = name.split(" ");
                                                }
                                        }
                                }

                                for ( i = 0, l = name.length; i < l; i++ ) {
                                        delete thisCache[ name[i] ];
                                }

                                // If there is no data left in the cache, we want to continue
                                // and let the cache object itself get destroyed
                                if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
                                        return;
                                }
                        }
                }

                // See jQuery.data for more information
                if ( !pvt ) {
                        delete cache[ id ].data;

                        // Don't destroy the parent cache unless the internal data object
                        // had been the only thing left in it
                        if ( !isEmptyDataObject( cache[ id ] ) ) {
                                return;
                        }
                }

                // Destroy the cache
                if ( isNode ) {
                        jQuery.cleanData( [ elem ], true );

                // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
                } else if ( jQuery.support.deleteExpando || cache != cache.window ) {
                        delete cache[ id ];

                // When all else fails, null
                } else {
                        cache[ id ] = null;
                }
        },

        // For internal use only.
        _data: function( elem, name, data ) {
                return jQuery.data( elem, name, data, true );
        },

        // A method for determining if a DOM node can handle the data expando
        acceptData: function( elem ) {
                var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

                // nodes accept data unless otherwise specified; rejection can be conditional
                return !noData || noData !== true && elem.getAttribute("classid") === noData;
        }
});

jQuery.fn.extend({
        data: function( key, value ) {
                var parts, part, attr, name, l,
                        elem = this[0],
                        i = 0,
                        data = null;

                // Gets all values
                if ( key === undefined ) {
                        if ( this.length ) {
                                data = jQuery.data( elem );

                                if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                                        attr = elem.attributes;
                                        for ( l = attr.length; i < l; i++ ) {
                                                name = attr[i].name;

                                                if ( !name.indexOf( "data-" ) ) {
                                                        name = jQuery.camelCase( name.substring(5) );

                                                        dataAttr( elem, name, data[ name ] );
                                                }
                                        }
                                        jQuery._data( elem, "parsedAttrs", true );
                                }
                        }

                        return data;
                }

                // Sets multiple values
                if ( typeof key === "object" ) {
                        return this.each(function() {
                                jQuery.data( this, key );
                        });
                }

                parts = key.split( ".", 2 );
                parts[1] = parts[1] ? "." + parts[1] : "";
                part = parts[1] + "!";

                return jQuery.access( this, function( value ) {

                        if ( value === undefined ) {
                                data = this.triggerHandler( "getData" + part, [ parts[0] ] );

                                // Try to fetch any internally stored data first
                                if ( data === undefined && elem ) {
                                        data = jQuery.data( elem, key );
                                        data = dataAttr( elem, key, data );
                                }

                                return data === undefined && parts[1] ?
                                        this.data( parts[0] ) :
                                        data;
                        }

                        parts[1] = value;
                        this.each(function() {
                                var self = jQuery( this );

                                self.triggerHandler( "setData" + part, parts );
                                jQuery.data( this, key, value );
                                self.triggerHandler( "changeData" + part, parts );
                        });
                }, null, value, arguments.length > 1, null, false );
        },

        removeData: function( key ) {
                return this.each(function() {
                        jQuery.removeData( this, key );
                });
        }
});

function dataAttr( elem, key, data ) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {

                var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

                data = elem.getAttribute( name );

                if ( typeof data === "string" ) {
                        try {
                                data = data === "true" ? true :
                                data === "false" ? false :
                                data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                rbrace.test( data ) ? jQuery.parseJSON( data ) :
                                        data;
                        } catch( e ) {}

                        // Make sure we set the data so it isn't changed later
                        jQuery.data( elem, key, data );

                } else {
                        data = undefined;
                }
        }

        return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
        var name;
        for ( name in obj ) {

                // if the public data object is empty, the private is still empty
                if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
                        continue;
                }
                if ( name !== "toJSON" ) {
                        return false;
                }
        }

        return true;
}
jQuery.extend({
        queue: function( elem, type, data ) {
                var queue;

                if ( elem ) {
                        type = ( type || "fx" ) + "queue";
                        queue = jQuery._data( elem, type );

                        // Speed up dequeue by getting out quickly if this is just a lookup
                        if ( data ) {
                                if ( !queue || jQuery.isArray(data) ) {
                                        queue = jQuery._data( elem, type, jQuery.makeArray(data) );
                                } else {
                                        queue.push( data );
                                }
                        }
                        return queue || [];
                }
        },

        dequeue: function( elem, type ) {
                type = type || "fx";

                var queue = jQuery.queue( elem, type ),
                        startLength = queue.length,
                        fn = queue.shift(),
                        hooks = jQuery._queueHooks( elem, type ),
                        next = function() {
                                jQuery.dequeue( elem, type );
                        };

                // If the fx queue is dequeued, always remove the progress sentinel
                if ( fn === "inprogress" ) {
                        fn = queue.shift();
                        startLength--;
                }

                if ( fn ) {

                        // Add a progress sentinel to prevent the fx queue from being
                        // automatically dequeued
                        if ( type === "fx" ) {
                                queue.unshift( "inprogress" );
                        }

                        // clear up the last queue stop function
                        delete hooks.stop;
                        fn.call( elem, next, hooks );
                }

                if ( !startLength && hooks ) {
                        hooks.empty.fire();
                }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function( elem, type ) {
                var key = type + "queueHooks";
                return jQuery._data( elem, key ) || jQuery._data( elem, key, {
                        empty: jQuery.Callbacks("once memory").add(function() {
                                jQuery.removeData( elem, type + "queue", true );
                                jQuery.removeData( elem, key, true );
                        })
                });
        }
});

jQuery.fn.extend({
        queue: function( type, data ) {
                var setter = 2;

                if ( typeof type !== "string" ) {
                        data = type;
                        type = "fx";
                        setter--;
                }

                if ( arguments.length < setter ) {
                        return jQuery.queue( this[0], type );
                }

                return data === undefined ?
                        this :
                        this.each(function() {
                                var queue = jQuery.queue( this, type, data );

                                // ensure a hooks for this queue
                                jQuery._queueHooks( this, type );

                                if ( type === "fx" && queue[0] !== "inprogress" ) {
                                        jQuery.dequeue( this, type );
                                }
                        });
        },
        dequeue: function( type ) {
                return this.each(function() {
                        jQuery.dequeue( this, type );
                });
        },
        // Based off of the plugin by Clint Helfers, with permission.
        // http://blindsignals.com/index.php/2009/07/jquery-delay/
        delay: function( time, type ) {
                time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
                type = type || "fx";

                return this.queue( type, function( next, hooks ) {
                        var timeout = setTimeout( next, time );
                        hooks.stop = function() {
                                clearTimeout( timeout );
                        };
                });
        },
        clearQueue: function( type ) {
                return this.queue( type || "fx", [] );
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
                var tmp,
                        count = 1,
                        defer = jQuery.Deferred(),
                        elements = this,
                        i = this.length,
                        resolve = function() {
                                if ( !( --count ) ) {
                                        defer.resolveWith( elements, [ elements ] );
                                }
                        };

                if ( typeof type !== "string" ) {
                        obj = type;
                        type = undefined;
                }
                type = type || "fx";

                while( i-- ) {
                        tmp = jQuery._data( elements[ i ], type + "queueHooks" );
                        if ( tmp && tmp.empty ) {
                                count++;
                                tmp.empty.add( resolve );
                        }
                }
                resolve();
                return defer.promise( obj );
        }
});
var nodeHook, boolHook, fixSpecified,
        rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea|)$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
        attr: function( name, value ) {
                return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
        },

        removeAttr: function( name ) {
                return this.each(function() {
                        jQuery.removeAttr( this, name );
                });
        },

        prop: function( name, value ) {
                return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
        },

        removeProp: function( name ) {
                name = jQuery.propFix[ name ] || name;
                return this.each(function() {
                        // try/catch handles cases where IE balks (such as removing a property on window)
                        try {
                                this[ name ] = undefined;
                                delete this[ name ];
                        } catch( e ) {}
                });
        },

        addClass: function( value ) {
                var classNames, i, l, elem,
                        setClass, c, cl;

                if ( jQuery.isFunction( value ) ) {
                        return this.each(function( j ) {
                                jQuery( this ).addClass( value.call(this, j, this.className) );
                        });
                }

                if ( value && typeof value === "string" ) {
                        classNames = value.split( core_rspace );

                        for ( i = 0, l = this.length; i < l; i++ ) {
                                elem = this[ i ];

                                if ( elem.nodeType === 1 ) {
                                        if ( !elem.className && classNames.length === 1 ) {
                                                elem.className = value;

                                        } else {
                                                setClass = " " + elem.className + " ";

                                                for ( c = 0, cl = classNames.length; c < cl; c++ ) {
                                                        if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
                                                                setClass += classNames[ c ] + " ";
                                                        }
                                                }
                                                elem.className = jQuery.trim( setClass );
                                        }
                                }
                        }
                }

                return this;
        },

        removeClass: function( value ) {
                var removes, className, elem, c, cl, i, l;

                if ( jQuery.isFunction( value ) ) {
                        return this.each(function( j ) {
                                jQuery( this ).removeClass( value.call(this, j, this.className) );
                        });
                }
                if ( (value && typeof value === "string") || value === undefined ) {
                        removes = ( value || "" ).split( core_rspace );

                        for ( i = 0, l = this.length; i < l; i++ ) {
                                elem = this[ i ];
                                if ( elem.nodeType === 1 && elem.className ) {

                                        className = (" " + elem.className + " ").replace( rclass, " " );

                                        // loop over each item in the removal list
                                        for ( c = 0, cl = removes.length; c < cl; c++ ) {
                                                // Remove until there is nothing to remove,
                                                while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
                                                        className = className.replace( " " + removes[ c ] + " " , " " );
                                                }
                                        }
                                        elem.className = value ? jQuery.trim( className ) : "";
                                }
                        }
                }

                return this;
        },

        toggleClass: function( value, stateVal ) {
                var type = typeof value,
                        isBool = typeof stateVal === "boolean";

                if ( jQuery.isFunction( value ) ) {
                        return this.each(function( i ) {
                                jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
                        });
                }

                return this.each(function() {
                        if ( type === "string" ) {
                                // toggle individual class names
                                var className,
                                        i = 0,
                                        self = jQuery( this ),
                                        state = stateVal,
                                        classNames = value.split( core_rspace );

                                while ( (className = classNames[ i++ ]) ) {
                                        // check each className given, space separated list
                                        state = isBool ? state : !self.hasClass( className );
                                        self[ state ? "addClass" : "removeClass" ]( className );
                                }

                        } else if ( type === "undefined" || type === "boolean" ) {
                                if ( this.className ) {
                                        // store className if set
                                        jQuery._data( this, "__className__", this.className );
                                }

                                // toggle whole className
                                this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
                        }
                });
        },

        hasClass: function( selector ) {
                var className = " " + selector + " ",
                        i = 0,
                        l = this.length;
                for ( ; i < l; i++ ) {
                        if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                                return true;
                        }
                }

                return false;
        },

        val: function( value ) {
                var hooks, ret, isFunction,
                        elem = this[0];

                if ( !arguments.length ) {
                        if ( elem ) {
                                hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                                if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
                                        return ret;
                                }

                                ret = elem.value;

                                return typeof ret === "string" ?
                                        // handle most common string cases
                                        ret.replace(rreturn, "") :
                                        // handle cases where value is null/undef or number
                                        ret == null ? "" : ret;
                        }

                        return;
                }

                isFunction = jQuery.isFunction( value );

                return this.each(function( i ) {
                        var val,
                                self = jQuery(this);

                        if ( this.nodeType !== 1 ) {
                                return;
                        }

                        if ( isFunction ) {
                                val = value.call( this, i, self.val() );
                        } else {
                                val = value;
                        }

                        // Treat null/undefined as ""; convert numbers to string
                        if ( val == null ) {
                                val = "";
                        } else if ( typeof val === "number" ) {
                                val += "";
                        } else if ( jQuery.isArray( val ) ) {
                                val = jQuery.map(val, function ( value ) {
                                        return value == null ? "" : value + "";
                                });
                        }

                        hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                        // If set returns undefined, fall back to normal setting
                        if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
                                this.value = val;
                        }
                });
        }
});

jQuery.extend({
        valHooks: {
                option: {
                        get: function( elem ) {
                                // attributes.value is undefined in Blackberry 4.7 but
                                // uses .value. See #6932
                                var val = elem.attributes.value;
                                return !val || val.specified ? elem.value : elem.text;
                        }
                },
                select: {
                        get: function( elem ) {
                                var value, option,
                                        options = elem.options,
                                        index = elem.selectedIndex,
                                        one = elem.type === "select-one" || index < 0,
                                        values = one ? null : [],
                                        max = one ? index + 1 : options.length,
                                        i = index < 0 ?
                                                max :
                                                one ? index : 0;

                                // Loop through all the selected options
                                for ( ; i < max; i++ ) {
                                        option = options[ i ];

                                        // oldIE doesn't update selected after form reset (#2551)
                                        if ( ( option.selected || i === index ) &&
                                                        // Don't return options that are disabled or in a disabled optgroup
                                                        ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
                                                        ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

                                                // Get the specific value for the option
                                                value = jQuery( option ).val();

                                                // We don't need an array for one selects
                                                if ( one ) {
                                                        return value;
                                                }

                                                // Multi-Selects return an array
                                                values.push( value );
                                        }
                                }

                                return values;
                        },

                        set: function( elem, value ) {
                                var values = jQuery.makeArray( value );

                                jQuery(elem).find("option").each(function() {
                                        this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
                                });

                                if ( !values.length ) {
                                        elem.selectedIndex = -1;
                                }
                                return values;
                        }
                }
        },

        // Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
        attrFn: {},

        attr: function( elem, name, value, pass ) {
                var ret, hooks, notxml,
                        nType = elem.nodeType;

                // don't get/set attributes on text, comment and attribute nodes
                if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                        return;
                }

                if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
                        return jQuery( elem )[ name ]( value );
                }

                // Fallback to prop when attributes are not supported
                if ( typeof elem.getAttribute === "undefined" ) {
                        return jQuery.prop( elem, name, value );
                }

                notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

                // All attributes are lowercase
                // Grab necessary hook if one is defined
                if ( notxml ) {
                        name = name.toLowerCase();
                        hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
                }

                if ( value !== undefined ) {

                        if ( value === null ) {
                                jQuery.removeAttr( elem, name );
                                return;

                        } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
                                return ret;

                        } else {
                                elem.setAttribute( name, value + "" );
                                return value;
                        }

                } else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
                        return ret;

                } else {

                        ret = elem.getAttribute( name );

                        // Non-existent attributes return null, we normalize to undefined
                        return ret === null ?
                                undefined :
                                ret;
                }
        },

        removeAttr: function( elem, value ) {
                var propName, attrNames, name, isBool,
                        i = 0;

                if ( value && elem.nodeType === 1 ) {

                        attrNames = value.split( core_rspace );

                        for ( ; i < attrNames.length; i++ ) {
                                name = attrNames[ i ];

                                if ( name ) {
                                        propName = jQuery.propFix[ name ] || name;
                                        isBool = rboolean.test( name );

                                        // See #9699 for explanation of this approach (setting first, then removal)
                                        // Do not do this for boolean attributes (see #10870)
                                        if ( !isBool ) {
                                                jQuery.attr( elem, name, "" );
                                        }
                                        elem.removeAttribute( getSetAttribute ? name : propName );

                                        // Set corresponding property to false for boolean attributes
                                        if ( isBool && propName in elem ) {
                                                elem[ propName ] = false;
                                        }
                                }
                        }
                }
        },

        attrHooks: {
                type: {
                        set: function( elem, value ) {
                                // We can't allow the type property to be changed (since it causes problems in IE)
                                if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
                                        jQuery.error( "type property can't be changed" );
                                } else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
                                        // Setting the type on a radio button after the value resets the value in IE6-9
                                        // Reset value to it's default in case type is set after value
                                        // This is for element creation
                                        var val = elem.value;
                                        elem.setAttribute( "type", value );
                                        if ( val ) {
                                                elem.value = val;
                                        }
                                        return value;
                                }
                        }
                },
                // Use the value property for back compat
                // Use the nodeHook for button elements in IE6/7 (#1954)
                value: {
                        get: function( elem, name ) {
                                if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
                                        return nodeHook.get( elem, name );
                                }
                                return name in elem ?
                                        elem.value :
                                        null;
                        },
                        set: function( elem, value, name ) {
                                if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
                                        return nodeHook.set( elem, value, name );
                                }
                                // Does not return so that setAttribute is also used
                                elem.value = value;
                        }
                }
        },

        propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
        },

        prop: function( elem, name, value ) {
                var ret, hooks, notxml,
                        nType = elem.nodeType;

                // don't get/set properties on text, comment and attribute nodes
                if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                        return;
                }

                notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

                if ( notxml ) {
                        // Fix name and attach hooks
                        name = jQuery.propFix[ name ] || name;
                        hooks = jQuery.propHooks[ name ];
                }

                if ( value !== undefined ) {
                        if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                                return ret;

                        } else {
                                return ( elem[ name ] = value );
                        }

                } else {
                        if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                                return ret;

                        } else {
                                return elem[ name ];
                        }
                }
        },

        propHooks: {
                tabIndex: {
                        get: function( elem ) {
                                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                                var attributeNode = elem.getAttributeNode("tabindex");

                                return attributeNode && attributeNode.specified ?
                                        parseInt( attributeNode.value, 10 ) :
                                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                                                0 :
                                                undefined;
                        }
                }
        }
});

// Hook for boolean attributes
boolHook = {
        get: function( elem, name ) {
                // Align boolean attributes with corresponding properties
                // Fall back to attribute presence where some booleans are not supported
                var attrNode,
                        property = jQuery.prop( elem, name );
                return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
                        name.toLowerCase() :
                        undefined;
        },
        set: function( elem, value, name ) {
                var propName;
                if ( value === false ) {
                        // Remove boolean attributes when set to false
                        jQuery.removeAttr( elem, name );
                } else {
                        // value is true since we know at this point it's type boolean and not false
                        // Set boolean attributes to the same name and set the DOM property
                        propName = jQuery.propFix[ name ] || name;
                        if ( propName in elem ) {
                                // Only set the IDL specifically if it already exists on the element
                                elem[ propName ] = true;
                        }

                        elem.setAttribute( name, name.toLowerCase() );
                }
                return name;
        }
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

        fixSpecified = {
                name: true,
                id: true,
                coords: true
        };

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = jQuery.valHooks.button = {
                get: function( elem, name ) {
                        var ret;
                        ret = elem.getAttributeNode( name );
                        return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
                                ret.value :
                                undefined;
                },
                set: function( elem, value, name ) {
                        // Set the existing or create a new attribute node
                        var ret = elem.getAttributeNode( name );
                        if ( !ret ) {
                                ret = document.createAttribute( name );
                                elem.setAttributeNode( ret );
                        }
                        return ( ret.value = value + "" );
                }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each([ "width", "height" ], function( i, name ) {
                jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
                        set: function( elem, value ) {
                                if ( value === "" ) {
                                        elem.setAttribute( name, "auto" );
                                        return value;
                                }
                        }
                });
        });

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
                get: nodeHook.get,
                set: function( elem, value, name ) {
                        if ( value === "" ) {
                                value = "false";
                        }
                        nodeHook.set( elem, value, name );
                }
        };
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
        jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
                jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
                        get: function( elem ) {
                                var ret = elem.getAttribute( name, 2 );
                                return ret === null ? undefined : ret;
                        }
                });
        });
}

if ( !jQuery.support.style ) {
        jQuery.attrHooks.style = {
                get: function( elem ) {
                        // Return undefined in the case of empty string
                        // Normalize to lowercase since IE uppercases css property names
                        return elem.style.cssText.toLowerCase() || undefined;
                },
                set: function( elem, value ) {
                        return ( elem.style.cssText = value + "" );
                }
        };
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
        jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
                get: function( elem ) {
                        var parent = elem.parentNode;

                        if ( parent ) {
                                parent.selectedIndex;

                                // Make sure that it also works with optgroups, see #5701
                                if ( parent.parentNode ) {
                                        parent.parentNode.selectedIndex;
                                }
                        }
                        return null;
                }
        });
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
        jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
        jQuery.each([ "radio", "checkbox" ], function() {
                jQuery.valHooks[ this ] = {
                        get: function( elem ) {
                                // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                                return elem.getAttribute("value") === null ? "on" : elem.value;
                        }
                };
        });
}
jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
                set: function( elem, value ) {
                        if ( jQuery.isArray( value ) ) {
                                return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
                        }
                }
        });
});
var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        hoverHack = function( events ) {
                return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
        };

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

        add: function( elem, types, handler, data, selector ) {

                var elemData, eventHandle, events,
                        t, tns, type, namespaces, handleObj,
                        handleObjIn, handlers, special;

                // Don't attach events to noData or text/comment nodes (allow plain objects tho)
                if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
                        return;
                }

                // Caller can pass in an object of custom data in lieu of the handler
                if ( handler.handler ) {
                        handleObjIn = handler;
                        handler = handleObjIn.handler;
                        selector = handleObjIn.selector;
                }

                // Make sure that the handler has a unique ID, used to find/remove it later
                if ( !handler.guid ) {
                        handler.guid = jQuery.guid++;
                }

                // Init the element's event structure and main handler, if this is the first
                events = elemData.events;
                if ( !events ) {
                        elemData.events = events = {};
                }
                eventHandle = elemData.handle;
                if ( !eventHandle ) {
                        elemData.handle = eventHandle = function( e ) {
                                // Discard the second event of a jQuery.event.trigger() and
                                // when an event is called after a page has unloaded
                                return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
                                        jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
                                        undefined;
                        };
                        // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                        eventHandle.elem = elem;
                }

                // Handle multiple events separated by a space
                // jQuery(...).bind("mouseover mouseout", fn);
                types = jQuery.trim( hoverHack(types) ).split( " " );
                for ( t = 0; t < types.length; t++ ) {

                        tns = rtypenamespace.exec( types[t] ) || [];
                        type = tns[1];
                        namespaces = ( tns[2] || "" ).split( "." ).sort();

                        // If event changes its type, use the special event handlers for the changed type
                        special = jQuery.event.special[ type ] || {};

                        // If selector defined, determine special event api type, otherwise given type
                        type = ( selector ? special.delegateType : special.bindType ) || type;

                        // Update special based on newly reset type
                        special = jQuery.event.special[ type ] || {};

                        // handleObj is passed to all event handlers
                        handleObj = jQuery.extend({
                                type: type,
                                origType: tns[1],
                                data: data,
                                handler: handler,
                                guid: handler.guid,
                                selector: selector,
                                needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                                namespace: namespaces.join(".")
                        }, handleObjIn );

                        // Init the event handler queue if we're the first
                        handlers = events[ type ];
                        if ( !handlers ) {
                                handlers = events[ type ] = [];
                                handlers.delegateCount = 0;

                                // Only use addEventListener/attachEvent if the special events handler returns false
                                if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
                                        // Bind the global event handler to the element
                                        if ( elem.addEventListener ) {
                                                elem.addEventListener( type, eventHandle, false );

                                        } else if ( elem.attachEvent ) {
                                                elem.attachEvent( "on" + type, eventHandle );
                                        }
                                }
                        }

                        if ( special.add ) {
                                special.add.call( elem, handleObj );

                                if ( !handleObj.handler.guid ) {
                                        handleObj.handler.guid = handler.guid;
                                }
                        }

                        // Add to the element's handler list, delegates in front
                        if ( selector ) {
                                handlers.splice( handlers.delegateCount++, 0, handleObj );
                        } else {
                                handlers.push( handleObj );
                        }

                        // Keep track of which events have ever been used, for event optimization
                        jQuery.event.global[ type ] = true;
                }

                // Nullify elem to prevent memory leaks in IE
                elem = null;
        },

        global: {},

        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {

                var t, tns, type, origType, namespaces, origCount,
                        j, events, special, eventType, handleObj,
                        elemData = jQuery.hasData( elem ) && jQuery._data( elem );

                if ( !elemData || !(events = elemData.events) ) {
                        return;
                }

                // Once for each type.namespace in types; type may be omitted
                types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
                for ( t = 0; t < types.length; t++ ) {
                        tns = rtypenamespace.exec( types[t] ) || [];
                        type = origType = tns[1];
                        namespaces = tns[2];

                        // Unbind all events (on this namespace, if provided) for the element
                        if ( !type ) {
                                for ( type in events ) {
                                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                                }
                                continue;
                        }

                        special = jQuery.event.special[ type ] || {};
                        type = ( selector? special.delegateType : special.bindType ) || type;
                        eventType = events[ type ] || [];
                        origCount = eventType.length;
                        namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

                        // Remove matching events
                        for ( j = 0; j < eventType.length; j++ ) {
                                handleObj = eventType[ j ];

                                if ( ( mappedTypes || origType === handleObj.origType ) &&
                                         ( !handler || handler.guid === handleObj.guid ) &&
                                         ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
                                         ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
                                        eventType.splice( j--, 1 );

                                        if ( handleObj.selector ) {
                                                eventType.delegateCount--;
                                        }
                                        if ( special.remove ) {
                                                special.remove.call( elem, handleObj );
                                        }
                                }
                        }

                        // Remove generic event handler if we removed something and no more handlers exist
                        // (avoids potential for endless recursion during removal of special event handlers)
                        if ( eventType.length === 0 && origCount !== eventType.length ) {
                                if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                                        jQuery.removeEvent( elem, type, elemData.handle );
                                }

                                delete events[ type ];
                        }
                }

                // Remove the expando if it's no longer used
                if ( jQuery.isEmptyObject( events ) ) {
                        delete elemData.handle;

                        // removeData also checks for emptiness and clears the expando if empty
                        // so use it instead of delete
                        jQuery.removeData( elem, "events", true );
                }
        },

        // Events that are safe to short-circuit if no handlers are attached.
        // Native DOM events should not be added, they may have inline handlers.
        customEvent: {
                "getData": true,
                "setData": true,
                "changeData": true
        },

        trigger: function( event, data, elem, onlyHandlers ) {
                // Don't do events on text and comment nodes
                if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
                        return;
                }

                // Event object or event type
                var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
                        type = event.type || event,
                        namespaces = [];

                // focus/blur morphs to focusin/out; ensure we're not firing them right now
                if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                        return;
                }

                if ( type.indexOf( "!" ) >= 0 ) {
                        // Exclusive events trigger only for the exact event (no namespaces)
                        type = type.slice(0, -1);
                        exclusive = true;
                }

                if ( type.indexOf( "." ) >= 0 ) {
                        // Namespaced trigger; create a regexp to match event type in handle()
                        namespaces = type.split(".");
                        type = namespaces.shift();
                        namespaces.sort();
                }

                if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
                        // No jQuery handlers for this event type, and it can't have inline handlers
                        return;
                }

                // Caller can pass in an Event, Object, or just an event type string
                event = typeof event === "object" ?
                        // jQuery.Event object
                        event[ jQuery.expando ] ? event :
                        // Object literal
                        new jQuery.Event( type, event ) :
                        // Just the event type (string)
                        new jQuery.Event( type );

                event.type = type;
                event.isTrigger = true;
                event.exclusive = exclusive;
                event.namespace = namespaces.join( "." );
                event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

                // Handle a global trigger
                if ( !elem ) {

                        // TODO: Stop taunting the data cache; remove global events and always attach to document
                        cache = jQuery.cache;
                        for ( i in cache ) {
                                if ( cache[ i ].events && cache[ i ].events[ type ] ) {
                                        jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
                                }
                        }
                        return;
                }

                // Clean up the event in case it is being reused
                event.result = undefined;
                if ( !event.target ) {
                        event.target = elem;
                }

                // Clone any incoming data and prepend the event, creating the handler arg list
                data = data != null ? jQuery.makeArray( data ) : [];
                data.unshift( event );

                // Allow special events to draw outside the lines
                special = jQuery.event.special[ type ] || {};
                if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
                        return;
                }

                // Determine event propagation path in advance, per W3C events spec (#9951)
                // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                eventPath = [[ elem, special.bindType || type ]];
                if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

                        bubbleType = special.delegateType || type;
                        cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
                        for ( old = elem; cur; cur = cur.parentNode ) {
                                eventPath.push([ cur, bubbleType ]);
                                old = cur;
                        }

                        // Only add window if we got to document (e.g., not plain obj or detached DOM)
                        if ( old === (elem.ownerDocument || document) ) {
                                eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
                        }
                }

                // Fire handlers on the event path
                for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

                        cur = eventPath[i][0];
                        event.type = eventPath[i][1];

                        handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
                        if ( handle ) {
                                handle.apply( cur, data );
                        }
                        // Note that this is a bare JS function and not a jQuery handler
                        handle = ontype && cur[ ontype ];
                        if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
                                event.preventDefault();
                        }
                }
                event.type = type;

                // If nobody prevented the default action, do it now
                if ( !onlyHandlers && !event.isDefaultPrevented() ) {

                        if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
                                !(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

                                // Call a native DOM method on the target with the same name name as the event.
                                // Can't use an .isFunction() check here because IE6/7 fails that test.
                                // Don't do default actions on window, that's where global variables be (#6170)
                                // IE<9 dies on focus/blur to hidden element (#1486)
                                if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

                                        // Don't re-trigger an onFOO event when we call its FOO() method
                                        old = elem[ ontype ];

                                        if ( old ) {
                                                elem[ ontype ] = null;
                                        }

                                        // Prevent re-triggering of the same event, since we already bubbled it above
                                        jQuery.event.triggered = type;
                                        elem[ type ]();
                                        jQuery.event.triggered = undefined;

                                        if ( old ) {
                                                elem[ ontype ] = old;
                                        }
                                }
                        }
                }

                return event.result;
        },

        dispatch: function( event ) {

                // Make a writable jQuery.Event from the native event object
                event = jQuery.event.fix( event || window.event );

                var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
                        handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
                        delegateCount = handlers.delegateCount,
                        args = core_slice.call( arguments ),
                        run_all = !event.exclusive && !event.namespace,
                        special = jQuery.event.special[ event.type ] || {},
                        handlerQueue = [];

                // Use the fix-ed jQuery.Event rather than the (read-only) native event
                args[0] = event;
                event.delegateTarget = this;

                // Call the preDispatch hook for the mapped type, and let it bail if desired
                if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                        return;
                }

                // Determine handlers that should run if there are delegated events
                // Avoid non-left-click bubbling in Firefox (#3861)
                if ( delegateCount && !(event.button && event.type === "click") ) {

                        for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

                                // Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
                                if ( cur.disabled !== true || event.type !== "click" ) {
                                        selMatch = {};
                                        matches = [];
                                        for ( i = 0; i < delegateCount; i++ ) {
                                                handleObj = handlers[ i ];
                                                sel = handleObj.selector;

                                                if ( selMatch[ sel ] === undefined ) {
                                                        selMatch[ sel ] = handleObj.needsContext ?
                                                                jQuery( sel, this ).index( cur ) >= 0 :
                                                                jQuery.find( sel, this, null, [ cur ] ).length;
                                                }
                                                if ( selMatch[ sel ] ) {
                                                        matches.push( handleObj );
                                                }
                                        }
                                        if ( matches.length ) {
                                                handlerQueue.push({ elem: cur, matches: matches });
                                        }
                                }
                        }
                }

                // Add the remaining (directly-bound) handlers
                if ( handlers.length > delegateCount ) {
                        handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
                }

                // Run delegates first; they may want to stop propagation beneath us
                for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
                        matched = handlerQueue[ i ];
                        event.currentTarget = matched.elem;

                        for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
                                handleObj = matched.matches[ j ];

                                // Triggered event must either 1) be non-exclusive and have no namespace, or
                                // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                                if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

                                        event.data = handleObj.data;
                                        event.handleObj = handleObj;

                                        ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                                                        .apply( matched.elem, args );

                                        if ( ret !== undefined ) {
                                                event.result = ret;
                                                if ( ret === false ) {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                }
                                        }
                                }
                        }
                }

                // Call the postDispatch hook for the mapped type
                if ( special.postDispatch ) {
                        special.postDispatch.call( this, event );
                }

                return event.result;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function( event, original ) {

                        // Add which for key events
                        if ( event.which == null ) {
                                event.which = original.charCode != null ? original.charCode : original.keyCode;
                        }

                        return event;
                }
        },

        mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function( event, original ) {
                        var eventDoc, doc, body,
                                button = original.button,
                                fromElement = original.fromElement;

                        // Calculate pageX/Y if missing and clientX/Y available
                        if ( event.pageX == null && original.clientX != null ) {
                                eventDoc = event.target.ownerDocument || document;
                                doc = eventDoc.documentElement;
                                body = eventDoc.body;

                                event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                                event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
                        }

                        // Add relatedTarget, if necessary
                        if ( !event.relatedTarget && fromElement ) {
                                event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                        }

                        // Add which for click: 1 === left; 2 === middle; 3 === right
                        // Note: button is not normalized, so don't use it
                        if ( !event.which && button !== undefined ) {
                                event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                        }

                        return event;
                }
        },

        fix: function( event ) {
                if ( event[ jQuery.expando ] ) {
                        return event;
                }

                // Create a writable copy of the event object and normalize some properties
                var i, prop,
                        originalEvent = event,
                        fixHook = jQuery.event.fixHooks[ event.type ] || {},
                        copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

                event = jQuery.Event( originalEvent );

                for ( i = copy.length; i; ) {
                        prop = copy[ --i ];
                        event[ prop ] = originalEvent[ prop ];
                }

                // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
                if ( !event.target ) {
                        event.target = originalEvent.srcElement || document;
                }

                // Target should not be a text node (#504, Safari)
                if ( event.target.nodeType === 3 ) {
                        event.target = event.target.parentNode;
                }

                // For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
                event.metaKey = !!event.metaKey;

                return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
        },

        special: {
                load: {
                        // Prevent triggered image.load events from bubbling to window.load
                        noBubble: true
                },

                focus: {
                        delegateType: "focusin"
                },
                blur: {
                        delegateType: "focusout"
                },

                beforeunload: {
                        setup: function( data, namespaces, eventHandle ) {
                                // We only want to do this special case on windows
                                if ( jQuery.isWindow( this ) ) {
                                        this.onbeforeunload = eventHandle;
                                }
                        },

                        teardown: function( namespaces, eventHandle ) {
                                if ( this.onbeforeunload === eventHandle ) {
                                        this.onbeforeunload = null;
                                }
                        }
                }
        },

        simulate: function( type, elem, event, bubble ) {
                // Piggyback on a donor event to simulate a different one.
                // Fake originalEvent to avoid donor's stopPropagation, but if the
                // simulated event prevents default then we do the same on the donor.
                var e = jQuery.extend(
                        new jQuery.Event(),
                        event,
                        { type: type,
                                isSimulated: true,
                                originalEvent: {}
                        }
                );
                if ( bubble ) {
                        jQuery.event.trigger( e, null, elem );
                } else {
                        jQuery.event.dispatch.call( elem, e );
                }
                if ( e.isDefaultPrevented() ) {
                        event.preventDefault();
                }
        }
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
        function( elem, type, handle ) {
                if ( elem.removeEventListener ) {
                        elem.removeEventListener( type, handle, false );
                }
        } :
        function( elem, type, handle ) {
                var name = "on" + type;

                if ( elem.detachEvent ) {

                        // #8545, #7054, preventing memory leaks for custom events in IE6-8
                        // detachEvent needed property on element, by name of that event, to properly expose it to GC
                        if ( typeof elem[ name ] === "undefined" ) {
                                elem[ name ] = null;
                        }

                        elem.detachEvent( name, handle );
                }
        };

jQuery.Event = function( src, props ) {
        // Allow instantiation without the 'new' keyword
        if ( !(this instanceof jQuery.Event) ) {
                return new jQuery.Event( src, props );
        }

        // Event object
        if ( src && src.type ) {
                this.originalEvent = src;
                this.type = src.type;

                // Events bubbling up the document may have been marked as prevented
                // by a handler lower down the tree; reflect the correct value.
                this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
                        src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

        // Event type
        } else {
                this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if ( props ) {
                jQuery.extend( this, props );
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
};

function returnFalse() {
        return false;
}
function returnTrue() {
        return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
        preventDefault: function() {
                this.isDefaultPrevented = returnTrue;

                var e = this.originalEvent;
                if ( !e ) {
                        return;
                }

                // if preventDefault exists run it on the original event
                if ( e.preventDefault ) {
                        e.preventDefault();

                // otherwise set the returnValue property of the original event to false (IE)
                } else {
                        e.returnValue = false;
                }
        },
        stopPropagation: function() {
                this.isPropagationStopped = returnTrue;

                var e = this.originalEvent;
                if ( !e ) {
                        return;
                }
                // if stopPropagation exists run it on the original event
                if ( e.stopPropagation ) {
                        e.stopPropagation();
                }
                // otherwise set the cancelBubble property of the original event to true (IE)
                e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = returnTrue;
                this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
}, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
                delegateType: fix,
                bindType: fix,

                handle: function( event ) {
                        var ret,
                                target = this,
                                related = event.relatedTarget,
                                handleObj = event.handleObj,
                                selector = handleObj.selector;

                        // For mousenter/leave call the handler if related is outside the target.
                        // NB: No relatedTarget if the mouse left/entered the browser window
                        if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                                event.type = handleObj.origType;
                                ret = handleObj.handler.apply( this, arguments );
                                event.type = fix;
                        }
                        return ret;
                }
        };
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

        jQuery.event.special.submit = {
                setup: function() {
                        // Only need this for delegated form submit events
                        if ( jQuery.nodeName( this, "form" ) ) {
                                return false;
                        }

                        // Lazy-add a submit handler when a descendant form may potentially be submitted
                        jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
                                // Node name check avoids a VML-related crash in IE (#9807)
                                var elem = e.target,
                                        form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
                                if ( form && !jQuery._data( form, "_submit_attached" ) ) {
                                        jQuery.event.add( form, "submit._submit", function( event ) {
                                                event._submit_bubble = true;
                                        });
                                        jQuery._data( form, "_submit_attached", true );
                                }
                        });
                        // return undefined since we don't need an event listener
                },

                postDispatch: function( event ) {
                        // If form was submitted by the user, bubble the event up the tree
                        if ( event._submit_bubble ) {
                                delete event._submit_bubble;
                                if ( this.parentNode && !event.isTrigger ) {
                                        jQuery.event.simulate( "submit", this.parentNode, event, true );
                                }
                        }
                },

                teardown: function() {
                        // Only need this for delegated form submit events
                        if ( jQuery.nodeName( this, "form" ) ) {
                                return false;
                        }

                        // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                        jQuery.event.remove( this, "._submit" );
                }
        };
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

        jQuery.event.special.change = {

                setup: function() {

                        if ( rformElems.test( this.nodeName ) ) {
                                // IE doesn't fire change on a check/radio until blur; trigger it on click
                                // after a propertychange. Eat the blur-change in special.change.handle.
                                // This still fires onchange a second time for check/radio after blur.
                                if ( this.type === "checkbox" || this.type === "radio" ) {
                                        jQuery.event.add( this, "propertychange._change", function( event ) {
                                                if ( event.originalEvent.propertyName === "checked" ) {
                                                        this._just_changed = true;
                                                }
                                        });
                                        jQuery.event.add( this, "click._change", function( event ) {
                                                if ( this._just_changed && !event.isTrigger ) {
                                                        this._just_changed = false;
                                                }
                                                // Allow triggered, simulated change events (#11500)
                                                jQuery.event.simulate( "change", this, event, true );
                                        });
                                }
                                return false;
                        }
                        // Delegated event; lazy-add a change handler on descendant inputs
                        jQuery.event.add( this, "beforeactivate._change", function( e ) {
                                var elem = e.target;

                                if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
                                        jQuery.event.add( elem, "change._change", function( event ) {
                                                if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                                                        jQuery.event.simulate( "change", this.parentNode, event, true );
                                                }
                                        });
                                        jQuery._data( elem, "_change_attached", true );
                                }
                        });
                },

                handle: function( event ) {
                        var elem = event.target;

                        // Swallow native change events from checkbox/radio, we already triggered them above
                        if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
                                return event.handleObj.handler.apply( this, arguments );
                        }
                },

                teardown: function() {
                        jQuery.event.remove( this, "._change" );

                        return !rformElems.test( this.nodeName );
                }
        };
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

                // Attach a single capturing handler while someone wants focusin/focusout
                var attaches = 0,
                        handler = function( event ) {
                                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
                        };

                jQuery.event.special[ fix ] = {
                        setup: function() {
                                if ( attaches++ === 0 ) {
                                        document.addEventListener( orig, handler, true );
                                }
                        },
                        teardown: function() {
                                if ( --attaches === 0 ) {
                                        document.removeEventListener( orig, handler, true );
                                }
                        }
                };
        });
}

jQuery.fn.extend({

        on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
                var origFn, type;

                // Types can be a map of types/handlers
                if ( typeof types === "object" ) {
                        // ( types-Object, selector, data )
                        if ( typeof selector !== "string" ) { // && selector != null
                                // ( types-Object, data )
                                data = data || selector;
                                selector = undefined;
                        }
                        for ( type in types ) {
                                this.on( type, selector, data, types[ type ], one );
                        }
                        return this;
                }

                if ( data == null && fn == null ) {
                        // ( types, fn )
                        fn = selector;
                        data = selector = undefined;
                } else if ( fn == null ) {
                        if ( typeof selector === "string" ) {
                                // ( types, selector, fn )
                                fn = data;
                                data = undefined;
                        } else {
                                // ( types, data, fn )
                                fn = data;
                                data = selector;
                                selector = undefined;
                        }
                }
                if ( fn === false ) {
                        fn = returnFalse;
                } else if ( !fn ) {
                        return this;
                }

                if ( one === 1 ) {
                        origFn = fn;
                        fn = function( event ) {
                                // Can use an empty set, since event contains the info
                                jQuery().off( event );
                                return origFn.apply( this, arguments );
                        };
                        // Use same guid so caller can remove using origFn
                        fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
                }
                return this.each( function() {
                        jQuery.event.add( this, types, fn, data, selector );
                });
        },
        one: function( types, selector, data, fn ) {
                return this.on( types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
                var handleObj, type;
                if ( types && types.preventDefault && types.handleObj ) {
                        // ( event )  dispatched jQuery.Event
                        handleObj = types.handleObj;
                        jQuery( types.delegateTarget ).off(
                                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                                handleObj.selector,
                                handleObj.handler
                        );
                        return this;
                }
                if ( typeof types === "object" ) {
                        // ( types-object [, selector] )
                        for ( type in types ) {
                                this.off( type, selector, types[ type ] );
                        }
                        return this;
                }
                if ( selector === false || typeof selector === "function" ) {
                        // ( types [, fn] )
                        fn = selector;
                        selector = undefined;
                }
                if ( fn === false ) {
                        fn = returnFalse;
                }
                return this.each(function() {
                        jQuery.event.remove( this, types, fn, selector );
                });
        },

        bind: function( types, data, fn ) {
                return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
                return this.off( types, null, fn );
        },

        live: function( types, data, fn ) {
                jQuery( this.context ).on( types, this.selector, data, fn );
                return this;
        },
        die: function( types, fn ) {
                jQuery( this.context ).off( types, this.selector || "**", fn );
                return this;
        },

        delegate: function( selector, types, data, fn ) {
                return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {
                // ( namespace ) or ( selector, types [, fn] )
                return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
        },

        trigger: function( type, data ) {
                return this.each(function() {
                        jQuery.event.trigger( type, data, this );
                });
        },
        triggerHandler: function( type, data ) {
                if ( this[0] ) {
                        return jQuery.event.trigger( type, data, this[0], true );
                }
        },

        toggle: function( fn ) {
                // Save reference to arguments for access in closure
                var args = arguments,
                        guid = fn.guid || jQuery.guid++,
                        i = 0,
                        toggler = function( event ) {
                                // Figure out which function to execute
                                var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
                                jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

                                // Make sure that clicks stop
                                event.preventDefault();

                                // and execute the function
                                return args[ lastToggle ].apply( this, arguments ) || false;
                        };

                // link all the functions, so any of them can unbind this click handler
                toggler.guid = guid;
                while ( i < args.length ) {
                        args[ i++ ].guid = guid;
                }

                return this.click( toggler );
        },

        hover: function( fnOver, fnOut ) {
                return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        }
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

        // Handle event binding
        jQuery.fn[ name ] = function( data, fn ) {
                if ( fn == null ) {
                        fn = data;
                        data = null;
                }

                return arguments.length > 0 ?
                        this.on( name, null, data, fn ) :
                        this.trigger( name );
        };

        if ( rkeyEvent.test( name ) ) {
                jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
        }

        if ( rmouseEvent.test( name ) ) {
                jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
        }
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
        assertGetIdNotName,
        Expr,
        getText,
        isXML,
        contains,
        compile,
        sortOrder,
        hasDuplicate,
        outermostContext,

        baseHasDuplicate = true,
        strundefined = "undefined",

        expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

        Token = String,
        document = window.document,
        docElem = document.documentElement,
        dirruns = 0,
        done = 0,
        pop = [].pop,
        push = [].push,
        slice = [].slice,
        // Use a stripped-down indexOf if a native one is unavailable
        indexOf = [].indexOf || function( elem ) {
                var i = 0,
                        len = this.length;
                for ( ; i < len; i++ ) {
                        if ( this[i] === elem ) {
                                return i;
                        }
                }
                return -1;
        },

        // Augment a function for special use by Sizzle
        markFunction = function( fn, value ) {
                fn[ expando ] = value == null || value;
                return fn;
        },

        createCache = function() {
                var cache = {},
                        keys = [];

                return markFunction(function( key, value ) {
                        // Only keep the most recent entries
                        if ( keys.push( key ) > Expr.cacheLength ) {
                                delete cache[ keys.shift() ];
                        }

                        // Retrieve with (key + " ") to avoid collision with native Object.prototype properties (see Issue #157)
                        return (cache[ key + " " ] = value);
                }, cache );
        },

        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),

        // Regex

        // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]",
        // http://www.w3.org/TR/css3-syntax/#characters
        characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

        // Loosely modeled on CSS identifier characters
        // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
        // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
        identifier = characterEncoding.replace( "w", "w#" ),

        // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
        operators = "([*^$|!~]?=)",
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

        // Prefer arguments not in parens/brackets,
        //   then attribute selectors and non-pseudos (denoted by :),
        //   then anything else
        // These preferences are here to reduce the number of selectors
        //   needing tokenize in the PSEUDO preFilter
        pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

        // For matchExpr.POS and matchExpr.needsContext
        pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
                "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

        rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
        rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
        rpseudo = new RegExp( pseudos ),

        // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

        rnot = /^:not/,
        rsibling = /[\x20\t\r\n\f]*[+~]/,
        rendsWithNot = /:not\($/,

        rheader = /h\d/i,
        rinputs = /input|select|textarea|button/i,

        rbackslash = /\\(?!\\)/g,

        matchExpr = {
                "ID": new RegExp( "^#(" + characterEncoding + ")" ),
                "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
                "NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
                "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
                "ATTR": new RegExp( "^" + attributes ),
                "PSEUDO": new RegExp( "^" + pseudos ),
                "POS": new RegExp( pos, "i" ),
                "CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                // For use in libraries implementing .is()
                "needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
        },

        // Support

        // Used for testing something on an element
        assert = function( fn ) {
                var div = document.createElement("div");

                try {
                        return fn( div );
                } catch (e) {
                        return false;
                } finally {
                        // release memory in IE
                        div = null;
                }
        },

        // Check if getElementsByTagName("*") returns only elements
        assertTagNameNoComments = assert(function( div ) {
                div.appendChild( document.createComment("") );
                return !div.getElementsByTagName("*").length;
        }),

        // Check if getAttribute returns normalized href attributes
        assertHrefNotNormalized = assert(function( div ) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
                        div.firstChild.getAttribute("href") === "#";
        }),

        // Check if attributes should be retrieved by attribute nodes
        assertAttributes = assert(function( div ) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                // IE8 returns a string for some attributes even when not present
                return type !== "boolean" && type !== "string";
        }),

        // Check if getElementsByClassName can be trusted
        assertUsableClassName = assert(function( div ) {
                // Opera can't find a second classname (in 9.6)
                div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
                        return false;
                }

                // Safari 3.2 caches class attributes and doesn't catch changes
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length === 2;
        }),

        // Check if getElementById returns elements by name
        // Check if getElementsByName privileges form controls or returns elements by ID
        assertUsableName = assert(function( div ) {
                // Inject content
                div.id = expando + 0;
                div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
                docElem.insertBefore( div, docElem.firstChild );

                // Test
                var pass = document.getElementsByName &&
                        // buggy browsers will return fewer than the correct 2
                        document.getElementsByName( expando ).length === 2 +
                        // buggy browsers will return more than the correct 0
                        document.getElementsByName( expando + 0 ).length;
                assertGetIdNotName = !document.getElementById( expando );

                // Cleanup
                docElem.removeChild( div );

                return pass;
        });

// If slice is not available, provide a backup
try {
        slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
        slice = function( i ) {
                var elem,
                        results = [];
                for ( ; (elem = this[i]); i++ ) {
                        results.push( elem );
                }
                return results;
        };
}

function Sizzle( selector, context, results, seed ) {
        results = results || [];
        context = context || document;
        var match, elem, xml, m,
                nodeType = context.nodeType;

        if ( !selector || typeof selector !== "string" ) {
                return results;
        }

        if ( nodeType !== 1 && nodeType !== 9 ) {
                return [];
        }

        xml = isXML( context );

        if ( !xml && !seed ) {
                if ( (match = rquickExpr.exec( selector )) ) {
                        // Speed-up: Sizzle("#ID")
                        if ( (m = match[1]) ) {
                                if ( nodeType === 9 ) {
                                        elem = context.getElementById( m );
                                        // Check parentNode to catch when Blackberry 4.6 returns
                                        // nodes that are no longer in the document #6963
                                        if ( elem && elem.parentNode ) {
                                                // Handle the case where IE, Opera, and Webkit return items
                                                // by name instead of ID
                                                if ( elem.id === m ) {
                                                        results.push( elem );
                                                        return results;
                                                }
                                        } else {
                                                return results;
                                        }
                                } else {
                                        // Context is not a document
                                        if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                                                contains( context, elem ) && elem.id === m ) {
                                                results.push( elem );
                                                return results;
                                        }
                                }

                        // Speed-up: Sizzle("TAG")
                        } else if ( match[2] ) {
                                push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
                                return results;

                        // Speed-up: Sizzle(".CLASS")
                        } else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
                                push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
                                return results;
                        }
                }
        }

        // All others
        return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
        return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
        return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
        return function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
        };
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
        return function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
        };
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
        return markFunction(function( argument ) {
                argument = +argument;
                return markFunction(function( seed, matches ) {
                        var j,
                                matchIndexes = fn( [], seed.length, argument ),
                                i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while ( i-- ) {
                                if ( seed[ (j = matchIndexes[i]) ] ) {
                                        seed[j] = !(matches[j] = seed[j]);
                                }
                        }
                });
        });
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
        var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

        if ( nodeType ) {
                if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                        // Use textContent for elements
                        // innerText usage removed for consistency of new lines (see #11153)
                        if ( typeof elem.textContent === "string" ) {
                                return elem.textContent;
                        } else {
                                // Traverse its children
                                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                                        ret += getText( elem );
                                }
                        }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                        return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
        } else {

                // If no nodeType, this is expected to be an array
                for ( ; (node = elem[i]); i++ ) {
                        // Do not traverse comment nodes
                        ret += getText( node );
                }
        }
        return ret;
};

isXML = Sizzle.isXML = function( elem ) {
        // documentElement is verified for cases where it doesn't yet exist
        // (such as loading iframes in IE - #4833)
        var documentElement = elem && (elem.ownerDocument || elem).documentElement;
        return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
        function( a, b ) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                        bup = b && b.parentNode;
                return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
        } :
        docElem.compareDocumentPosition ?
        function( a, b ) {
                return b && !!( a.compareDocumentPosition( b ) & 16 );
        } :
        function( a, b ) {
                while ( (b = b.parentNode) ) {
                        if ( b === a ) {
                                return true;
                        }
                }
                return false;
        };

Sizzle.attr = function( elem, name ) {
        var val,
                xml = isXML( elem );

        if ( !xml ) {
                name = name.toLowerCase();
        }
        if ( (val = Expr.attrHandle[ name ]) ) {
                return val( elem );
        }
        if ( xml || assertAttributes ) {
                return elem.getAttribute( name );
        }
        val = elem.getAttributeNode( name );
        return val ?
                typeof elem[ name ] === "boolean" ?
                        elem[ name ] ? name : null :
                        val.specified ? val.value : null :
                null;
};

Expr = Sizzle.selectors = {

        // Can be adjusted by the user
        cacheLength: 50,

        createPseudo: markFunction,

        match: matchExpr,

        // IE6/7 return a modified href
        attrHandle: assertHrefNotNormalized ?
                {} :
                {
                        "href": function( elem ) {
                                return elem.getAttribute( "href", 2 );
                        },
                        "type": function( elem ) {
                                return elem.getAttribute("type");
                        }
                },

        find: {
                "ID": assertGetIdNotName ?
                        function( id, context, xml ) {
                                if ( typeof context.getElementById !== strundefined && !xml ) {
                                        var m = context.getElementById( id );
                                        // Check parentNode to catch when Blackberry 4.6 returns
                                        // nodes that are no longer in the document #6963
                                        return m && m.parentNode ? [m] : [];
                                }
                        } :
                        function( id, context, xml ) {
                                if ( typeof context.getElementById !== strundefined && !xml ) {
                                        var m = context.getElementById( id );

                                        return m ?
                                                m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
                                                        [m] :
                                                        undefined :
                                                [];
                                }
                        },

                "TAG": assertTagNameNoComments ?
                        function( tag, context ) {
                                if ( typeof context.getElementsByTagName !== strundefined ) {
                                        return context.getElementsByTagName( tag );
                                }
                        } :
                        function( tag, context ) {
                                var results = context.getElementsByTagName( tag );

                                // Filter out possible comments
                                if ( tag === "*" ) {
                                        var elem,
                                                tmp = [],
                                                i = 0;

                                        for ( ; (elem = results[i]); i++ ) {
                                                if ( elem.nodeType === 1 ) {
                                                        tmp.push( elem );
                                                }
                                        }

                                        return tmp;
                                }
                                return results;
                        },

                "NAME": assertUsableName && function( tag, context ) {
                        if ( typeof context.getElementsByName !== strundefined ) {
                                return context.getElementsByName( name );
                        }
                },

                "CLASS": assertUsableClassName && function( className, context, xml ) {
                        if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
                                return context.getElementsByClassName( className );
                        }
                }
        },

        relative: {
                ">": { dir: "parentNode", first: true },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: true },
                "~": { dir: "previousSibling" }
        },

        preFilter: {
                "ATTR": function( match ) {
                        match[1] = match[1].replace( rbackslash, "" );

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

                        if ( match[2] === "~=" ) {
                                match[3] = " " + match[3] + " ";
                        }

                        return match.slice( 0, 4 );
                },

                "CHILD": function( match ) {
                        /* matches from matchExpr["CHILD"]
                                1 type (only|nth|...)
                                2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                                3 xn-component of xn+y argument ([+-]?\d*n|)
                                4 sign of xn-component
                                5 x of xn-component
                                6 sign of y-component
                                7 y of y-component
                        */
                        match[1] = match[1].toLowerCase();

                        if ( match[1] === "nth" ) {
                                // nth-child requires argument
                                if ( !match[2] ) {
                                        Sizzle.error( match[0] );
                                }

                                // numeric x and y parameters for Expr.filter.CHILD
                                // remember that false/true cast respectively to 0/1
                                match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
                                match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

                        // other types prohibit arguments
                        } else if ( match[2] ) {
                                Sizzle.error( match[0] );
                        }

                        return match;
                },

                "PSEUDO": function( match ) {
                        var unquoted, excess;
                        if ( matchExpr["CHILD"].test( match[0] ) ) {
                                return null;
                        }

                        if ( match[3] ) {
                                match[2] = match[3];
                        } else if ( (unquoted = match[4]) ) {
                                // Only check arguments that contain a pseudo
                                if ( rpseudo.test(unquoted) &&
                                        // Get excess from tokenize (recursively)
                                        (excess = tokenize( unquoted, true )) &&
                                        // advance to the next closing parenthesis
                                        (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                                        // excess is a negative index
                                        unquoted = unquoted.slice( 0, excess );
                                        match[0] = match[0].slice( 0, excess );
                                }
                                match[2] = unquoted;
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice( 0, 3 );
                }
        },

        filter: {
                "ID": assertGetIdNotName ?
                        function( id ) {
                                id = id.replace( rbackslash, "" );
                                return function( elem ) {
                                        return elem.getAttribute("id") === id;
                                };
                        } :
                        function( id ) {
                                id = id.replace( rbackslash, "" );
                                return function( elem ) {
                                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                                        return node && node.value === id;
                                };
                        },

                "TAG": function( nodeName ) {
                        if ( nodeName === "*" ) {
                                return function() { return true; };
                        }
                        nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

                        return function( elem ) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                },

                "CLASS": function( className ) {
                        var pattern = classCache[ expando ][ className + " " ];

                        return pattern ||
                                (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                                classCache( className, function( elem ) {
                                        return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
                                });
                },

                "ATTR": function( name, operator, check ) {
                        return function( elem, context ) {
                                var result = Sizzle.attr( elem, name );

                                if ( result == null ) {
                                        return operator === "!=";
                                }
                                if ( !operator ) {
                                        return true;
                                }

                                result += "";

                                return operator === "=" ? result === check :
                                        operator === "!=" ? result !== check :
                                        operator === "^=" ? check && result.indexOf( check ) === 0 :
                                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                                        operator === "$=" ? check && result.substr( result.length - check.length ) === check :
                                        operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                                        operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
                                        false;
                        };
                },

                "CHILD": function( type, argument, first, last ) {

                        if ( type === "nth" ) {
                                return function( elem ) {
                                        var node, diff,
                                                parent = elem.parentNode;

                                        if ( first === 1 && last === 0 ) {
                                                return true;
                                        }

                                        if ( parent ) {
                                                diff = 0;
                                                for ( node = parent.firstChild; node; node = node.nextSibling ) {
                                                        if ( node.nodeType === 1 ) {
                                                                diff++;
                                                                if ( elem === node ) {
                                                                        break;
                                                                }
                                                        }
                                                }
                                        }

                                        // Incorporate the offset (or cast to NaN), then check against cycle size
                                        diff -= last;
                                        return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                };
                        }

                        return function( elem ) {
                                var node = elem;

                                switch ( type ) {
                                        case "only":
                                        case "first":
                                                while ( (node = node.previousSibling) ) {
                                                        if ( node.nodeType === 1 ) {
                                                                return false;
                                                        }
                                                }

                                                if ( type === "first" ) {
                                                        return true;
                                                }

                                                node = elem;

                                                /* falls through */
                                        case "last":
                                                while ( (node = node.nextSibling) ) {
                                                        if ( node.nodeType === 1 ) {
                                                                return false;
                                                        }
                                                }

                                                return true;
                                }
                        };
                },

                "PSEUDO": function( pseudo, argument ) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                                fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                                        Sizzle.error( "unsupported pseudo: " + pseudo );

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if ( fn[ expando ] ) {
                                return fn( argument );
                        }

                        // But maintain support for old signatures
                        if ( fn.length > 1 ) {
                                args = [ pseudo, pseudo, "", argument ];
                                return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                                        markFunction(function( seed, matches ) {
                                                var idx,
                                                        matched = fn( seed, argument ),
                                                        i = matched.length;
                                                while ( i-- ) {
                                                        idx = indexOf.call( seed, matched[i] );
                                                        seed[ idx ] = !( matches[ idx ] = matched[i] );
                                                }
                                        }) :
                                        function( elem ) {
                                                return fn( elem, 0, args );
                                        };
                        }

                        return fn;
                }
        },

        pseudos: {
                "not": markFunction(function( selector ) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                                results = [],
                                matcher = compile( selector.replace( rtrim, "$1" ) );

                        return matcher[ expando ] ?
                                markFunction(function( seed, matches, context, xml ) {
                                        var elem,
                                                unmatched = matcher( seed, null, xml, [] ),
                                                i = seed.length;

                                        // Match elements unmatched by `matcher`
                                        while ( i-- ) {
                                                if ( (elem = unmatched[i]) ) {
                                                        seed[i] = !(matches[i] = elem);
                                                }
                                        }
                                }) :
                                function( elem, context, xml ) {
                                        input[0] = elem;
                                        matcher( input, null, xml, results );
                                        return !results.pop();
                                };
                }),

                "has": markFunction(function( selector ) {
                        return function( elem ) {
                                return Sizzle( selector, elem ).length > 0;
                        };
                }),

                "contains": markFunction(function( text ) {
                        return function( elem ) {
                                return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                        };
                }),

                "enabled": function( elem ) {
                        return elem.disabled === false;
                },

                "disabled": function( elem ) {
                        return elem.disabled === true;
                },

                "checked": function( elem ) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },

                "selected": function( elem ) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if ( elem.parentNode ) {
                                elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                },

                "parent": function( elem ) {
                        return !Expr.pseudos["empty"]( elem );
                },

                "empty": function( elem ) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
                        //   not comment, processing instructions, or others
                        // Thanks to Diego Perini for the nodeName shortcut
                        //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
                        var nodeType;
                        elem = elem.firstChild;
                        while ( elem ) {
                                if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
                                        return false;
                                }
                                elem = elem.nextSibling;
                        }
                        return true;
                },

                "header": function( elem ) {
                        return rheader.test( elem.nodeName );
                },

                "text": function( elem ) {
                        var type, attr;
                        // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                        // use getAttribute instead to test this case
                        return elem.nodeName.toLowerCase() === "input" &&
                                (type = elem.type) === "text" &&
                                ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
                },

                // Input types
                "radio": createInputPseudo("radio"),
                "checkbox": createInputPseudo("checkbox"),
                "file": createInputPseudo("file"),
                "password": createInputPseudo("password"),
                "image": createInputPseudo("image"),

                "submit": createButtonPseudo("submit"),
                "reset": createButtonPseudo("reset"),

                "button": function( elem ) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                },

                "input": function( elem ) {
                        return rinputs.test( elem.nodeName );
                },

                "focus": function( elem ) {
                        var doc = elem.ownerDocument;
                        return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },

                "active": function( elem ) {
                        return elem === elem.ownerDocument.activeElement;
                },

                // Positional types
                "first": createPositionalPseudo(function() {
                        return [ 0 ];
                }),

                "last": createPositionalPseudo(function( matchIndexes, length ) {
                        return [ length - 1 ];
                }),

                "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        return [ argument < 0 ? argument + length : argument ];
                }),

                "even": createPositionalPseudo(function( matchIndexes, length ) {
                        for ( var i = 0; i < length; i += 2 ) {
                                matchIndexes.push( i );
                        }
                        return matchIndexes;
                }),

                "odd": createPositionalPseudo(function( matchIndexes, length ) {
                        for ( var i = 1; i < length; i += 2 ) {
                                matchIndexes.push( i );
                        }
                        return matchIndexes;
                }),

                "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
                                matchIndexes.push( i );
                        }
                        return matchIndexes;
                }),

                "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
                                matchIndexes.push( i );
                        }
                        return matchIndexes;
                })
        }
};

function siblingCheck( a, b, ret ) {
        if ( a === b ) {
                return ret;
        }

        var cur = a.nextSibling;

        while ( cur ) {
                if ( cur === b ) {
                        return -1;
                }

                cur = cur.nextSibling;
        }

        return 1;
}

sortOrder = docElem.compareDocumentPosition ?
        function( a, b ) {
                if ( a === b ) {
                        hasDuplicate = true;
                        return 0;
                }

                return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
                        a.compareDocumentPosition :
                        a.compareDocumentPosition(b) & 4
                ) ? -1 : 1;
        } :
        function( a, b ) {
                // The nodes are identical, we can exit early
                if ( a === b ) {
                        hasDuplicate = true;
                        return 0;

                // Fallback to using sourceIndex (in IE) if it's available on both nodes
                } else if ( a.sourceIndex && b.sourceIndex ) {
                        return a.sourceIndex - b.sourceIndex;
                }

                var al, bl,
                        ap = [],
                        bp = [],
                        aup = a.parentNode,
                        bup = b.parentNode,
                        cur = aup;

                // If the nodes are siblings (or identical) we can do a quick check
                if ( aup === bup ) {
                        return siblingCheck( a, b );

                // If no parents were found then the nodes are disconnected
                } else if ( !aup ) {
                        return -1;

                } else if ( !bup ) {
                        return 1;
                }

                // Otherwise they're somewhere else in the tree so we need
                // to build up a full list of the parentNodes for comparison
                while ( cur ) {
                        ap.unshift( cur );
                        cur = cur.parentNode;
                }

                cur = bup;

                while ( cur ) {
                        bp.unshift( cur );
                        cur = cur.parentNode;
                }

                al = ap.length;
                bl = bp.length;

                // Start walking down the tree looking for a discrepancy
                for ( var i = 0; i < al && i < bl; i++ ) {
                        if ( ap[i] !== bp[i] ) {
                                return siblingCheck( ap[i], bp[i] );
                        }
                }

                // We ended someplace up the tree so do a sibling check
                return i === al ?
                        siblingCheck( a, bp[i], -1 ) :
                        siblingCheck( ap[i], b, 1 );
        };

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
        var elem,
                duplicates = [],
                i = 1,
                j = 0;

        hasDuplicate = baseHasDuplicate;
        results.sort( sortOrder );

        if ( hasDuplicate ) {
                for ( ; (elem = results[i]); i++ ) {
                        if ( elem === results[ i - 1 ] ) {
                                j = duplicates.push( i );
                        }
                }
                while ( j-- ) {
                        results.splice( duplicates[ j ], 1 );
                }
        }

        return results;
};

Sizzle.error = function( msg ) {
        throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, parseOnly ) {
        var matched, match, tokens, type,
                soFar, groups, preFilters,
                cached = tokenCache[ expando ][ selector + " " ];

        if ( cached ) {
                return parseOnly ? 0 : cached.slice( 0 );
        }

        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;

        while ( soFar ) {

                // Comma and first run
                if ( !matched || (match = rcomma.exec( soFar )) ) {
                        if ( match ) {
                                // Don't consume trailing commas as valid
                                soFar = soFar.slice( match[0].length ) || soFar;
                        }
                        groups.push( tokens = [] );
                }

                matched = false;

                // Combinators
                if ( (match = rcombinators.exec( soFar )) ) {
                        tokens.push( matched = new Token( match.shift() ) );
                        soFar = soFar.slice( matched.length );

                        // Cast descendant combinators to space
                        matched.type = match[0].replace( rtrim, " " );
                }

                // Filters
                for ( type in Expr.filter ) {
                        if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                                (match = preFilters[ type ]( match ))) ) {

                                tokens.push( matched = new Token( match.shift() ) );
                                soFar = soFar.slice( matched.length );
                                matched.type = type;
                                matched.matches = match;
                        }
                }

                if ( !matched ) {
                        break;
                }
        }

        // Return the length of the invalid excess
        // if we're just parsing
        // Otherwise, throw an error or return tokens
        return parseOnly ?
                soFar.length :
                soFar ?
                        Sizzle.error( selector ) :
                        // Cache the tokens
                        tokenCache( selector, groups ).slice( 0 );
}

function addCombinator( matcher, combinator, base ) {
        var dir = combinator.dir,
                checkNonElements = base && combinator.dir === "parentNode",
                doneName = done++;

        return combinator.first ?
                // Check against closest ancestor/preceding element
                function( elem, context, xml ) {
                        while ( (elem = elem[ dir ]) ) {
                                if ( checkNonElements || elem.nodeType === 1  ) {
                                        return matcher( elem, context, xml );
                                }
                        }
                } :

                // Check against all ancestor/preceding elements
                function( elem, context, xml ) {
                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if ( !xml ) {
                                var cache,
                                        dirkey = dirruns + " " + doneName + " ",
                                        cachedkey = dirkey + cachedruns;
                                while ( (elem = elem[ dir ]) ) {
                                        if ( checkNonElements || elem.nodeType === 1 ) {
                                                if ( (cache = elem[ expando ]) === cachedkey ) {
                                                        return elem.sizset;
                                                } else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
                                                        if ( elem.sizset ) {
                                                                return elem;
                                                        }
                                                } else {
                                                        elem[ expando ] = cachedkey;
                                                        if ( matcher( elem, context, xml ) ) {
                                                                elem.sizset = true;
                                                                return elem;
                                                        }
                                                        elem.sizset = false;
                                                }
                                        }
                                }
                        } else {
                                while ( (elem = elem[ dir ]) ) {
                                        if ( checkNonElements || elem.nodeType === 1 ) {
                                                if ( matcher( elem, context, xml ) ) {
                                                        return elem;
                                                }
                                        }
                                }
                        }
                };
}

function elementMatcher( matchers ) {
        return matchers.length > 1 ?
                function( elem, context, xml ) {
                        var i = matchers.length;
                        while ( i-- ) {
                                if ( !matchers[i]( elem, context, xml ) ) {
                                        return false;
                                }
                        }
                        return true;
                } :
                matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
        var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;

        for ( ; i < len; i++ ) {
                if ( (elem = unmatched[i]) ) {
                        if ( !filter || filter( elem, context, xml ) ) {
                                newUnmatched.push( elem );
                                if ( mapped ) {
                                        map.push( i );
                                }
                        }
                }
        }

        return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
        if ( postFilter && !postFilter[ expando ] ) {
                postFilter = setMatcher( postFilter );
        }
        if ( postFinder && !postFinder[ expando ] ) {
                postFinder = setMatcher( postFinder, postSelector );
        }
        return markFunction(function( seed, results, context, xml ) {
                var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                                condense( elems, preMap, preFilter, context, xml ) :
                                elems,

                        matcherOut = matcher ?
                                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                                postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                        // ...intermediate processing is necessary
                                        [] :

                                        // ...otherwise use results directly
                                        results :
                                matcherIn;

                // Find primary matches
                if ( matcher ) {
                        matcher( matcherIn, matcherOut, context, xml );
                }

                // Apply postFilter
                if ( postFilter ) {
                        temp = condense( matcherOut, postMap );
                        postFilter( temp, [], context, xml );

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while ( i-- ) {
                                if ( (elem = temp[i]) ) {
                                        matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                                }
                        }
                }

                if ( seed ) {
                        if ( postFinder || preFilter ) {
                                if ( postFinder ) {
                                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                        temp = [];
                                        i = matcherOut.length;
                                        while ( i-- ) {
                                                if ( (elem = matcherOut[i]) ) {
                                                        // Restore matcherIn since elem is not yet a final match
                                                        temp.push( (matcherIn[i] = elem) );
                                                }
                                        }
                                        postFinder( null, (matcherOut = []), temp, xml );
                                }

                                // Move matched elements from seed to results to keep them synchronized
                                i = matcherOut.length;
                                while ( i-- ) {
                                        if ( (elem = matcherOut[i]) &&
                                                (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                                                seed[temp] = !(results[temp] = elem);
                                        }
                                }
                        }

                // Add elements to results, through postFinder if defined
                } else {
                        matcherOut = condense(
                                matcherOut === results ?
                                        matcherOut.splice( preexisting, matcherOut.length ) :
                                        matcherOut
                        );
                        if ( postFinder ) {
                                postFinder( null, results, matcherOut, xml );
                        } else {
                                push.apply( results, matcherOut );
                        }
                }
        });
}

function matcherFromTokens( tokens ) {
        var checkContext, matcher, j,
                len = tokens.length,
                leadingRelative = Expr.relative[ tokens[0].type ],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator( function( elem ) {
                        return elem === checkContext;
                }, implicitRelative, true ),
                matchAnyContext = addCombinator( function( elem ) {
                        return indexOf.call( checkContext, elem ) > -1;
                }, implicitRelative, true ),
                matchers = [ function( elem, context, xml ) {
                        return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                                (checkContext = context).nodeType ?
                                        matchContext( elem, context, xml ) :
                                        matchAnyContext( elem, context, xml ) );
                } ];

        for ( ; i < len; i++ ) {
                if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                        matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
                } else {
                        matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                        // Return special upon seeing a positional matcher
                        if ( matcher[ expando ] ) {
                                // Find the next relative operator (if any) for proper handling
                                j = ++i;
                                for ( ; j < len; j++ ) {
                                        if ( Expr.relative[ tokens[j].type ] ) {
                                                break;
                                        }
                                }
                                return setMatcher(
                                        i > 1 && elementMatcher( matchers ),
                                        i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
                                        matcher,
                                        i < j && matcherFromTokens( tokens.slice( i, j ) ),
                                        j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                                        j < len && tokens.join("")
                                );
                        }
                        matchers.push( matcher );
                }
        }

        return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
        var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function( seed, context, xml, results, expandContext ) {
                        var elem, j, matcher,
                                setMatched = [],
                                matchedCount = 0,
                                i = "0",
                                unmatched = seed && [],
                                outermost = expandContext != null,
                                contextBackup = outermostContext,
                                // We must always have either seed elements or context
                                elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
                                // Nested matchers should use non-integer dirruns
                                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

                        if ( outermost ) {
                                outermostContext = context !== document && context;
                                cachedruns = superMatcher.el;
                        }

                        // Add elements passing elementMatchers directly to results
                        for ( ; (elem = elems[i]) != null; i++ ) {
                                if ( byElement && elem ) {
                                        for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
                                                if ( matcher( elem, context, xml ) ) {
                                                        results.push( elem );
                                                        break;
                                                }
                                        }
                                        if ( outermost ) {
                                                dirruns = dirrunsUnique;
                                                cachedruns = ++superMatcher.el;
                                        }
                                }

                                // Track unmatched elements for set filters
                                if ( bySet ) {
                                        // They will have gone through all possible matchers
                                        if ( (elem = !matcher && elem) ) {
                                                matchedCount--;
                                        }

                                        // Lengthen the array for every element, matched or not
                                        if ( seed ) {
                                                unmatched.push( elem );
                                        }
                                }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if ( bySet && i !== matchedCount ) {
                                for ( j = 0; (matcher = setMatchers[j]); j++ ) {
                                        matcher( unmatched, setMatched, context, xml );
                                }

                                if ( seed ) {
                                        // Reintegrate element matches to eliminate the need for sorting
                                        if ( matchedCount > 0 ) {
                                                while ( i-- ) {
                                                        if ( !(unmatched[i] || setMatched[i]) ) {
                                                                setMatched[i] = pop.call( results );
                                                        }
                                                }
                                        }

                                        // Discard index placeholder values to get only actual matches
                                        setMatched = condense( setMatched );
                                }

                                // Add matches to results
                                push.apply( results, setMatched );

                                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                                if ( outermost && !seed && setMatched.length > 0 &&
                                        ( matchedCount + setMatchers.length ) > 1 ) {

                                        Sizzle.uniqueSort( results );
                                }
                        }

                        // Override manipulation of globals by nested matchers
                        if ( outermost ) {
                                dirruns = dirrunsUnique;
                                outermostContext = contextBackup;
                        }

                        return unmatched;
                };

        superMatcher.el = 0;
        return bySet ?
                markFunction( superMatcher ) :
                superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
        var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[ expando ][ selector + " " ];

        if ( !cached ) {
                // Generate a function of recursive functions that can be used to check each element
                if ( !group ) {
                        group = tokenize( selector );
                }
                i = group.length;
                while ( i-- ) {
                        cached = matcherFromTokens( group[i] );
                        if ( cached[ expando ] ) {
                                setMatchers.push( cached );
                        } else {
                                elementMatchers.push( cached );
                        }
                }

                // Cache the compiled function
                cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
        }
        return cached;
};

function multipleContexts( selector, contexts, results ) {
        var i = 0,
                len = contexts.length;
        for ( ; i < len; i++ ) {
                Sizzle( selector, contexts[i], results );
        }
        return results;
}

function select( selector, context, results, seed, xml ) {
        var i, tokens, token, type, find,
                match = tokenize( selector ),
                j = match.length;

        if ( !seed ) {
                // Try to minimize operations if there is only one group
                if ( match.length === 1 ) {

                        // Take a shortcut and set the context if the root selector is an ID
                        tokens = match[0] = match[0].slice( 0 );
                        if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                                        context.nodeType === 9 && !xml &&
                                        Expr.relative[ tokens[1].type ] ) {

                                context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
                                if ( !context ) {
                                        return results;
                                }

                                selector = selector.slice( tokens.shift().length );
                        }

                        // Fetch a seed set for right-to-left matching
                        for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
                                token = tokens[i];

                                // Abort if we hit a combinator
                                if ( Expr.relative[ (type = token.type) ] ) {
                                        break;
                                }
                                if ( (find = Expr.find[ type ]) ) {
                                        // Search, expanding context for leading sibling combinators
                                        if ( (seed = find(
                                                token.matches[0].replace( rbackslash, "" ),
                                                rsibling.test( tokens[0].type ) && context.parentNode || context,
                                                xml
                                        )) ) {

                                                // If seed is empty or no tokens remain, we can return early
                                                tokens.splice( i, 1 );
                                                selector = seed.length && tokens.join("");
                                                if ( !selector ) {
                                                        push.apply( results, slice.call( seed, 0 ) );
                                                        return results;
                                                }

                                                break;
                                        }
                                }
                        }
                }
        }

        // Compile and execute a filtering function
        // Provide `match` to avoid retokenization if we modified the selector above
        compile( selector, match )(
                seed,
                context,
                xml,
                results,
                rsibling.test( selector )
        );
        return results;
}

if ( document.querySelectorAll ) {
        (function() {
                var disconnectedMatch,
                        oldSelect = select,
                        rescape = /'|\\/g,
                        rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

                        // qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
                        // A support test would require too much code (would include document ready)
                        rbuggyQSA = [ ":focus" ],

                        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                        // A support test would require too much code (would include document ready)
                        // just skip matchesSelector for :active
                        rbuggyMatches = [ ":active" ],
                        matches = docElem.matchesSelector ||
                                docElem.mozMatchesSelector ||
                                docElem.webkitMatchesSelector ||
                                docElem.oMatchesSelector ||
                                docElem.msMatchesSelector;

                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert(function( div ) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explictly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        div.innerHTML = "<select><option selected=''></option></select>";

                        // IE8 - Some boolean attributes are not treated correctly
                        if ( !div.querySelectorAll("[selected]").length ) {
                                rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here (do not put tests after this one)
                        if ( !div.querySelectorAll(":checked").length ) {
                                rbuggyQSA.push(":checked");
                        }
                });

                assert(function( div ) {

                        // Opera 10-12/IE9 - ^= $= *= and empty values
                        // Should not select anything
                        div.innerHTML = "<p test=''></p>";
                        if ( div.querySelectorAll("[test^='']").length ) {
                                rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here (do not put tests after this one)
                        div.innerHTML = "<input type='hidden'/>";
                        if ( !div.querySelectorAll(":enabled").length ) {
                                rbuggyQSA.push(":enabled", ":disabled");
                        }
                });

                // rbuggyQSA always contains :focus, so no need for a length check
                rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

                select = function( selector, context, results, seed, xml ) {
                        // Only use querySelectorAll when not filtering,
                        // when this is not xml,
                        // and when no QSA bugs apply
                        if ( !seed && !xml && !rbuggyQSA.test( selector ) ) {
                                var groups, i,
                                        old = true,
                                        nid = expando,
                                        newContext = context,
                                        newSelector = context.nodeType === 9 && selector;

                                // qSA works strangely on Element-rooted queries
                                // We can work around this by specifying an extra ID on the root
                                // and working up from there (Thanks to Andrew Dupont for the technique)
                                // IE 8 doesn't work on object elements
                                if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                                        groups = tokenize( selector );

                                        if ( (old = context.getAttribute("id")) ) {
                                                nid = old.replace( rescape, "\\$&" );
                                        } else {
                                                context.setAttribute( "id", nid );
                                        }
                                        nid = "[id='" + nid + "'] ";

                                        i = groups.length;
                                        while ( i-- ) {
                                                groups[i] = nid + groups[i].join("");
                                        }
                                        newContext = rsibling.test( selector ) && context.parentNode || context;
                                        newSelector = groups.join(",");
                                }

                                if ( newSelector ) {
                                        try {
                                                push.apply( results, slice.call( newContext.querySelectorAll(
                                                        newSelector
                                                ), 0 ) );
                                                return results;
                                        } catch(qsaError) {
                                        } finally {
                                                if ( !old ) {
                                                        context.removeAttribute("id");
                                                }
                                        }
                                }
                        }

                        return oldSelect( selector, context, results, seed, xml );
                };

                if ( matches ) {
                        assert(function( div ) {
                                // Check to see if it's possible to do matchesSelector
                                // on a disconnected node (IE 9)
                                disconnectedMatch = matches.call( div, "div" );

                                // This should fail with an exception
                                // Gecko does not error, returns false instead
                                try {
                                        matches.call( div, "[test!='']:sizzle" );
                                        rbuggyMatches.push( "!=", pseudos );
                                } catch ( e ) {}
                        });

                        // rbuggyMatches always contains :active and :focus, so no need for a length check
                        rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

                        Sizzle.matchesSelector = function( elem, expr ) {
                                // Make sure that attribute selectors are quoted
                                expr = expr.replace( rattributeQuotes, "='$1']" );

                                // rbuggyMatches always contains :active, so no need for an existence check
                                if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && !rbuggyQSA.test( expr ) ) {
                                        try {
                                                var ret = matches.call( elem, expr );

                                                // IE 9's matchesSelector returns false on disconnected nodes
                                                if ( ret || disconnectedMatch ||
                                                                // As well, disconnected nodes are said to be in a document
                                                                // fragment in IE 9
                                                                elem.document && elem.document.nodeType !== 11 ) {
                                                        return ret;
                                                }
                                        } catch(e) {}
                                }

                                return Sizzle( expr, null, null, [ elem ] ).length > 0;
                        };
                }
        })();
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
        // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
                children: true,
                contents: true,
                next: true,
                prev: true
        };

jQuery.fn.extend({
        find: function( selector ) {
                var i, l, length, n, r, ret,
                        self = this;

                if ( typeof selector !== "string" ) {
                        return jQuery( selector ).filter(function() {
                                for ( i = 0, l = self.length; i < l; i++ ) {
                                        if ( jQuery.contains( self[ i ], this ) ) {
                                                return true;
                                        }
                                }
                        });
                }

                ret = this.pushStack( "", "find", selector );

                for ( i = 0, l = this.length; i < l; i++ ) {
                        length = ret.length;
                        jQuery.find( selector, this[i], ret );

                        if ( i > 0 ) {
                                // Make sure that the results are unique
                                for ( n = length; n < ret.length; n++ ) {
                                        for ( r = 0; r < length; r++ ) {
                                                if ( ret[r] === ret[n] ) {
                                                        ret.splice(n--, 1);
                                                        break;
                                                }
                                        }
                                }
                        }
                }

                return ret;
        },

        has: function( target ) {
                var i,
                        targets = jQuery( target, this ),
                        len = targets.length;

                return this.filter(function() {
                        for ( i = 0; i < len; i++ ) {
                                if ( jQuery.contains( this, targets[i] ) ) {
                                        return true;
                                }
                        }
                });
        },

        not: function( selector ) {
                return this.pushStack( winnow(this, selector, false), "not", selector);
        },

        filter: function( selector ) {
                return this.pushStack( winnow(this, selector, true), "filter", selector );
        },

        is: function( selector ) {
                return !!selector && (
                        typeof selector === "string" ?
                                // If this is a positional/relative selector, check membership in the returned set
                                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                                rneedsContext.test( selector ) ?
                                        jQuery( selector, this.context ).index( this[0] ) >= 0 :
                                        jQuery.filter( selector, this ).length > 0 :
                                this.filter( selector ).length > 0 );
        },

        closest: function( selectors, context ) {
                var cur,
                        i = 0,
                        l = this.length,
                        ret = [],
                        pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                                jQuery( selectors, context || this.context ) :
                                0;

                for ( ; i < l; i++ ) {
                        cur = this[i];

                        while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
                                if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
                                        ret.push( cur );
                                        break;
                                }
                                cur = cur.parentNode;
                        }
                }

                ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

                return this.pushStack( ret, "closest", selectors );
        },

        // Determine the position of an element within
        // the matched set of elements
        index: function( elem ) {

                // No argument, return index in parent
                if ( !elem ) {
                        return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
                }

                // index in selector
                if ( typeof elem === "string" ) {
                        return jQuery.inArray( this[0], jQuery( elem ) );
                }

                // Locate the position of the desired element
                return jQuery.inArray(
                        // If it receives a jQuery object, the first element is used
                        elem.jquery ? elem[0] : elem, this );
        },

        add: function( selector, context ) {
                var set = typeof selector === "string" ?
                                jQuery( selector, context ) :
                                jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
                        all = jQuery.merge( this.get(), set );

                return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
                        all :
                        jQuery.unique( all ) );
        },

        addBack: function( selector ) {
                return this.add( selector == null ?
                        this.prevObject : this.prevObject.filter(selector)
                );
        }
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
        do {
                cur = cur[ dir ];
        } while ( cur && cur.nodeType !== 1 );

        return cur;
}

jQuery.each({
        parent: function( elem ) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
                return jQuery.dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
                return jQuery.dir( elem, "parentNode", until );
        },
        next: function( elem ) {
                return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
                return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
                return jQuery.dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
                return jQuery.dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
                return jQuery.dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
                return jQuery.dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
                return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
                return jQuery.sibling( elem.firstChild );
        },
        contents: function( elem ) {
                return jQuery.nodeName( elem, "iframe" ) ?
                        elem.contentDocument || elem.contentWindow.document :
                        jQuery.merge( [], elem.childNodes );
        }
}, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
                var ret = jQuery.map( this, fn, until );

                if ( !runtil.test( name ) ) {
                        selector = until;
                }

                if ( selector && typeof selector === "string" ) {
                        ret = jQuery.filter( selector, ret );
                }

                ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

                if ( this.length > 1 && rparentsprev.test( name ) ) {
                        ret = ret.reverse();
                }

                return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
        };
});

jQuery.extend({
        filter: function( expr, elems, not ) {
                if ( not ) {
                        expr = ":not(" + expr + ")";
                }

                return elems.length === 1 ?
                        jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
                        jQuery.find.matches(expr, elems);
        },

        dir: function( elem, dir, until ) {
                var matched = [],
                        cur = elem[ dir ];

                while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
                        if ( cur.nodeType === 1 ) {
                                matched.push( cur );
                        }
                        cur = cur[dir];
                }
                return matched;
        },

        sibling: function( n, elem ) {
                var r = [];

                for ( ; n; n = n.nextSibling ) {
                        if ( n.nodeType === 1 && n !== elem ) {
                                r.push( n );
                        }
                }

                return r;
        }
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

        // Can't pass null or undefined to indexOf in Firefox 4
        // Set to 0 to skip string check
        qualifier = qualifier || 0;

        if ( jQuery.isFunction( qualifier ) ) {
                return jQuery.grep(elements, function( elem, i ) {
                        var retVal = !!qualifier.call( elem, i, elem );
                        return retVal === keep;
                });

        } else if ( qualifier.nodeType ) {
                return jQuery.grep(elements, function( elem, i ) {
                        return ( elem === qualifier ) === keep;
                });

        } else if ( typeof qualifier === "string" ) {
                var filtered = jQuery.grep(elements, function( elem ) {
                        return elem.nodeType === 1;
                });

                if ( isSimple.test( qualifier ) ) {
                        return jQuery.filter(qualifier, filtered, !keep);
                } else {
                        qualifier = jQuery.filter( qualifier, filtered );
                }
        }

        return jQuery.grep(elements, function( elem, i ) {
                return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
        });
}
function createSafeFragment( document ) {
        var list = nodeNames.split( "|" ),
        safeFrag = document.createDocumentFragment();

        if ( safeFrag.createElement ) {
                while ( list.length ) {
                        safeFrag.createElement(
                                list.pop()
                        );
                }
        }
        return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
                "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rcheckableType = /^(?:checkbox|radio)$/,
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
        },
        safeFragment = createSafeFragment( document ),
        fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
        wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
        text: function( value ) {
                return jQuery.access( this, function( value ) {
                        return value === undefined ?
                                jQuery.text( this ) :
                                this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
                }, null, value, arguments.length );
        },

        wrapAll: function( html ) {
                if ( jQuery.isFunction( html ) ) {
                        return this.each(function(i) {
                                jQuery(this).wrapAll( html.call(this, i) );
                        });
                }

                if ( this[0] ) {
                        // The elements to wrap the target around
                        var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

                        if ( this[0].parentNode ) {
                                wrap.insertBefore( this[0] );
                        }

                        wrap.map(function() {
                                var elem = this;

                                while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
                                        elem = elem.firstChild;
                                }

                                return elem;
                        }).append( this );
                }

                return this;
        },

        wrapInner: function( html ) {
                if ( jQuery.isFunction( html ) ) {
                        return this.each(function(i) {
                                jQuery(this).wrapInner( html.call(this, i) );
                        });
                }

                return this.each(function() {
                        var self = jQuery( this ),
                                contents = self.contents();

                        if ( contents.length ) {
                                contents.wrapAll( html );

                        } else {
                                self.append( html );
                        }
                });
        },

        wrap: function( html ) {
                var isFunction = jQuery.isFunction( html );

                return this.each(function(i) {
                        jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
                });
        },

        unwrap: function() {
                return this.parent().each(function() {
                        if ( !jQuery.nodeName( this, "body" ) ) {
                                jQuery( this ).replaceWith( this.childNodes );
                        }
                }).end();
        },

        append: function() {
                return this.domManip(arguments, true, function( elem ) {
                        if ( this.nodeType === 1 || this.nodeType === 11 ) {
                                this.appendChild( elem );
                        }
                });
        },

        prepend: function() {
                return this.domManip(arguments, true, function( elem ) {
                        if ( this.nodeType === 1 || this.nodeType === 11 ) {
                                this.insertBefore( elem, this.firstChild );
                        }
                });
        },

        before: function() {
                if ( !isDisconnected( this[0] ) ) {
                        return this.domManip(arguments, false, function( elem ) {
                                this.parentNode.insertBefore( elem, this );
                        });
                }

                if ( arguments.length ) {
                        var set = jQuery.clean( arguments );
                        return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
                }
        },

        after: function() {
                if ( !isDisconnected( this[0] ) ) {
                        return this.domManip(arguments, false, function( elem ) {
                                this.parentNode.insertBefore( elem, this.nextSibling );
                        });
                }

                if ( arguments.length ) {
                        var set = jQuery.clean( arguments );
                        return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
                }
        },

        // keepData is for internal use only--do not document
        remove: function( selector, keepData ) {
                var elem,
                        i = 0;

                for ( ; (elem = this[i]) != null; i++ ) {
                        if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
                                if ( !keepData && elem.nodeType === 1 ) {
                                        jQuery.cleanData( elem.getElementsByTagName("*") );
                                        jQuery.cleanData( [ elem ] );
                                }

                                if ( elem.parentNode ) {
                                        elem.parentNode.removeChild( elem );
                                }
                        }
                }

                return this;
        },

        empty: function() {
                var elem,
                        i = 0;

                for ( ; (elem = this[i]) != null; i++ ) {
                        // Remove element nodes and prevent memory leaks
                        if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( elem.getElementsByTagName("*") );
                        }

                        // Remove any remaining nodes
                        while ( elem.firstChild ) {
                                elem.removeChild( elem.firstChild );
                        }
                }

                return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

                return this.map( function () {
                        return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
                });
        },

        html: function( value ) {
                return jQuery.access( this, function( value ) {
                        var elem = this[0] || {},
                                i = 0,
                                l = this.length;

                        if ( value === undefined ) {
                                return elem.nodeType === 1 ?
                                        elem.innerHTML.replace( rinlinejQuery, "" ) :
                                        undefined;
                        }

                        // See if we can take a shortcut and just use innerHTML
                        if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                                ( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                                ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                                !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                                value = value.replace( rxhtmlTag, "<$1></$2>" );

                                try {
                                        for (; i < l; i++ ) {
                                                // Remove element nodes and prevent memory leaks
                                                elem = this[i] || {};
                                                if ( elem.nodeType === 1 ) {
                                                        jQuery.cleanData( elem.getElementsByTagName( "*" ) );
                                                        elem.innerHTML = value;
                                                }
                                        }

                                        elem = 0;

                                // If using innerHTML throws an exception, use the fallback method
                                } catch(e) {}
                        }

                        if ( elem ) {
                                this.empty().append( value );
                        }
                }, null, value, arguments.length );
        },

        replaceWith: function( value ) {
                if ( !isDisconnected( this[0] ) ) {
                        // Make sure that the elements are removed from the DOM before they are inserted
                        // this can help fix replacing a parent with child elements
                        if ( jQuery.isFunction( value ) ) {
                                return this.each(function(i) {
                                        var self = jQuery(this), old = self.html();
                                        self.replaceWith( value.call( this, i, old ) );
                                });
                        }

                        if ( typeof value !== "string" ) {
                                value = jQuery( value ).detach();
                        }

                        return this.each(function() {
                                var next = this.nextSibling,
                                        parent = this.parentNode;

                                jQuery( this ).remove();

                                if ( next ) {
                                        jQuery(next).before( value );
                                } else {
                                        jQuery(parent).append( value );
                                }
                        });
                }

                return this.length ?
                        this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
                        this;
        },

        detach: function( selector ) {
                return this.remove( selector, true );
        },

        domManip: function( args, table, callback ) {

                // Flatten any nested arrays
                args = [].concat.apply( [], args );

                var results, first, fragment, iNoClone,
                        i = 0,
                        value = args[0],
                        scripts = [],
                        l = this.length;

                // We can't cloneNode fragments that contain checked, in WebKit
                if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
                        return this.each(function() {
                                jQuery(this).domManip( args, table, callback );
                        });
                }

                if ( jQuery.isFunction(value) ) {
                        return this.each(function(i) {
                                var self = jQuery(this);
                                args[0] = value.call( this, i, table ? self.html() : undefined );
                                self.domManip( args, table, callback );
                        });
                }

                if ( this[0] ) {
                        results = jQuery.buildFragment( args, this, scripts );
                        fragment = results.fragment;
                        first = fragment.firstChild;

                        if ( fragment.childNodes.length === 1 ) {
                                fragment = first;
                        }

                        if ( first ) {
                                table = table && jQuery.nodeName( first, "tr" );

                                // Use the original fragment for the last item instead of the first because it can end up
                                // being emptied incorrectly in certain situations (#8070).
                                // Fragments from the fragment cache must always be cloned and never used in place.
                                for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
                                        callback.call(
                                                table && jQuery.nodeName( this[i], "table" ) ?
                                                        findOrAppend( this[i], "tbody" ) :
                                                        this[i],
                                                i === iNoClone ?
                                                        fragment :
                                                        jQuery.clone( fragment, true, true )
                                        );
                                }
                        }

                        // Fix #11809: Avoid leaking memory
                        fragment = first = null;

                        if ( scripts.length ) {
                                jQuery.each( scripts, function( i, elem ) {
                                        if ( elem.src ) {
                                                if ( jQuery.ajax ) {
                                                        jQuery.ajax({
                                                                url: elem.src,
                                                                type: "GET",
                                                                dataType: "script",
                                                                async: false,
                                                                global: false,
                                                                "throws": true
                                                        });
                                                } else {
                                                        jQuery.error("no ajax");
                                                }
                                        } else {
                                                jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
                                        }

                                        if ( elem.parentNode ) {
                                                elem.parentNode.removeChild( elem );
                                        }
                                });
                        }
                }

                return this;
        }
});

function findOrAppend( elem, tag ) {
        return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

        if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
                return;
        }

        var type, i, l,
                oldData = jQuery._data( src ),
                curData = jQuery._data( dest, oldData ),
                events = oldData.events;

        if ( events ) {
                delete curData.handle;
                curData.events = {};

                for ( type in events ) {
                        for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                                jQuery.event.add( dest, type, events[ type ][ i ] );
                        }
                }
        }

        // make the cloned public data object a copy from the original
        if ( curData.data ) {
                curData.data = jQuery.extend( {}, curData.data );
        }
}

function cloneFixAttributes( src, dest ) {
        var nodeName;

        // We do not need to do anything for non-Elements
        if ( dest.nodeType !== 1 ) {
                return;
        }

        // clearAttributes removes the attributes, which we don't want,
        // but also removes the attachEvent events, which we *do* want
        if ( dest.clearAttributes ) {
                dest.clearAttributes();
        }

        // mergeAttributes, in contrast, only merges back on the
        // original attributes, not the events
        if ( dest.mergeAttributes ) {
                dest.mergeAttributes( src );
        }

        nodeName = dest.nodeName.toLowerCase();

        if ( nodeName === "object" ) {
                // IE6-10 improperly clones children of object elements using classid.
                // IE10 throws NoModificationAllowedError if parent is null, #12132.
                if ( dest.parentNode ) {
                        dest.outerHTML = src.outerHTML;
                }

                // This path appears unavoidable for IE9. When cloning an object
                // element in IE9, the outerHTML strategy above is not sufficient.
                // If the src has innerHTML and the destination does not,
                // copy the src.innerHTML into the dest.innerHTML. #10324
                if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
                        dest.innerHTML = src.innerHTML;
                }

        } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
                // IE6-8 fails to persist the checked state of a cloned checkbox
                // or radio button. Worse, IE6-7 fail to give the cloned element
                // a checked appearance if the defaultChecked value isn't also set

                dest.defaultChecked = dest.checked = src.checked;

                // IE6-7 get confused and end up setting the value of a cloned
                // checkbox/radio button to an empty string instead of "on"
                if ( dest.value !== src.value ) {
                        dest.value = src.value;
                }

        // IE6-8 fails to return the selected option to the default selected
        // state when cloning options
        } else if ( nodeName === "option" ) {
                dest.selected = src.defaultSelected;

        // IE6-8 fails to set the defaultValue to the correct value when
        // cloning other types of input fields
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
                dest.defaultValue = src.defaultValue;

        // IE blanks contents when cloning scripts
        } else if ( nodeName === "script" && dest.text !== src.text ) {
                dest.text = src.text;
        }

        // Event data gets referenced instead of copied if the expando
        // gets copied too
        dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
        var fragment, cacheable, cachehit,
                first = args[ 0 ];

        // Set context from what may come in as undefined or a jQuery collection or a node
        // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
        // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;

        // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
        // Cloning options loses the selected state, so don't cache them
        // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
        // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
        // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
        if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
                first.charAt(0) === "<" && !rnocache.test( first ) &&
                (jQuery.support.checkClone || !rchecked.test( first )) &&
                (jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

                // Mark cacheable and look for a hit
                cacheable = true;
                fragment = jQuery.fragments[ first ];
                cachehit = fragment !== undefined;
        }

        if ( !fragment ) {
                fragment = context.createDocumentFragment();
                jQuery.clean( args, context, fragment, scripts );

                // Update the cache, but only store false
                // unless this is a second parsing of the same content
                if ( cacheable ) {
                        jQuery.fragments[ first ] = cachehit && fragment;
                }
        }

        return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
}, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
                var elems,
                        i = 0,
                        ret = [],
                        insert = jQuery( selector ),
                        l = insert.length,
                        parent = this.length === 1 && this[0].parentNode;

                if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
                        insert[ original ]( this[0] );
                        return this;
                } else {
                        for ( ; i < l; i++ ) {
                                elems = ( i > 0 ? this.clone(true) : this ).get();
                                jQuery( insert[i] )[ original ]( elems );
                                ret = ret.concat( elems );
                        }

                        return this.pushStack( ret, name, insert.selector );
                }
        };
});

function getAll( elem ) {
        if ( typeof elem.getElementsByTagName !== "undefined" ) {
                return elem.getElementsByTagName( "*" );

        } else if ( typeof elem.querySelectorAll !== "undefined" ) {
                return elem.querySelectorAll( "*" );

        } else {
                return [];
        }
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
        if ( rcheckableType.test( elem.type ) ) {
                elem.defaultChecked = elem.checked;
        }
}

jQuery.extend({
        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
                var srcElements,
                        destElements,
                        i,
                        clone;

                if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
                        clone = elem.cloneNode( true );

                // IE<=8 does not properly clone detached, unknown element nodes
                } else {
                        fragmentDiv.innerHTML = elem.outerHTML;
                        fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
                }

                if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
                                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
                        // IE copies events bound via attachEvent when using cloneNode.
                        // Calling detachEvent on the clone will also remove the events
                        // from the original. In order to get around this, we use some
                        // proprietary methods to clear the events. Thanks to MooTools
                        // guys for this hotness.

                        cloneFixAttributes( elem, clone );

                        // Using Sizzle here is crazy slow, so we use getElementsByTagName instead
                        srcElements = getAll( elem );
                        destElements = getAll( clone );

                        // Weird iteration because IE will replace the length property
                        // with an element if you are cloning the body and one of the
                        // elements on the page has a name or id of "length"
                        for ( i = 0; srcElements[i]; ++i ) {
                                // Ensure that the destination node is not null; Fixes #9587
                                if ( destElements[i] ) {
                                        cloneFixAttributes( srcElements[i], destElements[i] );
                                }
                        }
                }

                // Copy the events from the original to the clone
                if ( dataAndEvents ) {
                        cloneCopyEvent( elem, clone );

                        if ( deepDataAndEvents ) {
                                srcElements = getAll( elem );
                                destElements = getAll( clone );

                                for ( i = 0; srcElements[i]; ++i ) {
                                        cloneCopyEvent( srcElements[i], destElements[i] );
                                }
                        }
                }

                srcElements = destElements = null;

                // Return the cloned set
                return clone;
        },

        clean: function( elems, context, fragment, scripts ) {
                var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
                        safe = context === document && safeFragment,
                        ret = [];

                // Ensure that context is a document
                if ( !context || typeof context.createDocumentFragment === "undefined" ) {
                        context = document;
                }

                // Use the already-created safe fragment if context permits
                for ( i = 0; (elem = elems[i]) != null; i++ ) {
                        if ( typeof elem === "number" ) {
                                elem += "";
                        }

                        if ( !elem ) {
                                continue;
                        }

                        // Convert html string into DOM nodes
                        if ( typeof elem === "string" ) {
                                if ( !rhtml.test( elem ) ) {
                                        elem = context.createTextNode( elem );
                                } else {
                                        // Ensure a safe container in which to render the html
                                        safe = safe || createSafeFragment( context );
                                        div = context.createElement("div");
                                        safe.appendChild( div );

                                        // Fix "XHTML"-style tags in all browsers
                                        elem = elem.replace(rxhtmlTag, "<$1></$2>");

                                        // Go to html and back, then peel off extra wrappers
                                        tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
                                        wrap = wrapMap[ tag ] || wrapMap._default;
                                        depth = wrap[0];
                                        div.innerHTML = wrap[1] + elem + wrap[2];

                                        // Move to the right depth
                                        while ( depth-- ) {
                                                div = div.lastChild;
                                        }

                                        // Remove IE's autoinserted <tbody> from table fragments
                                        if ( !jQuery.support.tbody ) {

                                                // String was a <table>, *may* have spurious <tbody>
                                                hasBody = rtbody.test(elem);
                                                        tbody = tag === "table" && !hasBody ?
                                                                div.firstChild && div.firstChild.childNodes :

                                                                // String was a bare <thead> or <tfoot>
                                                                wrap[1] === "<table>" && !hasBody ?
                                                                        div.childNodes :
                                                                        [];

                                                for ( j = tbody.length - 1; j >= 0 ; --j ) {
                                                        if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
                                                                tbody[ j ].parentNode.removeChild( tbody[ j ] );
                                                        }
                                                }
                                        }

                                        // IE completely kills leading whitespace when innerHTML is used
                                        if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
                                                div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
                                        }

                                        elem = div.childNodes;

                                        // Take out of fragment container (we need a fresh div each time)
                                        div.parentNode.removeChild( div );
                                }
                        }

                        if ( elem.nodeType ) {
                                ret.push( elem );
                        } else {
                                jQuery.merge( ret, elem );
                        }
                }

                // Fix #11356: Clear elements from safeFragment
                if ( div ) {
                        elem = div = safe = null;
                }

                // Reset defaultChecked for any radios and checkboxes
                // about to be appended to the DOM in IE 6/7 (#8060)
                if ( !jQuery.support.appendChecked ) {
                        for ( i = 0; (elem = ret[i]) != null; i++ ) {
                                if ( jQuery.nodeName( elem, "input" ) ) {
                                        fixDefaultChecked( elem );
                                } else if ( typeof elem.getElementsByTagName !== "undefined" ) {
                                        jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
                                }
                        }
                }

                // Append elements to a provided document fragment
                if ( fragment ) {
                        // Special handling of each script element
                        handleScript = function( elem ) {
                                // Check if we consider it executable
                                if ( !elem.type || rscriptType.test( elem.type ) ) {
                                        // Detach the script and store it in the scripts array (if provided) or the fragment
                                        // Return truthy to indicate that it has been handled
                                        return scripts ?
                                                scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
                                                fragment.appendChild( elem );
                                }
                        };

                        for ( i = 0; (elem = ret[i]) != null; i++ ) {
                                // Check if we're done after handling an executable script
                                if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
                                        // Append to fragment and handle embedded scripts
                                        fragment.appendChild( elem );
                                        if ( typeof elem.getElementsByTagName !== "undefined" ) {
                                                // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
                                                jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

                                                // Splice the scripts into ret after their former ancestor and advance our index beyond them
                                                ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
                                                i += jsTags.length;
                                        }
                                }
                        }
                }

                return ret;
        },

        cleanData: function( elems, /* internal */ acceptData ) {
                var data, id, elem, type,
                        i = 0,
                        internalKey = jQuery.expando,
                        cache = jQuery.cache,
                        deleteExpando = jQuery.support.deleteExpando,
                        special = jQuery.event.special;

                for ( ; (elem = elems[i]) != null; i++ ) {

                        if ( acceptData || jQuery.acceptData( elem ) ) {

                                id = elem[ internalKey ];
                                data = id && cache[ id ];

                                if ( data ) {
                                        if ( data.events ) {
                                                for ( type in data.events ) {
                                                        if ( special[ type ] ) {
                                                                jQuery.event.remove( elem, type );

                                                        // This is a shortcut to avoid jQuery.event.remove's overhead
                                                        } else {
                                                                jQuery.removeEvent( elem, type, data.handle );
                                                        }
                                                }
                                        }

                                        // Remove cache only if it was not already removed by jQuery.event.remove
                                        if ( cache[ id ] ) {

                                                delete cache[ id ];

                                                // IE does not allow us to delete expando properties from nodes,
                                                // nor does it have a removeAttribute function on Document nodes;
                                                // we must handle all of these cases
                                                if ( deleteExpando ) {
                                                        delete elem[ internalKey ];

                                                } else if ( elem.removeAttribute ) {
                                                        elem.removeAttribute( internalKey );

                                                } else {
                                                        elem[ internalKey ] = null;
                                                }

                                                jQuery.deletedIds.push( id );
                                        }
                                }
                        }
                }
        }
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [];

        return {
                browser: match[ 1 ] || "",
                version: match[ 2 ] || "0"
        };
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
        browser.webkit = true;
} else if ( browser.webkit ) {
        browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
        function jQuerySub( selector, context ) {
                return new jQuerySub.fn.init( selector, context );
        }
        jQuery.extend( true, jQuerySub, this );
        jQuerySub.superclass = this;
        jQuerySub.fn = jQuerySub.prototype = this();
        jQuerySub.fn.constructor = jQuerySub;
        jQuerySub.sub = this.sub;
        jQuerySub.fn.init = function init( selector, context ) {
                if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
                        context = jQuerySub( context );
                }

                return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
        };
        jQuerySub.fn.init.prototype = jQuerySub.fn;
        var rootjQuerySub = jQuerySub(document);
        return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
        // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
        rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
        rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
        elemdisplay = { BODY: "block" },

        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
                letterSpacing: 0,
                fontWeight: 400
        },

        cssExpand = [ "Top", "Right", "Bottom", "Left" ],
        cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

        eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

        // shortcut for names that are not vendor prefixed
        if ( name in style ) {
                return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
                origName = name,
                i = cssPrefixes.length;

        while ( i-- ) {
                name = cssPrefixes[ i ] + capName;
                if ( name in style ) {
                        return name;
                }
        }

        return origName;
}

function isHidden( elem, el ) {
        elem = el || elem;
        return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
        var elem, display,
                values = [],
                index = 0,
                length = elements.length;

        for ( ; index < length; index++ ) {
                elem = elements[ index ];
                if ( !elem.style ) {
                        continue;
                }
                values[ index ] = jQuery._data( elem, "olddisplay" );
                if ( show ) {
                        // Reset the inline display of this element to learn if it is
                        // being hidden by cascaded rules or not
                        if ( !values[ index ] && elem.style.display === "none" ) {
                                elem.style.display = "";
                        }

                        // Set elements which have been overridden with display: none
                        // in a stylesheet to whatever the default browser style is
                        // for such an element
                        if ( elem.style.display === "" && isHidden( elem ) ) {
                                values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
                        }
                } else {
                        display = curCSS( elem, "display" );

                        if ( !values[ index ] && display !== "none" ) {
                                jQuery._data( elem, "olddisplay", display );
                        }
                }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
                elem = elements[ index ];
                if ( !elem.style ) {
                        continue;
                }
                if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                        elem.style.display = show ? values[ index ] || "" : "none";
                }
        }

        return elements;
}

jQuery.fn.extend({
        css: function( name, value ) {
                return jQuery.access( this, function( elem, name, value ) {
                        return value !== undefined ?
                                jQuery.style( elem, name, value ) :
                                jQuery.css( elem, name );
                }, name, value, arguments.length > 1 );
        },
        show: function() {
                return showHide( this, true );
        },
        hide: function() {
                return showHide( this );
        },
        toggle: function( state, fn2 ) {
                var bool = typeof state === "boolean";

                if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
                        return eventsToggle.apply( this, arguments );
                }

                return this.each(function() {
                        if ( bool ? state : isHidden( this ) ) {
                                jQuery( this ).show();
                        } else {
                                jQuery( this ).hide();
                        }
                });
        }
});

jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
                opacity: {
                        get: function( elem, computed ) {
                                if ( computed ) {
                                        // We should always get a number back from opacity
                                        var ret = curCSS( elem, "opacity" );
                                        return ret === "" ? "1" : ret;

                                }
                        }
                }
        },

        // Exclude the following css properties to add px
        cssNumber: {
                "fillOpacity": true,
                "fontWeight": true,
                "lineHeight": true,
                "opacity": true,
                "orphans": true,
                "widows": true,
                "zIndex": true,
                "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
                // normalize float css property
                "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {
                // Don't set styles on text and comment nodes
                if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                        return;
                }

                // Make sure that we're working with the right name
                var ret, type, hooks,
                        origName = jQuery.camelCase( name ),
                        style = elem.style;

                name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

                // gets hook for the prefixed version
                // followed by the unprefixed version
                hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

                // Check if we're setting a value
                if ( value !== undefined ) {
                        type = typeof value;

                        // convert relative number strings (+= or -=) to relative numbers. #7345
                        if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                                value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
                                // Fixes bug #9237
                                type = "number";
                        }

                        // Make sure that NaN and null values aren't set. See: #7116
                        if ( value == null || type === "number" && isNaN( value ) ) {
                                return;
                        }

                        // If a number was passed in, add 'px' to the (except for certain CSS properties)
                        if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
                                value += "px";
                        }

                        // If a hook was provided, use that value, otherwise just set the specified value
                        if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
                                // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                                // Fixes bug #5509
                                try {
                                        style[ name ] = value;
                                } catch(e) {}
                        }

                } else {
                        // If a hook was provided get the non-computed value from there
                        if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                                return ret;
                        }

                        // Otherwise just get the value from the style object
                        return style[ name ];
                }
        },

        css: function( elem, name, numeric, extra ) {
                var val, num, hooks,
                        origName = jQuery.camelCase( name );

                // Make sure that we're working with the right name
                name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

                // gets hook for the prefixed version
                // followed by the unprefixed version
                hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

                // If a hook was provided get the computed value from there
                if ( hooks && "get" in hooks ) {
                        val = hooks.get( elem, true, extra );
                }

                // Otherwise, if a way to get the computed value exists, use that
                if ( val === undefined ) {
                        val = curCSS( elem, name );
                }

                //convert "normal" to computed value
                if ( val === "normal" && name in cssNormalTransform ) {
                        val = cssNormalTransform[ name ];
                }

                // Return, converting to number if forced or a qualifier was provided and val looks numeric
                if ( numeric || extra !== undefined ) {
                        num = parseFloat( val );
                        return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
                }
                return val;
        },

        // A method for quickly swapping in/out CSS properties to get correct calculations
        swap: function( elem, options, callback ) {
                var ret, name,
                        old = {};

                // Remember the old values, and insert the new ones
                for ( name in options ) {
                        old[ name ] = elem.style[ name ];
                        elem.style[ name ] = options[ name ];
                }

                ret = callback.call( elem );

                // Revert the old values
                for ( name in options ) {
                        elem.style[ name ] = old[ name ];
                }

                return ret;
        }
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
        curCSS = function( elem, name ) {
                var ret, width, minWidth, maxWidth,
                        computed = window.getComputedStyle( elem, null ),
                        style = elem.style;

                if ( computed ) {

                        // getPropertyValue is only needed for .css('filter') in IE9, see #12537
                        ret = computed.getPropertyValue( name ) || computed[ name ];

                        if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                                ret = jQuery.style( elem, name );
                        }

                        // A tribute to the "awesome hack by Dean Edwards"
                        // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                        // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                        // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                        if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
                                width = style.width;
                                minWidth = style.minWidth;
                                maxWidth = style.maxWidth;

                                style.minWidth = style.maxWidth = style.width = ret;
                                ret = computed.width;

                                style.width = width;
                                style.minWidth = minWidth;
                                style.maxWidth = maxWidth;
                        }
                }

                return ret;
        };
} else if ( document.documentElement.currentStyle ) {
        curCSS = function( elem, name ) {
                var left, rsLeft,
                        ret = elem.currentStyle && elem.currentStyle[ name ],
                        style = elem.style;

                // Avoid setting ret to empty string here
                // so we don't default to auto
                if ( ret == null && style && style[ name ] ) {
                        ret = style[ name ];
                }

                // From the awesome hack by Dean Edwards
                // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

                // If we're not dealing with a regular pixel number
                // but a number that has a weird ending, we need to convert it to pixels
                // but not position css attributes, as those are proportional to the parent element instead
                // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
                if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

                        // Remember the original values
                        left = style.left;
                        rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

                        // Put in the new values to get a computed value out
                        if ( rsLeft ) {
                                elem.runtimeStyle.left = elem.currentStyle.left;
                        }
                        style.left = name === "fontSize" ? "1em" : ret;
                        ret = style.pixelLeft + "px";

                        // Revert the changed values
                        style.left = left;
                        if ( rsLeft ) {
                                elem.runtimeStyle.left = rsLeft;
                        }
                }

                return ret === "" ? "auto" : ret;
        };
}

function setPositiveNumber( elem, value, subtract ) {
        var matches = rnumsplit.exec( value );
        return matches ?
                        Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
                        value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
        var i = extra === ( isBorderBox ? "border" : "content" ) ?
                // If we already have the right measurement, avoid augmentation
                4 :
                // Otherwise initialize for horizontal or vertical properties
                name === "width" ? 1 : 0,

                val = 0;

        for ( ; i < 4; i += 2 ) {
                // both box models exclude margin, so add it if we want it
                if ( extra === "margin" ) {
                        // we use jQuery.css instead of curCSS here
                        // because of the reliableMarginRight CSS hook!
                        val += jQuery.css( elem, extra + cssExpand[ i ], true );
                }

                // From this point on we use curCSS for maximum performance (relevant in animations)
                if ( isBorderBox ) {
                        // border-box includes padding, so remove it if we want content
                        if ( extra === "content" ) {
                                val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
                        }

                        // at this point, extra isn't border nor margin, so remove border
                        if ( extra !== "margin" ) {
                                val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
                        }
                } else {
                        // at this point, extra isn't content, so add padding
                        val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

                        // at this point, extra isn't content nor padding, so add border
                        if ( extra !== "padding" ) {
                                val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
                        }
                }
        }

        return val;
}

function getWidthOrHeight( elem, name, extra ) {

        // Start with offset property, which is equivalent to the border-box value
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
                valueIsBorderBox = true,
                isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if ( val <= 0 || val == null ) {
                // Fall back to computed then uncomputed css if necessary
                val = curCSS( elem, name );
                if ( val < 0 || val == null ) {
                        val = elem.style[ name ];
                }

                // Computed unit is not pixels. Stop here and return.
                if ( rnumnonpx.test(val) ) {
                        return val;
                }

                // we need the check for style in case a browser which returns unreliable values
                // for getComputedStyle silently falls back to the reliable elem.style
                valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

                // Normalize "", auto, and prepare for extra
                val = parseFloat( val ) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
                augmentWidthOrHeight(
                        elem,
                        name,
                        extra || ( isBorderBox ? "border" : "content" ),
                        valueIsBorderBox
                )
        ) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
        if ( elemdisplay[ nodeName ] ) {
                return elemdisplay[ nodeName ];
        }

        var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
                display = elem.css("display");
        elem.remove();

        // If the simple way fails,
        // get element's real default display by attaching it to a temp iframe
        if ( display === "none" || display === "" ) {
                // Use the already-created iframe if possible
                iframe = document.body.appendChild(
                        iframe || jQuery.extend( document.createElement("iframe"), {
                                frameBorder: 0,
                                width: 0,
                                height: 0
                        })
                );

                // Create a cacheable copy of the iframe document on first call.
                // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
                // document to it; WebKit & Firefox won't allow reusing the iframe document.
                if ( !iframeDoc || !iframe.createElement ) {
                        iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
                        iframeDoc.write("<!doctype html><html><body>");
                        iframeDoc.close();
                }

                elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

                display = curCSS( elem, "display" );
                document.body.removeChild( iframe );
        }

        // Store the correct default display
        elemdisplay[ nodeName ] = display;

        return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
        jQuery.cssHooks[ name ] = {
                get: function( elem, computed, extra ) {
                        if ( computed ) {
                                // certain elements can have dimension info if we invisibly show them
                                // however, it must have a current display style that would benefit from this
                                if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
                                        return jQuery.swap( elem, cssShow, function() {
                                                return getWidthOrHeight( elem, name, extra );
                                        });
                                } else {
                                        return getWidthOrHeight( elem, name, extra );
                                }
                        }
                },

                set: function( elem, value, extra ) {
                        return setPositiveNumber( elem, value, extra ?
                                augmentWidthOrHeight(
                                        elem,
                                        name,
                                        extra,
                                        jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
                                ) : 0
                        );
                }
        };
});

if ( !jQuery.support.opacity ) {
        jQuery.cssHooks.opacity = {
                get: function( elem, computed ) {
                        // IE uses filters for opacity
                        return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
                                ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
                                computed ? "1" : "";
                },

                set: function( elem, value ) {
                        var style = elem.style,
                                currentStyle = elem.currentStyle,
                                opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
                                filter = currentStyle && currentStyle.filter || style.filter || "";

                        // IE has trouble with opacity if it does not have layout
                        // Force it by setting the zoom level
                        style.zoom = 1;

                        // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                        if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
                                style.removeAttribute ) {

                                // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                                // if "filter:" is present at all, clearType is disabled, we want to avoid this
                                // style.removeAttribute is IE Only, but so apparently is this code path...
                                style.removeAttribute( "filter" );

                                // if there there is no filter style applied in a css rule, we are done
                                if ( currentStyle && !currentStyle.filter ) {
                                        return;
                                }
                        }

                        // otherwise, set new filter values
                        style.filter = ralpha.test( filter ) ?
                                filter.replace( ralpha, opacity ) :
                                filter + " " + opacity;
                }
        };
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
        if ( !jQuery.support.reliableMarginRight ) {
                jQuery.cssHooks.marginRight = {
                        get: function( elem, computed ) {
                                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                                // Work around by temporarily setting element display to inline-block
                                return jQuery.swap( elem, { "display": "inline-block" }, function() {
                                        if ( computed ) {
                                                return curCSS( elem, "marginRight" );
                                        }
                                });
                        }
                };
        }

        // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
        // getComputedStyle returns percent when specified for top/left/bottom/right
        // rather than make the css module depend on the offset module, we just check for it here
        if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
                jQuery.each( [ "top", "left" ], function( i, prop ) {
                        jQuery.cssHooks[ prop ] = {
                                get: function( elem, computed ) {
                                        if ( computed ) {
                                                var ret = curCSS( elem, prop );
                                                // if curCSS returns percentage, fallback to offset
                                                return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
                                        }
                                }
                        };
                });
        }

});

if ( jQuery.expr && jQuery.expr.filters ) {
        jQuery.expr.filters.hidden = function( elem ) {
                return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
        };

        jQuery.expr.filters.visible = function( elem ) {
                return !jQuery.expr.filters.hidden( elem );
        };
}

// These hooks are used by animate to expand properties
jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
}, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
                expand: function( value ) {
                        var i,

                                // assumes a single number if not a string
                                parts = typeof value === "string" ? value.split(" ") : [ value ],
                                expanded = {};

                        for ( i = 0; i < 4; i++ ) {
                                expanded[ prefix + cssExpand[ i ] + suffix ] =
                                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                        }

                        return expanded;
                }
        };

        if ( !rmargin.test( prefix ) ) {
                jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
});
var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
        serialize: function() {
                return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
                return this.map(function(){
                        return this.elements ? jQuery.makeArray( this.elements ) : this;
                })
                .filter(function(){
                        return this.name && !this.disabled &&
                                ( this.checked || rselectTextarea.test( this.nodeName ) ||
                                        rinput.test( this.type ) );
                })
                .map(function( i, elem ){
                        var val = jQuery( this ).val();

                        return val == null ?
                                null :
                                jQuery.isArray( val ) ?
                                        jQuery.map( val, function( val, i ){
                                                return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                                        }) :
                                        { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                }).get();
        }
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
        var prefix,
                s = [],
                add = function( key, value ) {
                        // If value is a function, invoke it and return its value
                        value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
                        s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
                };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if ( traditional === undefined ) {
                traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
                // Serialize the form elements
                jQuery.each( a, function() {
                        add( this.name, this.value );
                });

        } else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for ( prefix in a ) {
                        buildParams( prefix, a[ prefix ], traditional, add );
                }
        }

        // Return the resulting serialization
        return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( jQuery.isArray( obj ) ) {
                // Serialize array item.
                jQuery.each( obj, function( i, v ) {
                        if ( traditional || rbracket.test( prefix ) ) {
                                // Treat each array item as a scalar.
                                add( prefix, v );

                        } else {
                                // If array item is non-scalar (array or object), encode its
                                // numeric index to resolve deserialization ambiguity issues.
                                // Note that rack (as of 1.0.0) can't currently deserialize
                                // nested arrays properly, and attempting to do so may cause
                                // a server error. Possible fixes are to modify rack's
                                // deserialization algorithm or to provide an option or flag
                                // to force array serialization to be shallow.
                                buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
                        }
                });

        } else if ( !traditional && jQuery.type( obj ) === "object" ) {
                // Serialize object item.
                for ( name in obj ) {
                        buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
                }

        } else {
                // Serialize scalar item.
                add( prefix, obj );
        }
}
var
        // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

        // Keep a copy of the old load method
        _load = jQuery.fn.load,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
        ajaxLocation = location.href;
} catch( e ) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement( "a" );
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {

                if ( typeof dataTypeExpression !== "string" ) {
                        func = dataTypeExpression;
                        dataTypeExpression = "*";
                }

                var dataType, list, placeBefore,
                        dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
                        i = 0,
                        length = dataTypes.length;

                if ( jQuery.isFunction( func ) ) {
                        // For each dataType in the dataTypeExpression
                        for ( ; i < length; i++ ) {
                                dataType = dataTypes[ i ];
                                // We control if we're asked to add before
                                // any existing element
                                placeBefore = /^\+/.test( dataType );
                                if ( placeBefore ) {
                                        dataType = dataType.substr( 1 ) || "*";
                                }
                                list = structure[ dataType ] = structure[ dataType ] || [];
                                // then we add to the structure accordingly
                                list[ placeBefore ? "unshift" : "push" ]( func );
                        }
                }
        };
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
                dataType /* internal */, inspected /* internal */ ) {

        dataType = dataType || options.dataTypes[ 0 ];
        inspected = inspected || {};

        inspected[ dataType ] = true;

        var selection,
                list = structure[ dataType ],
                i = 0,
                length = list ? list.length : 0,
                executeOnly = ( structure === prefilters );

        for ( ; i < length && ( executeOnly || !selection ); i++ ) {
                selection = list[ i ]( options, originalOptions, jqXHR );
                // If we got redirected to another dataType
                // we try there if executing only and not done already
                if ( typeof selection === "string" ) {
                        if ( !executeOnly || inspected[ selection ] ) {
                                selection = undefined;
                        } else {
                                options.dataTypes.unshift( selection );
                                selection = inspectPrefiltersOrTransports(
                                                structure, options, originalOptions, jqXHR, selection, inspected );
                        }
                }
        }
        // If we're only executing or nothing was selected
        // we try the catchall dataType if not done already
        if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
                selection = inspectPrefiltersOrTransports(
                                structure, options, originalOptions, jqXHR, "*", inspected );
        }
        // unnecessary when only executing (prefilters)
        // but it'll be ignored by the caller in that case
        return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
        var key, deep,
                flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for ( key in src ) {
                if ( src[ key ] !== undefined ) {
                        ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
                }
        }
        if ( deep ) {
                jQuery.extend( true, target, deep );
        }
}

jQuery.fn.load = function( url, params, callback ) {
        if ( typeof url !== "string" && _load ) {
                return _load.apply( this, arguments );
        }

        // Don't do a request if no elements are being requested
        if ( !this.length ) {
                return this;
        }

        var selector, type, response,
                self = this,
                off = url.indexOf(" ");

        if ( off >= 0 ) {
                selector = url.slice( off, url.length );
                url = url.slice( 0, off );
        }

        // If it's a function
        if ( jQuery.isFunction( params ) ) {

                // We assume that it's the callback
                callback = params;
                params = undefined;

        // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
                type = "POST";
        }

        // Request the remote document
        jQuery.ajax({
                url: url,

                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params,
                complete: function( jqXHR, status ) {
                        if ( callback ) {
                                self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
                        }
                }
        }).done(function( responseText ) {

                // Save response for use in complete callback
                response = arguments;

                // See if a selector was specified
                self.html( selector ?

                        // Create a dummy div to hold the results
                        jQuery("<div>")

                                // inject the contents of the document in, removing the scripts
                                // to avoid any 'Permission Denied' errors in IE
                                .append( responseText.replace( rscript, "" ) )

                                // Locate the specified elements
                                .find( selector ) :

                        // If not, just inject the full result
                        responseText );

        });

        return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
        jQuery.fn[ o ] = function( f ){
                return this.on( o, f );
        };
});

jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
                // shift arguments if data argument was omitted
                if ( jQuery.isFunction( data ) ) {
                        type = type || callback;
                        callback = data;
                        data = undefined;
                }

                return jQuery.ajax({
                        type: method,
                        url: url,
                        data: data,
                        success: callback,
                        dataType: type
                });
        };
});

jQuery.extend({

        getScript: function( url, callback ) {
                return jQuery.get( url, undefined, callback, "script" );
        },

        getJSON: function( url, data, callback ) {
                return jQuery.get( url, data, callback, "json" );
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
                if ( settings ) {
                        // Building a settings object
                        ajaxExtend( target, jQuery.ajaxSettings );
                } else {
                        // Extending ajaxSettings
                        settings = target;
                        target = jQuery.ajaxSettings;
                }
                ajaxExtend( target, settings );
                return target;
        },

        ajaxSettings: {
                url: ajaxLocation,
                isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
                global: true,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: true,
                async: true,
                /*
                timeout: 0,
                data: null,
                dataType: null,
                username: null,
                password: null,
                cache: null,
                throws: false,
                traditional: false,
                headers: {},
                */

                accepts: {
                        xml: "application/xml, text/xml",
                        html: "text/html",
                        text: "text/plain",
                        json: "application/json, text/javascript",
                        "*": allTypes
                },

                contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                },

                responseFields: {
                        xml: "responseXML",
                        text: "responseText"
                },

                // List of data converters
                // 1) key format is "source_type destination_type" (a single space in-between)
                // 2) the catchall symbol "*" can be used for source_type
                converters: {

                        // Convert anything to text
                        "* text": window.String,

                        // Text to html (true = no transformation)
                        "text html": true,

                        // Evaluate text as a json expression
                        "text json": jQuery.parseJSON,

                        // Parse text as xml
                        "text xml": jQuery.parseXML
                },

                // For options that shouldn't be deep extended:
                // you can add your own custom options here if
                // and when you create one that shouldn't be
                // deep extended (see ajaxExtend)
                flatOptions: {
                        context: true,
                        url: true
                }
        },

        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),

        // Main method
        ajax: function( url, options ) {

                // If url is an object, simulate pre-1.5 signature
                if ( typeof url === "object" ) {
                        options = url;
                        url = undefined;
                }

                // Force options to be an object
                options = options || {};

                var // ifModified key
                        ifModifiedKey,
                        // Response headers
                        responseHeadersString,
                        responseHeaders,
                        // transport
                        transport,
                        // timeout handle
                        timeoutTimer,
                        // Cross-domain detection vars
                        parts,
                        // To know if global events are to be dispatched
                        fireGlobals,
                        // Loop variable
                        i,
                        // Create the final options object
                        s = jQuery.ajaxSetup( {}, options ),
                        // Callbacks context
                        callbackContext = s.context || s,
                        // Context for global events
                        // It's the callbackContext if one was provided in the options
                        // and if it's a DOM node or a jQuery collection
                        globalEventContext = callbackContext !== s &&
                                ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
                                                jQuery( callbackContext ) : jQuery.event,
                        // Deferreds
                        deferred = jQuery.Deferred(),
                        completeDeferred = jQuery.Callbacks( "once memory" ),
                        // Status-dependent callbacks
                        statusCode = s.statusCode || {},
                        // Headers (they are sent all at once)
                        requestHeaders = {},
                        requestHeadersNames = {},
                        // The jqXHR state
                        state = 0,
                        // Default abort message
                        strAbort = "canceled",
                        // Fake xhr
                        jqXHR = {

                                readyState: 0,

                                // Caches the header
                                setRequestHeader: function( name, value ) {
                                        if ( !state ) {
                                                var lname = name.toLowerCase();
                                                name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                                                requestHeaders[ name ] = value;
                                        }
                                        return this;
                                },

                                // Raw string
                                getAllResponseHeaders: function() {
                                        return state === 2 ? responseHeadersString : null;
                                },

                                // Builds headers hashtable if needed
                                getResponseHeader: function( key ) {
                                        var match;
                                        if ( state === 2 ) {
                                                if ( !responseHeaders ) {
                                                        responseHeaders = {};
                                                        while( ( match = rheaders.exec( responseHeadersString ) ) ) {
                                                                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                                                        }
                                                }
                                                match = responseHeaders[ key.toLowerCase() ];
                                        }
                                        return match === undefined ? null : match;
                                },

                                // Overrides response content-type header
                                overrideMimeType: function( type ) {
                                        if ( !state ) {
                                                s.mimeType = type;
                                        }
                                        return this;
                                },

                                // Cancel the request
                                abort: function( statusText ) {
                                        statusText = statusText || strAbort;
                                        if ( transport ) {
                                                transport.abort( statusText );
                                        }
                                        done( 0, statusText );
                                        return this;
                                }
                        };

                // Callback for when everything is done
                // It is defined here because jslint complains if it is declared
                // at the end of the function (which would be more logical and readable)
                function done( status, nativeStatusText, responses, headers ) {
                        var isSuccess, success, error, response, modified,
                                statusText = nativeStatusText;

                        // Called once
                        if ( state === 2 ) {
                                return;
                        }

                        // State is "done" now
                        state = 2;

                        // Clear timeout if it exists
                        if ( timeoutTimer ) {
                                clearTimeout( timeoutTimer );
                        }

                        // Dereference transport for early garbage collection
                        // (no matter how long the jqXHR object will be used)
                        transport = undefined;

                        // Cache response headers
                        responseHeadersString = headers || "";

                        // Set readyState
                        jqXHR.readyState = status > 0 ? 4 : 0;

                        // Get response data
                        if ( responses ) {
                                response = ajaxHandleResponses( s, jqXHR, responses );
                        }

                        // If successful, handle type chaining
                        if ( status >= 200 && status < 300 || status === 304 ) {

                                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                                if ( s.ifModified ) {

                                        modified = jqXHR.getResponseHeader("Last-Modified");
                                        if ( modified ) {
                                                jQuery.lastModified[ ifModifiedKey ] = modified;
                                        }
                                        modified = jqXHR.getResponseHeader("Etag");
                                        if ( modified ) {
                                                jQuery.etag[ ifModifiedKey ] = modified;
                                        }
                                }

                                // If not modified
                                if ( status === 304 ) {

                                        statusText = "notmodified";
                                        isSuccess = true;

                                // If we have data
                                } else {

                                        isSuccess = ajaxConvert( s, response );
                                        statusText = isSuccess.state;
                                        success = isSuccess.data;
                                        error = isSuccess.error;
                                        isSuccess = !error;
                                }
                        } else {
                                // We extract error from statusText
                                // then normalize statusText and status for non-aborts
                                error = statusText;
                                if ( !statusText || status ) {
                                        statusText = "error";
                                        if ( status < 0 ) {
                                                status = 0;
                                        }
                                }
                        }

                        // Set data for the fake xhr object
                        jqXHR.status = status;
                        jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                        // Success/Error
                        if ( isSuccess ) {
                                deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                        } else {
                                deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                        }

                        // Status-dependent callbacks
                        jqXHR.statusCode( statusCode );
                        statusCode = undefined;

                        if ( fireGlobals ) {
                                globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
                                                [ jqXHR, s, isSuccess ? success : error ] );
                        }

                        // Complete
                        completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

                        if ( fireGlobals ) {
                                globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
                                // Handle the global AJAX counter
                                if ( !( --jQuery.active ) ) {
                                        jQuery.event.trigger( "ajaxStop" );
                                }
                        }
                }

                // Attach deferreds
                deferred.promise( jqXHR );
                jqXHR.success = jqXHR.done;
                jqXHR.error = jqXHR.fail;
                jqXHR.complete = completeDeferred.add;

                // Status-dependent callbacks
                jqXHR.statusCode = function( map ) {
                        if ( map ) {
                                var tmp;
                                if ( state < 2 ) {
                                        for ( tmp in map ) {
                                                statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
                                        }
                                } else {
                                        tmp = map[ jqXHR.status ];
                                        jqXHR.always( tmp );
                                }
                        }
                        return this;
                };

                // Remove hash character (#7531: and string promotion)
                // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
                // We also use the url parameter if available
                s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

                // Extract dataTypes list
                s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

                // A cross-domain request is in order when we have a protocol:host:port mismatch
                if ( s.crossDomain == null ) {
                        parts = rurl.exec( s.url.toLowerCase() );
                        s.crossDomain = !!( parts &&
                                ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
                                        ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
                                                ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
                        );
                }

                // Convert data if not already a string
                if ( s.data && s.processData && typeof s.data !== "string" ) {
                        s.data = jQuery.param( s.data, s.traditional );
                }

                // Apply prefilters
                inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

                // If request was aborted inside a prefilter, stop there
                if ( state === 2 ) {
                        return jqXHR;
                }

                // We can fire global events as of now if asked to
                fireGlobals = s.global;

                // Uppercase the type
                s.type = s.type.toUpperCase();

                // Determine if request has content
                s.hasContent = !rnoContent.test( s.type );

                // Watch for a new set of requests
                if ( fireGlobals && jQuery.active++ === 0 ) {
                        jQuery.event.trigger( "ajaxStart" );
                }

                // More options handling for requests with no content
                if ( !s.hasContent ) {

                        // If data is available, append data to url
                        if ( s.data ) {
                                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
                                // #9682: remove data so that it's not used in an eventual retry
                                delete s.data;
                        }

                        // Get ifModifiedKey before adding the anti-cache parameter
                        ifModifiedKey = s.url;

                        // Add anti-cache in url if needed
                        if ( s.cache === false ) {

                                var ts = jQuery.now(),
                                        // try replacing _= if it is there
                                        ret = s.url.replace( rts, "$1_=" + ts );

                                // if nothing was replaced, add timestamp to the end
                                s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
                        }
                }

                // Set the correct header, if data is being sent
                if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                        jqXHR.setRequestHeader( "Content-Type", s.contentType );
                }

                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if ( s.ifModified ) {
                        ifModifiedKey = ifModifiedKey || s.url;
                        if ( jQuery.lastModified[ ifModifiedKey ] ) {
                                jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
                        }
                        if ( jQuery.etag[ ifModifiedKey ] ) {
                                jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
                        }
                }

                // Set the Accepts header for the server, depending on the dataType
                jqXHR.setRequestHeader(
                        "Accept",
                        s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                                s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                                s.accepts[ "*" ]
                );

                // Check for headers option
                for ( i in s.headers ) {
                        jqXHR.setRequestHeader( i, s.headers[ i ] );
                }

                // Allow custom headers/mimetypes and early abort
                if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
                                // Abort if not done already and return
                                return jqXHR.abort();

                }

                // aborting is no longer a cancellation
                strAbort = "abort";

                // Install callbacks on deferreds
                for ( i in { success: 1, error: 1, complete: 1 } ) {
                        jqXHR[ i ]( s[ i ] );
                }

                // Get transport
                transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

                // If no transport, we auto-abort
                if ( !transport ) {
                        done( -1, "No Transport" );
                } else {
                        jqXHR.readyState = 1;
                        // Send global event
                        if ( fireGlobals ) {
                                globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                        }
                        // Timeout
                        if ( s.async && s.timeout > 0 ) {
                                timeoutTimer = setTimeout( function(){
                                        jqXHR.abort( "timeout" );
                                }, s.timeout );
                        }

                        try {
                                state = 1;
                                transport.send( requestHeaders, done );
                        } catch (e) {
                                // Propagate exception as error if not done
                                if ( state < 2 ) {
                                        done( -1, e );
                                // Simply rethrow otherwise
                                } else {
                                        throw e;
                                }
                        }
                }

                return jqXHR;
        },

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

        var ct, type, finalDataType, firstDataType,
                contents = s.contents,
                dataTypes = s.dataTypes,
                responseFields = s.responseFields;

        // Fill responseXXX fields
        for ( type in responseFields ) {
                if ( type in responses ) {
                        jqXHR[ responseFields[type] ] = responses[ type ];
                }
        }

        // Remove auto dataType and get content-type in the process
        while( dataTypes[ 0 ] === "*" ) {
                dataTypes.shift();
                if ( ct === undefined ) {
                        ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
                }
        }

        // Check if we're dealing with a known content-type
        if ( ct ) {
                for ( type in contents ) {
                        if ( contents[ type ] && contents[ type ].test( ct ) ) {
                                dataTypes.unshift( type );
                                break;
                        }
                }
        }

        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
                finalDataType = dataTypes[ 0 ];
        } else {
                // Try convertible dataTypes
                for ( type in responses ) {
                        if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
                                finalDataType = type;
                                break;
                        }
                        if ( !firstDataType ) {
                                firstDataType = type;
                        }
                }
                // Or just use first one
                finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
                if ( finalDataType !== dataTypes[ 0 ] ) {
                        dataTypes.unshift( finalDataType );
                }
                return responses[ finalDataType ];
        }
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

        var conv, conv2, current, tmp,
                // Work with a copy of dataTypes in case we need to modify it for conversion
                dataTypes = s.dataTypes.slice(),
                prev = dataTypes[ 0 ],
                converters = {},
                i = 0;

        // Apply the dataFilter if provided
        if ( s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
        }

        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
                for ( conv in s.converters ) {
                        converters[ conv.toLowerCase() ] = s.converters[ conv ];
                }
        }

        // Convert to each sequential dataType, tolerating list modification
        for ( ; (current = dataTypes[++i]); ) {

                // There's only work to do if current dataType is non-auto
                if ( current !== "*" ) {

                        // Convert response if prev dataType is non-auto and differs from current
                        if ( prev !== "*" && prev !== current ) {

                                // Seek a direct converter
                                conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                                // If none found, seek a pair
                                if ( !conv ) {
                                        for ( conv2 in converters ) {

                                                // If conv2 outputs current
                                                tmp = conv2.split(" ");
                                                if ( tmp[ 1 ] === current ) {

                                                        // If prev can be converted to accepted input
                                                        conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                                                converters[ "* " + tmp[ 0 ] ];
                                                        if ( conv ) {
                                                                // Condense equivalence converters
                                                                if ( conv === true ) {
                                                                        conv = converters[ conv2 ];

                                                                // Otherwise, insert the intermediate dataType
                                                                } else if ( converters[ conv2 ] !== true ) {
                                                                        current = tmp[ 0 ];
                                                                        dataTypes.splice( i--, 0, current );
                                                                }

                                                                break;
                                                        }
                                                }
                                        }
                                }

                                // Apply converter (if not an equivalence)
                                if ( conv !== true ) {

                                        // Unless errors are allowed to bubble, catch and return them
                                        if ( conv && s["throws"] ) {
                                                response = conv( response );
                                        } else {
                                                try {
                                                        response = conv( response );
                                                } catch ( e ) {
                                                        return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                                                }
                                        }
                                }
                        }

                        // Update prev for next iteration
                        prev = current;
                }
        }

        return { state: "success", data: response };
}
var oldCallbacks = [],
        rquestion = /\?/,
        rjsonp = /(=)\?(?=&|$)|\?\?/,
        nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
                var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
                this[ callback ] = true;
                return callback;
        }
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

        var callbackName, overwritten, responseContainer,
                data = s.data,
                url = s.url,
                hasCallback = s.jsonp !== false,
                replaceInUrl = hasCallback && rjsonp.test( url ),
                replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
                        !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
                        rjsonp.test( data );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

                // Get callback name, remembering preexisting value associated with it
                callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
                        s.jsonpCallback() :
                        s.jsonpCallback;
                overwritten = window[ callbackName ];

                // Insert callback into url or form data
                if ( replaceInUrl ) {
                        s.url = url.replace( rjsonp, "$1" + callbackName );
                } else if ( replaceInData ) {
                        s.data = data.replace( rjsonp, "$1" + callbackName );
                } else if ( hasCallback ) {
                        s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
                }

                // Use data converter to retrieve json after script execution
                s.converters["script json"] = function() {
                        if ( !responseContainer ) {
                                jQuery.error( callbackName + " was not called" );
                        }
                        return responseContainer[ 0 ];
                };

                // force json dataType
                s.dataTypes[ 0 ] = "json";

                // Install callback
                window[ callbackName ] = function() {
                        responseContainer = arguments;
                };

                // Clean-up function (fires after converters)
                jqXHR.always(function() {
                        // Restore preexisting value
                        window[ callbackName ] = overwritten;

                        // Save back as free
                        if ( s[ callbackName ] ) {
                                // make sure that re-using the options doesn't screw things around
                                s.jsonpCallback = originalSettings.jsonpCallback;

                                // save the callback name for future use
                                oldCallbacks.push( callbackName );
                        }

                        // Call if it was a function and we have a response
                        if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                                overwritten( responseContainer[ 0 ] );
                        }

                        responseContainer = overwritten = undefined;
                });

                // Delegate to script
                return "script";
        }
});
// Install script dataType
jQuery.ajaxSetup({
        accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
                script: /javascript|ecmascript/
        },
        converters: {
                "text script": function( text ) {
                        jQuery.globalEval( text );
                        return text;
                }
        }
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
                s.cache = false;
        }
        if ( s.crossDomain ) {
                s.type = "GET";
                s.global = false;
        }
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

        // This transport only deals with cross domain requests
        if ( s.crossDomain ) {

                var script,
                        head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

                return {

                        send: function( _, callback ) {

                                script = document.createElement( "script" );

                                script.async = "async";

                                if ( s.scriptCharset ) {
                                        script.charset = s.scriptCharset;
                                }

                                script.src = s.url;

                                // Attach handlers for all browsers
                                script.onload = script.onreadystatechange = function( _, isAbort ) {

                                        if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                                                // Handle memory leak in IE
                                                script.onload = script.onreadystatechange = null;

                                                // Remove the script
                                                if ( head && script.parentNode ) {
                                                        head.removeChild( script );
                                                }

                                                // Dereference the script
                                                script = undefined;

                                                // Callback if not abort
                                                if ( !isAbort ) {
                                                        callback( 200, "success" );
                                                }
                                        }
                                };
                                // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
                                // This arises when a base node is used (#2709 and #4378).
                                head.insertBefore( script, head.firstChild );
                        },

                        abort: function() {
                                if ( script ) {
                                        script.onload( 0, 1 );
                                }
                        }
                };
        }
});
var xhrCallbacks,
        // #5280: Internet Explorer will keep connections alive if we don't abort on unload
        xhrOnUnloadAbort = window.ActiveXObject ? function() {
                // Abort all pending requests
                for ( var key in xhrCallbacks ) {
                        xhrCallbacks[ key ]( 0, 1 );
                }
        } : false,
        xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
        try {
                return new window.XMLHttpRequest();
        } catch( e ) {}
}

function createActiveXHR() {
        try {
                return new window.ActiveXObject( "Microsoft.XMLHTTP" );
        } catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
        /* Microsoft failed to properly
         * implement the XMLHttpRequest in IE7 (can't request local files),
         * so we use the ActiveXObject when it is available
         * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
         * we need a fallback.
         */
        function() {
                return !this.isLocal && createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

// Determine support properties
(function( xhr ) {
        jQuery.extend( jQuery.support, {
                ajax: !!xhr,
                cors: !!xhr && ( "withCredentials" in xhr )
        });
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

        jQuery.ajaxTransport(function( s ) {
                // Cross domain only allowed if supported through XMLHttpRequest
                if ( !s.crossDomain || jQuery.support.cors ) {

                        var callback;

                        return {
                                send: function( headers, complete ) {

                                        // Get a new xhr
                                        var handle, i,
                                                xhr = s.xhr();

                                        // Open the socket
                                        // Passing null username, generates a login popup on Opera (#2865)
                                        if ( s.username ) {
                                                xhr.open( s.type, s.url, s.async, s.username, s.password );
                                        } else {
                                                xhr.open( s.type, s.url, s.async );
                                        }

                                        // Apply custom fields if provided
                                        if ( s.xhrFields ) {
                                                for ( i in s.xhrFields ) {
                                                        xhr[ i ] = s.xhrFields[ i ];
                                                }
                                        }

                                        // Override mime type if needed
                                        if ( s.mimeType && xhr.overrideMimeType ) {
                                                xhr.overrideMimeType( s.mimeType );
                                        }

                                        // X-Requested-With header
                                        // For cross-domain requests, seeing as conditions for a preflight are
                                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                                        // (it can always be set on a per-request basis or even using ajaxSetup)
                                        // For same-domain requests, won't change header if already provided.
                                        if ( !s.crossDomain && !headers["X-Requested-With"] ) {
                                                headers[ "X-Requested-With" ] = "XMLHttpRequest";
                                        }

                                        // Need an extra try/catch for cross domain requests in Firefox 3
                                        try {
                                                for ( i in headers ) {
                                                        xhr.setRequestHeader( i, headers[ i ] );
                                                }
                                        } catch( _ ) {}

                                        // Do send the request
                                        // This may raise an exception which is actually
                                        // handled in jQuery.ajax (so no try/catch here)
                                        xhr.send( ( s.hasContent && s.data ) || null );

                                        // Listener
                                        callback = function( _, isAbort ) {

                                                var status,
                                                        statusText,
                                                        responseHeaders,
                                                        responses,
                                                        xml;

                                                // Firefox throws exceptions when accessing properties
                                                // of an xhr when a network error occurred
                                                // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
                                                try {

                                                        // Was never called and is aborted or complete
                                                        if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

                                                                // Only called once
                                                                callback = undefined;

                                                                // Do not keep as active anymore
                                                                if ( handle ) {
                                                                        xhr.onreadystatechange = jQuery.noop;
                                                                        if ( xhrOnUnloadAbort ) {
                                                                                delete xhrCallbacks[ handle ];
                                                                        }
                                                                }

                                                                // If it's an abort
                                                                if ( isAbort ) {
                                                                        // Abort it manually if needed
                                                                        if ( xhr.readyState !== 4 ) {
                                                                                xhr.abort();
                                                                        }
                                                                } else {
                                                                        status = xhr.status;
                                                                        responseHeaders = xhr.getAllResponseHeaders();
                                                                        responses = {};
                                                                        xml = xhr.responseXML;

                                                                        // Construct response list
                                                                        if ( xml && xml.documentElement /* #4958 */ ) {
                                                                                responses.xml = xml;
                                                                        }

                                                                        // When requesting binary data, IE6-9 will throw an exception
                                                                        // on any attempt to access responseText (#11426)
                                                                        try {
                                                                                responses.text = xhr.responseText;
                                                                        } catch( e ) {
                                                                        }

                                                                        // Firefox throws an exception when accessing
                                                                        // statusText for faulty cross-domain requests
                                                                        try {
                                                                                statusText = xhr.statusText;
                                                                        } catch( e ) {
                                                                                // We normalize with Webkit giving an empty statusText
                                                                                statusText = "";
                                                                        }

                                                                        // Filter status for non standard behaviors

                                                                        // If the request is local and we have data: assume a success
                                                                        // (success with no data won't get notified, that's the best we
                                                                        // can do given current implementations)
                                                                        if ( !status && s.isLocal && !s.crossDomain ) {
                                                                                status = responses.text ? 200 : 404;
                                                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                                                        } else if ( status === 1223 ) {
                                                                                status = 204;
                                                                        }
                                                                }
                                                        }
                                                } catch( firefoxAccessException ) {
                                                        if ( !isAbort ) {
                                                                complete( -1, firefoxAccessException );
                                                        }
                                                }

                                                // Call complete if needed
                                                if ( responses ) {
                                                        complete( status, statusText, responses, responseHeaders );
                                                }
                                        };

                                        if ( !s.async ) {
                                                // if we're in sync mode we fire the callback
                                                callback();
                                        } else if ( xhr.readyState === 4 ) {
                                                // (IE6 & IE7) if it's in cache and has been
                                                // retrieved directly we need to fire the callback
                                                setTimeout( callback, 0 );
                                        } else {
                                                handle = ++xhrId;
                                                if ( xhrOnUnloadAbort ) {
                                                        // Create the active xhrs callbacks list if needed
                                                        // and attach the unload handler
                                                        if ( !xhrCallbacks ) {
                                                                xhrCallbacks = {};
                                                                jQuery( window ).unload( xhrOnUnloadAbort );
                                                        }
                                                        // Add to list of active xhrs callbacks
                                                        xhrCallbacks[ handle ] = callback;
                                                }
                                                xhr.onreadystatechange = callback;
                                        }
                                },

                                abort: function() {
                                        if ( callback ) {
                                                callback(0,1);
                                        }
                                }
                        };
                }
        });
}
var fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
        rrun = /queueHooks$/,
        animationPrefilters = [ defaultPrefilter ],
        tweeners = {
                "*": [function( prop, value ) {
                        var end, unit,
                                tween = this.createTween( prop, value ),
                                parts = rfxnum.exec( value ),
                                target = tween.cur(),
                                start = +target || 0,
                                scale = 1,
                                maxIterations = 20;

                        if ( parts ) {
                                end = +parts[2];
                                unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

                                // We need to compute starting value
                                if ( unit !== "px" && start ) {
                                        // Iteratively approximate from a nonzero starting point
                                        // Prefer the current property, because this process will be trivial if it uses the same units
                                        // Fallback to end or a simple constant
                                        start = jQuery.css( tween.elem, prop, true ) || end || 1;

                                        do {
                                                // If previous iteration zeroed out, double until we get *something*
                                                // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                                                scale = scale || ".5";

                                                // Adjust and apply
                                                start = start / scale;
                                                jQuery.style( tween.elem, prop, start + unit );

                                        // Update scale, tolerating zero or NaN from tween.cur()
                                        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                                        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                                }

                                tween.unit = unit;
                                tween.start = start;
                                // If a +=/-= token was provided, we're doing a relative animation
                                tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
                        }
                        return tween;
                }]
        };

// Animations created synchronously will run synchronously
function createFxNow() {
        setTimeout(function() {
                fxNow = undefined;
        }, 0 );
        return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
        jQuery.each( props, function( prop, value ) {
                var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
                        index = 0,
                        length = collection.length;
                for ( ; index < length; index++ ) {
                        if ( collection[ index ].call( animation, prop, value ) ) {

                                // we're done with this property
                                return;
                        }
                }
        });
}

function Animation( elem, properties, options ) {
        var result,
                index = 0,
                tweenerIndex = 0,
                length = animationPrefilters.length,
                deferred = jQuery.Deferred().always( function() {
                        // don't match elem in the :animated selector
                        delete tick.elem;
                }),
                tick = function() {
                        var currentTime = fxNow || createFxNow(),
                                remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                                // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                                temp = remaining / animation.duration || 0,
                                percent = 1 - temp,
                                index = 0,
                                length = animation.tweens.length;

                        for ( ; index < length ; index++ ) {
                                animation.tweens[ index ].run( percent );
                        }

                        deferred.notifyWith( elem, [ animation, percent, remaining ]);

                        if ( percent < 1 && length ) {
                                return remaining;
                        } else {
                                deferred.resolveWith( elem, [ animation ] );
                                return false;
                        }
                },
                animation = deferred.promise({
                        elem: elem,
                        props: jQuery.extend( {}, properties ),
                        opts: jQuery.extend( true, { specialEasing: {} }, options ),
                        originalProperties: properties,
                        originalOptions: options,
                        startTime: fxNow || createFxNow(),
                        duration: options.duration,
                        tweens: [],
                        createTween: function( prop, end, easing ) {
                                var tween = jQuery.Tween( elem, animation.opts, prop, end,
                                                animation.opts.specialEasing[ prop ] || animation.opts.easing );
                                animation.tweens.push( tween );
                                return tween;
                        },
                        stop: function( gotoEnd ) {
                                var index = 0,
                                        // if we are going to the end, we want to run all the tweens
                                        // otherwise we skip this part
                                        length = gotoEnd ? animation.tweens.length : 0;

                                for ( ; index < length ; index++ ) {
                                        animation.tweens[ index ].run( 1 );
                                }

                                // resolve when we played the last frame
                                // otherwise, reject
                                if ( gotoEnd ) {
                                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                                } else {
                                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                                }
                                return this;
                        }
                }),
                props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length ; index++ ) {
                result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
                if ( result ) {
                        return result;
                }
        }

        createTweens( animation, props );

        if ( jQuery.isFunction( animation.opts.start ) ) {
                animation.opts.start.call( elem, animation );
        }

        jQuery.fx.timer(
                jQuery.extend( tick, {
                        anim: animation,
                        queue: animation.opts.queue,
                        elem: elem
                })
        );

        // attach callbacks from options
        return animation.progress( animation.opts.progress )
                .done( animation.opts.done, animation.opts.complete )
                .fail( animation.opts.fail )
                .always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
                name = jQuery.camelCase( index );
                easing = specialEasing[ name ];
                value = props[ index ];
                if ( jQuery.isArray( value ) ) {
                        easing = value[ 1 ];
                        value = props[ index ] = value[ 0 ];
                }

                if ( index !== name ) {
                        props[ name ] = value;
                        delete props[ index ];
                }

                hooks = jQuery.cssHooks[ name ];
                if ( hooks && "expand" in hooks ) {
                        value = hooks.expand( value );
                        delete props[ name ];

                        // not quite $.extend, this wont overwrite keys already present.
                        // also - reusing 'index' from above because we have the correct "name"
                        for ( index in value ) {
                                if ( !( index in props ) ) {
                                        props[ index ] = value[ index ];
                                        specialEasing[ index ] = easing;
                                }
                        }
                } else {
                        specialEasing[ name ] = easing;
                }
        }
}

jQuery.Animation = jQuery.extend( Animation, {

        tweener: function( props, callback ) {
                if ( jQuery.isFunction( props ) ) {
                        callback = props;
                        props = [ "*" ];
                } else {
                        props = props.split(" ");
                }

                var prop,
                        index = 0,
                        length = props.length;

                for ( ; index < length ; index++ ) {
                        prop = props[ index ];
                        tweeners[ prop ] = tweeners[ prop ] || [];
                        tweeners[ prop ].unshift( callback );
                }
        },

        prefilter: function( callback, prepend ) {
                if ( prepend ) {
                        animationPrefilters.unshift( callback );
                } else {
                        animationPrefilters.push( callback );
                }
        }
});

function defaultPrefilter( elem, props, opts ) {
        var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
                anim = this,
                style = elem.style,
                orig = {},
                handled = [],
                hidden = elem.nodeType && isHidden( elem );

        // handle queue: false promises
        if ( !opts.queue ) {
                hooks = jQuery._queueHooks( elem, "fx" );
                if ( hooks.unqueued == null ) {
                        hooks.unqueued = 0;
                        oldfire = hooks.empty.fire;
                        hooks.empty.fire = function() {
                                if ( !hooks.unqueued ) {
                                        oldfire();
                                }
                        };
                }
                hooks.unqueued++;

                anim.always(function() {
                        // doing this makes sure that the complete handler will be called
                        // before this completes
                        anim.always(function() {
                                hooks.unqueued--;
                                if ( !jQuery.queue( elem, "fx" ).length ) {
                                        hooks.empty.fire();
                                }
                        });
                });
        }

        // height/width overflow pass
        if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
                // Make sure that nothing sneaks out
                // Record all 3 overflow attributes because IE does not
                // change the overflow attribute when overflowX and
                // overflowY are set to the same value
                opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

                // Set display property to inline-block for height/width
                // animations on inline elements that are having width/height animated
                if ( jQuery.css( elem, "display" ) === "inline" &&
                                jQuery.css( elem, "float" ) === "none" ) {

                        // inline-level elements accept inline-block;
                        // block-level elements need to be inline with layout
                        if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
                                style.display = "inline-block";

                        } else {
                                style.zoom = 1;
                        }
                }
        }

        if ( opts.overflow ) {
                style.overflow = "hidden";
                if ( !jQuery.support.shrinkWrapBlocks ) {
                        anim.done(function() {
                                style.overflow = opts.overflow[ 0 ];
                                style.overflowX = opts.overflow[ 1 ];
                                style.overflowY = opts.overflow[ 2 ];
                        });
                }
        }


        // show/hide pass
        for ( index in props ) {
                value = props[ index ];
                if ( rfxtypes.exec( value ) ) {
                        delete props[ index ];
                        toggle = toggle || value === "toggle";
                        if ( value === ( hidden ? "hide" : "show" ) ) {
                                continue;
                        }
                        handled.push( index );
                }
        }

        length = handled.length;
        if ( length ) {
                dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
                if ( "hidden" in dataShow ) {
                        hidden = dataShow.hidden;
                }

                // store state if its toggle - enables .stop().toggle() to "reverse"
                if ( toggle ) {
                        dataShow.hidden = !hidden;
                }
                if ( hidden ) {
                        jQuery( elem ).show();
                } else {
                        anim.done(function() {
                                jQuery( elem ).hide();
                        });
                }
                anim.done(function() {
                        var prop;
                        jQuery.removeData( elem, "fxshow", true );
                        for ( prop in orig ) {
                                jQuery.style( elem, prop, orig[ prop ] );
                        }
                });
                for ( index = 0 ; index < length ; index++ ) {
                        prop = handled[ index ];
                        tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
                        orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

                        if ( !( prop in dataShow ) ) {
                                dataShow[ prop ] = tween.start;
                                if ( hidden ) {
                                        tween.end = tween.start;
                                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                                }
                        }
                }
        }
}

function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || "swing";
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
                var hooks = Tween.propHooks[ this.prop ];

                return hooks && hooks.get ?
                        hooks.get( this ) :
                        Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
                var eased,
                        hooks = Tween.propHooks[ this.prop ];

                if ( this.options.duration ) {
                        this.pos = eased = jQuery.easing[ this.easing ](
                                percent, this.options.duration * percent, 0, 1, this.options.duration
                        );
                } else {
                        this.pos = eased = percent;
                }
                this.now = ( this.end - this.start ) * eased + this.start;

                if ( this.options.step ) {
                        this.options.step.call( this.elem, this.now, this );
                }

                if ( hooks && hooks.set ) {
                        hooks.set( this );
                } else {
                        Tween.propHooks._default.set( this );
                }
                return this;
        }
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
        _default: {
                get: function( tween ) {
                        var result;

                        if ( tween.elem[ tween.prop ] != null &&
                                (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
                                return tween.elem[ tween.prop ];
                        }

                        // passing any value as a 4th parameter to .css will automatically
                        // attempt a parseFloat and fallback to a string if the parse fails
                        // so, simple values such as "10px" are parsed to Float.
                        // complex values such as "rotate(1rad)" are returned as is.
                        result = jQuery.css( tween.elem, tween.prop, false, "" );
                        // Empty strings, null, undefined and "auto" are converted to 0.
                        return !result || result === "auto" ? 0 : result;
                },
                set: function( tween ) {
                        // use step hook for back compat - use cssHook if its there - use .style if its
                        // available and use plain properties where available
                        if ( jQuery.fx.step[ tween.prop ] ) {
                                jQuery.fx.step[ tween.prop ]( tween );
                        } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
                                jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                        } else {
                                tween.elem[ tween.prop ] = tween.now;
                        }
                }
        }
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
                if ( tween.elem.nodeType && tween.elem.parentNode ) {
                        tween.elem[ tween.prop ] = tween.now;
                }
        }
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
                return speed == null || typeof speed === "boolean" ||
                        // special check for .toggle( handler, handler, ... )
                        ( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
                        cssFn.apply( this, arguments ) :
                        this.animate( genFx( name, true ), speed, easing, callback );
        };
});

jQuery.fn.extend({
        fadeTo: function( speed, to, easing, callback ) {

                // show any hidden elements after setting opacity to 0
                return this.filter( isHidden ).css( "opacity", 0 ).show()

                        // animate to the value specified
                        .end().animate({ opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
                var empty = jQuery.isEmptyObject( prop ),
                        optall = jQuery.speed( speed, easing, callback ),
                        doAnimation = function() {
                                // Operate on a copy of prop so per-property easing won't be lost
                                var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                                // Empty animations resolve immediately
                                if ( empty ) {
                                        anim.stop( true );
                                }
                        };

                return empty || optall.queue === false ?
                        this.each( doAnimation ) :
                        this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
                var stopQueue = function( hooks ) {
                        var stop = hooks.stop;
                        delete hooks.stop;
                        stop( gotoEnd );
                };

                if ( typeof type !== "string" ) {
                        gotoEnd = clearQueue;
                        clearQueue = type;
                        type = undefined;
                }
                if ( clearQueue && type !== false ) {
                        this.queue( type || "fx", [] );
                }

                return this.each(function() {
                        var dequeue = true,
                                index = type != null && type + "queueHooks",
                                timers = jQuery.timers,
                                data = jQuery._data( this );

                        if ( index ) {
                                if ( data[ index ] && data[ index ].stop ) {
                                        stopQueue( data[ index ] );
                                }
                        } else {
                                for ( index in data ) {
                                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                                                stopQueue( data[ index ] );
                                        }
                                }
                        }

                        for ( index = timers.length; index--; ) {
                                if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                                        timers[ index ].anim.stop( gotoEnd );
                                        dequeue = false;
                                        timers.splice( index, 1 );
                                }
                        }

                        // start the next in the queue if the last step wasn't forced
                        // timers currently will call their complete callbacks, which will dequeue
                        // but only if they were gotoEnd
                        if ( dequeue || !gotoEnd ) {
                                jQuery.dequeue( this, type );
                        }
                });
        }
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
        var which,
                attrs = { height: type },
                i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth? 1 : 0;
        for( ; i < 4 ; i += 2 - includeWidth ) {
                which = cssExpand[ i ];
                attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
                attrs.opacity = attrs.width = type;
        }

        return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
                return this.animate( props, speed, easing, callback );
        };
});

jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
                complete: fn || !fn && easing ||
                        jQuery.isFunction( speed ) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
                opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
                opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
                if ( jQuery.isFunction( opt.old ) ) {
                        opt.old.call( this );
                }

                if ( opt.queue ) {
                        jQuery.dequeue( this, opt.queue );
                }
        };

        return opt;
};

jQuery.easing = {
        linear: function( p ) {
                return p;
        },
        swing: function( p ) {
                return 0.5 - Math.cos( p*Math.PI ) / 2;
        }
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
        var timer,
                timers = jQuery.timers,
                i = 0;

        fxNow = jQuery.now();

        for ( ; i < timers.length; i++ ) {
                timer = timers[ i ];
                // Checks the timer has not already been removed
                if ( !timer() && timers[ i ] === timer ) {
                        timers.splice( i--, 1 );
                }
        }

        if ( !timers.length ) {
                jQuery.fx.stop();
        }
        fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
        if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
                timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
        }
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
        clearInterval( timerId );
        timerId = null;
};

jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
        jQuery.expr.filters.animated = function( elem ) {
                return jQuery.grep(jQuery.timers, function( fn ) {
                        return elem === fn.elem;
                }).length;
        };
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
        if ( arguments.length ) {
                return options === undefined ?
                        this :
                        this.each(function( i ) {
                                jQuery.offset.setOffset( this, options, i );
                        });
        }

        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
                box = { top: 0, left: 0 },
                elem = this[ 0 ],
                doc = elem && elem.ownerDocument;

        if ( !doc ) {
                return;
        }

        if ( (body = doc.body) === elem ) {
                return jQuery.offset.bodyOffset( elem );
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if ( !jQuery.contains( docElem, elem ) ) {
                return box;
        }

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if ( typeof elem.getBoundingClientRect !== "undefined" ) {
                box = elem.getBoundingClientRect();
        }
        win = getWindow( doc );
        clientTop  = docElem.clientTop  || body.clientTop  || 0;
        clientLeft = docElem.clientLeft || body.clientLeft || 0;
        scrollTop  = win.pageYOffset || docElem.scrollTop;
        scrollLeft = win.pageXOffset || docElem.scrollLeft;
        return {
                top: box.top  + scrollTop  - clientTop,
                left: box.left + scrollLeft - clientLeft
        };
};

jQuery.offset = {

        bodyOffset: function( body ) {
                var top = body.offsetTop,
                        left = body.offsetLeft;

                if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
                        top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
                        left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
                }

                return { top: top, left: left };
        },

        setOffset: function( elem, options, i ) {
                var position = jQuery.css( elem, "position" );

                // set position first, in-case top/left are set even on static elem
                if ( position === "static" ) {
                        elem.style.position = "relative";
                }

                var curElem = jQuery( elem ),
                        curOffset = curElem.offset(),
                        curCSSTop = jQuery.css( elem, "top" ),
                        curCSSLeft = jQuery.css( elem, "left" ),
                        calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                        props = {}, curPosition = {}, curTop, curLeft;

                // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
                if ( calculatePosition ) {
                        curPosition = curElem.position();
                        curTop = curPosition.top;
                        curLeft = curPosition.left;
                } else {
                        curTop = parseFloat( curCSSTop ) || 0;
                        curLeft = parseFloat( curCSSLeft ) || 0;
                }

                if ( jQuery.isFunction( options ) ) {
                        options = options.call( elem, i, curOffset );
                }

                if ( options.top != null ) {
                        props.top = ( options.top - curOffset.top ) + curTop;
                }
                if ( options.left != null ) {
                        props.left = ( options.left - curOffset.left ) + curLeft;
                }

                if ( "using" in options ) {
                        options.using.call( elem, props );
                } else {
                        curElem.css( props );
                }
        }
};


jQuery.fn.extend({

        position: function() {
                if ( !this[0] ) {
                        return;
                }

                var elem = this[0],

                // Get *real* offsetParent
                offsetParent = this.offsetParent(),

                // Get correct offsets
                offset       = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

                // Subtract element margins
                // note: when an element has margin: auto the offsetLeft and marginLeft
                // are the same in Safari causing offset.left to incorrectly be 0
                offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
                offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

                // Add offsetParent borders
                parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
                parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

                // Subtract the two offsets
                return {
                        top:  offset.top  - parentOffset.top,
                        left: offset.left - parentOffset.left
                };
        },

        offsetParent: function() {
                return this.map(function() {
                        var offsetParent = this.offsetParent || document.body;
                        while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
                                offsetParent = offsetParent.offsetParent;
                        }
                        return offsetParent || document.body;
                });
        }
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
        var top = /Y/.test( prop );

        jQuery.fn[ method ] = function( val ) {
                return jQuery.access( this, function( elem, method, val ) {
                        var win = getWindow( elem );

                        if ( val === undefined ) {
                                return win ? (prop in win) ? win[ prop ] :
                                        win.document.documentElement[ method ] :
                                        elem[ method ];
                        }

                        if ( win ) {
                                win.scrollTo(
                                        !top ? val : jQuery( win ).scrollLeft(),
                                         top ? val : jQuery( win ).scrollTop()
                                );

                        } else {
                                elem[ method ] = val;
                        }
                }, method, val, arguments.length, null );
        };
});

function getWindow( elem ) {
        return jQuery.isWindow( elem ) ?
                elem :
                elem.nodeType === 9 ?
                        elem.defaultView || elem.parentWindow :
                        false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
                // margin is only for outerHeight, outerWidth
                jQuery.fn[ funcName ] = function( margin, value ) {
                        var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                                extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                        return jQuery.access( this, function( elem, type, value ) {
                                var doc;

                                if ( jQuery.isWindow( elem ) ) {
                                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                                        // https://github.com/jquery/jquery/pull/764
                                        return elem.document.documentElement[ "client" + name ];
                                }

                                // Get document width or height
                                if ( elem.nodeType === 9 ) {
                                        doc = elem.documentElement;

                                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                                        return Math.max(
                                                elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                                                elem.body[ "offset" + name ], doc[ "offset" + name ],
                                                doc[ "client" + name ]
                                        );
                                }

                                return value === undefined ?
                                        // Get width or height on the element, requesting but not forcing parseFloat
                                        jQuery.css( elem, type, value, extra ) :

                                        // Set width or height on the element
                                        jQuery.style( elem, type, value, extra );
                        }, type, chainable ? margin : undefined, chainable, null );
                };
        });
});

if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	window.jQuery = window.$ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}


})( window );

});
define("mlellipsis/mlellipsis", [], function(require, exports, module){
exports.init = function() {
    /*
     * @author:tqtan
     * @date:13/10/10
     * @name:实现多行省略
     * 
    */


    /*
     *  @method:node.mlellipsis(row)
     *  @node:dom节点
     *  @row:行数
     *  
    */
    Element.prototype.getText=function(){
        if(this.innerText==undefined){return this.textContent;}
        else{return this.innerText;}
    }

    Element.prototype.setText=function(str){
        if(this.innerText==undefined){this.textContent=str||"";}
        else{this.innerText=str||"";}
    }

    Element.prototype.getFinalStyle=function(property,fontSize){
        var s;
        if(window.getComputedStyle){
            s = window.getComputedStyle(this, null)[property];
        }
        else{
            s = this.currentStyle[property];
        }

        //兼容IEbug:IE解析getComputedStyle或currentStyle,然而若line-height=1.5，它会获取计算后是1.5，而其他浏览器获得1.5*line-height
        if(fontSize!=undefined){
            s = s*fontSize + "px";
        }
        return s.substring(0,s.toString().length-2);
            
    }

    Element.prototype.mlellipsis=function(row){ 
        //省略后加上title
        var str = this.getText();
        var title = this.getAttribute("title");
        if(title==null){this.setAttribute("title",str);}
        else{this.setText(title);}

        //获取计算后的样式
        var fontSize = this.getFinalStyle("fontSize");
        if(/msie/i.test(navigator.userAgent)){
            var lineHeight = this.getFinalStyle("lineHeight",fontSize);
        }
        else{
            var lineHeight = this.getFinalStyle("lineHeight");
        }
        var height  = this.clientHeight;

        if(lineHeight == "norm"){
            lineHeight = Number(fontSize*1.5);
            this.setAttribute("style","line-height:"+lineHeight+"px");
        }
        else{lineHeight = Number(lineHeight);}

        
        //若高度足够，则不用省略
        var dheight = Math.floor(row*lineHeight);
        if(height >= dheight){
            str = this.getText();

            while(dheight*3<this.clientHeight){
                this.setText(str.substring(0,str.length/2));
                str = this.getText();
            }
            //减去末尾文字
            while(dheight<this.clientHeight){
                str = this.getText();
                this.setText(str.replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/,"..."));
            }
        }
    }


    Element.prototype.getTextLineNumber=function(row){ 
        //省略后加上title
        var str = this.getText();
        var title = this.getAttribute("title");
        if(title==null){this.setAttribute("title",str);}
        else{this.setText(title);}

        //获取计算后的样式
        var fontSize = this.getFinalStyle("fontSize");
        if(/msie/i.test(navigator.userAgent)){
            var lineHeight = this.getFinalStyle("lineHeight",fontSize);
        }
        else{
            var lineHeight = this.getFinalStyle("lineHeight");
        }
        var height  = this.clientHeight;

        if(lineHeight == "norm"){
            lineHeight = Number(fontSize*1.5);
            this.setAttribute("style","line-height:"+lineHeight+"px");
        }
        else{lineHeight = Number(lineHeight);}
        return height/lineHeight;
        
        //若高度足够，则不用省略
       /* var dheight = Math.floor(row*lineHeight);
        if(height >= dheight){
            str = this.getText();

            while(dheight*3<this.clientHeight){
                this.setText(str.substring(0,str.length/2));
                str = this.getText();
            }
            //减去末尾文字
            while(dheight<this.clientHeight){
                str = this.getText();
                this.setText(str.replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/,"..."));
            }
        }*/
    }

    /*
     *  /(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/ 正则:
     *  (\s)* 0或多个空白
     *  ([a-zA-Z0-9]+|\W) 一个或多个字母数字 或 任意不是字母，数字，汉字的字符
     *  (\.\.\.)? 零个或一个...
     */
}
    

});
define("lazyload/jquery.lazyload", [], function(require, exports, module){
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

var jQuery = require("jquery/jquery");

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

});
define("iscroll/iscroll-probe", [], function(require, exports, module){
/*! iScroll v5.1.2 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.prefixPointerEvent = function (pointerEvent) {
		return window.MSPointerEvent ? 
			'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
			pointerEvent;
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transitionDelay: _prefixStyle('transitionDelay'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		pointerdown: 3,
		pointermove: 3,
		pointerup: 3,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();

function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

		resizeScrollbars: true,

		mouseWheelSpeed: 20,

		snapThreshold: 0.334,

// INSERT POINT: OPTIONS 

		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

	if ( this.options.shrinkScrollbars == 'scale' ) {
		this.options.useTransition = false;
	}

	this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	if ( this.options.probeType == 3 ) {
		this.options.useTransition = false;	}

// INSERT POINT: NORMALIZATION

	// Some defaults	
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.1.2',

	_init: function () {
		this._initEvents();

		if ( this.options.scrollbars || this.options.indicators ) {
			this._initIndicators();
		}

		if ( this.options.mouseWheel ) {
			this._initWheel();
		}

		if ( this.options.snap ) {
			this._initSnap();
		}

		if ( this.options.keyBindings ) {
			this._initKeys();
		}

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);

		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller || !this.isInTransition ) {
			return;
		}

		this._transitionTime();
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this.isInTransition = false;
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
			if ( e.button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this._transitionTime();

		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
		} else if ( !this.options.useTransition && this.isAnimating ) {
			this.isAnimating = false;
			this._execEvent('scrollEnd');
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */
		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;

			if ( this.options.probeType == 1 ) {
				this._execEvent('scroll');
			}
		}

		if ( this.options.probeType > 1 ) {
			this._execEvent('scroll');
		}
/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			this._execEvent('scrollCancel');
			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}


		if ( this.options.snap ) {
			var snap = this._nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(newX - snap.x), 1000),
						Math.min(Math.abs(newY - snap.y), 1000)
					), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = this.options.bounceEasing;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */

		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

/* REPLACE END: refresh */

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function (type, fn) {
		if ( !this._events[type] ) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if ( index > -1 ) {
			this._events[type].splice(index, 1);
		}
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;

		if ( !time || (this.options.useTransition && easing.style) ) {
			this._transitionTimingFunction(easing.style);
			this._transitionTime(time);
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		time = time || 0;

		this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
		}


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTime(time);
			}
		}


// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}


// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;


	if ( this.indicators ) {
		for ( var i = this.indicators.length; i--; ) {
			this.indicators[i].updatePosition();
		}
	}


// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
			eventType(target, utils.prefixPointerEvent('pointermove'), this);
			eventType(target, utils.prefixPointerEvent('pointercancel'), this);
			eventType(target, utils.prefixPointerEvent('pointerup'), this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	},

	_initIndicators: function () {
		var interactive = this.options.interactiveScrollbars,
			customStyle = typeof this.options.scrollbars != 'string',
			indicators = [],
			indicator;

		var that = this;

		this.indicators = [];

		if ( this.options.scrollbars ) {
			// Vertical scrollbar
			if ( this.options.scrollY ) {
				indicator = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if ( this.options.scrollX ) {
				indicator = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}
		}

		if ( this.options.indicators ) {
			// TODO: check concat compatibility
			indicators = indicators.concat(this.options.indicators);
		}

		for ( var i = indicators.length; i--; ) {
			this.indicators.push( new Indicator(this, indicators[i]) );
		}

		// TODO: check if we can use array.map (wide compatibility and performance issues)
		function _indicatorsMap (fn) {
			for ( var i = that.indicators.length; i--; ) {
				fn.call(that.indicators[i]);
			}
		}

		if ( this.options.fadeScrollbars ) {
			this.on('scrollEnd', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollCancel', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1);
				});
			});

			this.on('beforeScrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1, true);
				});
			});
		}


		this.on('refresh', function () {
			_indicatorsMap(function () {
				this.refresh();
			});
		});

		this.on('destroy', function () {
			_indicatorsMap(function () {
				this.destroy();
			});

			delete this.indicators;
		});
	},

	_initWheel: function () {
		utils.addEvent(this.wrapper, 'wheel', this);
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			utils.removeEvent(this.wrapper, 'wheel', this);
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		if ( !this.enabled ) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		if ( this.wheelTimeout === undefined ) {
			that._execEvent('scrollStart');
		}

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			that._execEvent('scrollEnd');
			that.wheelTimeout = undefined;
		}, 400);

		if ( 'deltaX' in e ) {
			wheelDeltaX = -e.deltaX;
			wheelDeltaY = -e.deltaY;
		} else if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
			wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
		} else {
			return;
		}

		wheelDeltaX *= this.options.invertWheelDirection;
		wheelDeltaY *= this.options.invertWheelDirection;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
			wheelDeltaY = 0;
		}

		if ( this.options.snap ) {
			newX = this.currentPage.pageX;
			newY = this.currentPage.pageY;

			if ( wheelDeltaX > 0 ) {
				newX--;
			} else if ( wheelDeltaX < 0 ) {
				newX++;
			}

			if ( wheelDeltaY > 0 ) {
				newY--;
			} else if ( wheelDeltaY < 0 ) {
				newY++;
			}

			this.goToPage(newX, newY);

			return;
		}

		newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		this.scrollTo(newX, newY, 0);

		if ( this.options.probeType > 1 ) {
			this._execEvent('scroll');
		}

// INSERT POINT: _wheel
	},

	_initSnap: function () {
		this.currentPage = {};

		if ( typeof this.options.snap == 'string' ) {
			this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		}

		this.on('refresh', function () {
			var i = 0, l,
				m = 0, n,
				cx, cy,
				x = 0, y,
				stepX = this.options.snapStepX || this.wrapperWidth,
				stepY = this.options.snapStepY || this.wrapperHeight,
				el;

			this.pages = [];

			if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
				return;
			}

			if ( this.options.snap === true ) {
				cx = Math.round( stepX / 2 );
				cy = Math.round( stepY / 2 );

				while ( x > -this.scrollerWidth ) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while ( y > -this.scrollerHeight ) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				el = this.options.snap;
				l = el.length;
				n = -1;

				for ( ; i < l; i++ ) {
					if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
						m = 0;
						n++;
					}

					if ( !this.pages[m] ) {
						this.pages[m] = [];
					}

					x = Math.max(-el[i].offsetLeft, this.maxScrollX);
					y = Math.max(-el[i].offsetTop, this.maxScrollY);
					cx = x - Math.round(el[i].offsetWidth / 2);
					cy = y - Math.round(el[i].offsetHeight / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: el[i].offsetWidth,
						height: el[i].offsetHeight,
						cx: cx,
						cy: cy
					};

					if ( x > this.maxScrollX ) {
						m++;
					}
				}
			}

			this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

			// Update snap threshold if needed
			if ( this.options.snapThreshold % 1 === 0 ) {
				this.snapThresholdX = this.options.snapThreshold;
				this.snapThresholdY = this.options.snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
			}
		});

		this.on('flick', function () {
			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.x - this.startX), 1000),
						Math.min(Math.abs(this.y - this.startY), 1000)
					), 300);

			this.goToPage(
				this.currentPage.pageX + this.directionX,
				this.currentPage.pageY + this.directionY,
				time
			);
		});
	},

	_nearestSnap: function (x, y) {
		if ( !this.pages.length ) {
			return { x: 0, y: 0, pageX: 0, pageY: 0 };
		}

		var i = 0,
			l = this.pages.length,
			m = 0;

		// Check if we exceeded the snap threshold
		if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
			Math.abs(y - this.absStartY) < this.snapThresholdY ) {
			return this.currentPage;
		}

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		for ( ; i < l; i++ ) {
			if ( x >= this.pages[i][0].cx ) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		for ( ; m < l; m++ ) {
			if ( y >= this.pages[0][m].cy ) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if ( i == this.currentPage.pageX ) {
			i += this.directionX;

			if ( i < 0 ) {
				i = 0;
			} else if ( i >= this.pages.length ) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if ( m == this.currentPage.pageY ) {
			m += this.directionY;

			if ( m < 0 ) {
				m = 0;
			} else if ( m >= this.pages[0].length ) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x: x,
			y: y,
			pageX: i,
			pageY: m
		};
	},

	goToPage: function (x, y, time, easing) {
		easing = easing || this.options.bounceEasing;

		if ( x >= this.pages.length ) {
			x = this.pages.length - 1;
		} else if ( x < 0 ) {
			x = 0;
		}

		if ( y >= this.pages[x].length ) {
			y = this.pages[x].length - 1;
		} else if ( y < 0 ) {
			y = 0;
		}

		var posX = this.pages[x][y].x,
			posY = this.pages[x][y].y;

		time = time === undefined ? this.options.snapSpeed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};

		this.scrollTo(posX, posY, time, easing);
	},

	next: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x++;

		if ( x >= this.pages.length && this.hasVerticalScroll ) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	},

	prev: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x--;

		if ( x < 0 && this.hasVerticalScroll ) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	},

	_initKeys: function (e) {
		// default key bindings
		var keys = {
			pageUp: 33,
			pageDown: 34,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		var i;

		// if you give me characters I give you keycode
		if ( typeof this.options.keyBindings == 'object' ) {
			for ( i in this.options.keyBindings ) {
				if ( typeof this.options.keyBindings[i] == 'string' ) {
					this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
				}
			}
		} else {
			this.options.keyBindings = {};
		}

		for ( i in keys ) {
			this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
		}

		utils.addEvent(window, 'keydown', this);

		this.on('destroy', function () {
			utils.removeEvent(window, 'keydown', this);
		});
	},

	_key: function (e) {
		if ( !this.enabled ) {
			return;
		}

		var snap = this.options.snap,	// we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			newY = snap ? this.currentPage.pageY : this.y,
			now = utils.getTime(),
			prevTime = this.keyTime || 0,
			acceleration = 0.250,
			pos;

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this.isInTransition = false;
		}

		this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

		switch ( e.keyCode ) {
			case this.options.keyBindings.pageUp:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX += snap ? 1 : this.wrapperWidth;
				} else {
					newY += snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.pageDown:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX -= snap ? 1 : this.wrapperWidth;
				} else {
					newY -= snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length-1 : this.maxScrollX;
				newY = snap ? this.pages[0].length-1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			default:
				return;
		}

		if ( snap ) {
			this.goToPage(newX, newY);
			return;
		}

		if ( newX > 0 ) {
			newX = 0;
			this.keyAcceleration = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
			this.keyAcceleration = 0;
		}

		if ( newY > 0 ) {
			newY = 0;
			this.keyAcceleration = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
			this.keyAcceleration = 0;
		}

		this.scrollTo(newX, newY, 0);

		this.keyTime = now;
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);
				
				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}

			if ( that.options.probeType == 3 ) {
				that._execEvent('scroll');
			}
		}

		this.isAnimating = true;
		step();
	},

	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};
function createDefaultScrollbar (direction, interactive, type) {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

	if ( type === true ) {
		scrollbar.style.cssText = 'position:absolute;z-index:9999';
		indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	}

	indicator.className = 'iScrollIndicator';

	if ( direction == 'h' ) {
		if ( type === true ) {
			scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
			indicator.style.height = '100%';
		}
		scrollbar.className = 'iScrollHorizontalScrollbar';
	} else {
		if ( type === true ) {
			scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
			indicator.style.width = '100%';
		}
		scrollbar.className = 'iScrollVerticalScrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';

	if ( !interactive ) {
		scrollbar.style.pointerEvents = 'none';
	}

	scrollbar.appendChild(indicator);

	return scrollbar;
}

function Indicator (scroller, options) {
	this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	this.wrapperStyle = this.wrapper.style;
	this.indicator = this.wrapper.children[0];
	this.indicatorStyle = this.indicator.style;
	this.scroller = scroller;

	this.options = {
		listenX: true,
		listenY: true,
		interactive: false,
		resize: true,
		defaultScrollbars: false,
		shrink: false,
		fade: false,
		speedRatioX: 0,
		speedRatioY: 0
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	this.sizeRatioX = 1;
	this.sizeRatioY = 1;
	this.maxPosX = 0;
	this.maxPosY = 0;

	if ( this.options.interactive ) {
		if ( !this.options.disableTouch ) {
			utils.addEvent(this.indicator, 'touchstart', this);
			utils.addEvent(window, 'touchend', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(this.indicator, 'mousedown', this);
			utils.addEvent(window, 'mouseup', this);
		}
	}

	if ( this.options.fade ) {
		this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
		this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
		this.wrapperStyle.opacity = '0';
	}
}

Indicator.prototype = {
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
		}
	},

	destroy: function () {
		if ( this.options.interactive ) {
			utils.removeEvent(this.indicator, 'touchstart', this);
			utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.removeEvent(this.indicator, 'mousedown', this);

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			utils.removeEvent(window, 'touchend', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
			utils.removeEvent(window, 'mouseup', this);
		}

		if ( this.options.defaultScrollbars ) {
			this.wrapper.parentNode.removeChild(this.wrapper);
		}
	},

	_start: function (e) {
		var point = e.touches ? e.touches[0] : e;

		e.preventDefault();
		e.stopPropagation();

		this.transitionTime();

		this.initiated = true;
		this.moved = false;
		this.lastPointX	= point.pageX;
		this.lastPointY	= point.pageY;

		this.startTime	= utils.getTime();

		if ( !this.options.disableTouch ) {
			utils.addEvent(window, 'touchmove', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(window, 'mousemove', this);
		}

		this.scroller._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		var point = e.touches ? e.touches[0] : e,
			deltaX, deltaY,
			newX, newY,
			timestamp = utils.getTime();

		if ( !this.moved ) {
			this.scroller._execEvent('scrollStart');
		}

		this.moved = true;

		deltaX = point.pageX - this.lastPointX;
		this.lastPointX = point.pageX;

		deltaY = point.pageY - this.lastPointY;
		this.lastPointY = point.pageY;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		this._pos(newX, newY);


		if ( this.scroller.options.probeType == 1 && timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.scroller._execEvent('scroll');
		} else if ( this.scroller.options.probeType > 1 ) {
			this.scroller._execEvent('scroll');
		}


// INSERT POINT: indicator._move

		e.preventDefault();
		e.stopPropagation();
	},

	_end: function (e) {
		if ( !this.initiated ) {
			return;
		}

		this.initiated = false;

		e.preventDefault();
		e.stopPropagation();

		utils.removeEvent(window, 'touchmove', this);
		utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
		utils.removeEvent(window, 'mousemove', this);

		if ( this.scroller.options.snap ) {
			var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.scroller.x - snap.x), 1000),
						Math.min(Math.abs(this.scroller.y - snap.y), 1000)
					), 300);

			if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
				this.scroller.directionX = 0;
				this.scroller.directionY = 0;
				this.scroller.currentPage = snap;
				this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
			}
		}

		if ( this.moved ) {
			this.scroller._execEvent('scrollEnd');
		}
	},

	transitionTime: function (time) {
		time = time || 0;
		this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
		}
	},

	transitionTimingFunction: function (easing) {
		this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	},

	refresh: function () {
		this.transitionTime();

		if ( this.options.listenX && !this.options.listenY ) {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
		} else if ( this.options.listenY && !this.options.listenX ) {
			this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
		} else {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
		}

		if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
			utils.addClass(this.wrapper, 'iScrollBothScrollbars');
			utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '8px';
				} else {
					this.wrapper.style.bottom = '8px';
				}
			}
		} else {
			utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
			utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '2px';
				} else {
					this.wrapper.style.bottom = '2px';
				}
			}
		}

		var r = this.wrapper.offsetHeight;	// force refresh

		if ( this.options.listenX ) {
			this.wrapperWidth = this.wrapper.clientWidth;
			if ( this.options.resize ) {
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';
			} else {
				this.indicatorWidth = this.indicator.clientWidth;
			}

			this.maxPosX = this.wrapperWidth - this.indicatorWidth;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryX = -this.indicatorWidth + 8;
				this.maxBoundaryX = this.wrapperWidth - 8;
			} else {
				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;
			}

			this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));	
		}

		if ( this.options.listenY ) {
			this.wrapperHeight = this.wrapper.clientHeight;
			if ( this.options.resize ) {
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';
			} else {
				this.indicatorHeight = this.indicator.clientHeight;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryY = -this.indicatorHeight + 8;
				this.maxBoundaryY = this.wrapperHeight - 8;
			} else {
				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;
			this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
		}

		this.updatePosition();
	},

	updatePosition: function () {
		var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

		if ( !this.options.ignoreBoundaries ) {
			if ( x < this.minBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth + x, 8);
					this.indicatorStyle.width = this.width + 'px';
				}
				x = this.minBoundaryX;
			} else if ( x > this.maxBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
					this.indicatorStyle.width = this.width + 'px';
					x = this.maxPosX + this.indicatorWidth - this.width;
				} else {
					x = this.maxBoundaryX;
				}
			} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if ( y < this.minBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight + y * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
				}
				y = this.minBoundaryY;
			} else if ( y > this.maxBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
					y = this.maxPosY + this.indicatorHeight - this.height;
				} else {
					y = this.maxBoundaryY;
				}
			} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}
		}

		this.x = x;
		this.y = y;

		if ( this.scroller.options.useTransform ) {
			this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
		} else {
			this.indicatorStyle.left = x + 'px';
			this.indicatorStyle.top = y + 'px';
		}
	},

	_pos: function (x, y) {
		if ( x < 0 ) {
			x = 0;
		} else if ( x > this.maxPosX ) {
			x = this.maxPosX;
		}

		if ( y < 0 ) {
			y = 0;
		} else if ( y > this.maxPosY ) {
			y = this.maxPosY;
		}

		x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
		y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

		this.scroller.scrollTo(x, y);
	},

	fade: function (val, hold) {
		if ( hold && !this.visible ) {
			return;
		}

		clearTimeout(this.fadeTimeout);
		this.fadeTimeout = null;

		var time = val ? 250 : 500,
			delay = val ? 0 : 300;

		val = val ? '1' : '0';

		this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

		this.fadeTimeout = setTimeout((function (val) {
			this.wrapperStyle.opacity = val;
			this.visible = +val;
		}).bind(this, val), delay);
	}
};

IScroll.utils = utils;

if ( typeof module != 'undefined' && module.exports ) {
	module.exports = IScroll;
} else {
	window.IScroll = IScroll;
}

})(window, document, Math);
});
define("mustache/mustache", [], function(require, exports, module){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (global, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    factory(global.Mustache = {}); // <script>
  }
}(this, function (mustache) {

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags(tags) {
      if (typeof tags === 'string')
        tags = tags.split(spaceRe, 2);

      if (!isArray(tags) || tags.length !== 2)
        throw new Error('Invalid tags: ' + tags);

      openingTagRe = new RegExp(escapeRegExp(tags[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tags[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tags[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var cache = this.cache;

    var value;
    if (name in cache) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1 && value != null)
              lookupHit = (typeof value === 'object') &&
                value.hasOwnProperty(names[index]);
            value = value[names[index++]];
          }
        } else if (context.view != null && typeof context.view === 'object') {
          value = context.view[name];
          lookupHit = context.view.hasOwnProperty(name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this._renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this._renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this._renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this._unescapedValue(token, context);
      else if (symbol === 'name') value = this._escapedValue(token, context);
      else if (symbol === 'text') value = this._rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype._renderSection = function (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender(template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype._renderInverted = function(token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype._renderPartial = function(token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype._unescapedValue = function(token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype._escapedValue = function(token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype._rawValue = function(token) {
    return token[1];
  };

  mustache.name = "mustache.js";
  mustache.version = "2.0.0";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

});
define("underscore/underscore", [], function(require, exports, module){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    _.each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    _.each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    _.each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    _.some(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    _.each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(predicate), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    _.each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    _.each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length === +obj.length) return _.indexOf(obj, target) >= 0;
    return _.some(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (!iterator && _.isArray(obj)) {
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      _.each(obj, function(value, index, list) {
        computed = iterator ? iterator.call(context, value, index, list) : value;
        if (computed > lastComputed || (computed === -Infinity && result === -Infinity)) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (!iterator && _.isArray(obj)) {
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      _.each(obj, function(value, index, list) {
        computed = iterator ? iterator.call(context, value, index, list) : value;
        if (computed < lastComputed || (computed === Infinity && result === Infinity)) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    _.each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value, context) {
    if (value == null) return _.identity;
    if (!_.isFunction(value)) return _.property(value);
    if (!context) return value;
    return function() {
      return value.apply(context, arguments);
    };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator, context);
      _.each(obj, function(value, index) {
        var key = iterator(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator, context);
    var value = iterator(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator(array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = lookupIterator(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (array == null) return [];
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (iterator) value = iterator.call(context, value, i, array);
      if (isSorted ? (!i || seen !== value) : !_.contains(seen, value)) {
        if (isSorted) seen = value;
        else seen.push(value);
        result.push(array[i]);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var i = from == null ? array.length : from;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    _.each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    _.each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iterator, context) {
    var result = {};
    if (_.isFunction(iterator)) {
      for (var key in obj) {
        var value = obj[key];
        if (iterator.call(context, value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iterator, context) {
    var keys;
    if (_.isFunction(iterator)) {
      iterator = _.negate(iterator);
    } else {
      keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iterator = function(value, key) { return !_.contains(keys, key); };
    }
    return _.pick(obj, iterator, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    _.each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj == null) return _.isEmpty(attrs);
      if (obj === attrs) return true;
      for (var key in attrs) if (attrs[key] !== obj[key]) return false;
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

});
define("flexslider/jquery.flexslider", [], function(require, exports, module){
//require('./flexslider.css');
/*
 * jQuery FlexSlider v2.5.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
var jQuery = require("jquery/jquery");
(function($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
      msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      touch = (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
      // depricating this idea, as devices are being released with both of these events
      //eventType = (touch) ? "touchend" : "click",
      eventType = "click touchend MSPointerUp keyup",
      watchedEvent = "",
      watchedEventClearTimer,
      vertical = slider.vars.direction === "vertical",
      reverse = slider.vars.reverse,
      carousel = (slider.vars.itemWidth > 0),
      fade = slider.vars.animation === "fade",
      asNav = slider.vars.asNavFor !== "",
      methods = {},
      focused = true;

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
        if (isNaN(slider.currentSlide)) {
          slider.currentSlide = 0;
        }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") {
          slider.vars.animation = "swing";
        }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
            props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if (obj.style[props[i]] !== undefined) {
              slider.pfx = props[i].replace('Perspective', '').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() {
            return (Math.round(Math.random()) - 0.5);
          });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) {
          methods.controlNav.setup();
        }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) {
          methods.directionNav.setup();
        }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) {
          methods.pausePlay.setup();
        }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) {
          methods.pauseInvisible.init();
        }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) {
                slider.pause();
              }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
                slider.play();
              }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay): slider.play();
          }
        }

        // ASNAV:
        if (asNav) {
          methods.asNav.setup();
        }

        // TOUCH
        if (touch && slider.vars.touch) {
          methods.touch();
        }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) {
          $(window).bind("resize orientationchange focus", methods.resize);
        }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function() {
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if (!msGesture) {
            slider.slides.on(eventType, function(e) {
              e.preventDefault();
              var $slide = $(this),
                target = $slide.index();
              var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
              if (posFromLeft <= 0 && $slide.hasClass(namespace + 'active-slide')) {
                slider.flexAnimate(slider.getTarget("prev"), true);
              } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                slider.direction = (slider.currentItem < target) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
              }
            });
          } else {
            el._slider = slider;
            slider.slides.each(function() {
              var that = this;
              that._gesture = new MSGesture();
              that._gesture.target = that;
              that.addEventListener("MSPointerDown", function(e) {
                e.preventDefault();
                if (e.currentTarget._gesture) {
                  e.currentTarget._gesture.addPointer(e.pointerId);
                }
              }, false);
              that.addEventListener("MSGestureTap", function(e) {
                e.preventDefault();
                var $slide = $(this),
                  target = $slide.index();
                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
            });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
            j = 1,
            item,
            slide;

          slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr('data-thumb') + '"/>' : '<a>' + j + '</a>';
              if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
                var captn = slide.attr('data-thumbcaption');
                if ('' !== captn && undefined !== captn) {
                  item += '<span class="' + namespace + 'caption">' + captn + '</span>';
                }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold): slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next": slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action): methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
            // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText): slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if (!msGesture) {
          onTouchStart = function(e) {
            if (slider.animating) {
              e.preventDefault();
            } else if ((window.navigator.msPointerEnabled) || e.touches.length === 1) {
              slider.pause();
              // CAROUSEL:
              cwidth = (vertical) ? slider.h : slider.w;
              startT = Number(new Date());
              // CAROUSEL:

              // Local vars for X and Y points.
              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                (carousel && slider.currentSlide === slider.last) ? slider.limit :
                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
              startX = (vertical) ? localY : localX;
              startY = (vertical) ? localX : localY;

              el.addEventListener('touchmove', onTouchMove, false);
              el.addEventListener('touchend', onTouchEnd, false);
            }
          };

          onTouchMove = function(e) {
            // Local vars for X and Y points.

            localX = e.touches[0].pageX;
            localY = e.touches[0].pageY;

            dx = (vertical) ? startX - localY : startX - localX;
            scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

            var fxms = 500;

            if (!scrolling || Number(new Date()) - startT > fxms) {
              e.preventDefault();
              if (!fade && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                }
                slider.setProps(offset + dx, "setTouch");
              }
            }
          };

          onTouchEnd = function(e) {
            // finish the touch by undoing the touch session
            el.removeEventListener('touchmove', onTouchMove, false);

            if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
              var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

              if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else {
                if (!fade) {
                  slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
            }
            el.removeEventListener('touchend', onTouchEnd, false);

            startX = null;
            startY = null;
            dx = null;
            offset = null;
          };

          el.addEventListener('touchstart', onTouchStart, false);
        } else {
          el.style.msTouchAction = "none";
          el._gesture = new MSGesture();
          el._gesture.target = el;
          el.addEventListener("MSPointerDown", onMSPointerDown, false);
          el._slider = slider;
          el.addEventListener("MSGestureChange", onMSGestureChange, false);
          el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

          function onMSPointerDown(e) {
            e.stopPropagation();
            if (slider.animating) {
              e.preventDefault();
            } else {
              slider.pause();
              el._gesture.addPointer(e.pointerId);
              accDx = 0;
              cwidth = (vertical) ? slider.h : slider.w;
              startT = Number(new Date());
              // CAROUSEL:

              offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                (carousel && slider.currentSlide === slider.last) ? slider.limit :
                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            }
          }

          function onMSGestureChange(e) {
            e.stopPropagation();
            var slider = e.target._slider;
            if (!slider) {
              return;
            }
            var transX = -e.translationX,
              transY = -e.translationY;

            //Accumulate translations.
            accDx = accDx + ((vertical) ? transY : transX);
            dx = accDx;
            scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

            if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
              setImmediate(function() {
                el._gesture.stop();
              });

              return;
            }

            if (!scrolling || Number(new Date()) - startT > 500) {
              e.preventDefault();
              if (!fade && slider.transitions) {
                if (!slider.vars.animationLoop) {
                  dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                }
                slider.setProps(offset + dx, "setTouch");
              }
            }
          }

          function onMSGestureEnd(e) {
            e.stopPropagation();
            var slider = e.target._slider;
            if (!slider) {
              return;
            }
            if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
              var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

              if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              } else {
                if (!fade) {
                  slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                }
              }
            }

            startX = null;
            startY = null;
            dx = null;
            offset = null;
            accDx = 0;
          }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) {
            slider.doMath();
          }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          } else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) {
              methods.smoothHeight();
            }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({
            "height": slider.slides.eq(slider.animatingTo).height()
          }, dur): $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
          target = slider.animatingTo;

        switch (action) {
          case "animate":
            $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
            break;
          case "play":
            if (!$obj.playing && !$obj.asNav) {
              $obj.play();
            }
            break;
          case "pause":
            $obj.pause();
            break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter('[id]').add($clone.find('[id]')).each(function() {
          var $this = $(this);
          $this.attr('id', $this.attr('id') + '_clone');
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if (slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              } else {
                if (slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit', 'moz', 'ms', 'o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document) {
              return prefixes[i] + 'Hidden';
            }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target / slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) {
          slider.pause();
        }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) {
          methods.sync("animate");
        }

        // CONTROLNAV
        if (slider.vars.controlNav) {
          methods.controlNav.active();
        }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) {
          slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
        }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) {
          methods.directionNav.update();
        }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) {
            slider.pause();
          }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
            margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function() {
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
            //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

            slider.slides.eq(slider.currentSlide).css({
              "zIndex": 1
            }).animate({
              "opacity": 0
            }, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({
              "zIndex": 2
            }).animate({
              "opacity": 1
            }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          } else {
            slider.slides.eq(slider.currentSlide).css({
              "opacity": 0,
              "zIndex": 1
            });
            slider.slides.eq(target).css({
              "opacity": 1,
              "zIndex": 2
            });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) {
          methods.smoothHeight(slider.vars.animationSpeed);
        }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused) {
        slider.flexAnimate(slider.getTarget("next"));
      }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) {
        methods.pausePlay.update("play");
      }
      // SYNC:
      if (slider.syncExists) {
        methods.sync("pause");
      }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) {
        clearInterval(slider.animatedSlides);
      }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) {
        methods.pausePlay.update("pause");
      }
      // SYNC:
      if (slider.syncExists) {
        methods.sync("play");
      }
    };
    // STOP:
    slider.stop = function() {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
        (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
        (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
        (target === slider.currentSlide && !asNav) ? false :
        (slider.vars.animationLoop) ? true :
        (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
        (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
        true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
          posCalc = (function() {
            if (carousel) {
              return (special === "setTouch") ? pos :
                (reverse && slider.animatingTo === slider.last) ? 0 :
                (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                (slider.animatingTo === slider.last) ? slider.limit : posCheck;
            } else {
              switch (special) {
                case "setTotal":
                  return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                case "setTouch":
                  return (reverse) ? pos : pos;
                case "jumpEnd":
                  return (reverse) ? pos : slider.count * pos;
                case "jumpStart":
                  return (reverse) ? slider.count * pos : pos;
                default:
                  return pos;
              }
            }
          }());

        return (posCalc * -1) + "px";
      }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
        slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) {
        slider.container.css(slider.args);
      }

      slider.container.css('transform', target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
            "overflow": "hidden",
            "position": "relative"
          }).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") {
            slider.container.find('.clone').remove();
          }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
            .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function() {
            slider.newSlides.css({
              "display": "block"
            });
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function() {
            slider.doMath();
            slider.newSlides.css({
              "width": slider.computedW,
              "float": "left",
              "display": "block"
            });
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) {
              methods.smoothHeight();
            }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({
          "width": "100%",
          "float": "left",
          "marginRight": "-100%",
          "position": "relative"
        });
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({
                "opacity": 0,
                "display": "block",
                "zIndex": 1
              }).eq(slider.currentSlide).css({
                "zIndex": 2
              }).css({
                "opacity": 1
              });
            } else {
              slider.slides.css({
                "opacity": 0,
                "display": "block",
                "zIndex": 1
              }).eq(slider.currentSlide).css({
                "zIndex": 2
              }).animate({
                "opacity": 1
              }, slider.vars.animationSpeed, slider.vars.easing);
            }
          } else {
            slider.slides.css({
              "opacity": 0,
              "display": "block",
              "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease",
              "zIndex": 1
            }).eq(slider.currentSlide).css({
              "opacity": 1,
              "zIndex": 2
            });
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) {
          methods.smoothHeight();
        }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) {
        slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
      }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
        slideMargin = slider.vars.itemMargin,
        minItems = slider.vars.minItems,
        maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1))) / minItems :
          (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1))) / maxItems :
          (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w / (slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
        slider.last = slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
          (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) {
        methods.directionNav.update();
      }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj): slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj): slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove(): slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $(window).blur(function(e) {
    focused = false;
  }).focus(function(e) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-", //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li", //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade", //String: Select your animation type, "fade" or "slide"
    easing: "swing", //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal", //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false, //{NEW} Boolean: Reverse the animation direction
    animationLoop: true, //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false, //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0, //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true, //Boolean: Animate slider automatically
    slideshowSpeed: 7000, //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600, //Integer: Set the speed of animations, in milliseconds
    initDelay: 0, //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false, //Boolean: Randomize slide order
    fadeFirstSlide: true, //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false, //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true, //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false, //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true, //{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true, //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true, //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false, //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true, //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true, //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous", //String: Set the text for the "previous" directionNav item
    nextText: "Next", //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true, //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false, //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false, //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false, //Boolean: Create pause/play dynamic element
    pauseText: "Pause", //String: Set the text for the "pause" pausePlay item
    playText: "Play", //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "", //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "", //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "", //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "", //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "", //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0, //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0, //{NEW} Integer: Margin between carousel items.
    minItems: 1, //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0, //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0, //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true, //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function() {}, //Callback: function(slider) - Fires when the slider loads the first slide
    before: function() {}, //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function() {}, //Callback: function(slider) - Fires after each slider animation completes
    end: function() {}, //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function() {}, //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function() {}, //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {} //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) {
      options = {};
    }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
          selector = (options.selector) ? options.selector : ".slides > li",
          $slides = $this.find(selector);

        if (($slides.length === 1 && options.allowOneSlide === true) || $slides.length === 0) {
          $slides.fadeIn(400);
          if (options.start) {
            options.start($this);
          }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play":
          $slider.play();
          break;
        case "pause":
          $slider.pause();
          break;
        case "stop":
          $slider.stop();
          break;
        case "next":
          $slider.flexAnimate($slider.getTarget("next"), true);
          break;
        case "prev":
        case "previous":
          $slider.flexAnimate($slider.getTarget("prev"), true);
          break;
        default:
          if (typeof options === "number") {
            $slider.flexAnimate(options, true);
          }
      }
    }
  };
})(jQuery);
});
define("jquery-pjax-183/index", [], function(require, exports, module){
/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */
var jQuery = require("jquery/jquery");

(function($) {

  // When called on a container with a selector, fetches the href with
  // ajax into the container or with the data-pjax attribute on the link
  // itself.
  //
  // Tries to make sure the back button and ctrl+click work the way
  // you'd expect.
  //
  // Exported as $.fn.pjax
  //
  // Accepts a jQuery ajax options object that may include these
  // pjax specific options:
  //
  //
  // container - Where to stick the response body. Usually a String selector.
  //             $(container).html(xhr.responseBody)
  //             (default: current jquery context)
  //      push - Whether to pushState the URL. Defaults to true (of course).
  //   replace - Want to use replaceState instead? That's cool.
  //
  // For convenience the second parameter can be either the container or
  // the options object.
  //
  // Returns the jQuery object
  function fnPjax(selector, container, options) {
    var context = this
    return this.on('click.pjax', selector, function(event) {
      var opts = $.extend({}, optionsFor(container, options))
      if (!opts.container)
        opts.container = $(this).attr('data-pjax') || context
      handleClick(event, opts)
    })
  }

  // Public: pjax on click handler
  //
  // Exported as $.pjax.click.
  //
  // event   - "click" jQuery.Event
  // options - pjax options
  //
  // Examples
  //
  //   $(document).on('click', 'a', $.pjax.click)
  //   // is the same as
  //   $(document).pjax('a')
  //
  //  $(document).on('click', 'a', function(event) {
  //    var container = $(this).closest('[data-pjax-container]')
  //    $.pjax.click(event, container)
  //  })
  //
  // Returns nothing.
  function handleClick(event, container, options) {
    options = optionsFor(container, options)

    var link = event.currentTarget

    if (link.tagName.toUpperCase() !== 'A')
      throw "$.fn.pjax or $.pjax.click requires an anchor element"

    // Middle click, cmd click, and ctrl click should open
    // links in a new tab as normal.
    if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return

    // Ignore cross origin links
    if (location.protocol !== link.protocol || location.hostname !== link.hostname)
      return

    // Ignore case when a hash is being tacked on the current URL
    if (link.href.indexOf('#') > -1 && stripHash(link) == stripHash(location))
      return

    // Ignore event with default prevented
    if (event.isDefaultPrevented())
      return

    var defaults = {
      url: link.href,
      container: $(link).attr('data-pjax'),
      target: link
    }

    var opts = $.extend({}, defaults, options)
    var clickEvent = $.Event('pjax:click')
    $(link).trigger(clickEvent, [opts])

    if (!clickEvent.isDefaultPrevented()) {
      pjax(opts)
      event.preventDefault()
      $(link).trigger('pjax:clicked', [opts])
    }
  }

  // Public: pjax on form submit handler
  //
  // Exported as $.pjax.submit
  //
  // event   - "click" jQuery.Event
  // options - pjax options
  //
  // Examples
  //
  //  $(document).on('submit', 'form', function(event) {
  //    var container = $(this).closest('[data-pjax-container]')
  //    $.pjax.submit(event, container)
  //  })
  //
  // Returns nothing.
  function handleSubmit(event, container, options) {
    options = optionsFor(container, options)

    var form = event.currentTarget

    if (form.tagName.toUpperCase() !== 'FORM')
      throw "$.pjax.submit requires a form element"

    var defaults = {
      type: form.method.toUpperCase(),
      url: form.action,
      container: $(form).attr('data-pjax'),
      target: form
    }

    if (defaults.type !== 'GET' && window.FormData !== undefined) {
      defaults.data = new FormData(form);
      defaults.processData = false;
      defaults.contentType = false;
    } else {
      // Can't handle file uploads, exit
      if ($(form).find(':file').length) {
        return;
      }

      // Fallback to manually serializing the fields
      defaults.data = $(form).serializeArray();
    }

    pjax($.extend({}, defaults, options))

    event.preventDefault()
  }

  // Loads a URL with ajax, puts the response body inside a container,
  // then pushState()'s the loaded URL.
  //
  // Works just like $.ajax in that it accepts a jQuery ajax
  // settings object (with keys like url, type, data, etc).
  //
  // Accepts these extra keys:
  //
  // container - Where to stick the response body.
  //             $(container).html(xhr.responseBody)
  //      push - Whether to pushState the URL. Defaults to true (of course).
  //   replace - Want to use replaceState instead? That's cool.
  //
  // Use it just like $.ajax:
  //
  //   var xhr = $.pjax({ url: this.href, container: '#main' })
  //   console.log( xhr.readyState )
  //
  // Returns whatever $.ajax returns.
  function pjax(options) {
    options = $.extend(true, {}, $.ajaxSettings, pjax.defaults, options)

    if ($.isFunction(options.url)) {
      options.url = options.url()
    }

    var target = options.target

    var hash = parseURL(options.url).hash

    var context = options.context = findContainerFor(options.container)

    // We want the browser to maintain two separate internal caches: one
    // for pjax'd partial page loads and one for normal page loads.
    // Without adding this secret parameter, some browsers will often
    // confuse the two.
    if (!options.data) options.data = {}
    if ($.isArray(options.data)) {
      options.data.push({
        name: '_pjax',
        value: context.selector
      })
    } else {
      options.data._pjax = context.selector
    }

    function fire(type, args, props) {
      if (!props) props = {}
      props.relatedTarget = target
      var event = $.Event(type, props)
      context.trigger(event, args)
      return !event.isDefaultPrevented()
    }

    var timeoutTimer

    options.beforeSend = function(xhr, settings) {
      // No timeout for non-GET requests
      // Its not safe to request the resource again with a fallback method.
      if (settings.type !== 'GET') {
        settings.timeout = 0
      }

      xhr.setRequestHeader('X-PJAX', 'true')
      xhr.setRequestHeader('X-PJAX-Container', context.selector)

      if (!fire('pjax:beforeSend', [xhr, settings]))
        return false

      if (settings.timeout > 0) {
        timeoutTimer = setTimeout(function() {
          if (fire('pjax:timeout', [xhr, options]))
            xhr.abort('timeout')
        }, settings.timeout)

        // Clear timeout setting so jquerys internal timeout isn't invoked
        settings.timeout = 0
      }

      var url = parseURL(settings.url)
      url.hash = hash
      options.requestUrl = stripInternalParams(url.href)
    }

    options.complete = function(xhr, textStatus) {
      if (timeoutTimer)
        clearTimeout(timeoutTimer)

      fire('pjax:complete', [xhr, textStatus, options])

      fire('pjax:end', [xhr, options])
    }

    options.error = function(xhr, textStatus, errorThrown) {
      var container = extractContainer("", xhr, options)

      var allowed = fire('pjax:error', [xhr, textStatus, errorThrown, options])
      if (options.type == 'GET' && textStatus !== 'abort' && allowed) {
        locationReplace(container.url)
      }
    }

    options.success = function(data, status, xhr) {
      var previousState = pjax.state;

      // If $.pjax.defaults.version is a function, invoke it first.
      // Otherwise it can be a static string.
      var currentVersion = (typeof $.pjax.defaults.version === 'function') ?
        $.pjax.defaults.version() :
        $.pjax.defaults.version

      var latestVersion = xhr.getResponseHeader('X-PJAX-Version')

      var container = extractContainer(data, xhr, options)

      var url = parseURL(container.url)
      if (hash) {
        url.hash = hash
        container.url = url.href
      }

      // If there is a layout version mismatch, hard load the new url
      if (currentVersion && latestVersion && currentVersion !== latestVersion) {
        locationReplace(container.url)
        return
      }

      // If the new response is missing a body, hard load the page
      if (!container.contents) {
        locationReplace(container.url)
        return
      }

      pjax.state = {
        id: options.id || uniqueId(),
        url: container.url,
        title: container.title,
        container: context.selector,
        fragment: options.fragment,
        timeout: options.timeout
      }

      if (options.push || options.replace) {
        window.history.replaceState(pjax.state, container.title, container.url)
      }

      // Clear out any focused controls before inserting new page contents.
      try {
        document.activeElement.blur()
      } catch (e) {}

      if (container.title) document.title = container.title

      fire('pjax:beforeReplace', [container.contents, options], {
        state: pjax.state,
        previousState: previousState
      })
      context.html(container.contents)

      // FF bug: Won't autofocus fields that are inserted via JS.
      // This behavior is incorrect. So if theres no current focus, autofocus
      // the last field.
      //
      // http://www.w3.org/html/wg/drafts/html/master/forms.html
      var autofocusEl = context.find('input[autofocus], textarea[autofocus]').last()[0]
      if (autofocusEl && document.activeElement !== autofocusEl) {
        autofocusEl.focus();
      }

      executeScriptTags(container.scripts)

      var scrollTo = options.scrollTo

      // Ensure browser scrolls to the element referenced by the URL anchor
      if (hash) {
        var name = decodeURIComponent(hash.slice(1))
        var target = document.getElementById(name) || document.getElementsByName(name)[0]
        if (target) scrollTo = $(target).offset().top
      }

      if (typeof scrollTo == 'number') $(window).scrollTop(scrollTo)

      fire('pjax:success', [data, status, xhr, options])
    }


    // Initialize pjax.state for the initial page load. Assume we're
    // using the container and options of the link we're loading for the
    // back button to the initial page. This ensures good back button
    // behavior.
    if (!pjax.state) {
      pjax.state = {
        id: uniqueId(),
        url: window.location.href,
        title: document.title,
        container: context.selector,
        fragment: options.fragment,
        timeout: options.timeout
      }
      window.history.replaceState(pjax.state, document.title)
    }

    // Cancel the current request if we're already pjaxing
    abortXHR(pjax.xhr)

    pjax.options = options
    var xhr = pjax.xhr = $.ajax(options)

    if (xhr.readyState > 0) {
      if (options.push && !options.replace) {
        // Cache current container element before replacing it
        cachePush(pjax.state.id, cloneContents(context))

        window.history.pushState(null, "", options.requestUrl)
      }

      fire('pjax:start', [xhr, options])
      fire('pjax:send', [xhr, options])
    }

    return pjax.xhr
  }

  // Public: Reload current page with pjax.
  //
  // Returns whatever $.pjax returns.
  function pjaxReload(container, options) {
    var defaults = {
      url: window.location.href,
      push: false,
      replace: true,
      scrollTo: false
    }

    return pjax($.extend(defaults, optionsFor(container, options)))
  }

  // Internal: Hard replace current state with url.
  //
  // Work for around WebKit
  //   https://bugs.webkit.org/show_bug.cgi?id=93506
  //
  // Returns nothing.
  function locationReplace(url) {
    window.history.replaceState(null, "", pjax.state.url)
    window.location.replace(url)
  }


  var initialPop = true
  var initialURL = window.location.href
  var initialState = window.history.state

  // Initialize $.pjax.state if possible
  // Happens when reloading a page and coming forward from a different
  // session history.
  if (initialState && initialState.container) {
    pjax.state = initialState
  }

  // Non-webkit browsers don't fire an initial popstate event
  if ('state' in window.history) {
    initialPop = false
  }

  // popstate handler takes care of the back and forward buttons
  //
  // You probably shouldn't use pjax on pages with other pushState
  // stuff yet.
  function onPjaxPopstate(event) {

    // Hitting back or forward should override any pending PJAX request.
    if (!initialPop) {
      abortXHR(pjax.xhr)
    }

    var previousState = pjax.state
    var state = event.state

    if (state && state.container) {
      // When coming forward from a separate history session, will get an
      // initial pop with a state we are already at. Skip reloading the current
      // page.
      if (initialPop && initialURL == state.url) return

      var direction, containerSelector = state.container

      if (previousState) {
        // If popping back to the same state, just skip.
        // Could be clicking back from hashchange rather than a pushState.
        if (previousState.id === state.id) return

        // Since state IDs always increase, we can deduce the navigation direction
        direction = previousState.id < state.id ? 'forward' : 'back'
        if (direction == 'back') containerSelector = previousState.container
      }

      var container = $(containerSelector)
      if (container.length) {
        var contents = cacheMapping[state.id]

        if (previousState) {
          // Cache current container before replacement and inform the
          // cache which direction the history shifted.
          cachePop(direction, previousState.id, cloneContents(container))
        }

        var popstateEvent = $.Event('pjax:popstate', {
          state: state,
          direction: direction
        })
        container.trigger(popstateEvent)

        var options = {
          id: state.id,
          url: state.url,
          container: container,
          push: false,
          fragment: state.fragment,
          timeout: state.timeout,
          scrollTo: false
        }

        if (contents) {
          container.trigger('pjax:start', [null, options])

          pjax.state = state
          if (state.title) document.title = state.title
          var beforeReplaceEvent = $.Event('pjax:beforeReplace', {
            state: state,
            previousState: previousState
          })
          container.trigger(beforeReplaceEvent, [contents, options])
          container.html(contents)

          container.trigger('pjax:end', [null, options])
        } else {
          pjax(options)
        }

        // Force reflow/relayout before the browser tries to restore the
        // scroll position.
        container[0].offsetHeight
      } else {
        locationReplace(location.href)
      }
    }
    initialPop = false
  }

  // Fallback version of main pjax function for browsers that don't
  // support pushState.
  //
  // Returns nothing since it retriggers a hard form submission.
  function fallbackPjax(options) {
    var url = $.isFunction(options.url) ? options.url() : options.url,
      method = options.type ? options.type.toUpperCase() : 'GET'

    var form = $('<form>', {
      method: method === 'GET' ? 'GET' : 'POST',
      action: url,
      style: 'display:none'
    })

    if (method !== 'GET' && method !== 'POST') {
      form.append($('<input>', {
        type: 'hidden',
        name: '_method',
        value: method.toLowerCase()
      }))
    }

    var data = options.data
    if (typeof data === 'string') {
      $.each(data.split('&'), function(index, value) {
        var pair = value.split('=')
        form.append($('<input>', {
          type: 'hidden',
          name: pair[0],
          value: pair[1]
        }))
      })
    } else if ($.isArray(data)) {
      $.each(data, function(index, value) {
        form.append($('<input>', {
          type: 'hidden',
          name: value.name,
          value: value.value
        }))
      })
    } else if (typeof data === 'object') {
      var key
      for (key in data)
        form.append($('<input>', {
          type: 'hidden',
          name: key,
          value: data[key]
        }))
    }

    $(document.body).append(form)
    form.submit()
  }

  // Internal: Abort an XmlHttpRequest if it hasn't been completed,
  // also removing its event handlers.
  function abortXHR(xhr) {
    if (xhr && xhr.readyState < 4) {
      xhr.onreadystatechange = $.noop
      xhr.abort()
    }
  }

  // Internal: Generate unique id for state object.
  //
  // Use a timestamp instead of a counter since ids should still be
  // unique across page loads.
  //
  // Returns Number.
  function uniqueId() {
    return (new Date).getTime()
  }

  function cloneContents(container) {
    var cloned = container.clone()
      // Unmark script tags as already being eval'd so they can get executed again
      // when restored from cache. HAXX: Uses jQuery internal method.
    cloned.find('script').each(function() {
      if (!this.src) jQuery._data(this, 'globalEval', false)
    })
    return cloned.contents()
  }

  // Internal: Strips named query param from url
  //
  // url - String
  //
  // Returns String.
  function stripParam(url, name) {
    return url
      .replace(new RegExp('[?&]' + name + '=[^&#]*'), '')
      .replace(/[?&]($|#)/, '\1')
      .replace(/[?&]/, '?')
  }

  function stripInternalParams(url) {
    url = stripParam(url, '_pjax')
    url = stripParam(url, '_')
    return url
  }

  // Internal: Parse URL components and returns a Locationish object.
  //
  // url - String URL
  //
  // Returns HTMLAnchorElement that acts like Location.
  function parseURL(url) {
    var a = document.createElement('a')
    a.href = url
    return a
  }

  // Internal: Return the `href` component of given URL object with the hash
  // portion removed.
  //
  // location - Location or HTMLAnchorElement
  //
  // Returns String
  function stripHash(location) {
    return location.href.replace(/#.*/, '')
  }

  // Internal: Build options Object for arguments.
  //
  // For convenience the first parameter can be either the container or
  // the options object.
  //
  // Examples
  //
  //   optionsFor('#container')
  //   // => {container: '#container'}
  //
  //   optionsFor('#container', {push: true})
  //   // => {container: '#container', push: true}
  //
  //   optionsFor({container: '#container', push: true})
  //   // => {container: '#container', push: true}
  //
  // Returns options Object.
  function optionsFor(container, options) {
    // Both container and options
    if (container && options)
      options.container = container

    // First argument is options Object
    else if ($.isPlainObject(container))
      options = container

    // Only container
    else
      options = {
        container: container
      }

    // Find and validate container
    if (options.container)
      options.container = findContainerFor(options.container)

    return options
  }

  // Internal: Find container element for a variety of inputs.
  //
  // Because we can't persist elements using the history API, we must be
  // able to find a String selector that will consistently find the Element.
  //
  // container - A selector String, jQuery object, or DOM Element.
  //
  // Returns a jQuery object whose context is `document` and has a selector.
  function findContainerFor(container) {
    container = $(container)

    if (!container.length) {
      throw "no pjax container for " + container.selector
    } else if (container.selector !== '' && container.context === document) {
      return container
    } else if (container.attr('id')) {
      return $('#' + container.attr('id'))
    } else {
      throw "cant get selector for pjax container!"
    }
  }

  // Internal: Filter and find all elements matching the selector.
  //
  // Where $.fn.find only matches descendants, findAll will test all the
  // top level elements in the jQuery object as well.
  //
  // elems    - jQuery object of Elements
  // selector - String selector to match
  //
  // Returns a jQuery object.
  function findAll(elems, selector) {
    return elems.filter(selector).add(elems.find(selector));
  }

  function parseHTML(html) {
    return $.parseHTML(html, document, true)
  }

  // Internal: Extracts container and metadata from response.
  //
  // 1. Extracts X-PJAX-URL header if set
  // 2. Extracts inline <title> tags
  // 3. Builds response Element and extracts fragment if set
  //
  // data    - String response data
  // xhr     - XHR response
  // options - pjax options Object
  //
  // Returns an Object with url, title, and contents keys.
  function extractContainer(data, xhr, options) {
    var obj = {},
      fullDocument = /<html/i.test(data)

    // Prefer X-PJAX-URL header if it was set, otherwise fallback to
    // using the original requested url.
    var serverUrl = xhr.getResponseHeader('X-PJAX-URL')
    obj.url = serverUrl ? stripInternalParams(serverUrl) : options.requestUrl

    // Attempt to parse response html into elements
    if (fullDocument) {
      var $head = $(parseHTML(data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]))
      var $body = $(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))
    } else {
      var $head = $body = $(parseHTML(data))
    }

    // If response data is empty, return fast
    if ($body.length === 0)
      return obj

    // If there's a <title> tag in the header, use it as
    // the page's title.
    obj.title = findAll($head, 'title').last().text()

    if (options.fragment) {
      // If they specified a fragment, look for it in the response
      // and pull it out.
      if (options.fragment === 'body') {
        var $fragment = $body
      } else {
        var $fragment = findAll($body, options.fragment).first()
      }

      if ($fragment.length) {
        obj.contents = options.fragment === 'body' ? $fragment : $fragment.contents()

        // If there's no title, look for data-title and title attributes
        // on the fragment
        if (!obj.title)
          obj.title = $fragment.attr('title') || $fragment.data('title')
      }

    } else if (!fullDocument) {
      obj.contents = $body
    }

    // Clean up any <title> tags
    if (obj.contents) {
      // Remove any parent title elements
      obj.contents = obj.contents.not(function() {
        return $(this).is('title')
      })

      // Then scrub any titles from their descendants
      obj.contents.find('title').remove()

      // Gather all script[src] elements
      obj.scripts = findAll(obj.contents, 'script[src]').remove()
      obj.contents = obj.contents.not(obj.scripts)
    }

    // Trim any whitespace off the title
    if (obj.title) obj.title = $.trim(obj.title)

    return obj
  }

  // Load an execute scripts using standard script request.
  //
  // Avoids jQuery's traditional $.getScript which does a XHR request and
  // globalEval.
  //
  // scripts - jQuery object of script Elements
  //
  // Returns nothing.
  function executeScriptTags(scripts) {
    if (!scripts) return

    var existingScripts = $('script[src]')

    scripts.each(function() {
      var src = this.src
      var matchedScripts = existingScripts.filter(function() {
        return this.src === src
      })
      if (matchedScripts.length) return

      var script = document.createElement('script')
      var type = $(this).attr('type')
      if (type) script.type = type
      script.src = $(this).attr('src')
      document.head.appendChild(script)
    })
  }

  // Internal: History DOM caching class.
  var cacheMapping = {}
  var cacheForwardStack = []
  var cacheBackStack = []

  // Push previous state id and container contents into the history
  // cache. Should be called in conjunction with `pushState` to save the
  // previous container contents.
  //
  // id    - State ID Number
  // value - DOM Element to cache
  //
  // Returns nothing.
  function cachePush(id, value) {
    cacheMapping[id] = value
    cacheBackStack.push(id)

    // Remove all entries in forward history stack after pushing a new page.
    trimCacheStack(cacheForwardStack, 0)

    // Trim back history stack to max cache length.
    trimCacheStack(cacheBackStack, pjax.defaults.maxCacheLength)
  }

  // Shifts cache from directional history cache. Should be
  // called on `popstate` with the previous state id and container
  // contents.
  //
  // direction - "forward" or "back" String
  // id        - State ID Number
  // value     - DOM Element to cache
  //
  // Returns nothing.
  function cachePop(direction, id, value) {
    var pushStack, popStack
    cacheMapping[id] = value

    if (direction === 'forward') {
      pushStack = cacheBackStack
      popStack = cacheForwardStack
    } else {
      pushStack = cacheForwardStack
      popStack = cacheBackStack
    }

    pushStack.push(id)
    if (id = popStack.pop())
      delete cacheMapping[id]

    // Trim whichever stack we just pushed to to max cache length.
    trimCacheStack(pushStack, pjax.defaults.maxCacheLength)
  }

  // Trim a cache stack (either cacheBackStack or cacheForwardStack) to be no
  // longer than the specified length, deleting cached DOM elements as necessary.
  //
  // stack  - Array of state IDs
  // length - Maximum length to trim to
  //
  // Returns nothing.
  function trimCacheStack(stack, length) {
    while (stack.length > length)
      delete cacheMapping[stack.shift()]
  }

  // Public: Find version identifier for the initial page load.
  //
  // Returns String version or undefined.
  function findVersion() {
    return $('meta').filter(function() {
      var name = $(this).attr('http-equiv')
      return name && name.toUpperCase() === 'X-PJAX-VERSION'
    }).attr('content')
  }

  // Install pjax functions on $.pjax to enable pushState behavior.
  //
  // Does nothing if already enabled.
  //
  // Examples
  //
  //     $.pjax.enable()
  //
  // Returns nothing.
  function enable() {
    $.fn.pjax = fnPjax
    $.pjax = pjax
    $.pjax.enable = $.noop
    $.pjax.disable = disable
    $.pjax.click = handleClick
    $.pjax.submit = handleSubmit
    $.pjax.reload = pjaxReload
    $.pjax.defaults = {
      timeout: 650,
      push: true,
      replace: false,
      type: 'GET',
      dataType: 'html',
      scrollTo: 0,
      maxCacheLength: 20,
      version: findVersion
    }
    $(window).on('popstate.pjax', onPjaxPopstate)
  }

  // Disable pushState behavior.
  //
  // This is the case when a browser doesn't support pushState. It is
  // sometimes useful to disable pushState for debugging on a modern
  // browser.
  //
  // Examples
  //
  //     $.pjax.disable()
  //
  // Returns nothing.
  function disable() {
    $.fn.pjax = function() {
      return this
    }
    $.pjax = fallbackPjax
    $.pjax.enable = enable
    $.pjax.disable = $.noop
    $.pjax.click = $.noop
    $.pjax.submit = $.noop
    $.pjax.reload = function() {
      window.location.reload()
    }

    $(window).off('popstate.pjax', onPjaxPopstate)
  }


  // Add the state property to jQuery's event object so we can use it in
  // $(window).bind('popstate')
  if ($.inArray('state', $.event.props) < 0)
    $.event.props.push('state')

  // Is pjax supported by this browser?
  $.support.pjax =
    window.history && window.history.pushState && window.history.replaceState &&
    // pushState isn't reliable on iOS until 5.
    !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)

  $.support.pjax ? enable() : disable()
})(jQuery);
});
define("nprogress-183/nprogress", [], function(require, exports, module){
require("nprogress-183/nprogress.css.js");
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.1.6';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   * 
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;
    
    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() == "resolved") {
        return this;
      }
      
      if (current == 0) {
        NProgress.start();
      }
      
      initial++;
      current++;
      
      $promise.always(function() {
        current--;
        if (current == 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });
      
      return this;
    };
    
  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent')
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});


});
define("nprogress-183/nprogress.css.js", [], function(require, exports, module){
require("import-style/index")('#nprogress{pointer-events:none;}#nprogress .bar{background:#29d;position:fixed;z-index:1031;top:0;left:0;width:100%;height:2px;}#nprogress .peg{display:block;position:absolute;right:0px;width:100px;height:100%;box-shadow:0 0 10px #29d, 0 0 5px #29d;opacity:1.0;-webkit-transform:rotate(3deg) translate(0px, -4px);-ms-transform:rotate(3deg) translate(0px, -4px);transform:rotate(3deg) translate(0px, -4px);}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px;}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:solid 2px transparent;border-top-color:#29d;border-left-color:#29d;border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite;}.nprogress-custom-parent{overflow:hidden;position:relative;}.nprogress-custom-parent #nprogress .spinner,.nprogress-custom-parent #nprogress .bar{position:absolute;}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg);}100%{-webkit-transform:rotate(360deg);}}@keyframes nprogress-spinner{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}');

});
define("import-style/index", [], function(require, exports, module){
/**
 * The Sea.js plugin for embedding style text in JavaScript code
 */


var RE_NON_WORD = /\W/g;
var doc = document;
var head = document.getElementsByTagName('head')[0] ||
    document.documentElement;
var styleNode;

module.exports = importStyle;

function importStyle(cssText, id) {
  if (id) {
    // Convert id to valid string
    id = id.replace(RE_NON_WORD, '-');

    // Don't add multiple times
    if (doc.getElementById(id)) return;
  }

  var element;

  // Don't share styleNode when id is spectied
  if (!styleNode || id) {
    element = doc.createElement('style');
    id && (element.id = id);

    // Adds to DOM first to avoid the css hack invalid
    head.appendChild(element);
  } else {
    element = styleNode;
  }

  // IE
  if (element.styleSheet) {

    // http://support.microsoft.com/kb/262161
    if (doc.getElementsByTagName('style').length > 31) {
      throw new Error('Exceed the maximal count of style tags in IE');
    }

    element.styleSheet.cssText += cssText;
  }
  // W3C
  else {
    element.appendChild(doc.createTextNode(cssText));
  }

  if (!id) {
    styleNode = element;
  }
}

});
