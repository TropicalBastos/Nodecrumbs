import Crumb from './Crumb';

export default class MiniCrumbs{

    constructor(req, fm = "standard", home = "home"){
        this.breadcrumbs = null;
        this.wordsPattern = /([+\-_$%{}()])|(%20)/g;
        this.trailingSlash = /\/$/;
        let uri = req.url;

        if(home){
            this.home = home;
        }

        uri = uri.replace(this.trailingSlash, "");
        
        //cache the original slugs
        this.origin = uri.split("/");
        this.slugs = uri.split("/");
        this.uri = uri;

        if(fm !== "upper"
            && fm !== "lower"
            && fm !== "standard"){
                throw "Format Exception: no format specified for Minicrumbs";
            }else{
                this.format = fm;
            }

    }

    formatCrumbs(words){
        let result = [];

        switch(this.format){
            case "upper":
                for(var i = 0; i < words.length; i++){
                    result.push(words[i].toUpperCase());
                }
                break;

            case "lower":
                for(var i = 0; i < words.length; i++){
                    result.push(words[i].toLowerCase());
                }
                break;

            default:
                for(var i = 0; i < words.length; i++){
                    result.push(this.capitalizeFirstLetter(words[i]));
                }
                break;
            }

        return result;

    }

    formatSpecials(){
        for(var i = 0; i < this.slugs.length; i++){
            var words = this.slugs[i].split(this.wordsPattern);
            words = words.filter((word, index) => {
                if(word === undefined) return false;
                return !word.match(this.wordsPattern);
            });
            words = this.formatCrumbs(words);
            this.slugs[i] = words.join(" ");
        }
    }

    buildLinks(){
        var currentUri = "";
        var result = [];

        this.origin.forEach((uri, index) => {
            if(uri === "") return;
            if(uri !== "/"){
                currentUri += "/" + uri;
            }else{
                currentUri += (uri + "/");
            }
            result.push(currentUri);
        });

        return result;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cleanSlugs(){
        let cleanSlugs = [];
        for(var slug in this.slugs){
            if(this.slugs[slug] === "") continue;
            cleanSlugs.push(this.slugs[slug]);
        };

        this.slugs = cleanSlugs;
    }

    parse(){
        let breadcrumbs = [];
        this.cleanSlugs();
        this.formatSpecials();
        let links = this.buildLinks();

        if(this.home){
            let homeStr = this.formatCrumbs([this.home]);
            breadcrumbs.push(new Crumb(homeStr[0], "/"));
        }

        for(var i = 0; i < this.slugs.length; i++){
            breadcrumbs.push(new Crumb(this.slugs[i], links[i]));
        }

        this.breadcrumbs = breadcrumbs;
        return breadcrumbs;
    }

    render(){
        if(this.breadcrumbs === null){
            throw "Breadcrumb Error: No Breadcrumb instantiated with the 'parse()' method";
        }

        let html = "<div id='bread'><ul>";

        for(var i = 0; i < this.breadcrumbs.length -1; i++){
            html += "<li><a href='" + this.breadcrumbs[i].getUri() + "'>"
            + this.breadcrumbs[i].getName() + "</a></li>";
        }

        html += "<li>" + this.breadcrumbs[this.breadcrumbs.length - 1].getName() + "</li>"
        + "</ul>"
        + "</div>";

        return html;
    }

}
