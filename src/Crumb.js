
export default class Crumb{

    constructor(name, uri){
        this.name = name;
        this.uri = uri;
    }

    getUri(){
        return this.uri;
    }

    getName(){
        return this.name;
    }

}