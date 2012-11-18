﻿package  {	import flash.display.MovieClip;import flash.external.ExternalInterface;import flash.events.MouseEvent;import flash.net.URLRequest;import flash.media.Sound;import flash.media.SoundChannel;import flash.media.SoundTransform;import com.greensock.*;import com.greensock.plugins.*;import com.greensock.plugins.SoundTransformPlugin;		public class audioTransition extends MovieClip {		private var audioPath = "includes/music/"						private var soundOne:Sound;		private var soundOneChannel:SoundChannel;		private var soundOneTransform:SoundTransform;				private var soundTwo:Sound;		private var soundTwoChannel:SoundChannel;		private var soundTwoTransform:SoundTransform;							public function audioTransition() {			TweenPlugin.activate([SoundTransformPlugin]); //only necessary once									soundOne = new Sound();			soundOneChannel = new SoundChannel();			soundOneTransform = new SoundTransform(1);			soundOne.load(new URLRequest(audioPath+"madness.mp3"));			soundOneTransform.volume = 0.5;			soundOneChannel = soundOne.play(0, 99, soundOneTransform);									soundTwo = new Sound();			soundTwoChannel = new SoundChannel();			soundTwoTransform = new SoundTransform(1);			soundTwo.load(new URLRequest(audioPath+"diamonds.mp3"));			soundTwoTransform.volume = 0.5;			soundTwoChannel = soundTwo.play(0, 99, soundTwoTransform);				ExternalInterface.addCallback("fadeSound", fadeSound);		}				public function fadeSound(percentArg:Number, reversePercentArg:Number):void {						TweenLite.from(this.soundOneChannel, 1, {soundTransform:{volume:percentArg,pan:0.5}});			TweenLite.from(this.soundTwoChannel, 1, {soundTransform:{volume:reversePercentArg,pan:0.5}});			     	}     			private function onClickPlay(e:MouseEvent):void{		//soundOneChannel = soundOne.play(lastPosition);	}	private function onClickStop(e:MouseEvent):void{			soundOneChannel.stop();	}	}	}