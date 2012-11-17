// ---------------------------------------------------------------
//
// AUDIO SLIDER
//
// ---------------------------------------------------------------

var AudioSlider = function ()
{
	//this.sndManager = soundManager;
	//this.sndPlayer  = threeSixtyPlayer;
	this.context    = {};	
	this.BUFFERS    = {};

	this.BUFFERS_TO_LOAD =
	{
		snd1_redux: 'media/snd1-redux.mp3',
		snd1_boost: 'media/snd1-boost.mp3',

		snd2_redux: 'media/snd2-redux.mp3',
		snd2_boost: 'media/snd2-boost.mp3'
	};

	this.blocker = 
	{
		pointer          : {},

		CSS_START_TOP    : "23px",
		CSS_START_LEFT   : "-13px",
		CSS_START_HEIGHT : "100px",
		CSS_START_WIDTH  : "250px",
		
		CSS_SND_WIDTH    : "130px",
		CSS_SND_HEIGHT   : "100px",
		
		CSS_SND1_TOP     : "24px",
		CSS_SND1_LEFT    : "-13px",
		
		CSS_SND2_TOP     : "24px",
		CSS_SND2_LEFT    : "113px"
	};

	this.isPlaying = 
	{
		pointer			: {},
		CSS_SND1_LEFT	: "20px",
		CSS_SND2_LEFT	: "142px"

	}


	this.init();
}

