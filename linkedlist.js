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
        if (currNode === null) return false

        while(currNode.nextNode !== null){
            if(currNode.value == data) return true
            currNode = currNode.nextNode;
        }

        return false
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
            currFormat += `( ${currNode.value} ) -> `;
            if(currNode.nextNode === null) return currFormat + " null";
            currNode = currNode.nextNode;
        }
    }
}

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
