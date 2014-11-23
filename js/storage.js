(function (global) {
    /**
    * 本地存储类
    * @class Storage
    * @constructor
    * @extends Storage.prototype
    */
    var Storage = function(){
        this.init();    
    };
    
    /**
    * 本地存储类原型对象
    * @class Storage.prototype
    * @static
    */    
    Storage.prototype = {
        /**
         * 初始化
         * @method init 
         */
        init:function(){
            function getLocalStorage(){
                var result = false;
                if(typeof window.localStorage === 'object'){
                    result = localStorage;
                }else if(typeof window.globalStorage === 'object'){
                    result = window.globalStorage;
                }
                
                return result;
            }
            
            this.storage = getLocalStorage();
        },
        
        /**
         * 获取本地存储对象
         * @method getStorage
         * @return {Object} 本地存储对象
         */
        getStorage:function(){
            return this.storage;
        },
        
        /**
         * 存储对象
         * @method save
         * @param {String} key 存的键
         * @param {String} value 要存的值
         * @return {Bollean} 存储是否成功
         */
        save:function(key, value){
            var
                storage = this.storage,
                list = false;
            if(storage !== false){
                list = storage.setItem(key, value);
            }
            return list;
        },
        
        /**
         * 载入值
         * @method getStorage
         * @param {String} key 要去得的键
         * @return {String} 获取成功返回键值，失败返回''
         */
        load:function(key){
            var
                storage = this.storage,
                result = '';
            if(storage !== false){                
                result = storage.getItem(key);
            }
            
            return result;
        }
    };

    global.Storage = Storage;
}(window));