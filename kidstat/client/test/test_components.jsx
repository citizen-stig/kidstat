import {describe, it} from 'mocha';
import {assert, expect} from 'chai'
import domMock from './dom-mock.js';

domMock('<html><body></body></html>');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Header from '../src/components/common/header.jsx'
import CategoryAlert from '../src/components/observations/category-alert.jsx';

describe('Header Component Test', function () {
    // Workaround for this: https://github.com/facebook/react/issues/4839
    var headerComponent = new Header();
    var header = TestUtils.renderIntoDocument(headerComponent);
    it('should contain text "KidStat"', function () {
        var brandA = TestUtils.findRenderedDOMComponentWithTag(header, 'a');
        assert.equal(brandA.textContent, 'KidStat');
    });
    it('should have class "hidden-xs"', function () {
        var nav = TestUtils.findRenderedDOMComponentWithTag(header, 'nav');
        assert.ok(nav.classList.contains('hidden-xs'),
            'hidden-xs is not found in nav classList');
    })
});


describe('Category Alert Test', function () {
    var categoryName = 'Average';
    // Workaround for this: https://github.com/facebook/react/issues/4839
    var categoryComponent = new CategoryAlert({category: categoryName});
    var categoryAlert = TestUtils.renderIntoDocument(categoryComponent);

    it('should have category inside <strong/> tag', function () {
        var strong = TestUtils.findRenderedDOMComponentWithTag(
            categoryAlert, 'strong');
        assert.equal(strong.textContent, categoryName);
    });
    it('should have "success" class', function(){
        var alertDiv = TestUtils.findRenderedDOMComponentWithClass(
            categoryAlert, 'alert');
        assert.ok(alertDiv.classList.contains('alert-success'),
            'Class "success" is not found in alert class list')
    })
});