AudioSlider.prototype = 
{
	// --------------------------------------------------------------
	// METHODS
	// --------------------------------------------------------------

	// ______________________________________________________________
	//                                                           init
	init: function ()
	{
		var self = this;

		//this.assignListeners();

		$(document).ready(function()
		{	
			

		/*	// prepare events
			self.evt = globalEvent;
			self.evt.eventStr.AUDIO_READY            = "AUDIO_READY";
			self.evt.eventStr.AUDIO_NEW_AUDIO_LOADED = "AUDIO_NEW_AUDIO_LOADED";

			$("[data-sound-id]").css("opacity", ".5");

			// assign blocker pointer
			self.blocker.pointer = $("#button-blocker");
			self.isPlaying.pointer = $(".audio-isPlaying");
			self.isPlaying.pointer.css("display", "none");*/

			self.initSlider();
			//self.setBlockerStart();
			//self.soundManagerInit();
			//self.assignDomListeners();
		});		
		
	},



	// ______________________________________________________________
	//                                                assignListeners
	assignListeners: function ()
	{
		var self = this;

		window.addEventListener('load', function()
		{
			self.onLoad();
		}, false);

	},


	// ______________________________________________________________
	//                                             assignDomListeners
	assignDomListeners: function ()
	{
		var self = this;

		// player play
		this.evt.eventObj.bind (this.evt.eventStr.AUDIO_PLAYING, function(e, data)
		{
			self.onNewAudioLoaded(e, data);
			self.onPlaySoundManager(e, data);

		});


		// player paused
		this.evt.eventObj.bind (this.evt.eventStr.AUDIO_PAUSED, function(e, data)
		{
			self.onPauseSoundManager(e, data);
		});


		// new audio loaded from cross-fade

		this.evt.eventObj.bind (this.evt.eventStr.AUDIO_NEW_AUDIO_LOADED, function(e, data)
		{
			console.log("AUDIO_NEW_AUDIO_LOADED");
			self.onNewAudioLoaded(e, data);
		});
		this.onNewAudioLoaded();


		// slider
		$("#audioSlider-slider").bind("slider:changed", function (event, data) 
		{			
		  	self.onSliderChange(event, data);
		});


		// audio buttons clicked
		$("[data-sound-id]").bind ("click", function(e)
		{
			self.onAudioButtonClick(e);
		});


	},


	// ______________________________________________________________
	//                                                    loadBuffers
	loadBuffers: function() 
	{
		var self   = this;
		var names  = [];
		var paths  = [];

		for(var name in self.BUFFERS_TO_LOAD) 
		{
			var path = self.BUFFERS_TO_LOAD[name];
			names.push(name);
			paths.push(path);
		}

		bufferLoader = new BufferLoader(self.context, paths, function(bufferList) 
		{
			for(var i = 0; i < bufferList.length; i++) 
			{
				var buffer = bufferList[i];
				var name = names[i];
				self.BUFFERS[name] = buffer;
				self.BUFFERS[name].name = name;
				self.BUFFERS[name].path = self.BUFFERS_TO_LOAD[name];
				console.log(" <audioSlider.bufferLoader> audio ready");

				// dispatch event ready			
				self.evt.dispatchEvent(self.evt.eventStr.AUDIO_READY);

				$("#audio-loading").css("display", "none");
				self.blocker.pointer.css("display", "none");
				$("[data-sound-id]").css("opacity", "1");
			}		
		});

		bufferLoader.load();
	},	

	// ______________________________________________________________
	//                                               	   initSlider
	initSlider: function() 
	{
		$("[data-slider]").each(function () 
		{
			var input = $(this);
			$("<span>").addClass("output").insertAfter($(this));

		}).bind("slider:ready slider:changed", function (event, data) 
		{
			$(this).nextAll(".output:first").html(data.value.toFixed(3));
		});
		$("#audioSlider-slider").simpleSlider("setValue", $("#audioSlider-slider").attr("data-default-value"));
 
	},

	// ______________________________________________________________
	//                                               soundManagerInit
	soundManagerInit: function() 
	{		
		var sndPlayer  = this.sndPlayer;
		var sndManager = this.sndManager;

		sndManager.defaultOptions = {
			volume: 0
		};


		sndManager.setup(
		{
			// path to directory containing SM2 SWF
			url: 'ui/swf/soundManager/'
			
		});

		sndPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i)?false:true);
		sndPlayer.config.showHMSTime = true;

		// enable some spectrum stuffs

		sndPlayer.config.useWaveformData = true;
		sndPlayer.config.useEQData = true;

		// enable this in SM2 as well, as needed
		if (sndPlayer.config.useWaveformData) 
		{
			sndManager.flash9Options.useWaveformData = true;
		}

		if (sndPlayer.config.useEQData) 
		{
			sndManager.flash9Options.useEQData = true;
		}

		if (sndPlayer.config.usePeakData) 
		{
			sndManager.flash9Options.usePeakData = true;
		}

		if (sndPlayer.config.useWaveformData || sndPlayer.flash9Options.useEQData || sndPlayer.flash9Options.usePeakData) 
		{
			// even if HTML5 supports MP3, prefer flash so the visualization features can be used.
			sndManager.preferFlash = true;		
		}

		// favicon is expensive CPU-wise, but can be enabled.
		sndPlayer.config.useFavIcon = false;

		sndManager.onready(function() 
		{
			console.log(" <audioSlider.soundManager> ready");	
		});
	},


	// ______________________________________________________________
	//                                                setBlockerStart
	setBlockerStart: function() 
	{
		var bl = this.blocker;
		var p = bl.pointer;

		p.css("top", bl.CSS_START_TOP);
		p.css("left", bl.CSS_START_LEFT);
		p.css("height", bl.CSS_START_HEIGHT);
		p.css("width", bl.CSS_START_WIDTH);	
	},

	// ______________________________________________________________
	//                                                 setBlockerSnd1
	setBlockerSnd1: function() 
	{
		var bl = this.blocker;
		var p = blocker.pointer;

		p.css("top", bl.CSS_SND1_TOP);
		p.css("left", bl.CSS_SND1_LEFT);

		p.css("height", bl.CSS_SND_WIDTH);
		p.css("width", bl.CSS_SND_HEIGHT);	
	},

	// ______________________________________________________________
	//                                                 setBlockerSnd2
	setBlockerSnd2: function() 
	{
		var bl = this.blocker;
		var p = blocker.pointer;

		p.css("top", bl.CSS_SND2_TOP);
		p.css("left", bl.CSS_SND2_LEFT);
		
		p.css("height", bl.CSS_SND_WIDTH);
		p.css("width", bl.CSS_SND_HEIGHT);	
	},




	// --------------------------------------------------------------
	// EVENTS
	// --------------------------------------------------------------

	// ______________________________________________________________
	//                                                         onLoad
	onLoad: function() 
	{
		var self = this;
		try 
		{
			self.context = new webkitAudioContext();
		} 
		catch(e) 
		{
			alert('Web Audio API is not supported in this browser');
		}

		this.loadBuffers();
	},	


	// ______________________________________________________________
	//                                             onPlaySoundManager
	onPlaySoundManager: function(e, data) 
	{

		// assign audio url
		$(".ui360.ui360-vis a").attr("href", data.path);
		$(".ui360 .sm2-canvas").css("display", "block");

		// sim click
		$(".sm2-360btn-default").trigger("click");
		//this.blocker.pointer.css("display", "block");

		/*console.log("onPlaySoundManager", data.path);
		console.log("snd", this.snd2_boost);*/


		switch (data.path)
		{
			case this.snd1_boost:
				this.setBlockerSnd1();
				break;

			case this.snd2_boost:
				this.setBlockerSnd2();
				break;
		}


		
	},


	// ______________________________________________________________
	//                                             onPauseSoundManager
	onPauseSoundManager: function(e, data) 
	{
		// sim click
		$(".sm2-360btn-default").trigger("click");
		//this.blocker.pointer.css("display", "none");
		$(".ui360 .sm2-canvas").css("display", "none");


	},


	// ______________________________________________________________
	//                                                 onSliderChange
	onSliderChange: function(e, data) 
	{
		data.max = $(e.target).attr("data-slider-range").split(",")[1];
		CrossfadeSample.crossfade(data);
	},


	// ______________________________________________________________
	//                                               onNewAudioLoaded
	onNewAudioLoaded: function(e, data) 
	{	
		console.log("onNewAudioLoaded");
		$("#audioSlider-slider").simpleSlider("setValue", $("#audioSlider-slider").attr("data-default-value"));
	},



	// ______________________________________________________________
	//                                               onAudioButtonClick
	onAudioButtonClick: function(e) 
	{		
		var self = this;

		if (CrossfadeSample.playing)
		{
			// then pause
			CrossfadeSample.stop();
			self.isPlaying.pointer.css("display", "none");
		}
		else
		{
			var id = $(e.target).attr("data-sound-id");
			CrossfadeSample.loadAudio(aSlider.BUFFERS[id + "_redux"], aSlider.BUFFERS[id + "_boost"], aSlider.context);

			self.isPlaying.pointer.css("display", "block");

			switch (id)
			{
				case "snd1":
					self.isPlaying.pointer.css("left", self.isPlaying.CSS_SND1_LEFT);
					break;

				case "snd2":
					self.isPlaying.pointer.css("left", self.isPlaying.CSS_SND2_LEFT);
					break;
			}
		}
		
	}







}


var aSlider = new AudioSlider();