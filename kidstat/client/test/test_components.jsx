import {describe, it} from 'mocha';
import {assert, expect} from 'chai'
import domMock from './dom-mock.js';

domMock('<html><body></body></html>');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Header from '../src/components/common/header.jsx'
import CategoryAlert from '../src/components/observations/category-alert.jsx';

describe('Header Component Test', function () {
    it('should contain text "KidStat"', function () {
        var header = TestUtils.renderIntoDocument(<Header />);
        var brandA = TestUtils.findRenderedDOMComponentWithTag(header, 'a');
        assert.equal(brandA.textContent, 'KidStat');
    });
    it('should have class "hidden-xs"', function () {
        var header = TestUtils.renderIntoDocument(<Header />);
        var nav = TestUtils.findRenderedDOMComponentWithTag(header, 'nav');
        assert.ok(nav.classList.contains('hidden-xs'),
            'hidden-xs is not found in nav classList');
    })
});


describe('Category Alert Test', function () {
    it('should have category inside <strong/> tag', function () {
        console.log('========');
        var categoryName = 'Average';
        var b = <CategoryAlert category={categoryName}/>;
        console.log(b);
        console.log('========');
        var categoryAlert = TestUtils.renderIntoDocument(<CategoryAlert category={categoryName}/>);
        console.log(categoryAlert);

    })
});