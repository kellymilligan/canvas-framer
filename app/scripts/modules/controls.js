define([

    'lodash',
    'jquery',
    '_baseObject'

], function(

    _,
    $,
    BaseObject

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        //


        setup: function (options) {

            console.log('controls');
        },

        resize: function () {

        },

        mouseMove: function () {

        },

        onAnimFrame: function () {

        }

    });

});