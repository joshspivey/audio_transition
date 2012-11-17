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
			console.log(self.flashObj);
			self.flashObj.fadeSound(data.value.toFixed(3));
            $(this).nextAll(".output:first").html(data.value.toFixed(3));
        });
        $("#audioSlider-slider").simpleSlider("setValue", $("#audioSlider-slider").attr("data-default-value"));

    },
    controllerInterface: function() {

    }



};


var aSlider = new AudioSlider();