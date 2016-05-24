/**
 * Created by EK on 5/18/2016.
 */
var LIFO = function (size){
    "use strict";
    if(size <= 0) throw "Short array size";
    this.maxSize = size;
    this.data = new Array();

    this.add = function(element){
        if (this.data.length == this.maxSize)
            this.data.shift();
        this.data.push(element);
    }

    this.getElements = function(){
        return this.data;
    }
}

module.exports = LIFO;