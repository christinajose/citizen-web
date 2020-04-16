import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

import * as p5 from 'p5';
import { Router } from '@angular/router';
// import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})


export class WheelComponent implements OnInit, OnDestroy {

  // private toggle = true;
  private p5;
  data;
  theta;
  current = 0;
  sectionSize;
  size = 125;
  colors = [];
  spinning = false;
  spinButton;
  removeButton;
  CCDIV;
  backC;
  prevC;
  selected;
  total = 6;
  prevTheta = 0;
  numbers = [];
  selectedIndex = 0;
  rotationArray = [152, 90, 32, -28, 270, 210]
  allowSpinner = true;
  initialWidth;


  // this.numbers[this.selectedIndex]
  constructor(private router: Router) {
    console.log('Analog-constructed');
    window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    console.log('analog-init');
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
    console.log('analog-destroy');
  }

  private onWindowResize = (e) => {
    this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
  }

  private createCanvas = () => {
    console.log('creating canvas');
    this.p5 = new p5(this.drawing);
  }

  private destroyCanvas = () => {
    console.log('destroying canvas');
    this.p5.noCanvas();
  }

  private drawing = (p: any) => {
    p.setup = () => {
      let heightPortion;
      if (jQuery(window).width() > 600) {
        this.initialWidth = 0.7 * p.windowWidth;
        heightPortion = 5;
      } else {
        this.initialWidth = p.windowWidth;
        heightPortion = 9;
      }
      p.createCanvas(this.initialWidth, p.windowHeight).parent('analog-clock-canvas');
      this.size = (p.height * .8) / heightPortion
      this.numbers = ['Road', 'Vegetation', 'Desert', 'Trees', 'Water', 'Coral Reefs']
      this.sectionSize = (p.TWO_PI / this.total);
      this.current = p.random(p.TWO_PI);
      this.theta = 0;

      this.spinButton = () => {
        console.log('Called')
        if (!this.spinning) {
          setTimeout(() => {
            this.showModal();
          })
          let force = p.random(0.4, 0.5);

          if (p.random(1) > 0.5)
            force *= -1;

          this.theta += force;
        }
        this.spinning = true;
      }

      this.loadColors(p);
      this.backC = p.color(51);
    };

    // p.center = { x: 0, y: 0 };
    p.draw = () => {


      if (this.prevC) {
        this.backC = p.lerpColor(this.backC, this.prevC, .04);
      }

      if (this.backC) {
        this.backC.setAlpha(200);
        // p.background(this.backC);
        p.background('whitesmoke');

      }

      p.translate(p.width / 2, p.height / 2);
      p.stroke(255);
      p.fill(190);
      p.noStroke();
      p.fill(255);
      p.strokeWeight(1);
      this.current += this.theta;

      this.theta *= .99


      if (this.theta < 0.001 && this.theta > -0.001) {
        this.theta = 0; this.spinning = false
      }

      this.current %= p.TWO_PI;


      if (this.similar(this.current, this.theta, p, .01)) {
        this.spinning = false;
      }

      p.strokeWeight(8);
      p.stroke(360);


      p.fill((190));

      p.circle(0, 0, this.size * 4, this.size * 4);
      this.drawArcs(p);
      this.drawSpinner(p);
      // p.print(this.numbers[this.selectedIndex])

    };

  };

  spinWheel() {
    if (this.allowSpinner) {
      this.allowSpinner = false;
      this.spinButton();
    }
  }

  drawSpinner(p) {
    let spinner = (this.size * 4) * .35
    p.strokeWeight(1);
    p.rotate(this.current);

    p.stroke(255);
    p.fill(255);
    p.strokeWeight(8);
    p.line(-spinner, -0, spinner, 0);
    p.strokeWeight(1);
    p.circle(0, 0, 20);
    p.fill(0);
    p.circle(0, 0, 5);
    p.fill(255);

    p.push();
    p.translate(spinner - 5, 0);
    p.rotate(p.QUARTER_PI);
    p.triangle(7.5, 7.5, 15, -15, -7.5, -7.5);
    p.pop();

    p.rectMode(p.CENTER);
    p.rect(-spinner, 0, 16, 16);
  }


