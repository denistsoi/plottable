///<reference path="reference.ts" />

class Scale implements IBroadcaster {
  public scale: D3.Scale.Scale;
  private broadcasterCallbacks: IBroadcasterCallback[] = [];

  constructor(scale: D3.Scale.Scale) {
    this.scale = scale;
  }

  public (value: any): any {
    return this.scale(value);
  }

  public domain(): any[];
  public domain(values: any[]): Scale;
  public domain(values?: any[]): any {
    if (values != null) {
      this.scale.domain(values);
      this.broadcasterCallbacks.forEach((b) => b(this));
      return this;
    } else {
      return this.scale.domain();
    }
  }

  public range(): any[];
  public range(values: any[]): Scale;
  public range(values?: any[]): any {
    if (values != null) {
      this.scale.range(values);
      return this;
    } else {
      return this.scale.range();
    }
  }

  public copy(): Scale {
    return new Scale(this.scale.copy());
  }

  public registerListener(callback: IBroadcasterCallback) {
    this.broadcasterCallbacks.push(callback);
    return this;
  }
}

class QuantitiveScale extends Scale {
  public scale: D3.Scale.QuantitiveScale;
  constructor(scale: D3.Scale.QuantitiveScale) {
    super(scale);
  }

  public invert(value: number) {
    return this.scale.invert(value);
  }

  public ticks(count: number) {
    return this.scale.ticks(count);
  }

  public copy(): QuantitiveScale {
    return new QuantitiveScale(this.scale.copy());
  }

  public widenDomain(newDomain: number[]) {
    var currentDomain = this.domain();
    var wideDomain = [Math.min(newDomain[0], currentDomain[0]), Math.max(newDomain[1], currentDomain[1])];
    this.domain(wideDomain);
    return this;
  }
}

class LinearScale extends QuantitiveScale {
  constructor();
  constructor(scale: D3.Scale.LinearScale);
  constructor(scale?: any) {
    super(scale == null ? d3.scale.linear() : scale);
    this.domain([Infinity, -Infinity]);
  }

  public copy(): LinearScale {
    return new LinearScale(this.scale.copy());
  }
}