(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    var args = arguments;
    var valArray = [];

    if (args.length === 1) {
      return val;
    } else if (args.length > 1 ) {
      for (var i = 0; i < args.length; i++) {
        valArray.push(args[i]);
      }
      return valArray;
    }

    
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection) === true) { //it's an array
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else { // it's an object
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];

    _.each(collection, function(item) {
      if (test(item) === true) {
        result.push(item);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    
    var result = [];

    // all values that pass the test
    var passedValues = _.filter(collection, test);

    // but we want to look for all the values that don't pass the test
    // those are the values that won't be in the passedValues array
    for (var i = 0; i < collection.length; i++) {
      if (_.indexOf(passedValues, collection[i]) === -1) {
        result.push(collection[i]);
      }
    }

    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
      if (_.indexOf(result, array[i]) === -1) { // is the element already in the result array?
        result.push(array[i]);  // OK, it's not, so put it in result array
      }
    }

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];

    // each iterator function: iterator(collection[i], i, collection);

    _.each(collection, function(item, index, collection){
      results.push(iterator(item, index, collection));
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var accumulator = accumulator;

    if (accumulator === undefined) {
      // use first element of array as initial value of accumulator
      // and invoke iterator on second element of array
      accumulator = collection[0];

      for (var i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator; 

    } else {

      for (var i = 0; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator;
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (Array.isArray(collection) === true) { // the collection is an array
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false); // in reduce(), accumulator will start as false as declared here 
    } else { // the collection is an object
      var wasFound = false;
      for (var key in collection) {
        if (collection[key] === target) {
          wasFound = true;
        }
      }
      return wasFound; 
    }
    
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    
    // if it's empty, return true
    if (collection.length === 0) {return true;}

    // as soon as this flag becomes false, return
    // else remains true and elements of collection pass the truth test
    var flag = true;

    if (iterator === undefined) {
      for (var i = 0; i < collection.length; i++) {
        if( (_.identity(collection[i]) === false)
            || (_.identity(collection[i]) === null) 
            || (_.identity(collection[i]) === undefined) 
            || (_.identity(collection[i]) === 0) ) {
          flag = false;
          return flag;
        }
      } 
    } else {
      for (var i = 0; i < collection.length; i++) {
        if( (iterator(collection[i]) === false)
            || (iterator(collection[i]) === null) 
            || (iterator(collection[i]) === undefined) 
            || (iterator(collection[i]) === 0) ) {
          flag = false;
          return flag;
        }
      } 
    }
    return flag;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var flag = false;

    if (collection.length === 0) {return flag;}

    if (iterator !== undefined) {
      if ( _.every(collection, iterator) === true ) {
        return flag = true;
      }

      for (var i = 0; i < collection.length; i++) {
        if ( (iterator(collection[i]) === true) || ((typeof collection[i] == "string") && (collection[i] !== '')) ) {
          return flag = true;
        }
      }
    } // end of iterator !== undefined check

    for (var i = 0; i < collection.length; i++) {
        if ( (_.identity(collection[i]) === true) || ((typeof collection[i] == "string") && (collection[i] !== '')) ) {
          return flag = true;
        }
      } 

    return flag;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = arguments;
    for (var i = 1; i < args.length; i++) {
      for (var key in args[i]) {
        obj["" + key + ""] = args[i][key];
      }
    }
    return obj;    
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = arguments;
    for (var i = 1; i < args.length; i++) {
      for (var key in args[i]) {
        if (obj.hasOwnProperty("" + key + "") === false) {
          obj["" + key + ""] = args[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var history = {}; // create a history object we'll be storing our argument keys and values in
    
    return function(){

      var key = _.identity.apply(this, arguments); // returns the first argument of the func as the key
      
      if (Array.isArray(key) === true) {
        key.splice(0, 0, "a");
        key = key.join('_');
      }

      if (history.hasOwnProperty(key)) { // if the history object already has a record of the func's key/value pair
        return history[key]; // return the value stored, so func doesn't have to be called again
      } else { // the history object does not have this func's key/value pair 
        history[key] = func.apply(this, arguments); // add the key to the history object with the func's result
        return history[key]; // now return the value newly stored in the history object
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    setTimeout(function(){
      func.apply(this, args);
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var length = array.length;
    var copy = [];

    function createRandomNumber(num, i) {
      var random = Math.floor( Math.random() * (num) );

      if (random === i) {
        return createRandomNumber(num, i);
      }
      return random;
    }

    for (var i = 0; i < length; i++) {
      var randomNumber = createRandomNumber(length, i);

      if(copy[randomNumber] === undefined) {
        copy[randomNumber] = array[i];
      } else {
        copy.splice(randomNumber, 0, array[i]);
      }    
    }

    if (copy.length > length) { // there are undefined values in the array
      for (var i = 0; i < copy.length; i++) {
        if (copy[i] === undefined) {
          copy.splice(i, 1);
        }
      }
    }

    return copy;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var results = [];

    if (typeof functionOrKey === "function"){
      for (var i = 0; i < collection.length; i++) {
        var x = functionOrKey.apply(collection[i], args);
        results.push(x);
      }      
    } else if (typeof functionOrKey === "string") {
      for (var i = 0; i < collection.length; i++) {
        var y = collection[i][functionOrKey].apply(collection[i], args);
        results.push(y);
      }
    }
    return results;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {    
    if (typeof iterator === "function") {
      return collection.sort(function(a, b){
        return iterator(a) - iterator(b);
      });
    } else if (typeof iterator === "string") {
      return collection.sort(function(a, b){
        return a[iterator] - b[iterator];
      });
    } else {
      return collection.sort();
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // find out how many arrays need to be zipped
    var args = arguments;
    var numArgs = arguments.length;

    // declare array to put each argument array's length value in
    var argsLengthValues = [];

    // push argument array's length value to argsLengthValues array
    for (var i = 0; i < numArgs; i++) {
      argsLengthValues.push(args[i].length);
    }

    // sort array by length
    var argsLengthValues = argsLengthValues.sort();
    
    // store the longest length of an argument array in a variable
    var longestArgArray = argsLengthValues[argsLengthValues.length - 1];

    // declare the results array that will be returned by zip()
    // with the length of the longestArgArray
    var results = [];
    
    // add subarrays to the results array
    for (var z = 0; z < longestArgArray; z++) {
      var subarray = [];
      results.push(subarray);
    }
    

    for (var z = 0; z < longestArgArray; z++) {
      for (var g = 0; g < numArgs; g++) {
        results[z].push(args[g][z]);
      }
    }

    return results;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    
    _.each(nestedArray, function(x){
      if (Array.isArray(x) === true) {
        _.flatten(x, result);
      } else {
        result.push(x);
      }
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var results = [];
    // how many arrays are passed in?
    var args = arguments;
    var numArgs = args.length;

    var argsArray = [];

    for (var i = 0; i < numArgs; i++) {
      argsArray.push(args[i]);
    }

    var argsArraySortedByLength = _.sortBy(argsArray, 'length');
    var longestArgArray = argsArraySortedByLength[argsArraySortedByLength.length - 1];

    results = _.filter(longestArgArray, function(x) {
      for (var j = 0; j < argsArraySortedByLength.length - 1; j++) {

        if (_.indexOf(argsArraySortedByLength[j], x) === -1) {
          return false;
        } else {
          return true;
        }
      }
    });

    return results;
  }; 

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var results = [];

    var args = arguments;

    _.each(args[0], function(target){
      
      var flag = false;

      for (var i = 1; i < args.length; i++) {

        if ( (_.indexOf(args[i], target) === -1) && (flag === false) ) {
          
          flag = false;
        } else {
          
          flag = true;
        }
      }

      if (flag === false) {
        results.push(target);
      }

    });

    return results;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    
    func();
    var called = new Date().getTime();
    
    return function(){
        var now = new Date().getTime();
        if ( (now - called) < wait ) {
            return;
        } else {
            func();
            called = new Date().getTime();
        }        
    };
  };
}());