  drawArcs(p) {
    for (let i = 0; i < this.total; i++) {
      p.push();
      let t = ((i) / this.total) * p.TWO_PI;
      let prev = t - this.sectionSize;
      p.rotate(t);
      let c = this.colors[i];
      c.setAlpha(255);
      let cot = this.current + (120 * p.TWO_PI);
      let me = ((cot) % p.TWO_PI) - this.sectionSize;
      let txtSize = 15;
      let sw = 4;
      let astroke = 1;
      let strokeCol = 200;
      let thisSize = this.size;


      if (me > prev && me < t) {
        this.prevC = c;
        this.selectedIndex = i;
        c.setAlpha(190);
        txtSize = 17;
        thisSize += 3;
        sw = 6;
        astroke = 4;
        strokeCol = p.color(0, 0, 0, 0);
      }
      p.textSize(txtSize);
      p.push();
      p.textAlign(p.CENTER, p.CENTER);
      p.rotate(-p.QUARTER_PI);
      let txt = this.numbers[i];
      let n = 0;
      if (typeof (txt) == 'string') {
        n = txt.length * 1 + (txtSize) + 0.7;
        if (p.str(p.int(txt)) == txt) n = txt.length * 1;
      }

      p.rotate(this.sectionSize / 2);
      p.translate(this.size * 1.5 + n, this.size * 1.5 + n);
      p.rotate(-p.QUARTER_PI);
      p.rotate(p.PI);
      p.rotate(p.HALF_PI);
      p.stroke(0);
      p.strokeWeight(sw);
      p.fill(255);
      // if (i == 5) {
      p.rotate(p.radians(this.rotationArray[i]))
      // }
      p.text(txt, 0, 0);

      p.pop();
      p.fill(c);
      p.stroke(strokeCol);
      p.strokeWeight(astroke);
      p.arc(0, 0, thisSize * 4, thisSize * 4, 0, this.sectionSize, p.PIE);
      p.pop();
    }
  }


  similar(a, b, p, epsilon = .01) {
    return p.abs(a - b) <= epsilon;
  }

  loadColors(p) {
    // TODO: set better colors with RGB
    this.colors = [];
    var rainbowColors = [
      p.createVector(0, 0, 0).set(p.color('green').levels),
      p.createVector(0, 0, 0).set(p.color('orange').levels),
      p.createVector(0, 0, 0).set(p.color('violet').levels),
      p.createVector(0, 0, 0).set(p.color('red').levels),
      p.createVector(38, 58, 150), // blue
      p.createVector(0, 0, 0).set(p.color('indigo').levels),
      p.createVector(0, 0, 0).set(p.color('yellow').levels)
    ];
    for (var i = 0; i < this.total; i++) {
      var colorPosition = i / this.total;
      var scaledColorPosition = colorPosition * (rainbowColors.length - 1);

      var colorIndex = p.floor(scaledColorPosition);
      var colorPercentage = scaledColorPosition - colorIndex;
      // print(colorPercentage);

      var nameColor = p5.Vector.lerp(
        rainbowColors[colorIndex],
        rainbowColors[colorIndex + 1],
        colorPercentage
      );
      this.colors.push(p.color(nameColor.x, nameColor.y, nameColor.z))
    }
  }

  featureSelected() {
    localStorage.setItem('feature', this.numbers[this.selectedIndex])
    jQuery('#confirm').modal('hide');
    this.router.navigate(["/tutorial"]);
  }

  showModal() {
    setTimeout(() => {
      jQuery('#confirm').modal('show');
    }, 12000)
    // setTimeout(() => {
    //   jQuery('#confirm').modal('hide');
    //   this.router.navigate(["/tutorial"]);
    // }, 15000)
  }

}