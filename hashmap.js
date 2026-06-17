class Node{
    #value;
    #nextNode;

    constructor(){
        this.#value = null;
        this.#nextNode = null;
    }

    set value(data){
        this.#value = data;
    }

    set nextNode(node){
        this.#nextNode = node;
    }

    get value(){
        return this.#value;
    }

    get nextNode(){
        return this.#nextNode;
    }
}

class LinkedList{
    #head;

    constructor(){
        this.#head = null;
    }

    append(data){
        const node = new Node();
        node.value = data;

        if(this.#head === null){
            this.#head = node;
        }else{
            let currNode = this.#head;
            while(true){
                if(currNode.nextNode === null){
                    currNode.nextNode = node;
                    break
                }
                currNode = currNode.nextNode;
            }
        }
    }

    prepend(data){
        const node = new Node();
        node.value = data;
        node.nextNode = this.#head;

        this.#head = node;
    }

    size(){
        let count = 0;
        let currNode = this.#head;
        if(currNode === null) return count;

        while(true){
            if(currNode.value !== null) count++;
            if(currNode.nextNode === null) break
            currNode = currNode.nextNode;
        }

        return count;
    }

    head(){
        return (this.#head === null) ? undefined : this.#head.value;
    }

    tail(){
        let currNode = this.#head;
        if(currNode === null) return undefined;
        while(true){
            if(currNode.nextNode === null) return currNode.value;
            currNode = currNode.nextNode;
        }
    }

    at(idx){
        if(this.#head === null) return undefined;

        let currNode = this.#head;

        for(let i = 0; i < idx; i++){
            try{
                currNode = currNode.nextNode;
            }catch(err){
                return undefined
            }
        }

        return currNode.value;
    }

    pop(){
        let currNode = this.#head;
        if(currNode === null) return undefined;

        this.#head = currNode.nextNode;
        return currNode.value;
    }

    contains(data){
        let currNode = this.#head;

        while(true){
            const currObj = currNode.value;
            const currKey = Object.keys(currObj)[0];
           
            let dataObj = data;
            let dataKey = Object.keys(dataObj)[0];
           
            if(dataKey === currKey){
                currNode.value = data;
                return true
            }

            if(currNode.nextNode === null) return false
            currNode = currNode.nextNode;
        }
    }

    findIndex(data){
        let currNode = this.#head;
        if (currNode === null) return -1;
        let currIdx = 0;

        while(true){
            if(currNode.value === data) return currIdx;
            if(currNode.nextNode === null) return -1
            currNode = currNode.nextNode;
            currIdx++;
        }
    }

    toString(){
        let currFormat = "";
        let currNode = this.#head;
        if(currNode === null) return currFormat;

        while(true){
            currFormat += `( ${JSON.stringify(currNode.value,null,2)} ) -> `;
            if(currNode.nextNode === null) return currFormat + " null\n";
            currNode = currNode.nextNode;
        }
    }

    insert(data){
        if(!this.contains(data)){
            this.append(data);
        };
    }

    checkKey(key){
        let currNode = this.#head;

        while(true){
            const currObj = currNode.value;
            const currKey = Object.keys(currObj)[0];
            if(currKey === key) return true
            if(currNode.nextNode === null) return false
            currNode = currNode.nextNode;
        }
    }

    getValue(key){
        let currNode = this.#head;

        while(true){
            const currObj = currNode.value;
            const currKey = Object.keys(currObj)[0];
            const currValue = currObj[currKey];
            if(currKey === key) return currValue;
            currNode = currNode.nextNode;
        }
    }

    removeNode(key){
        let currNode = this.#head;
        let previousNode = undefined;

        while(true){
            const currObj = currNode.value
            const currKey = Object.keys(currObj)[0];

            if(currKey === key){
                previousNode.nextNode = currNode.nextNode;
                break
            }
            previousNode = currNode;
            currNode = currNode.nextNode;
        }
    }

    getKeys(){
        let currNode = this.#head;
        let keyArr = [];

        while(true){
            const currObj = currNode.value
            const currKey = Object.keys(currObj)[0];

            keyArr.push(currKey);
            if(currNode.nextNode === null) return keyArr;
            currNode = currNode.nextNode;
        }
    }

    getValues(){
        let currNode = this.#head;
        let valuesArr = [];

        while(true){
            const currObj = currNode.value
            const currKey = Object.keys(currObj)[0];
            const currValue = currObj[currKey];

            valuesArr.push(currValue);
            if(currNode.nextNode === null) return valuesArr;
            currNode = currNode.nextNode;
        }
    }

    getEntries(){
        let currNode = this.#head;
        let entryArr = [];

        while(true){
            const currObj = currNode.value
            const currKey = Object.keys(currObj)[0];
            const currValue = currObj[currKey];

            entryArr.push([currKey,currValue]);
            if(currNode.nextNode === null) return entryArr;
            currNode = currNode.nextNode;
        }
    }
}

class HashMap{
    #loadFactor = 0.75;
    #capacity = 16;
    #bucket = new Array(this.#capacity);

    isOutOfBounds(index){
        if (index < 0 || index >= this.#bucket.length) {
            return true;
        }
    }

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    }

    set(key, value){
        const hashCode = this.hash(key);
        if(this.isOutOfBounds(hashCode)) throw new Error("Trying to access index out of bounds");

        if(this.#bucket[hashCode] === undefined){
            const linkedList = new LinkedList();
            linkedList.append({[key]:value});
            
            this.#bucket[hashCode] = linkedList;
        }else{
            const linkedList = this.#bucket[hashCode];
            linkedList.insert({[key]:value});
        }
    }

    get(key){
        const hashCode = this.hash(key);
        if(this.isOutOfBounds(hashCode)) throw new Error("Trying to access index out of bounds");
    
        if(this.#bucket[hashCode] === undefined || !this.#bucket[hashCode].checkKey(key)){
            return null
        }else{
            const linkedList = this.#bucket[hashCode];
            return linkedList.getValue(key);
        }
    }

    has(key){
        const hashCode = this.hash(key);
        if(this.isOutOfBounds(hashCode)) throw new Error("Trying to access index out of bounds");

        return (this.#bucket[hashCode] === undefined || !this.#bucket[hashCode].checkKey(key)) ? false : true 
    }

    remove(key){
        const hashCode = this.hash(key);
        if(this.isOutOfBounds(hashCode)) throw new Error("Trying to access index out of bounds");

        if(this.has(key)){
            const linkedList = this.#bucket[hashCode];
            linkedList.removeNode(key);
            return true;
        }
        return false
    }

    length(){
        let total = 0;
        this.#bucket.forEach(bucket => {
            if(bucket !== undefined){
                total += bucket.size();
            }
        })

        return total;
    }

    clear(){
        this.#bucket = new Array(this.#capacity);
    }

    keys(){
        let keyArr = [];
        this.#bucket.forEach(bucket => {
            if(bucket !== undefined){
                keyArr = [...keyArr, ...bucket.getKeys()];
            }
        })

        return keyArr;
    }

    values(){
        let valuesArr = [];
        this.#bucket.forEach(bucket => {
            if(bucket !== undefined){
                valuesArr = [...valuesArr, ...bucket.getValues()];
            }
        })

        return valuesArr;
    }

    entries(){
        let entry = [];
        this.#bucket.forEach(bucket => {
            if(bucket !== undefined){
                entry = [...entry, ...bucket.getEntries()];
            }
        })

        return entry;
    }
}
