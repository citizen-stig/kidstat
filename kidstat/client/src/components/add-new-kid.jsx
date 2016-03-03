var React = require('react');
var Reflux = require('reflux');
var ModalWindow = require('./modal');
var KidForm = require('./kid-form');

var KidsStore = require('../stores/kids-store');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(KidsStore, "handleNewKid")
    ],
    open: function(){
        this.refs.modal.open()
    },
    handleNewKid: function(event){
        if (event == 'change'){
            this.refs.modal.close();
        }
    },
    render: function () {
        return <ModalWindow ref="modal" title="Add new Kid">
                <KidForm/>
            </ModalWindow>
    }
});