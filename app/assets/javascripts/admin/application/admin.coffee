#= require_self
#= require ./namespace
#= require_tree ./dsl
#= require ./initializer

#= require_tree ./helpers
#= require_tree ./views
#= require_tree ./templates

#= require ./store
#= require_tree ./models

#= require ./router
#= require_tree ./routes
#= require_tree ./controllers

@Admin = Ember.Application.create()