var AudioSlider = function()
 {
	this.flashObj = document.getElementById('flashAudio');
    this.init();
};

AudioSlider.prototype =
{
    init: function()
    {
        var self = this;
		this.sliderData = 0.0;
		
		for(var i=0; i<=5; i++){
			this.transistionMusic();
		}

		
        self.initSlider();
    },
    initSlider: function()
    {
		var self = this;
        $("[data-slider]").each(function()
        {
            var input = $(this);
            $("<span>").addClass("output").insertAfter($(this));

        }).bind("slider:ready slider:changed",
        function(event, data)
        {
			self.sliderData = data.value.toFixed(3);
			self.transistionMusic(self.sliderData);
            $(this).nextAll(".output:first").html(self.sliderData);
        });
        $("#audioSlider-slider").simpleSlider("setValue", $("#audioSlider-slider").attr("data-default-value"));

    },
	transistionMusic: function(){
		var self = this;
		var reverseSound = (100 - this.sliderData) / 100;
		var forwardSound = this.sliderData/100;
		var forwardDrop = (reverseSound>0.60)?forwardSound / 1000 : forwardSound;
		var reverseDrop = (reverseSound<0.40)?reverseSound / 1000 : reverseSound;	

		self.flashObj.fadeSound(forwardDrop, reverseDrop);
	}
	
};