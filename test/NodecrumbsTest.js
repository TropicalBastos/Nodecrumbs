var path = require('path');
var Nodecrumbs = require(path.join(__dirname, '../dist/index.js')).Nodecrumbs;
var should = require('should');

//Mock objects for test cases
var req = {url: "/test/testing"};
var nodecrumbs = new Nodecrumbs(req, 'standard', 'home', {'test': true});
var arr = nodecrumbs.parse();

describe('Test Presence of Crumbs', function() {
    it('Crumbs should always exist with appropriate uri', function() {
        should.exist(arr);
    });
});

describe('Crumb Getters', function() {
    it('Crumb getters should always return strings', function() {
        for(var crumb in arr){
            crumb.should.be.instanceof(String);
        }
    });
});

describe('Nodecrumbs', function() {
    describe('#parse()', function(){
        it('should always return an array', function() {
            arr.should.be.instanceof(Array);
        })
    });
});