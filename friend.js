'use strict'

var PersonItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.title = obj.title;
        this.author = obj.author
    }
};

PersonItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var ThePerson = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new PersonItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

ThePerson.prototype ={
    init:function(){
        
    },

    save:function(title,content){
        if(!title){
            throw new Error("empty title or content")
        }

        if(title.length > 20 ){
            throw new Error("title or content  exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var personItem = this.data.get(title);
        if(personItem){
            throw new Error("letter has been occupied");
        }

        personItem = new PersonItem();
        personItem.author = from;
        personItem.title = title;

        this.data.put(title,personItem);
    },

    get:function(title){
        if(!title){
            throw new Error("empty title")
        }
        return this.data.get(title);
    },

    forEach: function(limit, offset){
        limit = parseInt(limit);
        offset = parseInt(offset);
        if(offset>this.size){
            throw new Error("offset is not valid");
        }
        var number = offset+limit;
        if(number > this.size){
            number = this.size;
        }
        var result  = "";
        for(var i=offset;i<number;i++){
            var key = this.arrayMap.get(i);
            var object = this.dataMap.get(key);
            result += "index:"+i+" key:"+ key + " value:" +object+"_";
        }
        return result;
    }
}

module.exports = ThePerson;