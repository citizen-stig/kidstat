/**
 * Created by nikolaygolub on 23/05/16.
 */
require('./dom-mock.js');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');


describe('Empty test', function () {
    it('should run successfully', function () {
        assert.equal('A', 'A');
    });
});

describe('Public index', function () {
    jsdom({skipWindowCheck: true});
    var PublicIndex = require('../src/components/public-index.jsx');
    var indexDiv = TestUtils.renderIntoDocument(
            <PublicIndex />
    );

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
    // TODO: mock stores
    var Loading = require('../src/components/loading.jsx');
    it('should be hidden by default');
    it('should be shown when event is "loading"');
    it('should be hidden for all non "loading" events');
});

// http://www.bebetterdeveloper.com/coding/getting-started-react-mocha.html
// http://www.hammerlab.org/2015/02/14/testing-react-web-apps-with-mocha/
// TODO:
//  - Gulp task
//  - How to mock
//  - How to run coverage