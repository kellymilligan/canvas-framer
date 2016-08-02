define([

    'lodash',
    'jquery',
    '_baseObject',

    '../modules/_example'

], function(

    _,
    $,
    BaseObject,

    ExampleChild

) { 'use strict';

    return _.assign( _.create( BaseObject ), {


        $example     : null,
        exampleChild : null,


        setup: function () {

            this.$example = this.$node.find('.js-example');

            var config = {
                'index': 0,
                'awesome': true
            };

            this.exampleChild = this.createChild( ExampleChild, this.$example, config );
        },

        resize: function () {

            this.exampleChild.resize();
        },

        mouseMove: function () {

            this.exampleChild.mouseMove();
        },

        onAnimFrame: function () {

            this.exampleChild.animFrame();
        }

        // routeHome: function () {

        // }

    });

});