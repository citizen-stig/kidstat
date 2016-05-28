/**
 * Created by nikolaygolub on 23/05/16.
 */
require('./dom-mock.js');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var rewire = require('rewire');
var CompnentMock = require('./component-mock');


describe('Empty test', function () {
    it('should run successfully', function () {
        assert.equal('A', 'A');
    });
});


describe('Public index', function () {

    var PublicIndex;
    var indexDiv;

    before(function () {
        PublicIndex = rewire('../src/components/public-index.jsx');
        PublicIndex.__set__('FacebookLogin', CompnentMock);
        indexDiv = TestUtils.renderIntoDocument(<PublicIndex />);
    });

    it('should contain header: Welcome to the Kidstat', function () {
        var header = TestUtils.findRenderedDOMComponentWithTag(indexDiv, 'h1');
        assert.equal(header.textContent, 'Welcome to the Kidstat!');
    });
    it('should have a paragraph describes the site', function () {
        var paragraph = TestUtils.findRenderedDOMComponentWithTag(indexDiv, 'p');
        assert.equal(paragraph.textContent,
            'This a web site, where you can track how your baby grows!')
    });
    it('should have a picture of a baby', function () {
        var img = TestUtils.findRenderedDOMComponentWithTag(indexDiv, 'img');
        assert.equal(img.src,
            'https://upload.wikimedia.org/wikipedia/commons/4/46/Baby2.gif');
    })
});


describe('Loader', function () {
    jsdom({skipWindowCheck: true});
    var Loading = require('../src/components/loading.jsx');

    it('should be hidden by default', function () {
        var loaderRendered = TestUtils.renderIntoDocument(<Loading/>);
        var loaderDiv = TestUtils.findRenderedDOMComponentWithTag(loaderRendered, 'div');
        expect(loaderDiv.className).to.equal('hidden');
        expect(loaderDiv.id).to.equal('loading');
    });
    it('should have fa refresh loader inside', function(){
        var loaderRendered = TestUtils.renderIntoDocument(<Loading/>);
        var loaderDiv = TestUtils.findRenderedDOMComponentWithTag(loaderRendered, 'div');
        expect(loaderDiv.firstChild.tagName).to.equal('I');
        // TODO: check classes
        // expect(loaderDiv.firstChild.classList).to.contain.all('fa', 'fa-refresh', 'fa-spin');
    });
    
    it('should be shown when event is "loading"', function () {
        var loaderRendered = TestUtils.renderIntoDocument(<Loading/>);
        sinon.stub(loaderRendered, 'show').returns(false);
        sinon.stub(loaderRendered, 'hide').returns(false);
        loaderRendered.handleEvent('loading');

        sinon.assert.calledOnce(loaderRendered.show);
        sinon.assert.notCalled(loaderRendered.hide);
    });

    it('should be hidden for all non "loading" events', function(){
        var loaderRendered = TestUtils.renderIntoDocument(<Loading/>);
        sinon.stub(loaderRendered, 'show').returns(false);
        sinon.stub(loaderRendered, 'hide').returns(false);
        loaderRendered.handleEvent('authenticated');

        sinon.assert.notCalled(loaderRendered.show);
        sinon.assert.calledOnce(loaderRendered.hide);
    });

    it('it should change "hidden" class when show and hide called', function(){
        var loaderRendered = TestUtils.renderIntoDocument(<Loading/>);
        var loaderDiv = TestUtils.findRenderedDOMComponentWithTag(loaderRendered, 'div');
        expect(loaderDiv.className).to.equal('hidden');
        loaderRendered.show();
        expect(loaderDiv.className).to.equal('');
        loaderRendered.hide();
        expect(loaderDiv.className).to.equal('hidden');
    });

});

// http://www.bebetterdeveloper.com/coding/getting-started-react-mocha.html
// http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/
// http://willcodefor.beer/react-testing-with-mocha-chai-sinon-and-gulp/
// TODO:
//  + How to mock
//  - How to run coverage
//  - How to test react state