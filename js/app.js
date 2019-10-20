'use strict';

var App = (function() {

  function App(config) {
    var defaults = {
      "el": "#sequencer"
    };
    this.opt = _.extend({}, defaults, config);
    this.init();
  }

  App.prototype.init = function(){
    var _this = this;

    this.drums = new Drums({
      "el": _this.opt.el,
      "onChange": function(){ _this.onChangeDrums(); }
    });

    this.collections = new Collections({
      "el": _this.opt.el,
      "onChange": function(){ _this.onChangeCollections(); }
    });

    $.when(
      this.drums.load(),
      this.collections.load()

    ).done(function(){
      console.log("Loaded everything. Starting sequencer.")
      _this.onLoad();
    });
  };

  App.prototype.loadSequencer = function(){
    var _this = this;

    this.sequencer = new Sequencer({
      "el": _this.opt.el,
      "tracks": _this.drums.tracks
    });
  };

  App.prototype.onLoad = function(){
    this.loadSequencer();
  };

  App.prototype.onChangeDrums = function(){
    this.updateSequencer();
  };

  App.prototype.onChangeCollections = function(){
    this.updateSequencer();
  };

  App.prototype.updateSequencer = function(){
    this.sequencer.update(this.drums.tracks);
  };

  return App;

})();

$(function() {
  var app = new App({});
});
