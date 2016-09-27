import {before, describe, it} from 'mocha';
import {assert, expect} from 'chai'
import proxyquire from 'proxyquire';
import domMock from './dom-mock.js';

domMock('<html><body></body></html>');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Header from '../src/components/common/header.jsx'
import CategoryAlert from '../src/components/observations/category-alert.jsx';

const MockComponent = () => {return <div></div>};

describe('Header Component Test', function () {
    var header;

    before(function () {
        // Workaround for this: https://github.com/facebook/react/issues/4839
        let headerComponent = new Header();
        header = TestUtils.renderIntoDocument(headerComponent);
    });

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
    var categoryAlert;

    before(function () {
        // Workaround for this: https://github.com/facebook/react/issues/4839
        let categoryComponent = new CategoryAlert({category: categoryName});
        categoryAlert = TestUtils.renderIntoDocument(categoryComponent);
    });

    it('should have category inside <strong/> tag', function () {
        var strong = TestUtils.findRenderedDOMComponentWithTag(
            categoryAlert, 'strong');
        assert.equal(strong.textContent, categoryName);
    });
    it('should have "success" class', function () {
        var alertDiv = TestUtils.findRenderedDOMComponentWithClass(
            categoryAlert, 'alert');
        assert.ok(alertDiv.classList.contains('alert-success'),
            'Class "success" is not found in alert class list')
    });
    // TODO: how to test "focus" on mount?
});


describe('Sample Observation Widget Test', function () {

    var sampleObservationWidget;

    before(function(){
        const SampleObservationWidget = proxyquire('../src/components/observations/sample-widget.jsx', {
            '../../containers/observations/sample-form.js': MockComponent,
            '../../containers/observations/sample-observation/category-alert.jsx': MockComponent,
        }).default;
        sampleObservationWidget = new SampleObservationWidget();
    });

    it('should have 3 direct children', function () {
        // h2, p, Col
        expect(sampleObservationWidget.props.children.length).to.equal(3);
    });

    it('should have title "Try Now"', function () {
        var h2 = sampleObservationWidget.props.children[0];
        assert.equal(h2.type, 'h2');
        expect(h2.props).to.deep.equal({children: 'Try Now'});
    });
    it('should have text "Check category right now:"', function(){
        var p = sampleObservationWidget.props.children[1];
        assert.equal(p.type, 'p');
        expect(p.props).to.deep.equal({children: 'Check category right now:'});
    });
    it('should have SampleObservationForm and CategoryAlertContainer inside', function(){
        var Col = sampleObservationWidget.props.children[2];
        assert.equal(Col.props.children.length, 2)
    })
});


describe('Sample Observation Form Test', function () {
    it('has submit button with text "Check"');
    it('has proper child inputs');
    it('has calls props.getParameters when component did mount');
    it('calls props.submitAction on button click');
    it('calls submit on event "onFormSubmit"')

});


describe('Errors List component', function(){
    it('has empty div when no errors specified');
    it('has errors alerts with proper messages');
});