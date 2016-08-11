function PitchSlider () {

    this.startFrequency;
	this._addButton = function(row, colIndex, icon, iconSize, label) {
        var cell = row.insertCell();
        cell.innerHTML = '&nbsp;&nbsp;<img src="header-icons/' + icon + '" title="' + label + '" alt="' + label + '" height="' + iconSize + '" width="' + iconSize + '" vertical-align="middle">&nbsp;&nbsp;';
        cell.style.width = Math.floor(MATRIXBUTTONHEIGHT * this._cellScale) + 'px';
        cell.style.minWidth = cell.style.width;
        cell.style.maxWidth = cell.style.width;
        cell.style.height = Math.floor(MATRIXBUTTONHEIGHT * this._cellScale) + 'px';
        cell.style.backgroundColor = MATRIXBUTTONCOLOR;

        cell.onmouseover=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLORHOVER;
        }

        cell.onmouseout=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLOR;
        }

        return cell;
    };

    this._play = function () {
        var obj = frequencyToPitch(this.startFrequency);
        var pitchnotes = [];
        var note = obj[0] + obj[1];
        pitchnotes.push(note.replace(/♭/g, 'b').replace(/♯/g, '#'));
        var slider = docById('slider');
        slider.cells[0].style.backgroundColor = MATRIXBUTTONCOLOR;
        this._logo.synth.trigger(pitchnotes, 1, 'poly');
        setTimeout(function() {
            slider.cells[0].style.backgroundColor = MATRIXNOTECELLCOLOR;
        }, 1000);
    };

	this.init = function (logo) {
		console.log('init PitchSlider');
		this._logo = logo;
		var that = this;

		docById('pitchSliderDiv').style.display = 'inline';
        console.log('setting PitchSlider visible');
        docById('pitchSliderDiv').style.visibility = 'visible';
        docById('pitchSliderDiv').style.border = 2;
		
		var w = window.innerWidth;
        this._cellScale = w / 1200;
        var iconSize = Math.floor(this._cellScale * 24);
        
        docById('pitchSliderDiv').style.width = Math.floor(w / 2) + 'px';
        docById('pitchSliderDiv').style.overflowX = 'auto';
	
		var tables = document.getElementsByTagName('TABLE');
        var noofTables = tables.length

        for (var i = 0; i < noofTables; i++) {
            tables[0].parentNode.removeChild(tables[0]);
        } 

        var x = document.createElement('TABLE');
        x.setAttribute('id', 'buttonTable');
        x.style.textAlign = 'center';
        x.style.borderCollapse = 'collapse';
        x.cellSpacing = 0;
        x.cellPadding = 0;

        var sliderDiv = docById('pitchSliderDiv');
        sliderDiv.style.paddingTop = 0 + 'px';
        sliderDiv.style.paddingLeft = 0 + 'px';
        sliderDiv.appendChild(x);
        sliderDivPosition = sliderDiv.getBoundingClientRect();

        var table = docById('buttonTable');
        var row = table.insertRow(0);
        row.style.left = Math.floor(sliderDivPosition.left) + 'px';
        row.style.top = Math.floor(sliderDivPosition.top) + 'px';

        var cell = this._addButton(row, -1, 'play-button.svg', iconSize, _('play'));
        cell.onclick=function() {
            that._play();
        };

        cell.onmouseover=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLORHOVER;
        };

        cell.onmouseout=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLOR;
        };

        var cell = this._addButton(row, 1, 'close-button.svg', iconSize, _('close'));
        cell.onclick=function() {
            docById('pitchSliderDiv').style.visibility = 'hidden';
        };

        cell.onmouseover=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLORHOVER;
        };

        cell.onmouseout=function() {
            this.style.backgroundColor = MATRIXBUTTONCOLOR;
        };

        var x = document.createElement('TABLE');
        x.setAttribute('id', 'pitchslider');
        x.style.textAlign = 'center';
        x.style.borderCollapse = 'collapse';
        x.cellSpacing = 0;
        x.cellPadding = 0;
        sliderDiv.appendChild(x);

        var table = docById('pitchslider');
        var row = table.insertRow(0);
        row.style.left = Math.floor(sliderDivPosition.left) + 'px';
        row.style.top = Math.floor(sliderDivPosition.top) + 'px';
        row.setAttribute('id', 'slider');

        var cell = row.insertCell(-1);
        cell.style.width = sliderDivPosition.width + 'px';
        cell.innerHTML = this.startFrequency + "-" + 2 * this.startFrequency;
        cell.style.minWidth = cell.style.width;
        cell.style.maxWidth = cell.style.width;
        cell.style.height = Math.floor(MATRIXBUTTONHEIGHT * this._cellScale) + 'px';
        cell.style.lineHeight = 60 + '%';
        cell.style.backgroundColor = MATRIXNOTECELLCOLOR;
        
	};
};