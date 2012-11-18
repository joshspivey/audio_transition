var AudioSlider = function()
 {
    this.init();
};

AudioSlider.prototype =
{
    init: function()
    {
        var self = this;
		this.flashObj = document.getElementById('flashAudio');
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
			var reverseSound = (100 - data.value.toFixed(3)) / 100;
			var forwardSound = data.value.toFixed(3)/100;
			var forwardDrop = (reverseSound>0.60)?forwardSound / 1000 : forwardSound;
			var reverseDrop = (reverseSound<0.40)?reverseSound / 1000 : reverseSound;	

			self.flashObj.fadeSound(forwardDrop, reverseDrop);
            $(this).nextAll(".output:first").html(data.value.toFixed(3));
        });
        $("#audioSlider-slider").simpleSlider("setValue", $("#audioSlider-slider").attr("data-default-value"));

    }
	



};


var aSlider = new AudioSlider();