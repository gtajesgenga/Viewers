import { Meteor } from 'meteor/meteor';
import { Pipelines } from 'meteor/gtajesgenga:vtk/both/collections';
import { Template } from 'meteor/templating';
import { OHIF } from 'meteor/ohif:core';
import { PipelineSelector } from 'meteor/gtajesgenga:vtk';

Template.pipelineSelector.onCreated(function() {

    this.autorun(() => {
        this.subscribe('pipelines.publication', Pipelines.find({}, {}).fetch(),{onReady: function () {
                Template.pipelineSelector.__helpers.get('initInput')();
            }});
    });
});

Template.pipelineSelector.helpers({

    initInput: function () {
        Meteor.typeahead.destroy($('.typeahead'));
        Meteor.typeahead.inject();
    },

    pipelines: function() {
        return Pipelines.find({}, {}).fetch();
    },

    selected: function (event, suggestion, datasetName) {
        // event - the jQuery event object
        // suggestion - the suggestion object
        // datasetName - the name of the dataset the suggestion belongs to
        // TODO your event handler here
        OHIF.log.info(suggestion.id);
        Template.instance().$('#selected-pipeline-id').val(suggestion.id);
        PipelineSelector.selectedId = suggestion.id;
        //console.log(suggestion.id);
    }
});


