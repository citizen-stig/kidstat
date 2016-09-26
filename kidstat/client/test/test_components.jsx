import {describe, it} from 'mocha';
import {assert, expect} from 'chai'
import domMock from './dom-mock.js';

domMock('<html><body></body></html>');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Header from '../src/components/common/header.jsx'


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


